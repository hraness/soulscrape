export interface Comparison {
  slug: string;
  tool: string;
  /** One-line category label for the other tool. */
  category: string;
  title: string;
  description: string;
  /** Fair description of what the other tool is and who it's for. */
  whatTheyAre: string;
  /** The actual difference in approach — the paragraph that earns the page. */
  difference: string;
  chooseThem: readonly string[];
  chooseOurs: readonly string[];
}

export const comparisons: readonly Comparison[] = [
  {
    slug: "clay",
    tool: "Clay",
    category: "people-enrichment for go-to-market teams",
    title: "soulscrape vs Clay",
    description:
      "Clay enriches lead records for outbound. Soulscrape writes a cited dossier on how a person thinks. Different questions, different outputs.",
    whatTheyAre:
      "Clay is a data-enrichment platform for go-to-market teams: it pulls firmographic and contact data from dozens of providers into a spreadsheet-style table, adds AI research columns, and feeds outreach sequences. Its unit of work is the lead record — a person as a row of fields for a pipeline.",
    difference:
      "Soulscrape's unit of work is the person. It doesn't fill columns; it writes a dated, cited dossier on how someone decides, argues, and changes their mind — built by your agent from evidence you authorize, and publishable as a public index. Clay answers 'who should we email and what do we know about their company'; soulscrape answers 'how does this person think, and where's the evidence.'",
    chooseThem: [
      "You run outbound or RevOps and need enrichment at spreadsheet scale.",
      "You want contact data — emails, titles, firmographics — from providers.",
      "Your output feeds sequences, CRMs, and scoring workflows.",
    ],
    chooseOurs: [
      "You want a model of a person's beliefs, decisions, and style — cited, dated, revisable.",
      "Your reader is an agent or a human who needs to understand someone, not score them.",
      "You want to publish the result as a remixable public index, not a private table.",
      "You need evidence boundaries: authorized sources only, no bypassed access, contradictions kept.",
    ],
  },
  {
    slug: "character-ai",
    tool: "Character.AI and persona chat",
    category: "persona chatbots",
    title: "soulscrape vs persona chatbots",
    description:
      "Persona chat tools simulate a voice. Soulscrape documents a person from evidence — and refuses to confuse the two.",
    whatTheyAre:
      "Character.AI and similar persona-chat tools let anyone create or chat with a character that talks like a person — famous or fictional. The product is the conversation: entertainment, companionship, roleplay. The character is a prompt and a vibe; accuracy is not the point and usually not claimed.",
    difference:
      "Soulscrape is not a chatbot and doesn't produce one by default. It writes a dated dossier — a cited working model of a real person's documented beliefs and behavior — and it treats voice imitation, reusable assistant charters, and acting-as-the-person as uses that require the subject's explicit authorization. A soulscrape output says what it is, what it isn't, and what the evidence didn't cover.",
    chooseThem: [
      "You want to chat with a character, for entertainment or companionship.",
      "Fidelity to the real person's documented positions isn't the point.",
      "The subject is fictional, or the use is explicitly playful.",
    ],
    chooseOurs: [
      "You need to know what a real person actually believes and has said — with citations.",
      "You want a model an agent can reason over, not a voice performing one.",
      "You're building an authorized assistant that works like its subject — with their sign-off.",
      "You need the output dated, bounded, revisable, and honest about its limits.",
    ],
  },
  {
    slug: "deep-research",
    tool: "Deep-research modes",
    category: "one-off research reports",
    title: "soulscrape vs deep research",
    description:
      "Deep-research modes answer a question once. Soulscrape builds a structured, cited dossier on a person that you can keep, revise, and publish.",
    whatTheyAre:
      "ChatGPT, Perplexity, and Gemini all offer deep-research modes: pose a question, get a long cited report synthesized from the web in one pass. Excellent for 'what's the state of X' questions. The output is a report — a frozen document, one query deep, rebuilt from scratch next time.",
    difference:
      "Soulscrape builds a structured person index instead of a report: a typed claims ledger (fact, stated belief, pattern, speculation), a timeline, themes, relations, and open questions — validated against a public schema, revisable over time, and publishable as a packet any agent or person can consume. A deep-research report says what it found; a dossier is a maintained artifact that also says what it didn't.",
    chooseThem: [
      "Your question is about a topic, not a person.",
      "You want a one-shot report you read once and move on.",
      "You don't need the result to stay current, structured, or remixable.",
    ],
    chooseOurs: [
      "Your subject is a person, and you want their beliefs, decisions, and style — not just mentions.",
      "You want a structured packet: typed claims, contradictions preserved, open questions explicit.",
      "You want to revise it, publish it, or hand the JSON to another agent.",
      "You want research under your instructions with authorized sources — including private corpora a web search can't see.",
    ],
  },
  {
    slug: "persona-prompts",
    tool: "DIY persona prompts",
    category: "hand-written persona prompts",
    title: "soulscrape vs persona prompts",
    description:
      "A persona prompt is a paragraph of vibes. A dossier is a cited claims ledger the agent can check itself against.",
    whatTheyAre:
      "The DIY route: write a system prompt that says 'you are X, you believe Y, you write like Z,' or paste a persona card into a custom GPT. Cheap, immediate, and unverifiable — the model performs a sketch of a person from whatever you typed, and nothing distinguishes what they said from what you guessed.",
    difference:
      "Soulscrape replaces the vibes paragraph with evidence: every behavioral claim in a dossier cites a source and carries a kind — stated belief versus pattern versus speculation. The agent gets an executive model plus an operating manual with revision hooks and a what-not-to-infer section, so it can check its answer against documented positions instead of improvising them.",
    chooseThem: [
      "The persona is fictional or loosely inspired by someone.",
      "Speed matters more than fidelity, and nobody will check the citations.",
      "You just need a tone, not a model.",
    ],
    chooseOurs: [
      "The persona must track a real person's documented positions and latest writing.",
      "You want claims your agent can defend — each one wired to its source.",
      "You need the model dated and revisable as the person publishes and changes.",
      "You want the dossier compact enough to sit in context permanently.",
    ],
  },
];

export function comparison(slug: string): Comparison | undefined {
  return comparisons.find(entry => entry.slug === slug);
}
