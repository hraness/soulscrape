# Alan Kay person index

A `soulscrape.person-index.v1` packet for computer scientist Alan Kay (Wikidata `Q92742`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — the archived VPRI site and STEPS report, his ACM papers, talks and mailing-list posts, the ACM Turing and Computer History Museum records, the Kyoto Prize page, Wikidata/Wikipedia/Wikiquote, the ACM Queue and Dr. Dobb's interviews, and Stewart Brand's 1972 Rolling Stone report.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/alan-kay/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/alan-kay/person-index.json"
```
