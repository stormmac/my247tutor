import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

// A stand-in for the API that turns down the fallback setting, so the plain retry can be seen.
const bodies: Record<string, unknown>[] = [];
let server: Server;

function sse(text: string): string {
  const events: [string, unknown][] = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id: "m",
          type: "message",
          role: "assistant",
          model: "claude-opus-5-5",
          content: [],
          stop_reason: null,
          usage: { input_tokens: 1, output_tokens: 0 },
        },
      },
    ],
    ["content_block_start", { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } }],
    ["content_block_delta", { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }],
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    ["message_delta", { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 5 } }],
    ["message_stop", { type: "message_stop" }],
  ];
  return events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join("");
}

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const body = JSON.parse(raw);
      bodies.push(body);
      if (body.fallbacks) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ type: "error", error: { type: "invalid_request_error", message: "fallbacks: not accepted" } }));
      } else if (!body.stream) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            id: "m",
            type: "message",
            role: "assistant",
            model: "claude-opus-5-5",
            content: [{ type: "text", text: "Hello there, lovely friend!" }],
            stop_reason: "end_turn",
            usage: { input_tokens: 1, output_tokens: 5 },
          }),
        );
      } else {
        res.writeHead(200, { "content-type": "text/event-stream" });
        res.end(sse("I'm buzzing, thanks for asking!"));
      }
    });
  });
  await new Promise<void>((r) => server.listen(0, r));
  process.env.ANTHROPIC_BASE_URL = `http://localhost:${(server.address() as AddressInfo).port}`;
  process.env.ANTHROPIC_API_KEY = "test";
  delete process.env.TUTOR_MOCK;
});

afterAll(() => server.close());

describe("streamTutorReply", () => {
  it("tries a plain request when the API turns the first one down", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { streamTutorReply } = await import("../tutor/claude");
    let reply = "";
    for await (const text of streamTutorReply("Year 3", [{ role: "user", content: "How is Suni today?" }])) reply += text;
    expect(reply).toBe("I'm buzzing, thanks for asking!");
    expect(bodies).toHaveLength(2);
    expect(bodies[1]).not.toHaveProperty("fallbacks");
  });

  it("the admin test says which request fails and why", async () => {
    const { checkTutor } = await import("../tutor/claude");
    const check = await checkTutor();
    expect(check.keySet).toBe(true);
    expect(check.tries.map((t) => [t.label, t.ok, t.status])).toEqual([
      ["Chat request", false, 400],
      ["Plain request", true, 200],
    ]);
    expect(check.tries[0].detail).toContain("fallbacks: not accepted");
    expect(check.tries[1].detail).toBe("Hello there, lovely friend!");
  });
});
