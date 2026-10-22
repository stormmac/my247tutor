"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ColourPoints, loadRewards } from "@/components/RewardsButton";
import { useAccount } from "@/components/useAccount";
import { useProfile } from "@/components/useProfile";
import { subjectName, curriculumOf } from "@/lib/curriculum/curricula";
import { currentLesson, lessonProgress, weekOf } from "@/lib/learner/lesson";
import { doesSubject } from "@/lib/learner/plan";
import { lessonFinished, lessonPoints, REWARD_SUBJECTS, type Rewards, rewardText, totalsText } from "@/lib/learner/rewards";

/**
 * The student's reward program: what they've earned, what this week's lessons have earned so far,
 * and what finishing each one is worth.
 */
export default function RewardsPage() {
  const { profile, loaded } = useProfile();
  const account = useAccount();
  const [rewards, setRewards] = useState<Rewards | string | null>(null);
  const learnerId = profile?.id;

  useEffect(() => {
    if (!learnerId || !account.user) return;
    let live = true;
    void loadRewards(learnerId).then((r) => live && setRewards(r));
    return () => {
      live = false;
    };
  }, [learnerId, account.user]);

  if (!loaded || !account.loaded) return null;
  if (!profile || !learnerId || !account.user)
    return (
      <div className="card narrow stack">
        <h1>🏆 Rewards</h1>
        <p>Rewards are kept with your account. Ask a grown-up to sign in, then come back here.</p>
        <Link href="/learn" className="btn secondary">
          Back to learning
        </Link>
      </div>
    );

  const curriculum = curriculumOf(profile.curriculum);
  const subjects = REWARD_SUBJECTS.filter((s) => doesSubject(profile.plan, s));
  const loadedRewards = typeof rewards === "object" ? rewards : null;
  return (
    <div className="stack">
      <div className="row spread">
        <h1 style={{ margin: 0 }}>🏆 {profile.name}&apos;s rewards</h1>
        <Link href="/learn" className="btn secondary">
          Back to learning
        </Link>
      </div>
      {typeof rewards === "string" && <p className="feedback bad">{rewards}</p>}
      <div className="card reward-total-card">
        <p className="small muted" style={{ margin: 0 }}>
          You&apos;ve earned
        </p>
        <p className="reward-total" style={{ margin: 0 }}>
          {loadedRewards ? totalsText(loadedRewards.totals) : "…"}
        </p>
        <p className="small muted" style={{ margin: "6px 0 0" }}>
          Every weekly lesson question earns <ColourPoints />.
        </p>
      </div>
      <div className={subjects.length > 1 ? "grid grid-2" : "grid"}>
        {subjects.map((subject) => {
          const lesson = currentLesson(profile, subject);
          const { done, total } = lesson ? lessonProgress(lesson) : { done: 0, total: 0 };
          const finished = lessonFinished(lesson ?? undefined);
          const offers = loadedRewards?.offers.filter((o) => o.subject === subject) ?? [];
          const earned = loadedRewards?.earnings.filter((e) => e.subject === subject && e.week === weekOf()) ?? [];
          return (
            <div key={subject} className="card stack">
              <h2 style={{ margin: 0 }}>{subjectName(subject, curriculum)} this week</h2>
              <p style={{ margin: 0 }}>
                ⭐ <strong>{rewardText("points", lessonPoints(lesson ?? undefined))}</strong> so far
                {lesson ? `, ${done} of ${total} questions done.` : ". Start this week's lesson to earn points."}
              </p>
              {offers.length > 0 &&
                (finished && earned.length ? (
                  <p className="feedback good" style={{ margin: 0 }}>
                    ✅ Finished! You earned {earned.map((e) => `${rewardText(e.kind, e.amount)} from ${e.setByName}`).join(" and ")}.
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>
                    🎁 Finish the whole lesson to earn{" "}
                    {offers.map((o) => `${rewardText(o.kind, o.amount)} from ${o.setByName}`).join(" and ")}.
                  </p>
                ))}
              {!finished && (
                <Link href={`/learn/${subject}`} className="btn">
                  {lesson && done ? "Keep going" : "Start this week's lesson"}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      {loadedRewards && (loadedRewards.earnings.length > 0 || loadedRewards.weeks.length > 0) && (
        <div className="card stack">
          <h2 style={{ margin: 0 }}>What you&apos;ve earned</h2>
          <ul className="reward-list">
            {loadedRewards.earnings.map((e, i) => (
              <li key={`e${i}`}>
                🎁 {rewardText(e.kind, e.amount)} from {e.setByName} for finishing {subjectName(e.subject, curriculum)}, week of{" "}
                {new Date(`${e.week}T00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
              </li>
            ))}
            {loadedRewards.weeks.map((w, i) => (
              <li key={`w${i}`}>
                ⭐ {rewardText("points", w.points)} from {subjectName(w.subject, curriculum)} questions, week of{" "}
                {new Date(`${w.week}T00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
