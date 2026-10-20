import { describe, expect, it } from "vitest";
import { NewStudentSchema, StudentChangeSchema } from "../auth/rules";
import { ageOn, dateOfBirthProblem, describeBirth, formatDateOfBirth, today } from "../learner/birth";

const NOW = new Date(2026, 9, 20);

describe("date of birth", () => {
  it("works out age in whole years, counting the birthday", () => {
    expect(ageOn("2017-10-20", NOW)).toBe(9);
    expect(ageOn("2017-10-21", NOW)).toBe(8);
    expect(ageOn("2016-02-29", NOW)).toBe(10);
    expect(ageOn("2017-02-30", NOW)).toBeNull();
    expect(ageOn("20/10/2017", NOW)).toBeNull();
  });

  it("only takes real dates for students aged 3 to 19", () => {
    expect(dateOfBirthProblem("2017-03-03", NOW)).toBeNull();
    expect(dateOfBirthProblem("2024-01-01", NOW)).toMatch(/3 to 19/);
    expect(dateOfBirthProblem("2000-01-01", NOW)).toMatch(/3 to 19/);
    expect(dateOfBirthProblem("2017-13-01", NOW)).toMatch(/real date/);
  });

  it("reads well for grown-ups", () => {
    expect(formatDateOfBirth("2017-03-03")).toBe("3 Mar 2017");
    expect(describeBirth("2017-03-03", "en-AU", NOW)).toBe("Born 3 Mar 2017 · age 9");
    expect(today(NOW)).toBe("2026-10-20");
  });

  it("is optional when a centre adds a student, and can be cleared", () => {
    const student = { name: "Mia", yearLevel: 3, username: "mia.k", password: "student-pw-1" };
    expect(NewStudentSchema.safeParse(student).success).toBe(true);
    expect(NewStudentSchema.safeParse({ ...student, dateOfBirth: "2018-05-01" }).data?.dateOfBirth).toBe("2018-05-01");
    expect(NewStudentSchema.safeParse({ ...student, dateOfBirth: "2030-01-01" }).success).toBe(false);
    expect(StudentChangeSchema.safeParse({ dateOfBirth: null }).success).toBe(true);
    expect(StudentChangeSchema.safeParse({ dateOfBirth: "nope" }).success).toBe(false);
  });
});
