import type { NextRequest } from "next/server";
import { addPraise, listPraise } from "@/lib/auth/praise";
import { requireUser } from "@/lib/auth/users";
import { cleanPraise } from "@/lib/tutor/praise";

export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json({ phrases: await listPraise() });
}

export async function POST(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const body = (await request.json().catch(() => null)) as { text?: unknown } | null;
  const cleaned = cleanPraise(typeof body?.text === "string" ? body.text : "");
  if ("error" in cleaned) return Response.json(cleaned, { status: 400 });
  const added = await addPraise(result.user.id, cleaned.text);
  return "error" in added ? Response.json(added, { status: 400 }) : Response.json({ phrase: added });
}
