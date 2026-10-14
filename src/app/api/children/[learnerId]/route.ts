import type { NextRequest } from "next/server";
import { z } from "zod";
import { ChildLoginChangeSchema, NewChildLoginSchema } from "@/lib/auth/rules";
import { createChildLogin, removeChildLogin, requireUser, updateChildLogin, type User } from "@/lib/auth/users";

type Context = { params: Promise<{ learnerId: string }> };

/** The signed-in parent (never a child) and the child named in the address. */
async function parentAndChild(
  request: NextRequest,
  { params }: Context,
): Promise<{ parent: User; learnerId: string } | { response: Response }> {
  const result = await requireUser(request);
  if ("response" in result) return result;
  if (result.user.role === "student") return { response: Response.json({ error: "Ask your grown-up to do this." }, { status: 403 }) };
  if (result.user.role === "centre")
    return { response: Response.json({ error: "Manage your students' sign-ins from the Centre page." }, { status: 403 }) };
  const { learnerId } = await params;
  if (!z.uuid().safeParse(learnerId).success) return { response: Response.json({ error: "No such child." }, { status: 404 }) };
  return { parent: result.user, learnerId };
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Check the details and try again.";
}

/** Gives a child their own sign-in. */
export async function POST(request: NextRequest, context: Context) {
  const who = await parentAndChild(request, context);
  if ("response" in who) return who.response;
  const parsed = NewChildLoginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: firstIssue(parsed.error) }, { status: 400 });
  const result = await createChildLogin(who.parent, who.learnerId, parsed.data.username, parsed.data.password);
  return "error" in result ? Response.json({ error: result.error }, { status: result.status }) : Response.json(result);
}

/** Changes a child's username or password. */
export async function PATCH(request: NextRequest, context: Context) {
  const who = await parentAndChild(request, context);
  if ("response" in who) return who.response;
  const parsed = ChildLoginChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: firstIssue(parsed.error) }, { status: 400 });
  const result = await updateChildLogin(who.parent, who.learnerId, parsed.data);
  return "error" in result ? Response.json({ error: result.error }, { status: result.status }) : Response.json(result);
}

/** Removes a child's sign-in; their progress stays on the parent's account. */
export async function DELETE(request: NextRequest, context: Context) {
  const who = await parentAndChild(request, context);
  if ("response" in who) return who.response;
  return (await removeChildLogin(who.parent, who.learnerId))
    ? Response.json({ ok: true })
    : Response.json({ error: "This child doesn't have a sign-in." }, { status: 404 });
}
