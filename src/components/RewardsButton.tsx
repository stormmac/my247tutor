"use client";

import { useRef, useState } from "react";
import type { Subject } from "@/lib/curriculum/types";
import { COLOUR_POINTS, REWARD_SUBJECTS, type RewardKind, type Rewards, rewardText, totalsText, validAmount } from "@/lib/learner/rewards";

const SUBJECT_NAMES: Record<Subject, string> = { maths: "Maths", english: "English" };

/** Loads a child's reward program, or says why it couldn't. */
export async function loadRewards(learnerId: string): Promise<Rewards | string> {
  const res = await fetch(`/api/rewards?learner=${learnerId}`).catch(() => null);
  const body = (await res?.json().catch(() => null)) as (Rewards & { error?: string }) | null;
  return res?.ok && body ? body : (body?.error ?? "The rewards couldn't be loaded.");
}

/** One line on how lesson questions earn points: "🟢 3 points, 🟡 2, 🔴 1 for each question". */
export function ColourPoints() {
  return (
    <span>
      🟢 {COLOUR_POINTS.good} points for right first go, 🟡 {COLOUR_POINTS.warn} for right on a later go and 🔴 {COLOUR_POINTS.bad} for
      trying
    </span>
  );
}

/** The grown-up's own reward for one subject: points or money, and how much. */
function SubjectReward({
  learnerId,
  subject,
  rewards,
  onSaved,
}: {
  learnerId: string;
  subject: Subject;
  rewards: Rewards;
  onSaved: (r: Rewards) => void;
}) {
  const mine = rewards.offers.find((o) => o.subject === subject && o.mine);
  const others = rewards.offers.filter((o) => o.subject === subject && !o.mine);
  const [kind, setKind] = useState<RewardKind>(mine?.kind ?? "points");
  const [amount, setAmount] = useState(mine ? String(mine.amount) : "");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(reward: { kind: RewardKind; amount: number } | null) {
    if (reward && !validAmount(reward.kind, reward.amount))
      return setMessage({ ok: false, text: kind === "points" ? "Use a whole number of points." : "Use an amount like 2 or 2.50." });
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/rewards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId, subject, reward }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => null)) as (Rewards & { error?: string }) | null;
    setSaving(false);
    if (!res?.ok || !body) return setMessage({ ok: false, text: body?.error ?? "The reward couldn't be saved. Try again." });
    if (!reward) setAmount("");
    onSaved(body);
    setMessage({ ok: true, text: reward ? "Saved." : "Removed." });
  }

  return (
    <fieldset className="plan-choice reward-choice">
      <legend>{SUBJECT_NAMES[subject]}: finishing the week&apos;s lesson</legend>
      <div className="row" style={{ gap: 8 }}>
        <div className="tabs">
          {(["points", "money"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`tab${kind === k ? " active" : ""}`}
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k === "points" ? "⭐ Points" : "💲 Money"}
            </button>
          ))}
        </div>
        <label className="row" style={{ gap: 4 }}>
          {kind === "money" && <span>$</span>}
          <input
            type="number"
            inputMode="decimal"
            min={kind === "money" ? 0.05 : 1}
            step={kind === "money" ? 0.05 : 1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label={`${SUBJECT_NAMES[subject]} reward ${kind === "money" ? "in dollars" : "in points"}`}
            style={{ width: 100 }}
          />
          {kind === "points" && <span>points</span>}
        </label>
        <button
          type="button"
          className="btn small"
          disabled={saving || !amount}
          onClick={() => void save({ kind, amount: Number(amount) })}
        >
          Save
        </button>
        {mine && (
          <button type="button" className="btn small secondary" disabled={saving} onClick={() => void save(null)}>
            Remove
          </button>
        )}
      </div>
      {others.length > 0 && (
        <p className="small muted" style={{ margin: "6px 0 0" }}>
          Also on offer: {others.map((o) => `${rewardText(o.kind, o.amount)} from ${o.setByName}`).join(", ")}.
        </p>
      )}
      {message && <p className={`small feedback ${message.ok ? "good" : "bad"}`}>{message.text}</p>}
    </fieldset>
  );
}

/**
 * The "Rewards" button: a parent, centre or teacher sees what a child has earned and sets what
 * finishing each subject's weekly lesson is worth, in points or money.
 */
export function RewardsButton({ learnerId, className = "btn secondary small" }: { learnerId: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [rewards, setRewards] = useState<Rewards | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    setRewards(null);
    setError(null);
    dialog.current?.showModal();
    const r = await loadRewards(learnerId);
    if (typeof r === "string") setError(r);
    else setRewards(r);
  }

  return (
    <>
      <button type="button" className={className} onClick={() => void open()}>
        🏆 Rewards
      </button>
      <dialog
        ref={dialog}
        className="preview-dialog plan-dialog"
        aria-label="Rewards"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <div className="stack">
          <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <h2 style={{ margin: 0 }}>🏆 Rewards{rewards ? ` for ${rewards.name}` : ""}</h2>
            <button type="button" className="btn secondary small" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </div>
          {!rewards && !error && <p className="muted">Loading…</p>}
          {error && <p className="feedback bad">{error}</p>}
          {rewards && (
            <>
              <p className="reward-total" style={{ margin: 0 }}>
                {rewards.name} has earned <strong>{totalsText(rewards.totals)}</strong>.
              </p>
              <p className="small muted" style={{ margin: 0 }}>
                Each weekly lesson question earns <ColourPoints />. You can add your own reward for finishing the whole week&apos;s lesson.
              </p>
              {rewards.canSet ? (
                REWARD_SUBJECTS.map((s) => (
                  <SubjectReward key={s} learnerId={learnerId} subject={s} rewards={rewards} onSaved={setRewards} />
                ))
              ) : (
                <p className="small muted">Only {rewards.name}&apos;s parent, centre or teacher can set rewards.</p>
              )}
              {rewards.earnings.length > 0 && (
                <div>
                  <h3 style={{ margin: "4px 0" }}>Earned</h3>
                  <ul className="reward-list">
                    {rewards.earnings.slice(0, 8).map((e, i) => (
                      <li key={i}>
                        {rewardText(e.kind, e.amount)} from {e.setByName} for finishing {SUBJECT_NAMES[e.subject]}, week of{" "}
                        {new Date(`${e.week}T00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
