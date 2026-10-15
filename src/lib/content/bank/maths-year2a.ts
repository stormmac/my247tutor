/**
 * Year 2 Mathematics: two sets of 15 questions for each Stage 1 standard (NESA outcome), three at
 * each level from very easy to very hard. The second set of each standard (the `_2` export) asks
 * different questions. Arithmetic answers are checked by the content tests.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA1-RWN-01: place value and the role of zero to read, write and order two- and three-digit numbers. */
export const PLACE_VALUE = levels(2010101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 4, ones: 7 },
        typed("short_answer", n, "What number do these blocks show?", "47", "There are 4 tens and 7 ones. 40 and 7 make 47."),
      ),
    (n) =>
      choice(n, "What is the value of the 3 in 35?", ["3", "30", "300", "35"], 1, "The 3 is in the tens place. It is worth 3 tens, or 30."),
    (n) =>
      trueFalse(n, "In 208, the 0 shows there are no tens.", true, "208 is 2 hundreds, 0 tens and 8 ones. The 0 holds the tens place."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 2, tens: 0, ones: 6 },
        choice(
          n,
          "Which number do these blocks show?",
          ["26", "206", "260", "2006"],
          1,
          "There are 2 hundreds, no tens and 6 ones. We write 0 in the tens place: 206.",
        ),
      ),
    (n) => typed("short_answer", n, "Write three hundred and forty-two in numerals.", "342", "3 hundreds, 4 tens and 2 ones is 342."),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["109", "190", "901", "910"],
        "Look at the hundreds first. 109 and 190 have 1 hundred. 109 has 0 tens, so it is smaller. Then 901, then 910.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "573 = 500 + ___ + 3", "70", "The 7 in 573 is in the tens place. It is worth 70."),
    (n) =>
      choice(
        n,
        "Which number is three hundred and five?",
        ["35", "305", "350", "3005"],
        1,
        "3 hundreds, no tens and 5 ones. The 0 holds the tens place: 305.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 10 more than 495?",
        "505",
        "10 more adds 1 ten. 9 tens and 1 more ten is 10 tens, which is 1 hundred. So 495 becomes 505.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which number is the largest?",
        ["689", "698", "869", "896"],
        3,
        "869 and 896 both have 8 hundreds. 896 has 9 tens, which is more than 6 tens.",
      ),
    (n) =>
      multi(
        n,
        "Which numbers have a 0 in the tens place? Choose all that are right.",
        ["407", "470", "802", "120"],
        [0, 2],
        "In 407 and 802 the middle digit is 0, so there are no tens. In 470 and 120 the 0 is in the ones place.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 1 more than 699?",
        "700",
        "1 more than 699 fills the ones and the tens. It goes up to 7 hundreds: 700.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the largest 3-digit number you can make with the digits 4, 0 and 7? Use each digit once.",
        "740",
        "Put the biggest digit in the hundreds place, then the next biggest: 7, then 4, then 0. That makes 740.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest 3-digit number you can make with the digits 5, 0 and 2? Use each digit once.",
        "205",
        "A 3-digit number can't start with 0. Start with 2, then put 0 in the tens and 5 in the ones: 205.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sam wrote six hundred and nine as 6009. What should he have written?",
        "609",
        "Six hundred and nine is 6 hundreds, 0 tens and 9 ones. It has 3 digits: 609.",
      ),
  ],
});

/** MA1-RWN-01: place value and the role of zero to read, write and order two- and three-digit numbers. */
export const PLACE_VALUE_2 = levels(2010116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 6, ones: 2 },
        choice(n, "Which number do these blocks show?", ["26", "62", "602", "8"], 1, "There are 6 tens and 2 ones. 60 and 2 make 62."),
      ),
    (n) =>
      typed("short_answer", n, "What number is 1 more than 59?", "60", "1 more than 9 ones makes a new ten. 5 tens become 6 tens: 60."),
    (n) => trueFalse(n, "In 84, the 8 is worth 80.", true, "The 8 is in the tens place, so it is worth 8 tens, or 80."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is the value of the 4 in 438?",
        ["4", "40", "400", "438"],
        2,
        "The 4 is in the hundreds place. It is worth 4 hundreds, or 400.",
      ),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 3, tens: 1, ones: 0 },
        typed(
          "short_answer",
          n,
          "What number do these blocks show?",
          "310",
          "3 hundreds, 1 ten and no ones. Write 0 in the ones place: 310.",
        ),
      ),
    (n) => trueFalse(n, "406 and 460 are the same number.", false, "406 has 0 tens and 6 ones. 460 has 6 tens and 0 ones. 460 is bigger."),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these numbers in order from largest to smallest.",
        ["752", "725", "572", "527"],
        "752 and 725 have 7 hundreds, so they come first. 752 has more tens than 725. Then 572, then 527.",
      ),
    (n) => typed("fill_blank", n, "800 + 4 = ___", "804", "8 hundreds, no tens and 4 ones. The 0 holds the tens place: 804."),
    (n) => choice(n, "Which number comes just before 300?", ["301", "299", "290", "200"], 1, "1 less than 300 is 299."),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1000, jumps: 10, dotAt: 7 },
        typed(
          "short_answer",
          n,
          "The number line goes from 0 to 1000 in 10 equal jumps. What number is the dot on?",
          "700",
          "10 equal jumps to 1000 means each jump is 100. The dot is after 7 jumps: 700.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which number is between 590 and 610?",
        ["509", "601", "619", "690"],
        1,
        "601 is 6 hundreds and 1 one. It is more than 590 and less than 610.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 10 less than 403?",
        "393",
        "403 has no tens, so take 1 hundred and make it 10 tens. 10 less than 403 is 393.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which numbers are bigger than 550 but smaller than 600? Choose all that are right.",
        ["505", "559", "595", "650"],
        [1, 2],
        "559 and 595 have 5 hundreds and more than 5 tens. 505 is less than 550. 650 is more than 600.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A number has 7 hundreds, 4 ones and no tens. What is the number?",
        "704",
        "7 hundreds, 0 tens and 4 ones is 704.",
      ),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["99", "909", "990", "999"],
        "99 has only 2 digits, so it is smallest. 909 has 0 tens, 990 has 9 tens and 0 ones, and 999 is largest.",
      ),
  ],
});

/** MA1-RWN-02: representations of whole numbers to 1000, partitioning and renaming. */
export const PARTITION = levels(2010201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 5, ones: 3 },
        choice(
          n,
          "What do these blocks show?",
          ["5 tens and 3 ones", "3 tens and 5 ones", "53 tens", "8 ones"],
          0,
          "There are 5 long rods (tens) and 3 small cubes (ones).",
        ),
      ),
    (n) => typed("fill_blank", n, "40 + 6 = ___", "46", "4 tens and 6 ones make 46."),
    (n) => trueFalse(n, "10 ones make 1 ten.", true, "When you have 10 ones, you can swap them for 1 ten."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "300 + 20 + 7 = ___", "327", "3 hundreds, 2 tens and 7 ones make 327."),
    (n) => typed("short_answer", n, "How many tens are in 60?", "6", "Count by tens: 10, 20, 30, 40, 50, 60. That is 6 tens."),
    (n) =>
      choice(
        n,
        "Which is the same as 258?",
        ["2 hundreds, 5 tens and 8 ones", "2 hundreds, 8 tens and 5 ones", "25 hundreds and 8 ones", "5 hundreds, 2 tens and 8 ones"],
        0,
        "In 258 the 2 is hundreds, the 5 is tens and the 8 is ones.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "How many tens are in 340?", "34", "300 is 30 tens and 40 is 4 tens. 30 + 4 = 34 tens."),
    (n) => typed("fill_blank", n, "56 = 40 + ___", "16", "56 is 5 tens and 6 ones. Use 4 tens, and the last ten plus 6 ones is 16."),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 1, tens: 2, ones: 5 },
        multi(
          n,
          "Which of these are the same as the number the blocks show? Choose all that are right.",
          ["125", "100 + 20 + 5", "12 tens and 5 ones", "152"],
          [0, 1, 2],
          "The blocks show 1 hundred, 2 tens and 5 ones, which is 125. 1 hundred is 10 tens, so it is also 12 tens and 5 ones. 152 is a different number.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many tens are in 1000?",
        "100",
        "10 tens make 100. 1000 is 10 hundreds, and 10 lots of 10 tens is 100 tens.",
      ),
    (n) => choice(n, "Which number is 4 hundreds and 13 tens?", ["413", "430", "530", "4130"], 2, "13 tens is 130. 400 + 130 = 530."),
    (n) => typed("fill_blank", n, "620 is 5 hundreds and ___ tens.", "12", "620 − 500 = 120, and 120 is 12 tens."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack has 23 ten-dollar notes. How many dollars does he have?",
        ["230", "$230"],
        "23 tens is 230. So 23 ten-dollar notes make $230.",
      ),
    (n) =>
      multi(
        n,
        "Which are ways to make 470? Choose all that are right.",
        ["47 tens", "400 + 70", "3 hundreds and 17 tens", "4 hundreds and 7 ones"],
        [0, 1, 2],
        "47 tens is 470. 400 + 70 = 470. 300 + 170 = 470. But 4 hundreds and 7 ones is only 407.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Pencils come in boxes of 10. How many boxes do you need for 350 pencils?",
        "35",
        "350 is 35 tens, so you need 35 boxes of 10.",
      ),
  ],
});

/** MA1-RWN-02: representations of whole numbers to 1000, partitioning and renaming. */
export const PARTITION_2 = levels(2010216, {
  very_easy: [
    (n) => typed("fill_blank", n, "70 + 3 = ___", "73", "7 tens and 3 ones make 73."),
    (n) => choice(n, "How many ones make 1 ten?", ["1", "5", "10", "100"], 2, "10 ones make 1 ten."),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 3, ones: 4 },
        trueFalse(n, "The blocks show 3 tens and 4 ones.", true, "There are 3 long rods (tens) and 4 small cubes (ones). That is 34."),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many hundreds are in 600?",
        "6",
        "Count by hundreds: 100, 200, 300, 400, 500, 600. That is 6 hundreds.",
      ),
    (n) => typed("fill_blank", n, "491 = 400 + 90 + ___", "1", "491 is 4 hundreds, 9 tens and 1 one."),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 2, tens: 3, ones: 0 },
        choice(
          n,
          "Which shows the number the blocks make?",
          ["200 + 30", "200 + 3", "20 + 3", "300 + 20"],
          0,
          "There are 2 hundreds and 3 tens, with no ones. That is 200 + 30 = 230.",
        ),
      ),
  ],
  medium: [
    (n) => choice(n, "Which number is 7 tens and 15 ones?", ["85", "75", "715", "22"], 0, "7 tens is 70. 15 ones is 15. 70 + 15 = 85."),
    (n) => typed("fill_blank", n, "83 = 70 + ___", "13", "83 is 8 tens and 3 ones. Use 7 tens, and the last ten plus 3 ones is 13."),
    (n) => typed("short_answer", n, "How many tens are in 250?", "25", "200 is 20 tens and 50 is 5 tens. 20 + 5 = 25 tens."),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which are ways to make 36? Choose all that are right.",
        ["3 tens and 6 ones", "2 tens and 16 ones", "1 ten and 26 ones", "36 tens"],
        [0, 1, 2],
        "30 + 6, 20 + 16 and 10 + 26 all make 36. But 36 tens is 360.",
      ),
    (n) => typed("fill_blank", n, "1 hundred is the same as ___ tens.", "10", "Count by tens to 100: 10, 20, 30 ... 100. That is 10 tens."),
    (n) =>
      choice(
        n,
        "Which is the same as 900?",
        ["9 tens", "90 tens", "90 ones", "900 tens"],
        1,
        "1 hundred is 10 tens, so 9 hundreds is 90 tens.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "350 is 2 hundreds and ___ tens.", "15", "350 − 200 = 150, and 150 is 15 tens."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella has 5 hundreds blocks, 14 tens blocks and 3 ones blocks. What number does she have?",
        "643",
        "5 hundreds is 500. 14 tens is 140. 500 + 140 + 3 = 643.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["45 tens", "5 hundreds", "52 tens", "6 hundreds and 3 ones"],
        "45 tens is 450, 5 hundreds is 500, 52 tens is 520, and 6 hundreds and 3 ones is 603.",
      ),
  ],
});

/** MA1-CSQ-01: number bonds, adding and subtracting two-digit numbers, linking + and −, and equality. */
export const ADD_SUB = levels(2020101, {
  very_easy: [
    (n) => typed("short_answer", n, "7 + 3 = ?", "10", "7 and 3 are a pair that makes 10."),
    (n) => typed("fill_blank", n, "6 + ___ = 10", "4", "6 and 4 make 10. Count on from 6: 7, 8, 9, 10. That is 4."),
    (n) => typed("short_answer", n, "20 + 30 = ?", "50", "2 tens and 3 tens make 5 tens, which is 50."),
  ],
  easy: [
    (n) => typed("short_answer", n, "24 + 15 = ?", "39", "Add the tens: 20 + 10 = 30. Add the ones: 4 + 5 = 9. 30 + 9 = 39."),
    (n) => typed("short_answer", n, "48 − 23 = ?", "25", "Take away the tens: 40 − 20 = 20. Take away the ones: 8 − 3 = 5. 20 + 5 = 25."),
    (n) =>
      trueFalse(n, "If 9 + 6 = 15, then 15 − 6 = 9.", true, "Adding and taking away undo each other. 15 take away the 6 gets back to 9."),
  ],
  medium: [
    (n) => typed("short_answer", n, "37 + 26 = ?", "63", "Add the tens: 30 + 20 = 50. Add the ones: 7 + 6 = 13. 50 + 13 = 63."),
    (n) => typed("short_answer", n, "52 − 18 = ?", "34", "Take away 20 to get 32, then add back 2 because you took too many. 32 + 2 = 34."),
    (n) =>
      choice(
        n,
        "Lily had 45 stickers. She got 30 more. How many stickers does she have now?",
        ["15", "75", "65", "70"],
        1,
        "Getting more means add. 45 + 30: add 3 tens to 4 tens to get 7 tens. 75.",
      ),
  ],
  hard: [
    (n) => trueFalse(n, "16 + 4 = 10 + 10", true, "Both sides make 20, so they are equal."),
    (n) =>
      multi(
        n,
        "Which of these make 100? Choose all that are right.",
        ["60 + 40", "75 + 25", "55 + 55", "35 + 65"],
        [0, 1, 3],
        "60 + 40, 75 + 25 and 35 + 65 all make 100. 55 + 55 is 110.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bus had 63 people on it. 27 people got off. How many people are on the bus now?",
        "36",
        "63 − 27: take away 30 to get 33, then add back 3. 33 + 3 = 36.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "35 + ___ = 20 + 40", "25", "20 + 40 = 60. Both sides must be equal, so 35 + ? = 60. 60 − 35 = 25."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Noah has 58 cards. Ruby has 19 more cards than Noah. How many cards does Ruby have?",
        "77",
        "19 more means add. 58 + 20 = 78, then take away 1. 77.",
      ),
    (n) =>
      choice(
        n,
        "34 + 48 = 82. Which number sentence is also true?",
        ["82 − 48 = 34", "48 − 34 = 82", "34 − 82 = 48", "82 + 34 = 48"],
        0,
        "The big number 82 is the whole. Take away one part (48) and you get the other part (34).",
      ),
  ],
});

/** MA1-CSQ-01: number bonds, adding and subtracting two-digit numbers, linking + and −, and equality. */
export const ADD_SUB_2 = levels(2020116, {
  very_easy: [
    (n) => typed("fill_blank", n, "___ + 5 = 10", "5", "5 and 5 make 10."),
    (n) => typed("short_answer", n, "15 − 5 = ?", "10", "15 is 10 and 5. Take away the 5 and 10 is left."),
    (n) => trueFalse(n, "3 + 7 = 7 + 3", true, "You can add in any order. Both sides make 10."),
  ],
  easy: [
    (n) => typed("short_answer", n, "40 + 25 = ?", "65", "Add the tens: 40 + 20 = 60. Then add the 5 ones: 65."),
    (n) => typed("short_answer", n, "67 − 30 = ?", "37", "Take away 3 tens from 6 tens: 3 tens are left. Keep the 7 ones: 37."),
    (n) =>
      choice(
        n,
        "Which pair of numbers makes 20?",
        ["12 and 8", "11 and 8", "14 and 7", "15 and 4"],
        0,
        "12 + 8 = 20. The others make 19, 21 and 19.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "46 + 38 = ?", "84", "Add the tens: 40 + 30 = 70. Add the ones: 6 + 8 = 14. 70 + 14 = 84."),
    (n) => typed("short_answer", n, "71 − 26 = ?", "45", "Count up from 26: 4 to 30, then 41 to 71. 4 + 41 = 45."),
    (n) => typed("fill_blank", n, "90 − ___ = 55", "35", "Count up from 55 to 90: 5 to 60, then 30 to 90. 5 + 30 = 35."),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ben scored 47 runs in cricket. Kai scored 35 runs. How many runs did they score altogether?",
        "82",
        "47 + 35: 40 + 30 = 70 and 7 + 5 = 12. 70 + 12 = 82.",
      ),
    (n) => trueFalse(n, "50 − 20 = 20 + 20", false, "50 − 20 = 30, but 20 + 20 = 40. The two sides are not equal."),
    (n) =>
      choice(
        n,
        "There were 80 people at netball. 45 people went home. How many people stayed?",
        ["35", "45", "125", "25"],
        0,
        "80 − 45: count up from 45. 5 to 50, then 30 to 80. 5 + 30 = 35.",
      ),
  ],
  very_hard: [
    (n) => typed("fill_blank", n, "64 − ___ = 50 − 10", "24", "50 − 10 = 40. So 64 − ? = 40. 64 − 24 = 40."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Zoe had $90. She spent $34 on a book and $25 on a hat. How much money does she have left?",
        ["31", "$31"],
        "She spent 34 + 25 = 59 dollars. 90 − 59 = 31, so she has $31 left.",
      ),
    (n) =>
      multi(
        n,
        "Which number sentences are true? Choose all that are right.",
        ["28 + 15 = 43", "43 − 15 = 28", "43 − 28 = 15", "15 − 43 = 28"],
        [0, 1, 2],
        "28 and 15 are the parts and 43 is the whole. 28 + 15 = 43, and taking a part from 43 leaves the other part. 15 − 43 doesn't work.",
      ),
  ],
});

/** MA1-FG-01: equal groups and arrays for multiplication, sharing and grouping for division. */
export const GROUPS = levels(2030101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "array", rows: 2, columns: 5 },
        typed(
          "short_answer",
          n,
          "Look at the array. How many dots are there altogether?",
          "10",
          "There are 2 rows of 5 dots. 5, 10. That is 10 dots.",
        ),
      ),
    (n) =>
      choice(
        n,
        "There are 3 plates with 2 apples on each plate. How many apples are there?",
        ["5", "6", "8", "32"],
        1,
        "3 groups of 2: count by twos. 2, 4, 6.",
      ),
    (n) => trueFalse(n, "4 groups of 5 make 20.", true, "Count by fives 4 times: 5, 10, 15, 20."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 5 },
        choice(
          n,
          "Which matches the array?",
          ["3 rows of 5", "3 rows of 3", "5 rows of 5", "3 + 5"],
          0,
          "Count the rows going across: 3. Each row has 5 dots. So it is 3 rows of 5.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "12 strawberries are shared equally between 2 children. How many does each child get?",
        "6",
        "Share them out one at a time. 6 + 6 = 12, so each child gets 6.",
      ),
    (n) => typed("fill_blank", n, "Count by tens: 10, 20, 30, ___", "40", "Each jump adds 10. 30 + 10 = 40."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 5 bags with 4 oranges in each bag. How many oranges are there?",
        "20",
        "5 groups of 4: 4, 8, 12, 16, 20.",
      ),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 3 },
        trueFalse(n, "This array shows 4 rows of 3. It has 12 dots.", true, "There are 4 rows with 3 dots in each row. 3, 6, 9, 12."),
      ),
    (n) =>
      choice(
        n,
        "20 children make teams of 5. How many teams are there?",
        ["4", "5", "15", "25"],
        0,
        "Count by fives until you reach 20: 5, 10, 15, 20. That is 4 teams.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these are ways to put 12 counters into equal groups? Choose all that are right.",
        ["2 groups of 6", "3 groups of 4", "5 groups of 2", "4 groups of 3"],
        [0, 1, 3],
        "2 × 6, 3 × 4 and 4 × 3 all make 12. 5 groups of 2 is only 10.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "15 pencils are shared equally into 3 cups. How many pencils go in each cup?",
        "5",
        "Share them out: 5 + 5 + 5 = 15, so each cup gets 5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Each bike has 2 wheels. How many wheels are on 9 bikes?",
        "18",
        "9 groups of 2: count by twos 9 times. 2, 4, 6, 8, 10, 12, 14, 16, 18.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Amy has 17 stickers. She puts them in rows of 5. How many full rows can she make?",
        "3",
        "3 rows of 5 is 15. That leaves 2 stickers, which is not enough for another full row.",
      ),
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 6 },
        choice(
          n,
          "Which of these is NOT true about the array?",
          ["It has 3 rows of 6", "It has 6 columns of 3", "It has 18 dots", "It has 3 rows of 5"],
          3,
          "There are 3 rows with 6 dots in each, so 18 dots. You can also see 6 columns of 3. Each row has 6, not 5.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 4 tables with 5 children at each table. Then 2 more children come in. How many children are there now?",
        "22",
        "4 groups of 5 is 20. Then 2 more: 20 + 2 = 22.",
      ),
  ],
});

/** MA1-FG-01: equal groups and arrays for multiplication, sharing and grouping for division. */
export const GROUPS_2 = levels(2030116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "array", rows: 2, columns: 3 },
        choice(
          n,
          "Look at the array. How many rows are there?",
          ["2", "3", "5", "6"],
          0,
          "Rows go across. There are 2 rows, with 3 dots in each.",
        ),
      ),
    (n) => typed("fill_blank", n, "Count by fives: 5, 10, 15, ___", "20", "Each jump adds 5. 15 + 5 = 20."),
    (n) => trueFalse(n, "6 cakes shared equally between 2 plates gives 3 cakes on each plate.", true, "3 + 3 = 6, so each plate gets 3."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 5 },
        typed(
          "short_answer",
          n,
          "Look at the array. How many dots are there altogether?",
          "20",
          "There are 4 rows of 5. Count by fives: 5, 10, 15, 20.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which of these shows equal groups?",
        ["3, 3, 3", "2, 4, 3", "1, 5, 3", "3, 3, 2"],
        0,
        "Equal groups all have the same number. Only 3, 3, 3 has the same number in each group.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "10 children stand in 2 equal lines. How many children are in each line?",
        "5",
        "Share 10 into 2 equal groups. 5 + 5 = 10, so 5 in each line.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "3 × 10 = ___", "30", "3 groups of 10: 10, 20, 30."),
    (n) =>
      pic(
        { kind: "array", rows: 5, columns: 2 },
        multi(
          n,
          "Which number sentences match the array? Choose all that are right.",
          ["5 × 2", "2 × 5", "2 + 2 + 2 + 2 + 2", "5 + 2"],
          [0, 1, 2],
          "There are 5 rows of 2, which is 5 × 2 or 2 + 2 + 2 + 2 + 2. Turned around it is 2 × 5. All make 10. 5 + 2 is only 7.",
        ),
      ),
    (n) => typed("short_answer", n, "A koala has 4 legs. How many legs do 4 koalas have?", "16", "4 groups of 4: 4, 8, 12, 16."),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "18 muffins are packed into boxes of 6. How many boxes are needed?",
        ["2", "3", "4", "12"],
        1,
        "Count by sixes until you reach 18: 6, 12, 18. That is 3 boxes.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "16 marbles are shared equally into 4 bags. How many marbles go in each bag?",
        "4",
        "4 bags of 4 is 4 + 4 + 4 + 4 = 16, so each bag gets 4.",
      ),
    (n) =>
      trueFalse(
        n,
        "An array with 3 rows of 7 has the same number of dots as an array with 7 rows of 3.",
        true,
        "Turning an array around does not change how many dots it has. Both have 21 dots.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Each tent sleeps 4 children. How many tents are needed for 18 children?",
        "5",
        "4 tents sleep 16 children. 2 children are left, so they need 1 more tent. That is 5 tents.",
      ),
    (n) =>
      choice(
        n,
        "Tom has 4 bags with 5 lollies in each. Mia has 3 bags with 6 lollies in each. Who has more lollies?",
        ["Tom", "Mia", "They have the same"],
        0,
        "Tom has 5, 10, 15, 20 lollies. Mia has 6, 12, 18 lollies. 20 is more than 18.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from fewest things to most things.",
        ["2 groups of 6", "3 groups of 5", "4 groups of 4", "5 groups of 5"],
        "2 groups of 6 is 12, 3 groups of 5 is 15, 4 groups of 4 is 16, and 5 groups of 5 is 25.",
      ),
  ],
});

/** MA1-GM-03: halves, quarters and eighths of a whole and of a length. */
export const FRACTIONS = levels(2040101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 2, shaded: 1 },
        choice(
          n,
          "What fraction is shaded?",
          ["one half", "one quarter", "one eighth", "two"],
          0,
          "The circle is cut into 2 equal parts and 1 is shaded. That is one half.",
        ),
      ),
    (n) => trueFalse(n, "When you cut something into 2 equal parts, each part is one half.", true, "2 equal parts are called halves."),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 1 },
        typed(
          "short_answer",
          n,
          "What fraction of the bar is shaded?",
          ["1/4", "one quarter", "a quarter", "quarter", "one fourth"],
          "The bar has 4 equal parts and 1 is shaded. That is one quarter.",
        ),
      ),
  ],
  easy: [
    (n) => choice(n, "How many quarters make a whole?", ["2", "3", "4", "8"], 2, "A whole cut into quarters has 4 equal parts."),
    (n) => typed("short_answer", n, "What is half of 10?", "5", "Share 10 into 2 equal groups. 5 + 5 = 10, so half is 5."),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 8, shaded: 1 },
        choice(
          n,
          "What fraction is shaded?",
          ["one half", "one quarter", "one eighth", "eight"],
          2,
          "The circle has 8 equal parts and 1 is shaded. That is one eighth.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A ribbon is 12 cm long. Lucy cuts it in half. How long is each piece?",
        ["6", "6 cm"],
        "Half of 12 is 6, because 6 + 6 = 12. Each piece is 6 cm.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 8, shaded: 3 },
        typed(
          "short_answer",
          n,
          "What fraction of the bar is shaded?",
          ["3/8", "three eighths"],
          "The bar has 8 equal parts and 3 are shaded. That is three eighths.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these make one whole? Choose all that are right.",
        ["2 halves", "4 quarters", "8 eighths", "3 quarters"],
        [0, 1, 2],
        "2 halves, 4 quarters and 8 eighths each fill the whole. 3 quarters is one quarter short.",
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "What is one quarter of 8?", "2", "Share 8 into 4 equal groups. Each group has 2."),
    (n) =>
      choice(
        n,
        "Which piece of the same pizza is bigger: one half or one quarter?",
        ["one half", "one quarter", "They are the same"],
        0,
        "Cutting into 2 parts makes bigger pieces than cutting into 4 parts. One half is bigger.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 2 },
        trueFalse(
          n,
          "Two quarters of this circle are shaded. That is the same as one half.",
          true,
          "2 of the 4 equal parts are shaded. That covers half the circle.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these pieces of the same cake in order from smallest to largest.",
        ["one eighth", "one quarter", "one half", "the whole cake"],
        "The more equal parts you cut, the smaller each part. Eighths are smallest, then quarters, then halves, then the whole.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 8, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "Look at the ribbon on the ruler. How long is one quarter of the ribbon?",
          ["2", "2 cm"],
          "The ribbon is 8 cm long. Share 8 into 4 equal parts: each part is 2 cm.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A rope is 16 metres long. Max cuts it into eighths. How long is each piece?",
        ["2", "2 m", "2 metres"],
        "Eighths means 8 equal pieces. 8 pieces of 2 metres make 16 metres.",
      ),
  ],
});

/** MA1-GM-03: halves, quarters and eighths of a whole and of a length. */
export const FRACTIONS_2 = levels(2040116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 2, shaded: 1 },
        trueFalse(n, "Half of this bar is shaded.", true, "The bar has 2 equal parts and 1 is shaded. That is one half."),
      ),
    (n) =>
      choice(
        n,
        "Ava cuts an apple into 2 equal parts. What is each part called?",
        ["a half", "a quarter", "an eighth", "a whole"],
        0,
        "2 equal parts are called halves. Each part is a half.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 4 },
        choice(
          n,
          "How much of the circle is shaded?",
          ["one quarter", "one half", "the whole circle", "none of it"],
          2,
          "All 4 quarters are shaded, so the whole circle is shaded.",
        ),
      ),
  ],
  easy: [
    (n) => typed("short_answer", n, "What is half of 14?", "7", "Share 14 into 2 equal groups. 7 + 7 = 14, so half is 7."),
    (n) =>
      trueFalse(
        n,
        "A sandwich is cut into 2 pieces that are not the same size. Each piece is a half.",
        false,
        "Halves must be equal. If the pieces are different sizes, they are not halves.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 3 },
        choice(
          n,
          "What fraction is shaded?",
          ["one quarter", "three quarters", "three eighths", "one half"],
          1,
          "The circle has 4 equal parts and 3 are shaded. That is three quarters.",
        ),
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "One whole is ___ eighths.", "8", "A whole cut into eighths has 8 equal parts."),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 10, object: "pencil" },
        typed(
          "short_answer",
          n,
          "Look at the pencil on the ruler. How long is half of the pencil?",
          ["5", "5 cm"],
          "The pencil is 10 cm long. Half of 10 is 5, so half the pencil is 5 cm.",
        ),
      ),
    (n) => choice(n, "How many eighths make one half?", ["2", "4", "6", "8"], 1, "8 eighths make a whole, so half of that is 4 eighths."),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 8, shaded: 6 },
        multi(
          n,
          "Which of these tell how much of the bar is shaded? Choose all that are right.",
          ["six eighths", "three quarters", "one half", "two eighths"],
          [0, 1],
          "6 of the 8 equal parts are shaded: six eighths. 2 eighths make a quarter, so 6 eighths is also three quarters.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "What is one quarter of 20?", "5", "Share 20 into 4 equal groups. 5 + 5 + 5 + 5 = 20, so each group has 5."),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 30 children in a class. Half of them are girls. How many girls are there?",
        "15",
        "Half of 30 is 15, because 15 + 15 = 30.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 8, shaded: 5 },
        typed(
          "short_answer",
          n,
          "How many more eighths must be shaded to shade the whole bar?",
          "3",
          "The whole bar is 8 eighths. 5 are shaded, and 8 − 5 = 3 more are needed.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A path is 20 metres long. It is split into quarters. Leah walks 2 quarters of the path. How far does she walk?",
        ["5 m", "10 m", "15 m", "20 m"],
        1,
        "One quarter of 20 is 5 metres. 2 quarters is 5 + 5 = 10 metres. That is half the path.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["one quarter of 8", "one half of 8", "three quarters of 8", "8"],
        "One quarter of 8 is 2, one half is 4, three quarters is 6, and the whole is 8.",
      ),
  ],
});

/** MA1-DATA-01: gathering and organising data in lists, tables and picture graphs. */
export const DATA_SHOW = levels(2080101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Ms Lee wants to find out the class's favourite fruit. What should she do?",
        ["Ask each child", "Guess", "Ask only one child", "Count the windows"],
        0,
        "To find out what the class likes, she needs to ask everyone and record their answers.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Pet", "Children"],
          rows: [
            ["Dog", 6],
            ["Cat", 4],
            ["Fish", 2],
          ],
        },
        typed("short_answer", n, "Look at the table. How many children have a cat?", "4", "Find the Cat row and read across. It says 4."),
      ),
    (n) =>
      trueFalse(
        n,
        "Tally marks are a quick way to keep count as you collect data.",
        true,
        "You make one mark for each answer, then count the marks at the end.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Kim counted cars: 3 red, 5 blue, 2 white and 4 black. Put the colours in order from most to fewest.",
        ["blue", "black", "red", "white"],
        "5 blue, then 4 black, then 3 red, then 2 white.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite sport",
          thing: "children",
          each: 1,
          rows: [
            { label: "Cricket", count: 5 },
            { label: "Netball", count: 3 },
            { label: "Soccer", count: 4 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children chose netball?",
          "3",
          "Count the stars in the Netball row. There are 3, and each star is 1 child.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sam asked children, 'Do you like rain?' 7 said yes and 5 said no. How many children did Sam ask?",
        "12",
        "Every child said yes or no. 7 + 5 = 12 children.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which question is best for making a picture graph of favourite colours?",
        ["Which is your favourite: red, blue, green or yellow?", "Do you like colours?", "How old are you?", "What is your name?"],
        0,
        "Giving a few colours to choose from sorts the answers into groups, which makes a clear picture graph.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Animal", "Number seen"],
          rows: [
            ["Kangaroo", 8],
            ["Emu", 3],
            ["Wombat", 1],
          ],
        },
        multi(
          n,
          "Look at the table. Which are true? Choose all that are right.",
          ["8 kangaroos were seen", "More emus than wombats were seen", "5 wombats were seen", "12 animals were seen altogether"],
          [0, 1, 3],
          "The table shows 8 kangaroos, 3 emus and 1 wombat. 3 is more than 1. 8 + 3 + 1 = 12. Only 1 wombat was seen, not 5.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph, all the pictures should be the same size and lined up.",
        true,
        "If the pictures are the same size and lined up, you can compare the rows fairly.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Here are the favourite drinks of some children: milk, juice, water, milk, juice, milk. How many chose milk?",
        "3",
        "Count each 'milk' in the list: 1, 2, 3.",
      ),
    (n) =>
      choice(
        n,
        "Tim wants to find out how children get to school. Which answers should go in his table?",
        ["walk, car, bus, bike", "red, blue, green", "Monday, Tuesday, Friday", "cat, dog, fish"],
        0,
        "His question is about getting to school, so the groups are ways to travel: walk, car, bus and bike.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Fruit eaten at recess",
          thing: "children",
          each: 1,
          rows: [
            { label: "Apple", count: 6 },
            { label: "Banana", count: 2 },
            { label: "Orange", count: 4 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children were asked altogether?",
          "12",
          "Add up all the rows: 6 + 2 + 4 = 12 children.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Bella saw 4 magpies in the morning and 5 more magpies in the afternoon. She saw 6 galahs. How many more magpies than galahs did she see?",
        "3",
        "Magpies: 4 + 5 = 9. Galahs: 6. 9 − 6 = 3 more magpies.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for making a picture graph in order.",
        ["Ask a question", "Collect the answers", "Count each group", "Draw the pictures in rows"],
        "First decide your question, then collect answers, then count each group, and last draw the graph.",
      ),
    (n) =>
      choice(
        n,
        "24 children voted for a class pet. Fish got 10 votes and dog got 9 votes. The rest chose rabbit. How many chose rabbit?",
        ["5", "19", "4", "6"],
        0,
        "10 + 9 = 19 chose fish or dog. 24 − 19 = 5 chose rabbit.",
      ),
  ],
});

/** MA1-DATA-01: gathering and organising data in lists, tables and picture graphs. */
export const DATA_SHOW_2 = levels(2080116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Mr Brown asks each child, 'What is your favourite ice cream?' What is he doing?",
        ["Collecting data", "Drawing a map", "Telling the time", "Measuring"],
        0,
        "Asking a question and writing down the answers is collecting data.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Votes"],
          rows: [
            ["Red", 5],
            ["Blue", 7],
            ["Green", 3],
          ],
        },
        typed("short_answer", n, "Look at the table. How many votes did blue get?", "7", "Find the Blue row and read across. It says 7."),
      ),
    (n) =>
      trueFalse(
        n,
        "Before you make a picture graph, you need to collect some data.",
        true,
        "A picture graph shows data, so you must collect the data first.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Lunch orders: pie, sushi, pie, wrap, pie, sushi. How many children ordered sushi?",
        "2",
        "Count each 'sushi' in the list: 1, 2.",
      ),
    (n) =>
      choice(
        n,
        "What is the best way to keep count while children vote?",
        ["Make a tally", "Try to remember", "Write nothing down", "Guess at the end"],
        0,
        "A tally gives one mark for each vote, so you don't lose count.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "How we get to school",
          thing: "children",
          each: 1,
          rows: [
            { label: "Walk", count: 3 },
            { label: "Car", count: 5 },
            { label: "Bus", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children come by car?",
          "5",
          "Count the stars in the Car row. There are 5.",
        ),
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which questions could you ask to collect data about pets? Choose all that are right.",
        ["What pet do you have?", "How many pets do you have?", "What is 2 + 2?", "What time is it?"],
        [0, 1],
        "Only the first two questions are about pets. The others are not.",
      ),
    (n) =>
      choice(
        n,
        "Ruby sorted some shapes. She had 4 circles, 6 squares and 2 triangles. Which list matches?",
        [
          "Circles 4, Squares 6, Triangles 2",
          "Circles 6, Squares 4, Triangles 2",
          "Circles 4, Squares 2, Triangles 6",
          "Circles 2, Squares 6, Triangles 4",
        ],
        0,
        "Match each shape with its number: 4 circles, 6 squares, 2 triangles.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Weather", "Days"],
          rows: [
            ["Sunny", 6],
            ["Cloudy", 3],
            ["Rainy", 1],
          ],
        },
        trueFalse(n, "The table shows the weather for 10 days.", true, "Add the days: 6 + 3 + 1 = 10."),
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "At the school fete, the cake stall sold 15 things, the book stall sold 9 and the plant stall sold 12. Put the stalls in order from most to fewest.",
        ["cake stall", "plant stall", "book stall"],
        "15 is the most, then 12, then 9.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a list of favourite fruit, apple is written 5 times, pear 3 times and grapes 4 times. How many children were asked?",
        "12",
        "Each child gave one answer. 5 + 3 + 4 = 12 children.",
      ),
    (n) =>
      choice(
        n,
        "Zara made a picture graph of the sports her class likes. She forgot the title. Which is the best title?",
        ["Our favourite sports", "My dog", "Lunch orders", "The weather"],
        0,
        "A title tells what the graph is about. Her graph is about sports the class likes.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ivy wants one row in her table for each answer. Children said: red, blue, red, green, blue, red, yellow. How many rows does she need?",
        "4",
        "The different answers are red, blue, green and yellow. That is 4 rows.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite fruit",
          thing: "children",
          each: 1,
          rows: [
            { label: "Apple", count: 4 },
            { label: "Banana", count: 6 },
            { label: "Kiwi", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. Then 3 more children choose kiwi. How many pictures should the Kiwi row have now?",
          "5",
          "The Kiwi row has 2 pictures. Add 3 more: 2 + 3 = 5.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Nina asked 10 children about their pets. Her table shows Dog 4, Cat 3, Fish 2. What is wrong?",
        ["One child is missing from the table", "The table has too many rows", "Dogs are not pets", "Nothing is wrong"],
        0,
        "4 + 3 + 2 = 9, but she asked 10 children. One answer was left out.",
      ),
  ],
});

/** MA1-DATA-02: interpreting data displays and describing results. */
export const DATA_READ = levels(2080201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite fruit",
          thing: "children",
          each: 1,
          rows: [
            { label: "Apple", count: 5 },
            { label: "Banana", count: 3 },
            { label: "Grapes", count: 2 },
          ],
        },
        choice(
          n,
          "Look at the picture graph. Which fruit is the favourite?",
          ["Apple", "Banana", "Grapes"],
          0,
          "The Apple row has the most pictures, 5.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Child", "Books read"],
          rows: [
            ["Ava", 4],
            ["Ben", 6],
            ["Cara", 3],
          ],
        },
        typed("short_answer", n, "Look at the table. How many books did Ben read?", "6", "Find Ben's row and read across. It says 6."),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Pets in our class",
          columns: [
            { label: "Dog", value: 6 },
            { label: "Cat", value: 4 },
            { label: "Fish", value: 2 },
          ],
          step: 1,
        },
        trueFalse(n, "Look at the graph. Fewer children have fish than cats.", true, "The Fish column is shorter. 2 is fewer than 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Weather this fortnight",
          thing: "days",
          each: 1,
          rows: [
            { label: "Sunny", count: 7 },
            { label: "Cloudy", count: 4 },
            { label: "Rainy", count: 3 },
          ],
        },
        typed("short_answer", n, "Look at the picture graph. How many days were rainy?", "3", "Count the pictures in the Rainy row: 3."),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Weather this fortnight",
          thing: "days",
          each: 1,
          rows: [
            { label: "Sunny", count: 7 },
            { label: "Cloudy", count: 4 },
            { label: "Rainy", count: 3 },
          ],
        },
        choice(
          n,
          "Look at the picture graph. Which weather happened the least?",
          ["Sunny", "Cloudy", "Rainy"],
          2,
          "The Rainy row is shortest, with 3 pictures.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Laps run",
          columns: [
            { label: "Mia", value: 5 },
            { label: "Jack", value: 8 },
            { label: "Ella", value: 6 },
          ],
          step: 1,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many laps did Jack run?",
          "8",
          "Go to the top of Jack's column and look across to the numbers. It reaches 8.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Animals seen at the zoo",
          thing: "animals",
          each: 1,
          rows: [
            { label: "Koala", count: 6 },
            { label: "Emu", count: 2 },
            { label: "Platypus", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more koalas than emus were seen?",
          "4",
          "6 koalas and 2 emus. 6 − 2 = 4 more koalas.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Sport", "Votes"],
          rows: [
            ["Cricket", 9],
            ["Netball", 7],
            ["Soccer", 5],
          ],
        },
        typed("short_answer", n, "Look at the table. How many votes were there altogether?", "21", "9 + 7 = 16, then 16 + 5 = 21."),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite colour",
          columns: [
            { label: "Red", value: 3 },
            { label: "Blue", value: 7 },
            { label: "Green", value: 5 },
            { label: "Yellow", value: 2 },
          ],
          step: 1,
        },
        ordering(
          n,
          "Look at the graph. Put the colours in order from most votes to fewest votes.",
          ["Blue", "Green", "Red", "Yellow"],
          "Blue has 7, Green 5, Red 3 and Yellow 2.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Lunch orders",
          thing: "orders",
          each: 1,
          rows: [
            { label: "Monday", count: 4 },
            { label: "Tuesday", count: 6 },
            { label: "Wednesday", count: 3 },
            { label: "Thursday", count: 6 },
          ],
        },
        multi(
          n,
          "Look at the picture graph. Which are true? Choose all that are right.",
          ["Tuesday and Thursday had the same", "Wednesday had the fewest", "Monday had the most", "There were 19 orders altogether"],
          [0, 1, 3],
          "Tuesday and Thursday both have 6. Wednesday has only 3. 4 + 6 + 3 + 6 = 19. Monday's 4 is not the most.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Sausages sold at the sizzle",
          columns: [
            { label: "Term 1", value: 8 },
            { label: "Term 2", value: 5 },
            { label: "Term 3", value: 9 },
            { label: "Term 4", value: 6 },
          ],
          step: 1,
        },
        choice(
          n,
          "Look at the graph. In which term were the fewest sausages sold?",
          ["Term 1", "Term 2", "Term 3", "Term 4"],
          1,
          "Term 2 has the shortest column, 5 sausages.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Fruit", "Children"],
          rows: [
            ["Apple", 6],
            ["Pear", 6],
            ["Mango", 2],
          ],
        },
        trueFalse(
          n,
          "Look at the table. Apple and pear are equally popular.",
          true,
          "Apple and pear both have 6 children, so they are equally popular.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Books read",
          thing: "books",
          each: 1,
          rows: [
            { label: "Sofia", count: 7 },
            { label: "Liam", count: 3 },
            { label: "Noah", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. Liam wants to read as many books as Sofia. How many more books must he read?",
          "4",
          "Sofia read 7 and Liam read 3. 7 − 3 = 4 more books.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Ducks at the pond",
          columns: [
            { label: "Mon", value: 5 },
            { label: "Tue", value: 8 },
            { label: "Wed", value: 3 },
            { label: "Thu", value: 7 },
          ],
          step: 1,
        },
        choice(
          n,
          "Look at the graph. Which two days together had the same number of ducks as Tuesday?",
          ["Monday and Wednesday", "Monday and Thursday", "Wednesday and Thursday"],
          0,
          "Tuesday had 8 ducks. Monday 5 + Wednesday 3 = 8. The other pairs make 12 and 10.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A picture graph shows 8 children like cricket and 5 like netball. Which sentence describes the result best?",
        ["More children like cricket than netball", "Everyone likes cricket", "Netball is the favourite", "No one likes netball"],
        0,
        "8 is more than 5, so more children like cricket. Some children still like netball.",
      ),
  ],
});

/** MA1-DATA-02: interpreting data displays and describing results. */
export const DATA_READ_2 = levels(2080216, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite pets",
          columns: [
            { label: "Dog", value: 7 },
            { label: "Cat", value: 5 },
            { label: "Bird", value: 3 },
          ],
          step: 1,
        },
        choice(
          n,
          "Look at the graph. Which pet got the most votes?",
          ["Dog", "Cat", "Bird"],
          0,
          "The Dog column is the tallest, with 7 votes.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Hats in the classroom",
          thing: "hats",
          each: 1,
          rows: [
            { label: "Red", count: 4 },
            { label: "Blue", count: 6 },
          ],
        },
        typed("short_answer", n, "Look at the picture graph. How many blue hats are there?", "6", "Count the pictures in the Blue row: 6."),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Class", "Children"],
          rows: [
            ["2K", 22],
            ["2M", 24],
          ],
        },
        trueFalse(n, "Look at the table. Class 2M has more children than 2K.", true, "2M has 24 and 2K has 22. 24 is more than 22."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite snack",
          thing: "children",
          each: 1,
          rows: [
            { label: "Popcorn", count: 5 },
            { label: "Fruit", count: 5 },
            { label: "Chips", count: 2 },
          ],
        },
        choice(
          n,
          "Look at the picture graph. Which two snacks got the same number of votes?",
          ["Popcorn and fruit", "Fruit and chips", "Popcorn and chips"],
          0,
          "Popcorn and Fruit both have 5 pictures.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Goals scored",
          columns: [
            { label: "Ari", value: 3 },
            { label: "Ben", value: 6 },
            { label: "Chloe", value: 4 },
          ],
          step: 1,
        },
        typed("short_answer", n, "Look at the graph. How many goals did Chloe score?", "4", "Chloe's column reaches 4."),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Plant", "Height (cm)"],
          rows: [
            ["Bean", 12],
            ["Pea", 8],
            ["Corn", 15],
          ],
        },
        choice(
          n,
          "Look at the table. Which plant is the tallest?",
          ["Bean", "Pea", "Corn"],
          2,
          "Corn is 15 cm, which is more than 12 cm and 8 cm.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Ice creams sold",
          columns: [
            { label: "Mon", value: 6 },
            { label: "Tue", value: 9 },
            { label: "Wed", value: 4 },
            { label: "Thu", value: 7 },
          ],
          step: 1,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many fewer ice creams were sold on Wednesday than on Tuesday?",
          "5",
          "Tuesday 9 and Wednesday 4. 9 − 4 = 5 fewer.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Birds in the playground",
          thing: "birds",
          each: 1,
          rows: [
            { label: "Magpie", count: 8 },
            { label: "Ibis", count: 3 },
            { label: "Lorikeet", count: 5 },
          ],
        },
        typed("short_answer", n, "Look at the picture graph. How many birds were there altogether?", "16", "8 + 3 = 11, then 11 + 5 = 16."),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Child", "Skipping jumps"],
          rows: [
            ["Lily", 15],
            ["Omar", 22],
            ["Sam", 18],
            ["Tia", 12],
          ],
        },
        ordering(
          n,
          "Look at the table. Put the children in order from most jumps to fewest jumps.",
          ["Omar", "Sam", "Lily", "Tia"],
          "Omar 22, Sam 18, Lily 15, Tia 12.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Library books borrowed",
          columns: [
            { label: "2K", value: 9 },
            { label: "2M", value: 6 },
            { label: "2P", value: 9 },
            { label: "2S", value: 4 },
          ],
          step: 1,
        },
        multi(
          n,
          "Look at the graph. Which are true? Choose all that are right.",
          ["2K and 2P borrowed the same", "2S borrowed the fewest", "2M borrowed the most", "2K borrowed 3 more than 2M"],
          [0, 1, 3],
          "2K and 2P both borrowed 9. 2S borrowed only 4. 9 − 6 = 3. 2M's 6 is not the most.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Toys brought to school",
          thing: "toys",
          each: 1,
          rows: [
            { label: "Car", count: 2 },
            { label: "Doll", count: 4 },
            { label: "Ball", count: 7 },
          ],
        },
        trueFalse(n, "Look at the picture graph. There are 5 more balls than cars.", true, "7 balls and 2 cars. 7 − 2 = 5 more balls."),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite season",
          columns: [
            { label: "Summer", value: 8 },
            { label: "Autumn", value: 3 },
            { label: "Winter", value: 4 },
            { label: "Spring", value: 6 },
          ],
          step: 1,
        },
        choice(
          n,
          "Look at the graph. Which question can the graph NOT answer?",
          ["Which season is the favourite?", "How many chose winter?", "Why do children like summer?", "How many chose spring?"],
          2,
          "The graph only shows how many chose each season. It doesn't tell us why they chose it.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Shells found",
          thing: "shells",
          each: 1,
          rows: [
            { label: "Ana", count: 6 },
            { label: "Ben", count: 4 },
            { label: "Cody", count: 9 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more shells do Ana and Ben have together than Cody?",
          "1",
          "Ana and Ben have 6 + 4 = 10 shells. Cody has 9. 10 − 9 = 1 more.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Sport", "Votes"],
          rows: [
            ["Swimming", 8],
            ["Cricket", 11],
            ["Tennis", 5],
          ],
        },
        choice(
          n,
          "Look at the table. 4 children who voted for tennis change their vote to swimming. Which sport has the most votes now?",
          ["Swimming", "Cricket", "Tennis"],
          0,
          "Swimming goes up to 8 + 4 = 12. Cricket stays at 11. Tennis goes down to 1. 12 is the most.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cars passing the school",
          columns: [
            { label: "Red", value: 4 },
            { label: "White", value: 9 },
            { label: "Blue", value: 6 },
            { label: "Black", value: 5 },
          ],
          step: 1,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many cars were counted altogether?",
          "24",
          "4 + 9 = 13, 13 + 6 = 19, and 19 + 5 = 24.",
        ),
      ),
  ],
});

/** MA1-CHAN-01: chance in everyday events, comparing likelihood. */
export const CHANCE = levels(2080301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "The sun will set tonight. Which word fits best?",
        ["certain", "unlikely", "impossible"],
        0,
        "The sun sets every evening, so it is certain to happen.",
      ),
    (n) =>
      trueFalse(n, "A kangaroo flying to the Moon is impossible.", true, "Kangaroos can't fly, so this can't happen. It is impossible."),
    (n) =>
      choice(
        n,
        "It might rain tomorrow. Which word fits best?",
        ["certain", "possible", "impossible"],
        1,
        "It might happen and it might not. That means it is possible.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 5 },
            { colour: "blue", count: 1 },
          ],
        },
        choice(
          n,
          "You pick one counter from the bag without looking. Which colour are you more likely to get?",
          ["red", "blue", "Both are the same"],
          0,
          "There are 5 red counters and only 1 blue. Red is more likely.",
        ),
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "green", "green", "green"] },
        choice(
          n,
          "What is the chance the spinner lands on green?",
          ["certain", "likely", "unlikely", "impossible"],
          0,
          "Every part is green, so it must land on green. That is certain.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which of these is impossible?",
        ["A week has 8 days", "It rains today", "You see a bird", "You eat an apple"],
        0,
        "A week always has 7 days, so a week with 8 days can't happen.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "red", "red", "blue"] },
        trueFalse(
          n,
          "This spinner is unlikely to land on blue.",
          true,
          "Only 1 of the 4 parts is blue and 3 are red. Blue could happen, but it is unlikely.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these from least likely to most likely.",
        ["You see a real dinosaur today", "It snows at Bondi Beach in summer", "Tomorrow comes after today"],
        "Seeing a real dinosaur is impossible. Snow at Bondi in summer is very unlikely. Tomorrow coming after today is certain.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "yellow", count: 3 },
            { colour: "green", count: 3 },
          ],
        },
        choice(
          n,
          "You pick one counter without looking. Is yellow more likely, less likely or equally likely as green?",
          ["more likely", "less likely", "equally likely"],
          2,
          "There are 3 yellow and 3 green counters. The same number means equally likely.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "bag", counters: [{ colour: "blue", count: 6 }] },
        choice(
          n,
          "You pick one counter from the bag without looking. What is the chance of picking red?",
          ["certain", "likely", "unlikely", "impossible"],
          3,
          "All the counters are blue. There is no red to pick, so it is impossible.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are certain? Choose all that are right.",
        ["Monday comes after Sunday", "A normal dice rolls a 7", "Summer comes after spring", "You win every game you play"],
        [0, 2],
        "Monday always follows Sunday, and summer always follows spring. A dice only goes to 6, and nobody wins every game.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["yellow", "yellow", "purple", "orange"] },
        choice(
          n,
          "Which colour is the spinner most likely to land on?",
          ["yellow", "purple", "orange"],
          0,
          "Yellow has 2 parts. Purple and orange have only 1 part each.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "blue", count: 7 },
            { colour: "green", count: 1 },
          ],
        },
        ordering(
          n,
          "Put the colours in order from most likely to least likely to be picked.",
          ["blue", "red", "green"],
          "There are 7 blue, 2 red and 1 green. More counters means more likely.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 5 red counters and 3 blue counters. How many blue counters must you add so that red and blue are equally likely?",
        "2",
        "Red and blue need the same number. 3 + 2 = 5, so add 2 blue counters.",
      ),
    (n) =>
      choice(
        n,
        "Ella rolls a normal dice with the numbers 1 to 6. Which is more likely?",
        ["Rolling a number less than 6", "Rolling a 6", "Both are the same"],
        0,
        "Five numbers (1, 2, 3, 4, 5) are less than 6, but only one number is 6.",
      ),
  ],
});

/** MA1-CHAN-01: chance in everyday events, comparing likelihood. */
export const CHANCE_2 = levels(2080316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Night will come after day. Which word fits best?",
        ["certain", "unlikely", "impossible"],
        0,
        "Night always comes after day, so it is certain.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you drop a ball, it is impossible for it to fall.",
        false,
        "A dropped ball always falls down. It is certain, not impossible.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue"] },
        trueFalse(
          n,
          "This spinner could land on red or on blue.",
          true,
          "The spinner has a red part and a blue part, so both could happen.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "green", count: 1 },
            { colour: "purple", count: 5 },
          ],
        },
        choice(
          n,
          "You pick one counter without looking. Which colour are you less likely to get?",
          ["green", "purple", "Both are the same"],
          0,
          "There is only 1 green counter and 5 purple. Green is less likely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You will grow taller than a gum tree by next week. Which word fits best?",
        ["certain", "likely", "impossible"],
        2,
        "Nobody can grow that tall in a week. It can't happen.",
      ),
    (n) =>
      multi(
        n,
        "Which of these could happen? Choose all that are right.",
        ["It rains on Saturday", "You see a magpie", "A cat talks to you", "You find 5 cents"],
        [0, 1, 3],
        "Rain, a magpie and finding 5 cents are all possible. Cats can't talk, so that is impossible.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "blue", "blue", "blue", "red"] },
        choice(
          n,
          "How likely is this spinner to land on red?",
          ["certain", "likely", "unlikely", "impossible"],
          2,
          "Only 1 of the 6 parts is red. It could happen, but it is unlikely.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "orange", count: 4 },
            { colour: "yellow", count: 2 },
          ],
        },
        trueFalse(
          n,
          "Picking orange from this bag is more likely than picking yellow.",
          true,
          "There are 4 orange and only 2 yellow counters, so orange is more likely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "It is a school day in July in Sydney. Which is more likely?",
        ["Wearing a jumper", "Building a snowman in the playground", "Both are the same"],
        0,
        "July is winter, so it is often cool. But it almost never snows in Sydney.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "yellow", "green", "yellow", "green", "yellow", "green", "red"] },
        ordering(
          n,
          "Put the colours in order from most likely to least likely.",
          ["green", "yellow", "red"],
          "Green has 4 parts, yellow has 3 and red has 1.",
        ),
      ),
    (n) =>
      multi(
        n,
        "A bag has only red and blue counters. Which colours are impossible to pick? Choose all that are right.",
        ["green", "yellow", "red", "blue"],
        [0, 1],
        "There are no green or yellow counters in the bag, so they can't be picked.",
      ),
    (n) =>
      choice(
        n,
        "You toss a coin. Which is true?",
        ["Heads and tails are equally likely", "Heads is certain", "Tails is impossible", "Heads is more likely"],
        0,
        "A coin has one heads side and one tails side, so each is just as likely.",
      ),
  ],
  very_hard: [
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
          "Look at the bag. What is the smallest number of red counters you must add to make red more likely than blue?",
          "3",
          "There are 5 blue. Red needs more than 5, so at least 6. 3 + 3 = 6, so add 3 red.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Jai wants a spinner where red is likely, but not certain. Which spinner should he use?",
        ["3 red parts and 1 blue part", "4 red parts", "1 red part and 3 blue parts", "2 red parts and 2 blue parts"],
        0,
        "With 3 red and 1 blue, red is likely but blue could still happen. 4 red parts makes red certain.",
      ),
    (n) =>
      trueFalse(
        n,
        "Ted's spinner has 2 red parts and 2 blue parts. It landed on red 3 times in a row. So the next spin must be blue.",
        false,
        "Each spin is new. Red and blue are still equally likely, so the next spin could be either.",
      ),
  ],
});
