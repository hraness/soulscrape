# Christopher Alexander person index

A `soulscrape.person-index.v1` packet for architect and design theorist Christopher Alexander (Wikidata `Q455076`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own sites (patternlanguage.com, natureoforder.com), Wikidata, Wikipedia, the CES archive, interviews, the OOPSLA '96 keynote recording and transcript, patterns-community records, and obituaries in the Guardian, New York Times, RIBA Journal, and elsewhere.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/christopher-alexander/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/christopher-alexander/person-index.json"
```
