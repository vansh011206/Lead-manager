import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPhoneRegexPatterns } from "@/lib/utils";

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
    
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    // Build the query where clause
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
      const phonePatterns = getPhoneRegexPatterns(search);
      let matchedIds: string[] = [];

      if (phonePatterns.length > 0) {
        try {
          const orFilter = phonePatterns.flatMap((pattern) => [
            { contactMobilePhone: { $regex: pattern, $options: "i" } },
            { contactPhoneNumbers: { $regex: pattern, $options: "i" } },
          ]);
          const rawResults = await (prisma.lead as any).findRaw({
            filter: {
              $or: orFilter,
            },
            options: {
              projection: { _id: 1 },
            },
          });
          matchedIds = (rawResults as any[]).map((doc) => doc._id?.$oid).filter(Boolean);
        } catch (err) {
          console.error("Raw search error in leads route:", err);
        }
      }

      where.OR = [
        { prospectFullName: { contains: search, mode: "insensitive" } },
        { businessName: { contains: search, mode: "insensitive" } },
        ...(matchedIds.length > 0 ? [{ id: { in: matchedIds } }] : []),
      ];
    }

    // Determine ordering
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

    // Execute queries in parallel
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          uploadBatch: true,
          meetings: true,
        },
      }),
      prisma.lead.count({ where }),
    ]);

    // Fetch unique options for filtering
    const batches = await prisma.uploadBatch.findMany({
      select: { id: true, fileName: true, uploadedAt: true },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      filterOptions: {
        countries: [],
        regions: [],
        industries: [],
        batches,
      },
    });
  } catch (error) {
    console.error("GET leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prospectFullName } = body;

    if (!prospectFullName) {
      return NextResponse.json({ error: "Prospect Full Name is required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        rowNum: body.rowNum,
        prospectFullName,
        prospectJobTitle: body.prospectJobTitle || null,
        prospectLinkedin: body.prospectLinkedin || null,
        businessName: body.businessName || null,
        businessWebsite: body.businessWebsite || null,
        businessNumberOfEmployees: body.businessNumberOfEmployees || null,
        businessYearlyRevenue: body.businessYearlyRevenue || null,
        businessCountry: body.businessCountry || null,
        businessRegion: body.businessRegion || null,
        businessNaicsDescription: body.businessNaicsDescription || null,
        contactProfessionalEmail: body.contactProfessionalEmail || null,
        contactEmails: body.contactEmails || null,
        contactMobilePhone: body.contactMobilePhone || null,
        contactPhoneNumbers: body.contactPhoneNumbers || null,
        prospectId: body.prospectId || null,
        businessId: body.businessId || null,
        status: body.status || "new",
        remark: body.remark || null,
        uploadBatchId: body.uploadBatchId || null,
        originalCreatedAt: body.originalCreatedAt || null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("POST lead error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
