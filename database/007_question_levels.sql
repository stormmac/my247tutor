-- ============================================================
-- Migration 007 (my247tutor): five difficulty levels and the standard each subtopic assesses
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
