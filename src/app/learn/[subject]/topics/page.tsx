"use client";

import { BackToStudent } from "@/components/BackToStudent";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSuniScreen } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { progressKey } from "@/lib/content/practice";
import { questionsOf, subtopicPath, subtopicsOf, topicsFor, yearsWithContent } from "@/lib/content/tree";
import type { Subtopic } from "@/lib/content/types";
import { type Curriculum, curriculumOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import { getSkill } from "@/lib/curriculum/skills";
import type { YearLevel } from "@/lib/curriculum/types";
import { skillState, type LearnerProfile } from "@/lib/learner/model";

export default function TopicsPage() {
  return (
    <Suspense>
      <Topics />
    </Suspense>
  );
}

function Topics() {
  const { subject } = useParams<{ subject: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile, loaded } = useProfile();
  const curriculum = curriculumOf(profile?.curriculum);
  const shownYear = (Number(searchParams.get("year")) || profile?.yearLevel || 3) as YearLevel;
  useSuniScreen(
    subject === "maths" || subject === "english"
      ? {
          screen: `Browsing ${yearName(shownYear, curriculum)} ${subjectName(subject, curriculum)} topics to pick one to practise: ${topicsFor(
            subject,
            shownYear,
            curriculum,
          )
            .map((t) => t.title)
            .join(", ")}.`,
        }
      : null,
  );

  if (subject !== "maths" && subject !== "english") return <p>Unknown subject.</p>;
  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow">
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Get started
        </Link>
      </div>
    );
  }

  const years = yearsWithContent(subject, curriculum);
  const asked = Number(searchParams.get("year"));
  const year: YearLevel = years.includes(asked as YearLevel)
    ? (asked as YearLevel)
    : years.includes(profile.yearLevel)
      ? profile.yearLevel
      : years[0];
  const topics = topicsFor(subject, year, curriculum);
  // Where this subject sits in the curriculum's tree, such as Australia › New South Wales › Mathematics.
  const path = subtopicPath(subtopicsOf(topics[0].id)[0].id, curriculum)!;
  const label = subjectName(subject, curriculum);

  return (
    <div className="stack">
      <div className="row">
        <BackToStudent />
      </div>
      <nav className="small muted" aria-label="Where you are">
        {path.country.name} › {path.state.name} › {path.subject.name}
      </nav>
      <div className="row spread">
        <h1 style={{ margin: 0 }}>{label} topics</h1>
        <Link href={`/learn/${subject}`} className="btn secondary small">
          Let us choose for me
        </Link>
      </div>

      <div className="tabs" role="tablist" aria-label="School year">
        {years.map((y) => (
          <button
            key={y}
            role="tab"
            aria-selected={y === year}
            className={`tab ${y === year ? "active" : ""}`}
            onClick={() => router.replace(`/learn/${subject}/topics?year=${y}`, { scroll: false })}
          >
            {yearName(y, curriculum)}
          </button>
        ))}
      </div>

      {topics.map((topic) => (
        <section key={topic.id} className="card stack">
          <div>
            <h2 style={{ margin: 0 }}>{topic.title}</h2>
            <p className="muted" style={{ margin: 0 }}>
              {topic.description}
            </p>
          </div>
          <ul className="subtopics">
            {subtopicsOf(topic.id).map((sub) => (
              <SubtopicRow key={sub.id} subject={subject} subtopic={sub} profile={profile} curriculum={curriculum} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function SubtopicRow({
  subject,
  subtopic,
  profile,
  curriculum,
}: {
  subject: string;
  subtopic: Subtopic;
  profile: LearnerProfile;
  curriculum: Curriculum;
}) {
  const isWriting = subtopic.skill_id !== null && getSkill(subtopic.skill_id).practice === "writing";
  const st = skillState(profile, progressKey(subtopic));
  const started = st.attempts > 0 || st.mastered;
  const written = questionsOf(subtopic.id, curriculum).length;
  const kind = isWriting
    ? "Writing task"
    : subtopic.skill_id
      ? written
        ? `${written} questions, then endless practice`
        : "Endless practice"
      : `${written} questions`;

  return (
    <li className="subtopic">
      <div style={{ flex: 1 }}>
        <strong>{subtopic.title}</strong>
        {subtopic.outcome_code && <span className="small muted"> · {subtopic.outcome_code}</span>}
        <div className="small muted">
          {kind}
          {!isWriting && (st.mastered ? " · Mastered" : started ? ` · Strength ${Math.round(st.mastery * 100)}%` : "")}
        </div>
        {!isWriting && started && (
          <div className="progress" style={{ marginTop: 6, maxWidth: 220 }}>
            <div style={{ width: `${Math.round(st.mastery * 100)}%` }} />
          </div>
        )}
      </div>
      <Link href={`/learn/${subject}/topics/${subtopic.id}`} className={`btn small ${st.mastered ? "secondary" : ""}`}>
        {isWriting ? "Write" : st.mastered ? "Practise again" : started ? "Keep going" : "Start"}
      </Link>
    </li>
  );
}
