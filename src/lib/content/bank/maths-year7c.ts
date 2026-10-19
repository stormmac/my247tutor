/**
 * Year 7 Mathematics: Stage 4 (NESA outcomes), two sets of 15 questions for each standard, three
 * at each level from very easy to very hard. Covers area, angle relationships and the properties
 * and transformations of triangles and quadrilaterals. Arithmetic answers are checked by the
 * content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-ARE-C-01: area of rectangles, triangles, parallelograms, trapeziums, rhombuses, kites and composite shapes, and converting area units. */
export const AREA = levels(7050201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 5, top: "9 cm", side: "5 cm" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. What is its area?",
          ["45", "45 cm²"],
          "Area of a rectangle = length × width = 9 × 5 = 45 cm².",
        ),
      ),
    (n) =>
      choice(
        n,
        "A triangle has a base of 8 cm and a perpendicular height of 5 cm. What is its area?",
        ["20 cm²", "40 cm²", "13 cm²", "26 cm²"],
        0,
        "Area of a triangle = ½ × base × height = ½ × 8 × 5 = 20 cm². 40 cm² forgets to halve.",
      ),
    (n) =>
      trueFalse(
        n,
        "1 m² is the same as 100 cm².",
        false,
        "1 m = 100 cm, so a 1 m by 1 m square is 100 cm by 100 cm. That is 100 × 100 = 10 000 cm², not 100 cm².",
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
            [10, 6],
            [3, 6],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the parallelogram. Each square is 1 m². What is its area?",
          ["35", "35 m²"],
          "The base is 7 squares long and the perpendicular height is 5 squares. Area = base × height = 7 × 5 = 35 m².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "1 hectare = ___ m²",
        ["10 000", "10000"],
        "A hectare is a square 100 m by 100 m, so it is 100 × 100 = 10 000 m².",
      ),
    (n) =>
      multi(
        n,
        "Which of these area formulas are correct? Choose all that are right.",
        [
          "Rectangle: A = l × w",
          "Triangle: A = ½ × b × h",
          "Parallelogram: A = b × slanting side",
          "Trapezium: A = ½ × (a + b) × h",
          "Kite: A = x + y, where x and y are the diagonals",
        ],
        [0, 1, 3],
        "A parallelogram uses the perpendicular height, not the slanting side. A kite's area is ½ × x × y, half the product of its diagonals. The other three are right.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [10, 1],
            [8, 5],
            [4, 5],
          ],
          sideLabels: ["8 m", "", "4 m"],
        },
        typed(
          "short_answer",
          n,
          "This trapezium has parallel sides of 8 m and 4 m, and a perpendicular height of 4 m. What is its area?",
          ["24", "24 m²"],
          "Area of a trapezium = ½ × (a + b) × h = ½ × (8 + 4) × 4 = ½ × 12 × 4 = 24 m².",
        ),
      ),
    (n) =>
      choice(
        n,
        "A rhombus has diagonals of 10 cm and 6 cm. What is its area?",
        ["30 cm²", "60 cm²", "16 cm²", "32 cm²"],
        0,
        "Area of a rhombus = ½ × diagonal × diagonal = ½ × 10 × 6 = 30 cm². 60 cm² forgets to halve.",
      ),
    (n) => typed("fill_blank", n, "3.5 cm² = ___ mm²", "350", "1 cm = 10 mm, so 1 cm² = 10 × 10 = 100 mm². 3.5 × 100 = 350 mm²."),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [10, 3],
            [4, 3],
            [4, 7],
            [0, 7],
          ],
          sideLabels: ["10 m", "3 m", "6 m", "4 m", "4 m", "7 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the shape. All its corners are right angles. What is its area?",
          ["46", "46 m²"],
          "Split it into two rectangles. The bottom one is 10 × 3 = 30 m². The top one is 4 × 4 = 16 m². 30 + 16 = 46 m².",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these areas in order from smallest to largest.",
        ["40 000 mm²", "2500 cm²", "0.3 m²", "5000 cm²"],
        "Change them all to m². 40 000 mm² = 400 cm² = 0.04 m². 2500 cm² = 0.25 m². 5000 cm² = 0.5 m². So 0.04, 0.25, 0.3, 0.5.",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle with a base of 12 cm and a height of 7 cm has the same area as a parallelogram with a base of 6 cm and a height of 7 cm.",
        true,
        "Triangle: ½ × 12 × 7 = 42 cm². Parallelogram: 6 × 7 = 42 cm². They are the same.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A paddock near Dubbo is a rectangle 400 m long and 250 m wide. What is its area in hectares?",
        ["10", "10 ha"],
        "Area = 400 × 250 = 100 000 m². Each hectare is 10 000 m², so 100 000 ÷ 10 000 = 10 ha.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A trapezium has an area of 60 cm². Its parallel sides are 7 cm and 13 cm. What is its perpendicular height in cm?",
        ["6", "6 cm"],
        "Area = ½ × (7 + 13) × h = 10 × h. So 10 × h = 60, which gives h = 6 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 0],
            [9, 0],
            [9, 4],
            [5, 7],
            [1, 4],
          ],
          sideLabels: ["8 m", "4 m", "", "", "4 m"],
        },
        choice(
          n,
          "Look at the end wall of this shed. The top of the roof is 7 m above the ground. What is the area of the wall?",
          ["44 m²", "56 m²", "60 m²", "32 m²"],
          0,
          "Split it into a rectangle and a triangle. Rectangle: 8 × 4 = 32 m². The triangle's height is 7 − 4 = 3 m, so it is ½ × 8 × 3 = 12 m². 32 + 12 = 44 m².",
        ),
      ),
  ],
});

/** MA4-ARE-C-01: area of rectangles, triangles, parallelograms, trapeziums, rhombuses, kites and composite shapes, and converting area units. */
export const AREA_2 = levels(7050216, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [2, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the triangle. Each square is 1 cm². What is its area?",
          ["20", "20 cm²"],
          "The base is 8 squares and the perpendicular height is 5 squares. Area = ½ × 8 × 5 = 20 cm².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Area is measured in square units, such as cm², m² and hectares.",
        true,
        "Area counts how many squares cover a surface, so it uses square units like cm² and m². A hectare is 10 000 m².",
      ),
    (n) =>
      choice(
        n,
        "A parallelogram has a base of 9 cm and a perpendicular height of 4 cm. What is its area?",
        ["36 cm²", "18 cm²", "26 cm²", "13 cm²"],
        0,
        "Area of a parallelogram = base × perpendicular height = 9 × 4 = 36 cm². It is not halved like a triangle.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1 cm² = ___ mm²", "100", "1 cm = 10 mm, so a 1 cm square is 10 mm by 10 mm. 10 × 10 = 100 mm²."),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [5, 0],
            [8, 5],
            [5, 7],
            [2, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the kite. Each square is 1 cm². Its diagonals are 7 cm and 6 cm. What is its area?",
          ["21", "21 cm²"],
          "Area of a kite = ½ × diagonal × diagonal = ½ × 7 × 6 = 21 cm².",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these units of area in order from smallest to largest.",
        ["mm²", "cm²", "m²", "ha"],
        "1 cm² = 100 mm², 1 m² = 10 000 cm², and 1 ha = 10 000 m². So mm² is the smallest and the hectare is the largest.",
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
            [10, 5],
            [4, 5],
          ],
          sideLabels: ["10 cm", "5 cm", "6 cm"],
        },
        typed(
          "short_answer",
          n,
          "Look at the trapezium. The 5 cm side is at right angles to the parallel sides. What is its area?",
          ["40", "40 cm²"],
          "The parallel sides are 10 cm and 6 cm and the height is 5 cm. Area = ½ × (10 + 6) × 5 = 8 × 5 = 40 cm².",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have an area of 24 cm²? Choose all that are right.",
        [
          "A rectangle 6 cm by 4 cm",
          "A triangle with base 6 cm and height 8 cm",
          "A parallelogram with base 12 cm and height 2 cm",
          "A rhombus with diagonals 6 cm and 4 cm",
          "A square with sides of 6 cm",
        ],
        [0, 1, 2],
        "Rectangle: 6 × 4 = 24. Triangle: ½ × 6 × 8 = 24. Parallelogram: 12 × 2 = 24. Rhombus: ½ × 6 × 4 = 12. Square: 6 × 6 = 36.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A vineyard in the Hunter Valley covers 4.2 hectares. How many square metres is that?",
        ["42 000", "42000", "42 000 m²"],
        "1 ha = 10 000 m², so 4.2 ha = 4.2 × 10 000 = 42 000 m².",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [11, 0],
            [11, 6],
            [7, 6],
            [7, 3],
            [4, 3],
            [4, 6],
            [0, 6],
          ],
          sideLabels: ["11 m", "6 m", "4 m", "3 m", "3 m", "3 m", "4 m", "6 m"],
        },
        choice(
          n,
          "Look at the shape. All its corners are right angles. What is its area?",
          ["57 m²", "66 m²", "48 m²", "63 m²"],
          0,
          "The whole rectangle would be 11 × 6 = 66 m². The gap cut out of the top is 3 × 3 = 9 m². 66 − 9 = 57 m².",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A rectangle measuring 2 m by 50 cm has an area of 100 cm².",
        false,
        "Use the same units first. 2 m = 200 cm, so the area is 200 × 50 = 10 000 cm², which is 1 m². 100 cm² multiplies 2 by 50 without changing units.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [3, 8],
          ],
          sideLabels: ["9 cm"],
        },
        choice(
          n,
          "This triangle has an area of 36 cm² and a base of 9 cm. What is its perpendicular height?",
          ["8 cm", "4 cm", "18 cm", "27 cm"],
          0,
          "Area = ½ × base × height, so 36 = ½ × 9 × h. Double the area: 72 = 9 × h, so h = 72 ÷ 9 = 8 cm. 4 cm forgets the ½.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A school oval is a rectangle 120 m long and 75 m wide. What is its area in hectares?",
        ["0.9", "0.9 ha", ".9"],
        "Area = 120 × 75 = 9000 m². Divide by 10 000 to get hectares: 9000 ÷ 10 000 = 0.9 ha.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rhombus has diagonals of 8 cm and 16 cm. A square has the same area as the rhombus. How long is each side of the square?",
        ["8", "8 cm"],
        "Area of the rhombus = ½ × 8 × 16 = 64 cm². A square with area 64 cm² has sides of 8 cm, because 8 × 8 = 64.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A garden bed is a trapezium with parallel sides of 6 m and 10 m and a perpendicular height of 4 m. A rectangular pond 2 m by 1.5 m sits inside it. What area of the bed (in m²) needs mulch?",
        ["29", "29 m²"],
        "Trapezium: ½ × (6 + 10) × 4 = 32 m². Pond: 2 × 1.5 = 3 m². Area to mulch = 32 − 3 = 29 m².",
      ),
  ],
});

/** MA4-ANG-C-01: angle types, complementary, supplementary and vertically opposite angles, angles at a point, angles on parallel lines, and angle sums of triangles and quadrilaterals. */
export const ANGLES = levels(7060101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 125 },
        choice(
          n,
          "What type of angle is this?",
          ["Acute", "Right", "Obtuse", "Reflex"],
          2,
          "The angle is bigger than a right angle (90°) but smaller than a straight angle (180°), so it is obtuse.",
        ),
      ),
    (n) => typed("short_answer", n, "What is the complement of 35°?", ["55", "55°"], "Complementary angles add to 90°. 90 − 35 = 55°."),
    (n) =>
      trueFalse(
        n,
        "When two straight lines cross, the vertically opposite angles are equal.",
        true,
        "The angles straight across from each other at the crossing are always the same size.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 112, label: "112°" },
        typed(
          "fill_blank",
          n,
          "The flat arm of this angle is extended to make a straight line. The new angle next to the 112° angle is ___°.",
          ["68", "68°"],
          "Angles on a straight line add to 180°. 180 − 112 = 68°.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [3, 6],
          ],
          cornerLabels: ["65°", "45°", "x"],
        },
        typed(
          "short_answer",
          n,
          "Look at the triangle. Find the size of angle x in degrees.",
          ["70", "70°"],
          "The angles in a triangle add to 180°. 65 + 45 = 110, and 180 − 110 = 70°.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these pairs of angles are supplementary? Choose all that are right.",
        ["100° and 80°", "45° and 45°", "130° and 50°", "90° and 90°", "120° and 70°"],
        [0, 2, 3],
        "Supplementary angles add to 180°. 100 + 80, 130 + 50 and 90 + 90 all make 180. 45 + 45 = 90 (complementary) and 120 + 70 = 190.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Three angles meet at a point. Two of them are 140° and 95°. What is the third angle in degrees?",
        ["125", "125°"],
        "Angles at a point add to 360°. 140 + 95 = 235, and 360 − 235 = 125°.",
      ),
    (n) =>
      choice(
        n,
        "Two parallel lines are cut by a transversal. What is true about the alternate angles?",
        ["They are equal", "They add to 180°", "They add to 90°", "They add to 360°"],
        0,
        "Alternate angles sit on opposite sides of the transversal, between the parallel lines, making a Z shape. They are equal.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [8, 6],
            [2, 5],
          ],
          cornerLabels: ["70°", "80°", "90°", "x"],
        },
        typed(
          "short_answer",
          n,
          "Look at the quadrilateral. Find the size of angle x in degrees.",
          ["120", "120°"],
          "The angles in a quadrilateral add to 360°. 70 + 80 + 90 = 240, and 360 − 240 = 120°.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "An isosceles triangle has an angle of 40° between its two equal sides. What size is each of the other two angles?",
        ["70°", "140°", "40°", "50°"],
        0,
        "The other two angles are equal and share 180 − 40 = 140°. 140 ÷ 2 = 70° each.",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle can have two obtuse angles.",
        false,
        "Two obtuse angles would each be more than 90°, so together they would be more than 180°. That leaves nothing for the third angle.",
      ),
    (n) =>
      ordering(
        n,
        "Put these types of angle in order from smallest to largest.",
        ["Acute", "Right", "Obtuse", "Straight", "Reflex", "Revolution"],
        "Acute is less than 90°, right is 90°, obtuse is between 90° and 180°, straight is 180°, reflex is between 180° and 360°, and a revolution is 360°.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two co-interior angles between parallel lines are 2x° and (x + 30)°. Find x.",
        "50",
        "Co-interior angles add to 180°. 2x + x + 30 = 180, so 3x = 150 and x = 50. (The angles are 100° and 80°.)",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Two straight lines cross. One of the angles is 3 times the size of the angle next to it. What is the smaller angle in degrees?",
        ["45", "45°"],
        "Angles next to each other at a crossing lie on a straight line, so they add to 180°. x + 3x = 180, so 4x = 180 and x = 45°.",
      ),
    (n) =>
      multi(
        n,
        "Lines AB and CD are parallel. A transversal crosses AB, making a 62° angle. Which of these are sizes of angles where the transversal crosses CD? Choose all that are right.",
        ["62°", "118°", "28°", "180°"],
        [0, 1],
        "At CD, the corresponding and alternate angles equal 62°. The angles next to them on a straight line are 180 − 62 = 118°. 28° is the complement, which isn't formed here.",
      ),
  ],
});

/** MA4-ANG-C-01: angle types, complementary, supplementary and vertically opposite angles, angles at a point, angles on parallel lines, and angle sums of triangles and quadrilaterals. */
export const ANGLES_2 = levels(7060116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 230 },
        choice(
          n,
          "What type of angle is this?",
          ["Reflex", "Obtuse", "Straight", "Acute"],
          0,
          "The angle goes past a straight line (180°) but not all the way round (360°), so it is a reflex angle.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "What is the supplement of 64°?", ["116", "116°"], "Supplementary angles add to 180°. 180 − 64 = 116°."),
    (n) =>
      trueFalse(
        n,
        "The three angles in a triangle add up to 360°.",
        false,
        "The angles in a triangle add up to 180°. It is the angles in a quadrilateral that add up to 360°.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 72, label: "72°" },
        choice(
          n,
          "What is the complement of this angle?",
          ["18°", "108°", "28°", "288°"],
          0,
          "Complementary angles add to 90°. 90 − 72 = 18°. 108° is the supplement, which adds to 180°.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [4, 6],
          ],
          cornerLabels: ["55°", "55°", "x"],
        },
        typed(
          "short_answer",
          n,
          "Look at the triangle. Find the size of angle x in degrees.",
          ["70", "70°"],
          "The angles in a triangle add to 180°. 55 + 55 = 110, and 180 − 110 = 70°.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Angles at a point add up to ___°.",
        ["360", "360°"],
        "Going all the way around a point is one full turn, which is 360°.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Two parallel lines are cut by a transversal. Which of these are true? Choose all that are right.",
        [
          "Corresponding angles are equal",
          "Alternate angles are equal",
          "Co-interior angles are equal",
          "Co-interior angles add to 180°",
          "Vertically opposite angles add to 180°",
        ],
        [0, 1, 3],
        "Corresponding (F shape) and alternate (Z shape) angles are equal. Co-interior angles (C shape) add to 180°, so they are not usually equal. Vertically opposite angles are equal.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 0],
            [8, 4],
            [4, 7],
            [0, 4],
          ],
          cornerLabels: ["90°", "x", "106°", "x"],
        },
        typed(
          "short_answer",
          n,
          "This kite has two equal angles marked x. Find x in degrees.",
          ["82", "82°"],
          "The angles in a quadrilateral add to 360°. 90 + 106 = 196, so the two x angles share 360 − 196 = 164°. 164 ÷ 2 = 82°.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Two straight lines cross. One of the angles is 38°. What are the other three angles?",
        ["38°, 142°, 142°", "38°, 52°, 52°", "142°, 142°, 142°", "38°, 38°, 142°"],
        0,
        "The angle opposite 38° is also 38°. The two angles next to it are on a straight line with it, so each is 180 − 38 = 142°.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "In triangle ABC, angle A is 48° and angle B is twice angle A. What is angle C in degrees?",
        ["36", "36°"],
        "Angle B = 2 × 48 = 96°. The angles add to 180°, so angle C = 180 − 48 − 96 = 36°.",
      ),
    (n) =>
      trueFalse(
        n,
        "If two angles are vertically opposite and also supplementary, they must both be right angles.",
        true,
        "Vertically opposite angles are equal. Two equal angles that add to 180° must each be 90°.",
      ),
    (n) =>
      choice(
        n,
        "One angle of a parallelogram is 65°. What are the other three angles?",
        ["65°, 115°, 115°", "115°, 115°, 115°", "65°, 65°, 65°", "25°, 65°, 25°"],
        0,
        "Opposite angles of a parallelogram are equal, so one is 65°. Angles next to each other are co-interior between parallel sides, so they add to 180°: 180 − 65 = 115°.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Four angles meet at a point. They are x°, 2x°, 3x° and 90°. Find x.",
        "45",
        "Angles at a point add to 360°. x + 2x + 3x + 90 = 360, so 6x = 270 and x = 45.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Lines AB and CD are parallel. A pair of alternate angles between them are (4x − 20)° and (2x + 30)°. Find x.",
        "25",
        "Alternate angles are equal, so 4x − 20 = 2x + 30. Take 2x from both sides: 2x − 20 = 30, so 2x = 50 and x = 25. (Both angles are 80°.)",
      ),
    (n) =>
      choice(
        n,
        "In a triangle, the second angle is twice the first, and the third angle is three times the first. What kind of triangle is it?",
        ["Right-angled", "Acute-angled", "Obtuse-angled", "Equilateral"],
        0,
        "x + 2x + 3x = 180, so 6x = 180 and x = 30. The angles are 30°, 60° and 90°, so it is right-angled.",
      ),
  ],
});

/** MA4-GEO-C-01: classifying triangles and quadrilaterals by their sides, angles, diagonals and lines of symmetry, and translations, reflections and rotations. */
export const SHAPES = levels(7060201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [4, 6],
          ],
          sideLabels: ["8 cm", "7 cm", "7 cm"],
        },
        choice(
          n,
          "Look at the side lengths. What type of triangle is this?",
          ["Isosceles", "Equilateral", "Scalene", "Right-angled"],
          0,
          "Two of its sides are 7 cm, so exactly two sides are equal. That makes it isosceles.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A square is a special kind of rectangle.",
        true,
        "A rectangle is a quadrilateral with four right angles. A square has four right angles too, plus four equal sides.",
      ),
    (n) =>
      choice(
        n,
        "How many lines of symmetry does an equilateral triangle have?",
        ["3", "1", "0", "6"],
        0,
        "A line from each corner to the middle of the opposite side cuts it into two matching halves. There are 3 corners, so 3 lines.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which of these does every rhombus have? Choose all that are right.",
        [
          "All four sides equal",
          "Diagonals that cross at right angles",
          "Four right angles",
          "Opposite angles equal",
          "Diagonals of equal length",
        ],
        [0, 1, 3],
        "A rhombus has four equal sides, equal opposite angles, and diagonals that bisect each other at right angles. Only a square rhombus has right angles and equal diagonals.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 8, rows: 6, axes: true, points: [{ x: 2, y: 1, label: "A" }] },
        typed(
          "short_answer",
          n,
          "Point A is translated 3 units right and 4 units up. What are the coordinates of its image?",
          ["(5, 5)", "(5,5)", "5, 5", "5,5"],
          "A is at (2, 1). Moving 3 right adds 3 to x: 2 + 3 = 5. Moving 4 up adds 4 to y: 1 + 4 = 5. The image is at (5, 5).",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A triangle with one angle of exactly 90° is called a ___ triangle.",
        ["right-angled", "right angled", "right"],
        "A triangle with a right angle (90°) is a right-angled triangle.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "The point (3, 2) is reflected in the y-axis. Where is its image?",
        ["(−3, 2)", "(3, −2)", "(−3, −2)", "(2, 3)"],
        0,
        "Reflecting in the y-axis flips the point from right to left, so the x-coordinate changes sign and y stays the same: (−3, 2).",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 0],
            [9, 0],
            [7, 4],
            [3, 4],
          ],
        },
        choice(
          n,
          "This trapezium has its two slanting sides the same length. How many lines of symmetry does it have?",
          ["1", "2", "0", "4"],
          0,
          "The only fold that matches it up is the vertical line through the middle of the two parallel sides. So it has 1 line of symmetry.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The diagonals of a rectangle are equal in length.",
        true,
        "Each diagonal of a rectangle joins opposite corners across the same length and width, so both diagonals are the same length.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "In which of these quadrilaterals do the diagonals always cross at right angles? Choose all that are right.",
        ["Square", "Rhombus", "Kite", "Rectangle", "Parallelogram"],
        [0, 1, 2],
        "Squares, rhombuses and kites all have diagonals that are perpendicular. A rectangle or parallelogram that is not a square or rhombus does not.",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from the most general to the most special.",
        ["Quadrilateral", "Parallelogram", "Rectangle", "Square"],
        "Every square is a rectangle, every rectangle is a parallelogram, and every parallelogram is a quadrilateral. Each one adds more rules.",
      ),
    (n) =>
      choice(
        n,
        "The point P(4, 1) is rotated 90° anticlockwise about the origin. Where is its image?",
        ["(−1, 4)", "(1, −4)", "(−4, −1)", "(4, −1)"],
        0,
        "A quarter turn anticlockwise about the origin takes (x, y) to (−y, x). So (4, 1) goes to (−1, 4). Check: P starts to the right, and a quarter turn anticlockwise points it up.",
      ),
  ],
  very_hard: [
    (n) =>
      trueFalse(
        n,
        "Every square is a rhombus, but not every rhombus is a square.",
        true,
        "A square has four equal sides, so it is a rhombus. A rhombus need not have right angles, so it is not always a square.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A shape is reflected in the x-axis and then the image is reflected in the y-axis. This is the same as a rotation about the origin through how many degrees?",
        ["180", "180°"],
        "(x, y) goes to (x, −y), then to (−x, −y). Changing the sign of both coordinates is a half turn, which is 180°.",
      ),
    (n) =>
      choice(
        n,
        "I am a quadrilateral. My diagonals are equal in length and bisect each other, but they do not cross at right angles. What am I?",
        ["A rectangle", "A square", "A rhombus", "A kite"],
        0,
        "Diagonals that are equal and bisect each other mean a rectangle. A square's diagonals cross at right angles, so it can't be a square. A rhombus or kite (not a square) has unequal diagonals.",
      ),
  ],
});

/** MA4-GEO-C-01: classifying triangles and quadrilaterals by their sides, angles, diagonals and lines of symmetry, and translations, reflections and rotations. */
export const SHAPES_2 = levels(7060216, {
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
          "Classify this triangle by its side lengths.",
          ["Scalene", "Isosceles", "Equilateral"],
          0,
          "The sides are 8 cm, 10 cm and 6 cm. No two are equal, so it is scalene.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A rectangle that is not a square has 4 lines of symmetry.",
        false,
        "It has only 2: one across the middle and one down the middle. Folding along a diagonal does not match it up.",
      ),
    (n) =>
      choice(
        n,
        "Which transformation slides a shape without turning or flipping it?",
        ["Translation", "Reflection", "Rotation", "Enlargement"],
        0,
        "A translation moves every point the same distance in the same direction. A reflection flips and a rotation turns.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which of these does every parallelogram have? Choose all that are right.",
        ["Opposite sides parallel", "Opposite sides equal", "Four right angles", "Diagonals that bisect each other", "All sides equal"],
        [0, 1, 3],
        "Every parallelogram has opposite sides parallel and equal, and its diagonals cut each other in half. Right angles and four equal sides only belong to special parallelograms.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 6,
          axes: true,
          points: [
            { x: 1, y: 2, label: "A" },
            { x: 6, y: 2, label: "B" },
          ],
        },
        choice(
          n,
          "Point A is translated to point B. Describe the translation.",
          ["5 units right", "5 units left", "6 units right", "2 units up"],
          0,
          "A is at (1, 2) and B is at (6, 2). The y-coordinate stays the same and x goes from 1 to 6, which is 5 units right.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Each angle in an equilateral triangle is ___°.",
        ["60", "60°"],
        "All three angles are equal and add to 180°. 180 ÷ 3 = 60°.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "grid", columns: 10, rows: 8, axes: true, points: [{ x: 2, y: 3, label: "A" }] },
        typed(
          "short_answer",
          n,
          "Point A is reflected in the vertical line x = 5. What are the coordinates of its image?",
          ["(8, 3)", "(8,3)", "8, 3", "8,3"],
          "A is at (2, 3), which is 3 units left of the line x = 5. Its image is 3 units right of the line, at x = 8. The y-coordinate stays 3, so the image is (8, 3).",
        ),
      ),
    (n) =>
      choice(
        n,
        "How many lines of symmetry does a kite have (one that is not a rhombus)?",
        ["1", "2", "0", "4"],
        0,
        "A kite has one line of symmetry: the diagonal that joins the corners where the equal sides meet.",
      ),
    (n) =>
      trueFalse(
        n,
        "In an isosceles triangle, the two angles opposite the equal sides are equal.",
        true,
        "An isosceles triangle has a line of symmetry down the middle, so the two base angles match.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest lines of symmetry to most.",
        [
          "Parallelogram (not a rectangle or rhombus)",
          "Kite (not a rhombus)",
          "Rectangle (not a square)",
          "Equilateral triangle",
          "Square",
        ],
        "A general parallelogram has 0 lines of symmetry, a kite has 1, a rectangle has 2, an equilateral triangle has 3, and a square has 4.",
      ),
    (n) =>
      multi(
        n,
        "Which of these quadrilaterals always have two pairs of parallel sides? Choose all that are right.",
        ["Rhombus", "Rectangle", "Trapezium", "Kite", "Square"],
        [0, 1, 4],
        "Rhombuses, rectangles and squares are all parallelograms, so both pairs of opposite sides are parallel. A trapezium has only one pair, and a kite usually has none.",
      ),
    (n) =>
      choice(
        n,
        "The point (2, 5) is rotated 180° about the origin. Where is its image?",
        ["(−2, −5)", "(−5, 2)", "(2, −5)", "(5, 2)"],
        0,
        "A half turn about the origin changes the sign of both coordinates: (x, y) goes to (−x, −y). So (2, 5) goes to (−2, −5).",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A quadrilateral has exactly one pair of parallel sides and exactly one line of symmetry. What is it?",
        ["An isosceles trapezium", "A kite", "A parallelogram", "A rhombus"],
        0,
        "One pair of parallel sides makes it a trapezium. A trapezium with a line of symmetry has equal slanting sides, so it is an isosceles trapezium. A kite has no parallel sides, and parallelograms have two pairs.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The point (−3, 4) is translated 5 units right, then reflected in the x-axis. Where does it end up?",
        ["(2, −4)", "(2, -4)", "(2,−4)", "(2,-4)", "2, −4", "2, -4"],
        "Translating 5 right: −3 + 5 = 2, so it moves to (2, 4). Reflecting in the x-axis changes the sign of y: (2, −4).",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle can be both isosceles and right-angled.",
        true,
        "A triangle with angles of 90°, 45° and 45° has a right angle and two equal sides, so it is both.",
      ),
  ],
});
