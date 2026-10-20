import { describe, expect, it } from "vitest";
import { SUBTOPICS } from "../content/tree";
import { SetWorkSchema } from "../auth/rules";
import { newProfile, recordAttempt, type LearnerProfile } from "../learner/model";
import { completedSummary, focusAreas, stillToDo, type SetWorkSummary } from "../learner/parentSummary";

const T0 = Date.UTC(2027, 1, 1);
const apostrophes = SUBTOPICS.find((s) => s.title === "Apostrophes")!;

function practise(profile: LearnerProfile, skillId: string, results: boolean[], at = T0) {
  return results.reduce((p, correct, i) => recordAttempt(p, skillId, correct, 0, at + i * 1000), profile);
}

const work = (over: Partial<SetWorkSummary>): SetWorkSummary => ({
  id: "w1",
  subject: "english",
  subtopicId: apostrophes.id,
  setBy: "Ms Lee",
  doneAt: null,
  right: null,
  total: null,
  atSchool: false,
  ...over,
});

describe("Parents page summary", () => {
  it("lists the starting assessments and pending work as still to do", () => {
    const p = newProfile("Ava", 5, T0);
    const todo = stillToDo(p, [work({}), work({ id: "w2", atSchool: true }), work({ id: "w3", doneAt: "2027-02-01" })], T0);
    expect(todo.map((t) => t.kind)).toEqual(["assessment", "assessment", "set", "school"]);
    expect(todo[2].title).toContain("Apostrophes");
    expect(todo[2].detail).toContain("Ms Lee");
    expect(todo[3].detail).toContain("at school");
  });

  it("lists this week's lesson once the starting assessment is done", () => {
    const p = { ...newProfile("Ava", 5, T0), placementDone: { maths: true, english: true } };
    const todo = stillToDo(p, [], T0);
    expect(todo.map((t) => t.key)).toEqual(["lesson-maths", "lesson-english"]);
  });

  it("totals questions answered and right first try, overall and this week", () => {
    let p = newProfile("Ava", 5, T0);
    p = practise(p, apostrophes.id, [true, true, false, true], T0 - 30 * 86_400_000);
    p = practise(p, apostrophes.id, [true, false], T0);
    const done = completedSummary(p, [work({ doneAt: "2027-02-01", right: 8, total: 10 })], T0);
    expect(done.allTime).toEqual({ answered: 6, rightFirstTry: 4, percent: 67 });
    expect(done.thisWeek).toEqual({ answered: 2, rightFirstTry: 1, percent: 50 });
    expect(done.bySubject.find((s) => s.subject === "english")!.tally.answered).toBe(6);
    expect(done.bySubject.find((s) => s.subject === "maths")!.tally.percent).toBeNull();
    expect(done.workDone).toEqual([expect.objectContaining({ right: 8, total: 10, atSchool: false })]);
  });

  it("flags topics going badly, with the topic to practise", () => {
    let p = newProfile("Ava", 5, T0);
    p = practise(p, apostrophes.id, [false, false, true, false]);
    const focus = focusAreas(p);
    expect(focus).toContainEqual(
      expect.objectContaining({ subtopicId: apostrophes.id, subject: "english", detail: "1 of 4 right first try." }),
    );
    // Three right of four is fine, and fewer than four questions is too few to tell.
    expect(focusAreas(practise(newProfile("Ava", 5, T0), apostrophes.id, [true, true, true, false]))).toEqual([]);
    expect(focusAreas(practise(newProfile("Ava", 5, T0), apostrophes.id, [false, false]))).toEqual([]);
  });

  it("marks set work as from school when asked", () => {
    const base = { learnerId: "11111111-1111-4111-8111-111111111111", subject: "english", subtopicIds: [apostrophes.id] };
    expect(SetWorkSchema.parse(base).atSchool).toBe(false);
    expect(SetWorkSchema.parse({ ...base, atSchool: true }).atSchool).toBe(true);
  });
});
