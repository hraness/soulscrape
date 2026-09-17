# George Hotz person index

A `soulscrape.person-index.v1` packet for hacker and founder George Hotz (Wikidata `Q370733`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 58 public sources — his own sites and blog posts, the comma.ai and tinygrad catalogs and repositories, the SCEA v. Hotz consent judgment and archived PACER docket, iPhone/PS3-era reporting, the 2015 Bloomberg garage profile and Tesla's rebuttal, NHTSA coverage, Consumer Reports' 2020 ADAS test, conference talks, and long-form interviews (Lex Fridman, Dwarkesh Patel's Yudkowsky debate, Latent Space).

Scope: biography, work, philosophy, projects, media, beliefs — as of 2026-09-16. Claims are separated into `fact`, `stated_belief`, `pattern`, and `speculation`; contradictions (the disputed Musk offer, press "self-driving" framing versus comma's driver-assistance positioning, his ambiguous post-2025 comma status, company-reported metrics) are preserved rather than resolved.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/george-hotz/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/george-hotz/person-index.json"
```

## Known gaps

- No NHTSA primary URL: the agency's special-order letter is cited through TechCrunch and MIT Technology Review reporting; the canonical NHTSA page 404'd during research.
- Early-life details (birthplace, schooling, ISEF record, the 21M blackra1n figure) rest on Wikipedia plus Hotz's own telling; primary documentation was not located.
- comma's headline metrics (100M+ user miles, 325+ supported cars, the mid-2025 $1B valuation) are company- or self-stated and not independently audited.
- The comma body's announced "robot person" successors have no confirmed delivery in the record.
- A software-only iPhone unlock surfaced the same week in 2007; "first" is hedged to the first publicly verified carrier unlock.
