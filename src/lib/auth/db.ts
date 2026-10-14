import "server-only";
import { Pool } from "pg";
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
