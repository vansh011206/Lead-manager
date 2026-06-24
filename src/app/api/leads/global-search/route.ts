import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPhoneRegexPatterns } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    const phonePatterns = getPhoneRegexPatterns(query);
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
        console.error("Raw global search error:", err);
      }
    }

    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { prospectFullName: { contains: query, mode: "insensitive" } },
          { prospectJobTitle: { contains: query, mode: "insensitive" } },
          { businessName: { contains: query, mode: "insensitive" } },
          { businessWebsite: { contains: query, mode: "insensitive" } },
          { businessCountry: { contains: query, mode: "insensitive" } },
          { businessRegion: { contains: query, mode: "insensitive" } },
          { businessNaicsDescription: { contains: query, mode: "insensitive" } },
          { contactProfessionalEmail: { contains: query, mode: "insensitive" } },
          { contactEmails: { contains: query, mode: "insensitive" } },
          {
            uploadBatch: {
              fileName: { contains: query, mode: "insensitive" }
            }
          },
          ...(matchedIds.length > 0 ? [{ id: { in: matchedIds } }] : []),
        ],
      },
      take: 10,
      select: {
        id: true,
        businessName: true,
        prospectFullName: true,
        status: true,
        contactMobilePhone: true,
        contactPhoneNumbers: true,
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
