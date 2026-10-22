import type { NextRequest } from "next/server";
import { z } from "zod";
import { planChoices, setPlan } from "@/lib/auth/plans";
import { requireUser } from "@/lib/auth/users";
import { PLAN_SUBJECTS } from "@/lib/learner/plan";

/** A child's learning plan and the sessions it could use, for the grown-ups who can set their work. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learnerId = request.nextUrl.searchParams.get("learner") ?? "";
  const choices = z.uuid().safeParse(learnerId).success ? await planChoices(result.user, learnerId) : null;
  if (!choices) return Response.json({ error: "No such child." }, { status: 404 });
  return Response.json(choices);
}

const PlanSchema = z.object({
  learnerId: z.uuid(),
  subjects: z.enum(PLAN_SUBJECTS),
  sessionId: z.uuid().nullable(),
});

/** Sets which subjects a child does, and whether they learn with a teacher's session or on their own. */
export async function PUT(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = PlanSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Check the plan." }, { status: 400 });
  const { learnerId, subjects, sessionId } = parsed.data;
  const saved = await setPlan(result.user, learnerId, subjects, sessionId);
  if ("error" in saved) return Response.json({ error: saved.error }, { status: saved.status });
  return Response.json(saved);
}
