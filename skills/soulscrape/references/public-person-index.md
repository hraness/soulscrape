# Public person index

Use this procedure when a request asks for a public, publishable index of a person or organization (a profile anyone can read, cite, and verify) rather than a private working model. The output is a `soulscrape.person-index.v1` packet: a structured, source-backed record of who the subject is, what they have done, what they believe, and where the evidence for each claim lives.

This mode changes three defaults from the private soulscrape output:

- **Every claim is public.** There is no authorized private corpus; sources are public material only. Never carry contact details, family particulars, or third-party private facts into the packet even when they appear in public sources.
- **Every claim carries a citation.** The packet is useless without its source catalog. If a claim cannot be tied to a listed source, cut it or move it to `openQuestions`.
- **The subject did not consent to being indexed.** A public index reports what public evidence shows. It does not speak for the subject, imitate them, or assert what they would want published.

## 1. Scope the subject

Read [web-research.md](web-research.md) before the first public lookup. A request for a public index authorizes the public research needed for its stated coverage, within that reference's source and access boundaries.

- Fix the subject's identity before researching: full display name, common aliases and alternate spellings, and the strongest external anchors (Wikidata QID, official site, verified profiles). A name match alone never binds a source to the subject.
- Normalize the handle with `normalizePersonHandle` conventions: lowercase, hyphenated, ASCII (`Eugene Tssui` → `eugene-tssui`). For subjects whose names do not romanize cleanly, choose the romanized form the sources themselves use.
- Decide coverage deliberately. `scope.coverage` names what the index covers (`work`, `philosophy`, `beliefs`, `projects`, `media`, `biography`, or similar) so the reader knows its scope.
- Follow [personal-links.md](personal-links.md) to populate `subject.identity.officialSite`, `profiles`, and `wikipedia` with verified canonical destinations. Preserve the evidence in the source catalog and citation ledger; omit unresolved links.
- When a person's profile needs a portrait, follow [headshots.md](headshots.md), then [line-drawing.md](line-drawing.md). Keep the source image and processing receipts beside the packet. The packet has no portrait metadata field; do not add unsupported members or publish an image with unresolved reuse terms. Organizations use their own identity assets, not this person-headshot workflow.

## 2. Build the source catalog

Prefer primary and first-person sources, then secondary reporting, then reference material. Each catalog entry records how it relates to the subject through `binding`:

- `subject_controlled`: the subject's own site, books, foundation pages
- `first_person`: authored articles, talks, self-description in the subject's words
- `interview`: Q&A formats where the subject speaks to an outlet
- `primary_record`: filings, catalogs, official records
- `reporting`: journalism and third-party analysis
- `reference`: encyclopedias, Wikidata, aggregators
- `archive`: captured or rehosted material

For each source record `mediaType`, `publisher`, `publishedAt` when known, `accessedAt`, and `authors`. Link transcripts to their media via `transcriptOf`. For video and audio, catalog the canonical platform URL (YouTube watch URL, not a short link).

Derive every `id` with `stablePersonSourceId(url, publishedAt)`. Never hand-write a source id. Canonicalization lowercases the host, strips tracking parameters and fragments, and maps `youtu.be/<id>` to the watch URL, so reposts and link variants dedupe correctly.

Keep researching until new sources mostly repeat what the catalog already says or turn up contradictions worth preserving: usually tens of sources for a well-documented public figure, fewer for a narrow subject. State coverage honestly; do not claim exhaustive reading.

## 3. Extract into the index

Work the catalog into the packet's collections. Each item cites `sourceIds`: at least one, and every id must resolve.

- **claims**: atomic statements with `kind`: `fact` (dates, roles, works), `stated_belief` (what the subject says they think), `pattern` (what repeated evidence shows), `speculation` (plausible but thin). Write claims a reader can check in one source visit.
- **timeline**: dated events: `birth`, `founded`, `education`, `apprenticeship`, `role`, `project`, `publication`, `award`, `exhibition`, `media`, `funding`, `milestone`. Use `end` for ranges; use `funding` for rounds and grants. `organization` names the org; add `organizationHandle` (normalized slug) when the org is or could be indexed. Prefer `YYYY-MM-DD` when known; partial dates are fine.
- **themes**: the philosophy, beliefs, interests, practices, influences, and methods that recur across sources. `status` distinguishes `stated` (subject's own words) from `reported` (press framing) from `inferred` (your synthesis; use it sparingly).
- **works**: projects, buildings, books, films, recordings, designs, products, papers, with an accurate `status`: `completed`/`published`/`released` for what exists, `proposed`/`unbuilt`/`in_progress`/`abandoned` for what does not.
- **appearances**: interviews, videos, talks, broadcasts, each with venue, `participants`, and media links. Optional `participantHandles` binds participant names to normalized slugs (`{ name, handle }`, name must match a `participants` entry verbatim, names unique, ≤12 bindings). Bound participants emit `appeared_with` co-presence edges in the public graph and link to live profiles. Bind a name only when you can confidently resolve it to a normalized handle; leave the rest unbound rather than guessing.
- **relations**: evidence-backed edges from the subject to other entities: `collaborated`, `cofounder`, `founded`, `founded_by`, `employed_by`, `employed`, `member_of`, `member`, `funded_by`, `invested_in`, `mentored`, `mentored_by`, `signed`, `signed_to`, `spun_off`, `acquired`, `acquired_by`, `managed_by`, `manages`, `interviewed`, `interviewed_by`, `influenced`, `influenced_by`, `family`, `other`. Read each as "subject [kind] target", so `member_of` means the subject belongs to the target, `member` means the target belongs to the subject, `funded_by` names a backer, `invested_in` names an investment, `mentored_by` covers advisors/teachers/masters the subject studied or apprenticed under (reserve `influenced_by` for diffuse influence, not formal mentorship), `signed_to`/`signed` cover label-and-artist signings where `member`/`member_of` would be wrong, `spun_off` names a product or unit the subject spun out, `acquired`/`acquired_by` mark org-level acquisitions (not person-level: a founder's company being bought is not `acquired_by` on the person), and `managed_by`/`manages` cover talent management. `target` is the target's normalized handle-form slug (`eugene-tssui`); `targetName` its display name; `targetKind` is `person` unless marked `organization`. Optional `start`/`end` (partial dates) bound temporal edges like employment and membership; optional `targetWikidataId` binds the edge to a stable entity QID so it joins regardless of slug spelling. A target need not be indexed; the slug is a locator, not a claim that a page exists. Only record edges a source actually supports.
- **openQuestions**: live uncertainties, contradictions, and coverage gaps. List every one the evidence leaves open.
- **body**: the essay (Markdown). Write it last, following section 4.

Preserve contradictions. When sources disagree about a title, a date, or a count of built works, record the disagreement in a claim or `openQuestions` entry rather than silently picking one.

## 4. Write the summary and the essay

People read `subject.summary` and `body` on the profile page, in search results, in share cards, and on example cards. They have not seen these instructions or the sources, and they do not know how the packet was assembled.

Include this block from [`GENERATION_STYLE.md`](https://github.com/hraness/.github/blob/main/GENERATION_STYLE.md) verbatim, then the addendum and the packet rules below it. Later rules narrow the block; they do not undo it.

<!-- hraness-generation-style:v1:start -->
```text
People will read what you write on a public page, in a feed, or in a message. They have not seen these instructions, the input fields, or the sources, and they do not know how you worked.

Say what happened or what the source shows. Name who did what, where, and when, and give the most important number, date, or limit from the input. Attribute each claim to the source that makes it. Keep "reportedly", "says", and "estimates" when the source uses them. Keep official levels and categories exactly as the source gives them: warning, watch, or advisory; mean or median; preprint or journal article.

Stop when the input runs out. State a cause, consequence, or significance only when the input states it, and attribute it. Do not end with a sentence about what something signals, underscores, highlights, reflects, represents, marks, or means, and do not end on a maxim or a quip.

Do not describe your process or your inputs. Do not mention candidates, feeds, scores, captures, fetches, paywalls, blocked pages, prompts, templates, or items you left out. Do not grade the source. Do not call your own text honest, plain, factual, or balanced.

Write plain sentences of varied length. Use no em dashes, exclamation marks, or rhetorical questions. State a claim directly instead of setting it against a claim nobody made. List three things only when there are three. Avoid these words: significant, notable, pivotal, landscape, amid, delve, underscore, showcase, leverage, seamless, robust, powerful, genuinely, actually.

Write dates as dates. Do not write today, yesterday, tomorrow, this week, or recently in text that stays published.

Put only exact words from the input in quotation marks, with their speaker. Everything else is your summary. Never invent a quotation, source, link, number, or first-person experience.

Length limits are maximums. Write less when the input supports less. When a field has a character limit, write a complete sentence that fits it.

When a field names a language, write only that language. Keep names, product names, and units unchanged in translation.
```
<!-- hraness-generation-style:v1:end -->

**Writing about a real person.** Every evaluative claim about a named person needs a named source that makes the evaluation. Do not assign scores or archetypes. End on the last supported fact, and do not use a stock closing heading.

Packet rules:

- **`subject.summary`**: one to three plain sentences that say who the person is and what they are known for. It becomes the page description, the share card, and the example card, so each claim in it must match a claim in the packet at the same strength and scope. “Spotify's most-streamed artist for 2020, 2021, and 2022” is supported by a sourced claim; “the most-streamed artist alive” is not.
- **`body`**: plain explanatory prose for a reader who has not read the sources. Lead with who the person is and what they are known for. Write at most about 1,200 words, and less when the sources support less. Let section headings follow this person's record rather than a fixed outline.
- Attribute factual sentences inline by publication and year, for example “(KQED, 2025)”. Mark your own interpretation as interpretation (“In this index's reading, …”) or leave it out.
- Put unresolved points in `openQuestions`, not in a closing section of the essay. Do not end the essay with a disclaimer; the profile page shows its own notice.
- Do not use em dashes. Do not frame a claim as “not X but Y” unless a source states the misconception. Avoid stock framing words such as throughline, seams, soft spots, unusually, testament, and tapestry.
- Write each dossier from its own sources. Do not copy wording, section headings, or closing lines from another example packet or its `generate.ts`.
- Record `provenance.method` as `public-person-index-v2`, the version of this procedure; it includes `hraness-generation-style/v1`. Packets written under the earlier procedure keep `public-person-index-v1`.

`validate-person-index.ts` prints a warning for an em dash in `subject.summary`, an essay that ends with the stock heading “What the record does not settle”, and an essay that ends with a disclaimer paragraph. Fix each warning before you publish.

## 5. Assemble and validate

Write the packet as a single JSON document. Required members: `schemaVersion` (`soulscrape.person-index.v1`), `indexId` (`pidx-<slug>`, stable across revisions), `generatedAt`, `subject`, `scope`, `sources`, `claims`, `body`, `provenance`.

Validate before publishing:

```sh
bun scripts/validate-person-index.ts /absolute/path/to/person-index.json
```

The validator checks structure, referential integrity, derived source ids, and bounds, and prints a receipt with counts and the canonical packet digest. Fix every failure; never patch around a validation error to make it pass.

## 6. Review and publish for free

Review the complete packet with the user: identity, claim support, source links, uncertainty, and public suitability. A passing validator does not establish truth or permission to publish. Upload only within the user's explicit publishing instruction; keep private notes, archives, and the working model out of the packet.

Publishing requires a free Hraness account and writes to `soulscrape.com/<username>/<handle>`:

```sh
bun scripts/publish-person.ts login          # device authorization, once
bun scripts/publish-person.ts publish /absolute/path/to/person-index.json
bun scripts/publish-person.ts list
bun scripts/publish-person.ts withdraw <handle>
```

The login command prints a device link. Create a free account or sign in there, then confirm that the pairing code matches the terminal. Device authorization alone publishes nothing. No Soulscrape subscription, Credits, or payment card is required. Your agent performs the research with your model and tools; any external charges are separate. Public pages and read APIs need no account. Hraness receives the reviewed public packet and publishing metadata, not the private corpus used for a local model.

`publish` is idempotent: republishing an identical live packet performs no writes and consumes no publishing quota. Changed bytes bump the revision. Restoring an identical withdrawn packet preserves its revision and consumes a publishing token. A packet is a snapshot with `scope.asOf`; republish to refresh the index after new research.

Free hosting allows 200 retained profiles and 20 MiB of canonical packet bytes per account, including withdrawn profiles. A packet submitted through the HTTP API or CLI and its request must each fit 512 KiB; leave room for the JSON envelope. Previously stored oversized packets remain readable and withdrawable, but that does not permit an oversized CLI restore. The graph projection may be at most 64 KiB for new or enlarged projections. Existing over-budget data is retained and can be kept at the same size or reduced. Meaningful publishes share a bucket of 10 tokens, refilling one per minute (60 per hour). Do not retry a quota failure unchanged. Withdrawal remains free and does not consume publishing tokens, but retained packets still count toward storage limits.

An account can issue 20 active publishing credentials. A `DEVICE_LIMIT` error stops automatic polling and leaves the pairing unconsumed. Log out on a device you control to revoke its credential, then retry pairing; contact `hraness@pm.me` if all credentials are lost. Logout does not withdraw your profiles. Revoked credential records become eligible for bounded hourly cleanup after 30 days.

Withdrawn full-profile JSON and Markdown stop being served at the origin. Aggregate summaries, graph projections, themes, and questions can remain in shared caches for up to 30 seconds. The retained packet can be restored, and third-party copies can persist. Review the complete packet before any public upload.

Agents integrating directly can inspect the [OpenAPI 3.1 document](https://soulscrape.com/api/v1/openapi.json). It marks public reads, credential-lifecycle operations, and externally visible writes with `x-soulscrape-risk`. Keep the device polling secret and publishing credential outside model-visible state.

For corpus reads, follow every endpoint's `pagination.nextCursor` until `isDone` is true. Index pages default to and allow at most 100 profiles; graph, themes, and questions default to 10 and allow at most 25. Cursors stay on their originating endpoint, and `snapshot: false` means pages are not an atomic snapshot. Index/graph `corpusDigestVersion: "soulscrape.corpus-page.v1"` hashes only that page. Graph version `soulscrape.graph.v3` resolves against a complete corpus only for a first page that is also the last; other pages preserve unresolved references for client reconciliation. Do not claim completeness from one page or from the bounded sitemap; traverse `/api/v1/index.json` for the corpus. HTML related-profile links may be omitted when their bounded publisher-context lookup is incomplete or its publisher generation changes between pages, while the full profile remains readable. `PAGE_TOO_LARGE` (HTTP 400) means the 3 MiB response ceiling was exceeded; retry that page with `limit=1` rather than dropping content.

## 7. Public-index boundaries

- Do not infer protected or sensitive attributes; do not diagnose.
- Attribute self-claims to the subject's own words (`stated`), and press framing to the publisher (`reported`).
- Treat Wikipedia and aggregators as `reference` discovery material, not primary truth, especially when the article carries a conflict-of-interest or close-connection notice.
- Quote sparingly. A public index cites and summarizes; it does not republish interviews wholesale.
- Omit private contact details, direct identifiers, and third-party personal details even when a public source prints them.
- The index never asserts that the subject endorses, reviewed, or is aware of it.

## 8. Export sourced claims for research

Use the local exporter to pass a public index's identity context, source catalog, and atomic claims to another research tool:

```sh
bun scripts/export-research.ts --input /absolute/path/to/person-index.json --profile-url https://soulscrape.com/ben/eugene-tssui
```

Supply the actual publisher URL; never derive it from a display name. The exporter validates the full person-index packet and requires the URL handle to match its subject. It writes a bounded `soulscrape.research-exchange.v1` JSON document to stdout without fetching or publishing anything. A syntactically valid URL is not proof that the profile exists or that the publisher's identity assertion is correct.

The exchange preserves the original packet digest, generation and scope dates, source metadata, and the four claim kinds. Its `omittedCollections` explicitly lists timeline, themes, works, appearances, relations, open questions, and the essay body. The exchange is not a lossless copy of the dossier. Use the original packet when those sections are needed.

The exporter checks structure and source references, not the factual support or public suitability of the text. Review those before export. A receiving tool must make its own review, retention, identity and publication decisions; successful conversion grants none of them.
