-- ============================================================
-- Migration 007 (my247tutor): five difficulty levels, the standard each subtopic
-- assesses, and pictures and reading passages for questions
-- Run after 004 and before loading 005_my247tutor_content.sql.
-- Each NESA outcome gets questions from very easy to very hard, so the
-- difficulty check widens from myteacher's easy/medium/hard.
-- ============================================================

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_difficulty_check;
ALTER TABLE questions ALTER COLUMN difficulty TYPE VARCHAR(12);
ALTER TABLE questions ADD CONSTRAINT questions_difficulty_check
  CHECK (difficulty IN ('very_easy', 'easy', 'medium', 'hard', 'very_hard'));

ALTER TABLE subtopics ADD COLUMN IF NOT EXISTS outcome_code VARCHAR(20);
CREATE INDEX IF NOT EXISTS idx_subtopics_outcome ON subtopics(outcome_code);

-- A drawing to show with the question, stored as data such as
-- {"kind":"clock","hour":3,"minute":30}. The app draws it (src/components/Picture.tsx).
ALTER TABLE questions ADD COLUMN IF NOT EXISTS picture JSONB;

-- A reading passage shown above the question, as {"title": ..., "text": ...}.
-- Several questions can share the same passage.
ALTER TABLE questions ADD COLUMN IF NOT EXISTS passage JSONB;
