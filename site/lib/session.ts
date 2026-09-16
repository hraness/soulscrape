import {
  suiteOidcSurfaceHandler,
  suiteOidcSurfaceServerSession,
} from "@hraness/suite-accounts/oidc-surface-server";

const CONSUMER = "soulscrape";

export const oidcHandler = suiteOidcSurfaceHandler(CONSUMER);

export type SoulscrapeSession = Readonly<{
  accountId: string;
  username: string;
}>;

export async function serverSession(request: Request): Promise<SoulscrapeSession | null> {
  const session = await suiteOidcSurfaceServerSession(CONSUMER, request);
  if (session === null) return null;
  return { accountId: session.suiteAccountId, username: session.username };
}
