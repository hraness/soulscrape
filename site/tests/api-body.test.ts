import { expect, test } from "bun:test";

import { readJsonBody } from "../lib/api";

const limit = 512 * 1024;
const encode = (value: string) => new TextEncoder().encode(value);

function streamed(chunks: Uint8Array[], headers?: HeadersInit) {
  let reads = 0;
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      const chunk = chunks[reads++];
      if (chunk === undefined) controller.close();
      else controller.enqueue(chunk);
    },
    cancel() { cancelled = true; },
  }, { highWaterMark: 0 });
  const request = new Request("https://soulscrape.com/api/v1/people", { method: "PUT", body, headers });
  return { request, reads: () => reads, cancelled: () => cancelled };
}

test("rejects invalid and oversized declared lengths before pulling the body", async () => {
  for (const length of ["-1", "no", "1.5", String(limit + 1)]) {
    const stream = streamed([encode("{}")], { "content-length": length });
    expect(await readJsonBody(stream.request)).toBeNull();
    expect(stream.reads()).toBe(0);
    expect(stream.cancelled()).toBe(true);
  }
});

test("cancels an oversized chunked body as soon as cumulative bytes cross the ceiling", async () => {
  const stream = streamed([
    encode('{"text":"'), encode("a".repeat(limit / 2)), encode("a".repeat(limit / 2)), encode('"}'),
  ]);
  expect(await readJsonBody(stream.request)).toBeNull();
  expect(stream.reads()).toBe(3);
  expect(stream.cancelled()).toBe(true);
});

test("does not trust a smaller declared length or a single oversized chunk", async () => {
  const stream = streamed([encode("a".repeat(limit + 1)), encode("unread")], { "content-length": "2" });
  expect(await readJsonBody(stream.request)).toBeNull();
  expect(stream.reads()).toBe(1);
  expect(stream.cancelled()).toBe(true);
});

test("accepts a valid JSON body at the exact byte ceiling", async () => {
  const text = "a".repeat(limit - 11);
  const stream = streamed([encode('{"text":"' + text + '"}')]);
  expect(await readJsonBody(stream.request)).toEqual({ text });
  expect(stream.cancelled()).toBe(false);
});

test("counts UTF-8 bytes and decodes a multibyte character split between chunks", async () => {
  const encoded = encode('{"text":"🦊"}');
  const stream = streamed(Array.from(encoded, byte => new Uint8Array([byte])));
  expect(await readJsonBody(stream.request)).toEqual({ text: "🦊" });
  const oversized = streamed([encode('{"text":"' + "é".repeat(limit / 2) + '"}')]);
  expect(await readJsonBody(oversized.request)).toBeNull();
  expect(oversized.cancelled()).toBe(true);
});

test("preserves JSON parsing behavior and returns controlled invalid bodies", async () => {
  for (const text of ["", "{", '{"text":undefined}', "true false"]) {
    expect(await readJsonBody(streamed([encode(text)]).request)).toBeNull();
  }
  expect(await readJsonBody(streamed([encode('{"value":1,"value":2}')]).request)).toEqual({ value: 2 });
  expect(await readJsonBody(new Request("https://soulscrape.com", { method: "POST" }))).toBeNull();
  const failed = new ReadableStream<Uint8Array>({ pull(controller) { controller.error(new Error("synthetic failure")); } });
  expect(await readJsonBody(new Request("https://soulscrape.com", { method: "POST", body: failed }))).toBeNull();
});

test("a locked stream or failed cancellation does not escape as an API exception", async () => {
  const locked = streamed([encode("{}")]);
  const reader = locked.request.body!.getReader();
  expect(await readJsonBody(locked.request)).toBeNull();
  reader.releaseLock();
  const body = new ReadableStream<Uint8Array>({
    pull(controller) { controller.enqueue(encode("a".repeat(limit + 1))); },
    cancel() { throw new Error("synthetic cancel failure"); },
  }, { highWaterMark: 0 });
  expect(await readJsonBody(new Request("https://soulscrape.com", { method: "POST", body }))).toBeNull();
});
