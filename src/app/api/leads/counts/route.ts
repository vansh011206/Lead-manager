import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [all, newCount, contacted, remarked, declined] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.count({ where: { status: "contacted" } }),
      prisma.lead.count({ where: { status: "remarked" } }),
      prisma.lead.count({ where: { status: "declined" } }),
    ]);

    return NextResponse.json({
      all,
      new: newCount,
      contacted,
      remarked,
      declined,
    });
  } catch (error) {
    console.error("GET leads counts error:", error);
    return NextResponse.json({ error: "Failed to fetch counts" }, { status: 500 });
  }
}
