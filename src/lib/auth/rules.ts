/**
 * Account rules that don't touch the database or the network, kept separate so they can be tested
 * and used from the proxy, route handlers and the browser alike.
 */
import { z } from "zod";

/** A centre is a tutoring centre's own account, run by its manager. */
export type Role = "admin" | "teacher" | "student" | "parent" | "centre";
export const ROLES: Role[] = ["parent", "centre", "teacher", "admin"];
/** Roles an admin can give an account. */
export const ASSIGNABLE_ROLES = ["parent", "centre", "teacher", "admin"] as const;

export const MIN_PASSWORD_LENGTH = 10;

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(255)
  .pipe(z.email({ message: "Enter a valid email address." }));

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters.`)
  .max(200, "That password is too long.");

/** Who can sign up on their own: a parent or carer, or a tutoring centre. Teachers and children are added by them. */
export const SIGN_UP_ROLES = ["parent", "centre"] as const;

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: EmailSchema,
  password: PasswordSchema,
  role: z.enum(SIGN_UP_ROLES).default("parent"),
});

/** Parents, centres and teachers log in with their email; children with the username they were given. */
export const SignInSchema = z.object({ email: z.string().trim().toLowerCase().min(1).max(255), password: z.string().min(1).max(200) });

/** A child's sign-in name: easy to type, and never an email, so the two can't be confused. */
export const UsernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Use at least 3 characters.")
  .max(30, "Use 30 characters or fewer.")
  .regex(/^[a-z0-9][a-z0-9._-]*$/, "Use letters, numbers, dots, dashes or underscores, starting with a letter or number.");

/** Shorter than a parent's, as children type it themselves. Repeated wrong guesses still lock the account. */
export const MIN_CHILD_PASSWORD_LENGTH = 8;
export const ChildPasswordSchema = z
  .string()
  .min(MIN_CHILD_PASSWORD_LENGTH, `Use at least ${MIN_CHILD_PASSWORD_LENGTH} characters.`)
  .max(200, "That password is too long.");

export const NewChildLoginSchema = z.object({ username: UsernameSchema, password: ChildPasswordSchema });
export const ChildLoginChangeSchema = z
  .object({ username: UsernameSchema.optional(), password: ChildPasswordSchema.optional() })
  .refine((c) => c.username !== undefined || c.password !== undefined, "Nothing to change.");

/** Emails listed in ADMIN_EMAILS (comma separated) become admins when they sign up or sign in. */
export function isAdminEmail(email: string, list = process.env.ADMIN_EMAILS ?? ""): boolean {
  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

export const LOCKOUT_MINUTES = 15;
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;

/** Too many wrong passwords recently, for this account or from this address. */
export function isLockedOut(recent: { emailFailures: number; ipFailures: number }): boolean {
  return recent.emailFailures >= MAX_FAILURES_PER_EMAIL || recent.ipFailures >= MAX_FAILURES_PER_IP;
}

/** Only allow redirects back to a path on this site after signing in. */
export function safeNextPath(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}

/**
 * Blocks other websites from posting to our API with the visitor's cookies (cross-site request forgery).
 * Browsers send Origin on every POST, PUT, PATCH and DELETE; it must match this site.
 */
export function isSameOrigin(method: string, origin: string | null, host: string | null): boolean {
  if (["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) return true;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** A readable temporary password an admin can pass on, e.g. "maple-river-4821". */
export function temporaryPassword(random: (n: number) => number): string {
  const words = ["maple", "river", "comet", "otter", "wattle", "harbour", "koala", "cedar", "lagoon", "ember", "summit", "breeze"];
  const pick = () => words[random(words.length)];
  return `${pick()}-${pick()}-${pick()}-${String(1000 + random(9000))}`;
}

/**
 * Where a visitor without an account goes: in, while their free trial lasts; to the choice
 * between a trial and an account if they haven't had one; to sign up once it has run out.
 */
export function guestAccess(trialEnd: number | null, now = Date.now()): "allow" | "start" | "trial-over" {
  if (trialEnd === null) return "start";
  return now < trialEnd ? "allow" : "trial-over";
}

/** Stripe subscription states that still let the family in. Past due gets Stripe's retry period. */
const PAYING = ["active", "trialing", "past_due"];

export interface AccessFacts {
  role: Role;
  freeAccess: boolean;
  /** Milliseconds, or null when the account never had a trial. */
  trialEndsAt: number | null;
  subscriptionStatus: string | null;
}

export type Plan = "staff" | "free" | "paying" | "trial" | "unpaid";

/** Why an account can use the site, or "unpaid" when it needs to add a card first. */
export function accountPlan(a: AccessFacts, now = Date.now()): Plan {
  if (a.role === "admin" || a.role === "teacher") return "staff";
  if (a.freeAccess) return "free";
  if (a.subscriptionStatus && PAYING.includes(a.subscriptionStatus)) return "paying";
  if (a.trialEndsAt !== null && now < a.trialEndsAt) return "trial";
  return "unpaid";
}

/** When a new account's free trial ends: when the browser's free hour ends, or an hour from now if it never had one. */
export function newAccountTrialEnd(browserTrialEnd: number | null, trialMinutes: number, now = Date.now()): number {
  return browserTrialEnd ?? now + trialMinutes * 60_000;
}

export const NewUserSchema = z.object({
  name: z.string().trim().min(1, "Enter their name.").max(100),
  email: EmailSchema,
  role: z.enum(ASSIGNABLE_ROLES),
  freeAccess: z.boolean(),
});

/** A centre adds a teacher, who is emailed a link to set their password. */
export const NewTeacherSchema = z.object({
  name: z.string().trim().min(1, "Enter their name.").max(100),
  email: EmailSchema,
});

const YearSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8)], {
  message: "Choose a year from 1 to 8.",
});

export const CLASS_SUBJECTS = { maths: "Maths", english: "English", both: "Maths and English" } as const;

/** When a class meets each week: a day (1 is Monday, 7 is Sunday), a start time like "16:30", and how long. */
export const ClassTimeSchema = z.object({
  weekday: z.number().int().min(1).max(7),
  start: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a start time."),
  minutes: z.number().int().min(15, "A class runs for at least 15 minutes.").max(240, "A class runs for at most 4 hours."),
});
export type ClassTime = z.infer<typeof ClassTimeSchema>;

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

/** One of a centre's classes, like a myteacher course: who runs it, for which year and subject, and when. */
export const ClassSchema = z.object({
  name: z.string().trim().min(1, "Give the class a name.").max(100),
  yearLevel: YearSchema,
  subject: z.enum(["maths", "english", "both"]),
  teacherId: z.uuid().nullable(),
  times: z
    .array(ClassTimeSchema)
    .max(14, "A class can have at most 14 times a week.")
    .refine((times) => new Set(times.map((t) => `${t.weekday} ${t.start}`)).size === times.length, "That class has the same time twice.")
    .default([]),
});

/** "4:30 pm" from "16:30". */
export function formatTime(start: string): string {
  const [h, m] = start.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** Minutes after midnight from "16:30". */
export const minutesOf = (start: string) => Number(start.slice(0, 2)) * 60 + Number(start.slice(3, 5));

/** "1 hour", "45 min", "1 hr 30 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  if (!m) return h === 1 ? "1 hour" : `${h} hours`;
  return `${h} hr ${m} min`;
}

/** "Monday 4:30 pm, 1 hour". */
export const describeTime = (t: ClassTime) => `${WEEKDAYS[t.weekday - 1]} ${formatTime(t.start)}, ${formatDuration(t.minutes)}`;

export const MAX_CENTRE_STUDENTS = 500;

/** A centre adds a student with the username and password they'll sign in with. */
export const NewStudentSchema = z.object({
  name: z.string().trim().min(1, "Enter the student's name.").max(20, "Use 20 characters or fewer."),
  yearLevel: YearSchema,
  username: UsernameSchema,
  password: ChildPasswordSchema,
  classIds: z.array(z.uuid()).max(20).default([]),
  /** Puts the student in Learn to Read, the phonics program, without waiting for the reading check. */
  learnToRead: z.boolean().default(false),
});

export const StudentChangeSchema = z
  .object({
    name: z.string().trim().min(1, "Enter the student's name.").max(20, "Use 20 characters or fewer.").optional(),
    yearLevel: YearSchema.optional(),
    username: UsernameSchema.optional(),
    password: ChildPasswordSchema.optional(),
    classIds: z.array(z.uuid()).max(20).optional(),
    learnToRead: z.boolean().optional(),
  })
  .refine((c) => Object.values(c).some((v) => v !== undefined), "Nothing to change.");
