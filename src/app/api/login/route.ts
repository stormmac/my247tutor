import { z } from "zod";
import { AUTH_COOKIE, AUTH_COOKIE_MAX_AGE, authToken, safeEqual, sitePassword } from "@/lib/auth/sitePassword";

const RequestSchema = z.object({ password: z.string().max(200) });

export async function POST(request: Request) {
  const expected = sitePassword();
  if (!expected) return Response.json({ ok: true });

  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !safeEqual(parsed.data.password, expected)) {
    // A short pause makes guessing many passwords slow.
    await new Promise((r) => setTimeout(r, 800));
    return Response.json({ error: "That password isn't right." }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIE}=${await authToken(expected)}; Path=/; Max-Age=${AUTH_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
  );
  return response;
}
