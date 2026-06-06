import { PrismaClient } from "@prisma/client";
import { startReminderScheduler } from "./scheduler";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Start background meeting reminder scheduler
startReminderScheduler();

