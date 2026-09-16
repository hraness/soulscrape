# David Crawshaw person index

A `soulscrape.person-index.v1` packet for programmer and founder David Crawshaw — former Go engineer at Google (the Android/iOS ports and the plugin build mode), co-founder and CTO of Tailscale, now CEO and co-founder of exe.dev — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own essays on crawshaw.io and the exe.dev blog, the Go repository and release records, his GopherCon talk, podcast and print interviews, and funding coverage. No Wikipedia article or Wikidata item exists for him, so identity is anchored by his site and public profiles.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/david-crawshaw/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/david-crawshaw/person-index.json"
```
