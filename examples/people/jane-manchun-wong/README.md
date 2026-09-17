# Jane Manchun Wong person index

A `soulscrape.person-index.v1` packet for app researcher and security engineer Jane Manchun Wong (Wikidata `Q63385151`, @wongmjane), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from forty public sources — her own site, blog write-ups, and posts; her X and Threads profiles; interviews (Uses This, Embedded, SCMP's podcast, Indie Hackers, Ming Pao); primary records (the Forbes 30 Under 30 profile, the 2024 Webby entry for Threads Web, a USPTO design patent citing her work); reporting across BBC, CNN, CNBC, SCMP, The Next Web, Business Insider, MIT Technology Review, The Verge, The Guardian, TechCrunch, AP, Adweek, and the San Francisco Standard; Wikipedia and Wikidata for reference; and a 2019 Internet Archive capture of her site.

Scope: biography, work, method, beliefs, media, and career — the scoop era (2017–2021), the Meta/Threads chapter (June 2023–October 2024), and the post-Meta return (Figma, Waymo, the SF openings radar) as of the research cutoff.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/jane-manchun-wong/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/jane-manchun-wong/person-index.json"
```

## Known gaps

- Birth-year conflict is preserved rather than resolved: Wikipedia gives April 13, 1994, while contemporaneous profiles imply 1995–96.
- Her post-Meta employer (a Los Angeles startup announced late 2024) is unnamed; the announcement post is unavailable at access time, and her current role is unconfirmed.
- Non-English profiles (Ming Pao, Les Echos, Frankfurter Allgemeine) are catalogued via her own press page but not fully translated; their distinct claims are under-read.
- Individual feature attribution inside Meta is not public; the Threads Web work is credited to the team, with the Webby win listed among her honors on her own page.
