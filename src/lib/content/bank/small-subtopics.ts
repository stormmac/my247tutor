/**
 * Small subtopics: two extra sets of 15 questions for subtopics that had only a few hand-written
 * questions (or none), three at each level from very easy to very hard. Each subtopic keeps its
 * own number range, starting after its hand-written questions.
 */
import { choice, levels, multi, ordering, pic, read, trueFalse, typed } from "../spec";

/** Every reasonable way to type a division answer with a remainder, such as "5 r 3". */
const rem = (quotient: number, remainder: number) => [
  `${quotient} r ${remainder}`,
  `${quotient}r${remainder}`,
  `${quotient} remainder ${remainder}`,
  `${quotient} rem ${remainder}`,
];

/** MA3-MR-01: dividing with remainders, and interpreting remainders in context. */
export const REMAINDERS = levels(5020201, {
  very_easy: [
    (n) =>
      choice(n, "What is 17 ÷ 5?", ["3 r 2", "2 r 7", "3 r 5", "4 r 3"], 0, "5 × 3 = 15, and 17 − 15 = 2 left over. So 17 ÷ 5 = 3 r 2."),
    (n) =>
      pic(
        { kind: "bag", counters: [{ colour: "blue", count: 14 }] },
        typed(
          "short_answer",
          n,
          "These 14 counters are shared equally between 4 friends. How many counters are left over?",
          "2",
          "Each friend gets 3 counters, because 4 × 3 = 12. 14 − 12 = 2 counters are left over.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "When you divide by 6, the remainder can be 7.",
        false,
        "The remainder must be smaller than the number you divide by. A remainder of 7 has enough for one more group of 6.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 38 ÷ 7? Write it with r for the remainder, like 4 r 1.",
        rem(5, 3),
        "7 × 5 = 35, and 38 − 35 = 3 left over. So 38 ÷ 7 = 5 r 3.",
      ),
    (n) =>
      pic(
        { kind: "array", rows: 4, columns: 6 },
        typed(
          "short_answer",
          n,
          "Ava sets out 26 chairs in rows of 6. The picture shows the full rows. How many chairs are left over?",
          "2",
          "There are 4 full rows of 6, which is 24 chairs. 26 − 24 = 2 chairs are left over.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these divisions have a remainder of 1? Choose all that are right.",
        ["13 ÷ 4", "22 ÷ 3", "20 ÷ 5", "29 ÷ 7", "18 ÷ 2"],
        [0, 1, 3],
        "13 ÷ 4 = 3 r 1, 22 ÷ 3 = 7 r 1 and 29 ÷ 7 = 4 r 1. But 20 ÷ 5 = 4 and 18 ÷ 2 = 9 have nothing left over.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 157 ÷ 4? Write it with r for the remainder.",
        rem(39, 1),
        "4 × 30 = 120 leaves 37. 4 × 9 = 36 leaves 1. So 157 ÷ 4 = 39 r 1.",
      ),
    (n) =>
      choice(
        n,
        "A minibus seats 12 people. 50 students are going on an excursion to Taronga Zoo. How many minibuses are needed?",
        ["4", "4 r 2", "5", "6"],
        2,
        "50 ÷ 12 = 4 r 2. Four buses carry 48 students, and the 2 left over still need a seat, so you need 5 buses.",
      ),
    (n) => typed("fill_blank", n, "47 ÷ 6 = 7 r ___", "5", "6 × 7 = 42, and 47 − 42 = 5. So the remainder is 5."),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Jack has $45. Movie tickets cost $8 each. How many tickets can he buy?",
        ["5", "6", "5 r 5", "6 r 3"],
        0,
        "45 ÷ 8 = 5 r 5. Five tickets cost $40, and the $5 left over isn't enough for another ticket, so he can buy 5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A baker packs 250 bread rolls into bags of 6. How many rolls are left over after she fills as many bags as she can?",
        "4",
        "6 × 40 = 240 leaves 10. 6 × 1 = 6 leaves 4. So 250 ÷ 6 = 41 r 4, and 4 rolls are left over.",
      ),
    (n) =>
      ordering(
        n,
        "Put these divisions in order from the smallest remainder to the largest remainder.",
        ["20 ÷ 4", "25 ÷ 8", "38 ÷ 9", "45 ÷ 7"],
        "20 ÷ 4 = 5 r 0, 25 ÷ 8 = 3 r 1, 38 ÷ 9 = 4 r 2 and 45 ÷ 7 = 6 r 3.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 1543 ÷ 6? Write it with r for the remainder.",
        rem(257, 1),
        "6 × 200 = 1200 leaves 343. 6 × 50 = 300 leaves 43. 6 × 7 = 42 leaves 1. 200 + 50 + 7 = 257, so the answer is 257 r 1.",
      ),
    (n) =>
      choice(
        n,
        "What is 22 ÷ 4 written as a mixed number?",
        ["5 1/2", "5 1/4", "4 1/2", "6 1/2"],
        0,
        "22 ÷ 4 = 5 r 2. The 2 left over is 2 out of 4, which is 2/4 or 1/2. So 22 ÷ 4 = 5 1/2.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "I am thinking of a number between 30 and 40. When I divide it by 4, the remainder is 3. When I divide it by 5, there is no remainder. What is my number?",
        "35",
        "Numbers between 30 and 40 that 5 goes into exactly are 30 and 35 (40 is not between). 30 ÷ 4 = 7 r 2, but 35 ÷ 4 = 8 r 3. So the number is 35.",
      ),
  ],
});

/** MA3-MR-01: dividing with remainders, and deciding what to do with the remainder. */
export const REMAINDERS_2 = levels(5020216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "bag", counters: [{ colour: "red", count: 11 }] },
        choice(
          n,
          "These 11 counters are put into groups of 3. How many full groups are there, and how many are left over?",
          ["3 groups, 2 left over", "2 groups, 5 left over", "4 groups, 1 left over", "3 groups, 1 left over"],
          0,
          "3 groups of 3 is 9 counters. 11 − 9 = 2, which is not enough for another group. So 3 groups with 2 left over.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 29 ÷ 3? Write it with r for the remainder.",
        rem(9, 2),
        "3 × 9 = 27, and 29 − 27 = 2 left over. So 29 ÷ 3 = 9 r 2.",
      ),
    (n) => trueFalse(n, "35 ÷ 5 has no remainder.", true, "5 × 7 = 35 exactly, so nothing is left over."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "array", rows: 3, columns: 8 },
        typed(
          "short_answer",
          n,
          "Liam has 27 stickers. He sticks them in rows of 8. The picture shows the full rows. How many stickers are left over?",
          "3",
          "3 full rows of 8 is 24 stickers. 27 − 24 = 3 stickers are left over.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What is the largest remainder you can get when you divide by 9?",
        ["8", "9", "10", "1"],
        0,
        "The remainder must be less than 9. If 9 or more were left over, you could make another group of 9. So the largest is 8.",
      ),
    (n) => typed("fill_blank", n, "53 ÷ 8 = ___ r 5", "6", "8 × 6 = 48, and 48 + 5 = 53. So 53 ÷ 8 = 6 r 5."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 214 ÷ 3? Write it with r for the remainder.",
        rem(71, 1),
        "3 × 70 = 210 leaves 4. 3 × 1 = 3 leaves 1. So 214 ÷ 3 = 71 r 1.",
      ),
    (n) =>
      choice(
        n,
        "Tennis balls come in cans of 4. The coach has 70 balls. How many cans can she fill completely?",
        ["17", "18", "17 r 2", "16"],
        0,
        "70 ÷ 4 = 17 r 2. She fills 17 cans, and the 2 balls left over can't fill another can.",
      ),
    (n) => trueFalse(n, "86 ÷ 5 = 17 r 1", true, "5 × 17 = 85, and 86 − 85 = 1. So 86 ÷ 5 = 17 r 1 is right."),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Each table at a sausage sizzle seats 8 people. 115 guests are coming. How many tables are needed so everyone has a seat?",
        "15",
        "115 ÷ 8 = 14 r 3. 14 tables seat 112 people, and the 3 people left over need one more table. So 15 tables.",
      ),
    (n) =>
      multi(
        n,
        "Which of these divisions have a remainder of 3? Choose all that are right.",
        ["123 ÷ 5", "75 ÷ 4", "99 ÷ 6", "64 ÷ 7", "87 ÷ 9"],
        [0, 1, 2],
        "123 ÷ 5 = 24 r 3, 75 ÷ 4 = 18 r 3 and 99 ÷ 6 = 16 r 3. But 64 ÷ 7 = 9 r 1 and 87 ÷ 9 = 9 r 6.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Year group", "Students"],
          rows: [
            ["Year 5", 58],
            ["Year 6", 62],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. All the Year 5 and Year 6 students are put into teams of 9 for the sports carnival. How many students are left over?",
          "3",
          "58 + 62 = 120 students. 9 × 13 = 117, and 120 − 117 = 3. So 120 ÷ 9 = 13 r 3, and 3 students are left over.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is 2350 ÷ 7? Write it with r for the remainder.",
        rem(335, 5),
        "7 × 300 = 2100 leaves 250. 7 × 30 = 210 leaves 40. 7 × 5 = 35 leaves 5. 300 + 30 + 5 = 335, so the answer is 335 r 5.",
      ),
    (n) =>
      choice(
        n,
        "Four friends share 9 muffins equally. They cut up any leftover muffins so nothing is wasted. How much does each friend get?",
        ["2 1/4 muffins", "2 r 1 muffins", "2 muffins", "2 1/2 muffins"],
        0,
        "9 ÷ 4 = 2 r 1. Each friend gets 2 whole muffins, and the 1 muffin left over is cut into 4 quarters. So each gets 2 1/4.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A number divided by 7 gives 12 r 4. What is the number?",
        "88",
        "Work backwards: 12 groups of 7 is 84, then add the 4 left over. 84 + 4 = 88.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to thousandths. */
export const DECIMALS_ORDER = levels(5030306, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which decimal is the smallest?",
        ["0.9", "0.2", "0.7", "0.5"],
        1,
        "All of them have 0 ones, so compare the tenths. 2 tenths is the fewest, so 0.2 is the smallest.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 7 },
        trueFalse(
          n,
          "The dot on the number line is at 0.7.",
          true,
          "The line from 0 to 1 is cut into 10 jumps, so each jump is 0.1. The dot is 7 jumps along, which is 0.7.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type < or > to compare: 0.3 ___ 0.6",
        "<",
        "3 tenths is less than 6 tenths, so 0.3 < 0.6. The small, pointy end faces the smaller number.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from largest to smallest.",
        ["2.9", "2.6", "2.1", "1.8"],
        "1.8 has only 1 one, so it is smallest. The others have 2 ones, so compare the tenths: 2.9, 2.6, 2.1.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Swimmer", "Time (seconds)"],
          rows: [
            ["Mia", 34.6],
            ["Noah", 35.2],
            ["Ruby", 34.9],
          ],
        },
        choice(
          n,
          "Look at the table. Who swam the fastest?",
          ["Mia", "Noah", "Ruby"],
          0,
          "The fastest swimmer takes the least time. 34.6 is smaller than 34.9 and 35.2, so Mia was fastest.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "0.25 is greater than 0.3.",
        false,
        "0.3 is the same as 0.30. 25 hundredths is less than 30 hundredths, so 0.25 is smaller.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "number_line", from: 1, to: 2, jumps: 10, dotAt: 4 },
        typed(
          "short_answer",
          n,
          "What number does the dot on the number line show?",
          "1.4",
          "From 1 to 2 there are 10 jumps, so each jump is 0.1. The dot is 4 jumps past 1, so it is at 1.4.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are less than 0.6? Choose all that are right.",
        ["0.59", "0.61", "0.509", "0.6", "0.06"],
        [0, 2, 4],
        "Write them with three places: 0.590, 0.610, 0.509, 0.600 and 0.060. The ones under 0.600 are 0.59, 0.509 and 0.06.",
      ),
    (n) =>
      choice(
        n,
        "Which number is between 3.4 and 3.5?",
        ["3.45", "3.54", "3.05", "3.6"],
        0,
        "3.4 is 3.40 and 3.5 is 3.50. 3.45 is 45 hundredths after the 3, which fits between 40 and 50.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["4.08", "4.18", "4.8", "4.81"],
        "Write them with two places: 4.08, 4.18, 4.80, 4.81. Compare the tenths, then the hundredths.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Child", "Long jump (m)"],
          rows: [
            ["Sam", 2.35],
            ["Priya", 2.4],
            ["Leo", 2.305],
            ["Ava", 2.53],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. Who jumped the second-furthest?",
          "Priya",
          "Write the jumps with three places: 2.350, 2.400, 2.305, 2.530. From furthest: Ava (2.53), then Priya (2.4).",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Use the digits 4, 7 and 2 once each to make the smallest number you can with three decimal places, like 0.123.",
        "0.247",
        "Put the smallest digit in the tenths place, the next smallest in the hundredths and the largest in the thousandths: 0.247.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which number is closest to 1?",
        ["0.98", "1.03", "0.9", "1.1"],
        0,
        "0.98 is 0.02 below 1, 1.03 is 0.03 above, and 0.9 and 1.1 are both 0.1 away. So 0.98 is closest.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 5.6, to: 5.7, jumps: 10, dotAt: 8 },
        typed(
          "short_answer",
          n,
          "What number does the dot on the number line show?",
          "5.68",
          "From 5.6 to 5.7 is 10 hundredths, so each jump is 0.01. The dot is 8 jumps past 5.6, so it is at 5.68.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these numbers are between 0.3 and 0.31? Choose all that are right.",
        ["0.305", "0.35", "0.309", "0.299", "0.301"],
        [0, 2, 4],
        "Write the ends with three places: 0.300 and 0.310. 0.305, 0.309 and 0.301 fit between them. 0.35 (0.350) is too big and 0.299 is too small.",
      ),
  ],
});

/** MA3-RN-02: comparing and ordering decimals to thousandths in measurements and data. */
export const DECIMALS_ORDER_2 = levels(5030321, {
  very_easy: [
    (n) => trueFalse(n, "1.5 is greater than 1.2.", true, "Both have 1 one. 5 tenths is more than 2 tenths, so 1.5 is greater."),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 1, jumps: 10, dotAt: 9 },
        choice(
          n,
          "Which decimal does the dot on the number line show?",
          ["0.9", "9", "0.09", "0.1"],
          0,
          "Each of the 10 jumps from 0 to 1 is one tenth. The dot is 9 jumps along, so it is 0.9.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which number is the largest?",
        ["3.1", "1.3", "0.3", "1.1"],
        0,
        "Look at the ones first. 3.1 has 3 ones and the others have 1 or 0, so 3.1 is the largest.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Which is larger, 6.4 or 6.38?",
        "6.4",
        "More digits doesn't mean bigger. 6.4 is 6.40, and 40 hundredths is more than 38 hundredths, so 6.4 is larger.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Parcel", "Mass (kg)"],
          rows: [
            ["Parcel A", 1.7],
            ["Parcel B", 1.25],
            ["Parcel C", 1.6],
          ],
        },
        ordering(
          n,
          "Look at the table. Put the parcels in order from lightest to heaviest.",
          ["Parcel B", "Parcel C", "Parcel A"],
          "Write the masses with two places: 1.25, 1.60, 1.70. So B is lightest, then C, then A.",
        ),
      ),
    (n) =>
      typed("fill_blank", n, "0.5 = ___ hundredths", "50", "5 tenths is the same as 50 hundredths, because each tenth is 10 hundredths."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which number is between 0.7 and 0.8?",
        ["0.75", "0.07", "0.85", "0.078"],
        0,
        "0.7 is 0.70 and 0.8 is 0.80. 0.75 sits between them. 0.07 and 0.078 are less than 0.1, and 0.85 is too big.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 2, jumps: 20, dotAt: 13 },
        typed(
          "short_answer",
          n,
          "What number does the dot on the number line show?",
          "1.3",
          "From 0 to 2 there are 20 jumps, so each jump is 0.1. The dot is 13 jumps along, which is 1.3.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 0.4? Choose all that are right.",
        ["0.40", "0.400", "0.04", "four tenths", "4.0"],
        [0, 1, 3],
        "Zeros on the end after the decimal don't change the value, so 0.40 and 0.400 equal 0.4, and so does four tenths. 0.04 is 4 hundredths and 4.0 is 4 ones.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these decimals in order from smallest to largest.",
        ["0.065", "0.56", "0.6", "0.605"],
        "Write them with three places: 0.065, 0.560, 0.600, 0.605. Now compare them like whole numbers.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Day", "Rain (mm)"],
          rows: [
            ["Monday", 12.5],
            ["Tuesday", 12.05],
            ["Wednesday", 12.45],
            ["Thursday", 12.6],
          ],
        },
        choice(
          n,
          "Look at the table. On which day did the most rain fall?",
          ["Monday", "Tuesday", "Wednesday", "Thursday"],
          3,
          "Write them with two places: 12.50, 12.05, 12.45, 12.60. The largest is 12.60, so Thursday.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "3.09 is greater than 3.1, because 9 is bigger than 1.",
        false,
        "Compare the tenths first. 3.09 has 0 tenths and 3.1 has 1 tenth, so 3.1 is greater.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the smallest number with three decimal places that is greater than 0.6?",
        "0.601",
        "0.6 is 0.600. The next number with three decimal places is 1 thousandth more: 0.601.",
      ),
    (n) =>
      choice(
        n,
        "In a gymnastics event, the scores were 8.75, 8.7, 8.705 and 8.075. Which score came third?",
        ["8.7", "8.705", "8.075", "8.75"],
        0,
        "Write them with three places: 8.750, 8.700, 8.705, 8.075. From highest: 8.750, 8.705, 8.700, 8.075. Third is 8.7.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type the missing digit to make this true: 5.4___7 > 5.487",
        "9",
        "The ones and tenths are the same, so compare hundredths. 8 would give 5.487, which is equal, not greater. So the digit must be 9: 5.497.",
      ),
  ],
});

/** EN2-CWT-01: capital letters for sentences and names, and end punctuation (Year 3). */
export const CAPITALS = levels(3140106, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["the cat sat on the mat.", "The cat sat on the mat.", "The cat sat on the mat", "the cat sat on the mat"],
        1,
        "A sentence starts with a capital letter and ends with a full stop.",
      ),
    (n) =>
      trueFalse(
        n,
        "Every sentence should start with a capital letter.",
        true,
        "Yes. The capital letter shows where a new sentence begins.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type the mark that ends this sentence: We played cricket at lunch___",
        [".", "full stop"],
        "It's a telling sentence, not a question, so it ends with a full stop.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word in this sentence needs a capital letter? 'My friend lily has a pet rabbit.'",
        "lily",
        "Lily is a person's name, and names always start with a capital letter.",
      ),
    (n) =>
      multi(
        n,
        "Which of these words need a capital letter? Choose all that apply.",
        ["april", "koala", "canberra", "pencil", "christmas"],
        [0, 2, 4],
        "Months (April), places (Canberra) and special days (Christmas) always start with a capital letter. Koala and pencil are ordinary words.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence should end with an exclamation mark?",
        ["Watch out for that snake", "I have a blue bag", "What is your name", "We eat lunch at one"],
        0,
        "'Watch out for that snake!' is a warning that shows strong feeling, so it needs an exclamation mark.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which sentence uses capital letters correctly?",
        [
          "On Friday, Ben went to Bondi Beach.",
          "On friday, Ben went to Bondi beach.",
          "on Friday, ben went to Bondi Beach.",
          "On Friday, Ben Went to Bondi Beach.",
        ],
        0,
        "The first word, the day (Friday), the name (Ben) and the place (Bondi Beach) all need capitals. 'Went' does not.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["Last", "week", "we", "went", "to", "Dubbo."],
        "'Last' has the capital letter, so it comes first. 'Dubbo.' has the full stop, so it comes last.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many capital letters should this sentence have? 'on monday, sam and i went to the museum in sydney.'",
        "5",
        "On (first word), Monday (day), Sam (name), I (always a capital) and Sydney (place): 5 capitals.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the best way to write these two sentences?",
        [
          "I like apples. They are crunchy.",
          "I like apples they are crunchy.",
          "I like apples. they are crunchy.",
          "I like apples, They are crunchy.",
        ],
        0,
        "Each sentence needs its own capital letter and full stop: 'I like apples.' and 'They are crunchy.'",
      ),
    (n) =>
      multi(
        n,
        "Which of these sentences are punctuated correctly? Choose all that apply.",
        ["Can you help me?", "Where is my hat.", "The bus is late.", "Look out!", "what time is it?"],
        [0, 2, 3],
        "'Where is my hat' is a question, so it needs a question mark. 'what time is it?' needs a capital W.",
      ),
    (n) =>
      trueFalse(
        n,
        "In the sentence 'We saw a Kangaroo at the park.', the word 'Kangaroo' should have a capital letter.",
        false,
        "'Kangaroo' is not a name of a particular animal or place, so it doesn't need a capital: 'We saw a kangaroo at the park.'",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "How many sentences are in this text? 'The storm came at night. Rain hit the roof. Did you hear the thunder?'",
        ["1", "2", "3", "4"],
        2,
        "Count the end marks: two full stops and one question mark. That makes 3 sentences.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many capital letters are missing? 'we went camping at jervis bay. it rained all weekend.'",
        "4",
        "We (first word), Jervis Bay (a place, two capitals) and It (start of the second sentence): 4 capitals are missing.",
      ),
    (n) =>
      multi(
        n,
        "Which words in this sentence need a capital letter? 'last easter, my aunty took me to the royal easter show.' Choose all that apply.",
        ["last", "aunty", "royal", "show", "me"],
        [0, 2, 3],
        "'Last' starts the sentence, and 'Royal Easter Show' is the name of an event. 'My aunty' isn't a name, so 'aunty' stays small.",
      ),
  ],
});

/** EN2-CWT-01: capital letters for sentences, names, places and dates, and end punctuation (Year 3). */
export const CAPITALS_2 = levels(3140121, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word should start with a capital letter?",
        ["tom", "cup", "hot", "run"],
        0,
        "Tom is a person's name, so it needs a capital letter: Tom.",
      ),
    (n) =>
      trueFalse(
        n,
        "When the word 'I' means yourself, it is always a capital letter.",
        true,
        "We always write 'I' as a capital, like 'Mum and I went shopping.'",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type the mark that ends this question: Which bus goes to Bathurst___",
        ["?", "question mark"],
        "It's asking something, so it ends with a question mark.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word in this sentence needs a capital letter? 'Our school holidays start in july.'",
        "july",
        "July is the name of a month, and months always start with a capital letter.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["Koalas", "sleep", "in", "the", "day."],
        "'Koalas' has the capital letter, so it goes first. 'day.' has the full stop, so it goes last.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences end with the right mark? Choose all that apply.",
        ["Is it raining?", "I am eight years old.", "How old are you.", "Stop that dog!"],
        [0, 1, 3],
        "'How old are you' is a question, so it needs a question mark, not a full stop.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        [
          "Dad and I went fishing at Lake Macquarie.",
          "dad and i went fishing at lake Macquarie.",
          "Dad and i went fishing at Lake Macquarie.",
          "Dad and I went Fishing at Lake Macquarie.",
        ],
        0,
        "Capitals go on the first word, on 'I', and on the place name Lake Macquarie. 'Fishing' is an ordinary word.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many full stops does this text need? 'Our class has a garden we grow carrots and peas'",
        "2",
        "There are two ideas: 'Our class has a garden.' and 'We grow carrots and peas.' Each needs a full stop.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Uluru' should start with a capital letter because it is the name of a place.",
        true,
        "Names of special places, like Uluru, always start with a capital letter.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Where should the full stop go? 'The bell rang we lined up for assembly'",
        ["after 'rang'", "after 'we'", "after 'lined'", "after 'up'"],
        0,
        "'The bell rang.' is one sentence and 'We lined up for assembly.' is another. The full stop goes after 'rang'.",
      ),
    (n) =>
      multi(
        n,
        "Which words in this sentence need a capital letter? 'my teacher, mr lee, lives in newcastle.' Choose all that apply.",
        ["my", "teacher", "mr", "lee", "newcastle"],
        [0, 2, 3, 4],
        "'My' starts the sentence, 'Mr Lee' is a name, and 'Newcastle' is a place. 'Teacher' is an ordinary word.",
      ),
    (n) =>
      choice(
        n,
        "Which mark best ends this sentence? 'Hooray, we won the grand final'",
        ["an exclamation mark (!)", "a question mark (?)", "a comma (,)"],
        0,
        "'Hooray' shows strong, excited feeling, so an exclamation mark fits best.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which text is written correctly?",
        [
          "On Saturday we went to the beach. We swam in the waves.",
          "On saturday we went to the beach. we swam in the waves.",
          "On Saturday we went to the beach we swam in the waves.",
          "On Saturday. We went to the beach we swam in the waves.",
        ],
        0,
        "There are two sentences, each with a capital at the start and a full stop at the end, and 'Saturday' needs a capital.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the mistake. Which word should NOT have a capital letter? 'Last Week, Grace and I went to the zoo in Dubbo.'",
        "week",
        "'Week' is an ordinary word in the middle of the sentence, so it should be small: 'Last week'.",
      ),
    (n) =>
      trueFalse(
        n,
        "This is punctuated correctly: 'When is your birthday. Mine is in May?'",
        false,
        "The marks are swapped. It should be 'When is your birthday? Mine is in May.' The question gets the question mark.",
      ),
  ],
});

/** EN2-CWT-01: nouns, verbs and adjectives, noun groups and verb groups (Year 4). */
export const WORD_CLASSES = levels(4120106, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is a noun?",
        ["kangaroo", "quickly", "jumped", "soft"],
        0,
        "A noun names a person, place or thing. A kangaroo is a thing (an animal).",
      ),
    (n) => trueFalse(n, "'Happy' is an adjective.", true, "'Happy' describes a noun, like 'a happy child', so it is an adjective."),
    (n) =>
      choice(
        n,
        "Which word is a verb?",
        ["swim", "blue", "chair", "slowly"],
        0,
        "A verb is a doing word. You can swim, so 'swim' is a verb.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the adjective in this sentence? 'The hungry koala ate the leaves.'",
        "hungry",
        "An adjective describes a noun. 'Hungry' tells us what the koala was like.",
      ),
    (n) =>
      multi(
        n,
        "Which of these words are verbs? Choose all that apply.",
        ["kick", "shout", "green", "write", "garden"],
        [0, 1, 3],
        "Kick, shout and write are all things you can do. 'Green' is an adjective and 'garden' is a noun.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'swim' to finish the sentence: Yesterday we ___ at the beach.",
        "swam",
        "'Swim' doesn't add -ed. Its past tense is 'swam': Yesterday we swam at the beach.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word is a noun in this sentence? 'The tall girl threw the ball.'",
        ["girl", "tall", "threw", "the"],
        0,
        "'Girl' names a person, so it is a noun. 'Tall' describes her and 'threw' is what she did. ('Ball' is a noun too.)",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many nouns are in this sentence? 'The farmer fed the cows and the sheep.'",
        "3",
        "The nouns name a person and animals: farmer, cows and sheep. That is 3 nouns.",
      ),
    (n) =>
      multi(
        n,
        "Which of these words are adjectives? Choose all that apply.",
        ["shiny", "bright", "river", "sang", "old"],
        [0, 1, 4],
        "Shiny, bright and old describe nouns, like 'a shiny old bike'. 'River' is a noun and 'sang' is a verb.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "What is the verb group in this sentence? 'Max will paint the fence tomorrow.'",
        ["will paint", "the fence", "tomorrow", "Max"],
        0,
        "A verb group is the main verb and its helping verbs. 'Will paint' tells us what Max is going to do.",
      ),
    (n) =>
      choice(
        n,
        "In the sentence 'Dad will fish at the lake.', what kind of word is 'fish'?",
        ["verb", "noun", "adjective", "adverb"],
        0,
        "Here 'fish' is something Dad will do, so it is a verb. In 'I ate a fish', it would be a noun.",
      ),
    (n) =>
      trueFalse(
        n,
        "There are two adjectives in this sentence: 'The brave firefighter saved a frightened puppy.'",
        true,
        "'Brave' describes the firefighter and 'frightened' describes the puppy, so there are two adjectives.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Change the noun 'beauty' into an adjective to finish the sentence: The garden looks ___.",
        "beautiful",
        "Adding -ful turns the noun 'beauty' into the adjective 'beautiful' (the y changes to i).",
      ),
    (n) =>
      multi(
        n,
        "Which words are nouns in this sentence? 'Three noisy cockatoos landed on the old fence.' Choose all that apply.",
        ["cockatoos", "noisy", "fence", "landed", "old"],
        [0, 2],
        "Cockatoos and fence are things, so they are nouns. 'Noisy' and 'old' are adjectives and 'landed' is a verb.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order to make a noun group.",
        ["the", "three", "small", "green", "frogs"],
        "A noun group goes: little pointing word (the), number (three), size (small), colour (green), then the noun (frogs).",
      ),
  ],
});

/** EN2-CWT-01: nouns, verbs, adjectives and adverbs, and changing word classes (Year 4). */
export const WORD_CLASSES_2 = levels(4120121, {
  very_easy: [
    (n) =>
      multi(
        n,
        "Which of these words are nouns? Choose all that apply.",
        ["teacher", "pencil", "sing", "Brisbane", "under"],
        [0, 1, 3],
        "Nouns name people, things and places: teacher, pencil and Brisbane. 'Sing' is a verb.",
      ),
    (n) =>
      choice(
        n,
        "Which word is an adjective?",
        ["fluffy", "bark", "cat", "ran"],
        0,
        "'Fluffy' describes a noun, like 'a fluffy cat', so it is an adjective.",
      ),
    (n) => trueFalse(n, "In 'I jump high', the word 'jump' is a noun.", false, "'Jump' is what I do, so here it is a verb, not a noun."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the verb in this sentence? 'The wombat dug a deep hole.'",
        "dug",
        "'Dug' is what the wombat did, so it is the verb.",
      ),
    (n) =>
      choice(
        n,
        "Which adjective fits best? 'The ___ sun made us very hot.'",
        ["blazing", "freezing", "quietly", "jumped"],
        0,
        "We need a describing word that matches being hot. 'Blazing' fits. 'Freezing' is the opposite, and the others aren't adjectives.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'catch' to finish the sentence: Ruby ___ the ball at netball.",
        "caught",
        "'Catch' doesn't add -ed. Its past tense is 'caught'.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What kind of word is 'carefully' in this sentence? 'She carried the eggs carefully.'",
        ["adverb", "adjective", "noun", "verb"],
        0,
        "'Carefully' tells us how she carried the eggs. A word that tells how an action is done is an adverb.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many verbs are in this sentence? 'Ali ran to the shop, bought milk and walked home.'",
        "3",
        "Ali did three things: ran, bought and walked. That is 3 verbs.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are proper nouns (names that need a capital letter)? Choose all that apply.",
        ["Mia", "river", "Tasmania", "Monday", "cake"],
        [0, 2, 3],
        "Proper nouns name a particular person, place or day: Mia, Tasmania and Monday. 'River' and 'cake' are common nouns.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence has both an adjective and an adverb?",
        ["The small dog barked loudly.", "The dog barked.", "Dogs bark at night.", "The dog is in the yard."],
        0,
        "'Small' describes the dog (adjective) and 'loudly' tells how it barked (adverb).",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'The race was a win for our team.', the word 'win' is a verb.",
        false,
        "Here 'a win' is a thing the team got, so 'win' is a noun. In 'We win', it would be a verb.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Change the verb 'run' into a noun for a person: The fastest ___ won a medal.",
        "runner",
        "Adding -er makes a noun for the person who does it. Double the n first: run → runner.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these words in order to make a noun group.",
        ["two", "fluffy", "white", "lambs"],
        "Number first (two), then what it is like (fluffy), then colour (white), and the noun (lambs) comes last.",
      ),
    (n) =>
      choice(
        n,
        "In 'The crowd cheered as the batter hit a six.', which list has only nouns?",
        ["crowd, batter, six", "cheered, hit", "crowd, cheered, six", "batter, hit, six"],
        0,
        "Crowd, batter and six are things or people. 'Cheered' and 'hit' are verbs (things that were done).",
      ),
    (n) =>
      multi(
        n,
        "Which words are adjectives in this sentence? 'After the long game, the tired players drank cold water.' Choose all that apply.",
        ["long", "game", "tired", "drank", "cold"],
        [0, 2, 4],
        "Long describes the game, tired describes the players and cold describes the water. 'Game' is a noun and 'drank' is a verb.",
      ),
  ],
});

/** EN2-CWT-01: building complete sentences, joining ideas with conjunctions and sequencing events (Year 4). */
export const BUILDING_SENTENCES = levels(4120204, {
  very_easy: [
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["My", "cat", "sleeps", "on", "the", "bed."],
        "'My' has the capital letter so it starts, and 'bed.' has the full stop so it ends: My cat sleeps on the bed.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a complete sentence?",
        ["The bird flew away.", "The bird.", "Flew away.", "Away the."],
        0,
        "A complete sentence says who or what (the bird) and what happened (flew away), and it makes sense on its own.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Running down the road' is a complete sentence.",
        false,
        "We don't know who is running, so it doesn't make sense on its own. 'Ella was running down the road.' is complete.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which joining word fits best? 'I was hungry ___ I ate an apple.'",
        ["so", "but", "or", "because"],
        0,
        "Being hungry led to eating an apple. 'So' shows what happened as a result.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for making toast in order.",
        ["Put the bread in the toaster.", "Wait for it to pop up.", "Spread butter on the toast.", "Eat the toast."],
        "You toast the bread first, wait for it, butter it, and eat it last.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type a joining word: I wanted to play outside ___ it was raining.",
        ["but", "yet"],
        "The two ideas don't go together (wanting to play, but rain), so 'but' joins them.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["After", "school,", "Lily", "practised", "her", "netball", "skills."],
        "'After' has the capital, so it starts. The comma after 'school' shows where the time part ends: After school, Lily practised her netball skills.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are complete sentences? Choose all that apply.",
        ["The koala climbed the gum tree.", "Under the bridge.", "Sam laughed.", "Because it was cold.", "The waves crashed."],
        [0, 2, 4],
        "Each complete sentence tells who or what and what they did. 'Under the bridge.' and 'Because it was cold.' don't make sense alone.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word joins the two ideas in this sentence? 'We stayed inside because it was too hot.'",
        "because",
        "'Because' joins 'We stayed inside' to the reason, 'it was too hot'.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these sentences from a recount in order.",
        [
          "First, we caught the bus to the museum.",
          "Next, we looked at the dinosaur bones.",
          "After lunch, we visited the gift shop.",
          "Finally, we travelled back to school.",
        ],
        "The time words show the order: First, Next, After lunch, then Finally.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence joins these two ideas best? 'The dog was muddy. Mum gave it a bath.'",
        [
          "The dog was muddy, so Mum gave it a bath.",
          "The dog was muddy, but Mum gave it a bath.",
          "The dog was muddy or Mum gave it a bath.",
          "Mum gave the dog a bath, so it was muddy.",
        ],
        0,
        "The mud is the reason for the bath. 'So' shows the bath happened because the dog was muddy.",
      ),
    (n) =>
      trueFalse(
        n,
        "'When the bell rang.' is a complete sentence.",
        false,
        "It leaves us asking 'What happened when the bell rang?' It needs more, like 'When the bell rang, we went inside.'",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these parts in order to make a sentence.",
        ["Although it was raining,", "we", "still", "went", "swimming."],
        "'Although' has the capital and the comma ends that part, so it comes first: Although it was raining, we still went swimming.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a run-on sentence that needs fixing?",
        [
          "I finished my homework I went to bed.",
          "I finished my homework, then I went to bed.",
          "After I finished my homework, I went to bed.",
          "I finished my homework and went to bed.",
        ],
        0,
        "Two complete ideas are squashed together with nothing joining them. It needs a full stop or a joining word.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type one joining word: You can have pasta ___ you can have pizza, but not both.",
        "or",
        "'Or' joins two choices when you can only pick one.",
      ),
  ],
});

/** EN2-CWT-01: complete sentences, conjunctions, word order and sequencing events (Year 4). */
export const BUILDING_SENTENCES_2 = levels(4120219, {
  very_easy: [
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["The", "emu", "ran", "very", "fast."],
        "'The' has the capital letter and 'fast.' has the full stop: The emu ran very fast.",
      ),
    (n) =>
      choice(
        n,
        "Which word makes the sentence make sense? 'I brush my ___ every morning.'",
        ["teeth", "jump", "happy", "quickly"],
        0,
        "We need a thing you can brush. 'I brush my teeth every morning.' makes sense.",
      ),
    (n) => trueFalse(n, "A sentence must make sense on its own.", true, "Yes. A sentence is a complete idea that makes sense by itself."),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put these steps for planting a seed in order.",
        ["Dig a small hole.", "Drop the seed in the hole.", "Cover it with soil.", "Water it every day."],
        "You need a hole before the seed goes in, then you cover it, and then you water it.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word joins the two ideas? 'I like apples and I like pears.'",
        "and",
        "'And' joins two ideas that go together.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is NOT a complete sentence?",
        ["In the morning before school.", "We walked to the park.", "Grandpa told a funny joke.", "The sun is shining."],
        0,
        "'In the morning before school.' tells when, but not who did what. It doesn't make sense alone.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type a joining word that gives a reason: I put on my raincoat ___ it was raining.",
        ["because", "as", "since"],
        "The rain is the reason for the raincoat. 'Because' joins the action to its reason.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["Every", "Saturday,", "Jake", "plays", "cricket", "with", "his", "dad."],
        "'Every' has the capital, the comma ends the time part, and 'dad.' has the full stop: Every Saturday, Jake plays cricket with his dad.",
      ),
    (n) =>
      multi(
        n,
        "Which of these joining words can give a reason? Choose all that apply.",
        ["because", "since", "but", "or", "and"],
        [0, 1],
        "'Because' and 'since' give a reason, like 'since it was late'. 'But' shows a difference, 'or' a choice and 'and' adds on.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the best way to join 'The film was long.' and 'We enjoyed it.'?",
        [
          "The film was long, but we enjoyed it.",
          "The film was long, so we enjoyed it.",
          "The film was long because we enjoyed it.",
          "The film was long or we enjoyed it.",
        ],
        0,
        "You might expect a long film to be boring, but they enjoyed it. 'But' joins two ideas that contrast.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to tell the story.",
        [
          "One sunny morning, Ari found a map in the attic.",
          "He followed the map to the old fig tree.",
          "He dug under the roots and found a tin box.",
          "Inside the box was a note from his grandpa.",
        ],
        "Ari must find the map before he can follow it, dig, and open the box.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many complete sentences are here? 'The storm hit the town. Trees fell over. While the power was out. People lit candles.'",
        "3",
        "'While the power was out.' doesn't make sense alone, so it isn't a complete sentence. The other 3 are.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence has its words in a sensible order?",
        [
          "Before she went to bed, Zara read a book.",
          "Zara read a book before bed she went to.",
          "Before bed she, Zara read a book went.",
          "Read a book Zara before she went to bed.",
        ],
        0,
        "'Before she went to bed' tells when, and 'Zara read a book' tells who did what. The others are jumbled.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences join two ideas correctly? Choose all that apply.",
        [
          "I was tired, so I went to bed early.",
          "I was tired I went to bed early.",
          "Because I was tired, I went to bed early.",
          "I went to bed early because I was tired.",
          "I was tired, I went to bed early.",
        ],
        [0, 2, 3],
        "Two complete ideas need a joining word like 'so' or 'because'. A comma alone, or nothing at all, isn't enough.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you move 'when the siren sounds' to the start of 'We leave the pool when the siren sounds.', you need a comma after it.",
        true,
        "When the 'when' part comes first, a comma marks where it ends: When the siren sounds, we leave the pool.",
      ),
  ],
});

/** EN3-CWT-01: apostrophes for contractions and for possession, singular and plural (Year 5). */
export const APOSTROPHES = levels(5140106, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the short form (contraction) of 'I am'?",
        ["I'm", "Im'", "I'am", "Ia'm"],
        0,
        "The apostrophe goes where the letter a is left out: I am → I'm.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'Lucy's hat', the apostrophe shows that the hat belongs to Lucy.",
        true,
        "Adding 's to a name shows that something belongs to that person.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the short form (contraction) of 'is not': ___",
        "isn't",
        "Join 'is' and 'not', and put an apostrophe where the o is left out: isn't.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "The ball belongs to Jack. Which is correct?",
        ["Jack's ball", "Jacks ball", "Jacks' ball", "Ja'cks ball"],
        0,
        "Jack is one owner, so add 's: Jack's ball.",
      ),
    (n) =>
      multi(
        n,
        "Which of these words are contractions? Choose all that apply.",
        ["won't", "she'll", "cats", "you've", "happy"],
        [0, 1, 3],
        "won't (will not), she'll (she will) and you've (you have) are short forms. 'Cats' is just a plural.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the long form of 'couldn't'.",
        "could not",
        "The apostrophe stands for the missing o in 'not', so couldn't means 'could not'.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "The nests belong to several birds. Which is correct?",
        ["the birds' nests", "the bird's nests", "the birds nests", "the birds's nests"],
        0,
        "There is more than one bird, and 'birds' already ends in s. So just add an apostrophe after the s: the birds' nests.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Its' and 'it's' mean the same thing.",
        false,
        "'It's' is short for 'it is' or 'it has'. 'Its' (no apostrophe) means belonging to it.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses the apostrophe correctly?",
        [
          "The children's toys were everywhere.",
          "The childrens' toys were everywhere.",
          "The childrens toys' were everywhere.",
          "The children,s toys were everywhere.",
        ],
        0,
        "'Children' is already plural and doesn't end in s, so add 's: children's.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "One word in this sentence needs an apostrophe: 'Its going to rain today.' Write that word correctly.",
        "it's",
        "The sentence means 'It is going to rain', so it needs the contraction it's.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is correct?",
        ["The team won its first game.", "The team won it's first game.", "The team won its' first game.", "The team won i'ts first game."],
        0,
        "The game belongs to the team, so use 'its' with no apostrophe. 'It's' would mean 'it is'.",
      ),
    (n) =>
      multi(
        n,
        "Which of these show something belonging to more than one owner? Choose all that apply.",
        ["the girls' change room", "the girl's bag", "the teachers' lounge", "the men's toilets", "the dog's lead"],
        [0, 2, 3],
        "girls' and teachers' have the apostrophe after the plural s. 'Men' is already plural, so men's is many owners too.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The Smiths' car is red.' What does the apostrophe tell you?",
        [
          "The car belongs to the Smith family.",
          "The car belongs to one person called Smith.",
          "There are many cars.",
          "The Smiths own several cars.",
        ],
        0,
        "'Smiths' means the whole Smith family. The apostrophe after the s shows the car belongs to them all.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many apostrophes are missing from this sentence? 'Wed love to see Sams new puppy, but its asleep.'",
        "3",
        "We'd (we would), Sam's (the puppy belongs to Sam) and it's (it is). That is 3 apostrophes.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the short form (contraction) of 'they had': ___",
        "they'd",
        "'Had' shortens to 'd, so they had → they'd. (They'd can also mean 'they would'.)",
      ),
  ],
});

/** EN3-CWT-01: apostrophes in contractions, possession and the its/it's and who's/whose pairs (Year 5). */
export const APOSTROPHES_2 = levels(5140121, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the short form (contraction) of 'we will'?",
        ["we'll", "wel'l", "we'ill", "weel"],
        0,
        "The 'wi' of 'will' is left out, and the apostrophe goes in its place: we'll.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the short form (contraction) of 'has not': ___",
        "hasn't",
        "Join the words and put the apostrophe where the o of 'not' is left out: hasn't.",
      ),
    (n) =>
      trueFalse(
        n,
        "The word 'apples' in 'I bought three apples.' needs an apostrophe.",
        false,
        "'Apples' just means more than one apple. Plurals don't need an apostrophe.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the long form of 'you're'.",
        "you are",
        "The apostrophe stands for the missing a: you're means 'you are'.",
      ),
    (n) =>
      choice(
        n,
        "The tail belongs to the kangaroo. Which is correct?",
        ["the kangaroo's tail", "the kangaroos tail", "the kangaroos' tail", "the kangaroo,s tail"],
        0,
        "There is one kangaroo, so add 's: the kangaroo's tail.",
      ),
    (n) =>
      multi(
        n,
        "Which of these sentences are correct? Choose all that apply.",
        ["Mum's car is blue.", "I've finished.", "The cat's are hungry.", "She's my sister.", "The bus'es are late."],
        [0, 1, 3],
        "Mum's shows belonging, and I've and she's are contractions. 'Cats' and 'buses' are just plurals, so no apostrophe.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word fills the gap? '___ coming to the sausage sizzle?'",
        ["Who's", "Whose", "Whos", "Who'se"],
        0,
        "The sentence means 'Who is coming?', so use the contraction who's. 'Whose' asks who owns something.",
      ),
    (n) =>
      choice(
        n,
        "The lockers belong to all the students. Which is correct?",
        ["the students' lockers", "the student's lockers", "the students lockers", "the students's lockers"],
        0,
        "Many students own them, and 'students' ends in s, so the apostrophe goes after the s: the students' lockers.",
      ),
    (n) =>
      trueFalse(
        n,
        "The apostrophe is used correctly in 'The dog's are barking.'",
        false,
        "Nothing belongs to the dogs here; there are just many dogs. It should be 'The dogs are barking.'",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word fills the gap? 'The koala hugged ___ baby.'",
        ["its", "it's", "its'", "it is"],
        0,
        "The baby belongs to the koala, so use 'its' with no apostrophe. 'It's' means 'it is'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word in this sentence needs an apostrophe? 'The womens team won the netball final.'",
        ["women's", "womens"],
        "The team belongs to the women. 'Women' is already plural, so add 's: the women's team.",
      ),
    (n) =>
      multi(
        n,
        "Which of these contractions are written correctly? Choose all that apply.",
        ["should've", "would'nt", "they're", "does'nt", "I'd"],
        [0, 2, 4],
        "The apostrophe goes where letters are missing. In wouldn't and doesn't, the o of 'not' is missing, so it goes between n and t.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The players' boots were muddy.' How many players is this about?",
        ["more than one player", "exactly one player", "no players", "you can't tell"],
        0,
        "The apostrophe comes after the s in 'players', which shows the boots belong to more than one player.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The toys belong to the babies. Write it with an apostrophe: the ___ toys",
        "babies'",
        "'Babies' is plural and ends in s, so just add an apostrophe after it: the babies' toys.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses apostrophes correctly?",
        [
          "James's brother doesn't like the twins' dog.",
          "James brother does'nt like the twins dog.",
          "James's brother doesnt like the twin's' dog.",
          "Jame's brother doesn't like the twins dog.",
        ],
        0,
        "James's shows the brother is his, doesn't is 'does not', and twins' shows the dog belongs to both twins.",
      ),
  ],
});

const STORM = {
  title: "The Storm",
  text:
    "The afternoon had been as still as a held breath. Then, out over the ranges, the sky began to bruise. Purple clouds rolled in like a herd of giant buffalo, shouldering each other across the horizon.\n\n" +
    "Nina dragged the washing off the line as the first drops spat against the tin roof. Plink. Plonk. Then a thousand drummers joined in. The old gum tree by the shed groaned and waved its arms, begging the wind to leave it alone.\n\n" +
    "Inside, the house was a cave. The power had gone, and the candles flickered nervously on the kitchen table. Dad said the rain was heavy enough to fill the Pacific Ocean twice. Nina laughed, but she kept one eye on the window.\n\n" +
    "By morning, the storm had crept away. The paddocks sparkled, and the air smelt brand new. A magpie sat on the fence, warbling as if nothing had happened at all.",
};

/** EN3-UARL-01: similes, metaphors, personification, onomatopoeia, alliteration and hyperbole, and their effect. */
export const FIGURATIVE = levels(6120106, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is an example of onomatopoeia?",
        ["bang", "table", "quickly", "blue"],
        0,
        "Onomatopoeia is a word that sounds like the noise it names. 'Bang' sounds like a bang.",
      ),
    (n) =>
      trueFalse(
        n,
        "A metaphor says one thing IS another thing, without using 'like' or 'as'.",
        true,
        "For example, 'My bedroom is a pigsty' is a metaphor. With 'like' or 'as', it would be a simile.",
      ),
    (n) =>
      choice(
        n,
        "'He was as tall as a tree.' What kind of figurative language is this?",
        ["simile", "metaphor", "onomatopoeia", "personification"],
        0,
        "It compares him to a tree using 'as', so it is a simile.",
      ),
  ],
  easy: [
    (n) =>
      read(
        STORM,
        choice(
          n,
          "'Purple clouds rolled in like a herd of giant buffalo.' What technique is the writer using?",
          ["simile", "metaphor", "onomatopoeia", "alliteration"],
          0,
          "The clouds are compared to buffalo using the word 'like', so it is a simile.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the name for repeating the same first sound in words close together, as in 'slippery snakes slither silently'?",
        "alliteration",
        "Repeating the first sound (here the s sound) is called alliteration.",
      ),
    (n) =>
      choice(
        n,
        "'I've told you a million times!' What kind of figurative language is this?",
        ["hyperbole", "simile", "onomatopoeia", "alliteration"],
        0,
        "Nobody has said something a million times. A huge exaggeration for effect is called hyperbole.",
      ),
  ],
  medium: [
    (n) =>
      read(
        STORM,
        multi(
          n,
          "Which phrases from the story use personification? Choose all that apply.",
          [
            "the old gum tree groaned and waved its arms",
            "the candles flickered nervously",
            "the house was a cave",
            "Plink. Plonk.",
            "the storm had crept away",
          ],
          [0, 1, 4],
          "Trees can't really groan and beg, candles can't feel nervous, and storms can't creep. These give human actions to things. 'The house was a cave' is a metaphor and 'Plink. Plonk.' is onomatopoeia.",
        ),
      ),
    (n) =>
      choice(
        n,
        "'My brother is a couch potato.' What does this metaphor mean?",
        ["He is lazy and sits around watching TV a lot.", "He likes eating potatoes.", "He is shaped like a potato.", "He sleeps outside."],
        0,
        "A couch potato is someone who lazes on the couch. The metaphor doesn't mean he is really a potato.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Add one word to turn this metaphor into a simile: Her smile was ___ sunshine.",
        "like",
        "Adding 'like' makes a comparison: 'Her smile was like sunshine.' Similes use 'like' or 'as'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses personification?",
        [
          "The angry ocean swallowed the sandcastle.",
          "The ocean was as blue as a sapphire.",
          "The ocean is a giant bathtub.",
          "Splash went the ocean.",
        ],
        0,
        "An ocean can't feel angry or swallow, so the writer gives it human qualities. The others are a simile, a metaphor and onomatopoeia.",
      ),
    (n) =>
      multi(
        n,
        "Which of these sentences contain a metaphor? Choose all that apply.",
        [
          "Time is a thief.",
          "The car was as red as a tomato.",
          "Mr Baker is a walking dictionary.",
          "The wind whispered through the trees.",
          "Our backyard was a jungle after the rain.",
        ],
        [0, 2, 4],
        "These say one thing IS another. 'As red as a tomato' is a simile, and a whispering wind is personification.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word in this sentence is onomatopoeia? 'The door creaked open slowly in the dark.'",
        ["creaked", "creak"],
        "'Creaked' sounds like the noise an old door makes, so it is onomatopoeia.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        STORM,
        choice(
          n,
          "Why does the writer say the sky 'began to bruise'?",
          [
            "The sky was turning dark purple like a bruise, hinting that something rough was coming.",
            "Something had hit the sky and hurt it.",
            "The sun was setting and the sky was turning orange.",
            "Nina had hurt herself while the storm was coming.",
          ],
          0,
          "A bruise is dark purple and comes after a hit. The metaphor shows the colour of the storm clouds and builds a feeling that the storm will be rough.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Name the technique in this sentence: 'Lightning is the sky's camera flash.'",
        "metaphor",
        "It says lightning IS a camera flash, without 'like' or 'as', so it is a metaphor.",
      ),
    (n) =>
      multi(
        n,
        "Which two techniques are both used in 'The hungry fire roared like a lion'? Choose all that apply.",
        ["personification", "simile", "alliteration", "hyperbole"],
        [0, 1],
        "A fire can't be hungry, so that is personification. 'Like a lion' compares the fire to a lion, so that is a simile.",
      ),
  ],
});

const GRANDPAS_UTE = {
  title: "Grandpa's Ute",
  text:
    "Grandpa's ute was older than the hills, or so he liked to tell us. It lived in the shed at the end of the driveway, sleeping under a blanket of dust.\n\n" +
    "Every Saturday he would wake it up. The engine coughed and spluttered, then growled like a grumpy old dog before it finally settled into a steady purr. Rust freckled its doors, and one headlight winked because the bulb had blown years ago.\n\n" +
    "We bounced along the dirt road to the river, the ute rattling and clanking over every rut. Grandpa drove with one elbow out the window, humming tunes that were as ancient as the ute itself.\n\n" +
    "At the river, the water was a mirror, holding the clouds perfectly still. Grandpa would switch off the engine, and the ute would sigh, tick, tick, tick, as it cooled down in the shade of the river gums.\n\n" +
    "'She's a beauty,' Grandpa would say, patting the bonnet. To him, she was.",
};

/** EN3-UARL-01: figurative language and imagery in literature, and how it shapes meaning and mood. */
export const FIGURATIVE_2 = levels(6120121, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is a simile?",
        ["The puppy was as soft as a cloud.", "The puppy is soft.", "The puppy went 'woof'.", "The puppy was a cloud."],
        0,
        "A simile compares two things using 'like' or 'as': as soft as a cloud.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Crunch' is an example of onomatopoeia.",
        true,
        "'Crunch' sounds like the noise of biting into something crisp, so it is onomatopoeia.",
      ),
    (n) =>
      choice(
        n,
        "What is personification?",
        [
          "giving human actions or feelings to something that isn't human",
          "comparing two things using 'like' or 'as'",
          "a word that sounds like the noise it names",
          "repeating the same first sound in nearby words",
        ],
        0,
        "Personification makes a thing act like a person, as in 'the trees danced in the wind'.",
      ),
  ],
  easy: [
    (n) =>
      read(
        GRANDPAS_UTE,
        choice(
          n,
          "Grandpa says his ute is 'older than the hills'. What kind of figurative language is this?",
          ["hyperbole", "onomatopoeia", "simile", "alliteration"],
          0,
          "A ute can't really be older than hills. It is a big exaggeration to show the ute is very old, which is hyperbole.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Name the technique: 'Pete picked a pile of purple plums.'",
        "alliteration",
        "Most of the words start with the same p sound. Repeating the first sound is alliteration.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A word like 'whoosh' that sounds like the noise it names is called ___.",
        ["onomatopoeia", "onomatopoeic"],
        "Words that copy sounds, like whoosh, thud and splash, are called onomatopoeia.",
      ),
  ],
  medium: [
    (n) =>
      read(
        GRANDPAS_UTE,
        multi(
          n,
          "Which phrases from the story use personification? Choose all that apply.",
          [
            "sleeping under a blanket of dust",
            "one headlight winked",
            "the ute would sigh",
            "the water was a mirror",
            "rattling and clanking",
          ],
          [0, 1, 2],
          "Sleeping, winking and sighing are things people do, so they give the ute human actions. 'The water was a mirror' is a metaphor and 'rattling and clanking' is onomatopoeia.",
        ),
      ),
    (n) =>
      choice(
        n,
        "'It's raining cats and dogs.' What does this saying mean?",
        ["It is raining very heavily.", "Animals are falling from the sky.", "It is only drizzling.", "Pets don't like the rain."],
        0,
        "This is an idiom. It doesn't mean real animals. It means the rain is very heavy.",
      ),
    (n) =>
      trueFalse(
        n,
        "'The wind was like a howling wolf' is a metaphor.",
        false,
        "It uses 'like' to compare the wind to a wolf, so it is a simile, not a metaphor.",
      ),
  ],
  hard: [
    (n) =>
      read(
        GRANDPAS_UTE,
        choice(
          n,
          "'At the river, the water was a mirror.' What does this tell you about the river?",
          [
            "It was calm and smooth enough to reflect the sky.",
            "It was made of glass.",
            "It was very deep and dangerous.",
            "It was frozen solid.",
          ],
          0,
          "A mirror is flat and shows reflections. The metaphor tells us the water was so still that the clouds showed in it.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a simile.",
        ["The", "moon", "hung", "like", "a", "silver", "coin."],
        "'The' has the capital and 'coin.' has the full stop: The moon hung like a silver coin.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses a metaphor to show that Mia is very brave?",
        ["Mia was a lion on the rugby field.", "Mia was as brave as a lion.", "Mia was brave.", "Mia roared at the crowd."],
        0,
        "'Mia was a lion' says she IS a lion, without 'like' or 'as'. 'As brave as a lion' is a simile.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A writer wants readers to feel that a forest is scary. Which sentence does this best?",
        [
          "Twisted branches clawed at the darkening sky.",
          "The tall trees swayed in the breeze.",
          "The forest was as green as grass.",
          "Birds tweeted happily in the trees.",
        ],
        0,
        "'Clawed' makes the branches seem like a monster's claws, and 'darkening' adds a gloomy mood. The others feel calm or happy.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Name the technique in this sentence: 'The streetlights blinked awake one by one.'",
        "personification",
        "Streetlights can't blink or wake up like a person, so this is personification.",
      ),
    (n) =>
      multi(
        n,
        "Which of these sentences use hyperbole? Choose all that apply.",
        [
          "I'm so hungry I could eat a horse.",
          "This homework will take a hundred years!",
          "The cake was delicious.",
          "My backpack weighs more than an elephant.",
          "The dog ran quickly.",
        ],
        [0, 1, 3],
        "These are huge exaggerations nobody means literally. 'The cake was delicious' and 'The dog ran quickly' are plain statements.",
      ),
  ],
});
