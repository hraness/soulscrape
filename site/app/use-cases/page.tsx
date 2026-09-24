import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { USE_CASES_DESCRIPTION } from "../../lib/page-copy";

export const metadata: Metadata = pageMetadata({ title: pageTitle("Use cases"), description: USE_CASES_DESCRIPTION, path: "/use-cases" });

const uses = [
  {
    slug: "agent-grounding",
    title: "ground an agent in a person",
    body: "Give your agent a dossier and its answers can follow the person's stated positions, latest work, and known contradictions. Its executive model is written to stand alone, so you can keep that section in your agent's context and add the rest when a question needs it.",
    ask: "Use $soulscrape to build a working model of <person> from their essays and talks, so my agent can answer questions the way they'd reason about them.",
    note: null,
  },
  {
    slug: "research",
    title: "research a person before you meet them",
    body: "Before a call, an interview, or a deal, get a dated, cited brief on a founder, guest, or collaborator: what they've argued, what they've built, and where their public positions shifted, with claims tied to the sources you'd check anyway.",
    ask: "Use $soulscrape to research <person>'s public writing and interviews for a briefing before Thursday's call.",
    note: null,
  },
  {
    slug: "writing",
    title: "write about someone",
    body: "For profiles, podcast prep, and essays, a dossier gives you a map of someone's stated beliefs with sources. Stated beliefs stay separate from patterns the evidence suggests, so you can tell what the person said from what the model inferred.",
    ask: "Use $soulscrape to map <person>'s stated positions on <topic> with citations, for a profile I'm drafting.",
    note: "A dossier is a reading aid, not a source. Each claim links to its source so you can check the original before it goes to print.",
  },
  {
    slug: "personas",
    title: "bootstrap an agent persona",
    body: "An assistant meant to work like its subject can start from a cited model of the person: their judgment, the limits on imitating their voice, and what would change the model. The subject signs off on what the assistant may and may not do.",
    ask: "Use $soulscrape to build a working model of me from <corpus>, to bootstrap an assistant that drafts in my register.",
    note: "Drafts in the person's voice and a reusable assistant charter need their explicit authorization, and even then the assistant never speaks, signs in, or makes commitments as them. Having someone's data does not mean they authorized this.",
  },
  {
    slug: "collaboration",
    title: "work with someone better",
    body: "A private, third-person guide to how a colleague makes decisions, disagrees, and sets priorities, and what not to infer about them. It is built from evidence you legitimately have, such as your own threads, docs, and shared history, and it stays private.",
    ask: "Use $soulscrape to build a private collaboration guide for <colleague> from our shared docs and my notes.",
    note: "A collaboration guide describes how to work with someone. It makes no judgment of their character or fitness and supports no consequential decision about them.",
  },
  {
    slug: "self-model",
    title: "model yourself",
    body: "Point the skill at your own logs, notes, posts, and decisions and get a personal operating manual: what you keep returning to, where your stated positions and your behavior diverge, and the open questions you keep circling.",
    ask: "Use $soulscrape to build a working model of me from my notes and posts, written as an operating manual.",
    note: null,
  },
  {
    slug: "public-index",
    title: "publish a public index",
    body: "Publish a dossier as a public index at soulscrape.com/<you>/<name>. It is dated, lists its sources, and can be revised or withdrawn, and anyone can check each claim against its source.",
    ask: null,
    note: "Public indexes carry public evidence only. The publisher reviews the complete packet before uploading it; Hraness stores the packet, not your private sources.",
  },
  {
    slug: "remix",
    title: "remix the corpus",
    body: "Every index is a web page, a JSON packet with every claim and source, and a Markdown copy of its essay, and the whole corpus is listed through /api/v1 a page at a time: index.json, graph.json, themes, and open questions. Cite a dossier, fork it into your own research, feed it to an agent, or build on the graph.",
    ask: "Fetch the soulscrape index for <person> and list their stated positions on <topic>, with sources.",
    note: null,
  },
] as const;

export default function UseCasesPage() {
  return (
    <StoryPage
      kicker="use cases"
      lede="one dossier can serve an agent, a writer, a collaborator, a reader, or you."
      path="/use-cases"
      title="what a dossier is for."
    >
      {uses.map(use => (
        <section className="story-section" id={use.slug} key={use.slug}>
          <h2>{use.title}.</h2>
          <p className="story-summary">{use.body}</p>
          {use.ask !== null && (
            <pre className="transcript" tabIndex={0}><code>{use.ask}</code></pre>
          )}
          {use.note !== null && <p className="doc-note">{use.note}</p>}
        </section>
      ))}
      <section className="story-section">
        <h2>start anywhere.</h2>
        <p>
          <a href="/docs/quickstart">Build your first working model</a>, browse the{" "}
          <a href="/examples">published examples</a>, or see{" "}
          <a href="/compare">how soulscrape compares</a> to the tools people reach for instead.
        </p>
      </section>
    </StoryPage>
  );
}
