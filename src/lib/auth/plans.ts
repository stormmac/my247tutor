import "server-only";
import type { LearningPlan, PlanSession, PlanSubjects } from "@/lib/learner/plan";
import { listClasses } from "./centres";
import { ready } from "./db";
import { canSetWork } from "./family";
import { CHILD_PLAN } from "./learners";
import { audit, type User } from "./users";

/** A child's plan, and the teachers' sessions it could use: their centre's classes that have a teacher and a time. */
export interface PlanChoices {
  name: string;
  plan: LearningPlan;
  sessions: PlanSession[];
}

/** The plan for a child, for anyone who can set their work (an admin, their parent or centre, or their teacher). */
export async function planChoices(viewer: User, learnerId: string): Promise<PlanChoices | null> {
  if (!(await canSetWork(viewer, learnerId))) return null;
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.name, l.parent_id, o.role AS owner_role, ${CHILD_PLAN} AS plan
     FROM learners l JOIN users o ON o.id = l.parent_id WHERE l.id = $1`,
    [learnerId],
  );
  if (!rows[0]) return null;
  const plan = rows[0].plan as LearningPlan;
  // Only a centre has teachers. A teacher picks from their own classes, keeping the one the child is in now.
  const classes = rows[0].owner_role === "centre" ? await listClasses(rows[0].parent_id as string) : [];
  const sessions = classes
    .filter((c) => c.teacherId && c.times.length && (viewer.role !== "teacher" || c.teacherId === viewer.id || c.id === plan.session?.id))
    .map((c) => ({ id: c.id, name: c.name, teacherName: c.teacherName, times: c.times }));
  return { name: rows[0].name as string, plan, sessions };
}

/**
 * Sets which subjects a child does, and the teacher's session they're in (null to learn on their own).
 * A session must be one of the choices, so a child only learns with a teacher once a session is set up.
 * The child joins that class too, so the teacher sees them.
 */
export async function setPlan(
  viewer: User,
  learnerId: string,
  subjects: PlanSubjects,
  sessionId: string | null,
): Promise<{ plan: LearningPlan } | { error: string; status: number }> {
  const choices = await planChoices(viewer, learnerId);
  if (!choices) return { error: "You can't change this child's plan.", status: 403 };
  if (sessionId && !choices.sessions.some((s) => s.id === sessionId))
    return { error: "Choose one of the teacher's sessions.", status: 400 };
  const client = await (await ready()).connect();
  try {
    await client.query("BEGIN");
    await client.query(`UPDATE learners SET subjects = $2, session_class_id = $3, updated_at = NOW() WHERE id = $1`, [
      learnerId,
      subjects,
      sessionId,
    ]);
    if (sessionId)
      await client.query(`INSERT INTO class_enrolments (class_id, learner_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [
        sessionId,
        learnerId,
      ]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
  await audit(viewer.id, "set_plan", learnerId, { subjects, sessionId });
  return { plan: { subjects, session: choices.sessions.find((s) => s.id === sessionId) ?? null } };
}
