import { getSkill } from "../curriculum/skills";
import type { Subject as SubjectKey, YearLevel as YearNumber } from "../curriculum/types";
import type { ContentQuestion, Country, QuestionType, State, Subject, Subtopic, Topic, YearLevel } from "./types";

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

// ---------- my247tutor content: NSW Maths and English, Years 3–6 ----------

/*
 * Ids are written by hand so they never change when content is added or reordered:
 * stored progress and any database copy refer to them.
 *   topics     41000000-0000-0000-0000-<n>
 *   subtopics  51000000-0000-0000-0000-<n>
 *   questions  61000000-0000-0000-0000-<n>
 * The myteacher sample rows use the 40…/50… ranges, so these never collide with them.
 */
const id = (prefix: string, n: number) => `${prefix}000000-0000-0000-0000-${String(n).padStart(12, "0")}`;

type QuestionSpec = Omit<ContentQuestion, "id" | "subtopic_id" | "points" | "difficulty"> & {
  n: number;
  difficulty?: ContentQuestion["difficulty"];
};
type SubtopicSpec = { n: number; skill: string } | { n: number; title: string; description: string; questions: QuestionSpec[] };
interface TopicSpec {
  n: number;
  subject: SubjectKey;
  year: YearNumber;
  title: string;
  description: string;
  subtopics: SubtopicSpec[];
}

const LETTERS = "abcdefgh";
const options = (texts: string[]) => texts.map((text, i) => ({ id: LETTERS[i], text }));

function choice(n: number, question_text: string, texts: string[], correct: number, explanation: string): QuestionSpec {
  return {
    n,
    question_text,
    question_type: "multiple_choice",
    answer_options: options(texts),
    correct_answer: LETTERS[correct],
    explanation,
  };
}
function trueFalse(n: number, question_text: string, correct: boolean, explanation: string): QuestionSpec {
  return { n, question_text, question_type: "true_false", answer_options: null, correct_answer: String(correct), explanation };
}
function typed(type: QuestionType, n: number, question_text: string, accepted: string | string[], explanation: string): QuestionSpec {
  return { n, question_text, question_type: type, answer_options: null, correct_answer: accepted, explanation };
}
function multi(n: number, question_text: string, texts: string[], correct: number[], explanation: string): QuestionSpec {
  const correct_answer = correct.map((i) => LETTERS[i]);
  return { n, question_text, question_type: "multi_select", answer_options: options(texts), correct_answer, explanation };
}
/** Options are written in the correct order; the app shuffles them on screen. */
function ordering(n: number, question_text: string, inOrder: string[], explanation: string): QuestionSpec {
  const opts = options(inOrder);
  return { n, question_text, question_type: "ordering", answer_options: opts, correct_answer: opts.map((o) => o.id), explanation };
}

const TOPIC_SPECS: TopicSpec[] = [
  // ---------- Mathematics, Year 3 ----------
  {
    n: 301,
    subject: "maths",
    year: 3,
    title: "Number and place value",
    description: "Reading, writing and partitioning numbers.",
    subtopics: [{ n: 30101, skill: "ma2-place-value" }],
  },
  {
    n: 302,
    subject: "maths",
    year: 3,
    title: "Addition and subtraction",
    description: "Written and mental strategies for adding and subtracting.",
    subtopics: [
      { n: 30201, skill: "ma2-add-sub" },
      { n: 30202, skill: "ma2-missing-addend" },
    ],
  },
  {
    n: 303,
    subject: "maths",
    year: 3,
    title: "Multiplication and division",
    description: "Multiplication facts and groups.",
    subtopics: [{ n: 30301, skill: "ma2-times-tables" }],
  },
  {
    n: 304,
    subject: "maths",
    year: 3,
    title: "Measurement and time",
    description: "Reading clocks and working with units of time.",
    subtopics: [
      {
        n: 30401,
        title: "Telling the time",
        description: "Reads analog and digital times and works out how long things take.",
        questions: [
          choice(
            3040101,
            "The minute hand points to the 6 and the hour hand is halfway between the 3 and the 4. What time is it?",
            ["6:30", "3:30", "4:30", "3:06"],
            1,
            "When the minute hand points to the 6, it's half past. The hour hand has passed the 3, so it's half past 3, or 3:30.",
          ),
          typed("short_answer", 3040102, "How many minutes are there in 1 hour?", "60", "There are 60 minutes in 1 hour."),
          typed(
            "short_answer",
            3040103,
            "How many minutes are there from 2:15 to 2:45?",
            "30",
            "From 15 minutes past to 45 minutes past is 45 − 15 = 30 minutes.",
          ),
          trueFalse(
            3040104,
            "Quarter past 7 is the same time as 7:15.",
            true,
            "A quarter of an hour is 15 minutes, so quarter past 7 is 7:15.",
          ),
          ordering(
            3040105,
            "Put these morning times in order, from earliest to latest.",
            ["7:05", "7:50", "8:30", "9:45"],
            "Compare the hours first, then the minutes: 7:05, 7:50, 8:30, 9:45.",
          ),
          typed("fill_blank", 3040106, "There are ___ days in a week.", ["7", "seven"], "A week has 7 days, Monday to Sunday."),
        ],
      },
    ],
  },

  // ---------- Mathematics, Year 4 ----------
  {
    n: 401,
    subject: "maths",
    year: 4,
    title: "Multiplication and division",
    description: "Division facts and missing numbers.",
    subtopics: [
      { n: 40101, skill: "ma2-division-facts" },
      { n: 40102, skill: "ma2-missing-factor" },
    ],
  },
  {
    n: 402,
    subject: "maths",
    year: 4,
    title: "Fractions and decimals",
    description: "Equivalent fractions, tenths and hundredths.",
    subtopics: [
      { n: 40201, skill: "ma2-equivalent-fractions" },
      { n: 40202, skill: "ma2-decimals" },
    ],
  },
  {
    n: 403,
    subject: "maths",
    year: 4,
    title: "Shapes",
    description: "Naming and describing two-dimensional shapes.",
    subtopics: [
      {
        n: 40301,
        title: "2D shapes",
        description: "Names 2D shapes and describes them by their sides and angles.",
        questions: [
          multi(
            4030101,
            "Which of these shapes have exactly 4 sides? Choose all that apply.",
            ["square", "triangle", "rectangle", "pentagon", "rhombus"],
            [0, 2, 4],
            "Squares, rectangles and rhombuses all have 4 sides. A triangle has 3 and a pentagon has 5.",
          ),
          typed(
            "short_answer",
            4030102,
            "How many sides does a hexagon have?",
            ["6", "six"],
            "A hexagon has 6 sides. Think of the cells in a beehive.",
          ),
          trueFalse(
            4030103,
            "Every square is also a rectangle.",
            true,
            "A rectangle has 4 sides and 4 right angles. A square has those too, with all sides the same length, so it's a special rectangle.",
          ),
          choice(4030104, "Which shape has 5 sides?", ["hexagon", "octagon", "pentagon", "quadrilateral"], 2, "A pentagon has 5 sides."),
          typed("fill_blank", 4030105, "An octagon has ___ sides.", ["8", "eight"], "An octagon has 8 sides, like a stop sign."),
          trueFalse(
            4030106,
            "A triangle can have two right angles.",
            false,
            "Two right angles already make 180°, which is all the angles in a triangle added together, so there'd be nothing left for the third angle.",
          ),
        ],
      },
    ],
  },

  // ---------- Mathematics, Year 5 ----------
  {
    n: 501,
    subject: "maths",
    year: 5,
    title: "Number and place value",
    description: "Large numbers and rounding.",
    subtopics: [{ n: 50101, skill: "ma3-large-numbers" }],
  },
  {
    n: 502,
    subject: "maths",
    year: 5,
    title: "Multiplication and division",
    description: "Multiplying larger numbers and dividing with remainders.",
    subtopics: [
      { n: 50201, skill: "ma3-multiply" },
      { n: 50202, skill: "ma3-divide-remainders" },
    ],
  },
  {
    n: 503,
    subject: "maths",
    year: 5,
    title: "Fractions and decimals",
    description: "Decimals to thousandths, and adding and subtracting them.",
    subtopics: [
      { n: 50301, skill: "ma3-decimals" },
      { n: 50302, skill: "ma3-add-sub-decimals" },
      {
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
        ],
      },
    ],
  },

  // ---------- Mathematics, Year 6 ----------
  {
    n: 601,
    subject: "maths",
    year: 6,
    title: "Calculating",
    description: "Using the order of operations.",
    subtopics: [{ n: 60101, skill: "ma3-order-of-operations" }],
  },
  {
    n: 602,
    subject: "maths",
    year: 6,
    title: "Fractions, decimals and percentages",
    description: "Adding fractions, fractions of amounts and percentages.",
    subtopics: [
      { n: 60201, skill: "ma3-add-fractions" },
      { n: 60202, skill: "ma3-fraction-of-quantity" },
      { n: 60203, skill: "ma3-percentages" },
    ],
  },
  {
    n: 603,
    subject: "maths",
    year: 6,
    title: "Geometry",
    description: "Angles and their properties.",
    subtopics: [
      {
        n: 60301,
        title: "Angles",
        description: "Names types of angles and uses angle facts to find unknown angles.",
        questions: [
          choice(
            6030101,
            "What do we call an angle of exactly 90°?",
            ["an acute angle", "a right angle", "an obtuse angle", "a straight angle"],
            1,
            "An angle of exactly 90° is a right angle, like the corner of a book.",
          ),
          typed(
            "short_answer",
            6030102,
            "Angles on a straight line add up to how many degrees?",
            "180",
            "Angles on a straight line add up to 180°.",
          ),
          typed(
            "short_answer",
            6030103,
            "Two angles together make a straight line. One is 65°. How many degrees is the other one?",
            "115",
            "Angles on a straight line add up to 180°, so the other angle is 180 − 65 = 115°.",
          ),
          multi(
            6030104,
            "Which of these angles are obtuse? Choose all that apply.",
            ["45°", "120°", "90°", "170°", "200°"],
            [1, 3],
            "Obtuse angles are between 90° and 180°, so 120° and 170° are obtuse. 200° is a reflex angle.",
          ),
          trueFalse(
            6030105,
            "The angles inside any triangle add up to 180°.",
            true,
            "The three angles inside every triangle add up to 180°.",
          ),
          typed(
            "short_answer",
            6030106,
            "Angles around a point add up to how many degrees?",
            "360",
            "A full turn is 360°, so angles around a point add up to 360°.",
          ),
        ],
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
    subtopics: [{ n: 31101, skill: "en2-spelling" }],
  },
  {
    n: 312,
    subject: "english",
    year: 3,
    title: "Vocabulary",
    description: "Word meanings.",
    subtopics: [{ n: 31201, skill: "en2-vocabulary" }],
  },
  {
    n: 313,
    subject: "english",
    year: 3,
    title: "Reading",
    description: "Understanding what you read.",
    subtopics: [{ n: 31301, skill: "en2-comprehension" }],
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
        ],
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
        ],
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
    subtopics: [{ n: 51101, skill: "en3-spelling" }],
  },
  {
    n: 512,
    subject: "english",
    year: 5,
    title: "Vocabulary",
    description: "Choosing precise words.",
    subtopics: [{ n: 51201, skill: "en3-vocabulary" }],
  },
  {
    n: 513,
    subject: "english",
    year: 5,
    title: "Reading",
    description: "Inference and author's purpose.",
    subtopics: [{ n: 51301, skill: "en3-comprehension" }],
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
        ],
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
        ],
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
      });
      return;
    }
    SUBTOPICS.push({
      id: subtopicId,
      topic_id: topicId,
      title: sub.title,
      description: sub.description,
      sort_order: i + 1,
      skill_id: null,
    });
    for (const { n, difficulty, ...q } of sub.questions) {
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

/** Years (3–6) that have content for a subject. */
export function yearsWithContent(subject: SubjectKey): YearNumber[] {
  return ([3, 4, 5, 6] as YearNumber[]).filter((y) => topicsFor(subject, y).length > 0);
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
