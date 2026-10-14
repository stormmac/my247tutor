/**
 * Year 3 Mathematics: 15 questions for each Stage 2 standard (NESA outcome), three at each
 * level from very easy to very hard. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA2-RN-01: place value to tens of thousands. */
export const PLACE_VALUE = levels(3010101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 4 in 47?",
        ["4", "40", "400", "47"],
        1,
        "The 4 is in the tens place, so it is worth 4 tens, or 40.",
      ),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 3, ones: 5 },
        typed("short_answer", n, "What number do these blocks show?", "35", "There are 3 tens and 5 ones. 3 tens is 30, and 30 + 5 = 35."),
      ),
    (n) => trueFalse(n, "In 62, the 6 is in the tens place.", true, "62 is 6 tens and 2 ones, so the 6 is in the tens place."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 2, tens: 5, ones: 3 },
        choice(n, "Which number do these blocks show?", ["235", "253", "2053", "325"], 1, "2 hundreds, 5 tens and 3 ones is 253."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1 more than 399?",
        "400",
        "One more than 399 fills the ones and the tens, so it goes up to 400.",
      ),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["189", "198", "819", "891"],
        "Compare the hundreds first, then the tens: 189, 198, 819, 891.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "4628 = 4000 + 600 + ___ + 8", "20", "The 2 in 4628 is in the tens place, so it is worth 20."),
    (n) =>
      choice(
        n,
        "What is the value of the 7 in 3742?",
        ["7", "70", "700", "7000"],
        2,
        "The 7 is in the hundreds place, so it is worth 700.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 100 more than 2950?",
        "3050",
        "Adding 100 adds 1 to the hundreds: 9 hundreds becomes 10 hundreds, so 2950 becomes 3050.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which number is the largest?",
        ["4099", "4909", "4990", "4900"],
        2,
        "All have 4 thousands. 4990 has 9 hundreds and 9 tens, more than the others.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 6483 to the nearest hundred.",
        "6500",
        "6483 is between 6400 and 6500. The tens digit is 8, so it rounds up to 6500.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 5306? Choose all that are right.",
        ["5 thousands, 3 hundreds and 6 ones", "53 hundreds and 6 ones", "5000 + 30 + 6", "530 tens and 6 ones"],
        [0, 1, 3],
        "53 hundreds is 5300 and 530 tens is also 5300, so both make 5306. But 5000 + 30 + 6 is only 5036.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the largest 4-digit number you can make using the digits 3, 8, 1 and 6 once each?",
        "8631",
        "Put the biggest digit in the thousands place, then the next biggest, and so on: 8631.",
      ),
    (n) => typed("short_answer", n, "What number is 10 less than 10 000?", "9990", "10 000 − 10 = 9990."),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many hundreds are there in 4500?",
        "45",
        "4500 is 4000 + 500. 4000 is 40 hundreds and 500 is 5 hundreds, so 45 hundreds.",
      ),
  ],
});

/** MA2-RN-02: tenths and hundredths. */
export const DECIMALS = levels(3010201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "A pizza is cut into 10 equal slices. What fraction of the pizza is one slice?",
        ["one half", "one tenth", "one hundredth", "ten"],
        1,
        "10 equal parts are tenths, so one slice is one tenth.",
      ),
    (n) => trueFalse(n, "0.5 is the same as five tenths.", true, "The first place after the decimal point is tenths, so 0.5 is 5 tenths."),
    (n) =>
      choice(
        n,
        "Which decimal shows three tenths?",
        ["3.0", "0.3", "0.03", "30"],
        1,
        "Three tenths is written 0.3: no ones, and 3 in the tenths place.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "Write seven tenths as a decimal.", ["0.7", ".7"], "Seven tenths has 7 in the tenths place: 0.7."),
    (n) => choice(n, "Which is bigger, 0.6 or 0.4?", ["0.6", "0.4", "They are the same"], 0, "6 tenths is more than 4 tenths."),
    (n) => typed("fill_blank", n, "1 whole = ___ tenths", "10", "A whole cut into tenths has 10 parts."),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.2", "0.5", "0.8", "1.1"],
        "0.2, 0.5 and 0.8 are less than 1, and 1.1 is more than 1.",
      ),
    (n) => typed("short_answer", n, "0.3 + 0.4 = ?", "0.7", "3 tenths and 4 tenths make 7 tenths, which is 0.7."),
    (n) =>
      choice(
        n,
        "Which decimal is 2 wholes and 5 tenths?",
        ["2.5", "25", "0.25", "5.2"],
        0,
        "2 wholes go before the decimal point and 5 tenths after it: 2.5.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "What is the value of the 4 in 3.47?",
        ["4 ones", "4 tenths", "4 hundredths", "40"],
        1,
        "The first digit after the decimal point is tenths, so the 4 is 4 tenths.",
      ),
    (n) =>
      typed("short_answer", n, "Write 25 hundredths as a decimal.", ["0.25", ".25"], "25 hundredths is 2 tenths and 5 hundredths: 0.25."),
    (n) => trueFalse(n, "0.7 is greater than 0.65.", true, "0.7 is the same as 0.70, and 70 hundredths is more than 65 hundredths."),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.09", "0.3", "0.45", "0.5"],
        "Write them all with two places: 0.09, 0.30, 0.45, 0.50.",
      ),
    (n) => typed("short_answer", n, "1 − 0.4 = ?", "0.6", "1 whole is 10 tenths. 10 tenths take away 4 tenths is 6 tenths, or 0.6."),
    (n) =>
      multi(
        n,
        "Which of these are equal to one half? Choose all that are right.",
        ["0.5", "0.50", "5 tenths", "0.05"],
        [0, 1, 2],
        "0.5, 0.50 and 5 tenths are all one half. 0.05 is only 5 hundredths.",
      ),
  ],
});

/** MA2-AR-01: addition and subtraction strategies. */
export const ADD_SUB = levels(3020101, {
  very_easy: [
    (n) => typed("short_answer", n, "6 + 7 = ?", "13", "Make a ten: 6 + 4 = 10, then 3 more is 13."),
    (n) => typed("short_answer", n, "15 − 9 = ?", "6", "Count up from 9: 9 + 1 = 10, then 5 more makes 15. That is 6 altogether."),
    (n) => trueFalse(n, "8 + 5 is the same as 5 + 8.", true, "You can add numbers in any order and get the same total, 13."),
  ],
  easy: [
    (n) => typed("short_answer", n, "34 + 25 = ?", "59", "Add the tens: 30 + 20 = 50. Add the ones: 4 + 5 = 9. 50 + 9 = 59."),
    (n) => typed("short_answer", n, "78 − 46 = ?", "32", "Take away the tens: 70 − 40 = 30. Take away the ones: 8 − 6 = 2. 30 + 2 = 32."),
    (n) => choice(n, "Which is the same as 40 + 30?", ["7", "70", "700", "43"], 1, "4 tens and 3 tens make 7 tens, which is 70."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "347 + 285 = ?",
        "632",
        "Hundreds: 300 + 200 = 500. Tens: 40 + 80 = 120. Ones: 7 + 5 = 12. 500 + 120 + 12 = 632.",
      ),
    (n) => typed("short_answer", n, "500 − 168 = ?", "332", "Count up from 168: 2 to 170, 30 to 200, then 300 to 500. 2 + 30 + 300 = 332."),
    (n) =>
      choice(
        n,
        "Mia had 125 stickers and gave away 48. How many are left?",
        ["77", "87", "173", "83"],
        0,
        "125 − 48: take away 50 to get 75, then add back 2, which is 77.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "1250 + 2875 = ?", "4125", "1000 + 2000 = 3000, 250 + 875 = 1125, and 3000 + 1125 = 4125."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A school has 406 students. 179 are girls. How many are boys?",
        "227",
        "406 − 179: count up from 179. 21 to 200, then 206 to 406. 21 + 206 = 227.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 298 + 403?",
        ["500", "600", "700", "800"],
        2,
        "298 is about 300 and 403 is about 400, so the total is about 700.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "3004 − 1568 = ?",
        "1436",
        "Count up from 1568: 32 to 1600, 400 to 2000, then 1004 to 3004. 32 + 400 + 1004 = 1436.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A book has 312 pages. Leo read 145 pages on Monday and 98 pages on Tuesday. How many pages are left?",
        "69",
        "Leo read 145 + 98 = 243 pages. 312 − 243 = 69 pages are left.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make exactly 1000? Choose all that are right.",
        ["625 + 375", "1400 − 400", "480 + 520", "2000 − 1100"],
        [0, 1, 2],
        "625 + 375, 1400 − 400 and 480 + 520 all make 1000. 2000 − 1100 is 900.",
      ),
  ],
});

/** MA2-AR-02: missing values in addition and subtraction. */
export const MISSING_ADD = levels(3020201, {
  very_easy: [
    (n) => typed("fill_blank", n, "4 + ___ = 10", "6", "4 and 6 make 10."),
    (n) => typed("fill_blank", n, "___ + 3 = 8", "5", "Count back 3 from 8 to get 5. Check: 5 + 3 = 8."),
    (n) => trueFalse(n, "If 7 + 3 = 10, then 10 − 3 = 7.", true, "Adding and subtracting undo each other, so 10 − 3 gets back to 7."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "15 − ___ = 9", "6", "15 − 9 = 6, so the missing number is 6. Check: 15 − 6 = 9."),
    (n) => typed("fill_blank", n, "20 + ___ = 50", "30", "2 tens and 3 tens make 5 tens, so the missing number is 30."),
    (n) => choice(n, "Which number makes 12 + ? = 20 true?", ["6", "8", "32", "10"], 1, "Count up from 12 to 20: that is 8."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "45 + ___ = 100", "55", "45 + 5 = 50, and 50 + 50 = 100. 5 + 50 = 55."),
    (n) => typed("fill_blank", n, "___ − 25 = 40", "65", "Add back the 25: 40 + 25 = 65. Check: 65 − 25 = 40."),
    (n) =>
      choice(
        n,
        "I had some marbles. I won 14 more and now I have 31. Which number sentence matches?",
        ["? + 14 = 31", "14 − ? = 31", "31 + 14 = ?", "? − 14 = 31"],
        0,
        "The unknown amount, plus the 14 won, makes 31: ? + 14 = 31.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "250 + ___ = 600", "350", "Count up from 250: 50 to 300, then 300 to 600. 50 + 300 = 350."),
    (n) => typed("fill_blank", n, "___ − 135 = 200", "335", "Add back the 135: 200 + 135 = 335."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ava needs 500 points to win. She has 362. How many more points does she need?",
        "138",
        "Count up from 362: 38 to 400, then 100 to 500. 38 + 100 = 138.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "1000 − ___ = 455", "545", "1000 − 455 = 545. Check: 455 + 545 = 1000."),
    (n) => typed("fill_blank", n, "36 + ___ = 50 + 14", "28", "50 + 14 = 64, so 36 + ? = 64. 64 − 36 = 28."),
    (n) => trueFalse(n, "47 + 28 = 45 + 30", true, "Both sides make 75. Taking 2 from 47 and giving it to 28 keeps the total the same."),
  ],
});

/** MA2-MR-01: multiplication and division facts. */
export const TIMES = levels(3030101, {
  very_easy: [
    (n) => typed("short_answer", n, "2 × 5 = ?", "10", "2 groups of 5 is 5 + 5 = 10."),
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 4 },
        typed(
          "short_answer",
          n,
          "There are 3 rows with 4 dots in each row. How many dots altogether?",
          "12",
          "3 rows of 4 is 4 + 4 + 4 = 12.",
        ),
      ),
    (n) => trueFalse(n, "5 × 2 is the same as 2 × 5.", true, "You can multiply in any order. Both make 10."),
  ],
  easy: [
    (n) => typed("short_answer", n, "4 × 5 = ?", "20", "Count by fives 4 times: 5, 10, 15, 20."),
    (n) => typed("short_answer", n, "10 × 7 = ?", "70", "10 groups of 7 is 70."),
    (n) => choice(n, "Which is the same as 3 + 3 + 3 + 3?", ["3 × 3", "4 × 3", "3 + 4", "12 × 3"], 1, "There are four 3s, so it is 4 × 3."),
  ],
  medium: [
    (n) => typed("short_answer", n, "6 × 4 = ?", "24", "Double 3 × 4 = 12 to get 24."),
    (n) => typed("short_answer", n, "20 ÷ 5 = ?", "4", "How many 5s make 20? 5, 10, 15, 20: four."),
    (n) =>
      choice(
        n,
        "18 apples are shared equally into 3 bags. How many apples go in each bag?",
        ["5", "6", "7", "15"],
        1,
        "18 ÷ 3 = 6, because 3 × 6 = 18.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "7 × 8 = ?", "56", "7 × 8 = 56. Remember 5, 6, 7, 8: 56 = 7 × 8."),
    (n) =>
      typed("short_answer", n, "There are 9 rows of chairs with 6 chairs in each row. How many chairs are there?", "54", "9 × 6 = 54."),
    (n) =>
      multi(
        n,
        "Which of these make 24? Choose all that are right.",
        ["3 × 8", "4 × 6", "5 × 5", "2 × 12"],
        [0, 1, 3],
        "3 × 8, 4 × 6 and 2 × 12 all make 24. 5 × 5 is 25.",
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "63 ÷ 9 = ?", "7", "Think: 9 × what = 63? 9 × 7 = 63, so the answer is 7."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Tickets cost $8 each. How many dollars do 7 tickets cost?",
        ["56", "$56"],
        "7 × 8 = 56, so 7 tickets cost $56.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A baker puts 6 cupcakes in each box. How many boxes are needed for 45 cupcakes?",
        "8",
        "7 boxes hold 42 cupcakes, leaving 3 more. They need one more box, so 8 boxes.",
      ),
  ],
});

/** MA2-MR-02: missing values in multiplication and division. */
export const MISSING_TIMES = levels(3030201, {
  very_easy: [
    (n) => typed("fill_blank", n, "2 × ___ = 6", "3", "2 groups of 3 make 6."),
    (n) => typed("fill_blank", n, "___ × 5 = 10", "2", "Two 5s make 10."),
    (n) => trueFalse(n, "If 3 × 4 = 12, then 12 ÷ 4 = 3.", true, "Multiplying and dividing undo each other."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "___ × 10 = 40", "4", "4 tens make 40."),
    (n) => typed("fill_blank", n, "12 ÷ ___ = 6", "2", "12 shared into 2 equal groups gives 6 in each."),
    (n) => choice(n, "Which number makes 5 × ? = 25 true?", ["4", "5", "20", "6"], 1, "5 × 5 = 25."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "4 × ___ = 28", "7", "Count by fours to 28: 4, 8, 12, 16, 20, 24, 28. That is 7 fours."),
    (n) => typed("fill_blank", n, "___ ÷ 3 = 6", "18", "Undo the division: 6 × 3 = 18."),
    (n) =>
      choice(
        n,
        "Some boxes hold 8 pens each. There are 32 pens. Which number sentence finds the number of boxes?",
        ["? × 8 = 32", "32 × 8 = ?", "8 − ? = 32", "? + 8 = 32"],
        0,
        "Some number of boxes, times 8 pens in each, makes 32: ? × 8 = 32.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ × 9 = 72", "8", "8 × 9 = 72."),
    (n) => typed("fill_blank", n, "60 ÷ ___ = 10", "6", "6 × 10 = 60, so 60 ÷ 6 = 10."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A number multiplied by 6 is 54. What is the number?",
        "9",
        "? × 6 = 54. Since 9 × 6 = 54, the number is 9.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "3 × ___ = 2 × 12", "8", "2 × 12 = 24, so 3 × ? = 24, and 3 × 8 = 24."),
    (n) => typed("fill_blank", n, "___ ÷ 7 = 4 + 3", "49", "4 + 3 = 7, so ? ÷ 7 = 7. Undo it: 7 × 7 = 49."),
    (n) => trueFalse(n, "8 × 5 = 4 × 10", true, "Both make 40. Halving 8 and doubling 5 keeps the answer the same."),
  ],
});

/** MA2-PF-01: fractions, including on a number line. */
export const FRACTIONS = levels(3050101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "A cake is cut into 2 equal pieces. What is each piece called?",
        ["a half", "a quarter", "a third", "a whole"],
        0,
        "2 equal parts are halves.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 1 },
        trueFalse(
          n,
          "One quarter of this circle is shaded.",
          true,
          "The circle is cut into 4 equal parts and 1 is shaded, so one quarter is shaded.",
        ),
      ),
    (n) => choice(n, "How many quarters make a whole?", ["2", "3", "4", "8"], 2, "A whole cut into quarters has 4 equal parts."),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is half of 10?", "5", "10 shared into 2 equal groups is 5 in each."),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 3 },
        choice(
          n,
          "What fraction of the bar is shaded?",
          ["1/4", "3/4", "3/1", "4/3"],
          1,
          "The bar is cut into 4 equal parts and 3 are shaded, so 3/4 is shaded.",
        ),
      ),
    (n) => trueFalse(n, "1/2 is bigger than 1/4.", true, "Cutting a whole into 2 parts makes bigger parts than cutting it into 4."),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is one quarter of 12?", "3", "12 shared into 4 equal groups is 3 in each."),
    (n) => choice(n, "Which fraction is equal to 1/2?", ["2/4", "1/3", "3/4", "2/3"], 0, "2 quarters cover the same amount as 1 half."),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["1/8", "1/4", "1/2", "1"],
        "The more parts a whole is cut into, the smaller each part: 1/8, 1/4, 1/2, then 1 whole.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "What is three quarters of 20?", "15", "One quarter of 20 is 5, so three quarters is 3 × 5 = 15."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 4, dotAt: 3 },
        choice(
          n,
          "What fraction is the dot on?",
          ["1/4", "2/4", "3/4", "4/3"],
          2,
          "The line from 0 to 1 is split into 4 equal jumps, so each jump is 1/4. The dot is 3 jumps along: 3/4.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to one whole? Choose all that are right.",
        ["2/2", "4/4", "3/4", "5/5"],
        [0, 1, 3],
        "When the top and bottom numbers are the same, you have all the parts: one whole.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Tom ate 1/4 of a pizza and Kim ate 2/4 of it. What fraction of the pizza did they eat altogether?",
        ["3/4", "three quarters"],
        "1 quarter and 2 quarters make 3 quarters, or 3/4.",
      ),
    (n) =>
      trueFalse(n, "1/3 is bigger than 1/5.", true, "Thirds are bigger pieces than fifths, because the whole is shared into fewer parts."),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 16 apples. 3/8 of them are red. How many are red?",
        "6",
        "One eighth of 16 is 2, so three eighths is 3 × 2 = 6.",
      ),
  ],
});

/** MA2-GM-02: length in metres, centimetres and millimetres. */
export const LENGTH = levels(3040201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure a pencil?",
        ["centimetres", "kilometres", "litres", "kilograms"],
        0,
        "A pencil is short, so centimetres are a good unit.",
      ),
    (n) => trueFalse(n, "A metre is longer than a centimetre.", true, "1 metre is 100 centimetres."),
    (n) => choice(n, "Which is the longest?", ["1 cm", "1 m", "1 mm"], 1, "1 m is 100 cm, and 1 cm is 10 mm."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1 metre = ___ centimetres", "100", "There are 100 centimetres in a metre."),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the length of a classroom?",
        ["millimetres", "metres", "grams", "hours"],
        1,
        "A classroom is a few metres long.",
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
  ],
  medium: [
    (n) => typed("fill_blank", n, "1 centimetre = ___ millimetres", "10", "There are 10 millimetres in a centimetre."),
    (n) => typed("short_answer", n, "How many centimetres are there in 3 metres?", "300", "Each metre is 100 cm, so 3 metres is 300 cm."),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["8 mm", "5 cm", "60 cm", "2 m"],
        "8 mm is less than 1 cm, then 5 cm, then 60 cm, and 2 m is 200 cm.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 4, top: "6 cm", side: "4 cm" },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this rectangle in centimetres?",
          ["20", "20 cm"],
          "Add all four sides: 6 + 4 + 6 + 4 = 20 cm.",
        ),
      ),
    (n) => typed("fill_blank", n, "250 cm = 2 m and ___ cm", "50", "200 cm is 2 m, and 50 cm is left over."),
    (n) =>
      choice(
        n,
        "Which length is the same as 1.5 m?",
        ["15 cm", "150 cm", "105 cm", "1500 cm"],
        1,
        "1 m is 100 cm and half a metre is 50 cm, so 1.5 m is 150 cm.",
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "Jo ran 3 laps of a 200 m track. How many metres did Jo run?", "600", "3 × 200 = 600 m."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has a perimeter of 36 cm. How long is each side in centimetres?",
        "9",
        "A square has 4 equal sides, so 36 ÷ 4 = 9 cm.",
      ),
    (n) => typed("short_answer", n, "How many millimetres are there in 4 cm 7 mm?", "47", "4 cm is 40 mm, and 40 + 7 = 47 mm."),
  ],
});

/** MA2-NSM-02: analog and digital time. Questions 1–6 were written first and keep their numbers. */
export const TIME = [
  {
    ...typed("short_answer", 3040102, "How many minutes are there in 1 hour?", "60", "There are 60 minutes in 1 hour."),
    difficulty: "very_easy" as const,
  },
  {
    ...typed("fill_blank", 3040106, "There are ___ days in a week.", ["7", "seven"], "A week has 7 days, Monday to Sunday."),
    difficulty: "very_easy" as const,
  },
  {
    ...trueFalse(3040107, "There are 24 hours in a day.", true, "A day, from midnight to midnight, is 24 hours."),
    difficulty: "very_easy" as const,
  },
  {
    ...pic(
      { kind: "clock", hour: 3, minute: 30 },
      choice(
        3040101,
        "What time does the clock show?",
        ["6:30", "3:30", "4:30", "3:06"],
        1,
        "When the minute hand points to the 6, it's half past. The hour hand has passed the 3, so it's half past 3, or 3:30.",
      ),
    ),
    difficulty: "easy" as const,
  },
  {
    ...pic(
      { kind: "clock", hour: 7, minute: 15 },
      trueFalse(
        3040104,
        "This clock shows quarter past 7.",
        true,
        "The minute hand points to the 3, which is 15 minutes past. The hour hand is just past the 7, so it's quarter past 7, or 7:15.",
      ),
    ),
    difficulty: "easy" as const,
  },
  {
    ...pic(
      { kind: "clock", hour: 3, minute: 45 },
      choice(
        3040108,
        "What time does the clock show?",
        ["3:45", "4:15", "4:45", "9:20"],
        0,
        "The minute hand points to the 9, which is 45 minutes past, or quarter to the next hour. The hour hand is nearly at 4, so it's 3:45.",
      ),
    ),
    difficulty: "easy" as const,
  },
  {
    ...typed(
      "short_answer",
      3040103,
      "How many minutes are there from 2:15 to 2:45?",
      "30",
      "From 15 minutes past to 45 minutes past is 45 − 15 = 30 minutes.",
    ),
    difficulty: "medium" as const,
  },
  {
    ...ordering(
      3040105,
      "Put these morning times in order, from earliest to latest.",
      ["7:05", "7:50", "8:30", "9:45"],
      "Compare the hours first, then the minutes: 7:05, 7:50, 8:30, 9:45.",
    ),
    difficulty: "medium" as const,
  },
  {
    ...typed(
      "short_answer",
      3040109,
      "How many minutes are there in 2 hours?",
      "120",
      "Each hour is 60 minutes, so 2 hours is 120 minutes.",
    ),
    difficulty: "medium" as const,
  },
  {
    ...typed(
      "short_answer",
      3040110,
      "A movie starts at 4:20 pm and lasts 1 hour 30 minutes. What time does it end?",
      ["5:50", "5:50 pm", "5:50pm"],
      "1 hour after 4:20 is 5:20, and 30 minutes more is 5:50 pm.",
    ),
    difficulty: "hard" as const,
  },
  {
    ...choice(
      3040111,
      "What is 3:00 pm in 24-hour time?",
      ["03:00", "13:00", "15:00", "12:00"],
      2,
      "Add 12 to afternoon hours: 3 + 12 = 15, so 15:00.",
    ),
    difficulty: "hard" as const,
  },
  {
    ...typed(
      "short_answer",
      3040112,
      "How many seconds are there in 2 minutes?",
      "120",
      "Each minute is 60 seconds, so 2 minutes is 120 seconds.",
    ),
    difficulty: "hard" as const,
  },
  {
    ...typed(
      "short_answer",
      3040113,
      "A bus leaves at 10:45 am and arrives at 1:15 pm. How many minutes long is the trip?",
      ["150", "150 minutes"],
      "10:45 to 12:45 is 2 hours (120 minutes), and 12:45 to 1:15 is 30 minutes. 120 + 30 = 150 minutes.",
    ),
    difficulty: "very_hard" as const,
  },
  {
    ...choice(
      3040114,
      "What is 19:30 in 12-hour time?",
      ["7:30 am", "7:30 pm", "9:30 pm", "1:30 pm"],
      1,
      "19 − 12 = 7, and hours after 12 are pm, so 7:30 pm.",
    ),
    difficulty: "very_hard" as const,
  },
  {
    ...typed(
      "short_answer",
      3040115,
      "School finishes at 3:10 pm. It takes Ali 25 minutes to walk home. What time does Ali get home?",
      ["3:35", "3:35 pm", "3:35pm"],
      "3:10 plus 25 minutes is 3:35 pm.",
    ),
    difficulty: "very_hard" as const,
  },
];

/** MA2-DATA-02: interpreting tables, dot plots and column graphs. */
export const DATA = levels(3060101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "apple", value: 5 },
            { label: "banana", value: 3 },
            { label: "orange", value: 7 },
          ],
        },
        choice(
          n,
          "Look at the graph. Which fruit got the most votes?",
          ["apple", "banana", "orange"],
          2,
          "Orange got 7 votes, more than 5 or 3.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "apple", value: 5 },
            { label: "banana", value: 3 },
            { label: "orange", value: 7 },
          ],
        },
        typed("short_answer", n, "Look at the graph. How many votes did banana get?", "3", "Read the banana row: 3 votes."),
      ),
    (n) => trueFalse(n, "In a column graph, a taller column shows a bigger number.", true, "The height of each column shows how many."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "apple", value: 5 },
            { label: "banana", value: 3 },
            { label: "orange", value: 7 },
          ],
        },
        typed("short_answer", n, "Look at the graph. How many votes were there altogether?", "15", "5 + 3 + 7 = 15."),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "apple", value: 5 },
            { label: "banana", value: 3 },
            { label: "orange", value: 7 },
          ],
        },
        choice(
          n,
          "Look at the graph. Which fruit got the fewest votes?",
          ["apple", "banana", "orange"],
          1,
          "Banana got 3 votes, the smallest number.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "apple", value: 5 },
            { label: "banana", value: 3 },
            { label: "orange", value: 7 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more votes did orange get than apple?",
          "2",
          "Orange got 7 and apple got 5, so 7 − 5 = 2 more votes.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Pet", "Number"],
          rows: [
            ["dogs", 8],
            ["cats", 6],
            ["fish", 4],
            ["birds", 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "The table shows pets owned by a class. How many more dogs than birds are there?",
          "6",
          "There are 8 dogs and 2 birds, so 8 − 2 = 6 more dogs.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Pet", "Number"],
          rows: [
            ["dogs", 8],
            ["cats", 6],
            ["fish", 4],
            ["birds", 2],
          ],
        },
        choice(
          n,
          "The table shows pets owned by a class. Which pairs of pets add up to 10?",
          ["dogs and birds", "cats and fish", "both of these", "neither of these"],
          2,
          "Dogs and birds: 8 + 2 = 10. Cats and fish: 6 + 4 = 10. Both pairs make 10.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Pet", "Number"],
          rows: [
            ["dogs", 8],
            ["cats", 6],
            ["fish", 4],
            ["birds", 2],
          ],
        },
        trueFalse(
          n,
          "The table shows pets owned by a class. Cats and fish together are more than dogs.",
          true,
          "6 + 4 = 10, and 10 is more than 8.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Test scores",
          columns: [
            { label: "5", count: 3 },
            { label: "6", count: 6 },
            { label: "7", count: 2 },
            { label: "8", count: 0 },
          ],
        },
        choice(
          n,
          "The dot plot shows test scores. Each dot is one student. Which score was most common?",
          ["5", "6", "7", "8"],
          1,
          "The score with the most dots is 6, with 6 dots.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Test scores",
          columns: [
            { label: "5", count: 3 },
            { label: "6", count: 6 },
            { label: "7", count: 2 },
            { label: "8", count: 0 },
          ],
        },
        typed(
          "short_answer",
          n,
          "The dot plot shows test scores. Each dot is one student. How many students are shown?",
          "11",
          "Count all the dots: 3 + 6 + 2 = 11.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a column graph, each square stands for 2 children. The 'walk to school' column is 5 squares tall. How many children walk to school?",
        "10",
        "5 squares × 2 children = 10 children.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Books read",
          thing: "books",
          each: 5,
          rows: [
            { label: "Mia", count: 4 },
            { label: "Jay", count: 7 },
            { label: "Ava", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "The picture graph shows books read. How many more books did Jay read than Mia?",
          "15",
          "Jay has 3 more pictures than Mia, and 3 × 5 = 15 books.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A survey asked 30 students. 12 chose soccer, 9 chose netball and the rest chose cricket. How many chose cricket?",
        ["9", "21", "8", "12"],
        0,
        "12 + 9 = 21 chose soccer or netball, so 30 − 21 = 9 chose cricket.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Rainy days",
          columns: [
            { label: "Mon", value: 4 },
            { label: "Tue", value: 7 },
            { label: "Wed", value: 7 },
            { label: "Thu", value: 2 },
          ],
        },
        multi(
          n,
          "The graph shows rainy days. Which of these are true? Choose all that are right.",
          ["Tuesday and Wednesday are the same", "Monday is the lowest", "The total is 20", "Thursday is the lowest"],
          [0, 2, 3],
          "Tuesday and Wednesday are both 7, Thursday (2) is the lowest, and 4 + 7 + 7 + 2 = 20.",
        ),
      ),
  ],
});

/** MA2-CHAN-01: chance experiments. */
export const CHANCE = levels(3060201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "How likely is it that the sun will rise tomorrow?",
        ["certain", "impossible", "unlikely"],
        0,
        "The sun rises every day, so it is certain.",
      ),
    (n) =>
      choice(
        n,
        "How likely is it that a cat will drive a bus to school?",
        ["certain", "likely", "impossible"],
        2,
        "Cats can't drive, so it is impossible.",
      ),
    (n) =>
      trueFalse(n, "When you flip a coin, heads and tails are equally likely.", true, "A coin has two sides and each has the same chance."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 9 },
            { colour: "blue", count: 1 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. Which colour are you more likely to get?",
          ["red", "blue", "they are equally likely"],
          0,
          "There are many more red counters than blue.",
        ),
      ),
    (n) =>
      choice(
        n,
        "On a normal dice numbered 1 to 6, how likely is rolling a 7?",
        ["certain", "likely", "impossible", "unlikely"],
        2,
        "There is no 7 on the dice, so it is impossible.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many different numbers can you roll on a normal six-sided dice?",
        "6",
        "The faces show 1, 2, 3, 4, 5 and 6.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "yellow", "green", "green"] },
        choice(
          n,
          "On this spinner, landing on yellow is…",
          ["likely", "unlikely", "certain", "impossible"],
          1,
          "Only 1 part out of 4 is yellow, so it could happen but probably won't.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 1 },
            { colour: "blue", count: 3 },
            { colour: "green", count: 6 },
          ],
        },
        ordering(
          n,
          "You pick one counter from this bag without looking. Put the colours in order from least likely to most likely.",
          ["red", "blue", "green"],
          "Fewer marbles means less likely: red (1), blue (3), green (6).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a normal dice, rolling an even number is as likely as rolling an odd number.",
        true,
        "There are 3 even numbers (2, 4, 6) and 3 odd numbers (1, 3, 5).",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which of these is unlikely but possible when you roll a normal dice?",
        ["Rolling a 6", "Rolling a number less than 7", "Rolling a 0", "Rolling a number from 1 to 5"],
        0,
        "A 6 is only 1 of the 6 faces, so it is unlikely but possible. Less than 7 is certain, 0 is impossible, and 1 to 5 is likely.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 5 },
            { colour: "yellow", count: 5 },
          ],
        },
        multi(
          n,
          "You pick one counter from this bag. Which of these are true? Choose all that are right.",
          [
            "Red and yellow are equally likely",
            "Picking green is impossible",
            "Picking red is certain",
            "Picking red or yellow is certain",
          ],
          [0, 1, 3],
          "There are equal numbers of red and yellow, no green, and every counter is red or yellow. Red alone is not certain.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Lily flipped a coin 20 times and got 11 heads. How many tails did she get?",
        "9",
        "Every flip is heads or tails, so 20 − 11 = 9 tails.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A spinner landed on blue 18 times out of 20 spins. What is the best guess about the spinner?",
        ["Most of it is blue", "None of it is blue", "Exactly half is blue", "Landing on blue is impossible"],
        0,
        "Landing on blue 18 times out of 20 suggests most of the spinner is blue.",
      ),
    (n) =>
      choice(
        n,
        "Which bag gives you the best chance of picking a red counter?",
        ["2 red, 8 blue", "5 red, 5 blue", "7 red, 3 blue", "1 red, 1 blue"],
        2,
        "7 red out of 10 counters is the biggest share of red.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you flip a coin and get heads 3 times in a row, tails is more likely next time.",
        false,
        "The coin doesn't remember. Each flip is still equally likely to be heads or tails.",
      ),
  ],
});

/** MA2-NSM-01: mass in kilograms and grams. */
export const MASS = levels(3040301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the mass of a watermelon?",
        ["kilograms", "litres", "metres", "hours"],
        0,
        "Mass is how heavy something is. A watermelon is heavy, so kilograms are a good unit.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 10, value: 3, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "A bag of potatoes is on the scale. How many kilograms does it weigh?",
          ["3", "3 kg", "3 kilograms"],
          "The pointer is on the 3, so the potatoes weigh 3 kg.",
        ),
      ),
    (n) => trueFalse(n, "1 kilogram is heavier than 1 gram.", true, "1 kilogram is the same as 1000 grams, so it is much heavier."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1 kilogram = ___ grams", "1000", "There are 1000 grams in 1 kilogram."),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 400, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "Some flour is on the scale. How many grams of flour are there?",
          ["400", "400 g", "400 grams"],
          "The pointer is on the 400 mark, so there are 400 g of flour.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these weigh less than 1 kilogram? Choose all that are right.",
        ["a pencil", "an apple", "a car", "a school desk"],
        [0, 1],
        "A pencil and an apple are light, just a few grams. A car and a desk are much heavier than 1 kg.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 750, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "Look at the scale. How many grams does it show?",
          ["750", "750 g", "750 grams"],
          "The pointer is on the small mark halfway between 700 and 800. Halfway is 750 g.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from lightest to heaviest.",
        ["300 g", "900 g", "1 kg 200 g", "2 kg"],
        "1 kg 200 g is 1200 g and 2 kg is 2000 g, so the order is 300 g, 900 g, 1 kg 200 g, 2 kg.",
      ),
    (n) =>
      choice(
        n,
        "A bag of rice has a mass of 2 kg. How many grams is that?",
        ["2 g", "20 g", "200 g", "2000 g"],
        3,
        "Each kilogram is 1000 g, so 2 kg is 2000 g.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 2.5, step: 1, unit: "kg" },
        choice(
          n,
          "A pumpkin is on the scale. What is its mass?",
          ["2 kg", "2 kg 500 g", "3 kg", "25 kg"],
          1,
          "The pointer is halfway between 2 kg and 3 kg. Half a kilogram is 500 g, so the pumpkin is 2 kg 500 g.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rockmelon has a mass of 1 kg 300 g. How many grams is that?",
        ["1300", "1300 g", "1300 grams"],
        "1 kg is 1000 g, and 1000 + 300 = 1300 g.",
      ),
    (n) =>
      trueFalse(
        n,
        "A big box is always heavier than a small box.",
        false,
        "Size does not tell you mass. A big box of feathers can be lighter than a small box of rocks.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia's backpack has a mass of 3 kg. She takes out her 600 g lunchbox. What is the mass of the backpack now, in grams?",
        ["2400", "2400 g", "2 kg 400 g"],
        "3 kg is 3000 g. 3000 − 600 = 2400 g.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 650, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "Some apples are on the scale. How many more grams of apples are needed to make 1 kg?",
          ["350", "350 g", "350 grams"],
          "The pointer is halfway between 600 and 700, so it shows 650 g. 1 kg is 1000 g, and 1000 − 650 = 350 g.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Each bag of sugar has a mass of 250 g. What is the mass of 4 bags?",
        ["1 kg", "750 g", "2 kg", "10 kg"],
        0,
        "4 × 250 g = 1000 g, and 1000 g is 1 kg.",
      ),
  ],
});

/** MA2-3DS-02: capacity in litres and millilitres, and volume in cubic centimetres. */
export const CAPACITY = levels(3040401, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure how much water a bucket holds?",
        ["litres", "kilograms", "centimetres", "minutes"],
        0,
        "How much a container holds is its capacity. A bucket holds a few litres.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 5, value: 2, step: 1, unit: "L" },
        typed(
          "short_answer",
          n,
          "Look at the jug. How many litres of water are in it?",
          ["2", "2 L", "2 litres"],
          "The water comes up to the 2 L mark, so there are 2 litres.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A teaspoon holds more water than a bathtub.",
        false,
        "A bathtub holds a lot of water. A teaspoon holds only a few millilitres.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1 litre = ___ millilitres", "1000", "There are 1000 millilitres in 1 litre."),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 300, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "Look at the jug. How many millilitres of water are in it?",
          ["300", "300 mL", "300 millilitres"],
          "The water comes up to the 300 mL mark.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these hold less than 1 litre? Choose all that are right.",
        ["a cup", "a teaspoon", "a bathtub", "a swimming pool"],
        [0, 1],
        "A cup and a teaspoon hold only millilitres. A bathtub and a pool hold many litres.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 600, step: 200, unit: "mL" },
        typed(
          "short_answer",
          n,
          "This jug is marked in steps of 200 mL. How much water is in it?",
          ["600", "600 mL", "600 millilitres"],
          "The marks go 200, 400, 600, 800, 1000. The water is at the third mark, 600 mL.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest capacity to largest.",
        ["a teaspoon", "a cup", "a bucket", "a bathtub"],
        "A teaspoon holds a few millilitres, a cup about 250 mL, a bucket about 10 litres and a bathtub much more.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. What is its volume in cubic centimetres?",
          ["6", "6 cubic centimetres", "6 cm³"],
          "There are 2 rows of 3 cubes, so 6 cubes. Each cube is 1 cubic centimetre, so the volume is 6 cubic centimetres.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 750, step: 250, unit: "mL" },
        typed(
          "short_answer",
          n,
          "How many more millilitres of water are needed to fill this jug to 1000 mL?",
          ["250", "250 mL", "250 millilitres"],
          "The water is at 750 mL. 1000 − 750 = 250 mL more.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "This model is built from 1 cm cubes. What is its volume in cubic centimetres?",
          ["12", "12 cubic centimetres", "12 cm³"],
          "Each layer has 2 rows of 3, which is 6 cubes. There are 2 layers, so 6 + 6 = 12 cubic centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the same as 2 litres?",
        ["2 mL", "20 mL", "200 mL", "2000 mL"],
        3,
        "Each litre is 1000 mL, so 2 litres is 2000 mL.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 1 litre bottle of juice is shared equally into 4 cups. How many millilitres go in each cup?",
        ["250", "250 mL", "250 millilitres"],
        "1 litre is 1000 mL, and 1000 ÷ 4 = 250 mL.",
      ),
    (n) =>
      trueFalse(
        n,
        "Two models made from the same number of 1 cm cubes have the same volume, even if they are different shapes.",
        true,
        "Volume is how much space something takes up. The same number of cubes takes up the same space, whatever the shape.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sam has a 2 litre bottle of water. He pours 3 glasses of 200 mL each. How many millilitres are left in the bottle?",
        ["1400", "1400 mL", "1 L 400 mL"],
        "2 litres is 2000 mL. 3 glasses is 3 × 200 = 600 mL. 2000 − 600 = 1400 mL.",
      ),
  ],
});

/** MA2-2DS-03: area in square centimetres and square metres. */
export const AREA = levels(3040501, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 4,
          rows: 3,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
        },
        typed("short_answer", n, "How many squares are shaded?", "6", "There are 2 rows of 3 shaded squares. 3 + 3 = 6."),
      ),
    (n) =>
      choice(
        n,
        "What does area measure?",
        ["the space a flat surface covers", "how heavy something is", "how long a line is", "how much a jug holds"],
        0,
        "Area is the amount of flat space a shape covers, like the floor of a room.",
      ),
    (n) =>
      trueFalse(
        n,
        "A square metre is bigger than a square centimetre.",
        true,
        "A square metre is a square 1 m on each side. A square centimetre is only 1 cm on each side.",
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
            [4, 2],
            [0, 2],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the rectangle?",
          ["8", "8 square centimetres", "8 cm²"],
          "There are 2 rows of 4 squares. 4 + 4 = 8 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a netball court?",
        ["square metres", "square centimetres", "litres", "kilograms"],
        0,
        "A netball court is big, so square metres are the right unit for its area.",
      ),
    (n) =>
      multi(
        n,
        "Which of these would you measure in square centimetres? Choose all that are right.",
        ["a postage stamp", "a page of a book", "a school oval", "a car park"],
        [0, 1],
        "A stamp and a page are small, so square centimetres work. An oval and a car park are big, so use square metres.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 4,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [0, 1],
            [0, 2],
            [0, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the shaded shape?",
          ["7", "7 square centimetres", "7 cm²"],
          "Count the shaded squares: 4 along the bottom and 3 more going up. 4 + 3 = 7 square centimetres.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [5, 2],
            [2, 2],
            [2, 4],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of this shape?",
          ["14", "14 square centimetres", "14 cm²"],
          "Split it into two rectangles: the bottom is 2 rows of 5, which is 10, and the top part is 2 rows of 2, which is 4. 10 + 4 = 14.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest area to largest.",
        ["a postage stamp", "the cover of an exercise book", "a classroom floor", "a cricket oval"],
        "A stamp is tiny, a book cover is bigger, a classroom floor is bigger again, and a cricket oval is huge.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [5, 3],
            [0, 3],
          ],
          sideLabels: ["5 m", "3 m"],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "This is a garden bed. Each small square is 1 square metre. What is its area?",
          ["15", "15 square metres", "15 m²"],
          "There are 3 rows of 5 squares. 3 × 5 = 15 square metres.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A rectangle 4 cm long and 3 cm wide has the same area as a rectangle 6 cm long and 2 cm wide.",
        true,
        "The first is 3 rows of 4, which is 12 square centimetres. The second is 2 rows of 6, which is also 12.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [0, 4],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. What is the area of the triangle?",
          ["8 square centimetres", "16 square centimetres", "4 square centimetres", "10 square centimetres"],
          0,
          "The triangle is half of a 4 by 4 square. The square has 16 small squares, and half of 16 is 8.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 12 square centimetres? Choose all that are right.",
        ["3 cm by 4 cm", "2 cm by 6 cm", "1 cm by 12 cm", "4 cm by 2 cm"],
        [0, 1, 2],
        "3 rows of 4, 2 rows of 6 and 1 row of 12 all make 12 squares. 4 cm by 2 cm is only 8 squares (its distance around is 12 cm, not its area).",
      ),
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
            [5, 0],
            [0, 1],
            [1, 1],
          ],
        },
        typed(
          "short_answer",
          n,
          "Leo is tiling a floor with square tiles. The shaded squares are the tiles he has laid. How many more tiles does he need to cover the whole floor?",
          "16",
          "The floor is 4 rows of 6, which is 24 squares. He has laid 8. 24 − 8 = 16 more tiles.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A square mat is 2 m long and 2 m wide. Ella says its area is 8 square metres. What is the correct area?",
        ["4 square metres", "8 square metres", "2 square metres", "6 square metres"],
        0,
        "The mat is 2 rows of 2 square metres, which is 4 square metres. Ella added all four sides, which gives the distance around, not the area.",
      ),
  ],
});

/** MA2-DATA-01: collecting data and drawing graphs with a given scale. */
export const DATA_COLLECT = levels(3060301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Ms Lee wants to find out her class's favourite fruit. What is the best way to collect the data?",
        ["Ask each student and make a tally mark for each answer", "Guess", "Ask only one friend", "Look out the window"],
        0,
        "Asking everyone and keeping a tally gives a true count for the whole class.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a tally, a bundle of four marks with a line across them stands for 5.",
        true,
        "Tally marks are bundled in fives: four marks and a fifth line across them.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite sport",
          columns: [
            { label: "Cricket", value: 6 },
            { label: "Netball", value: 8 },
            { label: "Soccer", value: 4 },
            { label: "Swimming", value: 2 },
          ],
          step: 2,
        },
        choice(
          n,
          "Look at the graph. Which sport got the most votes?",
          ["Cricket", "Netball", "Soccer", "Swimming"],
          1,
          "The netball column is the tallest, so netball got the most votes.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Pet", "Votes"],
          rows: [
            ["Dog", 7],
            ["Cat", 4],
            ["Fish", 2],
          ],
        },
        typed("short_answer", n, "Look at the table. How many students voted altogether?", "13", "Add the votes: 7 + 4 + 2 = 13."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A tally has 3 bundles of five and 2 more marks. What number does it show?",
        "17",
        "3 bundles of five is 15, and 15 + 2 = 17.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps of a data investigation in order.",
        ["Ask a question", "Collect the data", "Organise it in a table", "Draw a graph"],
        "First decide what you want to know, then collect the answers, sort them into a table, and show them in a graph.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit",
          columns: [
            { label: "Apple", value: 5 },
            { label: "Banana", value: 9 },
            { label: "Mango", value: 7 },
            { label: "Orange", value: 3 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "The scale on this graph goes up in 2s. How many students chose banana?",
          "9",
          "The banana column stops halfway between 8 and 10. Halfway between 8 and 10 is 9.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Votes"],
          rows: [
            ["Red", 4],
            ["Blue", 8],
            ["Green", 6],
          ],
        },
        typed(
          "short_answer",
          n,
          "Zoe is drawing a column graph of this table. Each line on her scale is worth 2 votes. How many lines up should the blue column reach?",
          "4",
          "Blue has 8 votes. Each line is 2 votes, and 8 ÷ 2 = 4 lines.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Number of pets",
          columns: [
            { label: "0", count: 3 },
            { label: "1", count: 5 },
            { label: "2", count: 4 },
            { label: "3", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Each dot is one student. How many students have 1 pet?",
          "5",
          "There are 5 dots above the 1, so 5 students have 1 pet.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Number of pets",
          columns: [
            { label: "0", count: 3 },
            { label: "1", count: 5 },
            { label: "2", count: 4 },
            { label: "3", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Each dot is one student. How many students were asked altogether?",
          "13",
          "Count every dot: 3 + 5 + 4 + 1 = 13 students.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Books read this week",
          thing: "books",
          each: 2,
          rows: [
            { label: "Ava", count: 3 },
            { label: "Ben", count: 5 },
            { label: "Kai", count: 4 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many books did Ben read?",
          "10",
          "Ben has 5 stars and each star is 2 books. 5 × 2 = 10 books.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a column graph with a scale going up in 10s, a column that stops halfway between 20 and 30 shows 25.",
        true,
        "Halfway between 20 and 30 is 25.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cars passing the school",
          columns: [
            { label: "Mon", value: 15 },
            { label: "Tue", value: 25 },
            { label: "Wed", value: 10 },
            { label: "Thu", value: 20 },
          ],
          step: 5,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more cars passed on Tuesday than on Wednesday?",
          "15",
          "Tuesday shows 25 and Wednesday shows 10. 25 − 10 = 15 more cars.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In a picture graph, each star stands for 2 books. Kai read 7 books. How should Kai's row look?",
        ["3 and a half stars", "7 stars", "2 stars", "14 stars"],
        0,
        "3 stars is 6 books, and half a star is 1 more book. So 7 books is 3 and a half stars.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Travel to school", "Students"],
          rows: [
            ["Walk", 9],
            ["Car", 12],
            ["Bus", 7],
            ["Bike", 3],
          ],
        },
        multi(
          n,
          "Mrs Patel will draw a column graph of this table with a scale going up in 3s. Which columns will end exactly on a line? Choose all that are right.",
          ["Walk", "Car", "Bus", "Bike"],
          [0, 1, 3],
          "The lines are at 3, 6, 9, 12 and so on. 9, 12 and 3 are on lines, but 7 is between 6 and 9.",
        ),
      ),
  ],
});

/** MA2-2DS-01: comparing two-dimensional shapes and describing their features. */
export const SHAPES_2D = levels(3070101, {
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
        },
        typed("short_answer", n, "How many sides does this shape have?", "3", "Count the straight sides: 1, 2, 3. It is a triangle."),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [6, 0],
            [8, 3],
            [6, 6],
            [2, 6],
            [0, 3],
          ],
        },
        choice(n, "What is this shape called?", ["hexagon", "pentagon", "octagon", "square"], 0, "It has 6 sides, so it is a hexagon."),
      ),
    (n) => trueFalse(n, "A square has 4 equal sides.", true, "All 4 sides of a square are the same length."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [6, 0],
            [7, 4],
            [4, 7],
            [1, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many corners (vertices) does this shape have?",
          "5",
          "Count the corners where two sides meet: there are 5. It is a pentagon.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have 4 sides? Choose all that are right.",
        ["square", "rectangle", "rhombus", "triangle", "pentagon"],
        [0, 1, 2],
        "Squares, rectangles and rhombuses all have 4 sides. A triangle has 3 and a pentagon has 5.",
      ),
    (n) =>
      choice(
        n,
        "Which shape has 8 sides?",
        ["octagon", "hexagon", "pentagon", "rectangle"],
        0,
        "Octo means 8, like an octopus with 8 arms. An octagon has 8 sides.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [5, 4],
            [1, 5],
          ],
        },
        choice(
          n,
          "This shape has 4 straight sides. What is the name for any shape with 4 straight sides?",
          ["quadrilateral", "pentagon", "triangle", "hexagon"],
          0,
          "Any flat shape with 4 straight sides is a quadrilateral. Quad means 4.",
        ),
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
        trueFalse(
          n,
          "This rectangle has 4 right angles.",
          true,
          "Every corner of a rectangle is a square corner, so it has 4 right angles.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest sides to most sides.",
        ["triangle", "rectangle", "pentagon", "hexagon", "octagon"],
        "A triangle has 3 sides, a rectangle 4, a pentagon 5, a hexagon 6 and an octagon 8.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [8, 4],
            [3, 4],
          ],
        },
        choice(
          n,
          "This shape has 4 equal sides but no right angles. What is it?",
          ["rhombus", "square", "rectangle", "triangle"],
          0,
          "A shape with 4 equal sides is a rhombus. It is not a square because its corners are not right angles.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are true for both a square and a rectangle? Choose all that are right.",
        ["They have 4 sides", "They have 4 right angles", "Their opposite sides are equal", "All their sides are equal"],
        [0, 1, 2],
        "Both have 4 sides, 4 right angles and equal opposite sides. Only a square must have all 4 sides equal.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 3],
            [3, 3],
            [3, 6],
            [0, 6],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many sides does this shape have?",
          "6",
          "Count each straight side: 6. So it is a hexagon, even though it doesn't look like a honeycomb.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "I am a flat shape with more than 4 corners but fewer than 6 sides. What am I?",
        ["pentagon", "hexagon", "square", "triangle"],
        0,
        "More than 4 corners and fewer than 6 sides means exactly 5, so it is a pentagon.",
      ),
    (n) =>
      trueFalse(
        n,
        "A square is a special kind of rectangle.",
        true,
        "A rectangle has 4 sides and 4 right angles. A square has those too, and its sides are all equal as well.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Lucy draws 2 triangles and 3 squares. How many sides do her shapes have altogether?",
        "18",
        "2 triangles have 2 × 3 = 6 sides. 3 squares have 3 × 4 = 12 sides. 6 + 12 = 18.",
      ),
  ],
});

/** MA2-2DS-02: combining and splitting shapes, flips, slides, turns and symmetry. */
export const TRANSFORM = levels(3070201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Moving a shape in a straight line without turning or flipping it is called a…",
        ["slide", "flip", "turn", "split"],
        0,
        "A slide moves a shape along without turning it over or around.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 3],
            [0, 3],
          ],
        },
        trueFalse(
          n,
          "You can fold this rectangle in half so that both halves match exactly.",
          true,
          "Fold it down the middle, from top to bottom, and the two halves sit exactly on top of each other.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You cut a square in half from one corner to the opposite corner. What two shapes do you get?",
        ["2 triangles", "2 squares", "2 circles", "2 pentagons"],
        0,
        "A cut from corner to corner makes two shapes with 3 sides each: 2 triangles.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "A flip makes a shape look like it does in a…",
        ["mirror", "clock", "ruler", "jug"],
        0,
        "A flip turns a shape over, like its reflection in a mirror.",
      ),
    (n) =>
      multi(
        n,
        "Which of these capital letters have a line of symmetry? Choose all that are right.",
        ["A", "M", "T", "F", "G"],
        [0, 1, 2],
        "A, M and T can be folded down the middle so both halves match. F and G cannot.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 2, rows: 2 },
        typed(
          "short_answer",
          n,
          "How many small squares join together to make this big square?",
          "4",
          "There are 2 rows of 2 small squares, which is 4.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [3, 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this triangle have?",
          "1",
          "Only a fold straight down from the top corner makes the halves match, so it has 1 line of symmetry.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these turns in order from smallest to largest.",
        ["quarter turn", "half turn", "three-quarter turn", "full turn"],
        "A quarter turn is 1 quarter, a half turn is 2 quarters, a three-quarter turn is 3 quarters and a full turn is 4 quarters.",
      ),
    (n) => trueFalse(n, "When you slide a shape, it gets bigger.", false, "A slide only moves a shape. Its size and shape stay the same."),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [4, 4],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this square have?",
          "4",
          "A square folds in half across the middle, down the middle, and along both diagonals: 4 lines.",
        ),
      ),
    (n) =>
      choice(
        n,
        "An arrow points up. You give it a half turn. Which way does it point now?",
        ["down", "up", "left", "right"],
        0,
        "A half turn spins it around to face the opposite way, so up becomes down.",
      ),
    (n) =>
      choice(
        n,
        "Which two shapes can be joined together to make a rectangle?",
        ["two matching right-angled triangles", "two circles", "a triangle and a circle", "two pentagons"],
        0,
        "Put two matching right-angled triangles together along their longest sides and they make a rectangle.",
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
            [0, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this rectangle have?",
          "2",
          "It folds in half across the middle and down the middle. Folding along a diagonal doesn't match, so it has 2 lines.",
        ),
      ),
    (n) =>
      choice(
        n,
        "An arrow points right. Ava turns it a quarter turn clockwise, then another quarter turn clockwise. Which way does it point now?",
        ["left", "down", "up", "right"],
        0,
        "Two quarter turns make a half turn. Right → down → left.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack cuts a rectangle into 2 equal triangles, then cuts each triangle in half again. How many triangles does he have now?",
        "4",
        "He starts with 2 triangles. Cutting each into 2 gives 2 × 2 = 4 triangles.",
      ),
  ],
});

/** MA2-3DS-01: three-dimensional objects, including prisms, pyramids and their nets. */
export const OBJECTS_3D = levels(3070301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        choice(
          n,
          "What is this object called?",
          ["cube", "square", "sphere", "cone"],
          0,
          "It has 6 square faces, so it is a cube. A square is flat.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        trueFalse(n, "This object has no flat faces.", true, "A sphere, like a ball, is curved all over and has no flat faces."),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        choice(
          n,
          "What is this object called?",
          ["cylinder", "cone", "circle", "cube"],
          0,
          "It has two flat circle ends and a curved side, like a tin of food. It is a cylinder.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        typed(
          "short_answer",
          n,
          "How many faces does a cube have?",
          "6",
          "A cube has 6 square faces: top, bottom, front, back and two sides.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these objects can roll? Choose all that are right.",
        ["sphere", "cylinder", "cone", "cube", "square pyramid"],
        [0, 1, 2],
        "Objects with a curved surface can roll: the sphere, cylinder and cone. A cube and a pyramid have only flat faces.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        choice(
          n,
          "This is a square pyramid. What shape is its base?",
          ["square", "triangle", "circle", "pentagon"],
          0,
          "A pyramid is named after its base, so a square pyramid has a square base.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many faces does a triangular prism have?",
          "5",
          "It has 2 triangle faces at the ends and 3 rectangle faces joining them. 2 + 3 = 5.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is a net?",
        ["a flat shape that folds up to make a 3D object", "a 3D object with curved faces", "a kind of angle", "a shape with no corners"],
        0,
        "A net is a flat pattern. When you fold it up, it makes a 3D object.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many vertices (corners) does a square pyramid have?",
          "5",
          "There are 4 corners around the square base and 1 at the top. 4 + 1 = 5.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many edges does a rectangular prism have?",
          "12",
          "There are 4 edges around the top, 4 around the bottom and 4 going up the sides. 4 + 4 + 4 = 12.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net has 1 square and 4 triangles. What object does it fold into?",
        ["square pyramid", "cube", "triangular prism", "cylinder"],
        0,
        "The square is the base and the 4 triangles fold up to meet at a point. That makes a square pyramid.",
      ),
    (n) =>
      trueFalse(
        n,
        "A cube and a rectangular prism both have 8 vertices.",
        true,
        "Both have 4 corners on the top and 4 on the bottom, so 8 vertices each.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 0],
            [2, 0],
            [2, 2],
            [3, 2],
            [3, 3],
            [2, 3],
            [2, 4],
            [1, 4],
            [1, 3],
            [0, 3],
            [0, 2],
            [1, 2],
          ],
          grid: true,
        },
        choice(
          n,
          "This net is made of squares. What 3D object will it fold into?",
          ["cube", "square pyramid", "triangular prism", "cylinder"],
          0,
          "The net has 6 squares. Folded up, the squares make the 6 faces of a cube.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are prisms? Choose all that are right.",
        ["cube", "rectangular prism", "triangular prism", "square pyramid", "cone"],
        [0, 1, 2],
        "A prism has the same shape at both ends joined by rectangles. A cube is a prism with square ends. Pyramids and cones come to a point.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Noah builds a skeleton model of a triangular prism using straws for the edges. How many straws does he need?",
        "9",
        "Each triangle end has 3 edges, so 3 + 3 = 6, and 3 more edges join the two ends. 6 + 3 = 9 straws.",
      ),
  ],
});

/** MA2-GM-03: angles compared with a right angle. */
export const ANGLES = levels(3070401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 90 },
        choice(
          n,
          "What kind of angle is this?",
          ["a right angle", "less than a right angle", "more than a right angle"],
          0,
          "The square mark in the corner shows a right angle, like the corner of a page.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The corner of a page in a book is a right angle.",
        true,
        "A page has square corners, and a square corner is a right angle.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 40 },
        choice(
          n,
          "Is this angle smaller or bigger than a right angle?",
          ["smaller than a right angle", "bigger than a right angle", "exactly a right angle"],
          0,
          "The arms are closer together than a square corner, so the angle is smaller than a right angle.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 130 },
        choice(
          n,
          "How does this angle compare with a right angle?",
          ["greater than a right angle", "less than a right angle", "equal to a right angle"],
          0,
          "The arms are opened wider than a square corner, so it is greater than a right angle.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these have a right angle? Choose all that are right.",
        ["the corner of a door", "the corner of a square", "the tip of a slice of pizza", "the corner of a book"],
        [0, 1, 3],
        "Doors, squares and books have square corners. The tip of a pizza slice is a sharp angle, less than a right angle.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many right angles does a rectangle have?",
        "4",
        "Each of the 4 corners of a rectangle is a right angle.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "angle", degrees: 180 },
        typed(
          "short_answer",
          n,
          "This angle is a straight line. How many right angles fit into it?",
          "2",
          "A straight angle is a half turn, and two right angles (two quarter turns) make it.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these angles in order from smallest to largest.",
        ["less than a right angle", "a right angle", "more than a right angle but less than a straight line", "a straight angle"],
        "Start with angles smaller than a square corner, then a right angle, then wider angles, then a straight line.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 3, minute: 0 },
        choice(
          n,
          "Look at the clock. What angle do the two hands make?",
          ["a right angle", "less than a right angle", "more than a right angle", "a straight angle"],
          0,
          "At 3:00 one hand points to 12 and the other to 3. That is a quarter turn, a right angle.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 0 },
        choice(
          n,
          "Look at the clock. What angle do the two hands make?",
          ["less than a right angle", "a right angle", "more than a right angle", "a straight angle"],
          0,
          "From 12 to 3 would be a right angle. The hour hand is on 2, before 3, so the angle is less than a right angle.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 70 },
        trueFalse(
          n,
          "This angle is a right angle.",
          false,
          "It has no square mark, and the arms are a bit closer than a square corner. It is less than a right angle.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many right angles does this triangle have?",
          "1",
          "Only the bottom left corner is a square corner. The other two are smaller than a right angle.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Sam is facing north. He makes a quarter turn clockwise. Which way is he facing, and what angle did he turn through?",
        ["east, a right angle", "south, a right angle", "east, a straight angle", "west, a right angle"],
        0,
        "Clockwise from north, a quarter turn takes you to east. A quarter turn is a right angle.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 3],
            [3, 3],
            [3, 6],
            [0, 6],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many of the angles inside this shape are right angles?",
          "5",
          "The shape has 6 corners. 5 of them are square corners. The inside corner where it bends in is bigger than a straight line, so it is not a right angle.",
        ),
      ),
    (n) =>
      multi(
        n,
        "At which of these times do the clock hands make a right angle? Choose all that are right.",
        ["3:00", "9:00", "6:00", "12:00"],
        [0, 1],
        "At 3:00 and 9:00 the hands are a quarter turn apart. At 6:00 they make a straight line, and at 12:00 they point the same way.",
      ),
  ],
});

/** MA2-GM-01: grid maps, directions and routes. */
export const POSITION = levels(3070501, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which direction is opposite north?",
        ["south", "east", "west", "up"],
        0,
        "North and south are opposites, like east and west.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the map. Which square is the school in?",
          ["E2"],
          "Go across to column E, then up to row 2. The school is in E2.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On most maps, north is at the top.",
        true,
        "Maps are usually drawn with north at the top, south at the bottom, east on the right and west on the left.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        choice(
          n,
          "Look at the map. What is in square B4?",
          ["the park", "the school", "the shop", "the pool"],
          0,
          "Column B, row 4 has the park in it.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the compass directions in order, going clockwise from north.",
        ["north", "east", "south", "west"],
        "Going clockwise like the hands of a clock: north, east, south, west. Some people remember it as Never Eat Soggy Weet-Bix.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 5, rows: 5, map: true, points: [{ x: 1, y: 1, label: "★" }] },
        typed(
          "short_answer",
          n,
          "Start at the star. Move 3 squares to the right. Which square are you in?",
          ["E2"],
          "The star is in B2. Moving right 3 squares goes C, D, E. You stay in row 2, so you are in E2.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        choice(
          n,
          "North is at the top of the map. Which place is furthest north?",
          ["the pool", "the park", "the school", "the shop"],
          0,
          "The furthest north is the place nearest the top. The pool is in row 5, the top row.",
        ),
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 5, rows: 5, map: true, points: [{ x: 1, y: 1, label: "★" }] },
        typed(
          "short_answer",
          n,
          "Start at the star. Move 2 squares up and 1 square left. Which square are you in?",
          ["A4"],
          "The star is in B2. Up 2 squares takes you to B4. Left 1 square takes you to A4.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        multi(
          n,
          "North is at the top of the map. Which places are west of the school? Choose all that are right.",
          ["the park", "the shop", "the library", "the pool"],
          [0, 1, 2],
          "West is to the left. The school is in column E. The park (B), shop (C) and library (A) are to its left. The pool is in column E too, straight north of the school, so it is not west.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 0, y: 0, label: "H" },
            { x: 3, y: 3, label: "S" },
          ],
          path: [
            [0, 0],
            [3, 0],
            [3, 3],
          ],
        },
        choice(
          n,
          "North is at the top. The line shows Mia's route from home (H) to school (S). Which directions did she go?",
          [
            "3 squares east, then 3 squares north",
            "3 squares north, then 3 squares east",
            "3 squares west, then 3 squares north",
            "3 squares east, then 3 squares south",
          ],
          0,
          "From H she goes right (east) 3 squares to D1, then up (north) 3 squares to S in D4.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        typed(
          "short_answer",
          n,
          "North is at the top. Ben walks from the shop 3 squares north. Which square is he in now?",
          ["C4"],
          "The shop is in C1. North is up, so 3 squares up takes him to C4.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "If you face east and make a half turn, you will face west.",
        true,
        "A half turn makes you face the opposite way, and the opposite of east is west.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "grid", columns: 5, rows: 5, map: true, points: [{ x: 1, y: 1, label: "★" }] },
        typed(
          "short_answer",
          n,
          "North is at the top. Start at the star. Move 3 squares east, then 2 squares north, then 1 square west. Which square are you in?",
          ["D4"],
          "Start in B2. 3 east takes you to E2. 2 north takes you to E4. 1 west takes you to D4.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Kai is facing south. He makes a quarter turn clockwise. Which way is he facing now?",
        ["west", "east", "north", "south"],
        0,
        "Going clockwise, the order is north, east, south, west. One quarter turn on from south is west.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 5,
          map: true,
          points: [
            { x: 1, y: 3, label: "Park" },
            { x: 4, y: 1, label: "School" },
            { x: 2, y: 0, label: "Shop" },
            { x: 4, y: 4, label: "Pool" },
            { x: 0, y: 2, label: "Library" },
          ],
        },
        choice(
          n,
          "North is at the top. Which directions take you from the library to the pool?",
          [
            "4 squares east and 2 squares north",
            "2 squares east and 4 squares north",
            "4 squares west and 2 squares north",
            "4 squares east and 2 squares south",
          ],
          0,
          "The library is in A3 and the pool is in E5. From A to E is 4 squares east, and from row 3 to row 5 is 2 squares north.",
        ),
      ),
  ],
});
