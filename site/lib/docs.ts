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
  tutorial: "Build one dossier from start to finish.",
  "how-to": "Steps for one task.",
  reference: "The packet format and the public endpoints.",
  explanation: "Why the skill keeps claim kinds apart and asks about authorization.",
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
          { kind: "paragraph", text: "Name the person, the sources you are allowed to use, and what the dossier is for. Before it reads anything, the skill writes a question packet: the subject, the audience, the evidence it has and lacks, and what you need to authorize." },
          { kind: "commands", text: "Use $soulscrape to build a dated working model of <person> from <authorized sources>. It's for <intended use>, read by <audience>. Use sources up to <cutoff>. Proxy authorization: <none, or who approved what>." },
          { kind: "paragraph", text: "Start with a corpus small enough to inspect: a public figure's essays, a talk transcript, an interview. Your agent reads the evidence, asks once if something material is missing, then writes the working document." },
        ],
      },
      {
        id: "read",
        title: "Read the dossier",
        blocks: [
          { kind: "paragraph", text: "The result is one Markdown document whose length follows the evidence: often 300 to 1,500 words for a thin corpus, and as much as 4,000 to 8,000 for a rich one. It opens with a status note saying the model is partial, dated, and revisable. The skill picks its sections from the output blueprint, such as an executive model, a practical operating manual, tensions and revision hooks, and what not to infer." },
          { kind: "list", items: [
            "Facts, stated beliefs, patterns, and speculation are kept apart. Check the claim kind before you quote one.",
            "Contradictions stay in the dossier instead of being resolved.",
            "Confidence describes how well the examined evidence supports a claim. It is not certainty about the person.",
          ] },
        ],
      },
      {
        id: "iterate",
        title: "Iterate and decide what happens to it",
        blocks: [
          { kind: "paragraph", text: "Ask for corrections, and add evidence when it covers a missing period or context or contradicts what the dossier says. The dossier stays dated and revisable." },
          { kind: "paragraph", text: "Keep it private, share the file, or publish it as a public index. Publishing is a separate step that needs a free account and a device login." },
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
      "Turn an export, such as an X archive, into a validated source packet that the soulscrape skill can read offline as evidence.",
    sections: [
      {
        id: "what",
        title: "What a source packet is",
        blocks: [
          { kind: "paragraph", text: "A source packet is a size-limited JSON export with a fixed structure, attribution fields, time bounds, references, and a checksum. The validator checks those properties. It does not check whether the contents are true." },
          { kind: "paragraph", text: "PeopleBlade exports public research about a contact, and the legacy Message Like Me CLI exports message history. The ensoul.x-authored-posts-source.v1 source id covers a person's own authored posts from an official archive." },
        ],
      },
      {
        id: "validate",
        title: "Validate before reading",
        blocks: [
          { kind: "commands", text: "bun skills/soulscrape/scripts/validate-source-packet.ts \\\n  /absolute/private/path/subject.ensoul-source.json" },
          { kind: "paragraph", text: "Validation runs offline. A valid packet has passed the structure, attribution, bounds, reference, and checksum checks; the skill then reads it as evidence for the use you stated." },
        ],
      },
      {
        id: "hand-to-agent",
        title: "Hand it to your agent",
        blocks: [
          { kind: "paragraph", text: "Keep the packet on your disk and name it in the ask. Private material stays in your agent environment, under its data practices. Hraness receives only the public indexes you choose to publish, and those are built from public evidence." },
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
          { kind: "paragraph", text: "Only public information belongs in a published index. Before you upload, read the complete packet and confirm every claim belongs in public: no private or third-party personal data, claim kinds intact, contradictions kept." },
        ],
      },
      {
        id: "sign-in",
        title: "Sign in and authorize the device",
        blocks: [
          { kind: "paragraph", text: "Publishing needs a free Hraness account. There is no subscription, no credits to buy, and no card. The CLI prints a link to a device pairing page; confirm that the code there matches the one in your terminal." },
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
          { kind: "paragraph", text: "Republishing an identical packet changes nothing, and a changed packet becomes a new revision. Withdrawing takes the index off public reads; Hraness keeps the packet so you can restore it." },
          { kind: "paragraph", text: "Hraness stores the reviewed public packet and publishing metadata, not your private sources." },
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
    title: "person index reference",
    description:
      "The fields of a soulscrape.person-index.v1 packet, how to read a published index, and the public endpoints that serve it.",
    sections: [
      {
        id: "packet",
        title: "What the packet carries",
        blocks: [
          { kind: "list", items: [
            "subject: display name, summary, official site, verified profiles, and aliases.",
            "claims: a cited list where each entry is fact, stated_belief, pattern, or speculation, with source references.",
            "timeline: dated events with kind, organization, and location where known.",
            "themes: recurring positions with status stated, reported, or inferred.",
            "works and appearances: authored work and documented appearances, with links.",
            "relations: typed links to other people and organizations, which join indexes into one graph.",
            "openQuestions: questions the evidence did not answer.",
          ] },
          { kind: "paragraph", text: "Packets are integer-only I-JSON: no floats, no undefined, no non-JSON types. The CLI, the site's API routes, and the database write path all check packets with the same validator, in skills/soulscrape/scripts/person-index.ts." },
        ],
      },
      {
        id: "formats",
        title: "Three ways to read an index",
        blocks: [
          { kind: "paragraph", text: "Every published index is a web page at /<username>/<handle>, a JSON packet with every claim and source for tools, and a Markdown copy of its essay at /<username>/<handle>.md for reading or pasting. The Markdown copy carries the essay only; use the page or the JSON for claims and sources." },
        ],
      },
      {
        id: "api",
        title: "Public endpoints",
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
      "Why a dossier keeps claim kinds apart, asks before guessing, and ties authorization to the request rather than to the data.",
    sections: [
      {
        id: "claim-kinds",
        title: "Four kinds of claim",
        blocks: [
          { kind: "paragraph", text: "A dossier that flattens what a person said, what others reported, what the evidence shows, and what the model guesses into one voice misleads its reader. Soulscrape keeps them separate:" },
          { kind: "list", items: [
            "fact: documented in the evidence, cited to its source.",
            "stated_belief: the person's own stated position, cited.",
            "pattern: a regularity the evidence shows that the person may never have stated.",
            "speculation: a guess, labeled as one.",
          ] },
          { kind: "paragraph", text: "Confidence describes how well the examined evidence supports a claim. It never turns a guess into a finding, and contradictions stay in the dossier." },
        ],
      },
      {
        id: "authorization",
        title: "Authorization is a property of the ask",
        blocks: [
          { kind: "paragraph", text: "Having someone's data does not mean they authorized this use. Messages, exports, and public information each come with a context, so before reading, the skill writes the intended use, the audience, and the missing evidence into a question packet. Private sources stay in your agent environment." },
          { kind: "paragraph", text: "Public web research is off by default. It turns on when you ask for it, when you name a URL, or when a time-sensitive public fact needs checking. The skill then follows your instructions on sources, time window, and depth, records every finding with its URL, access date, passage, and identity binding, and stops when the questions are answered." },
        ],
      },
      {
        id: "limits",
        title: "Limits",
        blocks: [
          { kind: "list", items: [
            "A dossier is a dated interpretation, published by someone other than the person it describes.",
            "Without the person's authorization it does not imitate their voice, and it never assesses their character or supports consequential decisions about them.",
            "It is never finished: it can be revised, and it says what it did not cover.",
          ] },
          { kind: "paragraph", text: "An assistant whose reasoning resembles the person's is possible only when they have authorized it. Everything else (a collaboration guide, a research brief, a public index) is useful because it states its limits." },
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
