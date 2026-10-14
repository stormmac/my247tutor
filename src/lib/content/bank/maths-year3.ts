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
