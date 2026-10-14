"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "@/components/useAccount";

/** Pages a parent can still open once their free trial is over and no card is added. */
const OPEN_PAGES = ["/", "/billing", "/signin", "/signup", "/start", "/login"];

/** Sends a signed-in parent whose free trial has ended to the payment page. */
export function PaymentGate() {
  const { user } = useAccount();
  const path = usePathname();
  const router = useRouter();
  const blocked = Boolean(user?.needsPayment) && !OPEN_PAGES.includes(path);
  useEffect(() => {
    if (blocked) router.replace("/billing");
  }, [blocked, router]);
  return null;
}
