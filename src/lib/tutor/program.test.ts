import { describe, expect, it } from "vitest";
import { newProfile } from "../learner/model";
import { weekOf } from "../learner/lesson";
import { programAhead, programText } from "./program";

const now = new Date("2026-10-22T10:00:00").getTime();
const lesson = (results: number[], total = 4) => ({
  week: weekOf(now),
  curriculum: "nsw" as const,
  parts: [{ kind: "activity" as const, title: "Adding", year: 5, questionIds: Array.from({ length: total }, (_, i) => `q${i}`), results }],
});

describe("programAhead", () => {
  it("starts with the starting check for a new child", () => {
    const p = programAhead({ ...newProfile("Rod", 5), id: "x" }, now);
    expect(p.steps.map((s) => s.label)).toEqual(["Maths check", "English check"]);
    expect(programText(p)).toBe(
      "Here's your program this week. Maths: a short starting check, so I know where to begin. English: a short starting check, so I know where to begin. Shall we do the Maths check? Or is there something else you'd like to do?",
    );
  });

  it("puts a lesson already started first, and leaves finished ones out", () => {
    const profile = {
      ...newProfile("Rod", 5),
      placementDone: { maths: true, english: true },
      lessons: { maths: lesson([1, 1, 1, 1]), english: lesson([1], 4) },
    } as Parameters<typeof programAhead>[0];
    const p = programAhead(profile, now);
    expect(p.lines).toEqual(["Maths: this week's lesson is all done. Great work!", "English: 1 of 4 questions done, 3 to go."]);
    expect(p.steps.map((s) => s.href)).toEqual(["/learn/english"]);
  });

  it("says when everything is done", () => {
    const profile = {
      ...newProfile("Rod", 5),
      placementDone: { maths: true },
      plan: { subjects: "maths" },
      lessons: { maths: lesson([1, 1, 1, 1]) },
    } as Parameters<typeof programAhead>[0];
    expect(programText(programAhead(profile, now))).toContain("You've finished this week's lessons!");
  });
});
