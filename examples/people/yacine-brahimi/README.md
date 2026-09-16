# Yacine Brahimi person index

A `soulscrape.person-index.v1` packet for Yacine Brahimi — better known as **kache** (@yacineMTB on X) — the Ottawa engineer behind dingboard, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own sites and repos, his posts on X and LinkedIn, his Substack, an AI Tinkerers talk, the Emergent Behavior and TBPN interviews, and third-party profile mirrors.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/yacine-brahimi/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/yacine-brahimi/person-index.json"
```
