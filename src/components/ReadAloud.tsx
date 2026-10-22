"use client";

import { useEffect, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { MIC_PROBLEMS, MicIcon } from "@/components/SuniCompanion";
import { useSpeechInput } from "@/components/useSpeechInput";
import { readWell, wordsHeard } from "@/lib/phonics/progress";
import { readAlong, speak, speakAndWait, stopSpeaking } from "@/lib/tutor/speech";

/**
 * A sentence to read aloud. The student holds the microphone and reads; the words Suni heard light
 * up. After a mistake, Suni reads it to them, lighting up each word as Suni says it, and they try
 * again. Without a microphone, they read it to a grown-up instead.
 */
export function ReadAloud({ sentence, onDone }: { sentence: string; onDone: (readIt: boolean) => void }) {
  const [heard, setHeard] = useState("");
  const [result, setResult] = useState<"good" | "again" | null>(null);
  // Suni reading it to them: the word Suni is on, or null when Suni isn't reading.
  const [reading, setReading] = useState<number | null>(null);
  const [listened, setListened] = useState(false);
  const gone = useRef(false);
  // Counts each time Suni starts reading or the child starts reading, so an older read-along stops.
  const run = useRef(0);
  const speech = useSpeechInput({
    onWords: setHeard,
    onDone: (text) => {
      const good = Boolean(text && readWell(sentence, text));
      setResult(good ? "good" : "again");
      if (!good) void listen(true);
    },
  });

  useEffect(() => {
    gone.current = false;
    return () => {
      gone.current = true;
      stopSpeaking();
    };
  }, []);

  /** Suni reads the sentence while the child follows the words, then asks them to have a go. */
  async function listen(afterMistake: boolean) {
    const mine = ++run.current;
    const stale = () => gone.current || mine !== run.current;
    setListened(false);
    setHeard("");
    setReading(-1);
    if (afterMistake) await speakAndWait("Listen as I read it.");
    if (stale()) return;
    await readAlong(sentence, (i) => !stale() && setReading(i));
    if (stale()) return;
    setReading(null);
    setListened(true);
    speak("Now you try. Hold the button and read every word.");
  }
  const { words, heard: got } = wordsHeard(sentence, heard);
  const shown = sentence.split(/\s+/);

  function start(e: React.PointerEvent | React.KeyboardEvent) {
    if ("repeat" in e && e.repeat) return;
    e.preventDefault();
    run.current++;
    stopSpeaking();
    setReading(null);
    setHeard("");
    setResult(null);
    speech.start();
  }

  return (
    <div className="stack read-aloud">
      <div className="read-along">
        <Suni size={200} talking={reading !== null} word={reading ?? undefined} />
        <p className="read-sentence" aria-label={sentence}>
          {shown.map((word, i) => (
            <span key={i} className={reading === i ? "reading" : reading === null && got[i] && words[i] ? "heard" : ""}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
      {speech.supported ? (
        <>
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              type="button"
              className={`read-mic ${speech.listening ? "listening" : ""}`}
              aria-label={speech.listening ? "Listening. Let go when you've finished" : "Hold to read aloud"}
              aria-pressed={speech.listening}
              onPointerDown={start}
              onPointerUp={speech.stop}
              onPointerCancel={speech.stop}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && start(e)}
              onKeyUp={(e) => (e.key === " " || e.key === "Enter") && speech.stop()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <MicIcon />
              <span>{speech.listening ? "Listening…" : "Hold and read"}</span>
            </button>
          </div>
          {speech.problem && <p className="feedback warn">{MIC_PROBLEMS[speech.problem]}</p>}
          {result === "good" && <p className="feedback good">Great reading!</p>}
          {result === "again" &&
            (reading !== null ? (
              <p className="feedback warn" role="status">
                Listen as Suni reads it, and follow the words.
              </p>
            ) : (
              listened && (
                <p className="feedback warn" role="status">
                  Now you try. Hold the button and read every word.
                </p>
              )
            ))}
          {result !== "good" && reading === null && (
            <div className="row" style={{ justifyContent: "center" }}>
              <button type="button" className="btn secondary small" onClick={() => void listen(false)}>
                🔊 Hear Suni read it
              </button>
            </div>
          )}
          <div className="row" style={{ justifyContent: "center" }}>
            {result === "good" ? (
              <button className="btn" onClick={() => onDone(true)}>
                Next
              </button>
            ) : (
              <button className="btn secondary small" onClick={() => onDone(false)}>
                Skip for now
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            Read it out loud to a grown-up.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => onDone(true)}>
              I read it
            </button>
          </div>
        </>
      )}
    </div>
  );
}
