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
  for (const file of ["006_my247tutor_accounts.sql", "008_my247tutor_billing.sql"])
    await client.query(readFileSync(join(__dirname, "../database", file), "utf8"));
  await client.end();
  console.log("Account tables are ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
