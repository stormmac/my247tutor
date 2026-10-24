import type { NextRequest } from "next/server";
import { z } from "zod";
import { planActivities, planMistakesHomework, plannerWeek, setHomework } from "@/lib/auth/planner";
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

/** Plans activities, or homework redoing the questions got wrong, for students in a session. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = PlanWorkSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const plan = parsed.data;
  const added =
    plan.kind === "topic"
      ? await planActivities(result.user, { ...plan, note: plan.note || null })
      : await planMistakesHomework(result.user, { ...plan, note: plan.note || null });
  if ("error" in added) return Response.json({ error: added.error }, { status: added.status });
  return Response.json(added);
}

const HomeworkSchema = z.object({ id: z.uuid(), homework: z.boolean() });

/** Makes a planned activity homework, or not. */
export async function PATCH(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = HomeworkSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Check the details." }, { status: 400 });
  return (await setHomework(result.user, parsed.data.id, parsed.data.homework))
    ? Response.json({ ok: true })
    : Response.json({ error: "No such activity." }, { status: 404 });
}
