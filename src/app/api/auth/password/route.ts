import type { NextRequest } from "next/server";
import { z } from "zod";
import { PasswordSchema } from "@/lib/auth/rules";
import { changePassword, requireUser } from "@/lib/auth/users";

const ChangeSchema = z.object({ current: z.string().min(1).max(200), next: PasswordSchema });

export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = ChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check your details." }, { status: 400 });
  if (!(await changePassword(result.user, parsed.data.current, parsed.data.next))) {
    return Response.json({ error: "Your current password isn't right." }, { status: 400 });
  }
  return Response.json({ ok: true });
}
