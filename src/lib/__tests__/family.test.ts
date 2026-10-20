import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FAMILY_SQL } from "../auth/familySchema";
import { accountPlan, FinishWorkSchema, NewParentSchema, SetWorkSchema } from "../auth/rules";
import { addSetWork, buildLesson } from "../content/lesson";
import { nextPart } from "../learner/lesson";
import { newProfile } from "../learner/model";

const NOW = Date.UTC(2026, 9, 20);
const parent = { role: "parent" as const, freeAccess: false, trialEndsAt: null, subscriptionStatus: null };
const LEARNER = "3f0c5a52-8b7e-4d55-9c1a-2a7f2f1d9e01";
const AREA_Y4 = "51000000-0000-0000-0000-000000040605";

describe("parents of centre students", () => {
  it("don't pay while the centre covers them, but do once they add a child of their own", () => {
    expect(accountPlan({ ...parent, centreCovered: true }, NOW)).toBe("centre");
    // With a child of their own they aren't covered, so their trial or card decides.
    expect(accountPlan({ ...parent, centreCovered: false }, NOW)).toBe("unpaid");
    expect(accountPlan({ ...parent, centreCovered: false, trialEndsAt: NOW + 1000 }, NOW)).toBe("trial");
    expect(accountPlan({ ...parent, centreCovered: true, subscriptionStatus: "active" }, NOW)).toBe("paying");
  });

  it("need a name and email to be added", () => {
    expect(NewParentSchema.safeParse({ name: "Sam", email: "sam@example.com" }).success).toBe(true);
    expect(NewParentSchema.safeParse({ name: "", email: "sam@example.com" }).success).toBe(false);
    expect(NewParentSchema.safeParse({ name: "Sam", email: "not an email" }).success).toBe(false);
  });

  it("has a migration file matching the app's own SQL", () => {
    expect(readFileSync(join(__dirname, "../../../database/018_my247tutor_parents_and_set_work.sql"), "utf8")).toContain(FAMILY_SQL);
  });
});

describe("set work", () => {
  it("takes one to five topics in a subject, and a short note", () => {
    const ok = { learnerId: LEARNER, subject: "maths", subtopicIds: [AREA_Y4] };
    expect(SetWorkSchema.safeParse(ok).success).toBe(true);
    expect(SetWorkSchema.safeParse({ ...ok, note: "Before Friday" }).success).toBe(true);
    expect(SetWorkSchema.safeParse({ ...ok, subtopicIds: [] }).success).toBe(false);
    expect(SetWorkSchema.safeParse({ ...ok, subtopicIds: Array(6).fill(AREA_Y4) }).success).toBe(false);
    expect(SetWorkSchema.safeParse({ ...ok, subject: "science" }).success).toBe(false);
    expect(SetWorkSchema.safeParse({ ...ok, note: "x".repeat(201) }).success).toBe(false);
    expect(FinishWorkSchema.safeParse({ learnerId: LEARNER, right: 8, total: 10 }).success).toBe(true);
    expect(FinishWorkSchema.safeParse({ learnerId: LEARNER, right: 8, total: 0 }).success).toBe(false);
  });

  it("joins the weekly lesson as ten questions on its topic, once", () => {
    const profile = { ...newProfile("Ava", 4, NOW), id: LEARNER };
    const lesson = buildLesson(profile, "maths", NOW);
    const work = [{ id: "w1", subtopicId: AREA_Y4, setBy: "Ms Lee", note: "Practise before Friday" }];
    const withWork = addSetWork(lesson, work, profile);
    const part = withWork.parts.at(-1)!;
    expect(part).toMatchObject({ kind: "set", setWorkId: "w1", setBy: "Ms Lee", note: "Practise before Friday", subtopicId: AREA_Y4 });
    expect(part.title).toBe("Measurement and time: Area");
    expect(part.questionIds).toHaveLength(10);
    // Added again (the next visit), it isn't doubled.
    expect(addSetWork(withWork, work, profile)).toBe(withWork);
    // A finished lesson has something to do again.
    const finished = { ...lesson, parts: lesson.parts.map((p) => ({ ...p, results: p.questionIds.map(() => 1) })) };
    expect(nextPart(finished)).toBe(-1);
    expect(nextPart(addSetWork(finished, work, profile))).toBe(finished.parts.length);
  });

  it("leaves out work on a topic the child's curriculum doesn't have", () => {
    const profile = { ...newProfile("Ava", 4, NOW), id: LEARNER };
    const lesson = buildLesson(profile, "maths", NOW);
    expect(addSetWork(lesson, [{ id: "w2", subtopicId: "51000000-0000-0000-0000-000000999999", setBy: null, note: null }], profile)).toBe(
      lesson,
    );
  });
});
