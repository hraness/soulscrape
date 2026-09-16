# Amelia Wattenberger person index

A `soulscrape.person-index.v1` packet for designer, engineer, and data-visualization author Amelia Wattenberger, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — her own site and essays, GitHub Next project pages, her Pudding piece, podcast and video interviews, reference profiles, and press coverage. No Wikidata or Wikipedia entry exists for her, so identity anchors to wattenberger.com and her public profiles.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/amelia-wattenberger/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/amelia-wattenberger/person-index.json"
```
