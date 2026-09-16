import type { Metadata } from "next";
import { headers } from "next/headers";

import { isDeviceCode } from "../../lib/device-shared";
import { serverSession } from "../../lib/session";

import { AuthorizeForm } from "./authorize-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connect the Soulscrape CLI",
  description: "Authorize a Soulscrape CLI device with your Hraness account.",
  robots: { index: false, follow: false },
};

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const codeParam = params.code;
  const code = typeof codeParam === "string" && isDeviceCode(codeParam) ? codeParam : null;
  const request = new Request("https://soulscrape.com/connect", {
    headers: await headers(),
  });
  const session = await serverSession(request);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className="connect-main" id="main" tabIndex={-1}>
        <nav className="person-nav" aria-label="Site">
          <a href="/">Soulscrape</a>
        </nav>
        <h1>Connect the Soulscrape CLI</h1>
        {code === null ? (
          <p>
            No valid pairing code was supplied. Run <code>publish-person.ts login</code> and open the
            link it prints.
          </p>
        ) : session === null ? (
          <>
            <p>
              The Soulscrape CLI wants to publish under your Hraness account. Sign in first, then
              confirm the pairing code matches your terminal.
            </p>
            <p className="connect-code" aria-label="Pairing code">
              <code>{code}</code>
            </p>
            <p>
              <a
                className="connect-signin"
                href={`/api/suite-auth/start?return_to=${encodeURIComponent(`/connect?code=${code}`)}`}
              >
                Sign in with Hraness
              </a>
            </p>
          </>
        ) : (
          <>
            <p>
              Signed in as <strong>@{session.username}</strong>. Confirm this is the code your
              terminal shows, then authorize.
            </p>
            <p className="connect-code" aria-label="Pairing code">
              <code>{code}</code>
            </p>
            <AuthorizeForm code={code} />
            <p className="connect-note">
              Authorizing lets that device publish and withdraw person indexes under{" "}
              <code>@{session.username}</code>. You can revoke it later with{" "}
              <code>publish-person.ts logout</code>.
            </p>
          </>
        )}
      </main>
    </>
  );
}
