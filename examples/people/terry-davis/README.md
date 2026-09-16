# Terry A. Davis person index

A `soulscrape.person-index.v1` packet for programmer Terry A. Davis (Wikidata `Q22708720`), creator of TempleOS and HolyC, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from eighteen public sources — his own site and video corpus as preserved by the Internet Archive, Wikidata, Wikipedia, interviews, the VICE Motherboard profile "God's Lonely Programmer," local reporting from The Dalles Chronicle, and the Down the Rabbit Hole and BBC Radio 4 documentaries.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/terry-davis/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/terry-davis/person-index.json"
```
