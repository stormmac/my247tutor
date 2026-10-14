"use client";

import { backToAdmin, useAccount } from "@/components/useAccount";

/** Shown across the top while an admin is logged in as someone else, or a teacher is learning as a student, with the way back. */
export function ActingBanner() {
  const { user } = useAccount();
  if (!user?.actingAdmin) return null;
  if (user.actingRole === "teacher" || user.actingRole === "centre")
    return (
      <div className="acting-banner" role="status">
        <div className="container">
          <span>
            You&apos;re learning as <strong>{user.name}</strong>. Their progress is saved as they go.
          </span>
          <button className="btn small" onClick={() => void backToAdmin()}>
            Back to my students
          </button>
        </div>
      </div>
    );
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
