export type Answer =
  | { kind: "number"; value: number }
  | { kind: "fraction"; num: number; den: number; requireSimplest?: boolean }
  | { kind: "remainder"; quotient: number; remainder: number }
  | { kind: "choice"; index: number };

export interface Question {
  /** Unique within a session; built from skill id and seed. */
  id: string;
  skillId: string;
  prompt: string;
  answer: Answer;
  /** Options for multiple-choice questions. */
  choices?: string[];
  /** Hint ladder: a nudge, then a stronger hint, then a worked step. Never the final answer. */
  hints: string[];
  /** Full working shown after the student answers. */
  solution: string;
  /** Reading passage for comprehension questions. */
  passage?: { title: string; text: string };
}

export interface CheckResult {
  correct: boolean;
  /** Short message for the student when the answer is wrong or nearly right. */
  feedback?: string;
  /** The input couldn't be read as an answer (empty, or words instead of a number). Doesn't use up a try. */
  unreadable?: boolean;
}
