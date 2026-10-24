import { type Curriculum, curriculumOf, DEFAULT_CURRICULUM, yearName } from "../curriculum/curricula";
import type { Subject, YearLevel } from "../curriculum/types";
import {
  ACTIVITY_QUESTIONS,
  REVIEW_QUESTIONS,
  resultTries,
  SKILL_BUILDER_QUESTIONS,
  weekOf,
  type LessonPart,
  type WeeklyLesson,
} from "../learner/lesson";
import { skillState, type LearnerProfile } from "../learner/model";
import { focusStreams, type WorkProgram } from "../learner/program";
import { practiseable, programFor, streamSubtopics } from "./program";
import { Rng } from "../practice/rng";
import { progressKey } from "./practice";
import { questionsOf, subtopicPath } from "./tree";
import { DIFFICULTIES, type ContentQuestion, type Difficulty, type Subtopic } from "./types";

/** The warm-up is revision, so it leaves out the very easy and very hard levels. */
const REVIEW_LEVELS: Difficulty[] = ["easy", "medium", "hard"];
/** Strength given to a subtopic the child hasn't tried yet: below a mastered one, above a struggling one. */
const UNKNOWN = 0.5;

const rank = (q: ContentQuestion) => DIFFICULTIES.indexOf(q.difficulty);

/**
 * How well the child can do a subtopic, 0 to 1: mastery from practice, otherwise how they went on
 * it in the starting check, otherwise UNKNOWN.
 */
export function subtopicStrength(profile: LearnerProfile, subtopic: Subtopic): number {
  const st = skillState(profile, progressKey(subtopic));
  if (st.mastered || st.attempts > 0) return st.mastery;
  const checked = profile.history.filter((h) => h.skillId === subtopic.id).slice(-10);
  if (checked.length) return checked.filter((h) => h.correct).length / checked.length;
  return UNKNOWN;
}

/** Twenty questions spread across the year's subtopics, easy to hard. */
function reviewQuestions(subject: Subject, year: YearLevel, rng: Rng, curriculum: Curriculum): string[] {
  const subtopics = rng.shuffle(practiseable(subject, year, curriculum).flatMap((t) => t.subtopics));
  if (!subtopics.length) return [];
  const used = new Set<string>();
  const picked: ContentQuestion[] = [];
  for (let i = 0; picked.length < REVIEW_QUESTIONS && i < REVIEW_QUESTIONS * 4; i++) {
    const level = REVIEW_LEVELS[Math.floor((picked.length * REVIEW_LEVELS.length) / REVIEW_QUESTIONS)];
    const pool = questionsOf(subtopics[i % subtopics.length].id, curriculum).filter((q) => !used.has(q.id));
    const atLevel = pool.filter((q) => q.difficulty === level);
    const q = atLevel.length ? rng.pick(atLevel) : pool.length ? rng.pick(pool) : null;
    if (!q) continue;
    used.add(q.id);
    picked.push(q);
  }
  return picked.sort((a, b) => rank(a) - rank(b)).map((q) => q.id);
}

/** Ten questions on one subtopic: two at each level, very easy to very hard. */
function activity(subtopic: Subtopic, rng: Rng, curriculum: Curriculum): string[] {
  const questions = questionsOf(subtopic.id, curriculum);
  const perLevel = ACTIVITY_QUESTIONS / DIFFICULTIES.length;
  const picked = DIFFICULTIES.flatMap((d) => rng.shuffle(questions.filter((q) => q.difficulty === d)).slice(0, perLevel));
  // A subtopic short of a level fills up from the rest, still easiest first.
  const rest = rng.shuffle(questions.filter((q) => !picked.includes(q)));
  return [...picked, ...rest]
    .slice(0, ACTIVITY_QUESTIONS)
    .sort((a, b) => rank(a) - rank(b))
    .map((q) => q.id);
}

/**
 * The child's weakest subtopics in their own year, each from a different topic where possible.
 * A topic's strength is the average of its subtopics', and the activity is its weakest subtopic.
 */
export function weakestSubtopics(profile: LearnerProfile, subject: Subject, count = 2): { topic: string; subtopic: Subtopic }[] {
  const topics = practiseable(subject, profile.yearLevel, curriculumOf(profile.curriculum))
    .filter((t) => t.subtopics.length)
    .map((t) => {
      const scored = t.subtopics
        .map((s) => ({ subtopic: s, strength: subtopicStrength(profile, s) }))
        .sort((a, b) => a.strength - b.strength);
      return { title: t.topic.title, scored, strength: scored.reduce((n, s) => n + s.strength, 0) / scored.length };
    })
    .sort((a, b) => a.strength - b.strength);
  const picks = topics.slice(0, count).map((t) => ({ topic: t.title, subtopic: t.scored[0].subtopic }));
  // Fewer topics than activities: take the next weakest subtopics from the weakest topics.
  for (const t of topics) for (const s of t.scored.slice(1)) if (picks.length < count) picks.push({ topic: t.title, subtopic: s.subtopic });
  return picks;
}

/** An activity: ten questions on one subtopic. */
function activityPart(topic: string, subtopic: Subtopic, year: YearLevel, rng: Rng, curriculum: Curriculum, label?: string): LessonPart {
  const title = topic === subtopic.title ? topic : `${topic}: ${subtopic.title}`;
  return {
    kind: "activity",
    title: label ? `${title} (${label})` : title,
    year,
    subtopicId: subtopic.id,
    questionIds: activity(subtopic, rng, curriculum),
    results: [],
  };
}

/**
 * The activities from the work program: the weakest subtopic not passed yet in each of the two
 * focus streams, at the stream's year. With one stream left, both come from it. Null when every
 * stream is caught up.
 */
function programActivities(profile: LearnerProfile, subject: Subject, program: WorkProgram, rng: Rng): LessonPart[] | null {
  const curriculum = curriculumOf(profile.curriculum);
  const focus = focusStreams(program, profile.yearLevel);
  if (!focus.length) return null;
  const queues = focus.map((s) => {
    const all = streamSubtopics(subject, s.stream, s.year, curriculum)
      .map((x) => ({ ...x, strength: subtopicStrength(profile, x.subtopic) }))
      .sort((a, b) => a.strength - b.strength);
    // Ones still to pass first, then the rest in case a stream is short.
    return {
      stream: s,
      items: [...all.filter((x) => !s.passed.includes(x.subtopic.id)), ...all.filter((x) => s.passed.includes(x.subtopic.id))],
    };
  });
  const parts: LessonPart[] = [];
  const used = new Set<string>();
  for (let round = 0; parts.length < 2 && round < 2; round++)
    for (const q of queues) {
      const next = q.items.find((x) => !used.has(x.subtopic.id));
      if (!next || parts.length >= 2) continue;
      used.add(next.subtopic.id);
      // Work below the child's own year says which year it is, such as "(Year 4)".
      const label = q.stream.year < profile.yearLevel ? yearName(q.stream.year, curriculum) : undefined;
      parts.push(activityPart(next.topic.title, next.subtopic, q.stream.year as YearLevel, rng, curriculum, label));
    }
  return parts.length ? parts : null;
}

/** From this year, the English weekly lesson is comprehension, writing and vocabulary. */
export const SENIOR_ENGLISH_YEAR = 6;

/** The three parts of a senior English lesson, each found by its topic or subtopic's name. */
const SENIOR_ENGLISH: { name: string; matches: (topic: string, subtopic: string) => boolean }[] = [
  { name: "Comprehension", matches: (t, s) => /comprehension/i.test(s) || /^reading/i.test(t) },
  { name: "Writing", matches: (t, s) => /writing/i.test(t) || /writing/i.test(s) },
  { name: "Vocabulary", matches: (t, s) => /vocab|word meaning/i.test(t) || /vocab|word meaning/i.test(s) },
];

/**
 * Comprehension, writing and vocabulary from the child's own year, the weakest subtopic of each.
 * Fewer than three parts when the curriculum has no such topic, and the usual lesson is made instead.
 */
function seniorEnglish(profile: LearnerProfile, rng: Rng): LessonPart[] {
  const curriculum = curriculumOf(profile.curriculum);
  const all = practiseable("english", profile.yearLevel, curriculum).flatMap(({ topic, subtopics }) =>
    subtopics.map((subtopic) => ({ topic, subtopic, strength: subtopicStrength(profile, subtopic) })),
  );
  return SENIOR_ENGLISH.flatMap(({ name, matches }) => {
    const pick = all.filter((x) => matches(x.topic.title, x.subtopic.title)).sort((a, b) => a.strength - b.strength)[0];
    if (!pick) return [];
    const part = activityPart(pick.topic.title, pick.subtopic, profile.yearLevel, rng, curriculum);
    return [{ ...part, title: `${name}: ${pick.subtopic.title}` }];
  }).filter((p) => p.questionIds.length);
}

/**
 * Makes this week's lesson. The seed makes it the same for a child however often it is rebuilt in a week.
 * With a work program the activities come from it; otherwise they are the weakest subtopics in the child's year.
 */
export function buildLesson(profile: LearnerProfile, subject: Subject, now = Date.now()): WeeklyLesson {
  const week = weekOf(now);
  const rng = new Rng(hash(`${profile.id ?? profile.name}:${subject}:${week}`));
  const curriculum = curriculumOf(profile.curriculum);
  if (subject === "english" && profile.yearLevel >= SENIOR_ENGLISH_YEAR) {
    const parts = seniorEnglish(profile, rng);
    if (parts.length === SENIOR_ENGLISH.length) return { week, curriculum, parts };
  }
  const program = programFor(profile, subject);
  const focus = program ? focusStreams(program, profile.yearLevel) : [];
  // The warm-up is the year below the work: the child's own year, or the lowest year the program is at.
  const workYear = focus.length ? Math.min(profile.yearLevel, ...focus.map((s) => s.year)) : profile.yearLevel;
  const reviewYear = Math.max(1, workYear - 1) as YearLevel;
  const review: LessonPart = {
    kind: "review",
    title: `${yearName(reviewYear, curriculum)} review`,
    year: reviewYear,
    questionIds: reviewQuestions(subject, reviewYear, rng, curriculum),
    results: [],
  };
  const activities =
    (program && programActivities(profile, subject, program, rng)) ??
    weakestSubtopics(profile, subject).map(({ topic, subtopic }) => activityPart(topic, subtopic, profile.yearLevel, rng, curriculum));
  return { week, curriculum, parts: [review, ...activities].filter((p) => p.questionIds.length) };
}

/** Work set by a parent, teacher or centre, as it comes from the server. */
export interface SetWorkItem {
  id: string;
  subtopicId: string;
  setBy: string | null;
  note: string | null;
  /** To do at home after the class session. */
  homework?: boolean;
  /** Homework redoing the questions not right first go in these pieces of set work (the session's activities). */
  redo?: string[];
}

/**
 * The questions to redo for homework: those not right first go in the session's activities that
 * are in this lesson. Null until each of those activities is finished, and when none is here.
 */
export function mistakesOf(lesson: WeeklyLesson, redo: string[]): string[] | null {
  const parts = lesson.parts.filter((p) => p.setWorkId && redo.includes(p.setWorkId));
  if (!parts.length || parts.some((p) => p.results.length < p.questionIds.length)) return null;
  return parts.flatMap((p) => p.questionIds.filter((_, i) => resultTries(p.results[i]) !== 1));
}

/** A piece of set work as a lesson part, or null when it can't be one (yet). */
function setPart(lesson: WeeklyLesson, w: SetWorkItem, profile: LearnerProfile): LessonPart | null {
  const curriculum = curriculumOf(profile.curriculum);
  const extra = {
    ...(w.setBy ? { setBy: w.setBy } : {}),
    ...(w.note ? { note: w.note } : {}),
    ...(w.homework ? { homework: true } : {}),
  };
  if (w.redo) {
    const questionIds = mistakesOf(lesson, w.redo);
    if (!questionIds?.length) return null;
    const title = "Redo the questions you got wrong";
    return { kind: "set", title, year: profile.yearLevel, setWorkId: w.id, ...extra, redo: true, questionIds, results: [] };
  }
  const path = subtopicPath(w.subtopicId, curriculum);
  if (!path) return null;
  const rng = new Rng(hash(`${w.id}:${lesson.week}`));
  const { topic, subtopic } = path;
  const questionIds = activity(subtopic, rng, curriculum);
  if (!questionIds.length) return null;
  return {
    kind: "set",
    title: topic.title === subtopic.title ? topic.title : `${topic.title}: ${subtopic.title}`,
    year: profile.yearLevel,
    subtopicId: subtopic.id,
    setWorkId: w.id,
    ...extra,
    questionIds,
    results: [],
  };
}

/**
 * Adds set work the lesson doesn't have yet as parts after the rest: ten questions on its
 * subtopic, easy to hard. Work on a subtopic this curriculum doesn't have is left out. Homework
 * redoing a session's mistakes joins once the session's activities are finished.
 */
export function addSetWork(lesson: WeeklyLesson, items: SetWorkItem[], profile: LearnerProfile): WeeklyLesson {
  const have = new Set(lesson.parts.map((p) => p.setWorkId).filter(Boolean));
  const parts = items.filter((w) => !have.has(w.id)).flatMap((w) => setPart(lesson, w, profile) ?? []);
  return parts.length ? { ...lesson, parts: [...lesson.parts, ...parts] } : lesson;
}

/**
 * Brings the lesson's set work in line with `open`, all the open set work in its subject: parts
 * not started yet follow a teacher's changes (a new activity in the box, homework or not) or go
 * when the work was taken back, then new work is added. Parts already started stay as they are.
 */
export function syncSetWork(lesson: WeeklyLesson, open: SetWorkItem[], profile: LearnerProfile): WeeklyLesson {
  const byId = new Map(open.map((w) => [w.id, w]));
  let changed = false;
  const parts = lesson.parts.flatMap((p): LessonPart[] => {
    if (p.kind !== "set" || !p.setWorkId || p.results.length) return [p];
    const w = byId.get(p.setWorkId);
    if (!w) {
      changed = true;
      return [];
    }
    if (!w.redo && w.subtopicId !== p.subtopicId) {
      changed = true;
      return [setPart(lesson, w, profile) ?? []].flat();
    }
    if (Boolean(w.homework) !== Boolean(p.homework)) {
      changed = true;
      const { homework: _old, ...rest } = p;
      return [w.homework ? { ...rest, homework: true } : rest];
    }
    return [p];
  });
  return addSetWork(changed ? { ...lesson, parts } : lesson, open, profile);
}

/**
 * Skill builder questions for a missed question: others from its subtopic, closest in difficulty
 * first, leaving out the ones in this week's lesson so none is seen early.
 */
export function skillBuilder(
  missed: ContentQuestion,
  lessonIds: string[],
  rng: Rng,
  curriculum: Curriculum = DEFAULT_CURRICULUM,
): string[] {
  const skip = new Set([missed.id, ...lessonIds]);
  const pool = questionsOf(missed.subtopic_id, curriculum).filter((q) => !skip.has(q.id));
  const distance = (q: ContentQuestion) => Math.abs(rank(q) - rank(missed));
  const byLevel = DIFFICULTIES.map((_, gap) => rng.shuffle(pool.filter((q) => distance(q) === gap)));
  return byLevel
    .flat()
    .slice(0, SKILL_BUILDER_QUESTIONS)
    .sort((a, b) => rank(a) - rank(b))
    .map((q) => q.id);
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
