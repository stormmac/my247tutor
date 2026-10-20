import "server-only";
import { Pool } from "pg";
import { BILLING_SQL } from "./billingSchema";
import { CENTRE_SQL, CLASS_TIMES_SQL } from "./centreSchema";
import { CHILD_SQL } from "./childSchema";
import { CURRICULUM_SQL, UK_CURRICULUM_SQL, YEARS_SQL } from "./curriculumSchema";
import { FAMILY_SQL, SCHOOL_TOPICS_SQL } from "./familySchema";
import { INVITE_SQL } from "./inviteSchema";
import { PRAISE_SQL } from "./praiseSchema";
import { SUNI_CHAT_SQL } from "./suniChatSchema";
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

const LATER_SQL = `${BILLING_SQL}\n${INVITE_SQL}\n${CHILD_SQL}\n${CENTRE_SQL}\n${CLASS_TIMES_SQL}\n${PRAISE_SQL}\n${SUNI_CHAT_SQL}\n${CURRICULUM_SQL}\n${UK_CURRICULUM_SQL}\n${YEARS_SQL}\n${FAMILY_SQL}\n${SCHOOL_TOPICS_SQL}`;

/** The pool, once the card-payment columns, invite table, child sign-in columns, centre tables, class times, praise phrases, Suni chats, curriculum columns, centre parents and set work exist. Tried again on the next call if it fails. */
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
