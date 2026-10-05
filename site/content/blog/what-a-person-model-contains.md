A "model of a person" sounds like a personality sketch. A Soulscrape dossier is something more auditable: a dated packet of bound sources, kind-tagged claims, named disagreements, and open questions, every piece of which you can trace to its evidence. Here is what is actually inside, using the published [Eugene Tssui dossier](/ben/eugene-tssui) as the example.

## Sources come first, each bound

Every packet opens with its source catalog, and each source carries a `binding` that says what kind of evidence it is: `subject_controlled` (the person's own site or pages), `first_person` (their own posts), `interview`, `primary_record`, `reporting`, `reference`, or `archive`. The Tssui packet has 17 sources across four of those kinds.

Source ids are not hand-written. Each is derived from the canonical link and its publication date: the host is lowercased, tracking parameters and fragments are stripped, and short video links are normalized to the watch URL. Reposts and link variants dedupe to the same id, so a claim cannot quietly cite the same page twice under different spellings.

## Claims carry a kind

The claims are atomic statements a reader can check in one source visit, tagged by how confident the evidence lets them be:

- `fact`: dates, roles, works. 19 in the Tssui packet.
- `stated_belief`: what the subject says they think. 8.
- `pattern`: what repeated evidence shows. 3.
- `speculation`: plausible but thin. 1.

A real claim, trimmed for display (its `sourceIds` list is shortened with `…`):

```json
{
  "id": "claim-born-1954",
  "kind": "fact",
  "text": "Eugene Tssui was born on September 14, 1954, in Cleveland, Ohio, and was raised in Minneapolis.",
  "sourceIds": ["source-79d1ff…", "source-a8dcb8…", "source-ca3141…"]
}
```

Every `sourceIds` entry must resolve to a cataloged source, and the validator rejects the packet on any dangling id. The kind does the honesty work a prose summary skips: "Tssui calls his approach evolutionary architecture" is a `stated_belief`, not a `fact`, and readers see the difference without having to ask.

## The model keeps its disagreements

When sources contradict each other, the packet preserves the contradiction instead of silently picking a winner. One open question in the packet reads, verbatim: "Exactly how many designs are built depends on the count: KQED says six as of 2025; his own catalog lists more completed residences." Up to 40 open questions can be carried. They are the honest edge of the model: not what it knows, but what it knows it does not know.

## Structure around the claims

Around sources and claims the packet builds the dossier's working shape:

- **timeline**: dated events with kinds like `birth`, `apprenticeship`, `role`, `award`. 10 entries, each citing its sources.
- **themes**: recurring philosophy and practice, marked `stated` (the subject's words), `reported` (press framing), or `inferred` (the dossier's own synthesis, used sparingly). 8 in the packet.
- **works**: projects and buildings with honest status (`completed`, `unbuilt`, `abandoned`). 16.
- **appearances**: interviews and talks, with optional `participantHandles` that bind a participant's name to a normalized handle only when the binding is confident; bound participants emit co-presence edges in the public graph. 7.
- **relations**: evidence-backed edges read as "subject [kind] target", so `mentored_by` means Tssui studied under Bruce Goff from 1976 to 1982, with an optional Wikidata id so the edge joins regardless of slug spelling. 2.

The subject record binds the person to a stable identity (Wikidata `Q5407800`, official site, Wikipedia link), and the scope records `asOf` (when the model was generated) plus `coverage` (which areas it claims to cover). A dossier says when it was made and what it looked at, so a stale model announces itself.

## What a public model never contains

The public-index contract is explicit: no contact details, no private family details, no private facts about other people. The packet format itself is integer-only I-JSON, so every boundary (the CLI, the publishing API, the database) parses the same shape and refuses anything else. A published dossier reports what public evidence shows; it never speaks for the subject, and it does not imply their authorization.

A private dossier uses the same packet shape for a different audience: sources you already hold, claims that stay on your machine, and no publication unless you choose it. The model is the same; the contract around it is different.

## Go deeper

- [Read the full Eugene Tssui dossier](/ben/eugene-tssui)
- [Install the skill and write your first dossier](/docs)
- [Browse every published example](/examples)
- [See example requests for each use](/use-cases)
