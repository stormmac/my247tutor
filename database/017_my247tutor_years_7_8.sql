-- my247tutor: children and classes can be in Years 1 to 8. Learners allowed Years 1 to 6, and classes only Years 3 to 6.
-- The app also runs this itself (src/lib/auth/curriculumSchema.ts), so it is safe to run again.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'learners_year_level_check' AND pg_get_constraintdef(oid) NOT LIKE '%<= 8%') THEN
    ALTER TABLE learners DROP CONSTRAINT learners_year_level_check;
    ALTER TABLE learners ADD CONSTRAINT learners_year_level_check CHECK (year_level BETWEEN 1 AND 8);
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'centre_classes_year_level_check' AND pg_get_constraintdef(oid) NOT LIKE '%<= 8%') THEN
    ALTER TABLE centre_classes DROP CONSTRAINT centre_classes_year_level_check;
    ALTER TABLE centre_classes ADD CONSTRAINT centre_classes_year_level_check CHECK (year_level BETWEEN 1 AND 8);
  END IF;
END $$;
