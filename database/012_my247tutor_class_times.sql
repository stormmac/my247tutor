-- my247tutor: when each tutoring centre class meets.
-- The app also runs this itself (src/lib/auth/centreSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS class_times (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id  UUID NOT NULL REFERENCES centre_classes(id) ON DELETE CASCADE,
  -- 1 is Monday, 7 is Sunday.
  weekday   SMALLINT NOT NULL CHECK (weekday BETWEEN 1 AND 7),
  starts_at TIME NOT NULL,
  minutes   SMALLINT NOT NULL CHECK (minutes BETWEEN 15 AND 240)
);
CREATE INDEX IF NOT EXISTS idx_class_times_class ON class_times(class_id);
ALTER TABLE class_times ENABLE ROW LEVEL SECURITY;
