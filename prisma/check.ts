import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking batches...");
  const batches = await prisma.uploadBatch.findMany({
    include: {
      leads: {
        select: {
          id: true,
          status: true
        }
      }
    }
  });

  console.log(`Found ${batches.length} batches:`);
  for (const b of batches) {
    const statuses = b.leads.map(l => l.status);
    const counts = statuses.reduce((acc: any, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    console.log(`- Batch: ${b.fileName} (ID: ${b.id})`);
    console.log(`  Total leads in batch: ${b.leads.length}`);
    console.log(`  By Status:`, counts);
  }

  console.log("\nTesting relation query for status 'contacted':");
  const contactedBatches = await prisma.uploadBatch.findMany({
    where: {
      leads: {
        some: {
          status: "contacted"
        }
      }
    },
    select: { id: true, fileName: true }
  });
  console.log("Batches with contacted leads:", contactedBatches);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
