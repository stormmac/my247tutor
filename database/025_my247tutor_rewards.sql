-- my247tutor: the reward program. Lesson questions earn points (3 green, 2 yellow, 1 red), and a
-- parent or teacher can offer points or money for finishing a subject's weekly lesson.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS reward_offers (
  learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  subject    VARCHAR(10) NOT NULL CHECK (subject IN ('maths', 'english')),
  -- The parent, centre, teacher or admin offering it. Each offers their own.
  set_by     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       VARCHAR(10) NOT NULL CHECK (kind IN ('points', 'money')),
  amount     NUMERIC(8, 2) NOT NULL CHECK (amount > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (learner_id, subject, set_by)
);
CREATE TABLE IF NOT EXISTS reward_earnings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id  UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  subject     VARCHAR(10) NOT NULL,
  -- The Monday of the week whose lesson was finished.
  week        DATE NOT NULL,
  set_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  set_by_name VARCHAR(120) NOT NULL,
  kind        VARCHAR(10) NOT NULL CHECK (kind IN ('points', 'money')),
  amount      NUMERIC(8, 2) NOT NULL,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (learner_id, subject, week, set_by)
);
CREATE INDEX IF NOT EXISTS idx_reward_earnings_learner ON reward_earnings(learner_id, earned_at DESC);
-- Points from each subject's weekly lesson questions: 3 green, 2 yellow, 1 red.
CREATE TABLE IF NOT EXISTS lesson_points (
  learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  subject    VARCHAR(10) NOT NULL,
  week       DATE NOT NULL,
  points     INTEGER NOT NULL CHECK (points >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (learner_id, subject, week)
);
ALTER TABLE reward_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_points ENABLE ROW LEVEL SECURITY;
