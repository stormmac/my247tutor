-- my247tutor: recorded phonics sounds, one per sound, played instead of the computer voice.
-- The app also runs this itself (src/lib/auth/phonicsClipSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS phonics_clips (
  ipa        VARCHAR(16) PRIMARY KEY,
  mime       VARCHAR(40) NOT NULL,
  audio      BYTEA NOT NULL,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE phonics_clips ENABLE ROW LEVEL SECURITY;
