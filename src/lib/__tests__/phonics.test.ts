import { describe, expect, it } from "vitest";
import {
  answerCheck,
  buildLesson,
  CHECK_WORDS,
  currentUnit,
  formatReadingAge,
  isOpen,
  newReading,
  readingAge,
  readWell,
  recordCheck,
  recordLesson,
  setEnrolled,
  startCheck,
  startingUnitIndex,
} from "../phonics/progress";
import { graphemesOf, soundFor, soundsUpTo, UNITS } from "../phonics/sequence";

/** A repeatable random number generator, so lessons come out the same each run. */
function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

describe("the phonics sequence", () => {
  it("only uses sounds already taught in each unit's words", () => {
    for (const unit of UNITS) {
      const known = new Set(soundsUpTo(unit.id).flatMap((s) => (s.grapheme.includes("_") ? [s.grapheme[0], "e"] : [s.grapheme])));
      for (const { word } of unit.words) {
        for (const part of graphemesOf(word)) expect(known.has(part), `${unit.id}: "${part}" in "${word}"`).toBe(true);
      }
    }
  });

  it("gives every unit enough words, and no two pictures the same in a unit", () => {
    for (const unit of UNITS) {
      expect(unit.words.length).toBeGreaterThanOrEqual(8);
      const pictures = unit.words.flatMap((w) => (w.emoji ? [w.emoji] : []));
      expect(new Set(pictures).size, unit.id).toBe(pictures.length);
    }
  });

  it("splits words into the sounds a child says", () => {
    expect(graphemesOf("chick")).toEqual(["ch", "i", "ck"]);
    expect(graphemesOf("night")).toEqual(["n", "igh", "t"]);
    expect(graphemesOf("chair")).toEqual(["ch", "air"]);
    expect(graphemesOf("letter")).toEqual(["l", "e", "t", "t", "er"]);
  });

  it("says a split vowel's name and keeps its e silent", () => {
    expect(graphemesOf("cake")).toEqual(["c", "a", "k", "e"]);
    expect(soundFor("cake", 1)).toBe("ay");
    expect(soundFor("cake", 3)).toBe("");
    expect(soundFor("cat", 1)).toBe("a");
    expect(soundFor("ten", 1)).toBe("e");
  });
});

describe("the reading check", () => {
  it("has four different choices for each word, including the word", () => {
    for (const item of CHECK_WORDS) {
      expect(item.options).toContain(item.word);
      expect(new Set(item.options).size).toBe(4);
    }
  });

  it("adds two months of reading age for each word read", () => {
    expect(readingAge(0)).toBe(5);
    expect(readingAge(15)).toBe(7.5);
    expect(readingAge(14)).toBeLessThan(7.5);
    expect(readingAge(30)).toBe(10);
    expect(formatReadingAge(readingAge(14))).toBe("7 years 4 months");
    expect(formatReadingAge(6)).toBe("6 years");
    expect(formatReadingAge(10)).toBe("10 years or more");
  });

  it("stops after three wrong in a row", () => {
    let state = startCheck();
    for (const correct of [true, true, false, false]) state = answerCheck(state, correct);
    expect(state.done).toBe(false);
    state = answerCheck(state, false);
    expect(state).toMatchObject({ done: true, right: 2, index: 5 });
  });

  it("puts a student below 7.5 into Learn to Read, starting at their level", () => {
    const r = recordCheck(newReading(), 9, 1000);
    expect(r.age).toBe(6.5);
    expect(r).toMatchObject({ enrolled: true, enrolledBy: "check", checkedAt: 1000 });
    const start = startingUnitIndex(6.5);
    expect(start).toBe(7);
    expect(currentUnit(r)?.id).toBe(UNITS[start].id);
    expect(isOpen(r, UNITS[start].id)).toBe(true);
    expect(isOpen(r, UNITS[start + 1].id)).toBe(false);
  });

  it("takes them out at 7.5 or above, unless a grown-up put them in", () => {
    const inByCheck = recordCheck(newReading(), 3);
    expect(recordCheck(inByCheck, 20)).toMatchObject({ enrolled: false, enrolledBy: null });
    const inByGrownUp = setEnrolled(newReading(), true);
    expect(recordCheck(inByGrownUp, 20)).toMatchObject({ enrolled: true, enrolledBy: "grown-up" });
    expect(recordCheck(inByGrownUp, 2)).toMatchObject({ enrolled: true, enrolledBy: "grown-up" });
    expect(setEnrolled(inByGrownUp, false)).toMatchObject({ enrolled: false, enrolledBy: null });
  });
});

describe("Learn to Read lessons", () => {
  it("meets the sounds, asks 8 questions, then reads a sentence", () => {
    for (const unit of UNITS) {
      const lesson = buildLesson(unit.id, seeded(7));
      expect(lesson[0]).toEqual({ kind: "meet", sounds: unit.sounds });
      expect(lesson.at(-1)).toEqual({ kind: "read", sentence: unit.sentence });
      const questions = lesson.slice(1, -1);
      expect(questions).toHaveLength(8);
      for (const q of questions) {
        if (q.kind === "find") expect(q.options).toContain(q.sound.grapheme);
        if (q.kind === "picture") expect(q.options.map((o) => o.word)).toContain(q.word.word);
        if (q.kind === "listen") expect(q.options).toContain(q.word.word);
        if (q.kind === "find" || q.kind === "listen") expect(new Set(q.options).size).toBe(q.options.length);
        if (q.kind === "picture") expect(new Set(q.options.map((o) => o.emoji)).size).toBe(q.options.length);
      }
    }
  });

  it("marks a unit done with 7 of 8, and opens the next", () => {
    const first = UNITS[0].id;
    let r = recordLesson(newReading(), first, 6, 8);
    expect(r.units[first]).toMatchObject({ lessons: 1, mastered: false });
    expect(isOpen(r, UNITS[1].id)).toBe(false);
    r = recordLesson(r, first, 7, 8);
    expect(r.units[first]).toMatchObject({ lessons: 2, mastered: true, best: 7 / 8 });
    expect(isOpen(r, UNITS[1].id)).toBe(true);
    expect(recordLesson(r, first, 2, 8).units[first].mastered).toBe(true);
  });

  it("counts a sentence as read when most of its words are heard", () => {
    expect(readWell("The cat sat on a mat.", "the cat sat on the mat")).toBe(true);
    expect(readWell("The cat sat on a mat.", "cat")).toBe(false);
    expect(readWell("The cat sat on a mat.", "")).toBe(false);
  });
});
