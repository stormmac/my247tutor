import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CURRICULUM_SQL, UK_CURRICULUM_SQL, YEARS_SQL } from "../auth/curriculumSchema";
import { buildLesson } from "../content/lesson";
import { toPracticeQuestion } from "../content/practice";
import {
  QUESTIONS,
  SUBTOPICS,
  subtopicPath,
  subtopicsOf,
  questionsOf,
  topicsFor,
  overlaySubtopic,
  UK_TOPICS,
  US_TOPICS,
  usSubtopic,
  yearsWithContent,
} from "../content/tree";
import type { ContentQuestion } from "../content/types";
import { UK_SKILL_STANDARDS } from "../content/uk";
import { US_SKILL_STANDARDS } from "../content/us";
import {
  curriculumOf,
  localisePicture,
  localiseQuestion,
  pictureToUS,
  toUK,
  toUS,
  usableInUK,
  usableInUS,
  yearName,
} from "../curriculum/curricula";
import { YEARS } from "../curriculum/types";
import { questionsAt, startAssessment, summarySentence, finishAssessment } from "../learner/assessment";
import { currentLesson, saveLesson } from "../learner/lesson";
import { newProfile } from "../learner/model";
import { checkAnswer } from "../practice";
import { buildContextPrompt } from "../tutor/prompt";

const written = (q: Partial<ContentQuestion>): ContentQuestion => ({
  id: "q",
  subtopic_id: "s",
  question_text: "",
  question_type: "multiple_choice",
  difficulty: "medium",
  answer_options: null,
  correct_answer: "",
  explanation: "",
  points: 1,
  ...q,
});

describe("US English", () => {
  it("changes spelling and words, keeping capitals", () => {
    expect(toUS("Colour the favourite shape grey.")).toBe("Color the favorite shape gray.");
    expect(toUS("Mum measured 3 metres and 250 millilitres in maths.")).toBe("Mom measured 3 meters and 250 milliliters in math.");
    expect(toUS("Put a full stop at the end. Full stops end sentences.")).toBe("Put a period at the end. Periods end sentences.");
    expect(toUS("Year 4 organised the canteen. They realised it was anticlockwise.")).toBe(
      "Grade 4 organized the cafeteria. They realized it was counterclockwise.",
    );
    expect(toUS("Mr Ng has 15 lollies and an icy pole.")).toBe("Mr. Ng has 15 candies and a popsicle.");
  });

  it("leaves words that only look like British spellings alone", () => {
    expect(toUS("What a surprise! Do your exercise and take my advice.")).toBe("What a surprise! Do your exercise and take my advice.");
    expect(toUS("The metre stick")).toBe("The meter stick");
    expect(toUS("a computer")).toBe("a computer");
  });

  it("writes large numbers with commas", () => {
    expect(toUS("Round 6 482 951 to the nearest hundred thousand.")).toBe("Round 6,482,951 to the nearest hundred thousand.");
    expect(toUS("The crowd was 47 385 on day one.")).toBe("The crowd was 47,385 on day one.");
    expect(toUS("4723 people")).toBe("4723 people");
  });

  it("swaps Australian places for US ones, in the same case", () => {
    expect(toUS("A bus leaves Sydney for Newcastle.")).toBe("A bus leaves New York for Philadelphia.");
    expect(toUS("last friday mia went to perth.")).toBe("last friday mia went to denver.");
  });
});

describe("questions for the US", () => {
  it("hides questions only an Australian would know", () => {
    expect(usableInUS(written({ question_text: "How many years after Federation did the Sydney Harbour Bridge open?" }))).toBe(false);
    expect(usableInUS(written({ question_text: "Which unit is best for measuring the thickness of a 20-cent coin?" }))).toBe(false);
    expect(usableInUS(written({ question_text: "It is not daylight saving time. When it is 3 pm in Sydney…" }))).toBe(false);
    expect(usableInUS(written({ question_text: "It is July in Sydney. Is it more likely to be cold or hot?" }))).toBe(false);
    expect(usableInUS(written({ question_text: "A koala has 4 legs. How many legs do 4 koalas have?" }))).toBe(true);
    expect(usableInUS(written({ question_text: "A bus leaves Sydney at 9:50 am. The trip takes 2 hours." }))).toBe(true);
  });

  it("hides a spelling question whose choices become the same word", () => {
    const options = [
      { id: "a", text: "colour" },
      { id: "b", text: "color" },
      { id: "c", text: "culler" },
    ];
    expect(usableInUS(written({ question_text: "Which is spelt correctly?", answer_options: options }))).toBe(false);
    // Capital letters still tell choices apart.
    const caps = [
      { id: "a", text: "the dog ran." },
      { id: "b", text: "The dog ran." },
    ];
    expect(usableInUS(written({ question_text: "Which sentence starts with a capital letter?", answer_options: caps }))).toBe(true);
  });

  it("changes the words in a drawing but not its settings", () => {
    expect(pictureToUS({ kind: "column_graph", title: "Favourite colour", columns: [{ label: "Grey", value: 3 }] })).toEqual({
      kind: "column_graph",
      title: "Favorite color",
      columns: [{ label: "Gray", value: 3 }],
    });
    expect(pictureToUS({ kind: "bag", counters: [{ colour: "grey" as never, count: 2 }] })).toEqual({
      kind: "bag",
      counters: [{ colour: "grey", count: 2 }],
    });
  });

  it("shows a question in US English and marks either spelling right", () => {
    const q = toPracticeQuestion(
      written({
        question_type: "short_answer",
        question_text: "What colour is the sky?",
        correct_answer: ["blue"],
        explanation: "Colours…",
      }),
      1,
    );
    expect(localiseQuestion(q, "nsw")).toBe(q);
    const us = localiseQuestion(q, "us");
    expect(us.prompt).toBe("What color is the sky?");
    const spelling = toPracticeQuestion(
      written({ question_type: "short_answer", question_text: "Spell it.", correct_answer: ["colour"] }),
      1,
    );
    const usSpelling = localiseQuestion(spelling, "us");
    expect(checkAnswer(usSpelling.answer, "color").correct).toBe(true);
    expect(checkAnswer(usSpelling.answer, "colour").correct).toBe(true);
  });
});

describe("the US Common Core tree", () => {
  it("has Math and English for Grades 1 to 8", () => {
    expect(yearsWithContent("maths", "us")).toEqual(YEARS);
    expect(yearsWithContent("english", "us")).toEqual(YEARS);
    expect(topicsFor("maths", 6, "us").map((t) => t.title)).toEqual([
      "Ratios and percents",
      "The number system",
      "Expressions and equations",
      "Geometry",
      "Statistics",
    ]);
  });

  it("reuses the NSW subtopics, each once, with Common Core codes and US titles", () => {
    const used = US_TOPICS.flatMap((t) => subtopicsOf(t.id));
    expect(new Set(used.map((s) => s.id)).size).toBe(used.length);
    for (const s of used) {
      expect(SUBTOPICS.some((n) => n.id === s.id)).toBe(true);
      expect(s.outcome_code).toMatch(/^(\d\.(NBT|OA|NF|MD|G|RP|NS|EE|SP|F)\.\d+[a-z]?|(RF|RL|L|W)\.\d\.\d+[a-z]?)$/);
      expect(s.title).toBe(toUS(SUBTOPICS.find((n) => n.id === s.id)!.title));
    }
    // NSW lookups are unchanged.
    expect(topicsFor("maths", 3)[0].title).toBe("Number and place value");
    expect(subtopicsOf(topicsFor("maths", 3)[0].id)[0].outcome_code).toMatch(/^MA2-/);
  });

  it("places a subtopic in the US tree for a US child", () => {
    const id = subtopicsOf(topicsFor("maths", 3, "us")[0].id)[0].id;
    const path = subtopicPath(id, "us")!;
    expect(path.country.name).toBe("United States");
    expect(path.year.name).toBe("Grade 3");
    expect(path.subject.name).toBe("Math");
    expect(subtopicPath(id)!.country.name).toBe("Australia");
  });

  it("keeps the skill standards list in step with the tree", () => {
    const fromTree = Object.fromEntries(
      SUBTOPICS.filter((s) => s.skill_id && usSubtopic(s.id)).map((s) => [s.skill_id, usSubtopic(s.id)!.outcome_code]),
    );
    expect(US_SKILL_STANDARDS).toEqual(fromTree);
  });

  it("leaves Australian-only questions out of US practice", () => {
    const all = US_TOPICS.flatMap((t) => subtopicsOf(t.id)).flatMap((s) => questionsOf(s.id, "us"));
    expect(all.length).toBeGreaterThan(3500);
    expect(all.every(usableInUS)).toBe(true);
    expect(QUESTIONS.filter((q) => !usableInUS(q)).length).toBeLessThan(100);
  });
});

describe("a child on the US curriculum", () => {
  const child = { ...newProfile("Ava", 3, Date.now(), "us"), id: "11111111-1111-1111-1111-111111111111" };

  it("defaults to NSW", () => {
    expect(curriculumOf(newProfile("Bo", 3).curriculum)).toBe("nsw");
    expect(curriculumOf("fr")).toBe("nsw");
    expect(yearName(3, "us")).toBe("Grade 3");
    expect(yearName(3)).toBe("Year 3");
  });

  it("gets a weekly lesson from the US tree", () => {
    const lesson = buildLesson(child, "maths");
    expect(lesson.curriculum).toBe("us");
    expect(lesson.parts[0].title).toBe("Grade 2 review");
    const usTitles = topicsFor("maths", 3, "us").map((t) => t.title);
    for (const part of lesson.parts.slice(1)) expect(usTitles.some((t) => part.title.startsWith(t))).toBe(true);
    // A lesson made before the switch is replaced.
    const switched = saveLesson({ ...child, curriculum: "nsw" }, "maths", buildLesson({ ...child, curriculum: "nsw" }, "maths"));
    expect(currentLesson({ ...switched, curriculum: "us" }, "maths")).toBeNull();
  });

  it("takes the starting check from the US tree", () => {
    const state = startAssessment("maths", 5, "us");
    expect(questionsAt("maths", state.steps[0], "us").every(usableInUS)).toBe(true);
    const record = finishAssessment(state);
    expect(record.curriculum).toBe("us");
    expect(summarySentence(record, "Ava")).toContain("Grade 3 Math");
  });

  it("tells Suni to use US English and Common Core", () => {
    const prompt = buildContextPrompt({
      studentName: "Ava",
      yearLevel: 4,
      skillId: "ma2-place-value",
      curriculum: "us",
      question: { prompt: "What colour is it?", correctAnswer: "grey", answered: false, hintsShown: 0 },
    });
    expect(prompt).toContain("Student: Ava, Grade 4.");
    expect(prompt).toContain("US Common Core");
    expect(prompt).toContain("Common Core standard: 3.NBT.1");
    expect(prompt).toContain("What color is it?");
    expect(prompt).toContain("The correct answer is gray.");
    expect(buildContextPrompt({ studentName: "Ava", yearLevel: 4, skillId: "ma2-place-value" })).toContain("NESA outcome");
  });
});

describe("UK English", () => {
  it("keeps the spelling and changes money to pounds and pence", () => {
    expect(toUK("Colour the favourite shape grey in maths.")).toBe("Colour the favourite shape grey in maths.");
    expect(toUK("Mia has $3.50. A pen costs 85c and a ruler costs 60 cents.")).toBe(
      "Mia has £3.50. A pen costs 85p and a ruler costs 60p.",
    );
    expect(toUK("How many dollars is a 20-cent coin and a $2 coin? Count the cents.")).toBe(
      "How many pounds is a 20p coin and a £2 coin? Count the pence.",
    );
    expect(toUK("Per cent means out of 100.")).toBe("Per cent means out of 100.");
  });

  it("changes Australian words and places, and writes large numbers with commas", () => {
    expect(toUK("Two icy poles and an icy pole at the sausage sizzle.")).toBe("Two ice lollies and an ice lolly at the cake sale.");
    expect(toUK("Kindergarten kids went from Sydney to Bondi Beach in a ute with lollies.")).toBe(
      "Reception kids went from London to Brighton Beach in a van with sweets.",
    );
    expect(toUK("The Swimming Carnival had 12 480 people.")).toBe("The Swimming Gala had 12,480 people.");
    expect(toUK("A bus leaves Newcastle for perth.")).toBe("A bus leaves Newcastle for bristol.");
  });

  it("keeps coin questions, which work with UK coins, and hides Australian history and seasons", () => {
    const coin = written({ question_text: "Which unit is best for measuring the thickness of a 20-cent coin?" });
    expect(usableInUK(coin)).toBe(true);
    expect(usableInUS(coin)).toBe(false);
    expect(usableInUK(written({ question_text: "How many years after Federation did the Sydney Harbour Bridge open?" }))).toBe(false);
    expect(usableInUK(written({ question_text: "It is July in Sydney. Is it more likely to be cold or hot?" }))).toBe(false);
  });

  it("shows a question in UK English, and takes £ in a typed amount", () => {
    const q = toPracticeQuestion(
      written({ question_type: "short_answer", question_text: "Jack has $45. How many dollars is that?", correct_answer: ["45", "$45"] }),
      1,
    );
    const uk = localiseQuestion(q, "uk");
    expect(uk.prompt).toBe("Jack has £45. How many pounds is that?");
    expect(checkAnswer(uk.answer, "£45").correct).toBe(true);
    expect(checkAnswer({ kind: "number", value: 4.5 }, "£4.50").correct).toBe(true);
    expect(localisePicture({ kind: "table", headings: ["Item", "Cost"], rows: [["Pie", "$4"]] }, "uk")).toEqual({
      kind: "table",
      headings: ["Item", "Cost"],
      rows: [["Pie", "£4"]],
    });
  });
});

describe("the UK National Curriculum tree", () => {
  it("has Maths and English for Years 1 to 8, under the National Curriculum headings", () => {
    expect(yearsWithContent("maths", "uk")).toEqual(YEARS);
    expect(yearsWithContent("english", "uk")).toEqual(YEARS);
    expect(topicsFor("maths", 6, "uk").map((t) => t.title)).toEqual([
      "Place value",
      "Four operations",
      "Fractions",
      "Ratio and proportion",
      "Algebra",
      "Measurement",
      "Properties of shapes",
      "Position and direction",
      "Statistics",
    ]);
    expect(topicsFor("english", 1, "uk").map((t) => t.title)).toEqual([
      "Word reading",
      "Comprehension",
      "Spelling",
      "Grammar and punctuation",
    ]);
  });

  it("reuses the NSW subtopics, each once, with UK titles and headings, and no probability before Year 7", () => {
    const used = UK_TOPICS.flatMap((t) => subtopicsOf(t.id));
    expect(new Set(used.map((s) => s.id)).size).toBe(used.length);
    for (const s of used) {
      const nsw = SUBTOPICS.find((n) => n.id === s.id)!;
      expect(s.outcome_code).toMatch(/^Y[1-8] [A-Z]/);
      expect(s.title).toBe(toUK(nsw.title));
      if (Number(s.outcome_code![1]) <= 6) expect(nsw.title).not.toMatch(/chance|probability/i);
    }
    // The US tree is unchanged by it.
    expect(subtopicsOf(US_TOPICS[0].id)[0].outcome_code).toBe("1.NBT.1");
  });

  it("places a subtopic in the UK tree for a UK child", () => {
    const id = subtopicsOf(topicsFor("maths", 3, "uk")[0].id)[0].id;
    const path = subtopicPath(id, "uk")!;
    expect(path.country.name).toBe("United Kingdom");
    expect(path.state.name).toBe("England");
    expect(path.year.name).toBe("Year 3");
    expect(path.subject.name).toBe("Mathematics");
    expect(path.subjectKey).toBe("maths");
    expect(path.subtopic.outcome_code).toBe("Y3 Place value");
  });

  it("keeps the skill headings list in step with the tree", () => {
    const fromTree = Object.fromEntries(
      SUBTOPICS.filter((s) => s.skill_id && overlaySubtopic(s.id, "uk")).map((s) => [
        s.skill_id,
        overlaySubtopic(s.id, "uk")!.outcome_code,
      ]),
    );
    expect(UK_SKILL_STANDARDS).toEqual(fromTree);
  });

  it("leaves Australian-only questions out of UK practice", () => {
    const all = UK_TOPICS.flatMap((t) => subtopicsOf(t.id)).flatMap((s) => questionsOf(s.id, "uk"));
    expect(all.length).toBeGreaterThan(3500);
    expect(all.every(usableInUK)).toBe(true);
  });
});

describe("a child on the UK curriculum", () => {
  const child = { ...newProfile("Olly", 4, Date.now(), "uk"), id: "22222222-2222-2222-2222-222222222222" };

  it("gets a weekly lesson and starting check from the UK tree", () => {
    const lesson = buildLesson(child, "maths");
    expect(lesson.curriculum).toBe("uk");
    expect(lesson.parts[0].title).toBe("Year 3 review");
    const ukTitles = topicsFor("maths", 4, "uk").map((t) => t.title);
    for (const part of lesson.parts.slice(1)) expect(ukTitles.some((t) => part.title.startsWith(t))).toBe(true);
    const state = startAssessment("maths", 5, "uk");
    expect(questionsAt("maths", state.steps[0], "uk").every(usableInUK)).toBe(true);
    expect(finishAssessment(state).curriculum).toBe("uk");
  });

  it("tells Suni to use UK English, pounds and the National Curriculum", () => {
    const prompt = buildContextPrompt({
      studentName: "Olly",
      yearLevel: 4,
      skillId: "ma2-place-value",
      curriculum: "uk",
      question: { prompt: "Jack has $45 and a ute.", correctAnswer: "$45", answered: false, hintsShown: 0 },
    });
    expect(prompt).toContain("Student: Olly, Year 4.");
    expect(prompt).toContain("National Curriculum in England");
    expect(prompt).toContain("National Curriculum: Y3 Place value");
    expect(prompt).toContain("Jack has £45 and a van.");
    expect(prompt).toContain("The correct answer is £45.");
  });
});

describe("curriculum columns", () => {
  it("match the migrations", () => {
    expect(readFileSync(join(__dirname, "../../../database/015_my247tutor_curriculum.sql"), "utf8")).toContain(CURRICULUM_SQL);
    expect(readFileSync(join(__dirname, "../../../database/016_my247tutor_uk_curriculum.sql"), "utf8")).toContain(UK_CURRICULUM_SQL);
    expect(readFileSync(join(__dirname, "../../../database/017_my247tutor_years_7_8.sql"), "utf8")).toContain(YEARS_SQL);
  });
});

describe("Years 7 and 8", () => {
  it("are in every curriculum, named the local way", () => {
    expect(topicsFor("maths", 7).map((t) => t.title)).toContain("Integers");
    expect(topicsFor("maths", 8, "us").map((t) => t.title)).toEqual(["Expressions and equations", "Functions", "Geometry"]);
    expect(topicsFor("maths", 8, "uk").map((t) => t.title)).toContain("Ratio, proportion and rates of change");
    const pythagoras = topicsFor("maths", 8, "us").flatMap((t) => subtopicsOf(t.id)).find((s) => s.outcome_code === "8.G.7")!;
    expect(subtopicPath(pythagoras.id, "us")!.year.name).toBe("Grade 8");
    expect(subtopicPath(pythagoras.id, "uk")!.subtopic.outcome_code).toBe("Y8 Geometry and measures");
  });

  it("give a Year 7 child a weekly lesson from their own topics", () => {
    for (const curriculum of ["nsw", "us", "uk"] as const) {
      const child = { ...newProfile("Kai", 7, Date.now(), curriculum), id: "33333333-3333-3333-3333-333333333333" };
      const lesson = buildLesson(child, "maths");
      expect(lesson.parts[0].title).toBe(`${yearName(6, curriculum)} review`);
      const titles = topicsFor("maths", 7, curriculum).map((t) => t.title);
      for (const part of lesson.parts.slice(1)) expect(titles.some((t) => part.title.startsWith(t))).toBe(true);
    }
  });
});
