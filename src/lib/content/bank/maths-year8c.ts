/**
 * Year 8 Mathematics: Stage 4 measurement. Two sets of 15 questions for each standard (NESA
 * outcome), three at each level from very easy to very hard: Pythagoras' theorem, circles, and
 * volume. Year 8 works at the later Stage 4 level. Circle answers use π ≈ 3.14 or a calculator,
 * rounded to 1 decimal place, and both sensible roundings are accepted.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-PYT-C-01: the hypotenuse, Pythagoras' theorem, Pythagorean triads and testing for right angles. */
export const PYTHAGORAS = levels(8030101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 6],
          ],
          sideLabels: ["p", "q", "r"],
        },
        choice(
          n,
          "This triangle has a right angle at the bottom right corner. Which side is the hypotenuse?",
          ["p", "q", "r", "It has no hypotenuse"],
          2,
          "The hypotenuse is the side opposite the right angle. The right angle is at the bottom right, so the side across from it is r, the sloping side.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The hypotenuse is always the longest side of a right-angled triangle.",
        true,
        "The hypotenuse is opposite the right angle, which is the biggest angle in the triangle, so it is always the longest side.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A right-angled triangle has shorter sides a and b and hypotenuse c. Pythagoras' theorem says a² + b² = ___.",
        ["c²", "c^2", "c2", "c squared"],
        "Pythagoras' theorem: the squares of the two shorter sides add up to the square of the hypotenuse, so a² + b² = c².",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 6],
          ],
          sideLabels: ["8 cm", "6 cm", "x"],
        },
        typed(
          "short_answer",
          n,
          "Look at the right-angled triangle. How long is side x?",
          ["10", "10 cm"],
          "x is the hypotenuse. x² = 8² + 6² = 64 + 36 = 100, so x = √100 = 10 cm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A right-angled triangle has shorter sides of 5 m and 12 m. How long is the hypotenuse?",
        ["13 m", "17 m", "7 m", "169 m"],
        0,
        "c² = 5² + 12² = 25 + 144 = 169, so c = √169 = 13 m. 17 m just adds the sides, and 169 forgets the square root.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are Pythagorean triads? Choose all that are right.",
        ["3, 4, 5", "5, 12, 13", "4, 5, 6", "8, 15, 17", "2, 3, 4"],
        [0, 1, 3],
        "Check if the two smaller squares add to the biggest square. 9 + 16 = 25 ✓, 25 + 144 = 169 ✓, 64 + 225 = 289 ✓. But 16 + 25 = 41, not 36, and 4 + 9 = 13, not 16.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7.5, 0],
            [7.5, 4],
          ],
          sideLabels: ["x", "8 cm", "17 cm"],
        },
        typed(
          "short_answer",
          n,
          "Look at the right-angled triangle. How long is side x?",
          ["15", "15 cm"],
          "17 cm is the hypotenuse, so x is a shorter side. x² = 17² − 8² = 289 − 64 = 225, so x = √225 = 15 cm.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A right-angled triangle has shorter sides of 4 cm and 7 cm. Find the hypotenuse, correct to 1 decimal place.",
        ["8.1", "8.1 cm"],
        "c² = 4² + 7² = 16 + 49 = 65, so c = √65 ≈ 8.06, which rounds to 8.1 cm.",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangle with sides 7 cm, 24 cm and 25 cm is right-angled.",
        true,
        "Test with Pythagoras: 7² + 24² = 49 + 576 = 625, and 25² = 625. They are equal, so the triangle is right-angled.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 5 m ladder leans against a wall. Its foot is 1.4 m from the wall. How high up the wall does it reach?",
        ["4.8", "4.8 m"],
        "The ladder is the hypotenuse. h² = 5² − 1.4² = 25 − 1.96 = 23.04, so h = √23.04 = 4.8 m.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps in order to find a shorter side of a right-angled triangle.",
        [
          "Find the hypotenuse (opposite the right angle)",
          "Square the hypotenuse and the known side",
          "Subtract the smaller square from the larger one",
          "Take the square root of the result",
        ],
        "First spot the hypotenuse. Then square both known sides, subtract (because the shorter side's square is what's left over), and finally square root to get the length.",
      ),
    (n) =>
      choice(
        n,
        "Is a triangle with sides 6 cm, 9 cm and 11 cm right-angled?",
        [
          "Yes, because 6² + 9² = 11²",
          "No, because 6² + 9² = 117 but 11² = 121",
          "Yes, because 6 + 9 is more than 11",
          "No, because 11 is an odd number",
        ],
        1,
        "6² + 9² = 36 + 81 = 117 and 11² = 121. They are not equal, so there is no right angle.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "rectangle", width: 12, height: 5, top: "120 m", side: "50 m" },
        typed(
          "short_answer",
          n,
          "Mia crosses this rectangular oval diagonally instead of walking along two sides. How many metres shorter is her walk?",
          ["40", "40 m"],
          "Along two sides is 120 + 50 = 170 m. The diagonal is √(120² + 50²) = √(14 400 + 2500) = √16 900 = 130 m. 170 − 130 = 40 m shorter.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "9, 40 and x form a Pythagorean triad, with x the largest number. What is x?",
        "41",
        "x² = 9² + 40² = 81 + 1600 = 1681, and √1681 = 41 (because 41 × 41 = 1681).",
      ),
    (n) =>
      multi(
        n,
        "A right-angled triangle has a hypotenuse of 10 cm. Which could be its two shorter sides? Choose all that are right.",
        ["6 cm and 8 cm", "5 cm and 5 cm", "√50 cm and √50 cm", "7 cm and 3 cm", "2 cm and √96 cm"],
        [0, 2, 4],
        "The squares of the shorter sides must add to 10² = 100. 36 + 64 = 100 ✓, 50 + 50 = 100 ✓, 4 + 96 = 100 ✓. But 25 + 25 = 50 and 49 + 9 = 58.",
      ),
  ],
});

/** MA4-PYT-C-01: the hypotenuse, Pythagoras' theorem, Pythagorean triads and testing for right angles. */
export const PYTHAGORAS_2 = levels(8030116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Triangle PQR has its right angle at Q. Which side is the hypotenuse?",
        ["PR", "PQ", "QR", "It depends on the lengths"],
        0,
        "The hypotenuse is opposite the right angle. The side that does not touch Q is PR.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [0, 6],
          ],
          sideLabels: ["8 m", "10 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at the right-angled triangle. How long is the hypotenuse?",
          ["10", "10 m"],
          "The right angle is at the bottom left. The side opposite it is the sloping side, 10 m. It is also the longest side.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Pythagoras' theorem works for every triangle, not just right-angled ones.",
        false,
        "a² + b² = c² is only true when the triangle has a right angle. In other triangles the squares don't add up like that.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 6],
          ],
          sideLabels: ["12 cm", "9 cm", "h"],
        },
        typed(
          "short_answer",
          n,
          "Look at the right-angled triangle. How long is side h?",
          ["15", "15 cm"],
          "h is the hypotenuse. h² = 12² + 9² = 144 + 81 = 225, so h = √225 = 15 cm.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [0, 6],
          ],
          sideLabels: ["k", "m", "j"],
        },
        choice(
          n,
          "This triangle has a right angle at the bottom left corner. Which equation is true for it?",
          ["j² + k² = m²", "j² + m² = k²", "k² + m² = j²", "j + k = m"],
          0,
          "m is opposite the right angle, so m is the hypotenuse. The two shorter sides are j and k, so j² + k² = m².",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Doubling every number in the triad 3, 4, 5 gives another triad: 6, 8, ___.",
        "10",
        "5 × 2 = 10. Check: 6² + 8² = 36 + 64 = 100 = 10².",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 13 m rope runs from the top of a flagpole to a peg in the ground 5 m from the base. How tall is the flagpole?",
        ["12", "12 m"],
        "The rope is the hypotenuse. h² = 13² − 5² = 169 − 25 = 144, so h = √144 = 12 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A right-angled triangle has shorter sides of 3 cm and 5 cm. Find the hypotenuse, correct to 1 decimal place.",
        ["5.8", "5.8 cm"],
        "c² = 3² + 5² = 9 + 25 = 34, so c = √34 ≈ 5.83, which rounds to 5.8 cm.",
      ),
    (n) =>
      multi(
        n,
        "Which of these side lengths make a right-angled triangle? Choose all that are right.",
        ["9, 12, 15", "10, 24, 26", "5, 6, 7", "7, 8, 10"],
        [0, 1],
        "81 + 144 = 225 = 15² ✓ and 100 + 576 = 676 = 26² ✓. But 25 + 36 = 61, not 49, and 49 + 64 = 113, not 100.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7, 0],
            [7, 7.1],
          ],
          sideLabels: ["7 cm", "x", "10 cm"],
        },
        typed(
          "short_answer",
          n,
          "Look at the right-angled triangle. Find x, correct to 1 decimal place.",
          ["7.1", "7.1 cm"],
          "10 cm is the hypotenuse, so subtract. x² = 10² − 7² = 100 − 49 = 51, so x = √51 ≈ 7.14, which rounds to 7.1 cm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Josh flies a kite on a 30 m string. The kite is directly above a point 18 m from Josh. How high is the kite? (Ignore Josh's height.)",
        ["24 m", "35 m", "12 m", "48 m"],
        0,
        "The string is the hypotenuse. h² = 30² − 18² = 900 − 324 = 576, so h = √576 = 24 m. 35 m comes from adding the squares by mistake.",
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["7", "√50", "7.2", "√53"],
        "7 = √49. √50 ≈ 7.07, a little more than 7. 7.2 = √51.84. √53 ≈ 7.28, the longest.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 12,
          rows: 6,
          axes: true,
          points: [
            { x: 0, y: 0, label: "Start" },
            { x: 12, y: 5, label: "End" },
          ],
          path: [
            [0, 0],
            [7, 0],
            [7, 5],
            [12, 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each square is 1 km. Ruby rides 7 km east, 5 km north, then 5 km east. How far is she from her start in a straight line?",
          ["13", "13 km"],
          "Altogether she is 7 + 5 = 12 km east and 5 km north of the start. Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 km.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has a diagonal of 10 cm. What is the area of the square in cm²?",
        ["50", "50 cm²", "50 cm2"],
        "If the side is s, the diagonal makes a right-angled triangle: s² + s² = 10², so 2s² = 100 and s² = 50. The area of a square is s², so it is 50 cm².",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A 2.5 m ladder reaches 2.4 m up a wall. Its foot slides 0.8 m further from the wall. How many metres does the top slide down?",
        ["0.4", "0.4 m", "40 cm"],
        "At first the foot is √(2.5² − 2.4²) = √(6.25 − 5.76) = √0.49 = 0.7 m out. After sliding it is 0.7 + 0.8 = 1.5 m out, so the height is √(6.25 − 2.25) = √4 = 2 m. It slid 2.4 − 2 = 0.4 m.",
      ),
  ],
});

/** MA4-ARE-C-01: circumference and area of circles, semicircles, quadrants and composite shapes. */
export const CIRCLES = levels(8030201, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A circle has a radius of 6 cm. What is its diameter?",
        ["12", "12 cm"],
        "The diameter goes right across the circle through the centre, so it is two radii: 2 × 6 = 12 cm.",
      ),
    (n) =>
      choice(
        n,
        "Which formula gives the area of a circle with radius r?",
        ["A = πr²", "A = 2πr", "A = πd", "A = πr"],
        0,
        "The area of a circle is π times the radius squared: A = πr². 2πr and πd give the circumference instead.",
      ),
    (n) =>
      trueFalse(
        n,
        "The circumference of a circle is a little more than 3 times its diameter.",
        true,
        "C = π × d and π ≈ 3.14, so the circumference is about 3.14 times the diameter, a little more than 3 times.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Using π ≈ 3.14, find the circumference of a circle with a diameter of 10 cm.",
        ["31.4", "31.4 cm"],
        "C = π × d = 3.14 × 10 = 31.4 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Using π ≈ 3.14, find the area of a circular garden bed with a radius of 10 m, in m².",
        ["314", "314 m²", "314 m2"],
        "A = πr² = 3.14 × 10² = 3.14 × 100 = 314 m².",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A circle has a radius of 4 cm. Its circumference is 2 × π × 4, which is ___ cm to 1 decimal place.",
        ["25.1", "25.12", "25.13"],
        "2 × π × 4 = 8π ≈ 25.13 (or 8 × 3.14 = 25.12), which rounds to 25.1 cm.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the area of a semicircle with a radius of 6 cm, in cm² to 1 decimal place.",
        ["56.5", "56.5 cm²", "56.52", "56.55"],
        "A whole circle would be π × 6² = 36π ≈ 113.1 cm². A semicircle is half: 113.1 ÷ 2 ≈ 56.5 cm².",
      ),
    (n) =>
      choice(
        n,
        "Using a calculator, what is the area of a quadrant (quarter circle) with a radius of 8 cm?",
        ["About 50.3 cm²", "About 201.1 cm²", "About 12.6 cm²", "About 100.5 cm²"],
        0,
        "A full circle is π × 8² = 64π ≈ 201.1 cm². A quadrant is a quarter of that: 201.1 ÷ 4 ≈ 50.3 cm². 201.1 is the whole circle and 100.5 is a semicircle.",
      ),
    (n) =>
      multi(
        n,
        "A circle has a diameter of 14 cm. Which of these are true? Choose all that are right.",
        ["Its radius is 7 cm", "Its circumference is about 44 cm", "Its area is about 154 cm²", "Its area is about 616 cm²"],
        [0, 1, 2],
        "Radius = 14 ÷ 2 = 7 cm. C = π × 14 ≈ 44.0 cm. A = π × 7² = 49π ≈ 153.9 ≈ 154 cm². 616 cm² comes from squaring the diameter instead of the radius.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the perimeter of a semicircle with a radius of 5 cm, to 1 decimal place. Remember the straight edge.",
        ["25.7", "25.7 cm"],
        "The curved part is half a circumference: π × 10 ÷ 2 ≈ 15.7 cm. The straight edge is the diameter, 10 cm. Perimeter ≈ 15.7 + 10 = 25.7 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A garden is a 10 m by 6 m rectangle with a semicircle on one 6 m end. Find its total area in m², to 1 decimal place.",
        ["74.1", "74.1 m²", "74.13", "74.14"],
        "Rectangle: 10 × 6 = 60 m². The semicircle has radius 3 m: π × 3² ÷ 2 ≈ 14.1 m². Total ≈ 60 + 14.1 = 74.1 m².",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest to largest area.",
        ["Circle, radius 3 cm", "Square, side 6 cm", "Semicircle, radius 5 cm", "Quadrant, radius 8 cm"],
        "Circle: π × 9 ≈ 28.3 cm². Square: 36 cm². Semicircle: π × 25 ÷ 2 ≈ 39.3 cm². Quadrant: π × 64 ÷ 4 ≈ 50.3 cm².",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bike wheel has a diameter of 70 cm. About how many turns does it make to travel 1 km? Give the nearest whole number.",
        ["455", "455 turns"],
        "One turn moves the bike one circumference: π × 70 ≈ 219.9 cm. 1 km = 100 000 cm. 100 000 ÷ 219.9 ≈ 454.7, so about 455 turns.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Using π ≈ 3.14, a circle has a circumference of 62.8 cm. What is its area in cm²?",
        ["314", "314 cm²", "314 cm2"],
        "C = π × d, so d = 62.8 ÷ 3.14 = 20 cm and r = 10 cm. A = 3.14 × 10² = 314 cm².",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A round pond with a radius of 3 m has a path 1 m wide all the way around it. Find the area of the path in m², to the nearest whole number.",
        ["22", "22 m²", "22 m2"],
        "Pond and path together make a circle of radius 4 m: π × 16. The pond alone is π × 9. Path = π × 16 − π × 9 = 7π ≈ 22.0, so about 22 m².",
      ),
  ],
});

/** MA4-ARE-C-01: circumference and area of circles, semicircles, quadrants and composite shapes. */
export const CIRCLES_2 = levels(8030216, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A round trampoline has a diameter of 18 m. What is its radius?",
        ["9", "9 m"],
        "The radius is half the diameter: 18 ÷ 2 = 9 m.",
      ),
    (n) =>
      choice(
        n,
        "What is the circumference of a circle?",
        [
          "The distance around the outside",
          "The distance across through the centre",
          "The distance from the centre to the edge",
          "The space inside the circle",
        ],
        0,
        "The circumference is the perimeter of a circle: the distance all the way around it. Across is the diameter and centre to edge is the radius.",
      ),
    (n) =>
      trueFalse(
        n,
        "A quadrant is one quarter of a circle.",
        true,
        "Quad means four. A quadrant is a quarter of a circle, cut by two radii at right angles.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the circumference of a circle with a radius of 7 cm, to the nearest whole centimetre.",
        ["44", "44 cm"],
        "C = 2 × π × r = 2 × π × 7 = 14π ≈ 43.98, which rounds to 44 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the area of a circle with a radius of 4 cm, in cm² to 1 decimal place.",
        ["50.3", "50.2", "50.24", "50.27", "50.3 cm²", "50.2 cm²"],
        "A = πr² = π × 4² = 16π ≈ 50.3 cm² (or 3.14 × 16 = 50.24 ≈ 50.2 cm² using π ≈ 3.14).",
      ),
    (n) =>
      choice(
        n,
        "A pizza has a diameter of 30 cm. Which calculation gives its area?",
        ["π × 15²", "π × 30²", "2 × π × 15", "π × 30"],
        0,
        "Area uses the radius, which is 30 ÷ 2 = 15 cm, so A = π × 15². 2 × π × 15 and π × 30 both give the circumference.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the area of a quadrant with a radius of 6 cm, in cm² to 1 decimal place.",
        ["28.3", "28.3 cm²", "28.26", "28.27"],
        "A full circle is π × 6² = 36π ≈ 113.1 cm². A quadrant is a quarter: 113.1 ÷ 4 ≈ 28.3 cm².",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A semicircle has a diameter of 12 m. Its curved edge is half of π × 12, which is ___ m to 1 decimal place.",
        ["18.8", "18.84", "18.85"],
        "π × 12 ≈ 37.7 m is the whole circumference. Half of it is about 18.85, which rounds to 18.8 m.",
      ),
    (n) =>
      multi(
        n,
        "Which of these have an area of about 78.5 cm²? Choose all that are right.",
        ["A circle with radius 5 cm", "A quadrant with radius 10 cm", "A semicircle with radius 5 cm", "A circle with diameter 5 cm"],
        [0, 1],
        "Circle r = 5: π × 25 ≈ 78.5 ✓. Quadrant r = 10: π × 100 ÷ 4 ≈ 78.5 ✓. Semicircle r = 5: half of 78.5 ≈ 39.3. Diameter 5 means r = 2.5: π × 6.25 ≈ 19.6.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the perimeter of a quadrant with a radius of 4 m, to 1 decimal place.",
        ["14.3", "14.3 m", "14.28"],
        "The curved edge is a quarter of the circumference: 2 × π × 4 ÷ 4 ≈ 6.28 m. Add the two straight radii: 6.28 + 4 + 4 ≈ 14.3 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A shape is a square of side 8 cm with a semicircle stuck on one side (diameter 8 cm). Find its area in cm², to 1 decimal place.",
        ["89.1", "89.1 cm²", "89.12", "89.13"],
        "Square: 8 × 8 = 64 cm². Semicircle radius 4: π × 16 ÷ 2 ≈ 25.1 cm². Total ≈ 64 + 25.1 = 89.1 cm².",
      ),
    (n) =>
      trueFalse(
        n,
        "If you double the radius of a circle, its area doubles.",
        false,
        "A = πr². Doubling r makes it π × (2r)² = 4πr², so the area becomes 4 times as big, not 2 times.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these shapes in order from smallest to largest perimeter.",
        ["Circle, radius 3 cm", "Semicircle, radius 4 cm", "Quadrant, radius 6 cm", "Square, side 6 cm"],
        "Circle: 2π × 3 ≈ 18.8 cm. Semicircle: π × 4 + 8 ≈ 20.6 cm. Quadrant: 2π × 6 ÷ 4 + 12 ≈ 21.4 cm. Square: 4 × 6 = 24 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Using π ≈ 3.14, a circle has an area of 50.24 cm². What is its diameter?",
        ["8", "8 cm"],
        "A = 3.14 × r², so r² = 50.24 ÷ 3.14 = 16 and r = √16 = 4 cm. The diameter is 2 × 4 = 8 cm.",
      ),
    (n) =>
      choice(
        n,
        "A running track has two straight sides of 100 m and two semicircular ends, each with a diameter of 60 m. About how long is one lap?",
        ["About 388 m", "About 294 m", "About 577 m", "About 260 m"],
        0,
        "The two semicircles make one whole circle of diameter 60 m: π × 60 ≈ 188.5 m. Add the straights: 188.5 + 100 + 100 ≈ 388 m. 294 m uses the radius by mistake.",
      ),
  ],
});

/** MA4-VOL-C-01: volume of prisms and cylinders, and volume and capacity conversions. */
export const VOLUME = levels(8030301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of the block?",
          ["24", "24 cm³", "24 cm3"],
          "Each layer has 4 × 3 = 12 cubes and there are 2 layers: 12 × 2 = 24 cm³.",
        ),
      ),
    (n) =>
      trueFalse(n, "A space of 1 cm³ holds exactly 1 mL of water.", true, "1 cm³ = 1 mL. That's why a 1000 cm³ container holds 1 litre."),
    (n) =>
      choice(
        n,
        "Which rule gives the volume of any prism?",
        ["Area of the base × height", "Length + width + height", "Area of the base + height", "Perimeter of the base × height"],
        0,
        "A prism has the same cross-section all the way through, so V = Ah: the area of the base (cross-section) times the height (length).",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "A rectangular prism is 8 cm long, 5 cm wide and 3 cm high. What is its volume in cm³?",
          ["120", "120 cm³", "120 cm3"],
          "V = l × w × h = 8 × 5 × 3 = 120 cm³.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A drink bottle with a volume of 750 cm³ holds ___ mL.",
        ["750", "750 mL"],
        "1 cm³ holds 1 mL, so 750 cm³ holds 750 mL.",
      ),
    (n) =>
      choice(
        n,
        "How many litres fit in 1 m³?",
        ["1000 L", "100 L", "1 L", "1 000 000 L"],
        0,
        "1 m³ = 100 cm × 100 cm × 100 cm = 1 000 000 cm³ = 1 000 000 mL, and 1 000 000 mL ÷ 1000 = 1000 L.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "A triangular prism has a triangle face with a base of 6 cm and a height of 4 cm. The prism is 9 cm long. What is its volume in cm³?",
          ["108", "108 cm³", "108 cm3"],
          "Area of the triangle = ½ × 6 × 4 = 12 cm². Volume = 12 × 9 = 108 cm³.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        typed(
          "short_answer",
          n,
          "Using π ≈ 3.14, find the volume of a cylinder with a radius of 5 cm and a height of 10 cm, in cm³.",
          ["785", "785 cm³", "785.4", "785 cm3"],
          "Area of the circle = 3.14 × 5² = 78.5 cm². Volume = 78.5 × 10 = 785 cm³.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 2 L? Choose all that are right.",
        ["2000 mL", "2000 cm³", "0.002 m³", "200 cm³", "20 000 mL"],
        [0, 1, 2],
        "2 L = 2000 mL = 2000 cm³. 1 m³ = 1000 L, so 2 L = 2 ÷ 1000 = 0.002 m³. 200 cm³ is only 0.2 L and 20 000 mL is 20 L.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A fish tank is 60 cm long, 30 cm wide and 40 cm high. How many litres does it hold when full?",
        ["72", "72 L"],
        "V = 60 × 30 × 40 = 72 000 cm³ = 72 000 mL. Divide by 1000: 72 L.",
      ),
    (n) =>
      ordering(
        n,
        "Put these solids in order from smallest to largest volume.",
        [
          "Cube with side 5 cm",
          "Rectangular prism 4 cm × 6 cm × 6 cm",
          "Cylinder with radius 3 cm and height 6 cm",
          "Triangular prism: triangle base 10 cm, height 6 cm, length 6 cm",
        ],
        "Cube: 5 × 5 × 5 = 125 cm³. Rectangular prism: 4 × 6 × 6 = 144 cm³. Cylinder: π × 9 × 6 ≈ 169.6 cm³. Triangular prism: ½ × 10 × 6 × 6 = 180 cm³.",
      ),
    (n) =>
      choice(
        n,
        "A swimming pool is 25 m long, 10 m wide and 2 m deep. How many litres does it hold when full?",
        ["500 000 L", "500 L", "50 000 L", "5 000 000 L"],
        0,
        "V = 25 × 10 × 2 = 500 m³. Each m³ holds 1000 L, so 500 × 1000 = 500 000 L.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cylinder-shaped rainwater tank has a diameter of 2 m and a height of 1.5 m. How many litres does it hold, to the nearest 10 L?",
        ["4710", "4710 L"],
        "The radius is 1 m. V = π × 1² × 1.5 ≈ 4.71 m³. Each m³ is 1000 L, so 4.71 × 1000 ≈ 4710 L.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A rectangular prism has a volume of 360 cm³ and a base 9 cm by 8 cm. Its height is ___ cm.",
        ["5", "5 cm"],
        "V = base area × height. Base area = 9 × 8 = 72 cm², so height = 360 ÷ 72 = 5 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A full container 20 cm × 15 cm × 10 cm is tipped into an empty tank 30 cm long and 25 cm wide. How deep is the water in the tank, in cm?",
        ["4", "4 cm"],
        "Water volume = 20 × 15 × 10 = 3000 cm³. The tank's base is 30 × 25 = 750 cm². Depth = 3000 ÷ 750 = 4 cm.",
      ),
  ],
});

/** MA4-VOL-C-01: volume of prisms and cylinders, and volume and capacity conversions. */
export const VOLUME_2 = levels(8030316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 3, height: 3 },
        typed(
          "short_answer",
          n,
          "Each small cube is 1 cm³. What is the volume of this cube?",
          ["27", "27 cm³", "27 cm3"],
          "3 × 3 = 9 cubes in each layer, and there are 3 layers: 9 × 3 = 27 cm³.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for the volume of a shoebox?",
        ["cm³", "cm", "cm²", "kg"],
        0,
        "Volume is measured in cubic units like cm³. cm is for length, cm² is for area and kg is for mass.",
      ),
    (n) => typed("fill_blank", n, "5 L = ___ cm³", ["5000", "5000 cm³"], "1 L = 1000 mL = 1000 cm³, so 5 L = 5 × 1000 = 5000 cm³."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "A shipping container is 12 m long, 4 m wide and 2 m high. What is its volume in m³?",
          ["96", "96 m³", "96 m3"],
          "V = l × w × h = 12 × 4 × 2 = 96 m³.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The volume of a cylinder is the area of its circular base multiplied by its height.",
        true,
        "A cylinder is like a prism with a circle for a cross-section, so V = πr² × h.",
      ),
    (n) =>
      choice(
        n,
        "How many litres is 3.5 m³?",
        ["3500 L", "350 L", "35 000 L", "3.5 L"],
        0,
        "1 m³ = 1000 L, so 3.5 m³ = 3.5 × 1000 = 3500 L.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [0, 6],
          ],
          sideLabels: ["8 cm", "", "6 cm"],
        },
        typed(
          "short_answer",
          n,
          "This right-angled triangle is the cross-section of a prism 12 cm long. What is the volume of the prism in cm³?",
          ["288", "288 cm³", "288 cm3"],
          "Area of the triangle = ½ × 8 × 6 = 24 cm². Volume = 24 × 12 = 288 cm³.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        typed(
          "short_answer",
          n,
          "A cylinder has a radius of 2 m and a height of 5 m. Find its volume in m³, to 1 decimal place.",
          ["62.8", "62.8 m³", "62.83"],
          "Area of the circle = π × 2² = 4π ≈ 12.57 m². Volume = 4π × 5 = 20π ≈ 62.8 m³.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these prisms have a volume of 60 cm³? Choose all that are right.",
        [
          "Rectangular prism 5 cm × 4 cm × 3 cm",
          "Cube with side 6 cm",
          "Triangular prism: triangle base 5 cm, height 4 cm, length 6 cm",
          "Rectangular prism 10 cm × 6 cm × 2 cm",
        ],
        [0, 2],
        "5 × 4 × 3 = 60 ✓. ½ × 5 × 4 = 10, then 10 × 6 = 60 ✓. The cube is 6 × 6 × 6 = 216 and 10 × 6 × 2 = 120.",
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "A milk carton 7 cm × 7 cm × 20 cm can hold 1 L of milk.",
        false,
        "V = 7 × 7 × 20 = 980 cm³ = 980 mL. That is less than 1 L (1000 mL), so it can't hold a full litre.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cylinder-shaped bucket has a diameter of 20 cm and a height of 30 cm. How many litres does it hold, to 1 decimal place?",
        ["9.4", "9.4 L", "9.42"],
        "Radius = 10 cm. V = π × 10² × 30 = 3000π ≈ 9425 cm³ = 9425 mL. Divide by 1000: about 9.4 L.",
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from smallest to largest.",
        ["450 mL", "0.5 L", "600 cm³", "0.0008 m³"],
        "Change them all to mL: 450 mL, 0.5 L = 500 mL, 600 cm³ = 600 mL, 0.0008 m³ = 0.8 L = 800 mL.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "A tent is a triangular prism. Its triangle end has a base of 2 m and a height of 1.5 m, and the tent is 3 m long. How many litres of air are inside?",
          ["4500", "4500 L"],
          "Triangle area = ½ × 2 × 1.5 = 1.5 m². Volume = 1.5 × 3 = 4.5 m³. Each m³ is 1000 L, so 4.5 × 1000 = 4500 L.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cube-shaped box holds exactly 64 L. How long is each edge, in cm?",
        ["40", "40 cm"],
        "64 L = 64 000 mL = 64 000 cm³. The edge is the number that cubes to 64 000: 40 × 40 × 40 = 64 000, so 40 cm.",
      ),
    (n) =>
      choice(
        n,
        "Cylinder A has radius 4 cm and height 10 cm. Cylinder B has radius 8 cm and height 3 cm. Which holds more?",
        ["B, by about 100 cm³", "A, by about 100 cm³", "They hold the same", "B, by about 32 cm³"],
        0,
        "A: π × 4² × 10 = 160π. B: π × 8² × 3 = 192π. B is bigger by 32π ≈ 100.5 cm³, so about 100 cm³. 32 forgets to multiply by π.",
      ),
  ],
});
