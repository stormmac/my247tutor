/**
 * Year 6 Mathematics, second set: another 15 questions for each Stage 3 number, algebra, data and
 * chance standard (NESA outcome) in maths-year6a.ts, three at each level from very easy to very hard.
 * Year 6 works at the later Stage 3 level, harder than Year 5 on the same standard.
 * Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-RN-01: place value to millions and beyond, negative numbers, primes, composites, square and triangular numbers. */
export const PLACE_VALUE = levels(6040116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 4 in 8 413 562?",
        ["4000", "40 000", "400 000", "4 000 000"],
        2,
        "Read the places from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands. The 4 is in the hundred thousands place, so it is worth 400 000.",
      ),
    (n) =>
      trueFalse(
        n,
        "15 is a prime number.",
        false,
        "15 has the factors 1, 3, 5 and 15. That is more than two factors, so it is composite, not prime.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: -10, to: 0, jumps: 10, dotAt: 4, labelEvery: true },
        typed(
          "short_answer",
          n,
          "What number is the dot on?",
          ["-6", "−6"],
          "Each jump is 1. The dot is 4 jumps to the right of −10, so it is on −6.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write seven million, two hundred and five thousand and forty in numerals.",
        ["7 205 040", "7205040"],
        "7 millions, then 205 thousands, then 0 hundreds, 4 tens and 0 ones: 7 205 040.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are prime numbers? Choose all that are right.",
        ["11", "21", "29", "27", "31"],
        [0, 2, 4],
        "11, 29 and 31 each have only two factors: 1 and themselves. 21 = 3 × 7 and 27 = 3 × 9, so they are composite.",
      ),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["−9", "−4", "−1", "3", "6"],
        "Negative numbers are to the left of 0 on a number line. The further from 0 a negative number is, the smaller it is: −9, −4, −1, then 3 and 6.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "The square numbers start 1, 4, 9, 16. What is the 7th square number?",
        "49",
        "The 7th square number is 7 × 7 = 49. (1 × 1, 2 × 2, 3 × 3 and so on.)",
      ),
    (n) =>
      choice(
        n,
        "Round 3 749 600 to the nearest million.",
        ["3 000 000", "4 000 000", "3 700 000", "3 750 000"],
        1,
        "3 749 600 is between 3 000 000 and 4 000 000. The hundred thousands digit is 7, which is 5 or more, so round up to 4 000 000.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "At midnight in Cooma it was 3°C. By 5 am the temperature had dropped 8 degrees, to ___ °C.",
        ["-5", "−5"],
        "Count down from 3: 3 degrees gets to 0, and 5 more gets to −5. 3 + 5 = 8, so it is −5°C.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many hundreds are there in 2 750 000?",
        ["27 500", "27500"],
        "Divide by 100 to find how many hundreds: 2 750 000 ÷ 100 = 27 500.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a triangular number?",
        ["28", "24", "32", "18"],
        0,
        "Triangular numbers add the next counting number each time: 1, 3, 6, 10, 15, 21, 28, 36. 28 = 1 + 2 + 3 + 4 + 5 + 6 + 7. The others are not on the list.",
      ),
    (n) =>
      trueFalse(
        n,
        "−12 is less than −15.",
        false,
        "On a number line, −15 is further left than −12, so −15 is smaller. −12 is the greater number.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the largest prime number less than 100?",
        "97",
        "99 = 9 × 11 and 98 is even, so neither is prime. 97 cannot be divided evenly by 2, 3, 5 or 7, so it is prime.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The lowest temperature one night at Perisher was −9°C. The next afternoon it was 23 degrees warmer. What was the temperature in the afternoon?",
        ["14", "14°C", "14 °C"],
        "From −9 up to 0 uses 9 degrees. 23 − 9 = 14 degrees are left, so it reached 14°C.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are true? Choose all that are right.",
        [
          "Two odd prime numbers always add to an even number",
          "Every number ending in 5, except 5 itself, is composite",
          "There is a square number between 50 and 60",
          "The 10th triangular number is 55",
          "49 is a prime number",
        ],
        [0, 1, 3],
        "Odd + odd is always even. A number ending in 5 can be divided by 5, so if it is bigger than 5 it has more than two factors. 1 + 2 + … + 10 = 55. But 7 × 7 = 49 and 8 × 8 = 64, so no square number is between 50 and 60, and 49 = 7 × 7 is not prime.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to three decimal places. */
export const DECIMALS = levels(6020416, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 8 in 5.183?",
        ["8 tenths", "8 hundredths", "8 thousandths", "8 ones"],
        1,
        "After the decimal point the places are tenths, hundredths, then thousandths. The 8 is second, so it is 8 hundredths.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.7 is greater than 0.69.",
        true,
        "Write both with two places: 0.70 and 0.69. 70 hundredths is more than 69 hundredths.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 3 tenths and 4 thousandths as a decimal.",
        ["0.304", ".304"],
        "3 tenths, 0 hundredths and 4 thousandths. Remember the 0 in the hundredths place: 0.304.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from largest to smallest.",
        ["0.92", "0.9", "0.209", "0.092"],
        "Write them all with three places: 0.920, 0.900, 0.209, 0.092. Then compare them like whole numbers.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 2.5, to: 2.6, jumps: 10, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "What number is the dot on?",
          ["2.54"],
          "From 2.5 to 2.6 is split into 10 jumps, so each jump is 0.01. The dot is 4 jumps past 2.5, which is 2.54.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "0.035 = ___ thousandths",
        "35",
        "0.035 is 0 tenths, 3 hundredths and 5 thousandths. 3 hundredths is 30 thousandths, so it is 35 thousandths altogether.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these are less than 0.3? Choose all that are right.",
        ["0.29", "0.031", "0.31", "0.299", "0.3"],
        [0, 1, 3],
        "Write them with three places: 0.290, 0.031, 0.310, 0.299 and 0.300. Only 0.290, 0.031 and 0.299 are less than 0.300.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal is between 0.7 and 0.71?",
        ["0.705", "0.75", "0.071", "0.715"],
        0,
        "Write the ends as 0.700 and 0.710. 0.705 is between them. 0.071 is too small, and 0.715 and 0.75 are too big.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 7.649 to the nearest tenth.",
        "7.6",
        "7.649 is between 7.6 and 7.7. Look at the hundredths digit: it is 4, which is less than 5, so round down to 7.6.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 0.01 more than 3.296?",
        "3.306",
        "0.01 is 1 hundredth. 3.296 has 9 hundredths, and one more makes 10 hundredths, which is 1 tenth. So 3.296 + 0.01 = 3.306.",
      ),
    (n) =>
      choice(
        n,
        "In the long jump, Ava jumped 3.405 m, Bree 3.45 m, Chloe 3.054 m and Dani 3.4 m. Who jumped the furthest?",
        ["Ava", "Bree", "Chloe", "Dani"],
        1,
        "With three places the jumps are 3.405, 3.450, 3.054 and 3.400. The biggest is 3.450, so Bree jumped furthest.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.125 is greater than 0.13 because it has more digits.",
        false,
        "More digits does not mean bigger. Write 0.13 as 0.130. 130 thousandths is more than 125 thousandths, so 0.13 is greater.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["2.009", "2.09", "2.1", "2.19", "2.901"],
        "Write them with three places: 2.009, 2.090, 2.100, 2.190, 2.901. Then compare them like whole numbers.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "I am a number with three decimal places. Rounded to the nearest hundredth I am 4.27. I am as large as I can be. What number am I?",
        "4.274",
        "Numbers from 4.265 up to 4.274 round to 4.27. 4.275 would round up to 4.28, so the largest is 4.274.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 1.2, to: 1.3, jumps: 4, dotAt: 3 },
        typed(
          "short_answer",
          n,
          "The number line from 1.2 to 1.3 is split into 4 equal jumps. What number is the dot on?",
          "1.275",
          "1.2 to 1.3 is 0.1, which is 100 thousandths. 100 ÷ 4 = 25, so each jump is 0.025. Three jumps is 0.075, and 1.2 + 0.075 = 1.275.",
        ),
      ),
  ],
});

/** MA3-RN-03: percentages of quantities, and benchmark percentages as fractions and decimals. */
export const PERCENT = levels(6020316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "25% is the same as which fraction?",
        ["1/4", "1/25", "1/2", "2/5"],
        0,
        "25% means 25 out of 100. Four lots of 25 make 100, so 25% is one quarter: 1/4.",
      ),
    (n) => typed("short_answer", n, "What is 50% of 64?", "32", "50% is one half. Half of 64 is 32."),
    (n) =>
      trueFalse(n, "100% of something means all of it.", true, "Per cent means out of 100, so 100% is 100 out of 100: the whole amount."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What percentage of the bar is shaded?",
          ["30", "30%"],
          "3 of the 10 equal parts are shaded, which is 3/10. 3/10 = 30/100, so 30% is shaded.",
        ),
      ),
    (n) => typed("short_answer", n, "What is 10% of 350?", "35", "10% is one tenth. 350 ÷ 10 = 35."),
    (n) => typed("fill_blank", n, "0.4 = ___%", "40", "0.4 is 4 tenths, which is 40 hundredths, so it is 40%."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A $60 video game has 25% off. How many dollars is the discount?",
        ["15", "$15"],
        "25% is one quarter. One quarter of $60 is $60 ÷ 4 = $15.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 20%? Choose all that are right.",
        ["1/5", "0.2", "0.02", "20/100", "2/5"],
        [0, 1, 3],
        "20% means 20 out of 100: 20/100, which is 0.2 and also 1/5. 0.02 is only 2 hundredths, and 2/5 is 40%.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["0.05", "1/10", "30%", "1/2", "0.8"],
        "Change them all to decimals: 0.05, 1/10 = 0.1, 30% = 0.3, 1/2 = 0.5 and 0.8.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A $90 jacket is on sale at 10% off. What is the sale price in dollars?",
        ["81", "$81"],
        "10% of $90 is $9. Take the discount off: $90 − $9 = $81.",
      ),
    (n) =>
      choice(
        n,
        "Which is greater: 20% of 80, or 80% of 25?",
        ["20% of 80", "80% of 25", "They are the same"],
        1,
        "20% of 80: 10% is 8, so 20% is 16. 80% of 25: 10% is 2.5, so 80% is 8 × 2.5 = 20. 20 is greater than 16.",
      ),
    (n) => typed("short_answer", n, "What is 30% of 150?", "45", "10% of 150 is 15. 30% is three times that: 3 × 15 = 45."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 28 students in 6K. 25% of them play cricket. How many students in 6K do not play cricket?",
        "21",
        "25% is one quarter, and a quarter of 28 is 7. So 7 play cricket and 28 − 7 = 21 do not.",
      ),
    (n) =>
      choice(
        n,
        "A shop puts the price of a $40 hat up by 10%. Later it takes 10% off the new price. What is the final price?",
        ["$39.60", "$40", "$44", "$36"],
        0,
        "10% of $40 is $4, so the new price is $44. Then 10% of $44 is $4.40, so the final price is $44 − $4.40 = $39.60. It does not go back to $40, because the second 10% is of a bigger amount.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Josh got 21 out of 25 on a maths quiz. What percentage did he get?",
        ["84", "84%"],
        "Multiply the top and bottom by 4 to get out of 100: 21/25 = 84/100, which is 84%.",
      ),
  ],
});

/** MA3-AR-01: addition and subtraction of whole numbers and decimals. */
export const ADD_SUB = levels(6010316, {
  very_easy: [
    (n) => typed("short_answer", n, "6.2 + 3.5 = ?", "9.7", "Add the ones: 6 + 3 = 9. Add the tenths: 2 + 5 = 7 tenths. That makes 9.7."),
    (n) =>
      typed(
        "short_answer",
        n,
        "40 000 + 27 000 = ?",
        ["67 000", "67000"],
        "Think in thousands: 40 thousand + 27 thousand = 67 thousand, which is 67 000.",
      ),
    (n) => trueFalse(n, "Adding 1.6 and 2.7 gives 4.3.", true, "Ones: 1 + 2 = 3. Tenths: 6 + 7 = 13 tenths, which is 1.3. 3 + 1.3 = 4.3."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which is the best estimate of 19.8 − 6.1 + 2.9?",
        ["17", "15", "19", "13"],
        0,
        "Round each one to the nearest whole: 20 − 6 + 3 = 17.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "23.48 + 5.7 = ?",
        "29.18",
        "Line up the decimal points: 23.48 + 5.70. 23 + 5 = 28 and 0.48 + 0.7 = 1.18, so 28 + 1.18 = 29.18.",
      ),
    (n) =>
      typed("short_answer", n, "10 − 4.36 = ?", "5.64", "Count up from 4.36: 0.64 gets to 5, then 5 more gets to 10. 0.64 + 5 = 5.64."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "389 476 + 245 819 = ?",
        ["635 295", "635295"],
        "Add the thousands: 389 000 + 245 000 = 634 000. Add the rest: 476 + 819 = 1295. 634 000 + 1295 = 635 295.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Noah buys a meat pie for $4.75 and a juice for $2.90. How much change does he get from $10?",
        ["2.35", "$2.35"],
        "He spends $4.75 + $2.90 = $7.65. Then $10 − $7.65 = $2.35 change.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "___ − 3.48 = 6.9",
        "10.38",
        "The missing number is 3.48 more than 6.9. Line up the points: 6.90 + 3.48 = 10.38.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "700 000 − 356 289 = ?",
        ["343 711", "343711"],
        "Count up from 356 289: 11 to 356 300, 700 to 357 000, then 343 000 to 700 000. 11 + 700 + 343 000 = 343 711.",
      ),
    (n) =>
      choice(
        n,
        "Three parcels have masses of 2.85 kg, 1.4 kg and 3.75 kg. What is their total mass?",
        ["8 kg", "7.9 kg", "6.74 kg", "8.1 kg"],
        0,
        "Line up the decimal points so 1.4 is 1.40. 2.85 + 1.40 = 4.25, and 4.25 + 3.75 = 8.00, which is 8 kg.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make exactly 5? Choose all that are right.",
        ["2.45 + 2.55", "1.7 + 3.4", "8.25 − 3.25", "6 − 0.1", "3.08 + 1.92"],
        [0, 2, 4],
        "2.45 + 2.55, 8.25 − 3.25 and 3.08 + 1.92 all make 5. 1.7 + 3.4 is 5.1 and 6 − 0.1 is 5.9.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A school raised $2450.80 at its fete. It spent $618.35 on prizes and $295.60 on food. How much money is left?",
        ["1536.85", "$1536.85"],
        "Spent: $618.35 + $295.60 = $913.95. Left: $2450.80 − $913.95 = $1536.85.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The crowd at a cricket Test was 47 385 on day one and 39 860 on day two. How many more people came on day one?",
        ["7525", "7 525"],
        "Count up from 39 860: 140 to 40 000, then 7385 to 47 385. 140 + 7385 = 7525.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "12.5 − ___ = 3.75 + 4.6",
        "4.15",
        "First work out the right side: 3.75 + 4.6 = 8.35. Then 12.5 − ? = 8.35, so ? = 12.5 − 8.35 = 4.15.",
      ),
  ],
});

/** MA3-MR-01: multiplication and division, including decimals by whole numbers. */
export const MULT_DIV = levels(6010216, {
  very_easy: [
    (n) => typed("short_answer", n, "4.1 × 2 = ?", "8.2", "2 × 4 = 8 and 2 × 0.1 = 0.2, so 4.1 × 2 = 8.2."),
    (n) => typed("short_answer", n, "8 × 600 = ?", "4800", "8 × 6 = 48, and 8 × 6 hundreds = 48 hundreds, which is 4800."),
    (n) =>
      trueFalse(
        n,
        "When you divide a number by 10, each digit moves one place to the right.",
        true,
        "Dividing by 10 makes each digit worth ten times less, so it moves one place right. For example, 45 ÷ 10 = 4.5.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "9.3 ÷ 3 = ?", "3.1", "9 ÷ 3 = 3 and 0.3 ÷ 3 = 0.1, so 9.3 ÷ 3 = 3.1."),
    (n) =>
      pic(
        { kind: "array", rows: 7, columns: 11 },
        typed(
          "short_answer",
          n,
          "How many dots are in this array?",
          "77",
          "There are 7 rows of 11. 7 × 10 = 70 and 7 × 1 = 7, so 70 + 7 = 77.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is 0.46 × 100?",
        ["46", "4.6", "460", "0.0046"],
        0,
        "Multiplying by 100 moves each digit two places to the left: 0.46 becomes 46.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "517 × 7 = ?", "3619", "500 × 7 = 3500, 10 × 7 = 70 and 7 × 7 = 49. 3500 + 70 + 49 = 3619."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pack of 6 bottles of water costs $8.70. How much does each bottle cost?",
        ["1.45", "$1.45"],
        "$8.70 is 870 cents. 870 ÷ 6 = 145, so each bottle costs 145 cents, or $1.45.",
      ),
    (n) => typed("short_answer", n, "2184 ÷ 6 = ?", "364", "1800 ÷ 6 = 300, 360 ÷ 6 = 60 and 24 ÷ 6 = 4. 300 + 60 + 4 = 364."),
  ],
  hard: [
    (n) => typed("short_answer", n, "38 × 54 = ?", "2052", "38 × 50 = 1900 and 38 × 4 = 152. 1900 + 152 = 2052."),
    (n) => typed("short_answer", n, "6.25 × 8 = ?", "50", "6 × 8 = 48 and 0.25 × 8 = 2. 48 + 2 = 50."),
    (n) =>
      choice(
        n,
        "A farmer packs 350 eggs into cartons of 12. How many cartons can be completely filled?",
        ["29", "30", "29.17", "28"],
        0,
        "29 × 12 = 348, which leaves 2 eggs. 2 eggs can't fill a carton, so only 29 cartons are full.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "9 friends share a $157.50 restaurant bill equally. How much does each friend pay?",
        ["17.50", "$17.50", "17.5"],
        "$157.50 ÷ 9: 9 × $17 = $153, which leaves $4.50. $4.50 ÷ 9 = $0.50. So each pays $17.50.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cricket bat costs $64.95. How much do 6 bats cost?",
        ["389.70", "$389.70", "389.7"],
        "6 × $65 = $390, but each bat is 5 cents less than $65. 6 × 5c = 30c, so $390 − $0.30 = $389.70.",
      ),
    (n) =>
      multi(
        n,
        "Which of these give the same answer as 48 × 15? Choose all that are right.",
        ["24 × 30", "48 × 10 + 48 × 5", "50 × 15 − 2", "16 × 45", "40 × 15 + 8"],
        [0, 1, 3],
        "48 × 15 = 720. 24 × 30 = 720 (halve one, double the other), 480 + 240 = 720 and 16 × 45 = 720 (divide one by 3, multiply the other by 3). 50 × 15 − 2 = 748 and 40 × 15 + 8 = 608.",
      ),
  ],
});

/** MA3-MR-02: number sentences with multiplicative relations and the order of operations. */
export const NUMBER_SENTENCES = levels(6010116, {
  very_easy: [
    (n) => typed("short_answer", n, "5 + 6 × 3 = ?", "23", "Multiply before you add: 6 × 3 = 18, then 5 + 18 = 23."),
    (n) =>
      trueFalse(n, "In (8 + 2) × 5, you work out the brackets first.", true, "Brackets always come first: 8 + 2 = 10, then 10 × 5 = 50."),
    (n) => typed("fill_blank", n, "___ × 8 = 56", "7", "7 × 8 = 56."),
  ],
  easy: [
    (n) => typed("short_answer", n, "(9 − 4) × 6 = ?", "30", "Brackets first: 9 − 4 = 5. Then 5 × 6 = 30."),
    (n) => typed("short_answer", n, "15 + 24 ÷ 6 = ?", "19", "Divide before you add: 24 ÷ 6 = 4, then 15 + 4 = 19."),
    (n) =>
      choice(
        n,
        "Which number sentence shows 5 bags of 6 apples, with 4 apples eaten?",
        ["5 × 6 − 4", "5 − 6 × 4", "(5 − 4) × 6", "5 × (6 − 4)"],
        0,
        "5 bags of 6 is 5 × 6 = 30 apples, then take away the 4 eaten: 5 × 6 − 4 = 26.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "48 ÷ (2 + 6) × 7 = ?",
        "42",
        "Brackets first: 2 + 6 = 8. Then work left to right: 48 ÷ 8 = 6, and 6 × 7 = 42.",
      ),
    (n) => typed("fill_blank", n, "___ × 4 = 6 × 10", "15", "6 × 10 = 60, so ? × 4 = 60. 60 ÷ 4 = 15."),
    (n) =>
      trueFalse(
        n,
        "12 − 4 × 2 = 16",
        false,
        "Multiply first: 4 × 2 = 8, then 12 − 8 = 4, not 16. You only get 16 if you subtract first, which is the wrong order.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "60 − (8 − 3) × 9 = ?", "15", "Brackets: 8 − 3 = 5. Multiply: 5 × 9 = 45. Subtract: 60 − 45 = 15."),
    (n) =>
      choice(
        n,
        "Where should the brackets go to make 3 + 5 × 4 − 2 equal 13?",
        ["3 + 5 × (4 − 2)", "(3 + 5) × 4 − 2", "(3 + 5) × (4 − 2)", "(3 + 5 × 4) − 2"],
        0,
        "3 + 5 × (4 − 2) = 3 + 5 × 2 = 3 + 10 = 13. The others give 30, 16 and 21.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "48 ÷ ___ − 2 = 6",
        "6",
        "The division part must make 8, because 8 − 2 = 6. 48 ÷ 6 = 8, so the missing number is 6.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Movie tickets cost $15 for adults and $9 for children. A family buys 2 adult and 4 child tickets and pays with $100. How much change do they get?",
        ["34", "$34"],
        "The tickets cost 2 × 15 + 4 × 9 = 30 + 36 = 66 dollars. Change: 100 − 66 = 34, so $34.",
      ),
    (n) => typed("fill_blank", n, "(___ − 5) × 4 = 36", "14", "Something times 4 is 36, so the bracket makes 9. ? − 5 = 9, so ? = 14."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 30? Choose all that are right.",
        ["6 + 4 × 6", "(6 + 4) × 6", "90 ÷ (6 − 3)", "90 ÷ 6 − 3", "50 − 40 ÷ 2"],
        [0, 2, 4],
        "6 + 24 = 30, 90 ÷ 3 = 30 and 50 − 20 = 30. But (6 + 4) × 6 = 60 and 90 ÷ 6 − 3 = 15 − 3 = 12.",
      ),
  ],
});

/** MA3-RQF-01: comparing and ordering fractions, and adding and subtracting with related denominators. */
export const FRACTIONS = levels(6020116, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "3/7 + 2/7 = ?",
        ["5/7"],
        "The pieces are the same size (sevenths), so add the tops: 3 sevenths + 2 sevenths = 5 sevenths.",
      ),
    (n) => trueFalse(n, "5/6 is more than 1/2.", true, "1/2 is the same as 3/6, and 5/6 is more than 3/6."),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 8, shaded: 6 },
        choice(
          n,
          "Which fraction is equal to the shaded part?",
          ["3/4", "6/10", "2/3", "1/8"],
          0,
          "6 of 8 equal parts are shaded: 6/8. Divide the top and bottom by 2 to get 3/4.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "1/3 + 1/6 = ?", ["1/2", "3/6"], "1/3 is the same as 2/6. 2/6 + 1/6 = 3/6, which simplifies to 1/2."),
    (n) =>
      choice(
        n,
        "Which fraction is greater, 3/4 or 5/8?",
        ["3/4", "5/8", "They are the same"],
        0,
        "Change 3/4 into eighths: 3/4 = 6/8. 6/8 is more than 5/8.",
      ),
    (n) => typed("fill_blank", n, "2/3 = ___/12", "8", "3 × 4 = 12, so multiply the top by 4 as well: 2 × 4 = 8. 2/3 = 8/12."),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["1/5", "3/10", "1/2", "4/5"],
        "Change them to tenths: 1/5 = 2/10, 3/10, 1/2 = 5/10 and 4/5 = 8/10.",
      ),
    (n) => typed("short_answer", n, "5/6 − 1/3 = ?", ["1/2", "3/6"], "1/3 is the same as 2/6. 5/6 − 2/6 = 3/6, which simplifies to 1/2."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 3, jumps: 12, dotAt: 9 },
        typed(
          "short_answer",
          n,
          "What number is the dot on? Write it as a fraction or mixed number.",
          ["2 1/4", "9/4"],
          "0 to 3 is split into 12 jumps, so each whole has 4 jumps and each jump is 1/4. The dot is 9 jumps along: 9/4, which is 2 1/4.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "3/4 + 5/8 = ?",
        ["1 3/8", "11/8"],
        "3/4 is the same as 6/8. 6/8 + 5/8 = 11/8, which is 1 whole and 3/8: 1 3/8.",
      ),
    (n) =>
      multi(
        n,
        "Which of these fractions are less than 2/3? Choose all that are right.",
        ["3/5", "5/6", "1/2", "7/12", "3/4"],
        [0, 2, 3],
        "2/3 is about 0.67. 3/5 = 0.6, 1/2 = 0.5 and 7/12 (less than 8/12) are smaller. 5/6 and 3/4 are bigger than 2/3.",
      ),
    (n) =>
      choice(
        n,
        "Lily read 1/3 of her book on Saturday and 5/12 of it on Sunday. What fraction of the book is left to read?",
        ["1/4", "3/4", "6/15", "1/3"],
        0,
        "1/3 = 4/12, so she read 4/12 + 5/12 = 9/12. The whole book is 12/12, so 12/12 − 9/12 = 3/12 = 1/4 is left.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "3 1/3 − 5/6 = ?",
        ["2 1/2", "5/2", "15/6", "2 3/6"],
        "Change to sixths: 3 1/3 = 20/6. 20/6 − 5/6 = 15/6, which is 2 3/6, or 2 1/2.",
      ),
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["3/5", "5/8", "2/3", "7/10"],
        "As decimals: 3/5 = 0.6, 5/8 = 0.625, 2/3 is about 0.667 and 7/10 = 0.7.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack has a plank 2 m long. He cuts off 3/4 of a metre, then another 7/8 of a metre. How much of the plank is left?",
        ["3/8", "3/8 m"],
        "Change to eighths: 2 m = 16/8 and 3/4 = 6/8. He cuts off 6/8 + 7/8 = 13/8. 16/8 − 13/8 = 3/8 of a metre is left.",
      ),
  ],
});

/** MA3-RQF-02: fractions of measures and quantities. */
export const FRACTION_OF = levels(6020216, {
  very_easy: [
    (n) => typed("short_answer", n, "What is 1/6 of 42?", "7", "Find one sixth by sharing into 6 equal groups: 42 ÷ 6 = 7."),
    (n) => trueFalse(n, "1/2 of a kilometre is 500 metres.", true, "A kilometre is 1000 metres, and half of 1000 is 500."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 6 },
        typed(
          "short_answer",
          n,
          "How many dots make up 1/4 of this array?",
          "6",
          "There are 4 equal rows, so one row is 1/4 of the array. Each row has 6 dots.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is 2/3 of 27?", "18", "One third of 27 is 27 ÷ 3 = 9. Two thirds is 2 × 9 = 18."),
    (n) => choice(n, "What is 3/10 of $80?", ["$24", "$8", "$30", "$27"], 0, "One tenth of $80 is $8, so three tenths is 3 × $8 = $24."),
    (n) => typed("fill_blank", n, "1/4 of 1 L = ___ mL", "250", "1 L is 1000 mL, and 1000 ÷ 4 = 250 mL."),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is 7/8 of 56?", "49", "One eighth of 56 is 56 ÷ 8 = 7. Seven eighths is 7 × 7 = 49."),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many minutes is 3/4 of 2 hours?",
        ["90", "90 minutes"],
        "2 hours is 120 minutes. One quarter of 120 is 30, so three quarters is 3 × 30 = 90 minutes.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 800, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "The scale shows a bag of rice. Mum uses 3/4 of it. How many grams does she use?",
          ["600", "600 g"],
          "The scale shows 800 g. One quarter of 800 is 200, so three quarters is 3 × 200 = 600 g.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 30 students in 6M. 2/5 of them walk to school. How many students do not walk?",
        "18",
        "One fifth of 30 is 6, so 2 × 6 = 12 walk. 30 − 12 = 18 do not walk.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is the smallest amount?",
        ["2/3 of 33", "3/5 of 40", "5/8 of 32", "3/4 of 24"],
        3,
        "2/3 of 33 = 2 × 11 = 22. 3/5 of 40 = 3 × 8 = 24. 5/8 of 32 = 5 × 4 = 20. 3/4 of 24 = 3 × 6 = 18. The smallest is 18.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many centimetres is 3/5 of 4 m?",
        ["240", "240 cm"],
        "4 m is 400 cm. One fifth of 400 is 80, so three fifths is 3 × 80 = 240 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "3/4 of a number is 27. What is the number?",
        "36",
        "If 3 quarters is 27, then 1 quarter is 27 ÷ 3 = 9. The whole number is 4 quarters: 4 × 9 = 36.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Grace had 48 stickers. She gave 1/3 of them to her brother, then gave 1/4 of what was left to a friend. How many stickers does she have now?",
        "24",
        "1/3 of 48 is 16, leaving 48 − 16 = 32. 1/4 of 32 is 8, leaving 32 − 8 = 24 stickers.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 1.2, step: 0.2, unit: "L" },
        typed(
          "short_answer",
          n,
          "The jug shows how much water Ari has. He pours out 5/6 of it. How many millilitres does he pour out?",
          ["1000", "1000 mL"],
          "The jug shows 1.2 L, which is 1200 mL. One sixth of 1200 is 200, so five sixths is 5 × 200 = 1000 mL.",
        ),
      ),
  ],
});

const RAIN: Picture = {
  kind: "column_graph",
  title: "Rainfall in Lismore (mm)",
  step: 25,
  columns: [
    { label: "Jan", value: 50 },
    { label: "Feb", value: 125 },
    { label: "Mar", value: 75 },
    { label: "Apr", value: 100 },
  ],
};

const FISH: Picture = {
  kind: "picture_graph",
  title: "Fish caught at the jetty",
  thing: "fish",
  each: 4,
  rows: [
    { label: "Sat", count: 6 },
    { label: "Sun", count: 9 },
    { label: "Mon", count: 3 },
  ],
};

/** MA3-DATA-01: constructing graphs with many-to-one scales. */
export const GRAPHS = levels(6060116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Books read in Book Week",
          thing: "books",
          each: 5,
          rows: [
            { label: "6A", count: 4 },
            { label: "6B", count: 6 },
            { label: "6C", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many books did 6B read?",
          "30",
          "6B has 6 stars and each star stands for 5 books. 6 × 5 = 30.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a picture graph where each symbol stands for 2 dogs, half a symbol stands for 1 dog.",
        true,
        "A whole symbol is 2 dogs, and half of 2 is 1, so half a symbol is 1 dog.",
      ),
    (n) =>
      choice(
        n,
        "The side of a column graph is marked 0, 50, 100, 150, 200. What is the scale going up in?",
        ["fifties", "tens", "fives", "hundreds"],
        0,
        "Each mark is 50 more than the one before, so the scale goes up in fifties.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        RAIN,
        typed(
          "short_answer",
          n,
          "Look at the graph. How much rain fell in February?",
          ["125", "125 mm"],
          "The scale goes up in 25s. The February column reaches the line marked 125, so 125 mm.",
        ),
      ),
    (n) =>
      pic(
        RAIN,
        choice(
          n,
          "Look at the graph. Which month had twice as much rain as January?",
          ["April", "February", "March", "No month"],
          0,
          "January had 50 mm, and twice 50 is 100. April's column reaches 100 mm.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each person symbol stands for 25 people. How many symbols should you draw for 150 people?",
        "6",
        "150 ÷ 25 = 6, so draw 6 symbols.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "A canteen sold 120, 340, 275 and 410 icy poles in four terms. Which scale is best for the side of their column graph?",
        ["1 mark = 50, up to 450", "1 mark = 1, up to 450", "1 mark = 500, up to 5000", "1 mark = 50, up to 300"],
        0,
        "Going up in 50s to 450 fits every amount with 9 marks. Going up in 1s needs 450 marks, going up in 500s squashes every column, and stopping at 300 is too short for 340 and 410.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each bird symbol stands for 6 birds. How many symbols show 15 birds?",
        ["2.5", "2 1/2", "2 and a half"],
        "15 ÷ 6 = 2 with 3 left over. 3 is half of 6, so draw 2 whole symbols and half a symbol: 2.5.",
      ),
    (n) =>
      trueFalse(
        n,
        "On a graph whose scale goes up in 20s, a column ending halfway between 60 and 80 shows 65.",
        false,
        "Halfway between 60 and 80 is 70, because 80 − 60 = 20 and half of 20 is 10. 60 + 10 = 70, not 65.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        FISH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more fish were caught on Sunday than on Monday?",
          "24",
          "Each picture is 4 fish. Sunday has 9 pictures and Monday has 3, so Sunday has 6 more pictures: 6 × 4 = 24 more fish.",
        ),
      ),
    (n) =>
      pic(
        FISH,
        multi(
          n,
          "Look at the picture graph. Which of these are true? Choose all that are right.",
          [
            "36 fish were caught on Sunday",
            "6 fish were caught on Saturday",
            "72 fish were caught over the three days",
            "Monday's catch was a third of Saturday's",
            "24 fish were caught on Saturday",
          ],
          [0, 2, 4],
          "Each picture is 4 fish. Saturday 6 × 4 = 24, Sunday 9 × 4 = 36, Monday 3 × 4 = 12. Altogether 24 + 36 + 12 = 72. Monday's 12 is half of Saturday's 24, not a third.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Leah is graphing how much water her family uses. Each square on her grid stands for 250 L. How many squares tall is the column for 3000 L?",
        "12",
        "3000 ÷ 250 = 12, because 4 squares make 1000 L and 3 × 4 = 12. So the column is 12 squares tall.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A picture graph uses one symbol for every 12 cars. One row shows 4 whole symbols and three quarters of a symbol. How many cars is that?",
        "57",
        "4 whole symbols are 4 × 12 = 48 cars. A quarter of a symbol is 12 ÷ 4 = 3 cars, so three quarters is 9 cars. 48 + 9 = 57.",
      ),
    (n) =>
      choice(
        n,
        "Tia wants to graph 45, 90, 150 and 210. Her grid is only 8 squares tall. Which scale lets every column fit?",
        ["1 square = 30", "1 square = 25", "1 square = 20", "1 square = 10"],
        0,
        "The tallest column is 210. With 1 square = 30 it needs 210 ÷ 30 = 7 squares, which fits. 1 square = 25 needs more than 8 squares, and 20 or 10 need even more.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Ferry passengers",
          step: 500,
          columns: [
            { label: "Mon", value: 1500 },
            { label: "Tue", value: 1250 },
            { label: "Wed", value: 2000 },
            { label: "Thu", value: 1750 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many passengers travelled on the ferry over the four days?",
          ["6500", "6 500"],
          "The scale goes up in 500s, so a column halfway between two lines is 250 more. Tue is 1250 and Thu is 1750. 1500 + 1250 + 2000 + 1750 = 6500.",
        ),
      ),
  ],
});

const CANBERRA: Picture = {
  kind: "line_graph",
  title: "Temperature in Canberra (°C)",
  step: 2,
  points: [
    { label: "6 am", value: 2 },
    { label: "9 am", value: 8 },
    { label: "12 pm", value: 14 },
    { label: "3 pm", value: 16 },
    { label: "6 pm", value: 12 },
    { label: "9 pm", value: 6 },
  ],
};

const SUNFLOWER: Picture = {
  kind: "line_graph",
  title: "Height of a sunflower (cm)",
  step: 20,
  points: [
    { label: "Wk 1", value: 10 },
    { label: "Wk 2", value: 30 },
    { label: "Wk 3", value: 60 },
    { label: "Wk 4", value: 100 },
    { label: "Wk 5", value: 130 },
    { label: "Wk 6", value: 150 },
  ],
};

const NSW_EVENTS: Picture = {
  kind: "table",
  headings: ["Year", "Event"],
  rows: [
    ["1813", "Explorers cross the Blue Mountains"],
    ["1855", "First railway in NSW opens"],
    ["1973", "Sydney Opera House opens"],
    ["2000", "Sydney Olympic Games"],
  ],
};

const DAM: Picture = {
  kind: "line_graph",
  title: "How full the dam is (%)",
  step: 10,
  points: [
    { label: "Jan", value: 70 },
    { label: "Feb", value: 60 },
    { label: "Mar", value: 45 },
    { label: "Apr", value: 40 },
    { label: "May", value: 55 },
    { label: "Jun", value: 80 },
  ],
};

/** MA3-DATA-02: interpreting data displays, including timelines and line graphs. */
export const DATA = levels(6060216, {
  very_easy: [
    (n) =>
      pic(
        CANBERRA,
        typed(
          "short_answer",
          n,
          "Look at the line graph. What was the temperature at 12 pm?",
          ["14", "14°C", "14 °C"],
          "Find 12 pm along the bottom and go up to the line. It meets the line at 14, so it was 14°C.",
        ),
      ),
    (n) =>
      pic(
        CANBERRA,
        choice(
          n,
          "Look at the line graph. At which time was it coldest?",
          ["6 am", "9 am", "6 pm", "9 pm"],
          0,
          "The lowest point on the line is at 6 am, at 2°C.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a timeline, events are placed in the order they happened.",
        true,
        "A timeline is like a number line for dates: earlier events go first and later events go after them.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        SUNFLOWER,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How tall was the sunflower in Week 5?",
          ["130", "130 cm"],
          "The scale goes up in 20s. In Week 5 the line is halfway between 120 and 140, so it was 130 cm.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these NSW events in order on a timeline, earliest first.",
        [
          "Explorers cross the Blue Mountains (1813)",
          "First railway in NSW opens (1855)",
          "Sydney Opera House opens (1973)",
          "Sydney Olympic Games (2000)",
        ],
        "Compare the years: 1813, then 1855, then 1973, then 2000.",
      ),
    (n) =>
      pic(
        SUNFLOWER,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How many centimetres did the sunflower grow from Week 2 to Week 4?",
          ["70", "70 cm"],
          "It was 30 cm in Week 2 and 100 cm in Week 4. 100 − 30 = 70 cm.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        CANBERRA,
        choice(
          n,
          "Look at the line graph. Between which two times did the temperature fall the most?",
          ["3 pm and 6 pm", "6 pm and 9 pm", "12 pm and 3 pm", "6 am and 9 am"],
          1,
          "The line goes down after 3 pm. From 3 pm to 6 pm it falls 16 − 12 = 4 degrees, and from 6 pm to 9 pm it falls 12 − 6 = 6 degrees.",
        ),
      ),
    (n) =>
      pic(
        NSW_EVENTS,
        typed(
          "short_answer",
          n,
          "The table is a timeline of events in NSW. How many years after the first NSW railway did the Sydney Opera House open?",
          ["118", "118 years"],
          "The railway opened in 1855 and the Opera House in 1973. 1973 − 1855: 45 years to 1900, then 73 more to 1973. 45 + 73 = 118 years.",
        ),
      ),
    (n) =>
      pic(
        SUNFLOWER,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How much did the sunflower grow from Week 1 to Week 6?",
          ["140", "140 cm"],
          "It was 10 cm in Week 1 and 150 cm in Week 6. 150 − 10 = 140 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        SUNFLOWER,
        trueFalse(
          n,
          "Look at the line graph. The sunflower grew the most between Week 3 and Week 4.",
          true,
          "Each week it grew 20, 30, 40, 30 and 20 cm. The biggest jump, 40 cm, is from Week 3 (60 cm) to Week 4 (100 cm), where the line is steepest.",
        ),
      ),
    (n) =>
      pic(
        NSW_EVENTS,
        typed(
          "short_answer",
          n,
          "The table is a timeline of events in NSW. How many years passed between the explorers crossing the Blue Mountains and the Sydney Olympic Games?",
          ["187", "187 years"],
          "2000 − 1813: count up 87 years to 1900, then 100 years to 2000. 87 + 100 = 187 years.",
        ),
      ),
    (n) =>
      pic(
        CANBERRA,
        multi(
          n,
          "Look at the line graph. Which of these are true? Choose all that are right.",
          [
            "The temperature went up three times in a row from 6 am",
            "It was warmer at 9 pm than at 9 am",
            "The temperature dropped 10 degrees from 3 pm to 9 pm",
            "The temperature at 6 pm was 12°C",
          ],
          [0, 2, 3],
          "It rose from 6 am to 9 am, 9 am to 12 pm and 12 pm to 3 pm. At 9 pm it was 6°C, colder than 8°C at 9 am. From 16°C at 3 pm to 6°C at 9 pm is a drop of 10 degrees, and 6 pm was 12°C.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        DAM,
        typed(
          "short_answer",
          n,
          "Look at the line graph. In which month was the dam first fuller than the month before?",
          ["May"],
          "The level falls from Jan to Apr (70, 60, 45, 40). In May it goes up to 55%, the first rise.",
        ),
      ),
    (n) =>
      pic(
        DAM,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How many percent fuller was the dam at its fullest than at its emptiest?",
          ["40", "40%"],
          "The fullest is 80% in June and the emptiest is 40% in April. 80 − 40 = 40, so 40% fuller.",
        ),
      ),
    (n) =>
      pic(
        DAM,
        choice(
          n,
          "Look at the line graph. Between which two months did the level fall the most?",
          ["Jan and Feb", "Feb and Mar", "Mar and Apr", "May and Jun"],
          1,
          "Only Jan to Apr show falls. Jan to Feb: 10. Feb to Mar: 60 − 45 = 15 (the line ends halfway between 40 and 50). Mar to Apr: 5. May to Jun is a rise, not a fall.",
        ),
      ),
  ],
});

/** MA3-CHAN-01: chance experiments and probability as fractions, decimals and percentages. */
export const CHANCE = levels(6060316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow", "purple", "orange"] },
        typed(
          "short_answer",
          n,
          "What is the chance of this spinner landing on green? Write it as a fraction.",
          ["1/6"],
          "There are 6 equal sections and 1 is green, so the chance is 1/6.",
        ),
      ),
    (n) => trueFalse(n, "A probability of 1 means the event is certain.", true, "Probability goes from 0 (impossible) to 1 (certain)."),
    (n) =>
      choice(
        n,
        "What is the chance of rolling a number less than 7 on a normal six-sided dice?",
        ["certain", "impossible", "even chance", "unlikely"],
        0,
        "Every face (1, 2, 3, 4, 5, 6) is less than 7, so it is certain to happen. Its probability is 1.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 1 },
            { colour: "blue", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the probability it is blue, as a decimal?",
          ["0.75", ".75"],
          "There are 1 + 3 = 4 counters and 3 are blue. 3/4 = 0.75.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The letters of the word NETBALL are written on 7 cards. You pick one card without looking. What is the probability it is an L? Write it as a fraction.",
        ["2/7"],
        "There are 7 cards and 2 of them are L, so the probability is 2/7.",
      ),
    (n) =>
      ordering(
        n,
        "Put these probabilities in order from least likely to most likely.",
        ["0.1", "1/4", "40%", "0.6", "9/10"],
        "Change them to decimals: 0.1, 0.25, 0.4, 0.6, 0.9.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["yellow", "green", "yellow", "yellow", "green", "yellow"] },
        choice(
          n,
          "What is the probability of this spinner landing on yellow?",
          ["2/3", "4/2", "1/3", "4/10"],
          0,
          "4 of the 6 equal sections are yellow. 4/6 = 2/3.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the probability of rolling a number greater than 4 on a normal dice? Write it as a fraction in simplest form.",
        ["1/3"],
        "Only 5 and 6 are greater than 4, so 2 of the 6 faces. 2/6 = 1/3.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "green", count: 7 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the chance it is green, as a percentage?",
          ["70", "70%"],
          "There are 10 counters and 7 are green. 7/10 = 70/100 = 70%.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Kate tossed a coin 80 times and got 36 heads. What fraction of her tosses were heads, in simplest form?",
        ["9/20"],
        "36 out of 80 is 36/80. Divide the top and bottom by 4: 9/20.",
      ),
    (n) =>
      choice(
        n,
        "Omar spun a spinner 60 times and it landed on blue 15 times. As a percentage, how often did it land on blue?",
        ["25%", "15%", "60%", "45%"],
        0,
        "15 out of 60 is 15/60, which simplifies to 1/4. 1/4 = 25%.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "blue", count: 6 },
            { colour: "yellow", count: 4 },
            { colour: "red", count: 2 },
          ],
        },
        multi(
          n,
          "You pick one counter from this bag. Which of these are true? Choose all that are right.",
          ["The chance of blue is 50%", "The chance of yellow is 1/3", "The chance of red is 0.2", "The chance of not getting red is 5/6"],
          [0, 1, 3],
          "There are 12 counters. Blue 6/12 = 50%. Yellow 4/12 = 1/3. Red 2/12 = 1/6, which is not 0.2. Not red is 10/12 = 5/6.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 40 marbles. The probability of picking a green marble is 0.15. How many marbles are green?",
        "6",
        "0.15 is 15%. 10% of 40 is 4 and 5% is 2, so 15% of 40 is 4 + 2 = 6 green marbles.",
      ),
    (n) =>
      choice(
        n,
        "Sam rolls a normal dice 120 times. About how many times would you expect him to roll a 5?",
        ["about 20", "about 5", "about 60", "about 50"],
        0,
        "The chance of a 5 is 1/6 on each roll. 1/6 of 120 is 120 ÷ 6 = 20, so about 20 times.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 6 green and 4 white counters. How many white counters must be added to make the probability of green 0.4?",
        "5",
        "0.4 = 2/5, so the 6 green counters must be 2 fifths of the bag. 1 fifth is 3, so the bag needs 15 counters. It has 10, so add 5 white counters.",
      ),
  ],
});
