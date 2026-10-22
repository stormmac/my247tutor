/**
 * Suni's daily check-in and what Suni remembers about a child between visits: plain rules shared by
 * the server and the page, kept free of the database so they can be tested.
 */
import { TUTOR_NAME } from "./persona";

export const MOODS = ["happy", "okay", "tired", "worried", "sad"] as const;
export type Mood = (typeof MOODS)[number];

export const MOOD_FACES: Record<Mood, { face: string; label: string }> = {
  happy: { face: "😄", label: "Happy" },
  okay: { face: "🙂", label: "Okay" },
  tired: { face: "😴", label: "Tired" },
  worried: { face: "😟", label: "Worried" },
  sad: { face: "😢", label: "Sad" },
};

/** Feelings a parent or teacher should hear about. */
export const LOW_MOODS: readonly Mood[] = ["worried", "sad"];

/** What Suni says back when a child says how they feel. */
export function moodReply(mood: Mood): string {
  return {
    happy: "Yay! I love that. Let's make today a great learning day.",
    okay: "Thanks for telling me. Let's have a good time learning.",
    tired: "Thanks for telling me. We'll keep things short and fun today.",
    worried:
      "I'm sorry you're feeling worried. That's okay. If something is on your mind, talking to a grown-up you trust can really help.",
    sad: "I'm sorry you're feeling sad. It's okay to feel that way. Talking to a grown-up you trust can really help, and I'm here to learn with you.",
  }[mood];
}

/** Suni asks again once this long has passed since the last check-in. */
export const CHECKIN_GAP_HOURS = 8;

export function checkinDue(lastAt: number | null, now = Date.now()): boolean {
  return lastAt === null || now - lastAt >= CHECKIN_GAP_HOURS * 3_600_000;
}

/** Things a child might pick to work on, and the words Suni is sent for each. */
export const FOCUS_CHOICES = [
  { label: "📖 Reading", ask: "I'd like to work on reading today." },
  { label: "🔢 Maths", ask: "I'd like to work on maths today." },
  { label: "✏️ Writing", ask: "I'd like to work on writing today." },
  { label: "✖️ Times tables", ask: "I'd like to practise my times tables today." },
  { label: "🤔 Something tricky", ask: "I'd like to practise something I find tricky." },
  { label: "🤷 Not sure", ask: "I'm not sure what to work on today. Can you help me choose?" },
] as const;

export const NOTE_KINDS = ["learning", "progress", "feelings", "concern"] as const;
export type NoteKind = (typeof NOTE_KINDS)[number];

/** One thing Suni thinks a child's parent or teacher should know. */
export interface GrownUpNote {
  at: number;
  kind: NoteKind;
  text: string;
}

/** Notes kept for grown-ups, newest last. */
export const MAX_GROWN_UP_NOTES = 40;

export function addGrownUpNotes(existing: GrownUpNote[], added: Omit<GrownUpNote, "at">[], now = Date.now()): GrownUpNote[] {
  const fresh = added.map((n) => ({ ...n, text: n.text.trim().slice(0, 400), at: now })).filter((n) => n.text);
  return [...existing, ...fresh].slice(-MAX_GROWN_UP_NOTES);
}

/** The note a worried or sad check-in leaves for grown-ups, without waiting for Suni to read the chats. */
export function moodNote(name: string, mood: Mood): Omit<GrownUpNote, "at"> | null {
  if (!LOW_MOODS.includes(mood)) return null;
  return { kind: "feelings", text: `${name} told ${TUTOR_NAME} they were feeling ${mood} when they started.` };
}

/** What the tutor is told about this child from earlier visits and today's check-in. */
export function memoryPrompt(memory: { forSuni: string; today?: { mood: Mood | null; focus: string | null } | null }): string {
  const lines: string[] = [];
  if (memory.forSuni.trim())
    lines.push(`What you remember from earlier chats with this student (use it to help them, don't read it out): ${memory.forSuni.trim()}`);
  if (memory.today?.mood) lines.push(`When they started today, they said they feel ${memory.today.mood}. Be gentle if that's not great.`);
  if (memory.today?.focus) lines.push(`Today they want to work on: ${memory.today.focus}`);
  return lines.join("\n");
}
