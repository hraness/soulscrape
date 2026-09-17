# Tyler Cowen person index

A `soulscrape.person-index.v1` packet for economist Tyler Cowen (Wikidata `Q602278`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 51 public sources — his own sites (Marginal Revolution, tylercowen.com, the Ethnic Dining Guide, Conversations with Tyler, MRU), Mercatus/GMU institutional pages, publisher records, interviews (Richmond Fed, NYT Economix, EconTalk, the Kenilworthian chess blog), press coverage (Washington Post, Bloomberg, New Yorker, 1843, Reason, TechCrunch, Axios), and reference material (Wikidata, Wikipedia, a Wayback capture).

Scope: biography, work, beliefs, projects, media, books — as of September 2026.

Notable coverage notes and known gaps:

- His column moved from Bloomberg Opinion to The Free Press in April 2025; older bios describing him as a Bloomberg columnist are stale.
- `GOAT` was released October 2023 as a free "generative book," not 2022 as some listings suggest; *Talent* (with Daniel Gross) was May 2022.
- Open seams are preserved in `openQuestions`: the contested status and end date of the Great Stagnation thesis, the Holbert C. vs. Holbert L. Harris chair naming discrepancy, three different dates for the first CWT episode, the dining guide's unpinned start year, and varying Fast Grants totals.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/tyler-cowen/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/tyler-cowen/person-index.json"
```
