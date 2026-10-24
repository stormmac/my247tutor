import "server-only";
import { ready } from "./db";
import { canSeeLearner } from "./family";
import { audit, type User } from "./users";
import { SUNI_BUSY_REPLY, SUNI_ERROR_REPLY } from "../tutor/claude";
import { technicalTalk } from "../tutor/memory";

/** What Suni says, or used to say, to the child when it couldn't answer. */
const SUNI_TROUBLE = [
  SUNI_ERROR_REPLY,
  SUNI_BUSY_REPLY,
  "I'd love to chat, but my chatting wings aren't switched on yet. Ask a grown-up to turn me on, and I'll be right here.",
  "The tutor chat isn't switched on yet. Ask a grown-up to add the API key.",
];

export const CHAT_FLAGS = ["wellbeing", "inappropriate", "personal_info", "grown_up", "technical"] as const;
export type ChatFlag = (typeof CHAT_FLAGS)[number];

/** One message a student sent Suni, with Suni's reply. */
export interface SuniChat {
  id: string;
  conversationId: string;
  learnerId: string | null;
  studentName: string;
  yearLevel: number;
  screen: string | null;
  question: string;
  reply: string;
  flag: ChatFlag | null;
  flagReason: string | null;
  createdAt: string;
  /** For admins: whose account it came from. */
  account?: { name: string; email: string } | null;
}

function toChat(r: Record<string, unknown>): SuniChat {
  return {
    id: r.id as string,
    conversationId: r.conversation_id as string,
    learnerId: (r.learner_id as string | null) ?? null,
    studentName: r.student_name as string,
    yearLevel: r.year_level as number,
    screen: (r.screen as string | null) ?? null,
    question: r.question as string,
    reply: r.reply as string,
    flag: (r.flag as ChatFlag | null) ?? null,
    flagReason: (r.flag_reason as string | null) ?? null,
    createdAt: new Date(r.created_at as string).toISOString(),
    ...("account_email" in r
      ? { account: r.account_email ? { name: r.account_name as string, email: r.account_email as string } : null }
      : {}),
  };
}

/** Whether this person may read a child's chats: a grown-up who can see the child's work (see family.ts), not the child. */
export async function canSeeChats(viewer: User, learnerId: string): Promise<boolean> {
  return viewer.role !== "student" && canSeeLearner(viewer, learnerId);
}

/**
 * The child a chat belongs to: a child's own sign-in is always theirs; anyone else's claim is
 * believed only for a child they can see. Null for visitors on the free hour.
 */
export async function chatLearner(user: User | null, claimed: string | undefined): Promise<string | null> {
  if (!user) return null;
  if (user.role === "student") return user.learnerId;
  if (!claimed || user.role === "admin") return null;
  return (await canSeeChats(user, claimed)) ? claimed : null;
}

export async function saveChat(chat: {
  conversationId: string;
  userId: string | null;
  learnerId: string | null;
  studentName: string;
  yearLevel: number;
  screen: string | null;
  question: string;
  reply: string;
  flag: ChatFlag | null;
  flagReason: string | null;
}): Promise<void> {
  await (
    await ready()
  ).query(
    `INSERT INTO suni_messages (conversation_id, user_id, learner_id, student_name, year_level, screen, question, reply, flag, flag_reason)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      chat.conversationId,
      chat.userId,
      chat.learnerId,
      chat.studentName.slice(0, 60),
      chat.yearLevel,
      chat.screen?.slice(0, 1500) ?? null,
      chat.question,
      chat.reply,
      chat.flag,
      chat.flagReason?.slice(0, 300) ?? null,
    ],
  );
}

/**
 * A chat as a parent, centre or teacher sees it. Technical problems are for admins only: the flag is
 * hidden, and a chat Suni couldn't answer at all is left out.
 */
export function forGrownUps(chat: SuniChat): SuniChat | null {
  // Older chats kept Suni's "my wings got in a tangle" messages as the reply.
  const reply = SUNI_TROUBLE.reduce((r, line) => r.replace(line, ""), chat.reply).trim();
  const technical = chat.flag === "technical" || (chat.flagReason !== null && technicalTalk(chat.flagReason));
  if (!reply && (technical || reply !== chat.reply.trim())) return null;
  if (!technical && reply === chat.reply.trim()) return chat;
  return { ...chat, reply, ...(technical ? { flag: null, flagReason: null } : {}) };
}

/** A child's chats, newest first. Admins see technical problems too. */
export async function chatsFor(learnerId: string, viewer: User, limit = 200): Promise<SuniChat[]> {
  const { rows } = await (
    await ready()
  ).query(`SELECT * FROM suni_messages WHERE learner_id = $1 ORDER BY created_at DESC LIMIT $2`, [learnerId, limit]);
  const chats = rows.map(toChat);
  return viewer.role === "admin" ? chats : chats.flatMap((c) => forGrownUps(c) ?? []);
}

/** Every chat, newest first, for admins: all of them, or only flagged ones. */
export async function recentChats({ flaggedOnly, limit = 200 }: { flaggedOnly: boolean; limit?: number }): Promise<SuniChat[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT m.*, u.display_name AS account_name, u.email AS account_email
     FROM suni_messages m LEFT JOIN users u ON u.id = m.user_id
     WHERE ($1::boolean IS FALSE OR m.flag IS NOT NULL)
     ORDER BY m.created_at DESC LIMIT $2`,
    [flaggedOnly, limit],
  );
  return rows.map(toChat);
}

/** A grown-up flags a message for a closer look, or clears a flag. False when it isn't theirs to change. */
export async function setChatFlag(viewer: User, id: string, flagged: boolean): Promise<SuniChat | null> {
  const pool = await ready();
  const { rows } = await pool.query(`SELECT learner_id FROM suni_messages WHERE id = $1`, [id]);
  if (!rows[0]) return null;
  const learnerId = rows[0].learner_id as string | null;
  if (viewer.role !== "admin" && !(learnerId && (await canSeeChats(viewer, learnerId)))) return null;
  const updated = await pool.query(
    flagged
      ? `UPDATE suni_messages SET flag = CASE WHEN flag IS NULL OR flag = 'technical' THEN 'grown_up' ELSE flag END,
           flag_reason = CASE WHEN flag IS NULL OR flag = 'technical' THEN $2 ELSE flag_reason END, flagged_by = COALESCE(flagged_by, $3)
         WHERE id = $1 RETURNING *`
      : `UPDATE suni_messages SET flag = NULL, flag_reason = NULL, flagged_by = NULL WHERE id = $1 RETURNING *`,
    flagged ? [id, `Flagged by ${viewer.name}`, viewer.id] : [id],
  );
  await audit(viewer.id, flagged ? "flag_suni_chat" : "clear_suni_flag", id, {});
  const chat = toChat(updated.rows[0]);
  return viewer.role === "admin" ? chat : forGrownUps(chat);
}
