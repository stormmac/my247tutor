"use client";

import { useMemo, useRef, useState } from "react";
import { type Curriculum, curriculumOf, localiseQuestion } from "@/lib/curriculum/curricula";
import { answerText, checkAnswer, type Question } from "@/lib/practice";
import type { AttemptDetails } from "@/lib/learner/model";
import { Picture } from "./Picture";
import { hintLadder } from "@/lib/tutor/hints";
import { useProfile } from "./useProfile";

export type QuestionOutcome = {
  correct: boolean;
  hintsUsed: number;
  firstTry: boolean;
  /** Goes used, counting the last one. */
  tries: number;
  /** What the student answered first, as words a parent can read. */
  answer: string;
  /** The right answer, in the same form. */
  rightAnswer: string;
};

/** What to keep in the learner's history about a finished question, for the parents page. */
export function attemptDetails(question: Question, o: QuestionOutcome): AttemptDetails {
  return {
    question: question.prompt.replace("___", "_____"),
    answer: o.answer,
    rightAnswer: o.rightAnswer,
    secondTry: o.correct && !o.firstTry,
  };
}

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
  /** Goes before the answer is shown. */
  maxTries?: number;
  /** Shows it for this curriculum instead of the child's, for a grown-up previewing a question. */
  curriculum?: Curriculum;
}

const MAX_TRIES = 2;

const goesLeft = (n: number) => (n === 1 ? "Last go!" : `${n} goes left.`);

export function QuestionView({
  question: asWritten,
  placement,
  onDone,
  onNext,
  onHintsChange,
  onAnsweredChange,
  onTryAgain,
  maxTries = MAX_TRIES,
  curriculum: shownIn,
}: Props) {
  // A child on the US curriculum sees the question, and is marked, in US English.
  const { profile } = useProfile();
  const childCurriculum = curriculumOf(profile?.curriculum);
  const curriculum = shownIn ?? childCurriculum;
  const question = useMemo(() => localiseQuestion(asWritten, curriculum), [asWritten, curriculum]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  // Ordering questions: the student's current arrangement, as indices into choices.
  const [arrangement, setArrangement] = useState<number[]>(() => (question.choices ?? []).map((_, i) => i));
  const [tries, setTries] = useState(0);
  // Multiple choice: options already tried and wrong can't be picked again.
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const [hintsShown, setHintsShown] = useState(0);
  // Hints written for this question, in place of the general ones it came with.
  const [written, setWritten] = useState<{ id: string; hints: string[] } | null>(null);
  const [writing, setWriting] = useState(false);
  const hints = written?.id === question.id ? hintLadder(written.hints, question.hints) : question.hints;
  const [result, setResult] = useState<{ correct: boolean; feedback?: string; unreadable?: boolean } | null>(null);
  const [finished, setFinished] = useState(false);
  const firstAnswer = useRef("");

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

  /** The student's answer as text: the choice they picked, or what they typed. */
  function answerWords(): string {
    const choices = question.choices ?? [];
    if (kind === "choice") return selected === null ? "" : (choices[selected] ?? "");
    if (kind === "multi") return picked.map((i) => choices[i]).join(", ");
    if (kind === "order") return arrangement.map((i) => choices[i]).join(" → ");
    return input.trim();
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
    if (nextTries === 1) firstAnswer.current = answerWords();
    setTries(nextTries);
    setResult(check);
    const done = check.correct || placement || nextTries >= maxTries;
    if (done) {
      setFinished(true);
      onAnsweredChange?.(true);
      onDone({
        correct: check.correct,
        hintsUsed: hintsShown,
        firstTry: nextTries === 1,
        tries: nextTries,
        answer: firstAnswer.current,
        rightAnswer: answerText(question.answer, question.choices),
      });
    } else {
      if (kind === "choice" && selected !== null) {
        setRuledOut((r) => [...r, selected]);
        setSelected(null);
      }
      onTryAgain?.();
    }
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
    const n = Math.min(hintsShown + 1, hints.length);
    setHintsShown(n);
    onHintsChange?.(n);
  }

  /** The first hint for a question with only general ones waits for hints written for it, or the general ones if that fails. */
  async function firstHint() {
    if (!question.writeHints || written?.id === question.id) return showHint();
    const id = question.id;
    setWriting(true);
    const got = await fetch("/api/hints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: question.prompt,
        choices: question.choices,
        correctAnswer: answerText(question.answer, question.choices),
        solution: question.solution,
        passage: question.passage ? `${question.passage.title}\n${question.passage.text}` : undefined,
        picture: question.picture ? JSON.stringify(question.picture) : undefined,
        yearLevel: profile?.yearLevel ?? 4,
        curriculum,
      }),
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ hints?: string[] }>) : null))
      .catch(() => null);
    setWriting(false);
    setWritten({ id, hints: got?.hints ?? [] });
    showHint();
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
                  : i === selected || ruledOut.includes(i)
                    ? "wrong"
                    : ""
                : i === selected
                  ? "selected"
                  : ruledOut.includes(i)
                    ? "wrong"
                    : "";
              return (
                <button
                  type="button"
                  key={c}
                  role="radio"
                  aria-checked={i === selected}
                  className={`choice ${state}`}
                  disabled={finished || ruledOut.includes(i)}
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
          {!finished && !placement && hintsShown < hints.length && (
            <button type="button" className="btn secondary" onClick={hintsShown ? showHint : firstHint} disabled={writing}>
              {writing ? "Thinking…" : hintsShown ? "Another hint" : "Hint"}
            </button>
          )}
          {finished && (
            <button type="button" className="btn" onClick={onNext} autoFocus>
              Next question
            </button>
          )}
        </div>
      </form>

      {hints.slice(0, hintsShown).map((h, i) => (
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
              {maxTries > MAX_TRIES && !result.unreadable && ` ${goesLeft(maxTries - tries)}`}
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
