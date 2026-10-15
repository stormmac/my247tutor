-- my247tutor: every message a student sends Suni, Suni's reply, and flags for grown-ups to check.
-- The app also runs this itself (src/lib/auth/suniChatSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS suni_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- One chat with Suni: messages sent without closing it or moving to another topic.
  conversation_id UUID NOT NULL,
  -- The signed-in account that sent it, if any (a parent, a child's own sign-in, a centre).
  user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
  -- The child it was for. Deleting the child deletes their chats.
  learner_id      UUID REFERENCES learners(id) ON DELETE CASCADE,
  student_name    VARCHAR(60) NOT NULL,
  year_level      SMALLINT NOT NULL,
  -- What was on screen, as Suni was told it.
  screen          VARCHAR(1500),
  -- What the student wrote, with phone numbers, emails and addresses already hidden.
  question        TEXT NOT NULL,
  reply           TEXT NOT NULL DEFAULT '',
  -- Why it needs a grown-up's eye: wellbeing, inappropriate, personal_info or grown_up (flagged by a person).
  flag            VARCHAR(20) CHECK (flag IN ('wellbeing', 'inappropriate', 'personal_info', 'grown_up')),
  flag_reason     VARCHAR(300),
  flagged_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_suni_messages_learner ON suni_messages(learner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suni_messages_created ON suni_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suni_messages_flag ON suni_messages(created_at DESC) WHERE flag IS NOT NULL;
ALTER TABLE suni_messages ENABLE ROW LEVEL SECURITY;
