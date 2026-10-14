import "server-only";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { emailEnabled, sendEmail } from "../email";
import { ready } from "./db";
import { INVITE_DAYS, inviteEmail } from "./inviteEmail";
import { TRIAL_MINUTES } from "./session";
import { getUser, type User } from "./users";

const hash = (token: string) => createHash("sha256").update(token).digest("hex");

export interface InviteResult {
  /** The set-password link, for the admin to pass on themselves when the email didn't go. */
  link: string;
  emailed: boolean;
  emailError?: string;
}

/**
 * Makes a one-time set-password link for an account and emails it. Earlier links for the
 * account stop working, so only the newest email counts.
 */
export async function sendInvite(user: User, origin: string, invitedBy: string): Promise<InviteResult> {
  const token = randomBytes(32).toString("base64url");
  const pool = await ready();
  await pool.query(`UPDATE password_tokens SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL`, [user.id]);
  await pool.query(`INSERT INTO password_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + make_interval(days => $3))`, [
    user.id,
    hash(token),
    INVITE_DAYS,
  ]);
  const link = `${process.env.SITE_URL?.replace(/\/$/, "") || origin}/set-password?token=${token}`;
  if (!emailEnabled()) return { link, emailed: false };
  const result = await sendEmail({ to: user.email, ...inviteEmail(user, link, invitedBy) });
  return result.sent ? { link, emailed: true } : { link, emailed: false, emailError: result.error };
}

/** Who a set-password link is for, while it still works. */
export async function inviteFor(token: string): Promise<User | null> {
  const { rows } = await (
    await ready()
  ).query(`SELECT user_id FROM password_tokens WHERE token_hash = $1 AND used_at IS NULL AND expires_at > NOW()`, [hash(token)]);
  return rows[0] ? getUser(rows[0].user_id as string) : null;
}

/**
 * Sets the password from a one-time link, uses the link up and signs the account out everywhere
 * else. Returns the account, or null when the link is wrong, used or out of date.
 */
export async function setPasswordWithInvite(token: string, password: string): Promise<User | null> {
  const passwordHash = await bcrypt.hash(password, 12);
  const client = await (await ready()).connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `UPDATE password_tokens SET used_at = NOW()
       WHERE token_hash = $1 AND used_at IS NULL AND expires_at > NOW() RETURNING user_id`,
      [hash(token)],
    );
    const userId = rows[0]?.user_id as string | undefined;
    if (!userId) {
      await client.query("ROLLBACK");
      return null;
    }
    const { rowCount } = await client.query(
      // An invited account's free trial starts now, when they first get in.
      `UPDATE users SET password_hash = $2, session_version = session_version + 1, last_login_at = NOW(), updated_at = NOW(),
         trial_ends_at = COALESCE(trial_ends_at, NOW() + make_interval(mins => $3))
       WHERE id = $1 AND is_active`,
      [userId, passwordHash, TRIAL_MINUTES],
    );
    if (!rowCount) {
      await client.query("ROLLBACK");
      return null;
    }
    await client.query(`UPDATE password_tokens SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL`, [userId]);
    await client.query("COMMIT");
    return getUser(userId);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
