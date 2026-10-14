"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import {
  answerOf,
  answerOfFact,
  bestKey,
  describeTables,
  factOf,
  GAME_MS,
  nextQuestion,
  recordGame,
  SPEEDS,
  TABLES,
  tablesOf,
  trickyFacts,
  type Speed,
  type TablesGame,
  type TablesQuestion,
} from "@/lib/tables/game";

const capitalise = (s: string) => s[0].toUpperCase() + s.slice(1);

type Result = { game: TablesGame; newBest: boolean; best: number };

/** The times tables game: pick the tables and speed, then answer as many as you can in two minutes. */
export default function TablesPage() {
  const { profile, setProfile, loaded } = useProfile();
  const [playing, setPlaying] = useState<{ tables: number[]; speed: Speed } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [round, setRound] = useState(0);

  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <h1>Times tables</h1>
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }
  const record = tablesOf(profile);

  function finish(game: TablesGame) {
    const saved = recordGame(tablesOf(profile!), game);
    setProfile((p) => ({ ...p, tables: recordGame(tablesOf(p), game).record }));
    setResult({ game, newBest: saved.newBest, best: saved.best });
    setPlaying(null);
  }

  if (playing) return <Game key={round} tables={playing.tables} speed={playing.speed} onFinish={finish} />;

  if (result) {
    const { game } = result;
    const missed = [...new Set(game.missed)];
    return (
      <div className="card narrow stack tables-result" style={{ textAlign: "center" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <Suni size={100} wave />
        </div>
        <h1 style={{ margin: 0 }}>{result.newBest ? "New best score!" : "Time's up!"}</h1>
        <p className="tables-score">
          {game.right} <span className="muted">right out of {game.asked}</span>
        </p>
        <p className="muted" style={{ margin: 0 }}>
          {capitalise(describeTables(game.tables))}, {SPEEDS[game.speed].label.toLowerCase()}. Your best: {result.best}.
        </p>
        {missed.length > 0 && (
          <div className="stack" style={{ gap: 6 }}>
            <strong>Practise these:</strong>
            <div className="tables-missed">
              {missed.map((f) => (
                <span key={f}>
                  {f} = {answerOfFact(f)}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="row" style={{ justifyContent: "center" }}>
          <button
            className="btn"
            onClick={() => {
              setResult(null);
              setRound((r) => r + 1);
              setPlaying({ tables: game.tables, speed: game.speed });
            }}
          >
            Play again
          </button>
          <button className="btn secondary" onClick={() => setResult(null)}>
            Change tables
          </button>
        </div>
      </div>
    );
  }

  return (
    <Setup
      initial={record.last}
      best={(tables, speed) => record.best[bestKey(tables, speed)] ?? 0}
      tricky={trickyFacts(record)}
      onStart={(tables, speed) => {
        setRound((r) => r + 1);
        setPlaying({ tables, speed });
      }}
    />
  );
}

function Setup({
  initial,
  best,
  tricky,
  onStart,
}: {
  initial: { tables: number[]; speed: Speed };
  best: (tables: number[], speed: Speed) => number;
  tricky: string[];
  onStart: (tables: number[], speed: Speed) => void;
}) {
  const [speed, setSpeed] = useState<Speed>(initial.speed);
  const [picked, setPicked] = useState<number[]>(initial.tables);
  const toggle = (t: number) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t].sort((a, b) => a - b)));

  return (
    <div className="stack tables-setup">
      <div className="row" style={{ gap: 16, flexWrap: "nowrap" }}>
        <Suni size={84} wave />
        <div>
          <h1>Times tables</h1>
          <p className="muted" style={{ margin: 0 }}>
            Answer as many as you can in 2 minutes.
          </p>
        </div>
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>Speed</h2>
        <p className="muted" style={{ margin: 0 }}>
          How long the answer shows before the next question.
        </p>
        <div className="tables-speeds" role="radiogroup" aria-label="Speed">
          {(Object.keys(SPEEDS) as Speed[]).map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={speed === s}
              className={`choice ${speed === s ? "selected" : ""}`}
              onClick={() => setSpeed(s)}
            >
              <strong>{SPEEDS[s].label}</strong>
              <span className="small muted">
                {SPEEDS[s].ms / 1000} second{SPEEDS[s].ms === 1000 ? "" : "s"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>Practise one table</h2>
        <div className="tables-one">
          {TABLES.map((t) => (
            <button key={t} className="choice" onClick={() => onStart([t], speed)} aria-label={`Practise the ${t} times table`}>
              <span className="tables-num">{t}s</span>
              {best([t], speed) > 0 && <span className="small muted">Best {best([t], speed)}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="card stack">
        <div className="row spread">
          <h2 style={{ margin: 0 }}>Mixed tables test</h2>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn secondary small" onClick={() => setPicked([...TABLES])}>
              All
            </button>
            <button className="btn secondary small" onClick={() => setPicked([])}>
              None
            </button>
          </div>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Tick the tables you want, and the questions come from them at random.
        </p>
        <div className="tables-ticks">
          {TABLES.map((t) => (
            <label key={t} className={`tables-tick ${picked.includes(t) ? "on" : ""}`}>
              <input type="checkbox" checked={picked.includes(t)} onChange={() => toggle(t)} />
              {t}s
            </label>
          ))}
        </div>
        <div className="row">
          <button className="btn" disabled={!picked.length} onClick={() => onStart(picked, speed)}>
            {picked.length ? `Start: ${describeTables(picked)}` : "Tick at least one table"}
          </button>
          {picked.length > 0 && best(picked, speed) > 0 && <span className="muted small">Best: {best(picked, speed)}</span>}
        </div>
      </div>

      {tricky.length > 0 && (
        <p className="muted" style={{ margin: 0 }}>
          Tricky ones lately: {tricky.join(", ")}.
        </p>
      )}
      <Link className="btn secondary small" href="/learn" style={{ alignSelf: "flex-start" }}>
        Back to Learn
      </Link>
    </div>
  );
}

const PAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "OK"];

function Game({ tables, speed, onFinish }: { tables: number[]; speed: Speed; onFinish: (game: TablesGame) => void }) {
  const [question, setQuestion] = useState<TablesQuestion>(() => nextQuestion(tables, null));
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState<{ ok: boolean } | null>(null);
  const [left, setLeft] = useState(GAME_MS);
  const score = useRef({ right: 0, asked: 0, missed: [] as string[] });
  const [right, setRight] = useState(0);
  const endsAt = useRef(0);
  const done = useRef(false);
  const pause = useRef<ReturnType<typeof setTimeout> | null>(null);

  const end = useCallback(() => {
    if (done.current) return;
    done.current = true;
    if (pause.current) clearTimeout(pause.current);
    onFinish({ at: Date.now(), tables, speed, ...score.current });
  }, [onFinish, tables, speed]);

  useEffect(() => {
    endsAt.current = Date.now() + GAME_MS;
    const tick = setInterval(() => {
      const remaining = Math.max(0, endsAt.current - Date.now());
      setLeft(remaining);
      if (remaining === 0) end();
    }, 200);
    return () => {
      clearInterval(tick);
      if (pause.current) clearTimeout(pause.current);
    };
  }, [end]);

  const submit = useCallback(() => {
    if (shown || !typed || done.current) return;
    const ok = Number(typed) === answerOf(question);
    score.current.asked += 1;
    if (ok) score.current.right += 1;
    else score.current.missed.push(factOf(question));
    setRight(score.current.right);
    setShown({ ok });
    pause.current = setTimeout(() => {
      setShown(null);
      setTyped("");
      setQuestion((q) => nextQuestion(tables, q));
    }, SPEEDS[speed].ms);
  }, [shown, typed, question, tables, speed]);

  const press = useCallback(
    (key: string) => {
      if (shown) return;
      if (key === "OK") return submit();
      if (key === "⌫") return setTyped((t) => t.slice(0, -1));
      setTyped((t) => (t.length < 3 ? t + key : t));
    },
    [shown, submit],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("⌫");
      else if (e.key === "Enter") press("OK");
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const seconds = Math.ceil(left / 1000);
  return (
    <div className="card narrow stack tables-game">
      <div className="row spread">
        <span className={`tables-clock ${seconds <= 10 ? "ending" : ""}`} aria-label={`${seconds} seconds left`}>
          ⏱ {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </span>
        <span className="tables-right">✅ {right}</span>
      </div>
      <div className="progress" aria-hidden>
        <div style={{ width: `${(left / GAME_MS) * 100}%` }} />
      </div>
      <p className="tables-question" aria-live="polite">
        {factOf(question)} = <span className={`tables-answer ${shown ? (shown.ok ? "right" : "wrong") : ""}`}>{typed || " "}</span>
      </p>
      <p
        className={`feedback ${shown ? (shown.ok ? "good" : "warn") : ""}`}
        style={{ visibility: shown ? "visible" : "hidden", margin: 0 }}
      >
        {shown?.ok ? "Correct!" : `${factOf(question)} = ${answerOf(question)}`}
      </p>
      <div className="tables-pad">
        {PAD.map((k) => (
          <button
            key={k}
            className={`choice ${k === "OK" ? "ok" : ""}`}
            onClick={() => press(k)}
            disabled={!!shown || (k === "OK" && !typed)}
            aria-label={k === "⌫" ? "Delete" : k === "OK" ? "Check answer" : k}
          >
            {k}
          </button>
        ))}
      </div>
      <button className="btn secondary small" style={{ alignSelf: "center" }} onClick={end}>
        Stop
      </button>
    </div>
  );
}
