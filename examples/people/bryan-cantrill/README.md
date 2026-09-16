# Bryan Cantrill person index

A `soulscrape.person-index.v1` packet for software engineer Bryan Cantrill (Wikidata `Q4980008`) — co-inventor of DTrace, former Sun Microsystems Distinguished Engineer, Joyent CTO, co-founder and CTO of Oxide Computer Company, and host of the On the Metal podcast — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own blog and Oxide's company pages, his USENIX and ACM Queue publications, recorded talks, an ACM ByteCast interview, press coverage, Wikidata, and Wikipedia.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/bryan-cantrill/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/bryan-cantrill/person-index.json"
```
