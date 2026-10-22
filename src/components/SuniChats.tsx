"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatFlag = "wellbeing" | "inappropriate" | "personal_info" | "grown_up" | "technical";

export interface SuniChat {
  id: string;
  conversationId: string;
  learnerId: string | null;
  studentName: string;
  yearLevel: number;
  screen: string | null;
  question: string;
  reply: string;
  flag: ChatFlag | null;
  flagReason: string | null;
  createdAt: string;
  account?: { name: string; email: string } | null;
}

export const FLAG_LABELS: Record<ChatFlag, string> = {
  wellbeing: "Wellbeing",
  inappropriate: "Not appropriate",
  personal_info: "Personal details",
  grown_up: "Flagged by a grown-up",
  technical: "Technical problem",
};

/** Flags or clears a message, returning the updated one (or an error message). */
async function changeFlag(chat: SuniChat): Promise<SuniChat | string> {
  const res = await fetch(`/api/suni/chats/${chat.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ flagged: !chat.flag }),
  });
  const body = (await res.json().catch(() => ({}))) as { chat?: SuniChat; error?: string };
  return res.ok && body.chat ? body.chat : (body.error ?? "Couldn't change the flag.");
}

/** Messages grouped into conversations, newest conversation first and each read top to bottom. */
function conversations(chats: SuniChat[]): SuniChat[][] {
  const groups = new Map<string, SuniChat[]>();
  for (const chat of chats) groups.set(chat.conversationId, [...(groups.get(chat.conversationId) ?? []), chat]);
  return [...groups.values()].map((g) => [...g].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
}

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-AU", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** Conversations with Suni, with flagged messages marked and a button to flag or clear each one. */
export function SuniChatList({
  chats,
  onChange,
  showStudent,
  empty = "No conversations with Suni yet.",
}: {
  chats: SuniChat[];
  onChange: (chat: SuniChat) => void;
  /** Admins see which child and account each conversation is from. */
  showStudent?: boolean;
  empty?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  if (!chats.length) return <p className="muted small">{empty}</p>;

  async function toggle(chat: SuniChat) {
    const result = await changeFlag(chat);
    if (typeof result === "string") setError(result);
    else {
      setError(null);
      onChange(result);
    }
  }

  return (
    <div className="stack">
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      {conversations(chats).map((group) => (
        <div key={group[0].conversationId} className="suni-log stack">
          <div className="small muted">
            {when(group[0].createdAt)}
            {showStudent && (
              <>
                {" · "}
                <strong>{group[0].studentName}</strong> (Year {group[0].yearLevel})
                {group[0].account ? ` · ${group[0].account.name}, ${group[0].account.email}` : " · free trial, no account"}
              </>
            )}
            {group[0].screen && <div>On screen: {group[0].screen}</div>}
          </div>
          {group.map((chat) => (
            <div key={chat.id} className={`suni-log-item ${chat.flag ? "flagged" : ""}`}>
              <div className="row spread" style={{ alignItems: "flex-start" }}>
                <div className="stack" style={{ gap: 4, flex: 1, minWidth: 0 }}>
                  <div>
                    <strong>{chat.studentName}:</strong> {chat.question}
                  </div>
                  <div className="muted">
                    <strong>Suni:</strong> {chat.reply || "(no reply)"}
                  </div>
                  {chat.flag && (
                    <div className="small">
                      <span className="pill bad">{FLAG_LABELS[chat.flag]}</span> {chat.flagReason}
                    </div>
                  )}
                </div>
                <button className="btn secondary small" onClick={() => void toggle(chat)}>
                  {chat.flag ? "Clear flag" : "Flag"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** A child's conversations with Suni, on their progress report. Hidden when there's no account to read them from. */
export function SuniChatsReport({ learnerId, name }: { learnerId?: string; name: string }) {
  const [chats, setChats] = useState<SuniChat[] | null>(null);
  const [onlyFlagged, setOnlyFlagged] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(async () => {
    if (!learnerId) return;
    const res = await fetch(`/api/suni/chats?learner=${learnerId}`).catch(() => null);
    const body = res?.ok ? ((await res.json().catch(() => ({}))) as { chats?: SuniChat[] }) : null;
    setChats(body?.chats ?? null);
  }, [learnerId]);
  useEffect(() => {
    void load();
  }, [load]);

  if (!chats) return null;
  const flagged = chats.filter((c) => c.flag);
  const listed = onlyFlagged ? flagged : chats;
  const groups = conversations(listed);
  const shown = showAll ? listed : groups.slice(0, 5).flat();

  return (
    <div className="card stack" style={flagged.length ? { borderColor: "var(--bad)" } : undefined}>
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Chats with Suni</h2>
        {flagged.length > 0 && <span className="pill bad">{flagged.length} flagged</span>}
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        Everything {name} has asked Suni, and Suni&apos;s replies. Suni flags anything that isn&apos;t appropriate, anything that suggests{" "}
        {name} may be upset, and personal details (which Suni hides). You can flag a message yourself too.
      </p>
      {chats.length > 0 && (
        <div className="row small">
          <label className="row" style={{ gap: 6 }}>
            <input type="checkbox" checked={onlyFlagged} onChange={(e) => setOnlyFlagged(e.target.checked)} /> Only flagged messages
          </label>
        </div>
      )}
      <SuniChatList
        chats={shown}
        empty={onlyFlagged ? "Nothing flagged." : undefined}
        onChange={(chat) => setChats((all) => all && all.map((c) => (c.id === chat.id ? chat : c)))}
      />
      {!showAll && groups.length > 5 && (
        <button className="btn secondary small" onClick={() => setShowAll(true)}>
          Show all {groups.length} conversations
        </button>
      )}
    </div>
  );
}

/**
 * The Parents page's Chats with Suni button, showing how many messages are flagged. It opens the
 * conversations in a popup. Hidden when there's no account to read them from.
 */
export function SuniChatsButton({ learnerId, name }: { learnerId?: string; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [chats, setChats] = useState<SuniChat[] | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!learnerId) return;
    void fetch(`/api/suni/chats?learner=${learnerId}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ chats?: SuniChat[] }>) : null))
      .then((body) => setChats(body?.chats ?? null))
      .catch(() => undefined);
  }, [learnerId, open]);
  if (!chats) return null;
  const flagged = chats.filter((c) => c.flag).length;
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`btn small no-print ${flagged ? "" : "secondary"}`}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        💬 Chats with Suni{flagged > 0 && ` · ${flagged} flagged`}
      </button>
      <dialog
        ref={dialog}
        className="preview-dialog"
        aria-label={`${name}'s chats with Suni`}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div className="stack">
          <div className="row spread">
            <span />
            <button type="button" className="btn secondary small" onClick={close}>
              Close
            </button>
          </div>
          {open && <SuniChatsReport learnerId={learnerId} name={name} />}
        </div>
      </dialog>
    </>
  );
}
