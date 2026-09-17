# Anil Dash person index

A `soulscrape.person-index.v1` packet for Anil Dash (Wikidata `Q4764630`) — blogger since 1999, first employee of Six Apart, founder of Expert Labs, co-founder of Activate/ThinkUp/Makerbase, CEO of Fog Creek/Glitch through its 2022 acquisition by Fastly, co-creator of the first NFT prototype, and a noted Prince scholar — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 46 public sources: his own site and essays, the AAAS/CWA/Sotheby's/Webby/Fastly primary records, interviews, press coverage, and reference material.

## Scope

Covers biography, work, beliefs, projects, media, and philosophy through September 17, 2026 — including the July 2025 end of Glitch app hosting and his new firm antitech.

## Sources and gaps

The catalog mixes `subject_controlled` (anildash.com, anti.tech, LinkedIn), `first_person` (his blog essays, The Atlantic NFT piece, the Glitch posts, Function), `interview` (The Current, The Morning News, Big Think), `primary_record` (AAAS, CWA, Sotheby's, the Webby citation, Fastly, ThinkUp docs), `reporting` (The Verge, TechCrunch, Vice, Salon, Observer, NYT, Axios, and others), `reference` (Wikidata, Wikipedia), and `archive` (a 2009 Wayback capture of his dashes.com about page).

Known gaps are listed in `openQuestions`: the exact Six Apart start boundary (he "helped start" a company founded in 2001 but was hired in 2003), the October-vs-December 2016 Fog Creek start, Expert Labs' undated wind-down, the uneven public credit split on the first NFT, antitech's undocumented model, Glitch's unresolved afterlife, the Vanity Fair profile with no stable URL, and his self-reported early Prince-fan history.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/anil-dash/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/anil-dash/person-index.json"
```
