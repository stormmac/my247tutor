-- my247tutor accounts: sign-in, roles and each child's saved progress.
-- Safe to run on a fresh database or on top of myteacher's migrations 001–003, and safe to re-run.
-- Run it with `npm run db:migrate` (uses DATABASE_URL).

BEGIN;

-- Same shape as myteacher's users table (002_create_courses.sql), so the two can share it.
CREATE TABLE IF NOT EXISTS users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  role         VARCHAR(20) NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- my247tutor adds parents to myteacher's admin, teacher and student roles.
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'teacher', 'student', 'parent'));

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
-- Bumped to sign a user out everywhere (password reset, account disabled).
ALTER TABLE users ADD COLUMN IF NOT EXISTS session_version INTEGER NOT NULL DEFAULT 0;

-- A child's learner profile (progress, mastery, writing), owned by a parent account.
CREATE TABLE IF NOT EXISTS learners (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       VARCHAR(60) NOT NULL,
  year_level SMALLINT NOT NULL CHECK (year_level BETWEEN 3 AND 6),
  profile    JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_learners_parent ON learners(parent_id);

-- Every sign-in attempt, used to slow down password guessing.
CREATE TABLE IF NOT EXISTS login_attempts (
  id      BIGSERIAL PRIMARY KEY,
  email   VARCHAR(255) NOT NULL,
  ip      VARCHAR(64) NOT NULL,
  success BOOLEAN NOT NULL,
  at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email, at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip, at);

-- What admins changed, and who changed it.
CREATE TABLE IF NOT EXISTS audit_log (
  id        BIGSERIAL PRIMARY KEY,
  actor_id  UUID REFERENCES users(id) ON DELETE SET NULL,
  action    VARCHAR(50) NOT NULL,
  target_id UUID,
  detail    JSONB,
  at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Turn on row level security with no policies, so hosts that publish the public schema over an API
-- (Supabase's Data API) can't read these tables. The app connects as the table owner, which RLS doesn't restrict.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

COMMIT;
