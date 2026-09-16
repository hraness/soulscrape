# Steph Ango person index

A `soulscrape.person-index.v1` packet for Steph Ango — better known online as kepano — CEO of Obsidian (Wikidata `Q126889957`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site and essays, official Obsidian and Narvar announcements, podcast and press interviews, Wikidata, Wikipedia, and business coverage of the Lumi acquisition.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/steph-ango/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/steph-ango/person-index.json"
```
