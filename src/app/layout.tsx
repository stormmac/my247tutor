import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "my247tutor: NSW Maths and English tutor for Years 3 to 6",
  description: "A patient AI tutor that follows the NSW syllabus, any time of day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <div className="topbar">
          <div className="container">
            <Link href="/" className="logo">
              my<span>247</span>tutor
            </Link>
            <nav className="nav">
              <Link href="/learn">Learn</Link>
              <Link href="/parent">Parents</Link>
            </nav>
          </div>
        </div>
        <main>
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
