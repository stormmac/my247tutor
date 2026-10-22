-- my247tutor: each child's learning plan, which subjects they do and the teacher's session they're in.
-- The app also runs this itself (src/lib/auth/planSchema.ts), so it is safe to run again.

ALTER TABLE learners ADD COLUMN IF NOT EXISTS subjects VARCHAR(10) NOT NULL DEFAULT 'both'
  CHECK (subjects IN ('maths', 'english', 'both'));
ALTER TABLE learners ADD COLUMN IF NOT EXISTS session_class_id UUID REFERENCES centre_classes(id) ON DELETE SET NULL;
