# Gwern Branwen person index

A `soulscrape.person-index.v1` packet for the pseudonymous independent researcher Gwern Branwen (Wikidata `Q108133995`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 45 public sources — his own site (essays, about/me/design meta pages, the DNM archives, his archived Reddit subpoena PSA, his annotated interview transcript), reference records (Wikidata, his Wikipedia user page, Google Scholar, Longterm Wiki), the peer-reviewed IJDP paper record, press coverage (Wired, Ars Technica, Forbes, Vice/Motherboard, Jezebel, Reason, Slate Star Codex, Synced), rehosts (Distributed Denial of Secrets, the Wayback Machine), and the 2024 Dwarkesh Podcast interview.

Scope: public writing career, self-experimentation record, darknet-market research, scaling-era AI commentary, site infrastructure, and pseudonymity as documented practice — not private identity.

## Known gaps and hedges

- **Identity is deliberately private.** The packet records pseudonymity as part of the record and does not attempt to identify him; see `openQuestions`.
- **Subpoena framing corrected.** The documented event is the March 2015 DHS/ICE *administrative* subpoena to Reddit naming five r/DarkNetMarkets accounts (Evolution-collapse fallout) — not a Silk Road grand-jury subpoena addressed to him personally. The distinction is preserved in `claim-subpoena` and `openQuestions`.
- **Self-reported work history** (Wired 2015, MIRI, CFAR, GiveWell, FBI 2016) comes only from his own About page and is labeled as such.
- **Wikipedia edit counts** vary by counter (~95k including deleted edits per his resume page, ~2012; "90,000+" per secondary profiles).
- **No English Wikipedia article exists** about him (Wikidata has zero sitelinks), so `subject.identity` carries no `wikipedia` field.
- **Interview record is thin by design** — only the Dwarkesh episode and the 2013 Hacker News Q&A are catalogued.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/gwern/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/gwern/person-index.json"
```
