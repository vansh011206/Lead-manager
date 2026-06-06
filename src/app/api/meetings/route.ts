import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendImmediateMeetingEmail } from "@/lib/scheduler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, title, agenda, scheduledAt } = body;

    if (!leadId || !title || !scheduledAt) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, title, and scheduledAt are required." },
        { status: 400 }
      );
    }

    // Check if the lead exists
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Save meeting to MongoDB
    const meeting = await prisma.meeting.create({
      data: {
        leadId,
        title,
        agenda: agenda || null,
        scheduledAt: new Date(scheduledAt),
        emailSent: false,
        reminderSent: false,
      },
    });

    // Send immediate confirmation email
    console.log(`[Meetings API] Triggering immediate confirmation email to recipients for: ${meeting.title}`);
    const emailSent = await sendImmediateMeetingEmail(meeting, lead);

    // Update meeting's emailSent flag if successful
    let finalMeeting = meeting;
    if (emailSent) {
      finalMeeting = await prisma.meeting.update({
        where: { id: meeting.id },
        data: { emailSent: true },
      });
    }

    return NextResponse.json(finalMeeting, { status: 201 });
  } catch (error: any) {
    console.error("[Meetings API] Error creating meeting:", error);
    return NextResponse.json({ error: error.message || "Failed to schedule meeting" }, { status: 500 });
  }
}
