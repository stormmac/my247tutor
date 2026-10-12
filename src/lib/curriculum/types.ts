export type Subject = "maths" | "english";

/** NESA stages covered by the MVP: Stage 2 = Years 3–4, Stage 3 = Years 5–6. */
export type Stage = 2 | 3;

export type YearLevel = 3 | 4 | 5 | 6;

export interface Outcome {
  /** NESA outcome code, e.g. "MA2-AR-01". */
  code: string;
  subject: Subject;
  stage: Stage;
  focusArea: string;
  /** Plain-language summary for parents. Not the official NESA wording. */
  summary: string;
  /**
   * True when the code was checked against an official NESA page.
   * Stage 3 codes follow the Stage 2 pattern but still need confirming.
   */
  codeVerified: boolean;
}

export type PracticeKind =
  /** Questions produced by a maths generator and marked by the answer checker. */
  | "generated"
  /** Multiple-choice questions on a reading passage. */
  | "comprehension"
  /** Free writing marked by Claude against outcome criteria. */
  | "writing"
  /** Multiple-choice word questions (spelling, vocabulary). */
  | "wordwork";

export interface Skill {
  /** Stable id, e.g. "ma2-add-sub". */
  id: string;
  subject: Subject;
  stage: Stage;
  /** Outcome code this skill builds towards. */
  outcome: string;
  title: string;
  /** What the student learns, in words a parent understands. */
  description: string;
  /** Skill ids that should be mastered first. */
  prerequisites: string[];
  practice: PracticeKind;
}

export function yearToStage(year: YearLevel): Stage {
  return year <= 4 ? 2 : 3;
}
