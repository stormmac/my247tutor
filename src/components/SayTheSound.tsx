"use client";

import { useEffect, useRef, useState } from "react";
import { normalise, trimSilence } from "@/lib/phonics/clips";
import { mfcc, rank, saidSound } from "@/lib/phonics/match";
import type { Sound } from "@/lib/phonics/sequence";
import { audioContext, recordedClips, recordedSound, type SpeechPart } from "@/lib/tutor/speech";

/** The longest a child can hold the microphone for one sound. */
const MAX_SECONDS = 3;

type Result = "yes" | "no" | "quiet";

const PRAISE = ["Yes! That's it!", "Brilliant!", "Spot on!", "You said it!"];

/**
 * Hold the microphone and say each new sound. Suni checks it against the recorded sounds and says
 * whether it matched, playing the sound again to copy when it didn't. Practice, so it isn't marked.
 * Without a microphone, or before the sounds are recorded, Suni moves straight on.
 */
export function SayTheSound({
  sounds,
  compare,
  say,
  onDone,
}: {
  sounds: Sound[];
  compare: string[];
  say: (text: string | SpeechPart[], force?: boolean) => void;
  onDone: () => void;
}) {
  const [ready, setReady] = useState<Sound[] | null>(null);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [holding, setHolding] = useState<string | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const templates = useRef<Map<string, number[][]>>(new Map());
  const recorder = useRef<MediaRecorder | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only the sounds that have a recording can be checked.
  useEffect(() => {
    let live = true;
    void (async () => {
      const canRecord = typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && "MediaRecorder" in window;
      const clips = await recordedClips();
      const ctx = audioContext();
      const mine = sounds.filter((s, i) => clips.has(s.ipa) && sounds.findIndex((x) => x.ipa === s.ipa) === i);
      if (!live) return;
      if (!canRecord || !ctx || !mine.length) return onDone();
      for (const ipa of compare.filter((c) => clips.has(c))) {
        const buffer = await recordedSound(ipa);
        if (buffer) templates.current.set(ipa, mfcc(buffer.getChannelData(0), buffer.sampleRate));
      }
      if (live) setReady(mine.filter((s) => templates.current.has(s.ipa)));
    })();
    return () => {
      live = false;
    };
    // Once for the step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sound = (s: Sound): SpeechPart => ({ text: s.say, ipa: s.ipa, word: true });

  async function start(s: Sound) {
    if (holding || checking) return;
    setProblem(null);
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      setProblem("Suni can't hear the microphone. Ask a grown-up to allow it, or tap Next.");
      return;
    }
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream);
    recorder.current = rec;
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      setHolding(null);
      setChecking(s.ipa);
      const result = await check(s, new Blob(chunks, { type: rec.mimeType })).catch((): Result => "quiet");
      setChecking(null);
      setResults((r) => ({ ...r, [s.ipa]: result }));
      if (result === "yes") say([{ text: PRAISE[Math.floor(Math.random() * PRAISE.length)] }, sound(s)], true);
      else if (result === "no") say([{ text: "Not quite. Listen:" }, sound(s), { text: "Now you try." }], true);
      else say("I didn't hear that. Hold the microphone, say the sound, then let go.", true);
    };
    rec.start();
    setHolding(s.ipa);
    stopTimer.current = setTimeout(stop, MAX_SECONDS * 1000);
  }

  function stop() {
    if (stopTimer.current) clearTimeout(stopTimer.current);
    if (recorder.current?.state === "recording") recorder.current.stop();
  }

  async function check(s: Sound, blob: Blob): Promise<Result> {
    const ctx = audioContext();
    if (!ctx) return "quiet";
    const audio = await ctx.decodeAudioData(await blob.arrayBuffer());
    const samples = trimSilence(audio.getChannelData(0), audio.sampleRate);
    if (samples.length < audio.sampleRate * 0.08) return "quiet";
    return saidSound(s.ipa, rank(mfcc(normalise(samples), audio.sampleRate), templates.current)) ? "yes" : "no";
  }

  if (!ready)
    return (
      <p className="muted" style={{ textAlign: "center" }}>
        Getting the microphone ready…
      </p>
    );

  return (
    <>
      <h1 style={{ margin: 0, textAlign: "center" }}>Say the sounds</h1>
      <p className="muted" style={{ textAlign: "center", margin: 0 }}>
        Hold the microphone and say the sound. Let go when you&apos;ve said it.
      </p>
      <div className="say-sounds">
        {ready.map((s) => {
          const result = results[s.ipa];
          return (
            <div key={s.ipa} className={`say-sound ${result ?? ""}`} data-ipa={s.ipa}>
              <button className="say-sound-hear" onClick={() => say([sound(s)], true)} aria-label={`Hear ${s.grapheme}`}>
                <span className="sound-grapheme">{s.grapheme.replace("_", "–")}</span>
                <span className="small muted">🔊 hear it</span>
              </button>
              <button
                className={`mic-hold${holding === s.ipa ? " listening" : ""}`}
                aria-label={`Hold to say ${s.grapheme}`}
                disabled={checking !== null || (holding !== null && holding !== s.ipa)}
                onPointerDown={(e) => {
                  e.preventDefault();
                  void start(s);
                }}
                onPointerUp={stop}
                onPointerLeave={stop}
                onPointerCancel={stop}
                onContextMenu={(e) => e.preventDefault()}
              >
                🎤
              </button>
              <span className="say-sound-result small" aria-live="polite">
                {checking === s.ipa
                  ? "Listening…"
                  : holding === s.ipa
                    ? "Say it now"
                    : result === "yes"
                      ? "✓ Yes!"
                      : result === "no"
                        ? "Try again"
                        : result === "quiet"
                          ? "Didn't hear it"
                          : "Hold to say it"}
              </span>
            </div>
          );
        })}
      </div>
      {problem && (
        <p className="feedback bad" role="alert" style={{ margin: 0 }}>
          {problem}
        </p>
      )}
      <div className="row" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={onDone} disabled={holding !== null}>
          Next
        </button>
      </div>
    </>
  );
}
