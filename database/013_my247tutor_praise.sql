-- my247tutor: extra things Suni says after a right answer, added by admins.
-- The app also runs this itself (src/lib/auth/praiseSchema.ts), so it is safe to run again.

CREATE TABLE IF NOT EXISTS praise_phrases (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase     VARCHAR(80) NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE praise_phrases ENABLE ROW LEVEL SECURITY;
