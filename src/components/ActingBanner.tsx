"use client";

import { backToAdmin, useAccount } from "@/components/useAccount";

/** Shown across the top while an admin is logged in as someone else, with the way back to Admin. */
export function ActingBanner() {
  const { user } = useAccount();
  if (!user?.actingAdmin) return null;
  return (
    <div className="acting-banner" role="status">
      <div className="container">
        <span>
          You&apos;re logged in as <strong>{user.name}</strong> from Admin. Payments and passwords can&apos;t be changed.
        </span>
        <button className="btn small" onClick={() => void backToAdmin()}>
          Back to Admin
        </button>
      </div>
    </div>
  );
}
