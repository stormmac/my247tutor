import type { NextRequest } from "next/server";
import { z } from "zod";
import { addSetWork, canAddSchoolWork, canSeeLearner, canSetWork, listSetWork } from "@/lib/auth/family";
import { SetWorkSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/** Work set for a child, for the child and the grown-ups who can see their work. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learnerId = request.nextUrl.searchParams.get("learner") ?? "";
  if (!z.uuid().safeParse(learnerId).success || !(await canSeeLearner(result.user, learnerId)))
    return Response.json({ error: "No such child." }, { status: 404 });
  return Response.json({
    work: await listSetWork(learnerId, 30, result.user.id),
    canSet: await canSetWork(result.user, learnerId),
    canAddSchool: await canAddSchoolWork(result.user, learnerId),
  });
}

/** A parent, teacher or centre sets work: each subtopic becomes ten questions in the child's weekly lesson. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = SetWorkSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const { learnerId, subject, subtopicIds, note, atSchool } = parsed.data;
  if (!(await (atSchool ? canAddSchoolWork : canSetWork)(result.user, learnerId)))
    return Response.json({ error: "You can't set work for this child." }, { status: 403 });
  const added = await addSetWork(
    result.user,
    learnerId,
    subtopicIds.map((subtopicId) => ({ subject, subtopicId })),
    note || null,
    atSchool,
  );
  if ("error" in added) return Response.json({ error: added.error }, { status: 400 });
  return Response.json(added);
}
