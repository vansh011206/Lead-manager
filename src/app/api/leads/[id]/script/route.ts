import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateColdCallScript } from "@/lib/gemini";

// Disable Next.js route caching to keep API responses fully dynamic
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { searchParams } = new URL(request.url);
    const forceRegenerate = searchParams.get("regenerate") === "true";
    const instructions = searchParams.get("instructions") || undefined;

    // 1. Fetch lead details from database
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // 2. Check if a script is already saved and we don't want to force-regenerate
    if (lead.coldCallScript && !forceRegenerate && !instructions) {
      try {
        const cachedScript = JSON.parse(lead.coldCallScript);
        const hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "";
        
        // Ensure the cached script has the new multi-persona structure (checking for 'owner' property)
        // If it's an old schema single-script, or if it was a demo and we now have a key, we bypass and regenerate.
        const isOldSchema = !cachedScript.owner;
        const shouldBypassCache = cachedScript.isDemo && hasApiKey;

        if (!isOldSchema && !shouldBypassCache) {
          return NextResponse.json(cachedScript);
        }
      } catch (parseError) {
        console.warn("Error parsing cached coldCallScript JSON, will regenerate:", parseError);
      }
    }

    // 3. Generate a new bilingual, multi-persona script
    const generatedScript = await generateColdCallScript(lead, instructions);

    // 4. Cache it back in the database
    await prisma.lead.update({
      where: { id },
      data: {
        coldCallScript: JSON.stringify(generatedScript),
      },
    });

    return NextResponse.json(generatedScript);
  } catch (error: any) {
    console.error("GET cold call script route error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve or generate script" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid script content" }, { status: 400 });
    }

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Save edited script object back to MongoDB
    await prisma.lead.update({
      where: { id },
      data: {
        coldCallScript: JSON.stringify(body),
      },
    });

    return NextResponse.json(body);
  } catch (error: any) {
    console.error("PUT cold call script route error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save script" },
      { status: 500 }
    );
  }
}
