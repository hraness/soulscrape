# Johannes Schickling person index

A `soulscrape.person-index.v1` packet for Johannes Schickling — Prisma/Graphcool co-founder, now building Overtone and LiveStore in the local-first and Effect ecosystems — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own sites, the Graphcool farewell page, conference records, podcast interviews, and press coverage. No Wikidata item exists for him as of the compile date, so the packet carries profiles instead of a QID.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/johannes-schickling/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/johannes-schickling/person-index.json"
```
