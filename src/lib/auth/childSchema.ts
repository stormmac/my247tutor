/**
 * Children's own sign-ins (database/010_my247tutor_child_logins.sql, kept identical by a test).
 * A child's login is a users row with the student role, a username instead of an email, and links
 * to the parent who manages it and the learner profile it uses. The app adds these columns itself.
 */
export const CHILD_SQL = `ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(30) UNIQUE;
-- The parent who set up this child's sign-in. Deleting the parent deletes it too.
ALTER TABLE users ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES users(id) ON DELETE CASCADE;
-- The child's learner profile. Deleting the child from the parent's account deletes their sign-in.
ALTER TABLE users ADD COLUMN IF NOT EXISTS learner_id UUID UNIQUE REFERENCES learners(id) ON DELETE CASCADE;`;
