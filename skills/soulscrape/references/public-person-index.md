# Public person index

Use this procedure when a request asks for a public, publishable index of a person or organization — a profile the world can read, cite, and verify — rather than a private working model. The output is a `soulscrape.person-index.v1` packet: a structured, source-backed record of who the subject is, what they have done, what they believe, and where the evidence for each claim lives.

This mode changes three defaults from the private soulscrape output:

- **Every claim is public.** There is no authorized private corpus; sources are public material only. Never carry contact details, family particulars, or third-party private facts into the packet even when they appear in public sources.
- **Every claim carries a citation.** The packet is useless without its source catalog. If a claim cannot be tied to a listed source, cut it or move it to `openQuestions`.
- **The subject did not consent to being indexed.** A public index reports what public evidence shows. It does not speak for the subject, imitate them, or assert what they would want published.

## 1. Scope the subject

- Fix the subject's identity before researching: full display name, common aliases and alternate spellings, and the strongest external anchors (Wikidata QID, official site, verified profiles). A name match alone never binds a source to the subject.
- Normalize the handle with `normalizePersonHandle` conventions: lowercase, hyphenated, ASCII (`Eugene Tssui` → `eugene-tssui`). For subjects whose names do not romanize cleanly, choose the romanized form the sources themselves use.
- Decide coverage deliberately. `scope.coverage` names what the index actually covers — `work`, `philosophy`, `beliefs`, `projects`, `media`, `biography`, or similar — so the reader knows the bounds.

## 2. Build the source catalog

Prefer primary and first-person sources, then secondary reporting, then reference material. Each catalog entry records how it relates to the subject through `binding`:

- `subject_controlled` — the subject's own site, books, foundation pages
- `first_person` — authored articles, talks, self-description in the subject's words
- `interview` — Q&A formats where the subject speaks to an outlet
- `primary_record` — filings, catalogs, official records
- `reporting` — journalism and third-party analysis
- `reference` — encyclopedias, Wikidata, aggregators
- `archive` — captured or rehosted material

For each source record `mediaType`, `publisher`, `publishedAt` when known, `accessedAt`, and `authors`. Link transcripts to their media via `transcriptOf`. For video and audio, catalog the canonical platform URL (YouTube watch URL, not a short link).

Derive every `id` with `stablePersonSourceId(url, publishedAt)` — never hand-write a source id. Canonicalization lowercases the host, strips tracking parameters and fragments, and maps `youtu.be/<id>` to the watch URL, so reposts and link variants dedupe correctly.

Keep researching until new sources mostly repeat what the catalog already says or turn up contradictions worth preserving — usually tens of sources for a well-documented public figure, fewer for a narrow subject. State coverage honestly; do not claim exhaustive reading.

## 3. Extract into the index

Work the catalog into the packet's collections. Each item cites `sourceIds` — at least one, always resolving.

- **claims** — atomic statements with `kind`: `fact` (dates, roles, works), `stated_belief` (what the subject says they think), `pattern` (what repeated evidence shows), `speculation` (plausible but thin). Write claims a reader can check in one source visit.
- **timeline** — dated events: `birth`, `founded`, `education`, `apprenticeship`, `role`, `project`, `publication`, `award`, `exhibition`, `media`, `funding`, `milestone`. Use `end` for ranges; use `funding` for rounds and grants. `organization` names the org; add `organizationHandle` (normalized slug) when the org is or could be indexed. Prefer `YYYY-MM-DD` when known; partial dates are fine.
- **themes** — the philosophy, beliefs, interests, practices, influences, and methods that recur across sources. `status` distinguishes `stated` (subject's own words) from `reported` (press framing) from `inferred` (your synthesis — use sparingly).
- **works** — projects, buildings, books, films, recordings, designs, products, papers, with an honest `status`: `completed`/`published`/`released` for what exists, `proposed`/`unbuilt`/`in_progress`/`abandoned` for what does not.
- **appearances** — interviews, videos, talks, broadcasts, each with venue, participants, and media links.
- **relations** — evidence-backed edges from the subject to other entities: `collaborated`, `cofounder`, `founded`, `founded_by`, `employed_by`, `employed`, `member_of`, `member`, `funded_by`, `invested_in`, `mentored`, `mentored_by`, `signed`, `signed_to`, `spun_off`, `acquired`, `acquired_by`, `managed_by`, `manages`, `interviewed`, `interviewed_by`, `influenced`, `influenced_by`, `family`, `other`. Read each as "subject [kind] target" — so `member_of` means the subject belongs to the target, `member` means the target belongs to the subject, `funded_by` names a backer, `invested_in` names an investment, `mentored_by` covers advisors/teachers/masters the subject studied or apprenticed under (reserve `influenced_by` for diffuse influence, not formal mentorship), `signed_to`/`signed` cover label-and-artist signings where `member`/`member_of` would be wrong, `spun_off` names a product or unit the subject spun out, `acquired`/`acquired_by` mark org-level acquisitions (not person-level — a founder's company being bought is not `acquired_by` on the person), and `managed_by`/`manages` cover talent management. `target` is the target's normalized handle-form slug (`eugene-tssui`); `targetName` its display name; `targetKind` is `person` unless marked `organization`. Optional `start`/`end` (partial dates) bound temporal edges like employment and membership; optional `targetWikidataId` binds the edge to a stable entity QID so it joins regardless of slug spelling. A target need not be indexed — the slug is a locator, not a claim that a page exists. Only record edges a source actually supports.
- **openQuestions** — live uncertainties, contradictions, and coverage gaps. This list is a feature, not an admission of failure.
- **body** — the synthesized essay (Markdown): who the subject is, how their work and ideas fit together, what they believe, and what remains uncertain. Write for a reader who has not read the sources; cite with inline source names or footnote-style markers that point back to the catalog.

Preserve contradictions. When sources disagree — a title, a date, a count of built works — record the disagreement in a claim or `openQuestions` entry rather than silently picking one.

## 4. Assemble and validate

Write the packet as a single JSON document. Required members: `schemaVersion` (`soulscrape.person-index.v1`), `indexId` (`pidx-<slug>`, stable across revisions), `generatedAt`, `subject`, `scope`, `sources`, `claims`, `body`, `provenance`.

Validate before publishing:

```sh
bun scripts/validate-person-index.ts /absolute/path/to/person-index.json
```

The validator checks structure, referential integrity, derived source ids, and bounds, and prints a receipt with counts and the canonical packet digest. Fix every failure — never patch around a validation error to make it pass.

## 5. Publish

Publishing requires a Hraness account and writes to `soulscrape.com/<username>/<handle>`:

```sh
bun scripts/publish-person.ts login          # device authorization, once
bun scripts/publish-person.ts publish /absolute/path/to/person-index.json
bun scripts/publish-person.ts list
bun scripts/publish-person.ts withdraw <handle>
```

`publish` is idempotent: republishing identical bytes returns the existing record; publishing changed bytes bumps the revision. A packet is a snapshot with `scope.asOf` — republish to refresh the index after new research.

## 6. Public-index boundaries

- Do not infer protected or sensitive attributes; do not diagnose.
- Attribute self-claims to the subject's own words (`stated`), and press framing to the publisher (`reported`).
- Treat Wikipedia and aggregators as `reference` discovery material, not primary truth — especially when the article carries a conflict-of-interest or close-connection notice.
- Quote sparingly. A public index cites and summarizes; it does not republish interviews wholesale.
- Omit private contact details, direct identifiers, and third-party personal details even when a public source prints them.
- The index never asserts that the subject endorses, reviewed, or is aware of it.
