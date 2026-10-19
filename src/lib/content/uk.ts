import type { Subject, YearLevel } from "../curriculum/types";
import type { TopicSpec } from "./us";

/**
 * England's National Curriculum, Years 1–6, as the UK curriculum. Like the US tree it has no
 * questions of its own: each topic is a programme of study heading (such as "Number – place
 * value") holding NSW subtopics, by their number as in tree.ts. curricula.ts turns the text into
 * UK English, with pounds and pence. Each NSW subtopic appears at most once.
 *
 * The National Curriculum has no official codes, so a subtopic's code is its year and heading,
 * such as "Y3 Place value". Chance and probability aren't in the primary curriculum, so they're left out.
 */
const topic = (subject: Subject, grade: YearLevel, title: string, description: string, subtopics: number[]): TopicSpec => ({
  subject,
  grade,
  title,
  description,
  subtopics: subtopics.map((n) => [n, `Y${grade} ${title}`]),
});

const PLACE_VALUE = "Counting, reading, writing, comparing and ordering numbers.";
const ADD_SUB = "Adding and subtracting, in your head and written down, and solving problems.";
const MULT_DIV = "Times tables, multiplying, dividing and solving problems.";
const FRACTIONS = "Recognising, comparing and finding fractions of shapes and amounts.";
const MEASUREMENT = "Length, mass, capacity, time and money.";
const SHAPES = "2-D and 3-D shapes, their sides, faces and angles.";
const POSITION = "Describing position, direction, movement and coordinates.";
const STATISTICS = "Tally charts, pictograms, tables and graphs.";

const maths = (grade: YearLevel, title: string, description: string, subtopics: number[]) =>
  topic("maths", grade, title, description, subtopics);
const english = (grade: YearLevel, title: string, description: string, subtopics: number[]) =>
  topic("english", grade, title, description, subtopics);

const WORD_READING = "Phonics, and reading words accurately and quickly.";
const COMPREHENSION = "Understanding and talking about what you read, and the meanings of words.";
const SPELLING = "Spelling, and the rules and patterns behind it.";
const COMPOSITION = "Planning, writing and improving stories and other texts.";
const GRAMMAR = "Vocabulary, grammar and punctuation.";

export const UK_TOPIC_SPECS: TopicSpec[] = [
  // ---------- Mathematics ----------
  maths(1, "Place value", PLACE_VALUE, [10101, 10102]),
  maths(1, "Addition and subtraction", ADD_SUB, [10201]),
  maths(1, "Multiplication and division", MULT_DIV, [10301]),
  maths(1, "Fractions", FRACTIONS, [10401]),
  maths(1, "Measurement", MEASUREMENT, [10501, 10503, 10504, 10601]),
  maths(1, "Properties of shapes", SHAPES, [10701, 10702]),
  maths(1, "Position and direction", POSITION, [10703]),

  maths(2, "Place value", PLACE_VALUE, [20101, 20102]),
  maths(2, "Addition and subtraction", ADD_SUB, [20201]),
  maths(2, "Multiplication and division", MULT_DIV, [20301]),
  maths(2, "Fractions", FRACTIONS, [20401]),
  maths(2, "Measurement", MEASUREMENT, [20501, 20503, 20504, 20601]),
  maths(2, "Properties of shapes", SHAPES, [20701, 20702]),
  maths(2, "Position and direction", POSITION, [20703]),
  maths(2, "Statistics", STATISTICS, [10801, 10802, 20801, 20802]),

  maths(3, "Place value", PLACE_VALUE, [30101]),
  maths(3, "Addition and subtraction", ADD_SUB, [30201, 30202]),
  maths(3, "Multiplication and division", MULT_DIV, [30301, 30302]),
  maths(3, "Fractions", "Fractions of shapes and amounts, and counting in tenths.", [30501, 30102]),
  maths(3, "Measurement", "Length, mass, capacity, perimeter and telling the time.", [30401, 30402, 30403, 30404]),
  maths(3, "Properties of shapes", "2-D and 3-D shapes, and right angles.", [30701, 30703, 30704]),
  maths(3, "Statistics", STATISTICS, [30601, 30603]),

  maths(4, "Place value", PLACE_VALUE, [40401]),
  maths(4, "Addition and subtraction", ADD_SUB, [40501, 40502]),
  maths(4, "Multiplication and division", "Times tables to 12 × 12, multiplying, dividing and missing numbers.", [40101, 40102]),
  maths(4, "Fractions and decimals", "Equivalent fractions, tenths and hundredths.", [40201, 40202]),
  maths(4, "Measurement", "Length, mass, capacity, area, perimeter and time.", [40601, 40603, 40604, 40602, 40605, 30405]),
  maths(4, "Properties of shapes", "Sorting 2-D shapes, and acute and obtuse angles.", [40301, 40304]),
  maths(4, "Position and direction", POSITION, [40305, 40302, 30705, 30702]),
  maths(4, "Statistics", STATISTICS, [40701, 40702]),

  maths(5, "Place value", "Numbers to a million, and rounding.", [50101]),
  maths(5, "Multiplication and division", "Multiplying and dividing larger numbers, with remainders.", [50201, 50202]),
  maths(
    5,
    "Fractions, decimals and percentages",
    "Comparing fractions, decimals to thousandths, and percentages.",
    [50301, 50303, 50302, 50304, 50305, 50306],
  ),
  maths(5, "Measurement", "Perimeter, area, volume, mass and time.", [50501, 50502, 50504, 50505, 50506]),
  maths(5, "Properties of shapes", "Sorting shapes, and measuring angles.", [50601, 50603]),
  maths(5, "Position and direction", POSITION, [50604]),
  maths(5, "Statistics", "Reading and drawing line graphs and tables.", [50701, 50702]),

  maths(6, "Place value", "Place value, factors, multiples and primes.", [60401]),
  maths(6, "Four operations", "Adding, subtracting, multiplying, dividing and the order of operations.", [60101, 60102, 60103]),
  maths(6, "Fractions", "Adding and subtracting fractions, fractions of amounts, and decimals.", [60201, 60202, 60204]),
  maths(6, "Ratio and proportion", "Percentages of amounts.", [60203]),
  maths(6, "Algebra", "Number sentences with missing numbers.", [50401]),
  maths(
    6,
    "Measurement",
    "Perimeter, area of triangles and parallelograms, volume, mass and time.",
    [60501, 60502, 60503, 60504, 60505, 60506],
  ),
  maths(6, "Properties of shapes", "Angles, sorting shapes, and nets of 3-D shapes.", [60301, 60302, 60303, 50602]),
  maths(6, "Position and direction", "Coordinates in all four quadrants.", [60304]),
  maths(6, "Statistics", "Pie charts, line graphs and the mean.", [60601, 60602]),

  // ---------- English ----------
  english(1, "Word reading", WORD_READING, [11101]),
  english(1, "Comprehension", COMPREHENSION, [11201, 11301, 11302]),
  english(1, "Spelling", SPELLING, [11102]),
  english(1, "Grammar and punctuation", GRAMMAR, [11401]),

  english(2, "Word reading", WORD_READING, [21101]),
  english(2, "Comprehension", COMPREHENSION, [21201, 21301, 21302]),
  english(2, "Spelling", SPELLING, [21102]),
  english(2, "Grammar and punctuation", GRAMMAR, [21401]),

  english(3, "Comprehension", COMPREHENSION, [31301, 31302, 31201]),
  english(3, "Spelling", SPELLING, [31101]),
  english(3, "Composition", COMPOSITION, [31501, 31502, 31503]),
  english(3, "Grammar and punctuation", GRAMMAR, [31401]),

  english(4, "Comprehension", COMPREHENSION, [41501, 41502, 41401]),
  english(4, "Spelling", SPELLING, [41301]),
  english(4, "Composition", COMPOSITION, [41101, 41102, 41103, 41104, 41105]),
  english(4, "Grammar and punctuation", GRAMMAR, [41201, 41202]),

  english(5, "Comprehension", COMPREHENSION, [51301, 51302, 51303, 51201]),
  english(5, "Spelling", SPELLING, [51101]),
  english(5, "Composition", COMPOSITION, [51501]),
  english(5, "Grammar and punctuation", GRAMMAR, [51401]),

  english(6, "Comprehension", COMPREHENSION, [61501, 61502, 61503, 61401, 61201]),
  english(6, "Spelling", SPELLING, [61301]),
  english(6, "Composition", COMPOSITION, [61101, 61102, 61103]),
];

/**
 * The National Curriculum heading of each practice skill: the code of the UK subtopic that uses it.
 * Written out so pages can show it without loading the question bank; a test checks it against the tree.
 */
export const UK_SKILL_STANDARDS: Record<string, string> = {
  "ma2-place-value": "Y3 Place value",
  "ma2-add-sub": "Y3 Addition and subtraction",
  "ma2-missing-addend": "Y3 Addition and subtraction",
  "ma2-times-tables": "Y3 Multiplication and division",
  "ma2-decimals": "Y4 Fractions and decimals",
  "ma2-division-facts": "Y4 Multiplication and division",
  "ma2-missing-factor": "Y4 Multiplication and division",
  "ma2-equivalent-fractions": "Y4 Fractions and decimals",
  "ma3-large-numbers": "Y5 Place value",
  "ma3-add-sub-decimals": "Y5 Fractions, decimals and percentages",
  "ma3-multiply": "Y5 Multiplication and division",
  "ma3-divide-remainders": "Y5 Multiplication and division",
  "ma3-decimals": "Y5 Fractions, decimals and percentages",
  "ma3-order-of-operations": "Y6 Four operations",
  "ma3-add-fractions": "Y6 Fractions",
  "ma3-fraction-of-quantity": "Y6 Fractions",
  "ma3-percentages": "Y6 Ratio and proportion",
  "en2-spelling": "Y3 Spelling",
  "en2-vocabulary": "Y3 Comprehension",
  "en2-comprehension": "Y3 Comprehension",
  "en2-imaginative": "Y4 Composition",
  "en2-persuasive": "Y4 Composition",
  "en3-spelling": "Y5 Spelling",
  "en3-vocabulary": "Y5 Comprehension",
  "en3-comprehension": "Y5 Comprehension",
  "en3-informative": "Y6 Composition",
  "en3-persuasive": "Y6 Composition",
};
