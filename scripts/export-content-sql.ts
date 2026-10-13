import { writeFileSync } from "node:fs";
import { contentSeedSql } from "../src/lib/content/sql";

const out = new URL("../database/005_my247tutor_content.sql", import.meta.url);
writeFileSync(out, contentSeedSql());
console.log(`Wrote ${out.pathname}`);
