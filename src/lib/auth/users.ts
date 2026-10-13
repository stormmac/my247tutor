import "server-only";
import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";
import { db } from "./db";
import { isAdminEmail, isLockedOut, LOCKOUT_MINUTES, temporaryPassword, type Role } from "./rules";
import { SESSION_COOKIE, verifySession } from "./session";

const BCRYPT_COST = 12;
/** Compared against when the email is unknown, so a wrong email takes as long as a wrong password. */
let dummyHash: string | null = null;
function dummy(): string {
  return (dummyHash ??= bcrypt.hashSync("my247tutor-no-such-user", BCRYPT_COST));
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  sessionVersion: number;
  createdAt: string;
  lastLoginAt: string | null;
}

const USER_COLUMNS = `id, email, display_name, role, is_active, session_version, created_at, last_login_at`;

function toUser(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    email: row.email as string,
    name: row.display_name as string,
    role: row.role as Role,
    isActive: row.is_active as boolean,
    sessionVersion: row.session_version as number,
    createdAt: new Date(row.created_at as string).toISOString(),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at as string).toISOString() : null,
  };
}

export async function getUser(id: string): Promise<User | null> {
  const { rows } = await db().query(`SELECT ${USER_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0] ? toUser(rows[0]) : null;
}

export type SignUpResult = { user: User } | { error: string };

export async function createUser(name: string, email: string, password: string): Promise<SignUpResult> {
  const hash = await bcrypt.hash(password, BCRYPT_COST);
  const role: Role = isAdminEmail(email) ? "admin" : "parent";
  const { rows } = await db().query(
    `INSERT INTO users (email, display_name, role, password_hash, last_login_at) VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (email) DO NOTHING RETURNING ${USER_COLUMNS}`,
    [email, name, role, hash],
  );
  return rows[0] ? { user: toUser(rows[0]) } : { error: "There's already an account with that email. Try signing in." };
}

export type SignInResult = { user: User } | { error: string; status: number };

export async function signIn(email: string, password: string, ip: string): Promise<SignInResult> {
  const { rows: counts } = await db().query(
    `SELECT
       COUNT(*) FILTER (WHERE email = $1) AS email_failures,
       COUNT(*) FILTER (WHERE ip = $2) AS ip_failures
     FROM login_attempts
     WHERE NOT success AND at > NOW() - make_interval(mins => $3) AND (email = $1 OR ip = $2)`,
    [email, ip, LOCKOUT_MINUTES],
  );
  if (isLockedOut({ emailFailures: Number(counts[0].email_failures), ipFailures: Number(counts[0].ip_failures) })) {
    return { error: `Too many tries. Please wait ${LOCKOUT_MINUTES} minutes and try again.`, status: 429 };
  }

  const { rows } = await db().query(`SELECT ${USER_COLUMNS}, password_hash FROM users WHERE email = $1`, [email]);
  const row = rows[0];
  const ok = await bcrypt.compare(password, (row?.password_hash as string | null) ?? dummy());
  await db().query(`INSERT INTO login_attempts (email, ip, success) VALUES ($1, $2, $3)`, [email, ip, ok && !!row]);
  if (!ok || !row) return { error: "That email and password don't match.", status: 401 };
  if (!row.is_active) return { error: "This account has been turned off. Please contact my247tutor.", status: 403 };

  // Emails in ADMIN_EMAILS are promoted on their next sign-in.
  const role: Role = isAdminEmail(email) ? "admin" : row.role;
  const { rows: updated } = await db().query(
    `UPDATE users SET last_login_at = NOW(), role = $2, updated_at = NOW() WHERE id = $1 RETURNING ${USER_COLUMNS}`,
    [row.id, role],
  );
  return { user: toUser(updated[0]) };
}

export function clientIp(request: Request): string {
  return (request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").slice(0, 64);
}

/**
 * The signed-in user for an API request, checked against the database every time, so a disabled
 * account or a changed role takes effect straight away. Returns a ready-made error response otherwise.
 */
export async function requireUser(request: NextRequest, role?: Role): Promise<{ user: User } | { response: Response }> {
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const user = session ? await getUser(session.userId) : null;
  if (!session || !user || !user.isActive || user.sessionVersion !== session.version) {
    return { response: Response.json({ error: "Please sign in." }, { status: 401 }) };
  }
  if (role && user.role !== role) return { response: Response.json({ error: "You don't have access to this." }, { status: 403 }) };
  return { user };
}

export async function listUsers(): Promise<(User & { learners: number })[]> {
  const { rows } = await db().query(
    `SELECT ${USER_COLUMNS.split(", ")
      .map((c) => `u.${c}`)
      .join(", ")}, COUNT(l.id) AS learners
     FROM users u LEFT JOIN learners l ON l.parent_id = u.id
     GROUP BY u.id ORDER BY u.created_at DESC LIMIT 500`,
  );
  return rows.map((r) => ({ ...toUser(r), learners: Number(r.learners) }));
}

async function audit(actorId: string, action: string, targetId: string, detail: object) {
  await db().query(`INSERT INTO audit_log (actor_id, action, target_id, detail) VALUES ($1, $2, $3, $4)`, [
    actorId,
    action,
    targetId,
    JSON.stringify(detail),
  ]);
}

/** An admin changes another user's role or turns their account off or on. Turning it off signs them out. */
export async function updateUser(actor: User, targetId: string, change: { role?: Role; isActive?: boolean }): Promise<User | null> {
  const { rows } = await db().query(
    `UPDATE users SET
       role = COALESCE($2, role),
       is_active = COALESCE($3, is_active),
       session_version = session_version + CASE WHEN $3 = FALSE THEN 1 ELSE 0 END,
       updated_at = NOW()
     WHERE id = $1 RETURNING ${USER_COLUMNS}`,
    [targetId, change.role ?? null, change.isActive ?? null],
  );
  if (rows[0]) await audit(actor.id, "update_user", targetId, change);
  return rows[0] ? toUser(rows[0]) : null;
}

/** Sets a new temporary password and signs the user out everywhere. Returns the password to pass on. */
export async function resetPassword(actor: User, targetId: string): Promise<string | null> {
  const password = temporaryPassword(randomInt);
  const { rowCount } = await db().query(
    `UPDATE users SET password_hash = $2, session_version = session_version + 1, updated_at = NOW() WHERE id = $1`,
    [targetId, await bcrypt.hash(password, BCRYPT_COST)],
  );
  if (!rowCount) return null;
  await audit(actor.id, "reset_password", targetId, {});
  return password;
}

export async function changePassword(user: User, current: string, next: string): Promise<boolean> {
  const { rows } = await db().query(`SELECT password_hash FROM users WHERE id = $1`, [user.id]);
  if (!rows[0] || !(await bcrypt.compare(current, rows[0].password_hash ?? dummy()))) return false;
  await db().query(`UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1`, [
    user.id,
    await bcrypt.hash(next, BCRYPT_COST),
  ]);
  return true;
}
