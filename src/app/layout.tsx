import type { Metadata } from "next";
import Link from "next/link";
import { AccountMenu, ParentsLink } from "@/components/AccountMenu";
import { ActingBanner } from "@/components/ActingBanner";
import { ChildSwitcher } from "@/components/ChildSwitcher";
import { PaymentGate } from "@/components/PaymentGate";
import { ProfileSync } from "@/components/ProfileSync";
import { SuniCompanion, SuniProvider } from "@/components/SuniCompanion";
import "./globals.css";

export const metadata: Metadata = {
  title: "my247tutor: NSW Maths and English tutor for Years 1 to 6",
  description: "A patient AI tutor that follows the NSW syllabus, any time of day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <SuniProvider>
          <ActingBanner />
          <div className="topbar">
            <div className="container">
              <Link href="/" className="logo">
                my<span>247</span>tutor
              </Link>
              <nav className="nav">
                <ChildSwitcher />
                <Link href="/learn">Learn</Link>
                <ParentsLink />
                <AccountMenu />
              </nav>
            </div>
          </div>
          <main>
            <div className="container">{children}</div>
          </main>
          <SuniCompanion />
          <ProfileSync />
          <PaymentGate />
        </SuniProvider>
      </body>
    </html>
  );
}
