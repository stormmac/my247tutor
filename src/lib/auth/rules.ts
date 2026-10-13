/**
 * Account rules that don't touch the database or the network, kept separate so they can be tested
 * and used from the proxy, route handlers and the browser alike.
 */
import { z } from "zod";

export type Role = "admin" | "teacher" | "student" | "parent";
export const ROLES: Role[] = ["parent", "teacher", "admin"];

export const MIN_PASSWORD_LENGTH = 10;

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(255)
  .pipe(z.email({ message: "Enter a valid email address." }));

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters.`)
  .max(200, "That password is too long.");

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignInSchema = z.object({ email: EmailSchema, password: z.string().min(1).max(200) });

/** Emails listed in ADMIN_EMAILS (comma separated) become admins when they sign up or sign in. */
export function isAdminEmail(email: string, list = process.env.ADMIN_EMAILS ?? ""): boolean {
  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

export const LOCKOUT_MINUTES = 15;
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;

/** Too many wrong passwords recently, for this account or from this address. */
export function isLockedOut(recent: { emailFailures: number; ipFailures: number }): boolean {
  return recent.emailFailures >= MAX_FAILURES_PER_EMAIL || recent.ipFailures >= MAX_FAILURES_PER_IP;
}

/** Only allow redirects back to a path on this site after signing in. */
export function safeNextPath(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}

/**
 * Blocks other websites from posting to our API with the visitor's cookies (cross-site request forgery).
 * Browsers send Origin on every POST, PUT, PATCH and DELETE; it must match this site.
 */
export function isSameOrigin(method: string, origin: string | null, host: string | null): boolean {
  if (["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) return true;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** A readable temporary password an admin can pass on, e.g. "maple-river-4821". */
export function temporaryPassword(random: (n: number) => number): string {
  const words = ["maple", "river", "comet", "otter", "wattle", "harbour", "koala", "cedar", "lagoon", "ember", "summit", "breeze"];
  const pick = () => words[random(words.length)];
  return `${pick()}-${pick()}-${pick()}-${String(1000 + random(9000))}`;
}
