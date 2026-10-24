import { describe, expect, it } from "vitest";
import { CURRICULA } from "../curriculum/curricula";
import { YEARS } from "../curriculum/types";
import { yearSummary } from "../content/yearSummary";

describe("what a child should know by the end of a year", () => {
  it("lists each of the year's topics with what they should be able to do", () => {
    const y3 = yearSummary("maths", 3, "nsw");
    expect(y3.map((a) => a.topic)).toContain("Multiplication and division");
    expect(y3.find((a) => a.topic === "Multiplication and division")?.canDo).toContain("Recalls multiplication facts up to 10 × 10.");
  });

  it("has something for every subject and year in every curriculum", () => {
    for (const curriculum of CURRICULA)
      for (const subject of ["maths", "english"] as const)
        for (const year of YEARS) {
          const areas = yearSummary(subject, year, curriculum);
          expect(areas.length, `${curriculum} ${subject} year ${year}`).toBeGreaterThan(0);
          for (const a of areas) expect(a.canDo.length).toBeGreaterThan(0);
        }
  });
});
