# Platform submission — soulscrape.com API

Evidence pack for submitting the Soulscrape hosted surface to agent platforms
(Muse connectors, Grok-style bots, Instinct-class clients) or any HTTP tool
consumer. Claims marked live were exercised against production on 2026-09-21.

Soulscrape publishes *person indexes*: public, reviewable knowledge about a
person, assembled by the publishing account's agent from public sources, with
every claim cited. Reads are public by contract: an agent can consume the
corpus without an account. Writes publish an index the publisher's agent
prepared locally; they require account-approved device authorization.

## Endpoints

| Fact | Value |
| --- | --- |
| Base URL | `https://soulscrape.com` |
| OpenAPI 3.1 | `GET /api/v1/openapi.json` (11 paths) |
| Public corpus reads | `GET /api/v1/index.json` `graph.json` `themes.json` `questions.json` — `soulscrape.api.v1` envelopes, cursor pagination, corpus digest |
| Public profile read | `GET /api/v1/profiles/{username}/{handle}` → `soulscrape.person-index.v1` packet + digest + revision |
| Publish | `PUT /api/v1/people` → `{username, handle, packetDigest, revision, url}`; `DELETE /api/v1/people/{handle}` unpublishes |
| Device onboarding | `POST /api/v1/device/start` → `{code, secret, verificationUrl}`; owner approves at `/connect`; `POST /api/v1/device/poll` activates the `sps_` bearer |
| Account session | `GET /api/v1/auth` (session probe), `DELETE` (sign-out) |

## Verified surface (live, 2026-09-21)

- `GET /api/v1/openapi.json` returned OpenAPI 3.1.0 with 11 paths.
- `GET /api/v1/index.json` returned the public corpus listing with
  `corpusDigest`, `asOfMs`, and `pagination` fields, with no authentication.
- `GET /api/v1/graph.json`, `themes.json`, and `questions.json` returned the
  same versioned envelope with cursor pagination.
- `GET /api/v1/profiles/ben/gwern` returned the published
  `soulscrape.person-index.v1` packet with `packetDigest` and `revision`; the
  human page `/ben/gwern` served 200.
- `POST /api/v1/device/start` returned a device code, `sps_` secret,
  `/connect?code=` verification URL, `expiresInSec`, and `pollAfterMs`; the
  server stores SHA-256 digests only. A malformed body returned a typed
  `BAD_REQUEST`.
- `PUT /api/v1/people` without or with an invalid bearer returned 401;
  `GET /api/v1/people` and `GET /api/v1/auth` without a bearer returned
  `UNAUTHORIZED`.
- `GET /connect` served the owner-approval page.

## Submission-form facts

- **Auth model**: bearer token issued through a device flow. The client calls
  `device/start`, shows the owner `verificationUrl` + `code`, and polls
  `device/poll` until the owner approves the named device at `/connect`. The
  `sps_` secret is the bearer; the server stores digests only, and the owner
  can revoke the device.
- **Read surface**: the entire public corpus — index, graph, themes,
  questions, and every published profile packet — is readable without
  authentication. Pagination is cursor-based; each page carries a corpus
  digest so a reader can detect change.
- **Write surface**: `PUT /api/v1/people` publishes a
  `soulscrape.person-index.v1` packet (integer-only I-JSON, validated at the
  boundary). Publishes are idempotent on the packet digest (`changed`
  indicates a revision bump) and bounded by free-account storage/profile
  limits plus a publishing rate limit (`RATE_LIMITED` + `retry-after`).
- **Data class**: public-only by contract — packets carry reviewed public
  claims (`fact`, `stated_belief`, `pattern`, `speculation` kinds stay
  distinct). Private or third-party personal data never enters a published
  packet; preparation happens locally through the Soulscrape CLI + Agent
  Skill.
- **Billing**: none — publishing is free and quota-bounded. No paid
  operations, no provider meter.
- **Cost posture**: reads are public GETs over a Convex-backed control plane;
  writes are one idempotent mutation per publish. No object storage, no CDN
  layer, no per-read compute beyond the query.

## Per-platform readiness

- **Muse / Instinct-class / Grok-style**: REST + OpenAPI live and verified.
  A connector can read the whole corpus without credentials and publish for
  an owner who completes one `/connect` approval.
- **MCP**: no hosted MCP endpoint today; the REST surface is the supported
  integration path. A thin adapter could mirror the wordcell `/api/v1/mcp`
  pattern if a platform requires it.
- **Direct HTTP**: ready now.

## Not yet evidenced

- An end-to-end publish from a live approved device (requires an owner to
  complete `/connect`) — every unauthenticated and malformed-input path is
  verified, and the publish path itself is covered by repository tests.
- `DELETE /api/v1/people/{handle}` unpublish semantics live (same owner
  credential requirement).
