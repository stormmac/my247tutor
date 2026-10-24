"use client";

import Link from "next/link";

/**
 * A way out of a lesson, back to the Student page. Every lesson shows one, so a student is never
 * stuck part way through a lesson with nowhere to go.
 */
export function BackToStudent({ className = "" }: { className?: string }) {
  return (
    <Link href="/learn" className={`btn secondary small back-to-student no-print ${className}`.trim()}>
      ← Student page
    </Link>
  );
}
