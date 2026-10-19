/**
 * Year 7 Mathematics: Stage 4 (NSW Mathematics K–10, 2022). Two sets of 15 questions for each
 * standard (NESA outcome), three at each level from very easy to very hard. Covers indices,
 * linear equations, and length (perimeter and circumference). Arithmetic answers are checked by
 * the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-IND-C-01: index notation, squares and square roots, cubes and cube roots, prime factorisation with indices. */
export const INDICES = levels(7030201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which shows 5 × 5 × 5 written in index notation?",
        ["5³", "3⁵", "5 × 3", "15"],
        0,
        "5 is multiplied by itself 3 times. The base is 5 and the index (power) is 3, so it is 5³.",
      ),
    (n) => typed("short_answer", n, "What is the value of 6²?", "36", "6² means 6 × 6, which is 36."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 4 },
        typed(
          "fill_blank",
          n,
          "The dots make a square with 4 in each row and 4 rows. So 4² = ___ dots.",
          "16",
          "4² means 4 × 4. There are 4 rows of 4 dots, which is 16 dots.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is √81?", "9", "√81 asks: what number times itself makes 81? 9 × 9 = 81, so √81 = 9."),
    (n) => trueFalse(n, "True or false: 2⁴ is equal to 4².", true, "2⁴ = 2 × 2 × 2 × 2 = 16 and 4² = 4 × 4 = 16. They are equal."),
    (n) =>
      multi(
        n,
        "Which of these are square numbers? Choose all that are right.",
        ["49", "64", "90", "121", "50"],
        [0, 1, 3],
        "49 = 7², 64 = 8² and 121 = 11². 90 and 50 are not any whole number times itself.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the cube root of 64 (∛64)?",
        "4",
        "The cube root asks: what number times itself three times makes 64? 4 × 4 × 4 = 64, so ∛64 = 4.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["2⁵", "6²", "3⁴", "10²"],
        "Work each one out: 2⁵ = 32, 6² = 36, 3⁴ = 81 and 10² = 100. So the order is 2⁵, 6², 3⁴, 10².",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Number", "Cube"],
          rows: [
            ["1", 1],
            ["2", 8],
            ["3", 27],
            ["4", "?"],
          ],
        },
        typed(
          "fill_blank",
          n,
          "Look at the table of cube numbers. The cube of 4 is ___.",
          "64",
          "The cube of 4 is 4³ = 4 × 4 × 4 = 16 × 4 = 64.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the prime factorisation of 72 written with indices?",
        ["2³ × 3²", "2² × 3³", "2 × 36", "8 × 9"],
        0,
        "72 = 2 × 36 = 2 × 2 × 18 = 2 × 2 × 2 × 9 = 2 × 2 × 2 × 3 × 3. That is three 2s and two 3s, so 2³ × 3². The others are not all primes, or give 108.",
      ),
    (n) => typed("short_answer", n, "Work out √49 + 3².", "16", "√49 = 7 and 3² = 9. Then 7 + 9 = 16."),
    (n) =>
      typed(
        "fill_blank",
        n,
        "√30 is not a whole number. It lies between 5 and ___.",
        "6",
        "5² = 25 and 6² = 36. 30 is between 25 and 36, so √30 is between 5 and 6.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A square vegetable garden at a school in Dubbo has an area of 144 m². What is its perimeter?",
        ["48 m", "36 m", "72 m", "12 m"],
        0,
        "The side length is √144 = 12 m, because 12 × 12 = 144. A square has 4 equal sides, so the perimeter is 4 × 12 = 48 m.",
      ),
    (n) => typed("short_answer", n, "Write 2³ × 5² as an ordinary number.", "200", "2³ = 8 and 5² = 25. Then 8 × 25 = 200."),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest whole number you can multiply 18 by to make a square number?",
        "2",
        "18 = 2 × 3². The 3s are already a pair, but the 2 is on its own. Multiply by one more 2: 18 × 2 = 36 = 2² × 3² = 6².",
      ),
  ],
});

/** MA4-IND-C-01: index notation, squares and square roots, cubes and cube roots, prime factorisation with indices. */
export const INDICES_2 = levels(7030216, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "In 7⁴, what number is the base?",
        "7",
        "In index notation the big number is the base and the small raised number is the index. In 7⁴ the base is 7 and the index is 4.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [3, 0],
            [3, 3],
            [0, 3],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Look at the square on the grid. Its area is 3² square units. How many square units is that?",
          ["9", "9 square units"],
          "The square is 3 units long and 3 units wide. 3² = 3 × 3 = 9, and you can count 9 small squares inside it.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: 3² means 3 × 2.",
        false,
        "3² means 3 multiplied by itself: 3 × 3 = 9. It does not mean 3 × 2, which is 6.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is the value of 4³?", "64", "4³ = 4 × 4 × 4. 4 × 4 = 16, and 16 × 4 = 64."),
    (n) =>
      choice(
        n,
        "Which number is the same as 10⁴?",
        ["10 000", "1000", "40", "100 000"],
        0,
        "10⁴ = 10 × 10 × 10 × 10 = 10 000. The index 4 tells you there are 4 zeros.",
      ),
    (n) => typed("short_answer", n, "What is √144?", "12", "12 × 12 = 144, so the square root of 144 is 12."),
  ],
  medium: [
    (n) =>
      typed("fill_blank", n, "∛125 = ___", "5", "Find the number that times itself three times makes 125. 5 × 5 × 5 = 125, so ∛125 = 5."),
    (n) =>
      multi(
        n,
        "Which of these are cube numbers? Choose all that are right.",
        ["8", "27", "36", "100", "125"],
        [0, 1, 4],
        "8 = 2³, 27 = 3³ and 125 = 5³. 36 and 100 are square numbers, but not cube numbers.",
      ),
    (n) =>
      pic(
        { kind: "array", rows: 7, columns: 7 },
        choice(
          n,
          "Look at the array of dots. Which shows the number of dots in index notation?",
          ["7²", "2⁷", "7 × 2", "14"],
          0,
          "There are 7 rows with 7 dots in each, so 7 × 7 = 49 dots. 7 × 7 is written 7². (2⁷ would be 128.)",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the prime factorisation of 60 written with indices?",
        ["2² × 3 × 5", "2 × 3 × 10", "2² × 15", "4 × 3 × 5"],
        0,
        "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5. Two 2s make 2², so 60 = 2² × 3 × 5. The other answers still have numbers that are not prime (10, 15 and 4).",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["√64", "∛1000", "2⁴", "5²"],
        "√64 = 8, ∛1000 = 10, 2⁴ = 16 and 5² = 25. So the order is √64, ∛1000, 2⁴, 5².",
      ),
    (n) => typed("short_answer", n, "Work out 2⁵ − 5².", "7", "2⁵ = 2 × 2 × 2 × 2 × 2 = 32 and 5² = 25. Then 32 − 25 = 7."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cube-shaped gift box has a volume of 216 cm³. How long is each edge, in centimetres?",
        ["6", "6 cm"],
        "The volume of a cube is edge × edge × edge, so the edge is ∛216. 6 × 6 × 6 = 216, so each edge is 6 cm.",
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: √(9 + 16) is equal to √9 + √16.",
        false,
        "√(9 + 16) = √25 = 5. But √9 + √16 = 3 + 4 = 7. They are not equal, so you can't split a square root across a plus sign.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "If 2ⁿ = 128, what is the value of n?",
        ["7", "n = 7", "n=7"],
        "Keep doubling from 2: 2, 4, 8, 16, 32, 64, 128. That is 7 twos multiplied together, so 2⁷ = 128 and n = 7.",
      ),
  ],
});

/** MA4-EQU-C-01: solving one- and two-step linear equations, checking by substitution, writing equations from word problems. */
export const EQUATIONS = levels(7040101, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve x + 7 = 12.",
        ["5", "x = 5", "x=5"],
        "Take 7 from both sides to get x on its own: x = 12 − 7 = 5. Check: 5 + 7 = 12.",
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: x = 4 is the solution of 3x = 12.",
        true,
        "Substitute x = 4: 3 × 4 = 12. Both sides match, so it is the solution.",
      ),
    (n) => typed("fill_blank", n, "If y − 6 = 10, then y = ___.", "16", "Add 6 to both sides: y = 10 + 6 = 16. Check: 16 − 6 = 10."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Solve 2x + 3 = 11.",
        ["x = 4", "x = 7", "x = 5.5", "x = 16"],
        0,
        "First take 3 from both sides: 2x = 8. Then divide both sides by 2: x = 4. Check: 2 × 4 + 3 = 11.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "3x − 2"],
          rows: [
            ["1", 1],
            ["2", 4],
            ["3", 7],
            ["4", 10],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. For which value of x does 3x − 2 = 10?",
          ["4", "x = 4", "x=4"],
          "Find 10 in the 3x − 2 column. It is next to x = 4. Check: 3 × 4 − 2 = 12 − 2 = 10.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve n ÷ 5 = 6.",
        ["30", "n = 30", "n=30"],
        "Undo dividing by 5 by multiplying both sides by 5: n = 6 × 5 = 30. Check: 30 ÷ 5 = 6.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Mia buys 4 meat pies at the school canteen and pays $14 altogether. Which equation shows the cost, p dollars, of one pie?",
        ["4p = 14", "p + 4 = 14", "p ÷ 4 = 14", "14p = 4"],
        0,
        "4 pies at p dollars each cost 4 × p = 4p dollars, and that equals $14. So 4p = 14 (and each pie costs $3.50).",
      ),
    (n) =>
      multi(
        n,
        "Which equations have x = 3 as their solution? Choose all that are right.",
        ["2x + 1 = 7", "5x = 20", "x − 8 = −5", "4x − 2 = 10", "x ÷ 3 = 9"],
        [0, 2, 3],
        "Substitute x = 3 in each: 2 × 3 + 1 = 7 ✓, 5 × 3 = 15 not 20, 3 − 8 = −5 ✓, 4 × 3 − 2 = 10 ✓, 3 ÷ 3 = 1 not 9.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for solving 3x − 4 = 11 in order.",
        ["Add 4 to both sides: 3x = 15", "Divide both sides by 3: x = 5", "Check: 3 × 5 − 4 = 11"],
        "Undo the operations in reverse order: first undo − 4 by adding 4, then undo × 3 by dividing by 3. Last, substitute to check.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 5x − 8 = 27.",
        ["7", "x = 7", "x=7"],
        "Add 8 to both sides: 5x = 35. Divide both sides by 5: x = 7. Check: 5 × 7 − 8 = 35 − 8 = 27.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve (x + 4) ÷ 3 = 6.",
        ["14", "x = 14", "x=14"],
        "Multiply both sides by 3: x + 4 = 18. Take 4 from both sides: x = 14. Check: (14 + 4) ÷ 3 = 18 ÷ 3 = 6.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 6, top: "(x + 3) cm", side: "x cm" },
        typed(
          "short_answer",
          n,
          "The perimeter of this rectangle is 30 cm. What is the value of x?",
          ["6", "x = 6", "x=6"],
          "Perimeter = 2 lengths + 2 widths: (x + 3) + (x + 3) + x + x = 4x + 6. So 4x + 6 = 30, 4x = 24 and x = 6. Check: the sides are 9 cm and 6 cm, and 9 + 9 + 6 + 6 = 30.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack is 3 times as old as his sister Ruby. Their ages add to 48. How old is Jack?",
        ["36", "36 years"],
        "Let Ruby be r years old, so Jack is 3r. Then r + 3r = 48, so 4r = 48 and r = 12. Jack is 3 × 12 = 36. Check: 12 + 36 = 48.",
      ),
    (n) =>
      choice(
        n,
        "Solve 7 − 2x = 15.",
        ["x = −4", "x = 4", "x = 11", "x = −11"],
        0,
        "Take 7 from both sides: −2x = 8. Divide both sides by −2: x = −4. Check: 7 − 2 × (−4) = 7 + 8 = 15.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A taxi in Newcastle charges $4 to start plus $2.50 for each kilometre. Lena's trip cost $29. How many kilometres did she travel?",
        ["10", "10 km"],
        "Let k be the kilometres: 4 + 2.5k = 29. Take 4 from both sides: 2.5k = 25. Divide by 2.5: k = 10. Check: 4 + 2.50 × 10 = 29.",
      ),
  ],
});

/** MA4-EQU-C-01: solving one- and two-step linear equations, checking by substitution, writing equations from word problems. */
export const EQUATIONS_2 = levels(7040116, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 4x = 28.",
        ["7", "x = 7", "x=7"],
        "4x means 4 × x. Divide both sides by 4: x = 28 ÷ 4 = 7. Check: 4 × 7 = 28.",
      ),
    (n) =>
      choice(
        n,
        "Solve m − 9 = 15.",
        ["m = 24", "m = 6", "m = −6", "m = 135"],
        0,
        "Add 9 to both sides: m = 15 + 9 = 24. Check: 24 − 9 = 15.",
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: if 2 + k = 9, then k = 11.",
        false,
        "Substitute k = 11: 2 + 11 = 13, not 9. The solution is k = 9 − 2 = 7.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "If 3y + 2 = 20, then y = ___.",
        "6",
        "Take 2 from both sides: 3y = 18. Divide by 3: y = 6. Check: 3 × 6 + 2 = 20.",
      ),
    (n) =>
      choice(
        n,
        "Sam thinks of a number n, doubles it and then adds 5. The answer is 17. Which equation matches?",
        ["2n + 5 = 17", "n + 2 + 5 = 17", "2(n + 5) = 17", "5n + 2 = 17"],
        0,
        "Doubling n gives 2n. Adding 5 after that gives 2n + 5. That equals 17, so 2n + 5 = 17.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve x ÷ 4 = 9.",
        ["36", "x = 36", "x=36"],
        "Multiply both sides by 4: x = 9 × 4 = 36. Check: 36 ÷ 4 = 9.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [6, 6],
          ],
          sideLabels: ["10 cm", "x cm", "x cm"],
        },
        typed(
          "short_answer",
          n,
          "The perimeter of this triangle is 24 cm. What is the value of x?",
          ["7", "x = 7", "x=7"],
          "Add the sides: x + x + 10 = 24, so 2x + 10 = 24. Take 10 from both sides: 2x = 14. Divide by 2: x = 7.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which value of p makes 9p − 7 = 47 true?",
        ["p = 6", "p = 5", "p = 4", "p = 7"],
        0,
        "Substitute each: 9 × 6 − 7 = 54 − 7 = 47 ✓. 9 × 5 − 7 = 38, 9 × 4 − 7 = 29 and 9 × 7 − 7 = 56.",
      ),
    (n) =>
      ordering(
        n,
        "Put these equations in order of their solutions, from smallest to largest.",
        ["x + 5 = 6", "2x = 8", "x − 3 = 4", "3x = 30"],
        "Solve each one: x + 5 = 6 gives x = 1, 2x = 8 gives x = 4, x − 3 = 4 gives x = 7, and 3x = 30 gives x = 10.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 4(x − 2) = 20.",
        ["7", "x = 7", "x=7"],
        "Divide both sides by 4: x − 2 = 5. Add 2 to both sides: x = 7. Check: 4 × (7 − 2) = 4 × 5 = 20.",
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: x = −2 is the solution of 3x + 10 = 4.",
        true,
        "Substitute x = −2: 3 × (−2) + 10 = −6 + 10 = 4. Both sides match, so it is the solution.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball club made $180 at a sausage sizzle. It keeps $30 and shares the rest equally, giving $25 to each team. How many teams are there?",
        ["6", "6 teams"],
        "Let t be the number of teams: 30 + 25t = 180. Take 30 from both sides: 25t = 150. Divide by 25: t = 6. Check: 30 + 25 × 6 = 180.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "The sum of three consecutive whole numbers is 87. What is the smallest of the three numbers?",
        "28",
        "Call the numbers n, n + 1 and n + 2. Then 3n + 3 = 87, so 3n = 84 and n = 28. Check: 28 + 29 + 30 = 87.",
      ),
    (n) =>
      choice(
        n,
        "Solve (2x − 3) ÷ 5 = −1.",
        ["x = −1", "x = 1", "x = 4", "x = −4"],
        0,
        "Multiply both sides by 5: 2x − 3 = −5. Add 3: 2x = −2. Divide by 2: x = −1. Check: (2 × (−1) − 3) ÷ 5 = −5 ÷ 5 = −1.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 3, top: "3w m", side: "w m" },
        typed(
          "short_answer",
          n,
          "A rectangular paddock near Tamworth is 3 times as long as it is wide. Its perimeter is 96 m. How long is the paddock?",
          ["36", "36 m"],
          "Perimeter = 3w + w + 3w + w = 8w. So 8w = 96 and w = 12 m. The length is 3 × 12 = 36 m. Check: 36 + 12 + 36 + 12 = 96.",
        ),
      ),
  ],
});

/** MA4-LEN-C-01: metric length conversions, perimeter of composite shapes, parts of a circle and circumference. */
export const LENGTH = levels(7050101, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Convert 3.5 m to centimetres.",
        ["350", "350 cm"],
        "There are 100 cm in 1 m, so multiply by 100: 3.5 × 100 = 350 cm.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 7.5, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "The ruler is marked in centimetres. How long is the ribbon in millimetres?",
          ["75", "75 mm"],
          "The ribbon reaches halfway between 7 and 8, so it is 7.5 cm. There are 10 mm in 1 cm, so 7.5 × 10 = 75 mm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is the name of a straight line from the centre of a circle to its edge?",
        ["Radius", "Diameter", "Circumference", "Chord"],
        0,
        "The radius goes from the centre out to the edge. The diameter goes right across through the centre, and the circumference is the distance around.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many metres are there in 2.4 km?",
        ["2400", "2400 m"],
        "There are 1000 m in 1 km, so multiply by 1000: 2.4 × 1000 = 2400 m.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 5, top: "8 cm", side: "5 cm" },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this rectangle?",
          ["26", "26 cm"],
          "Perimeter is the distance all the way around: 8 + 5 + 8 + 5 = 26 cm.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: the diameter of a circle is twice as long as its radius.",
        true,
        "The diameter goes from the edge through the centre to the other edge, which is two radii. So d = 2r.",
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
            [8, 3],
            [4, 3],
            [4, 6],
            [0, 6],
          ],
          sideLabels: ["8 m", "3 m", "", "", "4 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "All the corners of this shape are right angles. What is its perimeter?",
          ["28", "28 m"],
          "Find the missing sides first. The short top side is 8 − 4 = 4 m and the inside upright side is 6 − 3 = 3 m. Then add all six: 8 + 3 + 4 + 3 + 4 + 6 = 28 m.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A circle has a diameter of 10 cm. Using π ≈ 3.14, what is its circumference?",
        ["31.4 cm", "15.7 cm", "62.8 cm", "78.5 cm"],
        0,
        "Use C = πd: C = 3.14 × 10 = 31.4 cm.",
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["450 mm", "0.5 m", "62 cm", "1.2 m"],
        "Change them all to centimetres: 450 mm = 45 cm, 0.5 m = 50 cm, 62 cm, and 1.2 m = 120 cm.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A circle has a radius of 7 cm. Find its circumference, correct to 1 decimal place.",
        ["44.0", "44", "44.0 cm", "43.96", "43.98"],
        "The diameter is 2 × 7 = 14 cm. C = πd = 3.14 × 14 = 43.96, which rounds to 44.0 cm. (Using the π button gives 43.98..., also 44.0 cm.)",
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 1.5 km? Choose all that are right.",
        ["1500 m", "150 000 cm", "15 000 mm", "1 500 000 mm", "150 m"],
        [0, 1, 3],
        "1.5 km = 1.5 × 1000 = 1500 m. Then 1500 m × 100 = 150 000 cm, and 1500 m × 1000 = 1 500 000 mm. 15 000 mm is only 15 m.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [9, 7],
            [6, 7],
            [6, 4],
            [3, 4],
            [3, 2],
            [0, 2],
          ],
          sideLabels: ["9 cm", "7 cm", "3 cm", "3 cm", "", "2 cm", "3 cm", ""],
        },
        typed(
          "short_answer",
          n,
          "All the corners of this shape are right angles. What is its perimeter?",
          ["32", "32 cm"],
          "The missing middle step is 9 − 3 − 3 = 3 cm across. The missing left side is 7 − 3 − 2 = 2 cm up. Add all eight sides: 9 + 7 + 3 + 3 + 3 + 2 + 3 + 2 = 32 cm.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bike wheel has a diameter of 60 cm. Using π ≈ 3.14, how many metres does the bike travel in 50 full turns of the wheel?",
        ["94.2", "94.2 m", "94.25"],
        "One turn moves the bike one circumference: C = 3.14 × 60 = 188.4 cm. 50 turns: 188.4 × 50 = 9420 cm. Divide by 100 to get metres: 94.2 m.",
      ),
    (n) =>
      choice(
        n,
        "A semicircle has a diameter of 20 cm. Using π ≈ 3.14, what is its perimeter (curved edge plus straight edge)?",
        ["51.4 cm", "31.4 cm", "62.8 cm", "41.4 cm"],
        0,
        "The curved edge is half a circumference: 3.14 × 20 ÷ 2 = 31.4 cm. Add the straight diameter: 31.4 + 20 = 51.4 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A circular running track has a circumference of 400 m. What is its diameter, to the nearest metre?",
        ["127", "127 m"],
        "C = πd, so d = C ÷ π = 400 ÷ 3.14 ≈ 127.4, which rounds to 127 m. (The π button gives 127.3, also 127 m.)",
      ),
  ],
});

/** MA4-LEN-C-01: metric length conversions, perimeter of composite shapes, parts of a circle and circumference. */
export const LENGTH_2 = levels(7050116, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Convert 64 mm to centimetres.",
        ["6.4", "6.4 cm"],
        "There are 10 mm in 1 cm, so divide by 10: 64 ÷ 10 = 6.4 cm.",
      ),
    (n) =>
      choice(
        n,
        "What is the distance all the way around a circle called?",
        ["Circumference", "Radius", "Diameter", "Area"],
        0,
        "The perimeter of a circle has a special name: the circumference.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [8, 1],
            [5.3, 5.2],
          ],
          sideLabels: ["7 cm", "5 cm", "6 cm"],
        },
        typed("short_answer", n, "What is the perimeter of this triangle?", ["18", "18 cm"], "Add the three sides: 7 + 5 + 6 = 18 cm."),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Convert 7250 m to kilometres.",
        ["7.25", "7.25 km"],
        "There are 1000 m in 1 km, so divide by 1000: 7250 ÷ 1000 = 7.25 km.",
      ),
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
          sideLabels: ["6 m", "2 m", "4 m", "5 m", "2 m", "7 m"],
        },
        typed(
          "short_answer",
          n,
          "Look at this L-shaped garden bed. What is its perimeter?",
          ["26", "26 m"],
          "Add all six sides: 6 + 2 + 4 + 5 + 2 + 7 = 26 m.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "True or false: a chord of a circle always passes through the centre.",
        false,
        "A chord is any straight line joining two points on the circle. Only the longest chord, the diameter, passes through the centre.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "A round backyard trampoline has a diameter of 4 m. Using π ≈ 3.14, what is its circumference?",
        ["12.56 m", "6.28 m", "25.12 m", "8 m"],
        0,
        "Use C = πd: C = 3.14 × 4 = 12.56 m.",
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from longest to shortest.",
        ["3.2 km", "850 m", "8500 cm", "0.9 m"],
        "Change them all to metres: 3.2 km = 3200 m, 850 m, 8500 cm = 85 m, and 0.9 m.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 45 cm? Choose all that are right.",
        ["450 mm", "0.45 m", "4.5 m", "0.00045 km", "4500 mm"],
        [0, 1, 3],
        "45 cm × 10 = 450 mm. 45 cm ÷ 100 = 0.45 m. 0.45 m ÷ 1000 = 0.00045 km. 4.5 m is 450 cm and 4500 mm is 450 cm, so those are too long.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the circumference of a circle with a radius of 4.5 cm, correct to 1 decimal place.",
        ["28.3", "28.3 cm", "28.26", "28.27"],
        "The diameter is 2 × 4.5 = 9 cm. C = πd = 3.14 × 9 = 28.26, which rounds to 28.3 cm. (The π button gives 28.27..., also 28.3 cm.)",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [11, 0],
            [11, 3],
            [7, 3],
            [7, 7],
            [0, 7],
          ],
          sideLabels: ["11 cm", "3 cm", "", "", "7 cm", "7 cm"],
        },
        typed(
          "short_answer",
          n,
          "All the corners of this shape are right angles. What is its perimeter?",
          ["36", "36 cm"],
          "The short top side is 11 − 7 = 4 cm and the inside upright side is 7 − 3 = 4 cm. Add all six: 11 + 3 + 4 + 4 + 7 + 7 = 36 cm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A square tile has a perimeter of 3.6 m. How long is each side in centimetres?",
        ["90 cm", "9 cm", "36 cm", "900 cm"],
        0,
        "Each side is 3.6 ÷ 4 = 0.9 m. Change to centimetres: 0.9 × 100 = 90 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A circle has a circumference of 50.24 cm. Using π ≈ 3.14, what is its radius?",
        ["8", "8 cm"],
        "C = πd, so d = 50.24 ÷ 3.14 = 16 cm. The radius is half the diameter: 16 ÷ 2 = 8 cm.",
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
            [7, 4],
            [4, 4],
            [4, 2],
            [0, 2],
          ],
          sideLabels: ["10 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "All the corners of this stepped shape are right angles, but only two sides are marked. What is its perimeter?",
          ["32", "32 m"],
          "The steps across the top add up to the 10 m bottom, and the steps going up add up to the 6 m side. So the perimeter is 10 + 10 + 6 + 6 = 32 m.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A quarter circle has a radius of 10 cm. Using π ≈ 3.14, what is its perimeter (curved edge plus the two straight edges)?",
        ["35.7 cm", "15.7 cm", "31.4 cm", "25.7 cm"],
        0,
        "The full circumference is 3.14 × 20 = 62.8 cm, so the curved edge is 62.8 ÷ 4 = 15.7 cm. Add the two radii: 15.7 + 10 + 10 = 35.7 cm.",
      ),
  ],
});
