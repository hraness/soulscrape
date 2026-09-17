# People ontology and public dossier interoperability

Status: **in progress**. Implementation authorized after a second adversarial review.
Area: cross-product-ontology.

## Outcome

Soulscrape keeps its stable public packet and gains reusable identity primitives, safer graph projection, and a categorized dossier view. PeopleBlade records explicitly supplied, evidence-linked public identifiers through its existing local research workflow. Sponge converts a bounded Soulscrape research exchange to the existing Oh research packet without gaining publication authority or depending on another checkout.

A standalone ontology package remains a separate adoption gate, not an automatic consequence of moving types. This plan owns the implementation and review log; it supersedes the earlier proposed phase structure below.

## Second-review findings and decisions

1. The old plan described Sponge's retired Source/Party/Account/Place prototype as current. Its retirement is explicit in `sponge/kb/plans/sponge-current-people-organizations-and-web-patent-sources.md`. Current Sponge has durable product knowledge and separately scoped Oh-backed agent working memory. Do not resurrect Party tables or public catalog routes.
2. Oh already provides entities, statements, assertions, evidence, inquiries, vocabulary catalogs and `oh.research-packet.v1`. Sponge pins `@hraness/oh-research` v0.10.0, whose exports end at catalog V7. Do not rely on the unrelated uncommitted V8 work in the Oh checkout.
3. `src/core/people-ontology` is outside the standalone Agent Skill distribution. Keep initial primitives as flat modules under `skills/soulscrape/scripts/`, explicitly registered in the packed inventory. A copied skill must run without the repository root.
4. PeopleBlade contact matching and Soulscrape slug generation solve different problems. Do not replace private NFKC matching, generate guessed profile URLs from names, or scan a real private contact corpus. Test synthetic contacts and checked-in public fixtures.
5. The old proposed `EntityIdentity.sameAs/other` is not the existing `PersonIndexIdentity.profiles` contract. Keep the existing packet fields, optionality, strict keys and digest behavior. Do not introduce a universal PersonIndex packet alias claiming a second schema version.
6. Wikidata supports references, qualifiers and date precision. The reason for adapters is preservation of local authoring, evidence and authority semantics, not a claim that Wikidata lacks those capabilities. Website URLs, external identifiers, publisher locators and entity identity are distinct.
7. Stripe-style topic navigation is a product projection. Do not promote company-specific categories such as side quests to a universal ontology. Group only by explicit event kinds; never infer an acquisition or executive rank from prose.
8. Existing graph deltas resolve against only changed rows, potentially replacing a real target with a stub. Slug stubs also merge across publishers, and edge hash preimages concatenate unframed strings. Correct these before encouraging cross-product synchronization. A timestamp filter is not a deletion feed.
9. `bun run test:person-index` and `bun run validate:examples` do not exist. The root `bun test ./tests/person-index.test.ts` already validates the checked-in corpus. Gates below use real scripts.
10. No new database or speculative shared package is required for initial interoperability. PeopleBlade can retain identifiers in its existing immutable research output JSON. Sponge can compile an explicit local-file exchange using its already-pinned Oh release.

## Architecture and boundaries

- **Soulscrape** owns public `soulscrape.person-index.v1`, authoring/privacy policy, publisher-scoped locators, dossier views and public graph APIs.
- **PeopleBlade** owns local contacts, contact dedup decisions and reviewed contact-to-public-reference assertions. Public references do not enter cloud contact projection or become automatic merge keys.
- **Oh** owns its existing generic kernel and portable research profile. No edits to the Oh checkout are needed for this tranche.
- **Sponge** owns conversion into its pinned Oh research profile and every host acceptance, review, retention and publication decision. An offline transport packet is not a working-memory commit or a publication.
- **Accounts** remains the authentication authority, not an entity ontology.

The first interchange is deliberately narrower than the full dossier: identity context, source catalog and sourced claims. Timeline, works, appearance roles, themes and open questions need explicit semantic mappings rather than flattening all of them into verified facts. Their omission is machine-readable.

## Frozen lane contracts

### Identity primitives

A dependency-free `skills/soulscrape/scripts/people-ontology.ts` owns `normalizeEntityHandle` and `isEntityHandle`, preserving the exact existing algorithms; old names remain compatible exports. Add strict parsing of explicit canonical Soulscrape profile URLs and Wikidata identifiers. A profile URL must be HTTPS on exactly `soulscrape.com`, have exactly a valid publisher and handle path, no credentials, query, fragment, alternate port, encoded separators, dot-segment normalization or reserved route. A valid locator does not prove existence or identity. Preserve the Suite username grammar, including underscores, as verified from the existing dependency.

Keep packet-specific types product-owned; do not invert the validator through a circular re-export. Only extract genuinely reused primitives, not an entire new package-shaped type hierarchy.

### Public research exchange

`skills/soulscrape/scripts/export-research.ts` is both a pure converter and a runnable local-file CLI. It calls the existing full `parsePersonIndex` before projection, requires an explicit canonical profile URL whose handle equals the packet subject, and emits:

```
schemaVersion: "soulscrape.research-exchange.v1"
profileUrl: canonical explicit Soulscrape URL
packetDigest: canonical personIndexDigest of the validated original packet
generatedAt: original generatedAt
asOf: original scope.asOf
subject: { kind, handle, displayName, wikidataId? }
sources: [{ id, binding, mediaType, title, url, publisher, accessedAt, publishedAt? }]
claims: [{ id, kind, text, sourceIds }]
omittedCollections: ["timeline", "themes", "works", "appearances", "relations", "openQuestions", "body"]
```

Every field is exact-key parsed, every claim source resolves, duplicate IDs are rejected. Claim kinds retain `fact`, `stated_belief`, `pattern`, `speculation`; no fabricated review or rights receipt. Bound exchange bytes to 512 KiB, sources to 256, claims to 256, claim references to 16; reject overflow, never silently truncate. Source dates preserve their original precision. I-JSON integers and bounded strings remain mandatory. The exporter omits subject summary because it has no separate claim-level citations.

Sponge implements an independent parser for this small versioned wire contract, not a copied Soulscrape runtime or a partial validator pretending to validate the whole person-index packet. Its output is verifiable `oh.research-packet.v1` with `authority: "unasserted"`. The original packet digest is an external commitment, not a claim that Sponge can reconstruct omitted bytes or attest factual truth. No network fetching, private-contact input, automatic acceptance, or hosted writes.

### Graph projection

Resolve changed outgoing edges using the complete live profile context. A conflicting QID/kind must not bind solely by slug; ambiguous QID matches remain external. Unbound stubs are publisher-scoped, and QID grouping is an asserted binding rather than global identity proof. Frame edge identity preimages and preserve authored collection record IDs when available. Version changed projection identities explicitly so caches can reset; do not mutate the person-index wire schema. Document that row deltas require replacement of changed publishers' profile outbound sets plus periodic full reconciliation for deletion and resolution changes. Do not claim tombstones or gap-free sync.

### Dossier views

Use explicit event kinds for topic grouping; preserve source links, partial dates, event order and existing flat chronology access. Show supplied scope, method and open questions without inferring human review from a generation timestamp. No new universal category enum, timeline field or nested URL scheme.

## Constraints and recovery

- Preserve all existing source comments; add no code comments during this change.
- Parse foreign inputs from unknown; bound work before I/O and retain typed errors where the host uses them.
- No live publishing, republishing, provider writes, migrations, contact merges or private corpus reads in deterministic implementation tests.
- No dependency on sibling paths or coordinated main branches. Reuse installed immutable packages; add no package until the adoption gate.
- The parent owns plan edits, manifests, lockfiles, package inventory, final aggregate validation and commits. Workers own disjoint modules only and never revert another lane.
- PeopleBlade's dirty checkout is preserved; implementation uses the isolated `peopleblade-ontology-work` worktree at its starting HEAD. Sponge's untracked tool configuration and Oh's uncommitted research work are untouched.
- Rollback is removal/reversion of task-owned adapters and views through a normal reviewed commit. Existing packet bytes and SQLite schemas do not change. Graph projection consumers must discard cached topology when its version changes.

## Phases

| ID | Deliverable | Depends on | Parallel write lanes |
|---|---|---|---|
| A | Portable identity primitives and research exporter | frozen contracts above | B, C, D, E |
| B | Graph identity and delta correctness | frozen contracts above | A, C, D, E |
| C | Hraness-inspired dossier navigation | frozen contracts above | A, B, D, E |
| D | PeopleBlade evidence-bound public identifiers | frozen contracts above | A, B, C, E |
| E | Sponge to Oh offline research bridge | frozen exchange above | A, B, C, D |
| F | Cross-consumer contract tests, review and integration | A–E | disjoint review scopes |
| G | Standalone package extraction | shipped consumer proof | gated follow-up |

## Phase A: Portable identity and exporter

- **Status:** Done
- **Objective:** Standalone skill installs retain validation behavior and can export explicit sourced research.
- **Scope:** `skills/soulscrape/scripts/people-ontology.ts`, `person-index.ts`, `export-research.ts`; dedicated tests under `tests/`.
- **Out of scope:** public packet schema changes, generic Oh runtime, site modules, package publishing.
- **Approach:** Extract only pure reused functions with compatibility wrappers. Build the bounded exchange above from the existing validator. A CLI reads one bounded explicit file and writes JSON to stdout. Notify the integrator of exact package-inventory additions.
- **Acceptance:** existing corpus/digests unchanged; canonical URL negatives and Unicode/normalization laws tested; exporter rejects mismatched handle, dangling sources and over-limit input; copied-skill and packed consumer execution succeeds.
- **Validation:** `bun test ./tests/person-index.test.ts ./tests/people-ontology.test.ts ./tests/research-exchange.test.ts`; `bun run typecheck`; integrator runs `bun run check`.

## Phase B: Graph integrity

- **Status:** Done
- **Objective:** Publisher identity and deltas no longer silently alter entity resolution.
- **Scope:** `site/lib/corpus-graph.ts`, graph API route, `site/convex/people.ts`, `site/tests/corpus-graph.test.ts`, dedicated graph tests if needed.
- **Out of scope:** profile page/component and dossier helpers, packet schema, deletion ledger.
- **Approach:** Test adversarial QID/slug conflicts, duplicate bindings, unframed hash preimages, and changed source to unchanged target. Use complete context for filtered projection and explicit projection version. Do not infer QIDs from arbitrary same-named publishers.
- **Acceptance:** deterministic identities; no cross-publisher slug collapse; conflicts/ambiguity do not pick the first row; delta edge targets match a full projection; source provenance is retained; source IDs distinguish authored records when present.
- **Validation:** `bun test ./tests/corpus-graph.test.ts` in `site`; site typecheck and aggregate by integrator.

## Phase C: Dossier navigation

- **Status:** Done
- **Objective:** Readers can browse a sourced dossier by topic without changing its ontology.
- **Scope:** `site/lib/dossier-view.ts`, `site/components/person-profile.tsx`, `site/tests/dossier-view.test.tsx`.
- **Out of scope:** graph builder, page route, profile-view identity/JSON-LD, manifests, new routes or schemas.
- **Approach:** Derive clearly labeled topic groups from existing event kinds, retaining a chronological view and evidence links. Expose supplied coverage/method/gaps faithfully. Use existing React/style conventions and accessible native navigation.
- **Acceptance:** every event remains reachable once in the intended view; grouping stable; unknown kinds remain visible; no inferred categories from prose; no fabricated review status.
- **Validation:** `bun test ./tests/dossier-view.test.tsx` in `site`; integrator wires the named test and runs site check.

## Phase D: Local public-reference adoption

- **Status:** Done
- **Objective:** Existing PeopleBlade research apply/readback records explicit QIDs and public profile URLs with evidence.
- **Scope:** `src/lib/contracts.ts`, `src/local/contacts.ts`, new public-identity helper and focused tests in the isolated PeopleBlade worktree.
- **Out of scope:** contact dedup algorithm, CloudContact schema/sync, new databases/migrations, guessed URLs, live research or private contacts.
- **Approach:** Optional manual-research identity fields require exact cited public references and a confirmed match before becoming bindings. Retain them in existing public_enrichments output_json. Provide bounded readback from that authority. Exact retries remain idempotent; changed output with unchanged evidence must not silently return stale identity.
- **Acceptance:** old research inputs remain valid; explicit binding applies and reads back; missing/conflicting evidence rejected; private dedup and cloud projection unchanged; no automatic merge based on QID.
- **Validation:** focused local contact/public-identity/contracts tests; `bun run check` in isolated worktree after dependencies are installed.

## Phase E: Sponge research adapter

- **Status:** Done
- **Objective:** An explicit exported public research exchange becomes a verified Oh packet without acquiring authority.
- **Scope:** `lib/soulscrape-research-exchange-v1.ts`, `lib/soulscrape-research-adapter.ts`, corresponding tests, `scripts/import-soulscrape-research.ts`, relevant existing `app/docs` model/page/tests.
- **Out of scope:** Oh checkout, new providers, shared package, working-memory or publication writes, retired Party design, dependency updates.
- **Approach:** Use only exports of the installed `@hraness/oh-research` v0.10.0 (catalog V7 or earlier). Compile explicit sourced candidates with publisher provenance and preserved epistemic labels. Use a local-file CLI as the real caller and verify serialized output with the pinned Oh verifier. Report omitted dossier collections; do not treat first-person attribution or syntactic schema admission as independent truth verification.
- **Acceptance:** actual Soulscrape exporter fixture round-trips into a verified unasserted packet; every evidence reference resolves; invalid/oversized/unsupported exchanges rejected; no acceptance, rights or publication fabricated; external commitments stay distinct from internal graph dependencies.
- **Validation:** focused new tests plus `bun test ./lib/knowledge-research-package.test.ts`; final Sponge `bun run check` in a clean task clone, with package-pinned browser prerequisite from README.

## Phase F: Integration and independent review

- **Status:** Done
- **Objective:** All implemented lanes satisfy one reviewed contract and independently buildable repositories.
- **Scope:** plan, package inventories/manifests, integration fixtures/tests, existing documentation, bounded fixes after reviews. Confirmed review findings extend this scope to profile page/link/JSON-LD consistency: reuse graph resolution for visible links and backlinks, and escape JSON-LD for the HTML script context without narrowing legitimate packet text.
- **Approach:** Exchange a synthetic public fixture through both real CLIs. Validate PeopleBlade conformance for the same explicit profile URL. Independently review root/export, graph/dossier and consumer boundaries in parallel; fix findings and rerun affected checks. Parent runs each required aggregate once at the final relevant tree. Do not call local verification deployed or shipped evidence.
- **Acceptance:** required checks pass or exact blockers remain explicit; unrelated dirty files unchanged; legacy packet schema/digests preserved; no sibling runtime imports; all tests wired; source, package, browser/provider qualification and deployment evidence distinguished.
- **Validation:** Soulscrape root `bun run check`, site `bun run check`; PeopleBlade `bun run check`; Sponge clean-clone `bun run check`; `git diff --check` in each changed repo.

## Phase G: Standalone package extraction

- **Status:** Blocked
- **Depends on:** independently shipped consumers and a reviewed stable subset.
- **Objective:** Extract only proven product-neutral primitives, not the Soulscrape dossier or Sponge policy.
- **Scope:** new package authority remains undecided and is not created in this tranche.
- **Acceptance:** two actual consumers use the same proven semantics, immutable distribution and standalone install tests exist, neither consumer imports sibling source, no privacy policy migrates into the generic package.
- **Recovery:** keep adapters and their versioned interchange independently usable if extraction never earns its complexity.

## Implementation log

- Review: three independent read-only audits covered Soulscrape distribution/graph, PeopleBlade persistence, and current Sponge/Oh architecture. Rejected their unsafe suggestions to infer profile URLs, borrow QIDs across publishers, assume nested globs auto-register packed paths, or use unshipped Oh V8. The revised plan preserves the useful findings without adopting those assumptions.
- Parallel implementation owners: A `ee3e2a8e`, B `7d920987`, C `683fc4b5`, D `6ca3b531`, E `feef7e5c`. The integrator owns shared manifests, inventory and this log. Starting heads: Soulscrape `21d06d3`, PeopleBlade `f9a7d42`, Sponge `2169358`. Oh `fdfad76` has unrelated dirty work and is read-only.
- Setup: PeopleBlade's historical feature base had stale dependency metadata and later diverged from current `main`. The final semantic rebase retained current `main`'s manifest, lockfile, prepared-research contract, identity anchors, active-resource filtering, and migration bytes; it reinstalled the current frozen lockfile in the isolated worktree without shipping dependency churn.
- Phase review findings applied: exporter gained bounded in-memory preflight (cycles, sparse/decorated arrays, accessors, depth, canonical byte ceiling) plus installed-tarball execution probes in package smoke; the graph gained stable authored-record edge IDs and pre-conversion timestamp validation; the exchange parser aligned to the producer's lexical timestamp ordering and preserves noncanonical source URLs outside Oh's canonical URI field; PeopleBlade closed an evidence-URL normalization bypass and a FIFO/unbounded-read defect.
- Phase F integration: page, component, backlink and JSON-LD resolution now share `site/lib/profile-identity.ts`'s `createProfileResolver` with the graph — conflicting/ambiguous QID or kind bindings stay unlinked everywhere, unique asserted QIDs resolve authored aliases, and identity-less older query rows degrade to external. `profileJsonLdText` escapes `<` so packet text cannot break out of the JSON-LD script element. JSON-LD target types use supplied-or-resolved kinds and omit `@type` rather than guessing `Person`. `relationsByUsername` projects identity, kind, record-id and source fields; `index.json`/`graph.json` declare `corpusDigestVersion`, `projectionVersion` and explicit `sync` limits (no deletions, full reconciliation required, `asOfMs` is not a cursor). PeopleBlade readback traverses only the target's component with explicit member/decision ceilings.
- Validation evidence: Soulscrape root `bun run check` 355 pass; site `bun run check` green (95 tests incl. new graph-api, corpus-api, dossier-view, profile-links suites); PeopleBlade was semantically rebased onto current `main` (`6f3bd6a`) without changing applied migration bytes, then passed 177 focused tests, package validation, and its complete `bun run check`; PR #162 merged as `f361fdf`. Sponge focused 54 pass incl. real two-CLI joins for Eugene Tssui (301 Oh records) and 37signals (485), both `authority: "unasserted"`; a scheduler-owned clean-clone `bun run check` passed, including 565 Convex tests, foundation tests, typechecks, lint, application and worker builds, and preview-theme browser validation. `git diff --check` passed in every changed repository. Soulscrape PR #61 merged as `5fe4d03`; Sponge delivery is PR #284.
- Remaining risks: the original validator compares `scope.asOf`/`generatedAt` lexically, not chronologically — preserved deliberately and queued as a separate validator-compat follow-up; `listLocalContacts`/`localStats` still use the whole-graph view (pre-existing, out of lane scope); Sponge adapter keeps a conservative 1,024-record budget and rejects non-NFC claim text rather than normalizing.
- Phase G stays blocked: `soulscrape.research-exchange.v1` is the proven contract between exactly two consumers (Soulscrape exporter, Sponge importer); a standalone package still requires a second consumer of the *shared primitives* themselves plus an immutable distribution decision.
