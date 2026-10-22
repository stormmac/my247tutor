"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MOOD_FACES, type GrownUpNote, type Mood, type NoteKind } from "@/lib/tutor/memory";

interface Checkin {
  at: string;
  mood: Mood | null;
  focus: string | null;
}

const KIND_LABELS: Record<NoteKind, { label: string; tone: string }> = {
  concern: { label: "Worth a chat", tone: "bad" },
  feelings: { label: "Feelings", tone: "warn" },
  learning: { label: "Finding tricky", tone: "warn" },
  progress: { label: "Progress", tone: "good" },
};

const day = (at: number | string) => new Date(at).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

/** What Suni thinks a child's parent or teacher should know from their chats, and how the child has said they feel. */
export function SuniNotes({ learnerId, name }: { learnerId?: string; name: string }) {
  const [data, setData] = useState<{ notes: GrownUpNote[]; checkins: Checkin[] } | null>(null);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (!learnerId) return;
    setData(null);
    void fetch(`/api/suni/notes?learner=${learnerId}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ notes: GrownUpNote[]; checkins: Checkin[] }>) : null))
      .then(setData)
      .catch(() => undefined);
  }, [learnerId]);

  const feelings = data?.checkins.filter((c) => c.mood) ?? [];
  if (!data || (!data.notes.length && !feelings.length)) return null;
  const notes = showAll ? data.notes : data.notes.slice(0, 5);

  return (
    <div className="card stack suni-notes">
      <h2 style={{ margin: 0 }}>🐝 From Suni</h2>
      <p className="small muted" style={{ margin: 0 }}>
        What Suni thinks you should know about {name}, from their chats and how they said they felt when they started.
      </p>
      {feelings.length > 0 && (
        <div className="stack" style={{ gap: 6 }}>
          <strong className="small">How {name} has been feeling</strong>
          <div className="suni-moods">
            {feelings.slice(0, 14).map((c) => (
              <span key={c.at} className="suni-mood-day" title={c.focus ? `Wanted to work on: ${c.focus}` : undefined}>
                <span aria-hidden>{MOOD_FACES[c.mood!].face}</span>
                <span className="small">{MOOD_FACES[c.mood!].label}</span>
                <span className="small muted">{day(c.at)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {notes.length > 0 && (
        <ul className="suni-note-list">
          {notes.map((n) => (
            <li key={`${n.at}-${n.text}`}>
              <span className={`pill ${KIND_LABELS[n.kind].tone}`}>{KIND_LABELS[n.kind].label}</span> {n.text}{" "}
              <span className="small muted">{day(n.at)}</span>
            </li>
          ))}
        </ul>
      )}
      {data.notes.length > 5 && (
        <button type="button" className="btn small secondary no-print" onClick={() => setShowAll((s) => !s)}>
          {showAll ? "Show fewer" : `Show all ${data.notes.length}`}
        </button>
      )}
    </div>
  );
}

/** For a teacher or centre: Suni's notes from the last week, across their students. */
export function SuniStudentNotes() {
  const [students, setStudents] = useState<{ learnerId: string; name: string; notes: GrownUpNote[] }[] | null>(null);
  useEffect(() => {
    void fetch("/api/suni/notes")
      .then((res) => (res.ok ? (res.json() as Promise<{ students: { learnerId: string; name: string; notes: GrownUpNote[] }[] }>) : null))
      .then((body) => setStudents(body?.students ?? null))
      .catch(() => undefined);
  }, []);
  if (!students?.length) return null;
  return (
    <div className="card stack suni-notes">
      <h2 style={{ margin: 0 }}>🐝 From Suni this week</h2>
      <p className="small muted" style={{ margin: 0 }}>
        What Suni thinks you should know about your students, from their chats and check-ins.
      </p>
      {students.map((s) => (
        <div key={s.learnerId} className="stack" style={{ gap: 4 }}>
          <strong>{s.name}</strong>
          <ul className="suni-note-list">
            {s.notes.slice(0, 3).map((n) => (
              <li key={`${n.at}-${n.text}`}>
                <span className={`pill ${KIND_LABELS[n.kind].tone}`}>{KIND_LABELS[n.kind].label}</span> {n.text}{" "}
                <span className="small muted">{day(n.at)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="small muted" style={{ margin: 0 }}>
        Open a student from their class to read everything, including their chats with Suni. <Link href="/learn">Learn as a student</Link>{" "}
        to see what they see.
      </p>
    </div>
  );
}
