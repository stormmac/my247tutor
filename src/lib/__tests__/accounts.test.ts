import { describe, expect, it } from "vitest";
import { isAdminEmail, isLockedOut, isSameOrigin, safeNextPath, SignUpSchema, temporaryPassword } from "../auth/rules";
import { signSession, verifySession } from "../auth/session";

const SECRET = "a-test-secret-that-is-at-least-32-characters";
const OTHER = "another-secret-that-is-at-least-32-characters";

describe("sessions", () => {
  it("round-trips a signed session", async () => {
    const token = await signSession({ userId: "u1", role: "parent", version: 2 }, SECRET);
    expect(await verifySession(token, SECRET)).toEqual({ userId: "u1", role: "parent", version: 2 });
  });

  it("rejects a token signed with another secret, tampered with, or expired", async () => {
    const token = await signSession({ userId: "u1", role: "parent", version: 0 }, SECRET);
    expect(await verifySession(token, OTHER)).toBeNull();

    // Swap in a payload claiming to be an admin, keeping the original signature.
    const [header, , signature] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ sub: "u1", role: "admin", v: 0, exp: 9_999_999_999 })).toString("base64url");
    expect(await verifySession(`${header}.${forged}.${signature}`, SECRET)).toBeNull();

    const later = Date.now() + 8 * 86_400_000;
    expect(await verifySession(token, SECRET, later)).toBeNull();
    expect(await verifySession(undefined, SECRET)).toBeNull();
    expect(await verifySession("not-a-token", SECRET)).toBeNull();
  });
});

describe("account rules", () => {
  it("validates sign-up details and normalises the email", () => {
    const ok = SignUpSchema.safeParse({ name: " Storm ", email: " Storm@Example.COM ", password: "long enough pw" });
    expect(ok.success && ok.data).toEqual({ name: "Storm", email: "storm@example.com", password: "long enough pw" });
    expect(SignUpSchema.safeParse({ name: "S", email: "not-an-email", password: "long enough pw" }).success).toBe(false);
    expect(SignUpSchema.safeParse({ name: "S", email: "s@example.com", password: "short" }).success).toBe(false);
    expect(SignUpSchema.safeParse({ name: "", email: "s@example.com", password: "long enough pw" }).success).toBe(false);
  });

  it("makes listed emails admins", () => {
    expect(isAdminEmail("Storm@Example.com", "someone@x.com, storm@example.com")).toBe(true);
    expect(isAdminEmail("other@example.com", "storm@example.com")).toBe(false);
    expect(isAdminEmail("storm@example.com", "")).toBe(false);
  });

  it("locks out after repeated wrong passwords", () => {
    expect(isLockedOut({ emailFailures: 4, ipFailures: 19 })).toBe(false);
    expect(isLockedOut({ emailFailures: 5, ipFailures: 0 })).toBe(true);
    expect(isLockedOut({ emailFailures: 0, ipFailures: 20 })).toBe(true);
  });

  it("blocks cross-site writes but allows reads and same-site writes", () => {
    expect(isSameOrigin("GET", null, "my247tutor.com")).toBe(true);
    expect(isSameOrigin("POST", "https://my247tutor.com", "my247tutor.com")).toBe(true);
    expect(isSameOrigin("POST", "https://evil.example", "my247tutor.com")).toBe(false);
    expect(isSameOrigin("PUT", null, "my247tutor.com")).toBe(false);
    expect(isSameOrigin("DELETE", "garbage", "my247tutor.com")).toBe(false);
  });

  it("only redirects within the site after signing in", () => {
    expect(safeNextPath("/parent")).toBe("/parent");
    expect(safeNextPath("//evil.example")).toBe("/");
    expect(safeNextPath("/\\evil.example")).toBe("/");
    expect(safeNextPath("https://evil.example")).toBe("/");
    expect(safeNextPath(null)).toBe("/");
  });

  it("makes readable temporary passwords long enough to use", () => {
    let i = 0;
    const pw = temporaryPassword((n) => i++ % n);
    expect(pw).toMatch(/^[a-z]+-[a-z]+-[a-z]+-\d{4}$/);
    expect(pw.length).toBeGreaterThanOrEqual(10);
  });
});
