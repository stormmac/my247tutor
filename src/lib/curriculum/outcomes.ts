import type { Outcome } from "./types";

/**
 * NESA Mathematics K–10 (2022) and English K–10 (2022) outcomes for Stages 2 and 3.
 * Summaries are our own plain-language wording, not the syllabus text.
 * Source: https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/outcomes
 *         https://curriculum.nsw.edu.au/learning-areas/english/english-k-10-2022/outcomes
 */
export const OUTCOMES: Outcome[] = [
  // Mathematics, Stage 2 (Years 3–4)
  {
    code: "MA2-RN-01",
    subject: "maths",
    stage: 2,
    focusArea: "Representing numbers using place value",
    summary: "Place value to tens of thousands",
    codeVerified: true,
  },
  {
    code: "MA2-RN-02",
    subject: "maths",
    stage: 2,
    focusArea: "Representing numbers using place value",
    summary: "Decimals to two decimal places",
    codeVerified: true,
  },
  {
    code: "MA2-AR-01",
    subject: "maths",
    stage: 2,
    focusArea: "Additive relations",
    summary: "Addition and subtraction strategies",
    codeVerified: true,
  },
  {
    code: "MA2-AR-02",
    subject: "maths",
    stage: 2,
    focusArea: "Additive relations",
    summary: "Missing values in addition and subtraction",
    codeVerified: true,
  },
  {
    code: "MA2-MR-01",
    subject: "maths",
    stage: 2,
    focusArea: "Multiplicative relations",
    summary: "Multiplication and division facts to 10 × 10",
    codeVerified: true,
  },
  {
    code: "MA2-MR-02",
    subject: "maths",
    stage: 2,
    focusArea: "Multiplicative relations",
    summary: "Missing values in multiplication and division",
    codeVerified: true,
  },
  {
    code: "MA2-PF-01",
    subject: "maths",
    stage: 2,
    focusArea: "Partitioned fractions",
    summary: "Fractions, including on a number line",
    codeVerified: true,
  },
  {
    code: "MA2-GM-02",
    subject: "maths",
    stage: 2,
    focusArea: "Geometric measure",
    summary: "Length in metres, centimetres and millimetres",
    codeVerified: true,
  },
  {
    code: "MA2-NSM-02",
    subject: "maths",
    stage: 2,
    focusArea: "Non-spatial measure",
    summary: "Analog and digital time",
    codeVerified: true,
  },
  {
    code: "MA2-DATA-02",
    subject: "maths",
    stage: 2,
    focusArea: "Data",
    summary: "Interpreting tables, dot plots and column graphs",
    codeVerified: true,
  },
  { code: "MA2-CHAN-01", subject: "maths", stage: 2, focusArea: "Chance", summary: "Chance experiments", codeVerified: true },

  // Mathematics, Stage 3 (Years 5–6). Codes follow the Stage 2 pattern; confirm against the syllabus.
  {
    code: "MA3-RN-01",
    subject: "maths",
    stage: 3,
    focusArea: "Representing numbers using place value",
    summary: "Place value for numbers of any size, and rounding",
    codeVerified: false,
  },
  {
    code: "MA3-RN-02",
    subject: "maths",
    stage: 3,
    focusArea: "Representing numbers using place value",
    summary: "Decimals to three decimal places",
    codeVerified: false,
  },
  {
    code: "MA3-AR-01",
    subject: "maths",
    stage: 3,
    focusArea: "Additive relations",
    summary: "Adding and subtracting whole numbers and decimals",
    codeVerified: false,
  },
  {
    code: "MA3-MR-01",
    subject: "maths",
    stage: 3,
    focusArea: "Multiplicative relations",
    summary: "Multiplying and dividing larger numbers",
    codeVerified: false,
  },
  {
    code: "MA3-MR-02",
    subject: "maths",
    stage: 3,
    focusArea: "Multiplicative relations",
    summary: "Order of operations and number sentences",
    codeVerified: false,
  },
  {
    code: "MA3-RQF-01",
    subject: "maths",
    stage: 3,
    focusArea: "Representing quantity fractions",
    summary: "Comparing, adding and subtracting fractions",
    codeVerified: false,
  },
  {
    code: "MA3-RQF-02",
    subject: "maths",
    stage: 3,
    focusArea: "Representing quantity fractions",
    summary: "Fractions, decimals and percentages of quantities",
    codeVerified: false,
  },

  // English, Stage 2 (Years 3–4)
  {
    code: "EN2-OLC-01",
    subject: "english",
    stage: 2,
    focusArea: "Oral language and communication",
    summary: "Speaking and listening with familiar audiences",
    codeVerified: true,
  },
  { code: "EN2-VOCAB-01", subject: "english", stage: 2, focusArea: "Vocabulary", summary: "Building word knowledge", codeVerified: true },
  {
    code: "EN2-REFLU-01",
    subject: "english",
    stage: 2,
    focusArea: "Reading fluency",
    summary: "Reading with accuracy, speed and expression",
    codeVerified: true,
  },
  {
    code: "EN2-RECOM-01",
    subject: "english",
    stage: 2,
    focusArea: "Reading comprehension",
    summary: "Understanding a range of texts",
    codeVerified: true,
  },
  {
    code: "EN2-CWT-01",
    subject: "english",
    stage: 2,
    focusArea: "Creating written texts",
    summary: "Writing imaginative texts",
    codeVerified: true,
  },
  {
    code: "EN2-CWT-02",
    subject: "english",
    stage: 2,
    focusArea: "Creating written texts",
    summary: "Writing informative texts",
    codeVerified: true,
  },
  {
    code: "EN2-CWT-03",
    subject: "english",
    stage: 2,
    focusArea: "Creating written texts",
    summary: "Writing persuasive texts",
    codeVerified: true,
  },
  {
    code: "EN2-SPELL-01",
    subject: "english",
    stage: 2,
    focusArea: "Spelling",
    summary: "Spelling strategies and patterns",
    codeVerified: true,
  },
  {
    code: "EN2-UARL-01",
    subject: "english",
    stage: 2,
    focusArea: "Understanding and responding to literature",
    summary: "How ideas are shown in literature",
    codeVerified: true,
  },

  // English, Stage 3 (Years 5–6). Codes follow the Stage 2 pattern; confirm against the syllabus.
  {
    code: "EN3-VOCAB-01",
    subject: "english",
    stage: 3,
    focusArea: "Vocabulary",
    summary: "Precise and subject-specific vocabulary",
    codeVerified: false,
  },
  {
    code: "EN3-RECOM-01",
    subject: "english",
    stage: 3,
    focusArea: "Reading comprehension",
    summary: "Understanding complex texts, including inference",
    codeVerified: false,
  },
  {
    code: "EN3-CWT-01",
    subject: "english",
    stage: 3,
    focusArea: "Creating written texts",
    summary: "Writing imaginative texts",
    codeVerified: false,
  },
  {
    code: "EN3-CWT-02",
    subject: "english",
    stage: 3,
    focusArea: "Creating written texts",
    summary: "Writing informative texts",
    codeVerified: false,
  },
  {
    code: "EN3-CWT-03",
    subject: "english",
    stage: 3,
    focusArea: "Creating written texts",
    summary: "Writing persuasive texts",
    codeVerified: false,
  },
  {
    code: "EN3-SPELL-01",
    subject: "english",
    stage: 3,
    focusArea: "Spelling",
    summary: "Spelling using morphology and word origins",
    codeVerified: false,
  },
];

const byCode = new Map(OUTCOMES.map((o) => [o.code, o]));

export function getOutcome(code: string): Outcome {
  const outcome = byCode.get(code);
  if (!outcome) throw new Error(`Unknown outcome ${code}`);
  return outcome;
}
