import "server-only";
import { Pool } from "pg";

let pool: Pool | null = null;

/** One shared connection pool per server instance. Certificates are checked when the URL asks for SSL. */
export function db(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    pool = new Pool({ connectionString: url, max: 5 });
  }
  return pool;
}
