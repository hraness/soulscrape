#!/usr/bin/env bun
/** Make a small local line drawing only from a selected, source-bound headshot. */

import { createHash } from "node:crypto";
import { constants, closeSync, fstatSync, mkdirSync, mkdtempSync, openSync, readSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";

import { strictJsonParse } from "./source-packet.ts";

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_PIXELS = 24_000_000;
const LIMITS = ["-limit", "thread", "1", "-limit", "width", "8192", "-limit", "height", "8192", "-limit", "memory", "192MiB", "-limit", "map", "192MiB", "-limit", "disk", "0", "-limit", "time", "20"];
const DETAILS = {
  low: ["0x1.5", "0x1+10%+30%"],
  medium: ["0x0.8", "0x1+6%+18%"],
  high: ["0x0.5", "0x1+3%+10%"],
} as const;

export type HeadshotSelection = Readonly<{
  schemaVersion: "soulscrape.headshot-selection.v1";
  status: "selected";
  subject: Readonly<{ displayName: string; anchors: readonly string[] }>;
  identityVerified: true;
  identityEvidence: string;
  sourcePageUrl?: string;
  imageUrl?: string;
  sourceTier: "linkedin" | "social" | "wikipedia" | "web" | "user";
  accessedAt: string;
  localPath: string;
  sha256: string;
  credit: string;
  license: string;
  reuse: Readonly<{ status: "permitted" | "unknown" | "restricted"; basis: string }>;
}>;

export type DrawingOptions = Readonly<{
  headshot: string;
  outDir: string;
  magick?: string;
  size?: number;
  detail?: keyof typeof DETAILS;
  /** Square crop in auto-oriented source pixels: left, top, side. */
  crop?: readonly [number, number, number];
}>;

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label}: expected an object`);
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string, maximum = 1200): string {
  if (typeof value !== "string" || !value.trim() || value.length > maximum || /[\x00-\x1f\x7f]/u.test(value)) {
    throw new Error(`${label}: expected nonempty text of at most ${maximum} characters`);
  }
  return value;
}

function publicUrl(value: unknown, label: string): string {
  const raw = text(value, label, 2048);
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error(`${label}: expected an HTTP(S) URL without credentials`);
  }
  return raw;
}

export function parseHeadshotSelection(value: unknown): HeadshotSelection {
  const record = object(value, "headshot");
  if (record.schemaVersion !== "soulscrape.headshot-selection.v1" || record.status !== "selected" || record.identityVerified !== true) {
    throw new Error("headshot: requires a selected, identity-verified soulscrape.headshot-selection.v1 receipt");
  }
  const subject = object(record.subject, "subject");
  const minimumAnchors = record.sourceTier === "user" ? 0 : 1;
  if (!Array.isArray(subject.anchors) || subject.anchors.length < minimumAnchors || subject.anchors.length > 8) {
    throw new Error(`subject.anchors: expected ${minimumAnchors}–8 identity source URLs`);
  }
  if (typeof record.sourceTier !== "string" || !["linkedin", "social", "wikipedia", "web", "user"].includes(record.sourceTier)) throw new Error("sourceTier: invalid source tier");
  const reuse = object(record.reuse, "reuse");
  if (typeof reuse.status !== "string" || !["permitted", "unknown", "restricted"].includes(reuse.status)) throw new Error("reuse.status: invalid reuse status");
  const localPath = text(record.localPath, "localPath", 4096);
  if (!isAbsolute(localPath)) throw new Error("localPath: must be absolute");
  const sha256 = text(record.sha256, "sha256", 64);
  if (!/^[a-f0-9]{64}$/u.test(sha256)) throw new Error("sha256: expected 64 lowercase hex characters");
  const accessedAt = text(record.accessedAt, "accessedAt", 40);
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?Z$/u.test(accessedAt) || !Number.isFinite(Date.parse(accessedAt))) {
    throw new Error("accessedAt: expected a UTC ISO timestamp");
  }
  const sourcePageUrl = record.sourcePageUrl === undefined && record.sourceTier === "user"
    ? undefined : publicUrl(record.sourcePageUrl, "sourcePageUrl");
  return {
    schemaVersion: "soulscrape.headshot-selection.v1", status: "selected", identityVerified: true,
    subject: { displayName: text(subject.displayName, "subject.displayName", 200), anchors: subject.anchors.map((url) => publicUrl(url, "subject.anchors")) },
    identityEvidence: text(record.identityEvidence, "identityEvidence"),
    ...(sourcePageUrl === undefined ? {} : { sourcePageUrl }),
    ...(record.imageUrl === undefined ? {} : { imageUrl: publicUrl(record.imageUrl, "imageUrl") }),
    sourceTier: record.sourceTier as HeadshotSelection["sourceTier"], accessedAt, localPath, sha256,
    credit: text(record.credit, "credit"), license: text(record.license, "license"),
    reuse: { status: reuse.status as HeadshotSelection["reuse"]["status"], basis: text(reuse.basis, "reuse.basis") },
  };
}

function boundedFile(path: string, maximum: number): Buffer {
  const descriptor = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const info = fstatSync(descriptor);
    if (!info.isFile() || info.size < 1 || info.size > maximum) throw new Error(`input must be a nonempty regular file of at most ${maximum} bytes`);
    const bytes = Buffer.alloc(maximum + 1);
    let length = 0;
    while (length < bytes.length) {
      const count = readSync(descriptor, bytes, length, bytes.length - length, null);
      if (count === 0) break;
      length += count;
    }
    if (length > maximum) throw new Error("input changed beyond the byte limit");
    return bytes.subarray(0, length);
  } finally {
    closeSync(descriptor);
  }
}

function digest(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function rasterFormat(bytes: Uint8Array): "PNG" | "JPEG" | "WEBP" {
  const buffer = Buffer.from(bytes);
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "PNG";
  if (buffer.length >= 3 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return "JPEG";
  if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return "WEBP";
  throw new Error("headshot: use a local PNG, JPEG, or WebP raster; other formats are not decoded");
}

function run(magick: string, args: readonly string[], directory: string): Buffer {
  const result = Bun.spawnSync([magick, ...args], {
    cwd: directory, stdout: "pipe", stderr: "pipe", timeout: 25_000, maxBuffer: 2 * 1024 * 1024,
    env: { ...process.env, MAGICK_THREAD_LIMIT: "1", MAGICK_TEMPORARY_PATH: directory },
  });
  if (result.exitCode !== 0 || result.signalCode) {
    throw new Error(`ImageMagick failed or exceeded its processing budget: ${result.stderr.toString().slice(0, 800)}`);
  }
  return result.stdout;
}

export function prepareLineDrawing(options: DrawingOptions): Record<string, unknown> {
  const size = options.size ?? 512;
  if (!Number.isInteger(size) || size < 128 || size > 1024) throw new Error("size: use an integer from 128 to 1024");
  const detail = options.detail ?? "medium";
  if (!Object.hasOwn(DETAILS, detail)) throw new Error("detail: use low, medium, or high");
  if (options.crop && (options.crop.length !== 3 || options.crop.some((n) => !Number.isSafeInteger(n) || n < 0) || options.crop[2] < 16)) {
    throw new Error("crop: use nonnegative integer left,top,side with side at least 16 pixels");
  }
  const selection = parseHeadshotSelection(strictJsonParse(boundedFile(options.headshot, 32 * 1024)));
  if (selection.reuse.status === "restricted") throw new Error("headshot: recorded reuse restrictions prevent this transformation; choose an allowed source");
  const bytes = boundedFile(selection.localPath, MAX_IMAGE_BYTES);
  if (digest(bytes) !== selection.sha256) throw new Error("headshot: source bytes no longer match the verified SHA-256");
  const format = rasterFormat(bytes);
  const magick = options.magick ?? Bun.which("magick");
  if (!magick) throw new Error("ImageMagick 7 is required for this optional local step; install it from imagemagick.org or pass --magick /absolute/path/to/magick");
  if (!isAbsolute(magick)) throw new Error("magick: executable path must be absolute");
  const scratch = mkdtempSync(join(tmpdir(), "soulscrape-portrait-"));
  try {
    const version = run(magick, ["-version"], scratch).toString().split("\n")[0]!;
    if (!/^Version: ImageMagick 7\./u.test(version)) throw new Error("ImageMagick 7 is required");
    const input = join(scratch, "source");
    writeFileSync(input, bytes, { mode: 0o600 });
    const source = `${format}:${input}[0]`;
    const dimensions = run(magick, ["identify", ...LIMITS, "-ping", "-format", "%w %h %[orientation]", source], scratch).toString().trim().split(" ");
    const [width, height] = dimensions.slice(0, 2).map(Number) as [number, number];
    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 16 || height < 16 || width > 8192 || height > 8192 || width * height > MAX_PIXELS) {
      throw new Error("headshot: source dimensions must be 16–8192 pixels per side and at most 24 million pixels");
    }
    const rotated = ["LeftTop", "RightTop", "RightBottom", "LeftBottom"].includes(dimensions[2] ?? "");
    const orientedWidth = rotated ? height : width;
    const orientedHeight = rotated ? width : height;
    const side = Math.min(orientedWidth, orientedHeight);
    const crop = options.crop ?? [Math.floor((orientedWidth - side) / 2), Math.floor((orientedHeight - side) / 2), side];
    if (crop[0] + crop[2] > orientedWidth || crop[1] + crop[2] > orientedHeight) throw new Error("crop: square extends beyond the auto-oriented source");
    const cropPath = join(scratch, "crop.png");
    const linePath = join(scratch, "line.png");
    const png = ["-strip", "-define", "png:exclude-chunks=all"];
    run(magick, [...LIMITS, source, "-auto-orient", "-background", "white", "-alpha", "remove", "-alpha", "off", "-colorspace", "sRGB", "-crop", `${crop[2]}x${crop[2]}+${crop[0]}+${crop[1]}`, "+repage", "-resize", `${size}x${size}!`, ...png, `PNG24:${cropPath}`], scratch);
    const [blur, canny] = DETAILS[detail];
    run(magick, [...LIMITS, `PNG:${cropPath}`, "-colorspace", "gray", "-blur", blur, "-canny", canny, "-morphology", "Dilate", "Disk:1", "-negate", "-threshold", "50%", "-depth", "8", ...png, `PNG:${linePath}`], scratch);
    const cropped = boundedFile(cropPath, 4 * 1024 * 1024);
    const drawing = boundedFile(linePath, 4 * 1024 * 1024);
    const receipt = {
      schemaVersion: "soulscrape.line-drawing.v1", generatedAt: new Date().toISOString(),
      headshot: selection,
      transform: { algorithm: "canny-v1", tool: version, size, detail, blur, canny, stroke: "Dilate Disk:1", crop: { left: crop[0], top: crop[1], side: crop[2] }, inputFormat: format, frame: 0, background: "white", agentPolished: false },
      outputs: { crop: { file: "portrait-crop.png", sha256: digest(cropped) }, drawing: { file: "portrait-line.png", sha256: digest(drawing) } },
      publication: "Requires review of the portrait and recorded source rights before publication.",
      warnings: selection.reuse.status === "unknown" ? ["Source reuse rights are unknown. Keep the derivative local until the intended use is resolved."] : [],
    };
    const out = resolve(options.outDir);
    // A fresh directory protects the source and any earlier or manually polished output.
    mkdirSync(out, { mode: 0o700 });
    writeFileSync(join(out, "portrait-crop.png"), cropped, { flag: "wx", mode: 0o600 });
    writeFileSync(join(out, "portrait-line.png"), drawing, { flag: "wx", mode: 0o600 });
    writeFileSync(join(out, "portrait.json"), JSON.stringify(receipt, null, 2) + "\n", { flag: "wx", mode: 0o600 });
    return { outputDirectory: out, ...receipt };
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

const HELP = "Usage: bun scripts/prepare-line-drawing.ts --headshot /absolute/headshot.json --out-dir /absolute/new-directory [--size 512] [--detail low|medium|high] [--crop left,top,side] [--magick /absolute/path/to/magick]";

export function main(args = process.argv.slice(2)): void {
  if (args.length === 1 && args[0] === "--help") { process.stdout.write(HELP + "\n"); return; }
  const values = new Map<string, string>();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]!;
    const value = args[i + 1];
    if (!["--headshot", "--out-dir", "--size", "--detail", "--crop", "--magick"].includes(key) || value === undefined || value.startsWith("--") || values.has(key)) throw new Error(HELP);
    values.set(key, value);
  }
  if (!values.has("--headshot") || !values.has("--out-dir")) throw new Error(HELP);
  const result = prepareLineDrawing({
    headshot: values.get("--headshot")!, outDir: values.get("--out-dir")!,
    ...(values.has("--size") ? { size: Number(values.get("--size")) } : {}),
    ...(values.has("--detail") ? { detail: values.get("--detail") as keyof typeof DETAILS } : {}),
    ...(values.has("--magick") ? { magick: values.get("--magick")! } : {}),
    ...(values.has("--crop") ? { crop: values.get("--crop")!.split(",").map(Number) as [number, number, number] } : {}),
  });
  process.stdout.write(JSON.stringify(result) + "\n");
}

if (import.meta.main) {
  try { main(); } catch (error) {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
