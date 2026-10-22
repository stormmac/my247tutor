import { SKILLS, getSkill, skillsFor } from "../curriculum/skills";
import type { Skill, Stage, Subject, YearLevel } from "../curriculum/types";
import { yearToStage } from "../curriculum/types";
import type { Curriculum } from "../curriculum/curricula";
import type { AssessmentRecord } from "./assessment";
import type { ReadingProgress } from "../phonics/progress";
import type { TablesRecord } from "../tables/game";
import type { WeeklyLesson } from "./lesson";
import type { WorkProgram } from "./program";
import type { LearningPlan } from "./plan";

export interface SkillState {
  /** Estimated probability the student can do this skill unaided, 0–1. */
  mastery: number;
  attempts: number;
  correct: number;
  /** Consecutive correct answers without hints. */
  streak: number;
  mastered: boolean;
  /** True when mastery came from the placement check rather than practice. */
  placed?: boolean;
  lastPracticed?: number;
  /** Spaced review: when a mastered skill should next be checked. */
  nextReview?: number;
  reviewIntervalDays?: number;
}

export interface AttemptRecord {
  skillId: string;
  at: number;
  /** Right on the first try. */
  correct: boolean;
  hintsUsed: number;
  /** What was asked and what the student answered, for the parents page. Kept for recent attempts only. */
  question?: string;
  answer?: string;
  /** The right answer, kept when the student didn't get it first try. */
  rightAnswer?: string;
  /** Right on the second try. */
  secondTry?: boolean;
}

/** Question and answer text a parent can read back. */
export type AttemptDetails = Pick<AttemptRecord, "question" | "answer" | "rightAnswer" | "secondTry">;

export interface WellbeingFlag {
  at: number;
  /** What the student wrote, kept so a parent can follow up. */
  message: string;
}

export interface WritingRecord {
  skillId: string;
  at: number;
  summary: string;
  levels: Record<string, string>;
}

export interface LearnerProfile {
  version: 1;
  /** Tells a parent's children apart. Missing on profiles saved before families had more than one child. */
  id?: string;
  name: string;
  yearLevel: YearLevel;
  createdAt: number;
  skills: Record<string, SkillState>;
  placementDone: Partial<Record<Subject, boolean>>;
  history: AttemptRecord[];
  wellbeingFlags: WellbeingFlag[];
  writing: WritingRecord[];
  /** The starting assessment in each subject, for the parents page. Missing on older profiles. */
  assessments?: AssessmentRecord[];
  /** Reading age from the reading check, and Learn to Read progress. Missing until the check is done. */
  reading?: ReadingProgress;
  /** Times tables game scores. Missing until the first game. */
  tables?: TablesRecord;
  /** This week's lesson in each subject. Missing until the first lesson. */
  lessons?: Partial<Record<Subject, WeeklyLesson>>;
  /** The work program from the starting assessment in each subject. Missing until the assessment. */
  programs?: Partial<Record<Subject, WorkProgram>>;
  /** "YYYY-MM-DD", when a grown-up has entered it (see learner/birth.ts). */
  dateOfBirth?: string;
  /** Which curriculum the child learns. Missing means NSW. On an account, the saved copy decides (see auth/learners.ts). */
  curriculum?: Curriculum;
  /** Which subjects the child does, and their teacher's session. The saved copy decides; missing means both, on their own. */
  plan?: LearningPlan;
}

export const MASTERY_THRESHOLD = 0.8;
export const MIN_ATTEMPTS_FOR_MASTERY = 5;
export const STREAK_FOR_MASTERY = 3;
const LEARNING_RATE = 0.3;
const DAY = 24 * 60 * 60 * 1000;
const MAX_HISTORY = 1000;
/** How many recent attempts keep their question and answer text, so the saved profile stays small. */
export const MAX_DETAILED_HISTORY = 300;
const clip = (text: string | undefined, max: number) =>
  text === undefined ? undefined : text.length > max ? `${text.slice(0, max - 1)}…` : text;

export function newProfile(name: string, yearLevel: YearLevel, now = Date.now(), curriculum?: Curriculum): LearnerProfile {
  return {
    version: 1,
    id: newChildId(),
    name,
    yearLevel,
    ...(curriculum ? { curriculum } : {}),
    createdAt: now,
    skills: {},
    placementDone: {},
    history: [],
    wellbeingFlags: [],
    writing: [],
  };
}

/** A parent can have up to this many children. */
export const MAX_CHILDREN = 3;

export function newChildId(): string {
  return globalThis.crypto.randomUUID();
}

export function skillState(profile: LearnerProfile, skillId: string): SkillState {
  return profile.skills[skillId] ?? { mastery: 0.3, attempts: 0, correct: 0, streak: 0, mastered: false };
}

/**
 * Updates mastery after one answer. A correct answer after hints counts for less,
 * because the hints did some of the work.
 */
export function recordAttempt(
  profile: LearnerProfile,
  skillId: string,
  correct: boolean,
  hintsUsed: number,
  now = Date.now(),
  details: AttemptDetails = {},
): LearnerProfile {
  const prev = skillState(profile, skillId);
  const target = correct ? (hintsUsed === 0 ? 1 : Math.max(0.5, 0.85 - 0.15 * hintsUsed)) : 0;
  const mastery = prev.mastery + LEARNING_RATE * (target - prev.mastery);
  const streak = correct && hintsUsed === 0 ? prev.streak + 1 : 0;
  const attempts = prev.attempts + 1;

  let next: SkillState = { ...prev, mastery, streak, attempts, correct: prev.correct + (correct ? 1 : 0), lastPracticed: now };
  const isReview = prev.mastered && prev.nextReview !== undefined && prev.nextReview <= now;

  if (!prev.mastered && mastery >= MASTERY_THRESHOLD && attempts >= MIN_ATTEMPTS_FOR_MASTERY && streak >= STREAK_FOR_MASTERY) {
    next = { ...next, mastered: true, placed: false, reviewIntervalDays: 1, nextReview: now + DAY };
  } else if (prev.mastered && mastery < 0.6) {
    // Forgotten: back into regular practice.
    next = { ...next, mastered: false, placed: false, nextReview: undefined, reviewIntervalDays: undefined };
  } else if (isReview) {
    const interval = correct ? Math.min((prev.reviewIntervalDays ?? 1) * 2, 30) : 1;
    next = { ...next, reviewIntervalDays: interval, nextReview: now + interval * DAY };
  }

  const record: AttemptRecord = { skillId, at: now, correct, hintsUsed };
  if (details.question) record.question = clip(details.question, 200);
  if (details.answer !== undefined) record.answer = clip(details.answer, 80);
  if (!correct && details.rightAnswer) record.rightAnswer = clip(details.rightAnswer, 80);
  if (!correct && details.secondTry) record.secondTry = true;
  // Only the most recent attempts keep their text; older ones keep just the result.
  const history = [...profile.history, record]
    .slice(-MAX_HISTORY)
    .map((h, i, all) =>
      i < all.length - MAX_DETAILED_HISTORY && h.question !== undefined
        ? { skillId: h.skillId, at: h.at, correct: h.correct, hintsUsed: h.hintsUsed }
        : h,
    );
  return { ...profile, skills: { ...profile.skills, [skillId]: next }, history };
}

export function isUnlocked(profile: LearnerProfile, skill: Skill): boolean {
  return skill.prerequisites.every((id) => skillState(profile, id).mastered);
}

export type NextReason = "review" | "continue" | "new" | "stretch" | "revise";

export interface NextSkill {
  skill: Skill;
  reason: NextReason;
}

/**
 * Chooses what the student should practise next in a subject:
 * due reviews first, then the skill already in progress, then the next unlocked skill
 * at or below the student's stage, then stretch work from the next stage.
 */
export function pickNextSkill(
  profile: LearnerProfile,
  subject: Subject,
  now = Date.now(),
  options: { includeWriting?: boolean } = {},
): NextSkill | null {
  const stage: Stage = yearToStage(profile.yearLevel);
  const candidates = skillsFor(subject).filter((s) => options.includeWriting || s.practice !== "writing");

  const due = candidates
    .filter((s) => {
      const st = skillState(profile, s.id);
      return st.mastered && st.nextReview !== undefined && st.nextReview <= now;
    })
    .sort((a, b) => skillState(profile, a.id).nextReview! - skillState(profile, b.id).nextReview!);
  if (due.length) return { skill: due[0], reason: "review" };

  const open = candidates.filter((s) => !skillState(profile, s.id).mastered && isUnlocked(profile, s));
  const atStage = open.filter((s) => s.stage <= stage);

  const inProgress = atStage
    .filter((s) => skillState(profile, s.id).attempts > 0)
    .sort((a, b) => skillState(profile, b.id).mastery - skillState(profile, a.id).mastery);
  if (inProgress.length) return { skill: inProgress[0], reason: "continue" };
  if (atStage.length) return { skill: atStage[0], reason: "new" };
  if (open.length) return { skill: open[0], reason: "stretch" };

  const revise = candidates
    .filter((s) => skillState(profile, s.id).mastered)
    .sort((a, b) => (skillState(profile, a.id).lastPracticed ?? 0) - (skillState(profile, b.id).lastPracticed ?? 0));
  return revise.length ? { skill: revise[0], reason: "revise" } : null;
}

/** Progress grouped by NESA outcome, for the parent report. */
export function outcomeProgress(profile: LearnerProfile, subject: Subject) {
  const groups = new Map<string, { skills: Skill[]; mastered: number; practised: number }>();
  for (const skill of SKILLS.filter((s) => s.subject === subject)) {
    const g = groups.get(skill.outcome) ?? { skills: [], mastered: 0, practised: 0 };
    const st = skillState(profile, skill.id);
    g.skills.push(skill);
    if (st.mastered) g.mastered++;
    if (st.attempts > 0 || st.mastered) g.practised++;
    groups.set(skill.outcome, g);
  }
  return [...groups.entries()].map(([outcome, g]) => ({
    outcome,
    total: g.skills.length,
    mastered: g.mastered,
    status: g.mastered === g.skills.length ? "secure" : g.practised > 0 ? "developing" : "not started",
  })) as { outcome: string; total: number; mastered: number; status: "secure" | "developing" | "not started" }[];
}

export function recentAccuracy(profile: LearnerProfile, skillId: string, last = 10): number | null {
  const attempts = profile.history.filter((h) => h.skillId === skillId).slice(-last);
  if (!attempts.length) return null;
  return attempts.filter((a) => a.correct).length / attempts.length;
}

export { getSkill };
