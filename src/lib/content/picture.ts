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
  | { kind: "blocks"; hundreds: number; tens: number; ones: number }
  /** An angle between two arms, with one arm flat. Right angles get a square mark. `label` is written inside the angle. */
  | { kind: "angle"; degrees: number; label?: string }
  /**
   * Any straight-sided shape, from its corner points on a grid where x runs 0–12 and y runs 0–8
   * (y counts up). Optional labels for each side (side i joins corner i to corner i + 1) and
   * each corner. `grid` draws the squares behind it, for area questions.
   */
  | { kind: "shape"; points: [number, number][]; sideLabels?: string[]; cornerLabels?: string[]; grid?: boolean }
  /**
   * A grid of squares. `axes` numbers the lines from 0 for coordinates (points sit on line
   * crossings); `map` letters the columns and numbers the rows (points sit in squares, like a
   * street map). `cells` shades squares, counted from the bottom left from 0. `path` draws a route.
   */
  | {
      kind: "grid";
      columns: number;
      rows: number;
      axes?: boolean;
      map?: boolean;
      points?: { x: number; y: number; label: string }[];
      cells?: [number, number][];
      path?: [number, number][];
    }
  /** A line graph. */
  | { kind: "line_graph"; title: string; points: { label: string; value: number }[]; step?: number }
  /** A kitchen scale with a dial, pointing at `value`. */
  | { kind: "scale"; max: number; value: number; step: number; unit: "g" | "kg" }
  /** A measuring jug filled to `value`. */
  | { kind: "jug"; max: number; value: number; step: number; unit: "mL" | "L" }
  /** A 3D object. */
  | { kind: "solid"; shape: Solid }
  /** A rectangular prism built from unit cubes. */
  | { kind: "cubes"; length: number; width: number; height: number };

export const SOLIDS = [
  "cube",
  "rectangular_prism",
  "triangular_prism",
  "square_pyramid",
  "triangular_pyramid",
  "cylinder",
  "cone",
  "sphere",
] as const;
export type Solid = (typeof SOLIDS)[number];

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
    case "angle":
      return `An angle${p.label ? ` marked ${p.label}` : ""}.`;
    case "shape":
      return `A ${p.points.length}-sided shape${p.sideLabels?.length ? ` with sides marked ${p.sideLabels.filter(Boolean).join(", ")}` : ""}.`;
    case "grid":
      return `A grid ${p.columns} squares wide and ${p.rows} high${p.points?.length ? `, with ${p.points.map((q) => q.label).join(", ")} marked` : ""}${p.cells?.length ? `, with ${plural(p.cells.length, "square")} shaded` : ""}.`;
    case "line_graph":
      return `Line graph, ${p.title}: ${p.points.map((q) => `${q.label} ${q.value}`).join(", ")}.`;
    case "scale":
      return `A kitchen scale marked in ${p.unit} up to ${p.max}.`;
    case "jug":
      return `A measuring jug marked in ${p.unit} up to ${p.max}, with some water in it.`;
    case "solid":
      return `A ${p.shape.replace(/_/g, " ")}.`;
    case "cubes":
      return `A block made of small cubes, ${p.length} long, ${p.width} wide and ${p.height} high.`;
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
    case "angle":
      if (!(p.degrees > 0 && p.degrees <= 360)) out.push("angle out of range");
      break;
    case "shape":
      if (p.points.length < 3) out.push("shape needs 3 or more corners");
      if (p.points.some(([x, y]) => !(x >= 0 && x <= 12 && y >= 0 && y <= 8))) out.push("corner off the 12 × 8 grid");
      if (p.sideLabels && p.sideLabels.length > p.points.length) out.push("more side labels than sides");
      break;
    case "grid":
      if (!(p.columns >= 1 && p.columns <= 12 && p.rows >= 1 && p.rows <= 10)) out.push("grid too big");
      if (p.axes && p.map) out.push("grid can't be both axes and map");
      for (const q of p.points ?? [])
        if (!(q.x >= 0 && q.y >= 0 && (p.map ? q.x < p.columns && q.y < p.rows : q.x <= p.columns && q.y <= p.rows)))
          out.push(`point ${q.label} off the grid`);
      for (const [x, y] of p.cells ?? []) if (!(x >= 0 && y >= 0 && x < p.columns && y < p.rows)) out.push("cell off the grid");
      break;
    case "line_graph":
      if (p.points.length < 2 || p.points.length > 8) out.push("needs 2 to 8 points");
      break;
    case "scale":
    case "jug":
      if (!(
        p.value >= 0 &&
        p.value <= p.max &&
        p.step > 0 &&
        p.max / p.step <= 20 &&
        Number.isInteger(Math.round((p.max / p.step) * 1e6) / 1e6)
      ))
        out.push("bad scale");
      break;
    case "cubes":
      if (![p.length, p.width, p.height].every((n) => whole(n) && n >= 1 && n <= 6)) out.push("cubes need 1 to 6 each way");
      break;
  }
  return out;
}
