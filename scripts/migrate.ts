/** Creates or updates the account tables in the database at DATABASE_URL. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";
import { connectionString, databaseUrl } from "../src/lib/auth/dburl";

const url = databaseUrl();
if (!url) {
  console.error("Set DATABASE_URL first.");
  process.exit(1);
}
async function main() {
  const client = new Client({ connectionString: connectionString(url as string) });
  await client.connect();
  await client.query(readFileSync(join(__dirname, "../database/006_my247tutor_accounts.sql"), "utf8"));
  await client.end();
  console.log("Account tables are ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
