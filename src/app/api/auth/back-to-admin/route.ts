import type { NextRequest } from "next/server";
import {
  ADMIN_RETURN_COOKIE,
  clearedAdminReturnCookie,
  clearedSessionCookie,
  restoredSessionCookie,
  verifySession,
} from "@/lib/auth/session";
import { getUser } from "@/lib/auth/users";

/** Ends logging in as someone else and puts the admin's, teacher's or centre's own session back, if it is still good. */
export async function POST(request: NextRequest) {
  const kept = request.cookies.get(ADMIN_RETURN_COOKIE)?.value;
  const session = await verifySession(kept);
  const admin = session ? await getUser(session.userId) : null;
  const ok = Boolean(
    kept &&
    session &&
    admin &&
    admin.isActive &&
    ["admin", "teacher", "centre"].includes(admin.role) &&
    admin.sessionVersion === session.version,
  );
  const response = Response.json(ok ? { ok: true, role: admin!.role } : { error: "Please log in again." }, { status: ok ? 200 : 401 });
  response.headers.append("Set-Cookie", clearedAdminReturnCookie());
  response.headers.append("Set-Cookie", ok ? restoredSessionCookie(kept!) : clearedSessionCookie());
  return response;
}
