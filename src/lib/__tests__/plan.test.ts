import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEARNING_PLAN_SQL } from "../auth/planSchema";
import { doesSubject, sessionTimes, subjectsName } from "../learner/plan";

describe("learning plans", () => {
  it("keeps the database file and the app's own SQL the same", () => {
    expect(readFileSync(join(__dirname, "../../../database/023_my247tutor_learning_plans.sql"), "utf8")).toContain(LEARNING_PLAN_SQL);
  });

  it("does both subjects without a plan, and only the chosen one with one", () => {
    expect(doesSubject(undefined, "maths")).toBe(true);
    expect(doesSubject({ subjects: "both", session: null }, "english")).toBe(true);
    expect(doesSubject({ subjects: "maths", session: null }, "maths")).toBe(true);
    expect(doesSubject({ subjects: "maths", session: null }, "english")).toBe(false);
    expect(subjectsName("both")).toBe("Maths and English");
  });

  it("says when a session meets", () => {
    const session = {
      id: "c",
      name: "Year 3",
      teacherName: "Ms Lee",
      times: [
        { weekday: 2, start: "16:30", minutes: 60 },
        { weekday: 6, start: "09:00", minutes: 45 },
      ],
    };
    expect(sessionTimes(session)).toBe("Tuesday 4:30pm (60 min), Saturday 9am (45 min)");
  });
});

describe("still to do with a plan", () => {
  it("leaves out a subject the child isn't doing", async () => {
    const { newProfile } = await import("../learner/model");
    const { stillToDo } = await import("../learner/parentSummary");
    const profile = { ...newProfile("Ollie", 3, 0), plan: { subjects: "english" as const, session: null } };
    const titles = stillToDo(profile, []).map((t) => t.title);
    expect(titles.some((t) => t.startsWith("English"))).toBe(true);
    expect(titles.some((t) => t.startsWith("Maths"))).toBe(false);
  });
});
