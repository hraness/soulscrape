# Greg Brockman person index

A `soulscrape.person-index.v1` packet for OpenAI co-founder and president Greg Brockman (Wikidata `Q100604534`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site and essays, his crisis-era posts on X, his Senate testimony and TED talk, the OpenAI Gym whitepaper, OpenAI's official announcements, interviews with TechCrunch and Fortune, and reporting from MIT Technology Review, The Verge, Reuters, The New York Times, and The Wall Street Journal.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/greg-brockman/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/greg-brockman/person-index.json"
```
