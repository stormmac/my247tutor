import { type Curriculum, curriculumOf, DEFAULT_CURRICULUM, yearName } from "../curriculum/curricula";
import { getSkill } from "../curriculum/skills";
import type { Subject, YearLevel } from "../curriculum/types";
import {
  ACTIVITY_QUESTIONS,
  REVIEW_QUESTIONS,
  SKILL_BUILDER_QUESTIONS,
  weekOf,
  type LessonPart,
  type WeeklyLesson,
} from "../learner/lesson";
import { skillState, type LearnerProfile } from "../learner/model";
import { Rng } from "../practice/rng";
import { progressKey } from "./practice";
import { questionsOf, subtopicsOf, topicsFor } from "./tree";
import { DIFFICULTIES, type ContentQuestion, type Difficulty, type Subtopic } from "./types";

/** The warm-up is revision, so it leaves out the very easy and very hard levels. */
const REVIEW_LEVELS: Difficulty[] = ["easy", "medium", "hard"];
/** Strength given to a subtopic the child hasn't tried yet: below a mastered one, above a struggling one. */
const UNKNOWN = 0.5;

const rank = (q: ContentQuestion) => DIFFICULTIES.indexOf(q.difficulty);

/** Subtopics in a year that have written questions to practise (writing tasks don't). */
function practiseable(subject: Subject, year: YearLevel, curriculum: Curriculum) {
  return topicsFor(subject, year, curriculum).map((topic) => ({
    topic,
    subtopics: subtopicsOf(topic.id).filter(
      (s) => !(s.skill_id && getSkill(s.skill_id).practice === "writing") && questionsOf(s.id, curriculum).length > 0,
    ),
  }));
}

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
function review(subject: Subject, year: YearLevel, rng: Rng, curriculum: Curriculum): string[] {
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

/** Makes this week's lesson. The seed makes it the same for a child however often it is rebuilt in a week. */
export function buildLesson(profile: LearnerProfile, subject: Subject, now = Date.now()): WeeklyLesson {
  const week = weekOf(now);
  const rng = new Rng(hash(`${profile.id ?? profile.name}:${subject}:${week}`));
  const reviewYear = Math.max(1, profile.yearLevel - 1) as YearLevel;
  const curriculum = curriculumOf(profile.curriculum);
  const parts: LessonPart[] = [
    {
      kind: "review",
      title: `${yearName(reviewYear, curriculum)} review`,
      year: reviewYear,
      questionIds: review(subject, reviewYear, rng, curriculum),
      results: [],
    },
    ...weakestSubtopics(profile, subject).map(({ topic, subtopic }): LessonPart => ({
      kind: "activity",
      title: topic === subtopic.title ? topic : `${topic}: ${subtopic.title}`,
      year: profile.yearLevel,
      subtopicId: subtopic.id,
      questionIds: activity(subtopic, rng, curriculum),
      results: [],
    })),
  ];
  return { week, curriculum, parts: parts.filter((p) => p.questionIds.length) };
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
