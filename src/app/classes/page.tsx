"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WeekCalendar, type CalendarClass } from "@/components/WeekCalendar";
import { CLASS_SUBJECTS, describeTime } from "@/lib/auth/rules";

type CentreClass = CalendarClass;

/** A teacher's classes at their tutoring centre, or every class for the centre itself. */
export default function ClassesPage() {
  const [data, setData] = useState<{ centre: string; classes: CentreClass[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void fetch("/api/classes")
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (r.ok) setData(body);
        else setError(body.error ?? "Couldn't load your classes.");
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, []);

  if (error) return <div className="feedback bad">{error}</div>;
  if (!data) return <p className="muted">Loading…</p>;
  return (
    <div className="stack">
      <div>
        <h1>Your classes</h1>
        {data.centre && (
          <p className="muted" style={{ margin: 0 }}>
            {data.centre}
          </p>
        )}
      </div>
      {data.classes.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>You don&apos;t have any classes yet. Your tutoring centre gives you classes from their Centre page.</p>
        </div>
      ) : (
        <>
          <div className="card stack">
            <h2 style={{ margin: 0 }}>Timetable</h2>
            <WeekCalendar classes={data.classes} />
          </div>
          <div className="grid grid-3">
            {data.classes.map((c) => (
              <Link key={c.id} href={`/classes/${c.id}`} className="card class-card">
                <h2 style={{ margin: 0 }}>{c.name}</h2>
                <p className="muted" style={{ margin: "6px 0 0" }}>
                  Year {c.yearLevel}, {CLASS_SUBJECTS[c.subject]}
                </p>
                <p style={{ margin: "6px 0 0" }}>
                  {c.students} {c.students === 1 ? "student" : "students"}
                  {c.teacherName ? `, with ${c.teacherName}` : ""}
                </p>
                {c.times.map((t) => (
                  <p key={`${t.weekday} ${t.start}`} className="small muted" style={{ margin: "4px 0 0" }}>
                    🗓 {describeTime(t)}
                  </p>
                ))}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
