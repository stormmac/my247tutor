/**
 * The content tree: Country → State → Subject → Year level → Topic → Subtopic → Question.
 *
 * These records mirror the tables in the myteacher LMS database (database/migrations/001–003
 * in that project) column for column, so the same data can be loaded into PostgreSQL later
 * without translation. Timestamps and is_active flags are left to the database defaults.
 * The one addition is `skill_id` on subtopics (see database/004_add_skill_link.sql).
 */

import type { Picture } from "./picture";

export interface Country {
  id: string;
  name: string;
  /** ISO 3166-1 alpha-2. */
  code: string;
  curriculum_framework: string;
}

export interface State {
  id: string;
  country_id: string;
  name: string;
  code: string;
  curriculum_authority: string;
}

export interface Subject {
  id: string;
  state_id: string;
  name: string;
  colour_hex: string;
  icon: string;
}

export interface YearLevel {
  id: string;
  state_id: string;
  name: string;
  sort_order: number;
  age_min: number;
  age_max: number;
}

export interface Topic {
  id: string;
  subject_id: string;
  year_level_id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Subtopic {
  id: string;
  topic_id: string;
  title: string;
  description: string;
  sort_order: number;
  /**
   * my247tutor extension: the skill whose generated questions, prerequisites and mastery
   * tracking this subtopic uses. Subtopics without a skill use their own written questions.
   */
  skill_id: string | null;
  /**
   * my247tutor extension: the NESA outcome (standard) this subtopic's questions assess. Taken from
   * the skill when there is one (see database/007_question_levels.sql).
   */
  outcome_code: string | null;
}

/** Five levels, so each standard can run from very easy to very hard. */
export const DIFFICULTIES = ["very_easy", "easy", "medium", "hard", "very_hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export type QuestionType = "multiple_choice" | "true_false" | "short_answer" | "multi_select" | "fill_blank" | "ordering";

export interface AnswerOption {
  id: string;
  text: string;
}

export interface ContentQuestion {
  id: string;
  subtopic_id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: Difficulty;
  /** For multiple_choice, multi_select and ordering. */
  answer_options: AnswerOption[] | null;
  /**
   * multiple_choice: the option id. true_false: "true" or "false". multi_select: option ids.
   * ordering: option ids in the correct order. short_answer and fill_blank: the expected text,
   * or a list of accepted answers.
   */
  correct_answer: string | string[];
  explanation: string;
  points: number;
  /** my247tutor extension: a drawing to show with the question (see picture.ts and database/007). */
  picture?: Picture | null;
  /** my247tutor extension: a reading passage shown above the question (see database/007). */
  passage?: Passage | null;
}

export interface Passage {
  title: string;
  text: string;
}
