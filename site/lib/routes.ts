import { parseSuiteUsername } from "@hraness/suite-accounts/identity";

import { isReservedUsernameSegment } from "./site";

export function parseUsernameSegment(value: unknown): string | null {
  const parsed = parseSuiteUsername(value);
  if (!parsed.ok || isReservedUsernameSegment(parsed.value)) return null;
  return parsed.value;
}
