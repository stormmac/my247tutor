/**
 * The reading check and Learn to Read progress. A student whose reading age comes out below 7.5
 * joins the Learn to Read program; a grown-up can also add or remove them. Pure functions, kept
 * apart from React so they can be tested.
 */
import { weekOf } from "../learner/lesson";
import { getUnit, graphemesOf, soundAt, soundsUpTo, UNITS, type PhonicsWord, type Sound, type Unit } from "./sequence";
import { getSightLevel, SIGHT_LEVELS, sightWordsUpTo, type SightLevel } from "./sightWords";
import { storyFor, type Story } from "./stories";

/** Students below this reading age (in years) join Learn to Read. */
export const READING_AGE_CUTOFF = 7.5;
const YOUNGEST = 5;
const OLDEST = 10;

/**
 * The reading check: Suni says a word and the student picks it from four that look alike. The
 * words get harder, six for each year of reading age from 5 to 10, and each one read correctly
 * adds two months, like a graded word reading test. The order of the choices is shuffled on screen.
 * Each word has a sentence using it, for a student who wants to hear it in context.
 */
export const CHECK_WORDS: { word: string; options: string[]; sentence: string }[] = [
  { word: "cat", options: ["cat", "cot", "cut", "can"], sentence: "The cat sat on the mat." },
  { word: "in", options: ["in", "on", "an", "is"], sentence: "The fish is in the pond." },
  { word: "dog", options: ["dog", "dig", "bog", "log"], sentence: "My dog likes to run." },
  { word: "sun", options: ["sun", "sit", "run", "son"], sentence: "The sun is hot today." },
  { word: "big", options: ["big", "bag", "pig", "dig"], sentence: "An elephant is very big." },
  { word: "up", options: ["up", "us", "at", "it"], sentence: "The bird flew up into the sky." },
  { word: "ship", options: ["ship", "shop", "chip", "sip"], sentence: "The ship sailed across the sea." },
  { word: "fish", options: ["fish", "dish", "fist", "wish"], sentence: "I saw a fish in the river." },
  { word: "jump", options: ["jump", "bump", "junk", "lump"], sentence: "Can you jump over the log?" },
  { word: "frog", options: ["frog", "from", "flog", "fog"], sentence: "The frog sat on a lily pad." },
  { word: "rain", options: ["rain", "ran", "ruin", "train"], sentence: "Take an umbrella in the rain." },
  { word: "tree", options: ["tree", "three", "free", "trip"], sentence: "The koala climbed the tree." },
  { word: "night", options: ["night", "nice", "might", "nigh"], sentence: "We see the stars at night." },
  { word: "boat", options: ["boat", "boot", "beat", "bout"], sentence: "We rowed the boat on the lake." },
  { word: "storm", options: ["storm", "stamp", "store", "stem"], sentence: "The storm made the windows shake." },
  { word: "chair", options: ["chair", "cheer", "chain", "hair"], sentence: "Please sit on the chair." },
  { word: "kite", options: ["kite", "kit", "knit", "bite"], sentence: "I flew my kite at the beach." },
  { word: "turned", options: ["turned", "tuned", "trend", "burned"], sentence: "She turned the page of her book." },
  { word: "should", options: ["should", "shoulder", "sound", "shout"], sentence: "You should wear a hat in the sun." },
  { word: "people", options: ["people", "purple", "pebble", "pupil"], sentence: "Lots of people came to the show." },
  { word: "laugh", options: ["laugh", "light", "lung", "leaf"], sentence: "The joke made me laugh." },
  { word: "thought", options: ["thought", "though", "through", "taught"], sentence: "I thought about my answer." },
  { word: "island", options: ["island", "inland", "ironed", "eyelid"], sentence: "We sailed to a little island." },
  { word: "wrinkle", options: ["wrinkle", "twinkle", "ankle", "wrestle"], sentence: "There is a wrinkle in my shirt." },
  { word: "busy", options: ["busy", "bossy", "bushy", "buses"], sentence: "The shops are busy on Saturday." },
  { word: "ocean", options: ["ocean", "often", "onion", "octagon"], sentence: "Whales swim in the ocean." },
  { word: "science", options: ["science", "silence", "scene", "sentence"], sentence: "We did a fun experiment in science." },
  { word: "knowledge", options: ["knowledge", "kneeling", "knowing", "college"], sentence: "Reading books gives you knowledge." },
  { word: "orchestra", options: ["orchestra", "orchard", "ostrich", "extra"], sentence: "The orchestra played beautiful music." },
  { word: "physical", options: ["physical", "physics", "special", "fiscal"], sentence: "Running is a good physical activity." },
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
  /** Lesson progress in each Learn to Read unit of sounds, and each sight word level (ids starting "sight-"). */
  units: Record<string, UnitProgress>;
  /** Sentences read aloud. */
  readAloud: number;
  /** Sound It Out practice: sessions done, and words read right out of those asked. */
  blending: { sessions: number; right: number; asked: number };
  /** This week's reading lesson, made at the start of the week for their reading age. */
  weekly?: WeeklyReading | null;
  /** Lessons passed since their reading age last went up. Every third one adds a month. */
  toward?: number;
}

/** The weekly Learn to Read lesson: one unit of sounds, one sight word level and the unit's story. */
export interface WeeklyReading {
  /** The Monday it's for, as yyyy-mm-dd. */
  week: string;
  unitId: string;
  levelId: string;
  /** Times done this week, and times passed. */
  done: number;
  passed: number;
  /** Best score this week, from 0 to 1. */
  best: number;
}

export const newReading = (): ReadingProgress => ({
  age: null,
  checkedAt: null,
  enrolled: false,
  enrolledBy: null,
  units: {},
  readAloud: 0,
  blending: { sessions: 0, right: 0, asked: 0 },
});

/** Older profiles have no reading record, and ones saved by older pages may miss fields. */
export function readingOf(profile: { reading?: Partial<ReadingProgress> }): ReadingProgress {
  const r = profile.reading;
  return { ...newReading(), ...(r ?? {}), units: { ...(r?.units ?? {}) }, blending: { ...newReading().blending, ...(r?.blending ?? {}) } };
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
  const levels = SIGHT_LEVELS.slice(0, startingIndex(age, SIGHT_LEVELS.length));
  for (const unit of [...UNITS.slice(0, startingUnitIndex(age)), ...levels]) {
    if (!units[unit.id]?.mastered) units[unit.id] = { lessons: units[unit.id]?.lessons ?? 0, best: 1, mastered: true, at: now };
  }
  // A new reading age starts the count to the next month again, and next week's lesson is at the new level.
  return { ...reading, age, checkedAt: now, enrolled, enrolledBy, units, toward: 0, weekly: null };
}

/** A grown-up adds the student to Learn to Read or takes them out. */
export function setEnrolled(reading: ReadingProgress, enrolled: boolean): ReadingProgress {
  return { ...reading, enrolled, enrolledBy: enrolled ? "grown-up" : null };
}

/** Which unit a reading age starts at: the units spread evenly from 5 years to the 7.5 cut-off. */
export function startingUnitIndex(age: number): number {
  return startingIndex(age, UNITS.length);
}

/** Where a reading age starts in a list of steps spread evenly from 5 years to the cut-off. */
function startingIndex(age: number, count: number): number {
  const fraction = (age - YOUNGEST) / (READING_AGE_CUTOFF - YOUNGEST);
  return Math.max(0, Math.min(count - 1, Math.floor(fraction * count)));
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

/** The first sight word level not yet done, or null when they're all done. */
export function currentSightLevel(reading: ReadingProgress): SightLevel | null {
  return SIGHT_LEVELS.find((l) => !reading.units[l.id]?.mastered) ?? null;
}

/** A sight word level opens once the ones before it are done. */
export function isSightOpen(reading: ReadingProgress, levelId: string): boolean {
  const index = SIGHT_LEVELS.findIndex((l) => l.id === levelId);
  return index >= 0 && SIGHT_LEVELS.slice(0, index).every((l) => reading.units[l.id]?.mastered);
}

export function sightLevelsDone(reading: ReadingProgress): number {
  return SIGHT_LEVELS.filter((l) => reading.units[l.id]?.mastered).length;
}

/** The units of sounds open so far: Sound It Out practises words from these. */
export function openUnits(reading: ReadingProgress): Unit[] {
  return UNITS.filter((u) => isOpen(reading, u.id));
}

export function recordBlending(reading: ReadingProgress, right: number, asked: number): ReadingProgress {
  const b = reading.blending;
  return { ...reading, blending: { sessions: b.sessions + 1, right: b.right + right, asked: b.asked + asked } };
}

// ---------- The weekly lesson ----------

/** Passing this many weekly lessons adds a month to the reading age. */
export const LESSONS_PER_MONTH = 3;

/** The sounds and sight words that fit a reading age, from the start of the program to the 7.5 cut-off. */
export function levelForAge(age: number): { unit: Unit; level: SightLevel } {
  return { unit: UNITS[startingIndex(age, UNITS.length)], level: SIGHT_LEVELS[startingIndex(age, SIGHT_LEVELS.length)] };
}

/**
 * This week's lesson: the one already made this week, or a new one for their reading age. Null
 * until they've done the reading check, since the lesson is set at the age it finds.
 */
export function weeklyReading(reading: ReadingProgress, now = Date.now()): WeeklyReading | null {
  const week = weekOf(now);
  if (reading.weekly?.week === week && getUnit(reading.weekly.unitId) && getSightLevel(reading.weekly.levelId)) return reading.weekly;
  if (reading.age === null) return null;
  const { unit, level } = levelForAge(reading.age);
  return { week, unitId: unit.id, levelId: level.id, done: 0, passed: 0, best: 0 };
}

/**
 * Saves a weekly lesson. Every pass counts towards the next month of reading age; the third adds
 * it. The unit and sight level are marked practised too, so the rest of Learn to Read keeps up.
 */
export function recordWeekly(reading: ReadingProgress, right: number, total: number, now = Date.now()): ReadingProgress {
  const weekly = weeklyReading(reading, now);
  if (!weekly) return reading;
  const score = total ? right / total : 0;
  const passed = score >= PASS_MARK;
  let next = recordLesson(recordLesson(reading, weekly.unitId, right, total, now), weekly.levelId, right, total, now);
  next = {
    ...next,
    weekly: { ...weekly, done: weekly.done + 1, passed: weekly.passed + (passed ? 1 : 0), best: Math.max(weekly.best, score) },
  };
  if (!passed || next.age === null) return next;
  const toward = (reading.toward ?? 0) + 1;
  if (toward < LESSONS_PER_MONTH) return { ...next, toward };
  return { ...next, toward: 0, age: Math.round((next.age! + 1 / 12) * 12) / 12 };
}

// ---------- Lessons ----------

export type LessonStep =
  /** Suni says each new sound with its example word. */
  | { kind: "meet"; sounds: Sound[] }
  /**
   * The student holds the microphone and says each new sound, checked against the recorded sounds
   * in `compare` (every sound taught so far, by IPA). For practice: it isn't marked.
   */
  | { kind: "say"; sounds: Sound[]; compare: string[] }
  /** Suni says a sound; the student taps how it's written. */
  | { kind: "find"; sound: Sound; options: string[] }
  /** The student sounds out a word (tapping each sound to hear it), then picks its picture. */
  | { kind: "picture"; word: PhonicsWord; parts: string[]; options: PhonicsWord[] }
  /** Suni says a word; the student picks it from words built from the same sounds. A sentence using it, when there is one. */
  | { kind: "listen"; word: PhonicsWord; options: string[]; sentence?: string }
  /** The student reads a sentence aloud. */
  | { kind: "read"; sentence: string }
  /** Suni says each new sight word; the student taps to hear them again. */
  | { kind: "meetWords"; words: string[] }
  /** Suni reads a sentence aloud; the student picks the word that fills its gap. */
  | { kind: "gap"; sentence: string; word: string; options: string[] }
  /** Words with each new sound in them, to tap and hear. */
  | { kind: "soundWords"; groups: { sound: Sound; words: PhonicsWord[] }[] }
  /** Blending practice, like "f, a, fa, fat, fa, fan": two sounds, the two together, then words that start that way. */
  | { kind: "drill"; parts: Sound[]; syllable: Syllable; words: string[] }
  /** The week's story to read, with Suni reading it too if they want. */
  | { kind: "story"; story: Story }
  /** A question about the story. */
  | { kind: "question"; story: Story; question: string; answer: string; options: string[] }
  /** The story's picture to colour in. */
  | { kind: "colour"; story: Story };

/** Two sounds blended, like "fa": how it's written, a respelling for a device's voice, and its IPA for the cloud voice. */
export interface Syllable {
  shown: string;
  say: string;
  ipa: string;
}

/** The steps that are questions, which make up the score. */
export const SCORED: LessonStep["kind"][] = ["find", "picture", "listen", "gap", "question"];

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
    // Other spellings of the same sound (s and ss, c and k) would both be right, so they're left out.
    const alike = new Set(known.filter((s) => s.ipa === sound.ipa).map((s) => s.grapheme));
    const others = distractors(
      graphemes.filter((g) => !alike.has(g)),
      sound.grapheme,
      (a, b) => a === b,
      random,
    );
    return { kind: "find" as const, sound, options: shuffle([sound.grapheme, ...others], random) };
  });

  const earlier = UNITS.slice(0, UNITS.findIndex((u) => u.id === unitId) + 1).flatMap((u) => u.words);
  const asked = shuffle(unit.words, random)
    .slice(0, WORD_QUESTIONS)
    .map((word) => wordQuestion(word, earlier, random));

  return [
    { kind: "meet", sounds: unit.sounds },
    { kind: "say", sounds: unit.sounds, compare: [...new Set(known.map((s) => s.ipa))] },
    ...finds,
    ...asked,
    { kind: "read", sentence: unit.sentence },
  ];
}

/** A word to sound out: pick its picture when it has one, otherwise pick it when Suni says it. */
function wordQuestion(word: PhonicsWord, pool: PhonicsWord[], random: () => number): LessonStep {
  const pictured = pool.filter((x) => x.emoji && x.emoji !== word.emoji);
  if (word.emoji && pictured.length >= 3) {
    const options = [word, ...distractors(pictured, word, (a, b) => a.emoji === b.emoji || a.word === b.word, random)];
    return { kind: "picture", word, parts: graphemesOf(word.word), options: shuffle(options, random) };
  }
  const others = distractors(
    pool.map((x) => x.word),
    word.word,
    (a, b) => a === b,
    random,
  );
  return { kind: "listen", word, options: shuffle([word.word, ...others], random) };
}

const VOWEL_IPA = new Set([
  "æ",
  "e",
  "ɪ",
  "ɒ",
  "ʌ",
  "eɪ",
  "iː",
  "aɪ",
  "oʊ",
  "uː",
  "ʊ",
  "ɑː",
  "ɔː",
  "ɜː",
  "aʊ",
  "ɔɪ",
  "ɪə",
  "eə",
  "ə",
  "juː",
]);
const isVowel = (s: Sound) => VOWEL_IPA.has(s.ipa);

/** A consonant and vowel blended, like "fa" in fat. A split vowel is written with its e, like "ca–e" in cake. */
export function syllableOf(onset: Sound, vowel: Sound, word: string): Syllable {
  const parts = graphemesOf(word);
  const split = vowel.grapheme.includes("_");
  return {
    shown: `${parts[0]}${parts[1]}${split ? "–e" : ""}`,
    // "tuh" + "ah" would run together as "tuhah", so the consonant loses its "uh" and any held letters ("sss").
    say: onset.say.replace(/uh$/, "").replace(/(.)\1+$/, "$1") + vowel.say,
    ipa: onset.ipa.replace(/ə$/, "") + vowel.ipa,
  };
}

/**
 * Blending drills for a unit: words from the program so far that start with a consonant and a vowel
 * (fat, fan), grouped by that start, putting first the groups that use this unit's new sounds.
 */
export function buildDrills(unitId: string, count = 2, random: () => number = Math.random): LessonStep[] {
  const unit = getUnit(unitId);
  if (!unit) return [];
  const fresh = new Set(unit.sounds.map((s) => s.grapheme));
  const words = UNITS.slice(0, UNITS.findIndex((u) => u.id === unitId) + 1).flatMap((u) => u.words.map((w) => w.word));
  const groups = new Map<string, { parts: Sound[]; syllable: Syllable; words: string[]; fresh: boolean }>();
  for (const word of shuffle([...new Set(words)], random)) {
    const parts = graphemesOf(word);
    if (parts.length < 3) continue;
    const onset = soundAt(word, 0, parts);
    const vowel = soundAt(word, 1, parts);
    if (!onset || !vowel || isVowel(onset) || !isVowel(vowel)) continue;
    const syllable = syllableOf(onset, vowel, word);
    const key = `${syllable.shown}|${syllable.ipa}`;
    const group = groups.get(key) ?? { parts: [onset, vowel], syllable, words: [], fresh: false };
    group.words.push(word);
    group.fresh ||= fresh.has(onset.grapheme) || fresh.has(vowel.grapheme);
    groups.set(key, group);
  }
  // One blend with this week's new sounds, then the blends with the most words to read (fa, fat, fa, fan).
  const all = [...groups.values()];
  const most = (a: { words: string[] }, b: { words: string[] }) => Math.min(b.words.length, 3) - Math.min(a.words.length, 3);
  const first = all.filter((g) => g.fresh).sort(most)[0];
  const rest = all.filter((g) => g !== first).sort((a, b) => most(a, b) || Number(b.fresh) - Number(a.fresh));
  return [...(first ? [first] : []), ...rest]
    .slice(0, count)
    .map((g) => ({ kind: "drill" as const, parts: g.parts, syllable: g.syllable, words: g.words.slice(0, 3) }));
}

/** Words from the unit with each of its new sounds in, up to three for each, pictured ones first. */
export function soundWordGroups(unitId: string): { sound: Sound; words: PhonicsWord[] }[] {
  const unit = getUnit(unitId);
  if (!unit) return [];
  return unit.sounds.map((sound) => {
    // Two sounds written the same way (the oo in moon and in book) can't be told apart in a word, so they get their own example.
    const shared = unit.sounds.filter((x) => x.grapheme === sound.grapheme).length > 1;
    const has = shared
      ? []
      : unit.words.filter((w) => graphemesOf(w.word).some((_, i, parts) => soundAt(w.word, i, parts)?.grapheme === sound.grapheme));
    const words = [...has].sort((a, b) => Number(Boolean(b.emoji)) - Number(Boolean(a.emoji))).slice(0, 3);
    return { sound, words: words.length ? words : [{ word: sound.example, emoji: sound.emoji }] };
  });
}

/** Questions on a story, with their answers shuffled. */
export function storyQuestions(story: Story, random: () => number = Math.random): LessonStep[] {
  return story.questions.map((q) => ({
    kind: "question",
    story,
    question: q.question,
    answer: q.options[0],
    options: shuffle(q.options, random),
  }));
}

/**
 * The weekly Learn to Read lesson, in three parts: the sounds (meet them, hear them in words, blend
 * them, find them, read words), the sight words (meet them, fill gaps), then the story (read it,
 * answer five questions, colour its picture).
 */
export function buildWeeklyLesson(weekly: WeeklyReading, random: () => number = Math.random): LessonStep[] {
  const unit = getUnit(weekly.unitId);
  const level = getSightLevel(weekly.levelId);
  if (!unit || !level) return [];
  const sounds = buildLesson(unit.id, random).filter((s) => s.kind !== "read");
  const [meet, say, ...rest] = sounds;
  const finds = rest.filter((s) => s.kind === "find").slice(0, 2);
  const words = rest.filter((s) => s.kind === "picture" || s.kind === "listen");
  const sight = buildSightLesson(level.id, random);
  const gaps = sight.filter((s) => s.kind === "gap").slice(0, 3);
  const story = storyFor(unit.id);
  return [
    meet,
    say,
    { kind: "soundWords", groups: soundWordGroups(unit.id) },
    ...buildDrills(unit.id, 2, random),
    ...finds,
    ...words,
    sight[0],
    ...gaps,
    ...(story ? [{ kind: "story" as const, story }, ...storyQuestions(story, random), { kind: "colour" as const, story }] : []),
  ];
}

/** A sight word lesson: meet the words, find each when Suni says it, fill gaps in sentences, then read a sentence aloud. */
export function buildSightLesson(levelId: string, random: () => number = Math.random): LessonStep[] {
  const level = getSightLevel(levelId);
  if (!level) return [];
  const known = sightWordsUpTo(levelId).map((w) => w.word);
  const picks = shuffle(level.words, random);
  const finds = picks.slice(0, FIND_QUESTIONS).map((w): LessonStep => ({
    kind: "listen",
    word: { word: w.word },
    sentence: w.gap.replace("___", w.word),
    options: shuffle([w.word, ...distractors(known, w.word, (a, b) => a.toLowerCase() === b.toLowerCase(), random)], random),
  }));
  // Gap words come from the same level, so they're the words being learnt.
  const levelWords = level.words.map((w) => w.word);
  const gaps = picks.slice(FIND_QUESTIONS, FIND_QUESTIONS + WORD_QUESTIONS).map((w): LessonStep => ({
    kind: "gap",
    sentence: w.gap,
    word: w.word,
    options: shuffle([w.word, ...distractors(levelWords, w.word, (a, b) => a === b, random)], random),
  }));
  return [{ kind: "meetWords", words: levelWords }, ...finds, ...gaps, { kind: "read", sentence: level.sentence }];
}

/** Sound It Out: 8 words to sound out from every unit of sounds open so far, then a sentence to read. */
export function buildBlendPractice(reading: ReadingProgress, random: () => number = Math.random): LessonStep[] {
  const units = openUnits(reading);
  const pool = units.flatMap((u) => u.words);
  if (!pool.length) return [];
  const asked = shuffle(pool, random)
    .slice(0, FIND_QUESTIONS + WORD_QUESTIONS)
    .map((word) => wordQuestion(word, pool, random));
  const sentence = shuffle(units, random)[0].sentence;
  return [...asked, { kind: "read", sentence }];
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
