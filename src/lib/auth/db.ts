import "server-only";
import { Pool } from "pg";
import { BILLING_SQL } from "./billingSchema";
import { CENTRE_SQL, CLASS_TIMES_SQL } from "./centreSchema";
import { CHILD_SQL } from "./childSchema";
import { CURRICULUM_SQL, UK_CURRICULUM_SQL, YEARS_SQL } from "./curriculumSchema";
import { FAMILY_SQL, PLANNER_HOMEWORK_SQL, PLANNER_SQL, SCHOOL_TOPICS_SQL } from "./familySchema";
import { INVITE_SQL } from "./inviteSchema";
import { PHONICS_CLIPS_SQL } from "./phonicsClipSchema";
import { PRAISE_SQL } from "./praiseSchema";
import { SUNI_CHAT_SQL, SUNI_TECHNICAL_SQL } from "./suniChatSchema";
import { CHECKIN_GREAT_SQL, SUNI_NOTES_SQL } from "./suniNotesSchema";
import { QUESTION_HINTS_SQL } from "./hintSchema";
import { LEARNING_PLAN_SQL } from "./planSchema";
import { REWARDS_SQL } from "./rewardSchema";
import { connectionString, databaseUrl } from "./dburl";

let pool: Pool | null = null;

/** One shared connection pool per server instance. Certificates are checked when the URL asks for SSL. */
export function db(): Pool {
  if (!pool) {
    const url = databaseUrl();
    if (!url) throw new Error("DATABASE_URL is not set");
    pool = new Pool({ connectionString: connectionString(url), max: 5, connectionTimeoutMillis: 8000 });
  }
  return pool;
}

let schema: Promise<Pool> | null = null;

const LATER_SQL = `${BILLING_SQL}
${INVITE_SQL}
${CHILD_SQL}
${CENTRE_SQL}
${CLASS_TIMES_SQL}
${PRAISE_SQL}
${SUNI_CHAT_SQL}
${CURRICULUM_SQL}
${UK_CURRICULUM_SQL}
${YEARS_SQL}
${FAMILY_SQL}
${SCHOOL_TOPICS_SQL}
${PHONICS_CLIPS_SQL}
${SUNI_NOTES_SQL}
${QUESTION_HINTS_SQL}
${LEARNING_PLAN_SQL}
${SUNI_TECHNICAL_SQL}
${REWARDS_SQL}
${CHECKIN_GREAT_SQL}
${PLANNER_SQL}
${PLANNER_HOMEWORK_SQL}`;

/** The pool, once the card-payment columns, invite table, child sign-in columns, centre tables, class times, praise phrases, Suni chats, curriculum columns, centre parents, set work, recorded phonics sounds, Suni's notes, question hints, learning plans, the technical flag, rewards, the "great" feeling and the lesson planner with its homework boxes exist. Tried again on the next call if it fails. */
export function ready(): Promise<Pool> {
  schema ??= db()
    .query(LATER_SQL)
    // Two servers starting at once can both try to add a column; the second try then finds it there.
    .catch(() => db().query(LATER_SQL))
    .then(() => db())
    .catch((error) => {
      schema = null;
      throw error;
    });
  return schema;
}
