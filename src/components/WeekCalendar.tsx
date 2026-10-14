"use client";

import Link from "next/link";
import { CLASS_SUBJECTS, formatDuration, formatTime, minutesOf, WEEKDAYS, type ClassTime } from "@/lib/auth/rules";

export interface CalendarClass {
  id: string;
  name: string;
  yearLevel: number;
  subject: keyof typeof CLASS_SUBJECTS;
  teacherName: string | null;
  students: number;
  times: ClassTime[];
}

interface Session {
  cls: CalendarClass;
  colour: number;
  time: ClassTime;
  from: number;
  to: number;
  lane: number;
  lanes: number;
}

const PX_PER_MINUTE = 1.4;

/** Each day's sessions, with side-by-side lanes for classes that overlap. */
function sessionsByDay(classes: CalendarClass[]): Session[][] {
  const days: Session[][] = WEEKDAYS.map(() => []);
  classes.forEach((cls, colour) => {
    for (const time of cls.times) {
      const from = minutesOf(time.start);
      days[time.weekday - 1].push({ cls, colour: colour % 6, time, from, to: from + time.minutes, lane: 0, lanes: 1 });
    }
  });
  for (const day of days) {
    day.sort((a, b) => a.from - b.from || a.to - b.to);
    // Group sessions that overlap, then give each a lane within its group.
    let group: Session[] = [];
    let groupEnd = -1;
    const close = () => group.forEach((s) => (s.lanes = Math.max(...group.map((g) => g.lane)) + 1));
    for (const s of day) {
      if (s.from >= groupEnd) {
        close();
        group = [];
      }
      const ends: number[] = [];
      for (const g of group) ends[g.lane] = Math.max(ends[g.lane] ?? 0, g.to);
      let lane = 0;
      while (ends[lane] !== undefined && ends[lane] > s.from) lane++;
      s.lane = lane;
      group.push(s);
      groupEnd = Math.max(groupEnd, s.to);
    }
    close();
  }
  return days;
}

/** A week of classes: a grid of days and hours on a wide screen, and a list of days on a phone. */
export function WeekCalendar({ classes }: { classes: CalendarClass[] }) {
  const days = sessionsByDay(classes);
  const all = days.flat();
  if (!all.length) {
    return (
      <p className="muted" style={{ margin: 0 }}>
        No class times yet. Edit a class to add when it meets.
      </p>
    );
  }
  const first = Math.floor(Math.min(...all.map((s) => s.from)) / 60) * 60;
  const last = Math.ceil(Math.max(...all.map((s) => s.to)) / 60) * 60;
  const hours = Array.from({ length: (last - first) / 60 }, (_, i) => first + i * 60);
  // Sunday only shows when something is on.
  const shown = WEEKDAYS.map((name, i) => ({ name, i })).filter(({ i }) => i < 6 || days[i].length);

  return (
    <>
      <div className="week-cal" style={{ gridTemplateColumns: `56px repeat(${shown.length}, minmax(0, 1fr))` }}>
        <div />
        {shown.map(({ name }) => (
          <div key={name} className="week-cal-day">
            {name.slice(0, 3)}
          </div>
        ))}
        <div className="week-cal-hours" style={{ height: (last - first) * PX_PER_MINUTE }}>
          {hours.map((h) => (
            <span key={h} style={{ top: (h - first) * PX_PER_MINUTE }}>
              {formatTime(`${String(h / 60).padStart(2, "0")}:00`).replace(":00", "")}
            </span>
          ))}
        </div>
        {shown.map(({ name, i }) => (
          <div key={name} className="week-cal-col" style={{ height: (last - first) * PX_PER_MINUTE }}>
            {hours.map((h) => (
              <div key={h} className="week-cal-line" style={{ top: (h - first) * PX_PER_MINUTE }} />
            ))}
            {days[i].map((s) => (
              <Link
                key={`${s.cls.id}-${s.time.start}`}
                href={`/classes/${s.cls.id}`}
                className={`week-cal-class cal-c${s.colour}`}
                style={{
                  top: (s.from - first) * PX_PER_MINUTE,
                  height: s.time.minutes * PX_PER_MINUTE - 2,
                  left: `${(s.lane / s.lanes) * 100}%`,
                  width: `${100 / s.lanes}%`,
                }}
                title={`${s.cls.name}: ${name} ${formatTime(s.time.start)} to ${formatTime(endOf(s))}`}
              >
                <strong>{s.cls.name}</strong>
                <span>
                  {formatTime(s.time.start)}–{formatTime(endOf(s))}
                </span>
                {s.cls.teacherName && <span>{s.cls.teacherName}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="week-list">
        {shown
          .filter(({ i }) => days[i].length)
          .map(({ name, i }) => (
            <div key={name} className="week-list-day">
              <h3>{name}</h3>
              {days[i].map((s) => (
                <Link key={`${s.cls.id}-${s.time.start}`} href={`/classes/${s.cls.id}`} className={`week-list-class cal-c${s.colour}`}>
                  <span className="week-list-time">
                    {formatTime(s.time.start)}–{formatTime(endOf(s))}
                  </span>
                  <span>
                    <strong>{s.cls.name}</strong>
                    <span className="small">
                      {" "}
                      {formatDuration(s.time.minutes)}
                      {s.cls.teacherName ? `, ${s.cls.teacherName}` : ""}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

function endOf(s: Session): string {
  const end = s.to % (24 * 60);
  return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
}
