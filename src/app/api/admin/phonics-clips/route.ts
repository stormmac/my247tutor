import type { NextRequest } from "next/server";
import { listClips, removeClip, saveClip } from "@/lib/auth/phonicsClips";
import { requireUser } from "@/lib/auth/users";
import { CLIP_TYPES, isPhoneme, MAX_CLIP_BYTES } from "@/lib/phonics/clips";

export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json({ clips: await listClips() });
}

/** Saves a recording of one sound: the audio is the request body, the sound is `?ipa=`. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const ipa = request.nextUrl.searchParams.get("ipa") ?? "";
  if (!isPhoneme(ipa)) return Response.json({ error: "Not a sound we teach." }, { status: 400 });
  const mime = (request.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!CLIP_TYPES.includes(mime)) return Response.json({ error: "That isn't a recording." }, { status: 400 });
  const audio = Buffer.from(await request.arrayBuffer());
  if (!audio.length) return Response.json({ error: "The recording is empty." }, { status: 400 });
  if (audio.length > MAX_CLIP_BYTES)
    return Response.json({ error: "That recording is too long. Keep it to a second or two." }, { status: 400 });
  return Response.json({ clip: await saveClip(result.user.id, ipa, mime, audio) });
}

export async function DELETE(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const ipa = request.nextUrl.searchParams.get("ipa") ?? "";
  if (!isPhoneme(ipa)) return Response.json({ error: "Not a sound we teach." }, { status: 400 });
  return (await removeClip(result.user.id, ipa))
    ? Response.json({ ok: true })
    : Response.json({ error: "That sound hasn't been recorded." }, { status: 404 });
}
