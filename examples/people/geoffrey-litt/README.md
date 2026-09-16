# Geoffrey Litt person index

A `soulscrape.person-index.v1` packet for software designer and HCI researcher Geoffrey Litt (Wikidata `Q130875996`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site, resume, and newsletter, his Ink & Switch essays and ACM papers (Potluck, Embark, Peritext, Riffle, the malleable-software manifesto), podcast interviews (Dialectic, Metamuse, localfirst.fm, Generally Intelligent), his ORCID and Wikidata records, and a Recurse Center event page.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/geoffrey-litt/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/geoffrey-litt/person-index.json"
```
