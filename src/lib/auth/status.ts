import "server-only";
import { db } from "./db";
import { databaseUrl } from "./dburl";

export interface SetupCheck {
  label: string;
  ok: boolean;
  /** What to do when it isn't ok, in words for the site owner. */
  fix: string;
}

/** Which parts of the account setup are in place. Says whether settings exist, never what they are. */
export async function setupStatus(): Promise<SetupCheck[]> {
  const hasUrl = Boolean(databaseUrl());
  const secret = process.env.AUTH_SECRET ?? "";
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").filter((e) => e.trim()).length;

  let reachable = false;
  let tables = false;
  let adminAccount = false;
  let dbError = "";
  if (hasUrl) {
    try {
      await db().query("SELECT 1");
      reachable = true;
      const { rows } = await db().query(
        `SELECT to_regclass('public.learners') IS NOT NULL AS learners,
                EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'password_hash') AS hash`,
      );
      tables = rows[0].learners && rows[0].hash;
      if (tables) {
        const { rows: a } = await db().query(`SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND password_hash IS NOT NULL`);
        adminAccount = Number(a[0].n) > 0;
      }
    } catch (error) {
      dbError = error instanceof Error ? error.message.slice(0, 120) : "unknown error";
    }
  }

  return [
    {
      label: "Database address (DATABASE_URL) is set",
      ok: hasUrl,
      fix: "In Supabase, open Connect and copy the Transaction pooler connection string. In Vercel, add it as DATABASE_URL under Settings → Environment Variables (Production and Preview), then redeploy.",
    },
    {
      label: "The database answers",
      ok: reachable,
      fix: hasUrl
        ? `The site couldn't connect${dbError ? ` (${dbError})` : ""}. Check DATABASE_URL is the full Transaction pooler string from Supabase, with your database password filled in.`
        : "Set DATABASE_URL first.",
    },
    {
      label: "Account tables are set up",
      ok: tables,
      fix: "In Supabase, open the SQL Editor, paste in database/006_my247tutor_accounts.sql from the repository and press Run.",
    },
    {
      label: "Sign-in secret (AUTH_SECRET) is set",
      ok: secret.length >= 32,
      fix: secret
        ? "AUTH_SECRET is too short. Use at least 32 random characters, then redeploy."
        : "Add AUTH_SECRET under Settings → Environment Variables: at least 32 random characters. Tick Preview as well as Production, then redeploy.",
    },
    {
      label: "Admin email (ADMIN_EMAILS) is set",
      ok: admins > 0,
      fix: "Add ADMIN_EMAILS with your email address, then redeploy. That email becomes an admin when it signs up.",
    },
    {
      label: "An admin account exists",
      ok: adminAccount,
      fix: "Once everything above is ticked, sign up with your admin email.",
    },
  ];
}
