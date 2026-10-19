/**
 * Which curriculum each family and child learns (database/015_my247tutor_curriculum.sql, kept
 * identical by a test). A parent's or centre's choice is the default for their children; a child's
 * own choice, when set, wins. NULL means NSW. Also lets Years 1 and 2 be saved. The app adds these itself.
 */
export const CURRICULUM_SQL = `ALTER TABLE users ADD COLUMN IF NOT EXISTS curriculum VARCHAR(10) CHECK (curriculum IN ('nsw', 'us'));
ALTER TABLE learners ADD COLUMN IF NOT EXISTS curriculum VARCHAR(10) CHECK (curriculum IN ('nsw', 'us'));

-- Years 1 and 2 (Grades 1 and 2) can be saved to an account. The first accounts table only allowed Years 3 to 6.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_year_level_check' AND pg_get_constraintdef(oid) LIKE '%>= 3%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_year_level_check;
    ALTER TABLE learners ADD CONSTRAINT learners_year_level_check CHECK (year_level BETWEEN 1 AND 6);
  END IF;
END $$;`;

/** Lets a family or child be on the UK curriculum (database/016_my247tutor_uk_curriculum.sql, kept identical by a test). */
export const UK_CURRICULUM_SQL = `DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_curriculum_check' AND pg_get_constraintdef(oid) NOT LIKE '%uk%') THEN
    ALTER TABLE users DROP CONSTRAINT users_curriculum_check;
    ALTER TABLE users ADD CONSTRAINT users_curriculum_check CHECK (curriculum IN ('nsw', 'us', 'uk'));
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_curriculum_check' AND pg_get_constraintdef(oid) NOT LIKE '%uk%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_curriculum_check;
    ALTER TABLE learners ADD CONSTRAINT learners_curriculum_check CHECK (curriculum IN ('nsw', 'us', 'uk'));
  END IF;
END $$;`;

/** Lets children and classes be in Years 1 to 8 (database/017_my247tutor_years_7_8.sql, kept identical by a test). */
export const YEARS_SQL = `DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_year_level_check' AND pg_get_constraintdef(oid) NOT LIKE '%<= 8%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_year_level_check;
    ALTER TABLE learners ADD CONSTRAINT learners_year_level_check CHECK (year_level BETWEEN 1 AND 8);
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'centre_classes_year_level_check' AND pg_get_constraintdef(oid) NOT LIKE '%<= 8%') THEN
    ALTER TABLE centre_classes DROP CONSTRAINT centre_classes_year_level_check;
    ALTER TABLE centre_classes ADD CONSTRAINT centre_classes_year_level_check CHECK (year_level BETWEEN 1 AND 8);
  END IF;
END $$;`;
