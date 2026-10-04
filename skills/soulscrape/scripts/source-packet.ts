const MAX_SAFE_INTEGER = 9_007_199_254_740_991n;

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | JsonObject;

export type JsonObject = { [key: string]: JsonValue };

export class ArchiveError extends Error {
  override readonly name = "ArchiveError";
}

export class PacketValidationError extends Error {
  override readonly name = "PacketValidationError";
}

export function failPacket(path: string, message: string): never {
  throw new PacketValidationError(`${path}: ${message}`);
}

function containsUnpairedSurrogate(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!Number.isInteger(next) || next < 0xdc00 || next > 0xdfff) return true;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

function unsupportedType(value: unknown): string {
  if (value === undefined) return "undefined";
  if (typeof value === "symbol") return "symbol";
  if (typeof value === "bigint") return "bigint";
  if (typeof value === "function") return "function";
  return typeof value;
}

function encodeCanonical(value: unknown): string {
  if (value === null) return "null";
  if (value === true) return "true";
  if (value === false) return "false";
  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      throw new ArchiveError("floating-point values are not supported in source packets");
    }
    if (!Number.isSafeInteger(value)) {
      throw new ArchiveError("integer exceeds the interoperable JSON range");
    }
    return Object.is(value, -0) ? "0" : String(value);
  }
  if (typeof value === "string") {
    if (containsUnpairedSurrogate(value)) {
      throw new ArchiveError("unpaired Unicode surrogate in source packet");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    const encoded: string[] = [];
    for (let index = 0; index < value.length; index += 1) {
      encoded.push(encodeCanonical(value[index]));
    }
    return `[${encoded.join(",")}]`;
  }
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new ArchiveError(`unsupported source packet value: ${unsupportedType(value)}`);
    }
    const symbols = Object.getOwnPropertySymbols(value);
    if (symbols.length !== 0) {
      throw new ArchiveError("source packet object keys must be strings");
    }
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return `{${keys
      .map((key) => `${encodeCanonical(key)}:${encodeCanonical(record[key])}`)
      .join(",")}}`;
  }
  throw new ArchiveError(`unsupported source packet value: ${unsupportedType(value)}`);
}

/** Encode Ensoul's integer-only JSON subset using RFC 8785 key ordering. */
export function canonicalText(value: unknown): string {
  return encodeCanonical(value);
}

/** Encode Ensoul's integer-only JSON subset using RFC 8785 JCS. */
export function canonicalBytes(value: unknown): Uint8Array {
  return new TextEncoder().encode(canonicalText(value));
}

/** SHA-256 (FIPS 180-4) in portable TypeScript: Bun, Node, Convex, and browser runtimes. */
const ROUND_CONSTANTS = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
  0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814,
  0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
  0xc67178f2,
]);

const INITIAL_STATE = new Uint32Array([
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
]);

const HEX = "0123456789abcdef";

function rotateRight(value: number, bits: number): number {
  return ((value >>> bits) | (value << (32 - bits))) >>> 0;
}

function portableSha256Hex(data: Uint8Array): string {
  const bitLength = BigInt(data.byteLength) * 8n;
  const paddedLength = (((data.byteLength + 8) >> 6) + 1) << 6;
  const padded = new Uint8Array(paddedLength);
  padded.set(data);
  padded[data.byteLength] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 8, Number(bitLength >> 32n));
  view.setUint32(paddedLength - 4, Number(bitLength & 0xffffffffn));

  const state = new Uint32Array(INITIAL_STATE);
  const schedule = new Uint32Array(64);

  for (let block = 0; block < paddedLength; block += 64) {
    for (let t = 0; t < 16; t += 1) {
      schedule[t] = view.getUint32(block + t * 4);
    }
    for (let t = 16; t < 64; t += 1) {
      const w15 = schedule[t - 15]!;
      const w2 = schedule[t - 2]!;
      const s0 = rotateRight(w15, 7) ^ rotateRight(w15, 18) ^ (w15 >>> 3);
      const s1 = rotateRight(w2, 17) ^ rotateRight(w2, 19) ^ (w2 >>> 10);
      schedule[t] = (schedule[t - 16]! + s0 + schedule[t - 7]! + s1) >>> 0;
    }

    let a = state[0]!;
    let b = state[1]!;
    let c = state[2]!;
    let d = state[3]!;
    let e = state[4]!;
    let f = state[5]!;
    let g = state[6]!;
    let h = state[7]!;

    for (let t = 0; t < 64; t += 1) {
      const s1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
      const choice = (e & f) ^ (~e & g);
      const temporary1 = (h + s1 + choice + ROUND_CONSTANTS[t]! + schedule[t]!) >>> 0;
      const s0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
      const majority = (a & b) ^ (a & c) ^ (b & c);
      const temporary2 = (s0 + majority) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temporary1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temporary1 + temporary2) >>> 0;
    }

    state[0] = (state[0]! + a) >>> 0;
    state[1] = (state[1]! + b) >>> 0;
    state[2] = (state[2]! + c) >>> 0;
    state[3] = (state[3]! + d) >>> 0;
    state[4] = (state[4]! + e) >>> 0;
    state[5] = (state[5]! + f) >>> 0;
    state[6] = (state[6]! + g) >>> 0;
    state[7] = (state[7]! + h) >>> 0;
  }

  let digest = "";
  for (const word of state) {
    for (let shift = 28; shift >= 0; shift -= 4) {
      digest += HEX[(word >>> shift) & 0xf];
    }
  }
  return digest;
}

export function sha256Hex(data: Uint8Array): string {
  return typeof Bun === "undefined"
    ? portableSha256Hex(data)
    : new Bun.CryptoHasher("sha256").update(data).digest("hex");
}

export function rejectNonIJson(value: unknown, path = "packet"): asserts value is JsonValue {
  if (value === null || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      failPacket(path, "floating-point values are not allowed by this packet schema");
    }
    if (!Number.isSafeInteger(value)) {
      failPacket(path, "integer exceeds the interoperable JSON range");
    }
    return;
  }
  if (typeof value === "string") {
    if (containsUnpairedSurrogate(value)) {
      failPacket(path, "contains an unpaired Unicode surrogate");
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((member, index) => rejectNonIJson(member, `${path}[${index}]`));
    return;
  }
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      failPacket(path, "contains a non-JSON value");
    }
    if (Object.getOwnPropertySymbols(value).length !== 0) {
      failPacket(`${path}.key`, "contains a non-JSON value");
    }
    for (const [key, member] of Object.entries(value)) {
      rejectNonIJson(key, `${path}.key`);
      rejectNonIJson(member, `${path}.${key}`);
    }
    return;
  }
  failPacket(path, "contains a non-JSON value");
}

class JsonSyntaxError extends Error {}

class StrictJsonParser {
  private index = 0;

  constructor(private readonly text: string) {}

  parse(): JsonValue {
    this.skipWhitespace();
    const value = this.parseValue();
    this.skipWhitespace();
    if (this.index !== this.text.length) throw new JsonSyntaxError();
    return value;
  }

  private parseValue(): JsonValue {
    const character = this.text[this.index];
    if (character === '"') return this.parseString();
    if (character === "{") return this.parseObject();
    if (character === "[") return this.parseArray();
    if (this.text.startsWith("true", this.index)) {
      this.index += 4;
      return true;
    }
    if (this.text.startsWith("false", this.index)) {
      this.index += 5;
      return false;
    }
    if (this.text.startsWith("null", this.index)) {
      this.index += 4;
      return null;
    }
    if (
      this.text.startsWith("NaN", this.index) ||
      this.text.startsWith("Infinity", this.index) ||
      this.text.startsWith("-Infinity", this.index)
    ) {
      failPacket("packet", "contains a non-finite number");
    }
    if (character === "-" || (character !== undefined && character >= "0" && character <= "9")) {
      return this.parseNumber();
    }
    throw new JsonSyntaxError();
  }

  private parseString(): string {
    this.index += 1;
    let value = "";
    while (this.index < this.text.length) {
      const code = this.text.charCodeAt(this.index);
      const character = this.text[this.index]!;
      if (character === '"') {
        this.index += 1;
        return value;
      }
      if (code < 0x20) throw new JsonSyntaxError();
      if (character !== "\\") {
        value += character;
        this.index += 1;
        continue;
      }
      this.index += 1;
      const escape = this.text[this.index];
      if (escape === undefined) throw new JsonSyntaxError();
      if (escape === "u") {
        const digits = this.text.slice(this.index + 1, this.index + 5);
        if (digits.length !== 4 || !/^[0-9a-fA-F]{4}$/u.test(digits)) {
          throw new JsonSyntaxError();
        }
        value += String.fromCharCode(Number.parseInt(digits, 16));
        this.index += 5;
      } else if (escape === '"' || escape === "\\" || escape === "/") {
        value += escape;
        this.index += 1;
      } else if (escape === "b") {
        value += "\b";
        this.index += 1;
      } else if (escape === "f") {
        value += "\f";
        this.index += 1;
      } else if (escape === "n") {
        value += "\n";
        this.index += 1;
      } else if (escape === "r") {
        value += "\r";
        this.index += 1;
      } else if (escape === "t") {
        value += "\t";
        this.index += 1;
      } else {
        throw new JsonSyntaxError();
      }
    }
    throw new JsonSyntaxError();
  }

  private parseObject(): { [key: string]: JsonValue } {
    this.index += 1;
    this.skipWhitespace();
    const value: { [key: string]: JsonValue } = Object.create(null) as {
      [key: string]: JsonValue;
    };
    const keys = new Set<string>();
    if (this.text[this.index] === "}") {
      this.index += 1;
      return value;
    }
    while (true) {
      if (this.text[this.index] !== '"') throw new JsonSyntaxError();
      const key = this.parseString();
      if (keys.has(key)) failPacket("packet", "contains a duplicate object member");
      keys.add(key);
      this.skipWhitespace();
      if (this.text[this.index] !== ":") throw new JsonSyntaxError();
      this.index += 1;
      this.skipWhitespace();
      value[key] = this.parseValue();
      this.skipWhitespace();
      const delimiter = this.text[this.index];
      if (delimiter === "}") {
        this.index += 1;
        return value;
      }
      if (delimiter !== ",") throw new JsonSyntaxError();
      this.index += 1;
      this.skipWhitespace();
    }
  }

  private parseArray(): JsonValue[] {
    this.index += 1;
    this.skipWhitespace();
    const value: JsonValue[] = [];
    if (this.text[this.index] === "]") {
      this.index += 1;
      return value;
    }
    while (true) {
      value.push(this.parseValue());
      this.skipWhitespace();
      const delimiter = this.text[this.index];
      if (delimiter === "]") {
        this.index += 1;
        return value;
      }
      if (delimiter !== ",") throw new JsonSyntaxError();
      this.index += 1;
      this.skipWhitespace();
    }
  }

  private parseNumber(): number {
    const start = this.index;
    if (this.text[this.index] === "-") this.index += 1;
    if (this.text[this.index] === "0") {
      this.index += 1;
      const next = this.text[this.index];
      if (next !== undefined && next >= "0" && next <= "9") throw new JsonSyntaxError();
    } else {
      const first = this.text[this.index];
      if (first === undefined || first < "1" || first > "9") throw new JsonSyntaxError();
      while (this.isDigit(this.text[this.index])) this.index += 1;
    }

    let floatingPoint = false;
    if (this.text[this.index] === ".") {
      floatingPoint = true;
      this.index += 1;
      if (!this.isDigit(this.text[this.index])) throw new JsonSyntaxError();
      while (this.isDigit(this.text[this.index])) this.index += 1;
    }
    const exponent = this.text[this.index];
    if (exponent === "e" || exponent === "E") {
      floatingPoint = true;
      this.index += 1;
      const sign = this.text[this.index];
      if (sign === "+" || sign === "-") this.index += 1;
      if (!this.isDigit(this.text[this.index])) throw new JsonSyntaxError();
      while (this.isDigit(this.text[this.index])) this.index += 1;
    }
    if (floatingPoint) failPacket("packet", "floating-point numbers are not allowed");

    const parsed = BigInt(this.text.slice(start, this.index));
    if (parsed > MAX_SAFE_INTEGER || parsed < -MAX_SAFE_INTEGER) {
      failPacket("packet", "integer exceeds the interoperable JSON range");
    }
    return Number(parsed);
  }

  private isDigit(character: string | undefined): boolean {
    return character !== undefined && character >= "0" && character <= "9";
  }

  private skipWhitespace(): void {
    while (true) {
      const character = this.text[this.index];
      if (character !== " " && character !== "\t" && character !== "\n" && character !== "\r") return;
      this.index += 1;
    }
  }
}

function decodeJsonInput(data: Uint8Array | string): string {
  if (typeof data === "string") {
    if (data.startsWith("\ufeff")) failPacket("packet", "UTF-8 BOM is not allowed");
    return data;
  }
  if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
    failPacket("packet", "UTF-8 BOM is not allowed");
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(data);
  } catch {
    failPacket("packet", "must be valid UTF-8");
  }
}

/** Parse duplicate-free, integer-only interoperable JSON without external dependencies. */
export function strictJsonParse(data: Uint8Array | string): JsonValue {
  const text = decodeJsonInput(data);
  let value: JsonValue;
  try {
    value = new StrictJsonParser(text).parse();
  } catch (error) {
    if (error instanceof PacketValidationError) throw error;
    failPacket("packet", "is not valid JSON");
  }
  rejectNonIJson(value);
  return value;
}
