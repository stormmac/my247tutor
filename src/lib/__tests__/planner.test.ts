import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { openNow, redoOf, type SetWork } from "../../components/SetWork";
import { PLANNER_SQL } from "../auth/familySchema";
import { FinishWorkSchema, MAX_SESSION_ACTIVITIES, PlanWorkSchema } from "../auth/rules";
import { addSetWork, buildLesson, mistakesOf } from "../content/lesson";
import { addWeeks, dayOfWeek } from "../learner/lesson";
import { newProfile } from "../learner/model";

const NOW = Date.UTC(2026, 9, 20);
const LEARNER = "3f0c5a52-8b7e-4d55-9c1a-2a7f2f1d9e01";
const CLASS = "9a1c5a52-8b7e-4d55-9c1a-2a7f2f1d9e02";
const AREA_Y4 = "51000000-0000-0000-0000-000000040605";

const work = (over: Partial<SetWork>): SetWork => ({
  id: "w",
  subject: "maths",
  subtopicId: AREA_Y4,
  note: null,
  setBy: "Ms Lee",
  createdAt: new Date(NOW).toISOString(),
  doneAt: null,
  right: null,
  total: null,
  atSchool: false,
  classId: CLASS,
  week: "2026-10-19",
  homework: false,
  kind: "topic",
  ...over,
});

describe("the lesson planner", () => {
  it("has a migration file matching the app's own SQL", () => {
    expect(readFileSync(join(__dirname, "../../../database/027_my247tutor_lesson_planner.sql"), "utf8")).toContain(PLANNER_SQL);
  });

  it("plans up to eight activities for a session's Monday", () => {
    const ok = { kind: "topic", classId: CLASS, week: "2026-10-19", learnerIds: [LEARNER], subject: "maths", subtopicIds: [AREA_Y4] };
    expect(PlanWorkSchema.safeParse(ok).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, subtopicIds: Array(MAX_SESSION_ACTIVITIES).fill(AREA_Y4) }).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, subtopicIds: Array(MAX_SESSION_ACTIVITIES + 1).fill(AREA_Y4) }).success).toBe(false);
    // A Tuesday isn't a week.
    expect(PlanWorkSchema.safeParse({ ...ok, week: "2026-10-20" }).success).toBe(false);
    expect(PlanWorkSchema.safeParse({ ...ok, learnerIds: [] }).success).toBe(false);
    expect(
      PlanWorkSchema.safeParse({ kind: "mistakes", classId: CLASS, week: "2026-10-19", learnerIds: [LEARNER], subject: "english" }).success,
    ).toBe(true);
  });

  it("finishes redo homework with nothing to redo, but never more right than asked", () => {
    expect(FinishWorkSchema.safeParse({ learnerId: LEARNER, right: 0, total: 0 }).success).toBe(true);
    expect(FinishWorkSchema.safeParse({ learnerId: LEARNER, right: 3, total: 2 }).success).toBe(false);
  });

  it("moves between weeks and finds a session's day", () => {
    expect(addWeeks("2026-10-19", 1)).toBe("2026-10-26");
    expect(addWeeks("2026-11-02", -1)).toBe("2026-10-26");
    expect(addWeeks("2026-12-28", 1)).toBe("2027-01-04");
    expect(dayOfWeek("2026-10-19", 2)).toBe("2026-10-20");
    expect(dayOfWeek("2026-10-26", 7)).toBe("2026-11-01");
  });

  it("keeps a later week's session out of this week's lesson", () => {
    expect(openNow(work({ week: "2026-10-26" }), "2026-10-19")).toBe(false);
    expect(openNow(work({ week: "2026-10-12" }), "2026-10-19")).toBe(true);
    expect(openNow(work({ week: null, classId: null }), "2026-10-19")).toBe(true);
  });

  it("redoes the session's activities in the homework's subject only", () => {
    const all = [
      work({ id: "a" }),
      work({ id: "b", homework: true }),
      work({ id: "c", subject: "english" }),
      work({ id: "d", week: "2026-10-12" }),
      work({ id: "e", classId: null, week: null }),
      work({ id: "m", kind: "mistakes", homework: true, subtopicId: "" }),
    ];
    expect(redoOf(all[5], all)).toEqual(["a", "b"]);
  });

  it("makes homework of the questions not right first go, once the activities are done", () => {
    const profile = { ...newProfile("Ava", 4, NOW), id: LEARNER };
    const items = [
      { id: "a", subtopicId: AREA_Y4, setBy: "Ms Lee", note: null },
      { id: "b", subtopicId: AREA_Y4, setBy: "Ms Lee", note: null, homework: true },
    ];
    const lesson = addSetWork(buildLesson(profile, "maths", NOW), items, profile);
    const homework = [{ id: "m", subtopicId: "", setBy: "Ms Lee", note: null, homework: true, redo: ["a", "b"] }];
    // The activities aren't done, so the homework waits.
    expect(mistakesOf(lesson, ["a", "b"])).toBeNull();
    expect(addSetWork(lesson, homework, profile)).toBe(lesson);
    expect(lesson.parts.find((p) => p.setWorkId === "b")).toMatchObject({ homework: true });

    // Activity a: right first go except the 3rd (a later go) and 5th (not right). Activity b: all right first go.
    const done = {
      ...lesson,
      parts: lesson.parts.map((p) =>
        p.setWorkId === "a"
          ? { ...p, results: p.questionIds.map((_, i) => (i === 2 ? 2 : i === 4 ? 0 : 1)) }
          : p.setWorkId === "b"
            ? { ...p, results: p.questionIds.map(() => 1) }
            : p,
      ),
    };
    const a = done.parts.find((p) => p.setWorkId === "a")!;
    expect(mistakesOf(done, ["a", "b"])).toEqual([a.questionIds[2], a.questionIds[4]]);
    const part = addSetWork(done, homework, profile).parts.at(-1)!;
    expect(part).toMatchObject({
      kind: "set",
      setWorkId: "m",
      homework: true,
      redo: true,
      questionIds: [a.questionIds[2], a.questionIds[4]],
    });
    expect(part.title).toBe("Redo the questions you got wrong");

    // Everything right first go: nothing to redo, and no empty part.
    const perfect = { ...done, parts: done.parts.map((p) => (p.setWorkId ? { ...p, results: p.questionIds.map(() => 1) } : p)) };
    expect(mistakesOf(perfect, ["a", "b"])).toEqual([]);
    expect(addSetWork(perfect, homework, profile)).toBe(perfect);
  });
});
