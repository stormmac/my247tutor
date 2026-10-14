import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHILD_SQL } from "../auth/childSchema";
import { ChildLoginChangeSchema, MIN_CHILD_PASSWORD_LENGTH, NewChildLoginSchema, SignInSchema, UsernameSchema } from "../auth/rules";

describe("child usernames", () => {
  it("accepts simple names and stores them in lower case", () => {
    expect(UsernameSchema.parse(" Mia.K ")).toBe("mia.k");
    expect(UsernameSchema.parse("tom_2016")).toBe("tom_2016");
  });

  it("rejects emails, spaces, and names too short or too long", () => {
    for (const bad of ["mia@example.com", "mia k", "mi", "x".repeat(31), ".mia", "-tom"]) {
      expect(UsernameSchema.safeParse(bad).success, bad).toBe(false);
    }
  });
});

describe("setting up a child's sign-in", () => {
  it(`needs a password of at least ${MIN_CHILD_PASSWORD_LENGTH} characters`, () => {
    expect(NewChildLoginSchema.safeParse({ username: "mia", password: "short" }).success).toBe(false);
    expect(NewChildLoginSchema.safeParse({ username: "mia", password: "koala-1234" }).success).toBe(true);
  });

  it("needs something to change", () => {
    expect(ChildLoginChangeSchema.safeParse({}).success).toBe(false);
    expect(ChildLoginChangeSchema.safeParse({ password: "new-password" }).success).toBe(true);
    expect(ChildLoginChangeSchema.safeParse({ username: "mia2" }).success).toBe(true);
  });
});

describe("signing in", () => {
  it("takes an email or a username", () => {
    expect(SignInSchema.parse({ email: "Parent@Example.com ", password: "x" }).email).toBe("parent@example.com");
    expect(SignInSchema.parse({ email: "Mia", password: "x" }).email).toBe("mia");
    expect(SignInSchema.safeParse({ email: "", password: "x" }).success).toBe(false);
  });
});

describe("child sign-in migration", () => {
  it("is the same SQL the app runs itself", () => {
    expect(readFileSync(join(__dirname, "../../../database/010_my247tutor_child_logins.sql"), "utf8")).toContain(CHILD_SQL);
  });
});
