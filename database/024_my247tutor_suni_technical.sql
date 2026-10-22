-- my247tutor: a technical problem with Suni (it couldn't answer) is flagged for admins only.
-- Parents and teachers never see it. Safe to run more than once.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'suni_messages_flag_check' AND pg_get_constraintdef(oid) LIKE '%technical%'
  ) THEN
    ALTER TABLE suni_messages DROP CONSTRAINT IF EXISTS suni_messages_flag_check;
    ALTER TABLE suni_messages ADD CONSTRAINT suni_messages_flag_check
      CHECK (flag IN ('wellbeing', 'inappropriate', 'personal_info', 'grown_up', 'technical'));
  END IF;
END $$;
