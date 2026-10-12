import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildContextPrompt, TutorContextSchema } from "@/lib/tutor/prompt";
import { hasWellbeingConcern, MAX_MESSAGE_LENGTH, personalInfoReminder, redactPersonalInfo, WELLBEING_REPLY } from "@/lib/tutor/safety";
import { streamTutorReply, tutorConfigured } from "@/lib/tutor/claude";

const RequestSchema = z.object({
  context: TutorContextSchema,
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) }))
    .min(1)
    .max(40),
});

/** Tutor events are sent as newline-delimited JSON so the client can tell text from safety notices. */
type TutorEvent =
  { type: "text"; text: string } | { type: "notice"; kind: "wellbeing" | "privacy"; text: string } | { type: "error"; text: string };

function ndjson(events: AsyncIterable<TutorEvent> | TutorEvent[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for await (const event of events) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      controller.close();
    },
  });
  return new Response(body, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });

  const { context } = parsed.data;
  // Keep the last 20 turns; the conversation must start with the student.
  let turns = parsed.data.messages.slice(-20);
  while (turns.length && turns[0].role !== "user") turns = turns.slice(1);
  const last = turns.at(-1);
  if (!last || last.role !== "user") return Response.json({ error: "Last message must be from the student" }, { status: 400 });
  if (last.content.length > MAX_MESSAGE_LENGTH) {
    return ndjson([{ type: "text", text: "That's a long message! Can you ask me in a shorter way?" }]);
  }

  // Safety checks run before anything is sent to the model.
  if (hasWellbeingConcern(last.content)) {
    return ndjson([{ type: "notice", kind: "wellbeing", text: WELLBEING_REPLY }]);
  }
  const redacted = turns.map((t) => (t.role === "user" ? { ...t, content: redactPersonalInfo(t.content).text } : t));
  const { found } = redactPersonalInfo(last.content);

  if (!tutorConfigured()) {
    return ndjson([{ type: "error", text: "The tutor chat isn't switched on yet. Ask a grown-up to add the API key." }]);
  }

  async function* events(): AsyncGenerator<TutorEvent> {
    if (found.length) yield { type: "notice", kind: "privacy", text: personalInfoReminder(found) };
    try {
      for await (const text of streamTutorReply(buildContextPrompt(context), redacted)) yield { type: "text", text };
    } catch (err) {
      console.error("Tutor request failed", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
      const busy =
        err instanceof Anthropic.RateLimitError ||
        err instanceof Anthropic.InternalServerError ||
        err instanceof Anthropic.APIConnectionError;
      yield { type: "error", text: busy ? "I'm a bit busy right now. Try again in a moment." : "Something went wrong. Try asking again." };
    }
  }
  return ndjson(events());
}
