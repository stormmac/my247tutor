import "server-only";
import type { LearnerProfile } from "@/lib/learner/model";
import { studentForViewer } from "./centres";
import { ready } from "./db";
import { sendInvite, type InviteResult } from "./invites";
import { CHILD_CURRICULUM, CHILD_PLAN } from "./learners";
import { addUser, audit, type User } from "./users";

/**
 * Who can see and set work for a child, parents of a centre's students, and work set for a child.
 *
 * - An independent parent owns their children: they see their work and set work for them.
 * - A centre owns its students. It can link a parent to a student, who then sees that child's
 *   work without paying, because the centre is the customer.
 * - A teacher sees, and sets work for, the students in their classes.
 */

/** A parent linked to a centre student. */
export interface LinkedParent {
  id: string;
  name: string;
  email: string;
  lastLoginAt: string | null;
}

/** A centre student, as their linked parent sees them. */
export interface CentreChild {
  id: string;
  name: string;
  yearLevel: number;
  centreName: string;
  profile: LearnerProfile;
}

/** Work set for a child: ten questions on one subtopic, added to their weekly lesson. */
export interface SetWork {
  id: string;
  subject: "maths" | "english";
  subtopicId: string;
  note: string | null;
  /** Who set it. Null when their account has gone. */
  setBy: string | null;
  createdAt: string;
  doneAt: string | null;
  right: number | null;
  total: number | null;
  /** A topic the child is doing at school now, added by a parent so they practise it here too. */
  atSchool: boolean;
  /** Whether the person asking added it. */
  mine?: boolean;
  /** Planned for one weekly session of a class (the lesson planner): the class and the session's Monday. */
  classId: string | null;
  week: string | null;
  /** To do at home after the session. */
  homework: boolean;
  /** "topic": ten questions on a subtopic. "mistakes": the session's questions not right first go, to redo. */
  kind: "topic" | "mistakes";
}

const iso = (value: unknown) => (value ? new Date(value as string).toISOString() : null);

/** Whether the learner is this account's own: a parent's child or a centre's student. */
async function owns(ownerId: string, learnerId: string): Promise<boolean> {
  const { rows } = await (await ready()).query(`SELECT 1 FROM learners WHERE id = $1 AND parent_id = $2`, [learnerId, ownerId]);
  return rows.length > 0;
}

async function linked(parentId: string, learnerId: string): Promise<boolean> {
  const { rows } = await (
    await ready()
  ).query(`SELECT 1 FROM learner_parents WHERE learner_id = $1 AND parent_id = $2`, [learnerId, parentId]);
  return rows.length > 0;
}

/** Each of the centre's students' linked parents, by student. */
export async function parentsByStudent(centreId: string): Promise<Map<string, LinkedParent[]>> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT lp.learner_id, u.id, u.display_name, u.email, u.last_login_at FROM learner_parents lp
     JOIN learners l ON l.id = lp.learner_id JOIN users u ON u.id = lp.parent_id
     WHERE l.parent_id = $1 ORDER BY u.display_name`,
    [centreId],
  );
  const by = new Map<string, LinkedParent[]>();
  for (const r of rows) {
    const list = by.get(r.learner_id as string) ?? [];
    list.push({ id: r.id as string, name: r.display_name as string, email: r.email as string, lastLoginAt: iso(r.last_login_at) });
    by.set(r.learner_id as string, list);
  }
  return by;
}

export type ParentInvite =
  { email: string; existing: true } | ({ email: string; existing: false } & InviteResult) | { error: string; status: number };

/**
 * A centre links a parent to one of its students. A parent who already has an account is linked
 * to it; otherwise a parent account is made and emailed a link to set its password.
 */
export async function inviteParent(
  centre: User,
  learnerId: string,
  details: { name: string; email: string },
  origin: string,
): Promise<ParentInvite> {
  if (!(await owns(centre.id, learnerId))) return { error: "No such student.", status: 404 };
  const pool = await ready();
  const { rows } = await pool.query(`SELECT id, role FROM users WHERE email = $1`, [details.email]);
  let parentId = rows[0]?.id as string | undefined;
  let invite: InviteResult | null = null;
  if (rows[0] && rows[0].role !== "parent")
    return { error: "That email belongs to a centre, teacher or admin account. Use the parent's own email.", status: 409 };
  if (!parentId) {
    const added = await addUser(centre, { name: details.name, email: details.email, role: "parent", freeAccess: false });
    if ("error" in added) return { error: added.error, status: 409 };
    parentId = added.user.id;
    invite = await sendInvite(added.user, origin, centre.name);
  }
  await pool.query(`INSERT INTO learner_parents (learner_id, parent_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [learnerId, parentId]);
  await audit(centre.id, "link_parent", parentId, { learnerId, newAccount: Boolean(invite) });
  return invite ? { email: details.email, existing: false, ...invite } : { email: details.email, existing: true };
}

/** A centre stops a parent seeing one of its students. The parent's account stays. */
export async function unlinkParent(centre: User, learnerId: string, parentId: string): Promise<boolean> {
  if (!(await owns(centre.id, learnerId))) return false;
  const { rowCount } = await (
    await ready()
  ).query(`DELETE FROM learner_parents WHERE learner_id = $1 AND parent_id = $2`, [learnerId, parentId]);
  if (rowCount) await audit(centre.id, "unlink_parent", parentId, { learnerId });
  return Boolean(rowCount);
}

/** The centre students a parent is linked to, with their progress. */
export async function centreChildren(parentId: string): Promise<CentreChild[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.name, l.year_level, l.profile, c.display_name AS centre_name, ${CHILD_CURRICULUM} AS curriculum, ${CHILD_PLAN} AS plan
     FROM learner_parents lp JOIN learners l ON l.id = lp.learner_id JOIN users c ON c.id = l.parent_id
     WHERE lp.parent_id = $1 ORDER BY l.name`,
    [parentId],
  );
  return rows.map((r) => ({
    id: r.id as string,
    name: r.name as string,
    yearLevel: Number(r.year_level),
    centreName: r.centre_name as string,
    profile: {
      ...(r.profile as LearnerProfile),
      id: r.id as string,
      curriculum: r.curriculum as LearnerProfile["curriculum"],
      plan: r.plan as LearnerProfile["plan"],
    },
  }));
}

/** Whether this person may see a child's work: an admin, the child, their parent or centre, a linked parent, or their teacher. */
export async function canSeeLearner(viewer: User, learnerId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  if (viewer.role === "student") return viewer.learnerId === learnerId;
  if ((viewer.role === "parent" || viewer.role === "centre") && (await owns(viewer.id, learnerId))) return true;
  if (viewer.role === "parent") return linked(viewer.id, learnerId);
  if (viewer.role === "teacher" || viewer.role === "centre") return (await studentForViewer(viewer, learnerId).catch(() => null)) !== null;
  return false;
}

/**
 * Whether this person may set work for a child: an admin, the parent or centre who owns them, or a
 * teacher who has them in a class. A parent linked through a centre sees the work the centre sets.
 */
export async function canSetWork(viewer: User, learnerId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  if ((viewer.role === "parent" || viewer.role === "centre") && (await owns(viewer.id, learnerId))) return true;
  if (viewer.role === "teacher") return (await studentForViewer(viewer, learnerId).catch(() => null)) !== null;
  return false;
}

/**
 * Whether this person may add topics the child is doing at school: anyone who can set work, and
 * also a parent linked through a centre, since it's their child's schoolwork.
 */
export async function canAddSchoolWork(viewer: User, learnerId: string): Promise<boolean> {
  if (await canSetWork(viewer, learnerId)) return true;
  return viewer.role === "parent" && linked(viewer.id, learnerId);
}

/** Work set for a child, newest first. `viewerId` marks the pieces that person added. */
export async function listSetWork(learnerId: string, limit = 30, viewerId?: string): Promise<SetWork[]> {
  const { rows } = await (
    await ready()
  ).query(`${SET_WORK_SELECT} WHERE w.learner_id = $1 ORDER BY w.created_at DESC LIMIT $2`, [learnerId, limit]);
  return rows.map((r) => setWorkOf(r, viewerId));
}

export const SET_WORK_SELECT = `SELECT w.*, to_char(w.week, 'YYYY-MM-DD') AS week_text, u.display_name AS set_by_name
  FROM set_work w LEFT JOIN users u ON u.id = w.set_by`;

export function setWorkOf(r: Record<string, unknown>, viewerId?: string): SetWork {
  return {
    id: r.id as string,
    subject: r.subject as SetWork["subject"],
    subtopicId: r.subtopic_id as string,
    note: (r.note as string | null) ?? null,
    setBy: (r.set_by_name as string | null) ?? null,
    createdAt: iso(r.created_at)!,
    doneAt: iso(r.done_at),
    right: r.right_count === null ? null : Number(r.right_count),
    total: r.total === null ? null : Number(r.total),
    atSchool: Boolean(r.at_school),
    ...(viewerId ? { mine: r.set_by === viewerId } : {}),
    classId: (r.class_id as string | null) ?? null,
    week: (r.week_text as string | null) ?? null,
    homework: Boolean(r.homework),
    kind: r.kind === "mistakes" ? "mistakes" : "topic",
  };
}

/** How many unfinished pieces of set work a child can have at once. */
export const MAX_OPEN_WORK = 20;

export async function addSetWork(
  viewer: User,
  learnerId: string,
  items: { subject: SetWork["subject"]; subtopicId: string }[],
  note: string | null,
  atSchool = false,
): Promise<{ added: number } | { error: string }> {
  const pool = await ready();
  const { rows } = await pool.query(`SELECT COUNT(*) AS n FROM set_work WHERE learner_id = $1 AND done_at IS NULL`, [learnerId]);
  if (Number(rows[0].n) + items.length > MAX_OPEN_WORK) return { error: tooMuchWork() };
  for (const item of items)
    await pool.query(`INSERT INTO set_work (learner_id, set_by, subject, subtopic_id, note, at_school) VALUES ($1, $2, $3, $4, $5, $6)`, [
      learnerId,
      viewer.id,
      item.subject,
      item.subtopicId,
      note,
      atSchool,
    ]);
  await audit(viewer.id, "set_work", learnerId, { count: items.length, atSchool });
  return { added: items.length };
}

const tooMuchWork = (name = "A child") =>
  `${name} can have up to ${MAX_OPEN_WORK} pieces of work still to do. Wait for some to be finished first.`;

/** Records how the child went on a piece of set work. Only the first finish counts. */
export async function finishSetWork(learnerId: string, id: string, right: number, total: number): Promise<boolean> {
  const { rowCount } = await (
    await ready()
  ).query(`UPDATE set_work SET done_at = NOW(), right_count = $3, total = $4 WHERE id = $1 AND learner_id = $2 AND done_at IS NULL`, [
    id,
    learnerId,
    right,
    total,
  ]);
  return Boolean(rowCount);
}

/** Takes back a piece of work that hasn't been done yet. With `onlyBy`, only a school topic that person added. */
export async function removeSetWork(learnerId: string, id: string, onlyBy?: string): Promise<boolean> {
  const { rowCount } = await (
    await ready()
  ).query(
    `DELETE FROM set_work WHERE id = $1 AND learner_id = $2 AND done_at IS NULL
       AND ($3::uuid IS NULL OR (set_by = $3 AND at_school))`,
    [id, learnerId, onlyBy ?? null],
  );
  return Boolean(rowCount);
}
