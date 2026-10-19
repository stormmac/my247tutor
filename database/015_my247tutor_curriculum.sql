-- my247tutor: which curriculum each family and child learns, NSW or US Common Core.
-- A parent's or centre's choice is the default for their children; a child's own choice, when set, wins. NULL means NSW.
-- The app also runs this itself (src/lib/auth/curriculumSchema.ts), so it is safe to run again.

ALTER TABLE users ADD COLUMN IF NOT EXISTS curriculum VARCHAR(10) CHECK (curriculum IN ('nsw', 'us'));
ALTER TABLE learners ADD COLUMN IF NOT EXISTS curriculum VARCHAR(10) CHECK (curriculum IN ('nsw', 'us'));

-- Years 1 and 2 (Grades 1 and 2) can be saved to an account. The first accounts table only allowed Years 3 to 6.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_year_level_check' AND pg_get_constraintdef(oid) LIKE '%>= 3%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_year_level_check;
    ALTER TABLE learners ADD CONSTRAINT learners_year_level_check CHECK (year_level BETWEEN 1 AND 6);
  END IF;
END $$;
