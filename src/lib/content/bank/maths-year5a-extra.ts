/**
 * Year 5 Mathematics, second sets: another 15 questions for each Stage 3 number, algebra,
 * statistics and probability standard in maths-year5a.ts, three at each level from very easy
 * to very hard, pitched at early Stage 3. Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-RN-01: place value of large numbers, rounding, factors, multiples, primes and square numbers. */
export const PLACE_VALUE = levels(5010116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 3 in 83 517?",
        ["3", "300", "3000", "30 000"],
        2,
        "The 3 is in the thousands place, so it is worth 3 thousands, or 3000.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write thirty-two thousand and fifteen in numerals.",
        ["32 015", "32015"],
        "32 thousands, 0 hundreds, 1 ten and 5 ones. The zero holds the hundreds place: 32 015.",
      ),
    (n) => trueFalse(n, "35 is a multiple of 5.", true, "Counting by 5s goes 5, 10, 15, 20, 25, 30, 35, so 35 is a multiple of 5."),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these numbers in order from largest to smallest.",
        ["70 210", "70 120", "67 999", "60 721"],
        "Compare the ten thousands, then the thousands, then the hundreds: 70 210, 70 120, 67 999, 60 721.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "56 304 = 50 000 + 6000 + ___ + 4",
        "300",
        "56 304 is 5 ten thousands, 6 thousands, 3 hundreds, 0 tens and 4 ones. The missing part is 3 hundreds, which is 300.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 20000, to: 30000, jumps: 10, dotAt: 3 },
        typed(
          "short_answer",
          n,
          "Look at the number line. Round the number at the dot to the nearest ten thousand.",
          ["20 000", "20000"],
          "The line from 20 000 to 30 000 has 10 jumps, so each jump is 1000. The dot is at 23 000, which is closer to 20 000.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 73 650 to the nearest hundred.",
        ["73 700", "73700"],
        "73 650 is between 73 600 and 73 700. The tens digit is 5, so round up to 73 700.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are multiples of 7? Choose all that are right.",
        ["14", "27", "35", "49", "54"],
        [0, 2, 3],
        "7 × 2 = 14, 7 × 5 = 35 and 7 × 7 = 49. 27 and 54 are not in the 7 times table.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The factors of 18 are 1, 2, 3, ___, 9 and 18.",
        "6",
        "Factors come in pairs that multiply to 18: 1 × 18, 2 × 9 and 3 × 6. The missing factor is 6.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 584 299 to the nearest thousand.",
        ["584 000", "584000"],
        "584 299 is between 584 000 and 585 000. The hundreds digit is 2, which is less than 5, so round down to 584 000.",
      ),
    (n) =>
      trueFalse(
        n,
        "49 is a prime number.",
        false,
        "7 × 7 = 49, so 49 has the factors 1, 7 and 49. A prime number has only two factors, so 49 is not prime.",
      ),
    (n) =>
      choice(
        n,
        "In which number is the 5 worth 500?",
        ["15 042", "50 214", "21 504", "42 150"],
        2,
        "In 21 504 the 5 is in the hundreds place, so it is worth 500. In the others it is worth 5000, 50 000 and 50.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the largest number that is a factor of both 12 and 18?",
        "6",
        "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The largest number in both lists is 6.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are square numbers? Choose all that are right.",
        ["16", "24", "49", "50", "64"],
        [0, 2, 4],
        "4 × 4 = 16, 7 × 7 = 49 and 8 × 8 = 64. 24 and 50 can't be made by multiplying a number by itself.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Using the digits 4, 8, 1, 6 and 2 once each, what is the largest even 5-digit number you can make?",
        ["86 412", "86412"],
        "An even number must end in 2, 4, 6 or 8. Put the smallest even digit, 2, at the end, and the rest from biggest to smallest in front: 86 412.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to thousandths. */
export const DECIMALS = levels(5030116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 7 },
        choice(
          n,
          "Which decimal is shown by the dot on the number line?",
          ["0.7", "7", "0.07", "0.17"],
          0,
          "The line from 0 to 1 has 10 equal jumps, so each jump is 0.1. The dot is 7 jumps along: 0.7.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "0.8 is greater than 0.75.",
        true,
        "Compare the tenths first: 0.8 has 8 tenths and 0.75 has 7 tenths, so 0.8 is greater (0.80 is more than 0.75).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 4 tenths as a decimal.",
        ["0.4", ".4"],
        "4 tenths goes in the first place after the decimal point: 0.4.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 2 in 5.629?",
        ["2 tenths", "2 hundredths", "2 thousandths", "2 ones"],
        1,
        "After the decimal point the places are tenths, hundredths, then thousandths. The 2 is second, so it is 2 hundredths.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "0.25 = ___ hundredths",
        "25",
        "0.25 is 2 tenths and 5 hundredths. Each tenth is 10 hundredths, so that is 20 + 5 = 25 hundredths.",
      ),
    (n) =>
      ordering(
        n,
        "Put these decimals in order from largest to smallest.",
        ["0.9", "0.81", "0.8", "0.08"],
        "Write them with two places: 0.90, 0.81, 0.80, 0.08. Now compare them from largest to smallest.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 3 and 47 thousandths as a decimal.",
        "3.047",
        "47 thousandths is 0 tenths, 4 hundredths and 7 thousandths, so 3 and 47 thousandths is 3.047.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are less than 0.3? Choose all that are right.",
        ["0.29", "0.31", "0.03", "0.299", "0.4"],
        [0, 2, 3],
        "Write 0.3 as 0.300. Then 0.290, 0.030 and 0.299 are smaller, but 0.310 and 0.400 are bigger.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 2.1, to: 2.2, jumps: 10, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "What number is shown by the dot on the number line?",
          "2.14",
          "From 2.1 to 2.2 is 10 hundredths, so each jump is 0.01. The dot is 4 jumps past 2.1: 2.14.",
        ),
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["1.009", "1.09", "1.1", "1.109", "1.19"],
        "Write them with three places: 1.009, 1.090, 1.100, 1.109, 1.190. Now compare them like whole numbers.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal is the same as 7 + 5/100 + 3/1000?",
        ["7.53", "7.053", "7.503", "7.0053"],
        1,
        "7 ones, 0 tenths, 5 hundredths and 3 thousandths. The zero holds the tenths place: 7.053.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.305 is greater than 0.35.",
        false,
        "Write 0.35 as 0.350. Compare 0.305 and 0.350: the hundredths digit is 0 in the first and 5 in the second, so 0.35 is greater.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "What number is 0.001 less than 6.2?",
        ["6.199", "6.19", "6.1", "6.201"],
        0,
        "Write 6.2 as 6.200. One thousandth less is 6.199.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Three gold nuggets found near Bathurst have masses of 0.075 kg, 0.7 kg and 0.07 kg. What is the mass of the lightest one, in kilograms?",
        ["0.07", ".07", "0.07 kg"],
        "Write them with three places: 0.075, 0.700 and 0.070. The smallest is 0.070, so the lightest is 0.07 kg.",
      ),
    (n) =>
      multi(
        n,
        "Which of these numbers are between 0.6 and 0.61? Choose all that are right.",
        ["0.605", "0.65", "0.609", "0.61", "0.601"],
        [0, 2, 4],
        "Write 0.6 as 0.600 and 0.61 as 0.610. 0.605, 0.609 and 0.601 fit between. 0.650 is too big, and 0.61 is the end number itself, not between.",
      ),
  ],
});

/** MA3-RN-03: benchmark percentages, their fractions and decimals, and percentages of quantities. */
export const PERCENT = levels(5030616, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What does per cent mean?",
        ["out of 100", "out of 10", "out of 1000", "times 100"],
        0,
        "Cent means 100, like 100 cents in a dollar. Per cent means out of 100.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 7 },
        choice(
          n,
          "What percentage of the bar is shaded?",
          ["70%", "7%", "30%", "17%"],
          0,
          "7 out of 10 parts are shaded. 7 out of 10 is the same as 70 out of 100, which is 70%.",
        ),
      ),
    (n) => trueFalse(n, "0% of something means none of it.", true, "0% means 0 out of 100, which is nothing at all."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 10% as a fraction in its simplest form.",
        ["1/10", "one tenth", "a tenth"],
        "10% is 10 out of 100. Ten lots of 10 make 100, so 10% is one tenth, 1/10.",
      ),
    (n) =>
      choice(
        n,
        "Which percentage is equal to 0.25?",
        ["25%", "2.5%", "0.25%", "250%"],
        0,
        "0.25 is 25 hundredths, which is 25 out of 100, or 25%.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 3/4? Choose all that are right.",
        ["75%", "0.75", "34%", "0.34", "6/8"],
        [0, 1, 4],
        "3/4 is 75 out of 100, so it is 75% and 0.75. 6/8 is also 3/4 because both numbers are doubled. 34% and 0.34 just use the digits 3 and 4.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is 10% of 250?", "25", "10% is one tenth. Divide by 10: 250 ÷ 10 = 25."),
    (n) => choice(n, "What is 50% of $18?", ["$9", "$36", "$50", "$1.80"], 0, "50% is one half. Half of $18 is $9."),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What percentage of the circle is shaded?",
          ["75%", "75"],
          "3 out of 4 equal parts are shaded. Each quarter is 25%, so 3 quarters is 75%.",
        ),
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "What is 25% of 64?", "16", "25% is one quarter. Halve 64 to get 32, then halve again to get 16."),
    (n) =>
      ordering(
        n,
        "Put these in order from largest to smallest.",
        ["100%", "0.8", "3/4", "50%", "0.1"],
        "Change them all to decimals: 100% = 1, 0.8, 3/4 = 0.75, 50% = 0.5 and 0.1.",
      ),
    (n) =>
      choice(
        n,
        "A $120 jacket has 10% off. What is the sale price?",
        ["$108", "$12", "$110", "$118"],
        0,
        "10% of $120 is $120 ÷ 10 = $12 off. The sale price is $120 − $12 = $108. ($12 is the saving, not the price.)",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 32 students in 5W. 25% of them have a pet dog. How many students do NOT have a pet dog?",
        "24",
        "25% of 32 is 32 ÷ 4 = 8 students with a dog. 32 − 8 = 24 students without one.",
      ),
    (n) =>
      choice(
        n,
        "Which is more: 10% of 300 or 50% of 50?",
        ["10% of 300", "50% of 50", "They are equal"],
        0,
        "10% of 300 is 300 ÷ 10 = 30. 50% of 50 is half of 50, which is 25. 30 is more.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are true? Choose all that are right.",
        ["50% of 90 is 45", "25% of 40 is 10", "10% of 70 is 0.7", "75% of 20 is 15"],
        [0, 1, 3],
        "Half of 90 is 45, a quarter of 40 is 10, and a quarter of 20 is 5, so 75% is 15. But 10% of 70 is 70 ÷ 10 = 7, not 0.7.",
      ),
  ],
});

/** MA3-AR-01: adding and subtracting whole numbers and decimals. */
export const ADD_SUB = levels(5030216, {
  very_easy: [
    (n) => typed("short_answer", n, "6200 + 2700 = ?", "8900", "6000 + 2000 = 8000 and 200 + 700 = 900, so the total is 8900."),
    (n) => typed("short_answer", n, "0.9 − 0.4 = ?", ["0.5", ".5"], "9 tenths take away 4 tenths leaves 5 tenths, which is 0.5."),
    (n) => trueFalse(n, "10 000 − 1 = 9999", true, "One less than 10 000 is 9999."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "45 678 − 3000 = ?",
        ["42 678", "42678"],
        "Only the thousands change: 45 thousands take away 3 thousands is 42 thousands, so 42 678.",
      ),
    (n) => typed("short_answer", n, "4.7 + 1.8 = ?", "6.5", "4 + 1 = 5 and 0.7 + 0.8 = 1.5. Then 5 + 1.5 = 6.5."),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 6890 − 2110?",
        ["5000", "4000", "9000", "3000"],
        0,
        "6890 is about 7000 and 2110 is about 2000, so the answer is about 7000 − 2000 = 5000.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "36 452 + 27 869 = ?",
        ["64 321", "64321"],
        "Add the thousands: 36 000 + 27 000 = 63 000. Then 452 + 869 = 1321. 63 000 + 1321 = 64 321.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "6.3 − 1.85 = ?",
        "4.45",
        "Write 6.3 as 6.30. Count up from 1.85: 0.15 to 2, then 4.30 to 6.30. 0.15 + 4.30 = 4.45.",
      ),
    (n) =>
      choice(
        n,
        "At the school sausage sizzle, Lily buys a sausage sandwich for $3.50 and a juice for $2.75. How much does she spend?",
        ["$6.25", "$5.25", "$6.15", "$5.75"],
        0,
        "$3 + $2 = $5. 50c + 75c = $1.25. $5 + $1.25 = $6.25.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "80 000 − 47 625 = ?",
        ["32 375", "32375"],
        "Count up from 47 625: 375 to 48 000, then 32 000 to 80 000. 375 + 32 000 = 32 375.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Month", "Visitors to a wildlife park"],
          rows: [
            ["March", "27 384"],
            ["April", "35 106"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How many more people visited in April than in March?",
          "7722",
          "35 106 − 27 384: count up from 27 384. 616 to 28 000, 7000 to 35 000, then 106 to 35 106. 616 + 7000 + 106 = 7722.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these have an answer of exactly 5? Choose all that are right.",
        ["8.2 − 3.2", "2.75 + 2.25", "10 − 5.5", "1.6 + 3.4"],
        [0, 1, 3],
        "8.2 − 3.2 = 5, 2.75 + 2.25 = 5 and 1.6 + 3.4 = 5. But 10 − 5.5 = 4.5.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Oscar had $50. He spent $18.45 on a cricket ball and $12.80 on a cap. How much money does he have left?",
        ["18.75", "$18.75"],
        "He spent $18.45 + $12.80 = $31.25. He has $50 − $31.25 = $18.75 left.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A car's trip meter read 12 846 km at the start of a holiday and 14 203 km at the end. How many kilometres did the family drive?",
        ["1357", "1357 km"],
        "14 203 − 12 846: count up 154 to 13 000, then 1203 to 14 203. 154 + 1203 = 1357 km.",
      ),
    (n) =>
      choice(
        n,
        "Three parcels have masses of 2.45 kg, 1.8 kg and 3.25 kg. What is their total mass?",
        ["7.5 kg", "6.7 kg", "7.05 kg", "8.5 kg"],
        0,
        "2.45 + 1.8 = 4.25 (write 1.8 as 1.80). Then 4.25 + 3.25 = 7.5 kg.",
      ),
  ],
});

/** MA3-MR-01: multiplication and division strategies. */
export const MULT_DIV = levels(5020116, {
  very_easy: [
    (n) => typed("short_answer", n, "8 × 9 = ?", "72", "8 × 9 = 72. Think 8 × 10 = 80, then take away one 8: 80 − 8 = 72."),
    (n) =>
      pic(
        { kind: "array", rows: 7, columns: 8 },
        choice(
          n,
          "Which number sentence matches this array?",
          ["7 × 8 = 56", "7 + 8 = 15", "6 × 8 = 48", "7 × 9 = 63"],
          0,
          "There are 7 rows with 8 dots in each row. 7 × 8 = 56.",
        ),
      ),
    (n) => trueFalse(n, "72 ÷ 8 = 9", true, "8 × 9 = 72, so 72 ÷ 8 = 9."),
  ],
  easy: [
    (n) => typed("short_answer", n, "300 × 4 = ?", "1200", "3 × 4 = 12, and 300 is a hundred times bigger than 3, so 300 × 4 = 1200."),
    (n) =>
      choice(
        n,
        "Which is the same as 6 × 18?",
        ["6 × 10 + 6 × 8", "6 × 10 + 8", "6 + 18", "6 × 1 + 6 × 8"],
        0,
        "Split 18 into 10 and 8, and multiply both parts by 6: 6 × 10 + 6 × 8 = 60 + 48 = 108.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The canteen packs 7 trays of 15 sausage rolls. How many sausage rolls is that?",
        "105",
        "7 × 15 = 7 × 10 + 7 × 5 = 70 + 35 = 105 sausage rolls.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "47 × 3 = ?", "141", "40 × 3 = 120 and 7 × 3 = 21. 120 + 21 = 141."),
    (n) => typed("short_answer", n, "84 ÷ 6 = ?", "14", "Split 84 into 60 and 24. 60 ÷ 6 = 10 and 24 ÷ 6 = 4. 10 + 4 = 14."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 36? Choose all that are right.",
        ["4 × 9", "6 × 6", "5 × 7", "2 × 18", "8 × 4"],
        [0, 1, 3],
        "4 × 9 = 36, 6 × 6 = 36 and 2 × 18 = 36. But 5 × 7 = 35 and 8 × 4 = 32.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Tennis balls come in cans of 4. How many cans are needed to hold 50 balls?",
        ["13", "12", "12 r 2", "14"],
        0,
        "50 ÷ 4 = 12 r 2. 12 cans hold 48 balls, and the 2 left over need one more can, so 13.",
      ),
    (n) => typed("short_answer", n, "326 × 4 = ?", "1304", "300 × 4 = 1200, 20 × 4 = 80 and 6 × 4 = 24. 1200 + 80 + 24 = 1304."),
    (n) =>
      choice(
        n,
        "What is 100 ÷ 7?",
        ["14 r 2", "14 r 1", "13 r 9", "15 r 2"],
        0,
        "7 × 14 = 98, and 100 − 98 = 2 left over. So 100 ÷ 7 = 14 r 2. (13 r 9 is wrong because 9 is enough for another group of 7.)",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "214 students are going to a swimming carnival. Each minibus holds 24 students. How many minibuses are needed?",
        "9",
        "8 minibuses hold 8 × 24 = 192 students, leaving 22 students. They need a 9th minibus. (9 × 24 = 216, which is enough.)",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Zoe has $150. Show tickets cost $26 each. What is the greatest number of tickets she can buy?",
        "5",
        "5 × $26 = $130, which she can afford. 6 × $26 = $156, which is more than $150. So she can buy 5 tickets.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cafe bakes 9 trays of 6 muffins and packs them into boxes of 4. How many boxes can it fill completely?",
        "13",
        "9 × 6 = 54 muffins. 54 ÷ 4 = 13 r 2, so 13 boxes are full and 2 muffins are left over.",
      ),
  ],
});

/** MA3-MR-02: number sentences with multiplication and division, and the order of operations. */
export const NUMBER_SENTENCES = levels(5040116, {
  very_easy: [
    (n) => typed("fill_blank", n, "___ × 8 = 56", "7", "7 × 8 = 56."),
    (n) => typed("short_answer", n, "5 + 3 × 4 = ?", "17", "Multiply before you add: 3 × 4 = 12, then 5 + 12 = 17."),
    (n) =>
      trueFalse(
        n,
        "12 − 2 × 5 = 50",
        false,
        "Multiply first: 2 × 5 = 10. Then 12 − 10 = 2, not 50. (50 comes from wrongly doing 12 − 2 first.)",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "54 ÷ ___ = 9", "6", "Use the inverse: 9 × 6 = 54, so 54 ÷ 6 = 9."),
    (n) =>
      choice(
        n,
        "What is 18 + 6 ÷ 3?",
        ["20", "8", "24", "12"],
        0,
        "Divide first: 6 ÷ 3 = 2. Then 18 + 2 = 20. (Working left to right gives 8, which is wrong.)",
      ),
    (n) => trueFalse(n, "(10 − 4) × 2 = 12", true, "Brackets first: 10 − 4 = 6. Then 6 × 2 = 12."),
  ],
  medium: [
    (n) => typed("short_answer", n, "(9 + 3) ÷ 4 = ?", "3", "Brackets first: 9 + 3 = 12. Then 12 ÷ 4 = 3."),
    (n) => typed("fill_blank", n, "6 × ___ = 3 × 10", "5", "3 × 10 = 30, so 6 × ___ must also be 30. 6 × 5 = 30."),
    (n) =>
      choice(
        n,
        "Max has 5 bags of 8 marbles. He gives away 6 marbles. Which number sentence shows how many marbles he has left?",
        ["5 × 8 − 6", "5 × (8 − 6)", "5 + 8 − 6", "5 + 8 × 6"],
        0,
        "5 bags of 8 is 5 × 8, then take away the 6 he gives away: 5 × 8 − 6 = 40 − 6 = 34 marbles.",
      ),
  ],
  hard: [
    (n) =>
      typed("short_answer", n, "48 ÷ (2 × 3) + 5 = ?", "13", "Brackets first: 2 × 3 = 6. Then divide: 48 ÷ 6 = 8. Last, add: 8 + 5 = 13."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 20? Choose all that are right.",
        ["4 + 4 × 4", "(4 + 1) × 4", "30 − 5 × 2", "2 × 5 + 2", "100 ÷ (5 × 2)"],
        [0, 1, 2],
        "4 + 16 = 20, 5 × 4 = 20 and 30 − 10 = 20. But 2 × 5 + 2 = 12 and 100 ÷ 10 = 10.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "9 × 4 = 3 × ___",
        "12",
        "9 × 4 = 36, and 3 × 12 = 36. (3 is a third of 9, so the other number must be 3 times as big as 4.)",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Where do brackets go to make this true? 3 × 4 + 2 × 5 = 70",
        ["(3 × 4 + 2) × 5", "3 × (4 + 2) × 5", "3 × (4 + 2 × 5)", "(3 × 4) + (2 × 5)"],
        0,
        "(3 × 4 + 2) × 5 = (12 + 2) × 5 = 14 × 5 = 70. The others give 90, 42 and 22.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "(20 − ___) ÷ 3 = 4",
        "8",
        "Something ÷ 3 = 4, so the brackets must equal 12. Then 20 − ___ = 12, so ___ = 8.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Emma buys 4 icy poles at $2 each and 2 bottles of water at $3 each. She pays with a $20 note. How much change does she get?",
        ["6", "$6"],
        "Write it as 20 − (4 × 2 + 2 × 3). Inside the brackets: 8 + 6 = 14. Then 20 − 14 = 6, so $6 change.",
      ),
  ],
});

/** MA3-RQF-01: comparing and ordering fractions, and adding and subtracting with the same denominator. */
export const FRACTIONS = levels(5030416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 6, shaded: 5 },
        choice(
          n,
          "What fraction of the circle is shaded?",
          ["5/6", "1/6", "6/5", "1/5"],
          0,
          "The circle has 6 equal parts and 5 are shaded, so 5/6 is shaded.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "1/3 is bigger than 1/2.",
        false,
        "Cutting something into 3 equal parts makes smaller pieces than cutting it into 2, so 1/3 is smaller than 1/2.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "3/7 + 2/7 = ?",
        ["5/7", "five sevenths"],
        "The parts are the same size (sevenths), so add the tops: 3 sevenths + 2 sevenths = 5 sevenths.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which fraction is the smallest?",
        ["5/8", "2/8", "7/8", "4/8"],
        1,
        "They are all eighths, so the one with the fewest eighths is smallest: 2/8.",
      ),
    (n) => typed("fill_blank", n, "1/2 = ___/10", "5", "Half of 10 is 5, so one half is the same as 5 tenths: 1/2 = 5/10."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 8, dotAt: 5 },
        typed(
          "short_answer",
          n,
          "What fraction is shown by the dot on the number line?",
          ["5/8", "five eighths"],
          "The line from 0 to 1 is cut into 8 equal jumps, so each jump is 1/8. The dot is 5 jumps along: 5/8.",
        ),
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from largest to smallest.",
        ["1/2", "1/4", "1/6", "1/10"],
        "When the top number is 1, a smaller bottom number means bigger pieces. So 1/2 is largest and 1/10 is smallest.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "9/10 − 4/10 = ?",
        ["5/10", "1/2", "one half", "five tenths"],
        "Both are tenths, so subtract the tops: 9 tenths − 4 tenths = 5 tenths, which is also one half.",
      ),
    (n) =>
      multi(
        n,
        "Which fractions are smaller than 1/2? Choose all that are right.",
        ["3/8", "4/6", "2/10", "5/8", "2/5"],
        [0, 2, 4],
        "Half of 8 is 4, half of 10 is 5 and half of 5 is 2 and a half, so 3/8, 2/10 and 2/5 are less than half. 4/6 and 5/8 are more.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is bigger, 4/5 or 7/10?",
        ["4/5", "7/10", "They are equal"],
        0,
        "Change fifths to tenths: 4/5 is the same as 8/10. 8/10 is more than 7/10, so 4/5 is bigger.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "5/6 + 4/6 = ?",
        ["9/6", "1 3/6", "1 1/2", "3/2"],
        "5 sixths + 4 sixths = 9 sixths. 6 sixths make 1 whole, so 9/6 is the same as 1 and 3/6, or 1 and a half.",
      ),
    (n) =>
      trueFalse(n, "2/3 is the same as 4/6.", true, "Cut each third in half and you get sixths. 2 thirds become 4 sixths, so 2/3 = 4/6."),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["1/4", "3/8", "1/2", "7/10", "4/5"],
        "1/4 is 2/8, which is less than 3/8, and both are less than half. 7/10 and 4/5 (= 8/10) are more than half, and 7/10 is smaller.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A cake is cut into 12 equal pieces. Jack eats 5/12 of the cake and Mia eats 4/12. What fraction of the cake is left?",
        ["3/12", "1/4", "one quarter", "a quarter"],
        "They ate 5/12 + 4/12 = 9/12. The whole cake is 12/12, so 12/12 − 9/12 = 3/12 is left, which is also 1/4.",
      ),
    (n) =>
      choice(
        n,
        "Which fraction is closest to 1 whole?",
        ["7/8", "9/10", "4/5", "2/3"],
        1,
        "Look at how far each is from 1 whole: 1/8, 1/10, 1/5 and 1/3. The smallest gap is 1/10, so 9/10 is closest.",
      ),
  ],
});

/** MA3-RQF-02: 1/2, 1/4, 1/5 and 1/10 of measures and quantities. */
export const FRACTION_OF = levels(5030516, {
  very_easy: [
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 5 },
        typed(
          "short_answer",
          n,
          "Look at the dots. How many dots are in 1/4 of them?",
          "5",
          "There are 4 rows of 5, so 20 dots. One quarter is one of the 4 rows, which is 5 dots (20 ÷ 4 = 5).",
        ),
      ),
    (n) => choice(n, "What is 1/2 of 90?", ["45", "40", "180", "50"], 0, "To find one half, divide by 2: 90 ÷ 2 = 45."),
    (n) =>
      trueFalse(
        n,
        "To find 1/10 of a number, you divide it by 10.",
        true,
        "One tenth means 1 of 10 equal parts, so you share the number into 10 parts by dividing by 10.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is 1/5 of 40?", "8", "To find one fifth, divide by 5: 40 ÷ 5 = 8."),
    (n) =>
      choice(
        n,
        "What is 1/4 of 36?",
        ["9", "12", "6", "32"],
        0,
        "Divide by 4: 36 ÷ 4 = 9. Or halve 36 to get 18, then halve again to get 9.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 12, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "Look at the ribbon on the ruler. Ben cuts it into 4 equal pieces. How long is each piece?",
          ["3", "3 cm"],
          "The ribbon is 12 cm long. Each piece is 1/4 of it: 12 ÷ 4 = 3 cm.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1/5 of 1 kilogram, in grams?",
        ["200", "200 g"],
        "1 kg = 1000 g. 1000 ÷ 5 = 200, so 1/5 of a kilogram is 200 g.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 800, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "Look at the milk in the jug. Ava uses 1/4 of it in a smoothie. How many millilitres does she use?",
          ["200", "200 mL"],
          "The jug has 800 mL of milk. 1/4 of 800 is 800 ÷ 4 = 200 mL.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is 1/10 of 1 kilometre, in metres?",
        ["100 m", "10 m", "1000 m", "1 m"],
        0,
        "1 km = 1000 m. 1000 ÷ 10 = 100, so 1/10 of a kilometre is 100 m.",
      ),
  ],
  hard: [
    (n) =>
      typed("short_answer", n, "What is 1/5 of an hour, in minutes?", ["12", "12 minutes"], "1 hour = 60 minutes. 60 ÷ 5 = 12 minutes."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 8? Choose all that are right.",
        ["1/2 of 16", "1/4 of 40", "1/5 of 40", "1/10 of 80", "1/5 of 45"],
        [0, 2, 3],
        "16 ÷ 2 = 8, 40 ÷ 5 = 8 and 80 ÷ 10 = 8. But 40 ÷ 4 = 10 and 45 ÷ 5 = 9.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1/4 of $10?",
        ["2.50", "$2.50", "2.5", "$2.5"],
        "Halve $10 to get $5, then halve again to get $2.50.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "At a sausage sizzle, 60 sausages were cooked. 1/2 were sold in the first hour and 1/5 in the second hour. How many sausages were left?",
        "18",
        "1/2 of 60 is 30 and 1/5 of 60 is 12. 30 + 12 = 42 were sold, so 60 − 42 = 18 were left.",
      ),
    (n) =>
      choice(
        n,
        "Which is more: 1/5 of 60 or 1/10 of 130?",
        ["1/5 of 60", "1/10 of 130", "They are equal"],
        1,
        "1/5 of 60 is 60 ÷ 5 = 12. 1/10 of 130 is 130 ÷ 10 = 13. 13 is more.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "1/4 of a number is 9. What is the number?",
        "36",
        "If one quarter is 9, then all four quarters are 4 × 9 = 36.",
      ),
  ],
});

const BOOKS_READ: Picture = {
  kind: "picture_graph",
  title: "Books read in Term 2",
  thing: "books",
  each: 5,
  rows: [
    { label: "Ava", count: 3 },
    { label: "Leo", count: 6 },
    { label: "Kim", count: 4 },
  ],
};

const TICKETS_SOLD: Picture = {
  kind: "column_graph",
  title: "School concert tickets sold",
  columns: [
    { label: "Thu", value: 100 },
    { label: "Fri", value: 150 },
    { label: "Sat", value: 250 },
    { label: "Sun", value: 200 },
  ],
  step: 50,
};

/** MA3-DATA-01: graphs with many-to-one scales. */
export const GRAPHS = levels(5070116, {
  very_easy: [
    (n) =>
      pic(
        BOOKS_READ,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many books did Leo read?",
          "30",
          "Each star stands for 5 books. Leo has 6 stars, and 6 × 5 = 30 books.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph where each symbol stands for 5, four symbols mean 9.",
        false,
        "Each symbol is worth 5, so 4 symbols are 4 × 5 = 20, not 9. (9 comes from adding 4 and 5.)",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Netball goals this season",
          columns: [
            { label: "Swans", value: 30 },
            { label: "Kites", value: 50 },
            { label: "Stars", value: 40 },
          ],
          step: 10,
        },
        choice(
          n,
          "Look at the column graph. Which team scored 40 goals?",
          ["Stars", "Swans", "Kites"],
          0,
          "The Stars column reaches the line marked 40. Swans scored 30 and Kites scored 50.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        BOOKS_READ,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many books did Ava and Kim read altogether?",
          "35",
          "Ava has 3 stars and Kim has 4, so 7 stars. Each star is 5 books: 7 × 5 = 35 books.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A picture graph uses one symbol for every 10 people. How many symbols show 70 people?",
        ["7", "70", "10", "17"],
        0,
        "Each symbol is 10 people. 70 ÷ 10 = 7 symbols.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Litres of water used in the garden",
          columns: [
            { label: "Mon", value: 60 },
            { label: "Tue", value: 100 },
            { label: "Wed", value: 80 },
          ],
          step: 20,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many more litres were used on Tuesday than on Monday?",
          ["40", "40 L"],
          "The scale goes up by 20. Tuesday reaches 100 and Monday reaches 60. 100 − 60 = 40 L.",
        ),
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Sally counted 25, 45, 30 and 50 birds in four surveys. Which scale suits a column graph of this data best?",
        ["each line stands for 5 birds", "each line stands for 1 bird", "each line stands for 100 birds", "each line stands for 20 birds"],
        0,
        "All four numbers are multiples of 5, so they land on a line, and 50 needs only 10 lines. By 1s you'd need 50 lines; by 20s or 100s the numbers fall between lines.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Laps of the oval",
          thing: "laps",
          each: 3,
          rows: [
            { label: "Tom", count: 4 },
            { label: "Ivy", count: 6 },
            { label: "Raj", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many laps did Ivy run?",
          "18",
          "Each star stands for 3 laps. Ivy has 6 stars, and 6 × 3 = 18 laps.",
        ),
      ),
    (n) =>
      pic(
        TICKETS_SOLD,
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many tickets were sold on Saturday?",
          "250",
          "The scale goes up by 50. The Saturday column reaches the line marked 250.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        TICKETS_SOLD,
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many tickets were sold altogether over the four days?",
          "700",
          "Read each column: 100 + 150 + 250 + 200 = 700 tickets.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph where each symbol stands for 8 cars, a quarter of a symbol stands for 2 cars.",
        true,
        "A quarter of 8 is 8 ÷ 4 = 2, so a quarter of a symbol shows 2 cars.",
      ),
    (n) =>
      choice(
        n,
        "In a picture graph, each symbol stands for 20 kangaroos. How should 50 kangaroos be shown?",
        ["2 and a half symbols", "5 symbols", "2 symbols", "3 and a half symbols"],
        0,
        "2 symbols are 2 × 20 = 40 kangaroos. 10 more is half of 20, so add half a symbol: 2 and a half symbols.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In a picture graph, 1 symbol stands for 6 people. How should 27 people be shown?",
        ["4 and a half symbols", "4 symbols", "27 symbols", "5 and a half symbols"],
        0,
        "4 symbols are 4 × 6 = 24 people. 3 more is half of 6, so add half a symbol: 4 and a half symbols.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Kilograms of rubbish collected",
          columns: [
            { label: "3A", value: 60 },
            { label: "4B", value: 120 },
            { label: "5C", value: 100 },
            { label: "6D", value: 40 },
          ],
          step: 20,
        },
        multi(
          n,
          "Look at the column graph. Which of these are true? Choose all that are right.",
          [
            "4B collected three times as much as 6D",
            "5C collected 40 kg more than 3A",
            "3A and 6D together collected as much as 5C",
            "The total is 300 kg",
          ],
          [0, 1, 2],
          "4B has 120, which is 3 × 40. 5C (100) is 40 more than 3A (60). 3A + 6D = 60 + 40 = 100, the same as 5C. The total is 60 + 120 + 100 + 40 = 320 kg, not 300.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "On a column graph the lines go up by 5. The tallest column shows 85. How many lines up from 0 is the top of that column?",
        "17",
        "Each line is 5 more than the one below. 85 ÷ 5 = 17, so the top is 17 lines up.",
      ),
  ],
});

const BROKEN_HILL: Picture = {
  kind: "line_graph",
  title: "Temperature in Broken Hill (°C)",
  points: [
    { label: "6am", value: 15 },
    { label: "9am", value: 20 },
    { label: "12pm", value: 30 },
    { label: "3pm", value: 35 },
    { label: "6pm", value: 25 },
    { label: "9pm", value: 20 },
  ],
  step: 5,
};

const PUPPY_MASS: Picture = {
  kind: "line_graph",
  title: "Puppy's mass (kg)",
  points: [
    { label: "Month 1", value: 2 },
    { label: "Month 2", value: 4 },
    { label: "Month 3", value: 7 },
    { label: "Month 4", value: 9 },
    { label: "Month 5", value: 10 },
  ],
  step: 1,
};

const CAR_PARK: Picture = {
  kind: "line_graph",
  title: "Cars in the school car park",
  points: [
    { label: "7am", value: 10 },
    { label: "8am", value: 40 },
    { label: "9am", value: 60 },
    { label: "10am", value: 60 },
    { label: "11am", value: 40 },
  ],
  step: 10,
};

/** MA3-DATA-02: interpreting data displays, including timelines and line graphs. */
export const DATA = levels(5070216, {
  very_easy: [
    (n) =>
      pic(
        BROKEN_HILL,
        typed(
          "short_answer",
          n,
          "Look at the line graph. What was the temperature at 12pm?",
          ["30", "30°C", "30 °C", "30 degrees"],
          "Find 12pm along the bottom, go up to the line, then across to the side: 30°C.",
        ),
      ),
    (n) =>
      pic(
        BROKEN_HILL,
        choice(
          n,
          "Look at the line graph. At what time was it coolest?",
          ["6am", "9am", "6pm", "9pm"],
          0,
          "The lowest point on the line is at 6am, at 15°C.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a timeline, events are placed in the order they happened.",
        true,
        "A timeline is like a number line for dates. Earlier events go first and later events go further along.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        BROKEN_HILL,
        typed(
          "short_answer",
          n,
          "Look at the line graph. By how many degrees did the temperature drop from 3pm to 9pm?",
          ["15", "15°C", "15 °C", "15 degrees"],
          "It was 35°C at 3pm and 20°C at 9pm. 35 − 20 = 15 degrees.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these events on a timeline in order, earliest first.",
        [
          "Captain Cook sails along the east coast (1770)",
          "Sydney Harbour Bridge opens (1932)",
          "First TV broadcast in Australia (1956)",
          "Sydney Olympic Games (2000)",
        ],
        "Order the years from smallest to largest: 1770, 1932, 1956, 2000.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Year", "Platypus sightings"],
          rows: [
            ["2020", 15],
            ["2021", 22],
            ["2022", 19],
            ["2023", 26],
          ],
        },
        choice(
          n,
          "The table shows platypus sightings in a creek each year. Between which two years did the number go down?",
          ["2020 to 2021", "2021 to 2022", "2022 to 2023"],
          1,
          "The count went up from 15 to 22, then down from 22 to 19 between 2021 and 2022, then up again to 26.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        PUPPY_MASS,
        choice(
          n,
          "Look at the line graph. Between which months did the puppy gain the most mass?",
          ["Month 1 to Month 2", "Month 2 to Month 3", "Month 3 to Month 4", "Month 4 to Month 5"],
          1,
          "The line is steepest from Month 2 to Month 3: it went from 4 kg to 7 kg, a gain of 3 kg. The other gains are 2 kg, 2 kg and 1 kg.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "On a timeline, the Sydney Harbour Bridge opened in 1932 and the Sydney Opera House opened in 1973. How many years apart are these events?",
        ["41", "41 years"],
        "1973 − 1932: count up 8 years to 1940, then 33 years to 1973. 8 + 33 = 41 years.",
      ),
    (n) =>
      pic(
        PUPPY_MASS,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How much mass did the puppy gain altogether from Month 1 to Month 5?",
          ["8", "8 kg"],
          "It was 2 kg in Month 1 and 10 kg in Month 5. 10 − 2 = 8 kg.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        CAR_PARK,
        multi(
          n,
          "Look at the line graph. Which of these are true? Choose all that are right.",
          [
            "The number of cars went up from 7am to 9am",
            "The number stayed the same from 9am to 10am",
            "The car park was fullest at 11am",
            "There were 20 fewer cars at 11am than at 10am",
          ],
          [0, 1, 3],
          "The line rises to 60 at 9am, stays flat to 10am, then falls to 40 at 11am, which is 20 fewer. The car park was fullest at 9am and 10am, not 11am.",
        ),
      ),
    (n) =>
      pic(
        CAR_PARK,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How many more cars were there at 9am than at 7am?",
          "50",
          "There were 60 cars at 9am and 10 cars at 7am. 60 − 10 = 50 more cars.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A timeline from 1800 to 2000 is split into 4 equal parts. Each part stands for 40 years.",
        false,
        "From 1800 to 2000 is 200 years. 200 ÷ 4 = 50, so each part stands for 50 years, not 40.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        CAR_PARK,
        choice(
          n,
          "Look at the line graph. Between which two times did the number of cars change the most?",
          ["7am to 8am", "8am to 9am", "9am to 10am", "10am to 11am"],
          0,
          "The changes are 30 up, 20 up, no change, then 20 down. The biggest change is 7am to 8am.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A line graph shows the water in a dam rising steadily from 200 megalitres in January to 500 megalitres in April. About how much water was in the dam in March?",
        ["400 megalitres", "350 megalitres", "300 megalitres", "450 megalitres"],
        0,
        "January to April is 3 months, and the water rose 300 megalitres, so about 100 each month: 300 in February and 400 in March.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Event", "Year"],
          rows: [
            ["Grandpa is born", 1958],
            ["Grandpa moves to Orange", 1970],
            ["Mum is born", 1986],
            ["Ted is born", 2014],
          ],
        },
        typed(
          "short_answer",
          n,
          "The table shows events for a family timeline. How old was Grandpa when Mum was born?",
          ["28", "28 years", "28 years old"],
          "Grandpa was born in 1958 and Mum in 1986. 1986 − 1958: count up 2 to 1960, then 26 to 1986. 2 + 26 = 28 years old.",
        ),
      ),
  ],
});

/** MA3-CHAN-01: chance experiments and probability from 0 to 1. */
export const CHANCE = levels(5070316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "yellow", "green", "yellow"] },
        choice(
          n,
          "What is the probability of this spinner landing on yellow?",
          ["1/2", "1/4", "3/4", "1"],
          0,
          "There are 4 equal parts and 2 are yellow. 2 out of 4 is the same as 1/2.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A probability of 0.9 means something is very likely to happen.",
        true,
        "Probability goes from 0 (impossible) to 1 (certain). 0.9 is very close to 1, so it is very likely.",
      ),
    (n) =>
      choice(
        n,
        "You roll a normal dice numbered 1 to 6. Which word describes the chance of rolling a 7?",
        ["impossible", "unlikely", "even chance", "certain"],
        0,
        "A normal dice has no 7 on it, so rolling a 7 can't happen. It is impossible, with a probability of 0.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "green", count: 4 },
            { colour: "purple", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the probability of picking purple? Write it as a fraction.",
          ["2/6", "1/3", "one third"],
          "There are 4 + 2 = 6 counters and 2 are purple, so the probability is 2/6, which is the same as 1/3.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "You flip a coin. What is the probability of getting tails? Write it as a fraction.",
        ["1/2", "one half", "a half"],
        "A coin has 2 sides that are equally likely, and one is tails, so the probability is 1/2.",
      ),
    (n) =>
      ordering(
        n,
        "Put these probabilities in order from least likely to most likely.",
        ["0", "1/4", "1/2", "3/4", "1"],
        "0 is impossible and 1 is certain. 1/4 is less than 1/2, and 3/4 is more than 1/2.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "orange", "orange", "red", "orange", "orange", "purple", "orange"] },
        choice(
          n,
          "What is the probability of this spinner landing on orange?",
          ["5/8", "3/8", "5/3", "1/8"],
          0,
          "There are 8 equal parts. Count the orange ones: 5. So the probability is 5/8.",
        ),
      ),
    (n) =>
      multi(
        n,
        "You roll a normal dice numbered 1 to 6. Which of these have a probability of 2/6? Choose all that are right.",
        ["Rolling a 1 or a 2", "Rolling a number greater than 4", "Rolling an odd number", "Rolling a 5"],
        [0, 1],
        "1 or 2 is 2 numbers out of 6, and greater than 4 is 5 or 6, also 2 out of 6. Odd numbers are 1, 3, 5 (3 out of 6), and a 5 is 1 out of 6.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Isla took a counter from a bag 40 times, putting it back each time. She got blue 10 times. What fraction of her picks were blue?",
        ["10/40", "1/4"],
        "10 out of 40 picks is 10/40, which is the same as 1/4.",
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "A probability of 0.3 is more likely than a probability of 1/2.",
        false,
        "1/2 is the same as 0.5. 0.3 is less than 0.5, so a probability of 0.3 is less likely.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "yellow", count: 3 },
            { colour: "blue", count: 6 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. Which of these is true?",
          [
            "Blue is twice as likely as red",
            "Red is more likely than yellow",
            "The probability of yellow is 1/2",
            "Picking blue is certain",
          ],
          0,
          "There are 12 counters: 6 blue, 3 red and 3 yellow. Blue has twice as many as red, so it is twice as likely. Red and yellow are equally likely, and yellow is 3/12.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Max is going to roll a normal dice 60 times. About how many times should he expect to roll a 6?",
        "10",
        "Rolling a 6 has a probability of 1/6, and 1/6 of 60 is 60 ÷ 6 = 10. He may not get exactly 10, but that is the best guess.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "green", "blue", "yellow", "green", "blue", "yellow", "blue", "green", "yellow"] },
        choice(
          n,
          "Which colour is most likely on this spinner, and what is its probability?",
          ["blue, 4/10", "blue, 4/6", "green, 3/10", "yellow, 3/7"],
          0,
          "Count the 10 parts: blue 4, green 3 and yellow 3. Blue is most likely, with 4 out of all 10 parts: 4/10.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 20 counters. The probability of picking a green counter is 1/5. How many counters are NOT green?",
        "16",
        "1/5 of 20 is 20 ÷ 5 = 4 green counters. 20 − 4 = 16 counters are not green.",
      ),
    (n) =>
      multi(
        n,
        "A bag has 6 red, 4 blue and 2 white counters. You pick one without looking. Which of these are true? Choose all that are right.",
        [
          "The probability of red is 1/2",
          "Blue is twice as likely as white",
          "The probability of white is 1/6",
          "Picking a black counter is impossible",
          "Picking blue is likely",
        ],
        [0, 1, 2, 3],
        "There are 12 counters. Red is 6/12 = 1/2, blue (4) is twice white (2), white is 2/12 = 1/6, and there are no black ones. Blue is only 4/12, less than half, so it is unlikely, not likely.",
      ),
  ],
});
