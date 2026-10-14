import type { NextRequest } from "next/server";
import { z } from "zod";
import { sendInvite } from "@/lib/auth/invites";
import { audit, getUser, requireUser } from "@/lib/auth/users";

/** Emails an account a fresh set-password link. Any earlier link stops working. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const user = z.uuid().safeParse(id).success ? await getUser(id) : null;
  if (!user) return Response.json({ error: "No such user." }, { status: 404 });
  const invite = await sendInvite(user, request.nextUrl.origin, result.user.name);
  await audit(result.user.id, "send_invite", user.id, { emailed: invite.emailed });
  return Response.json({ email: user.email, ...invite });
}
