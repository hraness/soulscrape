# Conor White-Sullivan person index

A `soulscrape.person-index.v1` packet for Conor White-Sullivan, co-founder and CEO of Roam Research, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — Roam's own site and white paper, his X account and unrolled tweet threads, long-form interviews (Forte Labs, Ness Labs, 20VC, Metamuse), an SEC crowdfunding filing, press coverage from TechCrunch through Every, and Wikipedia's article on the product.

No Wikidata item or Wikipedia biography exists for White-Sullivan himself as of this index, so `identity.wikidataId` and `identity.wikipedia` are omitted; `identity.officialSite` points to roamresearch.com and `identity.profiles` lists his real public profiles.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/conor-white-sullivan/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/conor-white-sullivan/person-index.json"
```
