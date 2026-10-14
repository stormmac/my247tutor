import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import type { PoolClient } from "pg";
import { newProfile, type LearnerProfile } from "@/lib/learner/model";
import { summarise, type StudentSummary } from "@/lib/learner/summary";
import { newReading, setEnrolled } from "@/lib/phonics/progress";
import { ready } from "./db";
import { MAX_CENTRE_STUDENTS, type ClassTime } from "./rules";
import { audit, toUser, USER_COLUMNS, type User } from "./users";

/** A teacher at a tutoring centre, as the centre sees them. */
export interface Teacher {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

export interface CentreClass {
  id: string;
  name: string;
  yearLevel: number;
  subject: "maths" | "english" | "both";
  teacherId: string | null;
  teacherName: string | null;
  students: number;
  /** When it meets each week, in day and time order. */
  times: ClassTime[];
}

/** A centre's student: a learner the centre owns, with the sign-in they use. */
export interface Student {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  lastLoginAt: string | null;
  classIds: string[];
  /** In Learn to Read, the phonics program. */
  learnToRead: boolean;
}

const iso = (value: unknown) => (value ? new Date(value as string).toISOString() : null);
const USERNAME_TAKEN = "That username is taken. Try adding a number or their initial.";

export async function listTeachers(centreId: string): Promise<Teacher[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT id, display_name, email, is_active, last_login_at FROM users WHERE centre_id = $1 AND role = 'teacher' ORDER BY display_name`,
    [centreId],
  );
  return rows.map((r) => ({
    id: r.id as string,
    name: r.display_name as string,
    email: r.email as string,
    isActive: r.is_active as boolean,
    lastLoginAt: iso(r.last_login_at),
  }));
}

/** A centre adds a teacher. Like an account added in Admin, it has no usable password until the teacher sets one. */
export async function addTeacher(centre: User, details: { name: string; email: string }): Promise<{ user: User } | { error: string }> {
  const unusable = await bcrypt.hash(randomBytes(32).toString("hex"), 12);
  const { rows } = await (
    await ready()
  ).query(
    `INSERT INTO users (email, display_name, role, password_hash, centre_id) VALUES ($1, $2, 'teacher', $3, $4)
     ON CONFLICT (email) DO NOTHING RETURNING ${USER_COLUMNS}`,
    [details.email, details.name, unusable, centre.id],
  );
  if (!rows[0]) return { error: "There's already an account with that email." };
  const user = toUser(rows[0]);
  await audit(centre.id, "add_teacher", user.id, {});
  return { user };
}

/** One of this centre's teachers, or null. */
export async function centreTeacher(centreId: string, teacherId: string): Promise<User | null> {
  const { rows } = await (
    await ready()
  ).query(`SELECT ${USER_COLUMNS} FROM users WHERE id = $1 AND centre_id = $2 AND role = 'teacher'`, [teacherId, centreId]);
  return rows[0] ? toUser(rows[0]) : null;
}

/** Removes a teacher's account. Their classes stay, without a teacher, until the centre picks another. */
export async function removeTeacher(centre: User, teacherId: string): Promise<boolean> {
  const { rowCount } = await (
    await ready()
  ).query(`DELETE FROM users WHERE id = $1 AND centre_id = $2 AND role = 'teacher'`, [teacherId, centre.id]);
  if (rowCount) await audit(centre.id, "remove_teacher", teacherId, {});
  return Boolean(rowCount);
}

/** The centre's classes, or only one teacher's. */
export async function listClasses(centreId: string, teacherId?: string): Promise<CentreClass[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT c.id, c.name, c.year_level, c.subject, c.teacher_id, t.display_name AS teacher_name,
       (SELECT COUNT(*) FROM class_enrolments e WHERE e.class_id = c.id) AS students,
       (SELECT COALESCE(json_agg(json_build_object('weekday', ct.weekday, 'start', to_char(ct.starts_at, 'HH24:MI'), 'minutes', ct.minutes)
          ORDER BY ct.weekday, ct.starts_at), '[]') FROM class_times ct WHERE ct.class_id = c.id) AS times
     FROM centre_classes c
     LEFT JOIN users t ON t.id = c.teacher_id
     WHERE c.centre_id = $1 AND ($2::uuid IS NULL OR c.teacher_id = $2)
     ORDER BY c.year_level, c.name`,
    [centreId, teacherId ?? null],
  );
  return rows.map((r) => ({
    id: r.id as string,
    name: r.name as string,
    yearLevel: Number(r.year_level),
    subject: r.subject as CentreClass["subject"],
    teacherId: (r.teacher_id as string | null) ?? null,
    teacherName: (r.teacher_name as string | null) ?? null,
    students: Number(r.students),
    times: (r.times as ClassTime[]) ?? [],
  }));
}

type ClassDetails = { name: string; yearLevel: number; subject: CentreClass["subject"]; teacherId: string | null; times: ClassTime[] };

/** Replaces a class's weekly times. */
async function setTimes(client: PoolClient, classId: string, times: ClassTime[]) {
  await client.query(`DELETE FROM class_times WHERE class_id = $1`, [classId]);
  for (const t of times)
    await client.query(`INSERT INTO class_times (class_id, weekday, starts_at, minutes) VALUES ($1, $2, $3, $4)`, [
      classId,
      t.weekday,
      t.start,
      t.minutes,
    ]);
}

async function teacherOk(centreId: string, teacherId: string | null) {
  return teacherId === null || Boolean(await centreTeacher(centreId, teacherId));
}

export async function createClass(centre: User, details: ClassDetails): Promise<{ id: string } | { error: string }> {
  if (!(await teacherOk(centre.id, details.teacherId))) return { error: "That teacher isn't at your centre." };
  const id = await inTransaction(async (client) => {
    const { rows } = await client.query(
      `INSERT INTO centre_classes (centre_id, teacher_id, name, year_level, subject) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [centre.id, details.teacherId, details.name, details.yearLevel, details.subject],
    );
    await setTimes(client, rows[0].id as string, details.times);
    return rows[0].id as string;
  });
  await audit(centre.id, "add_class", id, { name: details.name });
  return { id };
}

export async function updateClass(
  centre: User,
  classId: string,
  details: ClassDetails,
): Promise<{ ok: true } | { error: string; status: number }> {
  if (!(await teacherOk(centre.id, details.teacherId))) return { error: "That teacher isn't at your centre.", status: 400 };
  const found = await inTransaction(async (client) => {
    const { rowCount } = await client.query(
      `UPDATE centre_classes SET teacher_id = $3, name = $4, year_level = $5, subject = $6, updated_at = NOW() WHERE id = $1 AND centre_id = $2`,
      [classId, centre.id, details.teacherId, details.name, details.yearLevel, details.subject],
    );
    if (rowCount) await setTimes(client, classId, details.times);
    return Boolean(rowCount);
  });
  return found ? { ok: true } : { error: "No such class.", status: 404 };
}

/** Deletes a class. Its students stay at the centre. */
export async function deleteClass(centre: User, classId: string): Promise<boolean> {
  const { rowCount } = await (await ready()).query(`DELETE FROM centre_classes WHERE id = $1 AND centre_id = $2`, [classId, centre.id]);
  if (rowCount) await audit(centre.id, "remove_class", classId, {});
  return Boolean(rowCount);
}

export async function listStudents(centreId: string): Promise<Student[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.name, l.year_level, u.username, u.last_login_at,
       COALESCE((l.profile->'reading'->>'enrolled')::boolean, FALSE) AS learn_to_read,
       COALESCE(array_agg(e.class_id) FILTER (WHERE e.class_id IS NOT NULL), '{}') AS class_ids
     FROM learners l
     LEFT JOIN users u ON u.learner_id = l.id
     LEFT JOIN class_enrolments e ON e.learner_id = l.id
     WHERE l.parent_id = $1
     GROUP BY l.id, u.username, u.last_login_at ORDER BY l.name`,
    [centreId],
  );
  return rows.map((r) => ({
    id: r.id as string,
    name: r.name as string,
    yearLevel: Number(r.year_level),
    username: (r.username as string | null) ?? null,
    lastLoginAt: iso(r.last_login_at),
    classIds: r.class_ids as string[],
    learnToRead: r.learn_to_read as boolean,
  }));
}

/** Puts a student in exactly these classes. Classes from another centre are ignored. */
async function setClasses(client: PoolClient, centreId: string, learnerId: string, classIds: string[]) {
  await client.query(`DELETE FROM class_enrolments WHERE learner_id = $1`, [learnerId]);
  await client.query(
    `INSERT INTO class_enrolments (class_id, learner_id) SELECT id, $2 FROM centre_classes WHERE centre_id = $1 AND id = ANY($3::uuid[])`,
    [centreId, learnerId, classIds],
  );
}

async function inTransaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await (await ready()).connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

const taken = (error: unknown) => (error as { code?: string }).code === "23505";

/** A centre adds a student: a learner profile, a sign-in with this username and password, and their classes. */
export async function addStudent(
  centre: User,
  details: { name: string; yearLevel: 3 | 4 | 5 | 6; username: string; password: string; classIds: string[]; learnToRead?: boolean },
): Promise<{ id: string } | { error: string; status: number }> {
  const hash = await bcrypt.hash(details.password, 12);
  try {
    const id = await inTransaction(async (client) => {
      // Serialises adds for this centre, so the student limit holds.
      await client.query(`SELECT id FROM users WHERE id = $1 FOR UPDATE`, [centre.id]);
      const { rows } = await client.query(`SELECT COUNT(*) AS n FROM learners WHERE parent_id = $1`, [centre.id]);
      if (Number(rows[0].n) >= MAX_CENTRE_STUDENTS) return null;
      const profile = {
        ...newProfile(details.name, details.yearLevel),
        id: randomUUID(),
        ...(details.learnToRead ? { reading: setEnrolled(newReading(), true) } : {}),
      };
      await client.query(`INSERT INTO learners (id, parent_id, name, year_level, profile) VALUES ($1, $2, $3, $4, $5)`, [
        profile.id,
        centre.id,
        details.name,
        details.yearLevel,
        JSON.stringify(profile),
      ]);
      // Students have no email; this one is unique, can't receive mail, and is never shown.
      await client.query(
        `INSERT INTO users (email, display_name, role, password_hash, username, parent_id, learner_id)
         VALUES ($1, $2, 'student', $3, $4, $5, $6)`,
        [`child-${randomUUID()}@my247tutor.invalid`, details.name, hash, details.username, centre.id, profile.id],
      );
      await setClasses(client, centre.id, profile.id, details.classIds);
      return profile.id;
    });
    if (!id) return { error: `A centre can have up to ${MAX_CENTRE_STUDENTS} students.`, status: 400 };
    await audit(centre.id, "add_student", id, { username: details.username });
    return { id };
  } catch (error) {
    if (taken(error)) return { error: USERNAME_TAKEN, status: 409 };
    throw error;
  }
}

/** A centre changes a student's name, year, sign-in or classes. A new password signs them out everywhere. */
export async function updateStudent(
  centre: User,
  learnerId: string,
  change: { name?: string; yearLevel?: number; username?: string; password?: string; classIds?: string[]; learnToRead?: boolean },
): Promise<{ ok: true } | { error: string; status: number }> {
  const hash = change.password ? await bcrypt.hash(change.password, 12) : null;
  try {
    const found = await inTransaction(async (client) => {
      const { rowCount } = await client.query(
        `UPDATE learners SET
           name = COALESCE($3, name),
           year_level = COALESCE($4, year_level),
           profile = profile || jsonb_strip_nulls(jsonb_build_object('name', $3::text, 'yearLevel', $4::int)),
           updated_at = NOW()
         WHERE id = $1 AND parent_id = $2`,
        [learnerId, centre.id, change.name ?? null, change.yearLevel ?? null],
      );
      if (!rowCount) return false;
      if (change.learnToRead !== undefined) {
        // The same change a parent makes from the progress report: on or off, set by a grown-up.
        const { rows } = await client.query(`SELECT profile->'reading' AS reading FROM learners WHERE id = $1`, [learnerId]);
        const reading = setEnrolled({ ...newReading(), ...(rows[0]?.reading ?? {}) }, change.learnToRead);
        await client.query(`UPDATE learners SET profile = jsonb_set(profile, '{reading}', $2::jsonb) WHERE id = $1`, [
          learnerId,
          JSON.stringify(reading),
        ]);
      }
      await client.query(
        `UPDATE users SET
           display_name = COALESCE($3, display_name),
           username = COALESCE($4, username),
           password_hash = COALESCE($5, password_hash),
           session_version = session_version + CASE WHEN $5::text IS NULL THEN 0 ELSE 1 END,
           updated_at = NOW()
         WHERE learner_id = $1 AND parent_id = $2`,
        [learnerId, centre.id, change.name ?? null, change.username ?? null, hash],
      );
      if (change.classIds) await setClasses(client, centre.id, learnerId, change.classIds);
      return true;
    });
    if (!found) return { error: "No such student.", status: 404 };
  } catch (error) {
    if (taken(error)) return { error: USERNAME_TAKEN, status: 409 };
    throw error;
  }
  await audit(centre.id, "update_student", learnerId, {
    name: change.name,
    yearLevel: change.yearLevel,
    username: change.username,
    password: Boolean(change.password),
    classes: change.classIds?.length,
    learnToRead: change.learnToRead,
  });
  return { ok: true };
}

/** Deletes a student, their sign-in and all their progress. */
export async function removeStudent(centre: User, learnerId: string): Promise<boolean> {
  const { rowCount } = await (await ready()).query(`DELETE FROM learners WHERE id = $1 AND parent_id = $2`, [learnerId, centre.id]);
  if (rowCount) await audit(centre.id, "remove_student", learnerId, {});
  return Boolean(rowCount);
}

/** The centre a viewer belongs to, and whether they see every class (the centre) or only their own (a teacher). */
export function centreOf(viewer: User): { centreId: string; teacherId?: string } | null {
  if (viewer.role === "centre") return { centreId: viewer.id };
  if (viewer.role === "teacher" && viewer.centreId) return { centreId: viewer.centreId, teacherId: viewer.id };
  return null;
}

export interface ClassStudent {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  lastLoginAt: string | null;
  summary: StudentSummary;
}

/** A class and how each of its students is going, for its teacher or the centre. Null when the viewer can't see it. */
export async function classForViewer(viewer: User, classId: string): Promise<{ class: CentreClass; students: ClassStudent[] } | null> {
  const where = centreOf(viewer);
  if (!where) return null;
  const found = (await listClasses(where.centreId, where.teacherId)).find((c) => c.id === classId);
  if (!found) return null;
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.name, l.year_level, l.profile, u.username, u.last_login_at
     FROM class_enrolments e JOIN learners l ON l.id = e.learner_id LEFT JOIN users u ON u.learner_id = l.id
     WHERE e.class_id = $1 ORDER BY l.name`,
    [classId],
  );
  return {
    class: found,
    students: rows.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      yearLevel: Number(r.year_level),
      username: (r.username as string | null) ?? null,
      lastLoginAt: iso(r.last_login_at),
      summary: summarise(r.profile as LearnerProfile),
    })),
  };
}

/** One student's whole profile, for the progress report. Only for the centre, or a teacher who has them in a class. */
export async function studentForViewer(viewer: User, learnerId: string): Promise<LearnerProfile | null> {
  const where = centreOf(viewer);
  if (!where) return null;
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.profile FROM learners l
     WHERE l.id = $1 AND l.parent_id = $2
       AND ($3::uuid IS NULL OR EXISTS (
         SELECT 1 FROM class_enrolments e JOIN centre_classes c ON c.id = e.class_id WHERE e.learner_id = l.id AND c.teacher_id = $3))`,
    [learnerId, where.centreId, where.teacherId ?? null],
  );
  return rows[0] ? { ...(rows[0].profile as LearnerProfile), id: rows[0].id as string } : null;
}
