-- my247tutor: the teacher's lesson planner. Work set for one weekly session of a class, and homework.
-- Safe to run more than once.

-- Work a teacher plans for one weekly session of a class, and homework.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES centre_classes(id) ON DELETE SET NULL;
-- The Monday of the session's week.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS week DATE;
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS homework BOOLEAN NOT NULL DEFAULT FALSE;
-- 'topic': ten questions on a subtopic. 'mistakes': redo the questions not right first go in the session's activities.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS kind VARCHAR(10) NOT NULL DEFAULT 'topic' CHECK (kind IN ('topic', 'mistakes'));
CREATE INDEX IF NOT EXISTS idx_set_work_class_week ON set_work(class_id, week);
