/**
 * Parents of a centre's students, and work set for a child (database/018_my247tutor_parents_and_set_work.sql,
 * kept identical by a test). The app adds these tables itself.
 */
export const FAMILY_SQL = `-- A parent who can see a centre student's work. The centre owns the student and pays for them.
CREATE TABLE IF NOT EXISTS learner_parents (
  learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  parent_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (learner_id, parent_id)
);
CREATE INDEX IF NOT EXISTS idx_learner_parents_parent ON learner_parents(parent_id);
-- Work a parent, teacher or centre sets for a child: ten questions on one subtopic, added to their weekly lesson.
CREATE TABLE IF NOT EXISTS set_work (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id  UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  set_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  subject     VARCHAR(20) NOT NULL CHECK (subject IN ('maths', 'english')),
  subtopic_id VARCHAR(36) NOT NULL,
  note        VARCHAR(200),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  done_at     TIMESTAMPTZ,
  right_count SMALLINT,
  total       SMALLINT
);
CREATE INDEX IF NOT EXISTS idx_set_work_learner ON set_work(learner_id, created_at DESC);`;
