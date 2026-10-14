import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CENTRE_SQL } from "../auth/centreSchema";
import { accountPlan, ASSIGNABLE_ROLES, ClassSchema, NewStudentSchema, NewTeacherSchema, StudentChangeSchema } from "../auth/rules";
import { newProfile } from "../learner/model";
import { summarise } from "../learner/summary";

const TEACHER = "9b2c4f9e-1d1a-4a57-9a5e-4a3c1c6f0b11";

describe("tutoring centre accounts", () => {
  it("can be added in Admin and pay like a family, unless given free access", () => {
    expect(ASSIGNABLE_ROLES).toContain("centre");
    const now = Date.now();
    expect(accountPlan({ role: "centre", freeAccess: false, trialEndsAt: now + 1000, subscriptionStatus: null }, now)).toBe("trial");
    expect(accountPlan({ role: "centre", freeAccess: true, trialEndsAt: null, subscriptionStatus: null }, now)).toBe("free");
    expect(accountPlan({ role: "centre", freeAccess: false, trialEndsAt: null, subscriptionStatus: null }, now)).toBe("unpaid");
  });
});

describe("centre forms", () => {
  it("adds a teacher by name and email", () => {
    expect(NewTeacherSchema.parse({ name: " Ms Lee ", email: "Lee@Centre.com" })).toEqual({ name: "Ms Lee", email: "lee@centre.com" });
    expect(NewTeacherSchema.safeParse({ name: "Ms Lee", email: "lee" }).success).toBe(false);
  });

  it("makes a class for Years 3 to 6, with or without a teacher", () => {
    expect(ClassSchema.safeParse({ name: "Sat Maths", yearLevel: 4, subject: "maths", teacherId: TEACHER }).success).toBe(true);
    expect(ClassSchema.safeParse({ name: "Sat Maths", yearLevel: 4, subject: "both", teacherId: null }).success).toBe(true);
    expect(ClassSchema.safeParse({ name: "Sat Maths", yearLevel: 7, subject: "maths", teacherId: null }).success).toBe(false);
    expect(ClassSchema.safeParse({ name: "", yearLevel: 4, subject: "maths", teacherId: null }).success).toBe(false);
    expect(ClassSchema.safeParse({ name: "Sat", yearLevel: 4, subject: "science", teacherId: null }).success).toBe(false);
  });

  it("adds a student with a username, a password and their classes", () => {
    const student = NewStudentSchema.parse({ name: "Mia", yearLevel: 5, username: "Mia.K", password: "koala-1234" });
    expect(student).toEqual({ name: "Mia", yearLevel: 5, username: "mia.k", password: "koala-1234", classIds: [], learnToRead: false });
    expect(NewStudentSchema.safeParse({ name: "Mia", yearLevel: 5, username: "mia@x.com", password: "koala-1234" }).success).toBe(false);
    expect(NewStudentSchema.safeParse({ name: "Mia", yearLevel: 5, username: "mia", password: "short" }).success).toBe(false);
    expect(
      NewStudentSchema.safeParse({ name: "Mia", yearLevel: 5, username: "mia", password: "koala-1234", classIds: ["x"] }).success,
    ).toBe(false);
  });

  it("changes a student only when something is given", () => {
    expect(StudentChangeSchema.safeParse({}).success).toBe(false);
    expect(StudentChangeSchema.safeParse({ classIds: [] }).success).toBe(true);
    expect(StudentChangeSchema.safeParse({ yearLevel: 6 }).success).toBe(true);
  });
});

describe("a student's line in the class list", () => {
  it("counts this week's questions and how many were right first try", () => {
    const now = Date.UTC(2026, 9, 14);
    const profile = newProfile("Mia", 4, now - 30 * 86_400_000);
    profile.history = [
      { skillId: "x", at: now - 10 * 86_400_000, correct: false, hintsUsed: 0 },
      { skillId: "x", at: now - 2 * 86_400_000, correct: true, hintsUsed: 0 },
      { skillId: "x", at: now - 86_400_000, correct: true, hintsUsed: 0 },
      { skillId: "x", at: now - 3_600_000, correct: false, hintsUsed: 1 },
    ];
    const s = summarise(profile, now);
    expect(s.questionsThisWeek).toBe(3);
    expect(s.correctThisWeek).toBe(67);
    expect(s.lastPractisedAt).toBe(now - 3_600_000);
  });

  it("shows nothing yet for a new student", () => {
    const s = summarise(newProfile("Tom", 3));
    expect(s.questionsThisWeek).toBe(0);
    expect(s.correctThisWeek).toBeNull();
    expect(s.lastPractisedAt).toBeNull();
    expect(s.maths.standing).toBe("not enough evidence");
  });
});

describe("centre migration", () => {
  it("is the same SQL the app runs itself", () => {
    expect(readFileSync(join(__dirname, "../../../database/011_my247tutor_centres.sql"), "utf8")).toContain(CENTRE_SQL);
  });

  it("keeps the centre role when the accounts migration is run again", () => {
    expect(readFileSync(join(__dirname, "../../../database/006_my247tutor_accounts.sql"), "utf8")).toContain("'parent', 'centre'");
  });
});

describe("Learn to Read for centre students", () => {
  it("can be turned on when adding or editing a student", () => {
    expect(
      NewStudentSchema.parse({ name: "Mia", yearLevel: 3, username: "mia", password: "koala-1234", learnToRead: true }).learnToRead,
    ).toBe(true);
    expect(StudentChangeSchema.safeParse({ learnToRead: false }).success).toBe(true);
  });

  it("shows reading age in the class list", () => {
    const profile = newProfile("Mia", 3);
    expect(summarise(profile).reading).toEqual({ age: null, enrolled: false, unitsDone: 0, sightLevelsDone: 0 });
  });
});
