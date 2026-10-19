/**
 * Year 7 Mathematics: Stage 4 standards (NESA outcomes), two sets of 15 questions for each, three
 * at each level from very easy to very hard. Year 7 works at the early Stage 4 level, a step beyond
 * Year 6. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-INT-C-01: integers on a number line, ordering and the four operations with integers. */
export const INTEGERS = levels(7010101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "number_line", from: -6, to: 4, jumps: 10, dotAt: 2, labelEvery: true },
        typed(
          "short_answer",
          n,
          "What integer is the dot on?",
          ["−4", "-4"],
          "Each jump is 1. The dot is 2 jumps to the right of −6, so it is on −4.",
        ),
      ),
    (n) => trueFalse(n, "−12 is less than −3.", true, "On a number line −12 is further to the left than −3, so −12 is the smaller number."),
    (n) =>
      typed(
        "fill_blank",
        n,
        "−5 + 8 = ___",
        "3",
        "Start at −5 and move 8 to the right: 5 steps gets you to 0, and 3 more steps gets you to 3.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these integers in order from smallest to largest.",
        ["−11", "−7", "−2", "0", "5"],
        "Negative numbers with a bigger number after the minus sign are further left on the number line, so −11 is smallest. Then −7, −2, 0 and 5.",
      ),
    (n) =>
      choice(
        n,
        "What is 4 − 9?",
        ["5", "−5", "13", "−13"],
        1,
        "Start at 4 and move 9 to the left: 4 steps gets you to 0, and 5 more steps gets you to −5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is −6 × 3?",
        ["−18", "-18"],
        "6 × 3 = 18. A negative times a positive gives a negative, so the answer is −18.",
      ),
  ],
  medium: [
    (n) =>
      typed("short_answer", n, "−7 − (−10) = ?", ["3", "+3"], "Subtracting a negative is the same as adding: −7 − (−10) = −7 + 10 = 3."),
    (n) =>
      multi(
        n,
        "Which of these have an answer of −12? Choose all that are right.",
        ["−3 × 4", "(−3) × (−4)", "24 ÷ (−2)", "−6 + 6", "−20 + 8"],
        [0, 2, 4],
        "−3 × 4 = −12, 24 ÷ (−2) = −12 and −20 + 8 = −12. But (−3) × (−4) = 12, because two negatives make a positive, and −6 + 6 = 0.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: -10, to: 2, jumps: 12, labelEvery: true },
        choice(
          n,
          "At midnight in Cooma it was −2°C. By 4 am the temperature had dropped 7 degrees. Use the number line to find the temperature at 4 am.",
          ["5°C", "−5°C", "−9°C", "9°C"],
          2,
          "Dropping means moving left. Start at −2 and move 7 to the left: −2 − 7 = −9, so it was −9°C.",
        ),
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "Work out −4 + 3 × (−5).", ["−19", "-19"], "Multiply first: 3 × (−5) = −15. Then −4 + (−15) = −19."),
    (n) =>
      trueFalse(
        n,
        "(−2) × (−3) × (−5) is a positive number.",
        false,
        "(−2) × (−3) = 6, which is positive. Then 6 × (−5) = −30, which is negative. An odd number of negative signs gives a negative answer.",
      ),
    (n) =>
      choice(
        n,
        "What is (−48) ÷ (−6) − 10?",
        ["−18", "−2", "2", "18"],
        1,
        "Divide first: (−48) ÷ (−6) = 8, because a negative divided by a negative is positive. Then 8 − 10 = −2.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two integers add to −3 and multiply to −40. What is the smaller of the two integers?",
        ["−8", "-8"],
        "The product is negative, so one number is negative and one is positive. Pairs that multiply to 40 include 5 and 8. 5 + (−8) = −3 and 5 × (−8) = −40, so the numbers are 5 and −8. The smaller one is −8.",
      ),
    (n) =>
      choice(
        n,
        "A submarine is at −120 m (120 m below sea level). It rises 45 m, then dives 3 times as far as it rose. Where is it now?",
        ["−210 m", "−30 m", "−120 m", "−255 m"],
        0,
        "Rising 45 m: −120 + 45 = −75. Diving 3 × 45 = 135 m: −75 − 135 = −210. It is at −210 m.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "(−3)² − 4 × (−2) = ___",
        "17",
        "Square first: (−3)² = (−3) × (−3) = 9. Then multiply: 4 × (−2) = −8. Finally 9 − (−8) = 9 + 8 = 17.",
      ),
  ],
});

/** MA4-INT-C-01: more practice with ordering integers and calculating with integers. */
export const INTEGERS_2 = levels(7010116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "number_line", from: -10, to: 0, jumps: 10, dotAt: 3 },
        choice(
          n,
          "What integer is the dot on?",
          ["−3", "−7", "7", "−6"],
          1,
          "The line goes from −10 to 0 in jumps of 1. The dot is 3 jumps to the right of −10, so it is on −7.",
        ),
      ),
    (n) => typed("short_answer", n, "What is −8 + 3?", ["−5", "-5"], "Start at −8 and move 3 to the right: −7, −6, −5. The answer is −5."),
    (n) =>
      trueFalse(
        n,
        "−1 is greater than −10.",
        true,
        "−1 is much closer to 0 and is further right on the number line than −10, so −1 is greater.",
      ),
  ],
  easy: [
    (n) => choice(n, "Which integer is 4 less than −2?", ["2", "−6", "−2", "6"], 1, "4 less means move 4 to the left: −2 − 4 = −6."),
    (n) => typed("fill_blank", n, "−9 − 4 = ___", ["−13", "-13"], "Start at −9 and move 4 more to the left: −10, −11, −12, −13."),
    (n) =>
      ordering(
        n,
        "Put these Snowy Mountains temperatures in order from warmest to coldest.",
        ["6°C", "0°C", "−4°C", "−9°C", "−15°C"],
        "Positive temperatures are warmest, then 0°C. Below zero, the bigger the number after the minus sign, the colder it is, so −15°C is the coldest.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "number_line", from: -6, to: 6, jumps: 12, dotAt: 2, labelEvery: true },
        typed(
          "short_answer",
          n,
          "The dot shows where Tama starts. He moves 7 units right, then 2 units left. Which integer does he finish on?",
          ["1", "+1"],
          "The dot is on −4. Moving 7 right: −4 + 7 = 3. Then 2 left: 3 − 2 = 1.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is (−56) ÷ 8?",
        ["−7", "-7"],
        "56 ÷ 8 = 7. A negative divided by a positive is negative, so the answer is −7.",
      ),
    (n) =>
      multi(
        n,
        "Which of these give a positive answer? Choose all that are right.",
        ["(−5) × (−4)", "−5 × 4", "(−36) ÷ (−9)", "−3 − (−8)", "−10 + 2"],
        [0, 2, 3],
        "(−5) × (−4) = 20 and (−36) ÷ (−9) = 4, because two negatives give a positive. −3 − (−8) = −3 + 8 = 5. But −5 × 4 = −20 and −10 + 2 = −8.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "18 ÷ (−3) + (−2) × 7 = ?",
        ["-20", "−20"],
        "Divide and multiply first: 18 ÷ (−3) = −6 and (−2) × 7 = −14. Then −6 + (−14) = −20.",
      ),
    (n) => trueFalse(n, "−2 − 5 × (−3) = 13", true, "Multiply first: 5 × (−3) = −15. Then −2 − (−15) = −2 + 15 = 13. So it is true."),
    (n) =>
      choice(
        n,
        "Overnight the temperature at Perisher fell from 3°C to −11°C. By how many degrees did it fall?",
        ["8", "14", "−8", "11"],
        1,
        "From 3 down to 0 is 3 degrees, and from 0 down to −11 is 11 degrees. 3 + 11 = 14 degrees.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "In a quiz, a right answer scores 4 points and a wrong answer scores −2 points. Mia answered 12 questions and got 5 right. What was her total score?",
        "6",
        "5 right: 5 × 4 = 20. 12 − 5 = 7 wrong: 7 × (−2) = −14. Total: 20 + (−14) = 6.",
      ),
    (n) =>
      choice(
        n,
        "Which expression has the smallest value?",
        ["(−2)³", "−2 × 5", "(−3)²", "−4 − 5"],
        1,
        "(−2)³ = (−2) × (−2) × (−2) = −8. −2 × 5 = −10. (−3)² = 9. −4 − 5 = −9. The smallest is −10.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "−24 ÷ ___ = 6",
        ["−4", "-4", "(−4)", "(-4)"],
        "The answer 6 is positive, so we must divide −24 by a negative number. 24 ÷ 4 = 6, so the missing number is −4.",
      ),
  ],
});

/** MA4-FRC-C-01: equivalent fractions, operations with fractions, and fractions, decimals and percentages. */
export const FRACTIONS = levels(7020101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 8, shaded: 6 },
        typed(
          "short_answer",
          n,
          "What fraction of the bar is shaded? Write it in simplest form.",
          ["3/4", "three quarters", "three-quarters"],
          "6 of the 8 parts are shaded, which is 6/8. Divide the top and bottom by 2 to get 3/4.",
        ),
      ),
    (n) =>
      trueFalse(n, "2/5 is equivalent to 6/15.", true, "Multiply the top and bottom of 2/5 by 3: 2 × 3 = 6 and 5 × 3 = 15. So 2/5 = 6/15."),
    (n) =>
      choice(
        n,
        "Write 0.7 as a percentage.",
        ["7%", "70%", "0.7%", "700%"],
        1,
        "To change a decimal to a percentage, multiply by 100: 0.7 × 100 = 70, so 0.7 = 70%.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 3/8 + 1/8? Give your answer in simplest form.",
        ["1/2", "one half", "a half"],
        "The denominators are the same, so add the numerators: 3/8 + 1/8 = 4/8. Then simplify: 4/8 = 1/2.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["0.3", "1/3", "35%", "2/5"],
        "Change them all to decimals: 0.3, 1/3 = 0.333…, 35% = 0.35 and 2/5 = 0.4.",
      ),
    (n) => typed("short_answer", n, "Find 25% of $64.", ["16", "$16", "$16.00"], "25% is one quarter, so divide by 4: $64 ÷ 4 = $16."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is 2 1/3 + 1 1/2?",
        ["3 2/5", "3 5/6", "3 2/6", "4 1/6"],
        1,
        "Add the whole numbers: 2 + 1 = 3. Then add the fractions using sixths: 1/3 + 1/2 = 2/6 + 3/6 = 5/6. So the answer is 3 5/6.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 5, dotAt: 3 },
        typed(
          "short_answer",
          n,
          "Write the number the dot is on as a decimal.",
          ["0.6", ".6"],
          "The line from 0 to 1 is cut into 5 equal jumps, so each jump is 1/5. The dot is on 3/5, and 3/5 = 6/10 = 0.6.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these fractions give a recurring decimal? Choose all that are right.",
        ["1/3", "1/8", "2/11", "3/20", "5/6"],
        [0, 2, 4],
        "1/3 = 0.333…, 2/11 = 0.1818… and 5/6 = 0.8333… go on forever. 1/8 = 0.125 and 3/20 = 0.15 stop, because 8 and 20 have only 2s and 5s as prime factors.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 3/4 × 2 2/3? Give your answer in simplest form.",
        ["2", "2/1"],
        "Change the mixed numeral to an improper fraction: 2 2/3 = 8/3. Then 3/4 × 8/3 = 24/12 = 2.",
      ),
    (n) =>
      choice(
        n,
        "What is 2 1/4 ÷ 3/8?",
        ["27/32", "6", "1 1/2", "2/3"],
        1,
        "Change 2 1/4 to 9/4. To divide by 3/8, multiply by its reciprocal 8/3: 9/4 × 8/3 = 72/12 = 6.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "At a school sausage sizzle, 240 sausage sandwiches were sold and 35% of them had onions. That is ___ sandwiches with onions.",
        "84",
        "10% of 240 is 24, so 30% is 72 and 5% is 12. 35% is 72 + 12 = 84.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Liam spent 2/5 of his money on a cricket bat, then 1/4 of what was left on a ball. He has $54 left. How many dollars did he start with?",
        ["120", "$120"],
        "After the bat he had 3/5 left. The ball cost 1/4 of 3/5 = 3/20, so he has 3/5 − 3/20 = 12/20 − 3/20 = 9/20 left. 9/20 of his money is $54, so 1/20 is $6 and all of it is 20 × $6 = $120.",
      ),
    (n) =>
      choice(
        n,
        "An $80 netball is on sale for 15% off. Then a further 10% is taken off the sale price. What is the final price?",
        ["$60.00", "$61.20", "$62.00", "$58.80"],
        1,
        "15% of $80 is $12, so the sale price is $68. 10% of $68 is $6.80, so the final price is $68 − $6.80 = $61.20. (It is not 25% off, because the 10% comes off the smaller price.)",
      ),
    (n) =>
      trueFalse(
        n,
        "7/9 is greater than 0.78.",
        false,
        "7/9 = 0.777…, a recurring decimal. Compare 0.777… with 0.780: the hundredths digit 7 is less than 8, so 7/9 is less than 0.78.",
      ),
  ],
});

/** MA4-FRC-C-01: more practice with fraction operations, percentages and decimals. */
export const FRACTIONS_2 = levels(7020116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 10, shaded: 4 },
        choice(
          n,
          "What fraction of the circle is shaded, in simplest form?",
          ["2/5", "4/6", "2/3", "3/5"],
          0,
          "4 of the 10 parts are shaded, which is 4/10. Divide the top and bottom by 2 to get 2/5.",
        ),
      ),
    (n) => typed("fill_blank", n, "3/4 = ___/20", "15", "4 × 5 = 20, so multiply the top by 5 too: 3 × 5 = 15. So 3/4 = 15/20."),
    (n) => typed("short_answer", n, "Write 45% as a decimal.", ["0.45", ".45"], "Per cent means out of 100, so 45% = 45/100 = 0.45."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is 5/6 − 1/3?",
        ["4/3", "1/2", "4/6", "2/3"],
        1,
        "Make the denominators the same: 1/3 = 2/6. Then 5/6 − 2/6 = 3/6, which simplifies to 1/2.",
      ),
    (n) =>
      trueFalse(
        n,
        "1/8 written as a decimal is 0.125, which is a terminating decimal.",
        true,
        "1 ÷ 8 = 0.125. The digits stop after the 5, so it is a terminating decimal.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 3/5? Choose all that are right.",
        ["0.6", "60%", "6/10", "0.35", "9/15", "35%"],
        [0, 1, 2, 4],
        "3/5 = 6/10 = 0.6 = 60%, and 9/15 also simplifies to 3/5. 0.35 and 35% just use the digits 3 and 5, but are not equal to 3/5.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A farm in Dubbo harvested 450 kg of oranges. 30% were sold at the markets. How many kilograms were sold at the markets?",
        ["135", "135 kg"],
        "10% of 450 is 45, so 30% is 3 × 45 = 135 kg.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 2, jumps: 8, dotAt: 7 },
        typed(
          "short_answer",
          n,
          "Write the number the dot is on as a mixed numeral.",
          ["1 3/4", "7/4", "1.75"],
          "The line from 0 to 2 has 8 jumps, so each jump is 2 ÷ 8 = 1/4. The dot is 7 jumps along, at 7/4 = 1 3/4.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is 2/3 × 9/10? Give the answer in simplest form.",
        ["3/5", "11/13", "27/20", "2/5"],
        0,
        "Multiply tops and bottoms: 2 × 9 = 18 and 3 × 10 = 30, so 18/30. Divide both by 6 to get 3/5.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 3 1/4 − 1 2/3? Write your answer as a mixed numeral.",
        ["1 7/12", "19/12"],
        "Change to improper fractions: 13/4 − 5/3. Use twelfths: 39/12 − 20/12 = 19/12 = 1 7/12.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["5/8", "0.65", "2/3", "67%", "0.7"],
        "Change each to a decimal: 5/8 = 0.625, 0.65, 2/3 = 0.666…, 67% = 0.67 and 0.7.",
      ),
    (n) =>
      choice(
        n,
        "Ava scored 42 out of 56 on a maths test. What percentage did she get?",
        ["75%", "42%", "56%", "70%"],
        0,
        "42/56 simplifies to 3/4 (divide both by 14). 3/4 = 75%.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A ribbon 5 1/4 m long is cut into pieces that are each 3/8 m long. How many pieces are there?",
        "14",
        "Divide: 5 1/4 ÷ 3/8 = 21/4 × 8/3 = 168/12 = 14 pieces.",
      ),
    (n) =>
      choice(
        n,
        "Which fraction gives a recurring decimal?",
        ["7/20", "3/16", "5/12", "9/25"],
        2,
        "A fraction in simplest form terminates only if its denominator has no prime factors except 2 and 5. 20, 16 and 25 pass, but 12 = 2 × 2 × 3 has a 3, so 5/12 = 0.41666… recurs.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "At a school fete, 3/8 of the cakes were sold in the morning. Then 2/5 of the cakes that were left were sold in the afternoon. 36 cakes were not sold. How many cakes were there at the start?",
        "96",
        "After the morning 5/8 were left. The afternoon sold 2/5 of 5/8 = 2/8, so 5/8 − 2/8 = 3/8 were not sold. 3/8 of the cakes is 36, so 1/8 is 12 and all the cakes are 8 × 12 = 96.",
      ),
  ],
});

/** MA4-ALG-C-01: pronumerals, writing expressions, substitution and simplifying algebraic terms. */
export const ALGEBRA = levels(7030101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which expression means 'a number n increased by 7'?",
        ["7n", "n + 7", "n − 7", "n ÷ 7"],
        1,
        "Increased by 7 means add 7, so the expression is n + 7. 7n means 7 × n.",
      ),
    (n) => typed("short_answer", n, "If x = 6, what is the value of 4x?", "24", "4x means 4 × x. Replace x with 6: 4 × 6 = 24."),
    (n) =>
      trueFalse(
        n,
        "3a and 5a are like terms.",
        true,
        "Like terms have exactly the same pronumeral part. Both terms have just a, so they are like terms.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Simplify 5m + 3m.",
        ["8m", "8 m"],
        "5m and 3m are like terms, so add the numbers in front: 5 + 3 = 8. The answer is 8m.",
      ),
    (n) => typed("fill_blank", n, "If p = 9, then p − 4 = ___", "5", "Replace p with 9: 9 − 4 = 5."),
    (n) =>
      multi(
        n,
        "Which of these are like terms with 4y? Choose all that are right.",
        ["−2y", "4x", "y", "4y²", "10y"],
        [0, 2, 4],
        "Like terms must have exactly y as the pronumeral part. −2y, y and 10y all do. 4x has x instead, and 4y² has y², which is different from y.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Simplify 6a + 2b − 4a + 5b.",
        ["2a + 7b", "10a + 7b", "9ab", "2a + 3b"],
        0,
        "Group the like terms: 6a − 4a = 2a and 2b + 5b = 7b. So the answer is 2a + 7b.",
      ),
    (n) =>
      typed("short_answer", n, "Simplify 3 × 4k.", ["12k", "12 k"], "Multiply the numbers: 3 × 4 = 12, and keep the k. So 3 × 4k = 12k."),
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 3, top: "2a", side: "a" },
        typed(
          "short_answer",
          n,
          "Look at the rectangle. Write its perimeter in simplest form.",
          ["6a", "6 a"],
          "The perimeter is all four sides added: 2a + a + 2a + a = 6a.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the value of 3a + 2b when a = 4 and b = −5.",
        "2",
        "3a = 3 × 4 = 12 and 2b = 2 × (−5) = −10. Then 12 + (−10) = 2.",
      ),
    (n) =>
      choice(
        n,
        "Simplify 12xy ÷ 4x.",
        ["3y", "3xy", "8y", "3"],
        0,
        "Write it as a fraction: 12xy/4x. Divide the numbers: 12 ÷ 4 = 3. The x on top and bottom cancel, leaving y. So the answer is 3y.",
      ),
    (n) =>
      choice(
        n,
        "Ben has d dollars. He spends $15, then shares what is left equally with his sister. Which expression shows how much each of them gets?",
        ["(d − 15) ÷ 2", "d − 15 ÷ 2", "d ÷ 2 − 15", "2(d − 15)"],
        0,
        "First take away 15: d − 15. Then share it between 2 people by dividing by 2. The brackets make sure the subtraction happens first: (d − 15) ÷ 2.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Simplify 5x × 3y × 2x.",
        ["30x²y", "10x²y", "30xy", "15x²y"],
        0,
        "Multiply the numbers: 5 × 3 × 2 = 30. Then the pronumerals: x × y × x = x²y. So the answer is 30x²y.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "When n = −3, what is the value of n² − 2n + 5?",
        "20",
        "n² = (−3)² = 9. 2n = 2 × (−3) = −6, so −2n = +6. Then 9 + 6 + 5 = 20.",
      ),
    (n) =>
      multi(
        n,
        "Which expressions simplify to 6x? Choose all that are right.",
        ["2x + 4x", "3x × 2x", "12x² ÷ 2x", "8x − 2", "3 × 2x"],
        [0, 2, 4],
        "2x + 4x = 6x. 12x² ÷ 2x = 6x, because 12 ÷ 2 = 6 and x² ÷ x = x. 3 × 2x = 6x. But 3x × 2x = 6x², and 8x − 2 cannot be simplified because 8x and 2 are not like terms.",
      ),
  ],
});

/** MA4-ALG-C-01: more practice with writing expressions, substitution and simplifying. */
export const ALGEBRA_2 = levels(7030116, {
  very_easy: [
    (n) => typed("short_answer", n, "If y = 5, what is the value of y + 12?", "17", "Replace y with 5: 5 + 12 = 17."),
    (n) =>
      choice(
        n,
        "What does 3t mean?",
        ["3 + t", "3 × t", "t ÷ 3", "t − 3"],
        1,
        "When a number is written right next to a pronumeral, it means multiply. 3t means 3 × t.",
      ),
    (n) =>
      trueFalse(
        n,
        "2x and 2y are like terms.",
        false,
        "Like terms need the same pronumeral part. 2x has x and 2y has y, so they are not like terms, even though both have a 2.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which expression means 'double a number w, then subtract 3'?",
        ["2w − 3", "2(w − 3)", "w² − 3", "3 − 2w"],
        0,
        "Double w is 2w. Then subtract 3: 2w − 3. In 2(w − 3) the 3 is taken away before doubling, and w² means w × w, not double.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Simplify 9c − 4c.",
        ["5c", "5 c"],
        "9c and 4c are like terms, so subtract the numbers in front: 9 − 4 = 5. The answer is 5c.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["n", "3n + 1"],
          rows: [
            ["1", 4],
            ["2", 7],
            ["3", 10],
            ["5", "?"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. What number goes where the ? is?",
          "16",
          "Substitute n = 5 into 3n + 1: 3 × 5 + 1 = 15 + 1 = 16.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "4h + 7 + 2h − 3 simplifies to ___",
        ["6h + 4", "6h+4", "4 + 6h", "4+6h"],
        "Collect the h terms: 4h + 2h = 6h. Collect the numbers: 7 − 3 = 4. So the answer is 6h + 4.",
      ),
    (n) => typed("short_answer", n, "Find the value of 5m − 8 when m = 3.", "7", "5m = 5 × 3 = 15. Then 15 − 8 = 7."),
    (n) =>
      ordering(
        n,
        "When x = 4, put these expressions in order from smallest to largest value.",
        ["x − 5", "x ÷ 2", "3x − 2", "x²"],
        "Substitute x = 4: x − 5 = −1, x ÷ 2 = 2, 3x − 2 = 10 and x² = 16.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Simplify 7a × 3b.",
        ["21ab", "10ab", "21a + b", "73ab"],
        0,
        "Multiply the numbers: 7 × 3 = 21. Then multiply the pronumerals: a × b = ab. So 7a × 3b = 21ab.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the value of 2(p + q) when p = 7 and q = −10.",
        ["−6", "-6"],
        "Work out the brackets first: 7 + (−10) = −3. Then 2 × (−3) = −6.",
      ),
    (n) =>
      choice(
        n,
        "A phone plan costs $20 a month plus $5 for each gigabyte (GB) of data used. Which expression gives the cost in dollars for one month when g GB are used?",
        ["20 + 5g", "25g", "5 + 20g", "20g + 5g"],
        0,
        "The $20 is paid once. Each GB costs $5, so g GB cost 5 × g = 5g. The total is 20 + 5g.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 4, top: "3x", side: "x + 2" },
        choice(
          n,
          "Look at the rectangle. Which expression is its perimeter, in simplest form?",
          ["8x + 4", "4x + 2", "8x + 2", "3x² + 6x"],
          0,
          "The perimeter is 3x + (x + 2) + 3x + (x + 2). Collect the x terms: 3x + x + 3x + x = 8x. Collect the numbers: 2 + 2 = 4. So it is 8x + 4. (3x² + 6x would be the area.)",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Simplify 18a²b ÷ 6ab.",
        ["3a", "3 a"],
        "Divide the numbers: 18 ÷ 6 = 3. Then a²b ÷ ab: a² ÷ a = a and b ÷ b = 1. So the answer is 3a.",
      ),
    (n) =>
      choice(
        n,
        "Tickets to the Royal Easter Show cost a dollars for an adult and c dollars for a child. A family buys 2 adult and 3 child tickets and pays with a $100 note. Which expression shows their change in dollars?",
        ["100 − (2a + 3c)", "100 − 2a + 3c", "(2a + 3c) − 100", "100 − 5ac"],
        0,
        "The tickets cost 2a + 3c dollars altogether. Change is what they paid minus the cost, so 100 − (2a + 3c). The brackets matter: 100 − 2a + 3c would add the child tickets back on.",
      ),
  ],
});
