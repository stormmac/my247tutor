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

/**
 * Marks work a parent added because it's what the child is doing at school now
 * (database/019_my247tutor_school_topics.sql, kept identical by a test).
 */
export const SCHOOL_TOPICS_SQL = `-- Work added because it's what the child is doing at school now, so they practise it here too.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS at_school BOOLEAN NOT NULL DEFAULT FALSE;`;

/**
 * The teacher's lesson planner: work set for one weekly session of a class, and homework
 * (database/027_my247tutor_lesson_planner.sql, kept identical by a test). Homework is one of the
 * session's activities, or a "mistakes" piece: the questions the child didn't get right first go.
 */
export const PLANNER_SQL = `-- Work a teacher plans for one weekly session of a class, and homework.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES centre_classes(id) ON DELETE SET NULL;
-- The Monday of the session's week.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS week DATE;
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS homework BOOLEAN NOT NULL DEFAULT FALSE;
-- Which of the session's eight boxes an activity is in, left to right.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS slot SMALLINT CHECK (slot BETWEEN 1 AND 8);
-- 'topic': ten questions on a subtopic. 'mistakes': redo the questions not right first go in the session's activities.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS kind VARCHAR(10) NOT NULL DEFAULT 'topic' CHECK (kind IN ('topic', 'mistakes'));
CREATE INDEX IF NOT EXISTS idx_set_work_class_week ON set_work(class_id, week);`;
