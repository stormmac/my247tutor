import { NextResponse, type NextRequest } from "next/server";
import { accountsEnabled } from "@/lib/auth/session";
import { questionById, subtopicPath } from "@/lib/content/tree";
import { curriculumOf, CURRICULUM_NAMES } from "@/lib/curriculum/curricula";

/** One question from the curriculum tree and where it sits, to preview as a student sees it. Grown-ups only (see the proxy). */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const curriculum = curriculumOf(request.nextUrl.searchParams.get("curriculum"));
  const question = accountsEnabled() ? questionById((await params).id, curriculum) : null;
  const path = question && subtopicPath(question.subtopic_id, curriculum);
  if (!question || !path) return NextResponse.json({ error: "No such question." }, { status: 404 });
  return NextResponse.json({
    question,
    heading: path.subtopic.title,
    description: path.subtopic.description,
    where: `${CURRICULUM_NAMES[curriculum]} · ${path.subject.name} · ${path.year.name} · ${path.topic.title}`,
  });
}
