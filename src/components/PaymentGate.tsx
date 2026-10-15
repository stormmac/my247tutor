"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useAccount } from "@/components/useAccount";

/** Pages a parent can still open once their free trial is over and no card is added. */
const OPEN_PAGES = ["/", "/billing", "/login", "/signup", "/start", "/private", "/account"];

/**
 * Sends a signed-in parent whose free trial has ended to the payment page. A child signed in on
 * their own can't pay, so they're asked to fetch their grown-up instead.
 */
export function PaymentGate() {
  const { user } = useAccount();
  const path = usePathname();
  const router = useRouter();
  const blocked = Boolean(user?.needsPayment) && !OPEN_PAGES.includes(path);
  const child = Boolean(user?.child);
  useEffect(() => {
    if (blocked && !child) router.replace("/billing");
  }, [blocked, child, router]);
  if (!blocked || !child) return null;
  return (
    <div className="payment-gate" role="alertdialog" aria-modal="true" aria-labelledby="payment-gate-title">
      <div className="card narrow stack">
        <h1 id="payment-gate-title">Time to fetch a grown-up</h1>
        <p>
          The free trial has finished. Ask your grown-up to log in to their account and add a payment method, then you can keep learning.
        </p>
        <button type="button" className="btn secondary" onClick={() => void signOut()}>
          Log out
        </button>
      </div>
    </div>
  );
}
