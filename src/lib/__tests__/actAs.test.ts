import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { actAsCookies } from "../auth/actAs";
import { signSession, verifySession } from "../auth/session";

const SECRET = "a-test-secret-that-is-at-least-32-characters";
const saved = process.env.AUTH_SECRET;
beforeAll(() => {
  process.env.AUTH_SECRET = SECRET;
});
afterAll(() => {
  process.env.AUTH_SECRET = saved;
});

/** The value of a Set-Cookie line. */
const value = (cookie: string) => cookie.split(";")[0].split("=").slice(1).join("=");

describe("logging in as someone", () => {
  it("keeps your own session for the way back", async () => {
    const admin = await signSession({ userId: "admin", role: "admin", version: 1 });
    const [kept, session] = await actAsCookies({ session: admin }, "admin", { userId: "centre", role: "centre", version: 0 });
    expect(kept).toMatch(/^my247_admin_return=/);
    expect(value(kept)).toBe(admin);
    expect(await verifySession(value(session))).toEqual({ userId: "centre", role: "centre", version: 0, actorId: "admin" });
  });

  it("goes on from someone you're logged in as, with the way back still leading to you", async () => {
    const admin = await signSession({ userId: "admin", role: "admin", version: 1 });
    const asCentre = await signSession({ userId: "centre", role: "centre", version: 0, actorId: "admin" });
    const [kept, session] = await actAsCookies({ session: asCentre, kept: admin }, "centre", {
      userId: "student",
      role: "student",
      version: 0,
    });
    expect(value(kept)).toBe(admin);
    expect(await verifySession(value(session))).toEqual({ userId: "student", role: "student", version: 0, actorId: "admin" });
  });

  it("starts afresh when there is no session kept to go back to", async () => {
    const asCentre = await signSession({ userId: "centre", role: "centre", version: 0, actorId: "admin" });
    const [kept, session] = await actAsCookies({ session: asCentre }, "centre", { userId: "teacher", role: "teacher", version: 0 });
    expect(value(kept)).toBe(asCentre);
    expect((await verifySession(value(session)))?.actorId).toBe("centre");
  });
});
