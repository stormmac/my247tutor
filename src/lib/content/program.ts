/**
 * The work program's lookups in the topic tree: which stream a subtopic is in, making a program
 * from the assessment, and moving streams up. The program itself is described in ../learner/program.ts.
 */
import { type Curriculum, curriculumOf } from "../curriculum/curricula";
import { getSkill } from "../curriculum/skills";
import type { Subject, YearLevel } from "../curriculum/types";
import { questionsOf, subtopicsOf, topicsFor } from "./tree";
import type { Subtopic, Topic } from "./types";
import type { AssessmentRecord } from "../learner/assessment";
import type { LearnerProfile } from "../learner/model";
import { MATHS_STREAMS, passedPart, type MoveUp, type StreamKey, type WorkProgram } from "../learner/program";

const FIRST_YEAR = 1;
const LAST_YEAR = 8;

/** A maths stream from an NSW topic's title. */
function streamOfTopic(title: string): StreamKey {
  if (/fraction|ratio|money/i.test(title)) return "fractions";
  if (/algebra|equation/i.test(title)) return "algebra";
  if (/measure|time/i.test(title)) return "measurement";
  if (/shape|geometry/i.test(title)) return "geometry";
  if (/data|statistic/i.test(title)) return "statistics";
  return "number";
}

let mathsStreams: Map<string, StreamKey> | null = null;

/**
 * The stream a subtopic belongs to. Subtopics keep their NSW id in every curriculum, so the stream
 * comes from the NSW topic and is the same wherever the child learns.
 */
export function streamOf(subject: Subject, subtopicId: string): StreamKey {
  if (subject === "english") return "english";
  if (!mathsStreams) {
    mathsStreams = new Map();
    for (let year = FIRST_YEAR; year <= LAST_YEAR; year++)
      for (const t of topicsFor("maths", year as YearLevel, "nsw"))
        for (const s of subtopicsOf(t.id)) mathsStreams.set(s.id, streamOfTopic(t.title));
  }
  return mathsStreams.get(subtopicId) ?? "number";
}

/** Subtopics in a year that have written questions to practise (writing tasks don't). */
export function practiseable(subject: Subject, year: YearLevel, curriculum: Curriculum): { topic: Topic; subtopics: Subtopic[] }[] {
  return topicsFor(subject, year, curriculum).map((topic) => ({
    topic,
    subtopics: subtopicsOf(topic.id).filter(
      (s) => !(s.skill_id && getSkill(s.skill_id).practice === "writing") && questionsOf(s.id, curriculum).length > 0,
    ),
  }));
}

/** A stream's subtopics in one year, with the topic each is in. */
export function streamSubtopics(subject: Subject, stream: StreamKey, year: number, curriculum: Curriculum) {
  if (year < FIRST_YEAR || year > LAST_YEAR) return [];
  return practiseable(subject, year as YearLevel, curriculum).flatMap(({ topic, subtopics }) =>
    subtopics.filter((s) => streamOf(subject, s.id) === stream).map((subtopic) => ({ topic, subtopic })),
  );
}

/** The first year from `from` up to `last` with work in the stream, or last + 1 when there's none. */
function yearWithWork(subject: Subject, stream: StreamKey, from: number, last: number, curriculum: Curriculum): number {
  for (let year = from; year <= last; year++) if (streamSubtopics(subject, stream, year, curriculum).length) return year;
  return last + 1;
}

/**
 * The year the child is working at: the year whose medium questions they passed, never below where
 * the check started, and never above their own year.
 */
export function workingYear(record: AssessmentRecord): YearLevel {
  const r = record.reached;
  const working = !r ? record.startYear : r.level >= 3 ? r.year : Math.max(record.startYear, r.year - 1);
  return Math.max(FIRST_YEAR, Math.min(record.yearLevel, working)) as YearLevel;
}

/** The program from a finished assessment. Streams with no work up to the child's year are left out. */
export function makeProgram(record: AssessmentRecord): WorkProgram {
  const curriculum = curriculumOf(record.curriculum);
  const start = workingYear(record);
  const keys = record.subject === "english" ? (["english"] as StreamKey[]) : MATHS_STREAMS;
  const streams = keys
    .map((stream, order) => {
      const answers = record.answers.filter((a) => streamOf(record.subject, a.subtopicId) === stream);
      const right = answers.filter((a) => a.correct).length;
      const year = yearWithWork(record.subject, stream, start, record.yearLevel, curriculum);
      return { stream, year, passed: [] as string[], right, asked: answers.length, order };
    })
    .filter((s) => s.year <= record.yearLevel)
    // Lowest share right first. A stream the check didn't ask about counts as half right.
    .sort((a, b) => score(a) - score(b) || b.asked - b.right - (a.asked - a.right) || a.order - b.order)
    .map(({ order: _order, ...s }) => s);
  return { from: record.at, ...(record.curriculum ? { curriculum: record.curriculum } : {}), startYear: start, streams };
}

const score = (s: { right: number; asked: number }) => (s.asked ? s.right / s.asked : 0.5);

/**
 * The child's program in a subject, or null when they haven't done the assessment (or did it for
 * another curriculum). A program for another curriculum is made again from the assessment.
 */
export function programFor(profile: LearnerProfile, subject: Subject): WorkProgram | null {
  const curriculum = curriculumOf(profile.curriculum);
  const saved = profile.programs?.[subject];
  if (saved && curriculumOf(saved.curriculum) === curriculum) return saved;
  const record = profile.assessments?.find((a) => a.subject === subject);
  if (!record || curriculumOf(record.curriculum) !== curriculum) return null;
  return makeProgram({ ...record, yearLevel: profile.yearLevel });
}

/** Saves the program on the profile if it isn't there yet, for children assessed before programs. */
export function ensureProgram(profile: LearnerProfile, subject: Subject): LearnerProfile {
  const program = programFor(profile, subject);
  if (!program || profile.programs?.[subject] === program) return profile;
  return { ...profile, programs: { ...profile.programs, [subject]: program } };
}

/**
 * Passes the subtopics of this week's finished activities that went over 75%, and moves a stream
 * up a year once all of its year is passed. Safe to call after every answer.
 */
export function advanceProgram(profile: LearnerProfile, subject: Subject): { profile: LearnerProfile; moved: MoveUp[] } {
  const program = programFor(profile, subject);
  const lesson = profile.lessons?.[subject];
  if (!program || !lesson) return { profile, moved: [] };
  const curriculum = curriculumOf(profile.curriculum);
  const passedNow = lesson.parts.filter((p) => p.kind === "activity" && p.subtopicId && passedPart(p)).map((p) => p.subtopicId!);
  const moved: MoveUp[] = [];
  let changed = false;
  const streams = program.streams.map((s) => {
    if (s.year > profile.yearLevel) return s;
    const inYear = streamSubtopics(subject, s.stream, s.year, curriculum).map((x) => x.subtopic.id);
    const fresh = passedNow.filter((id) => inYear.includes(id) && !s.passed.includes(id));
    if (!fresh.length) return s;
    changed = true;
    const passed = [...s.passed, ...fresh];
    if (!inYear.every((id) => passed.includes(id))) return { ...s, passed };
    const year = yearWithWork(subject, s.stream, s.year + 1, profile.yearLevel, curriculum);
    moved.push({ stream: s.stream, year, caughtUp: year > profile.yearLevel });
    return { ...s, year, passed: [] };
  });
  if (!changed) return { profile, moved };
  return { profile: { ...profile, programs: { ...profile.programs, [subject]: { ...program, streams } } }, moved };
}
