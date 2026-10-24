import { describe, expect, it } from "vitest";
import { buildLesson } from "../content/lesson";
import { autoActivities, autoSlots } from "../learner/autoActivities";
import { weekOf } from "../learner/lesson";
import { newProfile, type LearnerProfile } from "../learner/model";

const NOW = Date.UTC(2026, 9, 21);
const WEEK = weekOf(NOW);
const withLesson = (p: LearnerProfile, subject: "maths" | "english"): LearnerProfile => ({
  ...p,
  lessons: { ...p.lessons, [subject]: buildLesson(p, subject, NOW) },
});

describe("automatic activities", () => {
  it("fills three boxes a subject, six for a maths and English class", () => {
    expect(autoSlots("maths")).toBe(3);
    expect(autoSlots("english")).toBe(3);
    expect(autoSlots("both")).toBe(6);
  });

  it("are the maths weekly lesson: the review and two stream activities, with scores once done", () => {
    const p = withLesson({ ...newProfile("Ava", 4, NOW), id: "a" }, "maths");
    const before = autoActivities(p, "maths", WEEK);
    expect(before).toHaveLength(3);
    expect(before[0]).toMatchObject({ title: expect.stringContaining("review"), detail: "Weekly lesson", done: false, answered: 0 });
    const lesson = p.lessons!.maths!;
    const done = {
      ...p,
      lessons: { maths: { ...lesson, parts: lesson.parts.map((x) => ({ ...x, results: x.questionIds.map((_, i) => (i < 6 ? 1 : 0)) })) } },
    };
    const after = autoActivities(done, "maths", WEEK);
    expect(after.every((a) => a.done && a.right === 6)).toBe(true);
    expect(after[0].total).toBe(lesson.parts[0].questionIds.length);
  });

  it("says what's coming before the student opens this week's lesson", () => {
    const p = { ...newProfile("Ava", 4, NOW), id: "a" };
    expect(autoActivities(p, "maths", WEEK).map((a) => a.title)).toEqual(["Review", "Activity", "Activity"]);
    expect(autoActivities({ ...p, yearLevel: 6 }, "english", WEEK).map((a) => a.title)).toEqual(["Comprehension", "Writing", "Vocabulary"]);
  });

  it("are the reading lesson's sounds, sight words and story below Year 6", () => {
    const p = { ...newProfile("Ava", 3, NOW), id: "a" };
    expect(autoActivities(p, "english", WEEK).map((a) => a.title)).toEqual(["Sounds", "Sight words", "Story"]);
    expect(autoActivities(p, "english", WEEK)[0].detail).toBe("After the reading check");
  });

  it("from Year 6, English is comprehension, writing and vocabulary", () => {
    const p = withLesson({ ...newProfile("Ava", 6, NOW), id: "a" }, "english");
    const parts = p.lessons!.english!.parts;
    expect(parts.map((x) => x.title.split(":")[0])).toEqual(["Comprehension", "Writing", "Vocabulary"]);
    expect(parts.every((x) => x.questionIds.length === 10)).toBe(true);
    expect(autoActivities(p, "english", WEEK).map((a) => a.detail)).toEqual(["Comprehension", "Writing", "Vocabulary"]);
    // Year 5 keeps the usual lesson.
    expect(buildLesson({ ...newProfile("Ava", 5, NOW), id: "a" }, "english", NOW).parts[0].kind).toBe("review");
  });
});
