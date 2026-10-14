"use client";

import { useState } from "react";
import { MIC_PROBLEMS, MicIcon } from "@/components/SuniCompanion";
import { useSpeechInput } from "@/components/useSpeechInput";
import { readWell, wordsHeard } from "@/lib/phonics/progress";
import { stopSpeaking } from "@/lib/tutor/speech";

/**
 * A sentence to read aloud. The student holds the microphone and reads; the words Suni heard light
 * up. Without a microphone, they read it to a grown-up instead.
 */
export function ReadAloud({ sentence, onDone }: { sentence: string; onDone: (readIt: boolean) => void }) {
  const [heard, setHeard] = useState("");
  const [result, setResult] = useState<"good" | "again" | null>(null);
  const speech = useSpeechInput({
    onWords: setHeard,
    onDone: (text) => setResult(text && readWell(sentence, text) ? "good" : "again"),
  });
  const { words, heard: got } = wordsHeard(sentence, heard);
  const shown = sentence.split(/\s+/);

  function start(e: React.PointerEvent | React.KeyboardEvent) {
    if ("repeat" in e && e.repeat) return;
    e.preventDefault();
    stopSpeaking();
    setHeard("");
    setResult(null);
    speech.start();
  }

  return (
    <div className="stack read-aloud">
      <p className="read-sentence" aria-label={sentence}>
        {shown.map((word, i) => (
          <span key={i} className={got[i] && words[i] ? "heard" : ""}>
            {word}{" "}
          </span>
        ))}
      </p>
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
          {result === "again" && <p className="feedback warn">Let&apos;s try that again. Hold the button and read every word.</p>}
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
