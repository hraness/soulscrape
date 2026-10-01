export interface Comparison {
  slug: string;
  /** Brief overview; dated evidence and selection detail remain below it. */
  glance: readonly Readonly<{ label: string; values: readonly [string, string] }>[];
  tool: string;
  /** Section heading describing the other tool, with correct agreement. */
  whatHeading: string;
  /** Column heading for when to pick the other tool. */
  chooseHeading: string;
  /** One-line category label for the other tool. */
  category: string;
  title: string;
  description: string;
  /** Fair description of what the other tool is and who it's for. */
  whatTheyAre: string;
  /** The difference in approach, in one paragraph. */
  difference: string;
  chooseThem: readonly string[];
  chooseOurs: readonly string[];
  /** ISO date on which the other tool's own pages were last checked. */
  checkedOn: string;
  /** The other tool's own pages that back the description above. */
  sources: readonly ComparisonSource[];
}

export interface ComparisonSource {
  label: string;
  url: string;
}

const CHECKED_ON = "2026-09-28";

export const comparisons: readonly Comparison[] = [
  {
    slug: "clay",
    glance: [
      { label: "Output", values: ["Enriched lead records", "Dated, cited dossier"] },
      { label: "Runs through", values: ["Hosted tables and outreach tools", "Your agent"] },
      { label: "Best for", values: ["Sales research at scale", "Understanding one person"] },
    ],
    tool: "Clay",
    whatHeading: "What Clay does",
    chooseHeading: "Choose Clay when",
    category: "people-enrichment for go-to-market teams",
    title: "Soulscrape vs Clay",
    description:
      "Clay enriches sales leads with contact and company data. Soulscrape writes a cited dossier on how one person thinks.",
    whatTheyAre:
      "Clay is a data-enrichment platform for go-to-market teams: it pulls firmographic and contact data from more than 150 providers into a spreadsheet-style table, adds AI research columns, and feeds outreach sequences. Its unit of work is the lead record: a person as a row of fields in a pipeline.",
    difference:
      "Soulscrape's unit of work is the person. Your agent writes a dated, cited dossier on how someone decides, argues, and changes their mind, from evidence you're allowed to use, and you can publish it as a public index. Clay answers “who should we email, and what do we know about their company?” Soulscrape answers “how does this person think, and where's the evidence?”",
    chooseThem: [
      "You run outbound or RevOps and need enrichment at spreadsheet scale.",
      "You want contact data such as emails, titles, and firmographics from providers.",
      "Your output feeds sequences, CRMs, and scoring workflows.",
    ],
    chooseOurs: [
      "You want a cited, dated, revisable model of a person's beliefs, decisions, and style.",
      "Your reader is an agent or a person who needs to understand someone.",
      "You want to publish the result as a public index others can reuse.",
      "You need rules on the evidence: authorized sources only, no getting past access controls, and contradictions kept.",
    ],
    checkedOn: CHECKED_ON,
    sources: [
      { label: "Clay", url: "https://www.clay.com" },
      { label: "Clay pricing", url: "https://www.clay.com/pricing" },
    ],
  },
  {
    slug: "character-ai",
    glance: [
      { label: "Output", values: ["Character conversations", "Dated, cited dossier"] },
      { label: "Runs through", values: ["Hosted chat apps", "Your agent"] },
      { label: "Best for", values: ["Roleplay and entertainment", "Documented beliefs and behavior"] },
    ],
    tool: "Character.AI and persona chat",
    whatHeading: "What persona chatbots do",
    chooseHeading: "Choose a persona chatbot when",
    category: "persona chatbots",
    title: "Soulscrape vs persona chatbots",
    description:
      "Persona chatbots imitate a voice for conversation. Soulscrape documents what a real person has said and done, with sources.",
    whatTheyAre:
      "Character.AI and similar persona-chat tools let anyone create or chat with a character that talks like a famous or fictional person. The product is the conversation, used for entertainment, companionship, and roleplay. Each character is defined by a description its creator writes.",
    difference:
      "Soulscrape writes a dated dossier: a cited working model of a real person's documented beliefs and behavior. It does not produce a chatbot by default. Voice-resembling drafts and reusable assistant charters need the person's explicit authorization, and even then the assistant never speaks or makes commitments as them. Each dossier states its limits and what the evidence didn't cover.",
    chooseThem: [
      "You want to chat with a character, for entertainment or companionship.",
      "Fidelity to the real person's documented positions isn't the point.",
      "The subject is fictional, or the use is explicitly playful.",
    ],
    chooseOurs: [
      "You need to know what a real person has said and believes, with citations.",
      "You want a model an agent can reason over.",
      "You're building an assistant that works like its subject, with their sign-off.",
      "You need the output dated and revisable, with its limits stated.",
    ],
    checkedOn: CHECKED_ON,
    sources: [
      { label: "Character.AI", url: "https://character.ai" },
      { label: "Character.AI blog", url: "https://blog.character.ai" },
    ],
  },
  {
    slug: "deep-research",
    glance: [
      { label: "Output", values: ["Cited report", "Structured person dossier"] },
      { label: "Runs through", values: ["ChatGPT, Perplexity or Gemini", "Your agent"] },
      { label: "Best for", values: ["A one-off research question", "A person model you can revise"] },
    ],
    tool: "deep-research modes",
    whatHeading: "What deep-research modes do",
    chooseHeading: "Choose deep research when",
    category: "one-off research reports",
    title: "Soulscrape vs deep research",
    description:
      "Deep-research modes write a cited report on a question. Soulscrape builds a structured, cited dossier on a person that you can keep, revise, and publish.",
    whatTheyAre:
      "ChatGPT, Perplexity, and Gemini all offer deep-research modes: ask a question and get a long cited report synthesized from the web. Gemini can also search your Gmail and Drive when you allow it. They suit questions like “what's the state of X?”",
    difference:
      "Soulscrape builds a structured person index instead of a report: claims labeled as fact, stated belief, pattern, or speculation, plus a timeline, themes, relations, and open questions. The packet is validated against a public schema, can be revised over time, and can be published for any agent or person to read. It also lists what the evidence didn't answer.",
    chooseThem: [
      "Your question is about a topic, not a person.",
      "You want a one-shot report you read once and move on.",
      "You don't need the result to stay current, structured, or remixable.",
    ],
    chooseOurs: [
      "Your subject is a person, and you want their beliefs, decisions, and style.",
      "You want a structured packet with labeled claims, contradictions kept, and open questions listed.",
      "You want to revise it, publish it, or hand the JSON to another agent.",
      "You want research run by your own agent under your instructions, on the sources you choose.",
    ],
    checkedOn: CHECKED_ON,
    sources: [
      { label: "OpenAI deep research", url: "https://openai.com/index/introducing-deep-research/" },
      { label: "Perplexity deep research", url: "https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research" },
      { label: "Gemini deep research", url: "https://gemini.google/overview/deep-research/" },
    ],
  },
  {
    slug: "persona-prompts",
    glance: [
      { label: "Output", values: ["Persona and style instructions", "Dated, cited dossier"] },
      { label: "Runs through", values: ["Your agent or a custom chatbot", "Your agent"] },
      { label: "Best for", values: ["Voice and tone", "Claims tied to documented sources"] },
    ],
    tool: "persona prompts and SOUL.md",
    whatHeading: "What persona prompts and SOUL.md do",
    chooseHeading: "Choose a persona prompt or SOUL.md when",
    category: "persona prompts and SOUL.md files",
    title: "Soulscrape vs persona prompts and SOUL.md",
    description:
      "A persona prompt or a SOUL.md file tells an agent who to be. A dossier gives it cited claims it can check answers against.",
    whatTheyAre:
      "The do-it-yourself route: write a system prompt that says “you are X, you believe Y, you write like Z,” or paste a persona card into a custom GPT. It is cheap and immediate, but the model works from whatever you typed, and nothing separates what the person said from what you guessed. Skills such as SOUL.md automate this for your own voice: your agent reads your posts and essays and writes SOUL.md and STYLE.md files it loads in later sessions.",
    difference:
      "Soulscrape starts from evidence: a dossier ties its claims to sources and keeps stated beliefs, patterns, and speculation apart. The agent can get an executive model, an operating manual, and a list of what not to infer, so it can check an answer against documented positions.",
    chooseThem: [
      "You are the subject, and you want your agent to write and reason like you.",
      "The persona is fictional or loosely inspired by someone.",
      "Speed matters more than fidelity, and nobody will check the citations.",
      "You only need a tone.",
    ],
    chooseOurs: [
      "The persona must track a real person's documented positions and latest writing.",
      "You want claims your agent can check, each tied to its sources.",
      "You need the model dated and revisable as the person publishes and changes.",
      "You want a standalone executive model your agent can keep in context.",
    ],
    checkedOn: CHECKED_ON,
    sources: [{ label: "SOUL.md", url: "https://github.com/aeonfun/soul.md" }],
  },
];

export function comparison(slug: string): Comparison | undefined {
  return comparisons.find(entry => entry.slug === slug);
}
