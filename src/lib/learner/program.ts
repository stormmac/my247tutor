/**
 * The work program a child follows after the starting assessment.
 *
 * - It starts at the year the child is working at: their own year, or the year below it that the
 *   assessment reached.
 * - In maths, the lessons work on the two streams (number, fractions, measurement and so on) the
 *   child did worst in on the assessment. English is one stream.
 * - A lesson activity is ten questions on one subtopic. Getting over 80% of them right first go
 *   moves the stream up a year, and under 30% moves it down a year. Over 75% passes the subtopic,
 *   and once every subtopic of a stream's year is passed, the stream moves up a year too.
 * - A stream that has moved past the child's own year is caught up, and the next weakest stream
 *   takes its place.
 */
import type { Curriculum } from "../curriculum/curricula";
import type { Subject, YearLevel } from "../curriculum/types";
import { resultTries, type LessonPart } from "./lesson";

export type StreamKey = "number" | "fractions" | "algebra" | "measurement" | "geometry" | "statistics" | "english";

export const STREAM_NAMES: Record<StreamKey, string> = {
  number: "Number",
  fractions: "Fractions, decimals and percentages",
  algebra: "Algebra",
  measurement: "Measurement",
  geometry: "Geometry",
  statistics: "Statistics and probability",
  english: "English",
};

export const MATHS_STREAMS: StreamKey[] = ["number", "fractions", "algebra", "measurement", "geometry", "statistics"];
/** How many maths streams the lessons work on at once. */
export const FOCUS_STREAMS = 2;
/** Over this share right first go passes an activity's subtopic. */
export const PASS_MARK = 0.75;
/** Over this share right first go in an activity moves its stream up a year. */
export const MOVE_UP_MARK = 0.8;
/** Under this share right first go in an activity moves its stream down a year. */
export const MOVE_DOWN_MARK = 0.3;

export interface StreamProgress {
  stream: StreamKey;
  /** The year being worked at. Past the child's own year once the stream is caught up. */
  year: number;
  /** Subtopics of that year passed in a lesson activity. */
  passed: string[];
  /** Right and asked in this stream on the assessment. */
  right: number;
  asked: number;
}

export interface WorkProgram {
  /** When the assessment it came from was done. */
  from: number;
  curriculum?: Curriculum;
  /** The year the program started at. */
  startYear: YearLevel;
  /** Weakest on the assessment first. */
  streams: StreamProgress[];
}

/** Streams still below or at the child's own year, weakest first. */
export function openStreams(program: WorkProgram, yearLevel: YearLevel): StreamProgress[] {
  return program.streams.filter((s) => s.year <= yearLevel);
}

/** The streams the lessons work on now: the two weakest still to catch up in maths, or English. */
export function focusStreams(program: WorkProgram, yearLevel: YearLevel): StreamProgress[] {
  return openStreams(program, yearLevel).slice(0, FOCUS_STREAMS);
}

/** The share of a finished part's questions right first go, or null while it isn't finished. */
export function firstGoShare(part: LessonPart): number | null {
  if (part.results.length < part.questionIds.length || !part.questionIds.length) return null;
  return part.results.filter((r) => resultTries(r) === 1).length / part.questionIds.length;
}

/** Over 75% of the part's questions right first go. */
export function passedPart(part: LessonPart): boolean {
  return (firstGoShare(part) ?? 0) > PASS_MARK;
}

export interface MoveUp {
  stream: StreamKey;
  /** The year it moved to, or past the child's year when it's caught up. */
  year: number;
  caughtUp: boolean;
  /** It moved down a year, after a score under 30%. */
  down?: boolean;
}

/** What a child sees when a stream moves up. */
export function moveUpMessage(move: MoveUp, subject: Subject, yearName: (y: number) => string): string {
  const name = subject === "english" ? "English" : STREAM_NAMES[move.stream];
  if (move.down) return `Let's practise ${yearName(move.year)} ${name} for a bit.`;
  return move.caughtUp ? `You've caught up in ${name}!` : `You've moved up to ${yearName(move.year)} ${name}!`;
}
