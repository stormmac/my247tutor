"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Plan } from "@/lib/auth/rules";

interface Billing {
  enabled: boolean;
  plan: Plan;
  trialEndsAt: number | null;
  paidUntil: number | null;
  subscriptionStatus: string | null;
  hasCard: boolean;
  price: { amount: number; currency: string; interval: string | null } | null;
}

const day = (ms: number) => new Date(ms).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

function priceText(p: Billing["price"]): string | null {
  if (!p) return null;
  const amount = new Intl.NumberFormat("en-AU", { style: "currency", currency: p.currency.toUpperCase() }).format(p.amount / 100);
  return p.interval ? `${amount} a ${p.interval}` : amount;
}

// Links leave with a full page load, so the rest of the site sees the new plan straight away.
export default function BillingPage() {
  return (
    <Suspense>
      <BillingView />
    </Suspense>
  );
}

/** A parent's plan: the free trial, adding a payment method, and changing it later through Stripe. */
function BillingView() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [billing, setBilling] = useState<Billing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    if (thanks) return;
    // Back from Stripe: pick up the new card straight away rather than waiting for Stripe's webhook.
    const request = sessionId
      ? fetch("/api/billing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) })
      : fetch("/api/billing");
    request
      .then(async (r) => {
        if (r.status === 401) return window.location.assign("/login?next=/billing");
        if (!r.ok) throw new Error();
        const b = (await r.json()) as Billing;
        setBilling(b);
        if (sessionId) {
          setThanks(b.plan === "paying");
          window.history.replaceState(null, "", "/billing");
        }
      })
      .catch(() => setError("Couldn't load your plan. Please refresh the page."));
  }, [sessionId, thanks]);

  async function go(path: "/api/billing/checkout" | "/api/billing/portal") {
    setBusy(true);
    setError(null);
    const res = await fetch(path, { method: "POST" });
    const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && body.url) return window.location.assign(body.url);
    setError(body.error ?? "That didn't work. Please try again.");
    setBusy(false);
  }

  if (error && !billing) return <div className="feedback bad narrow">{error}</div>;
  if (!billing) return <p className="muted">Loading your plan…</p>;

  const price = priceText(billing.price);
  const { plan } = billing;

  return (
    <div className="card narrow stack" style={{ margin: "40px auto" }}>
      <h1>Your plan</h1>
      {!billing.enabled || plan === "staff" || plan === "free" ? (
        <>
          <p style={{ margin: 0 }}>
            {plan === "staff"
              ? "Staff accounts don't need to pay."
              : plan === "free"
                ? "Your account has free access to my247tutor. There's nothing to pay."
                : "my247tutor is free to use for now. There's nothing to pay."}
          </p>
          <a className="btn" href="/learn">
            Go to learning
          </a>
        </>
      ) : plan === "paying" ? (
        <>
          {thanks && (
            <div className="feedback good" role="status">
              Thank you! Your payment method is saved and your child can keep learning.
            </div>
          )}
          <p style={{ margin: 0 }}>
            <span className={`pill ${billing.subscriptionStatus === "past_due" ? "warn" : "good"}`}>
              {billing.subscriptionStatus === "past_due" ? "Payment overdue" : "Subscribed"}
            </span>{" "}
            {price && <strong>{price}</strong>}
          </p>
          {billing.subscriptionStatus === "past_due" && (
            <p className="feedback warn" style={{ margin: 0 }}>
              Your last payment didn't go through. Please update your card so learning isn't interrupted.
            </p>
          )}
          {billing.paidUntil && (
            <p className="muted" style={{ margin: 0 }}>
              Paid until {day(billing.paidUntil)}. It renews automatically.
            </p>
          )}
          <div className="row">
            <button className="btn" disabled={busy} onClick={() => void go("/api/billing/portal")}>
              {busy ? "Opening…" : "Change payment method or cancel"}
            </button>
            <a className="btn secondary" href="/learn">
              Go to learning
            </a>
          </div>
        </>
      ) : (
        <>
          <p style={{ margin: 0 }}>
            {plan === "trial" && billing.trialEndsAt
              ? `Your free trial ends at ${new Date(billing.trialEndsAt).toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", day: "numeric", month: "short" })}. Add a payment method now to keep going without a break.`
              : billing.subscriptionStatus === "canceled"
                ? "Your subscription has ended. Add a payment method to start again. Your child's progress is still saved."
                : "Your free trial has ended. Add a payment method to keep going. Everything your child has done so far is saved."}
          </p>
          {price && (
            <p style={{ margin: 0 }}>
              <strong>{price}</strong> <span className="muted">· cancel any time</span>
            </p>
          )}
          <button className="btn" disabled={busy} onClick={() => void go("/api/billing/checkout")}>
            {busy ? "Opening…" : "Add payment method"}
          </button>
          <p className="small muted" style={{ margin: 0 }}>
            Card details are handled securely by Stripe. my247tutor never sees your card number.
          </p>
          {plan === "trial" && (
            <a className="btn secondary" href="/learn">
              Keep using the free trial
            </a>
          )}
        </>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
