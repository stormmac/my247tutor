import type { NextRequest } from "next/server";
import { centreOf, listClasses } from "@/lib/auth/centres";
import { getUser, requireUser } from "@/lib/auth/users";

/** The classes a teacher runs, or every class at the centre for the centre itself. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const where = centreOf(result.user);
  if (!where) return Response.json({ error: "Classes are for tutoring centres and their teachers." }, { status: 403 });
  const centre = where.teacherId ? await getUser(where.centreId) : result.user;
  return Response.json({ centre: centre?.name ?? "", classes: await listClasses(where.centreId, where.teacherId) });
}
