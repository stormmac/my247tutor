import { AdminTabs } from "@/components/AdminTabs";
import { CurriculumTree, curriculumTotals } from "@/components/CurriculumTree";
import { accountsEnabled } from "@/lib/auth/session";

export const metadata = { title: "Curriculum · Admin · my247tutor" };
// Whether accounts are on is read when the page is requested, not when the site is built.
export const dynamic = "force-dynamic";

/** The whole content tree, Country → State → Subject → Year → Topic → Subtopic → Question, as in myteacher. */
export default function CurriculumAdminPage() {
  // The proxy keeps /admin pages to admins once accounts are on; until then, answers stay hidden.
  if (!accountsEnabled()) {
    return (
      <div className="stack">
        <h1>Admin</h1>
        <p className="muted">Switch on accounts to see the curriculum here.</p>
      </div>
    );
  }

  const total = curriculumTotals();
  return (
    <div className="stack">
      <h1>Admin</h1>
      <AdminTabs current="curriculum" />
      <p className="muted" style={{ margin: 0 }}>
        {total.topics} topics, {total.subtopics} subtopics and {total.questions} written questions. Subtopics linked to a skill also
        practise with questions the app makes fresh each time. US Common Core and the UK National Curriculum reuse these subtopics and
        questions under their own headings, in US or UK English (with pounds and pence in the UK), leaving out questions only an Australian
        would know.
      </p>
      <CurriculumTree />
    </div>
  );
}
