"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** The parts of the browser's speech recognition this uses (Chrome, Edge and Safari have it; Firefox doesn't). */
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionClass = new () => Recognition;

function recognitionClass(): RecognitionClass | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionClass; webkitSpeechRecognition?: RecognitionClass };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type SpeechInputProblem = "blocked" | "no-microphone" | "failed";

/**
 * Hold-to-talk: while `start` is held the child's words arrive in `onWords` as they speak, and when
 * they let go `onDone` gets the whole thing. Uses the browser's own speech recognition.
 */
export function useSpeechInput({ onWords, onDone }: { onWords: (text: string) => void; onDone: (text: string) => void }) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [problem, setProblem] = useState<SpeechInputProblem | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const heard = useRef("");
  const callbacks = useRef({ onWords, onDone });
  callbacks.current = { onWords, onDone };

  useEffect(() => {
    setSupported(recognitionClass() !== null);
    return () => recognition.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Rec = recognitionClass();
    if (!Rec || recognition.current) return;
    const rec = new Rec();
    rec.lang = "en-AU";
    rec.interimResults = true;
    // Keep listening through pauses until the button is let go.
    rec.continuous = true;
    heard.current = "";
    setProblem(null);
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      heard.current = text.replace(/\s+/g, " ").trim();
      callbacks.current.onWords(heard.current);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setProblem("blocked");
      else if (e.error === "audio-capture") setProblem("no-microphone");
      else if (e.error !== "no-speech" && e.error !== "aborted") setProblem("failed");
    };
    rec.onend = () => {
      recognition.current = null;
      setListening(false);
      callbacks.current.onDone(heard.current);
    };
    recognition.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      recognition.current = null;
      setProblem("failed");
    }
  }, []);

  /** Letting go: the last words are still coming, so the result arrives in onDone a moment later. */
  const stop = useCallback(() => recognition.current?.stop(), []);

  return { supported, listening, problem, start, stop };
}
