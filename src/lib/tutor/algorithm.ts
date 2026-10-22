/**
 * Written methods Suni sets out on the whiteboard: column addition and subtraction, long
 * multiplication, and short and long division. Suni writes one line on the board, such as
 * "Set out: 347 × 26", and the board draws it in columns with boxes for the student to fill in.
 */

export type Op = "+" | "−" | "×" | "÷";

export interface Algorithm {
  op: Op;
  numbers: string[];
  /** Long division, with room underneath for the working. */
  long: boolean;
}

/** One thing drawn on the grid. Rows and columns count cells from the top left. */
export type Mark =
  | { kind: "digit"; col: number; row: number; text: string }
  /** A box to write in. A small one is for carrying: across the top of the cell, or in its top left corner beside a digit. */
  | { kind: "box"; col: number; row: number; small?: "top" | "corner" }
  /** A ruled line along the top of a row, from one column to another (inclusive). */
  | { kind: "rule"; row: number; from: number; to: number }
  /** The division bracket, at the left of a column on a row. */
  | { kind: "bracket"; col: number; row: number };

export interface Layout {
  cols: number;
  rows: number;
  marks: Mark[];
}

const LINE = /^(set out|long division|short division|long multiplication|column addition|column subtraction)\s*:\s*(.+)$/i;
const WHOLE = /^\d{1,7}$/;
const DECIMAL = /^\d{1,7}(\.\d{1,3})?$/;

/** The written method a board line asks for, or null when the line is ordinary writing. */
export function parseAlgorithm(line: string): Algorithm | null {
  const m = LINE.exec(line.trim());
  if (!m) return null;
  const expr = m[2].replace(/\s+/g, "").replace(/,/g, "");
  const op: Op | null = /[÷/]/.test(expr) ? "÷" : /[×xX*]/.test(expr) ? "×" : /[−-]/.test(expr) ? "−" : /\+/.test(expr) ? "+" : null;
  if (!op) return null;
  const numbers = expr.split(/[÷/×xX*−\-+]/);
  if (numbers.some((n) => !n)) return null;
  if (op === "+")
    return numbers.length >= 2 && numbers.length <= 4 && numbers.every((n) => DECIMAL.test(n)) ? { op, numbers, long: false } : null;
  if (numbers.length !== 2) return null;
  const [a, b] = numbers;
  if (op === "−") return DECIMAL.test(a) && DECIMAL.test(b) ? { op, numbers, long: false } : null;
  if (!WHOLE.test(a) || !WHOLE.test(b) || b.length > 3) return null;
  if (op === "×") return a.length <= 5 ? { op, numbers, long: false } : null;
  return { op, numbers, long: /^long/i.test(m[1]) || Number(b) >= 10 };
}

/** Lays a written method out on a grid of cells. */
export function layoutAlgorithm(a: Algorithm): Layout {
  if (a.op === "×") return multiplication(a.numbers[0], a.numbers[1]);
  if (a.op === "÷") return division(a.numbers[0], a.numbers[1], a.long);
  return columns(a.op, a.numbers);
}

/** Column addition or subtraction, lined up on the decimal point, with a row for carrying. */
function columns(op: "+" | "−", numbers: string[]): Layout {
  const parts = numbers.map((n) => {
    const [whole, frac = ""] = n.split(".");
    return { whole, frac };
  });
  const wholeCols = Math.max(...parts.map((p) => p.whole.length)) + (op === "+" ? 1 : 0);
  const fracCols = Math.max(...parts.map((p) => p.frac.length));
  // Column 0 is the sign. The point, when there is one, has its own column.
  const point = fracCols ? 1 + wholeCols : -1;
  const cols = 1 + wholeCols + (fracCols ? 1 + fracCols : 0);
  const digitCols = Array.from({ length: cols - 1 }, (_, i) => i + 1).filter((c) => c !== point);
  const marks: Mark[] = [];
  // Row 0: small boxes for carrying (adding) or regrouping (subtracting).
  for (const col of digitCols) marks.push({ kind: "box", col, row: 0, small: "top" });
  parts.forEach((p, i) => {
    const row = 1 + i;
    const start = 1 + wholeCols - p.whole.length;
    [...p.whole].forEach((d, j) => marks.push({ kind: "digit", col: start + j, row, text: d }));
    if (fracCols) {
      marks.push({ kind: "digit", col: point, row, text: "." });
      // Empty decimal places are shown as zeros so the columns line up.
      [...p.frac.padEnd(fracCols, "0")].forEach((d, j) => marks.push({ kind: "digit", col: point + 1 + j, row, text: d }));
    }
  });
  const answerRow = 1 + parts.length;
  marks.push({ kind: "digit", col: 0, row: answerRow - 1, text: op });
  marks.push({ kind: "rule", row: answerRow, from: 0, to: cols - 1 });
  for (const col of digitCols) marks.push({ kind: "box", col, row: answerRow });
  if (fracCols) marks.push({ kind: "digit", col: point, row: answerRow, text: "." });
  marks.push({ kind: "rule", row: answerRow + 1, from: 0, to: cols - 1 });
  return { cols, rows: answerRow + 1, marks };
}

/** Long multiplication: a row for each digit of the multiplier when it has more than one, then the total. */
function multiplication(top: string, by: string): Layout {
  const cols = 1 + top.length + by.length;
  const marks: Mark[] = [];
  const right = (n: string, row: number) => [...n].forEach((d, j) => marks.push({ kind: "digit", col: cols - n.length + j, row, text: d }));
  for (let col = 1; col < cols; col++) marks.push({ kind: "box", col, row: 0, small: "top" });
  right(top, 1);
  right(by, 2);
  marks.push({ kind: "digit", col: 0, row: 2, text: "×" });
  marks.push({ kind: "rule", row: 3, from: 0, to: cols - 1 });
  const partials = by.length > 1 ? by.length : 0;
  for (let row = 3; row < 3 + partials; row++) for (let col = 1; col < cols; col++) marks.push({ kind: "box", col, row });
  const answerRow = 3 + partials;
  if (partials) {
    marks.push({ kind: "digit", col: 0, row: answerRow - 1, text: "+" });
    marks.push({ kind: "rule", row: answerRow, from: 0, to: cols - 1 });
  }
  for (let col = 1; col < cols; col++) marks.push({ kind: "box", col, row: answerRow });
  marks.push({ kind: "rule", row: answerRow + 1, from: 0, to: cols - 1 });
  return { cols, rows: answerRow + 1, marks };
}

/**
 * Short or long division: the answer above the bracket. Short division has carry boxes beside the
 * digits, and long division has room below for the working.
 */
function division(dividend: string, divisor: string, long: boolean): Layout {
  const first = divisor.length;
  const cols = first + dividend.length;
  const marks: Mark[] = [];
  for (let j = 0; j < dividend.length; j++) marks.push({ kind: "box", col: first + j, row: 0 });
  [...divisor].forEach((d, j) => marks.push({ kind: "digit", col: j, row: 1, text: d }));
  marks.push({ kind: "bracket", col: first, row: 1 });
  marks.push({ kind: "rule", row: 1, from: first, to: cols - 1 });
  [...dividend].forEach((d, j) => marks.push({ kind: "digit", col: first + j, row: 1, text: d }));
  // Short division carries what's left over to the next digit, written small beside it.
  if (!long) for (let j = 1; j < dividend.length; j++) marks.push({ kind: "box", col: first + j, row: 1, small: "corner" });
  // Long division: two rows (multiply, then subtract) for each step, up to four steps.
  const steps = Math.max(1, Math.min(dividend.length - divisor.length + 1, 4));
  const working = long ? steps * 2 : 0;
  for (let row = 2; row < 2 + working; row++) for (let j = 0; j < dividend.length; j++) marks.push({ kind: "box", col: first + j, row });
  return { cols, rows: 2 + working, marks };
}
