"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Suni, type SuniPose, useSuniTalking } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import { useSpeechInput, type SpeechInputProblem } from "@/components/useSpeechInput";
import { useSuniVoice } from "@/components/useSuniVoice";
import { useTutorChat } from "@/components/useTutorChat";
import { Whiteboard, type WhiteboardHandle } from "@/components/Whiteboard";
import { parseAlgorithm } from "@/lib/tutor/algorithm";
import { fitSuni, SUNI_EDGE, type SuniFit, suniMax } from "@/lib/tutor/suniFit";
import { CHECKING_MESSAGE, splitBoard, STILL_WORKING_MESSAGE, wantsHelp } from "@/lib/tutor/board";
import { CELEBRATE_EVENT } from "@/lib/tutor/celebrate";
import { FOCUS_CHOICES, MOOD_FACES, MOODS, moodReply, type Mood } from "@/lib/tutor/memory";
import { TUTOR_NAME } from "@/lib/tutor/persona";
import { MOOD_RATING, programAhead, programText } from "@/lib/tutor/program";
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
  if (pathname === "/learn")
    return "The Student page, choosing what to do: Maths, English, Learn to Read, writing or the times tables game.";
  if (pathname.startsWith("/read")) return "The Learn to Read page, choosing a sounds lesson, sight words or Sound It Out.";
  if (pathname.startsWith("/tables")) return "The times tables game, choosing which tables to play.";
  if (pathname.startsWith("/learn/writing")) return "The writing page.";
  if (pathname.startsWith("/learn/")) return `The ${pathname.split("/")[2] === "english" ? "English" : "maths"} learning page.`;
  if (pathname.startsWith("/classes") || pathname.startsWith("/centre")) return "A teacher's classes page.";
  if (pathname.startsWith("/admin")) return "The admin pages.";
  return "A my247tutor page.";
}

const HIDDEN_ON = ["/parent", "/login", "/signup", "/forgot-password", "/set-password", "/private"];

/** How Suni starts the day's first chat. */
function checkinQuestion(name: string): string {
  return `Hi ${name}! How are you today? Rate how you're feeling from 1 to 5.`;
}

/** The size Suni shows at while the chat is open. */
const OPEN_SIZE = 96;

/**
 * Keeps the flying Suni as big as it can be without covering the question on screen (anything marked
 * data-suni-avoid), as the page scrolls, resizes or changes.
 */
function useSuniFit(): SuniFit {
  const [fit, setFit] = useState<SuniFit>({ size: 120, bottom: SUNI_EDGE, roam: true });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { innerWidth: w, innerHeight: h } = window;
      const avoid = [...document.querySelectorAll("[data-suni-avoid]")].map((el) => el.getBoundingClientRect());
      const next = fitSuni(w, h, avoid);
      setFit((f) => (f.size === next.size && f.bottom === next.bottom && f.roam === next.roam ? f : next));
      // Room at the end of the page, so the last question can scroll clear of Suni.
      document.documentElement.style.setProperty("--suni-room", `${suniMax(w) + 2 * SUNI_EDGE}px`);
    };
    const later = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", later, { passive: true });
    window.addEventListener("resize", later);
    const watch = new MutationObserver(later);
    watch.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", later);
      window.removeEventListener("resize", later);
      watch.disconnect();
    };
  }, []);
  return fit;
}

/** Where a child dragged Suni to: distances from the right and bottom of the screen. */
interface SuniSpot {
  right: number;
  bottom: number;
}

const SPOT_KEY = "my247tutor.suniSpot.v1";
/** How far the pointer moves before a press on Suni becomes a drag rather than a tap. */
const DRAG_START = 6;
/** Dropping Suni this close to the bottom right corner hands it back to fitting itself around the question. */
const HOME_ZONE = 60;

function savedSpot(): SuniSpot | null {
  try {
    const s = JSON.parse(localStorage.getItem(SPOT_KEY) ?? "null") as SuniSpot | null;
    return s && Number.isFinite(s.right) && Number.isFinite(s.bottom) ? s : null;
  } catch {
    return null;
  }
}

function saveSpot(spot: SuniSpot | null) {
  try {
    if (spot) localStorage.setItem(SPOT_KEY, JSON.stringify(spot));
    else localStorage.removeItem(SPOT_KEY);
  } catch {
    // Without storage Suni still moves; it just doesn't remember where.
  }
}

/**
 * Lets the child drag Suni anywhere on the screen with a mouse or finger. Suni stays where it's put
 * (remembered on this device) until it's dragged back to the bottom right corner.
 */
function useSuniDrag(size: number) {
  const [spot, setSpot] = useState<SuniSpot | null>(null);
  const [dragging, setDragging] = useState(false);
  const press = useRef<{ x: number; y: number; right: number; bottom: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  useEffect(() => setSpot(savedSpot()), []);

  const place = (right: number, bottom: number): SuniSpot => ({
    right: Math.round(Math.min(Math.max(right, 0), window.innerWidth - size)),
    bottom: Math.round(Math.min(Math.max(bottom, 0), window.innerHeight - size)),
  });

  const handlers = {
    onPointerDown(e: React.PointerEvent<HTMLElement>) {
      if (e.button !== 0) return;
      const box = e.currentTarget.getBoundingClientRect();
      press.current = {
        x: e.clientX,
        y: e.clientY,
        right: window.innerWidth - box.right,
        bottom: window.innerHeight - box.bottom,
        moved: false,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove(e: React.PointerEvent<HTMLElement>) {
      const p = press.current;
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      if (!p.moved && Math.hypot(dx, dy) < DRAG_START) return;
      p.moved = true;
      setDragging(true);
      setSpot(place(p.right - dx, p.bottom - dy));
    },
    onPointerUp(e: React.PointerEvent<HTMLElement>) {
      const p = press.current;
      press.current = null;
      if (!p?.moved) return;
      // The click that follows a drag isn't a tap on Suni.
      dragged.current = true;
      setDragging(false);
      const next = place(p.right - (e.clientX - p.x), p.bottom - (e.clientY - p.y));
      const home = next.right < HOME_ZONE && next.bottom < HOME_ZONE;
      setSpot(home ? null : next);
      saveSpot(home ? null : next);
    },
    onPointerCancel() {
      press.current = null;
      setDragging(false);
    },
  };

  /** Whether the click just now ended a drag, so it shouldn't open the chat. */
  function wasDrag() {
    const was = dragged.current;
    dragged.current = false;
    return was;
  }

  return { spot, dragging, handlers, wasDrag };
}

/** Suni flies over every page. Tap Suni to chat. */
export function SuniCompanion() {
  const pathname = usePathname();
  const { focus, screen, bubble, setBubble, said } = useSuniApi();
  const { profile, setProfile, loaded } = useProfile();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const [pose, setPose] = useState<SuniPose | null>(null);
  const talking = useSuniTalking();
  const [slaps, setSlaps] = useState(0);
  // The start-of-visit check-in: how they feel, then what they'd like to work on.
  // Then Suni goes through the week's program, or asks what they'd like to do when there's nothing set.
  const [checkin, setCheckin] = useState<"mood" | "program" | "focus" | null>(null);
  // Once Suni has asked how they feel, that's how the chat begins, not with the usual hello.
  const [checkedIn, setCheckedIn] = useState(false);
  const router = useRouter();
  const [mood, setMood] = useState<Mood | null>(null);
  const checkedFor = useRef<string | null>(null);
  const fit = useSuniFit();
  const drag = useSuniDrag(fit.size);
  // Where the child put Suni wins over fitting around the question, except while chatting.
  const placed = drag.spot && !open ? drag.spot : null;

  // A right answer anywhere: a thumbs up, or a hand held up for a high five the child can tap.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const onCelebrate = (e: Event) => {
      const next = (e as CustomEvent<SuniPose>).detail;
      setPose(next);
      clearTimeout(t);
      t = setTimeout(() => setPose(null), next === "highFive" ? 4000 : 2500);
    };
    window.addEventListener(CELEBRATE_EVENT, onCelebrate);
    return () => {
      window.removeEventListener(CELEBRATE_EVENT, onCelebrate);
      clearTimeout(t);
    };
  }, []);

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
  const { messages, busy, send: sendChat } = useTutorChat(context, greeting, onWellbeing, profile?.id);
  const voice = useSuniVoice();

  // The whiteboard pops up when the student asks for help, or when Suni writes on it. It shows what
  // Suni has written since it was opened or cleared, and a picture of the student's drawing goes with each message.
  const [boardFrom, setBoardFrom] = useState<number | null>(null);
  const board = useRef<WhiteboardHandle>(null);
  const boardSections =
    boardFrom === null
      ? []
      : messages
          .slice(boardFrom)
          .filter((m) => m.role === "assistant")
          .map((m) => splitBoard(m.content).board)
          .filter((lines) => lines.length);
  // The latest written method Suni set out is drawn properly; the rest is Suni's handwriting.
  const boardAlgorithm =
    boardSections
      .flat()
      .map(parseAlgorithm)
      .filter((a) => a !== null)
      .at(-1) ?? null;
  const boardWriting = boardSections.map((lines) => lines.filter((l) => !parseAlgorithm(l))).filter((lines) => lines.length);
  function openBoard() {
    setBoardFrom((from) => from ?? messages.length);
  }
  function send(text: string, image = board.current?.takePicture(), quiet = false) {
    if (wantsHelp(text)) openBoard();
    return sendChat(text, image, quiet);
  }
  // Suni writing on the board in a new reply opens it, once: closing it keeps it closed.
  const last = messages.at(-1);
  const openedFor = useRef(-1);
  useEffect(() => {
    const at = messages.length - 1;
    if (at <= openedFor.current || last?.role !== "assistant" || !splitBoard(last.content).board.length) return;
    openedFor.current = at;
    setBoardFrom((from) => from ?? at);
  }, [last, messages.length]);

  // Suni reads each reply aloud once it has finished arriving.
  const wasBusy = useRef(false);
  useEffect(() => {
    if (wasBusy.current && !busy) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant" && last.content) voice.say(splitBoard(last.content).say);
    }
    wasBusy.current = busy;
  }, [busy, messages, voice]);

  // Speech bubbles are said aloud too (browsers only allow it once the page has been tapped).
  useEffect(() => {
    if (bubble && !open) voice.say(bubble);
  }, [bubble, said]);

  // Say hello once, shortly after arriving, unless Suni is about to ask how they feel (below).
  const hello = () => setBubble(profile ? `Hi ${profile.name}! Tap me if you get stuck.` : "Hi! I'm Suni. Tap me to say hello.");
  useEffect(() => {
    if (!loaded || profile?.id) return;
    const t = setTimeout(hello, 1500);
    return () => clearTimeout(t);
  }, [loaded]);

  // At the start of a visit, Suni flies in and asks how they're feeling and what they'd like to work on.
  const hidden = HIDDEN_ON.some((p) => pathname.startsWith(p));
  useEffect(() => {
    // Only a child kept with an account has check-ins to keep.
    if (!loaded || !profile?.id || hidden || checkedFor.current === profile.id) return;
    checkedFor.current = profile.id;
    let t: ReturnType<typeof setTimeout> | undefined;
    void fetch(`/api/suni/checkin?learner=${profile.id}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ due?: boolean }>) : null))
      .catch(() => null)
      .then((body) => {
        if (!body?.due) {
          t = setTimeout(hello, 1500);
          return;
        }
        t = setTimeout(() => {
          setBubble(null);
          setCheckin("mood");
          setCheckedIn(true);
          setOpen(true);
          voice.say(checkinQuestion(profile.name));
        }, 1200);
      });
    return () => clearTimeout(t);
  }, [loaded, profile?.id, hidden]);

  function sendCheckin(answer: { mood?: Mood | null; focus?: string | null }) {
    void fetch("/api/suni/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId: profile?.id, ...answer }),
    }).catch(() => undefined);
  }

  // This week's program, for once they've said how they feel.
  const program = profile ? programAhead(profile) : null;

  function pickMood(picked: Mood) {
    setMood(picked);
    sendCheckin({ mood: picked });
    if (program?.lines.length) {
      setCheckin("program");
      voice.say(`${moodReply(picked)} ${programText(program)}`);
    } else {
      setCheckin("focus");
      voice.say(`${moodReply(picked)} What would you like to work on today? Is there anything you'd like to practise?`);
    }
  }

  /** They start a subject from the program: off to its lesson, with Suni close by. */
  function startStep(subject: string, label: string, href: string) {
    setCheckin(null);
    sendCheckin({ focus: subject });
    voice.stop();
    setOpen(false);
    setBubble(`${label}! Tap me if you get stuck.`);
    router.push(href);
  }

  /** What they'd like to work on goes to Suni, who helps them get started. */
  function pickFocus(focus: string, ask = focus) {
    setCheckin(null);
    sendCheckin({ focus });
    void send(ask);
  }

  // Speech bubbles fade away after a while.
  useEffect(() => {
    if (!bubble) return;
    const t = setTimeout(() => setBubble(null), 8000);
    return () => clearTimeout(t);
  }, [bubble, setBubble]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, checkin]);

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
  if (hidden) return null;

  function toggle() {
    // Tapping Suni's raised hand is a high five, not opening the chat.
    if (pose === "highFive") {
      setPose(null);
      setSlaps((n) => n + 1);
      voice.say("High five!");
      return;
    }
    setBubble(null);
    if (open) voice.stop();
    // Opening the chat says the greeting, or whatever Suni said last.
    else voice.say(splitBoard(messages.filter((m) => m.role === "assistant" && m.content).at(-1)?.content ?? greeting).say);
    setOpen((o) => !o);
  }

  function close() {
    voice.stop();
    setOpen(false);
    // Closed without saying how they feel: Suni won't ask again until next time.
    if (checkin === "mood") sendCheckin({ mood: null });
    setCheckin(null);
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
    if (checkin === "focus" || checkin === "program") pickFocus(text);
    else {
      setCheckin(null);
      void send(text);
    }
  }

  return (
    <>
      {boardFrom !== null && (
        <Whiteboard
          ref={board}
          sections={boardWriting}
          algorithm={boardAlgorithm}
          busy={busy}
          onCheck={() => {
            setOpen(true);
            void send(CHECKING_MESSAGE, board.current?.takePicture(true));
          }}
          onPause={() => {
            const picture = board.current?.takePicture();
            if (picture) void send(STILL_WORKING_MESSAGE, picture, true);
          }}
          onClear={() => setBoardFrom(messages.length)}
          onClose={() => setBoardFrom(null)}
        />
      )}
      <div
        className={`suni-companion ${open ? "open" : ""} ${boardFrom !== null ? "with-board" : ""} ${fit.roam && !placed ? "" : "still"} ${drag.dragging ? "dragging" : ""}`}
        style={placed ?? (open ? undefined : { bottom: fit.bottom })}
      >
        {open && (
          <div className="suni-chat" role="dialog" aria-label={`Chat with ${TUTOR_NAME}`}>
            <div className="suni-chat-header">
              <strong>{TUTOR_NAME}</strong>
              <span className="suni-header-buttons">
                {context && (
                  <button
                    type="button"
                    className="suni-voice-toggle suni-board-toggle"
                    onClick={() => (boardFrom === null ? openBoard() : setBoardFrom(null))}
                    aria-pressed={boardFrom !== null}
                    title="Whiteboard"
                    aria-label={boardFrom === null ? "Open the whiteboard" : "Close the whiteboard"}
                  >
                    📋
                  </button>
                )}
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
              {messages.map((m, i) => {
                // The check-in is how the chat begins, so the usual hello isn't said as well.
                if (m.quiet || (checkedIn && i === 0)) return null;
                const { say, board: onBoard } = m.role === "assistant" ? splitBoard(m.content) : { say: m.content, board: [] };
                return (
                  <div key={i} className={`msg ${m.role}`}>
                    {say || (busy && i === messages.length - 1 ? "…" : "")}
                    {voice.supported && m.role === "assistant" && say && !(busy && i === messages.length - 1) && (
                      <button type="button" className="msg-say" onClick={() => voice.say(say, true)} aria-label="Say it again">
                        <SpeakerIcon on />
                      </button>
                    )}
                    {onBoard.length > 0 && boardFrom === null && (
                      <button type="button" className="board-chip" onClick={() => setBoardFrom(i)}>
                        📋 See it on the whiteboard
                      </button>
                    )}
                  </div>
                );
              })}
              {checkin && profile && (
                <div className="suni-checkin">
                  <div className="msg assistant">{checkinQuestion(profile.name)}</div>
                  {checkin === "mood" ? (
                    <div className="suni-choices suni-rating" role="group" aria-label="How are you feeling, from 1 to 5?">
                      {[...MOODS]
                        .sort((a, b) => MOOD_RATING[a] - MOOD_RATING[b])
                        .map((m) => (
                          <button key={m} type="button" className="suni-mood" onClick={() => pickMood(m)}>
                            <strong>{MOOD_RATING[m]}</strong>
                            <span aria-hidden>{MOOD_FACES[m].face}</span>
                            {MOOD_FACES[m].label}
                          </button>
                        ))}
                    </div>
                  ) : checkin === "program" && program ? (
                    <>
                      <div className="msg user">{mood && `${MOOD_RATING[mood]} ${MOOD_FACES[mood].face} ${MOOD_FACES[mood].label}`}</div>
                      <div className="msg assistant">
                        {mood && <p style={{ margin: "0 0 6px" }}>{moodReply(mood)}</p>}
                        <p style={{ margin: "0 0 4px" }}>Here&apos;s your program this week:</p>
                        <ul className="suni-program">
                          {program.lines.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                        <p style={{ margin: "6px 0 0" }}>
                          {program.steps[0]
                            ? `Shall we ${program.steps[0].suggest}? Or is there something else you'd like to do?`
                            : "You've finished this week's lessons! Would you like to practise something?"}
                        </p>
                      </div>
                      <div className="suni-choices" role="group" aria-label="What would you like to do?">
                        {program.steps.map((st, i) => (
                          <button
                            key={st.subject}
                            type="button"
                            className={`btn small ${i ? "secondary" : ""}`}
                            onClick={() => startStep(st.subject, st.label, st.href)}
                          >
                            {st.label}
                          </button>
                        ))}
                        <button type="button" className="btn small secondary" onClick={() => setCheckin("focus")}>
                          Something else
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="msg user">{mood && `${MOOD_RATING[mood]} ${MOOD_FACES[mood].face} ${MOOD_FACES[mood].label}`}</div>
                      <div className="msg assistant">
                        {mood && !program?.lines.length && `${moodReply(mood)} `}What would you like to work on today? Is there anything
                        you&apos;d like to practise?
                      </div>
                      <div className="suni-choices" role="group" aria-label="What would you like to work on?">
                        {FOCUS_CHOICES.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            className="btn small secondary"
                            onClick={() => pickFocus(c.label.replace(/^\S+ /, ""), c.ask)}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
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
                  placeholder={checkin === "focus" ? "Or tell me what you'd like to practise…" : `Ask ${TUTOR_NAME}…`}
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
                Set up a learner on the Student page to chat with me.
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
          onClick={() => !drag.wasDrag() && toggle()}
          {...drag.handlers}
          title="Tap to chat, or drag to move me"
          aria-expanded={open}
          aria-label={
            pose === "highFive" ? `Give ${TUTOR_NAME} a high five` : open ? `Close chat with ${TUTOR_NAME}` : `Chat with ${TUTOR_NAME}`
          }
        >
          <Suni size={open ? OPEN_SIZE : fit.size} wave={!!bubble && !open} pose={pose} talking={talking && !pose} />
          {slaps > 0 && (
            <span key={slaps} className="suni-slap" aria-hidden>
              ✋✨
            </span>
          )}
        </button>
      </div>
    </>
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
