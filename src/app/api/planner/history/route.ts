import type { NextRequest } from "next/server";
import { z } from "zod";
import { studentHistory } from "@/lib/auth/planner";
import { PlanWorkSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

const WeekSchema = PlanWorkSchema.options[0].shape.week;

/** A student's last four weeks of planned and set work, with scores, for the planner's pop-up. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learnerId = request.nextUrl.searchParams.get("learner") ?? "";
  const week = request.nextUrl.searchParams.get("week") ?? "";
  if (!z.uuid().safeParse(learnerId).success || !WeekSchema.safeParse(week).success)
    return Response.json({ error: "Check the details." }, { status: 400 });
  const weeks = await studentHistory(result.user, learnerId, week);
  if (!weeks) return Response.json({ error: "No such student." }, { status: 404 });
  return Response.json({ weeks });
}
