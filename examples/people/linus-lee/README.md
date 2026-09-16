# Linus Lee person index

A `soulscrape.person-index.v1` packet for independent researcher and engineer Linus Lee (@thesephist), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site and project catalog, his essays and research reports, a recorded conference talk, podcast and print interviews, and press coverage. No Wikipedia article or Wikidata item exists for him as of this index; identity anchors are his site and profiles.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/linus-lee/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/linus-lee/person-index.json"
```
