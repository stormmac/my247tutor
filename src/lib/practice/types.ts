import type { Picture } from "../content/picture";

export type Answer =
  | { kind: "number"; value: number }
  | { kind: "fraction"; num: number; den: number; requireSimplest?: boolean }
  | { kind: "remainder"; quotient: number; remainder: number }
  | { kind: "choice"; index: number }
  /** Typed words or numbers, from written short-answer and fill-in-the-blank questions. Any accepted answer is right. */
  | { kind: "text"; accepted: string[] }
  /** Choose all that apply: indices into choices, in any order. */
  | { kind: "multi"; indices: number[] }
  /** Put the choices in order: indices into choices, in the correct order. */
  | { kind: "order"; order: number[] };

export interface Question {
  /** Unique within a session; built from skill id and seed. */
  id: string;
  skillId: string;
  prompt: string;
  answer: Answer;
  /** Options for choice, multi and order questions. */
  choices?: string[];
  /** Hint ladder: a nudge, then a stronger hint, then a worked step. Never the final answer. */
  hints: string[];
  /** Full working shown after the student answers. */
  solution: string;
  /** Reading passage for comprehension questions. */
  passage?: { title: string; text: string };
  /** A drawing that goes with the question, such as a clock or a graph. */
  picture?: Picture;
}

export interface CheckResult {
  correct: boolean;
  /** Short message for the student when the answer is wrong or nearly right. */
  feedback?: string;
  /** The input couldn't be read as an answer (empty, or words instead of a number). Doesn't use up a try. */
  unreadable?: boolean;
}
