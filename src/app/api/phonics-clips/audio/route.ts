import type { NextRequest } from "next/server";
import { getClip } from "@/lib/auth/phonicsClips";
import { accountsEnabled } from "@/lib/auth/session";
import { isPhoneme } from "@/lib/phonics/clips";

/** One recorded sound. Its address carries the recording's version, so it can be cached for good. */
export async function GET(request: NextRequest) {
  const ipa = request.nextUrl.searchParams.get("ipa") ?? "";
  if (!accountsEnabled() || !isPhoneme(ipa)) return Response.json({ error: "No such sound." }, { status: 404 });
  const clip = await getClip(ipa).catch(() => null);
  if (!clip) return Response.json({ error: "That sound hasn't been recorded." }, { status: 404 });
  const versioned = request.nextUrl.searchParams.has("v");
  return new Response(new Uint8Array(clip.audio), {
    headers: {
      "Content-Type": clip.mime,
      "Cache-Control": versioned ? "public, max-age=31536000, immutable" : "no-store",
    },
  });
}
