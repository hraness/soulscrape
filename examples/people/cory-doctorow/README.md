# Cory Doctorow person index

A `soulscrape.person-index.v1` packet for writer and activist Cory Doctorow
(Wikidata `Q110436`), built by the public-index workflow in
`skills/soulscrape/references/public-person-index.md` from forty-three public
sources: his own sites (craphound.com, pluralistic.net), his first-person essays
and columns, EFF records, publisher catalogs, the American Dialect Society
word-of-the-year record, interviews, and reference material.

## Scope

Covers biography, bibliography, the Boing Boing years (2001-2020), the EFF
relationship, the Creative Commons publishing record, the coinage and spread of
"enshittification" (November 2022 → ADS 2023 Word of the Year, announced
January 5, 2024), and the nonfiction arc through *Chokepoint Capitalism* (2022),
*The Internet Con* (2023), and *Enshittification* (2025). Facts, stated beliefs,
inferred patterns, and speculation are kept in separate claim kinds.

## Sources

Forty-three sources across all seven bindings: `subject_controlled` (his sites),
`first_person` (Pluralistic posts, the Microsoft DRM talk transcript, his Medium
mirrors), `primary_record` (EFF, Creative Commons, ADS, publisher pages),
`reference` (Wikidata, Wikipedia, ISFDB, Etymonline), `reporting` (Inc., The
Guardian, Kirkus), `interview` (Slate, ABC, The Register, EFF, The Guardian),
and `archive` (his Boing Boing author archive, the FT column capture, the
Microsoft Research recording).

## Known gaps

- His exact Boing Boing start date is recorded only as "nearly exactly 19 years"
  before his January 29, 2020 last day.
- *Down and Out in the Magic Kingdom* carries two release dates: January 9,
  2003 (the CC release, per Creative Commons and craphound) and February 1,
  2003 (the print date, per Wikipedia).
- *The Reverse Centaur's Guide to Life After AI* was announced for June 2026 in
  his January 2026 bio; actual publication status is outside the cited record.
- His DRM-free audiobook crowdfunding operation is well known but no catalogued
  source covers it directly.
- The Financial Times column is cited through an archive capture, not the
  canonical ft.com URL.

## Regenerate and validate

`person-index.json` is generated: edit `generate.ts` and run
`bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/cory-doctorow/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/cory-doctorow/person-index.json"
```
