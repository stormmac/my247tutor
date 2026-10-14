/**
 * Year 6 Mathematics (measurement and geometry): 15 questions for each Stage 3 standard (NESA
 * outcome), three at each level from very easy to very hard. These are later Stage 3 questions,
 * a step harder than Year 5 on the same outcomes. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-GM-02: length, distance and perimeter, converting km, m, cm and mm with decimals. */
export const LENGTH = levels(6050101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "How many metres are in 1 kilometre?",
        ["100", "1000", "10", "10 000"],
        1,
        "Kilo means one thousand, so 1 kilometre is 1000 metres.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 9, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "Look at the ribbon on the ruler. How long is it in millimetres?",
          ["90", "90 mm"],
          "The ribbon reaches the 9 cm mark. Each centimetre is 10 mm, so 9 × 10 = 90 mm.",
        ),
      ),
    (n) => trueFalse(n, "1 centimetre is the same length as 10 millimetres.", true, "Every centimetre is split into 10 millimetres."),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "3.5 m = ___ cm",
        ["350", "350 cm"],
        "There are 100 cm in 1 metre, so 3.5 × 100 = 350 cm.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 7, height: 4, top: "7.5 m", side: "4 m" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. What is its perimeter?",
          ["23", "23 m"],
          "Add all four sides: 7.5 + 4 + 7.5 + 4 = 23 m.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the distance from Sydney to Newcastle?",
        ["kilometres", "metres", "centimetres", "millimetres"],
        0,
        "Sydney to Newcastle is a long way (more than 100 km), so kilometres are the best unit.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "2.75 km = ___ m",
        ["2750", "2750 m"],
        "There are 1000 m in 1 km, so 2.75 × 1000 = 2750 m.",
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["0.4 m", "45 cm", "480 mm", "0.5 m"],
        "Change them all to centimetres: 0.4 m = 40 cm, 45 cm, 480 mm = 48 cm and 0.5 m = 50 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 3],
            [4, 3],
            [4, 6],
            [0, 6],
          ],
          sideLabels: ["8 m", "3 m", "4 m", "3 m", "4 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles. What is its perimeter?",
          ["28", "28 m"],
          "Add every side: 8 + 3 + 4 + 3 + 4 + 6 = 28 m.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A square paddock has a perimeter of 1.2 km. How long is each side, in metres?",
        ["300", "300 m"],
        "1.2 km is 1200 m. A square has 4 equal sides, so 1200 ÷ 4 = 300 m.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 1.5 m? Choose all that are right.",
        ["150 cm", "1500 mm", "15 cm", "0.0015 km", "0.15 km"],
        [0, 1, 3],
        "1.5 m × 100 = 150 cm, 1.5 m × 1000 = 1500 mm, and 1.5 ÷ 1000 = 0.0015 km. 15 cm and 0.15 km (150 m) are wrong.",
      ),
    (n) =>
      choice(
        n,
        "Mia runs 4 laps of a 400 m track, then runs another 1.3 km. How far does she run altogether?",
        ["2.9 km", "1.7 km", "5.3 km", "2.09 km"],
        0,
        "4 × 400 m = 1600 m, and 1.3 km = 1300 m. 1600 + 1300 = 2900 m, which is 2.9 km.",
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
            [10, 4],
            [6, 4],
            [6, 7],
            [0, 7],
          ],
          sideLabels: ["10 m", "4 m", "", "", "", "7 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles, but some sides are not labelled. What is its perimeter?",
          ["34", "34 m"],
          "The missing sides are 10 − 6 = 4 m, 7 − 4 = 3 m and 6 m. So 10 + 4 + 4 + 3 + 6 + 7 = 34 m. (The perimeter is the same as a 10 m by 7 m rectangle: 2 × 17 = 34 m.)",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular garden bed is 3.6 m long and 85 cm wide. What is its perimeter in centimetres?",
        ["890", "890 cm"],
        "3.6 m = 360 cm. The perimeter is 360 + 85 + 360 + 85 = 890 cm.",
      ),
    (n) =>
      trueFalse(
        n,
        "Ella's rope is 3.08 m long and Sam's rope is 308 mm long. Ella's rope is 10 times as long as Sam's.",
        true,
        "3.08 m = 3080 mm, and 3080 is 10 times 308. So Ella's rope is 10 times as long.",
      ),
  ],
});

/** MA3-2DS-02: area of rectangles and composite shapes, in cm², m² and hectares. */
export const AREA = levels(6050201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 4, top: "6 cm", side: "4 cm" },
        choice(
          n,
          "Look at the rectangle. What is its area?",
          ["24 cm²", "20 cm²", "10 cm²", "24 cm"],
          0,
          "Area of a rectangle = length × width = 6 × 4 = 24 cm². Area is in square units, so not just cm.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Area is measured in square units, such as cm² and m².",
        true,
        "Area counts how many squares cover a surface, so it uses square units.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [7, 1],
            [7, 3],
            [4, 3],
            [4, 6],
            [1, 6],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 cm². What is the area of the shape?",
          ["21", "21 cm²"],
          "Split it into two rectangles: the bottom part is 6 × 2 = 12 squares and the top part is 3 × 3 = 9 squares. 12 + 9 = 21 cm².",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "1 hectare = ___ m²",
        ["10 000", "10000"],
        "A hectare is a square 100 m by 100 m, and 100 × 100 = 10 000 m².",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 3, top: "8 m", side: "3.5 m" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. What is its area?",
          ["28", "28 m²"],
          "Area = length × width = 8 × 3.5 = 28 m².",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the area of a farm?",
        ["hectares", "square centimetres", "millimetres", "millilitres"],
        0,
        "A farm is very big, so hectares are best. Millimetres measure length and millilitres measure capacity.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [9, 3],
            [4, 3],
            [4, 7],
            [0, 7],
          ],
          sideLabels: ["9 m", "3 m", "5 m", "4 m", "4 m", "7 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles. What is its area?",
          ["43", "43 m²"],
          "Split it into two rectangles. The bottom one is 9 × 3 = 27 m². The top one is 4 × 4 = 16 m². 27 + 16 = 43 m².",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has an area of 54 cm² and a width of 6 cm. How long is it?",
        ["9", "9 cm"],
        "Length × width = area, so length = 54 ÷ 6 = 9 cm.",
      ),
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 36 m²? Choose all that are right.",
        ["4 m × 9 m", "6 m × 6 m", "10 m × 8 m", "12 m × 3 m", "7 m × 5 m"],
        [0, 1, 3],
        "4 × 9, 6 × 6 and 12 × 3 all make 36. 10 × 8 = 80 (its perimeter is 36, not its area) and 7 × 5 = 35.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A paddock is 400 m long and 250 m wide. What is its area in hectares?",
        ["10", "10 ha", "10 hectares"],
        "400 × 250 = 100 000 m². Each hectare is 10 000 m², so 100 000 ÷ 10 000 = 10 hectares.",
      ),
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
          sideLabels: ["10 m", "6 m", "3 m", "3 m", "4 m", "3 m", "3 m", "6 m"],
        },
        choice(
          n,
          "Look at the shape. All its corners are right angles. What is its area?",
          ["48 m²", "60 m²", "52 m²", "40 m²"],
          0,
          "The whole rectangle would be 10 × 6 = 60 m². The gap cut out of the top is 4 × 3 = 12 m². 60 − 12 = 48 m².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "If you double both the length and the width of a rectangle, its area doubles too.",
        false,
        "Try 2 m × 3 m = 6 m². Doubled, it is 4 m × 6 m = 24 m², which is 4 times as big, not 2 times.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A backyard is 15 m by 10 m. A 6 m by 4 m swimming pool takes up part of it, and the rest is grass. Turf costs $9 per square metre. How much does it cost to turf the grass?",
        ["1134", "$1134"],
        "Backyard: 15 × 10 = 150 m². Pool: 6 × 4 = 24 m². Grass: 150 − 24 = 126 m². Cost: 126 × $9 = $1134.",
      ),
    (n) =>
      choice(
        n,
        "A square has a perimeter of 28 cm. What is its area?",
        ["49 cm²", "28 cm²", "196 cm²", "56 cm²"],
        0,
        "Each side is 28 ÷ 4 = 7 cm, so the area is 7 × 7 = 49 cm².",
      ),
    (n) =>
      ordering(
        n,
        "Put these areas in order from smallest to largest.",
        ["8000 m²", "1 hectare", "1.5 hectares", "20 000 m²"],
        "Change them all to m²: 8000 m², 1 ha = 10 000 m², 1.5 ha = 15 000 m², then 20 000 m².",
      ),
  ],
});

/** MA3-2DS-03: area of parallelograms and triangles by combining, splitting and rearranging. */
export const AREA_TRI = levels(6050301, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [7, 1],
            [1, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "This triangle is half of a rectangle. Each square is 1 cm². What is the area of the triangle?",
          ["12", "12 cm²"],
          "The rectangle around it is 6 × 4 = 24 cm². The triangle is half of that: 24 ÷ 2 = 12 cm².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle has half the area of a rectangle with the same base and height.",
        true,
        "Two copies of the triangle fit together to make the rectangle, so the triangle is half of it.",
      ),
    (n) =>
      choice(
        n,
        "Which rule gives the area of a parallelogram?",
        ["base × perpendicular height", "base + height", "2 × (base + height)", "base × slanting side"],
        0,
        "Cut the triangle off one end and move it to the other end. You get a rectangle, so the area is base × perpendicular height.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [8, 1],
            [10, 5],
            [3, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the parallelogram. Each square is 1 cm². What is its area?",
          ["28", "28 cm²"],
          "The base is 7 squares and the perpendicular height is 4 squares. Area = 7 × 4 = 28 cm².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Area of a triangle = ½ × base × ___",
        ["height", "perpendicular height"],
        "A triangle is half a rectangle, so its area is ½ × base × height.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [4, 7],
          ],
          sideLabels: ["10 cm"],
        },
        choice(
          n,
          "The base of this triangle is 10 cm and its perpendicular height is 6 cm. What is its area?",
          ["30 cm²", "60 cm²", "16 cm²", "32 cm²"],
          0,
          "Area = ½ × base × height = ½ × 10 × 6 = 30 cm². 60 cm² forgets to halve.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A parallelogram has a base of 12 m and a perpendicular height of 5 m. What is its area?",
        ["60", "60 m²"],
        "Area of a parallelogram = base × perpendicular height = 12 × 5 = 60 m².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [6, 6],
          ],
          grid: true,
        },
        choice(
          n,
          "Each square is 1 m². What is the area of the triangle?",
          ["20 m²", "40 m²", "13 m²", "25 m²"],
          0,
          "The base is 8 squares long and the triangle is 5 squares high. Area = ½ × 8 × 5 = 20 m².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A parallelogram with a base of 8 cm and a slanting side of 5 cm must have an area of 40 cm².",
        false,
        "You need the perpendicular (straight up) height, not the slanting side. The height is less than 5 cm, so the area is less than 40 cm².",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A triangle has an area of 24 cm² and a base of 8 cm. What is its perpendicular height?",
        ["6", "6 cm"],
        "½ × 8 × height = 24, so 4 × height = 24 and the height is 6 cm.",
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have an area of 18 cm²? Choose all that are right.",
        [
          "a triangle with base 6 cm and height 6 cm",
          "a parallelogram with base 6 cm and height 3 cm",
          "a triangle with base 9 cm and height 2 cm",
          "a rectangle 9 cm by 2 cm",
          "a triangle with base 3 cm and height 6 cm",
        ],
        [0, 1, 3],
        "½ × 6 × 6 = 18, 6 × 3 = 18 and 9 × 2 = 18. The triangles with base 9, height 2 and base 3, height 6 are only 9 cm².",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [9, 5],
            [5, 8],
            [1, 5],
          ],
          sideLabels: ["8 m", "4 m"],
        },
        typed(
          "short_answer",
          n,
          "This shape is a rectangle with a triangle on top. The rectangle is 8 m by 4 m, and the whole shape is 7 m tall. What is its area?",
          ["44", "44 m²"],
          "Rectangle: 8 × 4 = 32 m². The triangle has base 8 m and height 7 − 4 = 3 m, so ½ × 8 × 3 = 12 m². 32 + 12 = 44 m².",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A parallelogram and a triangle both have a base of 10 cm. The parallelogram's height is 4 cm. The two shapes have the same area. What is the triangle's height?",
        ["8 cm", "4 cm", "2 cm", "20 cm"],
        0,
        "The parallelogram is 10 × 4 = 40 cm². For the triangle, ½ × 10 × height = 40, so 5 × height = 40 and the height is 8 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [10, 6],
            [0, 3],
          ],
          sideLabels: ["10 m", "6 m", "", "3 m"],
        },
        typed(
          "short_answer",
          n,
          "This shape is a 10 m by 6 m rectangle with a triangle cut off the top. What is its area?",
          ["45", "45 m²"],
          "The rectangle is 10 × 6 = 60 m². The cut-off triangle has base 10 m and height 6 − 3 = 3 m, so ½ × 10 × 3 = 15 m². 60 − 15 = 45 m².",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest area to largest.",
        [
          "triangle: base 6 cm, height 5 cm",
          "parallelogram: base 4 cm, height 5 cm",
          "square: sides 5 cm",
          "triangle: base 10 cm, height 6 cm",
        ],
        "Work out each area: ½ × 6 × 5 = 15, 4 × 5 = 20, 5 × 5 = 25 and ½ × 10 × 6 = 30 cm².",
      ),
  ],
});

/** MA3-3DS-02: volume and capacity in cm³, m³, mL and L (1 cm³ = 1 mL). */
export const VOLUME = levels(6050401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of the block?",
          ["12", "12 cm³"],
          "Each layer is 3 × 2 = 6 cubes, and there are 2 layers. 6 × 2 = 12 cm³.",
        ),
      ),
    (n) => trueFalse(n, "A 1 cm³ container holds exactly 1 mL of water.", true, "1 cubic centimetre and 1 millilitre are the same amount of space."),
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 1.5, step: 0.25, unit: "L" },
        choice(
          n,
          "How many millilitres of water are in the jug?",
          ["1500 mL", "150 mL", "15 mL", "1.5 mL"],
          0,
          "The water is at 1.5 L. There are 1000 mL in a litre, so 1.5 × 1000 = 1500 mL.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        choice(
          n,
          "Each small cube is 1 cm³. What is the volume of the block?",
          ["24 cm³", "9 cm³", "52 cm³", "14 cm³"],
          0,
          "Volume = length × width × height = 4 × 3 × 2 = 24 cm³.",
        ),
      ),
    (n) =>
      typed("fill_blank", n, "2.5 L = ___ mL", ["2500", "2500 mL"], "There are 1000 mL in 1 L, so 2.5 × 1000 = 2500 mL."),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the volume of a shipping container?",
        ["cubic metres (m³)", "cubic centimetres (cm³)", "millilitres (mL)", "millimetres (mm)"],
        0,
        "A shipping container is huge, so cubic metres are best. Millimetres measure length, not volume.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular prism is 8 cm long, 5 cm wide and 3 cm high. What is its volume?",
        ["120", "120 cm³"],
        "Volume = 8 × 5 × 3 = 120 cm³.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 3, height: 4 },
        typed(
          "short_answer",
          n,
          "A box is the same size as this block, and each small cube is 1 cm³. How many millilitres of water would fill the box?",
          ["60", "60 mL"],
          "The volume is 5 × 3 × 4 = 60 cm³. Since 1 cm³ holds 1 mL, the box holds 60 mL.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from smallest to largest.",
        ["450 mL", "0.5 L", "750 cm³", "1.2 L"],
        "Change them all to mL: 450 mL, 0.5 L = 500 mL, 750 cm³ = 750 mL, 1.2 L = 1200 mL.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A fish tank is 50 cm long, 30 cm wide and 40 cm high. How many litres of water does it hold when full?",
        ["60", "60 L"],
        "Volume = 50 × 30 × 40 = 60 000 cm³ = 60 000 mL. There are 1000 mL in a litre, so it holds 60 L.",
      ),
    (n) =>
      multi(
        n,
        "Which of these rectangular prisms have a volume of 48 cm³? Choose all that are right.",
        ["4 cm × 4 cm × 3 cm", "6 cm × 2 cm × 4 cm", "8 cm × 3 cm × 2 cm", "12 cm × 2 cm × 3 cm", "10 cm × 4 cm × 2 cm"],
        [0, 1, 2],
        "4 × 4 × 3, 6 × 2 × 4 and 8 × 3 × 2 all make 48. 12 × 2 × 3 = 72 and 10 × 4 × 2 = 80.",
      ),
    (n) =>
      choice(
        n,
        "A water tank holds 1 m³. How many litres is that?",
        ["1000 L", "100 L", "10 L", "1 000 000 L"],
        0,
        "1 m³ is 100 cm × 100 cm × 100 cm = 1 000 000 cm³, which is 1 000 000 mL. Divide by 1000 to get 1000 L.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 2, height: 3 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. How many more cubes must be added on top to make it 6 cubes high?",
          ["30"],
          "Each layer has 5 × 2 = 10 cubes. It is 3 layers high now, so 3 more layers are needed: 3 × 10 = 30 cubes.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangular prism has a volume of 360 cm³. It is 10 cm long and 6 cm wide. How high is it?",
        ["6", "6 cm"],
        "The bottom layer is 10 × 6 = 60 cm³. 360 ÷ 60 = 6, so it is 6 cm high.",
      ),
    (n) =>
      choice(
        n,
        "A 2 L bottle of water is poured into cups that each hold 150 mL. How many cups can be filled right to the top?",
        ["13", "14", "12", "15"],
        0,
        "2 L = 2000 mL. 13 × 150 = 1950 mL, and there isn't enough left (50 mL) to fill a 14th cup. So 13 cups.",
      ),
  ],
});

/** MA3-NSM-01: mass in grams, kilograms and tonnes. */
export const MASS = levels(6050501, {
  very_easy: [
    (n) =>
      choice(
        n,
        "How many kilograms are in 1 tonne?",
        ["1000", "100", "10", "10 000"],
        0,
        "1 tonne is 1000 kilograms.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 3.5, step: 0.5, unit: "kg" },
        choice(
          n,
          "What mass does the scale show?",
          ["3.5 kg", "3.05 kg", "35 kg", "4.5 kg"],
          0,
          "The pointer is halfway between 3 and 4, so it shows 3.5 kg.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The mass of a loaded truck is best measured in tonnes.",
        true,
        "A loaded truck weighs thousands of kilograms, so tonnes are the best unit.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "2.4 kg = ___ g", ["2400", "2400 g"], "There are 1000 g in 1 kg, so 2.4 × 1000 = 2400 g."),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 750, step: 50, unit: "g" },
        typed(
          "short_answer",
          n,
          "Look at the scale. What is this mass in kilograms?",
          ["0.75", "0.75 kg"],
          "The scale shows 750 g. Divide by 1000 to change grams to kilograms: 750 ÷ 1000 = 0.75 kg.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the mass of a fully grown red kangaroo?",
        ["60 kg", "60 g", "6 t", "600 kg"],
        0,
        "A big kangaroo is a bit like an adult person, so about 60 kg. 60 g is a mouse, and 6 t is heavier than an elephant.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these masses in order from lightest to heaviest.",
        ["0.08 t", "95 kg", "0.1 t", "120 kg"],
        "Change them all to kilograms: 0.08 t = 80 kg, 95 kg, 0.1 t = 100 kg, 120 kg.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "3 bags of potatoes each have a mass of 2.5 kg. What is their total mass in kilograms?",
        ["7.5", "7.5 kg"],
        "3 × 2.5 = 7.5 kg.",
      ),
    (n) => typed("fill_blank", n, "3.2 t = ___ kg", ["3200", "3200 kg"], "There are 1000 kg in 1 tonne, so 3.2 × 1000 = 3200 kg."),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 2.5, step: 0.5, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows 5 jars of honey that all have the same mass. What is the mass of one jar, in grams?",
          ["500", "500 g"],
          "The scale shows 2.5 kg, which is 2500 g. 2500 ÷ 5 = 500 g.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same as 1.5 t? Choose all that are right.",
        ["1500 kg", "150 kg", "1 500 000 g", "15 000 kg", "1 t 500 kg"],
        [0, 2, 4],
        "1.5 × 1000 = 1500 kg, which is 1 t and 500 kg. In grams, 1500 × 1000 = 1 500 000 g.",
      ),
    (n) =>
      choice(
        n,
        "A ute can safely carry 1 t. It already has 650 kg in the back. Which load can still be added safely?",
        ["8 bags of 40 kg", "8 bags of 50 kg", "4 bags of 100 kg", "9 bags of 40 kg"],
        0,
        "1 t = 1000 kg, so 1000 − 650 = 350 kg is left. 8 × 40 = 320 kg fits. 400 kg and 360 kg are too much.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "An empty truck has a mass of 4.6 t. It is loaded with 120 boxes that each have a mass of 25 kg. What is the total mass, in tonnes?",
        ["7.6", "7.6 t"],
        "120 × 25 = 3000 kg, which is 3 t. 4.6 + 3 = 7.6 t.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 4, value: 3.6, step: 0.2, unit: "kg" },
        trueFalse(
          n,
          "The scale shows a bag of 24 apples. On average, each apple has a mass of 150 g.",
          true,
          "The scale shows 3.6 kg, which is 3600 g. 3600 ÷ 24 = 150 g.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "One cake needs 375 g of flour. Flour comes in 1 kg bags. How many bags must you buy to make 7 cakes?",
        ["3", "3 bags"],
        "7 × 375 = 2625 g, which is 2.625 kg. 2 bags is only 2 kg, so you need 3 bags.",
      ),
  ],
});

/** MA3-NSM-02: 12- and 24-hour time, timetables and time zones across Australia. */
export const TIME = levels(6050601, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is 2:30 pm in 24-hour time?",
        ["14:30", "02:30", "12:30", "16:30"],
        0,
        "For pm times after midday, add 12 to the hour: 2 + 12 = 14, so 14:30.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 40 },
        choice(
          n,
          "The clock shows a time in the evening. What is it in 24-hour time?",
          ["21:40", "09:40", "20:40", "21:08"],
          0,
          "The clock shows 9:40. In the evening that is 9:40 pm, and 9 + 12 = 21, so 21:40.",
        ),
      ),
    (n) => trueFalse(n, "00:15 is a quarter past midnight.", true, "In 24-hour time the day starts at 00:00 (midnight), so 00:15 is 15 minutes after midnight."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many minutes are there from 13:45 to 15:10?",
        ["85", "85 minutes"],
        "13:45 to 14:00 is 15 minutes, 14:00 to 15:00 is 60 minutes, and 15:00 to 15:10 is 10 minutes. 15 + 60 + 10 = 85 minutes.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In 12-hour time, 18:25 is ___ pm.",
        ["6:25", "6:25 pm", "6:25pm"],
        "18 − 12 = 6, so 18:25 is 6:25 pm.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Station", "Train departs"],
          rows: [
            ["Central", "07:42"],
            ["Strathfield", "07:56"],
            ["Parramatta", "08:13"],
            ["Blacktown", "08:29"],
          ],
        },
        choice(
          n,
          "Look at the train timetable. How long does the train take to go from Central to Parramatta?",
          ["31 minutes", "29 minutes", "71 minutes", "13 minutes"],
          0,
          "07:42 to 08:00 is 18 minutes, and 08:00 to 08:13 is 13 minutes. 18 + 13 = 31 minutes.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Station", "Train departs"],
          rows: [
            ["Central", "07:42"],
            ["Strathfield", "07:56"],
            ["Parramatta", "08:13"],
            ["Blacktown", "08:29"],
          ],
        },
        trueFalse(
          n,
          "Look at the timetable. The train reaches Blacktown before half past eight in the morning.",
          true,
          "Half past eight in the morning is 08:30. The train is at Blacktown at 08:29, one minute earlier.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A movie starts at 19:35 and runs for 2 hours 40 minutes. What time does it finish, in 24-hour time?",
        ["22:15"],
        "19:35 plus 2 hours is 21:35. Add 40 more minutes: 21:35 + 25 minutes = 22:00, and 15 more minutes gives 22:15.",
      ),
    (n) =>
      ordering(
        n,
        "Put these times in order from earliest to latest in the same day.",
        ["06:50", "9:15 am", "13:05", "4:40 pm", "22:10"],
        "Change them all to 24-hour time: 06:50, 09:15, 13:05, 16:40 and 22:10.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "It is not daylight saving time. Perth is 2 hours behind Sydney. When it is 3:00 pm in Sydney, what time is it in Perth?",
        ["1:00 pm", "5:00 pm", "2:30 pm", "12:00 pm"],
        0,
        "Perth is behind, so take away 2 hours: 3:00 pm − 2 hours = 1:00 pm.",
      ),
    (n) =>
      multi(
        n,
        "When it is not daylight saving time, which of these cities have the same time as Sydney? Choose all that are right.",
        ["Brisbane", "Melbourne", "Adelaide", "Perth", "Hobart"],
        [0, 1, 4],
        "Queensland, Victoria, Tasmania and NSW share Australian Eastern Standard Time. Adelaide is half an hour behind and Perth is 2 hours behind.",
      ),
    (n) =>
      choice(
        n,
        "A coach leaves Dubbo at 09:48 and arrives in Sydney at 15:20. How long is the trip?",
        ["5 h 32 min", "6 h 32 min", "5 h 28 min", "6 h 28 min"],
        0,
        "09:48 to 14:48 is 5 hours. 14:48 to 15:20 is 12 + 20 = 32 minutes. So 5 h 32 min.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "It is not daylight saving time, and Perth is 2 hours behind Sydney. A plane leaves Sydney at 1:30 pm Sydney time and flies for 5 hours to Perth. What is the time in Perth when it lands?",
        ["4:30 pm", "4:30pm", "4:30", "16:30"],
        "1:30 pm + 5 hours = 6:30 pm Sydney time. Perth is 2 hours behind, so it is 4:30 pm in Perth.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Bus leaves Wollongong", "Bus arrives in Sydney"],
          rows: [
            ["06:45", "08:10"],
            ["07:20", "08:50"],
            ["08:05", "09:25"],
            ["08:40", "10:05"],
          ],
        },
        choice(
          n,
          "Look at the bus timetable. Which bus has the shortest trip?",
          ["the 08:05 bus", "the 06:45 bus", "the 07:20 bus", "the 08:40 bus"],
          0,
          "The trips take 1 h 25 min (06:45), 1 h 30 min (07:20), 1 h 20 min (08:05) and 1 h 25 min (08:40). The 08:05 bus is quickest.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Sydney is 30 minutes ahead of Adelaide. A cricket match in Adelaide starts at 10:30 am Adelaide time. To watch the start live, a fan in Sydney should turn on the TV at 10:00 am Sydney time.",
        false,
        "Sydney is ahead, so its clocks show a later time. 10:30 am in Adelaide is 11:00 am in Sydney, not 10:00 am.",
      ),
  ],
});

/** MA3-2DS-01: classifying triangles and quadrilaterals by their properties. */
export const SHAPES_2D = levels(6030201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [10, 1],
            [6, 8],
          ],
          sideLabels: ["6 cm", "6 cm", "6 cm"],
        },
        choice(
          n,
          "Look at the triangle. What is the best name for it?",
          ["equilateral", "isosceles", "scalene", "right-angled"],
          0,
          "All three sides are 6 cm. A triangle with three equal sides is equilateral.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every square is also a rectangle.",
        true,
        "A rectangle has four right angles and opposite sides equal. A square has all of that, so it is a special rectangle.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [8, 6],
            [3, 6],
          ],
        },
        choice(
          n,
          "What is this quadrilateral called?",
          ["trapezium", "parallelogram", "kite", "rhombus"],
          0,
          "The top and bottom are parallel, but the slanting sides are not. A quadrilateral with one pair of parallel sides is a trapezium.",
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
            [7, 1],
            [11, 5],
          ],
          sideLabels: ["6 cm", "5.7 cm", "10.8 cm"],
        },
        multi(
          n,
          "Which words describe this triangle? Choose all that are right.",
          ["scalene", "obtuse-angled", "equilateral", "right-angled", "isosceles"],
          [0, 1],
          "All three sides are different, so it is scalene. The angle at the bottom right is bigger than a right angle, so it is obtuse-angled.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which quadrilateral has two pairs of equal sides next to each other, but no parallel sides?",
        ["kite", "rhombus", "parallelogram", "trapezium"],
        0,
        "A kite has two pairs of equal sides that sit next to each other. A rhombus and a parallelogram have parallel sides.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with exactly two equal sides is called an ___ triangle.",
        ["isosceles"],
        "Isosceles triangles have two equal sides and two equal angles.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [8, 1],
            [11, 6],
            [4, 6],
          ],
        },
        multi(
          n,
          "Look at this parallelogram. Which of these are true? Choose all that are right.",
          ["Opposite sides are parallel", "Opposite sides are equal", "All its angles are right angles", "All four sides are equal"],
          [0, 1],
          "In a parallelogram, opposite sides are parallel and equal. Its angles are not right angles, and the slanting sides are shorter than the top and bottom.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle can have two right angles.",
        false,
        "The angles in a triangle add to 180°. Two right angles already make 180°, leaving nothing for the third angle.",
      ),
    (n) =>
      choice(
        n,
        "A rhombus is a parallelogram with…",
        ["four equal sides", "four right angles", "only one pair of parallel sides", "no equal sides"],
        0,
        "A rhombus has opposite sides parallel like any parallelogram, and all four sides are equal.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [6, 1],
            [9, 5],
            [6, 8],
            [3, 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "This shape is a kite. How many lines of symmetry does it have?",
          ["1", "one"],
          "A kite has one line of symmetry, running from the top point to the bottom point. Fold along it and the halves match.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shape names in order from the most general to the most special.",
        ["quadrilateral", "parallelogram", "rectangle", "square"],
        "Every square is a rectangle, every rectangle is a parallelogram, and every parallelogram is a quadrilateral.",
      ),
    (n) =>
      choice(
        n,
        "Which quadrilateral always has diagonals that are equal in length and cross at right angles?",
        ["square", "rectangle", "rhombus", "parallelogram"],
        0,
        "A rectangle's diagonals are equal, and a rhombus's diagonals cross at right angles. Only the square has both.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are always true? Choose all that are right.",
        [
          "Every rhombus is a parallelogram",
          "Every rectangle is a square",
          "Every square is a rhombus",
          "A rectangle's diagonals are equal in length",
          "Every kite has four equal sides",
        ],
        [0, 2, 3],
        "A rhombus has two pairs of parallel sides, a square has four equal sides, and a rectangle's diagonals are equal. Most rectangles are not squares and most kites don't have four equal sides.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [7, 1],
            [1, 7],
          ],
          sideLabels: ["6 cm", "", "6 cm"],
        },
        choice(
          n,
          "This right-angled triangle has two equal sides. What size is each of its other two angles?",
          ["45°", "90°", "60°", "30°"],
          0,
          "The angles add to 180°. Take away the right angle: 180 − 90 = 90°. The two equal sides make the other two angles equal, so 90 ÷ 2 = 45°.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A triangle has angles of 35° and 55°. Is it acute-angled, right-angled or obtuse-angled?",
        ["right-angled", "right angled", "right"],
        "The third angle is 180 − 35 − 55 = 90°, so the triangle is right-angled.",
      ),
  ],
});

/** MA3-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(6030301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        choice(
          n,
          "What is this object called?",
          ["triangular prism", "triangular pyramid", "rectangular prism", "cone"],
          0,
          "It has two triangle ends joined by rectangles, so it is a triangular prism.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many faces does this square pyramid have?",
          ["5", "five"],
          "It has 1 square base and 4 triangle faces: 1 + 4 = 5 faces.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A prism has two matching end faces joined by rectangles.",
        true,
        "That is what makes a prism: two identical ends (bases) with rectangles around the sides.",
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
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
          ],
        },
        trueFalse(
          n,
          "These six shaded squares make a net that folds into a cube.",
          true,
          "This is the cross-shaped net. The row of four wraps around the sides, and the squares above and below fold up to make the top and bottom.",
        ),
      ),
    (n) =>
      choice(
        n,
        "How many edges does a triangular prism have?",
        ["9", "6", "5", "12"],
        0,
        "Each triangle end has 3 edges (6 altogether), and 3 more edges join the ends. 6 + 3 = 9.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        typed(
          "short_answer",
          n,
          "How many vertices (corners) does this triangular pyramid have?",
          ["4", "four"],
          "It has 3 corners around the triangle base and 1 at the top: 3 + 1 = 4.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 2,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
        },
        trueFalse(
          n,
          "These six shaded squares make a net that folds into a cube.",
          false,
          "In a 2 by 3 block, the squares fold on top of each other and leave two faces open, so it can't make a cube.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 2 pentagons and 5 rectangles. What object does it fold into?",
        ["pentagonal prism", "pentagonal pyramid", "hexagonal prism", "rectangular prism"],
        0,
        "Two matching pentagon ends joined by rectangles make a pentagonal prism.",
      ),
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest faces to most faces.",
        ["triangular pyramid", "square pyramid", "rectangular prism", "hexagonal prism"],
        "A triangular pyramid has 4 faces, a square pyramid 5, a rectangular prism 6 and a hexagonal prism 8.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these objects have exactly 6 vertices? Choose all that are right.",
        ["triangular prism", "pentagonal pyramid", "cube", "square pyramid", "hexagonal pyramid"],
        [0, 1],
        "A triangular prism has 3 + 3 = 6 vertices and a pentagonal pyramid has 5 + 1 = 6. A cube has 8, a square pyramid 5 and a hexagonal pyramid 7.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pyramid has a base with 8 sides (an octagon). How many faces does it have?",
        ["9", "nine"],
        "There is 1 octagon base and a triangle face on each of its 8 sides: 1 + 8 = 9 faces.",
      ),
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
            [1, 2],
          ],
        },
        choice(
          n,
          "Can these six shaded squares fold into a cube?",
          ["No, two squares would overlap", "Yes, it makes a cube", "No, it has too few squares", "No, it has too many squares"],
          0,
          "The row of four wraps around the sides. The two squares on top are side by side, so both try to become the top face and overlap, leaving the bottom open.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A prism has 18 edges. How many faces does it have?",
        ["8", "eight"],
        "A prism has 3 edges for every side of its base, so the base has 18 ÷ 3 = 6 sides (a hexagonal prism). It has 2 hexagon ends and 6 rectangles: 8 faces.",
      ),
    (n) =>
      choice(
        n,
        "Which object has 7 faces, 15 edges and 10 vertices?",
        ["pentagonal prism", "hexagonal pyramid", "hexagonal prism", "pentagonal pyramid"],
        0,
        "A pentagonal prism has 2 pentagons and 5 rectangles (7 faces), 5 + 5 + 5 = 15 edges and 5 + 5 = 10 vertices.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "Imagine slicing straight through this prism, parallel to its triangular ends. What 2D shape is the cut face?",
          ["triangle", "a triangle"],
          "A slice parallel to the ends of a prism is always the same shape as the ends, so it is a triangle.",
        ),
      ),
  ],
});

/** MA3-GM-03: measuring angles, angles on a straight line, at a point, vertically opposite and in a triangle. */
export const ANGLES = levels(6030101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 135 },
        choice(
          n,
          "What type of angle is this?",
          ["obtuse", "acute", "right", "reflex"],
          0,
          "It is bigger than a right angle (90°) but smaller than a straight angle (180°), so it is obtuse.",
        ),
      ),
    (n) => trueFalse(n, "Angles on a straight line add up to 180°.", true, "A straight line is half a full turn, and half of 360° is 180°."),
    (n) =>
      pic(
        { kind: "angle", degrees: 60 },
        choice(
          n,
          "Which is the best estimate for the size of this angle?",
          ["60°", "120°", "30°", "160°"],
          0,
          "It is smaller than a right angle, so it is acute, and it is a bit less than 90°. 60° is the best fit; 30° would be much narrower.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 110, label: "110°" },
        typed(
          "short_answer",
          n,
          "This 110° angle and another angle sit together on a straight line. How big is the other angle?",
          ["70", "70°"],
          "Angles on a straight line add to 180°, so 180 − 110 = 70°.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 250 },
        choice(
          n,
          "What type of angle is this?",
          ["reflex", "obtuse", "straight", "acute"],
          0,
          "It is more than a straight angle (180°) but less than a full turn (360°), so it is a reflex angle.",
        ),
      ),
    (n) => typed("fill_blank", n, "Angles at a point add up to ___°.", ["360", "360°"], "Angles all the way around a point make a full turn, which is 360°."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Three angles meet at a point. Two of them are 120° and 95°. How big is the third angle?",
        ["145", "145°"],
        "Angles at a point add to 360°. 120 + 95 = 215, and 360 − 215 = 145°.",
      ),
    (n) =>
      trueFalse(
        n,
        "When two straight lines cross, the angles opposite each other (vertically opposite angles) are equal.",
        true,
        "Each pair of opposite angles shares a partner on a straight line, so they must be the same size.",
      ),
    (n) =>
      ordering(
        n,
        "Put these angle types in order from smallest to largest.",
        ["acute", "right", "obtuse", "straight", "reflex"],
        "Acute is less than 90°, right is 90°, obtuse is between 90° and 180°, straight is 180° and reflex is more than 180°.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two angles of a triangle are 48° and 77°. How big is the third angle?",
        ["55", "55°"],
        "The angles in a triangle add to 180°. 48 + 77 = 125, and 180 − 125 = 55°.",
      ),
    (n) =>
      choice(
        n,
        "Two straight lines cross. One of the four angles is 40°. What are the other three angles, going around?",
        ["140°, 40°, 140°", "40°, 40°, 40°", "140°, 140°, 140°", "50°, 40°, 50°"],
        0,
        "The angles next to 40° are on a straight line with it, so 180 − 40 = 140°. The opposite angle is equal, 40°.",
      ),
    (n) =>
      multi(
        n,
        "Which sets of angles could be the three angles of a triangle? Choose all that are right.",
        ["60°, 60°, 60°", "90°, 45°, 45°", "100°, 50°, 40°", "30°, 30°, 120°", "90°, 90°, 10°"],
        [0, 1, 3],
        "The three angles must add to exactly 180°. 100 + 50 + 40 = 190 and 90 + 90 + 10 = 190, so those two can't work.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "angle", degrees: 125, label: "125°" },
        typed(
          "short_answer",
          n,
          "This 125° angle is one angle of an isosceles triangle. The other two angles are equal. How big is each of them?",
          ["27.5", "27.5°"],
          "180 − 125 = 55° is left for the other two angles. They are equal, so 55 ÷ 2 = 27.5° each.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Three angles meet at a point. The second angle is twice the first, and the third is three times the first. How big is the first angle?",
        ["60°", "30°", "120°", "45°"],
        0,
        "Together they make 1 + 2 + 3 = 6 lots of the first angle, and that is 360°. 360 ÷ 6 = 60°.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 72, label: "72°" },
        typed(
          "short_answer",
          n,
          "A straight line is split into three angles: this 72° angle, a right angle and one more. How big is the last angle?",
          ["18", "18°"],
          "The three angles add to 180°. 180 − 90 − 72 = 18°.",
        ),
      ),
  ],
});

/** MA3-GM-01: locating and describing points on the coordinate plane, in all four quadrants. */
export const COORDINATES = levels(6030401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 6, axes: true, points: [{ x: 4, y: 2, label: "A" }] },
        choice(
          n,
          "What are the coordinates of point A?",
          ["(4, 2)", "(2, 4)", "(4, 4)", "(2, 2)"],
          0,
          "Go across first, then up. A is 4 across and 2 up, so it is (4, 2).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In the coordinates (5, 3), the 5 tells you how far to go across, along the x-axis.",
        true,
        "The first number is the x-coordinate (across) and the second is the y-coordinate (up or down).",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: -5, to: 5, jumps: 10, dotAt: 2, labelEvery: true },
        choice(
          n,
          "What number is the dot on?",
          ["−3", "3", "−2", "−4"],
          0,
          "The dot is 3 steps to the left of 0, so it is on −3.",
        ),
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
            { x: 3, y: 5, label: "P" },
            { x: 6, y: 1, label: "Q" },
            { x: 1, y: 6, label: "R" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Which point is at (6, 1)?",
          ["Q"],
          "Go 6 across and 1 up. That is point Q. (Point R is at (1, 6), the numbers the other way round.)",
        ),
      ),
    (n) =>
      choice(
        n,
        "The point (−2, 3) is in which quadrant?",
        ["second", "first", "third", "fourth"],
        0,
        "x is negative (left) and y is positive (up). Left and up is the second quadrant, the top left.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The point where the x-axis and y-axis cross is called the ___.",
        ["origin", "the origin"],
        "The origin is the point (0, 0), where the two axes cross.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 8,
          axes: true,
          points: [
            { x: 2, y: 3, label: "A" },
            { x: 6, y: 3, label: "B" },
            { x: 6, y: 7, label: "C" },
          ],
        },
        typed(
          "short_answer",
          n,
          "A, B and C are three corners of a square. What are the coordinates of the fourth corner?",
          ["(2, 7)", "(2,7)", "2, 7", "2,7"],
          "The fourth corner is straight above A and level with C: x = 2 like A, y = 7 like C. So it is (2, 7).",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these points have a negative x-coordinate? Choose all that are right.",
        ["(−3, 2)", "(4, −1)", "(−5, −5)", "(0, 6)", "(−1, 0)"],
        [0, 2, 4],
        "The x-coordinate is the first number. It is negative in (−3, 2), (−5, −5) and (−1, 0).",
      ),
    (n) =>
      trueFalse(
        n,
        "The point (0, −4) lies on the y-axis.",
        true,
        "Its x-coordinate is 0, so it doesn't move left or right. It sits on the y-axis, 4 below the origin.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Start at (3, −2). Move 5 units left and then 4 units up. Where do you finish?",
        ["(−2, 2)", "(8, 2)", "(−2, −6)", "(7, −7)"],
        0,
        "Left changes x: 3 − 5 = −2. Up changes y: −2 + 4 = 2. You finish at (−2, 2).",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 10,
          rows: 8,
          axes: true,
          points: [
            { x: 1, y: 2, label: "A" },
            { x: 7, y: 2, label: "B" },
            { x: 7, y: 6, label: "C" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Walk along the grid lines from A to B, then from B to C. How many units do you walk?",
          ["10", "10 units"],
          "A to B is 7 − 1 = 6 units across. B to C is 6 − 2 = 4 units up. 6 + 4 = 10 units.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these points in order from left to right on the coordinate plane.",
        ["(−6, 1)", "(−2, 5)", "(0, −3)", "(3, 2)", "(7, −4)"],
        "Left to right depends only on the x-coordinate (the first number): −6, −2, 0, 3, 7.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A rectangle has three corners at (−3, 2), (4, 2) and (4, −1). Where is the fourth corner?",
        ["(−3, −1)", "(−1, −3)", "(3, −1)", "(−3, 1)"],
        0,
        "The fourth corner is below (−3, 2) and level with (4, −1). So x = −3 and y = −1: (−3, −1).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many units apart are the points (−4, 3) and (5, 3)?",
        ["9", "9 units"],
        "Both points have y = 3, so count across: from −4 to 0 is 4 units and from 0 to 5 is 5 units. 4 + 5 = 9 units.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 5, axes: true, points: [{ x: 5, y: 3, label: "T" }] },
        choice(
          n,
          "Point T is reflected (flipped) across the y-axis. Where does it land?",
          ["(−5, 3)", "(5, −3)", "(−5, −3)", "(3, 5)"],
          0,
          "T is at (5, 3). Flipping across the y-axis moves it to the same distance on the left, so x becomes −5 and y stays 3: (−5, 3).",
        ),
      ),
  ],
});
