import type { NextRequest } from "next/server";
import { NewUserSchema } from "@/lib/auth/rules";
import { sendInvite } from "@/lib/auth/invites";
import { addUser, listUsers, requireUser } from "@/lib/auth/users";
import { emailEnabled } from "@/lib/email";
import { planFor } from "@/lib/billing/access";
import { billingEnabled } from "@/lib/billing/stripe";

export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const users = (await listUsers()).map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    learners: u.learners,
    centreName: u.centreName,
    centreId: u.centreId,
    freeAccess: u.freeAccess,
    plan: planFor(u),
    paidUntil: u.paidUntil,
    trialEndsAt: u.trialEndsAt,
    curriculum: u.curriculum ?? "nsw",
  }));
  return Response.json({ users, me: result.user.id, billing: billingEnabled(), email: emailEnabled() });
}

/** An admin adds an account, and its owner is emailed a link to set their password. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const parsed = NewUserSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const added = await addUser(result.user, parsed.data);
  if ("error" in added) return Response.json({ error: added.error }, { status: 409 });
  const invite = await sendInvite(added.user, request.nextUrl.origin, result.user.name);
  return Response.json({ user: { id: added.user.id, email: added.user.email }, ...invite });
}
