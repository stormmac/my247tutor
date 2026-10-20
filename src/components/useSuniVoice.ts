"use client";

import { useCallback, useEffect, useState } from "react";
import { speak, speechSupported, stopSpeaking, type SpeechPart } from "@/lib/tutor/speech";

const KEY = "my247tutor.suni-voice";
const CHANGED = "my247tutor-suni-voice";

function readOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

/** Whether Suni talks aloud (on unless turned off on this device), and a way to say things. */
export function useSuniVoice() {
  const [supported, setSupported] = useState(false);
  const [on, setOnState] = useState(true);

  useEffect(() => {
    setSupported(speechSupported());
    setOnState(readOn());
    // Some browsers load their voices after the page; asking early gets them ready.
    if (speechSupported()) window.speechSynthesis.getVoices();
    const sync = () => setOnState(readOn());
    window.addEventListener(CHANGED, sync);
    return () => window.removeEventListener(CHANGED, sync);
  }, []);

  const setOn = useCallback((value: boolean) => {
    try {
      localStorage.setItem(KEY, value ? "on" : "off");
    } catch {}
    if (!value) stopSpeaking();
    setOnState(value);
    window.dispatchEvent(new Event(CHANGED));
  }, []);

  /** Says it aloud when the voice is on. `force` is for the replay button, which always speaks. */
  const say = useCallback(
    (text: string | SpeechPart[], force = false) => {
      if (supported && (on || force)) speak(text);
    },
    [supported, on],
  );

  /** Says one word slowly and clearly, after an optional lead-in such as "Find the word." Always speaks. */
  const sayWord = useCallback(
    (word: string, lead?: string) => {
      if (supported) speak([...(lead ? [{ text: lead }] : []), { text: word, word: true }]);
    },
    [supported],
  );

  return { supported, on: supported && on, setOn, say, sayWord, stop: stopSpeaking };
}
