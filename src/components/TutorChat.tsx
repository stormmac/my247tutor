"use client";

import { useEffect, useRef, useState } from "react";
import { TUTOR_NAME } from "@/lib/tutor/persona";
import type { TutorContext } from "@/lib/tutor/prompt";
import { Suni } from "./Suni";

type ChatMessage = { role: "user" | "assistant" | "notice"; content: string };

interface Props {
  context: TutorContext;
  /** Called when the safety check spots a wellbeing concern, so the parent can be told. */
  onWellbeingConcern: (studentMessage: string) => void;
  greeting: string;
}

export function TutorChat({ context, onWellbeingConcern, greeting }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: greeting }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);

    const history = [...messages, { role: "user" as const, content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    // Only real chat turns go to the server; the greeting and safety notices stay on screen only.
    const turns = history.slice(1).filter((m) => m.role !== "notice" && m.content) as { role: "user" | "assistant"; content: string }[];

    const update = (fn: (msgs: ChatMessage[]) => ChatMessage[]) => setMessages((m) => fn(m));
    const appendToReply = (chunk: string) =>
      update((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = { ...last, content: last.content + chunk };
        return copy;
      });
    const insertNotice = (content: string) => update((m) => [...m.slice(0, -1), { role: "notice", content }, m[m.length - 1]]);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, messages: turns }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const event = JSON.parse(line) as { type: string; kind?: string; text: string };
          if (event.type === "text") appendToReply(event.text);
          else if (event.type === "notice") {
            insertNotice(event.text);
            if (event.kind === "wellbeing") onWellbeingConcern(text);
          } else if (event.type === "error") appendToReply(event.text);
        }
      }
    } catch {
      appendToReply("I couldn't connect just now. Try again in a moment.");
    } finally {
      // Drop an empty reply bubble (for example after a safety notice).
      update((m) => (m[m.length - 1].role === "assistant" && !m[m.length - 1].content ? m.slice(0, -1) : m));
      setBusy(false);
    }
  }

  return (
    <div className="card chat" aria-label="Tutor chat">
      <header>
        <Suni size={40} animated={busy} />
        Ask {TUTOR_NAME}, your tutor
      </header>
      <div className="messages" ref={scroller} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content || (busy && i === messages.length - 1 ? "…" : "")}
          </div>
        ))}
      </div>
      <form onSubmit={send}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for help…"
          maxLength={1000}
          aria-label="Message the tutor"
        />
        <button className="btn small" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
