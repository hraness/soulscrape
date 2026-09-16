# Steve Yegge person index

A `soulscrape.person-index.v1` packet for programmer and essayist Steve Yegge (Wikidata `Q7614378`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own site (yegge.ai) and blogs (Stevey's Blog Rants, Medium, his Google Sites archive), his Sourcegraph posts, the surviving Gist mirror of the 2011 Platforms Rant, video and podcast interviews, press coverage, and the Wikipedia/Wikidata references.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/steve-yegge/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/steve-yegge/person-index.json"
```
