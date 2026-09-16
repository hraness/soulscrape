# Geoffrey Huntley person index

A `soulscrape.person-index.v1` packet for Australian developer and speaker Geoffrey Huntley (Wikidata `Q95373948`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site and posts, his GitHub project repos, Wikidata, interviews, press coverage, the archived technologists' letter to Congress, and conference records.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/geoffrey-huntley/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/geoffrey-huntley/person-index.json"
```
