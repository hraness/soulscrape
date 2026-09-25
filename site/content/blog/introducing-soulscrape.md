
You are about to interview an architect whose work you admire, and you want to know what he has argued in public, where he said it, and which parts of his biography only he has reported. Or you are rewriting your own bio and want to see what the public record says about you before someone else summarizes it. Either way you need a summary where every statement points to a page you can open.

soulscrape is a free, MIT-licensed agent skill that writes that summary. You give your agent sources you are allowed to use, say what the result is for, and it writes a dated working model of how the person decides, writes, argues, and changes their mind, with each claim tied to its sources. The project was called Ensoul until September 2026.

## One architect, 31 claims, 17 sources

The public index of Eugene Tssui, an architect known for buildings modeled on living organisms, shows what the result looks like. It was assembled on 2026-09-16 from public sources and published at [soulscrape.com/ben/eugene-tssui](/ben/eugene-tssui). Like every example on the site, it was assembled independently; inclusion does not imply his participation or endorsement. The packet behind the page holds 17 sources and 31 claims. A claim looks like this, shortened:

```json
{
  "kind": "fact",
  "text": "From 1976 until Bruce Goff's death in 1982, Tssui apprenticed under Goff.",
  "sourceIds": ["source-79d1…", "source-ca31…", "source-7973…"]
}
```

Each source records its URL, publisher, and access date, and says how it is tied to the person. His own biography page, for example, is marked as a page the subject controls, with a note that its claims are self-reported.

The index also lists what it declines to settle: four open questions, including that the count of his built designs depends on who is counting, and that his athletic titles are consistently reported but trace back to his own biography and profiles of him rather than independent records.

## Start with yourself or with public work

Before it reads anything, the skill records what the result is for. A private model is one of three kinds.

- **A model of yourself.** Your own notes, logs, writing, and decisions become a personal operating manual. This is the only kind that may include instructions for an assistant working on your behalf without anyone else's sign-off, within limits you set.
- **A private guide to working with someone.** From evidence you legitimately have, such as a shared project channel, soulscrape writes a third-person guide to how a collaborator prefers to receive proposals, disagree, and decide. It is for your own preparation. It does not imitate their voice, judge their character or fitness, or predict sensitive behavior.
- **An authorized proxy.** Writing in someone's voice, or preparing an assistant that works like them, needs that person's explicit authorization for that use. Your say-so is not enough.

A public index, like the Eugene Tssui page, is a separate artifact with stricter defaults. It uses public sources only, cites every claim, and leaves out contact details, family particulars, and private facts about other people even when a public source prints them. The subject has not agreed to be indexed, so the index reports what public evidence shows and never speaks for them.

It is the wrong tool for anything else. soulscrape does not run background checks or support hiring, credit, housing, or other consequential decisions about someone, even when that person has authorized a model. Its public research does not collect contact details, addresses, or relatives, and it does not log in, get past paywalls, or go looking for private accounts. Having someone's messages, or finding public information about them, does not count as their permission, and the skill stops to ask when a request assumes it does.

## What happens in a run today

The skill runs inside your own agent, such as Claude Code, Codex, or Cursor, with your model and tools. It needs no soulscrape account. Install it by following the [docs](/docs), start a new session, and ask in plain words:

```text
Use $soulscrape to build a dated working model of <person> from
<authorized sources>. It's for <intended use>, read by <audience>.
Use sources up to <cutoff>. Proxy authorization: <none, or who
approved what>.
```

Before it opens any source, the agent writes down the task: who the subject is and how to recognize them, the intended use, who will read the result, which evidence is in scope, and what is missing. If something material is unclear, such as two people sharing a name or a request that turns out to be evaluative, it asks once, in one message, and offers a default for each question.

Public web research is off unless you turn it on, name a URL, or a dated public fact needs checking. When it runs, it follows your instructions on which sources, what time window, and how deep. Each finding keeps its URL, the access date, and the short passage that supports it. A name alone is never treated as an identity: a page counts as the person's only when something ties it to them, such as a link from a page already tied to them, or two independent anchors, like a profile you supplied plus a matching role and employer. Identity is never inferred from a face or a resemblance.

The written model keeps facts, stated beliefs, revealed patterns, and speculation separate. It keeps contradictions and alternative readings. It includes a section on what not to infer, and it says plainly that the real person's current words and corrections outrank the document.

Publishing is optional. If you want a public index, the skill assembles a packet with an essay, cited claims, a timeline, themes, works, appearances, relations, and open questions. You review every claim and source, then publish it with a free Hraness account at `soulscrape.com/<username>/<handle>`. Each index is a web page, a JSON packet, and a Markdown copy of its essay that anyone can read, cite, or give to an agent. You can revise it, and withdrawing it takes the page and its full JSON and Markdown off public reads, though copies other people saved can outlive a withdrawal. The hosted service receives only the reviewed public packet and the account and device details needed to publish it; it does not run research or receive your private sources.

## Where it is headed

The intent is a set of public records about people that are dated, cited, and revisable, where a correction is easy to make and easy to see, and where other tools can read the same evidence without copying it by hand. The first step is in the current release: an exporter turns a published index's cited claims and sources into a research exchange file that another research tool reads as evidence to weigh, and each claim keeps its sources. Broader shared identity work is in progress, with no date promised.

## Limits and status

A soulscrape model describes patterns in the evidence that was supplied. It is not a complete picture of a person, a diagnosis, or proof of consent. The repository's automated checks test the software and packet formats against their specifications; they do not show that any model is true. Only a reader who opens the sources and weighs the contradictions can judge that.

The skill is free and needs no account. Publishing needs a free Hraness account. Your agent, model, and any research service you choose may charge separately.

Status: {{release.status}}.
