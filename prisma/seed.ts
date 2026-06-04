import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { parseAndMapCSV } from "../src/lib/csvParser";

const prisma = new PrismaClient();

async function main() {
  const initialDataDir = path.join(process.cwd(), "initial-data");
  
  if (!fs.existsSync(initialDataDir)) {
    console.log("No initial-data directory found. Skipping seeding.");
    return;
  }

  const files = fs.readdirSync(initialDataDir).filter((file) => file.endsWith(".csv"));

  if (files.length === 0) {
    console.log("No CSV files found in initial-data folder.");
    return;
  }

  console.log(`Found ${files.length} CSV file(s) to seed.`);

  for (const file of files) {
    const filePath = path.join(initialDataDir, file);
    console.log(`Processing file: ${file}`);

    const csvContent = fs.readFileSync(filePath, "utf-8");

    const parseResult = Papa.parse<Record<string, string>>(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    const headers = parseResult.meta.fields || [];
    const rows = parseResult.data;

    if (headers.length === 0 || rows.length === 0) {
      console.log(`Skipping empty or invalid CSV: ${file}`);
      continue;
    }

    // Map rows using smart CSV parser
    const { mappedData, columnMapping } = parseAndMapCSV(headers, rows);

    // Create the batch record
    const batch = await prisma.uploadBatch.create({
      data: {
        fileName: file,
        totalRecords: mappedData.length,
        columnMapping: JSON.stringify(columnMapping),
      },
    });

    console.log(`Created UploadBatch: ${batch.id} with ${mappedData.length} records.`);

    // Bulk insert leads associated with the batch
    // SQLite supports transaction bulk inserts or loops. Let's do a createMany if supported, or insert in transaction.
    // Since sqlite supports createMany in recent prisma versions, we can use createMany. Let's do a loop with transactions to ensure safety.
    await prisma.$transaction(
      mappedData.map((lead) =>
        prisma.lead.create({
          data: {
            rowNum: lead.rowNum,
            prospectFullName: lead.prospectFullName,
            prospectJobTitle: lead.prospectJobTitle,
            prospectLinkedin: lead.prospectLinkedin,
            businessName: lead.businessName,
            businessWebsite: lead.businessWebsite,
            businessNumberOfEmployees: lead.businessNumberOfEmployees,
            businessYearlyRevenue: lead.businessYearlyRevenue,
            businessCountry: lead.businessCountry,
            businessRegion: lead.businessRegion,
            businessNaicsDescription: lead.businessNaicsDescription,
            contactProfessionalEmail: lead.contactProfessionalEmail,
            contactEmails: lead.contactEmails,
            contactMobilePhone: lead.contactMobilePhone,
            contactPhoneNumbers: lead.contactPhoneNumbers,
            prospectId: lead.prospectId,
            businessId: lead.businessId,
            originalCreatedAt: lead.originalCreatedAt,
            status: "new",
            uploadBatchId: batch.id,
          },
        })
      )
    );

    console.log(`Successfully seeded ${mappedData.length} leads from ${file}`);
  }
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
