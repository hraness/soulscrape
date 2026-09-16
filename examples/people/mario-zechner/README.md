# Mario Zechner person index

A `soulscrape.person-index.v1` packet for Austrian developer Mario Zechner ("badlogic") — creator of libGDX, co-builder of RoboVM through its Xamarin acquisition and Microsoft shutdown, author of Apress's *Beginning Android Games*, builder of civic tools such as heisse-preise and Cards for Ukraine, and creator of the minimal coding agent pi, which he took to Earendil in 2026. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from twenty public sources — his own sites and blog posts, the pi repository, Wikipedia's libGDX article, the Apress catalog, Wired/Register/heise/Know Center reporting, an AI Engineer speaker profile, and three podcast/talk appearances. No Wikidata item or standalone biography exists for him; the packet says so in `openQuestions`.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/mario-zechner/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/mario-zechner/person-index.json"
```
