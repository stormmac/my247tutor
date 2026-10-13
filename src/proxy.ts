import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, authToken, safeEqual, sitePassword } from "@/lib/auth/sitePassword";

const PUBLIC_PATHS = ["/login", "/api/login"];

export async function proxy(request: NextRequest) {
  const password = sitePassword();
  if (!password) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  const cookie = request.cookies.get(AUTH_COOKIE)?.value ?? "";
  if (safeEqual(cookie, await authToken(password))) return NextResponse.next();

  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Password required" }, { status: 401 });
  const login = new URL("/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  // Everything except Next.js build files and the site icon.
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
