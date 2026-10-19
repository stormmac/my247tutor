import "server-only";
import { randomBytes, randomInt, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";
import { type Curriculum, isCurriculum } from "@/lib/curriculum/curricula";
import { ready } from "./db";
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
  /** Card payments: an admin gave this account free use of the site. */
  freeAccess: boolean;
  /** When the account's free trial ends (milliseconds), or null when it never had one. */
  trialEndsAt: number | null;
  stripeCustomerId: string | null;
  /** Stripe's subscription status, such as "active" or "canceled". */
  subscriptionStatus: string | null;
  /** The end of the period paid for (milliseconds). */
  paidUntil: number | null;
  /** A child's sign-in name; null for everyone else, who sign in with their email. */
  username: string | null;
  /** For a child: the parent who manages their sign-in. */
  parentId: string | null;
  /** For a child: the learner profile they use. */
  learnerId: string | null;
  /** For a teacher at a tutoring centre: the centre's account. */
  centreId: string | null;
  /** For a parent or centre: the curriculum their children learn (set by Admin). Null means NSW. */
  curriculum: Curriculum | null;
}

export const USER_COLUMNS = `id, email, display_name, role, is_active, session_version, created_at, last_login_at, free_access, trial_ends_at, stripe_customer_id, subscription_status, paid_until, username, parent_id, learner_id, centre_id, curriculum`;

const ms = (value: unknown) => (value ? new Date(value as string).getTime() : null);

export function toUser(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    email: row.email as string,
    name: row.display_name as string,
    role: row.role as Role,
    isActive: row.is_active as boolean,
    sessionVersion: row.session_version as number,
    createdAt: new Date(row.created_at as string).toISOString(),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at as string).toISOString() : null,
    freeAccess: Boolean(row.free_access),
    trialEndsAt: ms(row.trial_ends_at),
    stripeCustomerId: (row.stripe_customer_id as string | null) ?? null,
    subscriptionStatus: (row.subscription_status as string | null) ?? null,
    paidUntil: ms(row.paid_until),
    username: (row.username as string | null) ?? null,
    parentId: (row.parent_id as string | null) ?? null,
    learnerId: (row.learner_id as string | null) ?? null,
    centreId: (row.centre_id as string | null) ?? null,
    curriculum: isCurriculum(row.curriculum) ? row.curriculum : null,
  };
}

/**
 * A child uses the site on their parent's plan, and only while the parent's account is on.
 * Everything else about the child's sign-in is their own.
 */
async function withParentPlan(user: User): Promise<User> {
  // A centre's teacher can only get in while the centre's account is on.
  if (user.role === "teacher" && user.centreId) {
    const centre = await getUser(user.centreId);
    return { ...user, isActive: user.isActive && Boolean(centre?.isActive) };
  }
  if (user.role !== "student" || !user.parentId) return user;
  const parent = await getUser(user.parentId);
  if (!parent) return { ...user, isActive: false };
  return {
    ...user,
    isActive: user.isActive && parent.isActive,
    freeAccess: parent.freeAccess,
    trialEndsAt: parent.trialEndsAt,
    subscriptionStatus: parent.subscriptionStatus,
    paidUntil: parent.paidUntil,
  };
}

export async function getUser(id: string): Promise<User | null> {
  const { rows } = await (await ready()).query(`SELECT ${USER_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0] ? withParentPlan(toUser(rows[0])) : null;
}

export type SignUpResult = { user: User } | { error: string };

/** A parent or tutoring centre signing up. Their free trial ends at `trialEndsAt` (milliseconds). */
export async function createUser(
  name: string,
  email: string,
  password: string,
  trialEndsAt: number,
  signUpAs: "parent" | "centre" = "parent",
): Promise<SignUpResult> {
  const hash = await bcrypt.hash(password, BCRYPT_COST);
  const role: Role = isAdminEmail(email) ? "admin" : signUpAs;
  const { rows } = await (
    await ready()
  ).query(
    `INSERT INTO users (email, display_name, role, password_hash, last_login_at, trial_ends_at) VALUES ($1, $2, $3, $4, NOW(), $5)
     ON CONFLICT (email) DO NOTHING RETURNING ${USER_COLUMNS}`,
    [email, name, role, hash, new Date(trialEndsAt)],
  );
  return rows[0] ? { user: toUser(rows[0]) } : { error: "There's already an account with that email. Try logging in." };
}

export type SignInResult = { user: User } | { error: string; status: number };

export async function signIn(email: string, password: string, ip: string): Promise<SignInResult> {
  const { rows: counts } = await (
    await ready()
  ).query(
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

  // `email` is a child's username when it has no @.
  const { rows } = await (
    await ready()
  ).query(`SELECT ${USER_COLUMNS}, password_hash FROM users WHERE ${email.includes("@") ? "email" : "username"} = $1`, [email]);
  const row = rows[0];
  const ok = await bcrypt.compare(password, (row?.password_hash as string | null) ?? dummy());
  await (await ready()).query(`INSERT INTO login_attempts (email, ip, success) VALUES ($1, $2, $3)`, [email, ip, ok && !!row]);
  if (!ok || !row) return { error: "That email (or username) and password don't match. Check them and try again.", status: 401 };
  const account = await withParentPlan(toUser(row));
  if (!account.isActive) {
    const who = account.role === "student" ? "Ask your grown-up to check their account." : "Please contact my247tutor.";
    return { error: `This account has been turned off. ${who}`, status: 403 };
  }

  // Emails in ADMIN_EMAILS are promoted on their next sign-in.
  const role: Role = row.username ? "student" : isAdminEmail(email) ? "admin" : row.role;
  const { rows: updated } = await (
    await ready()
  ).query(`UPDATE users SET last_login_at = NOW(), role = $2, updated_at = NOW() WHERE id = $1 RETURNING ${USER_COLUMNS}`, [row.id, role]);
  return { user: await withParentPlan(toUser(updated[0])) };
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
    return { response: Response.json({ error: "Please log in." }, { status: 401 }) };
  }
  if (role && user.role !== role) return { response: Response.json({ error: "You don't have access to this." }, { status: 403 }) };
  return { user };
}

export async function listUsers(): Promise<(User & { learners: number; centreName: string | null })[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT ${USER_COLUMNS.split(", ")
      .map((c) => `u.${c}`)
      .join(", ")}, COUNT(l.id) AS learners, c.display_name AS centre_name
     FROM users u LEFT JOIN learners l ON l.parent_id = u.id LEFT JOIN users c ON c.id = u.centre_id
     -- Children's sign-ins are managed by their parents, and counted with the parent's learners.
     WHERE u.learner_id IS NULL
     GROUP BY u.id, c.display_name ORDER BY u.created_at DESC LIMIT 500`,
  );
  return rows.map((r) => ({ ...toUser(r), learners: Number(r.learners), centreName: (r.centre_name as string | null) ?? null }));
}

/** A child's sign-in, as their parent sees it. */
export interface ChildLogin {
  learnerId: string;
  username: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

export async function listChildLogins(parentId: string): Promise<ChildLogin[]> {
  const { rows } = await (
    await ready()
  ).query(`SELECT learner_id, username, is_active, last_login_at FROM users WHERE parent_id = $1 AND learner_id IS NOT NULL`, [parentId]);
  return rows.map((r) => ({
    learnerId: r.learner_id as string,
    username: r.username as string,
    isActive: r.is_active as boolean,
    lastLoginAt: r.last_login_at ? new Date(r.last_login_at as string).toISOString() : null,
  }));
}

const USERNAME_TAKEN = "That username is taken. Try adding a number or their initial.";

/** A parent gives one of their children a sign-in of their own. */
export async function createChildLogin(
  parent: User,
  learnerId: string,
  username: string,
  password: string,
): Promise<{ login: ChildLogin } | { error: string; status: number }> {
  const pool = await ready();
  const { rows: owned } = await pool.query(`SELECT name FROM learners WHERE id = $1 AND parent_id = $2`, [learnerId, parent.id]);
  if (!owned[0]) return { error: "Save this child to your account first, then try again.", status: 404 };
  const hash = await bcrypt.hash(password, BCRYPT_COST);
  // Children have no email; this one is unique, can't receive mail, and is never shown.
  const placeholder = `child-${randomUUID()}@my247tutor.invalid`;
  try {
    await pool.query(
      `INSERT INTO users (email, display_name, role, password_hash, username, parent_id, learner_id)
       VALUES ($1, $2, 'student', $3, $4, $5, $6)`,
      [placeholder, owned[0].name, hash, username, parent.id, learnerId],
    );
    await audit(parent.id, "add_child_login", learnerId, { username });
    return { login: { learnerId, username, isActive: true, lastLoginAt: null } };
  } catch (error) {
    if ((error as { code?: string }).code !== "23505") throw error;
    const { rows } = await pool.query(`SELECT 1 FROM users WHERE learner_id = $1`, [learnerId]);
    return rows[0] ? { error: "This child already has a sign-in.", status: 409 } : { error: USERNAME_TAKEN, status: 409 };
  }
}

/** A parent changes their child's username or password. A new password signs the child out everywhere. */
export async function updateChildLogin(
  parent: User,
  learnerId: string,
  change: { username?: string; password?: string },
): Promise<{ ok: true } | { error: string; status: number }> {
  const hash = change.password ? await bcrypt.hash(change.password, BCRYPT_COST) : null;
  try {
    const { rowCount } = await (
      await ready()
    ).query(
      `UPDATE users SET
         username = COALESCE($3, username),
         password_hash = COALESCE($4, password_hash),
         session_version = session_version + CASE WHEN $4::text IS NULL THEN 0 ELSE 1 END,
         updated_at = NOW()
       WHERE parent_id = $1 AND learner_id = $2`,
      [parent.id, learnerId, change.username ?? null, hash],
    );
    if (!rowCount) return { error: "This child doesn't have a sign-in yet.", status: 404 };
  } catch (error) {
    if ((error as { code?: string }).code === "23505") return { error: USERNAME_TAKEN, status: 409 };
    throw error;
  }
  await audit(parent.id, "update_child_login", learnerId, { username: change.username, password: Boolean(change.password) });
  return { ok: true };
}

/** A parent removes their child's sign-in. The child's progress stays on the parent's account. */
export async function removeChildLogin(parent: User, learnerId: string): Promise<boolean> {
  const { rowCount } = await (await ready()).query(`DELETE FROM users WHERE parent_id = $1 AND learner_id = $2`, [parent.id, learnerId]);
  if (rowCount) await audit(parent.id, "remove_child_login", learnerId, {});
  return Boolean(rowCount);
}

export async function audit(actorId: string, action: string, targetId: string, detail: object) {
  await (
    await ready()
  ).query(`INSERT INTO audit_log (actor_id, action, target_id, detail) VALUES ($1, $2, $3, $4)`, [
    actorId,
    action,
    targetId,
    JSON.stringify(detail),
  ]);
}

/** An admin changes another user's role or turns their account off or on. Turning it off signs them out. */
export async function updateUser(
  actor: User,
  targetId: string,
  change: { role?: Role; isActive?: boolean; freeAccess?: boolean },
): Promise<User | null> {
  const { rows } = await (
    await ready()
  ).query(
    `UPDATE users SET
       role = COALESCE($2, role),
       is_active = COALESCE($3, is_active),
       free_access = COALESCE($4, free_access),
       session_version = session_version + CASE WHEN $3 = FALSE THEN 1 ELSE 0 END,
       updated_at = NOW()
     WHERE id = $1 RETURNING ${USER_COLUMNS}`,
    [targetId, change.role ?? null, change.isActive ?? null, change.freeAccess ?? null],
  );
  if (rows[0]) await audit(actor.id, "update_user", targetId, change);
  return rows[0] ? toUser(rows[0]) : null;
}

/**
 * An admin adds an account. It has no usable password until its owner sets one from the
 * emailed link. A parent without free access gets the usual free trial from when they set it.
 */
export async function addUser(
  actor: User,
  details: { name: string; email: string; role: Role; freeAccess: boolean },
): Promise<{ user: User } | { error: string }> {
  // A random password nobody knows, so the account can't be signed into until its owner sets one.
  const unusable = await bcrypt.hash(randomBytes(32).toString("hex"), BCRYPT_COST);
  const { rows } = await (
    await ready()
  ).query(
    `INSERT INTO users (email, display_name, role, password_hash, free_access) VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING RETURNING ${USER_COLUMNS}`,
    [details.email, details.name, details.role, unusable, details.freeAccess],
  );
  if (!rows[0]) return { error: "There's already an account with that email." };
  const user = toUser(rows[0]);
  await audit(actor.id, "add_user", user.id, { role: details.role, freeAccess: details.freeAccess });
  return { user };
}

/** Sets a new temporary password and signs the user out everywhere. Returns the password to pass on. */
export async function resetPassword(actor: User, targetId: string): Promise<string | null> {
  const password = temporaryPassword(randomInt);
  const { rowCount } = await (
    await ready()
  ).query(`UPDATE users SET password_hash = $2, session_version = session_version + 1, updated_at = NOW() WHERE id = $1`, [
    targetId,
    await bcrypt.hash(password, BCRYPT_COST),
  ]);
  if (!rowCount) return null;
  await audit(actor.id, "reset_password", targetId, {});
  return password;
}

export async function changePassword(user: User, current: string, next: string): Promise<boolean> {
  const { rows } = await (await ready()).query(`SELECT password_hash FROM users WHERE id = $1`, [user.id]);
  if (!rows[0] || !(await bcrypt.compare(current, rows[0].password_hash ?? dummy()))) return false;
  await (
    await ready()
  ).query(`UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1`, [user.id, await bcrypt.hash(next, BCRYPT_COST)]);
  return true;
}

/** A student as Admin's Learn picker shows them, under the parent or centre that owns them. */
export interface OwnedLearner {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  /** The curriculum they learn: their own, or their parent's or centre's. */
  curriculum: Curriculum;
}

export interface LearnerOwner {
  id: string;
  name: string;
  email: string;
  role: "parent" | "centre";
  isActive: boolean;
  /** The default for their children (NSW when Admin hasn't chosen). */
  curriculum: Curriculum;
  learners: OwnedLearner[];
}

/** Every parent and centre with their students, for an admin to pick one to learn as. */
export async function listLearnerOwners(): Promise<LearnerOwner[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT o.id, o.display_name, o.email, o.role, o.is_active, COALESCE(o.curriculum, 'nsw') AS curriculum,
       COALESCE(json_agg(json_build_object('id', l.id, 'name', l.profile->>'name', 'yearLevel', (l.profile->>'yearLevel')::int, 'username', s.username,
         'curriculum', COALESCE(l.curriculum, o.curriculum, 'nsw'))
         ORDER BY l.profile->>'name') FILTER (WHERE l.id IS NOT NULL), '[]') AS learners
     FROM users o
     LEFT JOIN learners l ON l.parent_id = o.id
     LEFT JOIN users s ON s.learner_id = l.id
     WHERE o.role IN ('parent', 'centre') AND o.learner_id IS NULL
     GROUP BY o.id ORDER BY o.role, o.display_name LIMIT 1000`,
  );
  return rows.map((r) => ({
    id: r.id as string,
    name: r.display_name as string,
    email: r.email as string,
    role: r.role as LearnerOwner["role"],
    isActive: r.is_active as boolean,
    curriculum: r.curriculum as Curriculum,
    learners: r.learners as OwnedLearner[],
  }));
}

/**
 * Who an admin logs in as to learn as this student: the student's own sign-in when they have one
 * that's on, otherwise their parent, with this child picked. Null when there's no such student.
 */
export async function learnAsTarget(learnerId: string): Promise<{ user: User; pick: string | null } | { error: string } | null> {
  const { rows } = await (await ready()).query(`SELECT parent_id FROM learners WHERE id = $1`, [learnerId]);
  if (!rows[0]) return null;
  const login = await (await ready()).query(`SELECT ${USER_COLUMNS} FROM users WHERE learner_id = $1`, [learnerId]);
  const student = login.rows[0] ? toUser(login.rows[0]) : null;
  if (student?.isActive) return { user: student, pick: null };
  const owner = await getUser(rows[0].parent_id as string);
  if (!owner || owner.role !== "parent")
    return { error: "This student's sign-in is turned off. Turn it on from their centre's page first." };
  if (!owner.isActive) return { error: "This family's account is turned off. Turn it on first." };
  return { user: owner, pick: learnerId };
}
