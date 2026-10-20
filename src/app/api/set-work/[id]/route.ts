import type { NextRequest } from "next/server";
import { z } from "zod";
import { canAddSchoolWork, canSeeLearner, canSetWork, finishSetWork, removeSetWork } from "@/lib/auth/family";
import { FinishWorkSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/** The child finished a piece of set work: how many they got right first go. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { id } = await params;
  const parsed = FinishWorkSchema.safeParse(await request.json().catch(() => null));
  if (!z.uuid().safeParse(id).success || !parsed.success) return Response.json({ error: "Check the details." }, { status: 400 });
  const { learnerId, right, total } = parsed.data;
  // Whoever is doing the child's lessons: the child, or the parent whose browser they learn on.
  if (result.user.role !== "student" && result.user.role !== "parent" && result.user.role !== "admin")
    return Response.json({ error: "Only the child's own lessons can finish their work." }, { status: 403 });
  if (!(await canSeeLearner(result.user, learnerId))) return Response.json({ error: "No such child." }, { status: 404 });
  await finishSetWork(learnerId, id, Math.min(right, total), total);
  return Response.json({ ok: true });
}

/** Takes back a piece of work the child hasn't done yet. */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { id } = await params;
  const learnerId = request.nextUrl.searchParams.get("learner") ?? "";
  if (!z.uuid().safeParse(id).success || !z.uuid().safeParse(learnerId).success)
    return Response.json({ error: "No such work." }, { status: 404 });
  // Whoever sets work can take any of it back; a parent linked through a centre, only the school topics they added.
  const all = await canSetWork(result.user, learnerId);
  if (!all && !(await canAddSchoolWork(result.user, learnerId))) return Response.json({ error: "No such work." }, { status: 404 });
  return (await removeSetWork(learnerId, id, all ? undefined : result.user.id))
    ? Response.json({ ok: true })
    : Response.json({ error: "No such work." }, { status: 404 });
}
