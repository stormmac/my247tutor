"use client";

import { useState } from "react";
import type { TutorContext } from "@/lib/tutor/prompt";

type ChatMessage = { role: "user" | "assistant" | "notice"; content: string };

export type { ChatMessage };

/**
 * The conversation with Suni: sends the chat to /api/tutor and streams the reply in.
 * Safety notices from the server appear as their own messages, and a wellbeing concern
 * is passed to onWellbeingConcern so the parent dashboard can show it.
 */
export function useTutorChat(context: TutorContext | null, greeting: string, onWellbeingConcern: (studentMessage: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: greeting }]);
  const [busy, setBusy] = useState(false);

  // A new topic (or a new learner) starts a fresh conversation.
  const conversationKey = `${context?.studentName ?? ""}|${context?.skillId ?? ""}`;
  const [currentKey, setCurrentKey] = useState(conversationKey);
  if (conversationKey !== currentKey) {
    setCurrentKey(conversationKey);
    setMessages([{ role: "assistant", content: greeting }]);
  }

  async function send(text: string) {
    if (!text || busy || !context) return;
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

  return { messages, busy, send };
}
