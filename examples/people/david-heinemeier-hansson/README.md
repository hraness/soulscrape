# David Heinemeier Hansson person index

A `soulscrape.person-index.v1` packet for programmer, entrepreneur, and racing driver David Heinemeier Hansson — DHH — (Wikidata `Q719413`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site and essays, his co-founder's posts, The Rails Doctrine, congressional testimony records, Wikidata, Wikipedia, interviews, and press coverage including the HEY–Apple fight, the 2021 Basecamp exodus, and the Omarchy sponsorship backlash.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/david-heinemeier-hansson/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/david-heinemeier-hansson/person-index.json"
```
