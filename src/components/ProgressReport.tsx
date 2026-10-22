"use client";

import Link from "next/link";
import { useState } from "react";
import { curriculumOf, frameworkName, localeOf, skillStandard, subjectName, yearName, yearWord } from "@/lib/curriculum/curricula";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { getSkill, skillsFor } from "@/lib/curriculum/skills";
import type { Skill, Subject } from "@/lib/curriculum/types";
import { SUBTOPICS } from "@/lib/content/tree";
import { recentAccuracy, skillState, type AttemptRecord, type LearnerProfile } from "@/lib/learner/model";
import {
  LEVEL_NAMES,
  standing as assessmentStanding,
  summarySentence,
  topicResults,
  type AssessmentRecord,
  type Level,
} from "@/lib/learner/assessment";
import { attemptResult, attemptTopic, resultsByTopic, type AttemptResult, type AttemptTopic } from "@/lib/learner/results";
import {
  currentSightLevel,
  currentUnit,
  formatReadingAge,
  READING_AGE_CUTOFF,
  readingOf,
  readingYear,
  setEnrolled,
  sightLevelsDone,
  unitsDone,
} from "@/lib/phonics/progress";
import { SIGHT_LEVELS } from "@/lib/phonics/sightWords";
import { describeTables, SPEEDS, tablesOf, trickyFacts } from "@/lib/tables/game";
import { UNITS } from "@/lib/phonics/sequence";
import { COMPETENCY_LABELS, competency, recommendedPlan, subjectLevel, type Competency, type Standing } from "@/lib/learner/report";
import { SuniChatsReport } from "@/components/SuniChats";
import { SuniNotes } from "@/components/SuniNotes";
import { SetWorkCard } from "@/components/SetWork";
import { programFor, streamSubtopics } from "@/lib/content/program";
import { focusStreams, MOVE_DOWN_MARK, MOVE_UP_MARK, PASS_MARK, STREAM_NAMES } from "@/lib/learner/program";

/** The alert shown when something a child wrote suggests they may be upset or unsafe. */
export function WellbeingAlert({
  profile,
  onChange,
}: {
  profile: LearnerProfile;
  onChange?: (update: (p: LearnerProfile) => LearnerProfile) => void;
}) {
  if (!profile.wellbeingFlags.length) return null;
  return (
    <div className="card" style={{ borderColor: "var(--bad)" }}>
      <h2>Please check in with {profile.name}</h2>
      <p>
        Something {profile.name} wrote suggested they may be upset or unsafe. The tutor responded kindly and shared Kids Helpline (1800 55
        1800).
      </p>
      <ul>
        {profile.wellbeingFlags
          .slice(-5)
          .reverse()
          .map((f, i) => (
            <li key={i}>
              <span className="muted small">{new Date(f.at).toLocaleString("en-AU")}:</span> "{f.message}"
            </li>
          ))}
      </ul>
      {onChange && (
        <button className="btn secondary small" onClick={() => onChange((p) => ({ ...p, wellbeingFlags: [] }))}>
          I've followed up
        </button>
      )}
    </div>
  );
}

/** Everything else on the progress report, folded away under the summary. */
export function FullReport({
  profile,
  onChange,
}: {
  profile: LearnerProfile;
  onChange?: (update: (p: LearnerProfile) => LearnerProfile) => void;
}) {
  return (
    <details className="full-report">
      <summary>Full report: starting assessments, reading, times tables and every topic</summary>
      <div className="stack" style={{ marginTop: 12 }}>
        <ProgressReport profile={profile} onChange={onChange} detailOnly />
      </div>
    </details>
  );
}

/**
 * A learner's progress report: this week's practice, the starting assessments, recent questions,
 * results by topic, where they sit against the NSW syllabus, and writing feedback. Parents see it
 * for their children, and tutoring centres and teachers for their students. Without `onChange`
 * it's read-only.
 */
export function ProgressReport({
  profile,
  onChange,
  detailOnly,
}: {
  profile: LearnerProfile;
  onChange?: (update: (p: LearnerProfile) => LearnerProfile) => void;
  /** Under the Parents page's summary, which already shows the alert, chats, totals and set work. */
  detailOnly?: boolean;
}) {
  const week = Date.now() - 7 * 86_400_000;
  const thisWeek = profile.history.filter((h) => h.at >= week);

  return (
    <>
      {!detailOnly && (
        <>
          <WellbeingAlert profile={profile} onChange={onChange} />
          <SuniNotes learnerId={profile.id} name={profile.name} />
          <SuniChatsReport learnerId={profile.id} name={profile.name} />

          <div className="grid grid-3">
            <div className="card">
              <div className="muted small">Questions this week</div>
              <div style={{ fontSize: 32, fontWeight: 800 }}>{thisWeek.length}</div>
            </div>
            <div className="card">
              <div className="muted small">Correct first try this week</div>
              <div style={{ fontSize: 32, fontWeight: 800 }}>
                {thisWeek.length ? `${Math.round((thisWeek.filter((h) => h.correct).length / thisWeek.length) * 100)}%` : "–"}
              </div>
            </div>
            <div className="card">
              <div className="muted small">Writing pieces</div>
              <div style={{ fontSize: 32, fontWeight: 800 }}>{profile.writing.length}</div>
            </div>
          </div>

          <SetWorkCard profile={profile} />
        </>
      )}

      <StartingReport
        profile={profile}
        subject="maths"
        title={subjectName("maths", curriculumOf(profile.curriculum))}
        onRedo={onChange && (() => onChange((p) => ({ ...p, placementDone: { ...p.placementDone, maths: false } })))}
      />
      <StartingReport
        profile={profile}
        subject="english"
        title="English"
        onRedo={onChange && (() => onChange((p) => ({ ...p, placementDone: { ...p.placementDone, english: false } })))}
      />

      {readingYear(profile.yearLevel) && <ReadingReport profile={profile} onChange={onChange} />}
      <TablesReport profile={profile} />
      <RecentQuestions profile={profile} />
      <TopicResults profile={profile} />

      {/* The skill map covers Years 1–6; Years 7 and 8 are shown by topic above. */}
      {profile.yearLevel <= 6 && (
        <>
          <SubjectReport profile={profile} subject="maths" title={curriculumOf(profile.curriculum) === "us" ? "Math" : "Mathematics"} />
          <SubjectReport profile={profile} subject="english" title="English" />
        </>
      )}

      <p className="muted small">
        Levels and plans are estimates from {profile.name}'s practice in my247tutor, not a school assessment. They get more accurate the
        more {profile.name} practises.
      </p>

      {profile.writing.length > 0 && (
        <div className="card">
          <h2>Recent writing feedback</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Task</th>
                <th>Next step</th>
              </tr>
            </thead>
            <tbody>
              {profile.writing
                .slice(-5)
                .reverse()
                .map((w, i) => (
                  <tr key={i}>
                    <td>{new Date(w.at).toLocaleDateString("en-AU")}</td>
                    <td>{getSkill(w.skillId).title}</td>
                    <td>{w.summary}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const STANDING: Record<Standing, { label: (year: string) => string; pill: string }> = {
  ahead: { label: (y) => `Ahead of ${y}`, pill: "good" },
  "on track": { label: (y) => `On track for ${y}`, pill: "good" },
  "needs support": { label: (y) => `Working towards ${y}`, pill: "warn" },
  "not enough evidence": { label: () => "Needs more practice to tell", pill: "" },
};

const COMPETENCY_PILL: Record<Competency, string> = {
  "not started": "",
  beginning: "bad",
  developing: "warn",
  competent: "good",
  mastered: "good",
};

/** Where to practise a skill: its page in the topic tree, or the writing page. */
function practiceHref(skill: Skill): string {
  if (skill.practice === "writing") return `/learn/writing?skill=${skill.id}`;
  const sub = SUBTOPICS.find((s) => s.skill_id === skill.id);
  return sub ? `/learn/${skill.subject}/topics/${sub.id}` : `/learn/${skill.subject}`;
}

function SubjectReport({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const level = subjectLevel(profile, subject);
  const plan = recommendedPlan(profile, subject);
  const standing = STANDING[level.standing];
  const skills = skillsFor(subject);
  const curriculum = curriculumOf(profile.curriculum);
  const year = (y: number) => yearName(y, curriculum);
  // The skill's code in the child's curriculum: its NESA outcome, or the Common Core standard or National Curriculum heading it's filed under.
  const code = (skill: Skill) => {
    const standard = skillStandard(skill.id, curriculum);
    return standard ? { code: standard, codeVerified: true } : getOutcome(skill.outcome);
  };

  return (
    <div className="card stack report">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span className={`pill ${standing.pill}`}>{standing.label(year(profile.yearLevel))}</span>
      </div>

      <div>
        <div className="muted small">Curriculum level</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>
          {level.standing === "not enough evidence"
            ? "Not enough practice yet"
            : level.beyondYear6
              ? `Working beyond ${year(6)}`
              : `Working at about ${year(level.workingAtYear)} level`}
        </div>
        <div className="grid grid-2" style={{ marginTop: 12 }}>
          {level.stages.map((s) => (
            <div key={s.stage}>
              <div className="small">
                {curriculum === "us"
                  ? `Grades ${s.stage === 2 ? "3–4" : "5–6"}`
                  : curriculum === "uk"
                    ? `Years ${s.stage === 2 ? "3–4" : "5–6"}`
                    : `Stage ${s.stage} (Years ${s.stage === 2 ? "3–4" : "5–6"})`}
                : {s.secure} of {s.total} skills competent or better
              </div>
              <div className="progress" style={{ marginTop: 6 }}>
                <div style={{ width: `${Math.round((s.secure / s.total) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Recommended plan</h3>
        {plan.length ? (
          <ol className="plan">
            {plan.map((step) => (
              <li key={step.skill.id}>
                <div className="row spread">
                  <div>
                    <strong>{step.skill.title}</strong> <span className="muted small">{code(step.skill).code}</span>
                    <div className="small muted">{step.why}</div>
                  </div>
                  <Link className="btn secondary small no-print" href={practiceHref(step.skill)}>
                    Practise
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted">Nothing to recommend yet.</p>
        )}
        <p className="small muted">
          About 10 questions on the first step, a few times a week, works well. The practice page follows this plan automatically.
        </p>
      </div>

      <div>
        <h3>Competency in each skill</h3>
        <div className="table-scroll">
          <table className="skill-table">
            <thead>
              <tr>
                <th>{{ nsw: "Outcome", us: "Standard", uk: "Curriculum" }[curriculum]}</th>
                <th>Skill</th>
                <th>Competency</th>
                <th className="accuracy">Recent accuracy</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => {
                const o = code(skill);
                const c = competency(profile, skill);
                const accuracy = recentAccuracy(profile, skill.id);
                return (
                  <tr key={skill.id}>
                    <td>
                      <strong>{o.code}</strong>
                      {!o.codeVerified && <span className="muted small"> *</span>}
                      {curriculum === "nsw" && <div className="muted small">Stage {skill.stage}</div>}
                    </td>
                    <td>
                      {skill.title}
                      <div className="muted small skill-desc">{skill.description}</div>
                    </td>
                    <td>
                      <span className={`pill ${COMPETENCY_PILL[c]}`}>{COMPETENCY_LABELS[c]}</span>
                      {skillState(profile, skill.id).placed && <div className="muted small">From the starting check</div>}
                    </td>
                    <td className="accuracy">
                      {skill.practice === "writing" ? "–" : accuracy === null ? "–" : `${Math.round(accuracy * 100)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {skills.some((s) => !code(s).codeVerified) && (
          <p className="muted small" style={{ marginTop: 8 }}>
            * Outcome code still being confirmed against the NESA syllabus.
          </p>
        )}
      </div>
    </div>
  );
}

const ASSESSMENT_PILL = { ahead: "good", "on track": "good", below: "warn", "well below": "bad" } as const;
const ASSESSMENT_LABEL = { ahead: "Ahead", "on track": "On track", below: "A little behind", "well below": "Well behind" } as const;

/** The report from the starting assessment: where the child is working, by year and level, and by topic. */
function StartingReport({
  profile,
  subject,
  title,
  onRedo,
}: {
  profile: LearnerProfile;
  subject: Subject;
  title: string;
  onRedo?: () => void;
}) {
  const record = profile.assessments?.find((a) => a.subject === subject);
  const [showQuestions, setShowQuestions] = useState(false);
  if (!record) {
    return (
      <div className="card">
        <h2 style={{ margin: 0 }}>Starting assessment: {title}</h2>
        <p className="muted" style={{ margin: "6px 0 0" }}>
          {profile.placementDone[subject]
            ? `${profile.name} did the older quick check, so there's no full report yet.`
            : `Not done yet. It starts the first time ${profile.name} opens ${title}.`}
        </p>
        {profile.placementDone[subject] && onRedo && (
          <button className="btn secondary small no-print" style={{ marginTop: 12 }} onClick={onRedo}>
            Do the starting assessment
          </button>
        )}
      </div>
    );
  }
  const s = assessmentStanding(record);
  const topics = topicResults(record);
  const strong = topics.filter((t) => t.right === t.total);
  const work = topics.filter((t) => t.right < t.total);
  const right = record.answers.filter((a) => a.correct).length;
  const curriculum = curriculumOf(profile.curriculum);
  return (
    <div className="card stack report">
      <div className="row spread">
        <div>
          <h2 style={{ margin: 0 }}>Starting assessment: {title}</h2>
          <div className="muted small">
            {new Date(record.at).toLocaleDateString(localeOf(curriculum), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {record.answers.length} questions, {right} right · started at {yearName(record.startYear, curriculum)}, level 1
          </div>
        </div>
        <span className={`pill ${ASSESSMENT_PILL[s]}`}>
          {ASSESSMENT_LABEL[s]} for {yearName(record.yearLevel, curriculum)}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 18 }}>{summarySentence(record, profile.name)}</p>
      <LevelLadder record={record} />
      <WorkProgramReport profile={profile} subject={subject} />
      <div className="grid grid-2">
        <div>
          <h3>Strengths</h3>
          {strong.length ? (
            <ul className="tight">
              {strong.map((t) => (
                <li key={t.topic}>{t.topic}</li>
              ))}
            </ul>
          ) : (
            <p className="muted small">None stood out yet.</p>
          )}
        </div>
        <div>
          <h3>To work on</h3>
          {work.length ? (
            <ul className="tight">
              {work.map((t) => (
                <li key={t.topic}>
                  {t.topic}{" "}
                  <span className="muted small">
                    ({t.right} of {t.total} right)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted small">Nothing was missed.</p>
          )}
        </div>
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        Levels go from 1 (very easy) to 5 (very hard) within each {yearWord(curriculum)}. Questions were picked at random from the{" "}
        {frameworkName(curriculum)} topics for each {yearWord(curriculum)}, so this is a snapshot, not a school assessment.
      </p>
      <div className="row no-print">
        <button className="btn secondary small" onClick={() => setShowQuestions((v) => !v)}>
          {showQuestions ? "Hide the questions" : "See every question"}
        </button>
        {onRedo && (
          <button
            className="btn secondary small"
            onClick={() => {
              if (confirm(`Ask ${profile.name} to do the ${title} starting assessment again next time?`)) onRedo();
            }}
          >
            Do it again
          </button>
        )}
      </div>
      {showQuestions && (
        <div className="table-scroll">
          <table className="results-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Question</th>
                <th>{profile.name}&apos;s answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {record.answers.map((a, i) => (
                <tr key={i}>
                  <td className="small">
                    Year {a.year}, level {a.level}
                    <div className="muted small">{a.topic}</div>
                  </td>
                  <td data-label="Question">{a.question ?? "–"}</td>
                  <td data-label="Answer">
                    {a.answer ?? "–"}
                    {a.rightAnswer && <div className="muted small">Right answer: {a.rightAnswer}</div>}
                  </td>
                  <td>
                    <span className={`pill ${a.correct ? "good" : "bad"}`}>{a.correct ? "Right" : "Not right"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * The work program from the assessment: the year each stream is at, how much of it is passed, and
 * which streams the lessons are on now.
 */
function WorkProgramReport({ profile, subject }: { profile: LearnerProfile; subject: Subject }) {
  const program = programFor(profile, subject);
  if (!program) return null;
  const curriculum = curriculumOf(profile.curriculum);
  const focus = new Set(focusStreams(program, profile.yearLevel).map((s) => s.stream));
  const year = (y: number) => yearName(y, curriculum);
  return (
    <div className="stack" style={{ gap: 6 }}>
      <h3 style={{ margin: 0 }}>Work program</h3>
      <p className="small muted" style={{ margin: 0 }}>
        It started at {year(program.startYear)}.{" "}
        {subject === "maths"
          ? `The lessons work on the two areas ${profile.name} found hardest in the check.`
          : `The lessons work on ${profile.name}'s weakest English topics.`}{" "}
        Over {MOVE_UP_MARK * 100}% right first go in an activity moves that area up a {yearWord(curriculum)}, and under{" "}
        {MOVE_DOWN_MARK * 100}% moves it down a {yearWord(curriculum)}. An activity is passed with over {PASS_MARK * 100}%, and an area also
        moves up once all its topics for that {yearWord(curriculum)} are passed.
      </p>
      <div className="table-scroll">
        <table className="results-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>In the check</th>
              <th>Working at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {program.streams.map((s) => {
              const caughtUp = s.year > profile.yearLevel;
              const total = streamSubtopics(subject, s.stream, s.year, curriculum).length;
              return (
                <tr key={s.stream}>
                  <td>{STREAM_NAMES[s.stream]}</td>
                  <td data-label="In the check">{s.asked ? `${s.right} of ${s.asked} right` : "Not asked"}</td>
                  <td data-label="Working at">
                    {caughtUp ? `Caught up to ${year(profile.yearLevel)}` : `${year(s.year)}, ${s.passed.length} of ${total} passed`}
                  </td>
                  <td>
                    <span className={`pill ${caughtUp ? "good" : focus.has(s.stream) ? "warn" : ""}`}>
                      {caughtUp ? "Done" : focus.has(s.stream) ? "Working on now" : "Coming up"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Each year and level the check reached: passed, where it stopped, or not reached. */
function LevelLadder({ record }: { record: AssessmentRecord }) {
  const years = [...new Set(record.answers.map((a) => a.year))];
  const lastYear = Math.min(6, record.yearLevel + 1);
  for (let y = record.startYear; y <= lastYear; y++) if (!years.includes(y as never)) years.push(y as never);
  years.sort();
  const levels: Level[] = [1, 3, 5];
  const passed = (year: number, level: number) =>
    record.reached !== null && (year < record.reached.year || (year === record.reached.year && level <= record.reached.level));
  const stopped = (year: number, level: number) => record.stoppedAt?.year === year && record.stoppedAt.level === level;
  return (
    <div className="table-scroll">
      <table className="ladder">
        <thead>
          <tr>
            <th />
            {levels.map((l) => (
              <th key={l}>
                Level {l}
                <div className="muted small">{LEVEL_NAMES[l]}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {years.map((y) => (
            <tr key={y}>
              <th>
                Year {y}
                {y === record.yearLevel && <div className="muted small">their year</div>}
              </th>
              {levels.map((l) => (
                <td key={l}>
                  {passed(y, l) ? (
                    <span className="pill good">Passed</span>
                  ) : stopped(y, l) ? (
                    <span className="pill warn">Stopped here</span>
                  ) : (
                    <span className="muted small">–</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RESULT: Record<AttemptResult, { label: string; pill: string }> = {
  "first try": { label: "Right first try", pill: "good" },
  "with hints": { label: "Right, with hints", pill: "good" },
  "second try": { label: "Right on second try", pill: "warn" },
  "not right": { label: "Not right", pill: "bad" },
};

function TopicName({ topic }: { topic: AttemptTopic }) {
  return (
    <>
      {topic.title}
      <div className="muted small">{[topic.subject, topic.year].filter(Boolean).join(", ")}</div>
    </>
  );
}

const when = (at: number) => new Date(at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** Every question the child answered, newest first: what was asked, what they answered and how it went. */
function RecentQuestions({ profile }: { profile: LearnerProfile }) {
  const [shown, setShown] = useState(15);
  const recent: AttemptRecord[] = profile.history.slice().reverse();
  return (
    <div className="card">
      <h2>Questions {profile.name} has answered</h2>
      {recent.length === 0 ? (
        <p className="muted">No questions yet. Results show here as soon as {profile.name} starts practising.</p>
      ) : (
        <>
          <div className="table-scroll">
            <table className="results-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Topic</th>
                  <th>Question</th>
                  <th>{profile.name}'s answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {recent.slice(0, shown).map((h, i) => {
                  const result = RESULT[attemptResult(h)];
                  return (
                    <tr key={`${h.at}-${i}`}>
                      <td className="small">{when(h.at)}</td>
                      <td>
                        <TopicName topic={attemptTopic(h.skillId)} />
                      </td>
                      <td data-label="Question">{h.question ?? <span className="muted small">Not saved for older questions</span>}</td>
                      <td data-label="Answer">
                        {h.answer ?? "–"}
                        {h.rightAnswer && <div className="muted small">Right answer: {h.rightAnswer}</div>}
                      </td>
                      <td>
                        <span className={`pill ${result.pill}`}>{result.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {recent.length > shown && (
            <button className="btn secondary small no-print" style={{ marginTop: 12 }} onClick={() => setShown((n) => n + 30)}>
              Show more ({recent.length - shown} older)
            </button>
          )}
        </>
      )}
    </div>
  );
}

/** How the child is going in each topic they've practised. */
function TopicResults({ profile }: { profile: LearnerProfile }) {
  const results = resultsByTopic(profile.history);
  if (results.length === 0) return null;
  return (
    <div className="card">
      <h2>Results by topic</h2>
      <div className="table-scroll">
        <table className="results-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Questions</th>
              <th>Right first try</th>
              <th>Last practised</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const pct = Math.round((r.rightFirstTry / r.answered) * 100);
              return (
                <tr key={r.key}>
                  <td>
                    <TopicName topic={r.topic} />
                  </td>
                  <td data-label="Questions">{r.answered}</td>
                  <td data-label="Right first try">
                    <span className={`pill ${pct >= 80 ? "good" : pct >= 50 ? "warn" : "bad"}`}>
                      {r.rightFirstTry} of {r.answered} ({pct}%)
                    </span>
                  </td>
                  <td className="small" data-label="Last practised">
                    {new Date(r.lastAt).toLocaleDateString("en-AU")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Times tables game scores: recent games and the facts missed most. Hidden until the first game. */
function TablesReport({ profile }: { profile: LearnerProfile }) {
  const record = tablesOf(profile);
  if (!record.games.length) return null;
  const recent = record.games.slice(-5).reverse();
  const tricky = trickyFacts(record);
  return (
    <div className="card stack tables-report">
      <h2 style={{ margin: 0 }}>Times tables game</h2>
      <p className="muted" style={{ margin: 0 }}>
        {record.games.length} game{record.games.length === 1 ? "" : "s"} played. Each game is 2 minutes.
      </p>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Tables</th>
            <th>Speed</th>
            <th>Right</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((g) => (
            <tr key={g.at}>
              <td>{new Date(g.at).toLocaleDateString("en-AU")}</td>
              <td>{describeTables(g.tables)}</td>
              <td>{SPEEDS[g.speed]?.label ?? g.speed}</td>
              <td>
                {g.right} of {g.asked}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tricky.length > 0 && (
        <p style={{ margin: 0 }}>
          Missed most lately: <strong>{tricky.join(", ")}</strong>.
        </p>
      )}
    </div>
  );
}

/**
 * Reading age from the reading check, and Learn to Read progress. A grown-up who can change the
 * profile can put the student in the program or take them out.
 */
function ReadingReport({
  profile,
  onChange,
}: {
  profile: LearnerProfile;
  onChange?: (update: (p: LearnerProfile) => LearnerProfile) => void;
}) {
  const reading = readingOf(profile);
  const done = unitsDone(reading);
  const next = currentUnit(reading);
  const nextSight = currentSightLevel(reading);
  const blending = reading.blending;
  return (
    <div className="card stack reading-report">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Reading</h2>
        {reading.enrolled && <span className="pill warn">In Learn to Read</span>}
      </div>
      <p style={{ margin: 0 }}>
        {reading.age === null ? (
          `${profile.name} hasn't done the reading check yet. It's on their Student page.`
        ) : (
          <>
            Reading age: <strong>{formatReadingAge(reading.age)}</strong>
            {reading.checkedAt && <span className="muted"> (checked {new Date(reading.checkedAt).toLocaleDateString("en-AU")})</span>}.
            {reading.age < READING_AGE_CUTOFF
              ? ` That's below ${READING_AGE_CUTOFF}, so ${profile.name} is in Learn to Read, our phonics program.`
              : ""}
          </>
        )}
      </p>
      {reading.enrolled && (
        <>
          <p className="muted" style={{ margin: 0 }}>
            {done} of {UNITS.length} sound groups done.{" "}
            {next ? `Working on: ${next.title.replace(/_/g, "–")} (${next.group.toLowerCase()}).` : "Every sound group is done."}
            {reading.readAloud > 0 && ` ${reading.readAloud} sentence${reading.readAloud === 1 ? "" : "s"} read aloud.`}
          </p>
          <div className="unit-dots" aria-hidden>
            {UNITS.map((u) => (
              <span key={u.id} className={reading.units[u.id]?.mastered ? "done" : next?.id === u.id ? "next" : ""} title={u.title}>
                {u.title.replace(/_/g, "–")}
              </span>
            ))}
          </div>
          <p className="muted" style={{ margin: 0 }}>
            Sight words: {sightLevelsDone(reading)} of {SIGHT_LEVELS.length} levels done.{" "}
            {nextSight
              ? `Working on ${nextSight.title.toLowerCase()} (${nextSight.words.map((w) => w.word).join(", ")}).`
              : "Every level is done."}
          </p>
          <div className="unit-dots" aria-hidden>
            {SIGHT_LEVELS.map((l) => (
              <span key={l.id} className={reading.units[l.id]?.mastered ? "done" : nextSight?.id === l.id ? "next" : ""} title={l.title}>
                {l.title.replace("Level ", "L")}
              </span>
            ))}
          </div>
          <p className="muted" style={{ margin: 0 }}>
            {blending.sessions
              ? `Sound It Out: ${blending.right} of ${blending.asked} words sounded out right (${Math.round((blending.right / blending.asked) * 100)}%) in ${blending.sessions} practice${blending.sessions === 1 ? "" : "s"}.`
              : "Sound It Out: no practice yet."}
          </p>
        </>
      )}
      {onChange && (
        <label className="row no-print" style={{ fontWeight: 400, margin: 0, gap: 8 }}>
          <input
            type="checkbox"
            style={{ width: "auto" }}
            checked={reading.enrolled}
            onChange={(e) => onChange((p) => ({ ...p, reading: setEnrolled(readingOf(p), e.target.checked) }))}
          />
          Learn to Read is on for {profile.name}
        </label>
      )}
    </div>
  );
}
