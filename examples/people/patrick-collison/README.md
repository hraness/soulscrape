# Patrick Collison person index

A `soulscrape.person-index.v1` packet for Stripe co-founder and CEO Patrick Collison (Wikidata `Q7146257`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site (about, Fast, Questions, Advice), Wikidata, Wikipedia, his Atlantic and Fast Grants essays, Stripe/Arc/Frontier/Rhine Group announcements, interviews with Cowen, Ferriss, O'Shaughnessy, and Patel, and press coverage from the Irish Times and Bloomberg.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/patrick-collison/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/patrick-collison/person-index.json"
```
