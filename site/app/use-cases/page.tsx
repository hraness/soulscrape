import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { siteUrl } from "../../lib/site";

const description =
  "What a soulscrape dossier is for: grounding agents in a person's documented beliefs, research briefs, writing, authorized personas, collaboration guides, self-models, and a public index anyone can remix.";

export const metadata: Metadata = {
  title: "use cases — soulscrape",
  description,
  alternates: { canonical: siteUrl("/use-cases") },
  openGraph: { title: "soulscrape use cases", description, url: siteUrl("/use-cases") },
};

const uses = [
  {
    slug: "agent-grounding",
    title: "ground an agent in a person",
    body: "Drop a dossier into your agent's context and its answers align with how the person actually thinks and writes — their stated positions, their latest work, their known contradictions — instead of a generic guess. The dossier is compact by design: an executive model plus an operating manual, small enough to sit in context without crowding it.",
    ask: "Use $soulscrape to build a working model of <person> from their essays and talks, so my agent can answer questions the way they'd reason about them.",
    note: null,
  },
  {
    slug: "research",
    title: "research a person before you meet them",
    body: "Before the call, the interview, or the deal: a dated, cited brief on a founder, guest, or collaborator. What they've argued, what they've built, where their public positions shifted — with every claim wired to the source you'd check anyway.",
    ask: "Use $soulscrape to research <person>'s public writing and interviews for a briefing before Thursday's call.",
    note: null,
  },
  {
    slug: "writing",
    title: "write about someone",
    body: "For profiles, podcast prep, and essays: a belief map you can quote from. Stated beliefs stay separate from patterns the evidence suggests, so you never put a model's inference in someone's mouth.",
    ask: "Use $soulscrape to map <person>'s stated positions on <topic> with citations, for a profile I'm drafting.",
    note: "A dossier is a reading aid, not a source. The citation ledger exists so you can check the original before it goes in print.",
  },
  {
    slug: "personas",
    title: "bootstrap an agent persona",
    body: "An assistant that works the way its subject does — their judgment, their voice boundaries, their revision hooks — starts from a model of the person, not a vibes paragraph. The dossier is the authorized starting point; the subject signs off on what the proxy may and may not do.",
    ask: "Use $soulscrape to build a working model of me from <corpus>, to bootstrap an assistant that drafts in my register.",
    note: "Proxy behavior — voice imitation, a reusable assistant charter, anything that acts as the person — needs the subject's explicit authorization. Possessing someone's data is not authorization.",
  },
  {
    slug: "collaboration",
    title: "work with someone better",
    body: "A private, third-person collaboration guide: how they make decisions, how they disagree, what they optimize for, what to never infer. Built from evidence you legitimately possess — your own threads, docs, and history — and kept private.",
    ask: "Use $soulscrape to build a private collaboration guide for <colleague> from our shared docs and my notes.",
    note: "A collaboration guide reads the person as a colleague, not a specimen: no character or fitness evaluation, no consequential decisions.",
  },
  {
    slug: "self-model",
    title: "model yourself",
    body: "Point the skill at your own logs, notes, posts, and decisions and get a personal operating manual: what you keep returning to, where your stated positions and your behavior diverge, and the open questions you're actually circling.",
    ask: "Use $soulscrape to build a working model of me from my notes and posts — an operating manual, not a biography.",
    note: null,
  },
  {
    slug: "public-index",
    title: "publish a public index",
    body: "Release a dossier as a public index at soulscrape.com/<you>/<name> — dated, source-bounded, revisable, withdrawable. A cited record of a public figure, maintained like a page anyone can inspect, that says plainly what it is and what it isn't.",
    ask: null,
    note: "Public indexes carry public evidence only. The publisher reviews the complete packet before it uploads; Hraness stores the packet, not your source corpus.",
  },
  {
    slug: "remix",
    title: "remix the corpus",
    body: "Every index serves the same packet as HTML, Markdown, and JSON, and the whole corpus enumerates through /api/v1 — index.json, graph.json, themes, open questions. Cite a dossier, fork it into your own research, feed it to an agent, or build on the graph.",
    ask: "Fetch the soulscrape index for <person> and compare their stated position on <topic> across revisions.",
    note: null,
  },
] as const;

export default function UseCasesPage() {
  return (
    <StoryPage
      kicker="use cases"
      lede="one evidence-calibrated dossier, read by whoever needs it: an agent, a writer, a collaborator, a reader, or you."
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
