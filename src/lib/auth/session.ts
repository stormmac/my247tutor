/**
 * Signed-in sessions: a JSON Web Token in an HttpOnly cookie, signed with AUTH_SECRET.
 * Uses jose, which runs in the proxy and in route handlers alike.
 */
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./rules";

export const SESSION_COOKIE = "my247_session";
export const SESSION_DAYS = 7;

export interface Session {
  userId: string;
  role: Role;
  /** Must match users.session_version, so a reset or a disabled account signs the user out everywhere. */
  version: number;
}

/** Accounts switch on once a database and a signing secret are configured. Until then the site works as before. */
export function accountsEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL && authSecret());
}

function authSecret(): string | null {
  const secret = process.env.AUTH_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function key(secret = authSecret()): Uint8Array {
  if (!secret) throw new Error("AUTH_SECRET must be set to at least 32 characters");
  return new TextEncoder().encode(secret);
}

export async function signSession(session: Session, secret?: string, now = Date.now()): Promise<string> {
  return new SignJWT({ role: session.role, v: session.version })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt(Math.floor(now / 1000))
    .setExpirationTime(Math.floor(now / 1000) + SESSION_DAYS * 86_400)
    .sign(key(secret));
}

export async function verifySession(token: string | undefined, secret?: string, now = Date.now()): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(secret), { algorithms: ["HS256"], currentDate: new Date(now) });
    if (typeof payload.sub !== "string" || typeof payload.role !== "string" || typeof payload.v !== "number") return null;
    return { userId: payload.sub, role: payload.role as Role, version: payload.v };
  } catch {
    return null;
  }
}

function cookieFlags(): string {
  return `Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export async function sessionCookie(session: Session): Promise<string> {
  return `${SESSION_COOKIE}=${await signSession(session)}; Max-Age=${SESSION_DAYS * 86_400}; ${cookieFlags()}`;
}

export function clearedSessionCookie(): string {
  return `${SESSION_COOKIE}=; Max-Age=0; ${cookieFlags()}`;
}
