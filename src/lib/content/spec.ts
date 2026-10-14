/**
 * Helpers for writing content-tree questions by hand. Each returns a question without its ids,
 * which tree.ts fills in from `n` (see the id scheme there).
 */
import type { ContentQuestion, Difficulty, QuestionType } from "./types";

export type QuestionSpec = Omit<ContentQuestion, "id" | "subtopic_id" | "points" | "difficulty"> & {
  n: number;
  difficulty?: Difficulty;
};

const LETTERS = "abcdefgh";
const options = (texts: string[]) => texts.map((text, i) => ({ id: LETTERS[i], text }));

export function choice(n: number, question_text: string, texts: string[], correct: number, explanation: string): QuestionSpec {
  return {
    n,
    question_text,
    question_type: "multiple_choice",
    answer_options: options(texts),
    correct_answer: LETTERS[correct],
    explanation,
  };
}
export function trueFalse(n: number, question_text: string, correct: boolean, explanation: string): QuestionSpec {
  return { n, question_text, question_type: "true_false", answer_options: null, correct_answer: String(correct), explanation };
}
export function typed(
  type: QuestionType,
  n: number,
  question_text: string,
  accepted: string | string[],
  explanation: string,
): QuestionSpec {
  return { n, question_text, question_type: type, answer_options: null, correct_answer: accepted, explanation };
}
export function multi(n: number, question_text: string, texts: string[], correct: number[], explanation: string): QuestionSpec {
  const correct_answer = correct.map((i) => LETTERS[i]);
  return { n, question_text, question_type: "multi_select", answer_options: options(texts), correct_answer, explanation };
}
/** Options are written in the correct order; the app shuffles them on screen. */
export function ordering(n: number, question_text: string, inOrder: string[], explanation: string): QuestionSpec {
  const opts = options(inOrder);
  return { n, question_text, question_type: "ordering", answer_options: opts, correct_answer: opts.map((o) => o.id), explanation };
}

/**
 * A standard's question set: three questions at each level from very easy to very hard, numbered
 * from `first`. Each question is written without its number; the order here sets it.
 */
export function levels(first: number, byLevel: Record<Difficulty, ((n: number) => QuestionSpec)[]>): QuestionSpec[] {
  const out: QuestionSpec[] = [];
  (Object.keys(byLevel) as Difficulty[]).forEach((difficulty) => {
    for (const make of byLevel[difficulty]) out.push({ ...make(first + out.length), difficulty });
  });
  return out;
}
