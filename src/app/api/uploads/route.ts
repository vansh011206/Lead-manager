import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const batches = await prisma.uploadBatch.findMany({
      orderBy: { uploadedAt: "desc" },
      include: {
        _count: {
          select: { leads: true },
        },
      },
    });

    return NextResponse.json(batches);
  } catch (error) {
    console.error("GET uploads history error:", error);
    return NextResponse.json({ error: "Failed to fetch uploads history" }, { status: 500 });
  }
}
