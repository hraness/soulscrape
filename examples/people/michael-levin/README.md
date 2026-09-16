# Michael Levin person index

A `soulscrape.person-index.v1` packet for Tufts developmental and synthetic biologist Michael Levin (Wikidata `Q39444955`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his lab site and blog, Wikidata, Wikipedia, institutional bios, peer-reviewed papers, long-form interviews, and press coverage of xenobots and anthrobots.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/michael-levin/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/michael-levin/person-index.json"
```
