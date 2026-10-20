/**
 * A child's date of birth, kept as "YYYY-MM-DD" on their profile. Optional: the school year sets
 * the work, and the date of birth is for the grown-ups' records.
 */

const PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
/** The youngest and oldest a student can be, in years. */
export const YOUNGEST = 3;
export const OLDEST = 19;

function parts(dob: string): [number, number, number] | null {
  const m = PATTERN.exec(dob);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d ? [y, mo, d] : null;
}

/** Age in whole years on a day. Null for a date that isn't real. */
export function ageOn(dob: string, now = new Date()): number | null {
  const p = parts(dob);
  if (!p) return null;
  const [y, m, d] = p;
  const [ny, nm, nd] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  return ny - y - (nm < m || (nm === m && nd < d) ? 1 : 0);
}

/** Why a date of birth can't be used, or null when it's fine. */
export function dateOfBirthProblem(dob: string, now = new Date()): string | null {
  const age = ageOn(dob, now);
  if (age === null) return "Enter a real date of birth.";
  if (age < YOUNGEST || age > OLDEST) return `Check the date of birth: students are ${YOUNGEST} to ${OLDEST} years old.`;
  return null;
}

/** Like "3 Mar 2017", for a grown-up to read. */
export function formatDateOfBirth(dob: string, locale = "en-AU"): string {
  const p = parts(dob);
  if (!p) return dob;
  return new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Born 3 Mar 2017 · age 9". */
export function describeBirth(dob: string, locale = "en-AU", now = new Date()): string {
  const age = ageOn(dob, now);
  return `Born ${formatDateOfBirth(dob, locale)}${age === null ? "" : ` · age ${age}`}`;
}

/** Today as "YYYY-MM-DD", the latest a date picker allows. */
export function today(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
