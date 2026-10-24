import "server-only";
import type { LearnerProfile } from "@/lib/learner/model";
import { autoActivities, autoSlots, classSubjects, type AutoActivity } from "@/lib/learner/autoActivities";
import { addWeeks } from "@/lib/learner/lesson";
import { doesSubject } from "@/lib/learner/plan";
import { centreOf, listClasses, studentForViewer, type CentreClass } from "./centres";
import { ready } from "./db";
import { MAX_OPEN_WORK, SET_WORK_SELECT, setWorkOf, type SetWork } from "./family";
import { CHILD_CURRICULUM } from "./learners";
import { homeworkSlot, MAX_SESSION_ACTIVITIES, MAX_SESSION_HOMEWORK } from "./rules";
import { audit, type User } from "./users";

/**
 * The teacher's lesson planner. Each class meets once a week; for each session the teacher plans up
 * to eight activities per student (ten questions on a subtopic each), and up to three pieces of
 * homework after them: an activity, or a redo of the questions the student didn't get right first go
 * in the session.
 * Planned work is set work with the class and the session's Monday on it, so it joins the
 * student's weekly lesson like any other.
 */

export interface PlannerStudent {
  id: string;
  name: string;
  yearLevel: number;
  curriculum: LearnerProfile["curriculum"];
  /** The activities the student gets each week without anyone setting them, in the first boxes. */
  auto: AutoActivity[];
  /** Planned for this class's session this week, box by box. */
  planned: SetWork[];
}

export interface PlannerClass {
  class: CentreClass;
  students: PlannerStudent[];
}

/** The viewer's classes for a week (a teacher's own, or all of a centre's), each with its students and their work. */
export async function plannerWeek(viewer: User, week: string): Promise<PlannerClass[] | null> {
  const where = centreOf(viewer);
  if (!where) return null;
  const classes = await listClasses(where.centreId, where.teacherId);
  if (!classes.length) return [];
  const pool = await ready();
  const ids = classes.map((c) => c.id);
  const { rows: enrolled } = await pool.query(
    `SELECT e.class_id, l.id, l.name, l.year_level, l.profile, ${CHILD_CURRICULUM} AS curriculum
     FROM class_enrolments e JOIN learners l ON l.id = e.learner_id
     WHERE e.class_id = ANY($1::uuid[]) ORDER BY l.name`,
    [ids],
  );
  const learnerIds = [...new Set(enrolled.map((r) => r.id as string))];
  const { rows: work } = learnerIds.length
    ? await pool.query(
        `${SET_WORK_SELECT} WHERE w.learner_id = ANY($1::uuid[])
           AND w.class_id = ANY($2::uuid[]) AND w.week = $3::date
         ORDER BY w.slot NULLS LAST, w.created_at`,
        [learnerIds, ids, week],
      )
    : { rows: [] };
  return classes.map((c) => ({
    class: c,
    students: enrolled
      .filter((r) => r.class_id === c.id)
      .map((r) => {
        const mine = work.filter((w) => w.learner_id === r.id);
        return {
          id: r.id as string,
          name: r.name as string,
          yearLevel: Number(r.year_level),
          curriculum: r.curriculum as LearnerProfile["curriculum"],
          auto: classSubjects(c.subject).flatMap((subject) =>
            autoActivities(
              { ...(r.profile as LearnerProfile), yearLevel: Number(r.year_level) as LearnerProfile["yearLevel"] },
              subject,
              week,
            ),
          ),
          planned: mine.filter((w) => w.class_id === c.id).map((w) => setWorkOf(w)),
        };
      }),
  }));
}

/** The class, when it's one of the viewer's, and which of these learners are in it. */
async function viewerClass(viewer: User, classId: string, learnerIds: string[]) {
  const where = centreOf(viewer);
  if (!where) return null;
  const found = (await listClasses(where.centreId, where.teacherId)).find((c) => c.id === classId);
  if (!found) return null;
  const { rows } = await (
    await ready()
  ).query(`SELECT learner_id FROM class_enrolments WHERE class_id = $1 AND learner_id = ANY($2::uuid[])`, [classId, learnerIds]);
  return rows.length === new Set(learnerIds).size ? found : null;
}

const subjectOk = (c: CentreClass, subject: SetWork["subject"]) => c.subject === "both" || c.subject === subject;

export type PlanResult = { added: number; changed?: number; skipped?: number } | { error: string; status: number };

type Box = { classId: string; week: string; learnerIds: string[]; slot: number };

/** Each student's work in one of the session's boxes, if any, and how much work they have still to do. */
async function boxes(box: Box) {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.name, w.id AS work_id, w.done_at IS NOT NULL AS done,
       (SELECT COUNT(*) FROM set_work o WHERE o.learner_id = l.id AND o.done_at IS NULL) AS open
     FROM learners l
     LEFT JOIN LATERAL (
       SELECT id, done_at FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $2 AND w.week = $3::date AND w.slot = $4
       ORDER BY w.created_at LIMIT 1
     ) w ON TRUE
     WHERE l.id = ANY($1::uuid[])`,
    [box.learnerIds, box.classId, box.week, box.slot],
  );
  return rows as { id: string; name: string; work_id: string | null; done: boolean | null; open: string }[];
}

/** The first student a new piece of work would take over the most they can have to do, as an error. */
function tooBusy(rows: Awaited<ReturnType<typeof boxes>>): PlanResult | null {
  const busy = rows.find((r) => !r.work_id && Number(r.open) + 1 > MAX_OPEN_WORK);
  return busy
    ? {
        error: `${busy.name} can have up to ${MAX_OPEN_WORK} pieces of work still to do. Wait for some to be finished first.`,
        status: 400,
      }
    : null;
}

/** The class, when it's the viewer's and has these students, and the box isn't one the weekly lessons fill. */
async function plannableBox(viewer: User, box: Box): Promise<CentreClass | { error: string; status: number }> {
  const found = await viewerClass(viewer, box.classId, box.learnerIds);
  if (!found) return { error: "No such class or student.", status: 404 };
  if (box.slot <= autoSlots(found.subject))
    return { error: "The first boxes are the student's weekly lessons, which are added by themselves.", status: 400 };
  return found;
}

/**
 * Puts an activity in one of the session's boxes for each of these students: a new one in an empty
 * box, or a change to one not done yet. A box whose work is done stays as it is. Boxes after the
 * eighth are homework.
 */
export async function planSlot(
  viewer: User,
  plan: Box & { subject: SetWork["subject"]; subtopicId: string; note: string | null },
): Promise<PlanResult> {
  const found = await plannableBox(viewer, plan);
  if ("error" in found) return found;
  if (!subjectOk(found, plan.subject)) return { error: "That subject isn't taught in this class.", status: 400 };
  const rows = await boxes(plan);
  const busy = tooBusy(rows);
  if (busy) return busy;
  const pool = await ready();
  const homework = homeworkSlot(plan.slot);
  let added = 0,
    changed = 0,
    skipped = 0;
  for (const r of rows) {
    if (r.done) skipped++;
    else if (r.work_id) {
      await pool.query(
        `UPDATE set_work SET kind = 'topic', subject = $2, subtopic_id = $3, homework = $4, note = $5, set_by = $6
         WHERE id = $1 AND done_at IS NULL`,
        [r.work_id, plan.subject, plan.subtopicId, homework, plan.note, viewer.id],
      );
      changed++;
    } else {
      await pool.query(
        `INSERT INTO set_work (learner_id, set_by, subject, subtopic_id, note, class_id, week, homework, slot)
         VALUES ($1, $2, $3, $4, $5, $6, $7::date, $8, $9)`,
        [r.id, viewer.id, plan.subject, plan.subtopicId, plan.note, plan.classId, plan.week, homework, plan.slot],
      );
      added++;
    }
  }
  await audit(viewer.id, "plan_activity", plan.classId, { week: plan.week, slot: plan.slot, added, changed, skipped });
  return { added, changed, skipped };
}

/**
 * Homework in one of the homework boxes that redoes the questions each student didn't get right
 * first go in the session's activities in a subject. One per student, subject and session; students
 * without an activity in that subject this session, or already redoing it, are skipped.
 */
export async function planMistakesHomework(
  viewer: User,
  plan: Box & { subject: SetWork["subject"]; note: string | null },
): Promise<PlanResult> {
  const found = await plannableBox(viewer, plan);
  if ("error" in found) return found;
  if (!subjectOk(found, plan.subject)) return { error: "That subject isn't taught in this class.", status: 400 };
  const pool = await ready();
  const { rows: can } = await pool.query(
    `SELECT l.id FROM learners l
     WHERE l.id = ANY($1::uuid[])
       AND EXISTS (SELECT 1 FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $2 AND w.week = $3::date AND w.subject = $4::varchar AND w.kind = 'topic' AND NOT w.homework)
       AND NOT EXISTS (SELECT 1 FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $2 AND w.week = $3::date AND w.subject = $4::varchar AND w.kind = 'mistakes' AND w.slot IS DISTINCT FROM $5::smallint)`,
    [plan.learnerIds, plan.classId, plan.week, plan.subject, plan.slot],
  );
  const ids = new Set(can.map((r) => r.id as string));
  const rows = (await boxes(plan)).filter((r) => ids.has(r.id) && !r.done);
  if (!rows.length)
    return {
      error: "Add a class activity in this subject first, so there are questions to redo. Each student redoes a subject once a week.",
      status: 400,
    };
  const busy = tooBusy(rows);
  if (busy) return busy;
  for (const r of rows) {
    if (r.work_id) await pool.query(`DELETE FROM set_work WHERE id = $1 AND done_at IS NULL`, [r.work_id]);
    await pool.query(
      `INSERT INTO set_work (learner_id, set_by, subject, subtopic_id, note, class_id, week, homework, kind, slot)
       VALUES ($1, $2, $3, '', $4, $5, $6::date, TRUE, 'mistakes', $7)`,
      [r.id, viewer.id, plan.subject, plan.note, plan.classId, plan.week, plan.slot],
    );
  }
  await audit(viewer.id, "plan_mistakes_homework", plan.classId, { week: plan.week, slot: plan.slot, students: rows.length });
  return { added: rows.length };
}

export type MoveResult = { moved: number; done: number; full: number } | { error: string; status: number };

/**
 * Moves the activity in one of the session's boxes to homework, for each of these students who
 * hasn't finished it: into the homework box given, or their first empty one. What they've answered
 * so far comes too. Students who've finished it, or whose homework box is taken, are left as they are.
 */
export async function moveToHomework(viewer: User, move: Box & { to?: number }): Promise<MoveResult> {
  const found = await plannableBox(viewer, move);
  if ("error" in found) return found;
  const pool = await ready();
  const { rows } = await pool.query(
    `SELECT w.id, w.learner_id, w.slot, w.done_at IS NOT NULL AS done FROM set_work w
     WHERE w.learner_id = ANY($1::uuid[]) AND w.class_id = $2 AND w.week = $3::date AND (w.slot = $4 OR w.slot > $5)`,
    [move.learnerIds, move.classId, move.week, move.slot, MAX_SESSION_ACTIVITIES],
  );
  const homeworkBoxes = Array.from({ length: MAX_SESSION_HOMEWORK }, (_, i) => MAX_SESSION_ACTIVITIES + i + 1);
  let moved = 0,
    done = 0,
    full = 0;
  for (const learnerId of new Set(move.learnerIds)) {
    const mine = rows.filter((r) => r.learner_id === learnerId);
    const work = mine.find((r) => r.slot === move.slot);
    if (!work) continue;
    if (work.done) {
      done++;
      continue;
    }
    const taken = new Set(mine.map((r) => r.slot as number));
    const to = move.to ?? homeworkBoxes.find((slot) => !taken.has(slot));
    if (!to || taken.has(to)) {
      full++;
      continue;
    }
    await pool.query(`UPDATE set_work SET slot = $2, homework = TRUE WHERE id = $1 AND done_at IS NULL`, [work.id, to]);
    moved++;
  }
  if (!moved)
    return {
      error: done
        ? "They've finished it already, so it stays in class."
        : full
          ? `There's no room: ${move.to ? "that homework box is" : "all three homework boxes are"} taken. Delete one first.`
          : "There's nothing in that box to move.",
      status: 400,
    };
  await audit(viewer.id, "move_to_homework", move.classId, { week: move.week, slot: move.slot, to: move.to ?? null, moved, done, full });
  return { moved, done, full };
}

/** Empties one of the session's boxes for each of these students, done or not: its score goes with it. */
export async function unplanSlot(viewer: User, box: Box): Promise<{ removed: number } | { error: string; status: number }> {
  const found = await plannableBox(viewer, box);
  if ("error" in found) return found;
  const { rowCount } = await (
    await ready()
  ).query(`DELETE FROM set_work WHERE learner_id = ANY($1::uuid[]) AND class_id = $2 AND week = $3::date AND slot = $4`, [
    box.learnerIds,
    box.classId,
    box.week,
    box.slot,
  ]);
  await audit(viewer.id, "unplan_activity", box.classId, { week: box.week, slot: box.slot, removed: rowCount ?? 0 });
  return { removed: rowCount ?? 0 };
}

/** How many weeks the student pop-up looks back over, this one included. */
export const HISTORY_WEEKS = 4;

/**
 * A student's work for the last four weeks up to `week`, newest week first, for the planner's
 * pop-up: each session's activities and homework, and other work set in that week, with scores.
 */
export async function studentHistory(
  viewer: User,
  learnerId: string,
  week: string,
): Promise<{ week: string; auto: AutoActivity[]; work: SetWork[] }[] | null> {
  const profile = await studentForViewer(viewer, learnerId).catch(() => null);
  if (!profile) return null;
  // The weekly lessons keep only this week's answers, so earlier weeks show just the set work.
  const auto = (w: string) =>
    (["maths", "english"] as const)
      .filter((s) => doesSubject(profile.plan, s))
      .flatMap((s) => autoActivities(profile, s, w))
      .filter((a) => a.done);
  const { rows } = await (
    await ready()
  ).query(
    // Work with no session (set from a report) counts in the week it was set.
    `SELECT w.*, to_char(w.week, 'YYYY-MM-DD') AS week_text, u.display_name AS set_by_name,
       to_char(COALESCE(w.week, date_trunc('week', w.created_at)::date), 'YYYY-MM-DD') AS at
     FROM set_work w LEFT JOIN users u ON u.id = w.set_by
     WHERE w.learner_id = $1 AND COALESCE(w.week, date_trunc('week', w.created_at)::date) BETWEEN $2::date - $3::int AND $2::date
     ORDER BY w.slot NULLS LAST, w.created_at`,
    [learnerId, week, (HISTORY_WEEKS - 1) * 7],
  );
  const work = rows.map((r) => ({ ...setWorkOf(r), at: r.at as string }));
  return Array.from({ length: HISTORY_WEEKS }, (_, i) => {
    const w = addWeeks(week, -i);
    return { week: w, auto: auto(w), work: work.filter((x) => x.at === w).map(({ at: _at, ...x }) => x) };
  });
}
