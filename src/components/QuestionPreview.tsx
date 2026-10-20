"use client";

import { useRef, useState } from "react";
import { QuestionView } from "@/components/QuestionView";
import { toPracticeQuestion } from "@/lib/content/practice";
import type { ContentQuestion } from "@/lib/content/types";
import type { Curriculum } from "@/lib/curriculum/curricula";

interface Preview {
  question: ContentQuestion;
  heading: string;
  description: string;
  where: string;
}

/**
 * The Preview question button in the curriculum tree. It pops the question up as a student sees
 * it in practice: a grown-up can answer it, use the hints and see the worked solution, but nothing
 * is saved.
 */
export function PreviewQuestionButton({ questionId, curriculum }: { questionId: string; curriculum: Curriculum }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Each try starts afresh, with the choices in a new order as a student would get them.
  const [round, setRound] = useState(0);

  async function open() {
    setError(null);
    setRound(0);
    dialog.current?.showModal();
    if (preview) return;
    const res = await fetch(`/api/curriculum/questions/${questionId}?curriculum=${curriculum}`).catch(() => null);
    const body = (await res?.json().catch(() => null)) as (Preview & { error?: string }) | null;
    if (res?.ok && body) setPreview(body);
    else setError(body?.error ?? "That question couldn't be loaded.");
  }

  return (
    <>
      <button type="button" className="link-button preview-link" onClick={() => void open()}>
        Preview question
      </button>
      <dialog
        ref={dialog}
        className="preview-dialog"
        aria-label="Question preview"
        // A click on the dimmed backdrop, outside the box, closes it.
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <div className="stack">
          <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <div className="feedback preview-banner" role="note">
              <strong>Preview.</strong> This is how a student sees this question. Try answering it: nothing is saved.
            </div>
            <button type="button" className="btn secondary small" onClick={() => dialog.current?.close()} aria-label="Close preview">
              Close
            </button>
          </div>
          {error && <p className="feedback bad">{error}</p>}
          {!preview && !error && <p className="muted">Loading…</p>}
          {preview && (
            <>
              <div>
                <p className="small muted" style={{ margin: 0 }}>
                  {preview.where}
                </p>
                <h2 style={{ margin: "4px 0 0" }}>{preview.heading}</h2>
                {preview.description && (
                  <p className="muted" style={{ margin: 0 }}>
                    {preview.description}
                  </p>
                )}
              </div>
              <div className="practice">
                <QuestionView
                  key={round}
                  question={toPracticeQuestion(preview.question, round)}
                  curriculum={curriculum}
                  onDone={() => undefined}
                  onNext={() => setRound((r) => r + 1)}
                />
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
