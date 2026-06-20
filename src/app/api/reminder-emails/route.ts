import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const emails: string[] = [];
  if (process.env.EMAIL_TO_1) emails.push(process.env.EMAIL_TO_1);
  if (process.env.EMAIL_TO_2) emails.push(process.env.EMAIL_TO_2);
  
  const defaultEmails = ["vanshajs111@gmail.com", "anujdubey200516@gmail.com"];
  for (const email of defaultEmails) {
    if (!emails.includes(email)) {
      emails.push(email);
    }
  }

  return NextResponse.json(emails);
}
