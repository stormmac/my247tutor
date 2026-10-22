/**
 * The reward program. Every weekly lesson question earns points by how it went: 3 for green (right
 * first go), 2 for yellow (right on a later go) and 1 for red (not right, but tried). On top of that,
 * a parent or teacher says what finishing a subject's weekly lesson is worth, in points or money.
 * Plain rules shared by the server and the pages.
 */
import type { Subject } from "../curriculum/types";
import { resultColour, type ResultColour, type WeeklyLesson } from "./lesson";
import type { LearnerProfile } from "./model";

export const REWARD_KINDS = ["points", "money"] as const;
export type RewardKind = (typeof REWARD_KINDS)[number];
export const REWARD_SUBJECTS: Subject[] = ["maths", "english"];

/** The most a reward can be: 10 000 points or $1000. */
export const MAX_POINTS = 10_000;
export const MAX_MONEY = 1000;

/** What one grown-up offers for finishing a subject's weekly lesson. */
export interface RewardOffer {
  subject: Subject;
  kind: RewardKind;
  amount: number;
  setByName: string;
  /** The person looking set this one, so they can change it. */
  mine: boolean;
}

/** A reward a child has earned by finishing a week's lesson. */
export interface RewardEarning {
  subject: Subject;
  week: string;
  kind: RewardKind;
  amount: number;
  setByName: string;
  earnedAt: string;
}

/** Points from one subject's weekly lesson questions. */
export interface WeekPoints {
  subject: Subject;
  week: string;
  points: number;
}

export interface Rewards {
  name: string;
  offers: RewardOffer[];
  earnings: RewardEarning[];
  /** Points from lesson questions, newest week first. */
  weeks: WeekPoints[];
  /** Everything earned: question points and finished-week rewards. */
  totals: { points: number; money: number };
  /** Whether the person looking can set rewards for this child. */
  canSet: boolean;
}

/** Whether an amount is allowed: whole points from 1, or money from 5c, in cents. */
export function validAmount(kind: RewardKind, amount: number): boolean {
  if (!Number.isFinite(amount) || amount <= 0) return false;
  if (kind === "points") return Number.isInteger(amount) && amount <= MAX_POINTS;
  return amount >= 0.05 && amount <= MAX_MONEY && Math.abs(Math.round(amount * 100) - amount * 100) < 1e-6;
}

/** "10 points", "1 point" or "$2.50". */
export function rewardText(kind: RewardKind, amount: number): string {
  if (kind === "money") return `$${amount.toFixed(2)}`;
  return `${amount} point${amount === 1 ? "" : "s"}`;
}

/** Points and money together, like "50 points and $6.00", or "nothing yet". */
export function totalsText(totals: { points: number; money: number }): string {
  const parts = [totals.points ? rewardText("points", totals.points) : "", totals.money ? rewardText("money", totals.money) : ""];
  return parts.filter(Boolean).join(" and ") || "nothing yet";
}

/** Points for each lesson question by its colour. */
export const COLOUR_POINTS: Record<ResultColour, number> = { good: 3, warn: 2, bad: 1 };

/** Points a week's lesson has earned so far from its answered questions. */
export function lessonPoints(lesson: WeeklyLesson | undefined): number {
  return (lesson?.parts ?? []).reduce(
    (n, p) => n + p.results.slice(0, p.questionIds.length).reduce((m: number, r) => m + COLOUR_POINTS[resultColour(r)], 0),
    0,
  );
}

/** Whether every part of a week's lesson has been answered. */
export function lessonFinished(lesson: WeeklyLesson | undefined): boolean {
  return Boolean(lesson?.parts.length) && lesson!.parts.every((p) => p.results.length >= p.questionIds.length);
}

const WEEK = /^\d{4}-\d{2}-\d{2}$/;

/** Each subject's weekly lesson in this profile: its week, the points it has earned, and whether it's finished. */
export function lessonWeeks(profile: Pick<LearnerProfile, "lessons">): (WeekPoints & { finished: boolean })[] {
  return REWARD_SUBJECTS.flatMap((subject) => {
    const lesson = profile.lessons?.[subject];
    return lesson && WEEK.test(lesson.week)
      ? [{ subject, week: lesson.week, points: lessonPoints(lesson), finished: lessonFinished(lesson) }]
      : [];
  });
}
