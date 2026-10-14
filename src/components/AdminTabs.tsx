import Link from "next/link";

/** Switches between the admin pages. */
export function AdminTabs({ current }: { current: "accounts" | "curriculum" }) {
  return (
    <nav className="tabs" aria-label="Admin">
      <Link
        href="/admin"
        className={`tab ${current === "accounts" ? "active" : ""}`}
        aria-current={current === "accounts" ? "page" : undefined}
      >
        Accounts
      </Link>
      <Link
        href="/admin/curriculum"
        className={`tab ${current === "curriculum" ? "active" : ""}`}
        aria-current={current === "curriculum" ? "page" : undefined}
      >
        Curriculum
      </Link>
    </nav>
  );
}
