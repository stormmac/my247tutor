/**
 * Year 5 Mathematics (measurement and space), second sets: another 15 questions for each Stage 3
 * standard in maths-year5b.ts, three at each level from very easy to very hard, pitched at early
 * Stage 3. Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-GM-02: length and distance in km, m, cm and mm, and perimeter. */
export const LENGTH = levels(5050116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the length of an ant?",
        ["millimetres", "metres", "kilometres", "litres"],
        0,
        "An ant is tiny, only a few millimetres long, so millimetres are the best unit. Litres measure capacity, not length.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 7, object: "pencil" },
        typed(
          "short_answer",
          n,
          "How many centimetres long is the pencil?",
          ["7", "7 cm"],
          "The pencil starts at 0 and ends at 7, so it is 7 cm long.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "1 centimetre is the same as 10 millimetres.",
        true,
        "Each centimetre on a ruler is split into 10 small marks, which are millimetres.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "5 m = ___ cm", "500", "Each metre is 100 cm, so 5 m is 5 × 100 = 500 cm."),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 3, top: "9 m", side: "3 m" },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this rectangle in metres?",
          ["24", "24 m"],
          "Perimeter is the distance all the way around: 9 + 3 + 9 + 3 = 24 m.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate of the height of a classroom door?",
        ["2 m", "20 cm", "20 m", "2 km"],
        0,
        "A door is a bit taller than an adult, about 2 m. 20 cm is shorter than a ruler and 20 m is taller than a house.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 6.5, object: "ribbon" },
        choice(
          n,
          "How many millimetres long is the ribbon?",
          ["65 mm", "6.5 mm", "650 mm", "56 mm"],
          0,
          "The ribbon ends halfway between 6 and 7, so it is 6.5 cm. Each centimetre is 10 mm, so 6.5 cm is 65 mm.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["45 mm", "6 cm", "0.5 m", "75 cm", "1 m"],
        "Change them all to centimetres: 45 mm = 4.5 cm, 6 cm, 0.5 m = 50 cm, 75 cm, 1 m = 100 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [7, 4],
            [3, 4],
          ],
          sideLabels: ["10 cm", "5 cm", "4 cm", "5 cm"],
        },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this shape in centimetres?",
          ["24", "24 cm"],
          "Add all four sides: 10 + 5 + 4 + 5 = 24 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these are longer than 1.5 km? Choose all that are right.",
        ["1600 m", "1 km 450 m", "1.05 km", "2000 m", "1499 m"],
        [0, 3],
        "1.5 km is 1500 m. 1600 m and 2000 m are longer. 1 km 450 m is 1450 m, 1.05 km is 1050 m and 1499 m is just short.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular swimming pool is 25 m long and 12 m wide. Ella walks once all the way around its edge. How far does she walk?",
        ["74", "74 m"],
        "One length and one width make 25 + 12 = 37 m. Going all the way around is double that: 37 × 2 = 74 m.",
      ),
    (n) =>
      choice(
        n,
        "Which length is the same as 3.05 m?",
        ["305 cm", "350 cm", "3050 cm", "35 cm"],
        0,
        "3 m is 300 cm and 0.05 m is 5 cm, so 3.05 m is 305 cm. (350 cm would be 3.5 m.)",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7, 0],
            [7, 3],
            [4, 3],
            [4, 6],
            [0, 6],
          ],
          sideLabels: ["7 m", "3 m", "", "", "4 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "Two sides of this vegetable patch are not marked. What is its perimeter in metres?",
          ["26", "26 m"],
          "The unmarked flat side is 7 − 4 = 3 m. The unmarked upright side is 6 − 3 = 3 m. Perimeter: 7 + 3 + 3 + 3 + 4 + 6 = 26 m.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has a perimeter of 36 cm. A rectangle has the same perimeter and is 12 cm long. How wide is the rectangle, in centimetres?",
        ["6", "6 cm"],
        "A length and a width make half the perimeter: 36 ÷ 2 = 18 cm. The length is 12 cm, so the width is 18 − 12 = 6 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jai runs 4 laps of a 400 m track every day for 5 days. How many kilometres does he run altogether?",
        ["8", "8 km"],
        "Each day he runs 4 × 400 = 1600 m. In 5 days that is 1600 × 5 = 8000 m, which is 8 km.",
      ),
  ],
});

/** MA3-2DS-02: area in cm² and m², including rectangles. */
export const AREA = levels(5050216, {
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
            [4, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the shaded rectangle?",
          ["10", "10 cm²", "10 cm2", "10 square centimetres"],
          "There are 2 rows of 5 shaded squares. 2 × 5 = 10, so the area is 10 cm².",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a postage stamp?",
        ["square centimetres", "square metres", "square kilometres", "centimetres"],
        0,
        "A stamp is small, so square centimetres (cm²) are best. Centimetres measure length, not area.",
      ),
    (n) =>
      trueFalse(
        n,
        "1 m² is the area of a square with sides 1 metre long.",
        true,
        "A square metre is exactly the space covered by a square 1 m long and 1 m wide.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 5, top: "8 cm", side: "5 cm" },
        choice(
          n,
          "What is the area of this rectangle?",
          ["40 cm²", "26 cm²", "13 cm²", "40 cm"],
          0,
          "Area = length × width = 8 × 5 = 40 cm². 26 is the perimeter, and area is in square centimetres, not centimetres.",
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
            [4, 0],
            [0, 1],
            [1, 1],
            [0, 2],
            [1, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the shaded shape?",
          ["9", "9 cm²", "9 cm2", "9 square centimetres"],
          "Count the shaded squares: 5 in the bottom row, then 2 and 2 above. 5 + 2 + 2 = 9 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A rectangle 5 cm long and 3 cm wide has an area of ___ cm².",
        ["15", "15 cm²"],
        "Area = length × width = 5 × 3 = 15 cm².",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular school garden bed is 4 m long and 3 m wide. What is its area in square metres?",
        ["12", "12 m²", "12 m2", "12 square metres"],
        "Area = length × width = 4 × 3 = 12 m².",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 7, height: 7, top: "7 cm", side: "7 cm" },
        typed(
          "short_answer",
          n,
          "What is the area of this square tile?",
          ["49", "49 cm²", "49 cm2", "49 square centimetres"],
          "Area = 7 × 7 = 49 cm². (28 cm would be the perimeter, not the area.)",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these rectangles in order from largest to smallest area.",
        ["6 m by 5 m", "7 m by 4 m", "9 m by 3 m", "5 m by 5 m"],
        "Work out each area: 6 × 5 = 30, 7 × 4 = 28, 9 × 3 = 27 and 5 × 5 = 25 m².",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 36 m²? Choose all that are right.",
        ["9 m by 4 m", "6 m by 6 m", "12 m by 3 m", "10 m by 6 m", "8 m by 5 m"],
        [0, 1, 2],
        "9 × 4, 6 × 6 and 12 × 3 all make 36. But 10 × 6 = 60 and 8 × 5 = 40.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 5, top: "? cm", side: "5 cm" },
        typed(
          "fill_blank",
          n,
          "This rectangle has an area of 45 cm². Its missing side is ___ cm long.",
          ["9", "9 cm"],
          "Length × width = area, so ? × 5 = 45. Since 9 × 5 = 45, the missing side is 9 cm.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two rectangles with the same perimeter always have the same area.",
        false,
        "A 5 cm by 1 cm rectangle and a 3 cm by 3 cm square both have a perimeter of 12 cm, but their areas are 5 cm² and 9 cm².",
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
            [2, 2],
            [2, 7],
            [0, 7],
          ],
          sideLabels: ["6 cm", "2 cm", "4 cm", "5 cm", "2 cm", "7 cm"],
        },
        typed(
          "short_answer",
          n,
          "What is the area of this L-shape?",
          ["22", "22 cm²", "22 cm2", "22 square centimetres"],
          "Split it into two rectangles. The bottom one is 6 × 2 = 12 cm². The upright one above it is 2 × 5 = 10 cm². 12 + 10 = 22 cm².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bedroom floor is 6 m long and 5 m wide. Carpet costs $20 for each square metre. How much will it cost to carpet the floor?",
        ["600", "$600"],
        "The floor is 6 × 5 = 30 m². Each square metre costs $20, so 30 × $20 = $600.",
      ),
    (n) =>
      choice(
        n,
        "Each of these rectangles has an area of 24 cm². Which one has the smallest perimeter?",
        ["4 cm by 6 cm", "3 cm by 8 cm", "2 cm by 12 cm", "1 cm by 24 cm"],
        0,
        "Perimeters: 4 + 6 + 4 + 6 = 20, 3 + 8 + 3 + 8 = 22, 2 + 12 + 2 + 12 = 28 and 1 + 24 + 1 + 24 = 50 cm. The closest to a square, 4 cm by 6 cm, has the smallest.",
      ),
  ],
});

/** MA3-2DS-03: area of triangles and parallelograms by splitting and rearranging. */
export const AREA_TRI = levels(5050316, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "A triangle that is exactly half of a rectangle has half the rectangle's area.",
        true,
        "If the triangle covers exactly half of the rectangle, it covers half of its squares, so its area is half.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 2],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 cm². The triangle is half of a 6 by 2 rectangle. What is its area?",
          ["6 cm²", "12 cm²", "8 cm²", "3 cm²"],
          0,
          "The rectangle is 6 × 2 = 12 cm². Half of 12 is 6, so the triangle is 6 cm².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Two matching triangles fit together to make a rectangle with an area of 14 m². What is the area of one triangle?",
        ["7", "7 m²", "7 m2", "7 square metres"],
        "The two triangles are the same size, so each is half of 14 m²: 14 ÷ 2 = 7 m².",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [0, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the triangle?",
          ["10", "10 cm²", "10 cm2", "10 square centimetres"],
          "The triangle is half of a 4 by 5 rectangle. 4 × 5 = 20, and half of 20 is 10 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle drawn inside a rectangle with the same base and height covers ___ of the rectangle.",
        ["half", "one half", "1/2", "a half"],
        "Cut the rectangle around a triangle and the leftover pieces fit together to make another triangle the same size, so the triangle is half.",
      ),
    (n) =>
      choice(
        n,
        "A parallelogram is cut and rearranged into a rectangle 7 cm long and 3 cm wide. What is the area of the parallelogram?",
        ["21 cm²", "10 cm²", "20 cm²", "42 cm²"],
        0,
        "Moving the pieces doesn't change the area. The rectangle is 7 × 3 = 21 cm², so the parallelogram is 21 cm² too.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [7, 4],
            [3, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the parallelogram?",
          ["16", "16 cm²", "16 cm2", "16 square centimetres"],
          "Cut the triangle off one slanted end and move it to the other end. You get a rectangle 4 long and 4 high: 4 × 4 = 16 cm².",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [4, 5],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 cm². What is the area of the triangle?",
          ["15 cm²", "30 cm²", "11 cm²", "20 cm²"],
          0,
          "The triangle fits in a rectangle 6 long and 5 high, which is 30 cm². The triangle is half of that: 15 cm².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "To find the area of a parallelogram, you multiply the lengths of its two slanted sides.",
        false,
        "Multiply the base by the height, which is measured straight up from the base, not along the slanted side.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [0, 6],
          ],
          sideLabels: ["9 m", "", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "What is the area of this right-angled triangle?",
          ["27", "27 m²", "27 m2", "27 square metres"],
          "It is half of a 9 m by 6 m rectangle. 9 × 6 = 54, and half of 54 is 27 m².",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these have an area of 20 cm²? Choose all that are right.",
        [
          "a parallelogram with base 5 cm and height 4 cm",
          "a triangle with base 10 cm and height 4 cm",
          "a triangle with base 5 cm and height 4 cm",
          "a rectangle 10 cm long and 2 cm wide",
        ],
        [0, 1, 3],
        "Parallelogram: 5 × 4 = 20. First triangle: half of 10 × 4 = 20. Rectangle: 10 × 2 = 20. The second triangle is half of 5 × 4, only 10 cm².",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest to largest area.",
        [
          "a triangle with base 6 cm and height 2 cm",
          "a square with sides of 3 cm",
          "a triangle with base 5 cm and height 4 cm",
          "a parallelogram with base 4 cm and height 3 cm",
        ],
        "First triangle: half of 6 × 2 = 6. Square: 3 × 3 = 9. Second triangle: half of 5 × 4 = 10. Parallelogram: 4 × 3 = 12 cm².",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [3, 0],
            [7, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of this triangle?",
          ["6", "6 cm²", "6 cm2", "6 square centimetres"],
          "The base is 3 cm. The height is how far the top corner is straight up from the base line: 4 cm. Area = half of 3 × 4 = 6 cm².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A parallelogram has an area of 28 cm² and a height of 4 cm. How long is its base, in centimetres?",
        ["7", "7 cm"],
        "Area of a parallelogram = base × height, so ? × 4 = 28. Since 7 × 4 = 28, the base is 7 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [5, 4],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of this shape?",
          ["26", "26 cm²", "26 cm2", "26 square centimetres"],
          "Split it into a rectangle and a triangle. Rectangle: 5 × 4 = 20 cm². Triangle on the right: base 3, height 4, so half of 3 × 4 = 6 cm². 20 + 6 = 26 cm².",
        ),
      ),
  ],
});

/** MA3-3DS-02: volume in cubic centimetres and capacity in mL and L. */
export const VOLUME = levels(5050416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 2, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "How many small cubes make this block?",
          "4",
          "There is one layer with 2 rows of 2 cubes. 2 × 2 = 4 cubes.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the amount of medicine on a spoon?",
        ["millilitres", "litres", "kilograms", "centimetres"],
        0,
        "A spoon holds only a small amount, so millilitres are best. A litre is far too big.",
      ),
    (n) =>
      trueFalse(
        n,
        "Half a litre is the same as 500 millilitres.",
        true,
        "1 litre is 1000 mL, and half of 1000 is 500, so half a litre is 500 mL.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 300, step: 100, unit: "mL" },
        typed("short_answer", n, "How much juice is in the jug, in millilitres?", ["300", "300 mL"], "The juice reaches the 300 mL mark."),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of this block?",
          ["16", "16 cm³", "16 cm3", "16 cubic centimetres"],
          "Each layer has 2 rows of 4 cubes, which is 8. There are 2 layers, so 8 × 2 = 16 cm³.",
        ),
      ),
    (n) => typed("fill_blank", n, "3000 mL = ___ L", "3", "Every 1000 mL makes 1 L, so 3000 mL is 3000 ÷ 1000 = 3 L."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 2, height: 2 },
        choice(
          n,
          "Each small cube is 1 cm³. What is the volume of this rectangular prism?",
          ["20 cm³", "9 cm³", "10 cm³", "14 cm³"],
          0,
          "The bottom layer has 2 rows of 5 cubes, which is 10. There are 2 layers, so 10 × 2 = 20 cm³.",
        ),
      ),
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 0.75, step: 0.25, unit: "L" },
        choice(
          n,
          "How much water is in the jug?",
          ["0.75 L", "0.5 L", "1 L", "75 L"],
          0,
          "Each mark is 0.25 L. The water reaches the third mark: 0.25, 0.5, 0.75 L.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from largest to smallest.",
        ["2 L", "1750 mL", "1.5 L", "600 mL", "0.25 L"],
        "Change them all to mL: 2 L = 2000 mL, 1750 mL, 1.5 L = 1500 mL, 600 mL, 0.25 L = 250 mL.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A box is 7 cm long, 3 cm wide and 2 cm high. How many 1 cm cubes will fill it?",
        "42",
        "The bottom layer holds 7 × 3 = 21 cubes. There are 2 layers, so 21 × 2 = 42 cubes.",
      ),
    (n) =>
      multi(
        n,
        "Which of these hold more than 1 L? Choose all that are right.",
        ["1200 mL", "0.9 L", "1 L 50 mL", "999 mL", "1.5 L"],
        [0, 2, 4],
        "1 L is 1000 mL. 1200 mL, 1 L 50 mL (1050 mL) and 1.5 L (1500 mL) are more. 0.9 L is 900 mL and 999 mL is just short.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 3, height: 3 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. Some cubes are hidden at the back. What is the volume of this cube?",
          ["27", "27 cm³", "27 cm3", "27 cubic centimetres"],
          "Each layer has 3 rows of 3 cubes, which is 9. There are 3 layers, so 9 × 3 = 27 cm³.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 1.5 L jug of cordial is poured into glasses that hold 200 mL each. How many glasses can be filled right to the top?",
        "7",
        "1.5 L is 1500 mL. 7 glasses use 7 × 200 = 1400 mL, leaving 100 mL. That is not enough for another full glass, so 7.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "Leo wants to build a prism with the same length and height as this one, but twice as wide. How many cubes will he need altogether?",
          "24",
          "Twice as wide is 4 rows instead of 2. Each layer would have 4 rows of 3, which is 12 cubes, and there are 2 layers: 12 × 2 = 24 cubes.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A rectangular prism has a volume of 36 cm³. It is 3 cm long and 3 cm wide. How high is it?",
        ["4 cm", "6 cm", "12 cm", "30 cm"],
        0,
        "One layer is 3 × 3 = 9 cubes. 36 cubes make 36 ÷ 9 = 4 layers, so it is 4 cm high.",
      ),
  ],
});

/** MA3-NSM-01: mass in grams, kilograms and tonnes. */
export const MASS = levels(5050516, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the mass of a strawberry?",
        ["grams", "kilograms", "tonnes", "litres"],
        0,
        "A strawberry is very light, so grams are best. Kilograms and tonnes are for heavy things.",
      ),
    (n) => trueFalse(n, "1 tonne is the same as 1000 kilograms.", true, "A tonne is used for very heavy things, and 1 tonne = 1000 kg."),
    (n) =>
      pic(
        { kind: "scale", max: 10, value: 6, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "What mass does the scale show?",
          ["6", "6 kg"],
          "The needle points to 6, and the scale is in kg, so 6 kg.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 700, step: 100, unit: "g" },
        choice(
          n,
          "How much butter is on the scale?",
          ["700 g", "7 g", "70 g", "700 kg"],
          0,
          "The needle points to 700, and the scale is in grams, so 700 g.",
        ),
      ),
    (n) => typed("fill_blank", n, "5000 g = ___ kg", "5", "Every 1000 g makes 1 kg, so 5000 g is 5000 ÷ 1000 = 5 kg."),
    (n) =>
      choice(
        n,
        "Which of these would you measure in tonnes?",
        ["a loaded truck", "a loaf of bread", "a pencil", "a bag of apples"],
        0,
        "A tonne is 1000 kg, which suits very heavy things like a loaded truck. The others are measured in grams or kilograms.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 4, value: 2.5, step: 0.5, unit: "kg" },
        typed(
          "short_answer",
          n,
          "What mass does the scale show, in kilograms?",
          ["2.5", "2.5 kg"],
          "The needle is on the mark halfway between 2 and 3, which is 2.5 kg.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from heaviest to lightest.",
        ["2 kg", "1.8 kg", "1500 g", "0.75 kg", "600 g"],
        "Change them all to grams: 2 kg = 2000 g, 1.8 kg = 1800 g, 1500 g, 0.75 kg = 750 g, 600 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many grams are there in 1.75 kg?",
        ["1750", "1750 g"],
        "1 kg is 1000 g and 0.75 kg is 750 g, so 1.75 kg is 1750 g.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 2, value: 1.25, step: 0.25, unit: "kg" },
        choice(
          n,
          "Each mark on the scale is 0.25 kg. What mass does it show?",
          ["1.25 kg", "1.2 kg", "1.5 kg", "12.5 kg"],
          0,
          "The needle is one mark past 1 kg. One mark is 0.25 kg, so it shows 1 + 0.25 = 1.25 kg.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same as 2 kg 75 g? Choose all that are right.",
        ["2075 g", "2.075 kg", "2.75 kg", "275 g"],
        [0, 1],
        "2 kg is 2000 g, and 2000 + 75 = 2075 g. 75 g is 0.075 kg, so it is also 2.075 kg. 2.75 kg would be 2 kg 750 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag holds 8 apples. Each apple has a mass of 150 g. What is the total mass of the apples, in kilograms?",
        ["1.2", "1.2 kg"],
        "8 × 150 = 1200 g. 1200 g is 1 kg and 200 g, which is 1.2 kg.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A lift can carry 1 tonne. Six people with a total mass of 480 kg are in it. How many more kilograms can it carry?",
        ["520", "520 kg"],
        "1 tonne is 1000 kg. 1000 − 480 = 520 kg.",
      ),
    (n) =>
      choice(
        n,
        "Ali has a 2 kg bag of rice. He cooks 450 g on Monday and 300 g on Tuesday. How much rice is left?",
        ["1250 g", "1750 g", "1.75 kg", "750 g"],
        0,
        "2 kg is 2000 g. He cooks 450 + 300 = 750 g. 2000 − 750 = 1250 g left.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 3, value: 1.5, step: 0.25, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows the mass of 6 bags of lollies that all weigh the same. What is the mass of one bag, in grams?",
          ["250", "250 g"],
          "The scale shows 1.5 kg, which is 1500 g. 1500 ÷ 6 = 250 g for each bag.",
        ),
      ),
  ],
});

const BUS_TIMES: Picture = {
  kind: "table",
  headings: ["Bus stop", "Bus leaves"],
  rows: [
    ["Manly", "07:48"],
    ["Dee Why", "08:06"],
    ["Collaroy", "08:19"],
    ["Mona Vale", "08:40"],
  ],
};

/** MA3-NSM-02: duration, 12- and 24-hour time, am and pm. */
export const TIME = levels(5050616, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which time is in the morning?",
        ["7:30 am", "7:30 pm", "12:30 pm", "11:00 pm"],
        0,
        "am times are from midnight to midday, so 7:30 am is in the morning. pm times are after midday.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 24-hour time, 18:00 is 6:00 pm.",
        true,
        "After midday the hours keep counting past 12. 18 − 12 = 6, so 18:00 is 6:00 pm.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 7, minute: 45 },
        choice(
          n,
          "Mia eats dinner at this time in the evening. Which time is it?",
          ["7:45 pm", "7:45 am", "9:35 pm", "8:45 pm"],
          0,
          "The minute hand is on the 9, which is 45 minutes, and the hour hand is just before the 8. That is 7:45, and evening is pm.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 9:00 pm in 24-hour time.",
        ["21:00", "2100", "21 00"],
        "For pm times, add 12 to the hour: 9 + 12 = 21, so 21:00.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 20 },
        typed(
          "fill_blank",
          n,
          "Netball training starts at this time in the afternoon. In 24-hour time that is ___.",
          ["16:20", "1620"],
          "The clock shows 4:20. It is in the afternoon, so add 12 to the hour: 4 + 12 = 16, which gives 16:20.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these times in order from earliest to latest in one day.",
        ["5:15 am", "08:30", "12:10 pm", "15:45", "10:20 pm"],
        "Change them all to the same kind of time: 5:15 am, 8:30 am, 12:10 pm, 3:45 pm (15:45), then 10:20 pm.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is 15:40 in 12-hour time?",
        ["3:40 pm", "5:40 pm", "3:40 am", "1:40 pm"],
        0,
        "15 is more than 12, so it is pm. 15 − 12 = 3, so it is 3:40 pm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cricket match starts at 1:20 pm and finishes at 4:05 pm. How many minutes long is it?",
        ["165", "165 minutes"],
        "1:20 to 4:20 would be 3 hours, which is 180 minutes. It finished 15 minutes earlier than 4:20, so 180 − 15 = 165 minutes.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 11, minute: 35 },
        typed(
          "short_answer",
          n,
          "Tom puts a cake in the oven at this time in the morning. It takes 40 minutes to bake. What time is it ready?",
          ["12:15", "12:15 pm", "12:15pm"],
          "The clock shows 11:35. 25 minutes takes it to 12:00, and 15 more minutes makes 12:15 pm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        BUS_TIMES,
        typed(
          "short_answer",
          n,
          "Look at the timetable. How many minutes does the bus take from Manly to Mona Vale?",
          ["52", "52 minutes"],
          "From 07:48 to 08:00 is 12 minutes, and 08:00 to 08:40 is 40 minutes. 12 + 40 = 52 minutes.",
        ),
      ),
    (n) =>
      pic(
        BUS_TIMES,
        choice(
          n,
          "Look at the timetable. Which part of the trip takes the longest?",
          ["Collaroy to Mona Vale", "Manly to Dee Why", "Dee Why to Collaroy"],
          0,
          "Manly to Dee Why is 18 minutes, Dee Why to Collaroy is 13 minutes and Collaroy to Mona Vale is 21 minutes.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these times are before midday? Choose all that are right.",
        ["10:45", "00:30", "12:15", "11:59 am", "13:00"],
        [0, 1, 3],
        "10:45 and 11:59 am are in the morning, and 00:30 is half an hour after midnight. 12:15 is after midday and 13:00 is 1:00 pm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bus leaves Sydney at 21:35 and arrives in Melbourne 11 hours 40 minutes later. What time does it arrive? Use 24-hour time.",
        ["09:15", "9:15", "0915"],
        "21:35 plus 11 hours is 08:35 the next morning (it goes past midnight). 40 minutes more is 09:15.",
      ),
    (n) =>
      choice(
        n,
        "A movie is 2 hours 15 minutes long. It must finish by 9:00 pm. What is the latest time it can start?",
        ["6:45 pm", "7:15 pm", "6:15 pm", "7:45 pm"],
        0,
        "Work backwards from 9:00 pm. Take away 2 hours to get 7:00 pm, then 15 minutes more to get 6:45 pm.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Lily's Sunday", "Time"],
          rows: [
            ["Leaves for the beach", "09:25"],
            ["Goes swimming", "10:00"],
            ["Eats lunch", "12:30"],
            ["Gets home", "14:05"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How many minutes was Lily away from home?",
          ["280", "280 minutes"],
          "From 09:25 to 13:25 is 4 hours, which is 240 minutes. 13:25 to 14:05 is 40 minutes. 240 + 40 = 280 minutes.",
        ),
      ),
  ],
});

/** MA3-2DS-01: classifying triangles and quadrilaterals by their properties. */
export const SHAPES_2D = levels(5060116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [0, 6],
          ],
          sideLabels: ["8 cm", "10 cm", "6 cm"],
        },
        choice(
          n,
          "Look at the side lengths. What type of triangle is this?",
          ["scalene", "isosceles", "equilateral"],
          0,
          "The sides are 8 cm, 10 cm and 6 cm, all different. A triangle with no equal sides is scalene.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A rhombus has four equal sides.",
        true,
        "Every side of a rhombus is the same length, like a square that has been pushed over.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [5, 5],
            [0, 5],
          ],
          sideLabels: ["5 cm", "5 cm", "5 cm", "5 cm"],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this square have?",
          ["4", "four"],
          "A square can be folded in half 4 ways: across the middle both ways and along both diagonals.",
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
            [4, 0],
            [10, 3],
          ],
        },
        choice(
          n,
          "Which kind of triangle is this?",
          ["obtuse-angled", "right-angled", "acute-angled", "equilateral"],
          0,
          "The corner at the right end of the short bottom side is wider than a right angle, so it is an obtuse-angled triangle.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with exactly two equal sides is called an ___ triangle.",
        "isosceles",
        "Isosceles triangles have two equal sides. Equilateral triangles have three, and scalene triangles have none.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [6, 4],
            [2, 4],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["trapezium", "parallelogram", "rhombus", "kite"],
          0,
          "It has one pair of parallel sides (the top and the bottom) and the other two sides slope in. That makes it a trapezium.",
        ),
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these shapes always have four right angles? Choose all that are right.",
        ["square", "rectangle", "rhombus", "parallelogram", "kite"],
        [0, 1],
        "Squares and rectangles always have four right angles. A rhombus, parallelogram or kite can have slanted corners.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 0],
            [6, 4],
            [3, 8],
            [0, 4],
          ],
          sideLabels: ["5 cm", "5 cm", "5 cm", "5 cm"],
        },
        choice(
          n,
          "All four sides are 5 cm and the corners are not right angles. What is this shape called?",
          ["rhombus", "kite", "trapezium", "rectangle"],
          0,
          "A quadrilateral with four equal sides is a rhombus. It isn't a square because its angles aren't right angles.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [4, 3],
          ],
          sideLabels: ["8 cm", "5 cm", "5 cm"],
        },
        trueFalse(
          n,
          "This triangle is scalene.",
          false,
          "Two of its sides are 5 cm, so it has two equal sides. That makes it isosceles, not scalene.",
        ),
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "Every rhombus is a parallelogram.",
        true,
        "A parallelogram has two pairs of parallel sides. A rhombus has its opposite sides parallel too, so it is a special parallelogram.",
      ),
    (n) =>
      choice(
        n,
        "I have two pairs of equal sides that sit next to each other, and one line of symmetry. What shape am I?",
        ["kite", "rectangle", "parallelogram", "trapezium"],
        0,
        "A kite has two short equal sides next to each other and two long equal sides next to each other. It folds in half along one line.",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest to most lines of symmetry.",
        ["parallelogram", "kite", "rectangle", "equilateral triangle", "square"],
        "A parallelogram (that isn't a rectangle or rhombus) has 0 lines of symmetry, a kite has 1, a rectangle has 2, an equilateral triangle has 3 and a square has 4.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are true? Choose all that are right.",
        [
          "A square is a rhombus",
          "A rectangle is a parallelogram",
          "A kite is a parallelogram",
          "A trapezium has two pairs of parallel sides",
        ],
        [0, 1],
        "A square has four equal sides, so it is a rhombus. A rectangle has two pairs of parallel sides, so it is a parallelogram. A kite has no parallel sides and a trapezium has only one pair.",
      ),
    (n) =>
      choice(
        n,
        "Which quadrilateral has diagonals that cross at right angles, where only one diagonal is cut in half by the other?",
        ["kite", "square", "rhombus", "rectangle"],
        0,
        "A kite's diagonals cross at right angles, and the long one cuts the short one in half but not the other way round. In a square and a rhombus both diagonals are cut in half.",
      ),
    (n) =>
      trueFalse(
        n,
        "An equilateral triangle can have a right angle.",
        false,
        "All three angles of an equilateral triangle are the same size. If one were a right angle, all three would be, and three right angles are too wide to close up into a triangle.",
      ),
  ],
});

/** MA3-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(5060216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        choice(
          n,
          "What is this object called?",
          ["cylinder", "cone", "circle", "sphere"],
          0,
          "It has two flat circle ends joined by one curved surface, like a can of soup. That is a cylinder. A circle is a flat 2D shape.",
        ),
      ),
    (n) => trueFalse(n, "A cube has 6 faces.", true, "A cube has a top, a bottom and 4 sides, all squares. 1 + 1 + 4 = 6 faces."),
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        choice(
          n,
          "How many flat faces does this cone have?",
          ["1", "0", "2", "3"],
          0,
          "A cone has one flat circle base. The rest is a curved surface that comes to a point.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many faces does this triangular prism have?",
          ["5", "five"],
          "It has 2 triangle ends and 3 rectangle faces joining them. 2 + 3 = 5 faces.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A pyramid is named after the shape of its ___.",
        ["base", "bottom face"],
        "A square pyramid has a square base and a triangular pyramid has a triangle base. The other faces are triangles that meet at a point.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many vertices (corners) does a square pyramid have?",
        ["5", "five"],
        "There are 4 corners around the square base and 1 at the top point. 4 + 1 = 5 vertices.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many edges does this triangular prism have?",
          ["9", "nine"],
          "Each triangle end has 3 edges, which makes 6, and 3 more edges join the two ends. 6 + 3 = 9 edges.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 6 squares that are all the same size. What object does it fold into?",
        ["cube", "square pyramid", "triangular prism", "cylinder"],
        0,
        "A cube has 6 square faces, so a net of 6 equal squares folds into a cube.",
      ),
    (n) =>
      multi(
        n,
        "Which of these objects are pyramids? Choose all that are right.",
        ["square pyramid", "triangular pyramid", "cone", "cube", "triangular prism"],
        [0, 1],
        "Pyramids have a flat base with straight sides and triangle faces that meet at a point. A cone has a curved surface, and the cube and prism have two matching ends.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A net is made of 4 triangles that are all the same. What object does it fold into?",
        ["triangular pyramid", "square pyramid", "triangular prism", "cube"],
        0,
        "One triangle is the base and the other 3 fold up to meet at a point. That is a triangular pyramid.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many edges does this rectangular prism have?",
          ["12", "twelve"],
          "It has 4 edges around the top, 4 around the bottom and 4 going up the sides. 4 + 4 + 4 = 12 edges.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A cylinder is a prism.",
        false,
        "A prism has flat faces joining its two ends. A cylinder's ends are joined by a curved surface, so it is not a prism.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest to most vertices.",
        ["triangular pyramid", "square pyramid", "triangular prism", "cube"],
        "Triangular pyramid: 3 + 1 = 4 vertices. Square pyramid: 4 + 1 = 5. Triangular prism: 3 + 3 = 6. Cube: 4 + 4 = 8.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pyramid has a base with 6 sides (a hexagon). How many edges does it have altogether?",
        ["12", "twelve"],
        "The hexagon base has 6 edges, and one edge goes from each of its 6 corners up to the top point. 6 + 6 = 12 edges.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        choice(
          n,
          "You look at this triangular prism straight on from one of its ends. What shape do you see?",
          ["a triangle", "a rectangle", "a square", "a circle"],
          0,
          "Each end of a triangular prism is a triangle, so looking straight at an end you see a triangle.",
        ),
      ),
  ],
});

/** MA3-GM-03: types of angles, measuring in degrees, and angles on a straight line and at a point. */
export const ANGLES = levels(5060316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 120 },
        choice(
          n,
          "What type of angle is this?",
          ["obtuse angle", "acute angle", "right angle", "straight angle"],
          0,
          "The arms open wider than a right angle but not as far as a straight line, so it is an obtuse angle.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "An obtuse angle is bigger than a right angle.",
        true,
        "Obtuse angles are between 90° and 180°, so they are bigger than a right angle.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 180 },
        choice(
          n,
          "What type of angle is this?",
          ["straight angle", "right angle", "reflex angle", "acute angle"],
          0,
          "The two arms make one straight line. That is a straight angle, 180°.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "A full turn measures ___ degrees.",
        ["360", "360°"],
        "A full turn goes all the way around, which is 360°. That is 4 right angles: 4 × 90 = 360.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 35 },
        choice(
          n,
          "Which is the best estimate for the size of this angle?",
          ["35°", "90°", "145°", "135°"],
          0,
          "The angle is much smaller than a right angle (90°), so it is acute. 35° fits. 135° and 145° are obtuse.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these angles in order from smallest to largest.",
        ["half a right angle", "a right angle", "an angle of 150°", "a straight angle", "three quarters of a full turn"],
        "Half a right angle is 45°, a right angle is 90°, then 150°, a straight angle is 180° and three quarters of a full turn is 270°.",
      ),
  ],
  medium: [
    (n) =>
      typed("short_answer", n, "How many degrees are in half a right angle?", ["45", "45°"], "A right angle is 90°. Half of 90 is 45°."),
    (n) =>
      pic(
        { kind: "angle", degrees: 300 },
        choice(
          n,
          "What type of angle is marked?",
          ["reflex", "obtuse", "acute", "right"],
          0,
          "The marked turn goes past a straight line (180°) but not all the way round (360°). That is a reflex angle.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these angles are acute? Choose all that are right.",
        ["45°", "89°", "90°", "12°", "100°"],
        [0, 1, 3],
        "Acute angles are less than 90°: 45°, 89° and 12°. 90° is a right angle and 100° is obtuse.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two angles sit side by side on a straight line. One of them is 65°. How big is the other angle, in degrees?",
        ["115", "115°"],
        "Angles on a straight line add up to 180°. 180 − 65 = 115°.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 100, label: "b" },
        trueFalse(
          n,
          "Angle b is smaller than a right angle.",
          false,
          "The arms of angle b open wider than a square corner, so it is more than 90°. It is obtuse, not smaller than a right angle.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A right angle is split into two angles. One of them is 35°. How big is the other?",
        ["55°", "65°", "145°", "325°"],
        0,
        "The two angles together make 90°. 90 − 35 = 55°. (145° would be for a straight line.)",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Four angles meet at a point. Three of them are 90°, 100° and 80°. How big is the fourth angle, in degrees?",
        ["90", "90°"],
        "Angles at a point add up to 360°. 90 + 100 + 80 = 270, and 360 − 270 = 90°.",
      ),
    (n) =>
      choice(
        n,
        "A straight angle is split into three equal angles. How big is each one?",
        ["60°", "90°", "120°", "45°"],
        0,
        "A straight angle is 180°. 180 ÷ 3 = 60°.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 0 },
        typed(
          "short_answer",
          n,
          "The clock shows 4 o'clock. How many degrees is the smaller angle between the hands?",
          ["120", "120°"],
          "A full turn is 360° and there are 12 numbers, so each gap is 360 ÷ 12 = 30°. From 12 to 4 is 4 gaps: 4 × 30 = 120°.",
        ),
      ),
  ],
});

/** MA3-GM-01: locating and describing points on a coordinate plane (first quadrant). */
export const COORDINATES = levels(5060416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 6, axes: true, points: [{ x: 3, y: 5, label: "B" }] },
        choice(
          n,
          "What are the coordinates of point B?",
          ["(3, 5)", "(5, 3)", "(3, 3)", "(5, 5)"],
          0,
          "Go across first, then up. B is 3 across and 5 up, so it is at (3, 5).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "To plot the point (4, 1), you go 1 across and 4 up.",
        false,
        "Coordinates are written (across, up). So (4, 1) means 4 across and 1 up, not the other way round.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 7,
          rows: 6,
          axes: true,
          points: [
            { x: 2, y: 4, label: "A" },
            { x: 4, y: 2, label: "B" },
            { x: 6, y: 1, label: "C" },
          ],
        },
        choice(
          n,
          "Which point is at (2, 4)?",
          ["A", "B", "C"],
          0,
          "Go 2 across and 4 up. That lands on point A. (B is at (4, 2), the numbers swapped.)",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 8, rows: 6, axes: true, points: [{ x: 5, y: 4, label: "Q" }] },
        typed(
          "short_answer",
          n,
          "What is the y-coordinate of point Q?",
          "4",
          "The y-coordinate is how far up the point is. Q is 5 across and 4 up, so its y-coordinate is 4.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The axis that runs straight across the bottom of the grid is called the ___.",
        ["x-axis", "x axis", "horizontal axis"],
        "The x-axis runs across (left to right). The y-axis runs up the side.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 6, axes: true, points: [{ x: 5, y: 0, label: "R" }] },
        choice(
          n,
          "What are the coordinates of point R?",
          ["(5, 0)", "(0, 5)", "(5, 5)", "(5, 1)"],
          0,
          "R is on the x-axis, so it is 0 up. It is 5 across. So R is at (5, 0).",
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
            { x: 1, y: 3, label: "A" },
            { x: 7, y: 3, label: "B" },
          ],
        },
        typed(
          "short_answer",
          n,
          "How many units apart are points A and B?",
          ["6", "6 units"],
          "A is at (1, 3) and B is at (7, 3). They are on the same row, so count across: 7 − 1 = 6 units.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which points are on the same vertical line as (5, 2)? Choose all that are right.",
        ["(5, 6)", "(5, 0)", "(2, 5)", "(6, 2)"],
        [0, 1],
        "Points on the same vertical line are the same distance across, so they have the same first number, 5: (5, 6) and (5, 0).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Start at (6, 4). Move 3 units left and 1 unit down. What are your new coordinates?",
        ["(3, 3)", "(3,3)", "3, 3", "3,3"],
        "Moving left takes away from the first number: 6 − 3 = 3. Moving down takes away from the second number: 4 − 1 = 3. So (3, 3).",
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
            { x: 2, y: 1, label: "P" },
            { x: 6, y: 1, label: "Q" },
            { x: 6, y: 5, label: "R" },
          ],
        },
        choice(
          n,
          "PQRS is a square. Where must point S go?",
          ["(2, 5)", "(5, 2)", "(1, 5)", "(6, 6)"],
          0,
          "S must be straight above P (2 across) and level with R (5 up). So S is at (2, 5), and every side is 4 units long.",
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
            [0, 2],
            [5, 2],
            [5, 6],
          ],
          points: [
            { x: 0, y: 2, label: "S" },
            { x: 5, y: 6, label: "E" },
          ],
        },
        choice(
          n,
          "Which describes the path drawn from S to E?",
          ["5 right, then 4 up", "4 right, then 5 up", "5 up, then 4 right", "2 up, then 5 right"],
          0,
          "The path goes from (0, 2) right to (5, 2), which is 5 right. Then it goes up to (5, 6), which is 4 up.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The point (0, 6) is on the x-axis.",
        false,
        "(0, 6) is 0 across and 6 up, so it sits on the y-axis, the line going up the side. Points on the x-axis have 0 as their second number.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 8,
          axes: true,
          points: [
            { x: 3, y: 1, label: "A" },
            { x: 3, y: 7, label: "B" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Point C is 2 units to the right of the point exactly halfway between A and B. What are the coordinates of C?",
          ["(5, 4)", "(5,4)", "5, 4", "5,4"],
          "A is at (3, 1) and B is at (3, 7), 6 units apart. Halfway is 3 units up from A: (3, 4). 2 units right of that is (5, 4).",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has corners at (1, 1), (7, 1), (7, 4) and (1, 4). What is its perimeter, in units?",
        ["18", "18 units"],
        "From (1, 1) to (7, 1) is 7 − 1 = 6 units long. From (7, 1) to (7, 4) is 4 − 1 = 3 units. Perimeter: 6 + 3 + 6 + 3 = 18 units.",
      ),
    (n) =>
      choice(
        n,
        "Point P is at (4, 3). Point Q is 3 units above P. Point R is 2 units to the left of Q. Where is R?",
        ["(2, 6)", "(6, 6)", "(1, 6)", "(2, 1)"],
        0,
        "3 units above P adds 3 to the second number: Q is at (4, 6). 2 units left takes 2 from the first number: R is at (2, 6).",
      ),
  ],
});
