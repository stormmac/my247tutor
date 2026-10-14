import "server-only";

/**
 * Sends email through Resend (resend.com) once RESEND_API_KEY and EMAIL_FROM are set, such as
 * EMAIL_FROM="my247tutor <hello@my247tutor.com>". Until then nothing is sent and callers fall back.
 */
export function emailEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export interface Email {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(email: Email): Promise<{ sent: true } | { sent: false; error: string }> {
  if (!emailEnabled()) return { sent: false, error: "Email isn't set up." };
  try {
    const res = await fetch(`${process.env.EMAIL_API_BASE || "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [email.to], subject: email.subject, text: email.text, html: email.html }),
      cache: "no-store",
    });
    if (res.ok) return { sent: true };
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    return { sent: false, error: body.message?.slice(0, 200) ?? `The email service answered ${res.status}.` };
  } catch {
    return { sent: false, error: "Couldn't reach the email service." };
  }
}
