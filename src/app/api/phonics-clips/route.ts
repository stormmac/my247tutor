import { listClips } from "@/lib/auth/phonicsClips";
import { accountsEnabled } from "@/lib/auth/session";

/** Which phonics sounds have a recording, so Suni plays those instead of the computer voice. */
export async function GET() {
  if (!accountsEnabled()) return Response.json({ clips: [] });
  const clips = await listClips().catch(() => []);
  return Response.json({ clips }, { headers: { "Cache-Control": "public, max-age=60" } });
}
