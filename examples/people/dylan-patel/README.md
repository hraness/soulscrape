# Dylan Patel person index

A `soulscrape.person-index.v1` packet for Dylan Patel, founder and chief analyst of SemiAnalysis, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his firm's own pages, his bylined reports, podcast interviews, an SEC filing, and press coverage. No Wikipedia article or Wikidata item exists for him as of this index, so identity rests on subject-controlled and press sources.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/dylan-patel/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/dylan-patel/person-index.json"
```
