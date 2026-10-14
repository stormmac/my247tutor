import type { NextRequest } from "next/server";
import { z } from "zod";
import { adminReturnCookie, SESSION_COOKIE, sessionCookie } from "@/lib/auth/session";
import { audit, getUser, requireUser } from "@/lib/auth/users";

/**
 * An admin logs in as another account to see the site as they do. The admin's own session is kept
 * aside so "Back to Admin" can restore it. Admin accounts can't be logged into this way.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const target = z.uuid().safeParse(id).success ? await getUser(id) : null;
  if (!target) return Response.json({ error: "No such user." }, { status: 404 });
  if (target.role === "admin") return Response.json({ error: "You can't log in as another admin." }, { status: 400 });
  if (!target.isActive) return Response.json({ error: "This account is turned off. Turn it on first." }, { status: 400 });

  await audit(result.user.id, "log_in_as", target.id, {});
  const response = Response.json({ ok: true, role: target.role });
  response.headers.append("Set-Cookie", adminReturnCookie(request.cookies.get(SESSION_COOKIE)!.value));
  response.headers.append(
    "Set-Cookie",
    await sessionCookie({ userId: target.id, role: target.role, version: target.sessionVersion, actorId: result.user.id }),
  );
  return response;
}
