/**
 * The reading check and Learn to Read progress. A student whose reading age comes out below 7.5
 * joins the Learn to Read program; a grown-up can also add or remove them. Pure functions, kept
 * apart from React so they can be tested.
 */
import { getUnit, graphemesOf, soundsUpTo, UNITS, type PhonicsWord, type Sound, type Unit } from "./sequence";

/** Students below this reading age (in years) join Learn to Read. */
export const READING_AGE_CUTOFF = 7.5;
const YOUNGEST = 5;
const OLDEST = 10;

/**
 * The reading check: Suni says a word and the student picks it from four that look alike. The
 * words get harder, six for each year of reading age from 5 to 10, and each one read correctly
 * adds two months, like a graded word reading test. The order of the choices is shuffled on screen.
 */
export const CHECK_WORDS: { word: string; options: string[] }[] = [
  { word: "cat", options: ["cat", "cot", "cut", "can"] },
  { word: "in", options: ["in", "on", "an", "is"] },
  { word: "dog", options: ["dog", "dig", "bog", "log"] },
  { word: "sun", options: ["sun", "sit", "run", "son"] },
  { word: "big", options: ["big", "bag", "pig", "dig"] },
  { word: "up", options: ["up", "us", "at", "it"] },
  { word: "ship", options: ["ship", "shop", "chip", "sip"] },
  { word: "fish", options: ["fish", "dish", "fist", "wish"] },
  { word: "jump", options: ["jump", "bump", "junk", "lump"] },
  { word: "frog", options: ["frog", "from", "flog", "fog"] },
  { word: "rain", options: ["rain", "ran", "ruin", "train"] },
  { word: "tree", options: ["tree", "three", "free", "trip"] },
  { word: "night", options: ["night", "nice", "might", "nigh"] },
  { word: "boat", options: ["boat", "boot", "beat", "bout"] },
  { word: "storm", options: ["storm", "stamp", "store", "stem"] },
  { word: "chair", options: ["chair", "cheer", "chain", "hair"] },
  { word: "kite", options: ["kite", "kit", "knit", "bite"] },
  { word: "turned", options: ["turned", "tuned", "trend", "burned"] },
  { word: "should", options: ["should", "shoulder", "sound", "shout"] },
  { word: "people", options: ["people", "purple", "pebble", "pupil"] },
  { word: "laugh", options: ["laugh", "light", "lung", "leaf"] },
  { word: "thought", options: ["thought", "though", "through", "taught"] },
  { word: "island", options: ["island", "inland", "ironed", "eyelid"] },
  { word: "wrinkle", options: ["wrinkle", "twinkle", "ankle", "wrestle"] },
  { word: "busy", options: ["busy", "bossy", "bushy", "buses"] },
  { word: "ocean", options: ["ocean", "often", "onion", "octagon"] },
  { word: "science", options: ["science", "silence", "scene", "sentence"] },
  { word: "knowledge", options: ["knowledge", "kneeling", "knowing", "college"] },
  { word: "orchestra", options: ["orchestra", "orchard", "ostrich", "extra"] },
  { word: "physical", options: ["physical", "physics", "special", "fiscal"] },
];

/** The check stops after this many wrong in a row, as the words are getting too hard. */
export const CHECK_STOP_AFTER = 3;

export interface CheckState {
  index: number;
  right: number;
  wrongInARow: number;
  done: boolean;
}

export const startCheck = (): CheckState => ({ index: 0, right: 0, wrongInARow: 0, done: false });

export function answerCheck(state: CheckState, correct: boolean): CheckState {
  const wrongInARow = correct ? 0 : state.wrongInARow + 1;
  const index = state.index + 1;
  return {
    index,
    right: state.right + (correct ? 1 : 0),
    wrongInARow,
    done: wrongInARow >= CHECK_STOP_AFTER || index >= CHECK_WORDS.length,
  };
}

/** Reading age in years, to the nearest month: five years plus two months for each word read. */
export function readingAge(right: number): number {
  const perWord = (OLDEST - YOUNGEST) / CHECK_WORDS.length;
  return Math.round(Math.min(OLDEST, YOUNGEST + right * perWord) * 12) / 12;
}

/** "6 years 4 months", or "10 years or more" at the top of the check. */
export function formatReadingAge(age: number): string {
  if (age >= OLDEST) return `${OLDEST} years or more`;
  const years = Math.floor(age + 1e-9);
  const months = Math.round((age - years) * 12);
  return months ? `${years} years ${months} month${months === 1 ? "" : "s"}` : `${years} years`;
}

export interface UnitProgress {
  /** Lessons finished in this unit. */
  lessons: number;
  /** The best lesson score so far, from 0 to 1. */
  best: number;
  mastered: boolean;
  at: number;
}

export interface ReadingProgress {
  /** The latest reading age from the check, or null before the first one. */
  age: number | null;
  checkedAt: number | null;
  /** In the Learn to Read program. */
  enrolled: boolean;
  /** Whether the check put them in, or a grown-up did. A grown-up's choice isn't undone by a later check. */
  enrolledBy: "check" | "grown-up" | null;
  /** Lesson progress in each Learn to Read unit. */
  units: Record<string, UnitProgress>;
  /** Sentences read aloud. */
  readAloud: number;
}

export const newReading = (): ReadingProgress => ({
  age: null,
  checkedAt: null,
  enrolled: false,
  enrolledBy: null,
  units: {},
  readAloud: 0,
});

/** Older profiles have no reading record, and ones saved by older pages may miss fields. */
export function readingOf(profile: { reading?: Partial<ReadingProgress> }): ReadingProgress {
  return { ...newReading(), ...(profile.reading ?? {}), units: { ...(profile.reading?.units ?? {}) } };
}

/**
 * Records a reading check. Below 7.5 the student joins Learn to Read; at 7.5 or above they leave it,
 * unless a grown-up put them in. Units below their reading level count as done, so they start where
 * the check found them and can still go back.
 */
export function recordCheck(reading: ReadingProgress, right: number, now = Date.now()): ReadingProgress {
  const age = readingAge(right);
  const below = age < READING_AGE_CUTOFF;
  const enrolled = below || (reading.enrolled && reading.enrolledBy === "grown-up");
  const enrolledBy = below ? (reading.enrolledBy === "grown-up" ? "grown-up" : "check") : enrolled ? reading.enrolledBy : null;
  const units = { ...reading.units };
  for (const unit of UNITS.slice(0, startingUnitIndex(age))) {
    if (!units[unit.id]?.mastered) units[unit.id] = { lessons: units[unit.id]?.lessons ?? 0, best: 1, mastered: true, at: now };
  }
  return { ...reading, age, checkedAt: now, enrolled, enrolledBy, units };
}

/** A grown-up adds the student to Learn to Read or takes them out. */
export function setEnrolled(reading: ReadingProgress, enrolled: boolean): ReadingProgress {
  return { ...reading, enrolled, enrolledBy: enrolled ? "grown-up" : null };
}

/** Which unit a reading age starts at: the units spread evenly from 5 years to the 7.5 cut-off. */
export function startingUnitIndex(age: number): number {
  const fraction = (age - YOUNGEST) / (READING_AGE_CUTOFF - YOUNGEST);
  return Math.max(0, Math.min(UNITS.length - 1, Math.floor(fraction * UNITS.length)));
}

/** A lesson of 8 questions is passed with 7 right. */
export const PASS_MARK = 7 / 8;

export function recordLesson(reading: ReadingProgress, unitId: string, right: number, total: number, now = Date.now()): ReadingProgress {
  const before = reading.units[unitId] ?? { lessons: 0, best: 0, mastered: false, at: now };
  const score = total ? right / total : 0;
  return {
    ...reading,
    units: {
      ...reading.units,
      [unitId]: {
        lessons: before.lessons + 1,
        best: Math.max(before.best, score),
        mastered: before.mastered || score >= PASS_MARK,
        at: now,
      },
    },
  };
}

/** The first unit not yet done, or null when they've done them all. */
export function currentUnit(reading: ReadingProgress): Unit | null {
  return UNITS.find((u) => !reading.units[u.id]?.mastered) ?? null;
}

/** A unit can be practised once the ones before it are done; done ones can always be practised again. */
export function isOpen(reading: ReadingProgress, unitId: string): boolean {
  const index = UNITS.findIndex((u) => u.id === unitId);
  return index >= 0 && UNITS.slice(0, index).every((u) => reading.units[u.id]?.mastered);
}

export function unitsDone(reading: ReadingProgress): number {
  return UNITS.filter((u) => reading.units[u.id]?.mastered).length;
}

// ---------- Lessons ----------

export type LessonStep =
  /** Suni says each new sound with its example word. */
  | { kind: "meet"; sounds: Sound[] }
  /** Suni says a sound; the student taps how it's written. */
  | { kind: "find"; sound: Sound; options: string[] }
  /** The student sounds out a word (tapping each sound to hear it), then picks its picture. */
  | { kind: "picture"; word: PhonicsWord; parts: string[]; options: PhonicsWord[] }
  /** Suni says a word; the student picks it from words built from the same sounds. */
  | { kind: "listen"; word: PhonicsWord; options: string[] }
  /** The student reads a sentence aloud. */
  | { kind: "read"; sentence: string };

export const FIND_QUESTIONS = 4;
export const WORD_QUESTIONS = 4;

function shuffle<T>(items: T[], random: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Three others, different from `right`, from the pool. */
function distractors<T>(pool: T[], right: T, same: (a: T, b: T) => boolean, random: () => number): T[] {
  const unique = pool.filter((x, i) => !same(x, right) && pool.findIndex((y) => same(x, y)) === i);
  return shuffle(unique, random).slice(0, 3);
}

/** One lesson for a unit: meet the sounds, find them 4 times, read 4 words, then read a sentence aloud. */
export function buildLesson(unitId: string, random: () => number = Math.random): LessonStep[] {
  const unit = getUnit(unitId);
  if (!unit) return [];
  const known = soundsUpTo(unitId);
  // Sounds written the same way (the two oo's) are one choice.
  const graphemes = [...new Set(known.map((s) => s.grapheme))];
  const finds = Array.from({ length: FIND_QUESTIONS }, (_, i) => {
    const sound = shuffle(unit.sounds, random)[0] ?? unit.sounds[i % unit.sounds.length];
    const others = distractors(graphemes, sound.grapheme, (a, b) => a === b, random);
    return { kind: "find" as const, sound, options: shuffle([sound.grapheme, ...others], random) };
  });

  const earlier = UNITS.slice(0, UNITS.findIndex((u) => u.id === unitId) + 1).flatMap((u) => u.words);
  const words = shuffle(unit.words, random).slice(0, WORD_QUESTIONS);
  const asked = words.map((word): LessonStep => {
    const pictured = earlier.filter((x) => x.emoji && x.emoji !== word.emoji);
    if (word.emoji && pictured.length >= 3) {
      const options = [word, ...distractors(pictured, word, (a, b) => a.emoji === b.emoji || a.word === b.word, random)];
      return { kind: "picture", word, parts: graphemesOf(word.word), options: shuffle(options, random) };
    }
    const others = distractors(
      earlier.map((x) => x.word),
      word.word,
      (a, b) => a === b,
      random,
    );
    return { kind: "listen", word, options: shuffle([word.word, ...others], random) };
  });

  return [{ kind: "meet", sounds: unit.sounds }, ...finds, ...asked, { kind: "read", sentence: unit.sentence }];
}

/** How many of a sentence's words were heard, ignoring case and punctuation. */
export function wordsHeard(sentence: string, heard: string): { words: string[]; heard: boolean[] } {
  const clean = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z' ]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  const said = new Set(clean(heard));
  const words = clean(sentence);
  return { words, heard: words.map((w) => said.has(w)) };
}

/** Read aloud well enough: most of the words were heard. */
export function readWell(sentence: string, heard: string): boolean {
  const { words, heard: got } = wordsHeard(sentence, heard);
  return words.length > 0 && got.filter(Boolean).length / words.length >= 0.7;
}
