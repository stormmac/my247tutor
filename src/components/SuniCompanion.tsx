"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import { useTutorChat } from "@/components/useTutorChat";
import { TUTOR_NAME } from "@/lib/tutor/persona";
import type { TutorContext } from "@/lib/tutor/prompt";

/** What a page tells Suni about the work on screen, so Suni can help with it. */
export interface SuniFocus {
  context: TutorContext;
  greeting: string;
  /** The page's own profile setter, so a wellbeing flag isn't overwritten by the page's next save. */
  onWellbeingConcern: (studentMessage: string) => void;
}

interface SuniApi {
  focus: SuniFocus | null;
  setFocus: (focus: SuniFocus | null) => void;
  /** Suni pops up a speech bubble with this message. */
  say: (message: string) => void;
  bubble: string | null;
  setBubble: (message: string | null) => void;
}

const SuniContext = createContext<SuniApi | null>(null);

export function SuniProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<SuniFocus | null>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const say = useCallback((message: string) => setBubble(message), []);
  return <SuniContext.Provider value={{ focus, setFocus, say, bubble, setBubble }}>{children}</SuniContext.Provider>;
}

function useSuniApi(): SuniApi {
  const api = useContext(SuniContext);
  if (!api) throw new Error("SuniProvider is missing");
  return api;
}

/** Lets Suni say something, for example after a tricky question. */
export function useSuniSay() {
  return useSuniApi().say;
}

/** Called by a practice or writing page to tell Suni what the student is working on. */
export function useSuniFocus(focus: SuniFocus | null) {
  const { setFocus } = useSuniApi();
  const latest = useRef(focus);
  latest.current = focus;
  const key = focus ? JSON.stringify([focus.context, focus.greeting]) : "";

  useEffect(() => {
    const current = latest.current;
    // Always call the newest handler, even though the effect only re-runs when the context changes.
    setFocus(current ? { ...current, onWellbeingConcern: (m) => latest.current?.onWellbeingConcern(m) } : null);
  }, [key, setFocus]);

  useEffect(() => () => setFocus(null), [setFocus]);
}

const HIDDEN_ON = ["/parent", "/login"];

/** Suni flies over every page. Tap Suni to chat. */
export function SuniCompanion() {
  const pathname = usePathname();
  const { focus, bubble, setBubble } = useSuniApi();
  const { profile, setProfile, loaded } = useProfile();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  const context: TutorContext | null =
    focus?.context ?? (profile ? { studentName: profile.name, yearLevel: profile.yearLevel, skillId: "general" } : null);
  const greeting =
    focus?.greeting ??
    (profile
      ? `Hi ${profile.name}! I'm ${TUTOR_NAME}. Ask me anything about maths or English, or pick something to practise and I'll help you with it.`
      : `Hi! I'm ${TUTOR_NAME}, your robot bee tutor. Press Start learning and I'll help you along the way.`);
  const onWellbeing =
    focus?.onWellbeingConcern ??
    ((message: string) => setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message }] })));
  const { messages, busy, send } = useTutorChat(context, greeting, onWellbeing);

  // Say hello once, shortly after arriving.
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(
      () => setBubble(profile ? `Hi ${profile.name}! Tap me if you get stuck.` : "Hi! I'm Suni. Tap me to say hello."),
      1500,
    );
    return () => clearTimeout(t);
  }, [loaded]);

  // Speech bubbles fade away after a while.
  useEffect(() => {
    if (!bubble) return;
    const t = setTimeout(() => setBubble(null), 8000);
    return () => clearTimeout(t);
  }, [bubble, setBubble]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  function toggle() {
    setBubble(null);
    setOpen((o) => !o);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    void send(text);
  }

  return (
    <div className={`suni-companion ${open ? "open" : ""}`}>
      {open && (
        <div className="suni-chat" role="dialog" aria-label={`Chat with ${TUTOR_NAME}`}>
          <div className="suni-chat-header">
            <strong>{TUTOR_NAME}</strong>
            <button type="button" className="suni-close" onClick={() => setOpen(false)} aria-label={`Close chat with ${TUTOR_NAME}`}>
              ×
            </button>
          </div>
          <div className="messages" ref={scroller} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.content || (busy && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>
          {context ? (
            <form onSubmit={submit}>
              <input
                ref={field}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${TUTOR_NAME}…`}
                maxLength={1000}
                aria-label={`Message ${TUTOR_NAME}`}
              />
              <button className="btn small" disabled={busy || !input.trim()}>
                Send
              </button>
            </form>
          ) : (
            <p className="small muted" style={{ margin: "0 16px 14px" }}>
              Set up a learner on the Learn page to chat with me.
            </p>
          )}
        </div>
      )}
      {!open && bubble && (
        <button type="button" className="suni-bubble" onClick={toggle}>
          {bubble}
        </button>
      )}
      <button
        type="button"
        className={`suni-fly ${busy ? "thinking" : ""}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? `Close chat with ${TUTOR_NAME}` : `Chat with ${TUTOR_NAME}`}
      >
        <Suni size={open ? 72 : 92} wave={!!bubble && !open} />
      </button>
    </div>
  );
}

/** Builds what Suni needs to know about a practice question on screen. */
export function questionFocus(args: {
  profile: { name: string; yearLevel: 3 | 4 | 5 | 6 };
  setProfile: ReturnType<typeof useProfile>["setProfile"];
  progressKey: string;
  title: string;
  question: { prompt: string; choices?: string[]; passage?: { title: string; text: string } };
  correctAnswer: string;
  answered: boolean;
  hintsShown: number;
}): SuniFocus {
  const { profile, setProfile, question } = args;
  return {
    greeting: `Hi ${profile.name}! I'm ${TUTOR_NAME}. Stuck on ${args.title.charAt(0).toLowerCase() + args.title.slice(1)}? Ask me and we'll work it out together.`,
    context: {
      studentName: profile.name,
      yearLevel: profile.yearLevel,
      skillId: args.progressKey,
      question: {
        prompt: question.prompt + (question.choices ? ` Options: ${question.choices.join(" / ")}` : ""),
        correctAnswer: args.correctAnswer.slice(0, 200),
        answered: args.answered,
        hintsShown: args.hintsShown,
        passage: question.passage ? `${question.passage.title}\n${question.passage.text}` : undefined,
      },
    },
    onWellbeingConcern: (message) => setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message }] })),
  };
}
