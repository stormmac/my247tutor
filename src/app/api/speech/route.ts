import { NextResponse, type NextRequest } from "next/server";
import { SOUND_IPA } from "@/lib/phonics/sequence";
import { azureSpeechConfigured, MAX_SPEECH_LENGTH, synthesize } from "@/lib/tutor/azureSpeech";

/**
 * Suni's voice. With no text, says whether the Australian cloud voice is set up. With `text` (and
 * `word=1` for a word on its own, and `ipa` for a phonics sound), the line as MP3. The same line always sounds the same, so it's
 * cached: a word in the reading check is only made once.
 */
export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  if (text === null) return NextResponse.json({ enabled: azureSpeechConfigured() });
  if (!azureSpeechConfigured()) return NextResponse.json({ error: "The cloud voice isn't set up." }, { status: 503 });
  const clean = text.trim();
  if (!clean || clean.length > MAX_SPEECH_LENGTH) return NextResponse.json({ error: "Nothing to say." }, { status: 400 });
  // Only the sounds the phonics program teaches, so the route can't be fed any SSML.
  const ipa = request.nextUrl.searchParams.get("ipa") ?? undefined;
  if (ipa !== undefined && !SOUND_IPA.has(ipa)) return NextResponse.json({ error: "Not a sound we teach." }, { status: 400 });
  const audio = await synthesize(clean, request.nextUrl.searchParams.get("word") === "1", ipa);
  if (!audio) return NextResponse.json({ error: "The voice didn't work." }, { status: 502 });
  return new NextResponse(audio, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable" },
  });
}
