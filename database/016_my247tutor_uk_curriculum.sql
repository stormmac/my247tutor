-- my247tutor: the UK (England's National Curriculum) joins NSW and US Common Core as a curriculum a family or child can learn.
-- The app also runs this itself (src/lib/auth/curriculumSchema.ts), so it is safe to run again.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_curriculum_check' AND pg_get_constraintdef(oid) NOT LIKE '%uk%') THEN
    ALTER TABLE users DROP CONSTRAINT users_curriculum_check;
    ALTER TABLE users ADD CONSTRAINT users_curriculum_check CHECK (curriculum IN ('nsw', 'us', 'uk'));
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_curriculum_check' AND pg_get_constraintdef(oid) NOT LIKE '%uk%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_curriculum_check;
    ALTER TABLE learners ADD CONSTRAINT learners_curriculum_check CHECK (curriculum IN ('nsw', 'us', 'uk'));
  END IF;
END $$;
