# Stewart Brand person index

A `soulscrape.person-index.v1` packet for writer and institution-builder Stewart Brand (Wikidata `Q971994`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own pages at Long Now, Wikidata, Wikipedia, the National Book Foundation record, the Engelbart demo outline, his books and Rolling Stone article, interviews, press coverage, and the Whole Earth Index and Stanford archives.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/stewart-brand/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/stewart-brand/person-index.json"
```
