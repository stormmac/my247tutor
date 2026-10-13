-- ============================================================
-- Migration 004 (my247tutor): link subtopics to my247tutor skills
-- Run after myteacher's migrations 001–003.
-- A subtopic with a skill_id uses my247tutor's generated questions and
-- mastery tracking for that skill; one without uses its own questions.
-- ============================================================

ALTER TABLE subtopics ADD COLUMN IF NOT EXISTS skill_id VARCHAR(60);
CREATE INDEX IF NOT EXISTS idx_subtopics_skill ON subtopics(skill_id);
