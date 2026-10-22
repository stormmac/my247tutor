import type { ChatTurn } from "./claude";

/** Longest earlier reply passed back to Suni; the start is enough to follow the conversation. */
export const MAX_TURN_LENGTH = 4000;

/**
 * The chat as the model needs it: the last 20 turns, starting with the student, with
 * back-to-back turns from the same side joined (a reply that failed leaves two student
 * messages in a row, which the API rejects).
 */
export function chatTurns(messages: ChatTurn[]): ChatTurn[] {
  const turns: ChatTurn[] = [];
  for (const { role, content } of messages.slice(-20)) {
    const text = content.trim().slice(0, MAX_TURN_LENGTH);
    if (!text || (!turns.length && role !== "user")) continue;
    const last = turns.at(-1);
    if (last?.role === role) last.content += `\n\n${text}`;
    else turns.push({ role, content: text });
  }
  return turns;
}
