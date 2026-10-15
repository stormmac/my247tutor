import type { NextRequest } from "next/server";
import { paymentRequired } from "@/lib/billing/access";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { databaseUrl } from "@/lib/auth/dburl";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";
import { chatLearner, saveChat, type ChatFlag } from "@/lib/auth/suniChats";
import { getUser, type User } from "@/lib/auth/users";
import { buildContextPrompt, TutorContextSchema } from "@/lib/tutor/prompt";
import { hasWellbeingConcern, MAX_MESSAGE_LENGTH, personalInfoReminder, redactPersonalInfo, WELLBEING_REPLY } from "@/lib/tutor/safety";
import { checkQuestion, streamTutorReply, tutorConfigured } from "@/lib/tutor/claude";

const RequestSchema = z.object({
  context: TutorContextSchema,
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) }))
    .min(1)
    .max(40),
  /** One chat with Suni, so its messages can be read back together. */
  conversationId: z.uuid().optional(),
  /** The child's profile id, so the chat is kept with them. */
  learnerId: z.uuid().optional(),
});

/** The signed-in account, if any. Visitors on the free hour have none. */
async function signedIn(request: NextRequest): Promise<User | null> {
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value).catch(() => null);
  const user = session ? await getUser(session.userId).catch(() => null) : null;
  return user && user.isActive && user.sessionVersion === session!.version ? user : null;
}

type ChatRecord = { reply: string; flag: ChatFlag | null; flagReason: string | null };

/**
 * Keeps every message a student sends Suni, and Suni's reply, so grown-ups can read them back.
 * Saving never stops the chat: without a database (local demos) or on an error, it's skipped.
 */
async function keep(request: NextRequest, body: z.infer<typeof RequestSchema>, question: string, record: ChatRecord) {
  if (!databaseUrl()) return;
  try {
    const user = await signedIn(request);
    await saveChat({
      conversationId: body.conversationId ?? crypto.randomUUID(),
      userId: user?.id ?? null,
      learnerId: await chatLearner(user, body.learnerId),
      studentName: body.context.studentName,
      yearLevel: body.context.yearLevel,
      screen: body.context.screen ?? null,
      question,
      ...record,
    });
  } catch (error) {
    console.error("Couldn't save the Suni chat", error);
  }
}

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

export async function POST(request: NextRequest) {
  const unpaid = await paymentRequired(request);
  if (unpaid) return unpaid;
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

  const { found, text: question } = redactPersonalInfo(last.content);

  // Safety checks run before anything is sent to the model.
  if (hasWellbeingConcern(last.content)) {
    await keep(request, parsed.data, question, {
      reply: WELLBEING_REPLY,
      flag: "wellbeing",
      flagReason: "Something that suggests they may be unsafe or upset.",
    });
    return ndjson([{ type: "notice", kind: "wellbeing", text: WELLBEING_REPLY }]);
  }
  const redacted = turns.map((t) => (t.role === "user" ? { ...t, content: redactPersonalInfo(t.content).text } : t));

  if (!tutorConfigured()) {
    return ndjson([{ type: "error", text: "The tutor chat isn't switched on yet. Ask a grown-up to add the API key." }]);
  }

  // The check for anything a grown-up should see runs alongside the reply.
  const check = checkQuestion(question, context.yearLevel).catch((error) => {
    console.error("Suni's message check failed", error);
    return null;
  });

  async function* events(): AsyncGenerator<TutorEvent> {
    let reply = "";
    if (found.length) yield { type: "notice", kind: "privacy", text: personalInfoReminder(found) };
    try {
      for await (const text of streamTutorReply(buildContextPrompt(context), redacted)) {
        reply += text;
        yield { type: "text", text };
      }
    } catch (err) {
      console.error("Tutor request failed", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
      const busy =
        err instanceof Anthropic.RateLimitError ||
        err instanceof Anthropic.InternalServerError ||
        err instanceof Anthropic.APIConnectionError;
      const text = busy ? "I'm a bit busy right now. Try again in a moment." : "Something went wrong. Try asking again.";
      reply += text;
      yield { type: "error", text };
    }
    const verdict = await check;
    await keep(request, parsed.data!, question, {
      reply,
      ...(verdict && !verdict.appropriate
        ? { flag: "inappropriate", flagReason: verdict.reason || verdict.category.replace(/_/g, " ") }
        : found.length
          ? { flag: "personal_info", flagReason: `Shared their ${found.join(" or ")} (hidden from Suni).` }
          : { flag: null, flagReason: null }),
    });
  }
  return ndjson(events());
}
