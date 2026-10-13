import type { NextRequest } from "next/server";
import { accountsEnabled } from "@/lib/auth/session";
import { setupStatus } from "@/lib/auth/status";
import { requireUser } from "@/lib/auth/users";

/** Setup checklist. Open to anyone until accounts are on (there's nothing to protect yet), then admins only. */
export async function GET(request: NextRequest) {
  const enabled = accountsEnabled();
  if (enabled) {
    const result = await requireUser(request, "admin");
    if ("response" in result) return result.response;
  }
  return Response.json({ enabled, checks: await setupStatus() });
}
