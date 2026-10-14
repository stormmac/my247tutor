import "server-only";
import { Pool } from "pg";
import { BILLING_SQL } from "./billingSchema";
import { CENTRE_SQL } from "./centreSchema";
import { CHILD_SQL } from "./childSchema";
import { INVITE_SQL } from "./inviteSchema";
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

const LATER_SQL = `${BILLING_SQL}\n${INVITE_SQL}\n${CHILD_SQL}\n${CENTRE_SQL}`;

/** The pool, once the card-payment columns, invite table, child sign-in columns and centre tables exist. Tried again on the next call if it fails. */
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
