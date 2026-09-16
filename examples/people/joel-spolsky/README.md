# Joel Spolsky person index

A `soulscrape.person-index.v1` packet for software engineer, writer, and entrepreneur Joel Spolsky (Wikidata `Q2387083`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own Joel on Software essays and bio pages, the HASH leadership page, Wikidata, Wikipedia, the Founders at Work and Mixergy interviews, acquirer announcements from Atlassian, Prosus, and Fastly, and contemporaneous TechCrunch and Verge coverage.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/joel-spolsky/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/joel-spolsky/person-index.json"
```
