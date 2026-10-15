import { after, type NextRequest } from "next/server";
import { z } from "zod";
import { emailEnabled } from "@/lib/email";
import { sendPasswordReset } from "@/lib/auth/invites";
import { EmailSchema } from "@/lib/auth/rules";
import { accountsEnabled } from "@/lib/auth/session";

const ForgotSchema = z.object({ email: EmailSchema });

/** "Forgot password?": emails a reset link. Answers the same whether or not the email has an account. */
export async function POST(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on." }, { status: 404 });
  if (!emailEnabled())
    return Response.json(
      { error: "Password reset emails aren't set up yet. Please contact my247tutor to reset your password." },
      { status: 503 },
    );
  const parsed = ForgotSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Enter your email." }, { status: 400 });
  // Sent after answering, so how long the answer takes doesn't show whether the account exists.
  const origin = request.nextUrl.origin;
  after(() => sendPasswordReset(parsed.data.email, origin).catch((e) => console.error("Password reset failed:", e)));
  return Response.json({ ok: true });
}
