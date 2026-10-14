"use client";

import { useState } from "react";
import { checkAnswer, type Question } from "@/lib/practice";
import { Picture } from "./Picture";

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
  /** Called after a wrong answer when the student still has another try. */
  onTryAgain?: () => void;
}

const MAX_TRIES = 2;

export function QuestionView({ question, placement, onDone, onNext, onHintsChange, onAnsweredChange, onTryAgain }: Props) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  // Ordering questions: the student's current arrangement, as indices into choices.
  const [arrangement, setArrangement] = useState<number[]>(() => (question.choices ?? []).map((_, i) => i));
  const [tries, setTries] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [result, setResult] = useState<{ correct: boolean; feedback?: string } | null>(null);
  const [finished, setFinished] = useState(false);

  const kind = question.answer.kind;
  const typed = kind !== "choice" && kind !== "multi" && kind !== "order";
  // Fill-in-the-blank: the answer box goes in the gap in the sentence.
  const gap = typed ? question.prompt.split("___") : [];
  const inline = gap.length === 2;

  function rawAnswer(): string {
    if (kind === "choice") return selected === null ? "" : String(selected);
    if (kind === "multi") return picked.join(",");
    if (kind === "order") return arrangement.join(",");
    return input;
  }

  function move(position: number, by: -1 | 1) {
    setArrangement((a) => {
      const next = [...a];
      [next[position], next[position + by]] = [next[position + by], next[position]];
      return next;
    });
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (finished) return;
    const raw = rawAnswer();
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
    } else onTryAgain?.();
  }

  function answerBox(className?: string) {
    return (
      <input
        type="text"
        className={className}
        inputMode={kind === "text" ? "text" : "decimal"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={finished}
        aria-label="Your answer"
        autoFocus
        autoComplete="off"
      />
    );
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
      <form onSubmit={submit}>
        <div className="question">
          {inline ? (
            <>
              {gap[0]}
              {answerBox("blank-input")}
              {gap[1]}
            </>
          ) : (
            question.prompt
          )}
        </div>
        {question.picture && <Picture picture={question.picture} />}

        {kind === "choice" && (
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
        )}
        {kind === "multi" && (
          <div className="choices" role="group" aria-label="Choose all that apply">
            {question.choices!.map((c, i) => {
              const on = picked.includes(i);
              const right = (question.answer as { indices: number[] }).indices.includes(i);
              const state = finished ? (right ? "right" : on ? "wrong" : "") : on ? "selected" : "";
              return (
                <button
                  type="button"
                  key={c}
                  role="checkbox"
                  aria-checked={on}
                  className={`choice ${state}`}
                  disabled={finished}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                >
                  <span aria-hidden="true">{on ? "☑" : "☐"}</span> {c}
                </button>
              );
            })}
          </div>
        )}
        {kind === "order" && (
          <ol className="ordering" aria-label="Put these in order">
            {arrangement.map((choiceIndex, position) => (
              <li
                key={choiceIndex}
                className={`choice ${finished ? (choiceIndex === (question.answer as { order: number[] }).order[position] ? "right" : "wrong") : ""}`}
              >
                <span>{question.choices![choiceIndex]}</span>
                {!finished && (
                  <span className="order-buttons">
                    <button
                      type="button"
                      className="btn secondary small"
                      disabled={position === 0}
                      onClick={() => move(position, -1)}
                      aria-label={`Move ${question.choices![choiceIndex]} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn secondary small"
                      disabled={position === arrangement.length - 1}
                      onClick={() => move(position, 1)}
                      aria-label={`Move ${question.choices![choiceIndex]} down`}
                    >
                      ↓
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
        {typed && !inline && <div className="answer-row">{answerBox()}</div>}

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
