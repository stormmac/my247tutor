import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CURRICULUM_SQL } from "../auth/curriculumSchema";
import { buildLesson } from "../content/lesson";
import { toPracticeQuestion } from "../content/practice";
import {
  QUESTIONS,
  SUBTOPICS,
  subtopicPath,
  subtopicsOf,
  questionsOf,
  topicsFor,
  US_TOPICS,
  usSubtopic,
  yearsWithContent,
} from "../content/tree";
import type { ContentQuestion } from "../content/types";
import { US_SKILL_STANDARDS } from "../content/us";
import { curriculumOf, localiseQuestion, pictureToUS, toUS, usableInUS, yearName } from "../curriculum/curricula";
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
  it("has Math and English for Grades 1 to 6", () => {
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
      expect(s.outcome_code).toMatch(/^(\d\.(NBT|OA|NF|MD|G|RP|NS|EE|SP)\.\d+[a-z]?|(RF|RL|L|W)\.\d\.\d+[a-z]?)$/);
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

describe("curriculum columns", () => {
  it("match the migration", () => {
    expect(readFileSync(join(__dirname, "../../../database/015_my247tutor_curriculum.sql"), "utf8")).toContain(CURRICULUM_SQL);
  });
});
