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
import { describeTables } from "../tables/game";
import { formatReadingAge } from "../phonics/progress";
import { UNITS } from "../phonics/sequence";
import { SIGHT_LEVELS } from "../phonics/sightWords";
import { attemptTopic, resultsByTopic } from "./results";

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

export interface Activity {
  key: string;
  /** When it happened, or the last question of it. */
  at: number;
  kind: "practice" | "assessment" | "writing" | "tables" | "reading" | "set";
  title: string;
  detail: string;
}

export interface ActivityLog {
  activities: Activity[];
  /** Questions answered in the period, and how many right first try. */
  tally: Tally;
}

const DAY = 86_400_000;
const localDay = (at: number) => new Date(at).toDateString();
const percentOf = (right: number, total: number) => (total ? ` (${Math.round((right / total) * 100)}%)` : "");

/**
 * Everything the child did in the last `days` days, newest first: practice on each topic, a day at
 * a time, plus starting assessments, writing, times tables games, Learn to Read and finished set work.
 */
export function activityLog(profile: LearnerProfile, work: SetWorkSummary[], days: number, now = Date.now()): ActivityLog {
  const since = now - days * DAY;
  const curriculum = curriculumOf(profile.curriculum);
  const recent = profile.history.filter((h) => h.at >= since && h.at <= now);
  const activities: Activity[] = [];

  // Questions on the same topic on the same day are one activity.
  const practice = new Map<string, { skillId: string; at: number; answered: number; right: number }>();
  for (const h of recent) {
    const key = `${localDay(h.at)}|${h.skillId}`;
    const p = practice.get(key) ?? { skillId: h.skillId, at: h.at, answered: 0, right: 0 };
    p.answered += 1;
    if (h.correct) p.right += 1;
    p.at = Math.max(p.at, h.at);
    practice.set(key, p);
  }
  for (const [key, p] of practice) {
    const topic = attemptTopic(p.skillId);
    const path = subtopicPath(p.skillId, curriculum);
    activities.push({
      key: `practice-${key}`,
      at: p.at,
      kind: "practice",
      title: path ? topicTitle(p.skillId, profile) : topic.title,
      detail: `${topic.subject ? `${topic.subject} · ` : ""}${p.answered} ${p.answered === 1 ? "question" : "questions"}, ${p.right} right first try${percentOf(p.right, p.answered)}`,
    });
  }

  for (const a of profile.assessments ?? [])
    if (a.at >= since && a.at <= now)
      activities.push({
        key: `assessment-${a.subject}-${a.at}`,
        at: a.at,
        kind: "assessment",
        title: `${subjectName(a.subject, curriculum)} starting assessment`,
        detail: `Done, ${a.answers.length} questions. It set the level of their weekly lessons.`,
      });

  for (const w of profile.writing)
    if (w.at >= since && w.at <= now)
      activities.push({
        key: `writing-${w.at}`,
        at: w.at,
        kind: "writing",
        title: `Writing: ${attemptTopic(w.skillId).title}`,
        detail: w.summary,
      });

  for (const g of profile.tables?.games ?? [])
    if (g.at >= since && g.at <= now)
      activities.push({
        key: `tables-${g.at}`,
        at: g.at,
        kind: "tables",
        title: "Times tables game",
        detail: `${g.right} of ${g.asked} right${percentOf(g.right, g.asked)}, ${describeTables(g.tables)}`,
      });

  const reading = profile.reading;
  if (reading?.checkedAt && reading.checkedAt >= since && reading.checkedAt <= now && reading.age !== null)
    activities.push({
      key: "reading-check",
      at: reading.checkedAt,
      kind: "reading",
      title: "Reading check",
      detail: `Reading age ${formatReadingAge(reading.age)}.`,
    });
  for (const [id, u] of Object.entries(reading?.units ?? {}))
    if (u.at >= since && u.at <= now) {
      const unit = UNITS.find((x) => x.id === id);
      const sight = SIGHT_LEVELS.find((x) => x.id === id);
      activities.push({
        key: `reading-${id}`,
        at: u.at,
        kind: "reading",
        title: unit ? `Learn to Read: sounds ${unit.title}` : `Learn to Read: sight words ${sight?.title ?? id}`,
        detail: `${u.lessons} ${u.lessons === 1 ? "lesson" : "lessons"} done, best score ${Math.round(u.best * 100)}%${u.mastered ? ", mastered" : ""}.`,
      });
    }

  for (const w of work) {
    const at = w.doneAt ? Date.parse(w.doneAt) : NaN;
    if (at >= since && at <= now && w.total)
      activities.push({
        key: `set-${w.id}`,
        at,
        kind: "set",
        title: `${w.atSchool ? "School topic" : "Set work"} finished: ${topicTitle(w.subtopicId, profile)}`,
        detail: `${w.right ?? 0} of ${w.total} right first go${percentOf(w.right ?? 0, w.total)}.`,
      });
  }

  return { activities: activities.sort((a, b) => b.at - a.at), tally: tally(recent) };
}
