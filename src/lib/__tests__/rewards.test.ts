import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { REWARDS_SQL } from "../auth/rewardSchema";
import type { LessonPart, WeeklyLesson } from "../learner/lesson";
import { lessonFinished, lessonPoints, lessonWeeks, rewardText, totalsText, validAmount } from "../learner/rewards";

const part = (questions: number, results: (number | boolean)[]): LessonPart => ({
  kind: "activity",
  title: "Fractions",
  year: 5,
  questionIds: Array.from({ length: questions }, (_, i) => `q${i}`),
  results,
});
const lesson = (...parts: LessonPart[]): WeeklyLesson => ({ week: "2026-10-19", parts });

describe("the reward program", () => {
  it("has a database migration matching the app's schema", () => {
    expect(readFileSync(join(__dirname, "../../../database/025_my247tutor_rewards.sql"), "utf8")).toContain(REWARDS_SQL);
  });

  it("gives 3 points for green, 2 for yellow and 1 for red", () => {
    // Right first go, right second go, right third go, not right; true/false from older lessons.
    expect(lessonPoints(lesson(part(4, [1, 2, 3, 0]), part(2, [true, false])))).toBe(3 + 2 + 2 + 1 + 3 + 1);
    expect(lessonPoints(lesson(part(3, [])))).toBe(0);
    expect(lessonPoints(undefined)).toBe(0);
  });

  it("only counts answers to the lesson's own questions", () => {
    expect(lessonPoints(lesson(part(1, [1, 1, 1])))).toBe(3);
  });

  it("knows when every part of the week's lesson is done", () => {
    expect(lessonFinished(lesson(part(2, [1, 0]), part(1, [2])))).toBe(true);
    expect(lessonFinished(lesson(part(2, [1, 0]), part(1, [])))).toBe(false);
    expect(lessonFinished(lesson())).toBe(false);
    expect(lessonFinished(undefined)).toBe(false);
  });

  it("reads each subject's week from a profile", () => {
    const maths = lesson(part(2, [1, 1]));
    const english = { ...lesson(part(2, [1])), week: "not a week" };
    expect(lessonWeeks({ lessons: { maths, english } })).toEqual([{ subject: "maths", week: "2026-10-19", points: 6, finished: true }]);
  });

  it("only allows sensible amounts", () => {
    expect(validAmount("points", 10)).toBe(true);
    expect(validAmount("points", 2.5)).toBe(false);
    expect(validAmount("points", 0)).toBe(false);
    expect(validAmount("points", 20_000)).toBe(false);
    expect(validAmount("money", 2.5)).toBe(true);
    expect(validAmount("money", 0.05)).toBe(true);
    expect(validAmount("money", 1.234)).toBe(false);
    expect(validAmount("money", 5000)).toBe(false);
  });

  it("says rewards in words", () => {
    expect(rewardText("points", 1)).toBe("1 point");
    expect(rewardText("points", 10)).toBe("10 points");
    expect(rewardText("money", 2.5)).toBe("$2.50");
    expect(totalsText({ points: 50, money: 6 })).toBe("50 points and $6.00");
    expect(totalsText({ points: 0, money: 0 })).toBe("nothing yet");
  });
});
