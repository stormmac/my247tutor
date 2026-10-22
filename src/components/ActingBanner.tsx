"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/components/useProfile";
import { backToAdmin, learningAsStudent, useAccount } from "@/components/useAccount";

/**
 * Shown across the top while an admin is logged in as someone else, a centre is logged in as a teacher, or a teacher is
 * learning as a student, with the way back.
 */
export function ActingBanner() {
  const { user } = useAccount();
  const { profile } = useProfile();
  // Read after the first render, since the server can't see this tab's storage.
  const [learning, setLearning] = useState(false);
  useEffect(() => setLearning(learningAsStudent()), []);
  if (!user?.actingAdmin) return null;
  // An admin who picked a student on the Learn page: they stay as that student until they choose another or go back.
  if (learning && user.actingRole === "admin")
    return (
      <div className="acting-banner" role="status">
        <div className="container">
          <span>
            Admin: you&apos;re learning as <strong>{profile?.name ?? user.name}</strong>
            {user.role !== "student" && <> ({user.name}&apos;s account)</>}. You stay as this student until you switch.
          </span>
          <span className="row" style={{ gap: 8 }}>
            <button className="btn small" onClick={() => void backToAdmin("/learn")}>
              Choose another student
            </button>
            <button className="btn small secondary" onClick={() => void backToAdmin("/admin")}>
              Back to Admin
            </button>
          </span>
        </div>
      </div>
    );
  // A centre logged in as one of its teachers.
  if (user.actingRole === "centre" && user.role === "teacher")
    return (
      <div className="acting-banner" role="status">
        <div className="container">
          <span>
            You&apos;re logged in as <strong>{user.name}</strong>, one of your teachers. Their classes are shown as they see them.
          </span>
          <button className="btn small" onClick={() => void backToAdmin("/centre")}>
            Back to my centre
          </button>
        </div>
      </div>
    );
  if (user.actingRole === "teacher" || user.actingRole === "centre")
    return (
      <div className="acting-banner" role="status">
        <div className="container">
          <span>
            You&apos;re learning as <strong>{user.name}</strong>. Their progress is saved as they go.
          </span>
          <button className="btn small" onClick={() => void backToAdmin()}>
            Back to my students
          </button>
        </div>
      </div>
    );
  return (
    <div className="acting-banner" role="status">
      <div className="container">
        <span>
          You&apos;re logged in as <strong>{user.name}</strong> from Admin. Payments and passwords can&apos;t be changed.
        </span>
        <button className="btn small" onClick={() => void backToAdmin()}>
          Back to Admin
        </button>
      </div>
    </div>
  );
}
