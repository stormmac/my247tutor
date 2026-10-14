import type { YearLevel } from "../curriculum/types";
import type { LearnerProfile } from "./model";
import { subjectLevel, type Standing } from "./report";

/** One line of a class list: how a student is going, at a glance. */
export interface StudentSummary {
  questionsThisWeek: number;
  /** Correct first try this week, as a percentage, or null with no questions. */
  correctThisWeek: number | null;
  /** When they last answered a question (milliseconds), or null if never. */
  lastPractisedAt: number | null;
  maths: { workingAtYear: YearLevel; standing: Standing };
  english: { workingAtYear: YearLevel; standing: Standing };
}

export function summarise(profile: LearnerProfile, now = Date.now()): StudentSummary {
  const history = Array.isArray(profile.history) ? profile.history : [];
  const week = history.filter((h) => h.at >= now - 7 * 86_400_000);
  const level = (subject: "maths" | "english") => {
    const { workingAtYear, standing } = subjectLevel(profile, subject);
    return { workingAtYear, standing };
  };
  return {
    questionsThisWeek: week.length,
    correctThisWeek: week.length ? Math.round((week.filter((h) => h.correct).length / week.length) * 100) : null,
    lastPractisedAt: history.length ? Math.max(...history.map((h) => h.at)) : null,
    maths: level("maths"),
    english: level("english"),
  };
}
