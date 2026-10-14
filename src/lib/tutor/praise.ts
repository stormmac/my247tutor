/** What Suni says after a right answer. Admins can add more on the Suni admin page. */
export const DEFAULT_PRAISE = [
  "Great work!",
  "Excellent!",
  "Well done!",
  "Brilliant!",
  "Fantastic!",
  "Awesome job!",
  "You're a star!",
  "Super effort!",
  "Spot on!",
  "Nailed it!",
] as const;

export const MAX_PRAISE_LENGTH = 80;
export const MAX_PRAISE_PHRASES = 200;

/** Tidies an admin's new phrase, or says why it can't be used. */
export function cleanPraise(text: string): { text: string } | { error: string } {
  const tidy = text.replace(/\s+/g, " ").trim();
  if (!tidy) return { error: "Type something for Suni to say." };
  if (tidy.length > MAX_PRAISE_LENGTH) return { error: `Keep it to ${MAX_PRAISE_LENGTH} characters or fewer.` };
  return { text: tidy };
}

/** A phrase to say, never the same as the last one when there's a choice. */
export function pickPraise(phrases: readonly string[], last?: string, random = Math.random): string {
  const pool = phrases.length ? phrases : DEFAULT_PRAISE;
  const fresh = pool.length > 1 ? pool.filter((p) => p !== last) : pool;
  return fresh[Math.floor(random() * fresh.length)] ?? "Great work!";
}

/** Puts the child's first name into a phrase ("Excellent!" becomes "Excellent, Bob!"), and says when it took a second go. */
export function praiseLine(phrase: string, name: string | undefined, firstTry: boolean): string {
  const first = name?.trim().split(/\s+/)[0];
  let line = phrase;
  if (first && !phrase.toLowerCase().includes(first.toLowerCase())) {
    const end = /[!.?]+$/.exec(phrase)?.[0] ?? "";
    line = `${phrase.slice(0, phrase.length - end.length)}, ${first}${end || "!"}`;
  }
  return firstTry ? line : `${line} You got it on your second go.`;
}
