import "server-only";
import { ready } from "./db";
import { addGrownUpNotes, checkinDue, moodNote, type GrownUpNote, type Mood } from "../tutor/memory";
import { noteLearning } from "../tutor/claude";

/** A child's check-in at the start of a visit. */
export interface Checkin {
  at: string;
  mood: Mood | null;
  focus: string | null;
}

/** What Suni remembers about a child. */
export interface SuniNotes {
  forSuni: string;
  forGrownUps: GrownUpNote[];
}

const toCheckin = (r: Record<string, unknown>): Checkin => ({
  at: new Date(r.created_at as string).toISOString(),
  mood: (r.mood as Mood | null) ?? null,
  focus: (r.focus as string | null) ?? null,
});

export async function learnerName(learnerId: string): Promise<string> {
  const { rows } = await (await ready()).query(`SELECT name FROM learners WHERE id = $1`, [learnerId]);
  return (rows[0]?.name as string) ?? "Your child";
}

export async function notesFor(learnerId: string): Promise<SuniNotes> {
  const { rows } = await (await ready()).query(`SELECT for_suni, for_grown_ups FROM suni_notes WHERE learner_id = $1`, [learnerId]);
  return { forSuni: (rows[0]?.for_suni as string) ?? "", forGrownUps: (rows[0]?.for_grown_ups as GrownUpNote[]) ?? [] };
}

/** Notes for grown-ups about several children at once, by child. */
export async function grownUpNotesFor(learnerIds: string[]): Promise<Map<string, GrownUpNote[]>> {
  if (!learnerIds.length) return new Map();
  const { rows } = await (
    await ready()
  ).query(`SELECT learner_id, for_grown_ups FROM suni_notes WHERE learner_id = ANY($1::uuid[])`, [learnerIds]);
  return new Map(rows.map((r) => [r.learner_id as string, r.for_grown_ups as GrownUpNote[]]));
}

/** A child's check-ins over the last `days`, newest first. */
export async function checkinsFor(learnerId: string, days = 14): Promise<Checkin[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT mood, focus, created_at FROM suni_checkins WHERE learner_id = $1 AND created_at > NOW() - make_interval(days => $2) ORDER BY created_at DESC`,
    [learnerId, days],
  );
  return rows.map(toCheckin);
}

/** Whether Suni should ask how they're feeling now, and today's check-in if there's been one. */
export async function checkinState(learnerId: string): Promise<{ due: boolean; today: Checkin | null }> {
  const { rows } = await (
    await ready()
  ).query(`SELECT mood, focus, created_at FROM suni_checkins WHERE learner_id = $1 ORDER BY created_at DESC LIMIT 1`, [learnerId]);
  const last = rows[0] ? toCheckin(rows[0]) : null;
  const due = checkinDue(last ? Date.parse(last.at) : null);
  return { due, today: due ? null : last };
}

/**
 * Keeps a check-in. A worried or sad child is noted for their grown-ups straight away. Answers later
 * in the same visit (what to work on, after how they feel) fill in that visit's check-in.
 */
export async function saveCheckin(args: {
  learnerId: string;
  userId: string | null;
  name: string;
  mood: Mood | null;
  focus: string | null;
}) {
  const pool = await ready();
  const { due, today } = await checkinState(args.learnerId);
  if (!due && today) {
    await pool.query(
      `UPDATE suni_checkins SET mood = COALESCE($2, mood), focus = COALESCE($3, focus)
       WHERE id = (SELECT id FROM suni_checkins WHERE learner_id = $1 ORDER BY created_at DESC LIMIT 1)`,
      [args.learnerId, args.mood, args.focus?.slice(0, 300) ?? null],
    );
    if (args.mood && !today.mood) await addNotes(args.learnerId, moodNote(args.name, args.mood));
    return;
  }
  await pool.query(`INSERT INTO suni_checkins (learner_id, user_id, mood, focus) VALUES ($1, $2, $3, $4)`, [
    args.learnerId,
    args.userId,
    args.mood,
    args.focus?.slice(0, 300) ?? null,
  ]);
  if (args.mood) await addNotes(args.learnerId, moodNote(args.name, args.mood));
}

async function addNotes(learnerId: string, note: Omit<GrownUpNote, "at"> | null) {
  if (!note) return;
  const pool = await ready();
  const { forGrownUps } = await notesFor(learnerId);
  await pool.query(
    `INSERT INTO suni_notes (learner_id, for_grown_ups) VALUES ($1, $2)
     ON CONFLICT (learner_id) DO UPDATE SET for_grown_ups = $2, updated_at = NOW()`,
    [learnerId, JSON.stringify(addGrownUpNotes(forGrownUps, [note]))],
  );
}

/** Suni reads new chats into the notes once this many have built up, or sooner when one is flagged. */
export const CHATS_PER_NOTE = 4;

/**
 * Reads a child's chats since the last time into Suni's notes, when enough have built up. Runs after
 * a reply has been sent, so it never slows Suni down; any failure leaves the notes as they were.
 */
export async function refreshNotes(learnerId: string): Promise<boolean> {
  const pool = await ready();
  const { rows: noted } = await pool.query(`SELECT for_suni, for_grown_ups, read_up_to FROM suni_notes WHERE learner_id = $1`, [learnerId]);
  const since = (noted[0]?.read_up_to as Date | undefined) ?? new Date(0);
  const { rows: chats } = await pool.query(
    `SELECT screen, question, reply, flag, created_at, student_name, year_level FROM suni_messages
     WHERE learner_id = $1 AND created_at > $2 ORDER BY created_at LIMIT 60`,
    [learnerId, since],
  );
  if (chats.length < CHATS_PER_NOTE && !chats.some((c) => c.flag)) return false;
  const { rows: checkins } = await pool.query(
    `SELECT mood, focus, created_at FROM suni_checkins WHERE learner_id = $1 AND created_at > $2 ORDER BY created_at`,
    [learnerId, since],
  );
  const upTo = chats.at(-1)!.created_at as Date;
  const last = chats.at(-1)!;
  const notes = await noteLearning({
    name: last.student_name as string,
    yearLevel: Number(last.year_level),
    previous: (noted[0]?.for_suni as string) ?? "",
    checkins: checkins.map(toCheckin),
    chats: chats.map((c) => ({
      at: new Date(c.created_at as string).toISOString(),
      screen: (c.screen as string | null) ?? null,
      question: c.question as string,
      reply: c.reply as string,
      flag: (c.flag as string | null) ?? null,
    })),
  });
  if (!notes) return false;
  // Read the grown-ups' notes again, in case a check-in added one while Suni was reading.
  const { forGrownUps } = await notesFor(learnerId);
  await pool.query(
    `INSERT INTO suni_notes (learner_id, for_suni, for_grown_ups, read_up_to) VALUES ($1, $2, $3, $4)
     ON CONFLICT (learner_id) DO UPDATE SET for_suni = $2, for_grown_ups = $3, read_up_to = $4, updated_at = NOW()`,
    [learnerId, notes.forSuni.slice(0, 1500), JSON.stringify(addGrownUpNotes(forGrownUps, notes.forGrownUps.slice(0, 3))), upTo],
  );
  return true;
}
