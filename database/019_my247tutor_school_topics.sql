-- my247tutor: topics a parent says their child is doing at school now, practised in their weekly lesson.
-- The app also runs this itself (src/lib/auth/familySchema.ts), so it is safe to run again.

-- Work added because it's what the child is doing at school now, so they practise it here too.
ALTER TABLE set_work ADD COLUMN IF NOT EXISTS at_school BOOLEAN NOT NULL DEFAULT FALSE;
