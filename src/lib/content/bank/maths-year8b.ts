/**
 * Year 8 Mathematics: Stage 4 (algebra): 15 questions for each Stage 4 standard (NESA outcome),
 * three at each level from very easy to very hard, with two sets for each standard. Year 8 works
 * at the later Stage 4 level, harder than Year 7 on the same focus area: index laws, equations and
 * straight-line graphs on the Cartesian plane.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-IND-C-01: index laws for multiplying and dividing powers, power of a power and the zero index. */
export const INDEX_LAWS = levels(8020201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Simplify x³ × x⁴.",
        ["x⁷", "x¹²", "2x⁷", "2x¹²"],
        0,
        "When you multiply powers with the same base, keep the base and add the indices: 3 + 4 = 7, so x³ × x⁴ = x⁷.",
      ),
    (n) =>
      trueFalse(
        n,
        "Any number except 0 raised to the power of 0 equals 1.",
        true,
        "This is the zero index law. For example 5³ ÷ 5³ = 5⁰, and any number divided by itself is 1, so 5⁰ = 1.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "a⁹ ÷ a⁴ simplifies to a raised to the power ___.",
        "5",
        "When you divide powers with the same base, keep the base and subtract the indices: 9 − 4 = 5, so the answer is a⁵.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Simplify (m²)⁵.",
        ["m¹⁰", "m⁷", "m²⁵", "5m²"],
        0,
        "For a power of a power, multiply the indices: 2 × 5 = 10, so (m²)⁵ = m¹⁰. Adding them to get m⁷ is a common mistake.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Evaluate 5⁰ + 3⁰.",
        "2",
        "Any non-zero number to the power of 0 is 1. So 5⁰ = 1 and 3⁰ = 1, and 1 + 1 = 2.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 2⁸? Choose all that are right.",
        ["2⁵ × 2³", "2¹⁰ ÷ 2²", "(2⁴)²", "2⁴ × 2²", "(2²)⁶"],
        [0, 1, 2],
        "2⁵ × 2³ = 2⁸ (add 5 + 3), 2¹⁰ ÷ 2² = 2⁸ (subtract 10 − 2) and (2⁴)² = 2⁸ (multiply 4 × 2). 2⁴ × 2² = 2⁶ and (2²)⁶ = 2¹².",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Simplify 3a⁴ × 5a².",
        ["15a⁶", "8a⁶", "15a⁸", "8a⁸"],
        0,
        "Multiply the numbers: 3 × 5 = 15. Then add the indices of a: 4 + 2 = 6. So the answer is 15a⁶.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Power of 2", "Value"],
          rows: [
            ["2¹", 2],
            ["2²", 4],
            ["2³", 8],
            ["2⁴", 16],
            ["2⁵", 32],
            ["2⁶", 64],
          ],
        },
        choice(
          n,
          "Look at the table. Use the index laws to write 4 × 32 as a single power of 2.",
          ["2⁷", "2¹⁰", "2⁶", "2⁸"],
          0,
          "From the table, 4 = 2² and 32 = 2⁵. Multiplying powers means adding indices: 2² × 2⁵ = 2⁷. Check: 4 × 32 = 128 = 2⁷.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for simplifying (y³)⁴ ÷ y⁵ in order.",
        ["(y³)⁴ = y¹²", "Now work out y¹² ÷ y⁵", "Subtract the indices: 12 − 5 = 7", "The answer is y⁷"],
        "Deal with the power of a power first by multiplying 3 × 4 = 12. Then divide by subtracting the indices: 12 − 5 = 7, giving y⁷.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Simplify 20x⁷ ÷ 4x³.",
        ["5x⁴", "16x⁴", "5x¹⁰", "80x⁴"],
        0,
        "Divide the numbers: 20 ÷ 4 = 5. Subtract the indices of x: 7 − 3 = 4. So the answer is 5x⁴.",
      ),
    (n) =>
      trueFalse(
        n,
        "(3x)⁰ = 3",
        false,
        "The brackets mean the whole of 3x is raised to the power 0, so (3x)⁰ = 1. It is 3x⁰ (no brackets) that equals 3 × 1 = 3.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "If 5ⁿ × 5³ = 5¹¹, then n = ___.",
        ["8", "n = 8"],
        "Multiplying powers adds the indices, so n + 3 = 11. That means n = 11 − 3 = 8.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Simplify (2a³)² × a⁴.",
        ["4a¹⁰", "2a¹⁰", "4a⁹", "4a²⁴"],
        0,
        "(2a³)² means 2a³ × 2a³ = 4a⁶. The 2 gets squared too. Then 4a⁶ × a⁴ = 4a¹⁰ by adding the indices 6 + 4.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Without a calculator, evaluate (3⁴ × 3⁵) ÷ 3⁷.",
        "9",
        "3⁴ × 3⁵ = 3⁹ (add 4 + 5). Then 3⁹ ÷ 3⁷ = 3² (subtract 9 − 7). 3² = 9.",
      ),
    (n) =>
      multi(
        n,
        "Which of these simplify to 6p⁵? Choose all that are right.",
        ["2p² × 3p³", "12p⁸ ÷ 2p³", "6p⁵ × p⁰", "(6p)⁵", "2p × 3p⁵"],
        [0, 1, 2],
        "2p² × 3p³ = 6p⁵. 12p⁸ ÷ 2p³ = 6p⁵. 6p⁵ × p⁰ = 6p⁵ × 1 = 6p⁵. But (6p)⁵ = 7776p⁵ and 2p × 3p⁵ = 6p⁶.",
      ),
  ],
});

/** MA4-IND-C-01: index laws for multiplying and dividing powers, power of a power and the zero index. */
export const INDEX_LAWS_2 = levels(8020216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Simplify y² × y⁶.",
        ["y⁸", "y¹²", "2y⁸", "y⁴"],
        0,
        "Same base, multiplying: keep the base and add the indices. 2 + 6 = 8, so y² × y⁶ = y⁸.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "k¹⁰ ÷ k² simplifies to k raised to the power ___.",
        "8",
        "Same base, dividing: keep the base and subtract the indices. 10 − 2 = 8, so the answer is k⁸.",
      ),
    (n) =>
      trueFalse(n, "m⁰ = 0 for any number m that is not zero.", false, "Any non-zero number to the power of 0 equals 1, not 0. So m⁰ = 1."),
  ],
  easy: [
    (n) => typed("short_answer", n, "Evaluate 4⁰ × 9.", "9", "4⁰ = 1 because any non-zero number to the power of 0 is 1. Then 1 × 9 = 9."),
    (n) =>
      choice(
        n,
        "Simplify (b³)³.",
        ["b⁹", "b⁶", "b²⁷", "3b³"],
        0,
        "For a power of a power, multiply the indices: 3 × 3 = 9, so (b³)³ = b⁹.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["2⁰", "2³", "3²", "2⁴", "5²"],
        "Work out each one: 2⁰ = 1, 2³ = 8, 3² = 9, 2⁴ = 16 and 5² = 25.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Simplify 6x⁵ ÷ 2x².",
        ["3x³", "4x³", "3x⁷", "12x³"],
        0,
        "Divide the numbers: 6 ÷ 2 = 3. Subtract the indices of x: 5 − 2 = 3. So the answer is 3x³.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 1? Choose all that are right.",
        ["7⁰", "100⁰", "1⁵", "0¹", "(−4)⁰"],
        [0, 1, 2, 4],
        "Any non-zero number to the power of 0 is 1, so 7⁰, 100⁰ and (−4)⁰ are all 1. 1⁵ = 1 × 1 × 1 × 1 × 1 = 1. But 0¹ = 0.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "If (w⁴)ᵏ = w²⁰, then k = ___.",
        ["5", "k = 5"],
        "For a power of a power you multiply the indices, so 4 × k = 20. That means k = 20 ÷ 4 = 5.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Simplify 4m³n² × 2mn⁵.",
        ["8m⁴n⁷", "6m⁴n⁷", "8m³n¹⁰", "8m⁴n¹⁰"],
        0,
        "Multiply the numbers: 4 × 2 = 8. Add the indices for each letter: m³ × m¹ = m⁴ and n² × n⁵ = n⁷. So the answer is 8m⁴n⁷.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Power of 3", "Value"],
          rows: [
            ["3¹", 3],
            ["3²", 9],
            ["3³", 27],
            ["3⁴", 81],
            ["3⁵", 243],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. Use the index laws to work out 243 ÷ 9.",
          "27",
          "From the table, 243 = 3⁵ and 9 = 3². Dividing means subtracting indices: 3⁵ ÷ 3² = 3³, and the table shows 3³ = 27.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "a³ + a³ = a⁶",
        false,
        "The index laws are for multiplying and dividing, not adding. a³ + a³ is two lots of a³, so it equals 2a³. It is a³ × a³ that equals a⁶.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Simplify (x⁵ × x³) ÷ (x²)³.",
        ["x²", "x⁵", "x¹⁰", "x⁰"],
        0,
        "Top: x⁵ × x³ = x⁸. Bottom: (x²)³ = x⁶. Then x⁸ ÷ x⁶ = x², by subtracting 8 − 6.",
      ),
    (n) =>
      typed("short_answer", n, "Without a calculator, evaluate 6⁹ ÷ (6⁴ × 6³).", "36", "6⁴ × 6³ = 6⁷. Then 6⁹ ÷ 6⁷ = 6², and 6² = 36."),
    (n) =>
      choice(
        n,
        "Simplify 18a⁶b⁴ ÷ 3a²b.",
        ["6a⁴b³", "6a³b⁴", "15a⁴b³", "6a⁴b⁴"],
        0,
        "Divide the numbers: 18 ÷ 3 = 6. Subtract indices for each letter: a⁶ ÷ a² = a⁴, and b⁴ ÷ b¹ = b³ (b on its own means b¹). So the answer is 6a⁴b³.",
      ),
  ],
});

/** MA4-EQU-C-01: equations with brackets, pronumerals on both sides, fractions, word problems and x² = c. */
export const EQUATIONS = levels(8020301, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 3(x + 2) = 21.",
        ["5", "x = 5", "x=5"],
        "Divide both sides by 3: x + 2 = 7. Then subtract 2: x = 5. Check: 3 × (5 + 2) = 21.",
      ),
    (n) =>
      choice(
        n,
        "Solve 5x = 2x + 12.",
        ["x = 4", "x = 12", "x = 3", "x = 6"],
        0,
        "Subtract 2x from both sides to get the pronumerals on one side: 3x = 12. Then divide by 3: x = 4.",
      ),
    (n) =>
      trueFalse(
        n,
        "x = 6 is a solution of x/2 + 1 = 4.",
        true,
        "Substitute x = 6: 6/2 + 1 = 3 + 1 = 4. Both sides are equal, so x = 6 is a solution.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "If 4(y − 3) = 20, then y = ___.",
        ["8", "y = 8"],
        "Divide both sides by 4: y − 3 = 5. Then add 3: y = 8. Check: 4 × (8 − 3) = 20.",
      ),
    (n) =>
      multi(
        n,
        "Which numbers are solutions of x² = 49? Choose all that are right.",
        ["7", "−7", "24.5", "49", "−49"],
        [0, 1],
        "7 × 7 = 49 and −7 × −7 = 49, so both 7 and −7 work. 24.5 is 49 ÷ 2, which is a common mistake.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for solving 3(x − 4) = 2x + 1 in order.",
        ["Expand: 3x − 12 = 2x + 1", "Subtract 2x: x − 12 = 1", "Add 12: x = 13", "Check: 3 × 9 = 27 and 26 + 1 = 27"],
        "First expand the brackets, then collect the x terms on one side, then get x on its own, and finally check by substituting x = 13 into both sides.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 7a − 4 = 3a + 16.",
        ["5", "a = 5", "a=5"],
        "Subtract 3a from both sides: 4a − 4 = 16. Add 4: 4a = 20. Divide by 4: a = 5.",
      ),
    (n) =>
      choice(
        n,
        "Solve (x + 4)/3 = 5.",
        ["x = 11", "x = 1", "x = 19", "x = 3"],
        0,
        "Multiply both sides by 3 first: x + 4 = 15. Then subtract 4: x = 11. Check: (11 + 4)/3 = 15/3 = 5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia thinks of a number, doubles it and adds 9. Her answer is 35. What was her number?",
        "13",
        "Write the equation 2n + 9 = 35. Subtract 9: 2n = 26. Divide by 2: n = 13.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 5(x − 2) = 3(x + 4).",
        ["11", "x = 11", "x=11"],
        "Expand both sides: 5x − 10 = 3x + 12. Subtract 3x: 2x − 10 = 12. Add 10: 2x = 22. So x = 11.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 5, height: 3, top: "(x + 7) cm", side: "x cm" },
        choice(
          n,
          "Look at the rectangle. Its perimeter is 46 cm. Find x.",
          ["x = 8", "x = 9.75", "x = 16", "x = 10"],
          0,
          "Perimeter = 2 × (length + width) = 2(x + 7 + x) = 4x + 14. So 4x + 14 = 46, 4x = 32 and x = 8. Check: 15 + 8 + 15 + 8 = 46.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The equation x² = 64 has two solutions, 8 and −8.",
        true,
        "8 × 8 = 64 and −8 × −8 = 64 (a negative times a negative is positive), so both are solutions.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve (2x − 1)/3 = (x + 4)/2.",
        ["14", "x = 14", "x=14"],
        "Multiply both sides by 6 (or cross-multiply): 2(2x − 1) = 3(x + 4). Expand: 4x − 2 = 3x + 12. Subtract 3x and add 2: x = 14. Check: 27/3 = 9 and 18/2 = 9.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "At a Penrith sausage sizzle, sausages cost $3 each and drinks cost $2 each. Liam bought 4 more drinks than sausages and paid $38. How many sausages did he buy?",
        ["6", "6 sausages"],
        "Let s be the number of sausages, so he bought s + 4 drinks. 3s + 2(s + 4) = 38, so 5s + 8 = 38, 5s = 30 and s = 6. Check: 6 sausages cost $18 and 10 drinks cost $20, total $38.",
      ),
    (n) =>
      multi(
        n,
        "Which equations have the solution x = −3? Choose all that are right.",
        ["2x + 9 = 3", "x² = 9", "5 − x = 2", "4(x + 5) = 8", "x/3 = 1"],
        [0, 1, 3],
        "Substitute x = −3. 2 × (−3) + 9 = 3 ✓. (−3)² = 9 ✓. 5 − (−3) = 8, not 2. 4 × (−3 + 5) = 4 × 2 = 8 ✓. −3/3 = −1, not 1.",
      ),
  ],
});

/** MA4-EQU-C-01: equations with brackets, pronumerals on both sides, fractions, word problems and x² = c. */
export const EQUATIONS_2 = levels(8020316, {
  very_easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "If 2(x + 5) = 18, then x = ___.",
        ["4", "x = 4"],
        "Divide both sides by 2: x + 5 = 9. Then subtract 5: x = 4. Check: 2 × (4 + 5) = 18.",
      ),
    (n) =>
      choice(
        n,
        "Solve 6m = m + 20.",
        ["m = 4", "m = 5", "m = 20", "m = 3"],
        0,
        "Subtract m from both sides: 5m = 20. Divide by 5: m = 4. Check: 6 × 4 = 24 and 4 + 20 = 24.",
      ),
    (n) =>
      trueFalse(
        n,
        "x = 10 is a solution of x/5 − 1 = 3.",
        false,
        "Substitute x = 10: 10/5 − 1 = 2 − 1 = 1, not 3. So x = 10 is not a solution. (The solution is x = 20.)",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve n/4 = 9.",
        ["36", "n = 36", "n=36"],
        "n is being divided by 4, so do the opposite: multiply both sides by 4. n = 9 × 4 = 36.",
      ),
    (n) =>
      choice(
        n,
        "Solve 5(p − 2) = 35.",
        ["p = 9", "p = 5", "p = 7.4", "p = 7"],
        0,
        "Divide both sides by 5: p − 2 = 7. Then add 2: p = 9. Check: 5 × (9 − 2) = 35.",
      ),
    (n) =>
      multi(
        n,
        "Which numbers are solutions of y² = 81? Choose all that are right.",
        ["9", "−9", "40.5", "81", "3"],
        [0, 1],
        "9 × 9 = 81 and −9 × −9 = 81, so y = 9 or y = −9. 40.5 is 81 ÷ 2, a common mistake.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 9k + 2 = 4k + 27.",
        ["5", "k = 5", "k=5"],
        "Subtract 4k from both sides: 5k + 2 = 27. Subtract 2: 5k = 25. Divide by 5: k = 5.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [3.5, 5.33],
          ],
          cornerLabels: ["2x°", "x°", "3x°"],
        },
        typed(
          "short_answer",
          n,
          "Look at the triangle. Find the value of x.",
          ["30", "x = 30"],
          "The angles in a triangle add to 180°, so x + 2x + 3x = 180. That gives 6x = 180, so x = 30. The angles are 30°, 60° and 90°.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ava is 3 times as old as her brother. Their ages add to 48. How old is her brother?",
        ["12", "12 years"],
        "Let her brother be b years old, so Ava is 3b. b + 3b = 48, so 4b = 48 and b = 12. Check: 12 + 36 = 48.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve 4(2x + 1) = 6(x + 3).",
        ["7", "x = 7", "x=7"],
        "Expand both sides: 8x + 4 = 6x + 18. Subtract 6x: 2x + 4 = 18. Subtract 4: 2x = 14. So x = 7.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for solving (x − 4)/5 + 3 = 7 in order.",
        ["Subtract 3: (x − 4)/5 = 4", "Multiply by 5: x − 4 = 20", "Add 4: x = 24", "Check: 20/5 + 3 = 7"],
        "Undo the operations in reverse order: first take away the 3, then undo the dividing by 5, then undo the subtracting 4. Finally check the answer.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 2.5, top: "(2x + 3) m", side: "x m" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. Its perimeter is 54 m. Find x.",
          ["8", "x = 8"],
          "Perimeter = 2 × (2x + 3 + x) = 6x + 6. So 6x + 6 = 54, 6x = 48 and x = 8. Check: the sides are 19 m and 8 m, and 19 + 8 + 19 + 8 = 54.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Solve (3x + 2)/4 = (x + 6)/2.",
        ["10", "x = 10", "x=10"],
        "Multiply both sides by 4: 3x + 2 = 2(x + 6) = 2x + 12. Subtract 2x: x + 2 = 12, so x = 10. Check: 32/4 = 8 and 16/2 = 8.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Netball tickets cost $12 for adults and $7 for children. A group had 3 more children than adults and paid $97 altogether. How many adults were in the group?",
        ["4", "4 adults"],
        "Let a be the number of adults, so there were a + 3 children. 12a + 7(a + 3) = 97, so 19a + 21 = 97, 19a = 76 and a = 4. Check: 4 × $12 + 7 × $7 = $48 + $49 = $97.",
      ),
    (n) =>
      choice(
        n,
        "A square has an area of 144 cm². Which is the correct equation and answer for its side length s?",
        ["s² = 144, so s = 12 cm", "4s = 144, so s = 36 cm", "s² = 144, so s = 12 cm or −12 cm", "2s = 144, so s = 72 cm"],
        0,
        "Area of a square is side × side, so s² = 144. The equation has solutions 12 and −12, but a length can't be negative, so s = 12 cm. 4s is the perimeter, not the area.",
      ),
  ],
});

/** MA4-LIN-C-01: the Cartesian plane, tables of values, straight-line graphs and finding rules. */
export const LINEAR = levels(8020401, {
  very_easy: [
    (n) =>
      choice(
        n,
        "In which quadrant is the point (−3, 4)?",
        ["First quadrant", "Second quadrant", "Third quadrant", "Fourth quadrant"],
        1,
        "x is negative (left of the y-axis) and y is positive (above the x-axis). Top left is the second quadrant.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 8, rows: 6, axes: true, points: [{ x: 5, y: 2, label: "A" }] },
        choice(
          n,
          "What are the coordinates of point A?",
          ["(5, 2)", "(2, 5)", "(5, 5)", "(2, 2)"],
          0,
          "Go across the x-axis first: A is 5 across. Then go up: A is 2 up. So A is (5, 2). The x-coordinate always comes first.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The point (0, −6) lies on the y-axis.",
        true,
        "Its x-coordinate is 0, so it is not left or right of the y-axis. It sits on the y-axis, 6 units below the origin.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "y"],
          rows: [
            ["0", 1],
            ["1", 3],
            ["2", 5],
            ["3", 7],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table of values. If the pattern continues, what is y when x = 4?",
          "9",
          "Each time x goes up by 1, y goes up by 2. So when x = 4, y = 7 + 2 = 9. (The rule is y = 2x + 1.)",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "For the rule y = 2x − 3, when x = −1, y = ___.",
        ["−5", "-5"],
        "Substitute x = −1: y = 2 × (−1) − 3 = −2 − 3 = −5.",
      ),
    (n) =>
      multi(
        n,
        "Which points are in the fourth quadrant? Choose all that are right.",
        ["(4, −2)", "(−4, 2)", "(1, −7)", "(−3, −3)", "(6, 0)"],
        [0, 2],
        "The fourth quadrant is bottom right: x positive and y negative. (4, −2) and (1, −7) fit. (6, 0) sits on the x-axis, so it is in no quadrant.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "y"],
          rows: [
            ["−1", "−2"],
            ["0", "1"],
            ["1", "4"],
            ["2", "7"],
          ],
        },
        choice(
          n,
          "Look at the table of values. Which rule does it follow?",
          ["y = 3x + 1", "y = x + 3", "y = 3x − 1", "y = 4x"],
          0,
          "y goes up by 3 each time x goes up by 1, so the rule starts y = 3x. When x = 0, y = 1, so add 1: y = 3x + 1. Check x = −1: 3 × (−1) + 1 = −2.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The point (2, 9) lies on the line y = 4x + 1.",
        true,
        "Substitute x = 2: y = 4 × 2 + 1 = 9. That matches the y-coordinate, so the point is on the line.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 7,
          rows: 7,
          axes: true,
          path: [
            [0, 1],
            [5, 6],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the straight-line graph. What is the value of y when x = 3?",
          ["4", "y = 4"],
          "Go across to 3 on the x-axis, then up to the line. The line is at 4 there. (The line's rule is y = x + 1.)",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "At which point do the lines y = 2x + 1 and y = x + 4 cross?",
        ["(3, 7)", "(7, 3)", "(1, 3)", "(5, 9)"],
        0,
        "Where they cross, the y-values are equal: 2x + 1 = x + 4, so x = 3. Then y = 2 × 3 + 1 = 7. Check in the other line: 3 + 4 = 7.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for drawing the graph of y = x − 2 in order.",
        [
          "Choose some x-values for a table",
          "Use the rule to work out each y-value",
          "Plot each (x, y) point on the axes",
          "Rule a straight line through the points",
        ],
        "First make a table of values using the rule, then plot the points, and finally join them with a ruled straight line.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The point (k, 11) lies on the line y = 3x − 4. What is the value of k?",
        ["5", "k = 5"],
        "Put y = 11 into the rule: 11 = 3k − 4. Add 4: 15 = 3k. Divide by 3: k = 5.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "y"],
          rows: [
            ["1", 7],
            ["2", 5],
            ["3", 3],
            ["4", 1],
          ],
        },
        choice(
          n,
          "Look at the table of values. Which rule does it follow?",
          ["y = 9 − 2x", "y = 2x + 5", "y = −2x + 7", "y = x + 6"],
          0,
          "y goes down by 2 each time x goes up by 1, so the rule has −2x. Going back one step to x = 0 gives y = 9. So y = 9 − 2x. Check x = 3: 9 − 6 = 3.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which points lie on the line y = −3x + 2? Choose all that are right.",
        ["(0, 2)", "(1, −1)", "(−2, 8)", "(2, −5)", "(−1, −1)"],
        [0, 1, 2],
        "Substitute each x. x = 0 gives 2 ✓. x = 1 gives −1 ✓. x = −2 gives 6 + 2 = 8 ✓. x = 2 gives −4, not −5. x = −1 gives 5, not −1.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The lines y = x + 5 and y = 11 − x cross at the point P. What is the y-coordinate of P?",
        ["8", "y = 8"],
        "At P the y-values are equal: x + 5 = 11 − x, so 2x = 6 and x = 3. Then y = 3 + 5 = 8. Check: 11 − 3 = 8.",
      ),
  ],
});

/** MA4-LIN-C-01: the Cartesian plane, tables of values, straight-line graphs and finding rules. */
export const LINEAR_2 = levels(8020416, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which point is in the third quadrant?",
        ["(−2, −5)", "(2, −5)", "(−2, 5)", "(2, 5)"],
        0,
        "The third quadrant is bottom left, where both x and y are negative. Only (−2, −5) has both coordinates negative.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 6,
          axes: true,
          points: [
            { x: 1, y: 4, label: "A" },
            { x: 4, y: 1, label: "B" },
            { x: 4, y: 4, label: "C" },
          ],
        },
        choice(
          n,
          "Look at the grid. Which point is at (4, 1)?",
          ["B", "A", "C"],
          0,
          "Go 4 across the x-axis first, then 1 up. That is point B. Point A is at (1, 4), with the numbers swapped.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The point (−5, 0) lies on the x-axis.",
        true,
        "Its y-coordinate is 0, so it is neither above nor below the x-axis. It sits on the x-axis, 5 units left of the origin.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "For the rule y = 5 − x, when x = 7, y = ___.", ["−2", "-2"], "Substitute x = 7: y = 5 − 7 = −2."),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "y"],
          rows: [
            ["0", 4],
            ["1", 6],
            ["2", 8],
            ["3", 10],
          ],
        },
        choice(
          n,
          "Look at the table of values. Which rule does it follow?",
          ["y = 2x + 4", "y = x + 4", "y = 4x + 2", "y = 2x"],
          0,
          "y goes up by 2 each time x goes up by 1, so the rule starts y = 2x. When x = 0, y = 4, so y = 2x + 4. Check x = 3: 6 + 4 = 10.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The point (3, 2) is the same as the point (2, 3).",
        false,
        "Order matters. (3, 2) is 3 across and 2 up, but (2, 3) is 2 across and 3 up, so they are different points.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which points lie on the y-axis? Choose all that are right.",
        ["(0, 4)", "(0, −7)", "(4, 0)", "(−7, 7)", "(0, 0)"],
        [0, 1, 4],
        "Points on the y-axis have an x-coordinate of 0. That is (0, 4), (0, −7) and the origin (0, 0). (4, 0) is on the x-axis.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 7,
          rows: 7,
          axes: true,
          path: [
            [0, 6],
            [6, 0],
          ],
        },
        choice(
          n,
          "Look at the straight-line graph. Which rule does it show?",
          ["y = 6 − x", "y = x + 6", "y = 6x", "y = x − 6"],
          0,
          "The line passes through (0, 6), (3, 3) and (6, 0). In each point x + y = 6, so y = 6 − x. As x goes up, y goes down.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The point (4, m) lies on the line y = 2x − 9. What is the value of m?",
        ["−1", "-1", "m = −1", "m = -1"],
        "Substitute x = 4: y = 2 × 4 − 9 = 8 − 9 = −1. So m = −1.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "These points all lie on the line y = 2x − 1. Put them in order from lowest to highest.",
        ["(−2, −5)", "(−1, −3)", "(0, −1)", "(3, 5)"],
        "For y = 2x − 1, a bigger x gives a bigger y, so the line rises from left to right. The y-values in order are −5, −3, −1 and 5.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["x", "y"],
          rows: [
            ["−2", "7"],
            ["−1", "4"],
            ["0", "1"],
            ["1", "−2"],
          ],
        },
        choice(
          n,
          "Look at the table of values. Which rule does it follow?",
          ["y = 1 − 3x", "y = 3x + 1", "y = −3x − 2", "y = x + 9"],
          0,
          "y goes down by 3 each time x goes up by 1, so the rule has −3x. When x = 0, y = 1. So y = 1 − 3x. Check x = −2: 1 + 6 = 7.",
        ),
      ),
    (n) =>
      choice(
        n,
        "At which point do the lines y = 3x − 2 and y = x + 6 meet?",
        ["(4, 10)", "(10, 4)", "(2, 4)", "(4, 8)"],
        0,
        "Set the rules equal: 3x − 2 = x + 6, so 2x = 8 and x = 4. Then y = 4 + 6 = 10. Check: 3 × 4 − 2 = 10.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 10,
          axes: true,
          path: [
            [0, 1],
            [4, 9],
          ],
        },
        choice(
          n,
          "Look at the graph of y = 2x + 1. The line y = 7 − x is drawn on the same axes. At which point do the two lines cross?",
          ["(2, 5)", "(5, 2)", "(3, 7)", "(1, 6)"],
          0,
          "Set the rules equal: 2x + 1 = 7 − x, so 3x = 6 and x = 2. Then y = 2 × 2 + 1 = 5. The graph goes through (2, 5), and 7 − 2 = 5 too. (3, 7) is only on the first line and (1, 6) only on the second.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A Newcastle taxi charges $4 to start plus $2 per kilometre, so the cost is C = 2d + 4 dollars for d kilometres. How many kilometres long is a trip that costs $30?",
        ["13", "13 km"],
        "Put C = 30 into the rule: 30 = 2d + 4. Subtract 4: 26 = 2d. Divide by 2: d = 13 km.",
      ),
    (n) =>
      trueFalse(
        n,
        "The points (−1, 5), (1, 1) and (3, −3) all lie on one straight line.",
        true,
        "Each time x goes up by 2, y goes down by 4, so the points change at a steady rate. They all fit y = 3 − 2x: 3 + 2 = 5, 3 − 2 = 1 and 3 − 6 = −3.",
      ),
  ],
});
