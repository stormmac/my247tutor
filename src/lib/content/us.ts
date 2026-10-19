import type { Subject, YearLevel } from "../curriculum/types";

/**
 * The US Common Core tree, Grades 1–8. It has no questions of its own: each subtopic is an NSW
 * subtopic (by its number, as in tree.ts) filed under a Common Core domain and standard. tree.ts
 * builds the records, and curricula.ts turns the text into US English.
 * Each NSW subtopic appears at most once, so a subtopic id always has one place in the US tree.
 */
/** A topic in a curriculum built from NSW subtopics (US and UK). */
export interface TopicSpec {
  subject: Subject;
  grade: YearLevel;
  title: string;
  description: string;
  /** [NSW subtopic number, the code it has in this curriculum]. */
  subtopics: [number, string][];
}

const NBT = (grade: YearLevel, subtopics: [number, string][]): TopicSpec => ({
  subject: "maths",
  grade,
  title: "Number and operations in base ten",
  description: "Place value, and adding, subtracting, multiplying and dividing whole numbers and decimals.",
  subtopics,
});
const OA = (grade: YearLevel, subtopics: [number, string][]): TopicSpec => ({
  subject: "maths",
  grade,
  title: "Operations and algebraic thinking",
  description: "Number facts, missing numbers and word problems.",
  subtopics,
});
const NF = (grade: YearLevel, subtopics: [number, string][]): TopicSpec => ({
  subject: "maths",
  grade,
  title: "Fractions",
  description: "Understanding, comparing and calculating with fractions.",
  subtopics,
});
const MD = (grade: YearLevel, subtopics: [number, string][]): TopicSpec => ({
  subject: "maths",
  grade,
  title: "Measurement and data",
  description: "Length, mass, volume, time, area and reading graphs.",
  subtopics,
});
const G = (grade: YearLevel, subtopics: [number, string][]): TopicSpec => ({
  subject: "maths",
  grade,
  title: "Geometry",
  description: "Shapes, their features, and the coordinate plane.",
  subtopics,
});
const ela = (grade: YearLevel, title: string, description: string, subtopics: [number, string][]): TopicSpec => ({
  subject: "english",
  grade,
  title,
  description,
  subtopics,
});
const FOUNDATIONS = "Phonics and word recognition.";
const LANGUAGE = "Spelling, grammar, capitalization and punctuation.";
const VOCAB = "Working out and using the meanings of words.";
const READING = "Reading closely and understanding stories, poems and information.";
const WRITING = "Writing stories, information and opinion pieces.";

export const US_TOPIC_SPECS: TopicSpec[] = [
  // ---------- Math ----------
  NBT(1, [
    [10101, "1.NBT.1"],
    [10102, "1.NBT.2"],
  ]),
  OA(1, [[10201, "1.OA.6"]]),
  MD(1, [
    [10501, "1.MD.1"],
    [10601, "1.MD.3"],
    [10801, "1.MD.4"],
    [10802, "1.MD.4"],
  ]),
  G(1, [
    [10701, "1.G.1"],
    [10702, "1.G.2"],
    [10401, "1.G.3"],
  ]),

  NBT(2, [
    [20101, "2.NBT.1"],
    [20102, "2.NBT.3"],
    [20201, "2.NBT.5"],
  ]),
  OA(2, [[20301, "2.OA.4"]]),
  MD(2, [
    [20501, "2.MD.1"],
    [20601, "2.MD.7"],
    [20801, "2.MD.10"],
    [20802, "2.MD.10"],
  ]),
  G(2, [
    [20701, "2.G.1"],
    [20702, "2.G.1"],
    [20502, "2.G.2"],
    [20401, "2.G.3"],
  ]),

  NBT(3, [
    [30101, "3.NBT.1"],
    [30201, "3.NBT.2"],
    [30202, "3.NBT.2"],
  ]),
  OA(3, [
    [30301, "3.OA.7"],
    [40101, "3.OA.7"],
    [30302, "3.OA.4"],
  ]),
  NF(3, [
    [30501, "3.NF.1"],
    [40201, "3.NF.3"],
  ]),
  MD(3, [
    [30401, "3.MD.1"],
    [30403, "3.MD.2"],
    [30404, "3.MD.2"],
    [30601, "3.MD.3"],
    [30603, "3.MD.3"],
    [30402, "3.MD.4"],
    [30405, "3.MD.5"],
  ]),
  G(3, [[30701, "3.G.1"]]),

  NBT(4, [
    [40401, "4.NBT.2"],
    [40501, "4.NBT.4"],
    [50202, "4.NBT.6"],
  ]),
  OA(4, [
    [40102, "4.OA.2"],
    [40502, "4.OA.3"],
  ]),
  NF(4, [
    [50304, "4.NF.2"],
    [40202, "4.NF.6"],
  ]),
  MD(4, [
    [40601, "4.MD.1"],
    [40603, "4.MD.1"],
    [40604, "4.MD.2"],
    [40602, "4.MD.2"],
    [40605, "4.MD.3"],
    [40701, "4.MD.4"],
    [40702, "4.MD.4"],
    [40304, "4.MD.5"],
  ]),
  G(4, [
    [40301, "4.G.2"],
    [40302, "4.G.3"],
  ]),

  NBT(5, [
    [50101, "5.NBT.1"],
    [50301, "5.NBT.3"],
    [50303, "5.NBT.3"],
    [50201, "5.NBT.5"],
    [50302, "5.NBT.7"],
  ]),
  OA(5, [[60101, "5.OA.1"]]),
  NF(5, [
    [60201, "5.NF.1"],
    [50305, "5.NF.4"],
    [60202, "5.NF.4"],
    [50502, "5.NF.4b"],
  ]),
  MD(5, [
    [50501, "5.MD.1"],
    [50505, "5.MD.1"],
    [50506, "5.MD.1"],
    [50702, "5.MD.2"],
    [50504, "5.MD.3"],
  ]),
  G(5, [
    [50604, "5.G.1"],
    [50701, "5.G.2"],
    [50601, "5.G.3"],
  ]),

  {
    subject: "maths",
    grade: 6,
    title: "Ratios and percents",
    description: "Percentages and finding a percent of an amount.",
    subtopics: [
      [50306, "6.RP.3c"],
      [60203, "6.RP.3c"],
    ],
  },
  {
    subject: "maths",
    grade: 6,
    title: "The number system",
    description: "Dividing, decimals, factors and multiples, and the coordinate plane.",
    subtopics: [
      [60102, "6.NS.2"],
      [60103, "6.NS.3"],
      [60204, "6.NS.3"],
      [60401, "6.NS.4"],
      [60304, "6.NS.8"],
    ],
  },
  {
    subject: "maths",
    grade: 6,
    title: "Expressions and equations",
    description: "Writing and solving number sentences with unknowns.",
    subtopics: [[50401, "6.EE.7"]],
  },
  G(6, [
    [60502, "6.G.1"],
    [60503, "6.G.1"],
    [60504, "6.G.2"],
    [60303, "6.G.4"],
  ]),
  {
    subject: "maths",
    grade: 6,
    title: "Statistics",
    description: "Showing data in graphs and describing it.",
    subtopics: [
      [60601, "6.SP.4"],
      [60602, "6.SP.5"],
    ],
  },

  // Grades 7 and 8 file the NSW Stage 4 subtopics; Stage 4 is split across the two years differently.
  {
    subject: "maths",
    grade: 7,
    title: "Ratios and proportional relationships",
    description: "Unit rates, proportions, and percent problems such as discounts and tax.",
    subtopics: [
      [80102, "7.RP.1"],
      [80101, "7.RP.3"],
    ],
  },
  {
    subject: "maths",
    grade: 7,
    title: "The number system",
    description: "Adding, subtracting, multiplying and dividing rational numbers, including negatives.",
    subtopics: [
      [70101, "7.NS.1"],
      [70201, "7.NS.2"],
    ],
  },
  {
    subject: "maths",
    grade: 7,
    title: "Expressions and equations",
    description: "Simplifying, expanding and factoring expressions, and solving equations.",
    subtopics: [
      [70301, "7.EE.1"],
      [80201, "7.EE.1"],
      [70401, "7.EE.4a"],
    ],
  },
  G(7, [
    [70601, "7.G.5"],
    [70501, "7.G.4"],
    [80302, "7.G.4"],
    [70502, "7.G.6"],
  ]),
  {
    subject: "maths",
    grade: 7,
    title: "Statistics and probability",
    description: "Samples, comparing data sets, and the probability of simple and compound events.",
    subtopics: [
      [70701, "7.SP.1"],
      [80501, "7.SP.4"],
      [70702, "7.SP.6"],
      [80502, "7.SP.8"],
    ],
  },
  {
    subject: "maths",
    grade: 8,
    title: "Expressions and equations",
    description: "Exponents, square and cube roots, and solving linear equations.",
    subtopics: [
      [80202, "8.EE.1"],
      [70302, "8.EE.2"],
      [80203, "8.EE.7"],
    ],
  },
  {
    subject: "maths",
    grade: 8,
    title: "Functions",
    description: "Linear functions, their tables, rules and graphs.",
    subtopics: [[80204, "8.F.3"]],
  },
  G(8, [
    [70602, "8.G.3"],
    [80401, "8.G.2"],
    [80301, "8.G.7"],
    [80303, "8.G.9"],
  ]),

  // ---------- English Language Arts ----------
  ela(1, "Foundational skills", FOUNDATIONS, [[11101, "RF.1.3"]]),
  ela(1, "Reading", READING, [
    [11301, "RL.1.1"],
    [11302, "RL.1.2"],
  ]),
  ela(1, "Language", LANGUAGE, [
    [11102, "L.1.2d"],
    [11401, "L.1.2"],
  ]),
  ela(1, "Vocabulary", VOCAB, [[11201, "L.1.4"]]),

  ela(2, "Foundational skills", FOUNDATIONS, [[21101, "RF.2.3"]]),
  ela(2, "Reading", READING, [
    [21301, "RL.2.1"],
    [21302, "RL.2.2"],
  ]),
  ela(2, "Language", LANGUAGE, [
    [21102, "L.2.2d"],
    [21401, "L.2.2"],
  ]),
  ela(2, "Vocabulary", VOCAB, [[21201, "L.2.4"]]),

  ela(3, "Reading", READING, [
    [31301, "RL.3.1"],
    [31302, "RL.3.5"],
  ]),
  ela(3, "Language", LANGUAGE, [
    [31101, "L.3.2f"],
    [31401, "L.3.2"],
  ]),
  ela(3, "Vocabulary", VOCAB, [[31201, "L.3.4"]]),
  ela(3, "Writing", WRITING, [
    [31501, "W.3.3"],
    [31502, "W.3.2"],
    [31503, "W.3.1"],
  ]),

  ela(4, "Reading", READING, [
    [41501, "RL.4.1"],
    [41502, "RL.4.5"],
  ]),
  ela(4, "Language", LANGUAGE, [
    [41201, "L.4.1"],
    [41202, "L.4.1f"],
    [41301, "L.4.2d"],
  ]),
  ela(4, "Vocabulary", VOCAB, [[41401, "L.4.4"]]),
  ela(4, "Writing", WRITING, [
    [41101, "W.4.3"],
    [41102, "W.4.1"],
    [41103, "W.4.3"],
    [41104, "W.4.2"],
    [41105, "W.4.1"],
  ]),

  ela(5, "Reading", READING, [
    [51301, "RL.5.1"],
    [51303, "RL.5.2"],
    [51302, "RL.5.3"],
  ]),
  ela(5, "Language", LANGUAGE, [
    [51401, "L.5.2"],
    [51101, "L.5.2e"],
  ]),
  ela(5, "Vocabulary", VOCAB, [[51201, "L.5.4"]]),
  ela(5, "Writing", WRITING, [[51501, "W.5.5"]]),

  ela(6, "Reading", READING, [
    [61501, "RL.6.1"],
    [61503, "RL.6.2"],
    [61502, "RL.6.3"],
  ]),
  ela(6, "Language", LANGUAGE, [
    [61301, "L.6.2b"],
    [61201, "L.6.5a"],
  ]),
  ela(6, "Vocabulary", VOCAB, [[61401, "L.6.4"]]),
  ela(6, "Writing", WRITING, [
    [61101, "W.6.2"],
    [61102, "W.6.1"],
    [61103, "W.6.5"],
  ]),

  ela(7, "Reading", READING, [
    [71101, "RL.7.1"],
    [71102, "RL.7.4"],
    [71103, "RL.7.6"],
  ]),
  ela(7, "Language", LANGUAGE, [
    [71202, "L.7.1"],
    [71203, "L.7.2b"],
  ]),
  ela(7, "Vocabulary", VOCAB, [[71201, "L.7.4"]]),
  ela(7, "Writing", WRITING, [[71301, "W.7.5"]]),

  ela(8, "Reading", READING, [
    [81101, "RL.8.1"],
    [81102, "RL.8.4"],
    [81103, "RL.8.6"],
  ]),
  ela(8, "Language", LANGUAGE, [
    [81202, "L.8.1"],
    [81203, "L.8.2b"],
  ]),
  ela(8, "Vocabulary", VOCAB, [[81201, "L.8.4"]]),
  ela(8, "Writing", WRITING, [[81301, "W.8.5"]]),
];

/**
 * The Common Core standard of each practice skill: the standard of the US subtopic that uses it.
 * Written out so pages can show it without loading the question bank; a test checks it against the tree.
 */
export const US_SKILL_STANDARDS: Record<string, string> = {
  "ma2-place-value": "3.NBT.1",
  "ma2-add-sub": "3.NBT.2",
  "ma2-missing-addend": "3.NBT.2",
  "ma2-times-tables": "3.OA.7",
  "ma2-decimals": "4.NF.6",
  "ma2-division-facts": "3.OA.7",
  "ma2-missing-factor": "4.OA.2",
  "ma2-equivalent-fractions": "3.NF.3",
  "ma3-large-numbers": "5.NBT.1",
  "ma3-add-sub-decimals": "5.NBT.7",
  "ma3-multiply": "5.NBT.5",
  "ma3-divide-remainders": "4.NBT.6",
  "ma3-decimals": "5.NBT.3",
  "ma3-order-of-operations": "5.OA.1",
  "ma3-add-fractions": "5.NF.1",
  "ma3-fraction-of-quantity": "5.NF.4",
  "ma3-percentages": "6.RP.3c",
  "en2-spelling": "L.3.2f",
  "en2-vocabulary": "L.3.4",
  "en2-comprehension": "RL.3.1",
  "en2-imaginative": "W.4.3",
  "en2-persuasive": "W.4.1",
  "en3-spelling": "L.5.2e",
  "en3-vocabulary": "L.5.4",
  "en3-comprehension": "RL.5.1",
  "en3-informative": "W.6.2",
  "en3-persuasive": "W.6.1",
};
