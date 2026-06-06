import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { ids, status, remark } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No lead IDs provided" }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json({ error: "No status provided" }, { status: 400 });
    }

    // Bulk update leads in MongoDB
    await prisma.lead.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        status,
        remark: remark !== undefined ? remark : null,
      },
    });

    return NextResponse.json({ message: "Leads updated successfully" });
  } catch (error: any) {
    console.error("[Bulk API] PUT error:", error);
    return NextResponse.json({ error: error.message || "Failed to bulk update leads" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No lead IDs provided" }, { status: 400 });
    }

    // Bulk delete leads from MongoDB
    await prisma.lead.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: "Leads deleted successfully" });
  } catch (error: any) {
    console.error("[Bulk API] DELETE error:", error);
    return NextResponse.json({ error: error.message || "Failed to bulk delete leads" }, { status: 500 });
  }
}
