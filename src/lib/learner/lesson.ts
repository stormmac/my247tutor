/**
 * The weekly lesson: a warm-up of written questions from the year below the child's, then two short
 * activities on the topics they are weakest at in their own year. A new lesson is made each Monday.
 *
 * This file has no content tree import, so the Learn page can show lesson progress without loading
 * the question bank. The lesson itself is built in ../content/lesson.ts.
 */

import { type Curriculum, curriculumOf } from "../curriculum/curricula";
import type { Subject, YearLevel } from "../curriculum/types";
import type { LearnerProfile } from "./model";

export const REVIEW_QUESTIONS = 20;
export const ACTIVITY_QUESTIONS = 10;
/** Goes a child gets at each lesson question. */
export const LESSON_TRIES = 3;
/** Extra questions of the same kind after a question is missed on every go. */
export const SKILL_BUILDER_QUESTIONS = 5;

/** The go a question was answered right on (1 to LESSON_TRIES), or 0 when it wasn't. */
export type LessonResult = number;
/** How a result is shown: green first go, yellow a later go, red not right. */
export type ResultColour = "good" | "warn" | "bad";

/** Lessons saved before there were three goes stored true (right first go) or false. */
export function resultTries(result: LessonResult | boolean): LessonResult {
  return result === true ? 1 : result === false ? 0 : result;
}

export function resultColour(result: LessonResult | boolean): ResultColour {
  const tries = resultTries(result);
  return tries === 1 ? "good" : tries > 1 ? "warn" : "bad";
}

export interface LessonPart {
  /** A warm-up review, an activity from the work program, or work a parent, teacher or centre set. */
  kind: "review" | "activity" | "set";
  /** What the child sees, such as "Year 2 review" or "Fractions: Equivalent fractions". */
  title: string;
  /** The year the questions come from. */
  year: YearLevel;
  /** Set for an activity or set work: the subtopic it practises. */
  subtopicId?: string;
  /** For set work: its id on the server, who set it, and their note for the child. */
  setWorkId?: string;
  setBy?: string;
  note?: string;
  /** For set work: to do at home after the class session. */
  homework?: boolean;
  /** For set work: homework redoing the class session's questions that weren't right first go. */
  redo?: boolean;
  questionIds: string[];
  /** One entry per answered question, in order (see LessonResult). */
  results: (LessonResult | boolean)[];
}

export interface WeeklyLesson {
  /** The Monday the lesson belongs to, as yyyy-mm-dd in the child's time zone. */
  week: string;
  /** The curriculum it was made for. Missing on lessons made before there was a choice (NSW). */
  curriculum?: Curriculum;
  parts: LessonPart[];
}

/** The Monday on or before this time, local time, as yyyy-mm-dd. */
export function weekOf(now = Date.now()): string {
  const d = new Date(now);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** The Monday `weeks` weeks after (or before, when negative) this one, both as yyyy-mm-dd. */
export function addWeeks(week: string, weeks: number): string {
  const d = new Date(`${week}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + weeks * 7);
  return d.toISOString().slice(0, 10);
}

/** The date of a day in a week (1 is Monday, 7 is Sunday), as yyyy-mm-dd. */
export function dayOfWeek(week: string, weekday: number): string {
  const d = new Date(`${week}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + weekday - 1);
  return d.toISOString().slice(0, 10);
}

/** This week's lesson in a subject, or null when it hasn't been made yet this week (or the child changed curriculum). */
export function currentLesson(profile: LearnerProfile, subject: Subject, now = Date.now()): WeeklyLesson | null {
  const lesson = profile.lessons?.[subject];
  return lesson && lesson.week === weekOf(now) && curriculumOf(lesson.curriculum) === curriculumOf(profile.curriculum) ? lesson : null;
}

/** The first part with questions still to answer, or -1 when the lesson is finished. */
export function nextPart(lesson: WeeklyLesson): number {
  return lesson.parts.findIndex((p) => p.results.length < p.questionIds.length);
}

export function lessonProgress(lesson: WeeklyLesson, which: (part: LessonPart) => boolean = () => true): { done: number; total: number } {
  const parts = lesson.parts.filter(which);
  return {
    done: parts.reduce((n, p) => n + Math.min(p.results.length, p.questionIds.length), 0),
    total: parts.reduce((n, p) => n + p.questionIds.length, 0),
  };
}

/** The parts the child does on their own (the review and the activities), not work someone set. */
export const ownPart = (part: LessonPart) => part.kind !== "set";

/**
 * Days left to do this week's lessons, counting today. The week ends at midnight on Sunday, local
 * time: 7 on a Monday, 1 on a Sunday.
 */
export function daysLeftInWeek(now = Date.now()): number {
  return 7 - ((new Date(now).getDay() + 6) % 7);
}

/** "3 days to go" or, on Sunday, "Last day". */
export function daysLeftText(now = Date.now()): string {
  const left = daysLeftInWeek(now);
  return left === 1 ? "Last day" : `${left} days to go`;
}

export function saveLesson(profile: LearnerProfile, subject: Subject, lesson: WeeklyLesson): LearnerProfile {
  return { ...profile, lessons: { ...profile.lessons, [subject]: lesson } };
}

/**
 * Records the answer to one question of a part, by its position, so saving the same answer twice
 * can't count it twice.
 */
export function recordLessonAnswer(
  profile: LearnerProfile,
  subject: Subject,
  part: number,
  index: number,
  result: LessonResult,
): LearnerProfile {
  const lesson = profile.lessons?.[subject];
  const target = lesson?.parts[part];
  if (!lesson || !target || index > target.results.length || index >= target.questionIds.length) return profile;
  const results = [...target.results.slice(0, index), result, ...target.results.slice(index + 1)];
  const parts = lesson.parts.map((p, i) => (i === part ? { ...p, results } : p));
  return saveLesson(profile, subject, { ...lesson, parts });
}
