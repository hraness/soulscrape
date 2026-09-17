# Bret Victor person index

A `soulscrape.person-index.v1` packet for interface researcher Bret Victor (Wikidata `Q28086018`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from sixty public sources — his own worrydream.com essays and CV, the Dynamicland documentation site and IRS narrative, talk videos, conference records, press coverage, and the Postlight podcast interview.

## Scope

- Coverage: biography, work, philosophy, projects, media. Emphasis is on the public record — essays, talks, the Dynamicland/Realtalk research program, and what little is documented about the Apple years.
- Apple-era specifics are deliberately thin: his CV and a few profiles are the only documentation, and the index marks that material as self-reported rather than inflating it into established fact.

## Sources

Roughly half the catalog is `subject_controlled` or `first_person` (worrydream.com, dynamicland.org, talk videos). The rest mixes `reporting` (Wired, The Atlantic, Bloomberg, re:form, MIT Technology Review, Fast Company), `interview` (the Postlight podcast), `primary_record` (CUSEC/UIST/SPLASH/EG program pages, the 501(c)(3) narrative), `reference` (Wikipedia, Wikidata), and `archive` (Internet Archive capture, a community transcript, a re-hosted video).

## Known gaps

- Apple tenure end date is contested (his CV says 2010; Wikipedia says 2011) — preserved as an open question rather than resolved.
- The CDG → HARC → Dynamicland organizational lineage is fuzzy at the boundaries; the lab's own zine counts from a 2013 founding while press coverage has him joining CDG in 2014.
- A detailed public write-up of how Realtalk works has not been published; the lab says it intends one after the Realtalk-2024 iteration.
- Dynamicland's Oakland community space closed for covid and the lease ended December 2021; the announced successor is a Berkeley "dynamic library" with a hoped-for 2027 gradual opening — aspirational, not committed.
- No birth year appears in the public record, so the timeline starts at Caltech.

## Regenerate

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/bret-victor/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/bret-victor/person-index.json"
```
