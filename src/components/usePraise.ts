"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { QuestionOutcome } from "@/components/QuestionView";
import { DEFAULT_PRAISE, pickPraise, praiseLine } from "@/lib/tutor/praise";

let extra: Promise<string[]> | null = null;

/** Fetched once per page load: the phrases admins have added. */
function loadExtra(): Promise<string[]> {
  extra ??= fetch("/api/praise")
    .then((r) => (r.ok ? (r.json() as Promise<{ phrases?: string[] }>) : { phrases: [] }))
    .then((b) => b.phrases ?? [])
    .catch(() => []);
  return extra;
}

/** Picks what Suni says after a right answer: the built-in phrases plus any admins added, with the child's first name, never twice in a row. */
export function usePraise(): (o: QuestionOutcome, name?: string) => string {
  const [phrases, setPhrases] = useState<string[]>([...DEFAULT_PRAISE]);
  const last = useRef<string | undefined>(undefined);
  useEffect(() => {
    let live = true;
    void loadExtra().then((more) => live && more.length && setPhrases([...DEFAULT_PRAISE, ...more]));
    return () => {
      live = false;
    };
  }, []);
  return useCallback(
    (o: QuestionOutcome, name?: string) => {
      const phrase = pickPraise(phrases, last.current);
      last.current = phrase;
      return praiseLine(phrase, name, o.firstTry);
    },
    [phrases],
  );
}
