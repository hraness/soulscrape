# Eugene Tssui person index

A `soulscrape.person-index.v1` packet for architect Eugene Tssui (Wikidata `Q5407800`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from seventeen public sources — his own sites, Wikidata, Wikipedia, interviews, press coverage, and the TELOS documentary.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/eugene-tssui/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/eugene-tssui/person-index.json"
```
