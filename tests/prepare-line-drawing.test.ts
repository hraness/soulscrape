import { afterEach, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { deflateSync } from "node:zlib";

import { parseHeadshotSelection, prepareLineDrawing, rasterFormat } from "../skills/soulscrape/scripts/prepare-line-drawing.ts";

const temporary: string[] = [];
afterEach(() => { for (const path of temporary.splice(0)) rmSync(path, { recursive: true, force: true }); });
const magick = Bun.which("magick") ?? (existsSync("/opt/homebrew/bin/magick") ? "/opt/homebrew/bin/magick" : null);
const helper = resolve(import.meta.dir, "../skills/soulscrape/scripts/prepare-line-drawing.ts");

function hash(bytes: Uint8Array): string { return createHash("sha256").update(bytes).digest("hex"); }

function png(): Buffer {
  const width = 64;
  const height = 80;
  function chunk(name: string, data: Buffer): Buffer {
    const body = Buffer.concat([Buffer.from(name), data]);
    let crc = 0xffffffff;
    for (const byte of body) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
    const size = Buffer.alloc(4);
    size.writeUInt32BE(data.length);
    const checksum = Buffer.alloc(4);
    checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
    return Buffer.concat([size, body, checksum]);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8;
  const rows = Buffer.alloc((width + 1) * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const inEllipse = ((x - 32) / 21) ** 2 + ((y - 35) / 27) ** 2 < 1;
      const eye = y >= 28 && y < 32 && (Math.abs(x - 23) < 3 || Math.abs(x - 41) < 3);
      rows[y * (width + 1) + x + 1] = eye ? 20 : inEllipse ? 150 : 255;
    }
  }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", header), chunk("IDAT", deflateSync(rows)), chunk("IEND", Buffer.alloc(0))]);
}

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "soulscrape-drawing-test-"));
  temporary.push(directory);
  const image = join(directory, "source.png");
  writeFileSync(image, png());
  const selection = {
    schemaVersion: "soulscrape.headshot-selection.v1", status: "selected", identityVerified: true,
    subject: { displayName: "Test subject", anchors: ["https://example.org/person"] },
    identityEvidence: "The subject's official page explicitly labels this photograph.",
    sourceTier: "web", sourcePageUrl: "https://example.org/person", accessedAt: "2026-09-19T00:00:00Z",
    localPath: image, sha256: hash(readFileSync(image)), credit: "Test fixture", license: "Test fixture",
    reuse: { status: "permitted", basis: "Synthetic fixture created for this test." },
  };
  const receipt = join(directory, "headshot.json");
  function save() { writeFileSync(receipt, JSON.stringify(selection)); }
  save();
  return { directory, image, selection, receipt, save };
}

describe("headshot admission", () => {
  test("requires a selected identity-bound source, exact enum types, and reuse evidence", () => {
    const { selection } = fixture();
    expect(parseHeadshotSelection(selection).subject.displayName).toBe("Test subject");
    for (const status of ["ambiguous", "unavailable"]) expect(() => parseHeadshotSelection({ ...selection, status })).toThrow("selected");
    expect(() => parseHeadshotSelection({ ...selection, identityVerified: false })).toThrow("identity-verified");
    expect(() => parseHeadshotSelection({ ...selection, identityEvidence: "" })).toThrow("identityEvidence");
    expect(() => parseHeadshotSelection({ ...selection, sourceTier: ["web"] })).toThrow("sourceTier");
    expect(() => parseHeadshotSelection({ ...selection, reuse: { ...selection.reuse, status: ["restricted"] } })).toThrow("reuse.status");
    expect(() => parseHeadshotSelection({ ...selection, reuse: { status: "permitted" } })).toThrow("reuse.basis");
    expect(() => parseHeadshotSelection({ ...selection, sourcePageUrl: "https://user:password@example.org" })).toThrow("credentials");
  });

  test("user-attributed local images need no invented public identity URL", () => {
    const { selection } = fixture();
    const user = { ...selection, sourceTier: "user", sourcePageUrl: undefined, subject: { ...selection.subject, anchors: [] } };
    expect(parseHeadshotSelection(user).subject.anchors).toEqual([]);
    expect(() => parseHeadshotSelection({ ...user, sourceTier: "web" })).toThrow("anchors");
  });

  test("rejects changed input, restricted reuse, unsupported formats and symlinks before processing", () => {
    const f = fixture();
    const options = { headshot: f.receipt, outDir: join(f.directory, "output") };
    f.selection.reuse.status = "restricted"; f.save();
    expect(() => prepareLineDrawing(options)).toThrow("restrictions");
    f.selection.reuse.status = "permitted"; f.save();
    writeFileSync(f.image, "changed");
    expect(() => prepareLineDrawing(options)).toThrow("SHA-256");
    f.selection.sha256 = hash(readFileSync(f.image)); f.save();
    expect(() => prepareLineDrawing(options)).toThrow("PNG, JPEG, or WebP");
    const link = join(f.directory, "linked.png"); symlinkSync(f.image, link);
    f.selection.localPath = link; f.save();
    expect(() => prepareLineDrawing(options)).toThrow();
    expect(existsSync(options.outDir)).toBe(false);
    expect(() => rasterFormat(Buffer.from("<svg></svg>"))).toThrow("other formats");
  });

  test("rejects FIFO receipt without blocking on open", () => {
    if (process.platform === "win32") return;
    const f = fixture();
    const fifo = join(f.directory, "pipe");
    expect(Bun.spawnSync(["mkfifo", fifo]).exitCode).toBe(0);
    const result = Bun.spawnSync([process.execPath, helper, "--headshot", fifo, "--out-dir", join(f.directory, "output")], { timeout: 2000, stderr: "pipe" });
    expect(result.exitCode).toBe(1);
    expect(result.stderr.toString()).toContain("regular file");
  });

  test("bounds requested work before invoking the decoder", () => {
    const f = fixture();
    const options = { headshot: f.receipt, outDir: join(f.directory, "output") };
    expect(() => prepareLineDrawing({ ...options, size: 100_000 })).toThrow("size");
    expect(() => prepareLineDrawing({ ...options, crop: [0, 0, -1] })).toThrow("crop");
    writeFileSync(f.image, Buffer.alloc(12 * 1024 * 1024 + 1));
    expect(() => prepareLineDrawing(options)).toThrow("at most");
  });
});

describe.skipIf(!magick)("local ImageMagick portrait processing", () => {
  test("produces deterministic square PNGs, preserves source and records provenance", () => {
    const f = fixture();
    const options = { headshot: f.receipt, outDir: join(f.directory, "first"), magick: magick!, size: 128 };
    const first = prepareLineDrawing(options);
    const second = prepareLineDrawing({ ...options, outDir: join(f.directory, "second") });
    const a = readFileSync(join(f.directory, "first", "portrait-line.png"));
    expect(a.equals(readFileSync(join(f.directory, "second", "portrait-line.png")))).toBe(true);
    expect(a.readUInt32BE(16)).toBe(128); expect(a.readUInt32BE(20)).toBe(128);
    expect(hash(readFileSync(f.image))).toBe(f.selection.sha256);
    expect(first.outputs).toEqual(second.outputs);
    expect(first.transform).toMatchObject({ crop: { left: 0, top: 8, side: 64 }, agentPolished: false, size: 128 });
    expect(JSON.parse(readFileSync(join(f.directory, "first", "portrait.json"), "utf8")).headshot).toEqual(f.selection);
    const stats = Bun.spawnSync([magick!, join(f.directory, "first", "portrait-line.png"), "-format", "%[fx:mean]", "info:"], { stdout: "pipe" });
    const whiteFraction = Number(stats.stdout.toString());
    expect(whiteFraction).toBeGreaterThan(0.7); expect(whiteFraction).toBeLessThan(0.99);
  });

  test("handles JPEG and WebP, explicit crops, unknown rights and existing outputs", () => {
    const f = fixture();
    for (const format of ["jpg", "webp"]) {
      const path = join(f.directory, `input.${format}`);
      expect(Bun.spawnSync([magick!, f.image, path]).exitCode).toBe(0);
      f.selection.localPath = path; f.selection.sha256 = hash(readFileSync(path)); f.selection.reuse.status = "unknown"; f.save();
      const options = { headshot: f.receipt, outDir: join(f.directory, format), magick: magick!, crop: [8, 10, 48] as const, detail: "low" as const };
      const receipt = prepareLineDrawing(options);
      expect(receipt.transform).toMatchObject({ crop: { left: 8, top: 10, side: 48 } });
      expect(receipt.warnings).toEqual(["Source reuse rights are unknown. Keep the derivative local until the intended use is resolved."]);
      expect(() => prepareLineDrawing({ ...options, crop: [20, 20, 60] })).toThrow("beyond");
      const previous = readFileSync(join(options.outDir, "portrait-line.png"));
      expect(() => prepareLineDrawing(options)).toThrow("EEXIST");
      expect(readFileSync(join(options.outDir, "portrait-line.png")).equals(previous)).toBe(true);
    }
    const empty = join(f.directory, "existing"); mkdirSync(empty);
    expect(() => prepareLineDrawing({ headshot: f.receipt, outDir: empty, magick: magick! })).toThrow("EEXIST");
  });
});
