/**
 * Year 5 Mathematics: 15 questions for each Stage 3 standard (NESA outcome), three at each
 * level from very easy to very hard, pitched at early Stage 3 (Year 6 covers the same outcomes,
 * harder). Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-RN-01: place value of large numbers, rounding, factors, multiples, primes and square numbers. */
export const PLACE_VALUE = levels(5010101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 6 in 62 481?",
        ["6", "600", "6000", "60 000"],
        3,
        "The 6 is in the ten thousands place, so it is worth 6 ten thousands, or 60 000.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write forty-five thousand, two hundred and six in numerals.",
        "45 206",
        "45 thousands, 2 hundreds, 0 tens and 6 ones. The zero holds the tens place: 45 206.",
      ),
    (n) => trueFalse(n, "Every even number is a multiple of 2.", true, "Even numbers are the numbers you say when you count by 2s, so they are all multiples of 2."),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["38 950", "39 058", "39 508", "93 005"],
        "Compare the ten thousands first, then the thousands, then the hundreds: 38 950, 39 058, 39 508, 93 005.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "70 000 + 3000 + 400 + 9 = ___",
        "73 409",
        "7 ten thousands, 3 thousands, 4 hundreds, 0 tens and 9 ones make 73 409. The zero shows there are no tens.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 4000, to: 5000, jumps: 10, dotAt: 7 },
        typed(
          "short_answer",
          n,
          "Look at the number line. Round the number at the dot to the nearest thousand.",
          "5000",
          "The line from 4000 to 5000 has 10 jumps, so each jump is 100. The dot is at 4700, which is closer to 5000 than to 4000.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 46 382 to the nearest thousand.",
        "46 000",
        "46 382 is between 46 000 and 47 000. The hundreds digit is 3, which is less than 5, so round down to 46 000.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are factors of 24? Choose all that are right.",
        ["3", "5", "6", "8", "9"],
        [0, 2, 3],
        "A factor divides 24 with nothing left over. 3 × 8 = 24 and 6 × 4 = 24, so 3, 6 and 8 are factors. 5 and 9 leave a remainder.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The multiples of 6 are 6, 12, 18, 24, ___",
        "30",
        "Multiples of 6 go up by 6 each time: 24 + 6 = 30.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 249 600 to the nearest ten thousand.",
        "250 000",
        "249 600 is between 240 000 and 250 000. The thousands digit is 9, so round up to 250 000.",
      ),
    (n) => trueFalse(n, "36 is a square number.", true, "6 × 6 = 36, so 36 dots can make a square with 6 rows of 6."),
    (n) =>
      choice(
        n,
        "Which number has a 4 in the ten thousands place and a 0 in the hundreds place?",
        ["43 052", "40 352", "34 052", "43 502"],
        0,
        "43 052 is 4 ten thousands, 3 thousands, 0 hundreds, 5 tens and 2 ones. The others have the 4 or the 0 in the wrong place.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest number that is a multiple of both 4 and 6?",
        "12",
        "Multiples of 4: 4, 8, 12, 16 … Multiples of 6: 6, 12, 18 … The first number in both lists is 12.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Using the digits 7, 0, 3, 9 and 5 once each, what is the smallest 5-digit number you can make?",
        "30 579",
        "A 5-digit number can't start with 0, so start with the next smallest digit, 3. Then put 0 next and the rest in order: 30 579.",
      ),
    (n) =>
      multi(
        n,
        "Which of these numbers are prime? Choose all that are right.",
        ["21", "23", "25", "27", "29"],
        [1, 4],
        "A prime number has exactly two factors, 1 and itself. 21 = 3 × 7, 25 = 5 × 5 and 27 = 3 × 9, but 23 and 29 can only be made by 1 × themselves.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to thousandths. */
export const DECIMALS = levels(5030101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 3 },
        typed(
          "short_answer",
          n,
          "What decimal is shown by the dot on the number line?",
          ["0.3", ".3"],
          "The line from 0 to 1 has 10 equal jumps, so each jump is one tenth (0.1). The dot is 3 jumps along: 0.3.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is larger, 0.45 or 0.54?",
        ["0.45", "0.54", "They are equal"],
        1,
        "Compare the tenths first: 0.54 has 5 tenths and 0.45 has only 4 tenths, so 0.54 is larger.",
      ),
    (n) => trueFalse(n, "0.6 and 0.60 are equal.", true, "0.6 is 6 tenths, and 6 tenths is the same as 60 hundredths, or 0.60."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 7 in 2.307?",
        ["7 tenths", "7 hundredths", "7 thousandths", "7 ones"],
        2,
        "After the decimal point the places are tenths, hundredths, then thousandths. The 7 is third, so it is 7 thousandths.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 9 hundredths as a decimal.",
        ["0.09", ".09"],
        "9 hundredths has 0 tenths and 9 in the hundredths place: 0.09.",
      ),
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.3", "0.35", "0.4", "0.42"],
        "Write them with two places: 0.30, 0.35, 0.40, 0.42. Now compare the hundredths.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 125 thousandths as a decimal.",
        ["0.125", ".125"],
        "125 thousandths is 1 tenth, 2 hundredths and 5 thousandths: 0.125.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are greater than 0.5? Choose all that are right.",
        ["0.48", "0.52", "0.6", "0.499", "0.505"],
        [1, 2, 4],
        "Write 0.5 as 0.500. Then 0.520, 0.600 and 0.505 are bigger, but 0.480 and 0.499 are smaller.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0.4, to: 0.5, jumps: 10, dotAt: 6 },
        typed(
          "short_answer",
          n,
          "What number is shown by the dot on the number line?",
          ["0.46", ".46"],
          "From 0.4 to 0.5 is 10 hundredths, so each jump is 0.01. The dot is 6 jumps past 0.4: 0.46.",
        ),
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.087", "0.78", "0.8", "0.807"],
        "Write them with three places: 0.087, 0.780, 0.800, 0.807. Now compare them like whole numbers.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal is the same as 3 + 4/10 + 6/1000?",
        ["3.46", "3.406", "3.046", "3.0406"],
        1,
        "3 ones, 4 tenths, 0 hundredths and 6 thousandths. The zero holds the hundredths place: 3.406.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "0.6 = ___ thousandths",
        "600",
        "0.6 is 6 tenths. Each tenth is 100 thousandths, so 6 tenths is 600 thousandths (0.600).",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which number is halfway between 0.3 and 0.4?",
        ["0.35", "0.305", "0.7", "0.335"],
        0,
        "0.3 is 0.30 and 0.4 is 0.40. Halfway between 30 hundredths and 40 hundredths is 35 hundredths: 0.35.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a 100 m race, Ella ran 15.42 seconds, Kai ran 15.24 seconds and Zoe ran 15.4 seconds. Who was the fastest?",
        "Kai",
        "The fastest runner has the smallest time. Write them as 15.42, 15.24 and 15.40: 15.24 is smallest, so Kai was fastest.",
      ),
    (n) =>
      multi(
        n,
        "Which of these numbers are between 1.05 and 1.5? Choose all that are right.",
        ["1.1", "1.049", "1.45", "1.51", "1.405"],
        [0, 2, 4],
        "Write everything with three places: 1.050 and 1.500. 1.100, 1.450 and 1.405 fit between. 1.049 is just under 1.050 and 1.510 is over 1.500.",
      ),
  ],
});

/** MA3-RN-03: benchmark percentages, their fractions and decimals, and percentages of quantities. */
export const PERCENT = levels(5030601, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What does 50% of something mean?",
        ["half of it", "a quarter of it", "a tenth of it", "all of it"],
        0,
        "Per cent means out of 100. 50 out of 100 is one half.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What percentage of the bar is shaded?",
          ["30%", "30"],
          "3 out of 10 parts are shaded. 3 out of 10 is the same as 30 out of 100, which is 30%.",
        ),
      ),
    (n) => trueFalse(n, "100% of something means all of it.", true, "100% means 100 out of 100, which is the whole thing."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 25% as a fraction in its simplest form.",
        ["1/4", "one quarter", "a quarter"],
        "25% is 25 out of 100. Four lots of 25 make 100, so 25% is one quarter, 1/4.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal is equal to 75%?",
        ["0.75", "7.5", "0.075", "75"],
        0,
        "75% is 75 hundredths, which is written 0.75.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to one half? Choose all that are right.",
        ["50%", "0.5", "5%", "2/4", "0.05"],
        [0, 1, 3],
        "50%, 0.5 and 2/4 are all one half. 5% and 0.05 are only 5 out of 100.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is 50% of 64?", "32", "50% is one half. Half of 64 is 32."),
    (n) => typed("short_answer", n, "What is 10% of 90?", "9", "10% is one tenth. Divide by 10: 90 ÷ 10 = 9."),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 1 },
        choice(
          n,
          "What percentage of the circle is shaded?",
          ["25%", "4%", "40%", "14%"],
          0,
          "1 out of 4 equal parts is shaded. One quarter is 25 out of 100, which is 25%.",
        ),
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "What is 25% of 48?", "12", "25% is one quarter. Halve 48 to get 24, then halve again to get 12."),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["10%", "0.2", "1/4", "0.6", "3/4"],
        "Change them all to decimals: 10% = 0.1, 0.2, 1/4 = 0.25, 0.6 and 3/4 = 0.75.",
      ),
    (n) =>
      choice(
        n,
        "A $40 T-shirt has 10% off. How much money do you save?",
        ["$4", "$10", "$36", "$0.40"],
        0,
        "10% is one tenth. $40 ÷ 10 = $4 saved. ($36 is the new price, not the saving.)",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 28 students in 5K. 75% of them walk to school. How many students walk?",
        "21",
        "25% of 28 is 28 ÷ 4 = 7. 75% is three lots of 25%, so 3 × 7 = 21 students.",
      ),
    (n) =>
      choice(
        n,
        "A $60 board game is 25% off. What is the sale price?",
        ["$15", "$45", "$35", "$50"],
        1,
        "25% of $60 is $60 ÷ 4 = $15 off. The sale price is $60 − $15 = $45.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are true? Choose all that are right.",
        ["10% of 50 is 5", "25% of 20 is 4", "50% of 30 is 15", "75% of 8 is 6"],
        [0, 2, 3],
        "50 ÷ 10 = 5, half of 30 is 15, and a quarter of 8 is 2, so 75% is 6. But 25% of 20 is 20 ÷ 4 = 5, not 4.",
      ),
  ],
});

/** MA3-AR-01: adding and subtracting whole numbers and decimals. */
export const ADD_SUB = levels(5030201, {
  very_easy: [
    (n) => typed("short_answer", n, "4500 + 3200 = ?", "7700", "4000 + 3000 = 7000 and 500 + 200 = 700, so the total is 7700."),
    (n) => typed("short_answer", n, "0.5 + 0.3 = ?", ["0.8", ".8"], "5 tenths and 3 tenths make 8 tenths, which is 0.8."),
    (n) => trueFalse(n, "1000 − 1 = 999", true, "One less than 1000 is 999."),
  ],
  easy: [
    (n) => typed("short_answer", n, "12 345 + 2000 = ?", "14 345", "Only the thousands change: 12 thousands and 2 thousands make 14 thousands, so 14 345."),
    (n) => typed("short_answer", n, "3.6 + 2.5 = ?", "6.1", "3 + 2 = 5 and 0.6 + 0.5 = 1.1. Then 5 + 1.1 = 6.1."),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 4980 + 3020?",
        ["7000", "8000", "9000", "80 000"],
        1,
        "4980 is about 5000 and 3020 is about 3000, so the total is about 8000.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "25 618 + 13 497 = ?",
        "39 115",
        "Add the thousands: 25 000 + 13 000 = 38 000. Then 618 + 497 = 1115. 38 000 + 1115 = 39 115.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "8.4 − 2.75 = ?",
        "5.65",
        "Write 8.4 as 8.40. Count up from 2.75: 0.25 to 3, then 5.40 to 8.40. 0.25 + 5.40 = 5.65.",
      ),
    (n) =>
      choice(
        n,
        "Sam bought a pie for $4.85 and a drink for $2.40. How much did he spend?",
        ["$7.25", "$6.25", "$7.15", "$6.45"],
        0,
        "$4 + $2 = $6. 85c + 40c = $1.25. $6 + $1.25 = $7.25.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "50 000 − 26 384 = ?",
        "23 616",
        "Count up from 26 384: 16 to 26 400, 600 to 27 000, then 23 000 to 50 000. 16 + 600 + 23 000 = 23 616.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Day", "Crowd"],
          rows: [
            ["Saturday", "38 452"],
            ["Sunday", "41 097"],
          ],
        },
        typed(
          "short_answer",
          n,
          "The table shows the crowd at a cricket match at the SCG. How many more people came on Sunday than on Saturday?",
          "2645",
          "41 097 − 38 452: count up from 38 452. 48 to 38 500, 1500 to 40 000, then 1097 to 41 097. 48 + 1500 + 1097 = 2645.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these add up to exactly 10? Choose all that are right.",
        ["6.4 + 3.6", "7.25 + 2.75", "4.8 + 5.3", "9.99 + 0.01"],
        [0, 1, 3],
        "6.4 + 3.6 = 10, 7.25 + 2.75 = 10 and 9.99 + 0.01 = 10. But 4.8 + 5.3 = 10.1.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia had $20. She bought a book for $8.95 and a pen for $3.60. How much change did she get?",
        ["7.45", "$7.45"],
        "She spent $8.95 + $3.60 = $12.55. Her change is $20 − $12.55 = $7.45.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Three NSW towns have populations of 12 480, 9365 and 15 207. What is their total population?",
        "37 052",
        "12 480 + 9365 = 21 845. Then 21 845 + 15 207 = 37 052.",
      ),
    (n) =>
      choice(
        n,
        "In the long jump, Tom jumped 3.85 m and Ava jumped 4.2 m. How much further did Ava jump?",
        ["0.35 m", "0.45 m", "1.65 m", "0.43 m"],
        0,
        "Write 4.2 as 4.20. 4.20 − 3.85: count up 0.15 to 4.00, then 0.20 to 4.20. 0.15 + 0.20 = 0.35 m.",
      ),
  ],
});

/** MA3-MR-01: multiplication and division strategies. */
export const MULT_DIV = levels(5020101, {
  very_easy: [
    (n) => typed("short_answer", n, "7 × 8 = ?", "56", "7 × 8 = 56. Think 7 × 4 = 28, then double it: 56."),
    (n) =>
      pic(
        { kind: "array", rows: 6, columns: 9 },
        typed("short_answer", n, "How many dots are in this array?", "54", "There are 6 rows of 9 dots. 6 × 9 = 54."),
      ),
    (n) => trueFalse(n, "63 ÷ 7 = 9", true, "7 × 9 = 63, so 63 ÷ 7 = 9."),
  ],
  easy: [
    (n) => typed("short_answer", n, "40 × 6 = ?", "240", "4 × 6 = 24, and 40 is ten times bigger than 4, so 40 × 6 = 240."),
    (n) =>
      choice(
        n,
        "Which is the same as 23 × 4?",
        ["20 × 4 + 3 × 4", "20 × 4 + 3", "23 + 4", "20 + 3 × 4"],
        0,
        "Split 23 into 20 and 3, and multiply both parts by 4: 20 × 4 + 3 × 4 = 80 + 12 = 92.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Chairs for the school assembly are set out in 8 rows of 12. How many chairs is that?",
        "96",
        "8 × 12 = 8 × 10 + 8 × 2 = 80 + 16 = 96 chairs.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "34 × 6 = ?", "204", "30 × 6 = 180 and 4 × 6 = 24. 180 + 24 = 204."),
    (n) => typed("short_answer", n, "96 ÷ 4 = ?", "24", "Halve 96 to get 48, then halve again to get 24."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 48? Choose all that are right.",
        ["6 × 8", "4 × 12", "7 × 7", "3 × 16", "9 × 5"],
        [0, 1, 3],
        "6 × 8 = 48, 4 × 12 = 48 and 3 × 16 = 48. But 7 × 7 = 49 and 9 × 5 = 45.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A carton holds 6 eggs. How many cartons are needed to pack 75 eggs?",
        ["12", "13", "12 r 3", "11"],
        1,
        "75 ÷ 6 = 12 r 3. 12 cartons hold 72 eggs, and the 3 left over need one more carton, so 13.",
      ),
    (n) => typed("short_answer", n, "237 × 5 = ?", "1185", "200 × 5 = 1000, 30 × 5 = 150 and 7 × 5 = 35. 1000 + 150 + 35 = 1185."),
    (n) =>
      choice(
        n,
        "What is 85 ÷ 4?",
        ["21 r 1", "20 r 5", "21 r 4", "22 r 1"],
        0,
        "4 × 21 = 84, and 85 − 84 = 1 left over. So 85 ÷ 4 = 21 r 1. (20 r 5 is wrong because 5 more is enough for another group of 4.)",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "158 students are going on an excursion. Each bus holds 45 students. How many buses are needed?",
        "4",
        "3 buses hold 3 × 45 = 135 students, leaving 23 students without a seat. They need a 4th bus.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Lachlan saves $14 each week. How many weeks will it take him to save at least $100?",
        "8",
        "7 × $14 = $98, which is just short of $100. After 8 weeks he has 8 × $14 = $112, so 8 weeks.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Pencils come in packs of 12. A teacher buys 8 packs and shares the pencils equally among 24 students. How many pencils does each student get?",
        "4",
        "8 × 12 = 96 pencils. 96 ÷ 24 = 4 pencils each.",
      ),
  ],
});

/** MA3-MR-02: number sentences with multiplication and division, and the order of operations. */
export const NUMBER_SENTENCES = levels(5040101, {
  very_easy: [
    (n) => typed("fill_blank", n, "6 × ___ = 42", "7", "6 × 7 = 42."),
    (n) => typed("short_answer", n, "3 + 4 × 2 = ?", "11", "Multiply before you add: 4 × 2 = 8, then 3 + 8 = 11."),
    (n) =>
      trueFalse(
        n,
        "To work out 10 − 2 × 3, you do the multiplication first.",
        true,
        "Multiplication and division come before addition and subtraction: 2 × 3 = 6, then 10 − 6 = 4.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "___ ÷ 5 = 9", "45", "Use the inverse: 9 × 5 = 45, so 45 ÷ 5 = 9."),
    (n) =>
      choice(
        n,
        "What is 20 − 12 ÷ 4?",
        ["2", "17", "8", "5"],
        1,
        "Divide first: 12 ÷ 4 = 3. Then 20 − 3 = 17. (Working left to right gives 2, which is wrong.)",
      ),
    (n) => trueFalse(n, "(2 + 3) × 4 = 20", true, "Brackets first: 2 + 3 = 5. Then 5 × 4 = 20."),
  ],
  medium: [
    (n) => typed("short_answer", n, "(15 − 7) × 3 = ?", "24", "Brackets first: 15 − 7 = 8. Then 8 × 3 = 24."),
    (n) => typed("fill_blank", n, "8 × ___ = 4 × 12", "6", "4 × 12 = 48, so 8 × ___ must also be 48. 8 × 6 = 48."),
    (n) =>
      choice(
        n,
        "Tia buys 4 packs of 6 stickers and then gets 3 more stickers. Which number sentence shows how many stickers she has?",
        ["4 × 6 + 3", "4 + 6 × 3", "(4 + 6) × 3", "4 × (6 + 3)"],
        0,
        "4 packs of 6 is 4 × 6, then add the 3 extra: 4 × 6 + 3 = 27 stickers.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "36 ÷ (4 + 5) × 2 = ?",
        "8",
        "Brackets first: 4 + 5 = 9. Then work left to right: 36 ÷ 9 = 4, and 4 × 2 = 8.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 24? Choose all that are right.",
        ["2 + 2 × 6", "(2 + 2) × 6", "30 − 3 × 2", "48 ÷ 2 × 1", "4 × 3 + 2"],
        [1, 2, 3],
        "(2 + 2) × 6 = 24, 30 − 6 = 24 and 24 × 1 = 24. But 2 + 2 × 6 = 2 + 12 = 14 and 4 × 3 + 2 = 14.",
      ),
    (n) => typed("fill_blank", n, "5 × 8 = 10 × ___", "4", "5 × 8 = 40, and 10 × 4 = 40. (10 is double 5, so the other number is half of 8.)"),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Where do brackets go to make this true? 6 + 4 × 5 − 2 = 48",
        ["(6 + 4) × 5 − 2", "6 + 4 × (5 − 2)", "(6 + 4) × (5 − 2)", "6 + (4 × 5) − 2"],
        0,
        "(6 + 4) × 5 − 2 = 10 × 5 − 2 = 50 − 2 = 48. The others give 18, 30 and 24.",
      ),
    (n) => typed("fill_blank", n, "(___ + 3) × 4 = 36", "6", "Something × 4 = 36, so the brackets must equal 9. Then ___ + 3 = 9, so ___ = 6."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack buys 3 meat pies at $4 each and pays with a $20 note. How much change does he get?",
        ["8", "$8"],
        "Write it as 20 − 3 × 4. Multiply first: 3 × 4 = 12. Then 20 − 12 = 8, so $8 change.",
      ),
  ],
});

/** MA3-RQF-01: comparing and ordering fractions, and adding and subtracting with the same denominator. */
export const FRACTIONS = levels(5030401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 8, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What fraction of the bar is shaded?",
          ["3/8", "three eighths"],
          "The bar has 8 equal parts and 3 are shaded, so 3/8 is shaded.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "1/2 is bigger than 1/4.",
        true,
        "Cutting something into 2 equal parts makes bigger pieces than cutting it into 4, so 1/2 is bigger.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "2/5 + 1/5 = ?",
        ["3/5", "three fifths"],
        "The parts are the same size (fifths), so add the tops: 2 fifths + 1 fifth = 3 fifths.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which fraction is the largest?",
        ["3/10", "7/10", "5/10", "1/10"],
        1,
        "They are all tenths, so the one with the most tenths is largest: 7/10.",
      ),
    (n) =>
      choice(
        n,
        "Which fraction is equal to 1/2?",
        ["3/6", "2/6", "3/5", "4/10"],
        0,
        "3 is half of 6, so 3/6 is one half. 4/10 would need 5 tenths to be a half.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 5, dotAt: 2 },
        typed(
          "short_answer",
          n,
          "What fraction is shown by the dot on the number line?",
          ["2/5", "two fifths"],
          "The line from 0 to 1 is cut into 5 equal jumps, so each jump is 1/5. The dot is 2 jumps along: 2/5.",
        ),
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["1/8", "1/5", "1/3", "1/2"],
        "When the top number is 1, a bigger bottom number means smaller pieces. So 1/8 is smallest and 1/2 is largest.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "7/8 − 3/8 = ?",
        ["4/8", "1/2", "one half"],
        "Both are eighths, so subtract the tops: 7 eighths − 3 eighths = 4 eighths, which is also one half.",
      ),
    (n) =>
      multi(
        n,
        "Which fractions are bigger than 1/2? Choose all that are right.",
        ["3/4", "2/5", "5/8", "1/3", "4/6"],
        [0, 2, 4],
        "Half of 4 is 2, half of 8 is 4 and half of 6 is 3, so 3/4, 5/8 and 4/6 are more than half. 2/5 and 1/3 are less.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is bigger, 2/3 or 3/4?",
        ["2/3", "3/4", "They are equal"],
        1,
        "2/3 is 1/3 away from a whole and 3/4 is only 1/4 away. 1/4 is a smaller gap, so 3/4 is bigger.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "3/5 + 4/5 = ?",
        ["7/5", "1 2/5"],
        "3 fifths + 4 fifths = 7 fifths. 5 fifths make 1 whole, so 7/5 is the same as 1 and 2/5.",
      ),
    (n) =>
      trueFalse(
        n,
        "5/6 is closer to 1 whole than 3/4 is.",
        true,
        "5/6 is 1/6 short of a whole and 3/4 is 1/4 short. 1/6 is smaller than 1/4, so 5/6 is closer to 1.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["3/10", "2/5", "1/2", "5/8", "3/4"],
        "Compare each with 1/2. 3/10 and 2/5 (= 4/10) are less than half, and 3/10 is smaller. 5/8 and 3/4 (= 6/8) are more than half, and 5/8 is smaller.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pizza is cut into 8 equal slices. Ava ate 3/8 of the pizza and Ben ate 2/8. What fraction of the pizza is left?",
        ["3/8", "three eighths"],
        "They ate 3/8 + 2/8 = 5/8. The whole pizza is 8/8, so 8/8 − 5/8 = 3/8 is left.",
      ),
    (n) =>
      choice(
        n,
        "Which fraction is the largest?",
        ["2/3", "5/6", "7/10", "3/4"],
        1,
        "Look at how far each is from 1 whole: 1/3, 1/6, 3/10 and 1/4. The smallest gap is 1/6, so 5/6 is the largest.",
      ),
  ],
});

/** MA3-RQF-02: 1/2, 1/4, 1/5 and 1/10 of measures and quantities. */
export const FRACTION_OF = levels(5030501, {
  very_easy: [
    (n) =>
      pic(
        { kind: "array", rows: 2, columns: 10 },
        typed(
          "short_answer",
          n,
          "Look at the dots. How many dots are in 1/2 of them?",
          "10",
          "There are 2 rows of 10, so 20 dots. Half of 20 is 10, which is one row.",
        ),
      ),
    (n) => typed("short_answer", n, "What is 1/10 of 50?", "5", "To find one tenth, divide by 10: 50 ÷ 10 = 5."),
    (n) =>
      trueFalse(
        n,
        "To find 1/4 of a number, you can halve it and then halve it again.",
        true,
        "Half of a half is a quarter. For example, half of 20 is 10, and half of 10 is 5, which is 1/4 of 20.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is 1/4 of 24?", "6", "Divide by 4: 24 ÷ 4 = 6. Or halve 24 to get 12, then halve again to get 6."),
    (n) =>
      choice(n, "What is 1/5 of 35?", ["5", "7", "30", "175"], 1, "To find one fifth, divide by 5: 35 ÷ 5 = 7."),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 10, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "Look at the ribbon on the ruler. Ella cuts off 1/2 of it. How long is the piece she cuts off?",
          ["5", "5 cm"],
          "The ribbon is 10 cm long. Half of 10 cm is 5 cm.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1/4 of 1 kilogram, in grams?",
        ["250", "250 g"],
        "1 kg = 1000 g. 1000 ÷ 4 = 250, so 1/4 of a kilogram is 250 g.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 500, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "Look at the water in the jug. Kai pours out 1/5 of it. How many millilitres does he pour out?",
          ["100", "100 mL"],
          "The jug has 500 mL of water. 1/5 of 500 is 500 ÷ 5 = 100 mL.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is 1/10 of $30?",
        ["$3", "$10", "$0.30", "$300"],
        0,
        "Divide by 10: $30 ÷ 10 = $3.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1/4 of 2 hours, in minutes?",
        ["30", "30 minutes"],
        "2 hours = 120 minutes. 120 ÷ 4 = 30 minutes.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 6? Choose all that are right.",
        ["1/2 of 12", "1/4 of 24", "1/5 of 25", "1/10 of 60", "1/4 of 20"],
        [0, 1, 3],
        "12 ÷ 2 = 6, 24 ÷ 4 = 6 and 60 ÷ 10 = 6. But 25 ÷ 5 = 5 and 20 ÷ 4 = 5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1/5 of 1 metre, in centimetres?",
        ["20", "20 cm"],
        "1 m = 100 cm. 100 ÷ 5 = 20, so 1/5 of a metre is 20 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "In a class of 30 students, 1/2 play netball, 1/5 play cricket and the rest go swimming. How many go swimming?",
        "9",
        "1/2 of 30 is 15 and 1/5 of 30 is 6. 15 + 6 = 21 play a sport, so 30 − 21 = 9 go swimming.",
      ),
    (n) =>
      choice(
        n,
        "Which is more: 1/4 of 80 or 1/5 of 90?",
        ["1/4 of 80", "1/5 of 90", "They are equal"],
        0,
        "1/4 of 80 is 80 ÷ 4 = 20. 1/5 of 90 is 90 ÷ 5 = 18. 20 is more.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "1/10 of a number is 7. What is the number?",
        "70",
        "If one tenth is 7, then all ten tenths are 10 × 7 = 70.",
      ),
  ],
});

/** MA3-DATA-01: graphs with many-to-one scales. */
export const GRAPHS = levels(5070101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite pets in 5M",
          thing: "children",
          each: 2,
          rows: [
            { label: "Dogs", count: 4 },
            { label: "Cats", count: 3 },
            { label: "Fish", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children chose dogs?",
          "8",
          "Each star stands for 2 children. Dogs has 4 stars, and 4 × 2 = 8 children.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph where each symbol stands for 10, three symbols mean 30.",
        true,
        "Each symbol is worth 10, so 3 symbols are 3 × 10 = 30.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cans collected",
          columns: [
            { label: "Mon", value: 15 },
            { label: "Tue", value: 20 },
            { label: "Wed", value: 10 },
          ],
          step: 5,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many cans were collected on Tuesday?",
          "20",
          "The Tuesday column reaches the line marked 20.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite pets in 5M",
          thing: "children",
          each: 2,
          rows: [
            { label: "Dogs", count: 4 },
            { label: "Cats", count: 3 },
            { label: "Fish", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more children chose dogs than cats?",
          "2",
          "Dogs has 1 more star than cats. Each star is 2 children, so that is 2 more children (8 − 6 = 2).",
        ),
      ),
    (n) =>
      choice(
        n,
        "A picture graph uses one symbol for every 5 votes. How many symbols show 30 votes?",
        ["5", "6", "30", "25"],
        1,
        "Each symbol is 5 votes. 30 ÷ 5 = 6 symbols.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Kilometres cycled",
          columns: [
            { label: "Lily", value: 40 },
            { label: "Max", value: 70 },
            { label: "Zara", value: 50 },
          ],
          step: 10,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. The numbers up the side go up in equal steps. How big is each step?",
          "10",
          "The numbers on the side go 0, 10, 20, 30 and so on, so each step is 10.",
        ),
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Jai counted 120, 80, 150 and 60 cars on four days. Which scale suits a column graph of this data best?",
        ["each line stands for 1 car", "each line stands for 10 cars", "each line stands for 100 cars", "each line stands for 3 cars"],
        1,
        "Counting by 10s reaches 150 in 15 lines and all four numbers land on a line. By 1s or 3s you'd need far too many lines; by 100s the columns would be hard to read.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Fish caught",
          thing: "fish",
          each: 4,
          rows: [
            { label: "Ana", count: 3 },
            { label: "Bo", count: 5 },
            { label: "Cy", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many fish did Bo catch?",
          "20",
          "Each star stands for 4 fish. Bo has 5 stars, and 5 × 4 = 20 fish.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Museum visitors",
          columns: [
            { label: "Mon", value: 75 },
            { label: "Tue", value: 125 },
            { label: "Wed", value: 100 },
            { label: "Thu", value: 50 },
          ],
          step: 25,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many people visited the museum on Tuesday?",
          "125",
          "The scale goes up by 25. The Tuesday column reaches the line marked 125.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Museum visitors",
          columns: [
            { label: "Mon", value: 75 },
            { label: "Tue", value: 125 },
            { label: "Wed", value: 100 },
            { label: "Thu", value: 50 },
          ],
          step: 25,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many people visited the museum altogether over the four days?",
          "350",
          "Read each column: 75 + 125 + 100 + 50 = 350 visitors.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph where each symbol stands for 4 people, half a symbol stands for 2 people.",
        true,
        "Half of 4 is 2, so half a symbol shows 2 people.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each symbol stands for 6 ice creams sold. Thursday shows 3 and a half symbols. How many ice creams were sold on Thursday?",
        "21",
        "3 symbols are 3 × 6 = 18. Half a symbol is half of 6, which is 3. 18 + 3 = 21.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Mel wants to show 18, 24, 30 and 36 in a picture graph using whole symbols only. Which key works?",
        ["1 symbol = 4", "1 symbol = 5", "1 symbol = 6", "1 symbol = 10"],
        2,
        "18, 24, 30 and 36 are all multiples of 6 (3, 4, 5 and 6 symbols). 18 and 30 aren't multiples of 4, and 18 isn't a multiple of 5 or 10.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cans recycled",
          columns: [
            { label: "5K", value: 150 },
            { label: "5M", value: 300 },
            { label: "6R", value: 250 },
            { label: "6T", value: 200 },
          ],
          step: 50,
        },
        multi(
          n,
          "Look at the column graph. Which of these are true? Choose all that are right.",
          ["5M recycled twice as many cans as 5K", "6T recycled 50 more cans than 6R", "5K recycled the fewest cans", "The total is 1000 cans"],
          [0, 2],
          "5M has 300, which is double 5K's 150, and 150 is the smallest. 6T (200) recycled 50 fewer than 6R (250), and the total is 150 + 300 + 250 + 200 = 900.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "On a column graph the lines go up by 20. A column stops exactly halfway between the 60 line and the 80 line. What number does it show?",
        "70",
        "Halfway between 60 and 80 is 70, because 70 is 10 more than 60 and 10 less than 80.",
      ),
  ],
});

/** MA3-DATA-02: interpreting data displays, including timelines and line graphs. */
export const DATA = levels(5070201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Temperature in Dubbo (°C)",
          points: [
            { label: "6am", value: 12 },
            { label: "9am", value: 16 },
            { label: "12pm", value: 24 },
            { label: "3pm", value: 28 },
            { label: "6pm", value: 20 },
          ],
          step: 4,
        },
        typed(
          "short_answer",
          n,
          "Look at the line graph. What was the temperature at 9am?",
          ["16", "16°C", "16 °C", "16 degrees"],
          "Find 9am along the bottom, go up to the line, then across to the side: 16°C.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Temperature in Dubbo (°C)",
          points: [
            { label: "6am", value: 12 },
            { label: "9am", value: 16 },
            { label: "12pm", value: 24 },
            { label: "3pm", value: 28 },
            { label: "6pm", value: 20 },
          ],
          step: 4,
        },
        choice(
          n,
          "Look at the line graph. At what time was it hottest?",
          ["9am", "12pm", "3pm", "6pm"],
          2,
          "The highest point on the line is at 3pm, at 28°C.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A line graph is a good way to show how something changes over time.",
        true,
        "A line graph joins the points in time order, so you can see the line go up and down as time passes.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Temperature in Dubbo (°C)",
          points: [
            { label: "6am", value: 12 },
            { label: "9am", value: 16 },
            { label: "12pm", value: 24 },
            { label: "3pm", value: 28 },
            { label: "6pm", value: 20 },
          ],
          step: 4,
        },
        typed(
          "short_answer",
          n,
          "Look at the line graph. By how many degrees did the temperature rise from 6am to 12pm?",
          ["12", "12°C", "12 °C", "12 degrees"],
          "It was 12°C at 6am and 24°C at 12pm. 24 − 12 = 12 degrees.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these events on a timeline in order, earliest first.",
        [
          "First Fleet arrives in Sydney Cove (1788)",
          "Gold is found near Bathurst (1851)",
          "Federation of Australia (1901)",
          "Sydney Opera House opens (1973)",
        ],
        "Order the years from smallest to largest: 1788, 1851, 1901, 1973.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Year", "Koalas counted"],
          rows: [
            ["2021", 48],
            ["2022", 42],
            ["2023", 36],
            ["2024", 45],
          ],
        },
        choice(
          n,
          "The table shows koalas counted in a national park each year. Between which two years did the number go up?",
          ["2021 to 2022", "2022 to 2023", "2023 to 2024"],
          2,
          "The count went down from 48 to 42 to 36, then up from 36 to 45 between 2023 and 2024.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Plant height (cm)",
          points: [
            { label: "Week 1", value: 2 },
            { label: "Week 2", value: 4 },
            { label: "Week 3", value: 10 },
            { label: "Week 4", value: 12 },
            { label: "Week 5", value: 14 },
          ],
          step: 2,
        },
        choice(
          n,
          "Look at the line graph. In which week did the plant grow the most?",
          ["Week 1 to Week 2", "Week 2 to Week 3", "Week 3 to Week 4", "Week 4 to Week 5"],
          1,
          "The line is steepest from Week 2 to Week 3: it grew from 4 cm to 10 cm, which is 6 cm. Every other week it grew 2 cm.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "On a timeline, the First Fleet arrived in 1788 and Federation happened in 1901. How many years apart are these events?",
        ["113", "113 years"],
        "1901 − 1788: count up 12 years to 1800, then 101 years to 1901. 12 + 101 = 113 years.",
      ),
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Plant height (cm)",
          points: [
            { label: "Week 1", value: 2 },
            { label: "Week 2", value: 4 },
            { label: "Week 3", value: 10 },
            { label: "Week 4", value: 12 },
            { label: "Week 5", value: 14 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "Look at the line graph. How much did the plant grow altogether from Week 1 to Week 5?",
          ["12", "12 cm"],
          "It was 2 cm in Week 1 and 14 cm in Week 5. 14 − 2 = 12 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Water in a farm tank (L)",
          points: [
            { label: "Mon", value: 800 },
            { label: "Tue", value: 650 },
            { label: "Wed", value: 500 },
            { label: "Thu", value: 500 },
            { label: "Fri", value: 900 },
          ],
          step: 100,
        },
        multi(
          n,
          "Look at the line graph. Which of these are true? Choose all that are right.",
          [
            "The water level fell on Tuesday and on Wednesday",
            "The level stayed the same from Wednesday to Thursday",
            "It probably rained between Thursday and Friday",
            "The tank was fullest on Monday",
          ],
          [0, 1, 2],
          "The line goes down to Wednesday, is flat to Thursday, then jumps up to 900 L on Friday, so water was added, probably by rain. Friday (900 L), not Monday, was fullest.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Water in a farm tank (L)",
          points: [
            { label: "Mon", value: 800 },
            { label: "Tue", value: 650 },
            { label: "Wed", value: 500 },
            { label: "Thu", value: 500 },
            { label: "Fri", value: 900 },
          ],
          step: 100,
        },
        typed(
          "short_answer",
          n,
          "Look at the line graph. How many litres of water were used from Monday to Wednesday?",
          ["300", "300 L"],
          "It went from 800 L on Monday to 500 L on Wednesday. 800 − 500 = 300 L.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A timeline from 1950 to 2000 is split into 5 equal parts. Each part stands for 10 years.",
        true,
        "From 1950 to 2000 is 50 years. 50 ÷ 5 = 10 years for each part.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Water in a farm tank (L)",
          points: [
            { label: "Mon", value: 800 },
            { label: "Tue", value: 650 },
            { label: "Wed", value: 500 },
            { label: "Thu", value: 500 },
            { label: "Fri", value: 900 },
          ],
          step: 100,
        },
        choice(
          n,
          "Look at the line graph. Between which two days did the amount of water change the most?",
          ["Mon to Tue", "Tue to Wed", "Wed to Thu", "Thu to Fri"],
          3,
          "The changes are 150 L down, 150 L down, no change, then 400 L up. The biggest change is Thursday to Friday.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A line graph shows a puppy's mass going up steadily, from 4 kg at 2 months old to 10 kg at 6 months old. About what was its mass at 4 months old?",
        ["6 kg", "7 kg", "8 kg", "5 kg"],
        1,
        "4 months is halfway between 2 and 6 months. Halfway between 4 kg and 10 kg is 7 kg.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Event", "Year"],
          rows: [
            ["Opal is born", 2012],
            ["Opal's sister is born", 2016],
            ["Opal starts school", 2018],
            ["Family moves to Wollongong", 2020],
          ],
        },
        choice(
          n,
          "The table shows events for a timeline of Opal's life. Which event is exactly halfway between Opal being born and the family moving?",
          ["Opal's sister is born", "Opal starts school", "None of them"],
          0,
          "From 2012 to 2020 is 8 years. Half of 8 is 4, and 2012 + 4 = 2016, the year her sister was born.",
        ),
      ),
  ],
});

/** MA3-CHAN-01: chance experiments and probability from 0 to 1. */
export const CHANCE = levels(5070301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow"] },
        choice(
          n,
          "What is the probability of this spinner landing on red?",
          ["1/4", "1/3", "3/4", "1/2"],
          0,
          "There are 4 equal parts and 1 is red, so the probability is 1 out of 4, or 1/4.",
        ),
      ),
    (n) => trueFalse(n, "An event that is impossible has a probability of 0.", true, "Probability goes from 0 (impossible) to 1 (certain)."),
    (n) =>
      choice(
        n,
        "Which word best describes a probability of 1?",
        ["certain", "impossible", "even chance", "unlikely"],
        0,
        "A probability of 1 means it will definitely happen, so it is certain.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "blue", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the probability of picking red? Write it as a fraction.",
          ["3/8", "three eighths"],
          "There are 3 + 5 = 8 counters and 3 are red, so the probability is 3/8.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "You roll a normal dice numbered 1 to 6. What is the probability of rolling a 4? Write it as a fraction.",
        ["1/6", "one sixth"],
        "There are 6 equally likely numbers and only one of them is 4, so the probability is 1/6.",
      ),
    (n) =>
      ordering(
        n,
        "Put these chance words in order from least likely to most likely.",
        ["impossible", "unlikely", "even chance", "likely", "certain"],
        "Impossible has probability 0, even chance is 1/2 and certain is 1. Unlikely sits between 0 and 1/2, and likely between 1/2 and 1.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "red", "blue", "green", "blue"] },
        choice(
          n,
          "What is the probability of this spinner landing on blue?",
          ["4/6", "1/6", "2/6", "4/2"],
          0,
          "There are 6 equal parts and 4 are blue, so the probability is 4/6 (which is the same as 2/3).",
        ),
      ),
    (n) =>
      multi(
        n,
        "You roll a normal dice numbered 1 to 6. Which of these have a probability of 1/2? Choose all that are right.",
        ["Rolling an even number", "Rolling a number less than 4", "Rolling a 6", "Rolling a number greater than 2"],
        [0, 1],
        "Even numbers are 2, 4, 6 (3 out of 6) and less than 4 is 1, 2, 3 (3 out of 6), both 1/2. A 6 is 1/6, and greater than 2 is 4/6.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Noah spun a spinner 20 times. It landed on green 5 times. What fraction of his spins landed on green?",
        ["5/20", "1/4"],
        "5 out of 20 spins is 5/20, which is the same as 1/4.",
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "A probability of 1/2 is the same as a 50% chance.",
        true,
        "1/2 is 50 out of 100, which is 50%. It is an even chance.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "blue", count: 3 },
            { colour: "green", count: 5 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. What is the probability that it is NOT green?",
          ["5/10", "2/10", "3/10", "8/10"],
          0,
          "There are 10 counters. 2 red + 3 blue = 5 are not green, so the probability is 5/10.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella is going to flip a coin 50 times. About how many heads should she expect?",
        "25",
        "Heads has a probability of 1/2, and half of 50 is 25. She may not get exactly 25, but that is the best guess.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "yellow", "blue", "red", "blue", "yellow", "red", "blue"] },
        choice(
          n,
          "Which two colours are equally likely on this spinner?",
          ["red and blue", "red and yellow", "yellow and blue"],
          0,
          "Count the parts: red 3, blue 3 and yellow 2. Red and blue both have 3 out of 8.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 12 counters. The probability of picking a red counter is 1/4. How many red counters are in the bag?",
        "3",
        "1/4 of the counters are red, and 1/4 of 12 is 12 ÷ 4 = 3.",
      ),
    (n) =>
      multi(
        n,
        "A spinner has 10 equal parts: 5 green, 3 orange and 2 purple. Which of these are true? Choose all that are right.",
        [
          "The probability of green is 1/2",
          "Orange is more likely than purple",
          "The probability of purple is 1/5",
          "Landing on green is certain",
        ],
        [0, 1, 2],
        "Green is 5/10 = 1/2, orange (3) beats purple (2), and purple is 2/10 = 1/5. Green is not certain because orange and purple are possible too.",
      ),
  ],
});
