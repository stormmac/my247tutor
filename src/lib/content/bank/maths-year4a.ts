/**
 * Year 4 Mathematics: 15 questions for each Stage 2 standard (NESA outcome), three at each
 * level from very easy to very hard. These are later Stage 2 (Stage 2B) questions, a step up from
 * the Year 3 sets in maths-year3.ts. Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA2-RN-01: place value and the role of zero to tens of thousands. */
export const PLACE_VALUE = levels(4040101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 6 in 6215?",
        ["6", "600", "6000", "60 000"],
        2,
        "The 6 is in the thousands place, so it is worth 6 thousands, or 6000.",
      ),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 3, tens: 0, ones: 7 },
        typed(
          "short_answer",
          n,
          "What number do these blocks show?",
          "307",
          "There are 3 hundreds, no tens and 7 ones. The 0 keeps the tens place empty: 307.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In 30 482, the 3 is in the ten thousands place.",
        true,
        "30 482 has five digits. The first one is the ten thousands, so the 3 is worth 30 000.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write forty-five thousand, two hundred and six as a number.",
        ["45 206", "45206"],
        "45 thousands is 45 000, and two hundred and six is 206. There are no tens, so a 0 goes in the tens place: 45 206.",
      ),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["9875", "10 002", "10 020", "12 001"],
        "9875 has only four digits, so it is the smallest. Then compare the others place by place: 10 002, 10 020, 12 001.",
      ),
    (n) => typed("fill_blank", n, "7000 + 300 + ___ + 5 = 7395", "90", "The 9 in 7395 is in the tens place, so it is worth 90."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which number has a 0 in the hundreds place?",
        ["40 517", "45 017", "45 170", "40 571"],
        1,
        "In 45 017 the digits are 4 ten thousands, 5 thousands, 0 hundreds, 1 ten and 7 ones.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1000 more than 29 450?",
        ["30 450", "30450"],
        "Adding 1000 adds 1 to the thousands: 29 thousands becomes 30 thousands, so 29 450 becomes 30 450.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 47 382 to the nearest thousand.",
        ["47 000", "47000"],
        "47 382 is between 47 000 and 48 000. The hundreds digit is 3, which is less than 5, so it rounds down to 47 000.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these are equal to 26 040? Choose all that are right.",
        ["2 ten thousands, 6 thousands and 4 tens", "2604 tens", "20 000 + 600 + 40", "260 hundreds and 4 ones"],
        [0, 1],
        "2 ten thousands, 6 thousands and 4 tens is 26 040, and 2604 tens is 26 040 too. 20 000 + 600 + 40 is only 20 640, and 260 hundreds and 4 ones is 26 004.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 10 less than 40 005?",
        ["39 995", "39995"],
        "Take away 5 to get 40 000, then 5 more to get 39 995. Check: 39 995 + 10 = 40 005.",
      ),
    (n) =>
      choice(
        n,
        "Which number is closest to 60 000?",
        ["59 870", "60 200", "61 000", "58 999"],
        0,
        "59 870 is 130 away from 60 000. 60 200 is 200 away, 61 000 is 1000 away and 58 999 is 1001 away.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Using the digits 7, 0, 4, 9 and 2 once each, what is the smallest 5-digit number you can make?",
        ["20 479", "20479"],
        "A number can't start with 0, so start with the next smallest digit, 2. Then put the rest from smallest up: 20 479.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A number has 4 ten thousands, 15 hundreds and 3 ones. What is the number?",
        ["41 503", "41503"],
        "4 ten thousands is 40 000. 15 hundreds is 1500. So 40 000 + 1500 + 3 = 41 503.",
      ),
    (n) =>
      trueFalse(
        n,
        "Rounded to the nearest ten thousand, 35 000 and 44 999 both round to 40 000.",
        true,
        "35 000 is exactly halfway between 30 000 and 40 000, so it rounds up to 40 000. 44 999 is less than 45 000, so it rounds down to 40 000.",
      ),
  ],
});

/** MA2-RN-02: decimals to two decimal places. */
export const DECIMALS = levels(4020201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 7 },
        choice(
          n,
          "The number line goes from 0 to 1. What decimal is the dot on?",
          ["0.7", "7", "0.07", "0.3"],
          0,
          "The line from 0 to 1 is cut into 10 equal jumps, so each jump is 0.1. The dot is 7 jumps along: 0.7.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "0.25 has 2 tenths and 5 hundredths.",
        true,
        "The first digit after the decimal point is tenths and the second is hundredths, so 0.25 is 2 tenths and 5 hundredths.",
      ),
    (n) =>
      choice(
        n,
        "Which decimal shows 9 hundredths?",
        ["0.9", "0.09", "9.0", "0.90"],
        1,
        "Hundredths are the second place after the decimal point, so 9 hundredths is 0.09.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 3 wholes and 4 tenths as a decimal.",
        "3.4",
        "The wholes go before the decimal point and the tenths go just after it: 3.4.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 6 },
        typed(
          "short_answer",
          n,
          "The bar is one whole. What decimal shows the shaded part?",
          ["0.6", ".6", "0.60"],
          "The bar is cut into 10 equal parts and 6 are shaded. That is 6 tenths, or 0.6.",
        ),
      ),
    (n) => typed("fill_blank", n, "0.6 = ___ hundredths", "60", "Each tenth is 10 hundredths, so 6 tenths is 60 hundredths."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is bigger, 0.38 or 0.4?",
        ["0.38", "0.4", "They are the same"],
        1,
        "Compare the tenths first: 0.4 has 4 tenths and 0.38 has only 3 tenths. You can also write 0.4 as 0.40, which is more than 0.38.",
      ),
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["1.05", "1.4", "1.45", "1.5"],
        "They all have 1 whole. Write them with two places: 1.05, 1.40, 1.45, 1.50.",
      ),
    (n) =>
      choice(
        n,
        "A drink costs $3.75. What is the 7 worth?",
        ["7 dollars", "70 cents", "7 cents", "70 dollars"],
        1,
        "The 7 is in the tenths place. A tenth of a dollar is 10 cents, so 7 tenths is 70 cents.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1 tenth more than 2.95?",
        "3.05",
        "2.95 has 9 tenths. One more tenth makes 10 tenths, which is 1 whole. So 2.95 becomes 3.05.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are greater than 0.6? Choose all that are right.",
        ["0.65", "0.59", "0.7", "0.06", "0.61"],
        [0, 2, 4],
        "Think of 0.6 as 0.60. 0.65, 0.70 and 0.61 are more than 0.60. 0.59 and 0.06 are less.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 2, to: 3, jumps: 10, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "What decimal is the dot on?",
          "2.4",
          "The line from 2 to 3 is cut into 10 jumps, so each jump is 0.1. The dot is 4 jumps after 2: 2.4.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 307 hundredths as a decimal.",
        "3.07",
        "100 hundredths make 1 whole, so 300 hundredths is 3 wholes. That leaves 7 hundredths: 3.07.",
      ),
    (n) =>
      choice(
        n,
        "In a swimming race, Zoe's time was 15.4 seconds, Ben's was 15.38 seconds and Ari's was 15.08 seconds. Who was fastest?",
        ["Zoe", "Ben", "Ari"],
        2,
        "The fastest swimmer has the smallest time. Write them with two places: 15.40, 15.38, 15.08. 15.08 is the smallest, so Ari was fastest.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "5.3 = 4 ones and ___ tenths",
        "13",
        "Swap 1 of the 5 ones for 10 tenths. Then 4 ones are left, and 10 + 3 = 13 tenths.",
      ),
  ],
});

/** MA2-AR-01: mental and written strategies for addition and subtraction. */
export const ADD_SUB = levels(4050101, {
  very_easy: [
    (n) => typed("short_answer", n, "56 + 30 = ?", "86", "Add 3 tens to 56: 66, 76, 86."),
    (n) => typed("short_answer", n, "90 − 45 = ?", "45", "Half of 90 is 45, so 45 + 45 = 90 and 90 − 45 = 45."),
    (n) =>
      trueFalse(
        n,
        "99 + 46 gives the same answer as 100 + 45.",
        true,
        "Moving 1 from 46 to 99 makes 100 + 45. The total stays the same: 145.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "248 + 36 = ?", "284", "248 + 30 = 278, then 278 + 6 = 284."),
    (n) => typed("short_answer", n, "370 + 250 = ?", "620", "300 + 200 = 500 and 70 + 50 = 120. 500 + 120 = 620."),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 412 − 189?",
        ["100", "200", "300", "600"],
        1,
        "412 is about 400 and 189 is about 200, so the answer is about 400 − 200 = 200.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "463 − 199 = ?", "264", "Take away 200 to get 263. You took 1 too many, so add it back: 264."),
    (n) =>
      typed(
        "short_answer",
        n,
        "586 + 247 = ?",
        "833",
        "Hundreds: 500 + 200 = 700. Tens: 80 + 40 = 120. Ones: 6 + 7 = 13. 700 + 120 + 13 = 833.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The school canteen sold 238 pies on Monday and 175 pies on Tuesday. How many pies did it sell altogether?",
        "413",
        "238 + 175: 200 + 100 = 300, 30 + 70 = 100, 8 + 5 = 13. 300 + 100 + 13 = 413 pies.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "702 − 385 = ?", "317", "Count up from 385: 15 to 400, then 302 to 702. 15 + 302 = 317."),
    (n) =>
      choice(
        n,
        "On the way to Byron Bay, Kai's family drove 386 km on Saturday and 457 km on Sunday. How far did they drive?",
        ["843 km", "733 km", "833 km", "743 km"],
        0,
        "386 + 457: 300 + 400 = 700, 80 + 50 = 130, 6 + 7 = 13. 700 + 130 + 13 = 843 km.",
      ),
    (n) =>
      multi(
        n,
        "Which of these have an answer between 500 and 600? Choose all that are right.",
        ["276 + 248", "813 − 295", "349 + 268", "900 − 412"],
        [0, 1],
        "276 + 248 = 524 and 813 − 295 = 518 are between 500 and 600. 349 + 268 = 617 is too big and 900 − 412 = 488 is too small.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Year 4 needs $1000 for an excursion. They had saved $268, then a sausage sizzle raised $415. How many more dollars do they need?",
        ["317", "$317"],
        "They have $268 + $415 = $683. Then $1000 − $683: count up 17 to 700, then 300 to 1000. 17 + 300 = $317.",
      ),
    (n) =>
      choice(
        n,
        "Amira worked out 534 − 278 and got 344. What mistake did she make?",
        [
          "She took the smaller digit from the bigger one in each column",
          "She added instead of subtracting",
          "She forgot to carry when adding",
          "She made no mistake",
        ],
        0,
        "534 − 278 is really 256. Amira did 5 − 2, 7 − 3 and 8 − 4 instead of trading a ten and a hundred, which gave 344.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The difference between two numbers is 145. The bigger number is 620. What is the smaller number?",
        "475",
        "The smaller number is 145 less than 620. 620 − 145: take 100 to get 520, then 45 more to get 475.",
      ),
  ],
});

/** MA2-AR-02: missing values in addition and subtraction number sentences. */
export const MISSING_ADD = levels(4050201, {
  very_easy: [
    (n) => typed("fill_blank", n, "60 + ___ = 100", "40", "6 tens and 4 tens make 10 tens, which is 100."),
    (n) => typed("fill_blank", n, "___ − 8 = 12", "20", "Add the 8 back: 12 + 8 = 20. Check: 20 − 8 = 12."),
    (n) =>
      trueFalse(
        n,
        "If 35 + 15 = 50, then 50 − 35 = 15.",
        true,
        "Adding and subtracting undo each other. 35 and 15 make 50, so taking 35 from 50 leaves 15.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "140 + ___ = 200", "60", "Count up from 140: 60 more gets to 200."),
    (n) => typed("fill_blank", n, "84 − ___ = 50", "34", "From 84 down to 50 is 34. Check: 84 − 34 = 50."),
    (n) =>
      choice(
        n,
        "Which number makes 300 − ? = 120 true?",
        ["180", "420", "220", "80"],
        0,
        "Count up from 120 to 300: 80 to 200, then 100 to 300. 80 + 100 = 180.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "___ + 275 = 500", "225", "500 − 275: count up 25 to 300, then 200 to 500. 25 + 200 = 225."),
    (n) => typed("fill_blank", n, "623 − ___ = 400", "223", "From 623 down to 400 is 223. Check: 623 − 223 = 400."),
    (n) =>
      choice(
        n,
        "Lena had some money. She spent $45 at the canteen and has $38 left. Which number sentence finds how much she started with?",
        ["? − 45 = 38", "45 − ? = 38", "38 − 45 = ?", "? + 38 = 45"],
        0,
        "She started with an unknown amount, took away $45 and had $38 left: ? − 45 = 38.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ − 368 = 457", "825", "Undo the subtraction by adding: 457 + 368 = 825."),
    (n) => typed("fill_blank", n, "1000 − ___ = 274", "726", "Count up from 274: 26 to 300, then 700 to 1000. 26 + 700 = 726."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball stadium has 850 seats. 586 people have sat down. How many more people can sit down?",
        "264",
        "586 + ? = 850. Count up: 14 to 600, then 250 to 850. 14 + 250 = 264.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "125 + ___ = 300 − 48", "127", "300 − 48 = 252, so 125 + ? = 252. 252 − 125 = 127."),
    (n) => typed("fill_blank", n, "500 − ___ = 230 + 145", "125", "230 + 145 = 375, so 500 − ? = 375. 500 − 375 = 125."),
    (n) =>
      multi(
        n,
        "Which numbers could go in the box to make □ + 199 more than 600? Choose all that are right.",
        ["400", "401", "402", "450"],
        [2, 3],
        "□ + 199 = 600 when □ is 401. So □ must be more than 401: 402 and 450 work. 401 makes exactly 600, which is not more.",
      ),
  ],
});

/** MA2-MR-01: multiplication and division facts to 10 × 10. */
export const TIMES = levels(4010101, {
  very_easy: [
    (n) => typed("short_answer", n, "3 × 6 = ?", "18", "3 groups of 6: 6, 12, 18."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 7 },
        choice(
          n,
          "Which number sentence matches this array?",
          ["4 × 7 = 28", "4 + 7 = 11", "4 × 6 = 24", "7 × 7 = 49"],
          0,
          "There are 4 rows with 7 dots in each row, so 4 × 7 = 28.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every number in the 10 times table ends in 0.",
        true,
        "Multiplying by 10 makes each ones become a ten, so the ones place is 0.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "9 × 4 = ?", "36", "10 × 4 = 40, and one less 4 is 40 − 4 = 36."),
    (n) => typed("short_answer", n, "35 ÷ 5 = ?", "7", "How many 5s make 35? 5 × 7 = 35, so the answer is 7."),
    (n) =>
      choice(
        n,
        "Which of these is a multiple of 6?",
        ["26", "32", "42", "46"],
        2,
        "6 × 7 = 42, so 42 is in the 6 times table. The others are not.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "7 × 6 = ?", "42", "5 × 6 = 30 and 2 × 6 = 12. 30 + 12 = 42."),
    (n) =>
      pic(
        { kind: "array", rows: 6, columns: 8 },
        typed("short_answer", n, "How many dots are in this array?", "48", "There are 6 rows of 8. 6 × 8 = 48."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A netball team has 7 players on court. How many players are on court for 9 teams?",
        "63",
        "9 × 7 = 63. You can think 10 × 7 = 70, then take away one 7: 63.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "81 ÷ 9 = ?", "9", "9 × 9 = 81, so 81 ÷ 9 = 9."),
    (n) =>
      multi(
        n,
        "Which of these are multiples of both 3 and 4? Choose all that are right.",
        ["12", "16", "24", "30", "36"],
        [0, 2, 4],
        "12, 24 and 36 are in both the 3 and 4 times tables. 16 is not a multiple of 3, and 30 is not a multiple of 4.",
      ),
    (n) =>
      choice(
        n,
        "Which is the same as 8 × 7?",
        ["8 × 5 + 8 × 2", "8 × 5 + 2", "8 + 7", "4 × 7 + 4"],
        0,
        "7 is 5 + 2, so 8 × 7 is 8 fives plus 8 twos: 40 + 16 = 56.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ms Patel shares 58 stickers equally among 7 students. Each student gets as many as possible. How many stickers are left over?",
        "2",
        "7 × 8 = 56, so each student gets 8 stickers. 58 − 56 = 2 are left over.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Cricket tickets cost $8 for children and $10 for adults. How many dollars do 3 adults and 4 children pay altogether?",
        ["62", "$62"],
        "3 adults: 3 × 10 = $30. 4 children: 4 × 8 = $32. $30 + $32 = $62.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["6 × 6", "5 × 8", "7 × 6", "9 × 5"],
        "Work each one out: 6 × 6 = 36, 5 × 8 = 40, 7 × 6 = 42, 9 × 5 = 45.",
      ),
  ],
});

/** MA2-MR-02: missing values in multiplication and division number sentences. */
export const MISSING_TIMES = levels(4010201, {
  very_easy: [
    (n) => typed("fill_blank", n, "___ × 3 = 15", "5", "Count by threes to 15: 3, 6, 9, 12, 15. That is 5 threes."),
    (n) => typed("fill_blank", n, "20 ÷ ___ = 10", "2", "20 shared into 2 equal groups is 10 in each."),
    (n) => trueFalse(n, "If 6 × 5 = 30, then 30 ÷ 6 = 5.", true, "Multiplying and dividing undo each other, so 30 ÷ 6 = 5."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "7 × ___ = 70", "10", "7 tens make 70."),
    (n) => typed("fill_blank", n, "___ ÷ 4 = 5", "20", "Undo the division: 5 × 4 = 20. Check: 20 ÷ 4 = 5."),
    (n) => choice(n, "Which number makes ? × 8 = 48 true?", ["5", "6", "7", "40"], 1, "6 × 8 = 48, so the missing number is 6."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "9 × ___ = 54", "6", "9 × 6 = 54. You can check: 10 × 6 = 60, and 60 − 6 = 54."),
    (n) => typed("fill_blank", n, "56 ÷ ___ = 8", "7", "7 × 8 = 56, so 56 ÷ 7 = 8."),
    (n) =>
      pic(
        { kind: "array", rows: 5, columns: 7 },
        typed(
          "fill_blank",
          n,
          "The array has 35 dots in 5 rows. 5 × ___ = 35",
          "7",
          "Each row has 7 dots. 5 rows of 7 is 35, so 5 × 7 = 35.",
        ),
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ ÷ 8 = 9", "72", "Undo the division: 9 × 8 = 72. Check: 72 ÷ 8 = 9."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack thinks of a number. He divides it by 6 and gets 7. What was his number?",
        "42",
        "? ÷ 6 = 7. Undo it by multiplying: 7 × 6 = 42.",
      ),
    (n) =>
      choice(
        n,
        "Chairs for assembly are set out in rows of 9. There are 63 chairs. Which number sentence finds the number of rows?",
        ["? × 9 = 63", "63 × 9 = ?", "9 + ? = 63", "? ÷ 9 = 63"],
        0,
        "Some number of rows, each with 9 chairs, makes 63: ? × 9 = 63. The answer is 7 rows.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "4 × ___ = 6 × 6", "9", "6 × 6 = 36, so 4 × ? = 36. 4 × 9 = 36."),
    (n) => typed("fill_blank", n, "___ × 5 = 80 ÷ 2", "8", "80 ÷ 2 = 40, so ? × 5 = 40. 8 × 5 = 40."),
    (n) =>
      multi(
        n,
        "Which pairs of numbers could go in the boxes to make □ × □ = 36 true? Choose all that are right.",
        ["4 and 9", "6 and 6", "5 and 7", "3 and 12"],
        [0, 1, 3],
        "4 × 9, 6 × 6 and 3 × 12 all make 36. 5 × 7 is 35.",
      ),
  ],
});

/** MA2-PF-01: halves, quarters, thirds and fifths on a number line, and fractions made by halving them. */
export const FRACTIONS = levels(4020101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 3, shaded: 1 },
        choice(
          n,
          "What fraction of the circle is shaded?",
          ["1/3", "1/2", "3/1", "1/4"],
          0,
          "The circle is cut into 3 equal parts and 1 is shaded, so 1/3 is shaded.",
        ),
      ),
    (n) => trueFalse(n, "A whole cut into 5 equal parts is cut into fifths.", true, "5 equal parts of a whole are called fifths."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 2, dotAt: 1 },
        choice(
          n,
          "What fraction is the dot on?",
          ["1/2", "1/4", "2", "1/3"],
          0,
          "The line from 0 to 1 is cut into 2 equal jumps. The dot is 1 jump along, halfway: 1/2.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 5, shaded: 2 },
        typed(
          "short_answer",
          n,
          "What fraction of the bar is shaded?",
          ["2/5", "two fifths"],
          "The bar is cut into 5 equal parts and 2 are shaded, so 2/5 is shaded.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "How many fifths make one whole?", ["5", "five"], "A whole cut into fifths has 5 equal parts, so 5/5 = 1."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 3, dotAt: 2 },
        typed(
          "short_answer",
          n,
          "What fraction is the dot on?",
          ["2/3", "two thirds"],
          "The line from 0 to 1 is cut into 3 equal jumps, so each jump is 1/3. The dot is 2 jumps along: 2/3.",
        ),
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "You cut each quarter of a pizza in half. What are the new pieces called?",
        ["eighths", "halves", "sixths", "thirds"],
        0,
        "4 quarters each cut in half makes 8 equal pieces, so each piece is an eighth.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 6, dotAt: 2 },
        multi(
          n,
          "Which fractions tell where the dot is? Choose all that are right.",
          ["2/6", "1/3", "1/2", "3/6"],
          [0, 1],
          "The line is cut into 6 equal jumps (sixths) and the dot is 2 jumps along: 2/6. Two sixths make one third, so it is also 1/3.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these fractions in order from smallest to largest.",
        ["1/5", "1/4", "1/3", "1/2"],
        "The more equal parts a whole is cut into, the smaller each part. Fifths are smallest, then quarters, thirds and halves.",
      ),
  ],
  hard: [
    (n) =>
      typed("fill_blank", n, "2/5 = ___/10", "4", "Halve each fifth to make tenths. Each fifth becomes 2 tenths, so 2 fifths is 4 tenths."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 2, jumps: 8, dotAt: 5 },
        typed(
          "short_answer",
          n,
          "The number line goes from 0 to 2. What number is the dot on?",
          ["1 1/4", "5/4", "one and a quarter"],
          "There are 4 jumps between 0 and 1, so each jump is a quarter. The dot is 5 jumps along: 5 quarters, which is 1 and 1/4.",
        ),
      ),
    (n) =>
      trueFalse(n, "3/5 is greater than 1/2.", true, "Halve each fifth to get tenths: 3/5 = 6/10. One half is 5/10, so 3/5 is bigger."),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which fraction is closest to 1?",
        ["4/5", "2/3", "3/4", "7/8"],
        3,
        "Look at what is missing from each whole: 1/5, 1/3, 1/4 and 1/8. 1/8 is the smallest gap, so 7/8 is closest to 1.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A 1 metre ribbon is cut into fifths. Then each fifth is cut in half. What fraction of the metre is each small piece?",
        ["1/10", "one tenth"],
        "5 fifths each cut in half makes 10 equal pieces, so each piece is 1/10 of the metre.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 3/4? Choose all that are right.",
        ["6/8", "3/8", "2/3", "12/16"],
        [0, 3],
        "Halve each quarter to get eighths: 3/4 = 6/8. Halve again to get sixteenths: 6/8 = 12/16. 3/8 and 2/3 are smaller.",
      ),
  ],
});

/** MA2-GM-02: measuring and estimating length in metres, centimetres and millimetres. */
export const LENGTH = levels(4060101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 12, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "How many centimetres long is the ribbon?",
          ["12", "12 cm"],
          "The ribbon starts at 0 and ends at 12, so it is 12 cm long.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the thickness of a 20-cent coin?",
        ["millimetres", "metres", "kilometres", "litres"],
        0,
        "A coin is very thin, only a couple of millimetres, so millimetres are best.",
      ),
    (n) => trueFalse(n, "100 cm is longer than 1 metre.", false, "1 metre is exactly 100 cm, so they are the same length."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "6 cm = ___ mm", "60", "Each centimetre is 10 millimetres, so 6 cm is 60 mm."),
    (n) =>
      choice(
        n,
        "About how tall is a classroom door?",
        ["2 m", "20 cm", "20 m", "2 cm"],
        0,
        "A door is a bit taller than an adult, so about 2 metres.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 6.5, object: "pencil" },
        typed(
          "short_answer",
          n,
          "How many millimetres long is the pencil?",
          ["65", "65 mm"],
          "The pencil ends halfway between 6 and 7, so it is 6 cm and 5 mm. 6 cm is 60 mm, and 60 + 5 = 65 mm.",
        ),
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "3 m 45 cm = ___ cm", "345", "3 m is 300 cm, and 300 + 45 = 345 cm."),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["95 mm", "12 cm", "1.3 m", "140 cm"],
        "Change them all to centimetres: 95 mm is 9.5 cm, then 12 cm, 1.3 m is 130 cm, and 140 cm.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 4, top: "9 m", side: "4 m" },
        typed(
          "short_answer",
          n,
          "This is a vegetable garden. What is its perimeter in metres?",
          ["26", "26 m"],
          "Add all four sides: 9 + 4 + 9 + 4 = 26 m.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many centimetres are there in 2.75 m?",
        ["275", "275 cm"],
        "2 m is 200 cm, and 0.75 m is 75 hundredths of a metre, which is 75 cm. 200 + 75 = 275 cm.",
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
          sideLabels: ["6 cm", "2 cm", "3 cm", "3 cm", "3 cm", "5 cm"],
        },
        typed(
          "short_answer",
          n,
          "What is the perimeter of this shape in centimetres?",
          ["22", "22 cm"],
          "Add all six sides: 6 + 2 + 3 + 3 + 3 + 5 = 22 cm.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 1 m 5 cm? Choose all that are right.",
        ["105 cm", "1.05 m", "150 cm", "1050 mm", "1.5 m"],
        [0, 1, 3],
        "1 m 5 cm is 100 + 5 = 105 cm. That is 1.05 m, and 105 × 10 = 1050 mm. 150 cm and 1.5 m are 1 m 50 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has a perimeter of 30 cm. Its longer side is 9 cm. How long is its shorter side in centimetres?",
        ["6", "6 cm"],
        "One long side and one short side make half the perimeter: 30 ÷ 2 = 15 cm. 15 − 9 = 6 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella's long jump was 2 m 38 cm. Ruby jumped 45 cm further. How far did Ruby jump, in centimetres?",
        ["283", "283 cm"],
        "2 m 38 cm is 238 cm. 238 + 45 = 283 cm.",
      ),
    (n) =>
      choice(
        n,
        "A 3 m rope is cut into pieces that are each 25 cm long. How many pieces are there?",
        ["12", "75", "8", "120"],
        0,
        "3 m is 300 cm. Four 25 cm pieces make 1 m, so 3 m makes 3 × 4 = 12 pieces.",
      ),
  ],
});

/** MA2-NSM-02: analog and digital time in hours, minutes and seconds. */
export const TIME = levels(4060201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 20 },
        choice(
          n,
          "What time does the clock show?",
          ["9:20", "4:45", "9:04", "8:20"],
          0,
          "The minute hand points to the 4, which is 20 minutes past. The hour hand is just past the 9, so it is 9:20.",
        ),
      ),
    (n) => typed("fill_blank", n, "1 minute = ___ seconds", "60", "There are 60 seconds in 1 minute."),
    (n) =>
      trueFalse(
        n,
        "Times written with am are before midday.",
        true,
        "am times run from midnight to midday, and pm times from midday to midnight.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 35 },
        typed(
          "short_answer",
          n,
          "What time does the clock show? Write it as digital time.",
          ["2:35", "02:35"],
          "The minute hand points to the 7, and 7 × 5 = 35 minutes. The hour hand is past the 2, so it is 2:35.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which digital time is the same as 25 to 6?",
        ["5:25", "5:35", "6:25", "6:35"],
        1,
        "25 minutes before 6:00 is 35 minutes past 5, because 60 − 25 = 35. So it is 5:35.",
      ),
    (n) =>
      choice(
        n,
        "Which of these takes about 10 seconds?",
        ["tying a shoelace", "eating lunch", "a school day", "a netball game"],
        0,
        "Tying a shoelace is quick, just a few seconds. The others take minutes or hours.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 10, minute: 50 },
        choice(
          n,
          "What time does the clock show?",
          ["10 to 11", "10 to 10", "50 past 11", "10 past 10"],
          0,
          "The minute hand is on the 10, which is 50 minutes past, or 10 minutes to the next hour. The hour hand is nearly at 11, so it is 10 to 11 (10:50).",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "90 seconds = 1 minute and ___ seconds",
        "30",
        "1 minute is 60 seconds. 90 − 60 = 30, so 90 seconds is 1 minute and 30 seconds.",
      ),
    (n) =>
      ordering(
        n,
        "These are 24-hour times. Put them in order from earliest to latest in the day.",
        ["06:15", "11:40", "13:05", "20:30"],
        "In 24-hour time the hours count from 00 at midnight to 23, so just compare the hours: 06, 11, 13, 20.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "What is 4:25 pm in 24-hour time?",
        ["16:25", "04:25", "14:25", "12:25"],
        0,
        "For pm times after 1 o'clock, add 12 to the hour: 4 + 12 = 16. So 4:25 pm is 16:25.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 11, minute: 40 },
        typed(
          "short_answer",
          n,
          "The clock shows when Mia started her art project. She finished 35 minutes later. What time did she finish?",
          ["12:15", "12:15 pm", "12:15pm", "12:15 am"],
          "The clock shows 11:40. 20 minutes takes it to 12:00, and 15 more minutes makes 12:15.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The Year 4 relay team finished in 2 minutes 15 seconds. How many seconds is that?",
        ["135", "135 seconds"],
        "2 minutes is 2 × 60 = 120 seconds. 120 + 15 = 135 seconds.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A train leaves Central at 09:47 and arrives at Katoomba at 11:52. How many minutes long is the trip?",
        ["125", "125 minutes"],
        "09:47 to 11:47 is 2 hours, or 120 minutes. 11:47 to 11:52 is 5 more minutes. 120 + 5 = 125 minutes.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Bus stop", "Time"],
          rows: [
            ["School", "3:20 pm"],
            ["Library", "3:38 pm"],
            ["Pool", "3:55 pm"],
            ["Park", "4:12 pm"],
          ],
        },
        choice(
          n,
          "Look at the bus timetable. How long does the bus take to go from the library to the park?",
          ["34 minutes", "26 minutes", "74 minutes", "44 minutes"],
          0,
          "Count on from 3:38: 22 minutes gets to 4:00, then 12 more to 4:12. 22 + 12 = 34 minutes.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these from shortest to longest.",
        ["150 seconds", "3 minutes", "200 seconds", "a quarter of an hour"],
        "Change them to seconds: 150 seconds, 3 minutes = 180 seconds, 200 seconds, and a quarter of an hour = 15 minutes = 900 seconds.",
      ),
  ],
});

const SPORT_TABLE: Picture = {
  kind: "table",
  headings: ["Sport", "Students"],
  rows: [
    ["cricket", 12],
    ["netball", 15],
    ["soccer", 9],
    ["swimming", 6],
  ],
};

const GOALS_PLOT: Picture = {
  kind: "dot_plot",
  title: "Goals scored in each game",
  columns: [
    { label: "0", count: 2 },
    { label: "1", count: 5 },
    { label: "2", count: 3 },
    { label: "3", count: 1 },
  ],
};

const CANS_GRAPH: Picture = {
  kind: "column_graph",
  title: "Cans collected",
  step: 10,
  columns: [
    { label: "4A", value: 40 },
    { label: "4B", value: 70 },
    { label: "4C", value: 55 },
    { label: "4D", value: 30 },
  ],
};

const SLEEP_PLOT: Picture = {
  kind: "dot_plot",
  title: "Hours of sleep last night",
  columns: [
    { label: "8", count: 3 },
    { label: "9", count: 6 },
    { label: "10", count: 4 },
    { label: "11", count: 2 },
  ],
};

const RAIN_TABLE: Picture = {
  kind: "table",
  headings: ["Month", "Rainy days"],
  rows: [
    ["January", 8],
    ["February", 11],
    ["March", 9],
    ["April", 6],
  ],
};

/** MA2-DATA-02: interpreting tables, dot plots and column graphs. */
export const DATA = levels(4070101, {
  very_easy: [
    (n) =>
      pic(
        SPORT_TABLE,
        choice(
          n,
          "The table shows the sport each student chose. Which sport did the most students choose?",
          ["cricket", "netball", "soccer", "swimming"],
          1,
          "Netball has 15 students, the biggest number in the table.",
        ),
      ),
    (n) =>
      pic(
        GOALS_PLOT,
        typed(
          "short_answer",
          n,
          "Each dot is one game. In how many games were exactly 2 goals scored?",
          "3",
          "Count the dots above 2: there are 3, so 2 goals were scored in 3 games.",
        ),
      ),
    (n) =>
      pic(
        SPORT_TABLE,
        trueFalse(
          n,
          "Look at the table. More students chose cricket than soccer.",
          true,
          "12 students chose cricket and 9 chose soccer. 12 is more than 9.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        SPORT_TABLE,
        typed("short_answer", n, "Look at the table. How many students are there altogether?", "42", "12 + 15 + 9 + 6 = 42 students."),
      ),
    (n) =>
      pic(
        GOALS_PLOT,
        choice(
          n,
          "Look at the dot plot. What was the most common number of goals in a game?",
          ["0", "1", "2", "3"],
          1,
          "1 goal has the most dots (5), so it was the most common.",
        ),
      ),
    (n) =>
      pic(
        CANS_GRAPH,
        choice(
          n,
          "Look at the graph. Which class collected 55 cans?",
          ["4A", "4B", "4C", "4D"],
          2,
          "The 4C column stops halfway between 50 and 60, which is 55.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        CANS_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more cans did 4B collect than 4D?",
          "40",
          "4B collected 70 and 4D collected 30. 70 − 30 = 40 more cans.",
        ),
      ),
    (n) =>
      pic(
        GOALS_PLOT,
        typed(
          "short_answer",
          n,
          "Look at the dot plot. In how many games were 2 or more goals scored?",
          "4",
          "Add the dots above 2 and 3: 3 + 1 = 4 games.",
        ),
      ),
    (n) =>
      pic(
        CANS_GRAPH,
        multi(
          n,
          "Look at the graph. Which classes collected more than 45 cans? Choose all that are right.",
          ["4A", "4B", "4C", "4D"],
          [1, 2],
          "4B collected 70 and 4C collected 55, both more than 45. 4A collected 40 and 4D collected 30.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        CANS_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many cans did the four classes collect altogether?",
          "195",
          "40 + 70 + 55 + 30. 40 + 70 = 110 and 55 + 30 = 85. 110 + 85 = 195 cans.",
        ),
      ),
    (n) =>
      pic(
        SLEEP_PLOT,
        typed(
          "short_answer",
          n,
          "Each dot is one student. How many students slept more than 9 hours?",
          "6",
          "More than 9 hours means 10 or 11 hours. 4 + 2 = 6 students.",
        ),
      ),
    (n) =>
      pic(
        RAIN_TABLE,
        ordering(
          n,
          "Look at the table. Put the months in order from fewest rainy days to most.",
          ["April", "January", "March", "February"],
          "April had 6, January 8, March 9 and February 11 rainy days.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        SLEEP_PLOT,
        trueFalse(
          n,
          "Look at the dot plot. Half of the students slept 9 hours.",
          false,
          "There are 3 + 6 + 4 + 2 = 15 students. 6 slept 9 hours, but half of 15 is 7 and a half, so 6 is less than half.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Library books borrowed",
          step: 2,
          columns: [
            { label: "Mon", value: 7 },
            { label: "Tue", value: 12 },
            { label: "Wed", value: 9 },
            { label: "Thu", value: 4 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many books were borrowed on Monday and Wednesday together?",
          "16",
          "The scale goes up in 2s. Monday stops halfway between 6 and 8, which is 7. Wednesday stops halfway between 8 and 10, which is 9. 7 + 9 = 16.",
        ),
      ),
    (n) =>
      pic(
        RAIN_TABLE,
        typed(
          "short_answer",
          n,
          "Look at the table. How many more rainy days were there in February and March together than in January and April together?",
          "6",
          "February and March: 11 + 9 = 20. January and April: 8 + 6 = 14. 20 − 14 = 6 more rainy days.",
        ),
      ),
  ],
});
