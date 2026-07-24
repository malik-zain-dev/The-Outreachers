export type ComparisonSeed = {
  competitor: string;
  slug: string;
  shortTagline: string;
  idealFor: string;
  edge: string;
  competitorFocus: string;
  competitorGap: string;
  emareachWin: string;
  migrationNote: string;
};

export type ComparisonData = {
  competitor: string;
  slug: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  scorecards: Array<{ label: string; emareach: string; competitor: string }>;
  strengths: string[];
  advantages: string[];
  painPoints: string[];
  keyMetrics: Array<{ value: string; label: string }>;
  migrationSteps: Array<{ title: string; description: string }>;
  faq: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaBody: string;
  idealFor: string;
  edge: string;
  shortTagline: string;
};

const comparisonSeeds: ComparisonSeed[] = [
  {
    competitor: "Instantly",
    slug: "instantly",
    shortTagline: "Modern sending power with deeper deliverability intelligence",
    idealFor: "Teams that want fast campaign velocity with stronger sender-risk controls",
    edge: "Combines advanced warm-up safety, AI personalization, and reply intelligence in one layer",
    competitorFocus: "High-velocity outbound sending and broad campaign tooling",
    competitorGap: "Teams often want tighter sender-risk controls and cleaner reply ownership",
    emareachWin: "EmaReach emphasizes safe scale plus precise reply-to-rep routing",
    migrationNote: "Move high-risk domains first to apply EmaReach safety guardrails before scaling",
  },
  {
    competitor: "Saleshandy",
    slug: "saleshandy",
    shortTagline: "Scalable outreach with deeper inbox placement safety",
    idealFor: "Teams scaling outbound while trying to avoid reputation drops",
    edge: "Adds deliverability automation and conversion analytics beyond send metrics",
    competitorFocus: "Bulk outbound sending with straightforward setup",
    competitorGap: "Teams need stronger risk automation as volume and domains increase",
    emareachWin: "EmaReach scales volume with guardrails that prevent reputation drops",
    migrationNote: "Apply domain-level safety rules first, then increase send volume in controlled steps",
  },
  {
    competitor: "Mailreach",
    slug: "mailreach",
    shortTagline: "Inbox-first cold email infrastructure with deeper automation",
    idealFor: "Teams that need both deliverability and outbound execution in one platform",
    edge: "Combines warm-up, AI personalization, campaign automation, and reply workflows in one stack",
    competitorFocus: "Strong warm-up foundations and reputation management for cold outreach teams",
    competitorGap: "Campaign execution and reply operations still need extra tools once outreach volume grows",
    emareachWin: "EmaReach turns warm-up stability into one connected send-to-reply system",
    migrationNote: "Start by cloning mailbox limits and then move your highest-performing sequence first",
  },
  {
    competitor: "Lemwarm",
    slug: "lemwarm",
    shortTagline: "Beyond warm-up: full outbound system for pipeline growth",
    idealFor: "Companies graduating from warm-up tools into complete outbound operations",
    edge: "Pairs domain protection with conversion-focused sequence and analytics workflows",
    competitorFocus: "Simple and reliable warm-up experience for users in the Lemlist ecosystem",
    competitorGap: "Limited as a standalone warm-up layer when teams need complete outbound workflows",
    emareachWin: "EmaReach combines warm-up, sequence execution, and qualified-reply handling in one place",
    migrationNote: "Keep Lemwarm active for a few days while you shift campaigns and monitor reply quality",
  },
  {
    competitor: "Mailwarm",
    slug: "mailwarm",
    shortTagline: "From sender health to revenue outcomes",
    idealFor: "Teams that need measurable meetings and opportunities, not only inbox placement",
    edge: "Moves from warm-up-only to full campaign creation, tracking, and intent handling",
    competitorFocus: "Mailbox health improvement and inbox placement support",
    competitorGap: "No native campaign system, so pipeline reporting requires patching multiple apps",
    emareachWin: "EmaReach adds campaign and reply intelligence on top of deliverability controls",
    migrationNote: "Transfer mailbox warm-up first, then import your active prospect lists in batches",
  },
  {
    competitor: "Warmup Inbox",
    slug: "warmup-inbox",
    shortTagline: "Reliable inbox placement plus modern outbound execution",
    idealFor: "Outbound teams that need stable deliverability while scaling reply volume",
    edge: "Unifies warm-up, AI writing, sequencing, and reply categorization",
    competitorFocus: "Warm-up network built to improve sender trust over time",
    competitorGap: "Teams still manage copy, sends, and responses in separate systems",
    emareachWin: "EmaReach centralizes writing, sending, and intent routing with inbox safety",
    migrationNote: "Mirror your current warm-up pace before switching campaign traffic to EmaReach",
  },
  {
    competitor: "Warmy.io",
    slug: "warmy-io",
    shortTagline: "Deliverability controls with built-in GTM workflows",
    idealFor: "Growth and sales teams who want fewer tools and tighter operations",
    edge: "Adds campaign velocity and pipeline visibility on top of sender reputation tooling",
    competitorFocus: "Deliverability diagnostics and technical sender troubleshooting",
    competitorGap: "Outbound execution can feel fragmented when scaling beyond small teams",
    emareachWin: "EmaReach delivers technical protection plus daily SDR workflow execution",
    migrationNote: "Port technical settings first, then move one outbound team at a time",
  },
  {
    competitor: "Warmbox",
    slug: "warmbox",
    shortTagline: "Fast warm-up plus complete outbound orchestration",
    idealFor: "Lean teams that need speed, control, and conversion from one platform",
    edge: "Includes sequence design and reply routing, not just mailbox warming",
    competitorFocus: "Quick mailbox warm-up setup for lean teams",
    competitorGap: "Operational depth is limited when teams need detailed reply workflows",
    emareachWin: "EmaReach gives fast setup without sacrificing routing and reporting depth",
    migrationNote: "Use a staged rollout by mailbox group to protect sender reputation during cutover",
  },
  {
    competitor: "InboxAlly",
    slug: "inboxally",
    shortTagline: "Inbox improvement with outbound performance in one flow",
    idealFor: "Teams wanting stronger sender trust and campaign ROI simultaneously",
    edge: "Blends inbox optimization with modern cold outreach production",
    competitorFocus: "Inbox placement optimization with reputation-focused guidance",
    competitorGap: "Not built as a full outbound operating system for SDR and AE collaboration",
    emareachWin: "EmaReach connects inbox health with full campaign lifecycle ownership",
    migrationNote: "Shift new campaigns first while legacy outreach completes in the old stack",
  },
  {
    competitor: "Folderly",
    slug: "folderly",
    shortTagline: "Deliverability intelligence with conversion-ready execution",
    idealFor: "Teams that need advanced deliverability and a practical sales workflow",
    edge: "Transforms technical sender insights into direct outbound actions",
    competitorFocus: "Advanced deliverability analysis and sender diagnostics",
    competitorGap: "Teams often require separate sequencing tools for day-to-day outbound operations",
    emareachWin: "EmaReach keeps deliverability insights and execution decisions in one dashboard",
    migrationNote: "Map current deliverability benchmarks, then move campaigns after baseline parity",
  },
  {
    competitor: "TrulyInbox",
    slug: "trulyinbox",
    shortTagline: "Warm-up reliability plus campaign depth",
    idealFor: "Outbound teams replacing fragmented tools with one operating layer",
    edge: "Supports list-to-reply-to-meeting lifecycle within a single interface",
    competitorFocus: "Warm-up consistency and inbox support for growing send volume",
    competitorGap: "Fewer built-in controls for advanced reply classification and handoff logic",
    emareachWin: "EmaReach improves ownership from first send to CRM-ready opportunity",
    migrationNote: "Cut over mailbox-by-mailbox and validate positive-reply tagging accuracy weekly",
  },
  {
    competitor: "Mailivery",
    slug: "mailivery",
    shortTagline: "Inbox placement and growth execution together",
    idealFor: "Teams that want to protect domains while aggressively building pipeline",
    edge: "Combines sender safety with outbound velocity and response quality controls",
    competitorFocus: "Core inbox placement and sender safety management",
    competitorGap: "Teams still need stronger campaign analytics tied to sales outcomes",
    emareachWin: "EmaReach links sender health with sequence performance and meeting outcomes",
    migrationNote: "Migrate warm-up controls first, then move active campaigns based on engagement priority",
  },
  {
    competitor: "WarmUpYourEmail",
    slug: "warmupyouremail",
    shortTagline: "Simple warm-up replacement with enterprise-ready outbound tools",
    idealFor: "Founders and teams scaling from basic warm-up into repeatable pipeline generation",
    edge: "Adds personalization, analytics, and orchestration to core warm-up coverage",
    competitorFocus: "Entry-level warm-up workflow that is easy to start",
    competitorGap: "Outgrown quickly when teams need multi-rep workflow governance",
    emareachWin: "EmaReach supports both founder-led outreach and team-scale execution",
    migrationNote: "Begin with founder inboxes, then roll out team mailboxes with permissions enabled",
  },
  {
    competitor: "GMass warmup",
    slug: "gmass-warmup",
    shortTagline: "Warm-up plus advanced workflows for modern B2B outbound",
    idealFor: "Teams that outgrow plugin-style warm-up and need a systemized outbound engine",
    edge: "Provides dedicated deliverability plus role-aware sequence operations",
    competitorFocus: "Convenient warm-up for users already working inside GMass workflows",
    competitorGap: "Plugin-centric setup can limit broader team orchestration",
    emareachWin: "EmaReach gives a dedicated outbound workspace beyond plugin constraints",
    migrationNote: "Replicate top GMass campaigns in EmaReach and compare reply quality for one week",
  },
  {
    competitor: "Autowarmer",
    slug: "autowarmer",
    shortTagline: "Autopilot warm-up with full-funnel outbound capability",
    idealFor: "Teams seeking automation across warm-up, sends, and reply management",
    edge: "Extends automated sender reputation into measurable pipeline creation",
    competitorFocus: "Automated warm-up operation with minimal setup effort",
    competitorGap: "Limited visibility into full-funnel campaign and revenue outcomes",
    emareachWin: "EmaReach preserves automation while adding intent and pipeline visibility",
    migrationNote: "Maintain automated warm-up while gradually moving live sequences to EmaReach",
  },
  {
    competitor: "Smartlead",
    slug: "smartlead",
    shortTagline: "Scale multi-inbox outreach with stronger conversion workflows",
    idealFor: "Outbound teams running high volume that need tighter quality control",
    edge: "Adds richer intent routing and clearer campaign-to-pipeline visibility",
    competitorFocus: "Multi-inbox campaign scale and agency-style sending support",
    competitorGap: "Quality control and positive-reply workflows can become noisy at scale",
    emareachWin: "EmaReach adds structured intent handling for large outbound operations",
    migrationNote: "Migrate by client or business unit to keep response ownership clear",
  },
  {
    competitor: "Lemlist",
    slug: "lemlist",
    shortTagline: "Personalized outreach with more robust inbox protection",
    idealFor: "Teams who value personalization but need stronger deliverability-first operations",
    edge: "Connects personalization quality with sender reputation and response handling",
    competitorFocus: "Creative personalization and multichannel campaign workflows",
    competitorGap: "Teams seeking deeper email deliverability controls may need additional tooling",
    emareachWin: "EmaReach keeps personalization strong while upgrading sender safety automation",
    migrationNote: "Preserve your best personalization angles and re-test with EmaReach AI variants",
  },
  {
    competitor: "Woodpecker",
    slug: "woodpecker",
    shortTagline: "Reliable sequencing with modern AI and inbox controls",
    idealFor: "Sales teams modernizing legacy cold outreach workflows",
    edge: "Extends sequence execution with adaptive warm-up and smart reply workflows",
    competitorFocus: "Dependable sequencing for legacy outbound processes",
    competitorGap: "Older workflows can require manual effort for modern reply triage",
    emareachWin: "EmaReach modernizes sequence performance with built-in intent categorization",
    migrationNote: "Start with one core sequence and benchmark response handling speed before full migration",
  },
  {
    competitor: "Reply.io",
    slug: "reply-io",
    shortTagline: "Multichannel outreach alternative with stronger deliverability core",
    idealFor: "Revenue teams needing dependable sender health and email-first conversion",
    edge: "Balances campaign automation with proactive domain safety guardrails",
    competitorFocus: "Broad sales engagement coverage across channels",
    competitorGap: "Email deliverability ownership can become secondary in multichannel setups",
    emareachWin: "EmaReach puts email performance and sender health at the center of outbound",
    migrationNote: "Move email-first playbooks first, then sync outcomes back into wider sales workflows",
  },
  {
    competitor: "Snov.io",
    slug: "snov-io",
    shortTagline: "Prospecting plus outreach with more advanced deliverability depth",
    idealFor: "Teams that want lead generation and campaign execution under one roof",
    edge: "Pairs cold email operations with stronger inbox placement and reply intent routing",
    competitorFocus: "Lead discovery plus basic outreach in one suite",
    competitorGap: "Advanced email performance teams may outgrow built-in deliverability depth",
    emareachWin: "EmaReach adds enterprise-grade sender protection to outbound execution",
    migrationNote: "Keep lead sourcing where it is and migrate only outreach execution into EmaReach first",
  }
];

function slugVariant(slug: string, size: number): number {
  const score = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return score % size;
}

function buildComparison(seed: ComparisonSeed): ComparisonData {
  const variant = slugVariant(seed.slug, 4);
  const metaAngles = [
    `Compare EmaReach vs ${seed.competitor}. ${seed.competitor} is useful for ${seed.competitorFocus.toLowerCase()}, while EmaReach is built to combine deliverability, campaigns, and reply handling in one workspace.`,
    `Choosing between EmaReach and ${seed.competitor}? If you need more than warm-up, EmaReach adds campaign execution, AI messaging, and clear reply ownership.`,
    `${seed.competitor} can support sender health. EmaReach goes further with outbound execution, intent routing, and pipeline visibility in one platform.`,
    `See how EmaReach outperforms ${seed.competitor} for teams that want inbox safety plus full outbound performance.`,
  ];
  const keywordAngles = [
    `EmaReach vs ${seed.competitor}, switch from ${seed.competitor}, outbound platform alternative, warm-up and campaign tool`,
    `${seed.competitor} alternative, EmaReach comparison, deliverability plus outreach platform, best tool after ${seed.competitor}`,
    `replace ${seed.competitor}, EmaReach outbound suite, cold email warm-up comparison, reply intelligence platform`,
    `EmaReach ${seed.competitor} comparison, full outbound workflow software, sender health and pipeline platform`,
  ];
  const heroAngles = [
    `${seed.competitor} is known for ${seed.competitorFocus.toLowerCase()}. EmaReach goes further: ${seed.emareachWin.toLowerCase()}, so your team can scale outreach without tool sprawl.`,
    `If ${seed.competitor} solves one part of outbound, EmaReach solves the full journey. ${seed.emareachWin}, with stronger ownership from first send to booked meeting.`,
    `${seed.competitor} works best when deliverability is your only priority. EmaReach is built for teams that also need campaign speed, personalization quality, and fast response handling.`,
    `Your team should not choose between inbox safety and pipeline growth. EmaReach combines both, while ${seed.competitor} remains focused on a narrower workflow.`,
  ];

  return {
    competitor: seed.competitor,
    slug: seed.slug,
    pageTitle: `Why teams switch from ${seed.competitor} to EmaReach`,
    metaTitle: `EmaReach vs ${seed.competitor} | Better outbound stack`,
    metaDescription: metaAngles[variant],
    keywords: keywordAngles[variant],
    heroTitle: `EmaReach vs ${seed.competitor}`,
    heroSubtitle: heroAngles[variant],
    scorecards: [
      {
        label: "Email warm-up",
        emareach: "AI-driven warm-up with adaptive send limits, reputation guardrails, and automatic back-off when risk is detected",
        competitor: `${seed.competitorFocus}.`,
      },
      {
        label: "Cold email campaigns",
        emareach: "Full sequencing engine with multi-step cadences, A/B testing, branching logic, and configurable step delays",
        competitor: `${seed.competitorGap}.`,
      },
      {
        label: "AI personalization",
        emareach: "AI rewrites copy per recipient using enrichment data, job title, company signals, and intent context — at any volume",
        competitor: `${seed.competitor} relies more on manual messaging or external personalization tools.`,
      },
      {
        label: "Reply intelligence",
        emareach: "Automatic intent labeling (interested, not now, referral), priority inbox, and instant CRM handoff routing",
        competitor: `${seed.competitor} users often triage replies manually, especially at higher volume.`,
      },
      {
        label: "Deliverability monitoring",
        emareach: "Real-time sender score tracking, blacklist alerts, DKIM/SPF/DMARC auditing, and safe-send automation",
        competitor: `${seed.competitor} provides core monitoring, but with fewer automated safety responses.`,
      },
      {
        label: "Analytics & reporting",
        emareach: "Full-funnel campaign analytics: open rates, click rates, reply rates, positive replies, and meetings booked",
        competitor: `${seed.competitor} reporting is stronger on sender health than on meeting outcomes.`,
      },
      {
        label: "Multi-mailbox management",
        emareach: "Centralized control for unlimited mailboxes with individual health dashboards, rotation, and risk scoring",
        competitor: `${seed.competitor} mailbox control is typically centered on warm-up tasks.`,
      },
      {
        label: "Team & workflow access",
        emareach: "Role-based permissions, shared team inboxes, collaborative reply handling, and webhook/CRM integrations",
        competitor: `${seed.competitor} is generally lighter on role-based collaboration workflows.`,
      },
    ],
    painPoints: [
      `${seed.competitor} works for ${seed.competitorFocus.toLowerCase()}, but ${seed.competitorGap.toLowerCase()}.`,
      `Teams using ${seed.competitor} often stitch multiple tools together for sending, copy, and reply handling.`,
      `Without structured intent routing, positive replies around ${seed.competitor} workflows can wait too long for action.`,
      `${seed.competitor} data usually answers "are we landing in inbox?" more clearly than "which sequence booked the meeting?"`,
      `As outbound complexity grows, ${seed.competitor} users commonly need deeper workflow control and ownership.`,
      `Manual SDR-to-AE handoffs become a bottleneck when ${seed.competitor} is only one part of the stack.`,
    ],
    keyMetrics: [
      { value: "1 Platform", label: "Warm-up + campaigns + reply intelligence" },
      { value: "0 Tool Sprawl", label: "No extra sequencing or triage stack required" },
      { value: "Role-Based", label: "SDR, AE, and RevOps workflows in one workspace" },
      { value: "Real-Time", label: "Sender-risk alerts and reply intent signals" },
    ],
    strengths: [
      `${seed.competitor} is a credible option for teams that mainly need ${seed.competitorFocus.toLowerCase()}.`,
      `${seed.competitor} setup is usually straightforward for lean teams with simple outbound needs.`,
      `It can be a practical first step before a business requires advanced sequencing and routing.`,
      `For inbox trust and basic warm-up outcomes, ${seed.competitor} can deliver dependable value.`,
      `It is strongest when deliverability is the primary goal and full outbound orchestration is not required.`,
    ],
    advantages: [
      `EmaReach outgrows ${seed.competitor} by delivering one workspace for warm-up, campaigns, AI copy, and reply workflows.`,
      `Compared with ${seed.competitor}, EmaReach reduces tool switching and keeps teams operationally aligned.`,
      `EmaReach turns sender-risk signals into automatic send controls, not just dashboard visibility.`,
      `Reply intent in EmaReach is classified and routed quickly, so high-intent leads are acted on faster.`,
      `EmaReach gives leadership cleaner visibility from sequence performance to meeting generation.`,
      `As teams scale past ${seed.competitor}, EmaReach provides the structure needed for repeatable outbound execution.`,
    ],
    migrationSteps: [
      {
        title: "Preserve sender health",
        description:
          "Mirror your existing warm-up schedule and safe-send limits in EmaReach first. Run both platforms in parallel for 5–7 days to confirm inbox placement is stable before making any changes to live campaigns.",
      },
      {
        title: "Import and upgrade campaigns",
        description:
          "Bring over your top-performing sequences and prospect lists. Use EmaReach's AI rewriter to improve message relevance, then run A/B tests focused on positive replies.",
      },
      {
        title: "Configure reply routing",
        description:
          "Set up intent labels and routing rules so positive replies are instantly flagged, assigned to the right rep, and pushed to your CRM or Slack.",
      },
      {
        title: "Optimize with weekly loops",
        description:
          `Use the performance dashboard to identify which sequences, send windows, and subject lines drive the most positive replies. ${seed.migrationNote}.`,
      },
    ],
    faq: [
      {
        question: `Is EmaReach only for teams switching from ${seed.competitor}?`,
        answer:
          `No. Teams use EmaReach as their first outbound stack, as an upgrade from warm-up-focused tools like ${seed.competitor}, or as a consolidation layer replacing separate warm-up, send, and reply systems.`,
      },
      {
        question: "Will migration hurt my inbox placement?",
        answer:
          `Not when done in phases. Replicate your ${seed.competitor} warm-up settings in EmaReach and run both in parallel briefly before full cutover.`,
      },
      {
        question: "Can EmaReach replace multiple outreach tools?",
        answer:
          `Yes. Teams moving from ${seed.competitor} usually consolidate warm-up, sending, personalization, and reply triage into EmaReach.`,
      },
      {
        question: `How does EmaReach's warm-up compare to ${seed.competitor}'s?`,
        answer:
          `EmaReach uses adaptive send limits that react to sender-risk signals and can auto-adjust to protect domain health. Unlike ${seed.competitor}, those signals directly influence campaign pacing and reply priority.`,
      },
      {
        question: "What happens to active campaigns during migration?",
        answer:
          `You do not need to pause everything. Keep active campaigns in your current setup while EmaReach runs in parallel, then cut over sequence-by-sequence from ${seed.competitor}.`,
      },
      {
        question: "Is there a free trial?",
        answer:
          `Yes. EmaReach offers a free trial so your team can compare live results with ${seed.competitor} before committing.`,
      },
    ],
    ctaTitle: `The modern alternative to ${seed.competitor}`,
    ctaBody:
      `${seed.competitor} is useful for focused warm-up workflows. EmaReach is the upgrade when you need complete outbound performance, clear team ownership, and stronger conversion outcomes.`,
    idealFor: seed.idealFor,
    edge: seed.edge,
    shortTagline: seed.shortTagline,
  };
}

export const comparisonsData: ComparisonData[] = comparisonSeeds.map(buildComparison);
export const comparisonSlugs = comparisonsData.map((item) => item.slug);
export const comparisonsBySlug = new Map(comparisonsData.map((item) => [item.slug, item]));

export function getComparisonBySlug(slug: string) {
  return comparisonsBySlug.get(slug);
}
