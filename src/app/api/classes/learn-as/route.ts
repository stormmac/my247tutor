import type { NextRequest } from "next/server";
import { learnableStudents } from "@/lib/auth/centres";
import { requireUser } from "@/lib/auth/users";

/** The students a teacher (their classes) or centre (everyone) can learn as, for their Learn picker. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const found = await learnableStudents(result.user);
  return found ? Response.json(found) : Response.json({ error: "This is for tutoring centres and their teachers." }, { status: 403 });
}
