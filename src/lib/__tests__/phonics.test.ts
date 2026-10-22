import { describe, expect, it } from "vitest";
import {
  answerCheck,
  buildBlendPractice,
  buildLesson,
  buildSightLesson,
  CHECK_WORDS,
  currentSightLevel,
  currentUnit,
  formatReadingAge,
  isOpen,
  isSightOpen,
  newReading,
  openUnits,
  readingOf,
  readingAge,
  readWell,
  recordBlending,
  recordCheck,
  recordLesson,
  setEnrolled,
  startCheck,
  startingUnitIndex,
} from "../phonics/progress";
import { graphemesOf, soundAt, soundFor, soundsUpTo, speakableIpa, UNITS } from "../phonics/sequence";
import { SIGHT_LEVELS } from "../phonics/sightWords";

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
    expect(soundFor("cat", 1)).toBe("ah");
    expect(soundFor("ten", 1)).toBe("eh");
    expect(soundAt("cake", 1)?.ipa).toBe("eɪ");
    expect(soundAt("cake", 3)).toBeNull();
  });

  it("says each sound, never a letter's name", () => {
    for (const sound of UNITS.flatMap((u) => u.sounds)) {
      // A device's voice reads a lone letter (or two, like "ck") as letter names.
      expect(sound.say.length, sound.grapheme).toBeGreaterThan(1);
      expect(sound.say, sound.grapheme).not.toBe(sound.grapheme.length === 1 ? sound.grapheme : "");
      expect(["ck", "th", "ng", "ch", "qu", "x"].includes(sound.say), sound.grapheme).toBe(false);
      expect(sound.ipa, sound.grapheme).toMatch(/^[a-zæɪɒʌɹʃθŋʊɑɔɜəʒɡːeɪ]+$/u);
    }
    expect(UNITS.flatMap((u) => u.sounds).every((x) => speakableIpa(x.ipa))).toBe(true);
    expect(speakableIpa("fæ")).toBe(true);
    expect(speakableIpa("<break/>")).toBe(false);
  });
});

describe("the reading check", () => {
  it("has four different choices for each word, including the word", () => {
    for (const item of CHECK_WORDS) {
      expect(item.options).toContain(item.word);
      expect(new Set(item.options).size).toBe(4);
    }
  });

  it("has a sentence using each word", () => {
    for (const item of CHECK_WORDS) expect(item.sentence.toLowerCase().split(/[^a-z]+/), item.word).toContain(item.word);
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
  it("meets the sounds, says them, asks 8 questions, then reads a sentence", () => {
    for (const unit of UNITS) {
      const lesson = buildLesson(unit.id, seeded(7));
      expect(lesson[0]).toEqual({ kind: "meet", sounds: unit.sounds });
      expect(lesson[1]).toMatchObject({ kind: "say", sounds: unit.sounds });
      const compare = (lesson[1] as { compare: string[] }).compare;
      for (const s of soundsUpTo(unit.id)) expect(compare).toContain(s.ipa);
      expect(new Set(compare).size).toBe(compare.length);
      expect(lesson.at(-1)).toEqual({ kind: "read", sentence: unit.sentence });
      const questions = lesson.slice(2, -1);
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

  it("never offers another spelling of the same sound in find the sound", () => {
    for (const unit of UNITS)
      for (let seed = 1; seed < 20; seed++)
        for (const q of buildLesson(unit.id, seeded(seed)))
          if (q.kind === "find") {
            const others = q.options.filter((o) => o !== q.sound.grapheme);
            const alike = soundsUpTo(unit.id).filter((s) => s.ipa === q.sound.ipa && s.grapheme !== q.sound.grapheme);
            expect(others.filter((o) => alike.some((s) => s.grapheme === o))).toEqual([]);
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
    expect(readWell("The cat sat on a mat.", "the cat sat on a mat")).toBe(true);
    expect(readWell("The cat sat on a mat.", "the cat sat on the mat")).toBe(false);
    expect(readWell("The fish is in the dish.", "the fish is in a dish")).toBe(false);
    expect(readWell("The cat sat on a mat.", "cat")).toBe(false);
    expect(readWell("The cat sat on a mat.", "")).toBe(false);
  });
});

describe("sight words", () => {
  it("has 8 different words a level, each with one gap in its sentence", () => {
    const all = SIGHT_LEVELS.flatMap((l) => l.words.map((w) => w.word.toLowerCase()));
    expect(new Set(all).size).toBe(all.length);
    for (const level of SIGHT_LEVELS) {
      expect(level.words).toHaveLength(8);
      for (const w of level.words) expect(w.gap.split("___"), `${level.id}: ${w.word}`).toHaveLength(2);
    }
  });

  it("meets the words, asks 8 questions about them, then reads a sentence", () => {
    const level = SIGHT_LEVELS[2];
    const words = level.words.map((w) => w.word);
    const steps = buildSightLesson(level.id, seeded(3));
    expect(steps[0]).toEqual({ kind: "meetWords", words });
    expect(steps.at(-1)).toEqual({ kind: "read", sentence: level.sentence });
    const questions = steps.slice(1, -1);
    expect(questions.map((q) => q.kind)).toEqual(["listen", "listen", "listen", "listen", "gap", "gap", "gap", "gap"]);
    const asked = new Set<string>();
    for (const q of questions) {
      if (q.kind !== "listen" && q.kind !== "gap") throw new Error(q.kind);
      const word = q.kind === "listen" ? q.word.word : q.word;
      if (q.kind === "listen") expect(q.sentence).toContain(word);
      expect(words).toContain(word);
      expect(q.options).toContain(word);
      expect(new Set(q.options).size).toBe(4);
      asked.add(word);
    }
    // Every word in the level is asked once.
    expect(asked.size).toBe(8);
  });

  it("opens each level once the one before is done, and starts at the check's level", () => {
    let r = { ...newReading(), enrolled: true };
    expect(currentSightLevel(r)?.id).toBe("sight-1");
    expect(isSightOpen(r, "sight-2")).toBe(false);
    r = recordLesson(r, "sight-1", 8, 8);
    expect(currentSightLevel(r)?.id).toBe("sight-2");
    expect(isSightOpen(r, "sight-2")).toBe(true);
    // A reading age of 6.5 is 60% of the way from 5 to 7.5, so the first 4 of 8 levels count as done.
    const checked = recordCheck(newReading(), 9);
    expect(currentSightLevel(checked)?.id).toBe("sight-5");
  });
});

describe("Sound It Out", () => {
  it("asks 8 words from the sounds open so far, then reads a sentence", () => {
    const r = recordLesson({ ...newReading(), enrolled: true }, "satp", 8, 8);
    expect(openUnits(r).map((u) => u.id)).toEqual(["satp", "inmd"]);
    const words = new Set([...UNITS[0].words, ...UNITS[1].words].map((w) => w.word));
    const steps = buildBlendPractice(r, seeded(5));
    expect(steps).toHaveLength(9);
    for (const q of steps.slice(0, -1)) {
      if (q.kind !== "picture" && q.kind !== "listen") throw new Error(q.kind);
      expect(words.has(q.word.word)).toBe(true);
    }
    expect([UNITS[0].sentence, UNITS[1].sentence]).toContain((steps.at(-1) as { sentence: string }).sentence);
  });

  it("adds up practice, and old profiles start with none", () => {
    const r = recordBlending(recordBlending(readingOf({ reading: { enrolled: true } }), 6, 8), 8, 8);
    expect(r.blending).toEqual({ sessions: 2, right: 14, asked: 16 });
  });
});
