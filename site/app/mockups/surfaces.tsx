/**
 * Code-built illustrations of Soulscrape's real surfaces: the agent session
 * where the skill scopes and researches, the published dossier page, one
 * claim with its sources, the three published formats, and the install
 * command. Every name, count, claim, and source comes from the published
 * Eugene Tssui example (./eugene-tssui.ts, pinned to the packet by
 * tests/launch.test.ts). No hooks: the launch film renders these too.
 */
import {
  AgentSession,
  BrowserFrame,
  MockupRoot,
  SampleText,
  TerminalFrame,
  type AgentTurn,
} from "@hraness/design-kit/mockups";

import publishedRelease from "../../published-release.json";
import {
  BINDING_LABEL,
  CLAIM_KIND_LABEL,
  EXAMPLE_PAGE_URL,
  eugeneTssui,
  fixtureClaim,
  fixtureSource,
  type ClaimKind,
} from "./eugene-tssui";

const { counts } = eugeneTssui;
const AS_OF = eugeneTssui.asOf.slice(0, 10);

/* ------------------------------------------------------------------ */
/* Agent session                                                       */
/* ------------------------------------------------------------------ */

export const SESSION_STEPS = ["purpose", "research", "done"] as const;
export type SessionStep = (typeof SESSION_STEPS)[number];

const ASK =
  "Use $soulscrape to build a public index of Eugene Tssui, the architect, from public sources. It's for readers of soulscrape.com. Sources up to 2026-09-16.";

function sessionTurns(step: SessionStep): readonly AgentTurn[] {
  const purpose: AgentTurn[] = [
    { role: "user", text: ASK, beat: "ask" },
    {
      role: "tool",
      tool: "Scope",
      status: "ok",
      beat: "scope",
      text: "Subject: Eugene Tssui (also Eugene Tsui), architect · Use: public index · Audience: public readers · Sources: public only, cited · Cutoff: 2026-09-16 · Private details, contact info, family: left out",
    },
    {
      role: "agent",
      beat: "question",
      text: "One question before I read anything: his own site and his foundation's site will say a lot. Should self-reported claims count, if I mark them as his own account?",
    },
  ];
  if (step === "purpose") return purpose;
  const research: AgentTurn[] = [
    ...purpose,
    { role: "user", text: "Yes, mark them.", beat: "answer" },
    {
      role: "tool",
      tool: "Read sources",
      status: step === "research" ? "running" : "ok",
      beat: "read",
      text: `${counts.sources} sources: KQED, Financial Times, PIN–UP, East Bay Express, UC Berkeley, Wikidata, Wikipedia, and ${counts.subjectControlledSources} pages he or his foundation control`,
    },
  ];
  if (step === "research") return research;
  return [
    ...research,
    {
      role: "tool",
      tool: "Validate index",
      status: "ok",
      beat: "validate",
      text: `${counts.claims} claims, each with a source · ${counts.timeline} timeline events · ${counts.themes} themes · ${counts.openQuestions} open questions`,
    },
    {
      role: "agent",
      beat: "review",
      text: "The index is ready for your review. Nothing is published until you say so.",
    },
  ];
}

export function SessionMockup({ step = "done", height = 460 }: Readonly<{ step?: SessionStep; height?: number | "auto" }>) {
  const describe =
    step === "purpose"
      ? "Illustration: a coding agent records who the dossier is about, what it is for, and which sources it may use, then asks one question."
      : step === "research"
        ? "Illustration: the agent reads the public sources it was allowed to use."
        : "Illustration: the agent checks every claim has a source and waits for review before anything is published.";
  return (
    <div className="ssm-frame" data-ssm-step={step}>
      <AgentSession agent="generic-cli" describe={describe} fade={false} {...(height === "auto" ? {} : { height })} title="Coding agent · soulscrape skill" turns={sessionTurns(step)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dossier page                                                        */
/* ------------------------------------------------------------------ */

export const DOSSIER_TABS = ["essay", "claims", "timeline", "questions"] as const;
export type DossierTab = (typeof DOSSIER_TABS)[number];

export const DOSSIER_TAB_LABEL: Readonly<Record<DossierTab, string>> = {
  essay: "Essay",
  claims: "Claims",
  timeline: "Timeline",
  questions: "Open questions",
};

function KindChip({ kind }: Readonly<{ kind: ClaimKind }>) {
  return (
    <span className="ssm-kind" data-ssm-kind={kind}>
      {CLAIM_KIND_LABEL[kind]}
    </span>
  );
}

function DossierBody({ tab }: Readonly<{ tab: DossierTab }>) {
  switch (tab) {
    case "essay":
      return (
        <div className="ssm-essay">
          <p><SampleText>{eugeneTssui.essayOpening}</SampleText></p>
          <p className="ssm-muted">
            <SampleText>Themes: {eugeneTssui.themes.slice(0, 3).map((theme) => theme.title).join(" · ")}</SampleText>
          </p>
        </div>
      );
    case "claims":
      return (
        <ul className="ssm-claim-list">
          {eugeneTssui.claims.map((claim) => (
            <li key={claim.id}>
              <KindChip kind={claim.kind} />
              <span className="ssm-claim-text"><SampleText>{claim.text}</SampleText></span>
              <span className="ssm-count">{claim.sourceIds.length} sources</span>
            </li>
          ))}
        </ul>
      );
    case "timeline":
      return (
        <ol className="ssm-timeline">
          {eugeneTssui.timeline.map((event) => (
            <li key={event.date}>
              <span className="ssm-date">{event.date.slice(0, 4)}</span>
              <SampleText>{event.title}</SampleText>
            </li>
          ))}
        </ol>
      );
    case "questions":
      return (
        <ul className="ssm-questions">
          {eugeneTssui.openQuestions.map((question) => (
            <li key={question}><SampleText>{question}</SampleText></li>
          ))}
        </ul>
      );
  }
}

export function DossierMockup({ tab = "essay", height = 440 }: Readonly<{ tab?: DossierTab; height?: number }>) {
  return (
    <div className="ssm-frame" data-ssm-tab={tab}>
      <BrowserFrame
        describe={`Illustration of the published Eugene Tssui dossier, ${DOSSIER_TAB_LABEL[tab].toLowerCase()} tab.`}
        height={height}
        url={EXAMPLE_PAGE_URL}
      >
        <div className="ssm-page">
          <header className="ssm-head">
            <p className="ssm-eyebrow">Dossier · as of {AS_OF} · by @ben</p>
            <h3 className="ssm-name">{eugeneTssui.displayName}</h3>
            <p className="ssm-summary"><SampleText>{eugeneTssui.summary}</SampleText></p>
            <p className="ssm-stats">
              <span>{counts.sources} sources</span>
              <span>{counts.claims} claims</span>
              <span>{counts.openQuestions} open questions</span>
            </p>
          </header>
          <nav aria-hidden="true" className="ssm-tabs ssm-sections">
            {DOSSIER_TABS.map((entry) => (
              <span data-ssm-on={entry === tab ? "" : undefined} key={entry}>{DOSSIER_TAB_LABEL[entry]}</span>
            ))}
          </nav>
          <DossierBody tab={tab} />
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One claim and its sources                                           */
/* ------------------------------------------------------------------ */

export const CLAIM_KINDS: readonly ClaimKind[] = ["fact", "stated_belief", "pattern", "speculation"];

export function ClaimMockup({ kind = "fact", open = true }: Readonly<{ kind?: ClaimKind; open?: boolean }>) {
  const claim = fixtureClaim(kind);
  const sources = claim.sourceIds.map(fixtureSource);
  return (
    <div className="ssm-frame">
      <MockupRoot
        describe={`Illustration: one ${CLAIM_KIND_LABEL[kind].toLowerCase()} claim from the Eugene Tssui dossier${open ? ", opened to show its sources" : ""}.`}
        kind="ss-claim"
      >
        <div className="ssm-claim" data-ssm-open={open ? "" : undefined}>
          <div className="ssm-kinds" aria-hidden="true">
            {CLAIM_KINDS.map((entry) => (
              <span className="ssm-kind" data-ssm-kind={entry} data-ssm-on={entry === kind ? "" : undefined} key={entry}>
                {CLAIM_KIND_LABEL[entry]}
              </span>
            ))}
          </div>
          <p className="ssm-claim-body"><SampleText>{claim.text}</SampleText></p>
          <p className="ssm-claim-toggle">
            <span>{open ? "Hide" : "Show"} {sources.length} sources</span>
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </p>
          {open ? (
            <ul className="ssm-sources">
              {sources.map((source) => (
                <li data-ssm-binding={source.binding} key={source.id}>
                  <span className="ssm-binding">{BINDING_LABEL[source.binding]}</span>
                  <span className="ssm-source-title"><SampleText>{source.title}</SampleText></span>
                  <span className="ssm-source-meta">
                    {source.publisher} · read {source.accessedAt.slice(0, 10)}
                    {source.notes === undefined ? null : <> · <SampleText>{source.notes}</SampleText></>}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </MockupRoot>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Formats                                                             */
/* ------------------------------------------------------------------ */

export const FORMATS = ["web", "json", "markdown"] as const;
export type Format = (typeof FORMATS)[number];

export const FORMAT_LABEL: Readonly<Record<Format, string>> = { web: "Web page", json: "JSON", markdown: "Markdown" };

function jsonExcerpt(): string {
  const claim = fixtureClaim("fact");
  const source = fixtureSource(claim.sourceIds[1]!);
  return JSON.stringify(
    {
      subject: { handle: eugeneTssui.handle, displayName: eugeneTssui.displayName },
      scope: { asOf: eugeneTssui.asOf },
      claims: [{ id: claim.id, kind: claim.kind, sourceIds: claim.sourceIds.map((id) => `${id.slice(0, 11)}…`) }],
      sources: [{ id: `${source.id.slice(0, 11)}…`, binding: source.binding, publisher: source.publisher }],
    },
    null,
    2,
  );
}

function markdownExcerpt(): string {
  return [`# ${eugeneTssui.displayName}`, "", `As of ${AS_OF}.`, "", eugeneTssui.essayOpening, "", "## Identity and formation", "…"].join("\n");
}

export function FormatMockup({ format = "web", height = 380 }: Readonly<{ format?: Format; height?: number }>) {
  const path = format === "web" ? EXAMPLE_PAGE_URL : format === "json" ? "soulscrape.example/api/v1/profiles/ben/eugene-tssui" : `${EXAMPLE_PAGE_URL}.md`;
  return (
    <div className="ssm-frame" data-ssm-format={format}>
      <BrowserFrame
        describe={`Illustration: the published Eugene Tssui dossier as ${FORMAT_LABEL[format] === "Web page" ? "a web page" : FORMAT_LABEL[format]}.`}
        height={height}
        url={path}
      >
        <div className="ssm-page">
          <nav aria-hidden="true" className="ssm-tabs ssm-format-tabs">
            {FORMATS.map((entry) => (
              <span data-ssm-on={entry === format ? "" : undefined} key={entry}>{FORMAT_LABEL[entry]}</span>
            ))}
          </nav>
          {format === "web" ? (
            <div className="ssm-web">
              <h3 className="ssm-name">{eugeneTssui.displayName}</h3>
              <p className="ssm-summary"><SampleText>{eugeneTssui.summary}</SampleText></p>
              <p className="ssm-stats">
                <span>{counts.sources} sources</span>
                <span>{counts.claims} claims</span>
                <span>Markdown essay</span>
                <span>Request a correction or removal</span>
              </p>
            </div>
          ) : (
            <pre className="ssm-code"><SampleText>{format === "json" ? jsonExcerpt() : markdownExcerpt()}</SampleText></pre>
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Install                                                             */
/* ------------------------------------------------------------------ */

export function InstallMockup() {
  return (
    <div className="ssm-frame">
      <TerminalFrame
        density="presentation"
        describe="Illustration: installing the Soulscrape skill with one command in a terminal."
        lines={[
          { kind: "input", text: publishedRelease.skillInstall },
          { kind: "output", text: `Installed skill soulscrape (v${publishedRelease.version})`, tone: "ok" },
          { kind: "comment", text: "Start a new agent session and name a person and the sources you may use." },
        ]}
        title="Terminal"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Uses                                                                */
/* ------------------------------------------------------------------ */

/** What the skill accepts, what needs the person's permission, and what it declines: SKILL.md and README.md. */
export const USE_GROUPS = [
  {
    id: "yes",
    label: "Good uses",
    items: ["Prepare for an interview or a first meeting", "Write about someone, with sources", "A private guide to working with a colleague", "See what the public record says about you"],
  },
  {
    id: "ask",
    label: "Needs their permission",
    items: ["Writing in their voice", "An assistant that works like them"],
  },
  {
    id: "no",
    label: "Declined",
    items: ["Background checks", "Hiring, credit, housing, or insurance decisions", "Guessing health, beliefs, or other sensitive traits"],
  },
] as const;

export function UsesMockup() {
  return (
    <div className="ssm-frame">
      <MockupRoot describe="Illustration: the uses Soulscrape accepts, the ones that need the person's permission, and the ones it declines." kind="ss-uses">
        <div className="ssm-uses">
          {USE_GROUPS.map((group) => (
            <section className="ssm-use" data-ssm-use={group.id} key={group.id}>
              <h4>{group.label}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </MockupRoot>
    </div>
  );
}

export const SURFACE_IDS = ["session", "dossier", "claim", "format", "uses", "install"] as const;
export type SurfaceId = (typeof SURFACE_IDS)[number];
