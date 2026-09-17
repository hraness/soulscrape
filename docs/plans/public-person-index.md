# Public person index and publishing

Status: live-verified end to end. This plan records the architecture for turning Soulscrape into a general deep-research workflow that can publish evidence-linked indexes of people and organizations at `soulscrape.com/<username>/<handle>`.

The contract, validator, CLI, Eugene Tssui fixture, site backend/frontend, and Convex control plane shipped in hraness/soulscrape#34; the `soulscrape` Accounts consumer shipped in `@hraness/suite-accounts` v0.9.7 (hraness/suite-accounts#49) and reached the deployed Accounts authority via hraness/accounts#78 (`@hraness/suite-accounts` v0.9.8) plus one `oauthClientReconciler` run — `{"created":1,"unchanged":10}`, second run `{"created":0,"unchanged":11}` — confirming the live `hraness:soulscrape:production:v1` client. The Convex production deployment `secret-schnauzer-96` is live; Vercel production env (`NEXT_PUBLIC_SITE_URL`, `SUITE_OIDC_COOKIE_SECRET`, `SOULSCRAPE_SITE_TICKET_SECRET`, `CONVEX_URL`) and the matching Convex env are set.

Live end-to-end verification completed 2026-09-16: CLI `login` issued pairing code `SS-…`, `/connect` rendered the code, the Accounts email-OTP sign-in returned to `/connect` signed in as `@ben`, device authorization completed, the CLI stored its credential, `publish` admitted the Eugene packet (revision 1, digest `c76566ce…`), `https://soulscrape.com/ben/eugene-tssui` rendered 200 with canonical URL, `ProfilePage`+`Person` JSON-LD, `sameAs` Q5407800, OG/Twitter metadata, and a generated 64 KB social image; `Accept: text/markdown`, `/<handle>.md`, `GET /api/v1/profiles/ben/eugene-tssui`, the `/@ben` index, and `sitemap.xml` all served the profile. Identical-byte republish was a verified no-op. `withdraw` returned every public read to 404 and removed the sitemap/index entries; republishing the identical packet restored the profile at the same revision; a second withdraw again removed every surface.

Two live-verification defects shipped as fixes: hraness/soulscrape#36 (profile API responses carried `public, max-age=300`, letting the edge serve a withdrawn profile for up to five minutes; now `no-store`) and hraness/soulscrape#37 (the digest fast path returned `changed:false` before checking `withdrawnAtMs`, so republishing identical bytes on a withdrawn row reported success while it stayed withdrawn; `publishDecision` now restores publication at the same revision). Update `site/published-release.json` only when a named release's assets verify live.

## Goal

Given a person or organization, produce a structured, source-backed index — identity, work history, projects, philosophy, interests, beliefs, appearances — as a validated `soulscrape.person-index.v1` packet, then publish it through `soulscrape.com` under the publisher's Hraness Suite account. The private soul-model output (Markdown working model) is unchanged; the person index is a second, public-audience artifact with stricter privacy defaults.

## Contract

`schema/soulscrape-person-index-v1.schema.json` and the hand-rolled validator in `skills/soulscrape/scripts/person-index.ts` define the packet. The packet is integer-only I-JSON, parsed from `unknown` on every boundary.

- `subject`: kind (`person` | `organization`), normalized `handle`, `displayName`, `alsoKnownAs`, `summary`, and `identity` bindings (Wikidata QID, official site, Wikipedia, other profile URLs). The handle is a route segment, not identity proof.
- `sources`: the canonical catalog. Each entry carries a stable `source-<sha256(canonical-url + "\n" + publishedAt)[:20]>` id, an authority `binding` (`subject_controlled`, `first_person`, `interview`, `primary_record`, `reporting`, `reference`, `archive`), a `mediaType` (`webpage`, `article`, `video`, `audio`, `pdf`, `transcript`, `book`, `dataset`), publisher, dates, and optional `transcriptOf`/`authors`/`language`. Mirrors the stripe-history research-source model.
- `claims`: bounded statements with `kind` = `fact` | `stated_belief` | `pattern` | `speculation` (the four-layer separation from the skill) and 1+ `sourceIds`.
- `timeline`: dated events (`birth`, `founded`, `education`, `apprenticeship`, `role`, `project`, `publication`, `award`, `exhibition`, `media`, `milestone`, `other`) with optional `end` and `organization`.
- `themes`: philosophy/belief/interest/practice/influence entries, each `stated` | `reported` | `inferred`.
- `works`: projects, buildings, books, films, recordings, designs, products, papers with a status (`completed`, `proposed`, `unbuilt`, `in_progress`, `abandoned`, `published`, `released`, `ongoing`).
- `appearances`: interviews, videos, talks, broadcasts — media links, venue, participants, summary.
- `relations`: evidence-backed edges to other entities — `kind` read as "subject [kind] target" (`collaborated`, `cofounder`, `founded`, `founded_by`, `employed_by`, `interviewed`, `interviewed_by`, `influenced`, `influenced_by`, `family`, `other`), `target` as a normalized handle-form slug, `targetName`, optional `targetKind` (`person` | `organization`) and `note`. The slug is a locator, not a resolution guarantee; pages link the target only when the same publisher serves it. Added as an optional, additive v1 extension — existing packets remain valid.
- `openQuestions`: explicit uncertainty notes.
- `body`: the synthesized Markdown essay rendered on the public page.
- `provenance`: tool, method, model, as-of date.

Validation rules: unique ids per collection, every `sourceIds` reference must resolve, `source-` ids must match the digest of canonical URL + publishedAt, strict key sets, bounded lengths. No digest is embedded in the packet itself; the host computes the canonical SHA-256 at admission and records it.

The `organization` branch is exercised by `examples/people/roam-research/`. Gaps it surfaced for a future revision: no `investor`/`backer` relation kind (backers ride on `other`), no org→person `employed` direction, and no funding-round timeline kind (rounds are `milestone` events).

## Handle normalization

`normalizePersonHandle` — NFKD, strip combining marks, lowercase, map non-`[a-z0-9]` runs to `-`, collapse, trim, 2–64 chars, must contain a letter. `Eugene Tssui` → `eugene-tssui`. Scoped under the publisher username, so no global claim is needed; the packet may assert any valid handle the publisher controls.

## Skill workflow

`references/public-person-index.md` is the general deep-research procedure: scope and authority check, canonical source-catalog construction (primary-first, dedupe, transcript linkage), extraction into claims/timeline/themes/works/appearances, four-layer separation, packet assembly, `bun scripts/validate-person-index.ts`, then publish. SKILL.md points to it when a request asks for a public index of a person or organization.

## Publishing and auth

- Sign-in: `suiteOidcSurfaceHandler("soulscrape")` at `site/app/api/suite-auth/[...all]` — Hraness Accounts OIDC RP, email-OTP-only, server-held bearer. Requires the `soulscrape` consumer registration in `@hraness/suite-accounts` (current registry) and the derived OIDC client `hraness:soulscrape:production:v1` in Accounts (`expectedOAuthClients` picks it up automatically once the dependency is bumped).
- Ownership authority is the Suite account id; the username is a route locator only.
- CLI: `bun scripts/publish-person.ts login|publish|list|withdraw|whoami` — OAuth-style device flow against `site/app/api/v1/device/*`; credentials are random bearer tokens stored only as SHA-256 digests in Convex; the browser `/connect` page binds a pending device code to the signed-in account.
- Publish API: `PUT /api/v1/people` validates the packet server-side (same parser), the Convex mutation re-validates and upserts by (account, handle); the canonical packet digest is the idempotency key — retrying identical bytes is a no-op; changed bytes bump `revision`. `DELETE /api/v1/people/<handle>` withdraws.
- Session→Convex binding for device authorization uses a short-lived HMAC ticket minted by the site (`SOULSCRAPE_SITE_TICKET_SECRET`, set in both Vercel and Convex envs). The suite-accounts browser-Convex token grant is reserved for a future browser-direct surface and is not wired in v1.

## Public surface and SEO

- `app/[username]/[handle]/page.tsx` — server-rendered, `force-dynamic`, 404s for missing/withdrawn. Renders the index sections + `body` markdown through the bounded local renderer. `Accept: text/markdown` returns the packet body.
- `app/[username]/page.tsx` — the publisher's public index list.
- JSON-LD `ProfilePage` + `Person`/`Organization` with `sameAs` identity links; per-page canonical, Open Graph, Twitter card, generated social image.
- `app/sitemap.ts` enumerates published profiles; `app/robots.ts` excludes `/api/` and `/connect`; `app/llms.txt` describes the corpus and markdown negotiation.
- `costs.json` registers every new table and dynamic route.

## Eugene Tssui testbed

`examples/people/eugene-tssui/` carries the reference packet (Wikidata `Q5407800`, handle `eugene-tssui`) plus a short README. It doubles as the validator's integration fixture.

## Deferred

- Browser-direct Convex auth via the suite-accounts browser token grant (needs current-consumer support in `convex-browser-auth`).
- A shared `people-ontology` package — defer until a second concrete consumer (Peopleblade or Sponge) pins the same contract.
- Subject-claimed profiles (the indexed person signing in to claim their page).
