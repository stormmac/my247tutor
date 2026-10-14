-- my247tutor account invites: one-time links, emailed to new accounts, for setting a password.
-- Run after 006_my247tutor_accounts.sql with `npm run db:migrate`. Safe to re-run.
-- The app also runs this itself on first use (src/lib/auth/inviteSchema.ts holds the same SQL).

CREATE TABLE IF NOT EXISTS password_tokens (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Only a SHA-256 hash is kept, so a database leak doesn't give working links.
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_password_tokens_user ON password_tokens(user_id);
ALTER TABLE password_tokens ENABLE ROW LEVEL SECURITY;
