import { afterEach, describe, expect, it, vi } from "vitest";
import { connectionString, databaseUrl } from "../auth/dburl";

afterEach(() => vi.unstubAllEnvs());

describe("databaseUrl", () => {
  it("prefers DATABASE_URL", () => {
    vi.stubEnv("DATABASE_URL", "postgres://a");
    vi.stubEnv("POSTGRES_URL", "postgres://b");
    expect(databaseUrl()).toBe("postgres://a");
  });

  it("falls back to the Supabase integration's POSTGRES_URL", () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("POSTGRES_URL", "postgres://b");
    expect(databaseUrl()).toBe("postgres://b");
  });

  it("is undefined when neither is set", () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("POSTGRES_URL", "");
    expect(databaseUrl()).toBeUndefined();
  });
});

describe("connectionString", () => {
  it("makes sslmode=require mean encrypt, as in libpq", () => {
    expect(connectionString("postgres://u:p@h:6543/postgres?sslmode=require")).toBe(
      "postgres://u:p@h:6543/postgres?sslmode=require&uselibpqcompat=true",
    );
  });

  it("leaves other URLs alone", () => {
    expect(connectionString("postgres://u:p@h/db")).toBe("postgres://u:p@h/db");
    expect(connectionString("postgres://h/db?sslmode=verify-full")).toBe("postgres://h/db?sslmode=verify-full");
    expect(connectionString("postgres://h/db?sslmode=require&uselibpqcompat=false")).toBe(
      "postgres://h/db?sslmode=require&uselibpqcompat=false",
    );
  });
});
