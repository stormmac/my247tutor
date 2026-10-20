import type { NextRequest } from "next/server";
import { z } from "zod";
import { inviteParent } from "@/lib/auth/family";
import { NewParentSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/**
 * A centre links a parent to one of its students, so the parent sees how they're going. A parent
 * without an account is emailed a link to set a password; the centre pays, so they don't.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return Response.json({ error: "No such student." }, { status: 404 });
  const parsed = NewParentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const invite = await inviteParent(result.user, id, parsed.data, request.nextUrl.origin);
  if ("error" in invite) return Response.json({ error: invite.error }, { status: invite.status });
  return Response.json(invite);
}
