# Stephen Wolfram person index

A `soulscrape.person-index.v1` packet for scientist and entrepreneur Stephen Wolfram (Wikidata `Q310798`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own sites and essays, Wikidata, Wikipedia, peer-reviewed papers, the MacArthur Foundation, press coverage, a TED talk, and long-form interviews.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/stephen-wolfram/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/stephen-wolfram/person-index.json"
```
