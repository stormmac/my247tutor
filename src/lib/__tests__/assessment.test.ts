import { describe, expect, it } from "vitest";
import { subtopicPath } from "../content/tree";
import {
  applyAssessment,
  finishAssessment,
  MAX_QUESTIONS,
  nextQuestion,
  questionsAt,
  recordAnswer,
  standing,
  startAssessment,
  startYearFor,
  summarySentence,
  topicResults,
  type AssessmentState,
} from "../learner/assessment";
import { newProfile } from "../learner/model";
import { Rng } from "../practice/rng";

const T0 = Date.UTC(2026, 9, 14);

/** Runs a whole assessment, answering with `answer(state)` each time. */
function run(subject: "maths" | "english", year: 3 | 4 | 5 | 6, answer: (s: AssessmentState) => boolean, seed = 1) {
  const rng = new Rng(seed);
  let s = startAssessment(subject, year);
  for (;;) {
    const q = nextQuestion(s, () => rng.next());
    if (!q) break;
    s = recordAnswer(s, q, answer(s), { question: q.question_text, answer: "x", rightAnswer: "y" });
  }
  return { state: s, record: finishAssessment(s, T0) };
}

describe("starting assessment", () => {
  it("starts two years below the student's year, at level 1, but not below Year 3", () => {
    expect([3, 4, 5, 6].map((y) => startYearFor(y as 3 | 4 | 5 | 6))).toEqual([3, 3, 3, 4]);
    const s = startAssessment("maths", 6);
    expect(s.steps[0]).toEqual({ year: 4, level: 1 });
    expect(s.steps.at(-1)).toEqual({ year: 6, level: 5 });
    expect(startAssessment("english", 4).steps.at(-1)).toEqual({ year: 5, level: 5 });
  });

  it("has written questions at every step, in both subjects", () => {
    for (const subject of ["maths", "english"] as const)
      for (const year of [3, 4, 5, 6] as const)
        for (const step of startAssessment(subject, year).steps)
          expect(questionsAt(subject, step).length, `${subject} ${step.year} ${step.level}`).toBeGreaterThan(5);
  });

  it("asks questions of the right year and level, never the same one twice, spread across topics", () => {
    const { record } = run("maths", 5, () => true);
    const ids = record.answers.map((a) => a.questionId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of record.answers) expect(subtopicPath(a.subtopicId)?.year.name).toBe(`Year ${a.year}`);
    expect(new Set(record.answers.map((a) => a.topic)).size).toBeGreaterThan(record.answers.length / 2);
  });

  it("climbs to the top for a student who gets everything right", () => {
    const { record } = run("maths", 5, () => true);
    expect(record.reached).toEqual({ year: 6, level: 5 });
    expect(record.stoppedAt).toBeNull();
    expect(record.answers.length).toBeLessThanOrEqual(MAX_QUESTIONS);
    expect(standing(record)).toBe("ahead");
  });

  it("stops after two wrong answers at the first step", () => {
    const { record } = run("english", 4, () => false);
    expect(record.reached).toBeNull();
    expect(record.answers).toHaveLength(2);
    expect(record.stoppedAt).toEqual({ year: 3, level: 1 });
    expect(summarySentence(record, "Ava")).toContain("found the very easy Year 3 English questions tricky");
  });

  it("asks a third question when a step is split, and passes it on two of three", () => {
    let s = startAssessment("maths", 4);
    const rng = new Rng(3);
    const answers = [true, false, true];
    for (const correct of answers)
      s = recordAnswer(
        s,
        nextQuestion(s, () => rng.next())!,
        correct,
      );
    expect(s.passed).toBe(0);
    expect(s.step).toBe(1);
    expect(s.answers).toHaveLength(3);
  });

  it("finds the level a student can manage", () => {
    // Right up to Year 4 medium, wrong after that.
    const { record } = run("maths", 5, (s) => s.steps[s.step].year < 4 || (s.steps[s.step].year === 4 && s.steps[s.step].level <= 3));
    expect(record.reached).toEqual({ year: 4, level: 3 });
    expect(record.stoppedAt).toEqual({ year: 4, level: 5 });
    expect(standing(record)).toBe("below");
    expect(summarySentence(record, "Ava")).toBe(
      "Ava answered Year 4 questions up to level 3 of 5 (medium) in Maths, a little behind Year 5. Practice will start there and build up.",
    );
  });

  it("saves the report, the questions and what the student already knows", () => {
    const { record } = run("maths", 5, (s) => s.steps[s.step].year <= 3);
    const p = applyAssessment(newProfile("Ava", 5, T0), record);
    expect(p.placementDone.maths).toBe(true);
    expect(p.assessments).toHaveLength(1);
    expect(p.history).toHaveLength(record.answers.length);
    expect(p.history[0]).toMatchObject({ question: record.answers[0].question, answer: "x" });
    // Passed all of Year 3, so skills taught only in Year 3 count as known.
    expect(Object.values(p.skills).some((s) => s.placed && s.mastered)).toBe(true);
    const again = applyAssessment(p, { ...record, at: T0 + 1 });
    expect(again.assessments).toHaveLength(1);
  });

  it("lists topic results, best first", () => {
    const { record } = run("english", 5, (s) => s.answers.length % 3 !== 2);
    const topics = topicResults(record);
    expect(topics.reduce((n, t) => n + t.total, 0)).toBe(record.answers.length);
    for (let i = 1; i < topics.length; i++)
      expect(topics[i - 1].right / topics[i - 1].total).toBeGreaterThanOrEqual(topics[i].right / topics[i].total);
  });
});
