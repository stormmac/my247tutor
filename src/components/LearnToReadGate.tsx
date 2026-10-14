"use client";

import Link from "next/link";
import { useProfile } from "@/components/useProfile";
import { readingOf, type ReadingProgress } from "@/lib/phonics/progress";

/** Shows a Learn to Read page only to a student in the program, and only once this part is open to them. */
export function LearnToReadGate({
  open,
  notOpen,
  children,
}: {
  open: (reading: ReadingProgress) => boolean;
  notOpen: string;
  children: (props: { reading: ReadingProgress; setProfile: ReturnType<typeof useProfile>["setProfile"] }) => React.ReactNode;
}) {
  const { profile, setProfile, loaded } = useProfile();
  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }
  const reading = readingOf(profile);
  if (!reading.enrolled || !open(reading)) {
    return (
      <div className="card narrow stack">
        <p>{reading.enrolled ? notOpen : "Learn to Read isn't turned on for you yet."}</p>
        <Link className="btn" href="/read">
          Back to Learn to Read
        </Link>
      </div>
    );
  }
  return <>{children({ reading, setProfile })}</>;
}
