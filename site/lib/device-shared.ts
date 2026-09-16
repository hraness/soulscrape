import { sha256Hex } from "../../skills/soulscrape/scripts/sha256.ts";

export const DEVICE_CODE_TTL_MS = 15 * 60 * 1_000;
export const DEVICE_TICKET_TTL_MS = 60 * 1_000;

const DEVICE_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789";

/** Human-entered pairing code shown by the CLI, e.g. `SS-ABCD-EFGH`. */
export function newDeviceCode(randomBytes: (count: number) => Uint8Array): string {
  const bytes = randomBytes(8);
  let digits = "";
  for (const byte of bytes) digits += DEVICE_CODE_ALPHABET[byte % DEVICE_CODE_ALPHABET.length];
  return `SS-${digits.slice(0, 4)}-${digits.slice(4)}`;
}

/** CLI-held polling secret, `sps_` + 48 base64url chars. Never stored raw. */
export function newDeviceSecret(randomBytes: (count: number) => Uint8Array): string {
  return `sps_${base64Url(randomBytes(36))}`;
}

/** Issued publishing credential, `spt_` + 48 base64url chars. Stored hashed. */
export function newPublishToken(randomBytes: (count: number) => Uint8Array): string {
  return `spt_${base64Url(randomBytes(36))}`;
}

export function base64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

export function isDeviceCode(value: unknown): value is string {
  return typeof value === "string" && /^SS-[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$/u.test(value);
}

export function isDeviceSecret(value: unknown): value is string {
  return typeof value === "string" && /^sps_[A-Za-z0-9_-]{48}$/u.test(value);
}

export function isPublishToken(value: unknown): value is string {
  return typeof value === "string" && /^spt_[A-Za-z0-9_-]{48}$/u.test(value);
}

export function deviceCodeDigest(code: string): string {
  return sha256Hex(new TextEncoder().encode(`soulscrape.device-code.v1\n${code}`));
}

export function deviceSecretDigest(secret: string): string {
  return sha256Hex(new TextEncoder().encode(`soulscrape.device-secret.v1\n${secret}`));
}

export function publishTokenDigest(token: string): string {
  return sha256Hex(new TextEncoder().encode(`soulscrape.publish-token.v1\n${token}`));
}

/** Canonical string the authorize ticket MAC covers. */
export function deviceTicketPayload(
  code: string,
  accountId: string,
  username: string,
  expiresAtMs: number,
): string {
  return `${code}.${accountId}.${username}.${expiresAtMs}`;
}
