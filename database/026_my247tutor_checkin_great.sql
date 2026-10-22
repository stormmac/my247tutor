-- my247tutor: a check-in can keep "great", the top face of the five-face rating.
-- Safe to run more than once.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'suni_checkins_mood_check' AND pg_get_constraintdef(oid) LIKE '%great%'
  ) THEN
    ALTER TABLE suni_checkins DROP CONSTRAINT IF EXISTS suni_checkins_mood_check;
    ALTER TABLE suni_checkins ADD CONSTRAINT suni_checkins_mood_check
      CHECK (mood IN ('great', 'happy', 'okay', 'tired', 'worried', 'sad'));
  END IF;
END $$;
