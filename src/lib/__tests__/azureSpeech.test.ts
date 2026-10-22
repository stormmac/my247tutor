import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { AZURE_VOICE, speechSsml } = await import("../tutor/azureSpeech");

describe("Azure speech", () => {
  it("uses the Australian voice, says words slower and escapes the text", () => {
    const line = speechSsml(`Tom & "Ann" <3`, false);
    expect(line).toContain(`<voice name="${AZURE_VOICE}">`);
    expect(AZURE_VOICE).toMatch(/^en-AU-/);
    expect(line).toContain("Tom &amp; &quot;Ann&quot; &lt;3");
    expect(speechSsml("cat", true)).toContain(`rate="-25%"`);
  });

  it("says a phonics sound exactly, from its IPA", () => {
    expect(speechSsml("ah", true, "æ")).toContain(`<phoneme alphabet="ipa" ph="æ">ah</phoneme>`);
    expect(speechSsml("ah", true)).not.toContain("phoneme");
  });
});
