# Pieter Levels person index

A `soulscrape.person-index.v1` packet for Dutch indie hacker Pieter Levels — handle `pieter-levels`, public handle `@levelsio`, Wikidata `Q140235734` — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 74 public sources.

## Scope

Covers his biography, projects, stated philosophy, and media footprint: the Panda Mix Show music era, the 2013 departure for Bangkok, the 2014 "12 startups in 12 months" challenge, Nomad List / Nomads.com, Remote OK, Hoodmaps, MAKE, the 2022-23 AI products (Interior AI, Avatar AI, Photo AI), fly.pieter.com, Rebase, and the 2024-26 arc (Nomads.com rebrand, vibe-coded launches, the community going nearly free). Major interviews (Lex Fridman #440, My First Million, Indie Hackers #43 and #241/#242, Stripe's A Cheeky Pint) are catalogued with his self-published transcripts linked via `transcriptOf`.

## Sources

Heavy on subject-controlled material (levels.io posts, product sites, X profile) plus interviews, primary records (Hacker News launch threads), reporting (WIRED, Guardian, NOS, Quartz, BBC, Bloomberg, Quote, 404 Media, Business Insider), reference pages (Wikidata, the "Panda (musician)" Wikipedia article, Product Hunt listings), and archive captures (Wayback, an X-thread rehost). Dutch sources carry `language: "nl"`.

## Known gaps and hedges

- All revenue, traffic, and member figures are self-reported and unaudited; conflicting figures across dates are preserved in claims and `openQuestions` rather than resolved.
- Birth date and legal surname are contested (1986 vs July 11, 1987; Mouthaan-Van de Ven vs Quote's "Hooghoudt"); no verified Wikipedia article about him exists — the Panda article covers his music persona.
- Descriptions of anxiety, depression, and loneliness appear only as attributed self-reports; the packet draws no clinical conclusions.
- `rebase.co` returned 403 to the fetcher and is catalogued on the strength of links from his own pages; several older projects' live status is unverified.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/pieter-levels/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/pieter-levels/person-index.json"
```
