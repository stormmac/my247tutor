/**
 * Where the database is. DATABASE_URL wins; POSTGRES_URL is what Vercel's Supabase integration sets.
 */
export function databaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;
}

/**
 * node-postgres treats sslmode=require as "verify the certificate against public CAs", which Supabase's
 * pooler certificate fails. uselibpqcompat makes it mean what it means everywhere else: always encrypt.
 */
export function connectionString(url: string): string {
  if (!/[?&]sslmode=require\b/.test(url) || /[?&]uselibpqcompat=/.test(url)) return url;
  return `${url}&uselibpqcompat=true`;
}
