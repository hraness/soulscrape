# Tim Berners-Lee person index

A `soulscrape.person-index.v1` packet for Tim Berners-Lee (Wikidata `Q80`), inventor of the World Wide Web, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own W3C pages and writings (including *Weaving the Web* and the 1989 CERN proposal), the archived 1991 alt.hypertext announcement, institutional records from CERN, ACM, W3C, and Sotheby's, interviews, and press coverage.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/tim-berners-lee/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/tim-berners-lee/person-index.json"
```
