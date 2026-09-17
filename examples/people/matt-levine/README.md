# Matt Levine person index

A `soulscrape.person-index.v1` packet for Matt Levine (Wikidata `Q76361123`), the Bloomberg Opinion columnist behind the daily *Money Stuff* newsletter, built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 43 public sources — his own site, his Bloomberg columns and newsletter archive, his Dealbreaker author page, employer press records, interviews (Conversations with Tyler, Odd Lots, Stay Tuned with Preet, Recode Media, On with Kara Swisher, Masters in Business, Defector, November), and profiles/reporting in the New York Times, Harvard Magazine, ProPublica, Axios, and others.

## Scope and sources

Coverage is `biography`, `work`, `beliefs`, `philosophy`, `media`, and `projects`. The packet is anchored on sources that can be checked in one visit: Bloomberg employer records (the 2013 hiring announcement, the Businessweek crypto-issue press release, Loeb finalist listing), first-person columns that carry the signature lenses ("Everything Everywhere Is Securities Fraud," the Elon Markets Hypothesis column, "The Crypto Story," "FTX's Balance Sheet Was Bad"), and interview transcripts with attributable self-description.

Note: some commonly repeated biographical claims about Levine are wrong — he is a Harvard College classics graduate (2000) and Yale Law J.D. (2004), a former high-school Latin teacher, Third Circuit clerk, Wachtell M&A associate, and Goldman equity-derivatives banker. He has no book; "The Business Secrets of Drug Dealing" is a Matt Taibbi book, and there is no New Yorker profile or Ezra Klein Show episode of him in the record — the known profiles are the NYT (2020), Harvard Magazine (2025), and the long interviews catalogued here.

## Known gaps

- Birth year (1978) only; no public birth date.
- Money Stuff subscriber counts are dated press snapshots (~150k in 2020, 300k+ in 2024, ~500k in 2025), not audited figures.
- The newsletter's start is "around February 2015" per Harvard Magazine; the 2014 columns ran as "Levine on Wall Street."
- The Paulson/Michael Bloomberg anecdote is secondhand reporting.
- The Dealbreaker author archive may be incomplete.
- Family and personal details appearing in profiles are deliberately out of scope.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/matt-levine/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/matt-levine/person-index.json"
```
