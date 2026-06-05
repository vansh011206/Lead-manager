import { NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/lib/prisma";
import { parseAndMapCSV } from "@/lib/csvParser";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileContent = await file.text();

    const parseResult = Papa.parse<Record<string, string>>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const headers = parseResult.meta.fields || [];
    const rows = parseResult.data;

    if (headers.length === 0 || rows.length === 0) {
      return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 });
    }

    const { mappedData, columnMapping } = parseAndMapCSV(headers, rows);

    // Create the batch record
    const batch = await prisma.uploadBatch.create({
      data: {
        fileName: file.name,
        totalRecords: mappedData.length,
        columnMapping: JSON.stringify(columnMapping),
      },
    });

    // Insert leads individually (MongoDB Atlas free tier does not support multi-doc transactions)
    for (let i = 0; i < mappedData.length; i++) {
      const lead = mappedData[i];
      const originalRow = rows[i];
      await prisma.lead.create({
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
          rawData: JSON.stringify(originalRow),
        },
      });
    }

    return NextResponse.json({
      batchId: batch.id,
      fileName: batch.fileName,
      totalRecords: batch.totalRecords,
      columnMapping,
    });
  } catch (error) {
    console.error("Upload CSV error:", error);
    return NextResponse.json({ error: "Failed to process CSV file" }, { status: 500 });
  }
}
