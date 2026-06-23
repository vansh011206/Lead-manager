import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/scheduler";
import { sseEmitter } from "@/lib/sse";

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

    // Handle optional callback reminder creation
    if (body.reminder && body.reminder.scheduledAt && body.reminder.recipientEmail) {
      const meetingRecord = await prisma.meeting.create({
        data: {
          leadId: id,
          title: `Call Reminder: ${existingLead.prospectFullName}`,
          agenda: body.remark || "Callback reminder",
          scheduledAt: new Date(body.reminder.scheduledAt),
          recipientEmail: body.reminder.recipientEmail,
          emailSent: false,
          reminderSent: false,
        },
      });

      // Send immediate callback reminder confirmation email
      try {
        const scheduledDate = new Date(body.reminder.scheduledAt);
        const formattedDate = scheduledDate.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " (IST)";

        const subject = `📞 Call Reminder Set: "${existingLead.prospectFullName}" — Callback at ${formattedDate}`;
        const html = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #fef3c7; border: 1px solid #fde68a; color: #d97706; font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 9999px; display: inline-block;">
                📞 Call Reminder
              </span>
            </div>
            
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.25;">
              Call reminder set for <span style="color: #0D99FF;">${existingLead.prospectFullName}</span>
            </h2>
            
            <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin: 0 0 24px 0;">
              You have set a call reminder for this lead. Please make sure to call back at the scheduled time.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px; margin-bottom: 24px;">
              <div style="margin-bottom: 12px;">
                <span style="font-size: 10px; font-weight: 855; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Scheduled Call Time</span>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${formattedDate}</span>
              </div>
              <div>
                <span style="font-size: 10px; font-weight: 855; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Remark / Note</span>
                <span style="font-size: 13px; font-weight: 500; color: #334155; white-space: pre-wrap;">${body.remark || "Callback reminder"}</span>
              </div>
            </div>

            <h3 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 12px 0; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Lead Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 35%;">Full Name</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${existingLead.prospectFullName}</td>
              </tr>
              ${existingLead.businessName ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${existingLead.businessName}</td>
              </tr>
              ` : ""}
              ${existingLead.contactMobilePhone || existingLead.contactPhoneNumbers ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${existingLead.contactMobilePhone || existingLead.contactPhoneNumbers}</td>
              </tr>
              ` : ""}
            </table>

            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">Lead Manager App &bull; Call Reminder Service</p>
            </div>
          </div>
        `;

        await sendEmail({ to: [body.reminder.recipientEmail], subject, html });
        console.log(`[API] Immediate call reminder email sent to ${body.reminder.recipientEmail} for lead ${existingLead.prospectFullName}`);
      } catch (emailErr) {
        console.error("[API] Failed to send immediate callback reminder email:", emailErr);
      }
    }

    // Emit real-time synchronization event
    sseEmitter.emit("lead-update", {
      id,
      action: "update",
      status: updatedLead.status,
      remark: updatedLead.remark,
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

    // Emit real-time synchronization event
    sseEmitter.emit("lead-update", {
      id,
      action: "delete",
    });

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("DELETE lead error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
