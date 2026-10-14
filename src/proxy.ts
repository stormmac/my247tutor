import { NextResponse, type NextRequest } from "next/server";
import { guestAccess, isSameOrigin } from "@/lib/auth/rules";
import { accountsEnabled, SESSION_COOKIE, TRIAL_COOKIE, verifySession, verifyTrial } from "@/lib/auth/session";
import { AUTH_COOKIE, authToken, safeEqual, sitePassword } from "@/lib/auth/sitePassword";

/** Open to everyone, even with the site password or accounts switched on. */
const SITE_PASSWORD_PUBLIC = ["/login", "/api/login", "/api/billing/webhook"];
/** Need no account: the home page, the trial choice, signing in and up, and the site-password page. */
const ACCOUNT_PUBLIC = [
  "/",
  "/start",
  "/api/auth/trial",
  "/signin",
  "/signup",
  "/login",
  "/api/login",
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/signout",
  "/api/auth/me",
  // The one-time link a new account gets by email to set its password.
  "/set-password",
  "/api/auth/set-password",
  // Stripe calls this; it proves itself with a signature instead.
  "/api/billing/webhook",
];
/** A child signed in on their own uses the learning pages; these belong to their parent, centre or teacher. */
const PARENT_ONLY = [
  "/parent",
  "/billing",
  "/api/billing",
  "/api/children",
  "/centre",
  "/api/centre",
  "/classes",
  "/api/classes",
  "/api/students",
];

function isUnder(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Called by other services, which check themselves with a signature, so they skip the same-site check. */
const SIGNED_WEBHOOKS = ["/api/billing/webhook"];

function securityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(self), geolocation=()");
  if (process.env.NODE_ENV === "production") response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  return response;
}

function denied(request: NextRequest, status: 401 | 403, message: string, page: string, params: Record<string, string> = {}): NextResponse {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/api/")) return securityHeaders(NextResponse.json({ error: message }, { status }));
  const url = new URL(page, request.url);
  url.search = "";
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  if (status === 401) url.searchParams.set("next", pathname + search);
  return securityHeaders(NextResponse.redirect(url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Other websites can't send requests to our API using a visitor's cookies.
  if (
    pathname.startsWith("/api/") &&
    !SIGNED_WEBHOOKS.includes(pathname) &&
    !isSameOrigin(request.method, request.headers.get("origin"), request.headers.get("host"))
  ) {
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
    const adminOnly = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
    if (!session) {
      if (adminOnly) return denied(request, 401, "Please sign in.", "/signin");
      // Without an account, a free trial lets a visitor try the site first.
      const access = guestAccess(await verifyTrial(request.cookies.get(TRIAL_COOKIE)?.value));
      if (access === "allow") return securityHeaders(NextResponse.next());
      if (access === "trial-over")
        return denied(request, 401, "Your free hour is up. Please create an account.", "/signup", { trial: "over" });
      return denied(request, 401, "Please sign in.", "/start");
    }
    if (adminOnly && session.role !== "admin") return denied(request, 403, "You don't have access to this.", "/");
    // While an admin is logged in as someone, they can look and help but not change the account's payment or password.
    if (session.actorId && request.method !== "GET" && (isUnder(pathname, ["/api/billing"]) || pathname === "/api/auth/password"))
      return denied(request, 403, "That can't be changed while you're logged in as someone else.", "/");
    if (session.role === "student" && isUnder(pathname, PARENT_ONLY))
      return denied(request, 403, "Ask your grown-up to do this.", "/learn");
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  // Everything except Next.js build files and the site icon.
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
