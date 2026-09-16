# Thomas Ptacek person index

A `soulscrape.person-index.v1` packet for security researcher and software developer Thomas Ptacek (Wikidata `Q132860888`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own bio and essays, the Cryptopals and Starfighter first-party records, the NCC Group acquisition announcement, interviews, press coverage, and a Wayback-preserved Matasano Chargen post.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/thomas-ptacek/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/thomas-ptacek/person-index.json"
```
