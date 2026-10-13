"use client";

import Link from "next/link";
import { signOut, useAccount } from "@/components/useAccount";

/** Sign in, or the signed-in parent's name with Admin and Sign out, in the top bar. */
export function AccountMenu() {
  const { loaded, enabled, user } = useAccount();
  if (!loaded || !enabled) return null;
  if (!user) return <Link href="/signin">Sign in</Link>;
  return (
    <>
      {user.role === "admin" && <Link href="/admin">Admin</Link>}
      <button type="button" className="link-button" onClick={() => void signOut()} title={`Signed in as ${user.email}`}>
        Sign out
      </button>
    </>
  );
}
