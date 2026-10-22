import { adminReturnCookie, sessionCookie, verifySession, type Session } from "./session";

/**
 * The cookies that log someone in as another account. Their own session is kept aside for the way
 * back. Someone already logged in as another account can go on to one of that account's people
 * (an admin in a centre on to one of its students, say): the session first kept aside stays, so
 * the way back still leads to whoever started, and they stay the one acting.
 */
export async function actAsCookies(
  current: { session: string; kept?: string },
  actorId: string,
  target: Omit<Session, "actorId">,
): Promise<string[]> {
  const chained = (await verifySession(current.session))?.actorId && current.kept ? current.kept : null;
  const startedBy = chained ? ((await verifySession(chained))?.userId ?? actorId) : actorId;
  return [adminReturnCookie(chained ?? current.session), await sessionCookie({ ...target, actorId: startedBy })];
}
