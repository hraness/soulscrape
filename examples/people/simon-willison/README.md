# Simon Willison person index

A `soulscrape.person-index.v1` packet for programmer and open-source developer Simon Willison (Wikidata `Q7520062`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from fifty-one public sources — his own blog and project sites (the `subject_controlled` gold: he has posted at simonwillison.net since 2002), his GitHub repositories, interviews and podcasts, press coverage, and reference entries.

## Scope

Covers biography (Django's Lawrence Journal-World origin, Yahoo, the Guardian, Lanyrd, Eventbrite), projects (Datasette, sqlite-utils, shot-scraper, llm, Dogsheep, Datasette Cloud/Newsrooms), philosophy and practice (documentation-as-practice, learn-in-public TILs and weeknotes, adversarial LLM framing), and media (PyCon US 2024 keynote, DjangoCon US 2022, podcast interviews through August 2026).

## Notable source bindings

- `subject_controlled` / `first_person`: simonwillison.net posts, GitHub repos, LinkedIn, datasette.io, dogsheep.github.io — the bulk of the catalog, matching the subject's writing-first practice.
- `primary_record`: the Eventbrite–Lanyrd acquisition press release (2013).
- `interview`: The Register Q&A (2024), Changelog #534 (2023), Software Misadventures, Lenny's Podcast (2026), Talking Postgres E42 (2026), Heavybit High Leverage #9.
- `reporting`: The Guardian (hiring + datablog), Nieman Lab, TechCrunch, Ars Technica, LWN.
- `reference`: Wikidata Q7520062, English Wikipedia (Simon Willison, Lanyrd, AI slop).
- `archive`: a January 2013 Wayback Machine capture of the live lanyrd.com.
- The PyCon keynote transcript post is linked to its YouTube video via `transcriptOf`.

## Known gaps and hedges

- His English Wikipedia article was nominated for deletion in September 2026 — used as `reference` only, with the AfD noted.
- Birth date precision: Wikipedia gives January 1981; Wikidata's 1 January 1981 day-level value is unverified.
- "Prompt injection" attribution: his 12 September 2022 post proposed the name and Ars Technica credits him, but The Economist later framed the coinage as shared/independent — kept as an open question.
- Eventbrite exit timing rests on his LinkedIn (July 2019); no primary farewell post was located.
- The catalog samples his talks; dozens of earlier conference talks and most of the blog archive are not individually listed.
- "Most-read practitioner LLM blog" is a `speculation`-kind claim, not a measured fact.

## Regenerate and validate

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/simon-willison/person-index.json"
```
