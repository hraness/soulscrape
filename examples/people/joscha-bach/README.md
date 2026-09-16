# Joscha Bach person index

A `soulscrape.person-index.v1` packet for cognitive scientist and AI researcher Joscha Bach (Wikidata `Q56605600`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site, CV, and Substack, Wikipedia and Wikidata, the Oxford University Press catalog, the MicroPsi project pages, his MIT Media Lab project page, the California Institute for Machine Consciousness, podcast and conference recordings, and press coverage including the reporting on his released Epstein correspondence.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/joscha-bach/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/joscha-bach/person-index.json"
```
