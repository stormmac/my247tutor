import { COUNTRIES, QUESTIONS, STATES, SUBJECTS, SUBTOPICS, TOPICS, YEAR_LEVELS } from "./tree";

/** Owner of the my247tutor content rows, since myteacher's questions table requires created_by. */
export const CONTENT_USER_ID = "90000000-0000-0000-0000-000000000001";

/** A value for a JSONB column. A bare string there must still be JSON-encoded ("b", not b). */
class Jsonb {
  constructor(readonly value: unknown) {}
}

type Value = string | number | boolean | null | Jsonb;

function quote(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function literal(v: Value): string {
  if (v === null) return "NULL";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "string") return quote(v);
  return v.value === null ? "NULL" : `${quote(JSON.stringify(v.value))}::jsonb`;
}

function insert(table: string, rows: object[]): string {
  if (!rows.length) return "";
  const columns = Object.keys(rows[0]);
  const values = rows.map((r) => `  (${columns.map((c) => literal((r as Record<string, Value>)[c])).join(", ")})`);
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values.join(",\n")}\nON CONFLICT DO NOTHING;\n`;
}

/**
 * The whole content tree as SQL for the myteacher database (run after its migrations 001–003,
 * database/004_add_skill_link.sql and 007_question_levels.sql). Re-running it is safe: existing rows are left alone.
 */
export function contentSeedSql(): string {
  return [
    "-- Generated from src/lib/content/tree.ts by `npm run content:sql`. Do not edit by hand.\n",
    "BEGIN;\n",
    insert("countries", COUNTRIES),
    insert("states", STATES),
    insert("subjects", SUBJECTS),
    insert("year_levels", YEAR_LEVELS),
    insert("users", [{ id: CONTENT_USER_ID, email: "content@my247tutor.com", display_name: "my247tutor content", role: "admin" }]),
    insert("topics", TOPICS),
    insert("subtopics", SUBTOPICS),
    insert(
      "questions",
      QUESTIONS.map((q) => ({
        ...q,
        answer_options: new Jsonb(q.answer_options),
        correct_answer: new Jsonb(q.correct_answer),
        created_by: CONTENT_USER_ID,
      })),
    ),
    "COMMIT;\n",
  ].join("\n");
}
