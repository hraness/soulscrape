# Mitchell Hashimoto person index

A `soulscrape.person-index.v1` packet for Mitchell Hashimoto (Wikidata `Q65554184`) — co-founder of HashiCorp, creator of Vagrant and the Ghostty terminal emulator, and now co-founder of Superlogical — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources: his own site and essays, his HashiCorp farewell letter, the O'Reilly Vagrant book, SEC and IBM filings and announcements, Changelog and Software Engineering Daily interviews, Wikidata, and press coverage from SD Times and LWN.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/mitchell-hashimoto/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/mitchell-hashimoto/person-index.json"
```
