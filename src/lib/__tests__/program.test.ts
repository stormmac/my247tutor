import { describe, expect, it } from "vitest";
import { buildLesson } from "../content/lesson";
import { advanceProgram, makeProgram, programFor, streamOf, streamSubtopics, workingYear } from "../content/program";
import { subtopicsOf, topicsFor } from "../content/tree";
import { CURRICULA, type Curriculum } from "../curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "../curriculum/types";
import { applyAssessment, type AssessmentAnswer, type AssessmentRecord } from "../learner/assessment";
import { saveLesson, type LessonResult } from "../learner/lesson";
import { newProfile, type LearnerProfile } from "../learner/model";
import { focusStreams, passedPart, type StreamKey } from "../learner/program";

const T0 = Date.UTC(2026, 9, 19);
const sub = (n: number) => `51000000-0000-0000-0000-0000000${String(n).padStart(5, "0")}`;

/** An answer on the first subtopic of a stream in a year. */
function answer(stream: StreamKey, year: YearLevel, correct: boolean, subject: Subject = "maths"): AssessmentAnswer {
  const s = streamSubtopics(subject, stream, year, "nsw")[0].subtopic;
  return { questionId: `q-${stream}-${year}-${Math.random()}`, subtopicId: s.id, topic: s.title, year, level: 1, correct };
}

function record(
  subject: Subject,
  yearLevel: YearLevel,
  reached: AssessmentRecord["reached"],
  answers: AssessmentAnswer[],
): AssessmentRecord {
  return { subject, at: T0, yearLevel, startYear: Math.max(1, yearLevel - 2) as YearLevel, reached, stoppedAt: null, answers };
}

/** A Year 6 who is working at Year 4, weakest in measurement then geometry. */
function year6Behind(curriculum?: Curriculum): LearnerProfile {
  const answers = [
    answer("number", 4, true),
    answer("number", 4, true),
    answer("fractions", 4, true),
    answer("fractions", 4, false),
    answer("measurement", 4, false),
    answer("measurement", 4, false),
    answer("geometry", 4, false),
    answer("geometry", 4, false),
    answer("geometry", 4, true),
    answer("statistics", 4, true),
  ];
  const r = { ...record("maths", 6, { year: 4, level: 3 }, answers), ...(curriculum ? { curriculum } : {}) };
  return applyAssessment(newProfile("Ava", 6, T0, curriculum), r);
}

/** Finishes this week's activity on a stream with `right` of its questions right first go. */
function finishActivity(profile: LearnerProfile, subject: Subject, part: number, right: number): LearnerProfile {
  const lesson = profile.lessons![subject]!;
  const parts = lesson.parts.map((p, i) =>
    i === part ? { ...p, results: p.questionIds.map((_, j): LessonResult => (j < right ? 1 : j % 2 ? 2 : 0)) } : p,
  );
  return saveLesson(profile, subject, { ...lesson, parts });
}

describe("work program", () => {
  it("puts every maths subtopic in a stream", () => {
    expect(streamOf("maths", sub(40605))).toBe("measurement");
    expect(streamOf("maths", sub(30301))).toBe("number");
    expect(streamOf("maths", sub(60201))).toBe("fractions");
    expect(streamOf("maths", sub(80102))).toBe("fractions");
    expect(streamOf("maths", sub(70401))).toBe("algebra");
    expect(streamOf("maths", sub(50604))).toBe("geometry");
    expect(streamOf("maths", sub(60603))).toBe("statistics");
    expect(streamOf("english", sub(70101))).toBe("english");
    for (const year of YEARS) {
      const streams = new Set(topicsFor("maths", year).flatMap((t) => subtopicsOf(t.id).map((s) => streamOf("maths", s.id))));
      expect(streams.size, `Year ${year}`).toBeGreaterThanOrEqual(5);
    }
  });

  it("starts at the year the child is working at, never above their own year", () => {
    expect(workingYear(record("maths", 6, { year: 4, level: 3 }, []))).toBe(4);
    expect(workingYear(record("maths", 6, { year: 5, level: 1 }, []))).toBe(4);
    expect(workingYear(record("maths", 6, { year: 4, level: 1 }, []))).toBe(4);
    expect(workingYear(record("maths", 6, null, []))).toBe(4);
    expect(workingYear(record("maths", 4, { year: 5, level: 5 }, []))).toBe(4);
    expect(workingYear(record("maths", 1, null, []))).toBe(1);
  });

  it("works on the two maths streams the child did worst in, at their working year", () => {
    const profile = year6Behind();
    const program = programFor(profile, "maths")!;
    expect(program.startYear).toBe(4);
    expect(program.streams.map((s) => s.stream)).toEqual(["measurement", "geometry", "fractions", "number", "statistics"]);
    expect(program.streams.every((s) => s.year === 4)).toBe(true);
    // Algebra has no work below Year 7, so it isn't in a Year 6 program.
    expect(program.streams.some((s) => s.stream === "algebra")).toBe(false);

    const lesson = buildLesson(profile, "maths", T0);
    expect(lesson.parts.map((p) => p.kind)).toEqual(["review", "activity", "activity"]);
    expect(lesson.parts[0].year).toBe(3);
    const [a, b] = lesson.parts.slice(1);
    expect([streamOf("maths", a.subtopicId!), streamOf("maths", b.subtopicId!)]).toEqual(["measurement", "geometry"]);
    expect(a.year).toBe(4);
    expect(a.title).toMatch(/\(Year 4\)$/);
  });

  it("passes an activity with over 75% right first go", () => {
    const profile = saveLesson(year6Behind(), "maths", buildLesson(year6Behind(), "maths", T0));
    expect(passedPart(finishActivity(profile, "maths", 1, 8).lessons!.maths!.parts[1])).toBe(true);
    expect(passedPart(finishActivity(profile, "maths", 1, 7).lessons!.maths!.parts[1])).toBe(false);
    // Right on a later go doesn't count.
    const later = profile.lessons!.maths!.parts[1].questionIds.map((): LessonResult => 2);
    expect(passedPart({ ...profile.lessons!.maths!.parts[1], results: later })).toBe(false);
  });

  it("moves a stream up a year once all of its year is passed, then catches it up", () => {
    let profile = year6Behind();
    let week = T0;
    const moves: string[] = [];
    // Pass every geometry activity until the stream is past Year 6.
    for (let i = 0; i < 40 && programFor(profile, "maths")!.streams.find((s) => s.stream === "geometry")!.year <= 6; i++) {
      profile = saveLesson(profile, "maths", buildLesson(profile, "maths", week));
      const part = profile.lessons!.maths!.parts.findIndex((p) => p.subtopicId && streamOf("maths", p.subtopicId) === "geometry");
      const result = advanceProgram(finishActivity(profile, "maths", part, 9), "maths");
      profile = result.profile;
      moves.push(...result.moved.map((m) => `${m.year}${m.caughtUp ? " caught up" : ""}`));
      week += 7 * 86_400_000;
    }
    expect(moves).toEqual(["5", "6", "7 caught up"]);
    // Geometry is caught up, so the next weakest stream comes in.
    expect(focusStreams(programFor(profile, "maths")!, 6).map((s) => s.stream)).toEqual(["measurement", "fractions"]);
  });

  it("doesn't pass or move anything on a score of 75% or less", () => {
    let profile = year6Behind();
    profile = saveLesson(profile, "maths", buildLesson(profile, "maths", T0));
    const { profile: after, moved } = advanceProgram(finishActivity(profile, "maths", 1, 7), "maths");
    expect(moved).toEqual([]);
    expect(programFor(after, "maths")!.streams.every((s) => s.passed.length === 0)).toBe(true);
  });

  it("works on English as one stream at the working year", () => {
    const answers = [answer("english", 3, true, "english"), answer("english", 3, false, "english")];
    const profile = applyAssessment(newProfile("Ben", 5, T0), record("english", 5, { year: 3, level: 5 }, answers));
    const program = programFor(profile, "english")!;
    expect(program.streams.map((s) => [s.stream, s.year])).toEqual([["english", 3]]);
    const lesson = buildLesson(profile, "english", T0);
    expect(lesson.parts.filter((p) => p.kind === "activity").map((p) => p.year)).toEqual([3, 3]);
    expect(lesson.parts[0].year).toBe(2);
  });

  it("keeps the child's own year when they are on track, as before", () => {
    const answers = [answer("number", 5, true), answer("fractions", 5, false)];
    const profile = applyAssessment(newProfile("Cy", 5, T0), record("maths", 5, { year: 5, level: 5 }, answers));
    const lesson = buildLesson(profile, "maths", T0);
    expect(lesson.parts[0].title).toBe("Year 4 review");
    expect(lesson.parts.slice(1).every((p) => p.year === 5 && !/\(Year/.test(p.title))).toBe(true);
    expect(streamOf("maths", lesson.parts[1].subtopicId!)).toBe("fractions");
  });

  it("makes a program from an older assessment that has none saved", () => {
    const profile = year6Behind();
    const older = { ...profile, programs: undefined };
    expect(programFor(older, "maths")).toEqual(makeProgram({ ...profile.assessments![0], yearLevel: 6 }));
  });

  for (const curriculum of CURRICULA)
    it(`builds program lessons in every year: ${curriculum}`, () => {
      for (const subject of ["maths", "english"] as const)
        for (const year of YEARS) {
          const r = { ...record(subject, year, null, []), ...(curriculum !== "nsw" ? { curriculum } : {}) };
          const profile = applyAssessment(newProfile("Di", year, T0, curriculum === "nsw" ? undefined : curriculum), r);
          const lesson = buildLesson(profile, subject, T0);
          expect(lesson.parts.filter((p) => p.kind === "activity").length, `${subject} Year ${year}`).toBe(2);
          for (const p of lesson.parts) expect(p.questionIds.length, `${subject} Year ${year} ${p.title}`).toBeGreaterThan(0);
        }
    });
});
