import { describe, expect, it } from "vitest";
import { checkAnswer } from "../practice";
import { toPracticeQuestion } from "../content/practice";
import { pictureProblems } from "../content/picture";
import type { QuestionSpec } from "../content/spec";
import type { ContentQuestion } from "../content/types";
import { DIFFICULTIES } from "../content/types";

/**
 * Checks every question set in src/lib/content/bank on its own, before it is placed in the tree:
 * 15 questions, three per level from very easy to very hard, each one answerable and marked right.
 */
const modules = import.meta.glob<Record<string, unknown>>("../content/bank/*.ts", { eager: true });
const sets = Object.entries(modules).flatMap(([file, mod]) =>
  Object.entries(mod)
    .filter(([, value]) => Array.isArray(value))
    .map(([name, value]) => ({ name: `${file.split("/").pop()} ${name}`, questions: value as QuestionSpec[] })),
);

const asQuestion = (q: QuestionSpec): ContentQuestion => ({
  ...q,
  id: `q${q.n}`,
  subtopic_id: "s",
  points: 1,
  difficulty: q.difficulty ?? "medium",
});

function evaluate(expr: string): number {
  const js = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/(\d) (?=\d{3}\b)/g, "$1");
  return Function(`"use strict"; return (${js});`)() as number;
}

describe("question bank sets", () => {
  it("are found", () => {
    expect(sets.length).toBeGreaterThan(0);
  });

  for (const { name, questions } of sets) {
    describe(name, () => {
      it("has 15 questions, three per level, easiest first", () => {
        expect(questions).toHaveLength(15);
        expect(questions.map((q) => q.difficulty)).toEqual(DIFFICULTIES.flatMap((d) => [d, d, d]));
      });

      it("has unique question numbers and no repeated questions", () => {
        expect(new Set(questions.map((q) => q.n)).size).toBe(15);
        const keys = questions.map(
          (q) => `${q.passage?.title ?? ""}|${JSON.stringify(q.picture ?? null)}|${q.question_text}|${JSON.stringify(q.answer_options)}`,
        );
        expect(new Set(keys).size).toBe(15);
      });

      it("has well-formed questions that mark the right answer correct", () => {
        for (const q of questions) {
          const label = `${q.n}: ${q.question_text}`;
          expect(q.question_text.trim().length, label).toBeGreaterThan(3);
          expect(q.explanation.trim().length, label).toBeGreaterThan(10);
          if (q.picture) expect(pictureProblems(q.picture), label).toEqual([]);
          if (q.passage) expect(q.passage.text.length, label).toBeGreaterThan(40);
          const options = q.answer_options ?? [];
          expect(new Set(options.map((o) => o.text)).size, label).toBe(options.length);
          if (q.question_type === "fill_blank") expect(q.question_text.split("___").length, label).toBe(2);
          if (q.question_type === "multi_select") expect((q.correct_answer as string[]).length, label).toBeGreaterThanOrEqual(2);
          if (q.question_type === "ordering") expect(options.length, label).toBeGreaterThanOrEqual(3);
          const accepted = Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer];
          expect(
            accepted.every((a) => a.trim() !== ""),
            label,
          ).toBe(true);

          const practice = toPracticeQuestion(asQuestion(q), 7);
          const a = practice.answer;
          const input =
            a.kind === "choice"
              ? String(a.index)
              : a.kind === "multi"
                ? a.indices.join(",")
                : a.kind === "order"
                  ? a.order.join(",")
                  : accepted[0];
          if (a.kind === "choice") expect(a.index, label).toBeGreaterThanOrEqual(0);
          if (a.kind === "multi")
            expect(
              a.indices.every((i) => i >= 0),
              label,
            ).toBe(true);
          expect(checkAnswer(a, input).correct, label).toBe(true);
        }
      });

      it("gets its written sums right", () => {
        for (const q of questions) {
          const text = q.question_text;
          if (!/^[\d\s.+−×÷()=_?]+$/.test(text) || !text.includes("=")) continue;
          const [left, right] = text.split("=").map((side) => side.trim());
          const answers = (Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer]).map((a) =>
            a.replace(/(\d) (?=\d{3}\b)/g, "$1"),
          );
          if (q.question_type === "true_false") expect(String(evaluate(left) === evaluate(right)), text).toBe(q.correct_answer);
          else if (right === "?") expect(Number(answers[0]), text).toBeCloseTo(evaluate(left), 9);
          else if (q.question_type !== "multiple_choice" && q.question_type !== "multi_select") {
            const filled = (side: string) => evaluate(side.replace("___", answers[0]));
            expect(filled(left), text).toBeCloseTo(filled(right), 9);
          }
        }
      });
    });
  }
});
