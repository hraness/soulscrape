# Dax Raad person index

A `soulscrape.person-index.v1` packet for developer-tools founder Dax Raad — co-creator of opencode and core member of the SST/Anomaly team — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own site and projects (thdxr.com, sst.dev, opencode.ai, tomorrow.fm), his GitHub, X, and Twitch presences, the Y Combinator company record, interviews (The Pragmatic Engineer, Baseten, 36Kr), and press coverage of the seed round, terminal.shop, and opencode's rise.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/dax-raad/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/dax-raad/person-index.json"
```
