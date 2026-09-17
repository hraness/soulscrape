# Patrick McKenzie person index

A `soulscrape.person-index.v1` packet for Patrick McKenzie — patio11 — software entrepreneur, essayist, and financial-infrastructure writer, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from forty-five public sources: his own sites (kalzumeus.com, bitsaboutmoney.com, complexsystemspodcast.com), his essays and year-in-review posts, the VaccinateCA oral history and press coverage (NPR, NBC, SF Chronicle, SFGate), Stripe's Atlas records, and interviews including Conversations with Tyler, Indie Hackers, Software Engineering Daily, and Product People.

Scope: biography, work, philosophy, projects, media, beliefs, as of September 2026.

## Sources and bindings

Subject-controlled pages anchor identity (his bio, profiles, the Call The Shots/VaccinateCA record page); first-person essays, year-in-reviews, the Works in Progress oral history, and the EA Forum post carry most claims; interviews and contemporaneous reporting corroborate dates; Stripe's newsroom is the primary record for Atlas.

## Known gaps

- No Wikipedia article or Wikidata item exists for him — the Wikipedia "Patrick McKenzie" is a South African politician — so the packet carries no `wikidataId`/`wikipedia` identity anchors.
- Birth date, the unnamed Japanese megacorp employer, and the sale prices of both companies are absent from the cited record; the packet preserves those as `openQuestions` rather than interpolating.
- His current base is ambiguous: the October 2023 Conversations with Tyler recording places him back in the US (Chicago family roots) while GitHub/LinkedIn still say Tokyo.
- VaccinateCA impact figures are his own estimates, labeled as such in claims.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/patrick-mckenzie/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/patrick-mckenzie/person-index.json"
```
