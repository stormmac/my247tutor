import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/auth/rules";
import { accountsEnabled, SESSION_COOKIE, verifySession } from "@/lib/auth/session";
import { AUTH_COOKIE, authToken, safeEqual, sitePassword } from "@/lib/auth/sitePassword";

/** Open to everyone, even with the site password or accounts switched on. */
const SITE_PASSWORD_PUBLIC = ["/login", "/api/login"];
/** Need no account: the home page, signing in and up, and the site-password page. */
const ACCOUNT_PUBLIC = [
  "/",
  "/signin",
  "/signup",
  "/login",
  "/api/login",
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/signout",
  "/api/auth/me",
];

function securityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production") response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  return response;
}

function denied(request: NextRequest, status: 401 | 403, message: string, page: string): NextResponse {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/api/")) return securityHeaders(NextResponse.json({ error: message }, { status }));
  const url = new URL(page, request.url);
  url.search = "";
  if (status === 401) url.searchParams.set("next", pathname + search);
  return securityHeaders(NextResponse.redirect(url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Other websites can't send requests to our API using a visitor's cookies.
  if (pathname.startsWith("/api/") && !isSameOrigin(request.method, request.headers.get("origin"), request.headers.get("host"))) {
    return securityHeaders(NextResponse.json({ error: "Cross-site request blocked." }, { status: 403 }));
  }

  // 1. The private-testing password, when SITE_PASSWORD is set.
  const password = sitePassword();
  if (password && !SITE_PASSWORD_PUBLIC.includes(pathname)) {
    const cookie = request.cookies.get(AUTH_COOKIE)?.value ?? "";
    if (!safeEqual(cookie, await authToken(password))) return denied(request, 401, "Password required", "/login");
  }

  // 2. Accounts, when a database and AUTH_SECRET are set. Route handlers check the database again.
  if (accountsEnabled() && !ACCOUNT_PUBLIC.includes(pathname)) {
    const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) return denied(request, 401, "Please sign in.", "/signin");
    const adminOnly = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
    if (adminOnly && session.role !== "admin") return denied(request, 403, "You don't have access to this.", "/");
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  // Everything except Next.js build files and the site icon.
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
