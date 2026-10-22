/**
 * Each child's learning plan (database/023_my247tutor_learning_plans.sql, kept identical by a test):
 * which subjects they do, and the teacher's session they're in, if any. No session means they learn on their own.
 */
export const LEARNING_PLAN_SQL = `ALTER TABLE learners ADD COLUMN IF NOT EXISTS subjects VARCHAR(10) NOT NULL DEFAULT 'both'
  CHECK (subjects IN ('maths', 'english', 'both'));
ALTER TABLE learners ADD COLUMN IF NOT EXISTS session_class_id UUID REFERENCES centre_classes(id) ON DELETE SET NULL;`;
