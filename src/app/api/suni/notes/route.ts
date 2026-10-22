import type { NextRequest } from "next/server";
import { z } from "zod";
import { learnableStudents } from "@/lib/auth/centres";
import { canSeeChats } from "@/lib/auth/suniChats";
import { checkinsFor, grownUpNotesFor, notesFor } from "@/lib/auth/suniNotes";
import { requireUser } from "@/lib/auth/users";

/**
 * What Suni thinks a child's grown-ups should know, and how the child has said they feel, for their
 * parent, centre or teacher (or an admin). Without a child, a teacher or centre gets the latest
 * notes across their students.
 */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const asked = request.nextUrl.searchParams.get("learner");
  if (asked) {
    const learner = z.uuid().safeParse(asked);
    if (!learner.success) return Response.json({ error: "Which child?" }, { status: 400 });
    if (!(await canSeeChats(result.user, learner.data))) return Response.json({ error: "You don't have access to this." }, { status: 403 });
    const [notes, checkins] = await Promise.all([notesFor(learner.data), checkinsFor(learner.data)]);
    return Response.json({ notes: notes.forGrownUps.toReversed(), checkins });
  }

  const students = await learnableStudents(result.user);
  if (!students) return Response.json({ error: "This is for tutoring centres and their teachers." }, { status: 403 });
  const seen = new Map<string, string>();
  for (const s of [...students.classes.flatMap((c) => c.students), ...students.unassigned]) seen.set(s.id, s.name);
  const week = Date.now() - 7 * 86_400_000;
  const notes = await grownUpNotesFor([...seen.keys()]);
  const recent = [...seen].map(([id, name]) => ({
    learnerId: id,
    name,
    notes: (notes.get(id) ?? []).filter((n) => n.at >= week).toReversed(),
  }));
  return Response.json({ students: recent.filter((s) => s.notes.length) });
}
