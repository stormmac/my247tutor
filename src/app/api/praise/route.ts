import { listPraise } from "@/lib/auth/praise";
import { accountsEnabled } from "@/lib/auth/session";

/** The extra things admins have given Suni to say after a right answer. Empty when accounts aren't set up. */
export async function GET() {
  if (!accountsEnabled()) return Response.json({ phrases: [] });
  const phrases = await listPraise().catch(() => []);
  return Response.json({ phrases: phrases.map((p) => p.text) }, { headers: { "Cache-Control": "public, max-age=60" } });
}
