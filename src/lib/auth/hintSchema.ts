/** Hints written for each question, kept so each is written once (database/022_my247tutor_question_hints.sql, kept identical by a test). */
export const QUESTION_HINTS_SQL = `CREATE TABLE IF NOT EXISTS question_hints (
  -- A hash of the question, its answer and the curriculum's English.
  question_key CHAR(64) PRIMARY KEY,
  hints        JSONB NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE question_hints ENABLE ROW LEVEL SECURITY;`;
