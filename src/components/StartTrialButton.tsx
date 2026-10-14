"use client";

import { useState } from "react";

/** Starts the free hour, then carries on to where the visitor was going. */
export function StartTrialButton({ next }: { next: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function start() {
    setBusy(true);
    setError(false);
    const res = await fetch("/api/auth/trial", { method: "POST" }).catch(() => null);
    if (res?.ok) {
      window.location.assign(next);
      return;
    }
    setError(true);
    setBusy(false);
  }

  return (
    <>
      <button type="button" className="btn" onClick={() => void start()} disabled={busy}>
        {busy ? "Just a moment…" : "Try it free for 1 hour"}
      </button>
      {error && (
        <div className="feedback bad" role="alert">
          Couldn&apos;t start the free trial. Try again.
        </div>
      )}
    </>
  );
}
