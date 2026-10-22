import "server-only";

/**
 * Suni's Australian voice from Azure's text-to-speech: the same natural voice on every device,
 * where the browser's own voices change from device to device. Used when AZURE_SPEECH_KEY and
 * AZURE_SPEECH_REGION are set; otherwise Suni uses the device's voice.
 */

export const AZURE_VOICE = "en-AU-NatashaNeural";
/** Longer than anything Suni reads aloud in one go, short enough that the route can't be used as a free TTS service. */
export const MAX_SPEECH_LENGTH = 400;

export function azureSpeechConfigured(): boolean {
  return Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
}

const escapeXml = (text: string) =>
  text.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

/**
 * The SSML for a line, or for a word on its own, said more slowly so every sound is clear. With
 * `ipa`, a phonics sound said exactly as written in IPA, since a letter on its own is read as its name.
 */
export function speechSsml(text: string, word: boolean, ipa?: string): string {
  const rate = word ? "-25%" : "-5%";
  const body = ipa ? `<phoneme alphabet="ipa" ph="${escapeXml(ipa)}">${escapeXml(text)}</phoneme>` : escapeXml(text);
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-AU">` +
    `<voice name="${AZURE_VOICE}"><prosody rate="${rate}">${body}</prosody></voice></speak>`
  );
}

/** The line as MP3, or null if Azure couldn't say it. */
export async function synthesize(text: string, word: boolean, ipa?: string): Promise<ArrayBuffer | null> {
  const region = process.env.AZURE_SPEECH_REGION!;
  const res = await fetch(`https://${encodeURIComponent(region)}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY!,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "my247tutor",
    },
    body: speechSsml(text, word, ipa),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res?.ok) {
    if (res) console.error("Azure speech failed", res.status, await res.text().catch(() => ""));
    return null;
  }
  return res.arrayBuffer();
}
