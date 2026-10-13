/**
 * Optional site-wide password for private testing. When SITE_PASSWORD is set, every page and
 * API route needs a cookie proving the visitor entered it. When it isn't set, the site is open.
 * Uses Web Crypto so it runs in the proxy and in route handlers alike.
 */

export const AUTH_COOKIE = "site_auth";
export const AUTH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days, in seconds

export function sitePassword(): string | null {
  return process.env.SITE_PASSWORD || null;
}

/** The cookie value for a password. Changing SITE_PASSWORD signs everyone out. */
export async function authToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`my247tutor-site:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compares two strings without returning early, so timing doesn't reveal how much matched. */
export function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

/** Only allow redirects back to a path on this site after signing in. */
export function safeNextPath(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}
