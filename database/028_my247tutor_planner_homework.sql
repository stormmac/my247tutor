-- my247tutor: the lesson planner's homework boxes. Up to three after the session's eight activities.
-- Safe to run more than once.

-- Boxes 1 to 8 are the session's activities, 9 to 11 its homework.
ALTER TABLE set_work DROP CONSTRAINT IF EXISTS set_work_slot_check;
ALTER TABLE set_work ADD CONSTRAINT set_work_slot_check CHECK (slot BETWEEN 1 AND 11);
-- Homework redoing a session's mistakes, planned before there were homework boxes, goes in the first ones.
UPDATE set_work w SET slot = 8 + m.n
FROM (SELECT id, row_number() OVER (PARTITION BY learner_id, class_id, week ORDER BY created_at) AS n
      FROM set_work WHERE kind = 'mistakes' AND slot IS NULL AND class_id IS NOT NULL) m
WHERE w.id = m.id AND m.n <= 3;
