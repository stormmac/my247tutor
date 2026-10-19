"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FocusedPractice } from "@/components/FocusedPractice";
import { useSuniScreen } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { subtopicPath } from "@/lib/content/tree";
import { curriculumOf, localise } from "@/lib/curriculum/curricula";
import { getSkill } from "@/lib/curriculum/skills";
import { WRITING_TASKS } from "@/lib/english/bank";

export default function SubtopicPage() {
  const { subject, subtopicId } = useParams<{ subject: string; subtopicId: string }>();
  const { profile, setProfile, loaded } = useProfile();
  const curriculum = curriculumOf(profile?.curriculum);
  const path = subtopicPath(subtopicId, curriculum);
  const writingSkill = path?.subtopic.skill_id ? getSkill(path.subtopic.skill_id) : null;
  const local = (text: string) => localise(text, curriculum);
  useSuniScreen(
    writingSkill?.practice === "writing"
      ? { screen: `A writing topic, ${path!.subtopic.title}. The task: ${local(WRITING_TASKS[writingSkill.id][0].prompt)}` }
      : null,
  );

  if (!path || path.subjectKey !== subject) return <p>We couldn't find that topic.</p>;
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

  const { subtopic, topic, year, subject: subjectRecord } = path;
  const yearNumber = year.sort_order;
  const back = `/learn/${subject}/topics?year=${yearNumber}`;
  const skill = subtopic.skill_id ? getSkill(subtopic.skill_id) : null;

  return (
    <div className="stack">
      <nav className="small muted" aria-label="Where you are">
        <Link href={back}>
          {subjectRecord.name} › {year.name}
        </Link>{" "}
        › {topic.title}
      </nav>
      {skill?.practice === "writing" ? (
        <div className="card narrow stack">
          <h1 style={{ margin: 0 }}>{subtopic.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {subtopic.description}
          </p>
          <p>{local(WRITING_TASKS[skill.id][0].prompt)}</p>
          <Link className="btn" href={`/learn/writing?skill=${skill.id}`}>
            Start writing
          </Link>
        </div>
      ) : (
        <FocusedPractice key={subtopic.id} subtopic={subtopic} profile={profile} setProfile={setProfile} />
      )}
      <p className="small muted">
        <Link href={back}>Back to {topic.title.toLowerCase()} and other topics</Link>
      </p>
    </div>
  );
}
