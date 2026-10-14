/**
 * Year 6 Mathematics: 15 questions for each Stage 3 standard (NESA outcome), three at each
 * level from very easy to very hard. Year 6 works at the later Stage 3 level, harder than Year 5
 * on the same standard. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA3-RN-01: place value to millions and beyond, negative numbers, primes, composites, square and triangular numbers. */
export const PLACE_VALUE = levels(6040101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 7 in 2 745 316?",
        ["7000", "70 000", "700 000", "7 000 000"],
        2,
        "Read the places from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands. The 7 is in the hundred thousands place, so it is worth 700 000.",
      ),
    (n) => trueFalse(n, "7 is a prime number.", true, "7 has exactly two factors, 1 and 7, so it is prime."),
    (n) =>
      pic(
        { kind: "number_line", from: -5, to: 5, jumps: 10, dotAt: 2, labelEvery: true },
        typed(
          "short_answer",
          n,
          "What number is the dot on?",
          ["-3", "−3"],
          "Each jump is 1. The dot is 2 jumps to the right of −5, so it is on −3.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write four million, sixty thousand and twelve in numerals.",
        ["4 060 012", "4060012"],
        "4 millions, 0 hundred thousands, 6 ten thousands, 0 thousands, 0 hundreds, 1 ten and 2 ones: 4 060 012.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are composite numbers? Choose all that are right.",
        ["9", "13", "15", "21", "2"],
        [0, 2, 3],
        "A composite number has more than two factors. 9 = 3 × 3, 15 = 3 × 5 and 21 = 3 × 7 are composite. 13 and 2 are prime.",
      ),
    (n) =>
      ordering(
        n,
        "Put these temperatures in order from coldest to warmest.",
        ["−8°C", "−3°C", "0°C", "4°C"],
        "Below zero, the bigger the number after the minus sign, the colder it is. So −8 is colder than −3, then 0, then 4.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "The triangular numbers start 1, 3, 6, 10. What is the 6th triangular number?",
        "21",
        "Each one adds the next counting number: 1, 3, 6, 10, then 10 + 5 = 15, then 15 + 6 = 21.",
      ),
    (n) =>
      choice(
        n,
        "Round 6 482 951 to the nearest hundred thousand.",
        ["6 400 000", "6 500 000", "6 480 000", "7 000 000"],
        1,
        "6 482 951 is between 6 400 000 and 6 500 000. The ten thousands digit is 8, so round up to 6 500 000.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The temperature in Orange was −4°C at dawn. It rose 9 degrees by lunch, to ___ °C.",
        "5",
        "Count up from −4: 4 degrees gets to 0, and 5 more gets to 5. 4 + 5 = 9, so it is 5°C.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which number is both a square number and a triangular number?",
        ["16", "36", "25", "45"],
        1,
        "36 = 6 × 6, so it is square, and 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36, so it is triangular. 16 and 25 are only square; 45 is only triangular.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many thousands are there in 3 400 000?",
        "3400",
        "3 000 000 is 3000 thousands and 400 000 is 400 thousands, so there are 3400 thousands.",
      ),
    (n) =>
      trueFalse(
        n,
        "−7 is greater than −2.",
        false,
        "On a number line, −7 is further left than −2, so −7 is smaller. −2 is the greater number.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest prime number greater than 50?",
        "53",
        "51 = 3 × 17 and 52 is even, so neither is prime. 53 has only the factors 1 and 53, so it is the answer.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "At 6 am in Thredbo it was −6°C. By 2 pm it was 11°C. By how many degrees did the temperature rise?",
        "17",
        "From −6 up to 0 is 6 degrees, and from 0 up to 11 is 11 degrees. 6 + 11 = 17 degrees.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are true? Choose all that are right.",
        [
          "Every square number has an odd number of factors",
          "1 is a prime number",
          "Two triangular numbers next to each other add to a square number",
          "All prime numbers are odd",
        ],
        [0, 2],
        "16 has the factors 1, 2, 4, 8, 16 (five of them), because 4 × 4 only counts once. 3 + 6 = 9 and 6 + 10 = 16 are squares. 1 has only one factor, so it is not prime, and 2 is a prime that is even.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to three decimal places. */
export const DECIMALS = levels(6020401, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 5 in 3.285?",
        ["5 tenths", "5 hundredths", "5 thousandths", "5 ones"],
        2,
        "After the decimal point the places are tenths, hundredths, then thousandths. The 5 is third, so it is 5 thousandths.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.6 is the same as 0.600.",
        true,
        "Zeros at the end after the decimal point don't change the value. 6 tenths is 600 thousandths.",
      ),
    (n) =>
      choice(
        n,
        "Which is bigger, 0.45 or 0.405?",
        ["0.45", "0.405", "They are the same"],
        0,
        "Write both with three places: 0.450 and 0.405. 450 thousandths is more than 405 thousandths.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.307", "0.37", "0.703", "0.73"],
        "Write them all with three places: 0.307, 0.370, 0.703, 0.730. Then compare like whole numbers.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 47 thousandths as a decimal.",
        ["0.047", ".047"],
        "47 thousandths is 0 tenths, 4 hundredths and 7 thousandths: 0.047.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0.3, to: 0.4, jumps: 10, dotAt: 6 },
        typed(
          "short_answer",
          n,
          "What number is the dot on?",
          ["0.36", ".36"],
          "From 0.3 to 0.4 is split into 10 jumps, so each jump is 0.01. The dot is 6 jumps past 0.3, which is 0.36.",
        ),
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these are greater than 0.5? Choose all that are right.",
        ["0.51", "0.499", "0.6", "0.095", "0.505"],
        [0, 2, 4],
        "Compare the tenths first. 0.51, 0.6 and 0.505 all have 5 or more tenths and something extra. 0.499 and 0.095 are less than 0.5.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "0.8 = ___ thousandths",
        "800",
        "0.8 is 8 tenths. Each tenth is 100 thousandths, so 8 tenths is 800 thousandths.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal is between 1.25 and 1.26?",
        ["1.255", "1.3", "1.205", "1.265"],
        0,
        "Write the ends as 1.250 and 1.260. 1.255 is between them. 1.205 is too small, and 1.265 and 1.3 are too big.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 4.386 to the nearest hundredth.",
        "4.39",
        "4.386 is between 4.38 and 4.39. The thousandths digit is 6, so round up to 4.39.",
      ),
    (n) =>
      choice(
        n,
        "In a 100 m race, the times were 14.08 s, 14.8 s, 14.008 s and 14.18 s. Which time was the fastest?",
        ["14.08 s", "14.8 s", "14.008 s", "14.18 s"],
        2,
        "The fastest time is the smallest number. With three places they are 14.080, 14.800, 14.008 and 14.180. The smallest is 14.008 s.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.09 is greater than 0.1 because 9 is greater than 1.",
        false,
        "0.1 is 1 tenth, which is 10 hundredths. 0.09 is only 9 hundredths, so 0.1 is greater.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these masses in order from heaviest to lightest.",
        ["1.5 kg", "1.45 kg", "1.405 kg", "1.054 kg"],
        "Write them with three places: 1.500, 1.450, 1.405, 1.054. From biggest to smallest: 1.5, 1.45, 1.405, 1.054.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Use the digits 2, 7 and 5 once each to make the largest number less than 1 with three decimal places.",
        ["0.752", ".752"],
        "To be less than 1 it starts with 0. Put the biggest digit in the tenths, the next in the hundredths and the smallest in the thousandths: 0.752.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is exactly halfway between 2.35 and 2.4?",
        "2.375",
        "Write them as 2.350 and 2.400. They are 50 thousandths apart, and half of that is 25 thousandths. 2.350 + 0.025 = 2.375.",
      ),
  ],
});

/** MA3-RN-03: percentages of quantities, and benchmark percentages as fractions and decimals. */
export const PERCENT = levels(6020301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "50% is the same as which fraction?",
        ["1/2", "1/5", "1/50", "1/4"],
        0,
        "Per cent means out of 100. 50 out of 100 is half, so 50% = 1/2.",
      ),
    (n) => typed("short_answer", n, "What is 10% of 80?", "8", "10% is one tenth. 80 ÷ 10 = 8."),
    (n) => trueFalse(n, "25% is the same as 0.25.", true, "25% means 25 hundredths, and 25 hundredths is written 0.25."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What percentage of the bar is shaded?",
          ["75", "75%"],
          "3 of the 4 equal parts are shaded, which is 3/4. 3/4 = 75/100, so 75% is shaded.",
        ),
      ),
    (n) => typed("short_answer", n, "What is 25% of 60?", "15", "25% is one quarter. 60 ÷ 4 = 15."),
    (n) => typed("fill_blank", n, "0.1 = ___%", "10", "0.1 is one tenth, which is 10 hundredths, so it is 10%."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A $40 T-shirt has 10% off. How many dollars is the discount?",
        ["4", "$4"],
        "10% is one tenth. One tenth of $40 is $4.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 75%? Choose all that are right.",
        ["3/4", "0.75", "0.075", "75/100", "7/5"],
        [0, 1, 3],
        "75% means 75 out of 100: 75/100, which is 0.75 and also 3/4. 0.075 is only 75 thousandths, and 7/5 is more than 1.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["1/10", "0.2", "25%", "3/4"],
        "Change them all to decimals: 1/10 = 0.1, 0.2, 25% = 0.25, 3/4 = 0.75.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Runners cost $80. They are on sale at 25% off. What is the sale price in dollars?",
        ["60", "$60"],
        "25% is one quarter, and a quarter of $80 is $20. $80 − $20 = $60.",
      ),
    (n) =>
      choice(
        n,
        "Which is greater: 30% of 50, or 50% of 30?",
        ["30% of 50", "50% of 30", "They are the same"],
        2,
        "30% of 50 is 3 × 5 = 15 (10% of 50 is 5). 50% of 30 is half of 30, which is also 15.",
      ),
    (n) => typed("short_answer", n, "What is 75% of 120?", "90", "25% of 120 is 120 ÷ 4 = 30. 75% is three times that: 3 × 30 = 90."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A school has 400 students. 45% of them walk to school. How many students do not walk?",
        "220",
        "If 45% walk, then 100% − 45% = 55% do not. 1% of 400 is 4, so 55% is 55 × 4 = 220.",
      ),
    (n) =>
      choice(
        n,
        "A $120 bike is 25% off at one shop. Another shop sells the same bike for $95. Which is cheaper, and by how much?",
        ["The 25% off shop, by $5", "The $95 shop, by $5", "The 25% off shop, by $25", "They cost the same"],
        0,
        "25% of $120 is $30, so the sale price is $120 − $30 = $90. $90 is $5 cheaper than $95.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia scored 18 out of 20 on a spelling test. What percentage did she score?",
        ["90", "90%"],
        "Multiply the top and bottom by 5 to get out of 100: 18/20 = 90/100, which is 90%.",
      ),
  ],
});

/** MA3-AR-01: addition and subtraction of whole numbers and decimals. */
export const ADD_SUB = levels(6010301, {
  very_easy: [
    (n) => typed("short_answer", n, "4.5 + 2.3 = ?", "6.8", "Add the ones: 4 + 2 = 6. Add the tenths: 5 + 3 = 8 tenths. That makes 6.8."),
    (n) =>
      typed(
        "short_answer",
        n,
        "25 000 + 13 000 = ?",
        ["38 000", "38000"],
        "Think in thousands: 25 thousand + 13 thousand = 38 thousand, which is 38 000.",
      ),
    (n) => trueFalse(n, "Taking 3.4 away from 9.6 leaves 6.2.", true, "Ones: 9 − 3 = 6. Tenths: 6 − 4 = 2. So 9.6 − 3.4 = 6.2."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which is the best estimate of 4.9 + 7.2 + 3.1?",
        ["12", "15", "17", "13"],
        1,
        "Round each one to the nearest whole: 5 + 7 + 3 = 15.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "12.75 + 6.5 = ?",
        "19.25",
        "Line up the decimal points: 12.75 + 6.50. 12 + 6 = 18 and 0.75 + 0.5 = 1.25, so 18 + 1.25 = 19.25.",
      ),
    (n) => typed("short_answer", n, "8 − 2.65 = ?", "5.35", "Count up from 2.65: 0.35 gets to 3, then 5 more gets to 8. 0.35 + 5 = 5.35."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "246 385 + 178 940 = ?",
        ["425 325", "425325"],
        "Add the thousands: 246 000 + 178 000 = 424 000. Add the rest: 385 + 940 = 1325. 424 000 + 1325 = 425 325.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella buys a drink for $3.85 and a sandwich for $6.40. How much change does she get from $20?",
        ["9.75", "$9.75"],
        "She spends $3.85 + $6.40 = $10.25. Then $20 − $10.25 = $9.75 change.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "15.2 − ___ = 7.85",
        "7.35",
        "The missing number is the gap between 7.85 and 15.2. Count up: 0.15 to 8, then 7.2 more to 15.2. 0.15 + 7.2 = 7.35.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "500 000 − 268 475 = ?",
        ["231 525", "231525"],
        "Count up from 268 475: 25 to 268 500, 1500 to 270 000, then 230 000 to 500 000. 25 + 1500 + 230 000 = 231 525.",
      ),
    (n) =>
      choice(
        n,
        "Leo ran 3.75 km on Monday, 4.6 km on Tuesday and 2.85 km on Wednesday. How far did he run altogether?",
        ["11.2 km", "10.2 km", "11.12 km", "9.96 km"],
        0,
        "3.75 + 4.6 = 8.35, and 8.35 + 2.85 = 11.2 km. Line up the decimal points so 4.6 is 4.60.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make exactly 10? Choose all that are right.",
        ["3.65 + 6.35", "7.2 + 2.08", "12.5 − 2.5", "4.75 + 5.25", "11 − 1.1"],
        [0, 2, 3],
        "3.65 + 6.35, 12.5 − 2.5 and 4.75 + 5.25 all make 10. 7.2 + 2.08 is 9.28 and 11 − 1.1 is 9.9.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A water tank held 1250.5 L. 368.75 L was used on Monday and 415.6 L on Tuesday. How many litres are left?",
        ["466.15", "466.15 L"],
        "Used: 368.75 + 415.6 = 784.35 L. Left: 1250.5 − 784.35 = 466.15 L.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A town's population grew from 98 640 to 103 215. By how many people did it grow?",
        ["4575", "4 575"],
        "Count up from 98 640: 1360 to 100 000, then 3215 to 103 215. 1360 + 3215 = 4575.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "4.8 + ___ = 10 − 1.65",
        "3.55",
        "First work out the right side: 10 − 1.65 = 8.35. Then 4.8 + ? = 8.35, so ? = 8.35 − 4.8 = 3.55.",
      ),
  ],
});

/** MA3-MR-01: multiplication and division, including decimals by whole numbers. */
export const MULT_DIV = levels(6010201, {
  very_easy: [
    (n) => typed("short_answer", n, "3.2 × 3 = ?", "9.6", "3 × 3 = 9 and 3 × 0.2 = 0.6, so 3.2 × 3 = 9.6."),
    (n) => typed("short_answer", n, "6 × 700 = ?", "4200", "6 × 7 = 42, and 6 × 7 hundreds = 42 hundreds, which is 4200."),
    (n) =>
      trueFalse(
        n,
        "When you multiply a number by 100, each digit moves two places to the left.",
        true,
        "Multiplying by 10 moves each digit one place left, so multiplying by 100 moves it two places. For example, 3.5 × 100 = 350.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "4.6 ÷ 2 = ?", "2.3", "Half of 4 is 2 and half of 0.6 is 0.3, so 4.6 ÷ 2 = 2.3."),
    (n) =>
      pic(
        { kind: "array", rows: 8, columns: 12 },
        typed(
          "short_answer",
          n,
          "How many dots are in this array?",
          "96",
          "There are 8 rows of 12. 8 × 10 = 80 and 8 × 2 = 16, so 80 + 16 = 96.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is 2.5 × 10?",
        ["25", "2.50", "250", "0.25"],
        0,
        "Multiplying by 10 moves each digit one place to the left: 2.5 becomes 25.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "324 × 6 = ?", "1944", "300 × 6 = 1800, 20 × 6 = 120 and 4 × 6 = 24. 1800 + 120 + 24 = 1944."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A packet of 8 muesli bars costs $5.60. How much does each bar cost?",
        ["0.70", "$0.70", "0.7", "70c", "70 cents"],
        "$5.60 is 560 cents. 560 ÷ 8 = 70, so each bar costs 70 cents, or $0.70.",
      ),
    (n) => typed("short_answer", n, "1356 ÷ 4 = ?", "339", "1200 ÷ 4 = 300, 120 ÷ 4 = 30 and 36 ÷ 4 = 9. 300 + 30 + 9 = 339."),
  ],
  hard: [
    (n) => typed("short_answer", n, "47 × 26 = ?", "1222", "47 × 20 = 940 and 47 × 6 = 282. 940 + 282 = 1222."),
    (n) => typed("short_answer", n, "7.35 × 4 = ?", "29.4", "7 × 4 = 28 and 0.35 × 4 = 1.4. 28 + 1.4 = 29.4."),
    (n) =>
      choice(
        n,
        "214 students are going on an excursion. Each bus seats 45 students. How many buses are needed?",
        ["4", "5", "4.75", "6"],
        1,
        "4 buses seat 4 × 45 = 180 students, which leaves 34 without a seat. They need one more bus, so 5 buses.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A ribbon 12.6 m long is cut into 7 equal pieces. How long is each piece in metres?",
        ["1.8", "1.8 m"],
        "12.6 is 126 tenths. 126 ÷ 7 = 18, so each piece is 18 tenths of a metre, which is 1.8 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Netball uniforms cost $38.50 each. How much do 9 uniforms cost?",
        ["346.50", "$346.50", "346.5"],
        "9 × $38 = $342 and 9 × $0.50 = $4.50. $342 + $4.50 = $346.50.",
      ),
    (n) =>
      multi(
        n,
        "Which of these give the same answer as 36 × 25? Choose all that are right.",
        ["9 × 100", "36 × 100 ÷ 4", "18 × 50", "30 × 25 + 6"],
        [0, 1, 2],
        "36 × 25 = 900. 9 × 100 = 900, 3600 ÷ 4 = 900 and 18 × 50 = 900 (halve one, double the other). 30 × 25 + 6 is only 756.",
      ),
  ],
});

/** MA3-MR-02: number sentences with multiplicative relations and the order of operations. */
export const NUMBER_SENTENCES = levels(6010101, {
  very_easy: [
    (n) => typed("short_answer", n, "3 + 4 × 2 = ?", "11", "Multiply before you add: 4 × 2 = 8, then 3 + 8 = 11."),
    (n) =>
      trueFalse(
        n,
        "In 10 − 2 × 3, you do the multiplication first.",
        true,
        "Multiplication and division come before addition and subtraction, so do 2 × 3 = 6 first, then 10 − 6 = 4.",
      ),
    (n) => typed("fill_blank", n, "6 × ___ = 42", "7", "6 × 7 = 42."),
  ],
  easy: [
    (n) => typed("short_answer", n, "(5 + 3) × 4 = ?", "32", "Brackets first: 5 + 3 = 8. Then 8 × 4 = 32."),
    (n) => typed("short_answer", n, "20 − 12 ÷ 4 = ?", "17", "Divide before you subtract: 12 ÷ 4 = 3, then 20 − 3 = 17."),
    (n) =>
      choice(
        n,
        "Which number sentence shows 6 packs of 4 juice boxes, plus 3 single juice boxes?",
        ["6 × 4 + 3", "6 + 4 × 3", "(6 + 3) × 4", "6 × (4 + 3)"],
        0,
        "6 packs of 4 is 6 × 4, then add the 3 single boxes: 6 × 4 + 3 = 27.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "18 ÷ (2 + 4) × 5 = ?",
        "15",
        "Brackets first: 2 + 4 = 6. Then work left to right: 18 ÷ 6 = 3, and 3 × 5 = 15.",
      ),
    (n) => typed("fill_blank", n, "___ × 6 = 8 × 9", "12", "8 × 9 = 72, so ? × 6 = 72. 72 ÷ 6 = 12."),
    (n) =>
      trueFalse(
        n,
        "4 + 6 × 2 = 20",
        false,
        "Multiply first: 6 × 2 = 12, then 4 + 12 = 16, not 20. You only get 20 if you add first, which is the wrong order.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "50 − (3 + 7) × 4 = ?", "10", "Brackets: 3 + 7 = 10. Multiply: 10 × 4 = 40. Subtract: 50 − 40 = 10."),
    (n) =>
      choice(
        n,
        "Where should the brackets go to make 2 + 6 × 3 − 1 equal 23?",
        ["(2 + 6) × 3 − 1", "2 + 6 × (3 − 1)", "(2 + 6 × 3) − 1", "2 + (6 × 3 − 1)"],
        0,
        "(2 + 6) × 3 − 1 = 8 × 3 − 1 = 24 − 1 = 23. The others give 14, 19 and 19.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "36 ÷ ___ + 5 = 9",
        "9",
        "The division part must make 4, because 4 + 5 = 9. 36 ÷ 9 = 4, so the missing number is 9.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Zoo tickets cost $12 for adults and $7 for children. What is the total cost for 3 adults and 5 children?",
        ["71", "$71"],
        "3 × 12 + 5 × 7 = 36 + 35 = 71, so it costs $71.",
      ),
    (n) => typed("fill_blank", n, "(___ + 4) × 3 = 45", "11", "Something times 3 is 45, so the bracket makes 15. ? + 4 = 15, so ? = 11."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 24? Choose all that are right.",
        ["4 + 4 × 5", "(4 + 4) × 5", "48 ÷ (4 − 2)", "48 ÷ 4 − 2", "30 − 12 ÷ 2"],
        [0, 2, 4],
        "4 + 20 = 24, 48 ÷ 2 = 24 and 30 − 6 = 24. But (4 + 4) × 5 = 40 and 48 ÷ 4 − 2 = 12 − 2 = 10.",
      ),
  ],
});

/** MA3-RQF-01: comparing and ordering fractions, and adding and subtracting with related denominators. */
export const FRACTIONS = levels(6020101, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "2/5 + 1/5 = ?",
        ["3/5"],
        "The pieces are the same size (fifths), so add the tops: 2 fifths + 1 fifth = 3 fifths.",
      ),
    (n) => trueFalse(n, "3/8 is less than 1/2.", true, "1/2 is the same as 4/8, and 3/8 is less than 4/8."),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 6, shaded: 4 },
        choice(
          n,
          "Which fraction is equal to the shaded part?",
          ["2/3", "4/10", "3/4", "1/6"],
          0,
          "4 of 6 equal parts are shaded: 4/6. Divide the top and bottom by 2 to get 2/3.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "1/2 + 1/4 = ?", ["3/4"], "1/2 is the same as 2/4. 2/4 + 1/4 = 3/4."),
    (n) =>
      choice(
        n,
        "Which fraction is greater, 2/3 or 5/6?",
        ["2/3", "5/6", "They are the same"],
        1,
        "Change 2/3 into sixths: 2/3 = 4/6. 5/6 is more than 4/6.",
      ),
    (n) => typed("fill_blank", n, "3/5 = ___/10", "6", "5 × 2 = 10, so multiply the top by 2 as well: 3 × 2 = 6. 3/5 = 6/10."),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["3/10", "2/5", "1/2", "3/4"],
        "As decimals: 3/10 = 0.3, 2/5 = 0.4, 1/2 = 0.5 and 3/4 = 0.75.",
      ),
    (n) => typed("short_answer", n, "7/8 − 1/4 = ?", ["5/8"], "1/4 is the same as 2/8. 7/8 − 2/8 = 5/8."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 2, jumps: 6, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "What number is the dot on? Write it as a fraction or mixed number.",
          ["1 1/3", "4/3"],
          "0 to 2 is split into 6 jumps, so each whole has 3 jumps and each jump is 1/3. The dot is 4 jumps along: 4/3, which is 1 1/3.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "2/3 + 5/6 = ?",
        ["1 1/2", "3/2", "9/6", "1 3/6"],
        "2/3 is the same as 4/6. 4/6 + 5/6 = 9/6, which is 1 whole and 3/6, or 1 1/2.",
      ),
    (n) =>
      multi(
        n,
        "Which of these fractions are greater than 3/5? Choose all that are right.",
        ["2/3", "7/10", "1/2", "5/8", "4/10"],
        [0, 1, 3],
        "3/5 = 0.6. 2/3 is about 0.67, 7/10 = 0.7 and 5/8 = 0.625 are all bigger. 1/2 = 0.5 and 4/10 = 0.4 are smaller.",
      ),
    (n) =>
      choice(
        n,
        "Sam ate 3/8 of a pizza and Ruby ate 1/4 of it. What fraction of the pizza is left?",
        ["3/8", "5/8", "4/12", "1/2"],
        0,
        "1/4 = 2/8, so they ate 3/8 + 2/8 = 5/8. The whole pizza is 8/8, so 8/8 − 5/8 = 3/8 is left.",
      ),
  ],
  very_hard: [
    (n) =>
      typed("short_answer", n, "2 1/4 − 5/8 = ?", ["1 5/8", "13/8"], "Change to eighths: 2 1/4 = 18/8. 18/8 − 5/8 = 13/8, which is 1 5/8."),
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["5/8", "2/3", "3/4", "5/6"],
        "Each is short of 1 by a piece: 3/8, 1/3, 1/4 and 1/6. The smaller the missing piece, the bigger the fraction: 5/8, 2/3, 3/4, 5/6.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sophie has 1 1/2 cups of flour. She uses 3/4 of a cup for a cake and 5/8 of a cup for biscuits. How much flour is left?",
        ["1/8", "1/8 cup"],
        "Change to eighths: 1 1/2 = 12/8, 3/4 = 6/8. She uses 6/8 + 5/8 = 11/8. 12/8 − 11/8 = 1/8 of a cup is left.",
      ),
  ],
});

/** MA3-RQF-02: fractions of measures and quantities. */
export const FRACTION_OF = levels(6020201, {
  very_easy: [
    (n) => typed("short_answer", n, "What is 1/5 of 30?", "6", "Find one fifth by sharing into 5 equal groups: 30 ÷ 5 = 6."),
    (n) => trueFalse(n, "1/4 of an hour is 15 minutes.", true, "An hour is 60 minutes, and 60 ÷ 4 = 15."),
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 8 },
        typed(
          "short_answer",
          n,
          "How many dots make up 1/3 of this array?",
          "8",
          "There are 3 equal rows, so one row is 1/3 of the array. Each row has 8 dots.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is 3/4 of 32?", "24", "One quarter of 32 is 32 ÷ 4 = 8. Three quarters is 3 × 8 = 24."),
    (n) => choice(n, "What is 2/5 of $50?", ["$20", "$10", "$25", "$40"], 0, "One fifth of $50 is $10, so two fifths is 2 × $10 = $20."),
    (n) => typed("fill_blank", n, "1/10 of 1 kg = ___ g", "100", "1 kg is 1000 g, and 1000 ÷ 10 = 100 g."),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is 5/6 of 42?", "35", "One sixth of 42 is 42 ÷ 6 = 7. Five sixths is 5 × 7 = 35."),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many minutes is 2/3 of an hour?",
        ["40", "40 minutes"],
        "One third of 60 minutes is 20 minutes, so two thirds is 40 minutes.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 600, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "The jug shows how much juice Kai poured. He drinks 1/3 of it. How many millilitres does he drink?",
          ["200", "200 mL"],
          "The jug shows 600 mL. One third of 600 is 600 ÷ 3 = 200 mL.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball team played 20 games and won 3/5 of them. There were no draws. How many games did they lose?",
        "8",
        "One fifth of 20 is 4, so they won 3 × 4 = 12 games. 20 − 12 = 8 games lost.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is the biggest amount?",
        ["3/8 of 64", "2/3 of 30", "3/4 of 28", "5/6 of 24"],
        0,
        "3/8 of 64 = 3 × 8 = 24. 2/3 of 30 = 20. 3/4 of 28 = 21. 5/6 of 24 = 20. The biggest is 24.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many metres is 7/10 of 2 km?",
        ["1400", "1400 m"],
        "2 km is 2000 m. One tenth of 2000 is 200, so seven tenths is 7 × 200 = 1400 m.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "2/5 of a number is 18. What is the number?",
        "45",
        "If 2 fifths is 18, then 1 fifth is 18 ÷ 2 = 9. The whole number is 5 fifths: 5 × 9 = 45.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ari had $60. He spent 1/4 of it on a book, then 1/3 of what was left on lunch. How much money does he have now?",
        ["30", "$30"],
        "The book cost 1/4 of $60 = $15, leaving $45. Lunch cost 1/3 of $45 = $15, leaving $45 − $15 = $30.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 2, value: 1.5, step: 0.25, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows a bag of flour. A recipe uses 3/4 of the bag. How many grams of flour does the recipe use?",
          ["1125", "1125 g"],
          "The scale shows 1.5 kg, which is 1500 g. One quarter of 1500 is 375, so three quarters is 3 × 375 = 1125 g.",
        ),
      ),
  ],
});

const WATER_USED = {
  kind: "column_graph",
  title: "Water used (L)",
  step: 20,
  columns: [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 80 },
    { label: "Wed", value: 60 },
    { label: "Thu", value: 100 },
  ],
} as const;

const GOALS = {
  kind: "picture_graph",
  title: "Goals scored this season",
  thing: "goals",
  each: 6,
  rows: [
    { label: "Ella", count: 4 },
    { label: "Tom", count: 7 },
    { label: "Ava", count: 5 },
  ],
} as const;

/** MA3-DATA-01: constructing graphs with many-to-one scales. */
export const GRAPHS = levels(6060101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Kangaroos spotted",
          thing: "kangaroos",
          each: 10,
          rows: [
            { label: "Mon", count: 3 },
            { label: "Tue", count: 5 },
            { label: "Wed", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many kangaroos were spotted on Monday?",
          "30",
          "Monday has 3 stars and each star stands for 10 kangaroos. 3 × 10 = 30.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a graph where 1 square stands for 5 cars, 3 squares show 15 cars.",
        true,
        "Each square is 5 cars, so 3 squares is 3 × 5 = 15 cars.",
      ),
    (n) =>
      choice(
        n,
        "The side of a column graph is marked 0, 10, 20, 30, 40. What is the scale going up in?",
        ["ones", "fives", "tens", "forties"],
        2,
        "Each mark is 10 more than the one before, so the scale goes up in tens.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        WATER_USED,
        choice(
          n,
          "Look at the graph. How much does each gap between the numbers on the side stand for?",
          ["10 L", "20 L", "5 L", "1 L"],
          1,
          "The side goes 0, 20, 40, 60 and so on, so each gap stands for 20 L.",
        ),
      ),
    (n) =>
      pic(
        WATER_USED,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many litres were used on Wednesday?",
          ["60", "60 L"],
          "The Wednesday column reaches the line marked 60, so 60 L.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each car symbol stands for 15 cars. How many symbols should you draw for 60 cars?",
        "4",
        "60 ÷ 15 = 4, so draw 4 symbols.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "A class collected 12, 27, 35 and 48 cans. Which scale is best for the side of their column graph?",
        ["1 mark = 1 can, up to 50", "1 mark = 5 cans, up to 50", "1 mark = 100 cans, up to 500", "1 mark = 2 cans, up to 30"],
        1,
        "Going up in 5s to 50 fits every amount with 10 marks. Going up in 1s needs 50 marks, going up in 100s squashes every column, and stopping at 30 is too short for 35 and 48.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each book symbol stands for 8 books. How many symbols show 28 books?",
        ["3.5", "3 1/2", "3 and a half"],
        "28 ÷ 8 = 3 with 4 left over. 4 is half of 8, so draw 3 whole symbols and half a symbol: 3.5.",
      ),
    (n) =>
      trueFalse(
        n,
        "On a graph whose scale goes up in 50s, a column ending halfway between 100 and 150 shows 125.",
        true,
        "Halfway between 100 and 150 is 125, because 150 − 100 = 50 and half of 50 is 25.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Sausages sold at the school sizzle",
          step: 25,
          columns: [
            { label: "Term 1", value: 75 },
            { label: "Term 2", value: 125 },
            { label: "Term 3", value: 150 },
            { label: "Term 4", value: 100 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more sausages were sold in Term 3 than in Term 1?",
          "75",
          "The scale goes up in 25s. Term 3 is 150 and Term 1 is 75, so 150 − 75 = 75 more.",
        ),
      ),
    (n) =>
      pic(
        GOALS,
        multi(
          n,
          "Look at the picture graph. Which of these are true? Choose all that are right.",
          ["Tom scored 42 goals", "Ella scored 4 goals", "Ava scored 6 more goals than Ella", "Ella and Ava scored 54 goals altogether"],
          [0, 2, 3],
          "Each picture is 6 goals. Ella 4 × 6 = 24, Tom 7 × 6 = 42, Ava 5 × 6 = 30. Ava has one more picture than Ella, which is 6 goals, and 24 + 30 = 54.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ming is graphing visitors to Taronga Zoo. Each square on her grid stands for 500 visitors. How many squares tall is the column for 4500 visitors?",
        "9",
        "4500 ÷ 500 = 9, so the column is 9 squares tall.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A picture graph uses one symbol for every 20 people. One row shows 6 whole symbols and a quarter of a symbol. How many people is that?",
        "125",
        "6 whole symbols are 6 × 20 = 120 people. A quarter of a symbol is 20 ÷ 4 = 5 people. 120 + 5 = 125.",
      ),
    (n) =>
      choice(
        n,
        "Jai wants to graph 35, 70, 85 and 120. His grid is only 10 squares tall. Which scale lets every column fit?",
        ["1 square = 5", "1 square = 2", "1 square = 20", "1 square = 10"],
        2,
        "The tallest column is 120. With 1 square = 20 it needs 120 ÷ 20 = 6 squares, which fits. 1 square = 10 needs 12 squares, and 5 or 2 need even more.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Library books borrowed",
          step: 200,
          columns: [
            { label: "Term 1", value: 600 },
            { label: "Term 2", value: 900 },
            { label: "Term 3", value: 1100 },
            { label: "Term 4", value: 800 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many books were borrowed in the whole year?",
          ["3400", "3 400"],
          "The scale goes up in 200s, so a column halfway between two lines is 100 more. Term 2 is 900 and Term 3 is 1100. 600 + 900 + 1100 + 800 = 3400.",
        ),
      ),
  ],
});

const TEMPERATURE = {
  kind: "line_graph",
  title: "Temperature in Sydney (°C)",
  step: 2,
  points: [
    { label: "6 am", value: 14 },
    { label: "9 am", value: 18 },
    { label: "12 pm", value: 24 },
    { label: "3 pm", value: 26 },
    { label: "6 pm", value: 21 },
    { label: "9 pm", value: 17 },
  ],
} as const;

const PUPPY = {
  kind: "line_graph",
  title: "Puppy's mass (kg)",
  step: 1,
  points: [
    { label: "Wk 1", value: 2 },
    { label: "Wk 2", value: 3 },
    { label: "Wk 3", value: 5 },
    { label: "Wk 4", value: 6 },
    { label: "Wk 5", value: 8 },
    { label: "Wk 6", value: 9 },
  ],
} as const;

const HISTORY = {
  kind: "table",
  headings: ["Year", "Event"],
  rows: [
    ["1788", "First Fleet arrives"],
    ["1851", "Gold found near Bathurst"],
    ["1901", "Federation"],
    ["1932", "Sydney Harbour Bridge opens"],
  ],
} as const;

const TANK = {
  kind: "line_graph",
  title: "Water in the tank (L)",
  step: 100,
  points: [
    { label: "Jan", value: 800 },
    { label: "Feb", value: 650 },
    { label: "Mar", value: 500 },
    { label: "Apr", value: 550 },
    { label: "May", value: 900 },
    { label: "Jun", value: 1000 },
  ],
} as const;

/** MA3-DATA-02: interpreting data displays, including timelines and line graphs. */
export const DATA = levels(6060201, {
  very_easy: [
    (n) =>
      pic(
        TEMPERATURE,
        typed(
          "short_answer",
          n,
          "Look at the line graph. What was the temperature at 12 pm?",
          ["24", "24°C", "24 °C"],
          "Find 12 pm along the bottom and go up to the line. It meets the line at 24, so it was 24°C.",
        ),
      ),
    (n) =>
      pic(
        TEMPERATURE,
        choice(
          n,
          "Look at the line graph. At which time was it warmest?",
          ["9 am", "12 pm", "3 pm", "6 pm"],
          2,
          "The highest point on the line is at 3 pm, at 26°C.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A line graph is a good way to show how something changes over time.",
        true,
        "The line joins the readings in time order, so you can see when the value goes up or down.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        TEMPERATURE,
        typed(
          "short_answer",
          n,
          "Look at the line graph. By how many degrees did the temperature rise from 6 am to 12 pm?",
          "10",
          "It was 14°C at 6 am and 24°C at 12 pm. 24 − 14 = 10 degrees.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these events in order on a timeline, earliest first.",
        ["First Fleet arrives (1788)", "Gold found near Bathurst (1851)", "Federation (1901)", "Sydney Harbour Bridge opens (1932)"],
        "Compare the years: 1788, then 1851, then 1901, then 1932.",
      ),
    (n) =>
      pic(
        PUPPY,
        typed(
          "short_answer",
          n,
          "Look at the line graph. What was the puppy's mass in Week 3?",
          ["5", "5 kg"],
          "Find Wk 3 along the bottom and go up to the line. It meets the line at 5, so 5 kg.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        TEMPERATURE,
        choice(
          n,
          "Look at the line graph. Between which two times did the temperature fall the most?",
          ["12 pm and 3 pm", "3 pm and 6 pm", "6 pm and 9 pm", "6 am and 9 am"],
          1,
          "The line goes down after 3 pm. From 3 pm to 6 pm it falls 26 − 21 = 5 degrees, and from 6 pm to 9 pm it falls 21 − 17 = 4 degrees.",
        ),
      ),
    (n) =>
      pic(
        HISTORY,
        typed(
          "short_answer",
          n,
          "The table is a timeline of events in NSW. How many years after Federation did the Sydney Harbour Bridge open?",
          ["31", "31 years"],
          "Federation was in 1901 and the bridge opened in 1932. 1932 − 1901 = 31 years.",
        ),
      ),
    (n) =>
      pic(
        PUPPY,
        typed(
          "short_answer",
          n,
          "Look at the line graph. How much mass did the puppy gain from Week 1 to Week 6?",
          ["7", "7 kg"],
          "The puppy was 2 kg in Week 1 and 9 kg in Week 6. 9 − 2 = 7 kg.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        PUPPY,
        trueFalse(
          n,
          "Look at the line graph. The puppy gained the same amount of mass every week.",
          false,
          "Some weeks it gained 1 kg (Week 1 to 2) and some weeks 2 kg (Week 2 to 3). The line is steeper in some places.",
        ),
      ),
    (n) =>
      pic(
        HISTORY,
        typed(
          "short_answer",
          n,
          "The table is a timeline of events in NSW. How many years passed between the First Fleet arriving and Federation?",
          ["113", "113 years"],
          "1901 − 1788: count up 12 years to 1800, then 101 years to 1901. 12 + 101 = 113 years.",
        ),
      ),
    (n) =>
      pic(
        TEMPERATURE,
        multi(
          n,
          "Look at the line graph. Which of these are true? Choose all that are right.",
          [
            "The highest temperature was 26°C",
            "It was warmer at 9 pm than at 6 am",
            "The temperature fell between 12 pm and 3 pm",
            "The highest and lowest temperatures were 12 degrees apart",
          ],
          [0, 1, 3],
          "The top of the line is 26°C. 9 pm (17°C) is warmer than 6 am (14°C). From 12 pm to 3 pm it rose, not fell. 26 − 14 = 12 degrees.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        TANK,
        typed(
          "short_answer",
          n,
          "Look at the line graph. In which month did the tank first hold more water than the month before?",
          ["April", "Apr"],
          "The level falls from Jan to Feb to Mar (800, 650, 500). In April it goes up to 550, the first rise.",
        ),
      ),
    (n) =>
      pic(
        TANK,
        typed(
          "short_answer",
          n,
          "Look at the line graph. What is the difference between the most and the least water in the tank?",
          ["500", "500 L"],
          "The most is 1000 L in June and the least is 500 L in March. 1000 − 500 = 500 L.",
        ),
      ),
    (n) =>
      pic(
        TANK,
        choice(
          n,
          "Look at the line graph. Between which two months did the amount of water change the most?",
          ["Jan and Feb", "Mar and Apr", "Apr and May", "May and Jun"],
          2,
          "Find the steepest part of the line. Jan to Feb: 150 L. Mar to Apr: 50 L. Apr to May: 900 − 550 = 350 L. May to Jun: 100 L.",
        ),
      ),
  ],
});

/** MA3-CHAN-01: chance experiments and probability as fractions, decimals and percentages. */
export const CHANCE = levels(6060301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow"] },
        typed(
          "short_answer",
          n,
          "What is the chance of this spinner landing on red? Write it as a fraction.",
          ["1/4"],
          "There are 4 equal sections and 1 is red, so the chance is 1/4.",
        ),
      ),
    (n) => trueFalse(n, "A probability of 0 means the event is impossible.", true, "Probability goes from 0 (impossible) to 1 (certain)."),
    (n) =>
      choice(
        n,
        "When you flip a coin, what is the chance of getting heads, as a percentage?",
        ["50%", "25%", "100%", "10%"],
        0,
        "Heads is 1 of 2 equally likely outcomes. 1/2 = 50%.",
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
            { colour: "green", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the probability it is red, as a decimal?",
          ["0.3", ".3"],
          "There are 3 + 5 + 2 = 10 counters and 3 are red. 3/10 = 0.3.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the probability of rolling a 4 on a normal six-sided dice? Write it as a fraction.",
        ["1/6"],
        "There are 6 equally likely faces and only one is a 4, so the probability is 1/6.",
      ),
    (n) =>
      ordering(
        n,
        "Put these probabilities in order from least likely to most likely.",
        ["0", "0.2", "1/2", "75%", "1"],
        "Change them to decimals: 0, 0.2, 0.5, 0.75, 1.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "red", "blue", "yellow", "blue", "red", "blue"] },
        choice(
          n,
          "What is the probability of this spinner landing on blue?",
          ["1/2", "4/5", "1/4", "3/8"],
          0,
          "4 of the 8 equal sections are blue. 4/8 = 1/2.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the probability of rolling an even number on a normal dice, as a percentage?",
        ["50", "50%"],
        "3 of the 6 faces are even (2, 4, 6). 3/6 = 1/2 = 50%.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "purple", count: 5 },
            { colour: "orange", count: 15 },
          ],
        },
        typed(
          "short_answer",
          n,
          "You pick one counter from this bag without looking. What is the chance it is purple, as a percentage?",
          ["25", "25%"],
          "There are 20 counters and 5 are purple. 5/20 = 1/4 = 25%.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Zara rolled a dice 60 times. She rolled a 6 twelve times. What fraction of her rolls were 6s, in simplest form?",
        ["1/5"],
        "12 out of 60 is 12/60. Divide the top and bottom by 12: 1/5.",
      ),
    (n) =>
      choice(
        n,
        "Ben spun a spinner 50 times and it landed on green 20 times. As a percentage, how often did it land on green?",
        ["40%", "20%", "50%", "30%"],
        0,
        "20 out of 50 is 20/50. Double the top and bottom: 40/100 = 40%.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 4 },
            { colour: "yellow", count: 6 },
            { colour: "green", count: 10 },
          ],
        },
        multi(
          n,
          "You pick one counter from this bag. Which of these are true? Choose all that are right.",
          ["The chance of green is 0.5", "The chance of red is 20%", "The chance of yellow is 3/5", "The chance of red or yellow is 1/2"],
          [0, 1, 3],
          "There are 20 counters. Green 10/20 = 0.5. Red 4/20 = 20%. Yellow 6/20 = 3/10, not 3/5. Red or yellow 10/20 = 1/2.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 24 counters. The probability of picking a blue counter is 0.375. How many counters are blue?",
        "9",
        "0.375 is 3/8. One eighth of 24 is 3, so three eighths is 3 × 3 = 9 blue counters.",
      ),
    (n) =>
      choice(
        n,
        "Mae spun a spinner 40 times: red 21 times, blue 9 times and green 10 times. Which spinner did she most likely use?",
        [
          "Half red, a quarter blue, a quarter green",
          "A third each of red, blue and green",
          "Three quarters red, an eighth blue, an eighth green",
          "Half blue, a quarter red, a quarter green",
        ],
        0,
        "Red came up about 20 times out of 40 (about half). Blue and green each came up about 10 times out of 40 (about a quarter).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 3 red and 5 blue marbles. How many red marbles must be added to make the chance of red 50%?",
        "2",
        "A 50% chance means the same number of red and blue. There are 5 blue, so you need 5 red. 5 − 3 = 2 more red marbles.",
      ),
  ],
});
