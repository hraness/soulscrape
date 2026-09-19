# Free hosting operations

Soulscrape research runs in the caller's agent environment with their model, tools, and authorized sources. The hosted service stores the reviewed public packet and publishing metadata. Public pages and read APIs require no account; publishing requires a free Hraness account. No Soulscrape subscription, Credits balance, or payment card is required. External agent, model, and tool charges remain separate.

This runbook describes the source contract reviewed on 2026-09-19. It does not establish that the deployment or migration has run. It provisions no provider and promises no fixed monthly operating cost.

## Admission and retained data

| Surface | Enforced prospective limit | Existing-data behavior |
| --- | --- | --- |
| Profiles per account | 200 retained profiles | Withdrawn profiles still count; existing rows are not deleted to meet a cap. |
| Packet bytes per account | 20 MiB of canonical JSON bytes | Existing over-budget totals may remain or shrink; increases above the budget fail. |
| Individual packet | 512 KiB canonical bytes for new or growing packets | Existing oversized packets remain stored; direct backend compatibility permits an identical restore or shrink without growth. HTTP/CLI requests still have an absolute 512 KiB ceiling, including their JSON envelope. |
| Graph/theme/question projection | 64 KiB per new or enlarged projection | The migration retains larger projections; later writes may retain or shrink them. An identical-packet restore remains permitted even if updated timestamp serialization changes the projection byte count. |
| Meaningful publication | Token bucket of 10, refilling one token per minute | New packets, changed packets, and restoration consume a token; identical live packets consume none. |
| Publishing devices | 20 active credentials per account | Historical credentials above the cap stay active; further issuance fails until below the cap. |

KiB means 1,024 bytes; MiB means 1,048,576 bytes. Packet budgets exclude database indexes, metadata, graph projections, account/auth data, and provider overhead. Per-account limits do not establish a global spend ceiling. Keep oversized legacy packets readable and withdrawable. Their direct backend compatibility is not a promise that the HTTP API or CLI can submit an oversized restore; reduce the submitted packet to fit those request boundaries first.

An identical live packet is a true no-op: no profile, usage, projection, or credential timestamp is written. Withdrawal is free, is not rate limited by the publication bucket, and remains available while projection migration is incomplete. It hides the publication but retains its packet for restoration, so it does not release storage quota. Restoration is a meaningful publish even when the digest and revision stay the same.

At the device limit, `POST /api/v1/device/poll` returns `DEVICE_LIMIT` with HTTP 429 and `retryable: false`. It keeps the authorized pairing code until expiry and does not revoke another device. Revoke a known credential with `publish-person.ts logout`, then retry pairing. If every credential is lost, contact `hraness@pm.me`; this is a support-request route, not a guarantee of automatic recovery or deletion.

Pairing codes become unusable after 15 minutes. A minute-by-minute sweep deletes at most 256 expired codes. Revoked credentials become unusable immediately; an hourly sweep deletes at most 256 credential records revoked at least 30 days earlier. Backlogs can extend physical retention. Active credentials are excluded from cleanup. Neither logout nor withdrawal deletes the account.

## Stored records and current content-storage debt

All surfaces are registered in [`costs.json`](../costs.json):

- `deviceCodes` stores ephemeral pairing state with hashed code and polling secret.
- `publishCredentials` stores hashed publishing credentials and their account/device metadata.
- `personProfiles` remains the authoritative retained packet store.
- `personProfileMetadata` derives public locators, summaries, visibility, digest/revision, and byte counts from each packet.
- `personProfileGraph` derives graph, theme, and question projections from each packet.
- `personPublisherVersions` keeps one generation counter per publisher username for consistent HTML related-profile traversal. It has no TTL or routine reset; retaining it prevents a changed-then-restored corpus from reusing an earlier generation.
- `personAccountUsage` keeps transactional row/byte totals and the publication token bucket. Totals can be reconstructed; resetting the rate bucket changes admission and is not a routine rebuild.
- `personProjectionState` holds the versioned migration cursor, processed count, and readiness and activation markers.

Meaningful publication updates its packet, projections, account totals, and publisher generation in the same transaction. A username change advances both the old and new publisher generations. A real withdrawal marks the retained projections nonpublic and advances the generation once. Identical live publications and repeated withdrawals remain write-free. Public reads never repair or write derived state. A missing generation is zero; the first meaningful change creates one, so this counter requires no migration backfill.

Full packets still live inline in Convex. Separating public content bytes into a suitable content store remains existing architectural debt; this change adds smaller read projections without claiming that the content-store migration is complete. No R2 bucket, Blob store, additional subscription, or model-generation provider is provisioned. Any later storage move must preserve original packets, withdrawal behavior, and a recoverable migration path.

## Pages, caching, and withdrawal

`/api/v1/index.json` reads metadata in pages of at most 100 profiles (default 100). `/api/v1/graph.json`, `/api/v1/themes.json`, and `/api/v1/questions.json` read projection pages of at most 25 profiles (default 10). Database page reads also stop at an 8 MiB read budget. Each HTTP response has a 3 MiB serialized ceiling: `PAGE_TOO_LARGE` returns HTTP 400 and advises retrying the same page with `limit=1`. It never silently truncates content.

`/sitemap.xml` provides bounded discovery from the first metadata page, capped at 1,000 public profiles or a 2 MiB read budget. It returns that subset when the corpus is larger. Use `/api/v1/index.json` cursor traversal for complete enumeration. HTML related-profile navigation separately fetches at most eight publisher-context pages of 25 profiles. The collector retains at most 200 profiles and 16 MiB of context; malformed, oversized, incomplete, or unavailable context produces a visible notice and no identity joins. With complete verified context, the incoming-reference list shows at most 500 entries in stable publisher-handle and authored-record order, with a notice when additional references are omitted. That display limit preserves verified outbound links and the full profile content. It performs identity joins only with complete context and the same publisher generation on every page. A generation mismatch means the publisher changed during traversal; it discards those joins and shows a notice while the full profile remains readable. This guard is specific to HTML publisher context and does not change the public corpus API's non-atomic pagination contract.

Every corpus API page returns `pagination: { nextCursor, isDone, snapshot: false }`. Cursors belong to their endpoint. Fetch all pages and reconcile periodically: concurrent changes mean the pages are not one atomic snapshot. Index and graph use page-only digest version `soulscrape.corpus-page.v1`; a page digest cannot establish whole-corpus completeness. `since` filters changed rows within the current page, excludes deletion events, and is not a substitute for cursor traversal.

Graph version `soulscrape.graph.v3` resolves targets against complete context only when the first page is also the last (`cursor` absent/null and `isDone: true`). Otherwise it declares `resolutionScope: "unresolved-page"` and retains the original references for the client to resolve after collecting all pages. Reset cached graph topology when the projection version changes. Reconcile withdrawals and changed target bindings with full enumerations, not row deltas alone.

Aggregate responses use 30-second shared caching without stale-while-revalidate. A withdrawn summary, graph projection, theme, or question can remain in a previously cached page during that interval. Full-profile JSON and Markdown remain `no-store` and stop serving withdrawn content on subsequent origin reads. External copies, search engines, generated images, and downloaded files can persist separately.

## Additive projection migration

The operator must bind every command to the verified Soulscrape team, project, and exact deployment. A default local environment is not proof of the production target. Record the intended source SHA, deployment identity, current projection status, and recoverable source-data/export evidence without exposing credentials or private packets. Complete the repository and site gates before any deployment.

1. Deploy the compatible Convex schema and functions before the new site. The existing source rows remain; indexes and projection tables are additive. The device cleanup crons become active with this backend deploy, so include their retention behavior in the deployment review.
2. Read internal `people:projectionStatus` with `{}`. The gate reports `ready`, `activated`, `processed`, and `hasUnprojectedRows`. Before coverage is ready, meaningful publication fails closed; after readiness passes, writes can proceed without waiting for feed activation. New paged feeds require coverage and explicit activation; existing read operation names keep their legacy bounded paths before activation. Plan the publication availability window. Identical-publication no-ops and withdrawal remain available.
3. Invoke internal `people:backfillProjections` with `{}` once. Each transaction uses at most eight source rows and a 4 MiB source-read budget, writes missing projections and account totals, and persists a durable cursor. Source markers and totals commit together so retrying does not double-count. It retains packets and larger historical projections.
4. Inspect the result, then repeat bounded calls until `ready: true`. Re-read `people:projectionStatus` and require both `ready: true` and `hasUnprojectedRows: false`. An empty deployment still needs the initialization call. A failure or non-advancing cursor requires diagnosis; never set the readiness marker manually to bypass coverage.
5. Invoke internal `people:activateProjections` with `{}`. It rechecks coverage and idempotently marks the projections active. Read status again and require `ready: true`, `activated: true`, and `hasUnprojectedRows: false`. Never edit either marker directly.
6. Activate the compatible site only after that gate passes. Verify the deployed identity, paginated feeds and cursor behavior, full-packet reads, rate/quota errors, and withdrawal cache boundary with authorized synthetic data. This document records no live acceptance result.

From `site/`, after replacing `VERIFIED_DEPLOYMENT_NAME` with the independently verified target, the bounded operator calls are:

```sh
bunx --no-install convex run --deployment VERIFIED_DEPLOYMENT_NAME --codegen disable people:projectionStatus '{}'
bunx --no-install convex run --deployment VERIFIED_DEPLOYMENT_NAME --codegen disable people:backfillProjections '{}'
# Repeat the bounded backfill only after inspecting each result, until ready.
bunx --no-install convex run --deployment VERIFIED_DEPLOYMENT_NAME --codegen disable people:projectionStatus '{}'
# Run activation only after the coverage gate above passes.
bunx --no-install convex run --deployment VERIFIED_DEPLOYMENT_NAME --codegen disable people:activateProjections '{}'
bunx --no-install convex run --deployment VERIFIED_DEPLOYMENT_NAME --codegen disable people:projectionStatus '{}'
```

Do not use `--push` as part of a migration call. Deploy reviewed code separately. Retain checkpoints and source packets when a call fails or its outcome is uncertain; read status and retry the same bounded operation. Do not reset, truncate, or delete tables to restart. Returning to an older writer can make projections and usage stale, so any rollback that re-enables old writes needs an explicit reconciliation plan before readiness is trusted again.

## Operating costs and admission gaps

The live provider plans, region, shared allowances, credits, and invoice have not been verified by this source change. The [Convex price table](https://www.convex.dev/pricing) separates storage, database I/O, calls, and egress; these are different meters. Vercel's [spend management](https://vercel.com/docs/spend-management) is a provider control to inspect and configure deliberately, not a source-code guarantee that spending is capped.

For an illustrative payload model only, 1,000 retained packets of 64 KiB contain 65.5 MB of raw packet bytes; 10,000 contain 655.4 MB. Ten thousand and 100,000 full-packet reads transfer about 0.655 GB and 6.554 GB respectively before protocol overhead. Database storage and I/O include more than these bytes: indexes, projections, cache misses, writes, retries, and system overhead matter. These calculations are neither observed invoices nor a capacity benchmark. The current schedules also imply roughly 43,200 expiry sweeps and 720 revoked-credential sweeps per 30 days, before user traffic.

Measure packet/projection sizes, retained rows and bytes, read bytes, cache misses, function calls, egress, rate-limit failures, and migration progress. Include Accounts/auth, hosting base fees, domains, email, backups, logs, moderation, and support in the operating budget. Shared provider allowances cannot be counted afresh for each user or project. No fixed monthly amount or indefinite hosting capacity is promised here.

Anonymous device-start traffic still lacks verified provider-level per-source admission controls. The global pending-code cap and cleanup bound storage work but do not prevent abuse from exhausting availability or generating calls. Likewise, account limits do not bound total signups or public-read traffic. Qualify appropriate provider admission and spend controls before making an abuse-resistance or global-cost claim; no in-memory throttle or unverified provider setting closes that gap.
