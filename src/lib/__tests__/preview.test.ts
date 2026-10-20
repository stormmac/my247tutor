import { describe, expect, it } from "vitest";
import { questionById, questionsOf, subtopicsOf, topicsFor } from "../content/tree";

describe("question preview", () => {
  it("finds a written question by id, only in a curriculum that uses it", () => {
    const subtopic = subtopicsOf(topicsFor("maths", 3)[0].id)[0];
    const q = questionsOf(subtopic.id)[0];
    expect(questionById(q.id)).toBe(q);
    expect(questionById(q.id, "us")?.id ?? null).toBe(questionsOf(subtopic.id, "us").includes(q) ? q.id : null);
    expect(questionById("no-such-question")).toBeNull();
  });
});
