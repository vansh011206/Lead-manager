import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { uploadBatch: true, meetings: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("GET lead detail error:", error);
    return NextResponse.json({ error: "Failed to fetch lead details" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Update fields (status, remark, etc)
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: body.status !== undefined ? body.status : existingLead.status,
        remark: body.remark !== undefined ? body.remark : existingLead.remark,
        prospectFullName: body.prospectFullName !== undefined ? body.prospectFullName : existingLead.prospectFullName,
        prospectJobTitle: body.prospectJobTitle !== undefined ? body.prospectJobTitle : existingLead.prospectJobTitle,
        prospectLinkedin: body.prospectLinkedin !== undefined ? body.prospectLinkedin : existingLead.prospectLinkedin,
        businessName: body.businessName !== undefined ? body.businessName : existingLead.businessName,
        businessWebsite: body.businessWebsite !== undefined ? body.businessWebsite : existingLead.businessWebsite,
        businessNumberOfEmployees: body.businessNumberOfEmployees !== undefined ? body.businessNumberOfEmployees : existingLead.businessNumberOfEmployees,
        businessYearlyRevenue: body.businessYearlyRevenue !== undefined ? body.businessYearlyRevenue : existingLead.businessYearlyRevenue,
        businessCountry: body.businessCountry !== undefined ? body.businessCountry : existingLead.businessCountry,
        businessRegion: body.businessRegion !== undefined ? body.businessRegion : existingLead.businessRegion,
        businessNaicsDescription: body.businessNaicsDescription !== undefined ? body.businessNaicsDescription : existingLead.businessNaicsDescription,
        contactProfessionalEmail: body.contactProfessionalEmail !== undefined ? body.contactProfessionalEmail : existingLead.contactProfessionalEmail,
        contactEmails: body.contactEmails !== undefined ? body.contactEmails : existingLead.contactEmails,
        contactMobilePhone: body.contactMobilePhone !== undefined ? body.contactMobilePhone : existingLead.contactMobilePhone,
        contactPhoneNumbers: body.contactPhoneNumbers !== undefined ? body.contactPhoneNumbers : existingLead.contactPhoneNumbers,
      },
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("PUT lead error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("DELETE lead error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
