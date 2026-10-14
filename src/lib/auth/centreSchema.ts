/**
 * Tutoring centres (database/011_my247tutor_centres.sql, kept identical by a test). A centre is an
 * account with the centre role. Its teachers are teacher accounts linked to it, its students are
 * learners it owns (each with a child-style sign-in), and its classes group students under a
 * teacher, like myteacher's courses and enrolments. The app adds these tables itself.
 */
export const CENTRE_SQL = `DO $$
BEGIN
  -- Adds the centre role, only when it's missing, so a server starting up doesn't lock the users table each time.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check' AND pg_get_constraintdef(oid) LIKE '%centre%') THEN
    ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
    ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'teacher', 'student', 'parent', 'centre'));
  END IF;
END $$;
-- The tutoring centre a teacher works at. Deleting the centre deletes its teachers' accounts.
ALTER TABLE users ADD COLUMN IF NOT EXISTS centre_id UUID REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_users_centre ON users(centre_id);
-- A centre's classes, like myteacher's courses: a name, a year, a subject and the teacher who runs it.
CREATE TABLE IF NOT EXISTS centre_classes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name       VARCHAR(100) NOT NULL,
  subject    VARCHAR(20) NOT NULL DEFAULT 'both' CHECK (subject IN ('maths', 'english', 'both')),
  year_level SMALLINT NOT NULL CHECK (year_level BETWEEN 3 AND 6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_centre_classes_centre ON centre_classes(centre_id);
CREATE INDEX IF NOT EXISTS idx_centre_classes_teacher ON centre_classes(teacher_id);
-- Which students are in which class, like myteacher's enrolments.
CREATE TABLE IF NOT EXISTS class_enrolments (
  class_id    UUID NOT NULL REFERENCES centre_classes(id) ON DELETE CASCADE,
  learner_id  UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (class_id, learner_id)
);
CREATE INDEX IF NOT EXISTS idx_class_enrolments_learner ON class_enrolments(learner_id);
ALTER TABLE centre_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrolments ENABLE ROW LEVEL SECURITY;`;
