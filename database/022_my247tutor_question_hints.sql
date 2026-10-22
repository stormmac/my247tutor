-- my247tutor: hints written for each question, kept so each is only written once.
-- The app also runs this itself (src/lib/auth/hintSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS question_hints (
  -- A hash of the question, its answer and the curriculum's English.
  question_key CHAR(64) PRIMARY KEY,
  hints        JSONB NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE question_hints ENABLE ROW LEVEL SECURITY;
