/**
 * One-time links for setting a password (database/009_my247tutor_invites.sql, kept identical by a test).
 * Like the payment columns, the app creates the table itself on first use.
 */
export const INVITE_SQL = `CREATE TABLE IF NOT EXISTS password_tokens (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Only a SHA-256 hash is kept, so a database leak doesn't give working links.
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_password_tokens_user ON password_tokens(user_id);
ALTER TABLE password_tokens ENABLE ROW LEVEL SECURITY;`;
