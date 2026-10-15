/**
 * The weekly lesson: a warm-up of written questions from the year below the child's, then two short
 * activities on the topics they are weakest at in their own year. A new lesson is made each Monday.
 *
 * This file has no content tree import, so the Learn page can show lesson progress without loading
 * the question bank. The lesson itself is built in ../content/lesson.ts.
 */

import type { Subject, YearLevel } from "../curriculum/types";
import type { LearnerProfile } from "./model";

export const REVIEW_QUESTIONS = 20;
export const ACTIVITY_QUESTIONS = 10;

export interface LessonPart {
  kind: "review" | "activity";
  /** What the child sees, such as "Year 2 review" or "Fractions: Equivalent fractions". */
  title: string;
  /** The year the questions come from. */
  year: YearLevel;
  /** Set for an activity: the subtopic it practises. */
  subtopicId?: string;
  questionIds: string[];
  /** One entry per answered question: right first time or not. */
  results: boolean[];
}

export interface WeeklyLesson {
  /** The Monday the lesson belongs to, as yyyy-mm-dd in the child's time zone. */
  week: string;
  parts: LessonPart[];
}

/** The Monday on or before this time, local time, as yyyy-mm-dd. */
export function weekOf(now = Date.now()): string {
  const d = new Date(now);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** This week's lesson in a subject, or null when it hasn't been made yet this week. */
export function currentLesson(profile: LearnerProfile, subject: Subject, now = Date.now()): WeeklyLesson | null {
  const lesson = profile.lessons?.[subject];
  return lesson && lesson.week === weekOf(now) ? lesson : null;
}

/** The first part with questions still to answer, or -1 when the lesson is finished. */
export function nextPart(lesson: WeeklyLesson): number {
  return lesson.parts.findIndex((p) => p.results.length < p.questionIds.length);
}

export function lessonProgress(lesson: WeeklyLesson): { done: number; total: number } {
  return {
    done: lesson.parts.reduce((n, p) => n + Math.min(p.results.length, p.questionIds.length), 0),
    total: lesson.parts.reduce((n, p) => n + p.questionIds.length, 0),
  };
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
  correct: boolean,
): LearnerProfile {
  const lesson = profile.lessons?.[subject];
  const target = lesson?.parts[part];
  if (!lesson || !target || index > target.results.length || index >= target.questionIds.length) return profile;
  const results = [...target.results.slice(0, index), correct, ...target.results.slice(index + 1)];
  const parts = lesson.parts.map((p, i) => (i === part ? { ...p, results } : p));
  return saveLesson(profile, subject, { ...lesson, parts });
}
