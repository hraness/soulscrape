import { createHmac } from "node:crypto";

import { deviceTicketPayload, DEVICE_TICKET_TTL_MS } from "./device-shared";

/**
 * A short-lived proof that the site verified a session for `accountId` and
 * chose to bind it to `code`. Minted in the authorize route after the OIDC
 * session check; verified inside the Convex mutation with the shared secret.
 */
export function mintDeviceAuthorizeTicket(input: {
  code: string;
  accountId: string;
  username: string;
  now: number;
  secret: string;
}): string {
  const expiresAtMs = input.now + DEVICE_TICKET_TTL_MS;
  const payload = deviceTicketPayload(input.code, input.accountId, input.username, expiresAtMs);
  const mac = createHmac("sha256", input.secret).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}
