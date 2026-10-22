"use client";

import { useState } from "react";
import type { TutorContext } from "@/lib/tutor/prompt";

/** A quiet message goes to Suni but isn't shown in the chat, such as the whiteboard asking for a look. */
type ChatMessage = { role: "user" | "assistant" | "notice"; content: string; quiet?: boolean };

export type { ChatMessage };

/**
 * The conversation with Suni: sends the chat to /api/tutor and streams the reply in.
 * Safety notices from the server appear as their own messages, and a wellbeing concern
 * is passed to onWellbeingConcern so the parent dashboard can show it.
 */
export function useTutorChat(
  context: TutorContext | null,
  greeting: string,
  onWellbeingConcern: (studentMessage: string) => void,
  /** The child's profile id, so the chat is kept with them for their grown-ups. */
  learnerId?: string,
) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: greeting }]);
  // Each conversation is kept as one, so grown-ups can read it back in order.
  const [conversationId, setConversationId] = useState(newConversationId);
  const [busy, setBusy] = useState(false);

  // A new topic (or a new learner) starts a fresh conversation.
  const conversationKey = `${context?.studentName ?? ""}|${context?.skillId ?? ""}`;
  const [currentKey, setCurrentKey] = useState(conversationKey);
  if (conversationKey !== currentKey) {
    setCurrentKey(conversationKey);
    setMessages([{ role: "assistant", content: greeting }]);
    setConversationId(newConversationId());
  }

  /** Sends a message, with a picture of the whiteboard when the student has drawn on it. */
  async function send(text: string, boardImage?: string, quiet = false) {
    if (!text || busy || !context) return;
    setBusy(true);

    const history: ChatMessage[] = [...messages, { role: "user", content: text, ...(quiet ? { quiet } : {}) }];
    setMessages([...history, { role: "assistant", content: "" }]);
    // Only real chat turns go to the server; the greeting and safety notices stay on screen only.
    const turns = history
      .slice(1)
      .filter((m) => m.role !== "notice" && m.content)
      .map(({ role, content }) => ({ role, content })) as { role: "user" | "assistant"; content: string }[];

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
        body: JSON.stringify({
          context,
          messages: turns,
          conversationId,
          ...(learnerId ? { learnerId } : {}),
          ...(boardImage ? { boardImage } : {}),
        }),
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
      appendToReply("Oh dear, I couldn't hear you just then. I'm still here! Could you try sending that again?");
    } finally {
      // Drop an empty reply bubble (for example after a safety notice).
      update((m) => (m[m.length - 1].role === "assistant" && !m[m.length - 1].content ? m.slice(0, -1) : m));
      setBusy(false);
    }
  }

  return { messages, busy, send };
}

function newConversationId(): string {
  return globalThis.crypto.randomUUID();
}
