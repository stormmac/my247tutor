import { CurriculumTree, curriculumTotals } from "@/components/CurriculumTree";
import { accountsEnabled } from "@/lib/auth/session";

export const metadata = { title: "Curriculum · my247tutor" };
// Whether accounts are on is read when the page is requested, not when the site is built.
export const dynamic = "force-dynamic";

/** The curriculum tree, with answers, for parents, teachers, centres and admins. Students are kept out by the proxy. */
export default function CurriculumPage() {
  if (!accountsEnabled()) {
    return (
      <div className="stack">
        <h1>Curriculum</h1>
        <p className="muted">Switch on accounts to see the curriculum here.</p>
      </div>
    );
  }
  const total = curriculumTotals();
  return (
    <div className="stack">
      <h1>Curriculum</h1>
      <p className="muted" style={{ margin: 0 }}>
        Everything students work through: {total.topics} topics, {total.subtopics} subtopics and {total.questions} written questions, with
        their answers. Open a subtopic to see its questions, and use Preview question to see one as a student sees it.
      </p>
      <CurriculumTree />
    </div>
  );
}
