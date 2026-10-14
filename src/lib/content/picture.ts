/**
 * Pictures for questions. A picture is stored as data (what to draw), not as an image file, and
 * src/components/Picture.tsx draws it as SVG. That keeps every picture exact (the clock really
 * shows 3:30), sharp on any screen, and editable in the database like the rest of the question.
 */

/** Colours a spinner, bag or column can use. */
export const COLOURS = ["red", "blue", "green", "yellow", "orange", "purple"] as const;
export type Colour = (typeof COLOURS)[number];

export type Picture =
  /** An analog clock. */
  | { kind: "clock"; hour: number; minute: number }
  /** A shape cut into equal parts, some of them shaded. */
  | { kind: "fraction"; shape: "circle" | "bar"; parts: number; shaded: number }
  /** A number line cut into equal jumps, with an optional dot. Labels show at the ends only unless `labelEvery`. */
  | { kind: "number_line"; from: number; to: number; jumps: number; dotAt?: number; labelEvery?: boolean; fractions?: boolean }
  /** A column graph. `step` is the gap between the numbers on the side. */
  | { kind: "column_graph"; title: string; columns: { label: string; value: number }[]; step?: number }
  /** A dot plot: one dot per item above each label. */
  | { kind: "dot_plot"; title: string; columns: { label: string; count: number }[] }
  /** A picture graph with a key: each star stands for `each` of `thing` (such as "books"). */
  | { kind: "picture_graph"; title: string; thing: string; each: number; rows: { label: string; count: number }[] }
  /** A two-column table. */
  | { kind: "table"; headings: [string, string]; rows: [string, string | number][] }
  /** A ruler in centimetres with an object lying along it from 0. */
  | { kind: "ruler"; cm: number; length: number; object: "pencil" | "ribbon" }
  /** A rectangle with its side lengths written on it. */
  | { kind: "rectangle"; width: number; height: number; top: string; side: string }
  /** A spinner with equal sections. */
  | { kind: "spinner"; sections: Colour[] }
  /** A bag of counters. */
  | { kind: "bag"; counters: { colour: Colour; count: number }[] }
  /** Dots in rows and columns, for multiplication. */
  | { kind: "array"; rows: number; columns: number }
  /** Base-ten blocks: hundreds flats, tens rods and ones cubes. */
  | { kind: "blocks"; hundreds: number; tens: number; ones: number };

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function timeWords(hour: number, minute: number): string {
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

/**
 * A sentence saying what the picture shows, for screen readers and for anyone the picture doesn't
 * load for. It never gives away more than the picture itself does.
 */
export function describePicture(p: Picture): string {
  switch (p.kind) {
    case "clock":
      return `A clock showing ${timeWords(p.hour, p.minute)}.`;
    case "fraction":
      return `A ${p.shape === "circle" ? "circle" : "bar"} cut into ${p.parts} equal parts, with ${p.shaded} shaded.`;
    case "number_line":
      return `A number line from ${p.from} to ${p.to} with ${p.jumps} equal jumps${p.dotAt === undefined ? "" : ", and a dot after " + plural(p.dotAt, "jump")}.`;
    case "column_graph":
      return `Column graph, ${p.title}: ${p.columns.map((c) => `${c.label} ${c.value}`).join(", ")}.`;
    case "dot_plot":
      return `Dot plot, ${p.title}: ${p.columns.map((c) => `${plural(c.count, "dot")} above ${c.label}`).join(", ")}.`;
    case "picture_graph":
      return `Picture graph, ${p.title}. Each star means ${p.each} ${p.thing}. ${p.rows.map((r) => `${r.label}: ${plural(r.count, "picture")}`).join(", ")}.`;
    case "table":
      return `Table of ${p.headings[0]} and ${p.headings[1]}: ${p.rows.map(([a, b]) => `${a} ${b}`).join(", ")}.`;
    case "ruler":
      return `A ${p.object} lying along a ruler marked in centimetres, from 0 to ${p.length}.`;
    case "rectangle":
      return `A rectangle with sides marked ${p.top} and ${p.side}.`;
    case "spinner":
      return `A spinner with ${p.sections.length} equal parts: ${p.sections.join(", ")}.`;
    case "bag":
      return `A bag holding ${p.counters.map((c) => `${c.count} ${c.colour}`).join(" and ")} counters.`;
    case "array":
      return `${plural(p.rows, "row")} of dots with ${p.columns} in each row.`;
    case "blocks":
      return `Base-ten blocks: ${plural(p.hundreds, "hundred")}, ${plural(p.tens, "ten")} and ${plural(p.ones, "one")}.`;
  }
}

/** Problems with a picture's numbers, for tests. Empty when it can be drawn. */
export function pictureProblems(p: Picture): string[] {
  const out: string[] = [];
  const whole = (n: number) => Number.isInteger(n) && n >= 0;
  switch (p.kind) {
    case "clock":
      if (!(p.hour >= 1 && p.hour <= 12 && whole(p.minute) && p.minute < 60)) out.push("clock time out of range");
      break;
    case "fraction":
      if (!(p.parts >= 1 && p.parts <= 12 && whole(p.shaded) && p.shaded <= p.parts)) out.push("bad fraction");
      break;
    case "number_line":
      if (!(p.to > p.from && p.jumps >= 1 && p.jumps <= 20)) out.push("bad number line");
      if (p.dotAt !== undefined && !(whole(p.dotAt) && p.dotAt <= p.jumps)) out.push("dot off the line");
      break;
    case "column_graph":
    case "dot_plot":
      if (p.columns.length < 2 || p.columns.length > 6) out.push("needs 2 to 6 columns");
      break;
    case "picture_graph":
      if (p.rows.some((r) => !whole(r.count) || r.count > 10)) out.push("rows need 0 to 10 pictures");
      break;
    case "ruler":
      if (!(p.cm >= 1 && p.cm <= 15 && p.length > 0 && p.length <= p.cm)) out.push("object longer than ruler");
      break;
    case "spinner":
      if (p.sections.length < 2 || p.sections.length > 12) out.push("needs 2 to 12 sections");
      break;
    case "bag":
      if (p.counters.reduce((s, c) => s + c.count, 0) > 24) out.push("too many counters to draw");
      break;
    case "array":
      if (!(p.rows >= 1 && p.rows <= 10 && p.columns >= 1 && p.columns <= 12)) out.push("array too big");
      break;
    case "blocks":
      if (!(p.hundreds <= 9 && p.tens <= 9 && p.ones <= 9)) out.push("too many blocks");
      break;
  }
  return out;
}
