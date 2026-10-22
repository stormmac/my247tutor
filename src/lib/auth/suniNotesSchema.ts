/** Suni's daily check-ins and what Suni remembers about each child (database/021_my247tutor_suni_notes.sql, kept identical by a test). */
export const SUNI_NOTES_SQL = `CREATE TABLE IF NOT EXISTS suni_checkins (
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
ALTER TABLE suni_notes ENABLE ROW LEVEL SECURITY;`;

/**
 * Adds "great" to the feelings a check-in can keep, for the five-face rating
 * (database/026_my247tutor_checkin_great.sql, kept identical by a test).
 */
export const CHECKIN_GREAT_SQL = `DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'suni_checkins_mood_check' AND pg_get_constraintdef(oid) LIKE '%great%'
  ) THEN
    ALTER TABLE suni_checkins DROP CONSTRAINT IF EXISTS suni_checkins_mood_check;
    ALTER TABLE suni_checkins ADD CONSTRAINT suni_checkins_mood_check
      CHECK (mood IN ('great', 'happy', 'okay', 'tired', 'worried', 'sad'));
  END IF;
END $$;`;
