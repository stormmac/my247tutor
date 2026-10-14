import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StartTrialButton } from "@/components/StartTrialButton";
import { safeNextPath } from "@/lib/auth/rules";
import { accountsEnabled, SESSION_COOKIE, TRIAL_COOKIE, verifySession, verifyTrial } from "@/lib/auth/session";
import { billingEnabled } from "@/lib/billing/stripe";

/** Where Start learning lands without an account: try it free for an hour, or sign up or in. */
export default async function StartPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNextPath((await searchParams).next ?? "/learn");
  if (!accountsEnabled()) redirect(next);
  const jar = await cookies();
  if (await verifySession(jar.get(SESSION_COOKIE)?.value)) redirect(next);
  const trialEnd = await verifyTrial(jar.get(TRIAL_COOKIE)?.value);
  if (trialEnd !== null && trialEnd > Date.now()) redirect(next);
  const used = trialEnd !== null;
  const query = `?next=${encodeURIComponent(next)}`;
  // With card payments on, an account is how a family subscribes, so it isn't called free.
  const account = billingEnabled() ? "a parent account" : "a free parent account";

  return (
    <div className="card narrow stack" style={{ margin: "40px auto" }}>
      <h1>{used ? "Your free hour is up" : "Ready to start?"}</h1>
      <p className="muted" style={{ margin: 0 }}>
        {used
          ? `Create ${account} to keep going. Everything your child has done so far comes with them.`
          : `Try my247tutor free for an hour with no account, or create ${account} to save your child's progress.`}
      </p>
      {!used && <StartTrialButton next={next} />}
      <Link href={`/signup${query}`} className={used ? "btn" : "btn secondary"}>
        {billingEnabled() ? "Create an account" : "Create a free account"}
      </Link>
      <p className="small muted" style={{ margin: 0 }}>
        Already have an account? <Link href={`/signin${query}`}>Sign in</Link>
      </p>
    </div>
  );
}
