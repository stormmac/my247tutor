import type { NextRequest } from "next/server";
import { planMistakesHomework, plannerWeek, planSlot } from "@/lib/auth/planner";
import { PlanWorkSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";
import { weekOf } from "@/lib/learner/lesson";

const WeekSchema = PlanWorkSchema.options[0].shape.week;

/** The lesson planner for a week: the teacher's classes, their students, and each one's work. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const week = request.nextUrl.searchParams.get("week") ?? weekOf();
  if (!WeekSchema.safeParse(week).success) return Response.json({ error: "Pick the Monday of the week." }, { status: 400 });
  const classes = await plannerWeek(result.user, week);
  if (!classes) return Response.json({ error: "The lesson planner is for teachers and tutoring centres." }, { status: 403 });
  return Response.json({ week, classes });
}

/** Puts an activity in a session box, or plans homework redoing the questions got wrong, for students in a session. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = PlanWorkSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const plan = parsed.data;
  const added =
    plan.kind === "slot"
      ? await planSlot(result.user, { ...plan, note: plan.note || null })
      : await planMistakesHomework(result.user, { ...plan, note: plan.note || null });
  if ("error" in added) return Response.json({ error: added.error }, { status: added.status });
  return Response.json(added);
}
