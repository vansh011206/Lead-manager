import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Verify batch exists
    const batch = await prisma.uploadBatch.findUnique({
      where: { id },
    });

    if (!batch) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }

    // Delete all leads associated with this batch first (MongoDB doesn't support native cascade)
    await prisma.lead.deleteMany({
      where: { uploadBatchId: id },
    });

    // Then delete the batch itself
    await prisma.uploadBatch.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Dataset batch deleted successfully" });
  } catch (error) {
    console.error("DELETE batch error:", error);
    return NextResponse.json({ error: "Failed to delete dataset batch" }, { status: 500 });
  }
}
