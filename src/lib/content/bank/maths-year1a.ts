/**
 * Year 1 Mathematics: 15 questions for each Stage 1 standard (NESA outcome), three at each
 * level from very easy to very hard, in two sets per standard (the second set ends in _2).
 * Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

const WILL = ["will happen", "might happen", "won't happen"];

/** MA1-RWN-01: place value and the role of zero to read, write and order two-digit numbers (and up to 120). */
export const PLACE_VALUE = levels(1010101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 2, ones: 4 },
        typed("short_answer", n, "What number do these blocks show?", "24", "There are 2 tens and 4 ones. 2 tens is 20, and 20 + 4 = 24."),
      ),
    (n) => choice(n, "How do we write twelve?", ["21", "12", "102", "2"], 1, "Twelve is 1 ten and 2 ones, so we write 12."),
    (n) => trueFalse(n, "In 38, the 3 is in the tens place.", true, "38 is 3 tens and 8 ones. The 3 is in the tens place."),
  ],
  easy: [
    (n) => choice(n, "What is the 5 worth in 56?", ["5", "50", "56", "6"], 1, "The 5 is in the tens place. 5 tens is 50."),
    (n) =>
      typed("short_answer", n, "What number comes after 39?", "40", "After 39 the ones start again at 0 and the tens go up by one: 40."),
    (n) =>
      ordering(
        n,
        "Put these numbers in order from smallest to largest.",
        ["17", "35", "53", "71"],
        "Look at the tens first: 1 ten, 3 tens, 5 tens, 7 tens. So 17, 35, 53, 71.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 100, jumps: 10, dotAt: 7 },
        typed(
          "short_answer",
          n,
          "Each jump on this number line is 10. What number is the dot on?",
          "70",
          "The dot is 7 jumps of 10 from 0. Count by tens: 10, 20, 30, 40, 50, 60, 70.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which number is bigger, 61 or 16?",
        ["61", "16", "They are the same"],
        0,
        "61 has 6 tens. 16 has only 1 ten. So 61 is bigger.",
      ),
    (n) => typed("fill_blank", n, "40, 50, 60, ___, 80", "70", "The numbers go up by ten each time. After 60 comes 70."),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which numbers have a 0 in the ones place? Choose all that are right.",
        ["30", "103", "90", "109", "50"],
        [0, 2, 4],
        "30, 90 and 50 end in 0, so they have no ones. In 103 and 109 the 0 is in the tens place.",
      ),
    (n) =>
      typed("short_answer", n, "What number is 10 more than 47?", "57", "10 more adds one ten. 4 tens becomes 5 tens, so 47 becomes 57."),
    (n) =>
      choice(
        n,
        "What number comes just before 100?",
        ["90", "99", "101", "10"],
        1,
        "Counting up: 98, 99, 100. So 99 comes just before 100.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Use the digits 4 and 9 once each. What is the biggest two-digit number you can make?",
        "94",
        "Put the bigger digit in the tens place: 9 tens and 4 ones is 94.",
      ),
    (n) =>
      choice(
        n,
        "Mia has 3 tens and 14 ones. What number is that?",
        ["314", "44", "17", "34"],
        1,
        "14 ones is 1 ten and 4 ones. So she has 4 tens and 4 ones, which is 44.",
      ),
    (n) => typed("short_answer", n, "What number is one more than 119?", "120", "Count on one from 119: the next number is 120."),
  ],
});

/** MA1-RWN-01: place value and the role of zero to read, write and order two-digit numbers (and up to 120). */
export const PLACE_VALUE_2 = levels(1010116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 4, ones: 0 },
        typed("short_answer", n, "What number do these blocks show?", "40", "There are 4 tens and no ones. We write a 0 for no ones: 40."),
      ),
    (n) => trueFalse(n, "Fifteen is written 51.", false, "Fifteen is 1 ten and 5 ones, so it is written 15. 51 is fifty-one."),
    (n) => choice(n, "How many tens are in 60?", ["6", "60", "0", "10"], 0, "60 is 6 tens and 0 ones."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 7, ones: 2 },
        choice(n, "Which number do these blocks show?", ["27", "72", "702", "9"], 1, "There are 7 tens and 2 ones. That is 72."),
      ),
    (n) => typed("fill_blank", n, "29, 30, 31, ___", "32", "Count on by one: 29, 30, 31, 32."),
    (n) =>
      choice(
        n,
        "Which number is the smallest?",
        ["43", "34", "40", "33"],
        3,
        "34 and 33 have the fewest tens (3). 33 has fewer ones, so 33 is the smallest.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What number is 10 less than 85?",
        "75",
        "10 less takes away one ten. 8 tens becomes 7 tens, so 85 becomes 75.",
      ),
    (n) =>
      multi(
        n,
        "Which numbers are bigger than 50? Choose all that are right.",
        ["49", "58", "15", "81", "50"],
        [1, 3],
        "58 and 81 have more than 5 tens. 49 and 15 are smaller, and 50 is not bigger than itself.",
      ),
    (n) => trueFalse(n, "In 104, the 0 shows there are no tens.", true, "104 is 1 hundred, 0 tens and 4 ones. The 0 holds the tens place."),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these numbers in order from largest to smallest.",
        ["120", "102", "21", "12"],
        "120 and 102 are more than 100. 120 has 2 tens, so it is bigger than 102. Then 21, then 12.",
      ),
    (n) => typed("fill_blank", n, "Count back by tens: 110, 100, 90, ___", "80", "Each number is 10 less. 10 less than 90 is 80."),
    (n) => choice(n, "Which number has 8 tens and 0 ones?", ["8", "80", "800", "18"], 1, "8 tens is 80. The 0 shows there are no ones."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "I am between 60 and 70. My ones digit is 5. What number am I?",
        "65",
        "Numbers between 60 and 70 have 6 tens. With 5 ones, the number is 65.",
      ),
    (n) =>
      choice(
        n,
        "Sam says 70 is bigger than 107 because 7 is bigger than 1. Is Sam right?",
        ["Yes, 70 is bigger", "No, 107 is bigger", "They are the same"],
        1,
        "107 is more than 100, and 70 is less than 100. So 107 is bigger.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Use the digits 0 and 6 once each. What is the smallest two-digit number you can make?",
        "60",
        "A two-digit number can't start with 0, so 6 goes in the tens place. That makes 60.",
      ),
  ],
});

/** MA1-RWN-02: representations of whole numbers, partitioning into tens and ones. */
export const PARTITION = levels(1010201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 3, ones: 6 },
        typed(
          "short_answer",
          n,
          "Look at the blocks. How many tens are there?",
          "3",
          "Each long rod is one ten. There are 3 rods, so 3 tens.",
        ),
      ),
    (n) => choice(n, "25 is 2 tens and how many ones?", ["2", "5", "20", "25"], 1, "25 is 20 + 5, so it is 2 tens and 5 ones."),
    (n) => trueFalse(n, "10 and 4 more makes 14.", true, "1 ten and 4 ones is 14."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "30 + 7 = ___", "37", "3 tens and 7 ones make 37."),
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 5, ones: 8 },
        choice(
          n,
          "Which matches these blocks?",
          ["5 + 8", "50 + 8", "80 + 5", "58 + 8"],
          1,
          "5 tens is 50 and there are 8 ones, so 50 + 8.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which are ways to make 12? Choose all that are right.",
        ["10 + 2", "6 + 6", "1 + 2", "8 + 4", "7 + 3"],
        [0, 1, 3],
        "10 + 2, 6 + 6 and 8 + 4 all make 12. 1 + 2 is 3 and 7 + 3 is 10.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "64 = 60 + ___", "4", "64 is 6 tens and 4 ones, so 64 = 60 + 4."),
    (n) => choice(n, "Which number is 4 tens and 9 ones?", ["49", "94", "13", "409"], 0, "4 tens is 40, and 40 + 9 = 49."),
    (n) => typed("short_answer", n, "How many ones make 1 ten?", "10", "One ten is the same as 10 ones."),
  ],
  hard: [
    (n) => trueFalse(n, "35 is the same as 2 tens and 15 ones.", true, "2 tens is 20. 20 + 15 = 35. So yes, it is the same."),
    (n) => typed("fill_blank", n, "47 = 30 + ___", "17", "47 take away 30 leaves 17. So 47 = 30 + 17."),
    (n) =>
      choice(
        n,
        "Ella has 5 bundles of ten sticks and 3 loose sticks. How many sticks does she have?",
        ["8", "35", "53", "503"],
        2,
        "5 bundles of ten is 50. 50 + 3 = 53.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which are ways to show 52? Choose all that are right.",
        ["5 tens and 2 ones", "4 tens and 12 ones", "2 tens and 5 ones", "50 + 2", "3 tens and 22 ones"],
        [0, 1, 3, 4],
        "5 tens and 2 ones is 52. 40 + 12 = 52 and 30 + 22 = 52 too. 2 tens and 5 ones is only 25.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ben has 7 tens. How many more tens does he need to make 100?",
        "3",
        "100 is 10 tens. He has 7 tens, and 7 + 3 = 10, so he needs 3 more tens.",
      ),
    (n) =>
      choice(
        n,
        "A number has 1 hundred, 1 ten and 6 ones. What is it?",
        ["116", "1116", "17", "161"],
        0,
        "1 hundred is 100, 1 ten is 10, and 6 ones is 6. 100 + 10 + 6 = 116.",
      ),
  ],
});

/** MA1-RWN-02: representations of whole numbers, partitioning into tens and ones. */
export const PARTITION_2 = levels(1010216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 1, ones: 3 },
        typed("short_answer", n, "Look at the blocks. How many ones are there?", "3", "The small cubes are ones. There are 3 small cubes."),
      ),
    (n) => typed("fill_blank", n, "10 + 6 = ___", "16", "1 ten and 6 ones make 16."),
    (n) => choice(n, "Which number is the same as 20 + 8?", ["28", "82", "10", "208"], 0, "2 tens and 8 ones is 28."),
  ],
  easy: [
    (n) => trueFalse(n, "73 is 7 tens and 3 ones.", true, "7 tens is 70, and 70 + 3 = 73."),
    (n) => typed("fill_blank", n, "59 = ___ + 9", "50", "59 is 5 tens and 9 ones, so 59 = 50 + 9."),
    (n) => choice(n, "How many tens are in 46?", ["4", "6", "40", "10"], 0, "46 is 40 + 6. 40 is 4 tens."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "blocks", hundreds: 0, tens: 2, ones: 9 },
        choice(
          n,
          "Look at the blocks. Which number sentence matches?",
          ["20 + 9 = 29", "2 + 9 = 11", "90 + 2 = 92", "20 + 90 = 110"],
          0,
          "There are 2 tens (20) and 9 ones. 20 + 9 = 29.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which are ways to make 15? Choose all that are right.",
        ["10 + 5", "9 + 6", "7 + 7", "8 + 7", "5 + 5"],
        [0, 1, 3],
        "10 + 5, 9 + 6 and 8 + 7 all make 15. 7 + 7 is 14 and 5 + 5 is 10.",
      ),
    (n) => typed("short_answer", n, "How many tens are in 90?", "9", "Count by tens: 10, 20, 30, 40, 50, 60, 70, 80, 90. That is 9 tens."),
  ],
  hard: [
    (n) => typed("fill_blank", n, "38 = 20 + ___", "18", "38 take away 20 leaves 18. So 38 = 20 + 18."),
    (n) =>
      choice(
        n,
        "Which one is NOT the same as 26?",
        ["2 tens and 6 ones", "1 ten and 16 ones", "20 + 6", "6 tens and 2 ones"],
        3,
        "6 tens and 2 ones is 62, not 26. The others all make 26.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["1 ten and 9 ones", "3 tens", "4 tens and 1 one", "5 tens and 2 ones"],
        "These are 19, 30, 41 and 52, from smallest to largest.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Lily has 2 tens and 25 ones. What number is that?",
        "45",
        "25 ones is 2 tens and 5 ones. So she has 4 tens and 5 ones, which is 45.",
      ),
    (n) =>
      multi(
        n,
        "Which of these make 100? Choose all that are right.",
        ["10 tens", "9 tens and 10 ones", "1 ten", "50 + 50", "90 + 1"],
        [0, 1, 3],
        "10 tens is 100. 90 + 10 = 100 and 50 + 50 = 100. 1 ten is only 10, and 90 + 1 is 91.",
      ),
    (n) =>
      choice(
        n,
        "A box holds 10 pencils. Zoe has 64 pencils. How many boxes can she fill?",
        ["4", "6", "10", "64"],
        1,
        "64 is 6 tens and 4 ones. She can fill 6 boxes, with 4 pencils left over.",
      ),
  ],
});

/** MA1-CSQ-01: number bonds and the link between addition and subtraction (within 20). */
export const ADD_SUB = levels(1020101, {
  very_easy: [
    (n) => typed("short_answer", n, "3 + 2 = ?", "5", "Start at 3 and count on 2: 4, 5."),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 4 },
            { colour: "blue", count: 3 },
          ],
        },
        typed("short_answer", n, "How many counters are in the bag altogether?", "7", "There are 4 red and 3 blue. 4 + 3 = 7."),
      ),
    (n) => trueFalse(n, "5 + 5 = 10", true, "5 and 5 is a double. Double 5 is 10."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "6 + ___ = 10", "4", "6 and 4 make 10. Count on from 6: 7, 8, 9, 10. That is 4."),
    (n) => choice(n, "What is 9 − 3?", ["5", "6", "12", "3"], 1, "Start at 9 and count back 3: 8, 7, 6."),
    (n) => trueFalse(n, "If 4 + 3 = 7, then 7 − 3 = 4.", true, "Adding and taking away undo each other. 4 + 3 = 7, so 7 − 3 = 4."),
  ],
  medium: [
    (n) => typed("short_answer", n, "8 + 7 = ?", "15", "8 + 2 = 10, then 5 more is 15."),
    (n) =>
      multi(
        n,
        "Which of these make 10? Choose all that are right.",
        ["3 + 7", "6 + 4", "5 + 4", "2 + 8", "9 + 2"],
        [0, 1, 3],
        "3 + 7, 6 + 4 and 2 + 8 are all ways to make 10. 5 + 4 is 9 and 9 + 2 is 11.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 20, jumps: 20, dotAt: 13, labelEvery: true },
        typed(
          "short_answer",
          n,
          "The dot is on 13. Count back 5 jumps. What is 13 − 5?",
          "8",
          "Count back 5 from 13: 12, 11, 10, 9, 8. So 13 − 5 = 8.",
        ),
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "___ − 6 = 9", "15", "Think of addition: 9 + 6 = 15. So 15 − 6 = 9."),
    (n) =>
      choice(
        n,
        "Tom has 12 stickers. He gives 5 to Ava. How many does he have left?",
        ["17", "7", "6", "8"],
        1,
        "He gives some away, so take away: 12 − 5 = 7.",
      ),
    (n) =>
      choice(
        n,
        "Which fact goes with 8 + 6 = 14?",
        ["14 − 6 = 8", "14 + 6 = 20", "8 − 6 = 2", "6 − 8 = 14"],
        0,
        "8 + 6 = 14 uses 8, 6 and 14. Take 6 from 14 and you get back to 8.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Work out each one. Put them in order from smallest answer to largest answer.",
        ["4 + 3", "5 + 5", "20 − 8", "9 + 6"],
        "4 + 3 = 7, 5 + 5 = 10, 20 − 8 = 12, 9 + 6 = 15.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 17 kookaburras in a tree. Some fly away. Now there are 9. How many flew away?",
        "8",
        "Count on from 9 to 17: that is 8. So 17 − 8 = 9, and 8 flew away.",
      ),
    (n) =>
      multi(
        n,
        "Which are true? Choose all that are right.",
        ["9 + 8 = 17", "17 − 8 = 9", "8 + 9 = 18", "17 − 9 = 8"],
        [0, 1, 3],
        "9 + 8 = 17, so 17 − 8 = 9 and 17 − 9 = 8. But 8 + 9 is 17, not 18.",
      ),
  ],
});

/** MA1-CSQ-01: number bonds and the link between addition and subtraction (within 20). */
export const ADD_SUB_2 = levels(1020116, {
  very_easy: [
    (n) => typed("short_answer", n, "4 + 4 = ?", "8", "Double 4 is 8."),
    (n) => choice(n, "What is 7 − 1?", ["6", "8", "7", "1"], 0, "Taking away 1 gives the number just before: 6."),
    (n) => trueFalse(n, "2 + 3 gives the same answer as 3 + 2.", true, "You can add in any order. Both make 5."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "yellow", count: 5 },
            { colour: "red", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "How many more yellow counters are there than red counters?",
          "3",
          "There are 5 yellow and 2 red. 5 − 2 = 3 more yellow.",
        ),
      ),
    (n) => typed("fill_blank", n, "10 − ___ = 7", "3", "7 + 3 = 10, so 10 − 3 = 7."),
    (n) => choice(n, "Mum bakes 6 scones, then 4 more. How many scones?", ["2", "10", "9", "64"], 1, "Add them: 6 + 4 = 10."),
  ],
  medium: [
    (n) => typed("short_answer", n, "13 − 4 = ?", "9", "13 − 3 = 10, then take 1 more to get 9."),
    (n) => typed("fill_blank", n, "9 + ___ = 16", "7", "9 + 1 = 10, then 6 more makes 16. 1 + 6 = 7."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 20, jumps: 20, dotAt: 8, labelEvery: true },
        typed(
          "short_answer",
          n,
          "Start at the dot. Jump forward 6. Where do you land?",
          "14",
          "From 8, count on 6: 9, 10, 11, 12, 13, 14.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which of these make 15? Choose all that are right.",
        ["8 + 7", "20 − 5", "9 + 5", "10 + 5", "16 − 2"],
        [0, 1, 3],
        "8 + 7, 20 − 5 and 10 + 5 all make 15. 9 + 5 is 14 and 16 − 2 is 14.",
      ),
    (n) =>
      choice(
        n,
        "These facts belong together: 5 + 9 = 14, 9 + 5 = 14, 14 − 5 = 9. Which fact is missing?",
        ["14 − 9 = 5", "9 − 5 = 4", "14 + 5 = 19", "5 − 9 = 14"],
        0,
        "The family uses 5, 9 and 14. The missing take-away fact is 14 − 9 = 5.",
      ),
    (n) => trueFalse(n, "18 − 9 = 9", true, "Double 9 is 18, so 18 − 9 = 9."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ruby has 6 shells. Leo has 3 more than Ruby. How many shells do they have altogether?",
        "15",
        "Leo has 6 + 3 = 9 shells. Together: 6 + 9 = 15.",
      ),
    (n) =>
      ordering(
        n,
        "Work out each one. Put them in order from largest answer to smallest answer.",
        ["19 − 1", "7 + 7", "16 − 5", "3 + 6"],
        "19 − 1 = 18, 7 + 7 = 14, 16 − 5 = 11, 3 + 6 = 9.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia thinks of a number. She adds 7 and gets 20. What is her number?",
        "13",
        "Undo the adding: 20 − 7 = 13. Check: 13 + 7 = 20.",
      ),
  ],
});

/** MA1-FG-01: equal groups, skip counting by 2s, 5s and 10s, sharing. */
export const GROUPS = levels(1030101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "array", rows: 2, columns: 5 },
        typed("short_answer", n, "Count by 5s. How many dots are there?", "10", "There are 2 rows of 5. Count by 5s: 5, 10."),
      ),
    (n) => typed("fill_blank", n, "2, 4, 6, ___", "8", "Counting by 2s: 2, 4, 6, 8."),
    (n) => trueFalse(n, "Counting by 10s goes 10, 20, 30, 40.", true, "Each number is 10 more than the one before."),
  ],
  easy: [
    (n) => choice(n, "A duck has 2 legs. How many legs do 3 ducks have?", ["3", "5", "6", "8"], 2, "Count by 2s for each duck: 2, 4, 6."),
    (n) => typed("fill_blank", n, "5, 10, 15, ___, 25", "20", "Counting by 5s: 5, 10, 15, 20, 25."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 2 },
        choice(
          n,
          "Look at the dots. How many equal rows are there?",
          ["2", "4", "6", "8"],
          1,
          "Rows go across. There are 4 rows, with 2 dots in each.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Share 8 apples equally between 2 children. How many does each child get?",
        "4",
        "Give one each at a time until they run out. Each child gets 4, because 4 + 4 = 8.",
      ),
    (n) =>
      multi(
        n,
        "Which numbers do you say when you count by 5s from 0? Choose all that are right.",
        ["15", "22", "30", "45", "12"],
        [0, 2, 3],
        "Counting by 5s, every number ends in 5 or 0. So 15, 30 and 45. Not 22 or 12.",
      ),
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 10 },
        typed("short_answer", n, "Count by 10s. How many dots are there?", "30", "There are 3 rows of 10. Count by 10s: 10, 20, 30."),
      ),
  ],
  hard: [
    (n) => trueFalse(n, "4 groups of 2 is the same as 8.", true, "Count by 2s four times: 2, 4, 6, 8."),
    (n) =>
      typed(
        "short_answer",
        n,
        "12 strawberries are shared equally among 3 friends. How many does each friend get?",
        "4",
        "Share them out one at a time. Each friend gets 4, because 4 + 4 + 4 = 12.",
      ),
    (n) =>
      choice(
        n,
        "Which one is counting by 10s?",
        ["10, 20, 30, 40", "10, 11, 12, 13", "5, 10, 15, 20", "2, 4, 6, 8"],
        0,
        "Counting by 10s adds 10 each time: 10, 20, 30, 40.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A hand has 5 fingers. How many fingers are on 6 hands?",
        "30",
        "Count by 5s six times: 5, 10, 15, 20, 25, 30.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["3 groups of 2", "2 groups of 5", "4 groups of 5", "3 groups of 10"],
        "3 groups of 2 is 6, 2 groups of 5 is 10, 4 groups of 5 is 20, and 3 groups of 10 is 30.",
      ),
    (n) =>
      choice(
        n,
        "Ned has 10 biscuits. He puts 5 on each plate. How many plates does he need?",
        ["2", "5", "10", "15"],
        0,
        "Make groups of 5: 5, 10. That is 2 groups, so 2 plates.",
      ),
  ],
});

/** MA1-FG-01: equal groups, skip counting by 2s, 5s and 10s, sharing. */
export const GROUPS_2 = levels(1030116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Each number shows how many are in a group. Which shows equal groups?",
        ["3, 3, 3", "2, 4, 1", "5, 1, 5"],
        0,
        "Equal groups have the same number in each group. 3, 3, 3 are all the same.",
      ),
    (n) => typed("fill_blank", n, "10, 20, 30, ___", "40", "Counting by 10s: 10, 20, 30, 40."),
    (n) => typed("short_answer", n, "A koala has 2 eyes. How many eyes do 2 koalas have?", "4", "Count by 2s: 2, 4."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "array", rows: 5, columns: 2 },
        typed("short_answer", n, "Count by 2s. How many dots are there?", "10", "There are 5 rows of 2. Count by 2s: 2, 4, 6, 8, 10."),
      ),
    (n) => trueFalse(n, "When we share fairly, everyone gets the same amount.", true, "Fair sharing means every share is equal."),
    (n) => choice(n, "What comes next? 20, 25, 30, …", ["31", "35", "40", "32"], 1, "The numbers go up by 5. 30 + 5 = 35."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "6 children share 12 oranges equally. How many does each child get?",
        "2",
        "Give each child one, then one more. That uses 12 oranges, so each gets 2.",
      ),
    (n) => typed("fill_blank", n, "14, 16, 18, ___", "20", "Counting by 2s: 14, 16, 18, 20."),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 5 },
        choice(
          n,
          "Look at the dots. How many are there altogether?",
          ["9", "20", "15", "45"],
          1,
          "There are 4 rows of 5. Count by 5s: 5, 10, 15, 20.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which numbers do you say when you count by 2s from 0? Choose all that are right.",
        ["7", "12", "16", "19", "20"],
        [1, 2, 4],
        "Counting by 2s gives 2, 4, 6, 8, 10 and so on. 12, 16 and 20 are in it. 7 and 19 are not.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Each coin is 10 cents. How many cents are 7 coins?",
        ["70", "70c", "70 cents"],
        "Count by 10s seven times: 10, 20, 30, 40, 50, 60, 70.",
      ),
    (n) =>
      choice(
        n,
        "Count back by 10s: 90, 80, 70, … What comes next?",
        ["69", "60", "50", "65"],
        1,
        "Each number is 10 less. 10 less than 70 is 60.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 5 bikes. Each bike has 2 wheels. How many wheels?",
        "10",
        "Count by 2s for each bike: 2, 4, 6, 8, 10.",
      ),
    (n) =>
      choice(
        n,
        "15 lollies are shared equally into 3 bags. How many lollies go in each bag?",
        ["3", "5", "12", "18"],
        1,
        "5 + 5 + 5 = 15, so each bag gets 5.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you count by 5s from 0, you will say 52.",
        false,
        "Counting by 5s, every number ends in 0 or 5: … 45, 50, 55. 52 is not one of them.",
      ),
  ],
});

/** MA1-GM-03: halves and quarters as equal parts of a whole or a length. */
export const FRACTIONS = levels(1040101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 2, shaded: 1 },
        choice(
          n,
          "What part of the circle is shaded?",
          ["one half", "one quarter", "the whole"],
          0,
          "The circle is cut into 2 equal parts and 1 is shaded. That is one half.",
        ),
      ),
    (n) => trueFalse(n, "When we cut something in half, we get 2 equal parts.", true, "Halves are 2 equal parts of a whole."),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 1 },
        typed("short_answer", n, "This bar is cut into equal parts. How many parts are there?", "4", "Count the parts: 1, 2, 3, 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 1 },
        choice(
          n,
          "What part of the circle is shaded?",
          ["one half", "one quarter", "three quarters"],
          1,
          "The circle has 4 equal parts and 1 is shaded. One of 4 equal parts is one quarter.",
        ),
      ),
    (n) => typed("short_answer", n, "How many halves make a whole?", "2", "A whole cut in half has 2 halves."),
    (n) =>
      choice(
        n,
        "Jo cuts a sandwich into 2 pieces. One piece is big and one is small. Are they halves?",
        ["Yes", "No, halves must be equal"],
        1,
        "Halves are 2 equal parts. A big piece and a small piece are not halves.",
      ),
  ],
  medium: [
    (n) => typed("short_answer", n, "How many quarters make a whole?", "4", "A whole cut into quarters has 4 equal parts."),
    (n) =>
      multi(
        n,
        "Which are true? Choose all that are right.",
        ["2 quarters make 1 half", "A half is bigger than a quarter", "4 halves make 1 whole", "A quarter is 1 of 4 equal parts"],
        [0, 1, 3],
        "2 quarters fill a half, and a half is bigger than a quarter. A whole is 2 halves, not 4 halves.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 2 },
        choice(
          n,
          "How much of the circle is shaded?",
          ["one quarter", "one half", "the whole"],
          1,
          "2 of the 4 quarters are shaded. 2 quarters is the same as one half.",
        ),
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "Half of 10 is ___.", "5", "Share 10 into 2 equal groups: 5 and 5."),
    (n) =>
      typed(
        "short_answer",
        n,
        "A ribbon is 8 paper clips long. Ali cuts it in half. How many paper clips long is each half?",
        "4",
        "Half of 8 is 4, because 4 + 4 = 8.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 3 },
        typed("short_answer", n, "How many quarters of the bar are shaded?", "3", "The bar has 4 quarters. Count the shaded ones: 3."),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A pizza is cut into 4 equal slices. Sara eats one quarter. How many slices are left?",
        "3",
        "One quarter is 1 slice. 4 − 1 = 3 slices left.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "12 grapes are shared into 4 equal groups. How many grapes are in one quarter?",
        "3",
        "Share 12 into 4 equal groups: 3 in each, because 3 + 3 + 3 + 3 = 12.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["one quarter of a pizza", "one half of a pizza", "a whole pizza"],
        "A quarter is smaller than a half, and a half is smaller than the whole.",
      ),
  ],
});

/** MA1-GM-03: halves and quarters as equal parts of a whole or a length. */
export const FRACTIONS_2 = levels(1040116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 2, shaded: 1 },
        trueFalse(n, "Half of the bar is shaded.", true, "The bar has 2 equal parts and 1 is shaded. That is one half."),
      ),
    (n) =>
      choice(
        n,
        "A pie is cut into 4 equal parts. What is each part called?",
        ["a half", "a quarter", "a whole"],
        1,
        "Each of 4 equal parts is a quarter.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 0 },
        choice(n, "This circle is cut into equal parts. How many parts are there?", ["2", "3", "4"], 2, "Count the parts: 1, 2, 3, 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 2, shaded: 2 },
        choice(
          n,
          "How much of the circle is shaded?",
          ["one half", "the whole", "one quarter"],
          1,
          "Both halves are shaded, so the whole circle is shaded.",
        ),
      ),
    (n) => typed("fill_blank", n, "Half of 6 is ___.", "3", "Share 6 into 2 equal groups: 3 and 3."),
    (n) =>
      trueFalse(
        n,
        "A quarter of a cake is bigger than a half of the same cake.",
        false,
        "A half is 1 of 2 parts. A quarter is 1 of 4 parts, so it is smaller.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 4, shaded: 2 },
        multi(
          n,
          "How much of the bar is shaded? Choose all that are right.",
          ["two quarters", "one half", "one quarter", "the whole"],
          [0, 1],
          "2 of the 4 quarters are shaded. Two quarters is the same as one half.",
        ),
      ),
    (n) => typed("short_answer", n, "What is half of 14?", "7", "7 + 7 = 14, so half of 14 is 7."),
    (n) =>
      choice(
        n,
        "A stick is 6 hand spans long. How long is half of the stick?",
        ["2 hand spans", "3 hand spans", "12 hand spans", "6 hand spans"],
        1,
        "Half of 6 is 3, because 3 + 3 = 6.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many quarters fit in one half?",
        "2",
        "A whole has 4 quarters and 2 halves. So 2 quarters fill one half.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "circle", parts: 4, shaded: 3 },
        typed(
          "short_answer",
          n,
          "How many more quarters must be shaded to shade the whole circle?",
          "1",
          "3 of the 4 quarters are shaded. 1 more makes all 4.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ollie cuts a cake into 4 pieces of different sizes. Is each piece a quarter?",
        ["Yes", "No, quarters must be equal"],
        1,
        "Quarters are 4 equal parts. Pieces of different sizes are not quarters.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mel has 20 marbles. She gives half to Tim. How many marbles does Mel keep?",
        "10",
        "Half of 20 is 10, because 10 + 10 = 20. Mel keeps the other half: 10.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 8 cupcakes. One quarter of them are chocolate. How many are chocolate?",
        "2",
        "Share 8 into 4 equal groups: 2 in each. One quarter is 2.",
      ),
    (n) =>
      multi(
        n,
        "Ivy has 12 strawberries. Which are true? Choose all that are right.",
        ["Half of them is 6", "A quarter of them is 3", "A quarter of them is 4", "Two quarters of them is 6"],
        [0, 1, 3],
        "12 in 2 equal groups is 6 each. 12 in 4 equal groups is 3 each, so two quarters is 3 + 3 = 6.",
      ),
  ],
});

const PET_GRAPH: Picture = {
  kind: "picture_graph",
  title: "Pets at home",
  thing: "pet",
  each: 1,
  rows: [
    { label: "dog", count: 4 },
    { label: "cat", count: 3 },
    { label: "fish", count: 2 },
  ],
};

const SPORT_GRAPH: Picture = {
  kind: "picture_graph",
  title: "Favourite sport",
  thing: "child",
  each: 1,
  rows: [
    { label: "cricket", count: 5 },
    { label: "netball", count: 4 },
    { label: "soccer", count: 6 },
  ],
};

/** MA1-DATA-01: gathering and organising data in lists, tables and picture graphs. */
export const DATA_SHOW = levels(1080101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Ms Lee wants to find the class's favourite fruit. What should she do?",
        ["Ask each child", "Guess", "Ask only herself"],
        0,
        "To find out what the class likes, she needs to ask every child.",
      ),
    (n) =>
      pic(PET_GRAPH, trueFalse(n, "Look at the picture graph. Each star stands for 1 pet.", true, "The key says each star means 1 pet.")),
    (n) =>
      choice(
        n,
        "Which question helps you find out about your friends' pets?",
        ["What pet do you have?", "What is 2 + 2?", "Is it sunny?"],
        0,
        "Asking 'What pet do you have?' collects data about pets.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Fruit", "Votes"],
          rows: [
            ["apple", 5],
            ["banana", 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "Ana put the votes in a table. How many votes did apple get?",
          "5",
          "Find apple in the table. Next to it is 5.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for making a picture graph in order.",
        ["Ask a question", "Collect the answers", "Sort the answers into groups", "Draw a picture for each answer"],
        "First ask, then collect the answers, then sort them, then draw the graph.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack makes a list of his toys: car, ball, car, ball, car. How many cars are on the list?",
        "3",
        "Count each 'car' on the list: 1, 2, 3.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mia asks 10 children if they like rain. 6 say yes. The rest say no. How many say no?",
        "4",
        "10 children in all. 10 − 6 = 4 say no.",
      ),
    (n) =>
      pic(
        SPORT_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. One more child picks netball. How many stars will netball have now?",
          "5",
          "Netball has 4 stars. Add 1 more: 4 + 1 = 5.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph, all the pictures should be the same size.",
        true,
        "Same-size pictures make the rows easy to compare.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A list says: hat, hat, cap, hat, cap. Which table matches the list?",
        ["hat 3, cap 2", "hat 2, cap 3", "hat 5, cap 0", "hat 3, cap 3"],
        0,
        "Count each word. There are 3 hats and 2 caps.",
      ),
    (n) =>
      multi(
        n,
        "Which are good questions for collecting data about your class? Choose all that are right.",
        ["What is your favourite colour?", "How do you get to school?", "What is 5 + 5?", "Which pet do you like best?"],
        [0, 1, 3],
        "Good data questions have answers that change from child to child. 5 + 5 is always 10.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Way to school", "Children"],
          rows: [
            ["walk", 7],
            ["car", 9],
            ["bus", 4],
          ],
        },
        typed("short_answer", n, "Look at the table. How many children were asked?", "20", "Add the numbers: 7 + 9 + 4 = 20."),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "There are 12 votes. 5 are for red, 4 are for blue and the rest are for green. How many votes are for green?",
        "3",
        "Red and blue have 5 + 4 = 9 votes. 12 − 9 = 3 for green.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Weather this week",
          thing: "day",
          each: 1,
          rows: [
            { label: "sunny", count: 3 },
            { label: "rainy", count: 2 },
            { label: "cloudy", count: 2 },
          ],
        },
        trueFalse(n, "Look at the picture graph. It shows 7 days of weather.", true, "Add the stars: 3 + 2 + 2 = 7. A week has 7 days."),
      ),
    (n) =>
      choice(
        n,
        "Zac's picture graph has 6 stars for dogs. Only 5 children said dogs. What went wrong?",
        ["He drew one star too many", "He drew one star too few", "Nothing is wrong"],
        0,
        "Each child gets one star. 5 children should have 5 stars, so 6 is one too many.",
      ),
  ],
});

const COLOUR_TABLE: Picture = {
  kind: "table",
  headings: ["Colour", "Votes"],
  rows: [
    ["red", 4],
    ["blue", 6],
  ],
};

const PET_TABLE: Picture = {
  kind: "table",
  headings: ["Pet", "Number"],
  rows: [
    ["dogs", 4],
    ["cats", 4],
    ["birds", 2],
  ],
};

/** MA1-DATA-01: gathering and organising data in lists, tables and picture graphs. */
export const DATA_SHOW_2 = levels(1080116, {
  very_easy: [
    (n) =>
      trueFalse(n, "Writing answers in a list helps us keep track of them.", true, "A list keeps every answer so we don't forget any."),
    (n) =>
      pic(
        COLOUR_TABLE,
        choice(n, "Look at the table. Which colour has 6 votes?", ["red", "blue"], 1, "Find 6 in the table. It is next to blue."),
      ),
    (n) =>
      choice(
        n,
        "Which is a way to show data?",
        ["a picture graph", "a song", "a sandwich"],
        0,
        "A picture graph shows data with pictures.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Fruit in the lunch box",
          thing: "piece of fruit",
          each: 1,
          rows: [
            { label: "apples", count: 2 },
            { label: "bananas", count: 3 },
            { label: "pears", count: 1 },
          ],
        },
        typed("short_answer", n, "Look at the picture graph. How many bananas are there?", "3", "Count the stars in the bananas row: 3."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ellie writes the birds she sees: magpie, galah, magpie, magpie. How many magpies?",
        "3",
        "Count each 'magpie' in her list: 1, 2, 3.",
      ),
    (n) =>
      multi(
        n,
        "Which can you use to sort data? Choose all that are right.",
        ["a table", "a list", "a picture graph", "a ruler"],
        [0, 1, 2],
        "Tables, lists and picture graphs all organise data. A ruler is for measuring.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Lunch", "Children"],
          rows: [
            ["sandwich", 8],
            ["wrap", 3],
            ["sushi", 5],
          ],
        },
        choice(
          n,
          "Look at the table. Kim makes a picture graph from it. How many pictures should sushi get?",
          ["3 pictures", "5 pictures", "8 pictures"],
          1,
          "The table says 5 children chose sushi, so draw 5 pictures.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mr Tran asks 15 children if they like swimming. 9 say yes. The rest say no. How many say no?",
        "6",
        "15 children in all. 15 − 9 = 6 say no.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph, each row should start at the same line.",
        true,
        "If the rows start in the same place, we can see which row is longest.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A list of drinks says: milk, water, juice, water, water, milk. Which table matches?",
        ["milk 2, water 3, juice 1", "milk 3, water 2, juice 1", "milk 2, water 2, juice 2"],
        0,
        "Count each drink: milk 2, water 3, juice 1.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Ways to get to school",
          thing: "child",
          each: 1,
          rows: [
            { label: "walk", count: 6 },
            { label: "bike", count: 2 },
            { label: "car", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children were asked altogether?",
          "13",
          "Add the stars: 6 + 2 + 5 = 13.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which question gives answers that are easy to sort into groups?",
        ["Do you have a pet, yes or no?", "Why is the sky blue?", "Tell me about your day."],
        0,
        "Yes or no answers sort into two groups: yes and no.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Nina asks 18 children. 7 like cricket, 6 like netball and the rest like soccer. How many like soccer?",
        "5",
        "Cricket and netball: 7 + 6 = 13. 18 − 13 = 5 like soccer.",
      ),
    (n) =>
      pic(
        PET_TABLE,
        multi(
          n,
          "Tom made this table of pets. Which are true? Choose all that are right.",
          ["Dogs and cats have the same number", "There are 10 pets in all", "Birds have the most", "There are 2 more dogs than birds"],
          [0, 1, 3],
          "Dogs 4 and cats 4 are the same. 4 + 4 + 2 = 10. Birds have the fewest. 4 − 2 = 2 more dogs.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ben's picture graph shows 4 apples, but he forgot to draw 2 apples. How many apple pictures should there be?",
        "6",
        "He drew 4 and missed 2. 4 + 2 = 6.",
      ),
  ],
});

const ANIMAL_GRAPH: Picture = {
  kind: "picture_graph",
  title: "Favourite animal",
  thing: "child",
  each: 1,
  rows: [
    { label: "koala", count: 6 },
    { label: "kangaroo", count: 4 },
    { label: "wombat", count: 2 },
    { label: "emu", count: 5 },
  ],
};

const SPORT_TABLE: Picture = {
  kind: "table",
  headings: ["Sport", "Children"],
  rows: [
    ["cricket", 7],
    ["netball", 9],
    ["swimming", 3],
  ],
};

/** MA1-DATA-02: reading and describing what data shows. */
export const DATA_READ = levels(1080201, {
  very_easy: [
    (n) =>
      pic(
        ANIMAL_GRAPH,
        choice(
          n,
          "Look at the picture graph. Which animal is the favourite?",
          ["koala", "kangaroo", "wombat", "emu"],
          0,
          "Koala has the most stars: 6.",
        ),
      ),
    (n) =>
      pic(
        ANIMAL_GRAPH,
        typed("short_answer", n, "Look at the picture graph. How many children chose emu?", "5", "Count the stars in the emu row: 5."),
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph, the longest row shows the most.",
        true,
        "More pictures make a longer row, so the longest row is the most.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        ANIMAL_GRAPH,
        choice(
          n,
          "Look at the picture graph. Which animal was chosen the least?",
          ["koala", "kangaroo", "wombat", "emu"],
          2,
          "Wombat has the fewest stars: 2.",
        ),
      ),
    (n) =>
      pic(
        ANIMAL_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more children chose koala than kangaroo?",
          "2",
          "Koala has 6 and kangaroo has 4. 6 − 4 = 2.",
        ),
      ),
    (n) =>
      pic(
        ANIMAL_GRAPH,
        trueFalse(n, "Look at the picture graph. More children chose emu than kangaroo.", true, "Emu has 5 and kangaroo has 4. 5 is more."),
      ),
  ],
  medium: [
    (n) =>
      pic(
        ANIMAL_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children chose koala or wombat?",
          "8",
          "Koala 6 and wombat 2. 6 + 2 = 8.",
        ),
      ),
    (n) =>
      pic(
        SPORT_TABLE,
        choice(
          n,
          "Look at the table. Which sport did the most children choose?",
          ["cricket", "netball", "swimming"],
          1,
          "Netball has 9, the biggest number.",
        ),
      ),
    (n) =>
      pic(
        SPORT_TABLE,
        multi(
          n,
          "Look at the table. Which are true? Choose all that are right.",
          [
            "Netball is the most popular",
            "Swimming is the least popular",
            "Cricket has 2 fewer than netball",
            "Cricket is the most popular",
          ],
          [0, 1, 2],
          "Netball 9 is most and swimming 3 is least. 9 − 7 = 2, so cricket has 2 fewer than netball.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        ANIMAL_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many children voted altogether?",
          "17",
          "Add the rows: 6 + 4 + 2 + 5 = 17.",
        ),
      ),
    (n) =>
      pic(
        SPORT_TABLE,
        typed(
          "short_answer",
          n,
          "Look at the table. How many fewer children chose swimming than cricket?",
          "4",
          "Cricket 7 and swimming 3. 7 − 3 = 4.",
        ),
      ),
    (n) =>
      pic(
        ANIMAL_GRAPH,
        ordering(
          n,
          "Look at the picture graph. Put the animals in order from most votes to fewest.",
          ["koala", "emu", "kangaroo", "wombat"],
          "Koala 6, emu 5, kangaroo 4, wombat 2.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        ANIMAL_GRAPH,
        choice(
          n,
          "Look at the picture graph. 2 more children vote for wombat. Which animal now has the same number as wombat?",
          ["koala", "kangaroo", "emu"],
          1,
          "Wombat goes from 2 to 4. Kangaroo also has 4.",
        ),
      ),
    (n) =>
      pic(
        SPORT_TABLE,
        choice(
          n,
          "Look at the table. Which sentence best tells what the table shows?",
          ["Netball is the favourite sport", "Everyone likes swimming", "Cricket has the most children"],
          0,
          "Netball has the most children (9). Only 3 chose swimming, and cricket has fewer than netball.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Books read this week",
          columns: [
            { label: "Mon", value: 3 },
            { label: "Tue", value: 5 },
            { label: "Wed", value: 4 },
            { label: "Thu", value: 6 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more books were read on Thursday than on Monday?",
          "3",
          "Thursday has 6 and Monday has 3. 6 − 3 = 3 more.",
        ),
      ),
  ],
});

const LUNCH_GRAPH: Picture = {
  kind: "picture_graph",
  title: "Lunch orders",
  thing: "order",
  each: 1,
  rows: [
    { label: "pie", count: 3 },
    { label: "sushi", count: 7 },
    { label: "wrap", count: 5 },
    { label: "salad", count: 2 },
  ],
};

const WEATHER_TABLE: Picture = {
  kind: "table",
  headings: ["Weather", "Days"],
  rows: [
    ["sunny", 8],
    ["rainy", 4],
    ["cloudy", 6],
  ],
};

/** MA1-DATA-02: reading and describing what data shows. */
export const DATA_READ_2 = levels(1080216, {
  very_easy: [
    (n) =>
      pic(
        LUNCH_GRAPH,
        choice(
          n,
          "Look at the picture graph. Which lunch was ordered the most?",
          ["pie", "sushi", "wrap", "salad"],
          1,
          "Sushi has the most stars: 7.",
        ),
      ),
    (n) =>
      pic(
        LUNCH_GRAPH,
        typed("short_answer", n, "Look at the picture graph. How many pies were ordered?", "3", "Count the stars in the pie row: 3."),
      ),
    (n) =>
      pic(
        LUNCH_GRAPH,
        trueFalse(n, "Look at the picture graph. Salad had the fewest orders.", true, "Salad has only 2 stars, fewer than all the others."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        LUNCH_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more sushi orders than wrap orders?",
          "2",
          "Sushi 7 and wrap 5. 7 − 5 = 2.",
        ),
      ),
    (n) =>
      pic(
        LUNCH_GRAPH,
        choice(
          n,
          "Look at the picture graph. Which lunch had 5 orders?",
          ["pie", "sushi", "wrap", "salad"],
          2,
          "The wrap row has 5 stars.",
        ),
      ),
    (n) =>
      pic(
        LUNCH_GRAPH,
        trueFalse(n, "Look at the picture graph. Pie had more orders than wrap.", false, "Pie has 3 and wrap has 5. 3 is less than 5."),
      ),
  ],
  medium: [
    (n) =>
      pic(
        LUNCH_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many pie and salad orders are there altogether?",
          "5",
          "Pie 3 and salad 2. 3 + 2 = 5.",
        ),
      ),
    (n) =>
      pic(
        WEATHER_TABLE,
        choice(
          n,
          "Look at the table. Which weather happened on the most days?",
          ["sunny", "rainy", "cloudy"],
          0,
          "Sunny has 8 days, the biggest number.",
        ),
      ),
    (n) =>
      pic(
        WEATHER_TABLE,
        typed("short_answer", n, "Look at the table. How many more cloudy days than rainy days?", "2", "Cloudy 6 and rainy 4. 6 − 4 = 2."),
      ),
  ],
  hard: [
    (n) =>
      pic(
        LUNCH_GRAPH,
        typed("short_answer", n, "Look at the picture graph. How many lunch orders are there altogether?", "17", "3 + 7 + 5 + 2 = 17."),
      ),
    (n) =>
      pic(
        WEATHER_TABLE,
        multi(
          n,
          "Look at the table. Which are true? Choose all that are right.",
          ["There were 18 days in all", "Rainy had the fewest days", "Sunny had 2 more days than cloudy", "Cloudy had the most days"],
          [0, 1, 2],
          "8 + 4 + 6 = 18. Rainy (4) is fewest. 8 − 6 = 2. Sunny, not cloudy, had the most.",
        ),
      ),
    (n) =>
      pic(
        WEATHER_TABLE,
        ordering(
          n,
          "Look at the table. Put the weather in order from fewest days to most days.",
          ["rainy", "cloudy", "sunny"],
          "Rainy 4, cloudy 6, sunny 8.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        LUNCH_GRAPH,
        typed(
          "short_answer",
          n,
          "Look at the picture graph. The canteen only had 4 sushi. The other children who wanted sushi got a wrap. How many wraps were sold?",
          "8",
          "7 wanted sushi but only 4 got it, so 7 − 4 = 3 got a wrap instead. 5 + 3 = 8 wraps.",
        ),
      ),
    (n) =>
      pic(
        LUNCH_GRAPH,
        choice(
          n,
          "Look at the picture graph. Which two lunches together have the same number of orders as sushi?",
          ["pie and wrap", "wrap and salad", "pie and salad"],
          1,
          "Sushi has 7. Wrap 5 + salad 2 = 7. Pie and wrap make 8, and pie and salad make 5.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Books read",
          columns: [
            { label: "Ana", value: 4 },
            { label: "Ben", value: 7 },
            { label: "Cal", value: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more books must Ana read to have the same as Ben?",
          "3",
          "Ben read 7 and Ana read 4. 7 − 4 = 3 more books.",
        ),
      ),
  ],
});

/** MA1-CHAN-01: chance in everyday events (will happen, might happen, won't happen). */
export const CHANCE = levels(1080301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "The sun will come up tomorrow morning. Is this something that…",
        WILL,
        0,
        "The sun comes up every morning, so it will happen.",
      ),
    (n) => choice(n, "A kangaroo flies to the moon. Is this something that…", WILL, 2, "Kangaroos can't fly, so this won't happen."),
    (n) => trueFalse(n, "A dog will talk to you at school today.", false, "Dogs can't talk, so this won't happen."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "red", "red", "red"] },
        choice(
          n,
          "Look at the spinner. Landing on red is something that…",
          WILL,
          0,
          "Every part of the spinner is red, so it will land on red.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "blue", count: 3 },
            { colour: "green", count: 3 },
          ],
        },
        choice(
          n,
          "Pip takes a counter without looking. Taking a green counter is something that…",
          WILL,
          1,
          "There are green and blue counters, so she might get green, or she might get blue.",
        ),
      ),
    (n) =>
      choice(n, "Monday comes after Sunday. Is this something that…", WILL, 0, "Every week, Monday comes after Sunday. It will happen."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "red", "blue"] },
        choice(
          n,
          "Look at the spinner. Landing on yellow is something that…",
          WILL,
          2,
          "There is no yellow on the spinner, so it won't happen.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which might happen? Choose all that are right.",
        ["It rains on the weekend", "You see a magpie at school", "A cat turns into a car", "Christmas is in December"],
        [0, 1],
        "Rain and seeing a magpie might happen. A cat turning into a car won't happen. Christmas is always in December, so it will happen.",
      ),
    (n) => trueFalse(n, "If you toss a coin, it might land on heads.", true, "A coin can land on heads or tails, so heads might happen."),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 5 },
            { colour: "yellow", count: 1 },
          ],
        },
        choice(
          n,
          "Look at the bag. Which colour are you more likely to take without looking?",
          ["red", "yellow", "both the same"],
          0,
          "There are 5 red and only 1 yellow, so red is more likely.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from won't happen, to might happen, to will happen.",
        ["A pig flies over the school", "It rains today", "Night comes after day"],
        "Pigs can't fly (won't). Rain might happen. Night always comes after day (will).",
      ),
    (n) =>
      choice(
        n,
        "Ella rolls a dice with the numbers 1 to 6. Rolling a 7 is something that…",
        WILL,
        2,
        "There is no 7 on the dice, so it won't happen.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "green", "blue", "green"] },
        multi(
          n,
          "Look at the spinner. Which are true? Choose all that are right.",
          ["It might land on green", "It might land on blue", "It will land on red", "It won't land on red"],
          [0, 1, 3],
          "The spinner has green and blue parts, so either might happen. There is no red, so it won't land on red.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Today is Wednesday. Tomorrow is Saturday. Is this something that…",
        WILL,
        2,
        "The day after Wednesday is Thursday, so tomorrow won't be Saturday.",
      ),
    (n) =>
      choice(
        n,
        "Max has a bag of only blue counters. He wants taking a red counter to be something that might happen. What should he do?",
        ["Add more blue counters", "Add a red counter", "Do nothing"],
        1,
        "With no red counters, red won't happen. Adding a red counter means red might happen.",
      ),
  ],
});

/** MA1-CHAN-01: chance in everyday events (will happen, might happen, won't happen). */
export const CHANCE_2 = levels(1080316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "After 9 comes 10 when you count. Is this something that…",
        WILL,
        0,
        "When we count, 10 always comes after 9. It will happen.",
      ),
    (n) => choice(n, "A fish climbs a tree. Is this something that…", WILL, 2, "Fish live in water and can't climb, so this won't happen."),
    (n) => trueFalse(n, "'Will happen' means it is sure to happen.", true, "If something will happen, we know for sure it happens."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "blue", "blue", "blue", "blue"] },
        choice(n, "Look at the spinner. Landing on blue is something that…", WILL, 0, "All the parts are blue, so it will land on blue."),
      ),
    (n) =>
      choice(
        n,
        "You see a kookaburra on the way to school. Is this something that…",
        WILL,
        1,
        "Some days you see a kookaburra and some days you don't. It might happen.",
      ),
    (n) =>
      pic(
        { kind: "bag", counters: [{ colour: "orange", count: 6 }] },
        choice(
          n,
          "Lou takes a counter from the bag. Taking a purple counter is something that…",
          WILL,
          2,
          "All the counters are orange, so purple won't happen.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "yellow", count: 2 },
          ],
        },
        choice(
          n,
          "Sid takes a counter without looking. Taking a red counter is something that…",
          WILL,
          1,
          "There are red and yellow counters, so red might happen.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which will happen? Choose all that are right.",
        [
          "Winter comes after autumn",
          "You turn one year older on your next birthday",
          "You find a dinosaur egg",
          "Your team wins its next netball game",
        ],
        [0, 1],
        "Winter always follows autumn, and birthdays always make you one year older. A dinosaur egg won't happen. A win might happen.",
      ),
    (n) => trueFalse(n, "When you roll a dice, you might get a 6.", true, "A dice has 1 to 6 on it, so a 6 might come up."),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "yellow", "red", "red"] },
        choice(
          n,
          "Look at the spinner. Which colour is it more likely to land on?",
          ["red", "yellow", "both the same"],
          0,
          "3 parts are red and only 1 is yellow, so red is more likely.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from won't happen, to might happen, to will happen.",
        ["You swim to the moon", "You get a sticker today", "The sun sets tonight"],
        "Nobody can swim to the moon (won't). A sticker might happen. The sun sets every night (will).",
      ),
    (n) =>
      choice(
        n,
        "Ana picks a card from cards numbered 1, 2, 3 and 4. Getting a number less than 5 is something that…",
        WILL,
        0,
        "Every card is less than 5, so it will happen.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "blue", count: 3 },
          ],
        },
        multi(
          n,
          "Look at the bag. You take one counter. Which are true? Choose all that are right.",
          ["Taking red might happen", "Taking blue might happen", "Taking green won't happen", "Taking red will happen"],
          [0, 1, 2],
          "There are red and blue counters, so each might happen. There is no green, so green won't happen. Red is not sure, because you might get blue.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Jai says, 'It will rain at lunchtime tomorrow.' Which word should he use instead of 'will'?",
        ["might", "won't", "always"],
        0,
        "Nobody knows for sure if it will rain, so 'might' is the right word.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["green", "green", "green", "yellow"] },
        choice(
          n,
          "Look at the spinner. Mrs Lee wants landing on yellow to be something that won't happen. What should she do?",
          ["Change the yellow part to green", "Add another yellow part", "Do nothing"],
          0,
          "If there is no yellow at all, landing on yellow won't happen.",
        ),
      ),
  ],
});
