/**
 * Year 5 Mathematics (measurement and space): 15 questions for each Stage 3 standard (NESA outcome),
 * three at each level from very easy to very hard. Year 5 works at the early Stage 3 level; Year 6
 * covers the same outcomes at a harder level. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-GM-02: length and distance in km, m, cm and mm, and perimeter. */
export const LENGTH = levels(5050101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the distance from Sydney to Newcastle?",
        ["millimetres", "centimetres", "metres", "kilometres"],
        3,
        "Sydney to Newcastle is a long way, more than 100 km, so kilometres are the best unit.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 9, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "How many centimetres long is the ribbon?",
          ["9", "9 cm"],
          "The ribbon starts at 0 and ends at 9, so it is 9 cm long.",
        ),
      ),
    (n) => trueFalse(n, "1 kilometre is the same as 1000 metres.", true, "Kilo means one thousand, so 1 kilometre is 1000 metres."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "3 km = ___ m", "3000", "Each kilometre is 1000 m, so 3 km is 3 × 1000 = 3000 m."),
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 5, top: "8 cm", side: "5 cm" },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this rectangle in centimetres?",
          ["26", "26 cm"],
          "Perimeter is the distance all the way around: 8 + 5 + 8 + 5 = 26 cm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which device is best for measuring the length of the school oval?",
        ["a 30 cm ruler", "a trundle wheel", "a kitchen scale", "a measuring jug"],
        1,
        "A trundle wheel clicks every metre as you walk, so it is good for long distances like an oval. A ruler is too short.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 12.5, object: "pencil" },
        typed(
          "short_answer",
          n,
          "How many millimetres long is the pencil?",
          ["125", "125 mm"],
          "The pencil ends halfway between 12 and 13, so it is 12.5 cm. Each centimetre is 10 mm, so 12.5 cm is 125 mm.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these distances in order from shortest to longest.",
        ["950 m", "1.2 km", "1500 m", "2 km"],
        "Change them all to metres: 950 m, 1.2 km = 1200 m, 1500 m, 2 km = 2000 m.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [3, 5],
          ],
          sideLabels: ["8 cm", "7 cm", "6 cm"],
        },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this triangle in centimetres?",
          ["21", "21 cm"],
          "Add the three sides: 8 + 7 + 6 = 21 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these are the same as 2.5 km? Choose all that are right.",
        ["2500 m", "2 km 500 m", "250 m", "2 km 50 m"],
        [0, 1],
        "0.5 km is half of 1000 m, which is 500 m. So 2.5 km is 2 km 500 m, or 2500 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular paddock is 120 m long and 75 m wide. How many metres of fencing are needed to go all the way around it?",
        ["390", "390 m"],
        "Add one length and one width: 120 + 75 = 195 m. Double it for the other two sides: 195 × 2 = 390 m.",
      ),
    (n) =>
      choice(
        n,
        "Which length is the same as 4.6 m?",
        ["46 cm", "460 cm", "4600 cm", "406 cm"],
        1,
        "4 m is 400 cm and 0.6 m is 60 cm, so 4.6 m is 460 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 2],
            [3, 2],
            [3, 5],
            [0, 5],
          ],
          sideLabels: ["6 m", "2 m", "", "", "3 m", "5 m"],
        },
        typed(
          "short_answer",
          n,
          "Two sides of this garden bed are not marked. What is its perimeter in metres?",
          ["22", "22 m"],
          "The unmarked flat side is 6 − 3 = 3 m. The unmarked upright side is 5 − 2 = 3 m. Perimeter: 6 + 2 + 3 + 3 + 3 + 5 = 22 m.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has the same perimeter as a rectangle that is 10 cm long and 6 cm wide. How long is each side of the square, in centimetres?",
        ["8", "8 cm"],
        "The rectangle's perimeter is 10 + 6 + 10 + 6 = 32 cm. A square has 4 equal sides, so each is 32 ÷ 4 = 8 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella walks 750 m to school and 750 m home again each day, Monday to Friday. How many kilometres does she walk in the school week?",
        ["7.5", "7.5 km"],
        "Each day she walks 750 + 750 = 1500 m. In 5 days that is 1500 × 5 = 7500 m, which is 7.5 km.",
      ),
  ],
});

/** MA3-2DS-02: area in cm² and m², including rectangles. */
export const AREA = levels(5050201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 4,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [0, 2],
            [1, 2],
            [2, 2],
            [3, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the shaded rectangle?",
          ["12", "12 cm²", "12 cm2", "12 square centimetres"],
          "There are 3 rows of 4 shaded squares. 3 × 4 = 12, so the area is 12 cm².",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a classroom floor?",
        ["square centimetres", "square metres", "metres", "kilograms"],
        1,
        "A classroom floor is big, so square metres (m²) are best. Metres measure length, not area.",
      ),
    (n) =>
      trueFalse(
        n,
        "Area measures how much flat surface a shape covers.",
        true,
        "Area is the amount of surface inside a shape, like how much carpet covers a floor.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 7, height: 4, top: "7 cm", side: "4 cm" },
        typed(
          "short_answer",
          n,
          "What is the area of this rectangle?",
          ["28", "28 cm²", "28 cm2", "28 square centimetres"],
          "Area of a rectangle = length × width = 7 × 4 = 28 cm².",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [0, 2],
            [1, 2],
          ],
        },
        choice(
          n,
          "Each small square is 1 cm². What is the area of the shaded shape?",
          ["10 cm²", "12 cm²", "8 cm²", "14 cm²"],
          0,
          "Count the shaded squares: 4 in the bottom row, 4 in the next row and 2 on top. 4 + 4 + 2 = 10 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Area of a rectangle = length × ___",
        ["width", "breadth"],
        "Multiply the length by the width to find how many squares cover a rectangle.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular rug is 3 m long and 2 m wide. What is its area in square metres?",
        ["6", "6 m²", "6 m2", "6 square metres"],
        "Area = length × width = 3 × 2 = 6 m².",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 6, top: "6 m", side: "6 m" },
        choice(
          n,
          "What is the area of this square garden?",
          ["12 m²", "24 m²", "36 m²", "36 m"],
          2,
          "Area = 6 × 6 = 36 m². 24 is the perimeter, not the area, and area is in square metres, not metres.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest to largest area.",
        ["a 2 cm by 3 cm rectangle", "a 4 cm by 2 cm rectangle", "a 3 cm by 3 cm square", "a 5 cm by 2 cm rectangle"],
        "Work out each area: 2 × 3 = 6, 4 × 2 = 8, 3 × 3 = 9 and 5 × 2 = 10 cm².",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 24 cm²? Choose all that are right.",
        ["6 cm by 4 cm", "8 cm by 3 cm", "12 cm by 2 cm", "10 cm by 4 cm"],
        [0, 1, 2],
        "6 × 4, 8 × 3 and 12 × 2 all make 24. But 10 × 4 = 40.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 4, top: "8 m", side: "? m" },
        typed(
          "fill_blank",
          n,
          "This rectangle has an area of 32 m². Its missing side is ___ m long.",
          ["4", "4 m"],
          "Length × width = area, so 8 × ? = 32. Since 8 × 4 = 32, the missing side is 4 m.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A 4 m by 4 m square has a larger area than a 6 m by 2 m rectangle.",
        true,
        "The square is 4 × 4 = 16 m² and the rectangle is 6 × 2 = 12 m². Their perimeters are both 16 m, but the areas are different.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 3],
            [3, 3],
            [3, 6],
            [0, 6],
          ],
          sideLabels: ["8 m", "3 m", "5 m", "3 m", "3 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "What is the area of this L-shaped deck?",
          ["33", "33 m²", "33 m2", "33 square metres"],
          "Split it into two rectangles. The bottom one is 8 × 3 = 24 m². The top one is 3 × 3 = 9 m². 24 + 9 = 33 m².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack's lawn is 12 m long and 8 m wide. In the middle is a vegetable patch 3 m long and 2 m wide. How many square metres of grass are there?",
        ["90", "90 m²", "90 m2", "90 square metres"],
        "The whole lawn is 12 × 8 = 96 m². The patch is 3 × 2 = 6 m². Grass: 96 − 6 = 90 m².",
      ),
    (n) =>
      choice(
        n,
        "A rectangle has a perimeter of 20 cm. Which one has the biggest area?",
        ["9 cm by 1 cm", "8 cm by 2 cm", "6 cm by 4 cm", "5 cm by 5 cm"],
        3,
        "All have a perimeter of 20 cm. Areas: 9, 16, 24 and 25 cm². The square, 5 cm by 5 cm, has the biggest area.",
      ),
  ],
});

/** MA3-2DS-03: area of triangles and parallelograms by splitting and rearranging. */
export const AREA_TRI = levels(5050301, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "Cutting a rectangle along a diagonal makes two triangles that are the same size.",
        true,
        "A diagonal cuts a rectangle exactly in half, so the two triangles match and each has half the area.",
      ),
    (n) =>
      choice(
        n,
        "A square has an area of 10 cm². It is cut in half along a diagonal. What is the area of each triangle?",
        ["5 cm²", "10 cm²", "20 cm²", "2 cm²"],
        0,
        "Each triangle is half of the square. Half of 10 cm² is 5 cm².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [4, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². The triangle is half of the 4 by 4 square. What is the area of the triangle?",
          ["8", "8 cm²", "8 cm2", "8 square centimetres"],
          "The whole square is 4 × 4 = 16 cm². Half of 16 is 8, so the triangle is 8 cm².",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the triangle?",
          ["12", "12 cm²", "12 cm2", "12 square centimetres"],
          "The triangle is half of a 6 by 4 rectangle. 6 × 4 = 24, and half of 24 is 12 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A parallelogram can be cut and rearranged into a ___ with the same area.",
        ["rectangle", "a rectangle"],
        "Cut the triangle off one slanted end and slide it to the other end. The pieces make a rectangle with the same area.",
      ),
    (n) =>
      choice(
        n,
        "A rectangle has an area of 18 m². A triangle is exactly half of this rectangle. What is the triangle's area?",
        ["9 m²", "36 m²", "18 m²", "6 m²"],
        0,
        "Half of 18 m² is 9 m².",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [7, 3],
            [2, 3],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the parallelogram?",
          ["15", "15 cm²", "15 cm2", "15 square centimetres"],
          "Cut the triangle off the left end and move it to the right end. You get a rectangle 5 long and 3 high: 5 × 3 = 15 cm².",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [3, 4],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 cm². What is the area of the triangle?",
          ["16 cm²", "32 cm²", "12 cm²", "20 cm²"],
          0,
          "The triangle fits in a rectangle 8 long and 4 high, which is 32 cm². The triangle is half of that: 16 cm².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A parallelogram with a base of 6 cm and a height of 4 cm has the same area as a rectangle 6 cm long and 4 cm wide.",
        true,
        "Cut the slanted end off the parallelogram and move it across to make a 6 cm by 4 cm rectangle. Both are 24 cm².",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [0, 5],
          ],
          sideLabels: ["8 cm", "", "5 cm"],
        },
        typed(
          "short_answer",
          n,
          "What is the area of this right-angled triangle?",
          ["20", "20 cm²", "20 cm2", "20 square centimetres"],
          "It is half of an 8 cm by 5 cm rectangle. 8 × 5 = 40, and half of 40 is 20 cm².",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these have an area of 12 cm²? Choose all that are right.",
        [
          "a triangle with base 6 cm and height 4 cm",
          "a parallelogram with base 4 cm and height 3 cm",
          "a rectangle 6 cm long and 2 cm wide",
          "a triangle with base 3 cm and height 4 cm",
        ],
        [0, 1, 2],
        "Triangle: half of 6 × 4 = 12. Parallelogram: 4 × 3 = 12. Rectangle: 6 × 2 = 12. The last triangle is half of 3 × 4, only 6 cm².",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest to largest area.",
        [
          "a triangle with base 4 cm and height 3 cm",
          "a square with sides of 3 cm",
          "a parallelogram with base 5 cm and height 2 cm",
          "a rectangle 4 cm long and 3 cm wide",
        ],
        "Triangle: half of 4 × 3 = 6. Square: 3 × 3 = 9. Parallelogram: 5 × 2 = 10. Rectangle: 4 × 3 = 12 cm².",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [7, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of this triangle?",
          ["10", "10 cm²", "10 cm2", "10 square centimetres"],
          "The base is 4 cm. The height is how far the top corner is straight up from the base line: 5 cm. Area = half of 4 × 5 = 10 cm².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A triangle has an area of 15 cm² and a base of 6 cm. How tall is it, in centimetres?",
        ["5", "5 cm"],
        "A triangle is half of a rectangle, so the rectangle would be 15 × 2 = 30 cm². 6 × ? = 30, so the height is 5 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 4],
            [3, 7],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of this house shape?",
          ["33", "33 cm²", "33 cm2", "33 square centimetres"],
          "Split it into a rectangle and a triangle roof. Rectangle: 6 × 4 = 24 cm². Roof: base 6, height 3, so half of 6 × 3 = 9 cm². 24 + 9 = 33 cm².",
        ),
      ),
  ],
});

/** MA3-3DS-02: volume in cubic centimetres and capacity in mL and L. */
export const VOLUME = levels(5050401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "How many small cubes make this block?",
          "6",
          "There is one layer with 2 rows of 3 cubes. 2 × 3 = 6 cubes.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit measures how much water a bucket holds?",
        ["litres", "metres", "kilograms", "square metres"],
        0,
        "Capacity, how much a container holds, is measured in litres and millilitres.",
      ),
    (n) => trueFalse(n, "1 litre is the same as 1000 millilitres.", true, "Milli means one thousandth, so there are 1000 mL in 1 L."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 700, step: 100, unit: "mL" },
        typed("short_answer", n, "How much water is in the jug, in millilitres?", ["700", "700 mL"], "The water reaches the 700 mL mark."),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of this block?",
          ["12", "12 cm³", "12 cm3", "12 cubic centimetres"],
          "Each layer has 2 rows of 3 cubes, which is 6. There are 2 layers, so 6 × 2 = 12 cm³.",
        ),
      ),
    (n) => typed("fill_blank", n, "2 L = ___ mL", "2000", "Each litre is 1000 mL, so 2 L is 2 × 1000 = 2000 mL."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        choice(
          n,
          "Each small cube is 1 cm³. What is the volume of this rectangular prism?",
          ["24 cm³", "9 cm³", "12 cm³", "18 cm³"],
          0,
          "The bottom layer has 3 rows of 4 cubes, which is 12. There are 2 layers, so 12 × 2 = 24 cm³.",
        ),
      ),
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 1.5, step: 0.25, unit: "L" },
        choice(
          n,
          "How much water is in the jug?",
          ["1.5 L", "1.25 L", "1.75 L", "15 L"],
          0,
          "The water reaches the mark between 1.25 L and 1.75 L, which is 1.5 L.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from smallest to largest.",
        ["250 mL", "0.5 L", "750 mL", "1.2 L"],
        "Change them all to mL: 250 mL, 0.5 L = 500 mL, 750 mL, 1.2 L = 1200 mL.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A box is 5 cm long, 4 cm wide and 3 cm high. How many 1 cm cubes will fill it?",
        "60",
        "The bottom layer holds 5 × 4 = 20 cubes. There are 3 layers, so 20 × 3 = 60 cubes.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same as 1.5 L? Choose all that are right.",
        ["1500 mL", "1 L 500 mL", "150 mL", "1 L 50 mL"],
        [0, 1],
        "0.5 L is half of 1000 mL, which is 500 mL. So 1.5 L is 1 L 500 mL, or 1500 mL.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 6, width: 2, height: 3 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. Some cubes are hidden at the back. What is the volume of this prism?",
          ["36", "36 cm³", "36 cm3", "36 cubic centimetres"],
          "Each layer has 2 rows of 6 cubes, which is 12. There are 3 layers, so 12 × 3 = 36 cm³.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 2 L bottle of water is poured into cups that hold 300 mL each. How many cups can be filled right to the top?",
        "6",
        "2 L is 2000 mL. 6 cups use 6 × 300 = 1800 mL, leaving 200 mL. That is not enough for another full cup, so 6 cups.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 3 },
        typed(
          "short_answer",
          n,
          "Mia wants to build a prism twice as tall as this one, with the same length and width. How many cubes will she need altogether?",
          "48",
          "Each layer has 2 rows of 4, which is 8 cubes. This prism has 3 layers; twice as tall is 6 layers. 8 × 6 = 48 cubes.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A rectangular prism has a volume of 40 cm³. It is 5 cm long and 2 cm wide. How high is it?",
        ["4 cm", "8 cm", "33 cm", "20 cm"],
        0,
        "One layer is 5 × 2 = 10 cubes. 40 cubes make 40 ÷ 10 = 4 layers, so it is 4 cm high.",
      ),
  ],
});

/** MA3-NSM-01: mass in grams, kilograms and tonnes. */
export const MASS = levels(5050501, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the mass of a big bag of potatoes?",
        ["kilograms", "grams", "millilitres", "metres"],
        0,
        "A big bag of potatoes is heavy, so kilograms are best. Grams are for light things like a biscuit.",
      ),
    (n) => trueFalse(n, "1 kilogram is the same as 1000 grams.", true, "Kilo means one thousand, so 1 kg = 1000 g."),
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 3, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "What mass does the scale show?",
          ["3", "3 kg"],
          "The needle points to 3, and the scale is in kg, so 3 kg.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 400, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "How many grams of flour are on the scale?",
          ["400", "400 g"],
          "The needle points to 400, and the scale is in grams, so 400 g.",
        ),
      ),
    (n) => typed("fill_blank", n, "4 kg = ___ g", "4000", "Each kilogram is 1000 g, so 4 kg is 4 × 1000 = 4000 g."),
    (n) =>
      choice(
        n,
        "Which of these has a mass of about 1 tonne?",
        ["a small car", "a cat", "an apple", "a school bag"],
        0,
        "A tonne is 1000 kg. A small car has a mass of about 1 tonne; the others are much lighter.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 3.5, step: 0.5, unit: "kg" },
        choice(
          n,
          "What mass does the scale show?",
          ["3.5 kg", "3.05 kg", "35 kg", "4.5 kg"],
          0,
          "The needle is on the mark halfway between 3 and 4, which is 3.5 kg.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from lightest to heaviest.",
        ["90 g", "0.5 kg", "800 g", "1.25 kg"],
        "Change them all to grams: 90 g, 0.5 kg = 500 g, 800 g, 1.25 kg = 1250 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many grams are there in 2.5 kg?",
        ["2500", "2500 g"],
        "2 kg is 2000 g and 0.5 kg is 500 g, so 2.5 kg is 2500 g.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 650, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "The needle is halfway between two numbered marks. What mass does the scale show, in grams?",
          ["650", "650 g"],
          "The needle is halfway between 600 and 700. Halfway is 50 more than 600, so 650 g.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same as 3 kg 250 g? Choose all that are right.",
        ["3250 g", "3.25 kg", "325 g", "3.025 kg"],
        [0, 1],
        "3 kg is 3000 g, and 3000 + 250 = 3250 g. 250 g is 0.25 kg, so it is also 3.25 kg.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A box holds 6 tins of tomatoes. Each tin has a mass of 400 g. What is the total mass of the tins, in kilograms?",
        ["2.4", "2.4 kg"],
        "6 × 400 = 2400 g. 2400 g is 2 kg and 400 g, which is 2.4 kg.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A truck can carry 2 tonnes. It is already carrying 1350 kg. How many more kilograms can it carry?",
        ["650", "650 kg"],
        "2 tonnes is 2000 kg. 2000 − 1350 = 650 kg.",
      ),
    (n) =>
      choice(
        n,
        "Ruby has a 1.5 kg bag of flour. She uses 350 g for scones and 400 g for a cake. How much flour is left?",
        ["750 g", "1150 g", "1.1 kg", "850 g"],
        0,
        "1.5 kg is 1500 g. She uses 350 + 400 = 750 g. 1500 − 750 = 750 g left.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 4, step: 0.5, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows the mass of 8 cans that all weigh the same. What is the mass of one can, in grams?",
          ["500", "500 g"],
          "The scale shows 4 kg, which is 4000 g. 4000 ÷ 8 = 500 g for each can.",
        ),
      ),
  ],
});

/** MA3-NSM-02: duration, 12- and 24-hour time, am and pm. */
export const TIME = levels(5050601, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which time is in the afternoon?",
        ["3:00 pm", "3:00 am", "9:00 am", "11:00 am"],
        0,
        "pm times are from midday to midnight, so 3:00 pm is in the afternoon. am times are before midday.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 24-hour time, 13:00 is 1:00 pm.",
        true,
        "After midday the hours keep counting past 12. 13 − 12 = 1, so 13:00 is 1:00 pm.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 30 },
        choice(
          n,
          "Kai's swimming lesson starts at this time in the afternoon. Which time is it?",
          ["2:30 am", "2:30 pm", "6:10 pm", "3:30 pm"],
          1,
          "The clock shows half past 2. It is in the afternoon, so it is 2:30 pm.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 5:00 pm in 24-hour time.",
        ["17:00", "1700", "17 00"],
        "For pm times, add 12 to the hour: 5 + 12 = 17, so 17:00.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 15 },
        typed(
          "fill_blank",
          n,
          "School assembly starts at this time in the morning. In 24-hour time that is ___.",
          ["09:15", "9:15", "0915"],
          "The clock shows quarter past 9. Morning times keep the same hour in 24-hour time, written 09:15.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these 24-hour times in order from earliest to latest in one day.",
        ["06:45", "11:20", "14:05", "21:30"],
        "In 24-hour time a bigger hour is always later: 06:45, 11:20, 14:05 (2:05 pm), 21:30 (9:30 pm).",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is 20:15 in 12-hour time?",
        ["8:15 pm", "8:15 am", "10:15 pm", "2:15 pm"],
        0,
        "20 is more than 12, so it is pm. 20 − 12 = 8, so it is 8:15 pm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A movie starts at 6:40 pm and finishes at 8:15 pm. How many minutes long is it?",
        ["95", "95 minutes"],
        "6:40 to 7:00 is 20 minutes. 7:00 to 8:00 is 60 minutes. 8:00 to 8:15 is 15 minutes. 20 + 60 + 15 = 95 minutes.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 10, minute: 50 },
        typed(
          "short_answer",
          n,
          "Ava's bus leaves at this time in the morning. The trip takes 25 minutes. What time does she arrive?",
          ["11:15", "11:15 am", "11:15am"],
          "The clock shows 10:50. 10 minutes takes it to 11:00, and 15 more minutes makes 11:15 am.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Station", "Train leaves"],
          rows: [
            ["Central", "14:25"],
            ["Strathfield", "14:41"],
            ["Parramatta", "14:58"],
            ["Blacktown", "15:16"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the timetable. How many minutes does the train take from Central to Parramatta?",
          ["33", "33 minutes"],
          "From 14:25 to 14:58 is 58 − 25 = 33 minutes.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Station", "Train leaves"],
          rows: [
            ["Central", "14:25"],
            ["Strathfield", "14:41"],
            ["Parramatta", "14:58"],
            ["Blacktown", "15:16"],
          ],
        },
        choice(
          n,
          "Look at the timetable. When does the train leave Strathfield, in 12-hour time?",
          ["2:41 pm", "4:41 pm", "2:41 am", "12:41 pm"],
          0,
          "14:41 is after midday, so it is pm. 14 − 12 = 2, so it is 2:41 pm.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these times are after midday? Choose all that are right.",
        ["13:10", "12:30 pm", "9:30 am", "01:30", "16:00"],
        [0, 1, 4],
        "13:10 and 16:00 have hours bigger than 12, and 12:30 pm is half an hour after midday. 9:30 am and 01:30 are in the morning.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A plane leaves Sydney at 22:50. The flight takes 4 hours 30 minutes. What is the time in Sydney when it lands? Use 24-hour time.",
        ["03:20", "3:20", "0320"],
        "22:50 plus 4 hours is 02:50 the next morning (it goes past midnight). 30 minutes more is 03:20.",
      ),
    (n) =>
      choice(
        n,
        "Dad puts a roast in the oven at 4:35 pm. It needs 1 hour 50 minutes to cook. When will it be ready?",
        ["6:25 pm", "6:15 pm", "5:25 pm", "6:35 pm"],
        0,
        "4:35 plus 1 hour is 5:35. 25 more minutes is 6:00, and the last 25 minutes makes 6:25 pm.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Noah's Saturday", "Time"],
          rows: [
            ["Leaves home", "08:10"],
            ["Cricket starts", "08:45"],
            ["Cricket ends", "11:20"],
            ["Gets home", "11:55"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How many minutes was Noah away from home?",
          ["225", "225 minutes"],
          "From 08:10 to 11:10 is 3 hours, which is 180 minutes. 11:10 to 11:55 is 45 minutes. 180 + 45 = 225 minutes.",
        ),
      ),
  ],
});

/** MA3-2DS-01: classifying triangles and quadrilaterals by their properties. */
export const SHAPES_2D = levels(5060101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [3, 5],
          ],
          sideLabels: ["6 cm", "6 cm", "6 cm"],
        },
        choice(
          n,
          "What type of triangle is this?",
          ["equilateral", "isosceles", "scalene", "right-angled"],
          0,
          "All three sides are 6 cm. A triangle with three equal sides is equilateral.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A quadrilateral is any shape with four straight sides.",
        true,
        "Quad means four. Squares, rectangles and kites are all quadrilaterals.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7, 0],
            [7, 4],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many right angles does this rectangle have?",
          ["4", "four"],
          "Every corner of a rectangle is a right angle, and it has 4 corners.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [0, 5],
          ],
        },
        choice(
          n,
          "Which kind of triangle is this?",
          ["right-angled", "equilateral", "obtuse-angled", "acute-angled"],
          0,
          "The corner at the bottom left is a square corner, a right angle. So it is a right-angled triangle.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with no equal sides is called a ___ triangle.",
        "scalene",
        "Scalene triangles have three different side lengths. Isosceles have two equal sides and equilateral have three.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [8, 4],
            [2, 4],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["parallelogram", "trapezium", "rhombus", "kite"],
          0,
          "It has two pairs of parallel sides, and the sides are not all equal, so it is a parallelogram.",
        ),
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these shapes always have two pairs of parallel sides? Choose all that are right.",
        ["square", "rectangle", "rhombus", "kite"],
        [0, 1, 2],
        "Squares, rectangles and rhombuses all have opposite sides parallel. A kite does not have parallel sides.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [3, 6],
          ],
          sideLabels: ["6 cm", "7 cm", "7 cm"],
        },
        trueFalse(
          n,
          "This triangle is isosceles.",
          true,
          "Two of its sides are 7 cm. A triangle with exactly two equal sides is isosceles.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 0],
            [6, 5],
            [3, 7],
            [0, 5],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["kite", "rhombus", "trapezium", "parallelogram"],
          0,
          "It has two pairs of equal sides that sit next to each other, the two long ones and the two short ones, and no parallel sides. That makes it a kite.",
        ),
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "Every square is also a rectangle.",
        true,
        "A rectangle is a quadrilateral with four right angles. A square has four right angles too, so it is a special rectangle.",
      ),
    (n) =>
      choice(
        n,
        "I have four equal sides, but my angles are not right angles. What shape am I?",
        ["rhombus", "square", "rectangle", "kite"],
        0,
        "A square also has four equal sides, but its angles are right angles. Four equal sides without right angles is a rhombus.",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest to most lines of symmetry.",
        ["scalene triangle", "isosceles triangle", "equilateral triangle", "square"],
        "A scalene triangle has 0 lines of symmetry, an isosceles triangle has 1, an equilateral triangle has 3 and a square has 4.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [0, 5],
          ],
          sideLabels: ["5 cm", "", "5 cm"],
        },
        multi(
          n,
          "Which words describe this triangle? Choose all that are right.",
          ["right-angled", "isosceles", "equilateral", "scalene"],
          [0, 1],
          "It has a right angle at the bottom left, and two sides of 5 cm, so it is right-angled and isosceles. The long side is longer than 5 cm, so it is not equilateral.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which quadrilateral has diagonals that are the same length and cross at right angles?",
        ["square", "rectangle", "rhombus", "kite"],
        0,
        "A rectangle's diagonals are equal but don't cross at right angles. A rhombus's cross at right angles but aren't equal. A square's do both.",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle can have two right angles.",
        false,
        "If two corners were right angles, the two sides going up from them would be parallel and would never meet to make the third corner.",
      ),
  ],
});

/** MA3-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(5060201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        choice(
          n,
          "What is this object called?",
          ["cube", "square", "sphere", "cylinder"],
          0,
          "It is a 3D object with 6 square faces, so it is a cube. A square is a flat 2D shape.",
        ),
      ),
    (n) => trueFalse(n, "A sphere has no flat faces.", true, "A sphere, like a ball, has one curved surface and no flat faces."),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        choice(
          n,
          "What is this object called?",
          ["triangular prism", "triangular pyramid", "rectangular prism", "cone"],
          0,
          "It has two matching triangle ends joined by rectangles, so it is a triangular prism.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many faces does this square pyramid have?",
          ["5", "five"],
          "It has 1 square base and 4 triangle faces. 1 + 4 = 5 faces.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A prism is named after the shape of its ___.",
        ["base", "bases", "ends", "end"],
        "A triangular prism has triangle bases at each end, and a rectangular prism has rectangle bases.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many edges does a cube have?",
        ["12", "twelve"],
        "A cube has 4 edges on top, 4 on the bottom and 4 going up the sides. 4 + 4 + 4 = 12.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many vertices (corners) does this rectangular prism have?",
          ["8", "eight"],
          "It has 4 corners on the top and 4 on the bottom. 4 + 4 = 8 vertices.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 1 square and 4 triangles. What object does it fold into?",
        ["square pyramid", "triangular prism", "cube", "triangular pyramid"],
        0,
        "The square is the base, and the 4 triangles fold up to meet at a point. That is a square pyramid.",
      ),
    (n) =>
      multi(
        n,
        "Which of these objects are prisms? Choose all that are right.",
        ["cube", "triangular prism", "rectangular prism", "square pyramid", "cone"],
        [0, 1, 2],
        "Prisms have two matching ends joined by rectangles. A cube is a rectangular prism with square faces. Pyramids and cones come to a point.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A net is made of 2 triangles and 3 rectangles. What object does it fold into?",
        ["triangular prism", "triangular pyramid", "square pyramid", "rectangular prism"],
        0,
        "The 2 triangles are the matching ends, and the 3 rectangles join them. That is a triangular prism.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        typed(
          "short_answer",
          n,
          "How many edges does this triangular pyramid have?",
          ["6", "six"],
          "The triangle base has 3 edges, and 3 more edges go up to the top point. 3 + 3 = 6 edges.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A cone is a pyramid.",
        false,
        "A pyramid has a flat base with straight sides and flat triangle faces. A cone has a circle base and a curved surface, so it is not a pyramid.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest to most faces.",
        ["triangular pyramid", "square pyramid", "rectangular prism", "hexagonal prism"],
        "Triangular pyramid: 4 faces. Square pyramid: 5. Rectangular prism: 6. Hexagonal prism: 2 hexagons + 6 rectangles = 8.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A prism has bases that are hexagons (6 sides). How many faces does it have altogether?",
        ["8", "eight"],
        "There are 2 hexagon bases, and one rectangle joins each side of the hexagon: 6 rectangles. 2 + 6 = 8 faces.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        choice(
          n,
          "You look down at this square pyramid from directly above. What do you see?",
          [
            "a square with lines from each corner to the middle",
            "a triangle",
            "a circle with a dot in the middle",
            "a square with nothing inside it",
          ],
          0,
          "From above you see the square base, and the 4 sloping edges run from each corner up to the top point in the middle.",
        ),
      ),
  ],
});

/** MA3-GM-03: types of angles, measuring in degrees, and angles on a straight line and at a point. */
export const ANGLES = levels(5060301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 90 },
        choice(
          n,
          "What type of angle is this?",
          ["right angle", "acute angle", "obtuse angle", "straight angle"],
          0,
          "The square mark in the corner shows a right angle, like the corner of a book. It is 90°.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "An acute angle is smaller than a right angle.",
        true,
        "Acute angles are between 0° and 90°, so they are smaller than a right angle.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 40 },
        choice(
          n,
          "Which word describes this angle?",
          ["acute", "obtuse", "right", "reflex"],
          0,
          "The arms are closer together than a right angle, so it is smaller than 90°. That makes it acute.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "A right angle measures ___ degrees.",
        ["90", "90°"],
        "A right angle is a quarter of a full turn: 360 ÷ 4 = 90°.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 130 },
        choice(
          n,
          "Which is the best estimate for the size of this angle?",
          ["130°", "50°", "90°", "230°"],
          0,
          "The angle is wider than a right angle (90°) but less than a straight line (180°), so it is obtuse. 130° fits. 50° is acute and 230° is reflex.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these angles in order from smallest to largest.",
        ["acute angle", "right angle", "obtuse angle", "straight angle", "reflex angle"],
        "Acute is less than 90°, right is 90°, obtuse is between 90° and 180°, straight is 180° and reflex is between 180° and 360°.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many degrees are in a straight angle?",
        ["180", "180°"],
        "A straight angle is half a full turn: 360 ÷ 2 = 180°.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 250 },
        choice(
          n,
          "What type of angle is marked?",
          ["reflex", "obtuse", "acute", "straight"],
          0,
          "The marked turn goes past a straight line (180°) but not all the way round (360°). That is a reflex angle.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these angles are obtuse? Choose all that are right.",
        ["95°", "120°", "175°", "85°", "190°"],
        [0, 1, 2],
        "Obtuse angles are more than 90° and less than 180°: 95°, 120° and 175°. 85° is acute and 190° is reflex.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two angles sit side by side on a straight line. One of them is 110°. How big is the other angle, in degrees?",
        ["70", "70°"],
        "Angles on a straight line add up to 180°. 180 − 110 = 70°.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 60, label: "a" },
        trueFalse(
          n,
          "Angle a is more than half of a right angle.",
          true,
          "Half of a right angle is 45°. Angle a is wider than that (it is about 60°), so the statement is true.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Angles around a point add up to ___ degrees.",
        ["360", "360°"],
        "The angles around a point make one full turn, which is 360°.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Three angles meet at a point. Two of them are 150° and 90°. How big is the third angle, in degrees?",
        ["120", "120°"],
        "Angles at a point add up to 360°. 150 + 90 = 240, and 360 − 240 = 120°.",
      ),
    (n) =>
      choice(
        n,
        "A straight line is split into three angles. Two of them are 35° and 90°. How big is the third angle?",
        ["55°", "65°", "235°", "145°"],
        0,
        "Angles on a straight line add up to 180°. 35 + 90 = 125, and 180 − 125 = 55°.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 0 },
        typed(
          "short_answer",
          n,
          "The clock shows 2 o'clock. How many degrees is the smaller angle between the hands?",
          ["60", "60°"],
          "A full turn is 360°, and there are 12 numbers, so each gap is 360 ÷ 12 = 30°. From 12 to 2 is 2 gaps: 2 × 30 = 60°.",
        ),
      ),
  ],
});

/** MA3-GM-01: locating and describing points on a coordinate plane (first quadrant). */
export const COORDINATES = levels(5060401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 5, axes: true, points: [{ x: 4, y: 2, label: "A" }] },
        choice(
          n,
          "What are the coordinates of point A?",
          ["(4, 2)", "(2, 4)", "(4, 4)", "(2, 2)"],
          0,
          "Go across first, then up. A is 4 across and 2 up, so it is at (4, 2).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In the coordinates (3, 5), the first number tells you how far across to go.",
        true,
        "Coordinates are written (across, up). So (3, 5) means 3 across and 5 up.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 6,
          axes: true,
          points: [
            { x: 1, y: 3, label: "A" },
            { x: 5, y: 2, label: "B" },
            { x: 2, y: 5, label: "C" },
          ],
        },
        choice(n, "Which point is at (5, 2)?", ["A", "B", "C"], 1, "Go 5 across and 2 up. That lands on point B."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 8, rows: 6, axes: true, points: [{ x: 6, y: 3, label: "P" }] },
        typed(
          "short_answer",
          n,
          "What is the x-coordinate of point P?",
          "6",
          "The x-coordinate is how far across the point is. P is 6 across (and 3 up), so its x-coordinate is 6.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The point (0, 0), where the x-axis and the y-axis meet, is called the ___.",
        ["origin", "the origin"],
        "The origin is the starting point of the grid, at (0, 0).",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 6, axes: true, points: [{ x: 0, y: 4, label: "K" }] },
        choice(
          n,
          "What are the coordinates of point K?",
          ["(0, 4)", "(4, 0)", "(4, 4)", "(1, 4)"],
          0,
          "K is on the y-axis, so it is 0 across. It is 4 up. So K is at (0, 4).",
        ),
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
            { x: 2, y: 1, label: "A" },
            { x: 2, y: 5, label: "B" },
          ],
        },
        typed(
          "short_answer",
          n,
          "How many units apart are points A and B?",
          ["4", "4 units"],
          "A is at (2, 1) and B is at (2, 5). They are in the same column, so count up: 5 − 1 = 4 units.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which points are on the same horizontal line as (3, 4)? Choose all that are right.",
        ["(7, 4)", "(0, 4)", "(3, 7)", "(4, 3)"],
        [0, 1],
        "Points on the same horizontal line are the same height, so they have the same second number, 4: (7, 4) and (0, 4).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Start at (2, 3). Move 4 units right and 2 units up. What are your new coordinates?",
        ["(6, 5)", "(6,5)", "6, 5", "6,5"],
        "Moving right adds to the first number: 2 + 4 = 6. Moving up adds to the second number: 3 + 2 = 5. So (6, 5).",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 6,
          axes: true,
          points: [
            { x: 1, y: 1, label: "A" },
            { x: 5, y: 1, label: "B" },
            { x: 5, y: 4, label: "C" },
          ],
        },
        choice(
          n,
          "ABCD is a rectangle. Where must point D go?",
          ["(1, 4)", "(4, 1)", "(4, 5)", "(5, 5)"],
          0,
          "D must be above A (across 1) and level with C (up 4). So D is at (1, 4).",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 7,
          axes: true,
          path: [
            [1, 1],
            [1, 5],
            [6, 5],
          ],
          points: [
            { x: 1, y: 1, label: "S" },
            { x: 6, y: 5, label: "E" },
          ],
        },
        choice(
          n,
          "Which describes the path drawn from S to E?",
          ["4 up, then 5 right", "5 up, then 4 right", "4 right, then 5 up", "1 up, then 6 right"],
          0,
          "The path goes from (1, 1) up to (1, 5), which is 4 up. Then it goes right to (6, 5), which is 5 right.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "(2, 7) and (7, 2) are the same point.",
        false,
        "(2, 7) is 2 across and 7 up, but (7, 2) is 7 across and 2 up. The order matters, so they are different points.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 5,
          axes: true,
          points: [
            { x: 1, y: 2, label: "A" },
            { x: 7, y: 2, label: "B" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Point M is exactly halfway between A and B. What are the coordinates of M?",
          ["(4, 2)", "(4,2)", "4, 2", "4,2"],
          "A is at (1, 2) and B is at (7, 2), which are 6 units apart. Halfway is 3 units from A: 1 + 3 = 4. M stays at height 2, so (4, 2).",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these points in order from closest to the y-axis to furthest from it.",
        ["(1, 6)", "(3, 0)", "(5, 2)", "(8, 1)"],
        "The distance from the y-axis is the first number, how far across: 1, 3, 5, then 8.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has three of its corners at (2, 1), (6, 1) and (6, 5). What is the area of the square, in square units?",
        ["16", "16 square units"],
        "From (2, 1) to (6, 1) is 6 − 2 = 4 units, so each side is 4 units. Area = 4 × 4 = 16 square units.",
      ),
  ],
});
