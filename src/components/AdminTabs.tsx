import Link from "next/link";

/** Switches between the admin pages. */
export function AdminTabs({ current }: { current: "people" | "accounts" | "students" | "curriculum" | "suni" | "sounds" }) {
  return (
    <nav className="tabs" aria-label="Admin">
      <Link
        href="/admin/people"
        className={`tab ${current === "people" ? "active" : ""}`}
        aria-current={current === "people" ? "page" : undefined}
      >
        Log in as
      </Link>
      <Link
        href="/admin"
        className={`tab ${current === "accounts" ? "active" : ""}`}
        aria-current={current === "accounts" ? "page" : undefined}
      >
        Accounts
      </Link>
      <Link
        href="/admin/students"
        className={`tab ${current === "students" ? "active" : ""}`}
        aria-current={current === "students" ? "page" : undefined}
      >
        Students
      </Link>
      <Link
        href="/admin/curriculum"
        className={`tab ${current === "curriculum" ? "active" : ""}`}
        aria-current={current === "curriculum" ? "page" : undefined}
      >
        Curriculum
      </Link>
      <Link
        href="/admin/suni"
        className={`tab ${current === "suni" ? "active" : ""}`}
        aria-current={current === "suni" ? "page" : undefined}
      >
        Suni
      </Link>
      <Link
        href="/admin/sounds"
        className={`tab ${current === "sounds" ? "active" : ""}`}
        aria-current={current === "sounds" ? "page" : undefined}
      >
        Sounds
      </Link>
    </nav>
  );
}
