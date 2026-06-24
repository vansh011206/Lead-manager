import nodemailer from "nodemailer";
import { prisma } from "./prisma";

// Create transporter
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[Transporter] SMTP settings are incomplete. Emails might not be sent. Please configure .env file.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (like 587)
    auth: {
      user,
      pass,
    },
  });
};

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.error("[Transporter] SMTP Transporter not configured. Skipping email send.");
    return false;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: to.join(", "),
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[Transporter] Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Transporter] Error sending email:", error);
    return false;
  }
}

export function getRecipientEmails(): string[] {
  const recipients: string[] = [];
  if (process.env.EMAIL_TO_1) recipients.push(process.env.EMAIL_TO_1);
  if (process.env.EMAIL_TO_2) recipients.push(process.env.EMAIL_TO_2);
  return recipients.length > 0 ? recipients : ["your-email@gmail.com"];
}

export async function checkAndSendReminders() {
  try {
    const now = new Date();
    // 30 minutes from now for standard meetings
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    // 1 hour ago (to prevent sending stale reminders if the server was offline)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const meetings = await prisma.meeting.findMany({
      where: {
        scheduledAt: {
          gte: oneHourAgo,
          lte: thirtyMinutesFromNow,
        },
        reminderSent: false,
      },
      include: {
        lead: true,
      },
    });

    if (meetings.length === 0) return;

    console.log(`[Scheduler] Found ${meetings.length} meeting(s)/reminder(s) in active window.`);

    for (const meeting of meetings) {
      const scheduledTime = new Date(meeting.scheduledAt).getTime();
      const nowTime = now.getTime();

      // Case A: This is a custom Call Reminder (10 minutes before)
      if (meeting.recipientEmail) {
        const tenMinWindow = scheduledTime - 10 * 60 * 1000;
        if (nowTime < tenMinWindow) {
          // Too early to send this 10-min callback reminder
          continue;
        }

        console.log(`[Scheduler] Sending 10-minute callback reminder to ${meeting.recipientEmail} for lead ${meeting.lead.prospectFullName}`);

        const recipients = meeting.recipientEmail.split(",").map(e => e.trim()).filter(Boolean);
        
        const formattedDate = new Date(meeting.scheduledAt).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " (IST)";

        const subject = `⚠️ Call Reminder: Call back "${meeting.lead.prospectFullName}" in 10 minutes!`;
        
        const html = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #fef3c7; border: 1px solid #fde68a; color: #d97706; font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 9999px; display: inline-block;">
                Call Reminder
              </span>
            </div>
            
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.25;">
              Call back <span style="color: #0D99FF;">${meeting.lead.prospectFullName}</span> in 10 minutes
            </h2>
            
            <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin: 0 0 24px 0;">
              This is a reminder to call back this prospect. The scheduled call time is approaching. Here are the details:
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px; margin-bottom: 24px;">
              <div style="margin-bottom: 12px;">
                <span style="font-size: 10px; font-weight: 855; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Scheduled Call Time</span>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${formattedDate}</span>
              </div>
              <div>
                <span style="font-size: 10px; font-weight: 855; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Remark / Note</span>
                <span style="font-size: 13px; font-weight: 500; color: #334155; white-space: pre-wrap;">${meeting.agenda}</span>
              </div>
            </div>

            <h3 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 12px 0; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Lead Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 35%;">Full Name</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${meeting.lead.prospectFullName}</td>
              </tr>
              ${meeting.lead.businessName ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${meeting.lead.businessName}</td>
              </tr>
              ` : ""}
              ${meeting.lead.contactMobilePhone || meeting.lead.contactPhoneNumbers ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${meeting.lead.contactMobilePhone || meeting.lead.contactPhoneNumbers}</td>
              </tr>
              ` : ""}
            </table>

            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">Lead Manager App &bull; Call Reminder Service</p>
            </div>
          </div>
        `;

        const success = await sendEmail({ to: recipients, subject, html });
        if (success) {
          await prisma.meeting.update({
            where: { id: meeting.id },
            data: { reminderSent: true },
          });
        }

      } else {
        // Case B: This is a standard meeting reminder (30 minutes before)
        const thirtyMinWindow = scheduledTime - 30 * 60 * 1000;
        if (nowTime < thirtyMinWindow) {
          // Too early to send standard 30-min reminder
          continue;
        }

        console.log(`[Scheduler] Sending standard 30-minute reminder for meeting: ${meeting.title}`);

        const recipients = getRecipientEmails();
        
        const formattedDate = new Date(meeting.scheduledAt).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " (IST)";

        const subject = `⚠️ Reminder: Meeting "${meeting.title}" starting in 30 minutes!`;
        
        const html = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #fef3c7; border: 1px solid #fde68a; color: #d97706; font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 9999px; display: inline-block;">
                30-Minute Reminder
              </span>
            </div>
            
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.25;">
              Your meeting with <span style="color: #0D99FF;">${meeting.lead.prospectFullName}</span> is starting soon
            </h2>
            
            <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin: 0 0 24px 0;">
              This is a reminder that your scheduled meeting is starting in 30 minutes. Here are the meeting details:
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px; margin-bottom: 24px;">
              <div style="margin-bottom: 12px;">
                <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Meeting Title</span>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${meeting.title}</span>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Scheduled Time</span>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${formattedDate}</span>
              </div>
              ${meeting.agenda ? `
              <div>
                <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Agenda / Notes</span>
                <span style="font-size: 13px; font-weight: 500; color: #334155; white-space: pre-wrap;">${meeting.agenda}</span>
              </div>
              ` : ""}
            </div>

            <h3 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 12px 0; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Lead Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 35%;">Full Name</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${meeting.lead.prospectFullName}</td>
              </tr>
              ${meeting.lead.businessName ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${meeting.lead.businessName}</td>
              </tr>
              ` : ""}
              ${meeting.lead.prospectJobTitle ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Job Title</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${meeting.lead.prospectJobTitle}</td>
              </tr>
              ` : ""}
              ${meeting.lead.contactProfessionalEmail ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email</td>
                <td style="padding: 8px 0; color: #0D99FF; font-weight: 600;"><a href="mailto:${meeting.lead.contactProfessionalEmail}" style="color: #0D99FF; text-decoration: none;">${meeting.lead.contactProfessionalEmail}</a></td>
              </tr>
              ` : ""}
              ${meeting.lead.contactMobilePhone || meeting.lead.contactPhoneNumbers ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${meeting.lead.contactMobilePhone || meeting.lead.contactPhoneNumbers}</td>
              </tr>
              ` : ""}
            </table>

            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">Lead Manager App &bull; Auto-reminder Scheduler</p>
            </div>
          </div>
        `;

        const success = await sendEmail({ to: recipients, subject, html });
        if (success) {
          await prisma.meeting.update({
            where: { id: meeting.id },
            data: { reminderSent: true },
          });
        }
      }
    }
  } catch (error) {
    console.error("[Scheduler] Error checking and sending reminders:", error);
  }
}

export async function sendImmediateMeetingEmail(meeting: any, lead: any) {
  const recipients = getRecipientEmails();
  
  const formattedDate = new Date(meeting.scheduledAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }) + " (IST)";

  const subject = `📅 Meeting Scheduled: "${meeting.title}" with ${lead.prospectFullName}`;
  
  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="margin-bottom: 20px;">
        <span style="background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #059669; font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 9999px; display: inline-block;">
          Meeting Confirmed
        </span>
      </div>
      
      <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.25;">
        New meeting scheduled with <span style="color: #0D99FF;">${lead.prospectFullName}</span>
      </h2>
      
      <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin: 0 0 24px 0;">
        A new meeting has been successfully scheduled. Here are the meeting details:
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px; margin-bottom: 24px;">
        <div style="margin-bottom: 12px;">
          <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Meeting Title</span>
          <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${meeting.title}</span>
        </div>
        <div style="margin-bottom: 12px;">
          <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Scheduled Time</span>
          <span style="font-size: 14px; font-weight: 700; color: #0f172a;">${formattedDate}</span>
        </div>
        ${meeting.agenda ? `
        <div>
          <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; letter-spacing: 0.05em;">Agenda / Notes</span>
          <span style="font-size: 13px; font-weight: 500; color: #334155; white-space: pre-wrap;">${meeting.agenda}</span>
        </div>
        ` : ""}
      </div>

      <h3 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 12px 0; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Lead Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 35%;">Full Name</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${lead.prospectFullName}</td>
        </tr>
        ${lead.businessName ? `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${lead.businessName}</td>
        </tr>
        ` : ""}
        ${lead.prospectJobTitle ? `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Job Title</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${lead.prospectJobTitle}</td>
        </tr>
        ` : ""}
        ${lead.contactProfessionalEmail ? `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email</td>
          <td style="padding: 8px 0; color: #0D99FF; font-weight: 600;"><a href="mailto:${lead.contactProfessionalEmail}" style="color: #0D99FF; text-decoration: none;">${lead.contactProfessionalEmail}</a></td>
        </tr>
        ` : ""}
        ${lead.contactMobilePhone || lead.contactPhoneNumbers ? `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${lead.contactMobilePhone || lead.contactPhoneNumbers}</td>
        </tr>
        ` : ""}
      </table>

      <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">Lead Manager App &bull; Confirmation Service</p>
      </div>
    </div>
  `;

  return sendEmail({ to: recipients, subject, html });
}

// Global reference for Next.js hot reload safety
const globalForScheduler = global as unknown as {
  schedulerStarted?: boolean;
  intervalId?: NodeJS.Timeout;
};

export function startReminderScheduler() {
  if (globalForScheduler.intervalId) {
    clearInterval(globalForScheduler.intervalId);
  }

  console.log("[Scheduler] Initializing background reminder scheduler (15 seconds polling interval)...");

  // Run check immediately on startup
  checkAndSendReminders();

  // Schedule to run every 15 seconds
  globalForScheduler.intervalId = setInterval(() => {
    console.log("[Scheduler] Polling database for upcoming meetings...");
    checkAndSendReminders();
  }, 15 * 1000);
}
