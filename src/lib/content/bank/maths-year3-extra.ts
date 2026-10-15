/**
 * Year 3 Mathematics, top-up sets: a second set of 15 questions for each Stage 2 standard in
 * maths-year3.ts, three at each level from very easy to very hard. Each export has the same name
 * as its first set and is numbered straight after it. Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA2-RN-01: place value to tens of thousands. */
export const PLACE_VALUE = levels(3010116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 8 in 85?",
        ["8", "80", "800", "85"],
        1,
        "The 8 is in the tens place, so it is worth 8 tens, or 80.",
      ),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 4, ones: 2 },
        typed(
          "short_answer",
          n,
          "Write the number these blocks make.",
          "42",
          "There are 4 tens and 2 ones. 4 tens is 40, and 40 + 2 = 42.",
        ),
      ),
    (n) => trueFalse(n, "In 39, the 9 is in the tens place.", false, "39 is 3 tens and 9 ones, so the 9 is in the ones place."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 3, tens: 0, ones: 6 },
        choice(
          n,
          "What number is made by these blocks?",
          ["36", "306", "360", "3006"],
          1,
          "3 hundreds, 0 tens and 6 ones is 306. The 0 holds the tens place.",
        ),
      ),
    (n) => typed("fill_blank", n, "500 + 70 + 2 = ___", "572", "5 hundreds, 7 tens and 2 ones make 572."),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from largest to smallest.",
        ["742", "724", "472", "427"],
        "Compare the hundreds first: the 7 hundreds come before the 4 hundreds. Then compare the tens: 742, 724, 472, 427.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is the value of the 5 in 5381?",
        ["5", "50", "500", "5000"],
        3,
        "The 5 is in the thousands place, so it is worth 5000.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1000 more than 6245?",
        "7245",
        "Adding 1000 adds 1 to the thousands digit: 6 thousands becomes 7 thousands, so 7245.",
      ),
    (n) => typed("fill_blank", n, "8000 + ___ + 40 + 1 = 8341", "300", "The 3 in 8341 is in the hundreds place, so it is worth 300."),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 3726 to the nearest hundred.",
        "3700",
        "3726 is between 3700 and 3800. The tens digit is 2, which is less than 5, so it rounds down to 3700.",
      ),
    (n) =>
      choice(
        n,
        "Which number is the smallest?",
        ["6081", "6018", "6108", "6810"],
        1,
        "All have 6 thousands. 6081 and 6018 have 0 hundreds. Then compare the tens: 6018 has 1 ten, which is fewer than 8 tens.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 2470? Choose all that are right.",
        ["2 thousands, 4 hundreds and 7 tens", "247 tens", "2000 + 400 + 7", "24 hundreds and 70 ones"],
        [0, 1, 3],
        "247 tens is 2470, and 24 hundreds is 2400, plus 70 is 2470. But 2000 + 400 + 7 is only 2407.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest 4-digit number you can make using the digits 7, 0, 4 and 2 once each?",
        "2047",
        "A 4-digit number can't start with 0, so put the smallest other digit, 2, first. Then use 0, 4, 7 from smallest to largest: 2047.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write fifty-two thousand, three hundred and six in numerals.",
        ["52 306", "52306"],
        "52 thousands, 3 hundreds, 0 tens and 6 ones is 52 306. The 0 holds the tens place.",
      ),
    (n) =>
      choice(
        n,
        "A number has 4 thousands, 13 hundreds and 2 ones. What is the number?",
        ["5302", "41 302", "4132", "4302"],
        0,
        "13 hundreds is 1300. 4000 + 1300 + 2 = 5302.",
      ),
  ],
});

/** MA2-RN-02: tenths and hundredths. */
export const DECIMALS = levels(3010216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 3 },
        choice(
          n,
          "What fraction of this bar is shaded?",
          ["three tenths", "seven tenths", "three hundredths", "three"],
          0,
          "The bar is cut into 10 equal parts and 3 are shaded, so three tenths is shaded.",
        ),
      ),
    (n) => trueFalse(n, "0.1 is the same as one tenth.", true, "The first place after the decimal point is tenths, so 0.1 is 1 tenth."),
    (n) =>
      typed(
        "short_answer",
        n,
        "In 0.6, which digit is in the tenths place?",
        "6",
        "The first digit after the decimal point is in the tenths place. That is the 6.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 4 },
        choice(
          n,
          "This line from 0 to 1 is split into tenths. What decimal is the dot on?",
          ["0.4", "4", "0.04", "0.6"],
          0,
          "Each jump is one tenth. The dot is 4 jumps from 0, so it is on 4 tenths, or 0.4.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "Write 0.9 in words.", ["nine tenths", "9 tenths"], "The 9 is in the tenths place, so 0.9 is nine tenths."),
    (n) => trueFalse(n, "0.2 is bigger than 0.8.", false, "0.2 is 2 tenths and 0.8 is 8 tenths. 8 tenths is more, so 0.8 is bigger."),
  ],
  medium: [
    (n) => typed("short_answer", n, "0.6 + 0.3 = ?", "0.9", "6 tenths and 3 tenths make 9 tenths, which is 0.9."),
    (n) => typed("fill_blank", n, "1.3 = 1 + ___", ["0.3", ".3"], "1.3 is 1 whole and 3 tenths, so the missing part is 0.3."),
    (n) =>
      multi(
        n,
        "Which of these are less than 1? Choose all that are right.",
        ["0.9", "1.2", "0.4", "2.0"],
        [0, 2],
        "0.9 and 0.4 have 0 ones, so they are less than 1. 1.2 and 2.0 are 1 or more.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "What is the value of the 6 in 2.36?",
        ["6 tenths", "6 hundredths", "6 ones", "60"],
        1,
        "The second digit after the decimal point is in the hundredths place, so the 6 is 6 hundredths.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many hundredths are there in 0.42?",
        "42",
        "0.42 is 4 tenths and 2 hundredths. 4 tenths is 40 hundredths, so 42 hundredths.",
      ),
    (n) =>
      ordering(
        n,
        "Put these decimals in order from largest to smallest.",
        ["0.9", "0.75", "0.6", "0.08"],
        "Write them all with two places: 0.90, 0.75, 0.60, 0.08. Then compare: 90, 75, 60, 8 hundredths.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "1.5 + 0.7 = ?",
        "2.2",
        "1.5 is 15 tenths. 15 tenths and 7 tenths make 22 tenths, which is 2 wholes and 2 tenths: 2.2.",
      ),
    (n) =>
      trueFalse(
        n,
        "0.3 is smaller than 0.25.",
        false,
        "0.3 is the same as 0.30. 30 hundredths is more than 25 hundredths, so 0.3 is bigger.",
      ),
    (n) =>
      choice(
        n,
        "A ribbon is 1 m long. Mia cuts off 0.35 m. How much ribbon is left?",
        ["0.65 m", "0.75 m", "0.35 m", "1.35 m"],
        0,
        "1 m is 100 hundredths. 100 − 35 = 65 hundredths, so 0.65 m is left.",
      ),
  ],
});

/** MA2-AR-01: addition and subtraction strategies. */
export const ADD_SUB = levels(3020116, {
  very_easy: [
    (n) => typed("short_answer", n, "9 + 6 = ?", "15", "Make a ten: 9 + 1 = 10, then 5 more is 15."),
    (n) => typed("short_answer", n, "14 − 8 = ?", "6", "Think of the adding fact: 8 + 6 = 14, so 14 − 8 = 6."),
    (n) =>
      trueFalse(
        n,
        "12 − 5 gives the same answer as 5 − 12.",
        false,
        "Order matters when you take away. 12 − 5 = 7, but you can't take 12 away from 5 and get 7.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "52 + 36 = ?", "88", "Add the tens: 50 + 30 = 80. Add the ones: 2 + 6 = 8. 80 + 8 = 88."),
    (n) => typed("short_answer", n, "69 − 27 = ?", "42", "Take away the tens: 60 − 20 = 40. Take away the ones: 9 − 7 = 2. 40 + 2 = 42."),
    (n) => choice(n, "Which is the same as 90 − 50?", ["4", "40", "140", "45"], 1, "9 tens take away 5 tens leaves 4 tens, which is 40."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "268 + 157 = ?",
        "425",
        "Hundreds: 200 + 100 = 300. Tens: 60 + 50 = 110. Ones: 8 + 7 = 15. 300 + 110 + 15 = 425.",
      ),
    (n) => typed("short_answer", n, "400 − 135 = ?", "265", "Count up from 135: 5 to 140, 60 to 200, then 200 to 400. 5 + 60 + 200 = 265."),
    (n) =>
      choice(
        n,
        "A bakery made 216 pies and sold 89. How many pies are left?",
        ["127", "137", "305", "173"],
        0,
        "216 − 89: take away 90 to get 126, then add back 1, which is 127.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "2645 + 1380 = ?", "4025", "2000 + 1000 = 3000, and 645 + 380 = 1025. 3000 + 1025 = 4025."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball club raised $705 at a sausage sizzle. They spent $268 on food. How many dollars are left?",
        ["437", "$437"],
        "705 − 268: count up from 268. 32 to 300, then 405 to 705. 32 + 405 = 437, so $437 is left.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 812 − 397?",
        ["300", "400", "500", "1200"],
        1,
        "812 is about 800 and 397 is about 400, so the answer is about 800 − 400 = 400.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "5002 − 2765 = ?",
        "2237",
        "Count up from 2765: 35 to 2800, 200 to 3000, then 2002 to 5002. 35 + 200 + 2002 = 2237.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A train had 438 people on it. At Central, 129 people got off and 76 got on. How many people are on the train now?",
        "385",
        "438 − 129 = 309 people stayed on. Then 309 + 76 = 385 people.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make exactly 500? Choose all that are right.",
        ["275 + 225", "800 − 300", "348 + 162", "1000 − 450"],
        [0, 1],
        "275 + 225 = 500 and 800 − 300 = 500. But 348 + 162 = 510 and 1000 − 450 = 550.",
      ),
  ],
});

/** MA2-AR-02: missing values in addition and subtraction. */
export const MISSING_ADD = levels(3020216, {
  very_easy: [
    (n) => typed("fill_blank", n, "7 + ___ = 10", "3", "7 and 3 make 10."),
    (n) => typed("fill_blank", n, "___ + 4 = 9", "5", "Count back 4 from 9 to get 5. Check: 5 + 4 = 9."),
    (n) => trueFalse(n, "If 6 + 8 = 14, then 14 − 8 = 6.", true, "Taking away undoes adding, so 14 − 8 gets back to 6."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "18 − ___ = 11", "7", "Count up from 11 to 18: that is 7. Check: 18 − 7 = 11."),
    (n) => typed("fill_blank", n, "___ + 40 = 90", "50", "9 tens take away 4 tens is 5 tens, so the missing number is 50."),
    (n) => choice(n, "Which number makes ? − 5 = 9 true?", ["4", "14", "13", "45"], 1, "Add back the 5: 9 + 5 = 14. Check: 14 − 5 = 9."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "62 + ___ = 100", "38", "62 + 8 = 70, and 70 + 30 = 100. 8 + 30 = 38."),
    (n) => typed("fill_blank", n, "80 − ___ = 35", "45", "Count up from 35 to 80: 5 to 40, then 40 to 80. 5 + 40 = 45."),
    (n) =>
      choice(
        n,
        "Ella had 52 stickers. She gave some away and now has 37. Which number sentence matches?",
        ["52 − ? = 37", "52 + ? = 37", "37 − 52 = ?", "? − 52 = 37"],
        0,
        "She started with 52, took away an unknown amount, and was left with 37: 52 − ? = 37.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ + 275 = 500", "225", "Count up from 275: 25 to 300, then 200 to 500. 25 + 200 = 225."),
    (n) => typed("fill_blank", n, "430 − ___ = 180", "250", "Count up from 180: 20 to 200, then 230 to 430. 20 + 230 = 250."),
    (n) =>
      typed(
        "short_answer",
        n,
        "The school needs 300 chairs for the concert. 168 are set out. How many more chairs are needed?",
        "132",
        "Count up from 168: 32 to 200, then 100 to 300. 32 + 100 = 132.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "1000 − ___ = 628", "372", "1000 − 628 = 372. Check: 628 + 372 = 1000."),
    (n) => typed("fill_blank", n, "45 + 25 = 100 − ___", "30", "45 + 25 = 70, so 100 − ? = 70. 100 − 30 = 70."),
    (n) =>
      trueFalse(n, "63 − 28 = 65 − 30", true, "Both sides make 35. Adding 2 to both numbers in a take-away keeps the difference the same."),
  ],
});

/** MA2-MR-01: multiplication and division facts. */
export const TIMES = levels(3030116, {
  very_easy: [
    (n) => typed("short_answer", n, "3 × 2 = ?", "6", "3 groups of 2 is 2 + 2 + 2 = 6."),
    (n) =>
      pic(
        { kind: "array", rows: 2, columns: 5 },
        typed("short_answer", n, "How many dots are there altogether?", "10", "There are 2 rows of 5 dots. 5 + 5 = 10."),
      ),
    (n) => trueFalse(n, "3 + 3 + 3 is the same as 3 × 3.", true, "There are three 3s, so it is 3 × 3. Both make 9."),
  ],
  easy: [
    (n) => typed("short_answer", n, "5 × 6 = ?", "30", "Count by fives 6 times: 5, 10, 15, 20, 25, 30."),
    (n) => typed("short_answer", n, "8 × 10 = ?", "80", "8 groups of 10 is 8 tens, which is 80."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 3 },
        choice(
          n,
          "Which number sentence matches this array?",
          ["4 × 3 = 12", "4 + 3 = 7", "4 × 4 = 16", "3 × 3 = 9"],
          0,
          "There are 4 rows with 3 dots in each row, so 4 × 3 = 12.",
        ),
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "3 × 7 = ?", "21", "Count by threes 7 times: 3, 6, 9, 12, 15, 18, 21."),
    (n) => typed("short_answer", n, "24 ÷ 4 = ?", "6", "How many 4s make 24? 4 × 6 = 24, so the answer is 6."),
    (n) =>
      choice(
        n,
        "There are 5 packets with 8 biscuits in each. How many biscuits are there altogether?",
        ["13", "40", "35", "45"],
        1,
        "5 groups of 8 is 5 × 8 = 40.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "6 × 8 = ?", "48", "Double 3 × 8 = 24 to get 48."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mr Ng shares 36 oranges equally among 4 netball teams. How many oranges does each team get?",
        "9",
        "36 ÷ 4 = 9, because 4 × 9 = 36.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make 18? Choose all that are right.",
        ["2 × 9", "3 × 6", "4 × 4", "6 × 3"],
        [0, 1, 3],
        "2 × 9, 3 × 6 and 6 × 3 all make 18. 4 × 4 is 16.",
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "56 ÷ 8 = ?", "7", "Think: 8 × what = 56? 8 × 7 = 56, so the answer is 7."),
    (n) =>
      typed(
        "short_answer",
        n,
        "27 lollies are shared equally among 5 children. How many lollies are left over?",
        "2",
        "Each child gets 5, because 5 × 5 = 25. 27 − 25 = 2 lollies are left over.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Kai buys 3 packs of 6 juice boxes and 2 packs of 4 juice boxes. How many juice boxes is that?",
        "26",
        "3 × 6 = 18 and 2 × 4 = 8. 18 + 8 = 26 juice boxes.",
      ),
  ],
});

/** MA2-MR-02: missing values in multiplication and division. */
export const MISSING_TIMES = levels(3030216, {
  very_easy: [
    (n) => typed("fill_blank", n, "5 × ___ = 15", "3", "Count by fives: 5, 10, 15. That is 3 fives."),
    (n) => typed("fill_blank", n, "___ × 2 = 8", "4", "Four 2s make 8: 2, 4, 6, 8."),
    (n) => trueFalse(n, "If 2 × 6 = 12, then 12 ÷ 2 = 6.", true, "Dividing undoes multiplying, so 12 ÷ 2 gets back to 6."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "___ × 10 = 90", "9", "9 tens make 90."),
    (n) => typed("fill_blank", n, "20 ÷ ___ = 2", "10", "20 shared into 10 equal groups gives 2 in each, because 10 × 2 = 20."),
    (n) => choice(n, "Which number makes 3 × ? = 15 true?", ["5", "12", "45", "6"], 0, "3 × 5 = 15."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "6 × ___ = 30", "5", "Count by sixes to 30: 6, 12, 18, 24, 30. That is 5 sixes."),
    (n) => typed("fill_blank", n, "___ ÷ 4 = 5", "20", "Undo the division: 5 × 4 = 20."),
    (n) =>
      choice(
        n,
        "Jo puts 24 stickers equally onto 3 pages. Which number sentence finds how many go on each page?",
        ["24 ÷ 3 = ?", "24 × 3 = ?", "24 − 3 = ?", "3 ÷ 24 = ?"],
        0,
        "Sharing 24 stickers equally into 3 groups is division: 24 ÷ 3 = ?.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "7 × ___ = 63", "9", "7 × 9 = 63."),
    (n) => typed("fill_blank", n, "48 ÷ ___ = 8", "6", "6 × 8 = 48, so 48 ÷ 6 = 8."),
    (n) =>
      typed(
        "short_answer",
        n,
        "I think of a number and divide it by 5. The answer is 7. What was my number?",
        "35",
        "? ÷ 5 = 7. Undo it by multiplying: 7 × 5 = 35.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "4 × ___ = 6 × 6", "9", "6 × 6 = 36, so 4 × ? = 36, and 4 × 9 = 36."),
    (n) => typed("fill_blank", n, "___ ÷ 3 = 10 − 2", "24", "10 − 2 = 8, so ? ÷ 3 = 8. Undo it: 8 × 3 = 24."),
    (n) => trueFalse(n, "6 × 4 = 3 × 9", false, "6 × 4 = 24 but 3 × 9 = 27, so the two sides are not equal."),
  ],
});

/** MA2-PF-01: fractions, including on a number line. */
export const FRACTIONS = levels(3050116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 2, shaded: 1 },
        choice(
          n,
          "What fraction of the circle is shaded?",
          ["one half", "one quarter", "one third", "two"],
          0,
          "The circle is cut into 2 equal parts and 1 is shaded, so one half is shaded.",
        ),
      ),
    (n) => trueFalse(n, "A pizza cut into 4 equal slices is cut into quarters.", true, "4 equal parts are called quarters."),
    (n) => choice(n, "How many halves make a whole?", ["1", "2", "3", "4"], 1, "A whole cut into halves has 2 equal parts."),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is half of 14?", "7", "14 shared into 2 equal groups is 7 in each. Check: 7 + 7 = 14."),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 3, shaded: 2 },
        choice(
          n,
          "What fraction of the bar is shaded?",
          ["2/3", "1/3", "3/2", "2/5"],
          0,
          "The bar is cut into 3 equal parts and 2 are shaded, so 2/3 is shaded.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "1/4 is bigger than 1/2.",
        false,
        "Cutting a whole into 4 parts makes smaller parts than cutting it into 2, so 1/2 is bigger.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is one third of 15?", "5", "15 shared into 3 equal groups is 5 in each."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 3, dotAt: 2 },
        choice(
          n,
          "The line from 0 to 1 is split into equal jumps. What fraction is the dot on?",
          ["2/3", "1/3", "2/4", "3/2"],
          0,
          "There are 3 equal jumps from 0 to 1, so each jump is 1/3. The dot is 2 jumps along: 2/3.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from largest to smallest.",
        ["1", "3/4", "1/2", "1/4"],
        "1 whole is 4 quarters. Then 3 quarters, then 1/2 (which is 2 quarters), then 1 quarter.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "What is two thirds of 12?", "8", "One third of 12 is 4, so two thirds is 2 × 4 = 8."),
    (n) =>
      multi(
        n,
        "Which of these are equal to 1/2? Choose all that are right.",
        ["2/4", "4/8", "1/4", "2/8"],
        [0, 1],
        "2 quarters and 4 eighths cover the same amount as 1 half. 1/4 and 2/8 are both only one quarter.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 8, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What fraction of the circle is NOT shaded?",
          ["5/8", "five eighths"],
          "The circle has 8 equal parts and 3 are shaded. 8 − 3 = 5 parts are not shaded, so 5/8.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ben ate 3/8 of a cake and Ana ate 2/8 of it. What fraction of the cake is left?",
        ["3/8", "three eighths"],
        "They ate 3 eighths and 2 eighths, which is 5 eighths. The whole cake is 8 eighths, and 8 − 5 = 3 eighths are left.",
      ),
    (n) =>
      trueFalse(n, "1/5 is bigger than 1/3.", false, "Fifths are smaller pieces than thirds, because the whole is shared into more parts."),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 20 children in a class. 2/5 of them walk to school. How many children walk?",
        "8",
        "One fifth of 20 is 4, so two fifths is 2 × 4 = 8.",
      ),
  ],
});

/** MA2-GM-02: length in metres, centimetres and millimetres. */
export const LENGTH = levels(3040216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the length of a swimming pool?",
        ["metres", "millimetres", "kilograms", "litres"],
        0,
        "A swimming pool is long, so metres are a good unit.",
      ),
    (n) => trueFalse(n, "A centimetre is longer than a millimetre.", true, "1 centimetre is the same as 10 millimetres."),
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 4, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "How long is the ribbon, in centimetres?",
          ["4", "4 cm"],
          "The ribbon starts at 0 and ends at 4, so it is 4 cm long.",
        ),
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "2 metres = ___ centimetres", "200", "Each metre is 100 cm, so 2 metres is 200 cm."),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the height of a classroom door?",
        ["2 m", "2 cm", "20 m", "200 mm"],
        0,
        "A door is a bit taller than an adult, about 2 m. 200 mm is only 20 cm.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 9, object: "pencil" },
        choice(
          n,
          "How long is the pencil?",
          ["9 cm", "10 cm", "8 cm", "12 cm"],
          0,
          "The pencil starts at 0 and ends at 9, so it is 9 cm long.",
        ),
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "5 cm = ___ mm", "50", "Each centimetre is 10 mm, so 5 cm is 50 mm."),
    (n) =>
      typed("short_answer", n, "How many centimetres are there in half a metre?", "50", "1 metre is 100 cm, and half of 100 is 50 cm."),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from longest to shortest.",
        ["3 m", "150 cm", "90 cm", "9 mm"],
        "3 m is 300 cm, then 150 cm, then 90 cm. 9 mm is less than 1 cm, so it is the shortest.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 3, top: "8 cm", side: "3 cm" },
        typed("short_answer", n, "What is the perimeter of this rectangle?", ["22", "22 cm"], "Add all four sides: 8 + 3 + 8 + 3 = 22 cm."),
      ),
    (n) => typed("fill_blank", n, "340 cm = 3 m and ___ cm", "40", "300 cm is 3 m, and 40 cm is left over."),
    (n) =>
      choice(
        n,
        "Which length is the same as 2 m 5 cm?",
        ["205 cm", "250 cm", "25 cm", "2005 cm"],
        0,
        "2 m is 200 cm, and 200 + 5 = 205 cm. 250 cm would be 2 m 50 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A pool is 25 m long. Lily swims 6 lengths. How many metres does she swim?",
        ["150", "150 m"],
        "6 × 25 = 150 m. Think: 4 lengths is 100 m, and 2 more is 50 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has a perimeter of 30 cm. Its length is 10 cm. How wide is it, in centimetres?",
        ["5", "5 cm"],
        "The two long sides are 10 + 10 = 20 cm. That leaves 30 − 20 = 10 cm for the two short sides, so each is 5 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Tom has a ribbon 1 m long. He cuts off 35 cm. How many centimetres of ribbon are left?",
        ["65", "65 cm"],
        "1 m is 100 cm. 100 − 35 = 65 cm.",
      ),
  ],
});

/** MA2-NSM-02: analog and digital time. */
export const TIME = levels(3040116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 0 },
        choice(
          n,
          "What time does the clock show?",
          ["9 o'clock", "12 o'clock", "3 o'clock", "9:30"],
          0,
          "The minute hand points to 12, so it is o'clock. The hour hand points to 9, so it is 9 o'clock.",
        ),
      ),
    (n) => typed("fill_blank", n, "There are ___ months in a year.", ["12", "twelve"], "A year has 12 months, January to December."),
    (n) => trueFalse(n, "There are 60 seconds in 1 minute.", true, "Each minute is 60 seconds long."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 5, minute: 30 },
        typed(
          "short_answer",
          n,
          "What time does the clock show? Write it in digital time.",
          ["5:30", "half past 5", "half past five"],
          "The minute hand points to 6, which is half past. The hour hand is between 5 and 6, so it is 5:30.",
        ),
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 10, minute: 45 },
        choice(
          n,
          "What time does this clock show?",
          ["quarter to 11", "quarter past 10", "quarter to 10", "10:09"],
          0,
          "The minute hand points to 9, which is 45 minutes past, or quarter to the next hour. The hour hand is nearly at 11, so it is quarter to 11.",
        ),
      ),
    (n) => trueFalse(n, "Half past 8 is the same as 8:30.", true, "Half an hour is 30 minutes, so half past 8 is 8:30."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many minutes are there from 9:10 to 9:55?",
        ["45", "45 minutes"],
        "From 10 minutes past to 55 minutes past is 55 − 10 = 45 minutes.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 20 },
        typed(
          "short_answer",
          n,
          "What time does the clock show?",
          ["4:20", "twenty past 4", "twenty past four"],
          "The minute hand points to 4, and each number is 5 minutes, so it is 4 × 5 = 20 minutes past. The hour hand is just past 4, so it is 4:20.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from shortest to longest.",
        ["1 second", "1 minute", "1 hour", "1 day", "1 week"],
        "60 seconds make a minute, 60 minutes make an hour, 24 hours make a day, and 7 days make a week.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball game starts at 11:40 am and lasts 50 minutes. What time does it end?",
        ["12:30", "12:30 pm", "12:30pm"],
        "20 minutes after 11:40 is 12:00. 30 more minutes is 12:30 pm. 20 + 30 = 50 minutes.",
      ),
    (n) =>
      choice(
        n,
        "What is 8:00 pm in 24-hour time?",
        ["20:00", "08:00", "18:00", "22:00"],
        0,
        "Add 12 to afternoon and evening hours: 8 + 12 = 20, so 20:00.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Lunch starts at 12:50 pm and ends at 1:35 pm. How many minutes long is lunch?",
        ["45", "45 minutes"],
        "12:50 to 1:00 is 10 minutes, and 1:00 to 1:35 is 35 minutes. 10 + 35 = 45 minutes.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "What is 14:45 in 12-hour time?",
        ["2:45 pm", "4:45 pm", "2:45 am", "12:45 pm"],
        0,
        "14 − 12 = 2, and hours after 12 are pm, so 2:45 pm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bus leaves Sydney at 9:50 am. The trip takes 2 hours 15 minutes. What time does it arrive?",
        ["12:05", "12:05 pm", "12:05pm"],
        "2 hours after 9:50 am is 11:50 am. 15 more minutes is 12:05 pm.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 6, minute: 35 },
        typed(
          "short_answer",
          n,
          "The clock shows when Ella started her homework. She worked for 40 minutes. What time did she finish?",
          ["7:15", "7:15 pm", "quarter past 7", "quarter past seven"],
          "The clock shows 6:35. 25 minutes takes her to 7:00, and 15 more minutes is 7:15. 25 + 15 = 40 minutes.",
        ),
      ),
  ],
});

const ANIMAL_VOTES: Picture = {
  kind: "column_graph",
  title: "Favourite Australian animal",
  columns: [
    { label: "koala", value: 6 },
    { label: "kangaroo", value: 4 },
    { label: "wombat", value: 8 },
    { label: "emu", value: 2 },
  ],
};

const CANTEEN: Picture = {
  kind: "table",
  headings: ["Canteen food", "Number sold"],
  rows: [
    ["sushi", 12],
    ["wraps", 9],
    ["pies", 15],
    ["fruit cups", 6],
  ],
};

const GOALS: Picture = {
  kind: "dot_plot",
  title: "Goals scored in each game",
  columns: [
    { label: "0", count: 2 },
    { label: "1", count: 4 },
    { label: "2", count: 5 },
    { label: "3", count: 3 },
    { label: "4", count: 1 },
  ],
};

/** MA2-DATA-02: interpreting tables, dot plots and column graphs. */
export const DATA = levels(3060116, {
  very_easy: [
    (n) =>
      pic(
        ANIMAL_VOTES,
        choice(
          n,
          "Look at the graph. Which animal got the fewest votes?",
          ["koala", "kangaroo", "wombat", "emu"],
          3,
          "The emu column is the shortest. Emu got only 2 votes.",
        ),
      ),
    (n) =>
      pic(ANIMAL_VOTES, typed("short_answer", n, "Look at the graph. How many votes did koala get?", "6", "The koala column reaches 6.")),
    (n) =>
      trueFalse(
        n,
        "A table shows information in rows and columns.",
        true,
        "A table is set out in rows going across and columns going down, so it is easy to read.",
      ),
  ],
  easy: [
    (n) =>
      pic(ANIMAL_VOTES, typed("short_answer", n, "Look at the graph. How many votes were there in total?", "20", "6 + 4 + 8 + 2 = 20.")),
    (n) =>
      pic(
        ANIMAL_VOTES,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more votes did wombat get than kangaroo?",
          "4",
          "Wombat got 8 and kangaroo got 4, so 8 − 4 = 4 more votes.",
        ),
      ),
    (n) =>
      pic(
        ANIMAL_VOTES,
        choice(
          n,
          "Look at the graph. Which two animals together got the same number of votes as wombat?",
          ["koala and emu", "kangaroo and emu", "koala and kangaroo"],
          0,
          "Wombat got 8. Koala and emu: 6 + 2 = 8. Kangaroo and emu make 6, and koala and kangaroo make 10.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        CANTEEN,
        typed(
          "short_answer",
          n,
          "The table shows what the canteen sold on Monday. How many more pies than wraps were sold?",
          "6",
          "15 pies and 9 wraps were sold, so 15 − 9 = 6 more pies.",
        ),
      ),
    (n) =>
      pic(
        CANTEEN,
        choice(
          n,
          "The table shows what the canteen sold on Monday. Which food sold twice as many as fruit cups?",
          ["sushi", "wraps", "pies", "fruit cups"],
          0,
          "6 fruit cups were sold. Twice 6 is 12, and 12 sushi were sold.",
        ),
      ),
    (n) =>
      pic(
        CANTEEN,
        trueFalse(
          n,
          "The table shows what the canteen sold on Monday. Wraps and fruit cups together sold more than pies.",
          false,
          "9 + 6 = 15, which is the same as the 15 pies, not more.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        GOALS,
        choice(
          n,
          "The dot plot shows the goals a soccer team scored. Each dot is one game. What number of goals was scored most often?",
          ["0", "1", "2", "3"],
          2,
          "The tallest stack of dots is above 2, with 5 dots. So 2 goals happened most often.",
        ),
      ),
    (n) =>
      pic(
        GOALS,
        typed(
          "short_answer",
          n,
          "The dot plot shows the goals a soccer team scored. Each dot is one game. How many games are shown?",
          "15",
          "Count every dot: 2 + 4 + 5 + 3 + 1 = 15 games.",
        ),
      ),
    (n) =>
      pic(
        GOALS,
        typed(
          "short_answer",
          n,
          "The dot plot shows the goals a soccer team scored. Each dot is one game. In how many games did the team score 3 or more goals?",
          "4",
          "There are 3 dots above 3 and 1 dot above 4. 3 + 1 = 4 games.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Cans collected for recycling",
          thing: "cans",
          each: 10,
          rows: [
            { label: "3K", count: 6 },
            { label: "3R", count: 4 },
            { label: "3S", count: 8 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph and its key. How many more cans did 3S collect than 3R?",
          "40",
          "3S has 8 pictures and 3R has 4, so 3S has 4 more pictures. Each picture is 10 cans, and 4 × 10 = 40 cans.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Ice blocks sold",
          columns: [
            { label: "Mon", value: 12 },
            { label: "Tue", value: 8 },
            { label: "Wed", value: 16 },
            { label: "Thu", value: 8 },
          ],
          step: 4,
        },
        multi(
          n,
          "Look at the graph. Which of these are true? Choose all that are right.",
          ["Wednesday sold twice as many as Tuesday", "Tuesday and Thursday sold the same", "The total is 40", "Monday sold the most"],
          [0, 1],
          "Wednesday sold 16, which is twice Tuesday's 8. Tuesday and Thursday both sold 8. The total is 12 + 8 + 16 + 8 = 44, and Wednesday sold the most.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A survey asked 25 students their favourite colour. 8 chose blue, 7 chose red and the rest chose green. How many chose green?",
        ["10", "15", "9", "17"],
        0,
        "8 + 7 = 15 chose blue or red, so 25 − 15 = 10 chose green.",
      ),
  ],
});

/** MA2-CHAN-01: chance experiments. */
export const CHANCE = levels(3060216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Today is Wednesday. How likely is it that tomorrow will be Thursday?",
        ["certain", "impossible", "unlikely"],
        0,
        "Thursday always comes after Wednesday, so it is certain.",
      ),
    (n) =>
      choice(
        n,
        "How likely is it that a kangaroo will fly to the moon?",
        ["impossible", "certain", "likely"],
        0,
        "Kangaroos can't fly, let alone to the moon, so it is impossible.",
      ),
    (n) =>
      trueFalse(
        n,
        "When you roll a normal dice, getting a 1 is impossible.",
        false,
        "A dice has a 1 on one of its faces, so rolling a 1 can happen. It is possible.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "red", "red", "blue"] },
        choice(
          n,
          "Which colour is this spinner most likely to land on?",
          ["red", "blue", "they are equally likely"],
          0,
          "3 of the 4 equal parts are red and only 1 is blue, so red is more likely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A bag has only green counters in it. You pick one without looking. Picking green is…",
        ["certain", "impossible", "unlikely", "likely"],
        0,
        "Every counter in the bag is green, so you are sure to pick green. It is certain.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A spinner has 5 equal parts coloured red, blue, green, yellow and orange. How many different colours could it land on?",
        "5",
        "Each of the 5 parts is a different colour, so there are 5 possible colours.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "blue", count: 6 },
            { colour: "yellow", count: 4 },
          ],
        },
        ordering(
          n,
          "You pick one counter from this bag without looking. Put the colours in order from most likely to least likely.",
          ["blue", "yellow", "red"],
          "More counters means more likely: blue (6), yellow (4), red (2).",
        ),
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "yellow", "green", "yellow"] },
        choice(
          n,
          "Compared with landing on yellow, landing on green on this spinner is…",
          ["equally likely", "more likely", "less likely"],
          0,
          "2 parts are green and 2 parts are yellow, so they have the same chance.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a normal dice, rolling a number greater than 4 is likely.",
        false,
        "Only 5 and 6 are greater than 4. That is 2 faces out of 6, so it is unlikely.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "You roll a normal dice numbered 1 to 6. Which of these are impossible? Choose all that are right.",
        ["rolling an 8", "rolling a 0", "rolling a 3", "rolling a number less than 1"],
        [0, 1, 3],
        "The dice only shows 1 to 6. 8, 0 and numbers less than 1 can't be rolled. A 3 can be rolled.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "blue", count: 3 },
            { colour: "green", count: 6 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. Which of these is true?",
          [
            "Green is more likely than red",
            "Red is more likely than green",
            "All colours are equally likely",
            "Picking blue is impossible",
          ],
          0,
          "There are 6 green counters but only 3 red, so green is more likely than red. Blue is possible, because there are 3 blue.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jay rolled a dice 30 times. He rolled a 6 on 4 of those rolls. How many times did he NOT roll a 6?",
        "26",
        "Every roll is either a 6 or not a 6. 30 − 4 = 26 rolls were not a 6.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Ali spun a spinner 20 times. It landed on red 10 times, blue 9 times and green once. What does the spinner most likely look like?",
        [
          "about half red, nearly half blue and a small part green",
          "all green",
          "half green and half red",
          "equal parts red, blue and green",
        ],
        0,
        "Red came up about half the time, blue nearly half and green hardly at all, so green is probably only a small part.",
      ),
    (n) =>
      choice(
        n,
        "Which spinner gives the best chance of landing on yellow?",
        ["3 yellow parts out of 4", "1 yellow part out of 2", "2 yellow parts out of 8", "1 yellow part out of 4"],
        0,
        "3 out of 4 is more than half the spinner. 1 out of 2 is exactly half, and the others are only a quarter.",
      ),
    (n) =>
      trueFalse(
        n,
        "Mia rolled a dice 6 times and never got a 6. So she is certain to get a 6 on her next roll.",
        false,
        "A dice doesn't remember past rolls. A 6 is still just 1 of the 6 faces on the next roll, so it is not certain.",
      ),
  ],
});

/** MA2-NSM-01: mass in kilograms and grams. */
export const MASS = levels(3040316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the mass of a strawberry?",
        ["grams", "kilograms", "litres", "metres"],
        0,
        "A strawberry is very light, so grams are a good unit.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 10, value: 6, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "A bag of oranges is on the scale. What is its mass?",
          ["6", "6 kg", "6 kilograms"],
          "The pointer is on the 6, so the oranges weigh 6 kg.",
        ),
      ),
    (n) =>
      trueFalse(n, "A feather is heavier than a brick.", false, "A brick is much heavier than a feather. A feather weighs almost nothing."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "3 kilograms = ___ grams", "3000", "Each kilogram is 1000 grams, so 3 kilograms is 3000 grams."),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 200, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "Some butter is on the scale. How many grams of butter are there?",
          ["200", "200 g", "200 grams"],
          "The pointer is on the 200 mark, so there are 200 g of butter.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these have a mass of more than 1 kilogram? Choose all that are right.",
        ["a bicycle", "a sheep", "a coin", "a pencil"],
        [0, 1],
        "A bicycle and a sheep are heavy, many kilograms. A coin and a pencil are only a few grams.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 850, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "How many grams does the scale show?",
          ["850", "850 g", "850 grams"],
          "The pointer is on the small mark halfway between 800 and 900. Halfway is 850 g.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from heaviest to lightest.",
        ["3 kg", "2 kg 500 g", "1800 g", "950 g"],
        "3 kg is 3000 g and 2 kg 500 g is 2500 g. So the order is 3000 g, 2500 g, 1800 g, 950 g.",
      ),
    (n) =>
      choice(
        n,
        "A bag of dog food has a mass of 5 kg. How many grams is that?",
        ["5000 g", "500 g", "50 g", "5 g"],
        0,
        "Each kilogram is 1000 g, so 5 kg is 5000 g.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 3.5, step: 1, unit: "kg" },
        choice(
          n,
          "A watermelon is on the scale. What is its mass?",
          ["3 kg 500 g", "3 kg", "4 kg", "35 kg"],
          0,
          "The pointer is halfway between 3 kg and 4 kg. Half a kilogram is 500 g, so the watermelon is 3 kg 500 g.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag of carrots has a mass of 2 kg 750 g. How many grams is that?",
        ["2750", "2750 g", "2750 grams"],
        "2 kg is 2000 g, and 2000 + 750 = 2750 g.",
      ),
    (n) =>
      trueFalse(
        n,
        "500 g is the same as half a kilogram.",
        true,
        "1 kilogram is 1000 g, and half of 1000 is 500, so 500 g is half a kilogram.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A box of books has a mass of 4 kg. Lucas adds a 750 g book. What is the mass now, in grams?",
        ["4750", "4750 g", "4 kg 750 g"],
        "4 kg is 4000 g. 4000 + 750 = 4750 g.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 450, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "Some flour is on the scale. How many more grams of flour are needed to make 1 kg?",
          ["550", "550 g", "550 grams"],
          "The pointer is halfway between 400 and 500, so it shows 450 g. 1 kg is 1000 g, and 1000 − 450 = 550 g.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Each tin of beans has a mass of 500 g. What is the mass of 6 tins?",
        ["3 kg", "30 kg", "2 kg 500 g", "3 kg 500 g"],
        0,
        "6 × 500 g = 3000 g. 1000 g is 1 kg, so 3000 g is 3 kg.",
      ),
  ],
});

/** MA2-3DS-02: capacity in litres and millilitres, and volume in cubic centimetres. */
export const CAPACITY = levels(3040416, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the medicine on a spoon?",
        ["millilitres", "litres", "kilograms", "metres"],
        0,
        "A spoon holds only a little liquid, so millilitres are the right unit.",
      ),
    (n) =>
      pic(
        { kind: "jug", max: 5, value: 4, step: 1, unit: "L" },
        typed(
          "short_answer",
          n,
          "How many litres of water are in the jug?",
          ["4", "4 L", "4 litres"],
          "The water comes up to the 4 L mark, so there are 4 litres.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A bucket holds more water than a cup.",
        true,
        "A bucket holds several litres. A cup holds only a few hundred millilitres.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "3 litres = ___ millilitres", "3000", "Each litre is 1000 mL, so 3 litres is 3000 mL."),
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 700, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "How many millilitres of water are in the jug?",
          ["700", "700 mL", "700 millilitres"],
          "The water comes up to the 700 mL mark.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these hold more than 1 litre? Choose all that are right.",
        ["a bathtub", "a watering can", "a teaspoon", "an egg cup"],
        [0, 1],
        "A bathtub and a watering can hold many litres. A teaspoon and an egg cup hold only a few millilitres.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 500, step: 250, unit: "mL" },
        typed(
          "short_answer",
          n,
          "This jug is marked in steps of 250 mL. How much water is in it?",
          ["500", "500 mL", "500 millilitres"],
          "The marks go 250, 500, 750, 1000. The water is at the second mark, 500 mL.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. What is its volume in cubic centimetres?",
          ["8", "8 cubic centimetres", "8 cm³"],
          "There are 2 rows of 4 cubes, which is 8 cubes. Each cube is 1 cubic centimetre, so the volume is 8 cubic centimetres.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from largest capacity to smallest.",
        ["a swimming pool", "a bathtub", "a kettle", "a glass"],
        "A pool holds thousands of litres, a bathtub a few hundred, a kettle about 1 or 2 litres and a glass only about 250 mL.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 1.5, step: 0.5, unit: "L" },
        choice(
          n,
          "How much water is in this jug?",
          ["1 L 500 mL", "1 L 50 mL", "15 L", "2 L"],
          0,
          "The water is at the 1.5 L mark. Half a litre is 500 mL, so 1.5 L is 1 L 500 mL.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Kim drinks a 250 mL glass of milk 3 times a day. How many millilitres of milk is that?",
        ["750", "750 mL", "750 millilitres"],
        "3 × 250 mL = 750 mL.",
      ),
    (n) =>
      choice(n, "Which is the same as 4000 mL?", ["4 L", "40 L", "400 L", "4 mL"], 0, "Every 1000 mL is 1 litre, so 4000 mL is 4 litres."),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        typed(
          "short_answer",
          n,
          "This model is built from 1 cm cubes. Some cubes are hidden at the back. What is its volume in cubic centimetres?",
          ["24", "24 cubic centimetres", "24 cm³"],
          "Each layer has 3 rows of 4, which is 12 cubes. There are 2 layers, so 12 + 12 = 24 cubic centimetres.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A 2 litre bottle of water is poured equally into 5 cups. How many millilitres go in each cup?",
        ["400", "400 mL", "400 millilitres"],
        "2 litres is 2000 mL, and 2000 ÷ 5 = 400 mL.",
      ),
    (n) =>
      trueFalse(
        n,
        "A tall, thin glass always holds more than a short, wide glass.",
        false,
        "Height alone doesn't tell you capacity. A short, wide glass can hold more. Pour from one into the other to check.",
      ),
  ],
});

/** MA2-2DS-03: area in square centimetres and square metres. */
export const AREA = levels(3040516, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 3,
          cells: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ],
        },
        typed("short_answer", n, "How many squares are shaded?", "4", "There are 2 rows of 2 shaded squares. 2 + 2 = 4."),
      ),
    (n) =>
      choice(
        n,
        "Which of these is an area?",
        ["the top of a table", "the mass of a dog", "the length of a rope", "the water in a bath"],
        0,
        "Area is the flat space a surface covers. The top of a table is a flat surface.",
      ),
    (n) =>
      trueFalse(
        n,
        "Area tells us how long a line is.",
        false,
        "Length tells us how long a line is. Area tells us how much flat space a shape covers.",
      ),
  ],
  easy: [
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
          "Each small square is 1 square centimetre. What is the area of this square?",
          ["9", "9 square centimetres", "9 cm²"],
          "There are 3 rows of 3 squares. 3 + 3 + 3 = 9 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a phone screen?",
        ["square centimetres", "square metres", "millilitres", "grams"],
        0,
        "A phone screen is small, so square centimetres are the right unit for its area.",
      ),
    (n) =>
      multi(
        n,
        "Which of these would you measure in square metres? Choose all that are right.",
        ["a soccer field", "a bedroom floor", "a postage stamp", "a playing card"],
        [0, 1],
        "A soccer field and a bedroom floor are big, so use square metres. A stamp and a card are small, so use square centimetres.",
      ),
  ],
  medium: [
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
            [2, 1],
            [2, 2],
            [2, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the shaded shape?",
          ["8", "8 square centimetres", "8 cm²"],
          "Count the shaded squares: 5 along the bottom and 3 more going up. 5 + 3 = 8 square centimetres.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 2],
            [3, 2],
            [3, 5],
            [0, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of this shape?",
          ["21", "21 square centimetres", "21 cm²"],
          "Split it into two rectangles: the bottom is 2 rows of 6, which is 12, and the top part is 3 rows of 3, which is 9. 12 + 9 = 21.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two shapes can look different but have the same area.",
        true,
        "A 1 by 4 strip and a 2 by 2 square both cover 4 squares, so they have the same area.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 4],
            [0, 4],
          ],
          sideLabels: ["6 m", "4 m"],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "This is a classroom floor. Each small square is 1 square metre. What is its area?",
          ["24", "24 square metres", "24 m²"],
          "There are 4 rows of 6 squares. 4 × 6 = 24 square metres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which has the larger area: a rectangle 5 cm by 2 cm, or a square 3 cm by 3 cm?",
        ["the square", "the rectangle", "they are the same"],
        1,
        "The rectangle is 2 rows of 5, which is 10 square centimetres. The square is 3 rows of 3, which is 9. 10 is more.",
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
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. What is the area of the triangle?",
          ["12 square centimetres", "24 square centimetres", "10 square centimetres", "6 square centimetres"],
          0,
          "The triangle is half of a 6 by 4 rectangle. The rectangle has 24 small squares, and half of 24 is 12.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 16 square centimetres? Choose all that are right.",
        ["4 cm by 4 cm", "2 cm by 8 cm", "1 cm by 16 cm", "6 cm by 2 cm"],
        [0, 1, 2],
        "4 rows of 4, 2 rows of 8 and 1 row of 16 all make 16 squares. 6 cm by 2 cm is only 12 squares (its distance around is 16 cm, not its area).",
      ),
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
            [4, 0],
            [0, 1],
            [1, 1],
          ],
        },
        typed(
          "short_answer",
          n,
          "Ruby is covering a noticeboard with square stickers. The shaded squares already have stickers. How many more stickers does she need to cover the whole board?",
          "13",
          "The board is 4 rows of 5, which is 20 squares. 7 already have stickers. 20 − 7 = 13 more stickers.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A lawn is 7 m long and 4 m wide. In the lawn is a vegetable patch 2 m long and 2 m wide. How many square metres of grass are there?",
        ["24", "24 square metres", "24 m²"],
        "The whole lawn is 4 rows of 7, which is 28 square metres. The patch is 2 rows of 2, which is 4. 28 − 4 = 24 square metres of grass.",
      ),
  ],
});

/** MA2-DATA-01: collecting data and drawing graphs with a given scale. */
export const DATA_COLLECT = levels(3060316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which is a good question for a class survey?",
        ["What is your favourite colour?", "What is 5 + 5?", "What day is it today?", "How many legs does a spider have?"],
        0,
        "A survey question has different answers from different people. Everyone gives the same answer to the others.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A tally shows 2 full bundles of five. What number is that?",
        "10",
        "Each bundle is 5, so 2 bundles is 5 + 5 = 10.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite drink",
          columns: [
            { label: "Water", value: 4 },
            { label: "Milk", value: 6 },
            { label: "Juice", value: 10 },
          ],
          step: 2,
        },
        choice(
          n,
          "Look at the graph. Which drink got the fewest votes?",
          ["Water", "Milk", "Juice"],
          0,
          "The water column is the shortest, so water got the fewest votes.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Ice-cream flavour", "Votes"],
          rows: [
            ["Vanilla", 6],
            ["Chocolate", 9],
            ["Strawberry", 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How many votes did chocolate and vanilla get together?",
          "15",
          "Chocolate got 9 and vanilla got 6. 9 + 6 = 15.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mr Brown's tally for 'walk to school' has 4 bundles of five and 1 more mark. How many students walk?",
        "21",
        "4 bundles of five is 20, and 20 + 1 = 21.",
      ),
    (n) =>
      trueFalse(
        n,
        "To find out what a whole class thinks, you should only ask your best friends.",
        false,
        "Your friends might all like the same things. To find out about the whole class, ask everyone.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite sport",
          columns: [
            { label: "Cricket", value: 7 },
            { label: "Netball", value: 4 },
            { label: "Soccer", value: 11 },
            { label: "Tennis", value: 2 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "The scale on this graph goes up in 2s. How many students chose soccer?",
          "11",
          "The soccer column stops halfway between 10 and 12. Halfway between 10 and 12 is 11.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Weather", "Days"],
          rows: [
            ["Sunny", 15],
            ["Cloudy", 10],
            ["Rainy", 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "Omar is drawing a column graph of this table. Each line on his scale is worth 5 days. How many lines up should the sunny column reach?",
          "3",
          "Sunny has 15 days. Each line is 5 days, and 15 ÷ 5 = 3 lines.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for a favourite fruit survey in order.",
        [
          "Write a list of fruits to choose from",
          "Ask each person to choose one",
          "Make a tally mark for each answer",
          "Count the tally marks",
        ],
        "First make the list of choices, then ask people, mark each answer as you go, and count the marks at the end.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Number of brothers and sisters",
          columns: [
            { label: "0", count: 4 },
            { label: "1", count: 6 },
            { label: "2", count: 3 },
            { label: "3", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Each dot is one student. How many students have 2 or more brothers and sisters?",
          "5",
          "There are 3 dots above 2 and 2 dots above 3. 3 + 2 = 5 students.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Laps run at the fun run",
          thing: "laps",
          each: 5,
          rows: [
            { label: "Zoe", count: 4 },
            { label: "Tom", count: 6 },
            { label: "Ari", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many laps did Tom run?",
          "30",
          "Tom has 6 stars and each star is 5 laps. 6 × 5 = 30 laps.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On a column graph with a scale going up in 4s, a column that stops halfway between 8 and 12 shows 10.",
        true,
        "Halfway between 8 and 12 is 10.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Library books borrowed",
          columns: [
            { label: "Mon", value: 30 },
            { label: "Tue", value: 45 },
            { label: "Wed", value: 20 },
            { label: "Thu", value: 35 },
          ],
          step: 10,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many books were borrowed on Monday and Tuesday altogether?",
          "75",
          "Monday shows 30. Tuesday stops halfway between 40 and 50, which is 45. 30 + 45 = 75 books.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In a picture graph, each star stands for 4 children. 10 children chose swimming. How should the swimming row look?",
        ["2 and a half stars", "10 stars", "4 stars", "3 stars"],
        0,
        "2 stars is 8 children, and half a star is 2 more. So 10 children is 2 and a half stars.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Lunch", "Students"],
          rows: [
            ["Sandwich", 10],
            ["Sushi", 6],
            ["Pasta", 8],
            ["Salad", 5],
          ],
        },
        multi(
          n,
          "Ms Chen will draw a column graph of this table with a scale going up in 2s. Which columns will end exactly on a line? Choose all that are right.",
          ["Sandwich", "Sushi", "Pasta", "Salad"],
          [0, 1, 2],
          "The lines are at 2, 4, 6, 8, 10 and so on. 10, 6 and 8 are on lines, but 5 is between 4 and 6.",
        ),
      ),
  ],
});

/** MA2-2DS-01: comparing two-dimensional shapes and describing their features. */
export const SHAPES_2D = levels(3070116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 2],
            [3, 0],
            [6, 2],
            [5, 6],
            [1, 6],
          ],
        },
        choice(n, "What is this shape called?", ["pentagon", "hexagon", "triangle", "octagon"], 0, "It has 5 sides, so it is a pentagon."),
      ),
    (n) => trueFalse(n, "A triangle has 4 corners.", false, "Tri means 3. A triangle has 3 sides and 3 corners."),
    (n) => typed("short_answer", n, "How many sides does a hexagon have?", "6", "A hexagon has 6 sides, like the cells in a honeycomb."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [5, 0],
            [7, 2],
            [7, 5],
            [5, 7],
            [2, 7],
            [0, 5],
            [0, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many sides does this shape have?",
          "8",
          "Count the straight sides: there are 8. It is an octagon, like a stop sign.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which shape has 5 sides?",
        ["pentagon", "hexagon", "octagon", "triangle"],
        0,
        "A pentagon has 5 sides. A hexagon has 6, an octagon 8 and a triangle 3.",
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have only straight sides? Choose all that are right.",
        ["triangle", "hexagon", "circle", "oval"],
        [0, 1],
        "Triangles and hexagons have only straight sides. A circle and an oval have a curved edge.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Squares, rectangles and rhombuses all have 4 straight sides. What are they all called?",
        ["quadrilaterals", "pentagons", "triangles", "hexagons"],
        0,
        "Any flat shape with 4 straight sides is a quadrilateral. Quad means 4.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [0, 4],
          ],
        },
        trueFalse(
          n,
          "This triangle has a right angle.",
          true,
          "The bottom left corner is a square corner, so the triangle has a right angle.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from most sides to fewest sides.",
        ["octagon", "hexagon", "pentagon", "quadrilateral", "triangle"],
        "An octagon has 8 sides, a hexagon 6, a pentagon 5, a quadrilateral 4 and a triangle 3.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [6, 4],
            [2, 4],
          ],
        },
        choice(
          n,
          "This shape has 4 sides and exactly one pair of parallel sides. What is it?",
          ["trapezium", "rhombus", "square", "pentagon"],
          0,
          "The top and bottom sides are parallel, but the slanting sides are not. A quadrilateral with exactly one pair of parallel sides is a trapezium.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are always true for a rhombus? Choose all that are right.",
        ["It has 4 equal sides", "It has 4 sides", "It has 4 right angles", "It has 4 corners"],
        [0, 1, 3],
        "A rhombus has 4 equal sides and 4 corners. Its angles do not have to be right angles. Only a square rhombus has those.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 2],
            [4, 2],
            [4, 0],
            [7, 3],
            [4, 6],
            [4, 4],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many corners does this arrow shape have?",
          "7",
          "Count each corner where two sides meet: there are 7. It is a heptagon, even though it looks like an arrow.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "I have 4 sides. My opposite sides are equal, but not all my sides are equal. All my corners are right angles. What am I?",
        ["rectangle", "square", "rhombus", "triangle"],
        0,
        "4 right angles and equal opposite sides make a rectangle. It is not a square because not all the sides are equal.",
      ),
    (n) =>
      trueFalse(
        n,
        "Every quadrilateral is a rectangle.",
        false,
        "A quadrilateral is any shape with 4 sides. A trapezium or a kite has 4 sides but no right angles, so it is not a rectangle.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sam makes shapes with matchsticks, using one matchstick for each side. He makes 2 pentagons and 1 hexagon. How many matchsticks does he use?",
        "16",
        "2 pentagons have 2 × 5 = 10 sides. A hexagon has 6. 10 + 6 = 16 matchsticks.",
      ),
  ],
});

/** MA2-2DS-02: combining and splitting shapes, flips, slides, turns and symmetry. */
export const TRANSFORM = levels(3070216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Turning a shape over, like flipping a pancake, is called a…",
        ["flip", "slide", "turn", "cut"],
        0,
        "A flip turns a shape over so you see its mirror image.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [2, 6],
          ],
        },
        trueFalse(
          n,
          "You can fold this triangle so that both halves match exactly.",
          true,
          "Fold it straight down from the top corner to the middle of the bottom. The two halves sit exactly on top of each other.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You cut a rectangle in half from the middle of the top side to the middle of the bottom side. What two shapes do you get?",
        ["2 rectangles", "2 triangles", "2 circles", "2 hexagons"],
        0,
        "A straight cut down the middle makes two smaller shapes with 4 sides and 4 square corners: 2 rectangles.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Spinning a shape around a point is called a…",
        ["turn", "slide", "flip", "fold"],
        0,
        "A turn spins a shape around a point, like the hands on a clock.",
      ),
    (n) =>
      multi(
        n,
        "Which of these capital letters have a line of symmetry? Choose all that are right.",
        ["H", "O", "X", "J", "R"],
        [0, 1, 2],
        "H, O and X can be folded so both halves match. J and R cannot.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 3, rows: 2 },
        typed(
          "short_answer",
          n,
          "How many small squares join together to make this rectangle?",
          "6",
          "There are 2 rows of 3 small squares, which is 6.",
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
            [6, 4],
            [3, 7],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this house shape have?",
          "1",
          "Only a fold straight down from the top point makes the halves match, so it has 1 line of symmetry.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "An arrow points up. It turns clockwise, one quarter turn at a time. Put the directions in the order it points.",
        ["up", "right", "down", "left"],
        "Clockwise goes the same way as clock hands: from up to right, then down, then left.",
      ),
    (n) =>
      trueFalse(
        n,
        "After a flip, every shape looks exactly the same as before.",
        false,
        "Some shapes look different after a flip. The letter F flipped over faces the other way, like in a mirror.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [4, 0],
            [4, 2],
            [6, 2],
            [6, 4],
            [4, 4],
            [4, 6],
            [2, 6],
            [2, 4],
            [0, 4],
            [0, 2],
            [2, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this plus shape have?",
          "4",
          "It folds in half down the middle, across the middle, and along both diagonals: 4 lines.",
        ),
      ),
    (n) =>
      choice(
        n,
        "An arrow points left. You give it a quarter turn clockwise. Which way does it point now?",
        ["up", "down", "right", "left"],
        0,
        "Clockwise goes up, right, down, left, then up again. One quarter turn on from left is up.",
      ),
    (n) =>
      choice(
        n,
        "Which two shapes can be joined together to make a square?",
        ["two equal rectangles", "two circles", "two pentagons", "a circle and a triangle"],
        0,
        "Cut a square down the middle and you get two equal rectangles, so two equal rectangles can be joined to make a square.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "An arrow points down. It makes three quarter turns clockwise, one after another. Which way does it point now?",
        ["right", "left", "up", "down"],
        0,
        "Clockwise from down: one quarter turn to left, two to up, three to right.",
      ),
    (n) =>
      trueFalse(
        n,
        "A slide, a flip and a turn all keep a shape the same size.",
        true,
        "Slides, flips and turns only move a shape. Its size and the lengths of its sides stay the same.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A tiler joins 3 rows of 4 square tiles to make a rectangle. Then she cuts every tile in half from corner to corner. How many triangles are there now?",
        "24",
        "3 rows of 4 is 12 tiles. Each tile cut corner to corner makes 2 triangles. 12 × 2 = 24 triangles.",
      ),
  ],
});

/** MA2-3DS-01: three-dimensional objects, including prisms, pyramids and their nets. */
export const OBJECTS_3D = levels(3070316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        choice(
          n,
          "What is this object called?",
          ["cone", "cylinder", "pyramid", "triangle"],
          0,
          "It has a flat circle base and a curved side that comes to a point, like an ice-cream cone. It is a cone.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        trueFalse(n, "All the faces of a cube are squares.", true, "A cube has 6 faces and every one is a square of the same size."),
      ),
    (n) =>
      choice(
        n,
        "Which object is shaped like a ball?",
        ["sphere", "cube", "cylinder", "cone"],
        0,
        "A sphere is round all over, like a ball.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        typed(
          "short_answer",
          n,
          "How many flat faces does a cylinder have?",
          "2",
          "A cylinder has a flat circle at the top and one at the bottom, so 2 flat faces. Its side is curved.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these objects have only flat faces? Choose all that are right.",
        ["cube", "rectangular prism", "square pyramid", "sphere", "cylinder"],
        [0, 1, 2],
        "A cube, a rectangular prism and a square pyramid have only flat faces. A sphere and a cylinder have curved surfaces.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        choice(
          n,
          "What is this object called?",
          ["rectangular prism", "triangular prism", "rectangle", "square pyramid"],
          0,
          "It has 6 rectangle faces, like a cereal box. It is a rectangular prism. A rectangle is flat.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        typed(
          "short_answer",
          n,
          "How many faces does a triangular pyramid have?",
          "4",
          "It has a triangle base and 3 triangle faces meeting at the top. 1 + 3 = 4.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        typed(
          "short_answer",
          n,
          "How many vertices (corners) does a cube have?",
          "8",
          "A cube has 4 corners on the top and 4 on the bottom. 4 + 4 = 8.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net has 2 triangles and 3 rectangles. What object does it fold into?",
        ["triangular prism", "square pyramid", "cube", "cone"],
        0,
        "The 2 triangles become the ends and the 3 rectangles join them. That makes a triangular prism.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many edges does a square pyramid have?",
          "8",
          "There are 4 edges around the square base and 4 edges going up to the top point. 4 + 4 = 8.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which object has 1 flat face, 1 curved surface and a point at the top?",
        ["cone", "cylinder", "sphere", "square pyramid"],
        0,
        "A cone has a flat circle base and a curved surface that rises to a point.",
      ),
    (n) =>
      trueFalse(
        n,
        "A triangular prism has 6 vertices.",
        true,
        "Each triangle end has 3 corners, and there are 2 ends. 3 + 3 = 6 vertices.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mila builds a skeleton model of a cube. She uses a straw for each edge and a ball of clay for each corner. How many straws and balls of clay does she use altogether?",
        "20",
        "A cube has 12 edges, so 12 straws, and 8 corners, so 8 balls of clay. 12 + 8 = 20.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are pyramids? Choose all that are right.",
        ["square pyramid", "triangular pyramid", "cone", "triangular prism", "cube"],
        [0, 1],
        "A pyramid has a flat base and triangle faces meeting at a point. A cone has a curved surface, so it is not a pyramid. Prisms and cubes don't come to a point.",
      ),
    (n) =>
      choice(
        n,
        "I have 6 faces. 2 of them are squares and the other 4 are rectangles that are not squares. What am I?",
        ["rectangular prism", "cube", "square pyramid", "triangular prism"],
        0,
        "6 faces that are squares and rectangles make a rectangular prism. A cube would need all 6 faces to be squares.",
      ),
  ],
});

/** MA2-GM-03: angles compared with a right angle. */
export const ANGLES = levels(3070416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 90 },
        trueFalse(n, "This is a right angle.", true, "The square mark in the corner shows a right angle, like the corner of a book."),
      ),
    (n) =>
      choice(
        n,
        "Which of these has a right angle?",
        ["the corner of a window", "the edge of a round plate", "the tip of a sharp pencil", "a curved slide"],
        0,
        "A window has square corners, and a square corner is a right angle.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 150 },
        choice(
          n,
          "Is this angle smaller or bigger than a right angle?",
          ["bigger than a right angle", "smaller than a right angle", "exactly a right angle"],
          0,
          "The arms are opened much wider than a square corner, so the angle is bigger than a right angle.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 30 },
        choice(
          n,
          "How does this angle compare with a right angle?",
          ["less than a right angle", "greater than a right angle", "equal to a right angle"],
          0,
          "The arms are much closer together than a square corner, so it is less than a right angle.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "How many right angles does a square have?", "4", "Each of the 4 corners of a square is a right angle."),
    (n) =>
      multi(
        n,
        "Which of these shapes have right angles? Choose all that are right.",
        ["square", "rectangle", "circle", "oval"],
        [0, 1],
        "Squares and rectangles have square corners. A circle and an oval have no corners at all.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 0 },
        choice(
          n,
          "Look at the clock. What angle do the two hands make?",
          ["a right angle", "less than a right angle", "more than a right angle", "a straight angle"],
          0,
          "At 9:00 one hand points to 12 and the other to 9. That is a quarter turn apart, a right angle.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many right angles make a full turn?",
        "4",
        "A right angle is a quarter turn, and 4 quarter turns make a full turn.",
      ),
    (n) =>
      ordering(
        n,
        "Put these clock times in order, from the smallest angle between the hands to the largest.",
        ["1:00", "3:00", "5:00", "6:00"],
        "At 1:00 the hands are close together. At 3:00 they make a right angle, at 5:00 more than a right angle, and at 6:00 a straight line.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 0 },
        choice(
          n,
          "Look at the clock. What angle do the two hands make?",
          ["more than a right angle", "less than a right angle", "a right angle", "a straight angle"],
          0,
          "From 12 to 3 would be a right angle. The hour hand is on 4, past 3, so the angle is more than a right angle but less than a straight line.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 100 },
        trueFalse(
          n,
          "This angle is a right angle.",
          false,
          "It has no square mark, and the arms are opened a little wider than a square corner. It is more than a right angle.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 4],
            [2, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many right angles does this shape have?",
          "2",
          "The two corners on the right side are square corners. The bottom left corner is smaller and the top left corner is bigger than a right angle.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Mia is facing west. She makes a quarter turn anticlockwise. Which way is she facing now?",
        ["south", "north", "east", "west"],
        0,
        "Anticlockwise goes north, west, south, east. One quarter turn on from west is south.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 4],
            [3, 7],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many of the angles inside this shape are greater than a right angle?",
          "2",
          "The two bottom corners are right angles, and so is the top point. The two corners where the roof meets the walls are wider than a right angle. So 2.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same size as two right angles? Choose all that are right.",
        ["a half turn", "a straight angle", "a quarter turn", "a full turn"],
        [0, 1],
        "Two quarter turns make a half turn, which is a straight angle. A quarter turn is one right angle and a full turn is four.",
      ),
  ],
});

const TOWN_MAP: Picture = {
  kind: "grid",
  columns: 6,
  rows: 5,
  map: true,
  points: [
    { x: 0, y: 0, label: "Beach" },
    { x: 3, y: 2, label: "Zoo" },
    { x: 5, y: 4, label: "Farm" },
    { x: 1, y: 4, label: "Café" },
    { x: 4, y: 0, label: "Museum" },
  ],
};

const STAR_MAP: Picture = { kind: "grid", columns: 5, rows: 5, map: true, points: [{ x: 2, y: 2, label: "★" }] };

/** MA2-GM-01: grid maps, directions and routes. */
export const POSITION = levels(3070516, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which direction is opposite east?",
        ["west", "north", "south", "down"],
        0,
        "East and west are opposites, like north and south.",
      ),
    (n) =>
      pic(
        TOWN_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. Which square is the zoo in?",
          ["D3"],
          "Go across to column D, then up to row 3. The zoo is in D3.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "On most maps, west is on the right.",
        false,
        "Maps usually have north at the top, so east is on the right and west is on the left.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "Look at the map. What is in square F5?",
          ["the farm", "the café", "the zoo", "the museum"],
          0,
          "Column F, row 5 has the farm in it.",
        ),
      ),
    (n) =>
      pic(
        STAR_MAP,
        typed(
          "short_answer",
          n,
          "Start at the star. Move 2 squares down. Which square are you in?",
          ["C1"],
          "The star is in C3. Moving down 2 squares goes to row 2, then row 1. You stay in column C, so you are in C1.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ella is facing north. Which direction is on her right?",
        ["east", "west", "south", "north"],
        0,
        "When you face north, east is on your right and west is on your left, just like on a map.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "North is at the top of the map. Which place is furthest east?",
          ["the farm", "the museum", "the zoo", "the beach"],
          0,
          "East is to the right. The farm is in column F, the column furthest to the right.",
        ),
      ),
    (n) =>
      pic(
        STAR_MAP,
        typed(
          "short_answer",
          n,
          "Start at the star. Move 1 square left and 2 squares up. Which square are you in?",
          ["B5"],
          "The star is in C3. Left 1 square takes you to B3. Up 2 squares takes you to B5.",
        ),
      ),
    (n) =>
      pic(
        TOWN_MAP,
        multi(
          n,
          "North is at the top of the map. Which places are north of the zoo? Choose all that are right.",
          ["the farm", "the café", "the beach", "the museum"],
          [0, 1],
          "North is up. The zoo is in row 3. The farm and the café are in row 5, higher up. The beach and the museum are in row 1, which is south.",
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
            { x: 1, y: 4, label: "H" },
            { x: 4, y: 1, label: "S" },
          ],
          path: [
            [1, 4],
            [1, 1],
            [4, 1],
          ],
        },
        choice(
          n,
          "North is at the top. The line shows Noah's route from home (H) to school (S). Which directions did he go?",
          [
            "3 squares south, then 3 squares east",
            "3 squares north, then 3 squares east",
            "3 squares east, then 3 squares south",
            "3 squares south, then 3 squares west",
          ],
          0,
          "From H in B5 he goes down (south) 3 squares to B2, then right (east) 3 squares to S in E2.",
        ),
      ),
    (n) =>
      pic(
        TOWN_MAP,
        typed(
          "short_answer",
          n,
          "North is at the top. Ava walks from the museum 2 squares north and then 1 square west. Which square is she in now?",
          ["D3"],
          "The museum is in E1. 2 squares north takes her to E3. 1 square west takes her to D3, where the zoo is.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "If you face north and make a quarter turn clockwise, you will face west.",
        false,
        "Clockwise from north, a quarter turn takes you to east, not west.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        STAR_MAP,
        typed(
          "short_answer",
          n,
          "North is at the top. Start at the star. Move 2 squares east, then 2 squares south, then 3 squares west. Which square are you in?",
          ["B1"],
          "Start in C3. 2 east takes you to E3. 2 south takes you to E1. 3 west takes you to B1.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Leo is facing east. He makes a three-quarter turn clockwise. Which way is he facing now?",
        ["north", "south", "west", "east"],
        0,
        "Clockwise from east: a quarter turn to south, a half turn to west, and a three-quarter turn to north.",
      ),
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "North is at the top. Which directions take you from the beach to the café?",
          [
            "1 square east and 4 squares north",
            "4 squares east and 1 square north",
            "1 square west and 4 squares north",
            "1 square east and 4 squares south",
          ],
          0,
          "The beach is in A1 and the café is in B5. From A to B is 1 square east, and from row 1 to row 5 is 4 squares north.",
        ),
      ),
  ],
});
