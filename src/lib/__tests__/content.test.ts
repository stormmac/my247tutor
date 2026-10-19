import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { practiceOrder, progressKey, toPracticeQuestion } from "../content/practice";
import { contentSeedSql } from "../content/sql";
import {
  COUNTRIES,
  QUESTIONS,
  STATES,
  SUBJECTS,
  SUBTOPICS,
  TOPICS,
  YEAR_LEVELS,
  questionsOf,
  subtopicPath,
  subtopicsOf,
  topicsFor,
  yearsWithContent,
} from "../content/tree";
import { OUTCOMES } from "../curriculum/outcomes";
import { yearToStage } from "../curriculum/types";
import { SKILLS } from "../curriculum/skills";
import { Rng } from "../practice/rng";
import { checkAnswer, type Question } from "../practice";
import { textMatches } from "../practice/checker";
import { buildContextPrompt } from "../tutor/prompt";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The input the question screen would send for the right answer. */
function rightInput(q: Question): string {
  const a = q.answer;
  if (a.kind === "choice") return String(a.index);
  if (a.kind === "multi") return a.indices.join(",");
  if (a.kind === "order") return a.order.join(",");
  if (a.kind === "text") return a.accepted[0];
  throw new Error(`unexpected ${a.kind}`);
}

describe("content tree", () => {
  it("uses unique, valid ids and every parent exists", () => {
    const all = [...COUNTRIES, ...STATES, ...SUBJECTS, ...YEAR_LEVELS, ...TOPICS, ...SUBTOPICS, ...QUESTIONS].map((r) => r.id);
    expect(new Set(all).size).toBe(all.length);
    all.forEach((id) => expect(id).toMatch(UUID));
    for (const t of TOPICS) {
      expect(SUBJECTS.some((s) => s.id === t.subject_id)).toBe(true);
      expect(YEAR_LEVELS.some((y) => y.id === t.year_level_id)).toBe(true);
    }
    for (const s of SUBTOPICS) expect(TOPICS.some((t) => t.id === s.topic_id)).toBe(true);
    for (const q of QUESTIONS) expect(SUBTOPICS.some((s) => s.id === q.subtopic_id)).toBe(true);
  });

  it("places every skill in exactly one subtopic", () => {
    for (const skill of SKILLS) expect(SUBTOPICS.filter((s) => s.skill_id === skill.id)).toHaveLength(1);
  });

  it("gives every subtopic without a skill at least three questions", () => {
    for (const s of SUBTOPICS.filter((s) => !s.skill_id)) expect(questionsOf(s.id).length).toBeGreaterThanOrEqual(3);
  });

  it("covers Years 1 to 8 in both subjects", () => {
    expect(yearsWithContent("maths")).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(yearsWithContent("english")).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(topicsFor("maths", 4).map((t) => t.sort_order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("uses all six question types, with answers that point at real options", () => {
    expect(new Set(QUESTIONS.map((q) => q.question_type)).size).toBe(6);
    for (const q of QUESTIONS) {
      const ids = (q.answer_options ?? []).map((o) => o.id);
      const answers = Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer];
      if (q.question_type === "multiple_choice") expect(ids).toContain(q.correct_answer);
      if (q.question_type === "true_false") expect(["true", "false"]).toContain(q.correct_answer);
      if (q.question_type === "multi_select") answers.forEach((a) => expect(ids).toContain(a));
      if (q.question_type === "ordering") expect([...answers].sort()).toEqual([...ids].sort());
      expect(q.explanation.length).toBeGreaterThan(10);
    }
  });

  it("finds the full path to a subtopic", () => {
    const path = subtopicPath(SUBTOPICS.find((s) => s.id.endsWith("000000060301"))!.id)!;
    expect([path.country.code, path.state.code, path.subject.name, path.year.name, path.topic.title]).toEqual([
      "AU",
      "NSW",
      "Mathematics",
      "Year 6",
      "Geometry",
    ]);
    expect(path.subjectKey).toBe("maths");
    expect(subtopicPath("nope")).toBeNull();
  });

  it("stores progress under the skill when there is one", () => {
    const linked = SUBTOPICS.find((s) => s.skill_id)!;
    const own = SUBTOPICS.find((s) => !s.skill_id)!;
    expect(progressKey(linked)).toBe(linked.skill_id);
    expect(progressKey(own)).toBe(own.id);
  });
});

describe("written questions in practice", () => {
  it("marks the right answer correct for every question", () => {
    for (const q of QUESTIONS) {
      for (const seed of [1, 2, 3]) {
        const practice = toPracticeQuestion(q, seed);
        expect(checkAnswer(practice.answer, rightInput(practice)).correct, q.question_text).toBe(true);
      }
    }
  });

  it("marks a wrong choice wrong", () => {
    const q = toPracticeQuestion(
      QUESTIONS.find((q) => q.question_type === "multiple_choice")!,
      1,
    );
    const wrong = (q.answer as { index: number }).index === 0 ? "1" : "0";
    expect(checkAnswer(q.answer, wrong).correct).toBe(false);
  });

  it("never shows an ordering question already in order", () => {
    for (const q of QUESTIONS.filter((q) => q.question_type === "ordering")) {
      for (let seed = 0; seed < 50; seed++) {
        const practice = toPracticeQuestion(q, seed);
        const order = (practice.answer as { order: number[] }).order;
        expect(order.every((v, i) => v === i)).toBe(false);
      }
    }
  });

  it("gives a nudge when some but not all multi-select answers are chosen", () => {
    const answer = { kind: "multi" as const, indices: [0, 2, 4] };
    expect(checkAnswer(answer, "4,0,2").correct).toBe(true);
    expect(checkAnswer(answer, "0,2")).toMatchObject({ correct: false, feedback: expect.stringContaining("at least one more") });
    expect(checkAnswer(answer, "0,1").feedback).toBeUndefined();
    expect(checkAnswer(answer, "").unreadable).toBe(true);
  });

  it("is forgiving with typed answers", () => {
    expect(textMatches("115", "115°")).toBe(true);
    expect(textMatches("115", "115 degrees")).toBe(true);
    expect(textMatches("60", " 60 minutes ")).toBe(true);
    expect(textMatches("0.25", ".25")).toBe(true);
    expect(textMatches("don't", "Don’t")).toBe(true);
    expect(textMatches("went", "Went.")).toBe(true);
    expect(textMatches("?", "?")).toBe(true);
    expect(textMatches("?", ".")).toBe(false);
    expect(textMatches("115", "116")).toBe(false);
    expect(textMatches("went", "goed")).toBe(false);
  });
});

describe("tutor context for a written question set", () => {
  it("describes the topic, and ignores ids it doesn't know", () => {
    const sub = SUBTOPICS.find((s) => s.title === "Apostrophes")!;
    const prompt = buildContextPrompt({ studentName: "Ava", yearLevel: 5, skillId: sub.id });
    expect(prompt).toContain("Current topic: English, Year 5, Grammar and punctuation: Apostrophes.");
    expect(buildContextPrompt({ studentName: "Ava", yearLevel: 5, skillId: "unknown" })).toBe("Student: Ava, Year 5.");
  });
});

describe("SQL export", () => {
  it("is up to date with the tree (run `npm run content:sql` after changing content)", () => {
    const file = readFileSync(new URL("../../../database/005_my247tutor_content.sql", import.meta.url), "utf8");
    expect(file).toBe(contentSeedSql());
  });

  it("writes JSONB answers as valid JSON", () => {
    expect(contentSeedSql()).toContain(`'"b"'::jsonb`);
  });
});

describe("question bank", () => {
  const LEVELS = ["very_easy", "easy", "medium", "hard", "very_hard"] as const;

  // Speaking, reading aloud and handwriting can't be marked by a quiz, so they have no question sets.
  const NOT_QUIZZED = /-(OLC|REFLU|HANDW)-/;

  for (const subject of ["maths", "english"] as const)
    for (const year of [1, 2, 3, 4, 5, 6, 7] as const)
      it(`gives every ${year === 7 ? "Year 7–8" : `Year ${year}`} ${subject} standard 30 questions, six at each level`, () => {
        // Stage 4 is one two-year stage: Years 7 and 8 between them cover every Stage 4 standard.
        const years = year === 7 ? ([7, 8] as const) : [year];
        const subtopics = years.flatMap((y) => topicsFor(subject, y)).flatMap((t) => subtopicsOf(t.id));
        const stage = yearToStage(year);
        const outcomes = OUTCOMES.filter((o) => o.subject === subject && o.stage === stage && !NOT_QUIZZED.test(o.code));
        expect(outcomes.length).toBe({ maths: { 1: 16, 2: 20, 3: 21, 4: 17 }, english: { 1: 6, 2: 7, 3: 6, 4: 6 } }[subject][stage]);
        for (const outcome of outcomes) {
          const questions = subtopics.filter((s) => s.outcome_code === outcome.code).flatMap((s) => questionsOf(s.id));
          expect(questions.length, outcome.code).toBeGreaterThanOrEqual(30);
          for (const level of LEVELS)
            expect(questions.filter((q) => q.difficulty === level).length, `${outcome.code} ${level}`).toBeGreaterThanOrEqual(6);
        }
      });

  it("gives every subtopic that is quizzed at least 30 questions", () => {
    for (const s of SUBTOPICS) {
      const free = s.skill_id && SKILLS.find((k) => k.id === s.skill_id)?.practice === "writing";
      if (!free) expect(questionsOf(s.id).length, s.title).toBeGreaterThanOrEqual(30);
    }
  });

  it("only names standards that exist", () => {
    for (const s of SUBTOPICS) if (s.outcome_code) expect(OUTCOMES.map((o) => o.code)).toContain(s.outcome_code);
  });

  it("works out every written sum and confirms the stored answer", () => {
    const evaluate = (expr: string) =>
      Function(
        `"use strict"; return (${expr
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/(\d) (?=\d{3}\b)/g, "$1")});`,
      )() as number;
    let checked = 0;
    for (const q of QUESTIONS) {
      const text = q.question_text;
      if (!/^[\d\s.+−×÷=_?]+$/.test(text) || !text.includes("=")) continue;
      const [left, right] = text.split("=").map((side) => side.trim());
      const answers = (Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer]).map((a) =>
        a.replace(/(\d) (?=\d{3}\b)/g, "$1"),
      );
      if (q.question_type === "true_false") expect(String(evaluate(left) === evaluate(right)), text).toBe(q.correct_answer);
      else if (right === "?") expect(Number(answers[0]), text).toBeCloseTo(evaluate(left), 9);
      else {
        const filled = (side: string) => evaluate(side.replace("___", answers[0]));
        expect(filled(left), text).toBeCloseTo(filled(right), 9);
      }
      checked++;
    }
    expect(checked).toBeGreaterThanOrEqual(40);
  });

  it("practises the easiest questions first, building to the hardest", () => {
    const sub = SUBTOPICS.find((s) => s.outcome_code === "MA2-CHAN-01")!;
    const questions = questionsOf(sub.id);
    for (const seed of [1, 2, 3]) {
      const order = practiceOrder(questions, new Rng(seed));
      expect([...order].sort((a, b) => a - b)).toEqual(questions.map((_, i) => i));
      const ranks = order.map((i) => LEVELS.indexOf(questions[i].difficulty as (typeof LEVELS)[number]));
      expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    }
  });
});
