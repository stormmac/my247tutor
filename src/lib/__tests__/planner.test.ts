import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { openNow, redoOf, type SetWork } from "../../components/SetWork";
import { PLANNER_HOMEWORK_SQL, PLANNER_SQL } from "../auth/familySchema";
import {
  FinishWorkSchema,
  homeworkSlot,
  MAX_SESSION_ACTIVITIES,
  MAX_SESSION_HOMEWORK,
  PlanWorkSchema,
  UnplanWorkSchema,
} from "../auth/rules";
import { addSetWork, buildLesson, mistakesOf, syncSetWork } from "../content/lesson";
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
  slot: null,
  kind: "topic",
  ...over,
});

describe("the lesson planner", () => {
  it("has a migration file matching the app's own SQL", () => {
    expect(readFileSync(join(__dirname, "../../../database/027_my247tutor_lesson_planner.sql"), "utf8")).toContain(PLANNER_SQL);
    expect(readFileSync(join(__dirname, "../../../database/028_my247tutor_planner_homework.sql"), "utf8")).toContain(PLANNER_HOMEWORK_SQL);
  });

  it("plans one of eight activity boxes or three homework boxes for a session's Monday", () => {
    const ok = { kind: "slot", classId: CLASS, week: "2026-10-19", learnerIds: [LEARNER], slot: 1, subject: "maths", subtopicId: AREA_Y4 };
    expect(PlanWorkSchema.safeParse(ok).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, slot: MAX_SESSION_ACTIVITIES }).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, slot: MAX_SESSION_ACTIVITIES + MAX_SESSION_HOMEWORK }).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, slot: MAX_SESSION_ACTIVITIES + MAX_SESSION_HOMEWORK + 1 }).success).toBe(false);
    expect(homeworkSlot(MAX_SESSION_ACTIVITIES)).toBe(false);
    expect(homeworkSlot(MAX_SESSION_ACTIVITIES + 1)).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...ok, slot: 0 }).success).toBe(false);
    expect(PlanWorkSchema.safeParse({ ...ok, subtopicId: "" }).success).toBe(false);
    // A Tuesday isn't a week.
    expect(PlanWorkSchema.safeParse({ ...ok, week: "2026-10-20" }).success).toBe(false);
    expect(PlanWorkSchema.safeParse({ ...ok, learnerIds: [] }).success).toBe(false);
    // Redoing the questions got wrong goes in a homework box.
    const redo = { kind: "mistakes", classId: CLASS, week: "2026-10-19", learnerIds: [LEARNER], subject: "english" };
    expect(PlanWorkSchema.safeParse({ ...redo, slot: MAX_SESSION_ACTIVITIES + 1 }).success).toBe(true);
    expect(PlanWorkSchema.safeParse({ ...redo, slot: MAX_SESSION_ACTIVITIES }).success).toBe(false);
    expect(PlanWorkSchema.safeParse(redo).success).toBe(false);
    expect(UnplanWorkSchema.safeParse({ classId: CLASS, week: "2026-10-19", learnerIds: [LEARNER], slot: 11 }).success).toBe(true);
    expect(UnplanWorkSchema.safeParse({ classId: CLASS, week: "2026-10-19", learnerIds: [], slot: 4 }).success).toBe(false);
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

  it("redoes the session's class activities in the homework's subject only, not its other homework", () => {
    const all = [
      work({ id: "a" }),
      work({ id: "b", homework: true }),
      work({ id: "c", subject: "english" }),
      work({ id: "d", week: "2026-10-12" }),
      work({ id: "e", classId: null, week: null }),
      work({ id: "m", kind: "mistakes", homework: true, subtopicId: "" }),
    ];
    expect(redoOf(all[5], all)).toEqual(["a"]);
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

  it("follows the teacher's changes to boxes not started, and leaves started ones", () => {
    const profile = { ...newProfile("Ava", 4, NOW), id: LEARNER };
    const lesson = buildLesson(profile, "maths", NOW);
    const PLACE = lesson.parts.find((p) => p.kind === "activity")!.subtopicId!;
    const a = { id: "a", subtopicId: AREA_Y4, setBy: "Ms Lee", note: null };
    const b = { id: "b", subtopicId: AREA_Y4, setBy: "Ms Lee", note: null };
    const both = addSetWork(lesson, [a, b], profile);
    // Nothing changed: the same lesson back.
    expect(syncSetWork(both, [a, b], profile)).toBe(both);
    // Box a gets a new activity and b becomes homework.
    const changed = syncSetWork(
      both,
      [
        { ...a, subtopicId: PLACE },
        { ...b, homework: true },
      ],
      profile,
    );
    expect(changed.parts.find((p) => p.setWorkId === "a")).toMatchObject({ subtopicId: PLACE });
    expect(changed.parts.find((p) => p.setWorkId === "b")).toMatchObject({ subtopicId: AREA_Y4, homework: true });
    expect(changed.parts.length).toBe(both.parts.length);
    // Taken back: a goes. Started: b stays, whatever the teacher does.
    const started = { ...both, parts: both.parts.map((p) => (p.setWorkId === "b" ? { ...p, results: [1] } : p)) };
    const after = syncSetWork(started, [], profile);
    expect(after.parts.map((p) => p.setWorkId).filter(Boolean)).toEqual(["b"]);
    expect(syncSetWork(started, [{ ...b, subtopicId: PLACE }], profile).parts.find((p) => p.setWorkId === "b")!.subtopicId).toBe(AREA_Y4);
  });
});
