import { getSkill } from "../curriculum/skills";
import { YEARS, type Subject as SubjectKey, type YearLevel as YearNumber } from "../curriculum/types";
import * as Y1A from "./bank/maths-year1a";
import * as Y1B from "./bank/maths-year1b";
import * as Y2A from "./bank/maths-year2a";
import * as Y2B from "./bank/maths-year2b";
import * as E1 from "./bank/english-year1";
import * as E2 from "./bank/english-year2";
import * as Y3 from "./bank/maths-year3";
import * as Y4A from "./bank/maths-year4a";
import * as Y4B from "./bank/maths-year4b";
import * as Y5A from "./bank/maths-year5a";
import * as Y5B from "./bank/maths-year5b";
import * as Y6A from "./bank/maths-year6a";
import * as Y6B from "./bank/maths-year6b";
import * as E3 from "./bank/english-year3";
import * as E4 from "./bank/english-year4";
import * as E5 from "./bank/english-year5";
import * as E6 from "./bank/english-year6";
import * as Y3X from "./bank/maths-year3-extra";
import * as Y4AX from "./bank/maths-year4a-extra";
import * as Y4BX from "./bank/maths-year4b-extra";
import * as Y5AX from "./bank/maths-year5a-extra";
import * as Y5BX from "./bank/maths-year5b-extra";
import * as Y6AX from "./bank/maths-year6a-extra";
import * as Y6BX from "./bank/maths-year6b-extra";
import * as E3X from "./bank/english-year3-extra";
import * as E4X from "./bank/english-year4-extra";
import * as E5X from "./bank/english-year5-extra";
import * as E6X from "./bank/english-year6-extra";
import * as SMALL from "./bank/small-subtopics";
import { choice, multi, ordering, type QuestionSpec, trueFalse, typed } from "./spec";
import type { ContentQuestion, Country, State, Subject, Subtopic, Topic, YearLevel } from "./types";

// ---------- Reference data: copied from the myteacher seed (database/seeds/001_sample_data.sql), same ids ----------

export const AUSTRALIA_ID = "00000000-0000-0000-0000-000000000001";
export const NSW_ID = "10000000-0000-0000-0000-000000000001";

export const COUNTRIES: Country[] = [{ id: AUSTRALIA_ID, name: "Australia", code: "AU", curriculum_framework: "Australian Curriculum" }];

export const STATES: State[] = [
  ["01", "New South Wales", "NSW", "NESA"],
  ["02", "Victoria", "VIC", "VCAA"],
  ["03", "Queensland", "QLD", "QCAA"],
  ["04", "Western Australia", "WA", "SCSA"],
  ["05", "South Australia", "SA", "SACE"],
  ["06", "Tasmania", "TAS", "TASC"],
  ["07", "Australian Capital Territory", "ACT", "BSSS"],
  ["08", "Northern Territory", "NT", "TBD"],
].map(([n, name, code, authority]) => ({
  id: `10000000-0000-0000-0000-0000000000${n}`,
  country_id: AUSTRALIA_ID,
  name,
  code,
  curriculum_authority: authority,
}));

export const SUBJECTS: Subject[] = [
  ["01", "Biology", "#E1F5EE", "leaf"],
  ["02", "Chemistry", "#E6F1FB", "flask"],
  ["03", "Physics", "#EEEDFE", "atom"],
  ["04", "Mathematics", "#FAEEDA", "calculator"],
  ["05", "English", "#FAECE7", "book"],
  ["06", "History", "#EAF3DE", "landmark"],
  ["07", "Geography", "#FBEAF0", "globe"],
  ["08", "Art", "#FEF3E2", "palette"],
].map(([n, name, colour, icon]) => ({ id: `20000000-0000-0000-0000-0000000000${n}`, state_id: NSW_ID, name, colour_hex: colour, icon }));

export const YEAR_LEVELS: YearLevel[] = ["Kindergarten", ...Array.from({ length: 12 }, (_, i) => `Year ${i + 1}`)].map((name, i) => ({
  id: `30000000-0000-0000-0000-0000000000${String(i + 1).padStart(2, "0")}`,
  state_id: NSW_ID,
  name,
  sort_order: i,
  age_min: i + 5,
  age_max: i + 6,
}));

/** The app's subject keys, mapped to the NSW subject records. */
export const SUBJECT_IDS: Record<SubjectKey, string> = {
  maths: "20000000-0000-0000-0000-000000000004",
  english: "20000000-0000-0000-0000-000000000005",
};

export function yearLevelId(year: YearNumber): string {
  return YEAR_LEVELS.find((y) => y.sort_order === year)!.id;
}

// ---------- my247tutor content: NSW Maths and English, Years 1–6 ----------

/*
 * Ids are written by hand so they never change when content is added or reordered:
 * stored progress and any database copy refer to them.
 *   topics     41000000-0000-0000-0000-<n>
 *   subtopics  51000000-0000-0000-0000-<n>
 *   questions  61000000-0000-0000-0000-<n>
 * The myteacher sample rows use the 40…/50… ranges, so these never collide with them.
 */
const id = (prefix: string, n: number) => `${prefix}000000-0000-0000-0000-${String(n).padStart(12, "0")}`;

type SubtopicSpec =
  | { n: number; skill: string; questions?: QuestionSpec[] }
  | { n: number; title: string; description: string; outcome?: string; questions: QuestionSpec[] };
interface TopicSpec {
  n: number;
  subject: SubjectKey;
  year: YearNumber;
  title: string;
  description: string;
  subtopics: SubtopicSpec[];
}

/** Written before the question bank; kept with its own questions. */
const COMPARING_DECIMALS: SubtopicSpec = {
  n: 50303,
  title: "Comparing and ordering decimals",
  description: "Compares and orders decimals using place value.",
  questions: [
    ordering(
      5030301,
      "Put these numbers in order, from smallest to largest.",
      ["0.05", "0.5", "0.505", "0.55"],
      "Compare the tenths first, then the hundredths, then the thousandths: 0.05, 0.5, 0.505, 0.55.",
    ),
    choice(
      5030302,
      "Which number is the largest?",
      ["0.68", "0.7", "0.699", "0.07"],
      1,
      "0.7 has 7 tenths. The others have fewer tenths, so 0.7 is the largest.",
    ),
    trueFalse(5030303, "0.4 is the same as 0.40.", true, "0.40 is 4 tenths and 0 hundredths, which is the same as 0.4."),
    multi(
      5030304,
      "Which of these numbers are greater than 0.5? Choose all that apply.",
      ["0.51", "0.499", "0.6", "0.05", "0.500"],
      [0, 2],
      "0.51 and 0.6 are greater than 0.5. 0.500 is equal to 0.5, not greater.",
    ),
    typed(
      "short_answer",
      5030305,
      "What number is exactly halfway between 0.2 and 0.3?",
      "0.25",
      "0.2 is 0.20 and 0.3 is 0.30. Halfway between 20 hundredths and 30 hundredths is 25 hundredths, or 0.25.",
    ),
    ...SMALL.DECIMALS_ORDER,
    ...SMALL.DECIMALS_ORDER_2,
  ],
};

const TOPIC_SPECS: TopicSpec[] = [
  // ---------- Mathematics, Year 1: 30 questions for each Stage 1 standard ----------
  {
    n: 101,
    subject: "maths",
    year: 1,
    title: "Numbers and place value",
    description: "Reading, writing, ordering and partitioning numbers.",
    subtopics: [
      {
        n: 10101,
        title: "Reading and ordering numbers",
        description: "Reads, writes and orders numbers using place value.",
        outcome: "MA1-RWN-01",
        questions: [...Y1A.PLACE_VALUE, ...Y1A.PLACE_VALUE_2],
      },
      {
        n: 10102,
        title: "Partitioning numbers",
        description: "Breaks numbers into tens and ones (and hundreds) in different ways.",
        outcome: "MA1-RWN-02",
        questions: [...Y1A.PARTITION, ...Y1A.PARTITION_2],
      },
    ],
  },
  {
    n: 102,
    subject: "maths",
    year: 1,
    title: "Addition and subtraction",
    description: "Number bonds, adding and taking away.",
    subtopics: [
      {
        n: 10201,
        title: "Adding and subtracting",
        description: "Uses number bonds and the link between adding and subtracting.",
        outcome: "MA1-CSQ-01",
        questions: [...Y1A.ADD_SUB, ...Y1A.ADD_SUB_2],
      },
    ],
  },
  {
    n: 103,
    subject: "maths",
    year: 1,
    title: "Groups and sharing",
    description: "Equal groups, skip counting and sharing.",
    subtopics: [
      {
        n: 10301,
        title: "Equal groups and sharing",
        description: "Uses equal groups to multiply and shares to divide.",
        outcome: "MA1-FG-01",
        questions: [...Y1A.GROUPS, ...Y1A.GROUPS_2],
      },
    ],
  },
  {
    n: 104,
    subject: "maths",
    year: 1,
    title: "Fractions",
    description: "Equal parts of a whole.",
    subtopics: [
      {
        n: 10401,
        title: "Halves, quarters and eighths",
        description: "Makes and names equal parts of shapes, lengths and groups.",
        outcome: "MA1-GM-03",
        questions: [...Y1A.FRACTIONS, ...Y1A.FRACTIONS_2],
      },
    ],
  },
  {
    n: 105,
    subject: "maths",
    year: 1,
    title: "Measurement",
    description: "Length, area, capacity and mass.",
    subtopics: [
      {
        n: 10501,
        title: "Length",
        description: "Measures, compares and estimates lengths.",
        outcome: "MA1-GM-02",
        questions: [...Y1B.LENGTH, ...Y1B.LENGTH_2],
      },
      {
        n: 10502,
        title: "Area",
        description: "Measures and compares areas with units in rows and columns.",
        outcome: "MA1-2DS-02",
        questions: [...Y1B.AREA, ...Y1B.AREA_2],
      },
      {
        n: 10503,
        title: "Capacity and volume",
        description: "Measures and compares how much things hold.",
        outcome: "MA1-3DS-02",
        questions: [...Y1B.CAPACITY, ...Y1B.CAPACITY_2],
      },
      {
        n: 10504,
        title: "Mass",
        description: "Compares how heavy things are.",
        outcome: "MA1-NSM-01",
        questions: [...Y1B.MASS, ...Y1B.MASS_2],
      },
    ],
  },
  {
    n: 106,
    subject: "maths",
    year: 1,
    title: "Time",
    description: "Days, months, durations and clocks.",
    subtopics: [
      {
        n: 10601,
        title: "Time",
        description: "Compares how long things take and reads clocks.",
        outcome: "MA1-NSM-02",
        questions: [...Y1B.TIME, ...Y1B.TIME_2],
      },
    ],
  },
  {
    n: 107,
    subject: "maths",
    year: 1,
    title: "Shapes and position",
    description: "2D shapes, 3D objects and where things are.",
    subtopics: [
      {
        n: 10701,
        title: "2D shapes",
        description: "Recognises and describes flat shapes.",
        outcome: "MA1-2DS-01",
        questions: [...Y1B.SHAPES_2D, ...Y1B.SHAPES_2D_2],
      },
      {
        n: 10702,
        title: "3D objects",
        description: "Recognises and describes solid objects.",
        outcome: "MA1-3DS-01",
        questions: [...Y1B.OBJECTS_3D, ...Y1B.OBJECTS_3D_2],
      },
      {
        n: 10703,
        title: "Position",
        description: "Describes where things are and how to get there.",
        outcome: "MA1-GM-01",
        questions: [...Y1B.POSITION, ...Y1B.POSITION_2],
      },
    ],
  },
  {
    n: 108,
    subject: "maths",
    year: 1,
    title: "Data and chance",
    description: "Collecting data, reading graphs and chance.",
    subtopics: [
      {
        n: 10801,
        title: "Collecting and showing data",
        description: "Gathers data and shows it in lists, tables and picture graphs.",
        outcome: "MA1-DATA-01",
        questions: [...Y1A.DATA_SHOW, ...Y1A.DATA_SHOW_2],
      },
      {
        n: 10802,
        title: "Reading data",
        description: "Reads data displays and says what they show.",
        outcome: "MA1-DATA-02",
        questions: [...Y1A.DATA_READ, ...Y1A.DATA_READ_2],
      },
      {
        n: 10803,
        title: "Chance",
        description: "Talks about whether everyday events will happen.",
        outcome: "MA1-CHAN-01",
        questions: [...Y1A.CHANCE, ...Y1A.CHANCE_2],
      },
    ],
  },
  // ---------- English, Year 1: 30 questions for each Stage 1 standard ----------
  {
    n: 111,
    subject: "english",
    year: 1,
    title: "Phonics and spelling",
    description: "Sounds, letters and spelling.",
    subtopics: [
      {
        n: 11101,
        title: "Sounds and letters",
        description: "Uses letter sounds to read and spell words.",
        outcome: "EN1-PHOKW-01",
        questions: [...E1.PHONICS, ...E1.PHONICS_2],
      },
      {
        n: 11102,
        title: "Spelling",
        description: "Spells words using sounds, patterns and word parts.",
        outcome: "EN1-SPELL-01",
        questions: [...E1.SPELLING, ...E1.SPELLING_2],
      },
    ],
  },
  {
    n: 112,
    subject: "english",
    year: 1,
    title: "Vocabulary",
    description: "Word meanings.",
    subtopics: [
      {
        n: 11201,
        title: "Word meanings",
        description: "Learns and uses new words.",
        outcome: "EN1-VOCAB-01",
        questions: [...E1.VOCAB, ...E1.VOCAB_2],
      },
    ],
  },
  {
    n: 113,
    subject: "english",
    year: 1,
    title: "Reading",
    description: "Understanding what you read.",
    subtopics: [
      {
        n: 11301,
        title: "Understanding what you read",
        description: "Reads short texts and answers questions about them.",
        outcome: "EN1-RECOM-01",
        questions: [...E1.READING, ...E1.READING_2],
      },
      {
        n: 11302,
        title: "Stories and poems",
        description: "Talks about characters, settings, events and rhyme.",
        outcome: "EN1-UARL-01",
        questions: [...E1.LITERATURE, ...E1.LITERATURE_2],
      },
    ],
  },
  {
    n: 114,
    subject: "english",
    year: 1,
    title: "Writing sentences",
    description: "Writing clear sentences.",
    subtopics: [
      {
        n: 11401,
        title: "Sentences and punctuation",
        description: "Writes sentences with capital letters, full stops and joining words.",
        outcome: "EN1-CWT-01",
        questions: [...E1.SENTENCES, ...E1.SENTENCES_2],
      },
    ],
  },
  // ---------- Mathematics, Year 2: 30 questions for each Stage 1 standard ----------
  {
    n: 201,
    subject: "maths",
    year: 2,
    title: "Numbers and place value",
    description: "Reading, writing, ordering and partitioning numbers.",
    subtopics: [
      {
        n: 20101,
        title: "Reading and ordering numbers",
        description: "Reads, writes and orders numbers using place value.",
        outcome: "MA1-RWN-01",
        questions: [...Y2A.PLACE_VALUE, ...Y2A.PLACE_VALUE_2],
      },
      {
        n: 20102,
        title: "Partitioning numbers",
        description: "Breaks numbers into tens and ones (and hundreds) in different ways.",
        outcome: "MA1-RWN-02",
        questions: [...Y2A.PARTITION, ...Y2A.PARTITION_2],
      },
    ],
  },
  {
    n: 202,
    subject: "maths",
    year: 2,
    title: "Addition and subtraction",
    description: "Number bonds, adding and taking away.",
    subtopics: [
      {
        n: 20201,
        title: "Adding and subtracting",
        description: "Uses number bonds and the link between adding and subtracting.",
        outcome: "MA1-CSQ-01",
        questions: [...Y2A.ADD_SUB, ...Y2A.ADD_SUB_2],
      },
    ],
  },
  {
    n: 203,
    subject: "maths",
    year: 2,
    title: "Groups and sharing",
    description: "Equal groups, skip counting and sharing.",
    subtopics: [
      {
        n: 20301,
        title: "Equal groups and sharing",
        description: "Uses equal groups to multiply and shares to divide.",
        outcome: "MA1-FG-01",
        questions: [...Y2A.GROUPS, ...Y2A.GROUPS_2],
      },
    ],
  },
  {
    n: 204,
    subject: "maths",
    year: 2,
    title: "Fractions",
    description: "Equal parts of a whole.",
    subtopics: [
      {
        n: 20401,
        title: "Halves, quarters and eighths",
        description: "Makes and names equal parts of shapes, lengths and groups.",
        outcome: "MA1-GM-03",
        questions: [...Y2A.FRACTIONS, ...Y2A.FRACTIONS_2],
      },
    ],
  },
  {
    n: 205,
    subject: "maths",
    year: 2,
    title: "Measurement",
    description: "Length, area, capacity and mass.",
    subtopics: [
      {
        n: 20501,
        title: "Length",
        description: "Measures, compares and estimates lengths.",
        outcome: "MA1-GM-02",
        questions: [...Y2B.LENGTH, ...Y2B.LENGTH_2],
      },
      {
        n: 20502,
        title: "Area",
        description: "Measures and compares areas with units in rows and columns.",
        outcome: "MA1-2DS-02",
        questions: [...Y2B.AREA, ...Y2B.AREA_2],
      },
      {
        n: 20503,
        title: "Capacity and volume",
        description: "Measures and compares how much things hold.",
        outcome: "MA1-3DS-02",
        questions: [...Y2B.CAPACITY, ...Y2B.CAPACITY_2],
      },
      {
        n: 20504,
        title: "Mass",
        description: "Compares how heavy things are.",
        outcome: "MA1-NSM-01",
        questions: [...Y2B.MASS, ...Y2B.MASS_2],
      },
    ],
  },
  {
    n: 206,
    subject: "maths",
    year: 2,
    title: "Time",
    description: "Days, months, durations and clocks.",
    subtopics: [
      {
        n: 20601,
        title: "Time",
        description: "Compares how long things take and reads clocks.",
        outcome: "MA1-NSM-02",
        questions: [...Y2B.TIME, ...Y2B.TIME_2],
      },
    ],
  },
  {
    n: 207,
    subject: "maths",
    year: 2,
    title: "Shapes and position",
    description: "2D shapes, 3D objects and where things are.",
    subtopics: [
      {
        n: 20701,
        title: "2D shapes",
        description: "Recognises and describes flat shapes.",
        outcome: "MA1-2DS-01",
        questions: [...Y2B.SHAPES_2D, ...Y2B.SHAPES_2D_2],
      },
      {
        n: 20702,
        title: "3D objects",
        description: "Recognises and describes solid objects.",
        outcome: "MA1-3DS-01",
        questions: [...Y2B.OBJECTS_3D, ...Y2B.OBJECTS_3D_2],
      },
      {
        n: 20703,
        title: "Position",
        description: "Describes where things are and how to get there.",
        outcome: "MA1-GM-01",
        questions: [...Y2B.POSITION, ...Y2B.POSITION_2],
      },
    ],
  },
  {
    n: 208,
    subject: "maths",
    year: 2,
    title: "Data and chance",
    description: "Collecting data, reading graphs and chance.",
    subtopics: [
      {
        n: 20801,
        title: "Collecting and showing data",
        description: "Gathers data and shows it in lists, tables and picture graphs.",
        outcome: "MA1-DATA-01",
        questions: [...Y2A.DATA_SHOW, ...Y2A.DATA_SHOW_2],
      },
      {
        n: 20802,
        title: "Reading data",
        description: "Reads data displays and says what they show.",
        outcome: "MA1-DATA-02",
        questions: [...Y2A.DATA_READ, ...Y2A.DATA_READ_2],
      },
      {
        n: 20803,
        title: "Chance",
        description: "Talks about whether everyday events will happen.",
        outcome: "MA1-CHAN-01",
        questions: [...Y2A.CHANCE, ...Y2A.CHANCE_2],
      },
    ],
  },
  // ---------- English, Year 2: 30 questions for each Stage 1 standard ----------
  {
    n: 211,
    subject: "english",
    year: 2,
    title: "Phonics and spelling",
    description: "Sounds, letters and spelling.",
    subtopics: [
      {
        n: 21101,
        title: "Sounds and letters",
        description: "Uses letter sounds to read and spell words.",
        outcome: "EN1-PHOKW-01",
        questions: [...E2.PHONICS, ...E2.PHONICS_2],
      },
      {
        n: 21102,
        title: "Spelling",
        description: "Spells words using sounds, patterns and word parts.",
        outcome: "EN1-SPELL-01",
        questions: [...E2.SPELLING, ...E2.SPELLING_2],
      },
    ],
  },
  {
    n: 212,
    subject: "english",
    year: 2,
    title: "Vocabulary",
    description: "Word meanings.",
    subtopics: [
      {
        n: 21201,
        title: "Word meanings",
        description: "Learns and uses new words.",
        outcome: "EN1-VOCAB-01",
        questions: [...E2.VOCAB, ...E2.VOCAB_2],
      },
    ],
  },
  {
    n: 213,
    subject: "english",
    year: 2,
    title: "Reading",
    description: "Understanding what you read.",
    subtopics: [
      {
        n: 21301,
        title: "Understanding what you read",
        description: "Reads short texts and answers questions about them.",
        outcome: "EN1-RECOM-01",
        questions: [...E2.READING, ...E2.READING_2],
      },
      {
        n: 21302,
        title: "Stories and poems",
        description: "Talks about characters, settings, events and rhyme.",
        outcome: "EN1-UARL-01",
        questions: [...E2.LITERATURE, ...E2.LITERATURE_2],
      },
    ],
  },
  {
    n: 214,
    subject: "english",
    year: 2,
    title: "Writing sentences",
    description: "Writing clear sentences.",
    subtopics: [
      {
        n: 21401,
        title: "Sentences and punctuation",
        description: "Writes sentences with capital letters, full stops and joining words.",
        outcome: "EN1-CWT-01",
        questions: [...E2.SENTENCES, ...E2.SENTENCES_2],
      },
    ],
  },

  // ---------- Mathematics, Year 3: 15 questions for each Stage 2 standard (see bank/maths-year3.ts) ----------
  {
    n: 301,
    subject: "maths",
    year: 3,
    title: "Number and place value",
    description: "Reading, writing and partitioning numbers, and first steps with decimals.",
    subtopics: [
      { n: 30101, skill: "ma2-place-value", questions: [...Y3.PLACE_VALUE, ...Y3X.PLACE_VALUE] },
      {
        n: 30102,
        title: "Tenths and hundredths",
        description: "Reads, writes and compares decimals with tenths and hundredths.",
        outcome: "MA2-RN-02",
        questions: [...Y3.DECIMALS, ...Y3X.DECIMALS],
      },
    ],
  },
  {
    n: 302,
    subject: "maths",
    year: 3,
    title: "Addition and subtraction",
    description: "Written and mental strategies for adding and subtracting.",
    subtopics: [
      { n: 30201, skill: "ma2-add-sub", questions: [...Y3.ADD_SUB, ...Y3X.ADD_SUB] },
      { n: 30202, skill: "ma2-missing-addend", questions: [...Y3.MISSING_ADD, ...Y3X.MISSING_ADD] },
    ],
  },
  {
    n: 303,
    subject: "maths",
    year: 3,
    title: "Multiplication and division",
    description: "Multiplication facts, groups and missing numbers.",
    subtopics: [
      { n: 30301, skill: "ma2-times-tables", questions: [...Y3.TIMES, ...Y3X.TIMES] },
      {
        n: 30302,
        title: "Missing numbers in × and ÷",
        description: "Finds the missing number in multiplication and division number sentences.",
        outcome: "MA2-MR-02",
        questions: [...Y3.MISSING_TIMES, ...Y3X.MISSING_TIMES],
      },
    ],
  },
  {
    n: 305,
    subject: "maths",
    year: 3,
    title: "Fractions",
    description: "Halves, quarters, eighths and fractions on a number line.",
    subtopics: [
      {
        n: 30501,
        title: "Halves, quarters and eighths",
        description: "Names, compares and finds fractions of shapes, collections and number lines.",
        outcome: "MA2-PF-01",
        questions: [...Y3.FRACTIONS, ...Y3X.FRACTIONS],
      },
    ],
  },
  {
    n: 304,
    subject: "maths",
    year: 3,
    title: "Measurement and time",
    description: "Length, area, capacity, mass and time.",
    subtopics: [
      {
        n: 30401,
        title: "Telling the time",
        description: "Reads analog and digital times and works out how long things take.",
        outcome: "MA2-NSM-02",
        questions: [...Y3.TIME, ...Y3X.TIME],
      },
      {
        n: 30402,
        title: "Length",
        description: "Measures and converts lengths in metres, centimetres and millimetres.",
        outcome: "MA2-GM-02",
        questions: [...Y3.LENGTH, ...Y3X.LENGTH],
      },
      {
        n: 30405,
        title: "Area",
        description: "Compares areas and measures them in square centimetres and square metres.",
        outcome: "MA2-2DS-03",
        questions: [...Y3.AREA, ...Y3X.AREA],
      },
      {
        n: 30404,
        title: "Capacity and volume",
        description: "Measures capacity in litres and millilitres, and volume with cubes.",
        outcome: "MA2-3DS-02",
        questions: [...Y3.CAPACITY, ...Y3X.CAPACITY],
      },
      {
        n: 30403,
        title: "Mass",
        description: "Estimates, measures and compares mass in kilograms and grams.",
        outcome: "MA2-NSM-01",
        questions: [...Y3.MASS, ...Y3X.MASS],
      },
    ],
  },
  {
    n: 306,
    subject: "maths",
    year: 3,
    title: "Data and chance",
    description: "Reading tables and graphs, and how likely things are.",
    subtopics: [
      {
        n: 30601,
        title: "Tables and graphs",
        description: "Reads and compares data in tables, dot plots, picture graphs and column graphs.",
        outcome: "MA2-DATA-02",
        questions: [...Y3.DATA, ...Y3X.DATA],
      },
      {
        n: 30603,
        title: "Collecting data and making graphs",
        description: "Collects data with tally marks and draws graphs with a given scale.",
        outcome: "MA2-DATA-01",
        questions: [...Y3.DATA_COLLECT, ...Y3X.DATA_COLLECT],
      },
      {
        n: 30602,
        title: "Chance",
        description: "Describes how likely events are and compares chances.",
        outcome: "MA2-CHAN-01",
        questions: [...Y3.CHANCE, ...Y3X.CHANCE],
      },
    ],
  },
  {
    n: 307,
    subject: "maths",
    year: 3,
    title: "Shapes, angles and position",
    description: "2D shapes, 3D objects, angles and grid maps.",
    subtopics: [
      {
        n: 30701,
        title: "2D shapes",
        description: "Names and compares 2D shapes by their sides and corners.",
        outcome: "MA2-2DS-01",
        questions: [...Y3.SHAPES_2D, ...Y3X.SHAPES_2D],
      },
      {
        n: 30702,
        title: "Moving and combining shapes",
        description: "Flips, slides and turns shapes, and joins and splits them.",
        outcome: "MA2-2DS-02",
        questions: [...Y3.TRANSFORM, ...Y3X.TRANSFORM],
      },
      {
        n: 30703,
        title: "3D objects",
        description: "Names prisms, pyramids and other objects by their faces, edges and corners.",
        outcome: "MA2-3DS-01",
        questions: [...Y3.OBJECTS_3D, ...Y3X.OBJECTS_3D],
      },
      {
        n: 30704,
        title: "Angles",
        description: "Finds angles and compares them to a right angle.",
        outcome: "MA2-GM-03",
        questions: [...Y3.ANGLES, ...Y3X.ANGLES],
      },
      {
        n: 30705,
        title: "Grid maps and directions",
        description: "Finds places on a grid map and follows directions.",
        outcome: "MA2-GM-01",
        questions: [...Y3.POSITION, ...Y3X.POSITION],
      },
    ],
  },
  // ---------- Mathematics, Year 4: 15 questions for each Stage 2 standard (see bank/maths-year4a.ts and 4b) ----------
  {
    n: 404,
    subject: "maths",
    year: 4,
    title: "Number and place value",
    description: "Numbers to tens of thousands, and decimals to hundredths.",
    subtopics: [
      {
        n: 40401,
        title: "Place value",
        description: "Reads, writes, orders and rounds numbers to tens of thousands.",
        outcome: "MA2-RN-01",
        questions: [...Y4A.PLACE_VALUE, ...Y4AX.PLACE_VALUE],
      },
      { n: 40202, skill: "ma2-decimals", questions: [...Y4A.DECIMALS, ...Y4AX.DECIMALS] },
    ],
  },
  {
    n: 405,
    subject: "maths",
    year: 4,
    title: "Addition and subtraction",
    description: "Mental and written strategies, and missing numbers.",
    subtopics: [
      {
        n: 40501,
        title: "Adding and subtracting",
        description: "Adds and subtracts 2-, 3- and 4-digit numbers in your head and on paper.",
        outcome: "MA2-AR-01",
        questions: [...Y4A.ADD_SUB, ...Y4AX.ADD_SUB],
      },
      {
        n: 40502,
        title: "Missing numbers in + and −",
        description: "Finds the missing number in addition and subtraction number sentences.",
        outcome: "MA2-AR-02",
        questions: [...Y4A.MISSING_ADD, ...Y4AX.MISSING_ADD],
      },
    ],
  },
  {
    n: 401,
    subject: "maths",
    year: 4,
    title: "Multiplication and division",
    description: "Facts to 10 × 10, problems and missing numbers.",
    subtopics: [
      { n: 40101, skill: "ma2-division-facts", questions: [...Y4A.TIMES, ...Y4AX.TIMES] },
      { n: 40102, skill: "ma2-missing-factor", questions: [...Y4A.MISSING_TIMES, ...Y4AX.MISSING_TIMES] },
    ],
  },
  {
    n: 402,
    subject: "maths",
    year: 4,
    title: "Fractions",
    description: "Halves, quarters, thirds, fifths and their family on a number line.",
    subtopics: [{ n: 40201, skill: "ma2-equivalent-fractions", questions: [...Y4A.FRACTIONS, ...Y4AX.FRACTIONS] }],
  },
  {
    n: 406,
    subject: "maths",
    year: 4,
    title: "Measurement and time",
    description: "Length, area, capacity, mass and time.",
    subtopics: [
      {
        n: 40601,
        title: "Length",
        description: "Measures, estimates and converts lengths in metres, centimetres and millimetres.",
        outcome: "MA2-GM-02",
        questions: [...Y4A.LENGTH, ...Y4AX.LENGTH],
      },
      {
        n: 40605,
        title: "Area",
        description: "Measures and compares areas in square centimetres and square metres.",
        outcome: "MA2-2DS-03",
        questions: [...Y4B.AREA, ...Y4BX.AREA],
      },
      {
        n: 40604,
        title: "Capacity and volume",
        description: "Measures capacity in litres and millilitres, and volume in cubic centimetres.",
        outcome: "MA2-3DS-02",
        questions: [...Y4B.CAPACITY, ...Y4BX.CAPACITY],
      },
      {
        n: 40603,
        title: "Mass",
        description: "Estimates, measures and compares mass in kilograms and grams.",
        outcome: "MA2-NSM-01",
        questions: [...Y4B.MASS, ...Y4BX.MASS],
      },
      {
        n: 40602,
        title: "Time",
        description: "Reads analog and digital time to the minute and works out durations.",
        outcome: "MA2-NSM-02",
        questions: [...Y4A.TIME, ...Y4AX.TIME],
      },
    ],
  },
  {
    n: 403,
    subject: "maths",
    year: 4,
    title: "Shapes, angles and position",
    description: "2D shapes, 3D objects, angles and grid maps.",
    subtopics: [
      {
        n: 40301,
        title: "2D shapes",
        description: "Names 2D shapes and describes them by their sides and angles.",
        outcome: "MA2-2DS-01",
        questions: [...Y4B.SHAPES_2D, ...Y4BX.SHAPES_2D],
      },
      {
        n: 40302,
        title: "Moving and combining shapes",
        description: "Flips, slides and turns shapes, and finds lines of symmetry.",
        outcome: "MA2-2DS-02",
        questions: [...Y4B.TRANSFORM, ...Y4BX.TRANSFORM],
      },
      {
        n: 40303,
        title: "3D objects",
        description: "Describes prisms and pyramids and matches them to their nets.",
        outcome: "MA2-3DS-01",
        questions: [...Y4B.OBJECTS_3D, ...Y4BX.OBJECTS_3D],
      },
      {
        n: 40304,
        title: "Angles",
        description: "Compares angles to a right angle: acute, right, obtuse and straight.",
        outcome: "MA2-GM-03",
        questions: [...Y4B.ANGLES, ...Y4BX.ANGLES],
      },
      {
        n: 40305,
        title: "Grid maps and directions",
        description: "Uses grid references, compass directions and routes.",
        outcome: "MA2-GM-01",
        questions: [...Y4B.POSITION, ...Y4BX.POSITION],
      },
    ],
  },
  {
    n: 407,
    subject: "maths",
    year: 4,
    title: "Data and chance",
    description: "Collecting data, reading graphs and chance experiments.",
    subtopics: [
      {
        n: 40702,
        title: "Collecting data and making graphs",
        description: "Collects data and draws graphs with a given scale.",
        outcome: "MA2-DATA-01",
        questions: [...Y4B.DATA_COLLECT, ...Y4BX.DATA_COLLECT],
      },
      {
        n: 40701,
        title: "Tables and graphs",
        description: "Reads and compares data in tables, dot plots and column graphs.",
        outcome: "MA2-DATA-02",
        questions: [...Y4A.DATA, ...Y4AX.DATA],
      },
      {
        n: 40703,
        title: "Chance",
        description: "Records chance experiments and compares the results.",
        outcome: "MA2-CHAN-01",
        questions: [...Y4B.CHANCE, ...Y4BX.CHANCE],
      },
    ],
  },

  // ---------- Mathematics, Year 5: 15 questions for each Stage 3 standard (see bank/maths-year5a.ts and 5b) ----------
  {
    n: 501,
    subject: "maths",
    year: 5,
    title: "Number and place value",
    description: "Large numbers, rounding, factors and primes.",
    subtopics: [{ n: 50101, skill: "ma3-large-numbers", questions: [...Y5A.PLACE_VALUE, ...Y5AX.PLACE_VALUE] }],
  },
  {
    n: 502,
    subject: "maths",
    year: 5,
    title: "Calculating",
    description: "Adding, subtracting, multiplying, dividing and the order of operations.",
    subtopics: [
      { n: 50302, skill: "ma3-add-sub-decimals", questions: [...Y5A.ADD_SUB, ...Y5AX.ADD_SUB] },
      { n: 50201, skill: "ma3-multiply", questions: [...Y5A.MULT_DIV, ...Y5AX.MULT_DIV] },
      { n: 50202, skill: "ma3-divide-remainders", questions: [...SMALL.REMAINDERS, ...SMALL.REMAINDERS_2] },
      {
        n: 50401,
        title: "Number sentences",
        description: "Completes number sentences using the order of operations.",
        outcome: "MA3-MR-02",
        questions: [...Y5A.NUMBER_SENTENCES, ...Y5AX.NUMBER_SENTENCES],
      },
    ],
  },
  {
    n: 503,
    subject: "maths",
    year: 5,
    title: "Fractions, decimals and percentages",
    description: "Decimals to thousandths, fractions and percentages.",
    subtopics: [
      { n: 50301, skill: "ma3-decimals", questions: [...Y5A.DECIMALS, ...Y5AX.DECIMALS] },
      COMPARING_DECIMALS,
      {
        n: 50304,
        title: "Comparing fractions",
        description: "Compares, orders, adds and subtracts fractions.",
        outcome: "MA3-RQF-01",
        questions: [...Y5A.FRACTIONS, ...Y5AX.FRACTIONS],
      },
      {
        n: 50305,
        title: "Fractions of amounts",
        description: "Finds a half, quarter, fifth and tenth of measures and amounts.",
        outcome: "MA3-RQF-02",
        questions: [...Y5A.FRACTION_OF, ...Y5AX.FRACTION_OF],
      },
      {
        n: 50306,
        title: "Percentages",
        description: "Finds percentages of amounts and matches them to fractions and decimals.",
        outcome: "MA3-RN-03",
        questions: [...Y5A.PERCENT, ...Y5AX.PERCENT],
      },
    ],
  },
  {
    n: 505,
    subject: "maths",
    year: 5,
    title: "Measurement",
    description: "Length, area, volume, mass and time.",
    subtopics: [
      {
        n: 50501,
        title: "Length and perimeter",
        description: "Measures lengths and distances, and works out perimeters.",
        outcome: "MA3-GM-02",
        questions: [...Y5B.LENGTH, ...Y5BX.LENGTH],
      },
      {
        n: 50502,
        title: "Area of rectangles",
        description: "Works out areas, including rectangles, in the right units.",
        outcome: "MA3-2DS-02",
        questions: [...Y5B.AREA, ...Y5BX.AREA],
      },
      {
        n: 50503,
        title: "Area of triangles and parallelograms",
        description: "Splits and rearranges shapes to find the area of triangles and parallelograms.",
        outcome: "MA3-2DS-03",
        questions: [...Y5B.AREA_TRI, ...Y5BX.AREA_TRI],
      },
      {
        n: 50504,
        title: "Volume and capacity",
        description: "Estimates, measures and works out volumes and capacities.",
        outcome: "MA3-3DS-02",
        questions: [...Y5B.VOLUME, ...Y5BX.VOLUME],
      },
      {
        n: 50505,
        title: "Mass",
        description: "Chooses units and devices to measure mass.",
        outcome: "MA3-NSM-01",
        questions: [...Y5B.MASS, ...Y5BX.MASS],
      },
      {
        n: 50506,
        title: "Time",
        description: "Uses 12- and 24-hour time and works out durations.",
        outcome: "MA3-NSM-02",
        questions: [...Y5B.TIME, ...Y5BX.TIME],
      },
    ],
  },
  {
    n: 506,
    subject: "maths",
    year: 5,
    title: "Geometry",
    description: "Shapes, 3D objects, angles and coordinates.",
    subtopics: [
      {
        n: 50601,
        title: "Classifying shapes",
        description: "Classifies triangles and quadrilaterals by their properties.",
        outcome: "MA3-2DS-01",
        questions: [...Y5B.SHAPES_2D, ...Y5BX.SHAPES_2D],
      },
      {
        n: 50602,
        title: "Prisms, pyramids and nets",
        description: "Visualises 3D objects and matches them to their nets.",
        outcome: "MA3-3DS-01",
        questions: [...Y5B.OBJECTS_3D, ...Y5BX.OBJECTS_3D],
      },
      {
        n: 50603,
        title: "Angles",
        description: "Measures angles and uses angles on a line and at a point.",
        outcome: "MA3-GM-03",
        questions: [...Y5B.ANGLES, ...Y5BX.ANGLES],
      },
      {
        n: 50604,
        title: "Coordinates",
        description: "Plots and reads points on a coordinate grid.",
        outcome: "MA3-GM-01",
        questions: [...Y5B.COORDINATES, ...Y5BX.COORDINATES],
      },
    ],
  },
  {
    n: 507,
    subject: "maths",
    year: 5,
    title: "Data and chance",
    description: "Graphs with scales, line graphs and probability.",
    subtopics: [
      {
        n: 50701,
        title: "Making graphs",
        description: "Draws graphs using scales where one mark stands for many.",
        outcome: "MA3-DATA-01",
        questions: [...Y5A.GRAPHS, ...Y5AX.GRAPHS],
      },
      {
        n: 50702,
        title: "Reading data displays",
        description: "Interprets tables, graphs, timelines and line graphs.",
        outcome: "MA3-DATA-02",
        questions: [...Y5A.DATA, ...Y5AX.DATA],
      },
      {
        n: 50703,
        title: "Probability",
        description: "Runs chance experiments and gives probabilities as numbers.",
        outcome: "MA3-CHAN-01",
        questions: [...Y5A.CHANCE, ...Y5AX.CHANCE],
      },
    ],
  },

  // ---------- Mathematics, Year 6: 15 questions for each Stage 3 standard (see bank/maths-year6a.ts and 6b) ----------
  {
    n: 604,
    subject: "maths",
    year: 6,
    title: "Number and place value",
    description: "Large numbers, negative numbers and number properties.",
    subtopics: [
      {
        n: 60401,
        title: "Place value and number properties",
        description: "Works with large and negative numbers, primes, composites and square numbers.",
        outcome: "MA3-RN-01",
        questions: [...Y6A.PLACE_VALUE, ...Y6AX.PLACE_VALUE],
      },
    ],
  },
  {
    n: 601,
    subject: "maths",
    year: 6,
    title: "Calculating",
    description: "The four operations and the order of operations.",
    subtopics: [
      {
        n: 60103,
        title: "Adding and subtracting",
        description: "Chooses strategies to add and subtract whole numbers and decimals.",
        outcome: "MA3-AR-01",
        questions: [...Y6A.ADD_SUB, ...Y6AX.ADD_SUB],
      },
      {
        n: 60102,
        title: "Multiplying and dividing",
        description: "Chooses strategies to multiply and divide, including decimals.",
        outcome: "MA3-MR-01",
        questions: [...Y6A.MULT_DIV, ...Y6AX.MULT_DIV],
      },
      { n: 60101, skill: "ma3-order-of-operations", questions: [...Y6A.NUMBER_SENTENCES, ...Y6AX.NUMBER_SENTENCES] },
    ],
  },
  {
    n: 602,
    subject: "maths",
    year: 6,
    title: "Fractions, decimals and percentages",
    description: "Comparing and adding fractions, fractions of amounts, decimals and percentages.",
    subtopics: [
      {
        n: 60204,
        title: "Decimals",
        description: "Compares and orders decimals to three decimal places.",
        outcome: "MA3-RN-02",
        questions: [...Y6A.DECIMALS, ...Y6AX.DECIMALS],
      },
      { n: 60201, skill: "ma3-add-fractions", questions: [...Y6A.FRACTIONS, ...Y6AX.FRACTIONS] },
      { n: 60202, skill: "ma3-fraction-of-quantity", questions: [...Y6A.FRACTION_OF, ...Y6AX.FRACTION_OF] },
      { n: 60203, skill: "ma3-percentages", questions: [...Y6A.PERCENT, ...Y6AX.PERCENT] },
    ],
  },
  {
    n: 605,
    subject: "maths",
    year: 6,
    title: "Measurement",
    description: "Length, area, volume, mass and time.",
    subtopics: [
      {
        n: 60501,
        title: "Length and perimeter",
        description: "Converts units of length and works out perimeters.",
        outcome: "MA3-GM-02",
        questions: [...Y6B.LENGTH, ...Y6BX.LENGTH],
      },
      {
        n: 60502,
        title: "Area",
        description: "Works out areas of rectangles and composite shapes.",
        outcome: "MA3-2DS-02",
        questions: [...Y6B.AREA, ...Y6BX.AREA],
      },
      {
        n: 60503,
        title: "Area of triangles and parallelograms",
        description: "Uses base and height to find the area of triangles and parallelograms.",
        outcome: "MA3-2DS-03",
        questions: [...Y6B.AREA_TRI, ...Y6BX.AREA_TRI],
      },
      {
        n: 60504,
        title: "Volume and capacity",
        description: "Works out volumes of prisms and links cubic centimetres to millilitres.",
        outcome: "MA3-3DS-02",
        questions: [...Y6B.VOLUME, ...Y6BX.VOLUME],
      },
      {
        n: 60505,
        title: "Mass",
        description: "Measures and converts mass in grams, kilograms and tonnes.",
        outcome: "MA3-NSM-01",
        questions: [...Y6B.MASS, ...Y6BX.MASS],
      },
      {
        n: 60506,
        title: "Time",
        description: "Reads timetables, 24-hour time and Australian time zones.",
        outcome: "MA3-NSM-02",
        questions: [...Y6B.TIME, ...Y6BX.TIME],
      },
    ],
  },
  {
    n: 603,
    subject: "maths",
    year: 6,
    title: "Geometry",
    description: "Angles, shapes, 3D objects and coordinates.",
    subtopics: [
      {
        n: 60301,
        title: "Angles",
        description: "Names types of angles and uses angle facts to find unknown angles.",
        outcome: "MA3-GM-03",
        questions: [...Y6B.ANGLES, ...Y6BX.ANGLES],
      },
      {
        n: 60302,
        title: "Classifying shapes",
        description: "Classifies triangles and quadrilaterals by their properties.",
        outcome: "MA3-2DS-01",
        questions: [...Y6B.SHAPES_2D, ...Y6BX.SHAPES_2D],
      },
      {
        n: 60303,
        title: "Prisms, pyramids and nets",
        description: "Visualises 3D objects from different views and matches them to their nets.",
        outcome: "MA3-3DS-01",
        questions: [...Y6B.OBJECTS_3D, ...Y6BX.OBJECTS_3D],
      },
      {
        n: 60304,
        title: "Coordinates",
        description: "Plots and reads points in all four quadrants.",
        outcome: "MA3-GM-01",
        questions: [...Y6B.COORDINATES, ...Y6BX.COORDINATES],
      },
    ],
  },
  {
    n: 606,
    subject: "maths",
    year: 6,
    title: "Data and chance",
    description: "Graphs with scales, line graphs and probability.",
    subtopics: [
      {
        n: 60601,
        title: "Making graphs",
        description: "Draws graphs using scales where one mark stands for many.",
        outcome: "MA3-DATA-01",
        questions: [...Y6A.GRAPHS, ...Y6AX.GRAPHS],
      },
      {
        n: 60602,
        title: "Reading data displays",
        description: "Interprets tables, graphs, timelines and line graphs.",
        outcome: "MA3-DATA-02",
        questions: [...Y6A.DATA, ...Y6AX.DATA],
      },
      {
        n: 60603,
        title: "Probability",
        description: "Gives probabilities as fractions, decimals and percentages.",
        outcome: "MA3-CHAN-01",
        questions: [...Y6A.CHANCE, ...Y6AX.CHANCE],
      },
    ],
  },

  // ---------- English, Year 3 ----------
  {
    n: 311,
    subject: "english",
    year: 3,
    title: "Spelling",
    description: "Spelling patterns and rules.",
    subtopics: [{ n: 31101, skill: "en2-spelling", questions: [...E3.SPELLING, ...E3X.SPELLING] }],
  },
  {
    n: 312,
    subject: "english",
    year: 3,
    title: "Vocabulary",
    description: "Word meanings.",
    subtopics: [{ n: 31201, skill: "en2-vocabulary", questions: [...E3.VOCAB, ...E3X.VOCAB] }],
  },
  {
    n: 313,
    subject: "english",
    year: 3,
    title: "Reading",
    description: "Understanding what you read.",
    subtopics: [
      { n: 31301, skill: "en2-comprehension", questions: [...E3.READING, ...E3X.READING] },
      {
        n: 31302,
        title: "Stories and poems",
        description: "Talks about characters, settings, feelings and the sound of poems.",
        outcome: "EN2-UARL-01",
        questions: [...E3.LITERATURE, ...E3X.LITERATURE],
      },
    ],
  },
  {
    n: 314,
    subject: "english",
    year: 3,
    title: "Grammar and punctuation",
    description: "Writing correct sentences.",
    subtopics: [
      {
        n: 31401,
        title: "Capital letters and full stops",
        description: "Uses capital letters and end punctuation correctly.",
        questions: [
          choice(
            3140101,
            "Which sentence is written correctly?",
            ["my dog is called rex.", "My dog is called Rex.", "My dog is called rex", "my Dog is called Rex."],
            1,
            "A sentence starts with a capital letter and ends with a full stop. Rex is a name, so it needs a capital letter too.",
          ),
          multi(
            3140102,
            "Which of these words should always start with a capital letter? Choose all that apply.",
            ["sydney", "monday", "banana", "emma", "school"],
            [0, 1, 3],
            "Names of places (Sydney), days (Monday) and people (Emma) always start with a capital letter.",
          ),
          trueFalse(
            3140103,
            "A sentence can end with a full stop, a question mark or an exclamation mark.",
            true,
            "All three can end a sentence. A question mark ends a question and an exclamation mark shows strong feeling.",
          ),
          typed(
            "fill_blank",
            3140104,
            "Type the punctuation mark that ends this question: Where are you going___",
            "?",
            "It's a question, so it ends with a question mark: Where are you going?",
          ),
          choice(
            3140105,
            "Which word in this sentence should start with a capital letter? 'On saturday we went to the beach.'",
            ["we", "saturday", "went", "beach"],
            1,
            "Days of the week always start with a capital letter: Saturday.",
          ),
          ...SMALL.CAPITALS,
          ...SMALL.CAPITALS_2,
        ],
      },
    ],
  },

  {
    n: 315,
    subject: "english",
    year: 3,
    title: "Writing",
    description: "Stories, information texts and persuasive texts.",
    subtopics: [
      {
        n: 31501,
        title: "Story writing",
        description: "Story structure, describing words, dialogue and punctuation.",
        outcome: "EN2-CWT-01",
        questions: [...E3.STORIES, ...E3X.STORIES],
      },
      {
        n: 31502,
        title: "Information texts",
        description: "Headings, facts, instructions and joining words.",
        outcome: "EN2-CWT-02",
        questions: [...E3.INFORMATIVE, ...E3X.INFORMATIVE],
      },
      {
        n: 31503,
        title: "Persuasive texts",
        description: "Opinions, reasons and persuasive words.",
        outcome: "EN2-CWT-03",
        questions: [...E3.PERSUASIVE, ...E3X.PERSUASIVE],
      },
    ],
  },

  // ---------- English, Year 4 ----------
  {
    n: 411,
    subject: "english",
    year: 4,
    title: "Writing",
    description: "Stories and persuasive writing.",
    subtopics: [
      { n: 41101, skill: "en2-imaginative" },
      { n: 41102, skill: "en2-persuasive" },
      {
        n: 41103,
        title: "Story features",
        description: "Story structure, dialogue, descriptive words and punctuation.",
        outcome: "EN2-CWT-01",
        questions: [...E4.STORIES, ...E4X.STORIES],
      },
      {
        n: 41104,
        title: "Information texts",
        description: "Headings, facts, procedures, reports and joining words.",
        outcome: "EN2-CWT-02",
        questions: [...E4.INFORMATIVE, ...E4X.INFORMATIVE],
      },
      {
        n: 41105,
        title: "Persuasive features",
        description: "Opinions, reasons, persuasive words and connectives.",
        outcome: "EN2-CWT-03",
        questions: [...E4.PERSUASIVE, ...E4X.PERSUASIVE],
      },
    ],
  },
  {
    n: 412,
    subject: "english",
    year: 4,
    title: "Grammar and punctuation",
    description: "Word types and building sentences.",
    subtopics: [
      {
        n: 41201,
        title: "Nouns, verbs and adjectives",
        description: "Identifies nouns, verbs and adjectives in sentences.",
        questions: [
          multi(
            4120101,
            "Which of these words are nouns? Choose all that apply.",
            ["table", "quickly", "dog", "jump", "city"],
            [0, 2, 4],
            "Nouns name people, places and things: table, dog and city. 'Quickly' is an adverb and 'jump' is a verb.",
          ),
          choice(
            4120102,
            "Which word is the verb in this sentence? 'The children laughed at the funny clown.'",
            ["children", "laughed", "funny", "clown"],
            1,
            "A verb is a doing word. 'Laughed' is what the children did.",
          ),
          choice(
            4120103,
            "Which word is an adjective in this sentence? 'A tiny bird sang outside.'",
            ["tiny", "bird", "sang", "outside"],
            0,
            "An adjective describes a noun. 'Tiny' describes the bird.",
          ),
          trueFalse(
            4120104,
            "In the sentence 'Mia runs fast', the word 'runs' is a verb.",
            true,
            "'Runs' is what Mia does, so it's a verb.",
          ),
          typed(
            "fill_blank",
            4120105,
            "Write the past tense of 'go' to finish the sentence: Yesterday I ___ to the park.",
            "went",
            "The past tense of 'go' is 'went': Yesterday I went to the park.",
          ),
          ...SMALL.WORD_CLASSES,
          ...SMALL.WORD_CLASSES_2,
        ],
      },
      {
        n: 41202,
        title: "Building sentences",
        description: "Puts words and events in a sensible order.",
        questions: [
          ordering(
            4120201,
            "Put the words in order to make a sentence.",
            ["The", "dog", "barked", "loudly."],
            "The capital letter shows the first word and the full stop shows the last: The dog barked loudly.",
          ),
          ordering(
            4120202,
            "Put these events in the order they happened.",
            ["Sam woke up and got dressed.", "Sam ate breakfast.", "Sam walked to school.", "The school bell rang."],
            "Sam got up, had breakfast, walked to school, and then the bell rang.",
          ),
          ordering(
            4120203,
            "Put these words in alphabetical order.",
            ["emu", "kangaroo", "koala", "wombat"],
            "Look at the first letters: e, k, k, w. 'Kangaroo' and 'koala' both start with k, so look at the second letters: a comes before o.",
          ),
          ...SMALL.BUILDING_SENTENCES,
          ...SMALL.BUILDING_SENTENCES_2,
        ],
      },
    ],
  },

  {
    n: 413,
    subject: "english",
    year: 4,
    title: "Spelling",
    description: "Spelling patterns, plurals, prefixes and suffixes.",
    subtopics: [
      {
        n: 41301,
        title: "Spelling patterns",
        description: "Uses sounds, patterns and word parts to spell words.",
        outcome: "EN2-SPELL-01",
        questions: [...E4.SPELLING, ...E4X.SPELLING],
      },
    ],
  },
  {
    n: 414,
    subject: "english",
    year: 4,
    title: "Vocabulary",
    description: "Word meanings.",
    subtopics: [
      {
        n: 41401,
        title: "Word meanings",
        description: "Synonyms, antonyms, word families and meaning from context.",
        outcome: "EN2-VOCAB-01",
        questions: [...E4.VOCAB, ...E4X.VOCAB],
      },
    ],
  },
  {
    n: 415,
    subject: "english",
    year: 4,
    title: "Reading",
    description: "Understanding stories, poems and information texts.",
    subtopics: [
      {
        n: 41501,
        title: "Reading comprehension",
        description: "Finds information and makes inferences in a range of texts.",
        outcome: "EN2-RECOM-01",
        questions: [...E4.READING, ...E4X.READING],
      },
      {
        n: 41502,
        title: "Stories and poems",
        description: "Talks about characters, settings, point of view and the sound of poems.",
        outcome: "EN2-UARL-01",
        questions: [...E4.LITERATURE, ...E4X.LITERATURE],
      },
    ],
  },

  // ---------- English, Year 5 ----------
  {
    n: 511,
    subject: "english",
    year: 5,
    title: "Spelling",
    description: "Prefixes, suffixes and tricky words.",
    subtopics: [{ n: 51101, skill: "en3-spelling", questions: [...E5.SPELLING, ...E5X.SPELLING] }],
  },
  {
    n: 512,
    subject: "english",
    year: 5,
    title: "Vocabulary",
    description: "Choosing precise words.",
    subtopics: [{ n: 51201, skill: "en3-vocabulary", questions: [...E5.VOCAB, ...E5X.VOCAB] }],
  },
  {
    n: 513,
    subject: "english",
    year: 5,
    title: "Reading",
    description: "Inference and author's purpose.",
    subtopics: [
      { n: 51301, skill: "en3-comprehension", questions: [...E5.READING, ...E5X.READING] },
      {
        n: 51302,
        title: "Character, imagery and symbol",
        description: "Explains how writers use character, imagery and symbols to share ideas.",
        outcome: "EN3-UARL-01",
        questions: [...E5.LITERATURE, ...E5X.LITERATURE],
      },
      {
        n: 51303,
        title: "Genre, theme and point of view",
        description: "Compares genres and themes, and how a writer's point of view shapes a text.",
        outcome: "EN3-UARL-02",
        questions: [...E5.GENRE_THEME, ...E5X.GENRE_THEME],
      },
    ],
  },
  {
    n: 514,
    subject: "english",
    year: 5,
    title: "Grammar and punctuation",
    description: "Punctuation for meaning.",
    subtopics: [
      {
        n: 51401,
        title: "Apostrophes",
        description: "Uses apostrophes for contractions and to show belonging.",
        questions: [
          choice(
            5140101,
            "One dog has a bone. Which is correct?",
            ["the dogs bone", "the dog's bone", "the dogs' bone", "the dog,s bone"],
            1,
            "To show something belongs to one owner, add 's: the dog's bone.",
          ),
          typed(
            "fill_blank",
            5140102,
            "Write the short form (contraction) of 'do not': ___",
            "don't",
            "'Do not' becomes 'don't'. The apostrophe takes the place of the missing o.",
          ),
          trueFalse(
            5140103,
            "'Its' with no apostrophe means 'belonging to it'.",
            true,
            "'Its' means belonging to it (the dog wagged its tail). 'It's' is short for 'it is' or 'it has'.",
          ),
          multi(
            5140104,
            "Which sentences use apostrophes correctly? Choose all that apply.",
            ["I can't come.", "The cat's tail is long.", "I like apple's.", "We're late!", "The boy's are playing."],
            [0, 1, 3],
            "'Can't' and 'we're' are contractions, and 'cat's' shows the tail belongs to the cat. Plurals like 'apples' and 'boys' don't need an apostrophe.",
          ),
          typed(
            "fill_blank",
            5140105,
            "Write the short form (contraction) of 'they are': ___",
            "they're",
            "'They are' becomes 'they're'. The apostrophe takes the place of the missing a.",
          ),
          ...SMALL.APOSTROPHES,
          ...SMALL.APOSTROPHES_2,
        ],
      },
    ],
  },

  {
    n: 515,
    subject: "english",
    year: 5,
    title: "Writing",
    description: "Writing for different purposes and audiences.",
    subtopics: [
      {
        n: 51501,
        title: "Writing skills",
        description: "Text features, complex sentences, punctuation and cohesion across text types.",
        outcome: "EN3-CWT-01",
        questions: [...E5.WRITING, ...E5X.WRITING],
      },
    ],
  },

  // ---------- English, Year 6 ----------
  {
    n: 611,
    subject: "english",
    year: 6,
    title: "Writing",
    description: "Informative and persuasive writing.",
    subtopics: [
      { n: 61101, skill: "en3-informative" },
      { n: 61102, skill: "en3-persuasive" },
      {
        n: 61103,
        title: "Writing skills",
        description: "Text features, complex sentences, punctuation and cohesion across text types.",
        outcome: "EN3-CWT-01",
        questions: [...E6.WRITING, ...E6X.WRITING],
      },
    ],
  },
  {
    n: 612,
    subject: "english",
    year: 6,
    title: "Language and style",
    description: "How writers use language for effect.",
    subtopics: [
      {
        n: 61201,
        title: "Figurative language",
        description: "Recognises similes, metaphors, personification and onomatopoeia.",
        questions: [
          choice(
            6120101,
            "Which sentence uses a simile?",
            ["The wind howled all night.", "She was as quiet as a mouse.", "The classroom was a zoo.", "Buzz went the bee."],
            1,
            "A simile compares two things using 'like' or 'as': as quiet as a mouse.",
          ),
          choice(
            6120102,
            "'The classroom was a zoo.' What kind of figurative language is this?",
            ["simile", "metaphor", "onomatopoeia", "alliteration"],
            1,
            "It's a metaphor: it says the classroom was a zoo, without 'like' or 'as'.",
          ),
          trueFalse(
            6120103,
            "A simile compares two things using 'like' or 'as'.",
            true,
            "That's what makes it a simile, for example 'as brave as a lion'.",
          ),
          multi(
            6120104,
            "Which of these words are onomatopoeia? Choose all that apply.",
            ["buzz", "sizzle", "happy", "crash", "slowly"],
            [0, 1, 3],
            "Onomatopoeia words sound like what they describe: buzz, sizzle and crash.",
          ),
          choice(
            6120105,
            "'The sun smiled down on us.' What kind of figurative language is this?",
            ["personification", "simile", "onomatopoeia", "alliteration"],
            0,
            "The sun can't really smile. Giving human actions to things that aren't human is personification.",
          ),
          ...SMALL.FIGURATIVE,
          ...SMALL.FIGURATIVE_2,
        ],
      },
    ],
  },
  {
    n: 613,
    subject: "english",
    year: 6,
    title: "Spelling",
    description: "Word origins, prefixes, suffixes and tricky words.",
    subtopics: [
      {
        n: 61301,
        title: "Spelling",
        description: "Uses roots, prefixes, suffixes and patterns to spell words.",
        outcome: "EN3-SPELL-01",
        questions: [...E6.SPELLING, ...E6X.SPELLING],
      },
    ],
  },
  {
    n: 614,
    subject: "english",
    year: 6,
    title: "Vocabulary",
    description: "Precise and subject-specific words.",
    subtopics: [
      {
        n: 61401,
        title: "Word meanings",
        description: "Precise meanings, word roots and words for each subject.",
        outcome: "EN3-VOCAB-01",
        questions: [...E6.VOCAB, ...E6X.VOCAB],
      },
    ],
  },
  {
    n: 615,
    subject: "english",
    year: 6,
    title: "Reading",
    description: "Inference, author's purpose and literature.",
    subtopics: [
      {
        n: 61501,
        title: "Reading comprehension",
        description: "Infers, finds the main idea and explains the author's purpose.",
        outcome: "EN3-RECOM-01",
        questions: [...E6.READING, ...E6X.READING],
      },
      {
        n: 61502,
        title: "Character, imagery and symbol",
        description: "Explains how writers use character, imagery and symbols to share ideas.",
        outcome: "EN3-UARL-01",
        questions: [...E6.LITERATURE, ...E6X.LITERATURE],
      },
      {
        n: 61503,
        title: "Genre, theme and point of view",
        description: "Compares genres and themes, and how a writer's point of view shapes a text.",
        outcome: "EN3-UARL-02",
        questions: [...E6.GENRE_THEME, ...E6X.GENRE_THEME],
      },
    ],
  },
];

// ---------- Flattened into table rows ----------

export const TOPICS: Topic[] = [];
export const SUBTOPICS: Subtopic[] = [];
export const QUESTIONS: ContentQuestion[] = [];

for (const spec of TOPIC_SPECS) {
  const topicId = id("41", spec.n);
  const sortOrder =
    TOPICS.filter((t) => t.subject_id === SUBJECT_IDS[spec.subject] && t.year_level_id === yearLevelId(spec.year)).length + 1;
  TOPICS.push({
    id: topicId,
    subject_id: SUBJECT_IDS[spec.subject],
    year_level_id: yearLevelId(spec.year),
    title: spec.title,
    description: spec.description,
    sort_order: sortOrder,
  });
  spec.subtopics.forEach((sub, i) => {
    const subtopicId = id("51", sub.n);
    if ("skill" in sub) {
      const skill = getSkill(sub.skill);
      SUBTOPICS.push({
        id: subtopicId,
        topic_id: topicId,
        title: skill.title,
        description: skill.description,
        sort_order: i + 1,
        skill_id: skill.id,
        outcome_code: skill.outcome,
      });
    } else {
      SUBTOPICS.push({
        id: subtopicId,
        topic_id: topicId,
        title: sub.title,
        description: sub.description,
        sort_order: i + 1,
        skill_id: null,
        outcome_code: sub.outcome ?? null,
      });
    }
    for (const { n, difficulty, ...q } of sub.questions ?? []) {
      QUESTIONS.push({ id: id("61", n), subtopic_id: subtopicId, difficulty: difficulty ?? "medium", points: 1, ...q });
    }
  });
}

// ---------- Lookups ----------

export interface SubtopicPath {
  country: Country;
  state: State;
  subject: Subject;
  subjectKey: SubjectKey;
  year: YearLevel;
  topic: Topic;
  subtopic: Subtopic;
}

export function topicsFor(subject: SubjectKey, year: YearNumber): Topic[] {
  return TOPICS.filter((t) => t.subject_id === SUBJECT_IDS[subject] && t.year_level_id === yearLevelId(year)).sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}

export function subtopicsOf(topicId: string): Subtopic[] {
  return SUBTOPICS.filter((s) => s.topic_id === topicId).sort((a, b) => a.sort_order - b.sort_order);
}

export function questionsOf(subtopicId: string): ContentQuestion[] {
  return QUESTIONS.filter((q) => q.subtopic_id === subtopicId);
}

/** Years that have content for a subject. */
export function yearsWithContent(subject: SubjectKey): YearNumber[] {
  return YEARS.filter((y) => topicsFor(subject, y).length > 0);
}

export function subtopicPath(subtopicId: string): SubtopicPath | null {
  const subtopic = SUBTOPICS.find((s) => s.id === subtopicId);
  if (!subtopic) return null;
  const topic = TOPICS.find((t) => t.id === subtopic.topic_id)!;
  const subject = SUBJECTS.find((s) => s.id === topic.subject_id)!;
  const year = YEAR_LEVELS.find((y) => y.id === topic.year_level_id)!;
  const state = STATES.find((s) => s.id === subject.state_id)!;
  const country = COUNTRIES.find((c) => c.id === state.country_id)!;
  const subjectKey = (Object.keys(SUBJECT_IDS) as SubjectKey[]).find((k) => SUBJECT_IDS[k] === subject.id)!;
  return { country, state, subject, subjectKey, year, topic, subtopic };
}
