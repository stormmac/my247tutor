import "server-only";
import type { LearnerProfile } from "@/lib/learner/model";
import { centreOf, listClasses, type CentreClass } from "./centres";
import { ready } from "./db";
import { MAX_OPEN_WORK, SET_WORK_SELECT, setWorkOf, type SetWork } from "./family";
import { CHILD_CURRICULUM } from "./learners";
import { MAX_SESSION_ACTIVITIES } from "./rules";
import { audit, type User } from "./users";

/**
 * The teacher's lesson planner. Each class meets once a week; for each session the teacher plans up
 * to eight activities per student (ten questions on a subtopic each), and homework: one of the
 * activities, or a redo of the questions the student didn't get right first go in the session.
 * Planned work is set work with the class and the session's Monday on it, so it joins the
 * student's weekly lesson like any other.
 */

/** One part of a student's own weekly lesson, so the teacher sees what else they're doing. */
export interface OwnPart {
  subject: "maths" | "english";
  title: string;
  done: number;
  total: number;
}

export interface PlannerStudent {
  id: string;
  name: string;
  yearLevel: number;
  curriculum: LearnerProfile["curriculum"];
  /** Planned for this class's session this week, oldest first. */
  planned: SetWork[];
  /** Other work still to do: set by someone else, or for another session. */
  otherOpen: SetWork[];
  /** Their own weekly lesson this week. */
  ownLesson: OwnPart[];
}

export interface PlannerClass {
  class: CentreClass;
  students: PlannerStudent[];
}

function ownLesson(profile: LearnerProfile, week: string): OwnPart[] {
  return (["maths", "english"] as const).flatMap((subject) => {
    const lesson = profile.lessons?.[subject];
    if (!lesson || lesson.week !== week) return [];
    return lesson.parts
      .filter((p) => p.kind !== "set")
      .map((p) => ({ subject, title: p.title, done: Math.min(p.results.length, p.questionIds.length), total: p.questionIds.length }));
  });
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
           AND ((w.class_id = ANY($2::uuid[]) AND w.week = $3::date) OR w.done_at IS NULL)
         ORDER BY w.created_at`,
        [learnerIds, ids, week],
      )
    : { rows: [] };
  return classes.map((c) => ({
    class: c,
    students: enrolled
      .filter((r) => r.class_id === c.id)
      .map((r) => {
        const mine = work.filter((w) => w.learner_id === r.id);
        const inSession = (w: Record<string, unknown>) => w.class_id === c.id && w.week_text === week;
        return {
          id: r.id as string,
          name: r.name as string,
          yearLevel: Number(r.year_level),
          curriculum: r.curriculum as LearnerProfile["curriculum"],
          planned: mine.filter(inSession).map((w) => setWorkOf(w)),
          otherOpen: mine.filter((w) => !inSession(w)).map((w) => setWorkOf(w)),
          ownLesson: ownLesson(r.profile as LearnerProfile, week),
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

export type PlanResult = { added: number } | { error: string; status: number };

/** Adds activities to a session for each of these students, up to eight each. Homework if `homework`. */
export async function planActivities(
  viewer: User,
  plan: {
    classId: string;
    week: string;
    learnerIds: string[];
    subject: SetWork["subject"];
    subtopicIds: string[];
    homework: boolean;
    note: string | null;
  },
): Promise<PlanResult> {
  const found = await viewerClass(viewer, plan.classId, plan.learnerIds);
  if (!found) return { error: "No such class or student.", status: 404 };
  if (!subjectOk(found, plan.subject)) return { error: "That subject isn't taught in this class.", status: 400 };
  const pool = await ready();
  const { rows } = await pool.query(
    `SELECT l.id, l.name,
       (SELECT COUNT(*) FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $2 AND w.week = $3::date AND w.kind = 'topic') AS planned,
       (SELECT COUNT(*) FROM set_work w WHERE w.learner_id = l.id AND w.done_at IS NULL) AS open
     FROM learners l WHERE l.id = ANY($1::uuid[])`,
    [plan.learnerIds, plan.classId, plan.week],
  );
  const n = plan.subtopicIds.length;
  const full = rows.find((r) => Number(r.planned) + n > MAX_SESSION_ACTIVITIES);
  if (full)
    return {
      error: `${full.name} already has ${full.planned} of ${MAX_SESSION_ACTIVITIES} activities this session. Take some off first, or add fewer.`,
      status: 400,
    };
  const busy = rows.find((r) => Number(r.open) + n > MAX_OPEN_WORK);
  if (busy)
    return {
      error: `${busy.name} can have up to ${MAX_OPEN_WORK} pieces of work still to do. Wait for some to be finished first.`,
      status: 400,
    };
  for (const learnerId of plan.learnerIds)
    for (const subtopicId of plan.subtopicIds)
      await pool.query(
        `INSERT INTO set_work (learner_id, set_by, subject, subtopic_id, note, class_id, week, homework)
         VALUES ($1, $2, $3, $4, $5, $6, $7::date, $8)`,
        [learnerId, viewer.id, plan.subject, subtopicId, plan.note, plan.classId, plan.week, plan.homework],
      );
  await audit(viewer.id, "plan_activities", plan.classId, { week: plan.week, students: plan.learnerIds.length, count: n });
  return { added: n * plan.learnerIds.length };
}

/**
 * Homework that redoes the questions each student didn't get right first go in the session's
 * activities in a subject. One per student, subject and session; students without an activity in
 * that subject this session are skipped.
 */
export async function planMistakesHomework(
  viewer: User,
  plan: { classId: string; week: string; learnerIds: string[]; subject: SetWork["subject"]; note: string | null },
): Promise<PlanResult> {
  const found = await viewerClass(viewer, plan.classId, plan.learnerIds);
  if (!found) return { error: "No such class or student.", status: 404 };
  if (!subjectOk(found, plan.subject)) return { error: "That subject isn't taught in this class.", status: 400 };
  const pool = await ready();
  const { rowCount } = await pool.query(
    `INSERT INTO set_work (learner_id, set_by, subject, subtopic_id, note, class_id, week, homework, kind)
     SELECT l.id, $2, $3::varchar, '', $4, $5, $6::date, TRUE, 'mistakes' FROM learners l
     WHERE l.id = ANY($1::uuid[])
       AND EXISTS (SELECT 1 FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $5 AND w.week = $6::date AND w.subject = $3::varchar AND w.kind = 'topic')
       AND NOT EXISTS (SELECT 1 FROM set_work w WHERE w.learner_id = l.id AND w.class_id = $5 AND w.week = $6::date AND w.subject = $3::varchar AND w.kind = 'mistakes')`,
    [plan.learnerIds, viewer.id, plan.subject, plan.note, plan.classId, plan.week],
  );
  if (!rowCount) return { error: "Add an activity in this subject first, so there are questions to redo.", status: 400 };
  await audit(viewer.id, "plan_mistakes_homework", plan.classId, { week: plan.week, students: rowCount });
  return { added: rowCount };
}

/** Makes one of a session's activities homework, or not. */
export async function setHomework(viewer: User, workId: string, homework: boolean): Promise<boolean> {
  const where = centreOf(viewer);
  if (!where) return false;
  const ids = (await listClasses(where.centreId, where.teacherId)).map((c) => c.id);
  const { rowCount } = await (
    await ready()
  ).query(`UPDATE set_work SET homework = $3 WHERE id = $1 AND kind = 'topic' AND class_id = ANY($2::uuid[])`, [workId, ids, homework]);
  return Boolean(rowCount);
}
