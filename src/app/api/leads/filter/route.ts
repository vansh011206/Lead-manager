import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const country = searchParams.get("country") || "";
    const region = searchParams.get("region") || "";
    const industry = searchParams.get("industry") || "";
    const batchId = searchParams.get("batchId") || "";
    const sortBy = searchParams.get("sortBy") || "date_desc";

    const where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }
    if (country && country !== "all") {
      where.businessCountry = country;
    }
    if (region && region !== "all") {
      where.businessRegion = region;
    }
    if (industry && industry !== "all") {
      where.businessNaicsDescription = industry;
    }
    if (batchId && batchId !== "all" && batchId !== "undefined" && batchId !== "null") {
      where.uploadBatchId = batchId;
    }

    if (search) {
      where.OR = [
        { prospectFullName: { contains: search, mode: "insensitive" } },
        { businessName: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "name_asc") {
      orderBy = { prospectFullName: "asc" };
    } else if (sortBy === "name_desc") {
      orderBy = { prospectFullName: "desc" };
    } else if (sortBy === "date_desc") {
      orderBy = { createdAt: "desc" };
    } else if (sortBy === "date_asc") {
      orderBy = { createdAt: "asc" };
    } else if (sortBy === "company_asc" || sortBy === "company") {
      orderBy = { businessName: "asc" };
    }

    // Retrieve only IDs
    const leads = await prisma.lead.findMany({
      where,
      orderBy,
      select: { id: true },
    });

    return NextResponse.json({
      ids: leads.map((l) => l.id),
    });
  } catch (error) {
    console.error("GET filtered leads IDs error:", error);
    return NextResponse.json({ error: "Failed to fetch filtered lead IDs" }, { status: 500 });
  }
}
