import { describe, expect, it } from "vitest";
import {
  buildDrills,
  buildWeeklyLesson,
  levelForAge,
  newReading,
  recordCheck,
  recordWeekly,
  SCORED,
  soundWordGroups,
  weeklyReading,
  type ReadingProgress,
} from "../phonics/progress";
import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../phonics/pictures";
import { graphemesOf, soundsUpTo, speakableIpa, UNITS } from "../phonics/sequence";
import { SIGHT_LEVELS, sightWordsUpTo } from "../phonics/sightWords";
import { STORIES } from "../phonics/stories";

// A Wednesday.
const NOW = new Date(2027, 1, 3, 10).getTime();
const WEEK = 7 * 86_400_000;

function seeded(seed = 7) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const checked = (age: number): ReadingProgress => ({ ...newReading(), enrolled: true, enrolledBy: "grown-up", age, checkedAt: NOW });

describe("the weekly reading lesson", () => {
  it("waits for the reading check, then sets the lesson at their reading age", () => {
    expect(weeklyReading({ ...newReading(), enrolled: true }, NOW)).toBeNull();
    expect(weeklyReading(checked(5), NOW)).toMatchObject({ unitId: "satp", levelId: "sight-1", done: 0 });
    const older = weeklyReading(checked(7.2), NOW)!;
    expect(older.unitId).toBe(levelForAge(7.2).unit.id);
    expect(UNITS.findIndex((u) => u.id === older.unitId)).toBeGreaterThan(8);
  });

  it("has sounds to hear and say, then sight words, then the story with five questions and a picture to colour", () => {
    const steps = buildWeeklyLesson(weeklyReading(checked(5.5), NOW)!, seeded());
    const kinds = steps.map((s) => s.kind);
    expect(kinds[0]).toBe("meet");
    expect(kinds[1]).toBe("say");
    expect(kinds[2]).toBe("soundWords");
    expect(kinds).toContain("drill");
    const sight = kinds.indexOf("meetWords");
    const story = kinds.indexOf("story");
    expect(sight).toBeGreaterThan(kinds.lastIndexOf("drill"));
    expect(story).toBeGreaterThan(sight);
    expect(kinds.filter((k) => k === "question")).toHaveLength(5);
    expect(kinds.at(-1)).toBe("colour");
    expect(steps.filter((s) => SCORED.includes(s.kind)).length).toBeGreaterThanOrEqual(12);
  });

  it("adds a month to the reading age for every three lessons passed", () => {
    let r = checked(5);
    r = recordWeekly(r, 14, 14, NOW);
    r = recordWeekly(r, 3, 14, NOW); // not passed: doesn't count
    r = recordWeekly(r, 13, 14, NOW);
    expect(r.age).toBe(5);
    expect(r.toward).toBe(2);
    expect(r.weekly).toMatchObject({ done: 3, passed: 2 });
    r = recordWeekly(r, 14, 14, NOW + WEEK);
    expect(r.age).toBeCloseTo(5 + 1 / 12);
    expect(r.toward).toBe(0);
    // Last week's lesson made way for this week's, and the unit is marked practised.
    expect(r.weekly).toMatchObject({ done: 1, passed: 1 });
    expect(r.units.satp.lessons).toBe(4);
  });

  it("keeps the week's lesson the same all week, and a new reading check starts again", () => {
    let r = recordWeekly(checked(5), 14, 14, NOW);
    r = { ...r, age: 7 };
    expect(weeklyReading(r, NOW + 86_400_000)?.unitId).toBe("satp");
    expect(weeklyReading(r, NOW + WEEK)?.unitId).toBe(levelForAge(7).unit.id);
    const again = recordCheck(r, 10, NOW);
    expect(again.toward).toBe(0);
    expect(again.weekly).toBeNull();
  });
});

describe("blending drills", () => {
  it("blends a consonant and a vowel, then reads words that start that way", () => {
    for (const unit of UNITS) {
      const drills = buildDrills(unit.id, 2, seeded());
      expect(drills.length, unit.id).toBeGreaterThan(0);
      for (const d of drills) {
        if (d.kind !== "drill") continue;
        expect(d.parts).toHaveLength(2);
        expect(speakableIpa(d.syllable.ipa), d.syllable.ipa).toBe(true);
        for (const w of d.words) expect(w.startsWith(d.syllable.shown.replace("–e", "")), `${w} ${d.syllable.shown}`).toBe(true);
      }
    }
    const first = buildDrills("satp", 2, seeded());
    const shown = first.flatMap((d) => (d.kind === "drill" ? [d.syllable] : []));
    expect(shown.map((s) => s.shown)).toEqual(expect.arrayContaining(["sa"]));
    expect(shown.find((s) => s.shown === "pa")?.say ?? "pah").toBe("pah");
  });

  it("finds words with each new sound in them", () => {
    for (const unit of UNITS)
      for (const g of soundWordGroups(unit.id)) expect(g.words.length, `${unit.id} ${g.sound.grapheme}`).toBeGreaterThan(0);
  });
});

describe("the stories", () => {
  it("has a story for every unit of sounds", () => {
    expect(STORIES.map((s) => s.unitId)).toEqual(UNITS.map((u) => u.id));
  });

  it("only uses sounds taught by then and sight words at that reading age", () => {
    const tooHard: Record<string, string[]> = {};
    for (const story of STORIES) {
      const index = UNITS.findIndex((u) => u.id === story.unitId);
      const known = new Set(soundsUpTo(story.unitId).flatMap((s) => (s.grapheme.includes("_") ? [s.grapheme[0], "e"] : [s.grapheme])));
      // The easiest sight word level a child can have with this unit.
      const level = SIGHT_LEVELS[Math.floor((index / UNITS.length) * SIGHT_LEVELS.length)];
      const sight = new Set(sightWordsUpTo(level.id).map((w) => w.word.toLowerCase()));
      const hard = story.sentences
        .flatMap((sentence) => sentence.split(/[^A-Za-z']+/).filter(Boolean))
        .map((raw) => raw.toLowerCase().replace(/'s$/, ""))
        .filter((word) => !sight.has(word) && !graphemesOf(word).every((p) => known.has(p)));
      if (hard.length) tooHard[story.title] = hard;
    }
    expect(tooHard).toEqual({});
  });

  it("asks five questions with three different answers, and has a picture inside its frame", () => {
    for (const story of STORIES) {
      expect(story.questions, story.title).toHaveLength(5);
      for (const q of story.questions) expect(new Set(q.options).size, q.question).toBe(3);
      const ids = story.picture.map((r) => r.id);
      expect(new Set(ids).size, `${story.title}: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`).toBe(ids.length);
      expect(story.picture.filter((r) => !r.fixed).length).toBeGreaterThan(8);
      for (const r of story.picture) {
        const s = r.shape;
        if (s.el === "circle" || s.el === "ellipse") {
          expect(s.cx, `${story.title} ${r.id}`).toBeGreaterThanOrEqual(-10);
          expect(s.cx, `${story.title} ${r.id}`).toBeLessThanOrEqual(PICTURE_WIDTH + 10);
          expect(s.cy, `${story.title} ${r.id}`).toBeLessThanOrEqual(PICTURE_HEIGHT + 10);
        }
      }
    }
  });
});
