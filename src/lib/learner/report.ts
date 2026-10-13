import { skillsFor } from "../curriculum/skills";
import type { Skill, Subject, YearLevel } from "../curriculum/types";
import { MASTERY_THRESHOLD, pickNextSkill, recentAccuracy, skillState, type LearnerProfile, type NextReason } from "./model";

/** How well the student can do one skill, in words a parent understands. */
export type Competency = "not started" | "beginning" | "developing" | "competent" | "mastered";

export const COMPETENCY_LABELS: Record<Competency, string> = {
  "not started": "Not started",
  beginning: "Beginning",
  developing: "Developing",
  competent: "Competent",
  mastered: "Mastered",
};

export function competency(profile: LearnerProfile, skill: Skill): Competency {
  if (skill.practice === "writing") {
    // Writing is judged by the latest piece's criteria rather than by right and wrong answers.
    const latest = profile.writing.filter((w) => w.skillId === skill.id).at(-1);
    if (!latest) return "not started";
    const levels = Object.values(latest.levels);
    if (levels.length && levels.every((l) => l === "secure")) return "competent";
    return levels.includes("beginning") ? "beginning" : "developing";
  }
  const st = skillState(profile, skill.id);
  if (st.mastered) return "mastered";
  if (st.attempts === 0) return "not started";
  if (st.mastery >= MASTERY_THRESHOLD) return "competent";
  return st.mastery >= 0.5 ? "developing" : "beginning";
}

/** Fraction of a skill counted towards the student's place in the curriculum. */
const CREDIT: Record<Competency, number> = { "not started": 0, beginning: 0, developing: 0.5, competent: 0.75, mastered: 1 };

export type Standing = "ahead" | "on track" | "needs support" | "not enough evidence";

export interface SubjectLevel {
  /** The school year the student is working at, by what they have shown so far. */
  workingAtYear: YearLevel;
  /** True when the student has shown everything up to the end of Year 6. */
  beyondYear6: boolean;
  standing: Standing;
  stages: { stage: 2 | 3; secure: number; total: number }[];
}

/**
 * Where the student sits in the Years 3–6 curriculum for one subject. Stage 2 covers Years 3–4
 * and Stage 3 covers Years 5–6, so each half of a stage stands for roughly one school year.
 * This is an estimate from practice in the app, not a school assessment.
 */
export function subjectLevel(profile: LearnerProfile, subject: Subject): SubjectLevel {
  const skills = skillsFor(subject);
  const stages = ([2, 3] as const).map((stage) => {
    const inStage = skills.filter((s) => s.stage === stage);
    const credit = inStage.reduce((sum, s) => sum + CREDIT[competency(profile, s)], 0);
    return {
      stage,
      fraction: inStage.length ? credit / inStage.length : 0,
      secure: inStage.filter((s) => ["competent", "mastered"].includes(competency(profile, s))).length,
      total: inStage.length,
    };
  });
  // 0 = start of Year 3, 1 = start of Year 5, 2 = end of Year 6. Stage 3 only counts once Stage 2 is well under way.
  const position = stages[0].fraction + (stages[0].fraction >= 0.5 ? stages[1].fraction : 0);
  const workingAtYear = Math.min(6, 3 + Math.floor(position * 2)) as YearLevel;
  const expected = (profile.yearLevel - 3) / 2;

  const attempts = profile.history.filter((h) => skills.some((s) => s.id === h.skillId)).length;
  const evidence = profile.placementDone[subject] || attempts >= 10 || profile.writing.some((w) => skills.some((s) => s.id === w.skillId));
  const standing: Standing = !evidence
    ? "not enough evidence"
    : position >= expected + 0.5
      ? "ahead"
      : position >= expected - 0.25
        ? "on track"
        : "needs support";

  return {
    workingAtYear,
    beyondYear6: position >= 2,
    standing,
    stages: stages.map(({ stage, secure, total }) => ({ stage, secure, total })),
  };
}

export interface PlanStep {
  skill: Skill;
  reason: NextReason | "support";
  /** Why this step is in the plan, written for a parent. */
  why: string;
}

const WHY: Record<PlanStep["reason"], string> = {
  review: "Mastered before. A quick check keeps it from slipping.",
  continue: "Already under way. A little more practice should secure it.",
  new: "Ready to start: everything it builds on is in place.",
  stretch: "Next year's work, as the work for this year is done.",
  revise: "Everything is mastered, so this keeps it fresh.",
  support: "Practised a lot with mixed results. Working through it together with hints or Suni will help.",
};

/**
 * The recommended next steps in a subject, in order: skills that are struggling, then what the
 * practice page would choose, as if each step were finished in turn.
 */
export function recommendedPlan(profile: LearnerProfile, subject: Subject, steps = 4, now = Date.now()): PlanStep[] {
  const plan: PlanStep[] = [];
  const add = (skill: Skill, reason: PlanStep["reason"]) => {
    // A writing task with a piece already written is under way, not new.
    if (reason === "new" && skill.practice === "writing" && competency(profile, skill) !== "not started") reason = "continue";
    if (plan.length < steps && !plan.some((p) => p.skill.id === skill.id)) plan.push({ skill, reason, why: WHY[reason] });
  };

  // Skills practised a fair bit that are still not going well.
  skillsFor(subject)
    .filter((s) => {
      const st = skillState(profile, s.id);
      const accuracy = recentAccuracy(profile, s.id);
      return !st.mastered && st.attempts >= 5 && accuracy !== null && accuracy < 0.5;
    })
    .slice(0, 2)
    .forEach((s) => add(s, "support"));

  // Then follow the practice page's own choices, pretending each one is mastered to see what comes after it.
  let sim: LearnerProfile = profile;
  let reviewsDue = 0;
  for (let i = 0; i < steps * 2 && plan.length < steps; i++) {
    const next = pickNextSkill(sim, subject, now, { includeWriting: true });
    if (!next) break;
    // One review step is enough; the practice page slips the other reviews in as it goes.
    if (next.reason !== "review" || !plan.some((p) => p.reason === "review")) add(next.skill, next.reason);
    else reviewsDue++;
    const st = skillState(sim, next.skill.id);
    sim = {
      ...sim,
      skills: { ...sim.skills, [next.skill.id]: { ...st, mastered: true, mastery: 1, nextReview: now + 365 * 86_400_000 } },
      writing:
        next.skill.practice === "writing"
          ? [...sim.writing, { skillId: next.skill.id, at: now, summary: "", levels: { all: "secure" } }]
          : sim.writing,
    };
  }
  const review = plan.find((p) => p.reason === "review");
  if (review && reviewsDue) {
    review.why += ` ${reviewsDue === 1 ? "One other skill is" : `${reviewsDue} other skills are`} also due a quick check.`;
  }
  return plan;
}
