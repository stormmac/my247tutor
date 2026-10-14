import type { Question } from "../practice/types";
import { Rng } from "../practice/rng";
import { type ContentQuestion, DIFFICULTIES, type Subtopic } from "./types";

const HINTS: Record<ContentQuestion["question_type"], string[]> = {
  multiple_choice: [
    "Read the question again slowly.",
    "Rule out the options you're sure are wrong.",
    "Which of the options left fits best?",
  ],
  true_false: ["Read the statement carefully, word by word.", "Can you think of an example that would make it false?"],
  short_answer: ["What is the question asking you to find?", "Write down what you already know, then work from there."],
  fill_blank: ["Read the whole sentence with the gap in it.", "What word or number would make the sentence correct?"],
  multi_select: ["Check each option one at a time.", "There's more than one right answer, so don't stop at the first one."],
  ordering: ["Find the one that clearly comes first.", "Then compare the rest two at a time."],
};

/** Turns a written question from the content tree into a question the practice screen can show and mark. */
export function toPracticeQuestion(q: ContentQuestion, seed: number): Question {
  const base = {
    id: `${q.id}:${seed}`,
    skillId: q.subtopic_id,
    prompt: q.question_text,
    hints: HINTS[q.question_type],
    solution: q.explanation,
  };
  const opts = q.answer_options ?? [];
  const indexOf = (optionId: string) => opts.findIndex((o) => o.id === optionId);
  const ids = Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer];

  switch (q.question_type) {
    case "multiple_choice":
      return { ...base, choices: opts.map((o) => o.text), answer: { kind: "choice", index: indexOf(ids[0]) } };
    case "true_false":
      return { ...base, choices: ["True", "False"], answer: { kind: "choice", index: ids[0] === "true" ? 0 : 1 } };
    case "short_answer":
    case "fill_blank":
      return { ...base, answer: { kind: "text", accepted: ids } };
    case "multi_select":
      return { ...base, choices: opts.map((o) => o.text), answer: { kind: "multi", indices: ids.map(indexOf) } };
    case "ordering": {
      // Show the options shuffled, never already in the right order.
      const rng = new Rng(seed);
      let shown = rng.shuffle([...opts]);
      if (opts.length > 1 && shown.every((o, i) => o.id === ids[i])) shown = [...shown.slice(1), shown[0]];
      return {
        ...base,
        choices: shown.map((o) => o.text),
        answer: { kind: "order", order: ids.map((optionId) => shown.findIndex((o) => o.id === optionId)) },
      };
    }
  }
}

/** Progress for a subtopic is stored under its skill when it has one, otherwise under the subtopic's own id. */
export function progressKey(subtopic: Subtopic): string {
  return subtopic.skill_id ?? subtopic.id;
}

/**
 * The order to practise a subtopic's written questions in: easiest level first, building to the
 * hardest, shuffled within each level so a second round isn't the same.
 */
export function practiceOrder(questions: ContentQuestion[], rng: Rng): number[] {
  const rank = (q: ContentQuestion) => DIFFICULTIES.indexOf(q.difficulty);
  return DIFFICULTIES.flatMap((_, level) => rng.shuffle(questions.flatMap((q, i) => (rank(q) === level ? [i] : []))));
}
