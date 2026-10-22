import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTION_HINTS_SQL } from "../auth/hintSchema";
import { toPracticeQuestion } from "../content/practice";
import { HINT_COUNT, hintLadder, HintRequestSchema, withoutAnswer } from "../tutor/hints";

describe("hints written for each question", () => {
  it("drops a hint that gives the answer away", () => {
    const hints = ["Think about what the Earth goes around.", "It's the Sun!", "Which one gives us light in the day?"];
    expect(withoutAnswer(hints, "the Sun")).toEqual([hints[0], hints[2]]);
  });

  it("matches whole words, so a hint can still use numbers that contain the answer", () => {
    expect(withoutAnswer(["Count on from 120 in tens.", "So 12 is next."], "12")).toEqual(["Count on from 120 in tens."]);
  });

  it("lets a hint name some parts of a many-part answer, but not all of them", () => {
    const hints = ["What comes after a seed?", "It goes seed, sprout, then flower."];
    expect(withoutAnswer(hints, "seed, then sprout, then flower")).toEqual([hints[0]]);
  });

  it("leaves one-letter answers to the model, since the letter is in every sentence", () => {
    expect(withoutAnswer(["Read it again, slowly.", "  "], "a")).toEqual(["Read it again, slowly."]);
  });

  it("tops up with the question's own hints when too few written ones survive", () => {
    expect(hintLadder(["one", "two", "three", "four"], ["a", "b"])).toEqual(["one", "two", "three"]);
    expect(hintLadder(["one"], ["a", "b", "c"])).toEqual(["one", "a", "b"]);
    expect(hintLadder([], ["a", "b"])).toEqual(["a", "b"]);
    expect(HINT_COUNT).toBe(3);
  });

  it("takes what the practice screen sends", () => {
    const ok = HintRequestSchema.safeParse({ prompt: "What is 3 × 4?", correctAnswer: "12", yearLevel: 3, curriculum: "us" });
    expect(ok.success && ok.data.solution).toBe("");
    expect(HintRequestSchema.safeParse({ prompt: "", correctAnswer: "12", yearLevel: 3 }).success).toBe(false);
  });

  it("asks for written hints for questions that only have general ones", () => {
    const q = toPracticeQuestion(
      {
        id: "q1",
        subtopic_id: "s1",
        question_type: "short_answer",
        question_text: "What is 3 × 4?",
        correct_answer: "12",
        explanation: "3 groups of 4 is 12.",
        difficulty: "easy",
      } as never,
      1,
    );
    expect(q.writeHints).toBe(true);
  });

  it("keeps the database file the same as the app's", () => {
    expect(readFileSync(join(__dirname, "../../../database/022_my247tutor_question_hints.sql"), "utf8")).toContain(QUESTION_HINTS_SQL);
  });
});
