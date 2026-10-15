/**
 * Year 4 Mathematics, extra sets: a second 15 questions for each Stage 2 standard in
 * maths-year4a.ts, three at each level from very easy to very hard. These are later Stage 2
 * (Stage 2B) questions with different numbers and contexts from the first sets.
 * Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA2-RN-01: place value and the role of zero to tens of thousands. */
export const PLACE_VALUE = levels(4040116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 8 in 3842?",
        ["8", "80", "800", "8000"],
        2,
        "The 8 is in the hundreds place, so it is worth 8 hundreds, or 800.",
      ),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 5, tens: 4, ones: 0 },
        typed(
          "short_answer",
          n,
          "What number do these blocks show?",
          "540",
          "There are 5 hundreds, 4 tens and no ones. The 0 holds the ones place: 540.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In 52 316, the 2 is in the thousands place.",
        true,
        "52 316 is 5 ten thousands, 2 thousands, 3 hundreds, 1 ten and 6 ones. So the 2 is worth 2000.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write sixty thousand and thirty-eight as a number.",
        ["60 038", "60038"],
        "Sixty thousand is 60 000. There are no hundreds, so a 0 goes there, then 3 tens and 8 ones: 60 038.",
      ),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from largest to smallest.",
        ["31 200", "30 210", "30 120", "3012"],
        "3012 has only four digits, so it is the smallest. 31 200 has the most thousands. Then compare 30 210 and 30 120 at the hundreds: 2 hundreds is more than 1 hundred.",
      ),
    (n) => typed("fill_blank", n, "40 000 + 6000 + ___ + 8 = 46 058", "50", "The 5 in 46 058 is in the tens place, so it is worth 50."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which number has a 0 in the thousands place and a 7 in the tens place?",
        ["87 405", "80 745", "80 475", "70 485"],
        2,
        "In 80 475 the digits are 8 ten thousands, 0 thousands, 4 hundreds, 7 tens and 5 ones.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 100 less than 50 060?",
        ["49 960", "49960"],
        "50 060 has 500 hundreds (and 60 more). Taking 1 hundred leaves 499 hundreds and 60: 49 960. Check: 49 960 + 100 = 50 060.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Round 63 548 to the nearest ten thousand.",
        ["60 000", "60000"],
        "63 548 is between 60 000 and 70 000. Look at the thousands digit: it is 3, which is less than 5, so round down to 60 000.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these are equal to 38 500? Choose all that are right.",
        ["385 hundreds", "3850 tens", "38 thousands and 5 hundreds", "3 ten thousands and 85 tens", "30 000 + 800 + 50"],
        [0, 1, 2],
        "385 hundreds, 3850 tens, and 38 thousands and 5 hundreds are all 38 500. 3 ten thousands and 85 tens is 30 850, and 30 000 + 800 + 50 is also 30 850.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A whole number rounds to 7300 when it is rounded to the nearest hundred. What is the smallest it could be?",
        "7250",
        "Numbers from 7250 up to 7349 round to 7300. 7249 is closer to 7200, so the smallest is 7250.",
      ),
    (n) =>
      trueFalse(
        n,
        "The 4 in 14 203 is worth 10 times as much as the 4 in 31 420.",
        true,
        "In 14 203 the 4 is in the thousands place, worth 4000. In 31 420 it is in the hundreds place, worth 400. 4000 is 10 times 400.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Using the digits 3, 8, 0, 5 and 1 once each, what is the largest odd 5-digit number you can make?",
        ["85 301", "85301"],
        "An odd number must end in 1, 3 or 5. Put the smallest odd digit, 1, at the end so the big digits can go first. Then the rest from largest down: 85 301.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A number has 7 ten thousands, 23 tens and 6 ones. What is the number?",
        ["70 236", "70236"],
        "7 ten thousands is 70 000. 23 tens is 230. So 70 000 + 230 + 6 = 70 236.",
      ),
    (n) =>
      choice(
        n,
        "Rounded to the nearest thousand, the number of people at a Kiama festival was 22 000. Which could be the real number?",
        ["21 480", "22 490", "22 510", "21 499"],
        1,
        "Look at the hundreds digit. 22 490 has 4 hundreds, so it rounds down to 22 000. 22 510 rounds up to 23 000, and 21 480 and 21 499 round down to 21 000.",
      ),
  ],
});

/** MA2-RN-02: decimals to two decimal places. */
export const DECIMALS = levels(4020216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 10, shaded: 3 },
        choice(
          n,
          "The bar is one whole. Which decimal shows the shaded part?",
          ["0.3", "3.0", "0.03", "0.7"],
          0,
          "The bar is cut into 10 equal parts and 3 are shaded. That is 3 tenths, written 0.3.",
        ),
      ),
    (n) => trueFalse(n, "0.8 is the same as 8 tenths.", true, "The first place after the decimal point is tenths, so 0.8 is 8 tenths."),
    (n) =>
      choice(
        n,
        "What is the 4 worth in 2.47?",
        ["4 ones", "4 tenths", "4 hundredths", "4 tens"],
        1,
        "The 4 is the first digit after the decimal point, so it is 4 tenths.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 5 wholes and 6 hundredths as a decimal.",
        "5.06",
        "There are no tenths, so a 0 goes in the tenths place. The 6 goes in the hundredths place: 5.06.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 9 },
        typed(
          "short_answer",
          n,
          "The number line goes from 0 to 1. What decimal is the dot on?",
          ["0.9", ".9", "0.90"],
          "Each of the 10 jumps is 0.1. The dot is 9 jumps along, so it is on 0.9.",
        ),
      ),
    (n) => typed("fill_blank", n, "0.75 = ___ hundredths", "75", "7 tenths is 70 hundredths, and 5 more hundredths makes 75 hundredths."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which decimal is the smallest?",
        ["0.5", "0.45", "0.54", "0.09"],
        3,
        "Compare the tenths first. 0.09 has 0 tenths, and the others have 4 or 5 tenths, so 0.09 is the smallest.",
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts of money in order from smallest to largest.",
        ["$2.05", "$2.50", "$2.55", "$5.20"],
        "$2.05 is 2 dollars and 5 cents, $2.50 is 2 dollars and 50 cents, $2.55 is 2 dollars and 55 cents, and $5.20 has 5 dollars.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 5, dotAt: 2 },
        choice(
          n,
          "The number line goes from 0 to 1 in 5 equal jumps. What decimal is the dot on?",
          ["0.4", "0.2", "0.25", "2"],
          0,
          "5 equal jumps make 1 whole, so each jump is 2 tenths (0.2). The dot is 2 jumps along: 0.2 + 0.2 = 0.4.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1 hundredth less than 4.1?",
        "4.09",
        "Write 4.1 as 4.10. One hundredth less than 10 hundredths is 9 hundredths, so the answer is 4.09.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 0.3? Choose all that are right.",
        ["3/10", "30/100", "0.30", "0.03", "3/100"],
        [0, 1, 2],
        "0.3 is 3 tenths, which is 3/10. 3 tenths is also 30 hundredths, so 30/100 and 0.30 match too. 0.03 and 3/100 are only 3 hundredths.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 0.1, jumps: 10, dotAt: 6 },
        typed(
          "short_answer",
          n,
          "This number line goes from 0 to 0.1. What decimal is the dot on?",
          "0.06",
          "0.1 is 10 hundredths, cut into 10 jumps, so each jump is 1 hundredth. The dot is 6 jumps along: 0.06.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write 46 tenths as a decimal.",
        "4.6",
        "10 tenths make 1 whole, so 40 tenths is 4 wholes. That leaves 6 tenths: 4.6.",
      ),
    (n) =>
      choice(
        n,
        "Jo is 1.4 m tall, Kim is 1.38 m, Lee is 1.09 m and Max is 1.41 m. Who is the tallest?",
        ["Jo", "Kim", "Lee", "Max"],
        3,
        "Write them all with two places: 1.40, 1.38, 1.09 and 1.41. 1.41 is the biggest, so Max is tallest.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "2.06 = 1 one and ___ hundredths",
        "106",
        "2.06 is 206 hundredths. 1 one is 100 hundredths, so 206 − 100 = 106 hundredths are left.",
      ),
  ],
});

/** MA2-AR-01: mental and written strategies for addition and subtraction. */
export const ADD_SUB = levels(4050116, {
  very_easy: [
    (n) => typed("short_answer", n, "47 + 40 = ?", "87", "Add 4 tens to 47: 57, 67, 77, 87."),
    (n) => typed("short_answer", n, "120 − 60 = ?", "60", "12 tens take away 6 tens is 6 tens, which is 60."),
    (n) =>
      trueFalse(
        n,
        "198 + 35 gives the same answer as 200 + 33.",
        true,
        "Move 2 from 35 to 198 to make 200 + 33. The total stays the same: 233.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "365 + 28 = ?", "393", "365 + 30 = 395, but that is 2 too many, so 395 − 2 = 393."),
    (n) => typed("short_answer", n, "540 − 230 = ?", "310", "500 − 200 = 300 and 40 − 30 = 10. 300 + 10 = 310."),
    (n) =>
      choice(
        n,
        "Which is the best estimate of 297 + 405?",
        ["600", "700", "800", "500"],
        1,
        "297 is about 300 and 405 is about 400, so the answer is about 300 + 400 = 700.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "752 − 298 = ?", "454", "Take away 300 to get 452. You took 2 too many, so add them back: 454."),
    (n) =>
      typed(
        "short_answer",
        n,
        "468 + 375 = ?",
        "843",
        "Hundreds: 400 + 300 = 700. Tens: 60 + 70 = 130. Ones: 8 + 5 = 13. 700 + 130 + 13 = 843.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "At the Royal Easter Show, 627 people visited the animal nursery in the morning and 348 in the afternoon. How many visited altogether?",
        "975",
        "627 + 348: 600 + 300 = 900, 20 + 40 = 60, 7 + 8 = 15. 900 + 60 + 15 = 975 people.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "804 − 467 = ?", "337", "Count up from 467: 33 to 500, then 304 to 804. 33 + 304 = 337."),
    (n) =>
      choice(
        n,
        "The school library has 925 books. 368 of them are borrowed. How many books are still on the shelves?",
        ["557", "643", "567", "543"],
        0,
        "925 − 368: count up from 368. 32 to 400, then 525 to 925. 32 + 525 = 557 books.",
      ),
    (n) =>
      multi(
        n,
        "Which of these have an answer more than 700? Choose all that are right.",
        ["356 + 362", "925 − 238", "488 + 219", "1000 − 319"],
        [0, 2],
        "356 + 362 = 718 and 488 + 219 = 707 are more than 700. 925 − 238 = 687 and 1000 − 319 = 681 are less.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Tom had $500. He bought a bike helmet for $85 and a lock for $47. Then he earned $30 mowing a lawn. How many dollars does he have now?",
        ["398", "$398"],
        "$500 − $85 = $415. $415 − $47 = $368. Then add the $30 he earned: $368 + $30 = $398.",
      ),
    (n) =>
      choice(
        n,
        "Leo worked out 457 + 368 and got 715. What mistake did he make?",
        [
          "He didn't carry the extra ten and hundred",
          "He subtracted instead of adding",
          "He added the hundreds wrong",
          "He made no mistake",
        ],
        0,
        "457 + 368 is really 825. 7 + 8 = 15 and 5 + 6 + 1 = 12 need carrying. Leo wrote 5, then 1, then 4 + 3 = 7, without carrying, which gave 715.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ana thinks of a number. Her number plus 256 is the same as 1000 − 318. What is her number?",
        "426",
        "1000 − 318 = 682. So her number + 256 = 682. 682 − 256 = 426.",
      ),
  ],
});

/** MA2-AR-02: missing values in addition and subtraction number sentences. */
export const MISSING_ADD = levels(4050216, {
  very_easy: [
    (n) => typed("fill_blank", n, "___ + 30 = 90", "60", "6 tens and 3 tens make 9 tens, so the missing number is 60."),
    (n) => typed("fill_blank", n, "50 − ___ = 35", "15", "Count up from 35 to 50: that is 15. Check: 50 − 15 = 35."),
    (n) =>
      trueFalse(
        n,
        "If 70 − 25 = 45, then 45 + 25 = 70.",
        true,
        "Adding undoes subtracting. Take 25 from 70 to get 45, so adding 25 back to 45 gives 70.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "250 + ___ = 400", "150", "Count up from 250: 50 to 300, then 100 to 400. 50 + 100 = 150."),
    (n) => typed("fill_blank", n, "___ − 40 = 75", "115", "Add the 40 back: 75 + 40 = 115. Check: 115 − 40 = 75."),
    (n) =>
      choice(
        n,
        "Which number makes 500 − ? = 380 true?",
        ["220", "880", "120", "180"],
        2,
        "Count up from 380 to 500: 20 to 400, then 100 to 500. 20 + 100 = 120.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "___ + 368 = 700", "332", "Count up from 368: 32 to 400, then 300 to 700. 32 + 300 = 332."),
    (n) => typed("fill_blank", n, "915 − ___ = 600", "315", "From 915 down to 600 is 315. Check: 915 − 315 = 600."),
    (n) =>
      choice(
        n,
        "Josh had 64 footy cards. After his birthday he had 150. Which number sentence finds how many cards he was given?",
        ["64 + ? = 150", "150 + 64 = ?", "? − 64 = 150", "64 − ? = 150"],
        0,
        "He started with 64, was given some more, and ended with 150: 64 + ? = 150. He was given 86 cards.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ − 476 = 289", "765", "Undo the subtraction by adding: 289 + 476 = 765."),
    (n) => typed("fill_blank", n, "1000 − ___ = 563", "437", "Count up from 563: 37 to 600, then 400 to 1000. 37 + 400 = 437."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A Sydney train can carry 720 passengers. 458 passengers are already on. How many more can get on?",
        "262",
        "458 + ? = 720. Count up: 42 to 500, then 220 to 720. 42 + 220 = 262.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "248 + ___ = 600 − 155", "197", "600 − 155 = 445, so 248 + ? = 445. 445 − 248 = 197."),
    (n) => typed("fill_blank", n, "700 − ___ = 185 + 290", "225", "185 + 290 = 475, so 700 − ? = 475. 700 − 475 = 225."),
    (n) =>
      multi(
        n,
        "Which numbers could go in the box to make 850 − □ less than 500? Choose all that are right.",
        ["300", "350", "351", "420"],
        [2, 3],
        "850 − 350 = 500 exactly. To get less than 500 you must take away more than 350, so 351 and 420 work. 300 leaves 550, and 350 leaves exactly 500.",
      ),
  ],
});

/** MA2-MR-01: multiplication and division facts to 10 × 10. */
export const TIMES = levels(4010116, {
  very_easy: [
    (n) => typed("short_answer", n, "4 × 5 = ?", "20", "4 groups of 5: 5, 10, 15, 20."),
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 8 },
        choice(
          n,
          "This array has 3 rows of 8. Which other fact also matches it?",
          ["8 × 3 = 24", "8 × 4 = 32", "3 × 3 = 9", "24 × 3 = 72"],
          0,
          "Turn the array around and you have 8 columns of 3. 3 × 8 and 8 × 3 both make 24.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every number in the 5 times table ends in 0 or 5.",
        true,
        "Counting by 5s goes 5, 10, 15, 20, … The ones digit keeps going 5, 0, 5, 0.",
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "8 × 5 = ?", "40", "8 fives is half of 8 tens. 8 × 10 = 80, and half of 80 is 40."),
    (n) => typed("short_answer", n, "42 ÷ 7 = ?", "6", "How many 7s make 42? 6 × 7 = 42, so the answer is 6."),
    (n) =>
      choice(
        n,
        "Which of these is a multiple of 8?",
        ["48", "28", "36", "58"],
        0,
        "6 × 8 = 48, so 48 is in the 8 times table. 28, 36 and 58 are not.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "8 × 7 = ?", "56", "5 × 7 = 35 and 3 × 7 = 21. 35 + 21 = 56."),
    (n) =>
      pic(
        { kind: "array", rows: 7, columns: 9 },
        multi(
          n,
          "Which of these tell you how many dots are in this array? Choose all that are right.",
          ["7 × 9", "9 × 7", "7 + 9", "6 × 9"],
          [0, 1],
          "There are 7 rows of 9, which is 7 × 9 = 63. You can also see 9 columns of 7, which is 9 × 7 = 63. 7 + 9 only adds one row and one column.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In cricket there are 6 balls in an over. How many balls are bowled in 8 overs?",
        "48",
        "8 × 6 = 48. You can think 8 × 5 = 40, then add one more 8: 48.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "72 ÷ 8 = ?", "9", "9 × 8 = 72, so 72 ÷ 8 = 9."),
    (n) =>
      multi(
        n,
        "Which of these are multiples of both 6 and 9? Choose all that are right.",
        ["27", "18", "45", "36", "54"],
        [1, 3, 4],
        "18, 36 and 54 are in both the 6 and 9 times tables. 27 and 45 are multiples of 9 but not of 6.",
      ),
    (n) =>
      choice(
        n,
        "Which is the same as 9 × 6?",
        ["10 × 6 − 6", "10 × 6 − 9", "9 × 5 + 5", "3 × 6 + 3"],
        0,
        "9 sixes is one six less than 10 sixes: 60 − 6 = 54.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "62 apples are packed into bags of 8. How many apples are left over after filling as many bags as possible?",
        "6",
        "7 × 8 = 56, so 7 bags are filled. 62 − 56 = 6 apples are left over.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Netball bibs cost $9 each and balls cost $7 each. How many dollars do 6 bibs and 4 balls cost altogether?",
        ["82", "$82"],
        "6 bibs: 6 × 9 = $54. 4 balls: 4 × 7 = $28. $54 + $28 = $82.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["4 × 9", "5 × 8", "6 × 7", "7 × 7"],
        "Work each one out: 4 × 9 = 36, 5 × 8 = 40, 6 × 7 = 42, 7 × 7 = 49.",
      ),
  ],
});

/** MA2-MR-02: missing values in multiplication and division number sentences. */
export const MISSING_TIMES = levels(4010216, {
  very_easy: [
    (n) => typed("fill_blank", n, "___ × 2 = 16", "8", "Double 8 is 16, so 8 × 2 = 16."),
    (n) => typed("fill_blank", n, "30 ÷ ___ = 3", "10", "30 is 3 tens, so 30 shared into groups of 10 makes 3 groups."),
    (n) => trueFalse(n, "If 4 × 7 = 28, then 28 ÷ 4 = 7.", true, "Multiplying and dividing undo each other, so 28 ÷ 4 = 7."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "___ × 5 = 45", "9", "Count by fives to 45: that takes 9 fives. 9 × 5 = 45."),
    (n) => typed("fill_blank", n, "___ ÷ 3 = 8", "24", "Undo the division: 8 × 3 = 24. Check: 24 ÷ 3 = 8."),
    (n) => choice(n, "Which number makes 7 × ? = 49 true?", ["6", "8", "7", "42"], 2, "7 × 7 = 49, so the missing number is 7."),
  ],
  medium: [
    (n) => typed("fill_blank", n, "8 × ___ = 64", "8", "8 × 8 = 64. You can check: 8 × 10 = 80, and 80 − 16 = 64."),
    (n) => typed("fill_blank", n, "63 ÷ ___ = 9", "7", "7 × 9 = 63, so 63 ÷ 7 = 9."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 9 },
        typed(
          "fill_blank",
          n,
          "This array has 36 dots, with 9 in each row. 36 ÷ 9 = ___ rows",
          "4",
          "Count the rows: there are 4 rows of 9. 4 × 9 = 36, so 36 ÷ 9 = 4.",
        ),
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ ÷ 7 = 8", "56", "Undo the division: 8 × 7 = 56. Check: 56 ÷ 7 = 8."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia thinks of a number. She multiplies it by 9 and gets 72. What was her number?",
        "8",
        "? × 9 = 72. Undo it by dividing: 72 ÷ 9 = 8.",
      ),
    (n) =>
      choice(
        n,
        "Ella packs 48 eggs into cartons that hold 6 eggs each. Which number sentence finds how many cartons she fills?",
        ["48 ÷ 6 = ?", "48 × 6 = ?", "6 ÷ 48 = ?", "48 − 6 = ?"],
        0,
        "Sharing 48 eggs into groups of 6 is division: 48 ÷ 6 = ?. The answer is 8 cartons.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "3 × ___ = 4 × 6", "8", "4 × 6 = 24, so 3 × ? = 24. 3 × 8 = 24."),
    (n) => typed("fill_blank", n, "___ × 4 = 56 ÷ 2", "7", "56 ÷ 2 = 28, so ? × 4 = 28. 7 × 4 = 28."),
    (n) =>
      multi(
        n,
        "Which pairs of numbers could go in the boxes to make □ × □ = 24 true? Choose all that are right.",
        ["3 and 8", "4 and 6", "5 and 5", "2 and 12", "3 and 9"],
        [0, 1, 3],
        "3 × 8, 4 × 6 and 2 × 12 all make 24. 5 × 5 is 25 and 3 × 9 is 27.",
      ),
  ],
});

/** MA2-PF-01: halves, quarters, thirds and fifths on a number line, and fractions made by halving them. */
export const FRACTIONS = levels(4020116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 1 },
        choice(
          n,
          "What fraction of the circle is shaded?",
          ["1/4", "1/3", "4/1", "3/4"],
          0,
          "The circle is cut into 4 equal parts and 1 is shaded, so 1/4 is shaded.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two halves make one whole.",
        true,
        "A whole cut into 2 equal parts gives 2 halves, and putting them back together makes 1 whole.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 4, dotAt: 1 },
        choice(
          n,
          "The number line goes from 0 to 1. What fraction is the dot on?",
          ["1/4", "1/2", "4", "3/4"],
          0,
          "The line from 0 to 1 is cut into 4 equal jumps, so each jump is a quarter. The dot is 1 jump along: 1/4.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 5, shaded: 4 },
        typed(
          "short_answer",
          n,
          "What fraction of the circle is shaded?",
          ["4/5", "four fifths"],
          "The circle is cut into 5 equal parts and 4 are shaded, so 4/5 is shaded.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many quarters make 2 wholes?",
        ["8", "eight"],
        "4 quarters make 1 whole, so 2 wholes need 4 + 4 = 8 quarters.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 5, dotAt: 3 },
        typed(
          "short_answer",
          n,
          "The number line goes from 0 to 1. What fraction is the dot on?",
          ["3/5", "three fifths"],
          "The line from 0 to 1 is cut into 5 equal jumps, so each jump is 1/5. The dot is 3 jumps along: 3/5.",
        ),
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which fraction is the same as one half?",
        ["3/6", "1/3", "2/5", "1/6"],
        0,
        "Cut each half into 3 equal parts and you get sixths. One half is 3 of those 6 parts: 3/6.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 8, dotAt: 4 },
        multi(
          n,
          "Which fractions tell where the dot is? Choose all that are right.",
          ["4/8", "2/4", "1/2", "1/4"],
          [0, 1, 2],
          "The line is cut into 8 jumps (eighths) and the dot is 4 jumps along: 4/8. That is exactly halfway, so it is also 1/2, and 2 of 4 quarters: 2/4.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these fractions in order from largest to smallest.",
        ["1/2", "1/3", "1/5", "1/10"],
        "When a whole is cut into more equal parts, each part is smaller. Halves are biggest, then thirds, fifths and tenths.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "3/4 = ___/8",
        "6",
        "Halve each quarter to make eighths. Each quarter becomes 2 eighths, so 3 quarters is 6 eighths.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 2, jumps: 6, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "The number line goes from 0 to 2. What number is the dot on?",
          ["1 1/3", "4/3", "one and a third"],
          "There are 3 jumps between 0 and 1, so each jump is a third. The dot is 4 jumps along: 4 thirds, which is 1 and 1/3.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "2/3 is less than 1/2.",
        false,
        "Halve each third to get sixths: 2/3 = 4/6. One half is 3/6. 4/6 is more than 3/6, so 2/3 is bigger than 1/2.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Four ribbons are 3/5 m, 1/2 m, 7/10 m and 2/5 m long. Which is the longest?",
        ["3/5 m", "1/2 m", "7/10 m", "2/5 m"],
        2,
        "Change them all to tenths by halving each fifth: 3/5 = 6/10, 1/2 = 5/10, 2/5 = 4/10. 7/10 is the biggest.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pizza is cut into quarters. Then each quarter is cut in half. Jo eats 3 of the small pieces. What fraction of the pizza did she eat?",
        ["3/8", "three eighths"],
        "4 quarters each cut in half makes 8 equal pieces, so each piece is 1/8. 3 pieces is 3/8 of the pizza.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 2/3? Choose all that are right.",
        ["4/6", "2/6", "8/12", "3/4"],
        [0, 2],
        "Halve each third to get sixths: 2/3 = 4/6. Halve again to get twelfths: 4/6 = 8/12. 2/6 is only one third, and 3/4 is bigger.",
      ),
  ],
});

/** MA2-GM-02: measuring and estimating length in metres, centimetres and millimetres. */
export const LENGTH = levels(4060116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 9, object: "pencil" },
        typed(
          "short_answer",
          n,
          "How many centimetres long is the pencil?",
          ["9", "9 cm"],
          "The pencil starts at 0 and ends at 9, so it is 9 cm long.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the length of a swimming pool?",
        ["metres", "millimetres", "centimetres", "litres"],
        0,
        "A swimming pool is long, often 25 or 50 metres, so metres are best.",
      ),
    (n) => trueFalse(n, "1 cm is the same length as 10 mm.", true, "Each centimetre on a ruler is split into 10 millimetres."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "400 cm = ___ m", "4", "100 cm make 1 metre, so 400 cm is 4 metres."),
    (n) =>
      choice(
        n,
        "About how long is a new pencil?",
        ["18 cm", "18 mm", "18 m", "1.8 m"],
        0,
        "A new pencil is a bit shorter than a 30 cm ruler, so about 18 cm. 18 mm is tiny and 18 m is longer than a classroom.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 8.5, object: "ribbon" },
        choice(
          n,
          "How long is the ribbon?",
          ["8 cm 5 mm", "85 cm", "8 cm", "5 cm 8 mm"],
          0,
          "The ribbon ends halfway between 8 and 9. Half a centimetre is 5 mm, so it is 8 cm 5 mm long.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "2 m 8 cm = ___ cm",
        "208",
        "2 m is 200 cm, and 200 + 8 = 208 cm. The 0 shows there are no tens of centimetres.",
      ),
    (n) =>
      ordering(
        n,
        "Put these lengths in order from longest to shortest.",
        ["2.1 m", "205 cm", "1 m 90 cm", "190 mm"],
        "Change them to centimetres: 2.1 m is 210 cm, then 205 cm, 1 m 90 cm is 190 cm, and 190 mm is only 19 cm.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 6, height: 6, top: "6 cm", side: "6 cm" },
        typed(
          "short_answer",
          n,
          "This square has sides of 6 cm. What is its perimeter in centimetres?",
          ["24", "24 cm"],
          "A square has 4 equal sides. 6 + 6 + 6 + 6 = 24 cm, or 4 × 6 = 24 cm.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many centimetres are there in 4.06 m?",
        ["406", "406 cm"],
        "4 m is 400 cm, and 0.06 m is 6 hundredths of a metre, which is 6 cm. 400 + 6 = 406 cm.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 3],
            [5, 3],
            [5, 6],
            [0, 6],
          ],
          sideLabels: ["8 m", "3 m", "3 m", "3 m", "5 m", "6 m"],
        },
        typed(
          "short_answer",
          n,
          "This is the plan of a fence around a play area. How many metres of fence are there altogether?",
          ["28", "28 m"],
          "The fence goes all the way around, so add all six sides: 8 + 3 + 3 + 3 + 5 + 6 = 28 m.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are the same length as 2 m 40 cm? Choose all that are right.",
        ["240 cm", "2.4 m", "2400 mm", "204 cm", "2.04 m"],
        [0, 1, 2],
        "2 m 40 cm is 200 + 40 = 240 cm. That is 2.4 m (2.40 m), and 240 × 10 = 2400 mm. 204 cm and 2.04 m are 2 m 4 cm.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A square has a perimeter of 36 cm. How long is each side in centimetres?",
        ["9", "9 cm"],
        "A square has 4 equal sides, so share the perimeter by 4: 36 ÷ 4 = 9 cm.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jai's paper plane flew 4 m 65 cm. Lucy's flew 90 cm less. How far did Lucy's plane fly, in centimetres?",
        ["375", "375 cm"],
        "4 m 65 cm is 465 cm. 465 − 90 = 375 cm.",
      ),
    (n) =>
      choice(
        n,
        "A 2 m ribbon is cut into pieces that are each 40 cm long. How many pieces are there?",
        ["8", "50", "5", "20"],
        2,
        "2 m is 200 cm. 40 cm × 5 = 200 cm, so there are 5 pieces.",
      ),
  ],
});

/** MA2-NSM-02: analog and digital time in hours, minutes and seconds. */
export const TIME = levels(4060216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 7, minute: 45 },
        choice(
          n,
          "What time does the clock show?",
          ["7:45", "9:35", "8:45", "7:09"],
          0,
          "The minute hand points to the 9, which is 45 minutes past. The hour hand is between 7 and 8 and hasn't reached 8 yet, so it is 7:45.",
        ),
      ),
    (n) => typed("fill_blank", n, "1 hour = ___ minutes", "60", "There are 60 minutes in 1 hour."),
    (n) => trueFalse(n, "3:00 pm is in the afternoon.", true, "pm times are after midday, so 3:00 pm is in the afternoon."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 6, minute: 10 },
        typed(
          "short_answer",
          n,
          "What time does the clock show? Write it as digital time.",
          ["6:10", "06:10"],
          "The minute hand points to the 2, and 2 × 5 = 10 minutes. The hour hand is just past the 6, so it is 6:10.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which digital time is the same as quarter to 9?",
        ["8:45", "9:15", "9:45", "8:15"],
        0,
        "Quarter to 9 is 15 minutes before 9:00. 60 − 15 = 45, so it is 45 minutes past 8: 8:45.",
      ),
    (n) =>
      choice(
        n,
        "Which of these takes about 1 second?",
        ["clapping your hands once", "reading a book", "walking to school", "eating dinner"],
        0,
        "One clap is over in about a second. The others take many minutes.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 3, minute: 55 },
        choice(
          n,
          "What time does the clock show?",
          ["5 to 4", "5 to 3", "55 past 4", "5 past 11"],
          0,
          "The minute hand is on the 11, which is 55 minutes past, or 5 minutes to the next hour. The hour hand is nearly at 4, so it is 5 to 4 (3:55).",
        ),
      ),
    (n) => typed("fill_blank", n, "2 minutes = ___ seconds", "120", "Each minute is 60 seconds, so 2 minutes is 60 + 60 = 120 seconds."),
    (n) =>
      ordering(
        n,
        "Put these times in order from earliest to latest in the day.",
        ["7:15 am", "11:50 am", "12:30 pm", "6:05 pm"],
        "am times come before midday, so 7:15 am and 11:50 am come first. 12:30 pm is just after midday, and 6:05 pm is in the evening.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "What is 19:40 in 12-hour time?",
        ["7:40 pm", "9:40 pm", "7:40 am", "1:40 pm"],
        0,
        "Hours after 12 in 24-hour time are pm. Take away 12 from the hour: 19 − 12 = 7. So 19:40 is 7:40 pm.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 50 },
        typed(
          "short_answer",
          n,
          "The clock shows when a movie started. The movie was 1 hour and 25 minutes long. What time did it finish?",
          ["11:15", "11:15 am", "11:15am"],
          "The clock shows 9:50. 1 hour later is 10:50. Then 10 minutes gets to 11:00, and 15 more makes 11:15.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "200 seconds = 3 minutes and ___ seconds",
        "20",
        "3 minutes is 3 × 60 = 180 seconds. 200 − 180 = 20 seconds left over.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bus leaves Parramatta at 10:38 am and arrives at Bondi at 12:05 pm. How many minutes long is the trip?",
        ["87", "87 minutes"],
        "10:38 to 11:00 is 22 minutes. 11:00 to 12:00 is 60 minutes. 12:00 to 12:05 is 5 minutes. 22 + 60 + 5 = 87 minutes.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Ferry stop", "Time"],
          rows: [
            ["Town wharf", "1:45 pm"],
            ["Beach", "1:58 pm"],
            ["Island", "2:16 pm"],
            ["Lighthouse", "2:29 pm"],
          ],
        },
        choice(
          n,
          "Look at the ferry timetable. How long does the ferry take from the town wharf to the lighthouse?",
          ["44 minutes", "84 minutes", "34 minutes", "56 minutes"],
          0,
          "Count on from 1:45: 15 minutes gets to 2:00, then 29 more to 2:29. 15 + 29 = 44 minutes.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these from shortest to longest.",
        ["a quarter of an hour", "20 minutes", "1500 seconds", "half an hour"],
        "Change them to minutes: a quarter of an hour is 15 minutes, then 20 minutes, 1500 seconds is 25 minutes (1500 ÷ 60), and half an hour is 30 minutes.",
      ),
  ],
});

const FRUIT_TABLE: Picture = {
  kind: "table",
  headings: ["Fruit", "Students"],
  rows: [
    ["apple", 14],
    ["banana", 9],
    ["mango", 17],
    ["orange", 6],
  ],
};

const BIRDS_PLOT: Picture = {
  kind: "dot_plot",
  title: "Rosellas seen at the bird bath each morning",
  columns: [
    { label: "2", count: 1 },
    { label: "3", count: 4 },
    { label: "4", count: 6 },
    { label: "5", count: 2 },
  ],
};

const PAPER_GRAPH: Picture = {
  kind: "column_graph",
  title: "Kilograms of paper recycled",
  step: 5,
  columns: [
    { label: "Term 1", value: 25 },
    { label: "Term 2", value: 40 },
    { label: "Term 3", value: 35 },
    { label: "Term 4", value: 15 },
  ],
};

const PETS_PLOT: Picture = {
  kind: "dot_plot",
  title: "Number of pets at home",
  columns: [
    { label: "0", count: 4 },
    { label: "1", count: 7 },
    { label: "2", count: 5 },
    { label: "3", count: 2 },
    { label: "4", count: 1 },
  ],
};

const LAPS_TABLE: Picture = {
  kind: "table",
  headings: ["Day", "Laps swum"],
  rows: [
    ["Monday", 18],
    ["Tuesday", 24],
    ["Wednesday", 15],
    ["Thursday", 21],
  ],
};

/** MA2-DATA-02: interpreting tables, dot plots and column graphs. */
export const DATA = levels(4070116, {
  very_easy: [
    (n) =>
      pic(
        FRUIT_TABLE,
        choice(
          n,
          "The table shows each student's favourite fruit. Which fruit did the fewest students choose?",
          ["apple", "banana", "mango", "orange"],
          3,
          "Orange has 6 students, the smallest number in the table.",
        ),
      ),
    (n) =>
      pic(
        BIRDS_PLOT,
        typed(
          "short_answer",
          n,
          "Each dot is one morning. On how many mornings were 4 rosellas seen?",
          "6",
          "Count the dots above 4: there are 6, so 4 rosellas were seen on 6 mornings.",
        ),
      ),
    (n) =>
      pic(
        FRUIT_TABLE,
        trueFalse(
          n,
          "Look at the table. More students chose banana than apple.",
          false,
          "9 students chose banana and 14 chose apple. 9 is less than 14, so it is false.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        FRUIT_TABLE,
        typed(
          "short_answer",
          n,
          "Look at the table. How many more students chose mango than banana?",
          "8",
          "17 chose mango and 9 chose banana. 17 − 9 = 8.",
        ),
      ),
    (n) =>
      pic(
        BIRDS_PLOT,
        choice(
          n,
          "Look at the dot plot. What was the most common number of rosellas seen?",
          ["2", "3", "4", "5"],
          2,
          "4 has the most dots (6), so seeing 4 rosellas was the most common.",
        ),
      ),
    (n) =>
      pic(
        PAPER_GRAPH,
        choice(
          n,
          "Look at the graph. In which term were 35 kg of paper recycled?",
          ["Term 1", "Term 2", "Term 3", "Term 4"],
          2,
          "The scale counts by 5s. The Term 3 column stops at the line for 35.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        PAPER_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more kilograms were recycled in Term 2 than in Term 4?",
          ["25", "25 kg"],
          "Term 2 was 40 kg and Term 4 was 15 kg. 40 − 15 = 25 kg more.",
        ),
      ),
    (n) =>
      pic(
        BIRDS_PLOT,
        typed(
          "short_answer",
          n,
          "Look at the dot plot. On how many mornings were fewer than 4 rosellas seen?",
          "5",
          "Fewer than 4 means 2 or 3 rosellas. Add those dots: 1 + 4 = 5 mornings.",
        ),
      ),
    (n) =>
      pic(
        PAPER_GRAPH,
        multi(
          n,
          "Look at the graph. In which terms was less than 30 kg recycled? Choose all that are right.",
          ["Term 1", "Term 2", "Term 3", "Term 4"],
          [0, 3],
          "Term 1 was 25 kg and Term 4 was 15 kg, both less than 30. Term 2 (40 kg) and Term 3 (35 kg) were more.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        PAPER_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the graph. How many kilograms of paper were recycled in the whole year?",
          ["115", "115 kg"],
          "25 + 40 + 35 + 15. 25 + 15 = 40 and 40 + 35 = 75. 40 + 75 = 115 kg.",
        ),
      ),
    (n) =>
      pic(
        PETS_PLOT,
        typed(
          "short_answer",
          n,
          "Each dot is one student. How many students have 2 or more pets?",
          "8",
          "2 or more pets means 2, 3 or 4 pets. Add those dots: 5 + 2 + 1 = 8 students.",
        ),
      ),
    (n) =>
      pic(
        LAPS_TABLE,
        ordering(
          n,
          "Look at the table. Put the days in order from most laps to fewest laps.",
          ["Tuesday", "Thursday", "Monday", "Wednesday"],
          "Tuesday had 24 laps, Thursday 21, Monday 18 and Wednesday 15.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        PETS_PLOT,
        trueFalse(
          n,
          "Look at the dot plot. Altogether, these students have 30 pets.",
          false,
          "Count the pets, not the students: 4 students × 0, 7 × 1 = 7, 5 × 2 = 10, 2 × 3 = 6, 1 × 4 = 4. 7 + 10 + 6 + 4 = 27 pets, not 30.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Tickets sold for the school fete",
          step: 4,
          columns: [
            { label: "Fri", value: 14 },
            { label: "Sat", value: 22 },
            { label: "Sun", value: 18 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many tickets were sold on Friday and Sunday together?",
          "32",
          "The scale goes up in 4s. Friday stops halfway between 12 and 16, which is 14. Sunday stops halfway between 16 and 20, which is 18. 14 + 18 = 32.",
        ),
      ),
    (n) =>
      pic(
        LAPS_TABLE,
        typed(
          "short_answer",
          n,
          "Look at the table. Kira wants to swim 100 laps from Monday to Friday. How many laps must she swim on Friday?",
          "22",
          "Monday to Thursday: 18 + 24 + 15 + 21 = 78 laps. 100 − 78 = 22 laps on Friday.",
        ),
      ),
  ],
});
