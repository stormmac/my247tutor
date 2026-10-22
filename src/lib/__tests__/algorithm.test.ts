import { describe, expect, it } from "vitest";
import { layoutAlgorithm, parseAlgorithm, type Layout, type Mark } from "../tutor/algorithm";

/** The layout as rows of text: digits as themselves, boxes as ▢ (small ones ·), the bracket as ). */
function picture({ cols, rows, marks }: Layout): string[] {
  const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => " "));
  const at = (m: Mark & { row: number; col: number }, c: string) => (grid[m.row][m.col] = c);
  for (const m of marks) if (m.kind === "box") at(m, m.small ? "·" : "▢");
  for (const m of marks) if (m.kind === "digit") at(m, m.text);
  // The bracket sits on the line between two cells.
  for (const m of marks) if (m.kind === "bracket") grid[m.row].splice(m.col, 0, ")");
  return grid.map((r) => r.join("").trimEnd());
}

const rules = (l: Layout) => l.marks.filter((m) => m.kind === "rule").map((m) => (m.kind === "rule" ? [m.row, m.from, m.to] : []));

describe("written methods on the whiteboard", () => {
  it("reads the line Suni writes", () => {
    expect(parseAlgorithm("Set out: 4567 + 2389")).toEqual({ op: "+", numbers: ["4567", "2389"], long: false });
    expect(parseAlgorithm("set out: 5004 - 2678")).toEqual({ op: "−", numbers: ["5004", "2678"], long: false });
    expect(parseAlgorithm("Set out: 347 x 26")).toEqual({ op: "×", numbers: ["347", "26"], long: false });
    expect(parseAlgorithm("Set out: 756 ÷ 4")).toEqual({ op: "÷", numbers: ["756", "4"], long: false });
    expect(parseAlgorithm("Set out: 7568 ÷ 32")).toEqual({ op: "÷", numbers: ["7568", "32"], long: true });
    expect(parseAlgorithm("Long division: 756 ÷ 4")).toEqual({ op: "÷", numbers: ["756", "4"], long: true });
    expect(parseAlgorithm("Set out: 1,234 + 7.25")).toEqual({ op: "+", numbers: ["1234", "7.25"], long: false });
  });

  it("leaves ordinary board writing alone", () => {
    for (const line of ["24 + 18", "= 30 + ?", "Set out: 3.5 × 2", "Set out: 12 ÷ 0.5", "Set out: hello", "Set out: 4 +"])
      expect(parseAlgorithm(line)).toBeNull();
  });

  it("sets out column addition with carry boxes and an answer row", () => {
    const l = layoutAlgorithm(parseAlgorithm("Set out: 4567 + 2389")!);
    expect(picture(l)).toEqual([" ·····", "  4567", "+ 2389", " ▢▢▢▢▢"]);
    expect(rules(l)).toEqual([
      [3, 0, 5],
      [4, 0, 5],
    ]);
  });

  it("lines decimals up on the point", () => {
    expect(picture(layoutAlgorithm(parseAlgorithm("Set out: 7.25 + 1.8")!))).toEqual([" ·· ··", "  7.25", "+ 1.80", " ▢▢.▢▢"]);
  });

  it("sets out column subtraction with boxes for regrouping", () => {
    expect(picture(layoutAlgorithm(parseAlgorithm("Set out: 5004 − 2678")!))).toEqual([" ····", " 5004", "−2678", " ▢▢▢▢"]);
  });

  it("sets out long multiplication with a row for each digit of the multiplier", () => {
    const l = layoutAlgorithm(parseAlgorithm("Set out: 347 × 26")!);
    expect(picture(l)).toEqual([" ·····", "   347", "×   26", " ▢▢▢▢▢", "+▢▢▢▢▢", " ▢▢▢▢▢"]);
    expect(rules(l)).toEqual([
      [3, 0, 5],
      [5, 0, 5],
      [6, 0, 5],
    ]);
  });

  it("sets out short division with carry boxes beside the digits", () => {
    const l = layoutAlgorithm(parseAlgorithm("Set out: 756 ÷ 4")!);
    expect(picture(l)).toEqual([" ▢▢▢", "4)756"]);
    expect(l.marks.filter((m) => m.kind === "box" && m.small === "corner")).toHaveLength(2);
    expect(rules(l)).toEqual([[1, 1, 3]]);
  });

  it("sets out long division with room for the working", () => {
    // Three steps: 75, then 116, then 208.
    expect(picture(layoutAlgorithm(parseAlgorithm("Set out: 7568 ÷ 32")!))).toEqual([
      "  ▢▢▢▢",
      "32)7568",
      ...Array.from({ length: 6 }, () => "  ▢▢▢▢"),
    ]);
  });
});
