/** Recorded phonics sounds, one per sound (database/020_my247tutor_phonics_clips.sql, kept identical by a test). */
export const PHONICS_CLIPS_SQL = `CREATE TABLE IF NOT EXISTS phonics_clips (
  ipa        VARCHAR(16) PRIMARY KEY,
  mime       VARCHAR(40) NOT NULL,
  audio      BYTEA NOT NULL,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE phonics_clips ENABLE ROW LEVEL SECURITY;`;
