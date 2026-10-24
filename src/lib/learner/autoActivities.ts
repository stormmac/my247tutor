/**
 * The three activities each student gets every week in a subject without anyone setting them, shown
 * first in the teacher's lesson planner:
 *
 * - Maths: the weekly lesson's review, and an activity in each of the two streams it works on.
 * - English in Learn to Read (Year 5 and below, reading age under 9.5): the reading lesson's
 *   sounds, sight words and story.
 * - Other English: the weekly lesson. From Year 6 that is comprehension, writing and vocabulary.
 *
 * No content tree import, so the planner's server can work these out from the saved profile.
 */

import type { Subject } from "../curriculum/types";
import { getUnit } from "../phonics/sequence";
import { getSightLevel } from "../phonics/sightWords";
import { readingOf, readingYear } from "../phonics/progress";
import { resultTries } from "./lesson";
import type { LearnerProfile } from "./model";
import { focusStreams, STREAM_NAMES } from "./program";

/** How many activities a subject adds by itself each week. */
export const AUTO_ACTIVITIES = 3;

/** A class's subjects, in the order the planner shows them. */
export const classSubjects = (subject: "maths" | "english" | "both"): Subject[] => (subject === "both" ? ["maths", "english"] : [subject]);

/** How many of a session's boxes the automatic activities fill: three for each subject the class teaches. */
export const autoSlots = (subject: "maths" | "english" | "both") => classSubjects(subject).length * AUTO_ACTIVITIES;

export interface AutoActivity {
  subject: Subject;
  title: string;
  /** A line under the title, such as the topic or what it's part of. */
  detail: string | null;
  /** Questions answered so far, and how many there are. 0 of 0 before the lesson is made. */
  answered: number;
  total: number;
  /** Right first go, once it's finished. */
  right: number | null;
  done: boolean;
}

/** The subject's three automatic activities for this week (`week` is its Monday, yyyy-mm-dd). */
export function autoActivities(profile: LearnerProfile, subject: Subject, week: string): AutoActivity[] {
  if (subject === "english" && readingYear(profile.yearLevel)) {
    const reading = readingOf(profile);
    if (reading.enrolled || reading.age === null) return readingProgram(profile, week);
  }
  const lesson = profile.lessons?.[subject];
  const parts = lesson?.week === week ? lesson.parts.filter((p) => p.kind !== "set").slice(0, AUTO_ACTIVITIES) : [];
  const made = parts.map((p): AutoActivity => {
    const answered = Math.min(p.results.length, p.questionIds.length);
    const done = answered >= p.questionIds.length;
    const [title, ...rest] = p.title.split(": ");
    return {
      subject,
      title: rest.length ? rest.join(": ") : title,
      detail: p.kind === "review" ? "Weekly lesson" : rest.length ? title : "Weekly lesson",
      answered,
      total: p.questionIds.length,
      right: done ? p.results.filter((r) => resultTries(r) === 1).length : null,
      done,
    };
  });
  return [...made, ...planned(profile, subject).slice(made.length)].slice(0, AUTO_ACTIVITIES);
}

/** What the weekly lesson will have, before the student opens it this week. */
function planned(profile: LearnerProfile, subject: Subject): AutoActivity[] {
  const todo = (title: string, detail: string | null): AutoActivity => ({
    subject,
    title,
    detail,
    answered: 0,
    total: 0,
    right: null,
    done: false,
  });
  if (subject === "english" && profile.yearLevel >= 6)
    return [todo("Comprehension", "Weekly lesson"), todo("Writing", "Weekly lesson"), todo("Vocabulary", "Weekly lesson")];
  const program = profile.programs?.[subject];
  const streams = program && subject === "maths" ? focusStreams(program, profile.yearLevel) : [];
  const streamTodo = (i: number) =>
    streams[i] ? todo(`${STREAM_NAMES[streams[i].stream]} stream`, "Weekly lesson") : todo("Activity", "Weekly lesson");
  return [todo("Review", "Weekly lesson"), streamTodo(0), streamTodo(streams.length > 1 ? 1 : 0)];
}

/** The reading lesson's three parts, which the student does in one go each week. */
function readingProgram(profile: LearnerProfile, week: string): AutoActivity[] {
  const reading = readingOf(profile);
  const weekly = reading.weekly?.week === week ? reading.weekly : null;
  const unit = weekly ? getUnit(weekly.unitId) : null;
  const level = weekly ? getSightLevel(weekly.levelId) : null;
  const detail = reading.age === null ? "After the reading check" : "Reading lesson";
  const done = Boolean(weekly && weekly.done > 0);
  // The lesson is scored as a whole, out of 100 here so each part shows the same percentage.
  const right = done ? Math.round(weekly!.best * 100) : null;
  const part = (title: string): AutoActivity => ({
    subject: "english",
    title,
    detail,
    answered: done ? 100 : 0,
    total: done ? 100 : 0,
    right,
    done,
  });
  return [
    part(unit ? `Sounds: ${unit.title.replace(/_/g, "–")}` : "Sounds"),
    part(level ? `Sight words: ${level.title}` : "Sight words"),
    part("Story"),
  ];
}
