import type { NextRequest } from "next/server";
import { listClasses, listStudents, listTeachers } from "@/lib/auth/centres";
import { parentsByStudent } from "@/lib/auth/family";
import { MAX_CENTRE_STUDENTS } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";
import { emailEnabled } from "@/lib/email";

/** Everything a tutoring centre manages: its teachers, classes and students. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id, name } = result.user;
  const [teachers, classes, students, parents] = await Promise.all([
    listTeachers(id),
    listClasses(id),
    listStudents(id),
    parentsByStudent(id),
  ]);
  return Response.json({
    name,
    teachers,
    classes,
    students: students.map((s) => ({ ...s, parents: parents.get(s.id) ?? [] })),
    maxStudents: MAX_CENTRE_STUDENTS,
    email: emailEnabled(),
  });
}
