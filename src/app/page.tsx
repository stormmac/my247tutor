import Link from "next/link";

export default function Home() {
  return (
    <div className="stack">
      <section className="hero">
        <h1>A patient tutor for every NSW student, any time.</h1>
        <p>
          Maths and English practice for Years 3 to 6, built on the NSW syllabus. my247tutor finds what your child is ready to learn, guides
          them with hints instead of answers, and shows you progress against NESA outcomes.
        </p>
        <div className="row">
          <Link href="/learn" className="btn">
            Start learning
          </Link>
          <Link href="/parent" className="btn secondary">
            Parent dashboard
          </Link>
        </div>
      </section>

      <section className="grid grid-3" style={{ marginTop: 32 }}>
        <div className="card">
          <h2>Starts at the right level</h2>
          <p className="muted">A five-question check places your child within Stage 2 or Stage 3, not just by school year.</p>
        </div>
        <div className="card">
          <h2>Hints, not answers</h2>
          <p className="muted">Every question has a hint ladder, and the tutor guides with questions. Maths answers are checked exactly.</p>
        </div>
        <div className="card">
          <h2>Progress you can read</h2>
          <p className="muted">See which NESA outcomes are secure and which are still developing, plus writing feedback.</p>
        </div>
      </section>
    </div>
  );
}
