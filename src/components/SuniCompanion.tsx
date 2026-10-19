"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import { useSpeechInput, type SpeechInputProblem } from "@/components/useSpeechInput";
import { useSuniVoice } from "@/components/useSuniVoice";
import { useTutorChat } from "@/components/useTutorChat";
import { TUTOR_NAME } from "@/lib/tutor/persona";
import type { TutorContext } from "@/lib/tutor/prompt";
import type { YearLevel } from "@/lib/curriculum/types";

/** What a page tells Suni about the work on screen, so Suni can help with it. */
export interface SuniFocus {
  context: TutorContext;
  greeting: string;
  /** The page's own profile setter, so a wellbeing flag isn't overwritten by the page's next save. */
  onWellbeingConcern: (studentMessage: string) => void;
}

/**
 * What's on screen when there's no practice question: a reading lesson step, the lesson plan, a
 * check, the times tables game. Suni talks about this.
 */
export interface SuniScreen {
  /** Plain words for the model, such as "Learn to Read lesson, step 3 of 12: find the word cat". */
  screen: string;
  /** A check, test or timed game: Suni encourages but gives no hints or answers. */
  noHelp?: boolean;
  /** What Suni says when the chat opens. */
  greeting?: string;
}

interface SuniApi {
  focus: SuniFocus | null;
  setFocus: (focus: SuniFocus | null) => void;
  screen: SuniScreen | null;
  setScreen: (screen: SuniScreen | null) => void;
  /** Suni pops up a speech bubble with this message. */
  say: (message: string) => void;
  bubble: string | null;
  setBubble: (message: string | null) => void;
  /** Goes up each time Suni is asked to say something, so the same words twice are said twice. */
  said: number;
}

const SuniContext = createContext<SuniApi | null>(null);

export function SuniProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<SuniFocus | null>(null);
  const [screen, setScreen] = useState<SuniScreen | null>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const [said, setSaid] = useState(0);
  const say = useCallback((message: string) => {
    setBubble(message);
    setSaid((n) => n + 1);
  }, []);
  return (
    <SuniContext.Provider value={{ focus, setFocus, screen, setScreen, say, bubble, setBubble, said }}>{children}</SuniContext.Provider>
  );
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

/** Tells Suni what's on screen, for pages without a practice question (see SuniScreen). */
export function useSuniScreen(screen: SuniScreen | null) {
  const { setScreen } = useSuniApi();
  const key = screen ? JSON.stringify(screen) : "";
  useEffect(() => {
    setScreen(key ? (JSON.parse(key) as SuniScreen) : null);
  }, [key, setScreen]);
  useEffect(() => () => setScreen(null), [setScreen]);
}

/** What's on pages that don't say for themselves. */
export function screenForPath(pathname: string): string {
  if (pathname === "/") return "The my247tutor home page.";
  if (pathname === "/learn") return "The Learn page, choosing what to do: Maths, English, Learn to Read, writing or the times tables game.";
  if (pathname.startsWith("/read")) return "The Learn to Read page, choosing a sounds lesson, sight words or Sound It Out.";
  if (pathname.startsWith("/tables")) return "The times tables game, choosing which tables to play.";
  if (pathname.startsWith("/learn/writing")) return "The writing page.";
  if (pathname.startsWith("/learn/")) return `The ${pathname.split("/")[2] === "english" ? "English" : "maths"} learning page.`;
  if (pathname.startsWith("/classes") || pathname.startsWith("/centre")) return "A teacher's classes page.";
  if (pathname.startsWith("/admin")) return "The admin pages.";
  return "A my247tutor page.";
}

const HIDDEN_ON = ["/parent", "/login", "/signup", "/forgot-password", "/set-password", "/private"];

/** Suni flies over every page. Tap Suni to chat. */
export function SuniCompanion() {
  const pathname = usePathname();
  const { focus, screen, bubble, setBubble, said } = useSuniApi();
  const { profile, setProfile, loaded } = useProfile();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  // A practice question says the most; otherwise the page's own description, otherwise one from its address.
  const onScreen: SuniScreen = screen ?? { screen: screenForPath(pathname) };
  const base: TutorContext | null =
    focus?.context ?? (profile ? { studentName: profile.name, yearLevel: profile.yearLevel, skillId: "general" } : null);
  const context: TutorContext | null = base && {
    ...base,
    // Suni talks the child's curriculum: US spelling and "Grade" for a child on US Common Core, pounds in the UK.
    ...(profile?.curriculum === "us" || profile?.curriculum === "uk" ? { curriculum: profile.curriculum } : {}),
    screen: base.screen ?? onScreen.screen,
    ...((base.noHelp ?? onScreen.noHelp) ? { noHelp: true } : {}),
  };
  const greeting =
    focus?.greeting ??
    (profile && screen?.greeting) ??
    (profile
      ? `Hi ${profile.name}! I'm ${TUTOR_NAME}. Ask me anything about maths or English, or pick something to practise and I'll help you with it.`
      : `Hi! I'm ${TUTOR_NAME}, your robot bee tutor. Press Start learning and I'll help you along the way.`);
  const onWellbeing =
    focus?.onWellbeingConcern ??
    ((message: string) => setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message }] })));
  const { messages, busy, send } = useTutorChat(context, greeting, onWellbeing, profile?.id);
  const voice = useSuniVoice();

  // Suni reads each reply aloud once it has finished arriving.
  const wasBusy = useRef(false);
  useEffect(() => {
    if (wasBusy.current && !busy) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant" && last.content) voice.say(last.content);
    }
    wasBusy.current = busy;
  }, [busy, messages, voice]);

  // Speech bubbles are said aloud too (browsers only allow it once the page has been tapped).
  useEffect(() => {
    if (bubble && !open) voice.say(bubble);
  }, [bubble, said]);

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

  // Hold the microphone to talk: the words fill the message box as they speak, and letting go sends them.
  const speech = useSpeechInput({
    onWords: setInput,
    onDone: (text) => {
      if (!text) return;
      setInput("");
      void send(text);
    },
  });

  // After every hook, so moving between pages where Suni is hidden and shown keeps the same hooks.
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  function toggle() {
    setBubble(null);
    if (open) voice.stop();
    // Opening the chat says the greeting, or whatever Suni said last.
    else voice.say(messages.filter((m) => m.role === "assistant" && m.content).at(-1)?.content ?? greeting);
    setOpen((o) => !o);
  }

  function close() {
    voice.stop();
    setOpen(false);
  }

  function startTalking(e: React.PointerEvent | React.KeyboardEvent) {
    if ("repeat" in e && e.repeat) return;
    e.preventDefault();
    // Suni stops talking so it doesn't hear itself.
    voice.stop();
    if (busy) return;
    if ("pointerId" in e) (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    speech.start();
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
            <span className="suni-header-buttons">
              {voice.supported && (
                <button
                  type="button"
                  className="suni-voice-toggle"
                  onClick={() => voice.setOn(!voice.on)}
                  aria-pressed={voice.on}
                  aria-label={voice.on ? `Turn ${TUTOR_NAME}'s voice off` : `Turn ${TUTOR_NAME}'s voice on`}
                  title={voice.on ? "Voice on" : "Voice off"}
                >
                  <SpeakerIcon on={voice.on} />
                </button>
              )}
              <button type="button" className="suni-close" onClick={close} aria-label={`Close chat with ${TUTOR_NAME}`}>
                ×
              </button>
            </span>
          </div>
          <div className="messages" ref={scroller} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                {voice.supported && m.role === "assistant" && m.content && !(busy && i === messages.length - 1) && (
                  <button type="button" className="msg-say" onClick={() => voice.say(m.content, true)} aria-label="Say it again">
                    <SpeakerIcon on />
                  </button>
                )}
              </div>
            ))}
          </div>
          {context && (speech.listening || speech.problem) && (
            <p className={`suni-mic-status small ${speech.problem ? "problem" : ""}`} role="status">
              {speech.problem ? MIC_PROBLEMS[speech.problem] : "Listening… let go when you've finished."}
            </p>
          )}
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
              {speech.supported && (
                <button
                  type="button"
                  className={`suni-mic ${speech.listening ? "listening" : ""}`}
                  aria-label={speech.listening ? "Listening. Let go to send" : `Hold to talk to ${TUTOR_NAME}`}
                  aria-pressed={speech.listening}
                  title="Hold to talk"
                  disabled={busy && !speech.listening}
                  onPointerDown={startTalking}
                  onPointerUp={speech.stop}
                  onPointerCancel={speech.stop}
                  onKeyDown={(e) => (e.key === " " || e.key === "Enter") && startTalking(e)}
                  onKeyUp={(e) => (e.key === " " || e.key === "Enter") && speech.stop()}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <MicIcon />
                </button>
              )}
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

export const MIC_PROBLEMS: Record<SpeechInputProblem, string> = {
  blocked: "I can't hear you yet. Ask a grown-up to allow the microphone for this site, then try again.",
  "no-microphone": "I couldn't find a microphone. You can type to me instead.",
  failed: "I didn't catch that. Hold the microphone and try again, or type to me.",
};

export function MicIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </svg>
  );
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      {on ? (
        <>
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a8.5 8.5 0 0 1 0 12" />
        </>
      ) : (
        <path d="M17 9l5 6M22 9l-5 6" />
      )}
    </svg>
  );
}

/** Builds what Suni needs to know about a practice question on screen. */
export function questionFocus(args: {
  profile: { name: string; yearLevel: YearLevel };
  setProfile: ReturnType<typeof useProfile>["setProfile"];
  progressKey: string;
  title: string;
  question: { prompt: string; choices?: string[]; passage?: { title: string; text: string } };
  correctAnswer: string;
  answered: boolean;
  hintsShown: number;
  /** Where the question sits, such as "Weekly lesson, part 2 (Fractions), question 3 of 10". */
  screen?: string;
}): SuniFocus {
  const { profile, setProfile, question } = args;
  return {
    greeting: `Hi ${profile.name}! I'm ${TUTOR_NAME}. Stuck on ${args.title.charAt(0).toLowerCase() + args.title.slice(1)}? Ask me and we'll work it out together.`,
    context: {
      studentName: profile.name,
      yearLevel: profile.yearLevel,
      skillId: args.progressKey,
      ...(args.screen ? { screen: args.screen } : {}),
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
