import { after, type NextRequest } from "next/server";
import { paymentRequired } from "@/lib/billing/access";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { databaseUrl } from "@/lib/auth/dburl";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";
import { chatLearner, saveChat, type ChatFlag } from "@/lib/auth/suniChats";
import { checkinState, notesFor, refreshNotes } from "@/lib/auth/suniNotes";
import { getUser, type User } from "@/lib/auth/users";
import { memoryPrompt } from "@/lib/tutor/memory";
import { buildContextPrompt, TutorContextSchema } from "@/lib/tutor/prompt";
import { hasWellbeingConcern, MAX_MESSAGE_LENGTH, personalInfoReminder, redactPersonalInfo, WELLBEING_REPLY } from "@/lib/tutor/safety";
import { checkQuestion, streamTutorReply, SUNI_BUSY_REPLY, SUNI_ERROR_REPLY, tutorConfigured } from "@/lib/tutor/claude";
import { chatTurns } from "@/lib/tutor/turns";

const RequestSchema = z.object({
  context: TutorContextSchema,
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(20000) }))
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

/** Who is chatting: the signed-in account, and the child the chat is kept with. */
type Who = { user: User | null; learnerId: string | null };

async function whoIsChatting(request: NextRequest, claimed: string | undefined): Promise<Who> {
  if (!databaseUrl()) return { user: null, learnerId: null };
  try {
    const user = await signedIn(request);
    return { user, learnerId: await chatLearner(user, claimed) };
  } catch (error) {
    console.error("Couldn't tell who is chatting with Suni", error);
    return { user: null, learnerId: null };
  }
}

/** What Suni remembers about the child, and how they said they feel today. Empty when there's nothing yet. */
async function remembered(learnerId: string | null): Promise<string> {
  if (!learnerId) return "";
  try {
    const [notes, { today }] = await Promise.all([notesFor(learnerId), checkinState(learnerId)]);
    return memoryPrompt({ forSuni: notes.forSuni, today });
  } catch (error) {
    console.error("Couldn't read Suni's notes", error);
    return "";
  }
}

/**
 * Once the chat is saved, and after the reply has gone, Suni reads the latest chats into its notes
 * about the child. Call the returned function when the chat has been saved.
 */
function noteAfterwards(learnerId: string | null): () => void {
  let saved = () => {};
  const done = new Promise<void>((resolve) => (saved = resolve));
  if (learnerId)
    after(async () => {
      const finished = await Promise.race([done.then(() => true), new Promise<false>((r) => setTimeout(() => r(false), 120_000))]);
      if (finished) await refreshNotes(learnerId).catch((error) => console.error("Couldn't update Suni's notes", error));
    });
  return saved;
}

/**
 * Keeps every message a student sends Suni, and Suni's reply, so grown-ups can read them back.
 * Saving never stops the chat: without a database (local demos) or on an error, it's skipped.
 */
async function keep(who: Who, body: z.infer<typeof RequestSchema>, question: string, record: ChatRecord) {
  if (!databaseUrl()) return;
  try {
    await saveChat({
      conversationId: body.conversationId ?? crypto.randomUUID(),
      userId: who.user?.id ?? null,
      learnerId: who.learnerId,
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
  const turns = chatTurns(parsed.data.messages);
  const last = turns.at(-1);
  if (!last || last.role !== "user") return Response.json({ error: "Last message must be from the student" }, { status: 400 });
  if (last.content.length > MAX_MESSAGE_LENGTH) {
    return ndjson([{ type: "text", text: "That's a long message! Can you ask me in a shorter way?" }]);
  }

  const { found, text: question } = redactPersonalInfo(last.content);
  const who = await whoIsChatting(request, parsed.data.learnerId);
  const saved = noteAfterwards(who.learnerId);

  // Safety checks run before anything is sent to the model.
  if (hasWellbeingConcern(last.content)) {
    await keep(who, parsed.data, question, {
      reply: WELLBEING_REPLY,
      flag: "wellbeing",
      flagReason: "Something that suggests they may be unsafe or upset.",
    });
    saved();
    return ndjson([{ type: "notice", kind: "wellbeing", text: WELLBEING_REPLY }]);
  }
  const redacted = turns.map((t) => (t.role === "user" ? { ...t, content: redactPersonalInfo(t.content).text } : t));

  if (!tutorConfigured()) {
    saved();
    return ndjson([
      {
        type: "error",
        text: "I'd love to chat, but my chatting wings aren't switched on yet. Ask a grown-up to turn me on, and I'll be right here.",
      },
    ]);
  }

  // The check for anything a grown-up should see runs alongside the reply.
  const check = checkQuestion(question, context.yearLevel).catch((error) => {
    console.error("Suni's message check failed", error);
    return null;
  });

  const memory = await remembered(who.learnerId);
  const contextPrompt = buildContextPrompt(context) + (memory ? `\n${memory}` : "");

  async function* events(): AsyncGenerator<TutorEvent> {
    let reply = "";
    if (found.length) yield { type: "notice", kind: "privacy", text: personalInfoReminder(found) };
    try {
      for await (const text of streamTutorReply(contextPrompt, redacted)) {
        reply += text;
        yield { type: "text", text };
      }
    } catch (err) {
      console.error(
        "Tutor request failed",
        err instanceof Anthropic.APIError ? `${err.status} ${err.message} (request ${err.requestID ?? "unknown"})` : err,
      );
      const busy =
        err instanceof Anthropic.RateLimitError ||
        err instanceof Anthropic.InternalServerError ||
        err instanceof Anthropic.APIConnectionError;
      const text = (reply ? "\n\n" : "") + (busy ? SUNI_BUSY_REPLY : SUNI_ERROR_REPLY);
      reply += text;
      yield { type: "error", text };
    }
    const verdict = await check;
    await keep(who, parsed.data!, question, {
      reply,
      ...(verdict && !verdict.appropriate
        ? { flag: "inappropriate", flagReason: verdict.reason || verdict.category.replace(/_/g, " ") }
        : found.length
          ? { flag: "personal_info", flagReason: `Shared their ${found.join(" or ")} (hidden from Suni).` }
          : { flag: null, flagReason: null }),
    });
    saved();
  }
  return ndjson(events());
}
