"use client";

import { useEffect, useState } from "react";
import type { SetupCheck } from "@/lib/auth/status";

/** The account setup checklist for the site owner: what's connected and what still needs doing. */
export function SetupStatus({ compact = false }: { compact?: boolean }) {
  const [checks, setChecks] = useState<SetupCheck[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/auth/status")
      .then((r) => (r.ok ? (r.json() as Promise<{ checks: SetupCheck[] }>) : Promise.reject()))
      .then((b) => setChecks(b.checks))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null;
  if (!checks) return <p className="muted">Checking the setup…</p>;
  const done = checks.every((c) => c.ok);
  if (compact && done) return null;

  return (
    <div className="card stack">
      <div>
        <h2 style={{ margin: 0 }}>{done ? "Logins are fully set up" : "Logins aren't switched on yet"}</h2>
        <p className="muted" style={{ margin: "4px 0 0" }}>
          {done
            ? "Everything is connected."
            : "Until every line is ticked, the site works without logins and saves progress in each browser."}
        </p>
      </div>
      <ul className="setup-checks">
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? "ok" : ""}>
            <span aria-hidden="true">{c.ok ? "✓" : "✗"}</span>
            <div>
              {c.label}
              {!c.ok && <div className="small muted">{c.fix}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
