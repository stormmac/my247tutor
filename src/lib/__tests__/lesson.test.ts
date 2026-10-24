import { describe, expect, it } from "vitest";
import { buildLesson, skillBuilder, subtopicStrength, weakestSubtopics } from "../content/lesson";
import { progressKey } from "../content/practice";
import { QUESTIONS, subtopicPath } from "../content/tree";
import { DIFFICULTIES } from "../content/types";
import { YEARS } from "../curriculum/types";
import {
  ACTIVITY_QUESTIONS,
  currentLesson,
  daysLeftInWeek,
  daysLeftText,
  lessonProgress,
  ownPart,
  nextPart,
  recordLessonAnswer,
  resultColour,
  REVIEW_QUESTIONS,
  saveLesson,
  SKILL_BUILDER_QUESTIONS,
  weekOf,
} from "../learner/lesson";
import { newProfile, recordAttempt } from "../learner/model";
import { Rng } from "../practice/rng";

// Wednesday 15 October 2026, midday local time.
const NOW = new Date(2026, 9, 15, 12).getTime();
const question = (id: string) => QUESTIONS.find((q) => q.id === id)!;
const rank = (id: string) => DIFFICULTIES.indexOf(question(id).difficulty);

describe("weekly lesson", () => {
  it("belongs to the Monday of its week", () => {
    expect(weekOf(NOW)).toBe("2026-10-12");
    expect(weekOf(new Date(2026, 9, 12, 0, 5).getTime())).toBe("2026-10-12");
    expect(weekOf(new Date(2026, 9, 18, 23).getTime())).toBe("2026-10-12");
    expect(weekOf(new Date(2026, 9, 19, 1).getTime())).toBe("2026-10-19");
  });

  for (const subject of ["maths", "english"] as const)
    for (const year of YEARS)
      it(`has 20 review questions from the year below and two 10-question activities: ${subject}, Year ${year}`, () => {
        const lesson = buildLesson(newProfile("Ava", year, NOW), subject, NOW);
        const [review, ...activities] = lesson.parts;
        const reviewYear = Math.max(1, year - 1);

        expect(review.kind).toBe("review");
        expect(review.questionIds).toHaveLength(REVIEW_QUESTIONS);
        expect(new Set(review.questionIds).size).toBe(REVIEW_QUESTIONS);
        for (const id of review.questionIds) expect(subtopicPath(question(id).subtopic_id)!.year.sort_order).toBe(reviewYear);
        // Spread across the year, not one subtopic.
        expect(new Set(review.questionIds.map((id) => question(id).subtopic_id)).size).toBeGreaterThan(5);
        const reviewRanks = review.questionIds.map(rank);
        expect(reviewRanks).toEqual([...reviewRanks].sort((a, b) => a - b));

        expect(activities).toHaveLength(2);
        expect(activities[0].subtopicId).not.toBe(activities[1].subtopicId);
        for (const a of activities) {
          expect(a.questionIds).toHaveLength(ACTIVITY_QUESTIONS);
          for (const id of a.questionIds) expect(question(id).subtopic_id).toBe(a.subtopicId);
          expect(subtopicPath(a.subtopicId!)!.year.sort_order).toBe(year);
          const ranks = a.questionIds.map(rank);
          expect(ranks).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
        }
      });

  it("is the same lesson when rebuilt in the same week, and a new one the next week", () => {
    const profile = newProfile("Ava", 4, NOW);
    expect(buildLesson(profile, "maths", NOW)).toEqual(buildLesson(profile, "maths", NOW + 2 * 86_400_000));
    expect(buildLesson(profile, "maths", NOW + 7 * 86_400_000).parts[0].questionIds).not.toEqual(
      buildLesson(profile, "maths", NOW).parts[0].questionIds,
    );
  });

  it("puts the activities on the topics the child is weakest at", () => {
    let profile = newProfile("Ava", 4, NOW);
    // The second activity's subtopic, after a few wrong answers, becomes the weakest.
    const target = buildLesson(profile, "maths", NOW).parts[2].subtopicId!;
    const sub = subtopicPath(target)!.subtopic;
    for (let i = 0; i < 5; i++) profile = recordAttempt(profile, progressKey(sub), false, 0, NOW);
    expect(subtopicStrength(profile, sub)).toBeLessThan(0.3);
    expect(weakestSubtopics(profile, "maths", 1)[0].subtopic.id).toBe(target);
  });

  it("uses the starting check when a subtopic hasn't been practised", () => {
    let profile = newProfile("Ava", 5, NOW);
    const [first] = weakestSubtopics(profile, "english", 2).reverse();
    profile = { ...profile, history: [1, 2, 3].map((i) => ({ skillId: first.subtopic.id, at: NOW - i, correct: false, hintsUsed: 0 })) };
    expect(subtopicStrength(profile, first.subtopic)).toBe(0);
    expect(weakestSubtopics(profile, "english", 1)[0].subtopic.id).toBe(first.subtopic.id);
  });

  it("tracks answers part by part", () => {
    let profile = newProfile("Ava", 3, NOW);
    expect(currentLesson(profile, "maths", NOW)).toBeNull();
    profile = saveLesson(profile, "maths", buildLesson(profile, "maths", NOW));
    let lesson = currentLesson(profile, "maths", NOW)!;
    expect(nextPart(lesson)).toBe(0);
    expect(lessonProgress(lesson)).toEqual({ done: 0, total: 40 });

    for (let i = 0; i < REVIEW_QUESTIONS; i++) profile = recordLessonAnswer(profile, "maths", 0, i, i % 2 === 0 ? 1 : 0);
    lesson = currentLesson(profile, "maths", NOW)!;
    expect(nextPart(lesson)).toBe(1);
    expect(lessonProgress(lesson).done).toBe(20);
    // Saving the same answer again doesn't count it twice, and a question can't be skipped ahead.
    expect(recordLessonAnswer(profile, "maths", 1, 0, 1)).toEqual(
      recordLessonAnswer(recordLessonAnswer(profile, "maths", 1, 0, 1), "maths", 1, 0, 1),
    );
    expect(recordLessonAnswer(profile, "maths", 1, 3, 1)).toBe(profile);
    for (const part of [1, 2]) for (let i = 0; i < ACTIVITY_QUESTIONS; i++) profile = recordLessonAnswer(profile, "maths", part, i, 2);
    expect(nextPart(currentLesson(profile, "maths", NOW)!)).toBe(-1);

    // Next Monday the old lesson no longer counts.
    expect(currentLesson(profile, "maths", NOW + 7 * 86_400_000)).toBeNull();
  });

  it("colours questions green first go, yellow a later go, red not right", () => {
    expect([1, 2, 3, 0].map(resultColour)).toEqual(["good", "warn", "warn", "bad"]);
    // Lessons saved before three goes stored true or false.
    expect([true, false].map(resultColour)).toEqual(["good", "bad"]);
  });

  it("builds a skill builder of 5 questions like the missed one, none from the lesson", () => {
    for (const year of YEARS) {
      const lesson = buildLesson(newProfile("Ava", year, NOW), "maths", NOW);
      const all = lesson.parts.flatMap((p) => p.questionIds);
      for (const part of lesson.parts) {
        const missed = question(part.questionIds[part.questionIds.length - 1]);
        const ids = skillBuilder(missed, all, new Rng(year));
        expect(ids).toHaveLength(SKILL_BUILDER_QUESTIONS);
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) {
          expect(all).not.toContain(id);
          expect(question(id).subtopic_id).toBe(missed.subtopic_id);
        }
        // Closest in difficulty: no more than one level away when the bank has enough.
        for (const id of ids) expect(Math.abs(rank(id) - rank(missed.id))).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("the week's deadline", () => {
  // Monday 19 October 2026 to Sunday 25 October, local time.
  const day = (d: number, h = 9) => new Date(2026, 9, d, h).getTime();
  it("counts the days left, ending at midnight on Sunday", () => {
    expect(daysLeftInWeek(day(19))).toBe(7);
    expect(daysLeftInWeek(day(22))).toBe(4);
    expect(daysLeftInWeek(day(25, 23))).toBe(1);
    expect(daysLeftInWeek(new Date(2026, 9, 26, 0, 0, 1).getTime())).toBe(7);
    expect(weekOf(day(25, 23))).not.toBe(weekOf(new Date(2026, 9, 26, 0, 0, 1).getTime()));
  });
  it("says it simply", () => {
    expect(daysLeftText(day(23))).toBe("3 days to go");
    expect(daysLeftText(day(25))).toBe("Last day");
  });
});

describe("own and set parts", () => {
  it("counts the child's own parts apart from set work", () => {
    const part = (kind: "review" | "activity" | "set", n: number, done: number) => ({
      kind,
      title: kind,
      year: 4 as const,
      questionIds: Array.from({ length: n }, (_, i) => `q${i}`),
      results: Array.from({ length: done }, () => 1),
    });
    const lesson = { week: "2026-10-19", parts: [part("review", 20, 5), part("activity", 10, 0), part("set", 10, 10)] };
    expect(lessonProgress(lesson)).toEqual({ done: 15, total: 40 });
    expect(lessonProgress(lesson, ownPart)).toEqual({ done: 5, total: 30 });
    expect(lessonProgress(lesson, (p) => !ownPart(p))).toEqual({ done: 10, total: 10 });
  });
});
