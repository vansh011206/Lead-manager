import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { businessName: { contains: query, mode: "insensitive" } },
          { prospectFullName: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        businessName: true,
        prospectFullName: true,
        status: true,
        uploadBatch: {
          select: {
            fileName: true,
          },
        },
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Global search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
