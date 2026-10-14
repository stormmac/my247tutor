import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Picture } from "../../components/Picture";
import { toPracticeQuestion } from "../content/practice";
import { describePicture, type Picture as PictureData, pictureProblems } from "../content/picture";
import { QUESTIONS } from "../content/tree";

const withPictures = QUESTIONS.filter((q) => q.picture);

describe("question pictures", () => {
  it("are used in the question bank", () => {
    expect(withPictures.length).toBeGreaterThanOrEqual(25);
  });

  it("all have numbers that can be drawn", () => {
    for (const q of withPictures) expect(pictureProblems(q.picture!), q.id).toEqual([]);
  });

  it("all draw, with a description for screen readers", () => {
    for (const q of withPictures) {
      const html = renderToStaticMarkup(createElement(Picture, { picture: q.picture! }));
      expect(html, q.id).toMatch(/^<(svg|table)/);
      expect(html).toContain(describePicture(q.picture!).replace(/'/g, "&#x27;"));
    }
  });

  it("go with the question to the practice screen", () => {
    const q = withPictures[0];
    expect(toPracticeQuestion(q, 1).picture).toEqual(q.picture);
    const plain = QUESTIONS.find((x) => !x.picture)!;
    expect(toPracticeQuestion(plain, 1)).not.toHaveProperty("picture");
  });

  it("draw clock hands in the right place", () => {
    const clock: PictureData = { kind: "clock", hour: 3, minute: 0 };
    const html = renderToStaticMarkup(createElement(Picture, { picture: clock }));
    // At 3:00 the hour hand points straight right, to (138, 100).
    expect(html).toMatch(/x2="138" y2="100(\.0+\d*)?"/);
  });

  it("catch impossible pictures", () => {
    expect(pictureProblems({ kind: "clock", hour: 13, minute: 0 })).not.toEqual([]);
    expect(pictureProblems({ kind: "fraction", shape: "bar", parts: 4, shaded: 5 })).not.toEqual([]);
    expect(pictureProblems({ kind: "ruler", cm: 5, length: 7, object: "pencil" })).not.toEqual([]);
  });
});
