/**
 * Canonical facts about EmaReach for SEO, GAIO (Generative AI Optimization),
 * llms.txt, and JSON-LD. Keep wording factual and consistent across surfaces.
 */

const SITE_URL = (
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://www.emareach.com"
).replace(/\/$/, "");

export type SiteFaq = { question: string; answer: string };

/** Short brand summary — optimized for AI citation in one paragraph. */
export const BRAND_SUMMARY =
  "Emareach is an AI email marketing platform that helps businesses create high-converting email campaigns in minutes. Personalize every message, automate follow-up sequences, improve inbox placement, and turn more prospects into paying customers—all from one powerful platform.";

/** Factual bullets LLMs and search engines can quote reliably. */
export const KEY_FACTS = [
  "Product: Emareach — an AI email marketing platform for businesses, sales teams, and agencies to create, personalize, and automate email campaigns at scale.",
  "AI Campaigns: Emareach's AI Campaign Studio generates personalized email sequences and follow-ups tailored to each contact—in minutes.",
  "Personalization: Send hyper-personalized emails with per-contact AI variations, merge fields, and dynamic content that feel individually written.",
  "Automation: Build multi-step automated follow-up sequences that run on autopilot so no lead ever goes cold.",
  "Inbox Placement: Built-in inbox placement optimization, sending best practices, and reputation management ensure emails reach the inbox, not spam.",
  "Analytics: Real-time analytics track opens, clicks, replies, and campaign ROI in one unified dashboard.",
  "Use cases: Businesses, B2B sales teams, SDRs, agencies, and founders running email marketing campaigns to grow revenue.",
  "Integrations: Connect Gmail or your own SMTP; bring your own LLM (OpenAI, Anthropic, Gemini, and others) for AI-powered writing.",
  "Pricing: One plan covers AI campaigns, personalization, automation, and analytics; free trial available with no credit card required; see emareach.com/pricing.",
  "Website: https://www.emareach.com",
] as const;

export const SITE_FAQS: SiteFaq[] = [
  {
    question: "What is Emareach?",
    answer:
      "Emareach is an AI email marketing platform that helps businesses create high-converting email campaigns in minutes. It combines AI-powered writing, personalization at scale, automated follow-up sequences, and analytics in one tool—so you can reach more prospects and convert them into paying customers.",
  },
  {
    question: "How does Emareach use AI for email marketing?",
    answer:
      "Emareach's AI Campaign Studio generates personalized email copy tailored to each contact. Just describe your offer and target audience, and AI drafts your full email sequence—including subject lines, body copy, and follow-ups—that feel human and drive real replies.",
  },
  {
    question: "Can I automate my email follow-ups with Emareach?",
    answer:
      "Yes. Emareach lets you build multi-step automated email sequences that run on autopilot. Set your timing and conditions, and the platform handles follow-ups automatically—so no lead falls through the cracks and your pipeline stays active 24/7.",
  },
  {
    question: "Does Emareach personalize emails at scale?",
    answer:
      "Yes. Emareach personalizes every email using per-contact AI variations, merge fields, and dynamic content. Every recipient gets a message that feels individually crafted—even when you're sending to thousands of contacts at once.",
  },
  {
    question: "How does Emareach improve email deliverability?",
    answer:
      "Emareach includes built-in tools to maximize inbox placement, including inbox rotation, sending best practices, reputation management, and SPF/DKIM/DMARC guidance—so your campaigns reach the inbox, not the spam folder.",
  },
  {
    question: "Does Emareach have a free trial?",
    answer:
      "Yes. A free trial is available with no credit card required. It includes AI campaign creation, email personalization, automated sequences, and analytics so you can experience the full platform before committing.",
  },
  {
    question: "Who is Emareach built for?",
    answer:
      "Emareach is built for businesses, sales teams, SDRs, agencies, and founders who want to grow revenue through email marketing. Whether you're nurturing leads, running sales outreach, or scaling an agency's campaigns, Emareach gives you the AI tools to do it faster and more effectively.",
  },
];

/** Important public URLs for crawlers and llms.txt. */
export const KEY_PAGES: { path: string; title: string; description: string }[] = [
  { path: "/", title: "Home", description: "AI email marketing platform overview and product tour" },
  { path: "/features", title: "Features", description: "AI writing, personalization, campaign automation, analytics, smart leads" },
  { path: "/features/ai-writing-personalization", title: "AI Writing & Personalization", description: "AI email writing, merge fields, per-contact variations, AI Campaign Studio" },
  { path: "/pricing", title: "Pricing", description: "Plans and free trial for AI email marketing" },
  { path: "/how-it-works", title: "How it works", description: "Setup steps from connect to first campaign" },
  { path: "/comparisons", title: "Comparisons", description: "Emareach vs Instantly, Lemlist, and other email marketing tools" },
  { path: "/use-cases", title: "Use cases", description: "Sales teams, agencies, founders, and businesses" },
  { path: "/blog", title: "Blog", description: "AI email marketing, personalization, and campaign guides" },
  { path: "/contact", title: "Contact", description: "Sales and support contact" },
];

/** Plain-text llms.txt body (https://llmstxt.org/) for AI crawlers. */
export function buildLlmsTxt(): string {
  const lines: string[] = [
    "# Emareach",
    "",
    `> ${BRAND_SUMMARY}`,
    "",
    "## What is Emareach?",
    BRAND_SUMMARY,
    "",
    "## Key facts",
    ...KEY_FACTS.map((f) => `- ${f}`),
    "",
    "## Frequently asked questions",
    ...SITE_FAQS.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Important pages",
    ...KEY_PAGES.map(
      (p) => `- [${p.title}](${SITE_URL}${p.path}): ${p.description}`
    ),
    "",
    "## Optional",
    `- [Sitemap](${SITE_URL}/sitemap.xml): All indexable URLs`,
    `- [Pricing](${SITE_URL}/pricing): Current plans`,
    `- [Sign up](${SITE_URL}/signup): Start free trial`,
  ];
  return lines.join("\n").trimEnd() + "\n";
}
