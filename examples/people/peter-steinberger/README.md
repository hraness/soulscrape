# Peter Steinberger person index

A `soulscrape.person-index.v1` packet for Peter Steinberger (Wikidata `Q137924561`, @steipete) — Austrian developer, PSPDFKit founder, and creator of OpenClaw — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own site and essays, the OpenClaw blog, interviews (Lex Fridman, The Pragmatic Engineer, TBPN, OpenAI's Builders Unscripted), investor/company announcements, Wikidata, Wikipedia, TEDAI, and press coverage.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/peter-steinberger/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/peter-steinberger/person-index.json"
```
