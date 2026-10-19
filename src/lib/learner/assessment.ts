/**
 * The starting assessment every new student takes in each subject. It uses the written question
 * bank in the topic tree, picked at random (no AI), starting at competency level 1 (very easy)
 * two years below the student's year (or Year 1) and climbing until the questions get too hard.
 * The work program (./program.ts) is made from the result.
 *
 * Each step is one year and one competency level. The levels are the bank's five difficulties;
 * the climb visits levels 1, 3 and 5 of each year so it stays short. Two questions are asked at a
 * step: both right moves up, both wrong stops, and a split gets a third question to decide.
 */
import { type Curriculum, curriculumOf, DEFAULT_CURRICULUM, subjectName, yearName } from "../curriculum/curricula";
import type { Subject, YearLevel } from "../curriculum/types";
import { questionsOf, subtopicPath, subtopicsOf, topicsFor } from "../content/tree";
import { DIFFICULTIES, type ContentQuestion, type Difficulty } from "../content/types";
import type { AttemptDetails, AttemptRecord, LearnerProfile } from "./model";
import { skillState } from "./model";
import { makeProgram } from "../content/program";

export type Level = 1 | 2 | 3 | 4 | 5;
export const LEVEL_NAMES: Record<Level, string> = { 1: "very easy", 2: "easy", 3: "medium", 4: "hard", 5: "very hard" };
const CLIMB: Level[] = [1, 3, 5];
/** The lowest and highest years the question bank covers. */
const FIRST_YEAR = 1;
const LAST_YEAR = 8;
export const MAX_QUESTIONS = 30;

export interface Step {
  year: YearLevel;
  level: Level;
}

export interface AssessmentAnswer {
  questionId: string;
  subtopicId: string;
  /** Topic name, for the report. */
  topic: string;
  year: YearLevel;
  level: Level;
  correct: boolean;
  question?: string;
  answer?: string;
  rightAnswer?: string;
}

export interface AssessmentState {
  subject: Subject;
  /** The student's school year. */
  yearLevel: YearLevel;
  startYear: YearLevel;
  steps: Step[];
  /** The step being asked now. */
  step: number;
  /** Results so far at the current step. */
  stepResults: boolean[];
  /** Highest step passed, or -1. */
  passed: number;
  answers: AssessmentAnswer[];
  done: boolean;
  /** Which tree the questions come from. Missing means NSW. */
  curriculum?: Curriculum;
}

/** The finished assessment, kept on the learner profile for the parents page. */
export interface AssessmentRecord {
  subject: Subject;
  at: number;
  yearLevel: YearLevel;
  startYear: YearLevel;
  /** The highest year and level passed, or null when the first step was too hard. */
  reached: Step | null;
  /** The step that stopped the climb, if any. */
  stoppedAt: Step | null;
  answers: AssessmentAnswer[];
  /** The curriculum the questions came from. Missing means NSW. */
  curriculum?: Curriculum;
}

const difficultyOf = (level: Level): Difficulty => DIFFICULTIES[level - 1];

/** Two years below the student's year, or Year 1, where the question bank starts. */
export function startYearFor(yearLevel: YearLevel): YearLevel {
  return Math.max(FIRST_YEAR, yearLevel - 2) as YearLevel;
}

/** Every question for a subject, year and level, from the topic tree. */
export function questionsAt(subject: Subject, step: Step, curriculum: Curriculum = DEFAULT_CURRICULUM): ContentQuestion[] {
  const difficulty = difficultyOf(step.level);
  return topicsFor(subject, step.year, curriculum)
    .flatMap((t) => subtopicsOf(t.id))
    .flatMap((s) => questionsOf(s.id, curriculum))
    .filter((q) => q.difficulty === difficulty);
}

export function startAssessment(subject: Subject, yearLevel: YearLevel, curriculum: Curriculum = DEFAULT_CURRICULUM): AssessmentState {
  const startYear = startYearFor(yearLevel);
  // Up to a year above their own, so a student who is ahead can show it.
  const lastYear = Math.min(LAST_YEAR, yearLevel + 1);
  const steps: Step[] = [];
  for (let year = startYear; year <= lastYear; year++)
    for (const level of CLIMB)
      if (questionsAt(subject, { year: year as YearLevel, level }, curriculum).length) steps.push({ year: year as YearLevel, level });
  return { subject, yearLevel, startYear, steps, step: 0, stepResults: [], passed: -1, answers: [], done: steps.length === 0, curriculum };
}

/**
 * A random question for the current step, from a topic not asked yet where possible, so the
 * assessment covers the whole subject. Null when the assessment is over.
 */
export function nextQuestion(state: AssessmentState, random: () => number = Math.random): ContentQuestion | null {
  if (state.done) return null;
  const asked = new Set(state.answers.map((a) => a.questionId));
  const askedSubtopics = new Set(state.answers.map((a) => a.subtopicId));
  const pool = questionsAt(state.subject, state.steps[state.step], curriculumOf(state.curriculum)).filter((q) => !asked.has(q.id));
  if (!pool.length) return null;
  const fresh = pool.filter((q) => !askedSubtopics.has(q.subtopic_id));
  const from = fresh.length ? fresh : pool;
  // Pick a subtopic first, then a question in it, so topics with more questions aren't favoured.
  const subtopics = [...new Set(from.map((q) => q.subtopic_id))];
  const subtopic = subtopics[Math.floor(random() * subtopics.length)];
  const inSubtopic = from.filter((q) => q.subtopic_id === subtopic);
  return inSubtopic[Math.floor(random() * inSubtopic.length)];
}

/** Records an answer and moves up a step, stops, or asks another question at this step. */
export function recordAnswer(state: AssessmentState, q: ContentQuestion, correct: boolean, details: AttemptDetails = {}): AssessmentState {
  const step = state.steps[state.step];
  const answers = [
    ...state.answers,
    {
      questionId: q.id,
      subtopicId: q.subtopic_id,
      topic: subtopicPath(q.subtopic_id, curriculumOf(state.curriculum))?.subtopic.title ?? "",
      year: step.year,
      level: step.level,
      correct,
      ...(details.question ? { question: details.question } : {}),
      ...(details.answer !== undefined ? { answer: details.answer } : {}),
      ...(!correct && details.rightAnswer ? { rightAnswer: details.rightAnswer } : {}),
    },
  ];
  const results = [...state.stepResults, correct];
  const right = results.filter(Boolean).length;
  const wrong = results.length - right;
  const out = answers.length >= MAX_QUESTIONS;
  if (right >= 2) {
    const next = state.step + 1;
    const done = next >= state.steps.length || out;
    return { ...state, answers, passed: state.step, step: done ? state.step : next, stepResults: [], done };
  }
  if (wrong >= 2) return { ...state, answers, stepResults: results, done: true };
  return { ...state, answers, stepResults: results, done: out };
}

export function finishAssessment(state: AssessmentState, now = Date.now()): AssessmentRecord {
  const stopped = state.passed < state.step || state.stepResults.length > 0;
  return {
    subject: state.subject,
    at: now,
    yearLevel: state.yearLevel,
    startYear: state.startYear,
    reached: state.passed >= 0 ? state.steps[state.passed] : null,
    stoppedAt: stopped && state.steps[state.step] ? state.steps[state.step] : null,
    answers: state.answers,
    ...(state.curriculum ? { curriculum: state.curriculum } : {}),
  };
}

/** Placement days: placed skills are checked again in practice a few days later. */
const REVIEW_DAYS = 3;

/**
 * Saves a finished assessment: the record for the parents page, each answer in the question
 * history, skills that only appear in years the student has passed marked as known, and the work
 * program, so practice starts where they are.
 */
export function applyAssessment(profile: LearnerProfile, record: AssessmentRecord): LearnerProfile {
  const reached = record.reached;
  const skills = { ...profile.skills };
  if (reached) {
    // A year counts as passed once its hardest level is passed.
    const passedYear = reached.level === 5 ? reached.year : reached.year - 1;
    const years = new Map<string, number>();
    for (let year = FIRST_YEAR; year <= LAST_YEAR; year++)
      for (const t of topicsFor(record.subject, year as YearLevel, curriculumOf(profile.curriculum)))
        for (const s of subtopicsOf(t.id)) if (s.skill_id) years.set(s.skill_id, Math.max(years.get(s.skill_id) ?? 0, year));
    for (const [id, lastYear] of years) {
      if (lastYear > passedYear || skillState(profile, id).mastered) continue;
      skills[id] = {
        ...skillState(profile, id),
        mastery: 0.85,
        mastered: true,
        placed: true,
        reviewIntervalDays: REVIEW_DAYS,
        nextReview: record.at + REVIEW_DAYS * 86_400_000,
      };
    }
  }
  const history: AttemptRecord[] = record.answers.map((a, i) => ({
    skillId: a.subtopicId,
    at: record.at - (record.answers.length - i) * 1000,
    correct: a.correct,
    hintsUsed: 0,
    ...(a.question ? { question: a.question } : {}),
    ...(a.answer !== undefined ? { answer: a.answer } : {}),
    ...(a.rightAnswer ? { rightAnswer: a.rightAnswer } : {}),
  }));
  return {
    ...profile,
    skills,
    history: [...profile.history, ...history].slice(-1000),
    placementDone: { ...profile.placementDone, [record.subject]: true },
    programs: { ...profile.programs, [record.subject]: makeProgram({ ...record, yearLevel: profile.yearLevel }) },
    assessments: [...(profile.assessments ?? []).filter((a) => a.subject !== record.subject), record],
  };
}

export interface TopicResult {
  topic: string;
  right: number;
  total: number;
}

/** For the report: right and asked in each topic, best first. */
export function topicResults(record: AssessmentRecord): TopicResult[] {
  const by = new Map<string, TopicResult>();
  for (const a of record.answers) {
    const r = by.get(a.topic) ?? { topic: a.topic, right: 0, total: 0 };
    r.total += 1;
    if (a.correct) r.right += 1;
    by.set(a.topic, r);
  }
  return [...by.values()].sort((a, b) => b.right / b.total - a.right / a.total || b.total - a.total);
}

export type Standing = "ahead" | "on track" | "below" | "well below";

/** How the result compares with the student's own year. */
export function standing(record: AssessmentRecord): Standing {
  const r = record.reached;
  if (!r) return record.startYear >= record.yearLevel ? "below" : "well below";
  // Passing the medium level of a year counts as working at that year.
  const working = r.level >= 3 ? r.year : r.year - 1;
  if (working > record.yearLevel) return "ahead";
  if (working === record.yearLevel) return "on track";
  return record.yearLevel - working >= 2 ? "well below" : "below";
}

/** One plain sentence for the parent saying where their child is working. */
export function summarySentence(record: AssessmentRecord, name: string): string {
  const curriculum = curriculumOf(record.curriculum);
  const subject = subjectName(record.subject, curriculum);
  const year = (y: number) => yearName(y, curriculum);
  const r = record.reached;
  if (!r)
    return `${name} found the very easy ${year(record.startYear)} ${subject} questions tricky, so practice will start with the ${year(record.startYear)} basics.`;
  const at = `${year(r.year)} questions up to level ${r.level} of 5 (${LEVEL_NAMES[r.level]})`;
  switch (standing(record)) {
    case "ahead":
      return `${name} answered ${at} in ${subject}, which is ahead of ${year(record.yearLevel)}.`;
    case "on track":
      return `${name} answered ${at} in ${subject}, which is on track for ${year(record.yearLevel)}.`;
    case "below":
      return `${name} answered ${at} in ${subject}, a little behind ${year(record.yearLevel)}. Practice will start there and build up.`;
    case "well below":
      return `${name} answered ${at} in ${subject}, which is well behind ${year(record.yearLevel)}. Practice will start there and build up.`;
  }
}
