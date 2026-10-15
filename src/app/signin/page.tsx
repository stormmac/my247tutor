import { redirect } from "next/navigation";

/** The old address for logging in, kept so saved links and bookmarks still work. */
export default async function SignInPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const query = new URLSearchParams(await searchParams).toString();
  redirect(`/login${query ? `?${query}` : ""}`);
}
