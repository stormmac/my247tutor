/**
 * Year 6 Mathematics (measurement and geometry), second set: another 15 questions for each Stage 3
 * standard (NESA outcome) in maths-year6b.ts, three at each level from very easy to very hard.
 * These are later Stage 3 questions, a step harder than Year 5 on the same outcomes.
 * Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-GM-02: length, distance and perimeter, converting km, m, cm and mm with decimals. */
export const LENGTH = levels(6050116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "How many millimetres are in 1 metre?",
        ["1000", "100", "10", "10 000"],
        0,
        "1 metre is 100 cm and each centimetre is 10 mm, so 1 metre is 100 × 10 = 1000 mm.",
      ),
    (n) => trueFalse(n, "1.2 km is longer than 1100 m.", true, "1.2 km is 1.2 × 1000 = 1200 m, and 1200 m is longer than 1100 m."),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the thickness of a $1 coin?",
        ["millimetres", "centimetres", "metres", "kilometres"],
        0,
        "A coin is very thin, only a few millimetres thick, so millimetres are the best unit.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "4.2 cm = ___ mm", ["42", "42 mm"], "There are 10 mm in 1 cm, so 4.2 × 10 = 42 mm."),
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 13, object: "pencil" },
        typed(
          "short_answer",
          n,
          "Look at the pencil on the ruler. How long is it in metres?",
          ["0.13", ".13", "0.13 m"],
          "The pencil reaches the 13 cm mark. There are 100 cm in a metre, so 13 cm = 13 ÷ 100 = 0.13 m.",
        ),
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 5, top: "9.5 cm", side: "5.5 cm" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. What is its perimeter?",
          ["30", "30 cm"],
          "Add all four sides: 9.5 + 5.5 + 9.5 + 5.5 = 30 cm.",
        ),
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "1450 m = ___ km", ["1.45", "1.45 km"], "There are 1000 m in 1 km, so 1450 ÷ 1000 = 1.45 km."),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["0.07 m", "8 cm", "95 mm", "0.1 m"],
        "Change them all to millimetres: 0.07 m = 70 mm, 8 cm = 80 mm, 95 mm and 0.1 m = 100 mm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [9, 4],
            [5, 4],
            [5, 7],
            [0, 7],
          ],
          sideLabels: ["9 cm", "4 cm", "4 cm", "3 cm", "5 cm", "7 cm"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles. What is its perimeter?",
          ["32", "32 cm"],
          "Add every side: 9 + 4 + 4 + 3 + 5 + 7 = 32 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular paddock is 0.4 km long and 150 m wide. What is its perimeter, in metres?",
        ["1100", "1100 m"],
        "0.4 km is 400 m. The perimeter is 400 + 150 + 400 + 150 = 1100 m.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 2.4 km? Choose all that are right.",
        ["2400 m", "240 000 cm", "24 000 cm", "2 400 000 mm", "240 m"],
        [0, 1, 3],
        "2.4 km × 1000 = 2400 m. 2400 m × 100 = 240 000 cm, and 2400 m × 1000 = 2 400 000 mm. 24 000 cm is only 240 m.",
      ),
    (n) =>
      choice(
        n,
        "Jo walks 650 m to the bus stop, rides 3.8 km on the bus, then walks 450 m to school. How far does she travel altogether?",
        ["4.9 km", "4.09 km", "5.9 km", "1.48 km"],
        0,
        "Change to metres: 650 + 3800 + 450 = 4900 m, which is 4.9 km.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [10, 6],
            [7, 6],
            [7, 3],
            [3, 3],
            [3, 6],
            [0, 6],
          ],
          sideLabels: ["10 m", "6 m", "3 m", "", "", "", "3 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles, and the gap cut into the top is 3 m deep. What is its perimeter?",
          ["38", "38 m"],
          "The gap is 10 − 3 − 3 = 4 m wide, and both of its sides are 3 m. So 10 + 6 + 3 + 3 + 4 + 3 + 3 + 6 = 38 m.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular swimming pool is 25 m long and 850 cm wide. What is its perimeter in metres?",
        ["67", "67 m"],
        "850 cm = 8.5 m. The perimeter is 25 + 8.5 + 25 + 8.5 = 67 m.",
      ),
    (n) =>
      trueFalse(
        n,
        "A 2.5 km bike track is 50 times as long as a 50 m pool.",
        true,
        "2.5 km = 2500 m, and 2500 ÷ 50 = 50. So the track is 50 times as long.",
      ),
  ],
});

/** MA3-2DS-02: area of rectangles and composite shapes, in cm², m² and hectares. */
export const AREA = levels(6050216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 7, height: 5, top: "7 m", side: "5 m" },
        choice(
          n,
          "Look at the rectangle. What is its area?",
          ["35 m²", "24 m²", "12 m²", "35 m"],
          0,
          "Area of a rectangle = length × width = 7 × 5 = 35 m². 24 m is the perimeter, and area needs square units.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A square with sides of 1 m has an area of 1 m².",
        true,
        "1 m × 1 m = 1 m². That is exactly what one square metre means.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [7, 1],
            [7, 3],
            [4, 3],
            [4, 6],
            [2, 6],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the shape?",
          ["16", "16 cm²"],
          "Split it into two rectangles: the bottom part is 5 × 2 = 10 squares and the top part is 2 × 3 = 6 squares. 10 + 6 = 16 cm².",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "3 hectares = ___ m²",
        ["30 000", "30000"],
        "1 hectare is 10 000 m², so 3 hectares is 3 × 10 000 = 30 000 m².",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 4, top: "9 m", side: "4.5 m" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. What is its area?",
          ["40.5", "40.5 m²"],
          "Area = length × width = 9 × 4.5 = 36 + 4.5 = 40.5 m².",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the area of a postage stamp?",
        ["square centimetres", "square metres", "hectares", "centimetres"],
        0,
        "A stamp is small, so square centimetres are best. Centimetres alone measure length, not area.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [10, 4],
            [6, 4],
            [6, 8],
            [0, 8],
          ],
          sideLabels: ["10 m", "4 m", "4 m", "4 m", "6 m", "8 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles. What is its area?",
          ["64", "64 m²"],
          "Split it into two rectangles. The bottom one is 10 × 4 = 40 m². The top one is 6 × 4 = 24 m². 40 + 24 = 64 m².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular rug has an area of 72 m² and a length of 9 m. How wide is it?",
        ["8", "8 m"],
        "Length × width = area, so width = 72 ÷ 9 = 8 m.",
      ),
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 48 cm²? Choose all that are right.",
        ["6 cm × 8 cm", "4 cm × 12 cm", "10 cm × 14 cm", "16 cm × 3 cm", "7 cm × 7 cm"],
        [0, 1, 3],
        "6 × 8, 4 × 12 and 16 × 3 all make 48. 10 × 14 = 140 (its perimeter is 48, not its area) and 7 × 7 = 49.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A park is 500 m long and 300 m wide. What is its area in hectares?",
        ["15", "15 ha", "15 hectares"],
        "500 × 300 = 150 000 m². Each hectare is 10 000 m², so 150 000 ÷ 10 000 = 15 hectares.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 4],
            [0, 7],
            [9, 7],
            [9, 4],
            [6, 4],
            [6, 0],
            [3, 0],
            [3, 4],
          ],
          sideLabels: ["3 m", "9 m", "3 m", "3 m", "4 m", "3 m", "4 m", "3 m"],
        },
        choice(
          n,
          "Look at the T shape. All its corners are right angles. What is its area?",
          ["39 m²", "63 m²", "36 m²", "45 m²"],
          0,
          "The top bar is 9 × 3 = 27 m². The stem is 3 m wide and 4 m tall: 3 × 4 = 12 m². 27 + 12 = 39 m². (63 m² is the whole 9 by 7 box, gaps and all.)",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two rectangles with the same perimeter always have the same area.",
        false,
        "A 1 m × 5 m rectangle and a 3 m × 3 m square both have a perimeter of 12 m, but their areas are 5 m² and 9 m².",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A classroom floor is 9 m by 7 m. A 3 m by 2 m storeroom in one corner is tiled, and the rest of the floor is carpeted. Carpet costs $35 per square metre. How much does the carpet cost?",
        ["1995", "$1995"],
        "Whole floor: 9 × 7 = 63 m². Storeroom: 3 × 2 = 6 m². Carpet: 63 − 6 = 57 m². Cost: 57 × $35 = $1995.",
      ),
    (n) =>
      choice(
        n,
        "A square has an area of 64 m². What is its perimeter?",
        ["32 m", "16 m", "64 m", "256 m"],
        0,
        "8 × 8 = 64, so each side is 8 m. The perimeter is 4 × 8 = 32 m.",
      ),
    (n) =>
      ordering(
        n,
        "Put these areas in order from smallest to largest.",
        ["5000 m²", "0.75 hectares", "1.2 hectares", "15 000 m²", "2 hectares"],
        "Change them all to m²: 5000, 0.75 ha = 7500, 1.2 ha = 12 000, 15 000 and 2 ha = 20 000 m².",
      ),
  ],
});

/** MA3-2DS-03: area of parallelograms and triangles by combining, splitting and rearranging. */
export const AREA_TRI = levels(6050316, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [9, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "This triangle is half of a rectangle. Each square is 1 cm². What is the area of the triangle?",
          ["16", "16 cm²"],
          "The rectangle around it is 8 × 4 = 32 cm². The triangle is half of that: 32 ÷ 2 = 16 cm².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "To find the area of a parallelogram, multiply the base by the slanting side.",
        false,
        "You multiply the base by the perpendicular height, measured straight up at a right angle to the base, not along the slanting side.",
      ),
    (n) =>
      choice(
        n,
        "A rectangle has an area of 30 cm². What is the area of a triangle with the same base and height?",
        ["15 cm²", "30 cm²", "60 cm²", "10 cm²"],
        0,
        "A triangle is half of the rectangle with the same base and height, so 30 ÷ 2 = 15 cm².",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [7, 1],
            [9, 6],
            [3, 6],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the parallelogram. Each square is 1 cm². What is its area?",
          ["30", "30 cm²"],
          "The base is 6 squares and the perpendicular height is 5 squares. Area = 6 × 5 = 30 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with a base of 8 cm and a perpendicular height of 5 cm has an area of ___ cm².",
        ["20", "20 cm²"],
        "Area = ½ × base × height = ½ × 8 × 5 = 20 cm².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [3, 7],
          ],
          sideLabels: ["8 m"],
        },
        choice(
          n,
          "The base of this triangle is 8 m and its perpendicular height is 6 m. What is its area?",
          ["24 m²", "48 m²", "14 m²", "28 m²"],
          0,
          "Area = ½ × base × height = ½ × 8 × 6 = 24 m². 48 m² forgets to halve.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A parallelogram has a base of 9 cm and a perpendicular height of 7 cm. What is its area?",
        ["63", "63 cm²"],
        "Area of a parallelogram = base × perpendicular height = 9 × 7 = 63 cm².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [8, 1],
            [11, 7],
          ],
          grid: true,
        },
        choice(
          n,
          "Each square is 1 m². What is the area of the triangle?",
          ["18 m²", "36 m²", "12 m²", "27 m²"],
          0,
          "The base is 6 squares long. The height is measured straight up from the base line to the top corner: 6 squares. Area = ½ × 6 × 6 = 18 m².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two triangles with the same base and the same perpendicular height always have the same area, even if they look different.",
        true,
        "The area only depends on ½ × base × height. If those are the same, the areas are the same, however the top corner leans.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A parallelogram has an area of 56 m² and a base of 8 m. What is its perpendicular height?",
        ["7", "7 m"],
        "Base × height = area, so 8 × height = 56 and the height is 56 ÷ 8 = 7 m.",
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have an area of 24 cm²? Choose all that are right.",
        [
          "a triangle with base 8 cm and height 6 cm",
          "a parallelogram with base 6 cm and height 4 cm",
          "a triangle with base 12 cm and height 2 cm",
          "a parallelogram with base 12 cm and height 2 cm",
          "a triangle with base 6 cm and height 4 cm",
        ],
        [0, 1, 3],
        "½ × 8 × 6 = 24, 6 × 4 = 24 and 12 × 2 = 24. The triangles with base 12, height 2 and base 6, height 4 are only 12 cm².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [11, 5],
            [0, 5],
          ],
          sideLabels: ["8 m", "", "11 m", "5 m"],
        },
        typed(
          "short_answer",
          n,
          "This shape is an 8 m by 5 m rectangle with a right-angled triangle joined to its side. What is the area of the whole shape?",
          ["47.5", "47.5 m²"],
          "Rectangle: 8 × 5 = 40 m². The triangle has a base of 11 − 8 = 3 m and a height of 5 m, so ½ × 3 × 5 = 7.5 m². 40 + 7.5 = 47.5 m².",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A triangle has a base of 12 cm and a perpendicular height of 5 cm. A parallelogram has the same area and a base of 6 cm. What is the parallelogram's height?",
        ["5 cm", "10 cm", "2.5 cm", "15 cm"],
        0,
        "The triangle is ½ × 12 × 5 = 30 cm². For the parallelogram, 6 × height = 30, so the height is 5 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [10, 3],
            [6, 6],
            [0, 6],
          ],
          sideLabels: ["10 m", "3 m", "", "6 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "This shape is a 10 m by 6 m rectangle with a triangle cut off one corner. What is its area?",
          ["54", "54 m²"],
          "The rectangle is 10 × 6 = 60 m². The cut-off triangle is 10 − 6 = 4 m across and 6 − 3 = 3 m high, so ½ × 4 × 3 = 6 m². 60 − 6 = 54 m².",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest area to largest.",
        [
          "parallelogram: base 3 cm, height 4 cm",
          "triangle: base 8 cm, height 4 cm",
          "triangle: base 5 cm, height 8 cm",
          "parallelogram: base 7 cm, height 3 cm",
        ],
        "Work out each area: 3 × 4 = 12, ½ × 8 × 4 = 16, ½ × 5 × 8 = 20 and 7 × 3 = 21 cm².",
      ),
  ],
});

/** MA3-3DS-02: volume and capacity in cm³, m³, mL and L (1 cm³ = 1 mL). */
export const VOLUME = levels(6050416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 3, height: 2 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of the block?",
          ["18", "18 cm³"],
          "Each layer is 3 × 3 = 9 cubes, and there are 2 layers. 9 × 2 = 18 cm³.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "1 litre is the same amount as 1000 cm³.",
        true,
        "1 L is 1000 mL, and each millilitre takes up 1 cm³, so 1 L = 1000 cm³.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 400, step: 100, unit: "mL" },
        choice(
          n,
          "How many litres of water are in the jug?",
          ["0.4 L", "4 L", "40 L", "0.04 L"],
          0,
          "The water is at 400 mL. There are 1000 mL in a litre, so 400 ÷ 1000 = 0.4 L.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 2, height: 2 },
        choice(
          n,
          "Each small cube is 1 cm³. What is the volume of the block?",
          ["20 cm³", "9 cm³", "24 cm³", "10 cm³"],
          0,
          "Volume = length × width × height = 5 × 2 × 2 = 20 cm³.",
        ),
      ),
    (n) => typed("fill_blank", n, "750 mL = ___ L", ["0.75", ".75", "0.75 L"], "There are 1000 mL in 1 L, so 750 ÷ 1000 = 0.75 L."),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring a dose of cough medicine?",
        ["millilitres (mL)", "litres (L)", "cubic metres (m³)", "kilograms (kg)"],
        0,
        "A dose of medicine is a small amount of liquid, so millilitres are best. Kilograms measure mass.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A shoebox is 12 cm long, 5 cm wide and 4 cm high. What is its volume?",
        ["240", "240 cm³"],
        "Volume = 12 × 5 × 4 = 60 × 4 = 240 cm³.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 6, width: 4, height: 2 },
        typed(
          "short_answer",
          n,
          "A container is the same size as this block, and each small cube is 1 cm³. How many millilitres of water would fill it?",
          ["48", "48 mL"],
          "The volume is 6 × 4 × 2 = 48 cm³. Since 1 cm³ holds 1 mL, the container holds 48 mL.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from smallest to largest.",
        ["0.2 L", "350 cm³", "400 mL", "0.45 L", "1 L"],
        "Change them all to mL: 0.2 L = 200 mL, 350 cm³ = 350 mL, 400 mL, 0.45 L = 450 mL and 1 L = 1000 mL.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "An aquarium is 60 cm long, 25 cm wide and 30 cm high. How many litres of water does it hold when full?",
        ["45", "45 L"],
        "Volume = 60 × 25 × 30 = 45 000 cm³ = 45 000 mL. There are 1000 mL in a litre, so it holds 45 L.",
      ),
    (n) =>
      multi(
        n,
        "Which of these rectangular prisms have a volume of 60 cm³? Choose all that are right.",
        ["4 cm × 4 cm × 4 cm", "5 cm × 4 cm × 3 cm", "12 cm × 5 cm × 2 cm", "6 cm × 5 cm × 2 cm", "10 cm × 3 cm × 2 cm"],
        [1, 3, 4],
        "5 × 4 × 3, 6 × 5 × 2 and 10 × 3 × 2 all make 60. 4 × 4 × 4 = 64 and 12 × 5 × 2 = 120.",
      ),
    (n) =>
      choice(
        n,
        "A cube-shaped container has edges of 10 cm. How many litres of water does it hold?",
        ["1 L", "10 L", "100 L", "0.1 L"],
        0,
        "Volume = 10 × 10 × 10 = 1000 cm³, which is 1000 mL. 1000 mL = 1 L.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. How many more cubes are needed to turn it into a cube that is 4 cubes long, 4 wide and 4 high?",
          ["40"],
          "The block has 4 × 3 × 2 = 24 cubes. A 4 by 4 by 4 cube needs 4 × 4 × 4 = 64 cubes. 64 − 24 = 40 more.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular prism has a volume of 480 cm³. It is 12 cm long and 8 cm wide. How high is it?",
        ["5", "5 cm"],
        "The bottom layer is 12 × 8 = 96 cm³. 480 ÷ 96 = 5, so it is 5 cm high.",
      ),
    (n) =>
      choice(
        n,
        "A 1.5 L jug of cordial is poured into glasses that each hold 200 mL. How many glasses can be filled right to the top?",
        ["7", "8", "7.5", "6"],
        0,
        "1.5 L = 1500 mL. 7 × 200 = 1400 mL, and the 100 mL left is not enough to fill an 8th glass. So 7 glasses.",
      ),
  ],
});

/** MA3-NSM-01: mass in grams, kilograms and tonnes. */
export const MASS = levels(6050516, {
  very_easy: [
    (n) =>
      choice(
        n,
        "How many grams are in 1 kilogram?",
        ["1000", "100", "10", "10 000"],
        0,
        "Kilo means one thousand, so 1 kilogram is 1000 grams.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 3, value: 2.5, step: 0.5, unit: "kg" },
        choice(
          n,
          "What mass does the scale show?",
          ["2.5 kg", "2.05 kg", "25 kg", "3.5 kg"],
          0,
          "The pointer is halfway between 2 and 3, so it shows 2.5 kg.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The mass of a grape is best measured in grams.",
        true,
        "A grape is very light, only a few grams, so grams are the best unit.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1.75 kg = ___ g", ["1750", "1750 g"], "There are 1000 g in 1 kg, so 1.75 × 1000 = 1750 g."),
    (n) =>
      pic(
        { kind: "scale", max: 2000, value: 1250, step: 250, unit: "g" },
        typed(
          "short_answer",
          n,
          "Look at the scale. What is this mass in kilograms?",
          ["1.25", "1.25 kg"],
          "The scale shows 1250 g. Divide by 1000 to change grams to kilograms: 1250 ÷ 1000 = 1.25 kg.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the mass of an adult wombat?",
        ["30 kg", "30 g", "3 t", "300 kg"],
        0,
        "A wombat is about as heavy as a Year 6 student, so about 30 kg. 30 g is a mouse, and 3 t is as heavy as a car or two.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these masses in order from lightest to heaviest.",
        ["450 g", "0.5 kg", "0.65 kg", "700 g", "1.2 kg"],
        "Change them all to grams: 450 g, 0.5 kg = 500 g, 0.65 kg = 650 g, 700 g and 1.2 kg = 1200 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "4 bags of flour each have a mass of 1.25 kg. What is their total mass in kilograms?",
        ["5", "5 kg"],
        "4 × 1.25 = 4 × 1 + 4 × 0.25 = 4 + 1 = 5 kg.",
      ),
    (n) => typed("fill_blank", n, "4500 kg = ___ t", ["4.5", "4.5 t"], "There are 1000 kg in 1 tonne, so 4500 ÷ 1000 = 4.5 t."),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 3, value: 2.4, step: 0.2, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows 6 tins of tomatoes that all have the same mass. What is the mass of one tin, in grams?",
          ["400", "400 g"],
          "The scale shows 2.4 kg, which is 2400 g. 2400 ÷ 6 = 400 g.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same as 2.25 kg? Choose all that are right.",
        ["2250 g", "2 kg 250 g", "225 g", "0.00225 t", "22 500 g"],
        [0, 1, 3],
        "2.25 × 1000 = 2250 g, which is 2 kg and 250 g. In tonnes, 2.25 ÷ 1000 = 0.00225 t.",
      ),
    (n) =>
      choice(
        n,
        "A lift can safely carry 800 kg. People with a total mass of 410 kg are already inside. Which group can still get in safely?",
        ["6 people of 60 kg", "5 people of 80 kg", "4 people of 100 kg", "2 people of 90 kg and a 250 kg crate"],
        0,
        "800 − 410 = 390 kg is left. 6 × 60 = 360 kg fits. 400 kg, 400 kg and 180 + 250 = 430 kg are all too much.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "An empty truck has a mass of 5.8 t. It is loaded with 80 bags of cement that each have a mass of 40 kg. What is the total mass, in tonnes?",
        ["9", "9 t"],
        "80 × 40 = 3200 kg, which is 3.2 t. 5.8 + 3.2 = 9 t.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 4.5, step: 0.5, unit: "kg" },
        trueFalse(
          n,
          "The scale shows a box of 30 oranges. On average, each orange has a mass of more than 160 g.",
          false,
          "The scale shows 4.5 kg, which is 4500 g. 4500 ÷ 30 = 150 g, which is less than 160 g.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A wheelbarrow can carry at most 80 kg. A gardener needs to move 1.3 t of soil. What is the smallest number of trips she can make?",
        ["17", "17 trips"],
        "1.3 t = 1300 kg. 16 trips carry 16 × 80 = 1280 kg, which leaves 20 kg. That needs one more trip, so 17 trips.",
      ),
  ],
});

/** MA3-NSM-02: 12- and 24-hour time, timetables and time zones across Australia. */
export const TIME = levels(6050616, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is 7:15 pm in 24-hour time?",
        ["19:15", "07:15", "17:15", "21:15"],
        0,
        "For pm times after midday, add 12 to the hour: 7 + 12 = 19, so 19:15.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 25 },
        choice(
          n,
          "The clock shows a time in the afternoon. What is it in 24-hour time?",
          ["16:25", "04:25", "14:25", "16:05"],
          0,
          "The clock shows 4:25. In the afternoon that is 4:25 pm, and 4 + 12 = 16, so 16:25.",
        ),
      ),
    (n) => trueFalse(n, "12:00 in 24-hour time is midday.", true, "In 24-hour time 00:00 is midnight and 12:00 is midday (noon)."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many minutes are there from 10:35 to 12:05?",
        ["90", "90 minutes"],
        "10:35 to 11:00 is 25 minutes, 11:00 to 12:00 is 60 minutes, and 12:00 to 12:05 is 5 minutes. 25 + 60 + 5 = 90 minutes.",
      ),
    (n) => typed("fill_blank", n, "In 12-hour time, 21:50 is ___ pm.", ["9:50", "9:50 pm", "9:50pm"], "21 − 12 = 9, so 21:50 is 9:50 pm."),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Wharf", "Ferry departs"],
          rows: [
            ["Circular Quay", "09:10"],
            ["Kirribilli", "09:18"],
            ["Neutral Bay", "09:29"],
            ["Mosman Bay", "09:47"],
          ],
        },
        choice(
          n,
          "Look at the ferry timetable. How long does the ferry take to go from Circular Quay to Mosman Bay?",
          ["37 minutes", "47 minutes", "33 minutes", "27 minutes"],
          0,
          "09:10 to 09:47 is 47 − 10 = 37 minutes.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Wharf", "Ferry departs"],
          rows: [
            ["Circular Quay", "09:10"],
            ["Kirribilli", "09:18"],
            ["Neutral Bay", "09:29"],
            ["Mosman Bay", "09:47"],
          ],
        },
        trueFalse(
          n,
          "Look at the timetable. The ferry takes longer from Kirribilli to Neutral Bay than from Neutral Bay to Mosman Bay.",
          false,
          "Kirribilli to Neutral Bay is 09:18 to 09:29, which is 11 minutes. Neutral Bay to Mosman Bay is 09:29 to 09:47, which is 18 minutes. So the second part is longer.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A concert starts at 18:50 and runs for 2 hours 55 minutes. What time does it finish, in 24-hour time?",
        ["21:45"],
        "18:50 plus 2 hours is 20:50. Add 55 more minutes: 10 minutes gets to 21:00, and 45 more gives 21:45.",
      ),
    (n) =>
      ordering(
        n,
        "Put these times in order from earliest to latest in the same day.",
        ["00:40", "5:30 am", "11:55 am", "12:20", "3:10 pm", "20:05"],
        "Change them all to 24-hour time: 00:40, 05:30, 11:55, 12:20, 15:10 and 20:05.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "It is not daylight saving time. Adelaide is half an hour behind Sydney. When it is 9:00 am in Sydney, what time is it in Adelaide?",
        ["8:30 am", "9:30 am", "7:00 am", "8:00 am"],
        0,
        "Adelaide is behind, so take away half an hour: 9:00 am − 30 minutes = 8:30 am.",
      ),
    (n) =>
      multi(
        n,
        "In summer, some states move their clocks forward one hour for daylight saving. Which of these do? Choose all that are right.",
        ["Victoria", "Queensland", "South Australia", "Western Australia", "Tasmania"],
        [0, 2, 4],
        "NSW, the ACT, Victoria, South Australia and Tasmania use daylight saving. Queensland, Western Australia and the Northern Territory do not.",
      ),
    (n) =>
      choice(
        n,
        "A train leaves Central at 07:38 and arrives in Newcastle at 10:16. How long is the trip?",
        ["2 h 38 min", "3 h 22 min", "2 h 22 min", "3 h 38 min"],
        0,
        "07:38 to 09:38 is 2 hours. 09:38 to 10:16 is 22 + 16 = 38 minutes. So 2 h 38 min.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "It is not daylight saving time, and Perth is 2 hours behind Sydney. A plane leaves Perth at 9:15 am Perth time and flies for 4 hours 20 minutes to Sydney. What is the time in Sydney when it lands?",
        ["3:35 pm", "3:35pm", "3:35", "15:35"],
        "9:15 am + 4 h 20 min = 1:35 pm Perth time. Sydney is 2 hours ahead, so it is 3:35 pm in Sydney.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Bus leaves Penrith", "Bus arrives Parramatta"],
          rows: [
            ["07:05", "07:52"],
            ["07:35", "08:29"],
            ["08:10", "08:58"],
            ["08:45", "09:29"],
          ],
        },
        choice(
          n,
          "Look at the bus timetable. Which bus has the longest trip?",
          ["the 07:35 bus", "the 07:05 bus", "the 08:10 bus", "the 08:45 bus"],
          0,
          "The trips take 47 min (07:05), 54 min (07:35), 48 min (08:10) and 44 min (08:45). The 07:35 bus takes longest.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "It is not daylight saving time, and Perth is 2 hours behind Brisbane. A footy match in Brisbane starts at 7:30 pm Brisbane time. To watch the start live, a fan in Perth should turn on the TV at 5:30 pm Perth time.",
        true,
        "Perth clocks show a time 2 hours earlier than Brisbane clocks. 7:30 pm − 2 hours = 5:30 pm in Perth.",
      ),
  ],
});

/** MA3-2DS-01: classifying triangles and quadrilaterals by their properties. */
export const SHAPES_2D = levels(6030216, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [10, 1],
            [6, 7],
          ],
          sideLabels: ["8 cm", "7.2 cm", "7.2 cm"],
        },
        choice(
          n,
          "Look at the triangle. What is the best name for it?",
          ["isosceles", "equilateral", "scalene", "right-angled"],
          0,
          "Two sides are 7.2 cm and one is 8 cm. A triangle with two equal sides is isosceles.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every rectangle is a parallelogram.",
        true,
        "A parallelogram has two pairs of parallel sides. A rectangle has that too, so it is a special parallelogram with right angles.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [6, 1],
            [9, 5],
            [4, 5],
          ],
          sideLabels: ["5 cm", "5 cm", "5 cm", "5 cm"],
        },
        choice(
          n,
          "What is this quadrilateral called?",
          ["rhombus", "trapezium", "kite", "rectangle"],
          0,
          "All four sides are 5 cm, opposite sides are parallel, and the angles are not right angles. That makes it a rhombus.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [1, 7],
          ],
          sideLabels: ["8 cm", "10 cm", "6 cm"],
        },
        multi(
          n,
          "Which words describe this triangle? Choose all that are right.",
          ["right-angled", "scalene", "isosceles", "equilateral", "obtuse-angled"],
          [0, 1],
          "The corner at the bottom left is a right angle, so it is right-angled. The sides are 6, 8 and 10 cm, all different, so it is scalene.",
        ),
      ),
    (n) =>
      choice(
        n,
        "How many pairs of parallel sides does a trapezium have?",
        ["1", "2", "0", "4"],
        0,
        "A trapezium has exactly one pair of parallel sides.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with all three sides different lengths is called a ___ triangle.",
        ["scalene"],
        "Scalene triangles have no equal sides and no equal angles.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [10, 1],
            [10, 6],
            [1, 6],
          ],
        },
        multi(
          n,
          "Look at this rectangle. Which of these are true? Choose all that are right.",
          [
            "All four angles are right angles",
            "Its two diagonals are equal in length",
            "All four sides are equal",
            "Opposite sides are parallel",
          ],
          [0, 1, 3],
          "A rectangle has four right angles, equal diagonals and opposite sides parallel. This one is longer than it is tall, so its sides are not all equal.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle can have two obtuse angles.",
        false,
        "Each obtuse angle is more than 90°, so two of them would add to more than 180°. But all three angles of a triangle add to exactly 180°.",
      ),
    (n) =>
      choice(
        n,
        "Which of these describes a kite?",
        [
          "two pairs of equal sides that are next to each other",
          "two pairs of parallel sides",
          "four right angles",
          "exactly one pair of parallel sides",
        ],
        0,
        "A kite has two pairs of equal sides, and each pair sits side by side (not opposite each other).",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [6, 1],
            [9, 4.5],
            [6, 8],
            [3, 4.5],
          ],
        },
        typed(
          "short_answer",
          n,
          "This shape is a rhombus. How many lines of symmetry does it have?",
          ["2", "two"],
          "A rhombus has 2 lines of symmetry: one through the top and bottom corners, and one through the left and right corners.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shape names in order from the most general to the most special.",
        ["quadrilateral", "parallelogram", "rhombus", "square"],
        "Every square is a rhombus, every rhombus is a parallelogram, and every parallelogram is a quadrilateral.",
      ),
    (n) =>
      choice(
        n,
        "A quadrilateral's diagonals cross at right angles and cut each other in half, but they are not equal in length. What is it?",
        ["rhombus", "square", "rectangle", "trapezium"],
        0,
        "Diagonals that cut each other in half at right angles make a rhombus. If they were also equal it would be a square, and a rectangle's diagonals don't cross at right angles.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are always true? Choose all that are right.",
        [
          "A square's diagonals are equal in length",
          "Every parallelogram is a rectangle",
          "A rhombus's diagonals cross at right angles",
          "A trapezium has two pairs of parallel sides",
          "Every rectangle has four lines of symmetry",
        ],
        [0, 2],
        "A square is a rectangle, so its diagonals are equal, and a rhombus's diagonals always cross at right angles. Most parallelograms have no right angles, a trapezium has only one pair of parallel sides, and a rectangle that isn't a square has only 2 lines of symmetry.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3.45, 1],
            [8.55, 1],
            [6, 8],
          ],
          cornerLabels: ["", "", "40°"],
        },
        typed(
          "short_answer",
          n,
          "This isosceles triangle has a 40° angle at the top. The two angles at the bottom are equal. How big is each of them?",
          ["70", "70°"],
          "The angles add to 180°. 180 − 40 = 140° is left for the two bottom angles. They are equal, so 140 ÷ 2 = 70° each.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A triangle has angles of 25° and 60°. Is it acute-angled, right-angled or obtuse-angled?",
        ["obtuse-angled", "obtuse angled", "obtuse"],
        "The third angle is 180 − 25 − 60 = 95°. That is more than 90°, so the triangle is obtuse-angled.",
      ),
  ],
});

/** MA3-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(6030316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        choice(
          n,
          "What is this object called?",
          ["triangular pyramid", "triangular prism", "square pyramid", "cone"],
          0,
          "It has a triangle base and three triangle faces that meet at a point, so it is a triangular pyramid.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many edges does this rectangular prism have?",
          ["12", "twelve"],
          "It has 4 edges around the top, 4 around the bottom and 4 going up the sides: 4 + 4 + 4 = 12.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A pyramid has one base, and all its other faces are triangles that meet at a point.",
        true,
        "That is what makes a pyramid: one base, with triangles rising from each side to meet at the top.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 4,
          rows: 3,
          cells: [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [0, 2],
            [3, 0],
          ],
        },
        trueFalse(
          n,
          "These six shaded squares make a net that folds into a cube.",
          true,
          "The row of four wraps around the sides. One square above the row folds down to make the top and one square below folds up to make the bottom, so it closes up into a cube.",
        ),
      ),
    (n) =>
      choice(
        n,
        "How many vertices (corners) does a rectangular prism have?",
        ["8", "6", "12", "4"],
        0,
        "It has 4 corners on the top face and 4 on the bottom face: 4 + 4 = 8.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many faces does this triangular prism have?",
          ["5", "five"],
          "It has 2 triangle ends and 3 rectangles around the sides: 2 + 3 = 5 faces.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 3,
          cells: [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [2, 2],
          ],
        },
        trueFalse(
          n,
          "These six shaded squares make a net that folds into a cube.",
          false,
          "Only four faces fit around the sides of a cube. A row of five squares wraps around and the fifth square overlaps the first, leaving a face open.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 1 hexagon and 6 triangles. What object does it fold into?",
        ["hexagonal pyramid", "hexagonal prism", "triangular prism", "pentagonal pyramid"],
        0,
        "One hexagon base with a triangle on each of its 6 sides folds into a hexagonal pyramid.",
      ),
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest edges to most edges.",
        ["triangular pyramid", "square pyramid", "triangular prism", "rectangular prism", "pentagonal prism"],
        "A triangular pyramid has 6 edges, a square pyramid 8, a triangular prism 9, a rectangular prism 12 and a pentagonal prism 15.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these objects have exactly 8 faces? Choose all that are right.",
        ["hexagonal prism", "pyramid with a 7-sided base", "pyramid with an 8-sided base", "cube", "pentagonal prism"],
        [0, 1],
        "A hexagonal prism has 2 + 6 = 8 faces and a pyramid with a 7-sided base has 1 + 7 = 8. The 8-sided pyramid has 9, a cube 6 and a pentagonal prism 7.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A prism has a base with 7 sides. How many vertices does it have?",
        ["14", "fourteen"],
        "Each of the two 7-sided ends has 7 corners, and there are no other corners. 7 + 7 = 14 vertices.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 4,
          rows: 3,
          cells: [
            [0, 2],
            [1, 2],
            [1, 1],
            [2, 1],
            [2, 0],
            [3, 0],
          ],
        },
        choice(
          n,
          "Can these six shaded squares fold into a cube?",
          ["Yes, it makes a cube", "No, two squares would overlap", "No, it has too few squares", "No, a cube net needs a row of four"],
          0,
          "This staircase shape is one of the 11 nets of a cube. Fold each step down and the six squares close up with no gaps or overlaps. A net does not need a row of four.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A pyramid has 12 edges. How many faces does it have?",
        ["7", "seven"],
        "A pyramid has 2 edges for every side of its base (one around the base, one up to the top). 12 ÷ 2 = 6, so it is a hexagonal pyramid with 1 + 6 = 7 faces.",
      ),
    (n) =>
      choice(
        n,
        "Which object has 6 faces, 10 edges and 6 vertices?",
        ["pentagonal pyramid", "pentagonal prism", "cube", "hexagonal pyramid"],
        0,
        "A pentagonal pyramid has 1 pentagon and 5 triangles (6 faces), 5 + 5 = 10 edges and 5 + 1 = 6 vertices. A cube has 6 faces but 12 edges and 8 vertices.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "Imagine slicing straight across this square pyramid, parallel to its base. What 2D shape is the cut face?",
          ["square", "a square"],
          "A slice parallel to the base of a pyramid is the same shape as the base, only smaller. The base is a square, so the cut face is a square.",
        ),
      ),
  ],
});

/** MA3-GM-03: measuring angles, angles on a straight line, at a point, vertically opposite and in a triangle. */
export const ANGLES = levels(6030116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 40 },
        choice(
          n,
          "What type of angle is this?",
          ["acute", "obtuse", "right", "reflex"],
          0,
          "It is smaller than a right angle (90°), so it is acute.",
        ),
      ),
    (n) => trueFalse(n, "A full turn is 360°.", true, "Turning all the way around back to where you started is 360°."),
    (n) =>
      pic(
        { kind: "angle", degrees: 150 },
        choice(
          n,
          "Which is the best estimate for the size of this angle?",
          ["150°", "30°", "90°", "210°"],
          0,
          "It is bigger than a right angle but smaller than a straight line, so it is obtuse. It is close to a straight line, so 150° fits best. 210° would be reflex.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 65, label: "65°" },
        typed(
          "short_answer",
          n,
          "This 65° angle and another angle sit together on a straight line. How big is the other angle?",
          ["115", "115°"],
          "Angles on a straight line add to 180°, so 180 − 65 = 115°.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 180 },
        choice(
          n,
          "What type of angle is this?",
          ["straight", "reflex", "obtuse", "right"],
          0,
          "The two arms make one straight line. That is a straight angle, exactly 180°.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Two right angles side by side make a ___ angle.",
        ["straight", "180°", "180"],
        "90° + 90° = 180°, which is a straight angle.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Four angles meet at a point. Three of them are 90°, 75° and 110°. How big is the fourth angle?",
        ["85", "85°"],
        "Angles at a point add to 360°. 90 + 75 + 110 = 275, and 360 − 275 = 85°.",
      ),
    (n) =>
      trueFalse(
        n,
        "If two equal angles sit together on a straight line, each one is a right angle.",
        true,
        "They add to 180°, and 180 ÷ 2 = 90°, so each one is a right angle.",
      ),
    (n) =>
      ordering(
        n,
        "Put these angles in order from smallest to largest.",
        ["one third of a right angle", "a right angle", "a straight angle", "three quarters of a full turn", "a full turn"],
        "Change them to degrees: 90 ÷ 3 = 30°, 90°, 180°, 3/4 of 360 = 270°, and 360°.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two angles of a triangle are 64° and 58°. How big is the third angle?",
        ["58", "58°"],
        "The angles in a triangle add to 180°. 64 + 58 = 122, and 180 − 122 = 58°.",
      ),
    (n) =>
      choice(
        n,
        "Two straight lines cross. One of the four angles is 115°. What are the other three angles, going around?",
        ["65°, 115°, 65°", "115°, 115°, 115°", "65°, 65°, 65°", "25°, 115°, 25°"],
        0,
        "The angles next to 115° are on a straight line with it, so 180 − 115 = 65°. The opposite angle is equal, 115°.",
      ),
    (n) =>
      multi(
        n,
        "Which sets of angles could be the three angles of a triangle? Choose all that are right.",
        ["70°, 70°, 40°", "90°, 60°, 30°", "110°, 50°, 30°", "45°, 45°, 100°", "20°, 20°, 140°"],
        [0, 1, 4],
        "The three angles must add to exactly 180°. 110 + 50 + 30 = 190 and 45 + 45 + 100 = 190, so those two can't work.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "angle", degrees: 50, label: "50°" },
        typed(
          "short_answer",
          n,
          "This 50° angle is the top angle of an isosceles triangle. The other two angles are equal. How big is each of them?",
          ["65", "65°"],
          "180 − 50 = 130° is left for the other two angles. They are equal, so 130 ÷ 2 = 65° each.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Two angles sit together on a straight line. One is 4 times as big as the other. How big is the smaller angle?",
        ["36°", "45°", "20°", "144°"],
        0,
        "Together they make 1 + 4 = 5 lots of the smaller angle, and that is 180°. 180 ÷ 5 = 36°. (The bigger one is 144°.)",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 38, label: "38°" },
        typed(
          "short_answer",
          n,
          "Three angles meet at a point: this 38° angle, a straight angle and one more. How big is the last angle?",
          ["142", "142°"],
          "Angles at a point add to 360°. A straight angle is 180°. 360 − 180 − 38 = 142°.",
        ),
      ),
  ],
});

/** MA3-GM-01: locating and describing points on the coordinate plane, in all four quadrants. */
export const COORDINATES = levels(6030416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 6, axes: true, points: [{ x: 1, y: 5, label: "B" }] },
        choice(
          n,
          "What are the coordinates of point B?",
          ["(1, 5)", "(5, 1)", "(1, 1)", "(5, 5)"],
          0,
          "Go across first, then up. B is 1 across and 5 up, so it is (1, 5).",
        ),
      ),
    (n) => trueFalse(n, "The origin has the coordinates (0, 0).", true, "The origin is where the axes cross, 0 across and 0 up."),
    (n) =>
      pic(
        { kind: "number_line", from: -6, to: 4, jumps: 10, dotAt: 1, labelEvery: true },
        choice(n, "What number is the dot on?", ["−5", "5", "−4", "−6"], 0, "The dot is 5 steps to the left of 0, so it is on −5."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 6,
          axes: true,
          points: [
            { x: 2, y: 4, label: "K" },
            { x: 4, y: 2, label: "L" },
            { x: 5, y: 5, label: "M" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Which point is at (4, 2)?",
          ["L"],
          "Go 4 across and 2 up. That is point L. (Point K is at (2, 4), the numbers the other way round.)",
        ),
      ),
    (n) =>
      choice(
        n,
        "The point (3, −4) is in which quadrant?",
        ["fourth", "first", "second", "third"],
        0,
        "x is positive (right) and y is negative (down). Right and down is the fourth quadrant, the bottom right.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The axis that runs across the page, left to right, is called the ___-axis.",
        ["x"],
        "The x-axis runs across (horizontal) and the y-axis runs up and down (vertical).",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 6,
          axes: true,
          points: [
            { x: 1, y: 2, label: "P" },
            { x: 7, y: 2, label: "Q" },
          ],
        },
        typed(
          "short_answer",
          n,
          "What are the coordinates of the point exactly halfway between P and Q?",
          ["(4, 2)", "(4,2)", "4, 2", "4,2"],
          "P is at (1, 2) and Q is at (7, 2). They are 6 units apart, so halfway is 3 units from P: x = 1 + 3 = 4. y stays 2, so (4, 2).",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these points have a negative y-coordinate? Choose all that are right.",
        ["(2, −3)", "(−4, 1)", "(−1, −6)", "(5, 0)", "(0, −2)"],
        [0, 2, 4],
        "The y-coordinate is the second number. It is negative in (2, −3), (−1, −6) and (0, −2).",
      ),
    (n) =>
      trueFalse(
        n,
        "The point (−3, 0) lies on the y-axis.",
        false,
        "Its y-coordinate is 0, so it doesn't move up or down. It sits on the x-axis, 3 to the left of the origin.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Start at (−4, 1). Move 6 units right and then 5 units down. Where do you finish?",
        ["(2, −4)", "(−10, 6)", "(2, 6)", "(−4, −4)"],
        0,
        "Right changes x: −4 + 6 = 2. Down changes y: 1 − 5 = −4. You finish at (2, −4).",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 10,
          rows: 8,
          axes: true,
          points: [
            { x: 2, y: 6, label: "A" },
            { x: 2, y: 1, label: "B" },
            { x: 9, y: 1, label: "C" },
          ],
        },
        typed(
          "short_answer",
          n,
          "A, B and C are three corners of a rectangle. What is the perimeter of the rectangle, in grid units?",
          ["24", "24 units"],
          "A to B is 6 − 1 = 5 units, and B to C is 9 − 2 = 7 units. The perimeter is 5 + 7 + 5 + 7 = 24 units.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these points in order from bottom to top on the coordinate plane.",
        ["(4, −5)", "(−2, −1)", "(6, 0)", "(−7, 3)", "(1, 8)"],
        "Bottom to top depends only on the y-coordinate (the second number): −5, −1, 0, 3, 8.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A square has three corners at (−2, −1), (3, −1) and (3, 4). Where is the fourth corner?",
        ["(−2, 4)", "(4, −2)", "(−1, 4)", "(−2, −4)"],
        0,
        "The fourth corner is above (−2, −1) and level with (3, 4). So x = −2 and y = 4: (−2, 4). Each side is 5 units.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many units apart are the points (2, −5) and (2, 3)?",
        ["8", "8 units"],
        "Both points have x = 2, so count up: from −5 to 0 is 5 units and from 0 to 3 is 3 units. 5 + 3 = 8 units.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 5, axes: true, points: [{ x: 3, y: 4, label: "R" }] },
        choice(
          n,
          "Point R is reflected (flipped) across the x-axis. Where does it land?",
          ["(3, −4)", "(−3, 4)", "(−3, −4)", "(4, 3)"],
          0,
          "R is at (3, 4). Flipping across the x-axis moves it the same distance below the axis, so y becomes −4 and x stays 3: (3, −4).",
        ),
      ),
  ],
});
