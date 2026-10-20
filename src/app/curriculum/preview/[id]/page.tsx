import Link from "next/link";
import { QuestionPreview } from "@/components/QuestionPreview";
import { accountsEnabled } from "@/lib/auth/session";
import { questionById, subtopicPath } from "@/lib/content/tree";
import { curriculumOf, CURRICULUM_NAMES } from "@/lib/curriculum/curricula";

export const metadata = { title: "Preview question · my247tutor" };
export const dynamic = "force-dynamic";

/** One question from the curriculum tree, as a student sees and answers it. Nothing is saved. */
export default async function PreviewQuestionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ curriculum?: string }>;
}) {
  const curriculum = curriculumOf((await searchParams).curriculum);
  const question = accountsEnabled() ? questionById((await params).id, curriculum) : null;
  const path = question && subtopicPath(question.subtopic_id, curriculum);
  if (!question || !path) {
    return (
      <div className="card narrow stack">
        <h1>Question not found</h1>
        <Link className="btn" href="/curriculum">
          Back to the curriculum
        </Link>
      </div>
    );
  }
  return (
    <QuestionPreview
      question={question}
      heading={path.subtopic.title}
      description={path.subtopic.description}
      where={`${CURRICULUM_NAMES[curriculum]} · ${path.subject.name} · ${path.year.name} · ${path.topic.title}`}
      curriculum={curriculum}
    />
  );
}
