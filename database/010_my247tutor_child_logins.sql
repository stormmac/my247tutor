-- my247tutor child sign-ins: a child signs in with a username and a password their parent sets.
-- Run after 006_my247tutor_accounts.sql with `npm run db:migrate`. Safe to re-run.
-- The app also runs this itself on first use (src/lib/auth/childSchema.ts holds the same SQL).

ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(30) UNIQUE;
-- The parent who set up this child's sign-in. Deleting the parent deletes it too.
ALTER TABLE users ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES users(id) ON DELETE CASCADE;
-- The child's learner profile. Deleting the child from the parent's account deletes their sign-in.
ALTER TABLE users ADD COLUMN IF NOT EXISTS learner_id UUID UNIQUE REFERENCES learners(id) ON DELETE CASCADE;
