"use client";

import { useState } from "react";
import { QuestionView } from "@/components/QuestionView";
import { toPracticeQuestion } from "@/lib/content/practice";
import type { ContentQuestion } from "@/lib/content/types";
import type { Curriculum } from "@/lib/curriculum/curricula";

/**
 * A question as a student sees it in practice, for a grown-up looking through the curriculum.
 * They can answer it, use the hints and see the worked solution, but nothing is saved.
 */
export function QuestionPreview({
  question,
  heading,
  description,
  where,
  curriculum,
}: {
  question: ContentQuestion;
  heading: string;
  description: string;
  where: string;
  curriculum: Curriculum;
}) {
  // Each try starts afresh, with the choices in a new order as a student would get them.
  const [round, setRound] = useState(0);
  const shown = toPracticeQuestion(question, round);

  return (
    <div className="stack">
      <div className="feedback preview-banner" role="note">
        <strong>Preview.</strong> This is how a student sees this question. Try answering it: nothing is saved.
      </div>
      <div>
        <p className="small muted" style={{ margin: 0 }}>
          {where}
        </p>
        <h1 style={{ margin: "4px 0 0" }}>{heading}</h1>
        {description && (
          <p className="muted" style={{ margin: 0 }}>
            {description}
          </p>
        )}
      </div>
      <div className="practice">
        <QuestionView key={round} question={shown} curriculum={curriculum} onDone={() => undefined} onNext={() => setRound((r) => r + 1)} />
      </div>
    </div>
  );
}
