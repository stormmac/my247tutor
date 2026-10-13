import { describe, expect, it } from "vitest";
import { authToken, safeEqual, safeNextPath } from "../auth/sitePassword";

describe("site password", () => {
  it("makes the same token for the same password and a different one otherwise", async () => {
    expect(await authToken("wattle")).toBe(await authToken("wattle"));
    expect(await authToken("wattle")).not.toBe(await authToken("Wattle"));
    expect(await authToken("wattle")).toMatch(/^[0-9a-f]{64}$/);
  });

  it("compares strings exactly", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abc", "abd")).toBe(false);
    expect(safeEqual("abc", "abcd")).toBe(false);
    expect(safeEqual("", "abc")).toBe(false);
  });

  it("only redirects back to pages on this site", () => {
    expect(safeNextPath("/learn/maths")).toBe("/learn/maths");
    expect(safeNextPath("//evil.example")).toBe("/");
    expect(safeNextPath("https://evil.example")).toBe("/");
    expect(safeNextPath(null)).toBe("/");
  });
});
