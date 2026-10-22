/**
 * Line drawings for the Learn to Read stories, for children to colour in. Each drawing is a set of
 * shapes a child taps to fill with a colour, plus fixed details (eyes, mouths) that stay as drawn.
 * Built from a few simple figures so every story can have its own scene. Drawn in a 320 × 220 box.
 */

export type Shape =
  | { el: "circle"; cx: number; cy: number; r: number }
  | { el: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { el: "rect"; x: number; y: number; width: number; height: number; rx?: number }
  | { el: "polygon"; points: string }
  | { el: "path"; d: string };

export interface Region {
  id: string;
  shape: Shape;
  /** A detail that isn't coloured in: "ink" is filled black, "line" is an outline only. */
  fixed?: "ink" | "line";
}

export const PICTURE_WIDTH = 320;
export const PICTURE_HEIGHT = 220;

const circle = (id: string, cx: number, cy: number, r: number, fixed?: Region["fixed"]): Region => ({
  id,
  shape: { el: "circle", cx, cy, r },
  fixed,
});
const ellipse = (id: string, cx: number, cy: number, rx: number, ry: number): Region => ({ id, shape: { el: "ellipse", cx, cy, rx, ry } });
const rect = (id: string, x: number, y: number, width: number, height: number, rx = 0): Region => ({
  id,
  shape: { el: "rect", x, y, width, height, rx },
});
const poly = (id: string, points: [number, number][]): Region => ({
  id,
  shape: { el: "polygon", points: points.map((p) => p.join(",")).join(" ") },
});
const path = (id: string, d: string, fixed?: Region["fixed"]): Region => ({ id, shape: { el: "path", d }, fixed });
const eye = (id: string, x: number, y: number, r = 2) => circle(id, x, y, r, "ink");
const smile = (id: string, x: number, y: number, w = 5) => path(id, `M${x - w},${y} Q${x},${y + w} ${x + w},${y}`, "line");

// ---------- Scenery ----------

export const sky = (): Region[] => [rect("sky", 0, 0, PICTURE_WIDTH, PICTURE_HEIGHT)];
export const ground = (y = 185, id = "ground"): Region[] => [rect(id, 0, y, PICTURE_WIDTH, PICTURE_HEIGHT - y)];

export function sun(x: number, y: number, r = 18): Region[] {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const p = (d: number, off: number): [number, number] => [Math.round(x + Math.cos(a + off) * d), Math.round(y + Math.sin(a + off) * d)];
    return poly(`sun-ray-${i}`, [p(r + 4, -0.18), p(r + 14, 0), p(r + 4, 0.18)]);
  });
  return [...rays, circle("sun", x, y, r)];
}

export function cloud(id: string, x: number, y: number): Region[] {
  return [path(id, `M${x},${y} a12,12 0 0,1 8,-20 a16,16 0 0,1 30,-6 a13,13 0 0,1 22,10 a10,10 0 0,1 -2,16 z`)];
}

export function rain(x: number, y: number, count = 6): Region[] {
  return Array.from({ length: count }, (_, i) => {
    const dx = x + i * 14;
    const dy = y + (i % 2) * 12;
    return path(`rain-${i}`, `M${dx},${dy} q4,8 0,10 q-4,-2 0,-10 z`);
  });
}

export function tree(id: string, x: number, y: number): Region[] {
  return [rect(`${id}-trunk`, x - 7, y - 45, 14, 45), circle(`${id}-leaves`, x, y - 62, 28)];
}

export function hill(id: string, x: number, y: number, w: number, h: number): Region[] {
  return [path(id, `M${x},${y} Q${x + w / 2},${y - h * 2} ${x + w},${y} z`)];
}

export const pond = (x: number, y: number, rx = 40, ry = 12) => [ellipse("pond", x, y, rx, ry)];

export function house(x: number, y: number): Region[] {
  return [
    rect("house-wall", x, y - 60, 70, 60),
    poly("house-roof", [
      [x - 8, y - 60],
      [x + 35, y - 95],
      [x + 78, y - 60],
    ]),
    rect("house-door", x + 27, y - 30, 16, 30),
    rect("house-window", x + 8, y - 48, 14, 12),
    rect("house-window-2", x + 48, y - 48, 14, 12),
  ];
}

export function star(id: string, x: number, y: number, r = 10): Region[] {
  const pts = Array.from({ length: 10 }, (_, i): [number, number] => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const d = i % 2 ? r * 0.45 : r;
    return [Math.round(x + Math.cos(a) * d), Math.round(y + Math.sin(a) * d)];
  });
  return [poly(id, pts)];
}

export function moon(x: number, y: number): Region[] {
  return [path("moon", `M${x},${y - 16} a16,16 0 1,0 12,28 a12,12 0 1,1 -12,-28 z`)];
}

export function lightning(x: number, y: number): Region[] {
  return [
    poly("lightning", [
      [x, y],
      [x + 10, y],
      [x + 4, y + 14],
      [x + 12, y + 14],
      [x - 2, y + 36],
      [x + 2, y + 20],
      [x - 6, y + 20],
    ]),
  ];
}

// ---------- People ----------

/** A child or grown-up standing, feet at y. */
export function person(id: string, x: number, y: number, tall = 1): Region[] {
  const h = 70 * tall;
  const head = y - h;
  return [
    rect(`${id}-leg-1`, x - 10, y - 22 * tall, 8, 22 * tall),
    rect(`${id}-leg-2`, x + 2, y - 22 * tall, 8, 22 * tall),
    poly(`${id}-body`, [
      [x - 13, head + 14],
      [x + 13, head + 14],
      [x + 17, y - 20 * tall],
      [x - 17, y - 20 * tall],
    ]),
    rect(`${id}-arm-1`, x - 22, head + 16, 8, 26 * tall, 4),
    rect(`${id}-arm-2`, x + 14, head + 16, 8, 26 * tall, 4),
    circle(`${id}-head`, x, head + 2, 12),
    path(`${id}-hair`, `M${x - 12},${head} a12,12 0 0,1 24,0 q-12,-6 -24,0 z`),
    eye(`${id}-eye-1`, x - 4, head + 2),
    eye(`${id}-eye-2`, x + 4, head + 2),
    smile(`${id}-mouth`, x, head + 7, 4),
  ];
}

/** Someone sitting on the ground, facing right, with their legs out in front. */
export function sitter(id: string, x: number, y: number): Region[] {
  return [
    rect(`${id}-legs`, x, y - 10, 34, 10, 4),
    poly(`${id}-body`, [
      [x - 10, y - 46],
      [x + 10, y - 46],
      [x + 14, y - 8],
      [x - 14, y - 8],
    ]),
    rect(`${id}-arm`, x + 4, y - 42, 8, 24, 4),
    circle(`${id}-head`, x, y - 58, 12),
    path(`${id}-hair`, `M${x - 12},${y - 60} a12,12 0 0,1 24,0 q-12,-6 -24,0 z`),
    eye(`${id}-eye`, x + 5, y - 58),
    smile(`${id}-mouth`, x + 4, y - 53, 3),
  ];
}

export function crown(x: number, y: number): Region[] {
  return [
    poly("crown", [
      [x - 13, y],
      [x - 13, y - 14],
      [x - 6, y - 6],
      [x, y - 16],
      [x + 6, y - 6],
      [x + 13, y - 14],
      [x + 13, y],
    ]),
  ];
}

export function hat(id: string, x: number, y: number): Region[] {
  return [rect(`${id}-brim`, x - 16, y - 4, 32, 5, 2), rect(`${id}-top`, x - 10, y - 20, 20, 17, 2)];
}

// ---------- Animals (standing on y, facing right) ----------

export function cat(id: string, x: number, y: number): Region[] {
  return [
    path(`${id}-tail`, `M${x - 26},${y - 20} q-20,-10 -14,-34 q4,0 4,4 q-4,18 12,24 z`),
    rect(`${id}-leg-1`, x - 18, y - 12, 7, 12),
    rect(`${id}-leg-2`, x + 10, y - 12, 7, 12),
    ellipse(`${id}-body`, x, y - 20, 28, 14),
    poly(`${id}-ear-1`, [
      [x + 20, y - 44],
      [x + 22, y - 58],
      [x + 30, y - 46],
    ]),
    poly(`${id}-ear-2`, [
      [x + 34, y - 46],
      [x + 42, y - 58],
      [x + 44, y - 44],
    ]),
    circle(`${id}-head`, x + 32, y - 36, 13),
    eye(`${id}-eye-1`, x + 28, y - 38),
    eye(`${id}-eye-2`, x + 37, y - 38),
    smile(`${id}-mouth`, x + 32, y - 31, 3),
  ];
}

export function dog(id: string, x: number, y: number): Region[] {
  return [
    path(`${id}-tail`, `M${x - 28},${y - 26} q-14,-14 -6,-24 q4,2 2,6 q-2,8 10,14 z`),
    rect(`${id}-leg-1`, x - 20, y - 14, 8, 14),
    rect(`${id}-leg-2`, x + 12, y - 14, 8, 14),
    ellipse(`${id}-body`, x, y - 24, 30, 15),
    circle(`${id}-head`, x + 34, y - 40, 14),
    ellipse(`${id}-ear`, x + 26, y - 38, 6, 12),
    ellipse(`${id}-nose`, x + 47, y - 39, 4, 3),
    eye(`${id}-eye`, x + 37, y - 44),
    smile(`${id}-mouth`, x + 40, y - 33, 3),
  ];
}

export function duck(id: string, x: number, y: number): Region[] {
  return [
    ellipse(`${id}-body`, x, y - 14, 24, 14),
    path(`${id}-wing`, `M${x - 12},${y - 18} q12,-10 22,2 q-10,8 -22,-2 z`),
    circle(`${id}-head`, x + 20, y - 34, 11),
    poly(`${id}-beak`, [
      [x + 29, y - 36],
      [x + 42, y - 33],
      [x + 29, y - 29],
    ]),
    eye(`${id}-eye`, x + 22, y - 37),
  ];
}

export function hen(id: string, x: number, y: number): Region[] {
  return [
    rect(`${id}-leg-1`, x - 6, y - 10, 3, 10),
    rect(`${id}-leg-2`, x + 4, y - 10, 3, 10),
    ellipse(`${id}-body`, x, y - 26, 22, 17),
    path(`${id}-tail`, `M${x - 20},${y - 32} l-10,-14 l6,16 z`),
    circle(`${id}-head`, x + 18, y - 46, 10),
    poly(`${id}-comb`, [
      [x + 12, y - 54],
      [x + 15, y - 62],
      [x + 19, y - 55],
      [x + 23, y - 62],
      [x + 25, y - 53],
    ]),
    poly(`${id}-beak`, [
      [x + 27, y - 48],
      [x + 35, y - 45],
      [x + 27, y - 42],
    ]),
    eye(`${id}-eye`, x + 20, y - 48),
  ];
}

export function fourLegs(id: string, x: number, y: number, w: number): Region[] {
  return [
    rect(`${id}-leg-1`, x - w + 6, y - 18, 7, 18),
    rect(`${id}-leg-2`, x - w + 18, y - 18, 7, 18),
    rect(`${id}-leg-3`, x + w - 24, y - 18, 7, 18),
    rect(`${id}-leg-4`, x + w - 12, y - 18, 7, 18),
  ];
}

export function goat(id: string, x: number, y: number): Region[] {
  return [
    ...fourLegs(id, x, y, 26),
    ellipse(`${id}-body`, x, y - 28, 28, 14),
    path(`${id}-horn`, `M${x + 28},${y - 52} q4,-14 14,-14 q-8,4 -8,16 z`),
    ellipse(`${id}-head`, x + 34, y - 42, 10, 13),
    poly(`${id}-beard`, [
      [x + 32, y - 30],
      [x + 40, y - 30],
      [x + 36, y - 20],
    ]),
    eye(`${id}-eye`, x + 37, y - 46),
  ];
}

export function sheep(id: string, x: number, y: number): Region[] {
  const wool = Array.from({ length: 7 }, (_, i) => circle(`${id}-wool-${i}`, x - 24 + i * 8, y - 30 + (i % 2) * 8, 11));
  return [...fourLegs(id, x, y, 24), ...wool, ellipse(`${id}-head`, x + 34, y - 36, 10, 12), eye(`${id}-eye`, x + 37, y - 39)];
}

export function cow(id: string, x: number, y: number): Region[] {
  return [
    ...fourLegs(id, x, y, 32),
    rect(`${id}-body`, x - 34, y - 48, 68, 32, 12),
    ellipse(`${id}-spot-1`, x - 12, y - 36, 9, 7),
    ellipse(`${id}-spot-2`, x + 14, y - 30, 7, 6),
    poly(`${id}-horn`, [
      [x + 34, y - 62],
      [x + 30, y - 72],
      [x + 40, y - 64],
    ]),
    ellipse(`${id}-head`, x + 42, y - 50, 13, 15),
    ellipse(`${id}-nose`, x + 44, y - 40, 9, 6),
    eye(`${id}-eye`, x + 45, y - 56),
  ];
}

export function owl(id: string, x: number, y: number): Region[] {
  return [
    ellipse(`${id}-body`, x, y - 26, 18, 26),
    ellipse(`${id}-wing-1`, x - 15, y - 24, 6, 15),
    ellipse(`${id}-wing-2`, x + 15, y - 24, 6, 15),
    circle(`${id}-eye-ring-1`, x - 7, y - 38, 7),
    circle(`${id}-eye-ring-2`, x + 7, y - 38, 7),
    eye(`${id}-eye-1`, x - 7, y - 38, 3),
    eye(`${id}-eye-2`, x + 7, y - 38, 3),
    poly(`${id}-beak`, [
      [x - 3, y - 32],
      [x + 3, y - 32],
      [x, y - 26],
    ]),
    poly(`${id}-ear-1`, [
      [x - 16, y - 46],
      [x - 14, y - 58],
      [x - 6, y - 50],
    ]),
    poly(`${id}-ear-2`, [
      [x + 16, y - 46],
      [x + 14, y - 58],
      [x + 6, y - 50],
    ]),
  ];
}

export function fox(id: string, x: number, y: number): Region[] {
  return [
    ellipse(`${id}-tail`, x - 34, y - 26, 16, 7),
    rect(`${id}-leg-1`, x - 16, y - 12, 6, 12),
    rect(`${id}-leg-2`, x + 10, y - 12, 6, 12),
    ellipse(`${id}-body`, x, y - 22, 24, 12),
    poly(`${id}-head`, [
      [x + 18, y - 44],
      [x + 40, y - 44],
      [x + 46, y - 30],
      [x + 24, y - 26],
    ]),
    poly(`${id}-ear-1`, [
      [x + 20, y - 44],
      [x + 22, y - 56],
      [x + 28, y - 44],
    ]),
    poly(`${id}-ear-2`, [
      [x + 32, y - 44],
      [x + 36, y - 56],
      [x + 40, y - 44],
    ]),
    eye(`${id}-eye`, x + 34, y - 38),
  ];
}

export function fish(id: string, x: number, y: number): Region[] {
  return [
    poly(`${id}-tail`, [
      [x - 18, y],
      [x - 30, y - 9],
      [x - 30, y + 9],
    ]),
    ellipse(`${id}-body`, x, y, 20, 11),
    eye(`${id}-eye`, x + 10, y - 3),
  ];
}

export function snake(x: number, y: number): Region[] {
  const parts = Array.from({ length: 6 }, (_, i) => ellipse(`snake-${i}`, x + i * 13, y - 8 + (i % 2) * 6, 9, 6));
  return [
    ...parts,
    ellipse("snake-head", x + 82, y - 10, 10, 7),
    eye("snake-eye", x + 86, y - 12),
    path("snake-tongue", `M${x + 92},${y - 9} l8,0 l3,-3 M${x + 100},${y - 9} l3,3`, "line"),
  ];
}

export function pup(id: string, x: number, y: number): Region[] {
  return [
    rect(`${id}-leg-1`, x - 12, y - 10, 6, 10),
    rect(`${id}-leg-2`, x + 8, y - 10, 6, 10),
    ellipse(`${id}-body`, x, y - 16, 18, 10),
    circle(`${id}-head`, x + 20, y - 28, 10),
    ellipse(`${id}-ear`, x + 14, y - 26, 4, 8),
    eye(`${id}-eye`, x + 23, y - 31),
  ];
}

// ---------- Things ----------

export function tap(x: number, y: number): Region[] {
  return [
    rect("tap-pipe", x, y, 40, 10, 3),
    rect("tap-spout", x + 30, y + 10, 10, 14),
    rect("tap-handle", x + 10, y - 12, 16, 8, 3),
    path("tap-drop", `M${x + 35},${y + 30} q5,8 0,10 q-5,-2 0,-10 z`),
    path("tap-drop-2", `M${x + 35},${y + 46} q5,8 0,10 q-5,-2 0,-10 z`),
  ];
}

export function mat(x: number, y: number, w = 70): Region[] {
  return [rect("mat", x, y - 6, w, 8, 2)];
}

export function cap(x: number, y: number): Region[] {
  return [path("cap", `M${x - 12},${y} a12,10 0 0,1 24,0 z`), rect("cap-peak", x + 8, y - 3, 14, 4, 2)];
}

export function bus(x: number, y: number): Region[] {
  return [
    rect("bus", x, y - 60, 130, 48, 10),
    ...[0, 1, 2, 3].map((i) => rect(`bus-window-${i}`, x + 8 + i * 30, y - 52, 22, 18, 3)),
    rect("bus-door", x + 112, y - 52, 12, 34, 2),
    circle("bus-wheel-1", x + 28, y - 10, 11),
    circle("bus-wheel-2", x + 102, y - 10, 11),
  ];
}

export function van(x: number, y: number): Region[] {
  return [
    path("van", `M${x},${y - 14} v-40 h70 l22,18 v22 z`),
    rect("van-window", x + 72, y - 50, 14, 14, 2),
    circle("van-wheel-1", x + 18, y - 10, 10),
    circle("van-wheel-2", x + 74, y - 10, 10),
  ];
}

export function car(x: number, y: number): Region[] {
  return [
    path("car", `M${x},${y - 14} v-18 l18,-4 l12,-14 h40 l14,16 l16,4 v16 z`),
    rect("car-window", x + 34, y - 46, 30, 12, 2),
    circle("car-wheel-1", x + 20, y - 12, 10),
    circle("car-wheel-2", x + 80, y - 12, 10),
  ];
}

export function boat(x: number, y: number): Region[] {
  return [
    rect("boat-mast", x + 20, y - 80, 4, 62),
    poly("boat-sail", [
      [x + 26, y - 78],
      [x + 62, y - 22],
      [x + 26, y - 22],
    ]),
    path("boat", `M${x},${y - 18} h220 l-18,22 h-184 z`),
  ];
}

export function bike(x: number, y: number): Region[] {
  return [
    circle("bike-wheel-1", x, y - 16, 16),
    circle("bike-wheel-2", x + 54, y - 16, 16),
    poly("bike-frame", [
      [x, y - 16],
      [x + 22, y - 40],
      [x + 50, y - 40],
      [x + 54, y - 16],
      [x + 26, y - 16],
    ]),
    rect("bike-seat", x + 14, y - 46, 16, 5, 2),
  ];
}

export function box(x: number, y: number): Region[] {
  return [
    rect("box", x, y - 40, 56, 40),
    poly("box-flap-1", [
      [x, y - 40],
      [x - 14, y - 54],
      [x + 22, y - 54],
      [x + 28, y - 40],
    ]),
    poly("box-flap-2", [
      [x + 28, y - 40],
      [x + 34, y - 54],
      [x + 70, y - 54],
      [x + 56, y - 40],
    ]),
  ];
}

export function cake(x: number, y: number): Region[] {
  return [
    rect("plate", x - 6, y - 4, 72, 5, 2),
    rect("cake", x, y - 30, 60, 26, 4),
    path("cake-icing", `M${x},${y - 30} h60 v8 q-7,6 -15,0 q-7,6 -15,0 q-7,6 -15,0 q-8,6 -15,0 z`),
    rect("candle", x + 27, y - 46, 6, 16),
    path("flame", `M${x + 30},${y - 58} q6,7 0,11 q-6,-4 0,-11 z`),
  ];
}

export function chair(x: number, y: number): Region[] {
  return [rect("chair-back", x, y - 70, 8, 70), rect("chair-seat", x, y - 36, 44, 8), rect("chair-leg", x + 36, y - 28, 8, 28)];
}

export function gate(x: number, y: number): Region[] {
  return [
    rect("gate-post-1", x, y - 56, 8, 56),
    rect("gate-post-2", x + 72, y - 56, 8, 56),
    ...[0, 1, 2, 3].map((i) => rect(`gate-bar-${i}`, x + 14 + i * 16, y - 50, 6, 46)),
    rect("gate-rail", x + 8, y - 40, 64, 6),
  ];
}

export function dish(x: number, y: number): Region[] {
  return [path("dish", `M${x - 34},${y - 30} h68 q-6,30 -34,30 q-28,0 -34,-30 z`), ellipse("water", x, y - 30, 34, 6)];
}

export function chips(x: number, y: number): Region[] {
  return [
    ...[0, 1, 2, 3, 4].map((i) => rect(`chip-${i}`, x + 3 + i * 7, y - 46 + (i % 2) * 6, 5, 26, 2)),
    poly("chip-box", [
      [x, y - 28],
      [x + 40, y - 28],
      [x + 34, y],
      [x + 6, y],
    ]),
  ];
}

export function bun(x: number, y: number): Region[] {
  return [ellipse("bun", x, y - 8, 22, 9), path("jam", `M${x - 14},${y - 14} q14,-8 28,0 q-4,10 -6,2 q-4,8 -8,0 q-6,8 -14,-2 z`)];
}

export function coin(x: number, y: number): Region[] {
  return [circle("coin", x, y, 8), circle("coin-middle", x, y, 4)];
}

export function bee(id: string, x: number, y: number): Region[] {
  return [
    ellipse(`${id}-wing`, x - 2, y - 9, 6, 5),
    ellipse(`${id}-body`, x, y, 9, 6),
    rect(`${id}-stripe`, x - 2, y - 6, 3, 12),
    eye(`${id}-eye`, x + 5, y - 1, 1.5),
  ];
}
