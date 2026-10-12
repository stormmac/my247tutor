"use client";

import { useState } from "react";
import { checkAnswer, type Question } from "@/lib/practice";

export type QuestionOutcome = { correct: boolean; hintsUsed: number; firstTry: boolean };

interface Props {
  question: Question;
  /** Placement mode: one try, no hints, no worked solution. */
  placement?: boolean;
  /** Called once, when the question is finished (right, or out of tries). */
  onDone: (outcome: QuestionOutcome) => void;
  onNext: () => void;
  onHintsChange?: (hintsShown: number) => void;
  onAnsweredChange?: (answered: boolean) => void;
}

const MAX_TRIES = 2;

export function QuestionView({ question, placement, onDone, onNext, onHintsChange, onAnsweredChange }: Props) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [result, setResult] = useState<{ correct: boolean; feedback?: string } | null>(null);
  const [finished, setFinished] = useState(false);

  const isChoice = question.answer.kind === "choice";

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (finished) return;
    const raw = isChoice ? (selected === null ? "" : String(selected)) : input;
    const check = checkAnswer(question.answer, raw);
    if (check.unreadable) return setResult(check);

    const nextTries = tries + 1;
    setTries(nextTries);
    setResult(check);
    const done = check.correct || placement || nextTries >= MAX_TRIES;
    if (done) {
      setFinished(true);
      onAnsweredChange?.(true);
      onDone({ correct: check.correct, hintsUsed: hintsShown, firstTry: nextTries === 1 });
    }
  }

  function showHint() {
    const n = Math.min(hintsShown + 1, question.hints.length);
    setHintsShown(n);
    onHintsChange?.(n);
  }

  return (
    <div className="card">
      {question.passage && (
        <div className="passage">
          <h3>{question.passage.title}</h3>
          {question.passage.text}
        </div>
      )}
      <div className="question">{question.prompt}</div>

      <form onSubmit={submit}>
        {isChoice ? (
          <div className="choices" role="radiogroup">
            {question.choices!.map((c, i) => {
              const state = finished
                ? i === (question.answer as { index: number }).index
                  ? "right"
                  : i === selected
                    ? "wrong"
                    : ""
                : i === selected
                  ? "selected"
                  : "";
              return (
                <button
                  type="button"
                  key={c}
                  role="radio"
                  aria-checked={i === selected}
                  className={`choice ${state}`}
                  disabled={finished}
                  onClick={() => setSelected(i)}
                >
                  {c}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="answer-row">
            <input
              type="text"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={finished}
              aria-label="Your answer"
              autoFocus
              autoComplete="off"
            />
          </div>
        )}

        <div className="row" style={{ marginTop: 16 }}>
          {!finished && <button className="btn">Check</button>}
          {!finished && !placement && hintsShown < question.hints.length && (
            <button type="button" className="btn secondary" onClick={showHint}>
              {hintsShown ? "Another hint" : "Hint"}
            </button>
          )}
          {finished && (
            <button type="button" className="btn" onClick={onNext} autoFocus>
              Next question
            </button>
          )}
        </div>
      </form>

      {question.hints.slice(0, hintsShown).map((h, i) => (
        <div className="hint" key={i}>
          <strong>Hint {i + 1}:</strong> {h}
        </div>
      ))}

      {result && !placement && (
        <div className={`feedback ${result.correct ? "good" : "bad"}`} role="status">
          {result.correct ? (
            <>
              <strong>Correct!</strong> {question.solution}
            </>
          ) : finished ? (
            <>
              <strong>Not this time.</strong> {question.solution}
            </>
          ) : (
            <>
              <strong>Not quite.</strong> {result.feedback ?? "Have another go, or ask for a hint."}
            </>
          )}
        </div>
      )}
      {result &&
        placement &&
        (finished ? (
          <div className="feedback good" role="status">
            Thanks! Let's try another one.
          </div>
        ) : (
          <div className="feedback bad" role="status">
            {result.feedback}
          </div>
        ))}
    </div>
  );
}
