# Dwarkesh Patel person index

A `soulscrape.person-index.v1` packet for podcaster and writer Dwarkesh Patel (Wikidata `Q137008739`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site (about page, episode posts, essays, and his December 2025 strategy doc), Wikidata, Wikipedia, interviews of him (Mercury, Every, The Economist's Money Talks, Yesterday), the Apple Podcasts and Stripe Press records, and press coverage from The New Yorker, Vox, and TIME.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/dwarkesh-patel/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/dwarkesh-patel/person-index.json"
```
