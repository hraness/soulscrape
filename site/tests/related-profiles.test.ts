import { expect, test } from "bun:test";
import { loadRelatedProfiles } from "../lib/related-profiles";
import { createProfileResolver } from "../lib/profile-identity";

function row(handle: string, wikidataId?: string) {
  return { username: "publisher", handle, displayName: handle, subjectKind: "person", relations: [], ...(wikidataId === undefined ? {} : { wikidataId }) };
}
function page(rows: unknown[], nextCursor: string | null = null, generation = 0) {
  return { rows, nextCursor, isDone: nextCursor === null, generation };
}

test("collects all eight publisher pages before resolving identities and retains cross-page ambiguity", async () => {
  const values = Array.from({ length: 200 }, (_, i) => row("subject-" + i, i === 0 || i === 199 ? "Q123" : undefined));
  const cursors: (string | null)[] = [];
  const rows = await loadRelatedProfiles("publisher", async ({ username, cursor }) => {
    expect(username).toBe("publisher"); cursors.push(cursor);
    const start = Number(cursor ?? 0);
    return page(values.slice(start, start + 25), start + 25 === 200 ? null : String(start + 25));
  });
  expect(rows).toHaveLength(200);
  expect(cursors).toEqual([null, "25", "50", "75", "100", "125", "150", "175"]);
  expect(createProfileResolver(rows!)("publisher", { target: "authored-alias", targetWikidataId: "Q123" })).toBeNull();
});

test("can cross an empty page but rejects a repeated continuation or duplicate profile", async () => {
  let calls = 0;
  expect(await loadRelatedProfiles("publisher", async () => ++calls === 1 ? page([], "second") : page([row("subject")]))).toHaveLength(1);
  calls = 0;
  expect(await loadRelatedProfiles("publisher", async () => { calls++; return page([], "repeat"); })).toBeNull();
  expect(calls).toBe(2);
  calls = 0;
  expect(await loadRelatedProfiles("publisher", async () => ++calls === 1 ? page([row("subject")], "second") : page([row("subject")]))).toBeNull();
});

test("discards partial results on backend failure or unfinished eighth page", async () => {
  let calls = 0;
  expect(await loadRelatedProfiles("publisher", async () => { if (++calls === 1) return page([row("subject")], "second"); throw new Error("private upstream detail"); })).toBeNull();
  calls = 0;
  expect(await loadRelatedProfiles("publisher", async () => page([row("subject-" + ++calls)], String(calls)))).toBeNull();
  expect(calls).toBe(8);
});

test("rejects a publisher generation change between pages without authorizing partial identity context", async () => {
  let calls = 0;
  const rows = await loadRelatedProfiles("publisher", async () => ++calls === 1
    ? page([row("unique-before-withdrawal", "Q123")], "second", 41)
    : page([row("new-binding", "Q123")], null, 42));
  expect(rows).toBeNull();
  expect(calls).toBe(2);
});

test("rejects malformed envelopes, foreign rows, unsafe nested records and over-limit pages", async () => {
  for (const invalid of [
    null, [], { rows: [], nextCursor: null, isDone: false }, { rows: [], nextCursor: "next", isDone: true },
    { ...page([]), generation: undefined }, { ...page([]), generation: -1 }, { ...page([]), generation: 1.5 },
    page([{ ...row("subject"), username: "foreign" }]), page([{ ...row("subject"), relations: [null] }]),
    page([{ ...row("subject"), appearances: [{ title: "Talk", participantHandles: [null] }] }]),
    page(Array.from({ length: 26 }, (_, i) => row("subject-" + i))),
  ]) expect(await loadRelatedProfiles("publisher", async () => invalid)).toBeNull();
});

test("bounds retained context bytes independently of row counts", async () => {
  const oversized = { ...row("subject"), summary: "a".repeat(16 * 1024 * 1024) };
  expect(await loadRelatedProfiles("publisher", async () => page([oversized]))).toBeNull();
});
