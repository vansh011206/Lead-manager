const { PrismaClient } = require("./src/generated/client");

const prisma = new PrismaClient();

async function main() {
  const batchId = "6a39f56cf2682f687aa7b195"; // shimla_restaurants_leads
  const leadsCount = await prisma.lead.count({
    where: {
      uploadBatchId: batchId
    }
  });
  console.log("Leads in shimla_restaurants_leads by uploadBatchId direct query:", leadsCount);

  const leadsWithStatusNew = await prisma.lead.count({
    where: {
      uploadBatchId: batchId,
      status: "new"
    }
  });
  console.log("New leads in this batch:", leadsWithStatusNew);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
