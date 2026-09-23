import publishedRelease from "../published-release.json";

export type DocQuadrant = "tutorial" | "how-to" | "reference" | "explanation";

export type DocBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "commands"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "links"; links: readonly { href: string; label: string }[] };

export interface DocSection {
  id: string;
  title: string;
  blocks: readonly DocBlock[];
}

export interface DocPage {
  slug: string;
  quadrant: DocQuadrant;
  title: string;
  description: string;
  sections: readonly DocSection[];
  related?: readonly { href: string; label: string }[];
}

export const quadrantLabels: Record<DocQuadrant, string> = {
  tutorial: "Tutorial",
  "how-to": "How-to guide",
  reference: "Reference",
  explanation: "Explanation",
};

export const quadrantDescriptions: Record<DocQuadrant, string> = {
  tutorial: "Learning-oriented: do the thing once, end to end.",
  "how-to": "Task-oriented: get one concrete job done.",
  reference: "Information-oriented: the contracts, fields, and endpoints.",
  explanation: "Understanding-oriented: why the boundaries are where they are.",
};

export const docsPages: readonly DocPage[] = [
  {
    slug: "quickstart",
    quadrant: "tutorial",
    title: "build your first working model",
    description:
      "Install the soulscrape skill, point your agent at authorized evidence, review the dossier it writes, and iterate.",
    sections: [
      {
        id: "install",
        title: "Install the skill",
        blocks: [
          { kind: "paragraph", text: "Install the skill from its tagged release with the skills.sh installer. It lands in your agent's skill directory and needs no account. Installing copies the skill's files; it reads no personal data and starts no research." },
          { kind: "commands", text: publishedRelease.skillInstall },
          { kind: "paragraph", text: "Review the skill before installing if you like; it is a Markdown file with instructions plus a few dependency-free TypeScript utilities. Start a new agent session afterward so the skill loads." },
          { kind: "links", links: [
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md", label: "Read SKILL.md" },
            { href: publishedRelease.releaseUrl, label: `Release ${publishedRelease.version} notes and verified assets` },
          ] },
        ],
      },
      {
        id: "first-model",
        title: "Ask for the model",
        blocks: [
          { kind: "paragraph", text: "Name the person, the sources you are authorized to use, and the intended use. The skill writes a question packet before it reads anything — subject, audience, evidence available, evidence missing, and what you must authorize." },
          { kind: "commands", text: "Use $soulscrape to build a dated, evidence-calibrated, partial and revisable working model of <person> from <authorized sources>. State the intended use, audience, source cutoff, and any proxy authorization explicitly." },
          { kind: "paragraph", text: "Start with a corpus small enough to inspect: a public figure's essays, a talk transcript, an interview. Your agent reads the evidence, asks once if something material is missing, then writes the working document." },
        ],
      },
      {
        id: "read",
        title: "Read the dossier",
        blocks: [
          { kind: "paragraph", text: "The result is one Markdown document whose length follows the evidence: often 300 to 1,500 words for a thin corpus, and as much as 4,000 to 8,000 for a rich one. It opens with a status note saying the model is partial, dated, and revisable. The skill picks its sections from the output blueprint, such as an executive model, a practical operating manual, tensions and revision hooks, and what not to infer." },
          { kind: "list", items: [
            "Facts, stated beliefs, patterns, and speculation are kept distinct — check the claim kind before quoting.",
            "Contradictions are preserved rather than resolved; a model that erases them is a bug, not a feature.",
            "Confidence describes support within the evidence examined, not certainty about the person.",
          ] },
        ],
      },
      {
        id: "iterate",
        title: "Iterate and decide what happens to it",
        blocks: [
          { kind: "paragraph", text: "Ask for corrections, add evidence when it supplies a missing period, a new context, or a real contradiction. The dossier stays dated and revisable; it never pretends to be finished." },
          { kind: "paragraph", text: "Keep it private, share the file, or publish it as a public index — that is a separate decision with a free account and a device login." },
          { kind: "links", links: [
            { href: "/docs/publish-person-index", label: "Publish a person index" },
            { href: "/use-cases", label: "What people use dossiers for" },
          ] },
        ],
      },
    ],
    related: [
      { href: "/docs/publish-person-index", label: "How-to: publish a person index" },
      { href: "/docs/evidence-and-boundaries", label: "Explanation: evidence and boundaries" },
    ],
  },
  {
    slug: "prepare-source-packet",
    quadrant: "how-to",
    title: "prepare a source packet",
    description:
      "Turn a bounded export — like an X archive — into a validated ensoul source packet the skill can read offline.",
    sections: [
      {
        id: "what",
        title: "What a source packet is",
        blocks: [
          { kind: "paragraph", text: "A source packet is a bounded JSON export with structure, attribution fields, stated bounds, references, and an integrity digest. The validator proves those properties — it does not prove the contents are true." },
          { kind: "paragraph", text: "PeopleBlade exports public research about a contact, and the legacy Message Like Me CLI exports message history. The ensoul.x-authored-posts-source.v1 source id covers a person's own authored posts from an official archive." },
        ],
      },
      {
        id: "validate",
        title: "Validate before reading",
        blocks: [
          { kind: "commands", text: "bun skills/soulscrape/scripts/validate-source-packet.ts \\\n  /absolute/private/path/subject.ensoul-source.json" },
          { kind: "paragraph", text: "Validation is offline. A valid packet means the structure, attribution, bounds, references, and digest check out — the skill then reads it as evidence under your stated use." },
        ],
      },
      {
        id: "hand-to-agent",
        title: "Hand it to your agent",
        blocks: [
          { kind: "paragraph", text: "Keep the packet on your disk and name it in the ask. Private material stays in your agent environment under its data practices; it never moves to Hraness unless you choose to publish a public index built from public evidence." },
          { kind: "commands", text: "Use $soulscrape to build a working model of <person> from /absolute/path/subject.ensoul-source.json, for <intended use>." },
        ],
      },
    ],
    related: [
      { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/source-packets.md", label: "The packet contract (repository)" },
      { href: "/docs/person-index", label: "Reference: the person index" },
    ],
  },
  {
    slug: "publish-person-index",
    quadrant: "how-to",
    title: "publish a person index",
    description:
      "Review a dossier, sign in with a free Hraness account, and publish it as a public index you can revise or withdraw.",
    sections: [
      {
        id: "review",
        title: "Review the packet first",
        blocks: [
          { kind: "paragraph", text: "Publishing is public-only by contract. Before you upload, read the complete packet and confirm every claim belongs in public: no private or third-party personal data, claim kinds intact, contradictions preserved." },
        ],
      },
      {
        id: "sign-in",
        title: "Sign in and authorize the device",
        blocks: [
          { kind: "paragraph", text: "A free Hraness account covers publishing — no Soulscrape subscription, Credits, or payment card. The CLI opens a device pairing page; confirm the code matches your terminal." },
          { kind: "commands", text: "bun skills/soulscrape/scripts/publish-person.ts login" },
          { kind: "links", links: [
            { href: "/api/suite-auth/start?return_to=%2F", label: "Create a free account or sign in" },
            { href: "/connect", label: "The /connect device flow" },
          ] },
        ],
      },
      {
        id: "publish",
        title: "Publish, revise, withdraw",
        blocks: [
          { kind: "commands", text: "bun skills/soulscrape/scripts/publish-person.ts publish \\\n  \"$PWD/examples/people/eugene-tssui/person-index.json\"\n\nbun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui" },
          { kind: "paragraph", text: "Publishing is idempotent on the packet digest: republishing the identical packet is a no-op, and a changed packet becomes a new revision. Withdrawal removes the index from public reads while the record of publication is retained." },
          { kind: "paragraph", text: "Hraness stores the reviewed public packet and publishing metadata — never your private source corpus." },
        ],
      },
    ],
    related: [
      { href: "/docs/person-index", label: "Reference: the person index" },
      { href: "/examples", label: "Browse published examples" },
    ],
  },
  {
    slug: "person-index",
    quadrant: "reference",
    title: "the person index, referenced",
    description:
      "The soulscrape.person-index.v1 packet: claims, timeline, themes, works, relations, open questions — and the endpoints that serve it.",
    sections: [
      {
        id: "packet",
        title: "What the packet carries",
        blocks: [
          { kind: "list", items: [
            "subject — display name, summary, official site, verified profiles, and aliases.",
            "claims — a cited ledger where each entry is fact, stated_belief, pattern, or speculation, with source references.",
            "timeline — dated events with kind, organization, and location where known.",
            "themes — recurring positions with status stated, reported, or inferred.",
            "works and appearances — authored artifacts and documented appearances with links.",
            "relations — typed edges to other entities, so indexes compose into a corpus graph.",
            "questions — open questions the evidence did not answer.",
          ] },
          { kind: "paragraph", text: "Packets are integer-only I-JSON: no floats, no undefined, no non-JSON types. Every boundary — the CLI, the Next routes, and Convex mutations — parses through the same validator in skills/soulscrape/scripts/person-index.ts." },
        ],
      },
      {
        id: "formats",
        title: "Three faces of the same packet",
        blocks: [
          { kind: "paragraph", text: "Every published index is a web page at /<username>/<handle>, a JSON packet with every claim and source for tools, and a Markdown copy of its essay at /<username>/<handle>.md for reading or pasting. The Markdown copy carries the essay only; use the page or the JSON for claims and sources." },
        ],
      },
      {
        id: "api",
        title: "The public read surface",
        blocks: [
          { kind: "list", items: [
            "/api/v1/profiles/<username>/<handle>: the full packet for one index.",
            "/api/v1/index.json: every live index, 100 per page.",
            "/api/v1/graph.json: the relation graph across indexes.",
            "/api/v1/themes.json and /api/v1/questions.json: themes and open questions across indexes.",
            "/llms.txt: a plain-text guide to these endpoints for agents.",
          ] },
          { kind: "paragraph", text: "Reads are free without sign-in. Every corpus endpoint returns pages: follow pagination.nextCursor until isDone is true, because one page is not the whole corpus." },
          { kind: "paragraph", text: "Writes go through the device flow at /connect and a signed-in Hraness account. /api/v1/people lists and publishes your own indexes and needs the credential from that flow." },
          { kind: "links", links: [
            { href: "/llms.txt", label: "llms.txt" },
            { href: "/api/v1/index.json", label: "Live corpus index (JSON)" },
          ] },
        ],
      },
    ],
    related: [
      { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/scripts/person-index.ts", label: "The validator source" },
      { href: "/docs/evidence-and-boundaries", label: "Explanation: evidence and boundaries" },
    ],
  },
  {
    slug: "evidence-and-boundaries",
    quadrant: "explanation",
    title: "evidence and boundaries",
    description:
      "Why a dossier keeps claim kinds distinct, asks before guessing, and treats authorization as a property of the request — not the data.",
    sections: [
      {
        id: "claim-kinds",
        title: "Four kinds of claim",
        blocks: [
          { kind: "paragraph", text: "A dossier that flattens what a person said, what others reported, what the evidence shows, and what the model guesses into one voice is worse than useless. Soulscrape keeps them separate:" },
          { kind: "list", items: [
            "fact — documented in the evidence, cited to its source.",
            "stated_belief — the subject's own stated position, cited.",
            "pattern — a revealed regularity the evidence supports but the subject may not have stated.",
            "speculation — a labeled guess, kept only when it is honest to include and marked as such.",
          ] },
          { kind: "paragraph", text: "Confidence describes support within the evidence examined. It never upgrades a guess into a finding, and contradictions are preserved rather than resolved." },
        ],
      },
      {
        id: "authorization",
        title: "Authorization is a property of the ask",
        blocks: [
          { kind: "paragraph", text: "Possessing data is not authorization. Messages, exports, and public information arrive with a context, and the skill writes the intended use, audience, and missing evidence into a question packet before reading. Private corpora stay in your agent environment." },
          { kind: "paragraph", text: "Public web research is off by default. It turns on when you ask for it, when you name a URL, or when a time-sensitive public fact needs checking. The skill then follows your instructions on sources, time window, and depth, records every finding with its URL, access date, passage, and identity binding, and stops when the questions are answered." },
        ],
      },
      {
        id: "limits",
        title: "What a dossier is not",
        blocks: [
          { kind: "list", items: [
            "Not the person, and not the subject's own page — a dated interpretation published by someone else.",
            "Not a voice imitator, a character assessment, or a basis for consequential decisions about a real person.",
            "Not finished — it is revisable, and it says what it did not cover.",
          ] },
          { kind: "paragraph", text: "A bounded reasoning proxy is possible only when the subject has authorized that use. Everything else — a collaboration guide, a research brief, a public index — works because it stays honest about what it is." },
        ],
      },
    ],
    related: [
      { href: "/docs/person-index", label: "Reference: the person index" },
      { href: "/use-cases", label: "Use cases" },
    ],
  },
];

export function docPage(slug: string): DocPage | undefined {
  return docsPages.find(page => page.slug === slug);
}
