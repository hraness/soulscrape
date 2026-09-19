# Verified personal links

Use this protocol when public research calls for the subject's personal website or social profiles. Read [web-research.md](web-research.md) first and stay within the user's research scope. Collect the few public destinations that help a reader find the person's own work and words.

## Find and bind the account

Start with URLs the user supplied and the subject's already-bound official site. Follow its social, author, portfolio, and newsletter links. A public profile may lead back to a personal site or to another account. Search only for the missing destinations that matter to the request; include known professional context in a name search.

Bind each destination through an explicit link from an already-bound source, explicit user confirmation of the account, or two independent nonvisual identity anchors supported by bound sources. Matching names, reused bios, a verification badge, similar avatars, or an available handle alone do not establish ownership. Record the URL and the evidence for the binding in the citation ledger.

- Read the destination and check that its name, role, work, and time period fit the established subject. A redirect to an unrelated account or a contradictory biography breaks the match.
- Prefer the personal site and public accounts the person deliberately links. Include a work or creator account when it is clearly theirs; distinguish a company, fan page, namesake, or institutional biography from a personal account.
- Do not guess handles, discover a private account, or connect an unlinked pseudonym to a real identity. Omit email addresses, phone numbers, home addresses, and contact forms from the personal-links list.
- Search snippets and link aggregators are discovery leads. Open the actual page before labeling a destination verified. If it is inaccessible, keep the lead unresolved and use another accessible source; do not imply that the page was checked.

An explicit link can establish ownership without proving that an account remains active. Record the date checked and report a known inactive or historical account as such. If two credible sources conflict, omit the disputed link and preserve the uncertainty.

## Keep the canonical destination

Use the profile's final public HTTPS URL, not a search result, share dialog, login redirect, post, tracking wrapper, or CDN avatar URL. Remove tracking parameters and redundant fragments; retain path case and any parameter required to identify the page. Accept a canonical URL only after checking that it still names the same subject. Never construct a platform URL from the display name.

Deduplicate variants that resolve to the same destination. Prefer one link per account and a small set of useful platforms over a census of every account found. A normal profile needs the personal site and a handful of strong public links, not the contract's maximum capacity.

## Record and present

In a private Markdown model, add a short “Public links” list with clear labels such as “Personal website,” “LinkedIn,” or “GitHub.” Keep verification notes in the citation ledger.

For a public person-index packet:

- Put the verified personal homepage in `subject.identity.officialSite` and verified personal social, publishing, and portfolio destinations in `subject.identity.profiles` (at most 16 URLs).
- Use `subject.identity.wikipedia` for an identity-bound Wikipedia article. Reference and institutional pages belong in `sources`, not the personal-social list.
- Include the destination and the public evidence that establishes ownership in `sources`; derive their IDs with `stablePersonSourceId`. Do not add invented link metadata to the strict packet contract. The ledger records which source supports each identity link.
- Leave a missing field absent. Do not replace missing evidence with a guessed URL or present an unresolved account as verified.

The same bound account URLs are the starting point for [headshot selection](headshots.md).
