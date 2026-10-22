"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminTabs } from "@/components/AdminTabs";
import { SetupStatus } from "@/components/SetupStatus";
import { useAccount } from "@/components/useAccount";
import { encodeWav, halve, normalise, PHONEMES, trimSilence, type Phoneme } from "@/lib/phonics/clips";
import { forgetClips } from "@/lib/tutor/speech";

/** The longest a recording runs before it stops by itself. */
const MAX_SECONDS = 3;

/** How to say a sound: stop sounds are short, the rest are held. */
function tip(p: Phoneme): string {
  if (p.ipa.endsWith("ə")) return "Short and crisp, with no “uh” after it.";
  if (/^[sfvzmnlɹʃθŋ]$/.test(p.ipa)) return `Hold it for a moment: ${p.graphemes[0].repeat(3)}…`;
  return "Just the sound, not the letter's name.";
}

/** Admins record each phonics sound, which Suni then plays instead of the computer voice. */
export default function SoundsAdminPage() {
  const account = useAccount();
  if (!account.loaded) return <p className="muted">Loading…</p>;
  if (!account.enabled) {
    return (
      <div className="stack" style={{ maxWidth: 720 }}>
        <h1>Admin</h1>
        <SetupStatus />
      </div>
    );
  }
  return <SoundList />;
}

interface Take {
  ipa: string;
  wav: Blob;
  buffer: AudioBuffer;
}

function SoundList() {
  const [clips, setClips] = useState<Map<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState<string | null>(null);
  const [take, setTake] = useState<Take | null>(null);
  const [saving, setSaving] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const audio = () => (ctx.current ??= new AudioContext());

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/phonics-clips");
    const body = (await res.json().catch(() => ({}))) as { clips?: { ipa: string; version: number }[]; error?: string };
    if (!res.ok) return setError(body.error ?? "Couldn't load the recordings.");
    setClips(new Map((body.clips ?? []).map((c) => [c.ipa, c.version])));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function play(buffer: AudioBuffer) {
    const source = audio().createBufferSource();
    source.buffer = buffer;
    source.connect(audio().destination);
    source.start();
  }

  async function playSaved(ipa: string, version: number) {
    setError(null);
    const res = await fetch(`/api/phonics-clips/audio?ipa=${encodeURIComponent(ipa)}&v=${version}`);
    if (!res.ok) return setError("Couldn't play that recording.");
    play(await audio().decodeAudioData(await res.arrayBuffer()));
  }

  async function record(p: Phoneme) {
    setError(null);
    setTake(null);
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: true, autoGainControl: false },
      });
    } catch {
      return setError("The microphone isn't available. Allow it for this site, then try again.");
    }
    void audio().resume();
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream);
    recorder.current = rec;
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      setRecording(null);
      try {
        const raw = await audio().decodeAudioData(await new Blob(chunks, { type: rec.mimeType }).arrayBuffer());
        let samples = normalise(trimSilence(raw.getChannelData(0), raw.sampleRate));
        let rate = raw.sampleRate;
        if (rate >= 44100) {
          samples = halve(samples);
          rate = rate / 2;
        }
        if (samples.length < rate * 0.05) return setError("That was too quiet to hear. Try again a little closer to the microphone.");
        const buffer = audio().createBuffer(1, samples.length, rate);
        buffer.copyToChannel(samples as Float32Array<ArrayBuffer>, 0);
        const wav = new Blob([encodeWav(samples, rate) as Uint8Array<ArrayBuffer>], { type: "audio/wav" });
        setTake({ ipa: p.ipa, wav, buffer });
        play(buffer);
      } catch {
        setError("Couldn't read that recording. Try again.");
      }
    };
    rec.start();
    setRecording(p.ipa);
    stopTimer.current = setTimeout(() => stop(), MAX_SECONDS * 1000);
  }

  function stop() {
    if (stopTimer.current) clearTimeout(stopTimer.current);
    if (recorder.current?.state === "recording") recorder.current.stop();
  }

  async function save() {
    if (!take) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/phonics-clips?ipa=${encodeURIComponent(take.ipa)}`, {
      method: "POST",
      headers: { "Content-Type": "audio/wav" },
      body: take.wav,
    });
    setSaving(false);
    if (!res.ok) return setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "That didn't save.");
    forgetClips();
    setTake(null);
    await load();
  }

  async function remove(p: Phoneme) {
    if (!confirm(`Delete the recording of ${p.graphemes.join(", ")}? Suni will go back to the computer voice for it.`)) return;
    setError(null);
    const res = await fetch(`/api/admin/phonics-clips?ipa=${encodeURIComponent(p.ipa)}`, { method: "DELETE" });
    if (!res.ok) setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "That didn't work.");
    forgetClips();
    await load();
  }

  const done = clips ? PHONEMES.filter((p) => clips.has(p.ipa)).length : 0;

  return (
    <div className="stack">
      <AdminTabs current="sounds" />
      <div>
        <h1 style={{ marginBottom: 4 }}>Phonics sounds</h1>
        <p className="muted" style={{ margin: 0 }}>
          Record each sound the way you&apos;d teach it, and Learn to Read plays your recording instead of the computer voice. Say the pure
          sound: s is “sss”, not “suh”. Record somewhere quiet; the silence before and after is cut off for you.
        </p>
      </div>
      {clips && (
        <p style={{ margin: 0 }}>
          <strong>
            {done} of {PHONEMES.length}
          </strong>{" "}
          sounds recorded.
        </p>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="card sound-recordings">
        {!clips && !error && <p className="muted">Loading…</p>}
        {clips &&
          PHONEMES.map((p) => {
            const version = clips.get(p.ipa);
            const mine = take?.ipa === p.ipa ? take : null;
            const busy = recording !== null && recording !== p.ipa;
            return (
              <div key={p.ipa} className="sound-recording" data-ipa={p.ipa}>
                <div className="sound-recording-name">
                  <span className="sound-recording-graphemes">{p.graphemes.map((g) => g.replace("_", "–")).join("  ")}</span>
                  <span className="small muted">
                    {p.examples.join(", ")}. {tip(p)}
                  </span>
                </div>
                <span className={`small ${version ? "" : "muted"}`}>{version ? "✓ Recorded" : "Not yet"}</span>
                <div className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
                  {recording === p.ipa ? (
                    <button className="btn small" onClick={stop}>
                      ■ Stop
                    </button>
                  ) : (
                    <button className="btn small secondary" onClick={() => record(p)} disabled={busy || saving}>
                      🎙 {version ? "Re-record" : "Record"}
                    </button>
                  )}
                  {mine && (
                    <>
                      <button className="btn small secondary" onClick={() => play(mine.buffer)}>
                        ▶ Hear it
                      </button>
                      <button className="btn small" onClick={save} disabled={saving}>
                        Save
                      </button>
                    </>
                  )}
                  {!mine && version !== undefined && (
                    <>
                      <button
                        className="btn small secondary"
                        onClick={() => playSaved(p.ipa, version)}
                        aria-label={`Play ${p.graphemes[0]}`}
                      >
                        ▶ Play
                      </button>
                      <button className="btn small secondary" onClick={() => remove(p)} aria-label={`Delete ${p.graphemes[0]}`}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
