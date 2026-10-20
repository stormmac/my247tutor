/**
 * The Parents page at a glance: what's still to do, what's been done and how well, and the topics
 * that need attention. Kept apart from React so it can be tested.
 */
import { programFor } from "../content/program";
import { subtopicPath } from "../content/tree";
import { curriculumOf, subjectName, yearName } from "../curriculum/curricula";
import type { Subject } from "../curriculum/types";
import { currentLesson } from "./lesson";
import type { LearnerProfile } from "./model";
import { focusStreams, STREAM_NAMES } from "./program";
import { resultsByTopic } from "./results";

const SUBJECTS: Subject[] = ["maths", "english"];

/** Work set for the child, as the Parents page has it from the server. */
export interface SetWorkSummary {
  id: string;
  subject: Subject;
  subtopicId: string;
  setBy: string | null;
  doneAt: string | null;
  right: number | null;
  total: number | null;
  atSchool: boolean;
}

export interface ToDo {
  key: string;
  kind: "assessment" | "lesson" | "set" | "school";
  title: string;
  detail: string;
}

/** A subtopic's name, as "Topic: Subtopic", in the child's curriculum. */
export function topicTitle(subtopicId: string, profile: LearnerProfile): string {
  const path = subtopicPath(subtopicId, curriculumOf(profile.curriculum));
  if (!path) return "A topic";
  return path.topic.title === path.subtopic.title ? path.topic.title : `${path.topic.title}: ${path.subtopic.title}`;
}

/** Everything still to do: starting assessments, this week's lessons, and work set or added from school. */
export function stillToDo(profile: LearnerProfile, work: SetWorkSummary[], now = Date.now()): ToDo[] {
  const curriculum = curriculumOf(profile.curriculum);
  const items: ToDo[] = [];
  for (const subject of SUBJECTS) {
    const name = subjectName(subject, curriculum);
    if (!profile.placementDone[subject]) {
      items.push({
        key: `assessment-${subject}`,
        kind: "assessment",
        title: `${name} starting assessment`,
        detail: "Not done yet. It sets the level of their weekly lessons.",
      });
      continue;
    }
    const lesson = currentLesson(profile, subject, now);
    // Set work is listed on its own below, so only the lesson's own parts count here.
    const parts = lesson?.parts.filter((p) => p.kind !== "set") ?? [];
    const left = parts.filter((p) => p.results.length < p.questionIds.length);
    if (!lesson) items.push({ key: `lesson-${subject}`, kind: "lesson", title: `This week's ${name} lesson`, detail: "Not started yet." });
    else if (left.length)
      items.push({
        key: `lesson-${subject}`,
        kind: "lesson",
        title: `This week's ${name} lesson`,
        detail: `${left.length} of ${parts.length} parts to finish: ${left.map((p) => p.title).join(", ")}.`,
      });
  }
  for (const w of work.filter((w) => !w.doneAt))
    items.push({
      key: w.id,
      kind: w.atSchool ? "school" : "set",
      title: topicTitle(w.subtopicId, profile),
      detail: w.atSchool
        ? "Doing this at school now. It's in their weekly lesson."
        : `Set by ${w.setBy ?? "someone"}. It's in their weekly lesson.`,
    });
  return items;
}

export interface Tally {
  answered: number;
  rightFirstTry: number;
  /** Whole percent right first try, or null with nothing answered. */
  percent: number | null;
}

function tally(history: LearnerProfile["history"]): Tally {
  const right = history.filter((h) => h.correct).length;
  return { answered: history.length, rightFirstTry: right, percent: history.length ? Math.round((right / history.length) * 100) : null };
}

export interface Completed {
  allTime: Tally;
  thisWeek: Tally;
  bySubject: { subject: Subject; name: string; tally: Tally }[];
  /** Set work and school topics finished, with how they went. */
  workDone: { id: string; title: string; atSchool: boolean; right: number; total: number }[];
}

/** What's been done: questions answered and right first try, overall, this week and by subject, and finished set work. */
export function completedSummary(profile: LearnerProfile, work: SetWorkSummary[], now = Date.now()): Completed {
  const curriculum = curriculumOf(profile.curriculum);
  const week = now - 7 * 86_400_000;
  const subjectOf = new Map(resultsByTopic(profile.history).map((r) => [r.key, r.topic.subject]));
  return {
    allTime: tally(profile.history),
    thisWeek: tally(profile.history.filter((h) => h.at >= week)),
    bySubject: SUBJECTS.map((subject) => ({
      subject,
      name: subjectName(subject, curriculum),
      tally: tally(profile.history.filter((h) => subjectOf.get(h.skillId) === (subject === "maths" ? "Maths" : "English"))),
    })),
    workDone: work
      .filter((w) => w.doneAt && w.total)
      .map((w) => ({ id: w.id, title: topicTitle(w.subtopicId, profile), atSchool: w.atSchool, right: w.right ?? 0, total: w.total! })),
  };
}

export interface FocusArea {
  key: string;
  title: string;
  detail: string;
  /** Set when it's a topic that can be added to their practice. */
  subtopicId?: string;
  subject?: Subject;
}

/** Below this share right first try, with enough questions answered, a topic needs attention. */
export const NEEDS_ATTENTION = 0.6;
const MIN_ANSWERED = 4;

/** The work program's current streams, then the practised topics going worst. */
export function focusAreas(profile: LearnerProfile): FocusArea[] {
  const curriculum = curriculumOf(profile.curriculum);
  const areas: FocusArea[] = [];
  for (const subject of SUBJECTS) {
    const program = programFor(profile, subject);
    if (!program) continue;
    for (const s of focusStreams(program, profile.yearLevel))
      areas.push({
        key: `program-${subject}-${s.stream}`,
        title: subject === "english" ? "English" : STREAM_NAMES[s.stream],
        detail: `Working at ${yearName(s.year, curriculum)} level, from the starting assessment. Their weekly lessons work on this.`,
      });
  }
  const weak = resultsByTopic(profile.history)
    .filter((r) => r.answered >= MIN_ANSWERED && r.rightFirstTry / r.answered < NEEDS_ATTENTION)
    .sort((a, b) => a.rightFirstTry / a.answered - b.rightFirstTry / b.answered)
    .slice(0, 5);
  for (const r of weak) {
    const path = subtopicPath(r.key, curriculum);
    areas.push({
      key: r.key,
      title: path ? topicTitle(r.key, profile) : r.topic.title,
      detail: `${r.rightFirstTry} of ${r.answered} right first try.`,
      ...(path ? { subtopicId: path.subtopic.id, subject: path.subjectKey } : {}),
    });
  }
  return areas;
}
