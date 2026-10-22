import { WEEKDAYS } from "../auth/rules";
import type { Subject } from "../curriculum/types";

export const PLAN_SUBJECTS = ["maths", "english", "both"] as const;
export type PlanSubjects = (typeof PLAN_SUBJECTS)[number];

/** A teacher's weekly session: one of a centre's classes, with its teacher and when it meets. */
export interface PlanSession {
  id: string;
  name: string;
  teacherName: string | null;
  times: { weekday: number; start: string; minutes: number }[];
}

/** Which subjects a child does, and the teacher's session they're in. No session means they learn on their own. */
export interface LearningPlan {
  subjects: PlanSubjects;
  session: PlanSession | null;
}

/** Whether a child's plan includes a subject. No plan means both. */
export function doesSubject(plan: LearningPlan | undefined, subject: Subject): boolean {
  return !plan || plan.subjects === "both" || plan.subjects === subject;
}

/** "Maths", "English" or "Maths and English". */
export function subjectsName(subjects: PlanSubjects): string {
  return subjects === "both" ? "Maths and English" : subjects === "maths" ? "Maths" : "English";
}

/** When a session meets, like "Tuesday 4:30pm (60 min), Thursday 4:30pm (60 min)". */
export function sessionTimes(session: PlanSession): string {
  return session.times
    .map((t) => {
      const [h, m] = t.start.split(":").map(Number);
      const time = `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
      return `${WEEKDAYS[t.weekday - 1]} ${time} (${t.minutes} min)`;
    })
    .join(", ");
}
