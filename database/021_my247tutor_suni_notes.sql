-- my247tutor: Suni's daily check-ins with each child, and what Suni remembers to help them learn.
-- The app also runs this itself (src/lib/auth/suniNotesSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS suni_checkins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE SET NULL,
  -- How they said they feel; null when they closed the check-in without saying.
  mood       VARCHAR(10) CHECK (mood IN ('happy', 'okay', 'tired', 'worried', 'sad')),
  -- What they said they'd like to work on.
  focus      VARCHAR(300),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_suni_checkins_learner ON suni_checkins(learner_id, created_at DESC);
ALTER TABLE suni_checkins ENABLE ROW LEVEL SECURITY;
CREATE TABLE IF NOT EXISTS suni_notes (
  learner_id    UUID PRIMARY KEY REFERENCES learners(id) ON DELETE CASCADE,
  -- What helps this child learn, for Suni to use next time.
  for_suni      TEXT NOT NULL DEFAULT '',
  -- Points for their parents and teachers: [{ "at": ms, "kind": ..., "text": ... }], newest last.
  for_grown_ups JSONB NOT NULL DEFAULT '[]',
  -- Chats and check-ins up to here have been read into the notes.
  read_up_to    TIMESTAMPTZ NOT NULL DEFAULT 'epoch',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE suni_notes ENABLE ROW LEVEL SECURITY;
