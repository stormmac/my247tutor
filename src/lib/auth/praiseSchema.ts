/** Extra things Suni says after a right answer, added by admins (database/013_my247tutor_praise.sql, kept identical by a test). */
export const PRAISE_SQL = `CREATE TABLE IF NOT EXISTS praise_phrases (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase     VARCHAR(80) NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE praise_phrases ENABLE ROW LEVEL SECURITY;`;
