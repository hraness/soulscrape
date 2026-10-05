# Roam Research person index

A `soulscrape.person-index.v1` packet for **Roam Research** (`subject.kind: "organization"`, Wikidata `Q98066309`) — the first organization packet in the corpus. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 45 public sources: roamresearch.com and its help-graph documents, the founder's threads and interviews, funding coverage (The Information, The Hustle, Business Insider), the SEC Form C/A for the community round, Roam Depot's own repository, community write-ups, and assessments of Roam's decline and influence.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory (or `bun examples/people/roam-research/generate.ts` from the repo root), then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/roam-research/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/roam-research/person-index.json"
```

## Scope

- Origins: the founders meeting at 42, Conor White-Sullivan's ~2014 "wilderness" years and Localocracy lineage, and the conflicting public founding dates (2017 per CB Insights and LinkedIn, 2018 per one aggregator, product shipped 2019).
- Product and philosophy: bidirectional linking, networked thought, the white paper, multiplayer/shared graphs, and Roam Depot.
- Community: `#RoamCult`, Roam Depots (physical community spaces), book clubs on shared graphs, and the believer-tier pricing ($15/month, $500 Believer plan).
- Funding: the reported ~$9M September 2020 seed at a $200M valuation, kept distinct from the April 2021 Wefunder community round (Reg CF, SEC Form C/A).
- Influence and decline: the tools-for-thought wave it inspired (Obsidian, Logseq, Athens, Tana) and the unresolved maintenance-vs-abandonment question.

## Organization-contract gaps

The schema's subject block is identical for `person` and `organization`; nothing on this packet is org-specific. Consequences encountered while authoring:

- **No founders/employees/investors fields.** Founders and backers ride in `relations` (`founded_by` for the co-founders; `other` for investors — there is no `investor`, `backer`, or `employee` relation kind, and no org-to-person `employed` direction).
- **No funding-round or launch timeline kinds.** The seed round and the community round are `milestone` events; product launches are `project`/`milestone`.
- **No company-status field.** Whether Roam is alive, dormant, or maintained is expressed only through claims and `openQuestions`; there is no `dissolved`/`active` marker.
- **Company vs. product ambiguity.** `works` holds products (Roam, Roam Depot, multiplayer graphs) while the subject is the company — the same `works` slot that holds a person's projects.
- **No headquarters/headcount member.** Both live in claims and open questions instead.

## Hedging notes

- Founding date is deliberately unresolved (2017 vs. 2018 vs. 2019 vs. ~2014 origins); the packet preserves all four with citations rather than picking one.
- The $200M valuation is reported ("a $200M seed valuation," The Information), not confirmed; the community round is a separate Reg CF event per the SEC filing and is never conflated with the seed.
- Profitability ("hit profitability last year") is attributed to the founder's own thread and filed as `stated_belief`-adjacent attributed fact — there is no independent confirmation.
- Decline and "Roam is dead" framing appear only as `pattern`/`speculation` claims or in `openQuestions`; current headcount, usage, and Joshua Brown's involvement are open questions, not facts.
- One aggregator misnames co-founder Joshua Brown as "Josh Starcher"; the packet notes the discrepancy instead of silently correcting it.
- Conor White-Sullivan's narration is the evidence for much of the origin story; those claims are attributed or classified as `stated_belief`, never standalone `fact` where only his account exists.
