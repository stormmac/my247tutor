"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminTabs } from "@/components/AdminTabs";
import { SetupStatus } from "@/components/SetupStatus";
import { SuniChatList, type SuniChat } from "@/components/SuniChats";
import { useAccount } from "@/components/useAccount";
import { speak } from "@/lib/tutor/speech";
import { DEFAULT_PRAISE, MAX_PRAISE_LENGTH } from "@/lib/tutor/praise";

interface Phrase {
  id: string;
  text: string;
  createdAt: string;
}

/** Admins choose what Suni says when a student gets a question right. */
export default function SuniAdminPage() {
  const account = useAccount();
  if (!account.loaded) return <p className="muted">Loading…</p>;
  if (!account.enabled) {
    return (
      <div className="stack" style={{ maxWidth: 720 }}>
        <h1>Admin</h1>
        <SetupStatus />
      </div>
    );
  }
  return (
    <div className="stack">
      <PraiseList />
      <ChatLog />
    </div>
  );
}

/** Every conversation students have had with Suni, flagged ones first to check. */
function ChatLog() {
  const [flaggedOnly, setFlaggedOnly] = useState(true);
  const [chats, setChats] = useState<SuniChat[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch(`/api/admin/suni/chats?flagged=${flaggedOnly ? 1 : 0}`);
    const body = (await res.json().catch(() => ({}))) as { chats?: SuniChat[]; error?: string };
    if (!res.ok) return setError(body.error ?? "Couldn't load Suni's conversations.");
    setChats(body.chats ?? []);
  }, [flaggedOnly]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="stack">
      <div>
        <h2 style={{ marginBottom: 4 }}>Conversations with Suni</h2>
        <p className="muted" style={{ margin: 0 }}>
          Every question students ask Suni is kept here with Suni&apos;s reply. Suni flags questions that aren&apos;t appropriate, signs a
          student may be upset, and personal details (which are hidden before saving). Flag anything else that needs a closer look.
        </p>
      </div>
      <div className="row" role="group" aria-label="Which conversations">
        <button className={`btn small ${flaggedOnly ? "" : "secondary"}`} aria-pressed={flaggedOnly} onClick={() => setFlaggedOnly(true)}>
          Flagged
        </button>
        <button className={`btn small ${flaggedOnly ? "secondary" : ""}`} aria-pressed={!flaggedOnly} onClick={() => setFlaggedOnly(false)}>
          All
        </button>
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="card">
        {chats ? (
          <SuniChatList
            chats={chats}
            showStudent
            empty={flaggedOnly ? "Nothing flagged." : undefined}
            onChange={(chat) =>
              setChats(
                (all) =>
                  all && (flaggedOnly && !chat.flag ? all.filter((c) => c.id !== chat.id) : all.map((c) => (c.id === chat.id ? chat : c))),
              )
            }
          />
        ) : (
          !error && <p className="muted">Loading conversations…</p>
        )}
      </div>
    </div>
  );
}

function PraiseList() {
  const [phrases, setPhrases] = useState<Phrase[] | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/praise");
    const body = (await res.json().catch(() => ({}))) as { phrases?: Phrase[]; error?: string };
    if (!res.ok) return setError(body.error ?? "Couldn't load Suni's phrases.");
    setPhrases(body.phrases ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/praise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!res.ok) return setError(body.error ?? "That didn't work.");
    setText("");
    await load();
  }

  async function remove(p: Phrase) {
    if (!confirm(`Stop Suni saying "${p.text}"?`)) return;
    setError(null);
    const res = await fetch(`/api/admin/praise/${p.id}`, { method: "DELETE" });
    if (!res.ok) setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "That didn't work.");
    await load();
  }

  return (
    <div className="stack">
      <AdminTabs current="suni" />
      <div>
        <h1>What Suni says</h1>
        <p className="muted" style={{ margin: 0 }}>
          When a student gets a question right, Suni says one of these out loud, picked at random and never the same twice in a row.
        </p>
      </div>
      <form className="card stack" onSubmit={add} style={{ maxWidth: 640 }}>
        <label htmlFor="new-praise" style={{ margin: 0 }}>
          Add something for Suni to say
        </label>
        <div className="row" style={{ flexWrap: "nowrap" }}>
          <input
            id="new-praise"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_PRAISE_LENGTH}
            placeholder="For example: You're on fire!"
            required
          />
          {text.trim() && (
            <button type="button" className="btn secondary small" onClick={() => speak(text)}>
              Hear it
            </button>
          )}
          <button className="btn small" disabled={busy}>
            {busy ? "Adding…" : "Add"}
          </button>
        </div>
        {error && (
          <div className="feedback bad" role="alert">
            {error}
          </div>
        )}
      </form>
      <div className="card table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Phrase</th>
              <th>Added</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(phrases ?? []).map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.text}</strong>
                </td>
                <td>{new Date(p.createdAt).toLocaleDateString("en-AU")}</td>
                <td>
                  <div className="row" style={{ gap: 6 }}>
                    <button className="btn secondary small" onClick={() => speak(p.text)}>
                      Hear it
                    </button>
                    <button className="btn secondary small" onClick={() => void remove(p)}>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {DEFAULT_PRAISE.map((t) => (
              <tr key={t} className="muted">
                <td>{t}</td>
                <td>Built in</td>
                <td>
                  <button className="btn secondary small" onClick={() => speak(t)}>
                    Hear it
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!phrases && !error && <p className="muted">Loading phrases…</p>}
      <p className="small muted">
        Suni adds the student&apos;s first name, so &quot;Excellent!&quot; becomes &quot;Excellent, Bob!&quot;. If they needed a second go,
        Suni adds &quot;You got it on your second go.&quot;
      </p>
    </div>
  );
}
