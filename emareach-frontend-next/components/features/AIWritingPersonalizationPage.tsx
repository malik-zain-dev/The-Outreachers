import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  CheckCircle2,
  Clock3,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  Flame,
  Layers3,
  LayoutTemplate,
  Mail,
  MailCheck,
  MessageSquare,
  PenLine,
  RefreshCw,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Wand2,
  Workflow,
  Zap,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesCta } from "./FeaturesCta";
import { FeaturesTestimonials } from "./FeaturesTestimonials";

/** Product-accurate capabilities shipped in EmaReach (writing + personalization). */
const productCapabilities = [
  {
    title: "Spintax that resolves on every send",
    description:
      "Use {Hi|Hello|Hey} and {option A|option B} syntax in subject and body. We resolve spintax first, then merge fields—so variation feels natural, not robotic.",
    icon: Braces,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Merge fields & custom contact data",
    description:
      "Personalize with {{first_name}}, {{company}}, {{industry}}, {{email}}, and any custom columns from your lists. One template, infinite unique sends.",
    icon: Users2,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Per-contact AI email variation",
    description:
      "Turn on AI generation at the campaign level: each recipient can get a unique subject and body variation from your LLM, grounded in contact context—with fallback to spintax if anything fails.",
    icon: Bot,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "AI Campaign Studio",
    description:
      "Describe your offer and audience; get structured JSON templates with subject, body, allowed merge variables from the list you pick, and spintax baked into the prompt.",
    icon: LayoutTemplate,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Template builder AI",
    description:
      "Generate full templates from a prompt: name, subject, and body with HTML or plain text, plus guidance for placeholders and spintax so your drafts are send-ready.",
    icon: Wand2,
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Prompt library & automatic prompts",
    description:
      "Start from proven prompt patterns for sequences, bumps, replies, and personalization snippets—aligned with merge variables and spin-friendly HTML.",
    icon: MessageSquare,
    gradient: "from-violet-500/20 to-indigo-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Warmup template AI",
    description:
      "Describe what a warmup email should say; AI returns subject + body with warmup-only merge fields and spintax—same rules as campaign templates, tuned for deliverability.",
    icon: Flame,
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    title: "Bring your own LLM",
    description:
      "Connect OpenAI, Anthropic, Gemini, DeepSeek, Grok, Groq, and more in Settings → Integrations. Use the models you already trust for generation and variation.",
    icon: Cpu,
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Live preview: spintax → then merge",
    description:
      "See exactly how a random spintax pick and sample contact data look before you launch—so reps trust what goes out the door.",
    icon: RefreshCw,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
  },
  {
    title: "HTML & plain text, deliverability-aware",
    description:
      "Generate and send rich HTML with inline styles or plain text. Prompts guide AI away from risky patterns and toward inbox-friendly structure.",
    icon: Code2,
    gradient: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-500/10",
    border: "hover:border-slate-500/40",
  },
];

const keyMetrics = [
  {
    label: "Launch speed",
    value: "Minutes",
    note: "From brief to templates and sequences without a copywriting sprint.",
    icon: Clock3,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Personalization depth",
    value: "List + AI",
    note: "Merge fields for facts; optional AI for nuanced variation per contact.",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Message variety",
    value: "Spintax + AI",
    note: "Random phrasing and LLM rewrites reduce “same email” fatigue.",
    icon: Layers3,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Iterate with data",
    value: "Campaigns",
    note: "Pair writing tools with analytics to double down on what wins.",
    icon: BarChart3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Mail merge that still sounds like one blast to thousands.",
  "AI tools that ignore deliverability and your CRM fields.",
  "No safe way to add variation without rewriting every line.",
  "Teams stuck between generic templates and endless manual edits.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Connect your LLM provider(s) in Settings so AI generation and variation use your keys and models.",
  },
  {
    step: "02",
    text: "Build or import contacts; map fields so {{first_name}}, {{company}}, and custom attributes flow into templates.",
  },
  {
    step: "03",
    text: "Draft in the template builder or AI Campaign Studio—add spintax, merge tags, and HTML or plain text.",
  },
  {
    step: "04",
    text: "Optionally enable per-contact AI variation on the campaign so each send can be uniquely phrased from shared context.",
  },
  {
    step: "05",
    text: "Preview (spintax rolls, then placeholders), launch, and refine using opens, replies, and step performance.",
  },
];

const teamOutcomes = [
  {
    team: "Founders & lean GTM",
    result:
      "Ship credible outbound without hiring a copy desk—spintax and AI cover scale; merge fields keep it factual.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR & AE teams",
    result:
      "One approved playbook, many natural variations. Less time writing, more time in conversations.",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Agencies & consultants",
    result:
      "Multi-client campaigns with consistent quality: list-driven personalization plus AI where clients want it.",
    icon: PenLine,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "One pipeline: data → copy → send",
    description:
      "Contacts, templates, and campaigns live together so merge fields and AI never drift from the list you actually send to.",
    icon: Database,
  },
  {
    title: "Guardrails you control",
    description:
      "Choose when AI runs (template generation vs. send-time variation), which provider to use, and fallback behavior.",
    icon: Settings2,
  },
  {
    title: "Quality and tone in the loop",
    description:
      "Prompts emphasize deliverability-safe structure, placeholder preservation, and brand-consistent output.",
    icon: FileCheck2,
  },
  {
    title: "Fits your outbound motion",
    description:
      "Cold sequences, follow-ups, warmup, and prompt-assisted workflows—same personalization engine across the stack.",
    icon: Workflow,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Variation",
    basic: "Static mail merge only",
    emareach: "Spintax + optional per-contact AI rewrites",
  },
  {
    label: "Data in the copy",
    basic: "Limited fields",
    emareach: "Standard + custom list fields, resolved at send",
  },
  {
    label: "AI placement",
    basic: "Generic chat outside send flow",
    emareach: "Studio, templates, warmup, and campaign send path",
  },
  {
    label: "Preview",
    basic: "Guess and hope",
    emareach: "Spintax roll + sample merge preview",
  },
];

const pillarCards = [
  {
    title: "Spintax",
    subtitle: "Natural variation",
    body: "Each `{option1|option2}` pick happens at send time. Nested spintax works with merge tags so you can vary openings while keeping {{company}} accurate.",
    icon: Braces,
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    title: "Merge fields",
    subtitle: "Ground truth",
    body: "Pull from contact records and custom columns—so every line reflects real data, not a mail-merge hallucination.",
    icon: Mail,
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "AI layers",
    subtitle: "When you need more",
    body: "Generate full templates, warmup copy, or per-recipient variations with your LLM—always with structure that respects placeholders and deliverability.",
    icon: Sparkles,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const faqItems = [
  {
    q: "What is spintax and why use it?",
    a: "Spintax is `{Hi|Hello|Hey}`-style syntax. One random option is chosen per email so your copy varies without maintaining dozens of templates. EmaReach resolves spintax before merge fields.",
  },
  {
    q: "How does merge field personalization work?",
    a: "You insert placeholders like {{first_name}} and {{company}} in subject or body. At send time they are replaced from each contact’s row—including custom fields from your lists.",
  },
  {
    q: "When does AI rewrite each email?",
    a: "You can generate drafts in the template builder or AI Campaign Studio. For campaigns, you can enable AI to produce a unique variation per contact at send time, using provider settings and your prompt—with fallback to your template if needed.",
  },
  {
    q: "Which AI providers are supported?",
    a: "You connect the providers you use (e.g. OpenAI, Anthropic, Google Gemini, DeepSeek, xAI Grok, Groq) via API keys in Integrations. Generation uses your configured models.",
  },
  {
    q: "Does warmup use the same personalization rules?",
    a: "Yes. Warmup templates support spintax and warmup-specific merge fields (sender/receiver), with AI-assisted generation when you want a neutral, human-like message.",
  },
  {
    q: "Is HTML email supported?",
    a: "Yes. AI prompts and the builder support HTML with inline styles for client compatibility, or plain text when you want maximum simplicity.",
  },
];

function EmailPreviewMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-lg">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/40 via-violet-500/30 to-cyan-500/30 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 text-xs font-medium text-muted-foreground">Live preview</span>
        </div>
        <div className="space-y-4 p-5 text-left text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Subject
            </p>
            <p className="mt-1 font-medium text-foreground">
              <span className="text-violet-500 dark:text-violet-400">Quick idea</span> for{" "}
              <span className="rounded bg-primary/10 px-1 font-mono text-xs text-primary">
                {"{{company}}"}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
            <span className="text-emerald-600 dark:text-emerald-400">{"{Hi|Hello}"}</span>{" "}
            <span className="text-primary">{"{{first_name}}"}</span>,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {"{saw your post on growth|noticed your Series A}"}
            </span>
            …
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">
              <RefreshCw className="h-3 w-3" />
              Spintax first
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
              <Users2 className="h-3 w-3" />
              Then merge fields
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">
              <Bot className="h-3 w-3" />
              Optional AI variation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderStrip() {
  const labels = [
    "OpenAI",
    "Anthropic",
    "Gemini",
    "DeepSeek",
    "Grok",
    "Groq",
  ];
  return (
    <div className="border-y border-border bg-muted/20 py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Works with the models you already use
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {labels.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-violet-500/10 to-cyan-500/10" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stop losing deals to generic copy
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Pair list-based personalization with spintax and AI—so every touch feels human, scales with your team, and
              stays on brand.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AIWritingPersonalizationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI Writing &amp; Personalization
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Cold email that sounds{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  written for one person
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
              at any scale
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Spintax, merge fields, and your own LLM—wired into templates, AI Campaign Studio, warmup, and optional
              per-contact variation at send time. Everything you need to personalize without burning out your team.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              No credit card to explore core flows. Connect providers when you are ready for AI generation.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
              Try for Free
              </Link>
            </div>
          </div>

          <EmailPreviewMock />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <article
                key={metric.label}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mb-3 inline-flex rounded-xl ${metric.bg} p-2.5 ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-base font-bold text-foreground">{metric.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProviderStrip />

      {/* ── THREE PILLARS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              The engine
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three layers. One cohesive send.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Most tools stop at mail merge. EmaReach stacks spintax, CRM-grade fields, and AI so variation and accuracy
              coexist.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillarCards.map((p) => (
              <article
                key={p.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`}
                />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.subtitle}</p>
                  <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL PRODUCT GRID ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              In the product today
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything we ship for writing &amp; personalization</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Not a roadmap slide—real features you can use in EmaReach to draft, vary, and send smarter outbound.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {productCapabilities.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 ${item.border} hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-xl ${item.iconBg} p-3 ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO: STUDIO + CAMPAIGN AI ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How teams close the loop
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From draft to inbox, without the chaos</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[320px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <LayoutTemplate className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">AI Campaign Studio</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Describe the campaign; get structured JSON with name, subject, and body. Prompts respect your selected
                  list’s merge variables, encourage spintax, and keep HTML deliverable—so you move from idea to sequence
                  faster.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                <Link href="/signup" className="inline-flex items-center gap-1 hover:underline">
                  Try it in the product <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Send className="mb-3 h-6 w-6 text-emerald-500" />
                <h4 className="font-semibold">Send-time AI variation</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enable AI generation on the campaign: each contact can receive a unique subject/body variation grounded
                  in name, company, industry, and more—with safe fallback to your template.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Flame className="mb-3 h-6 w-6 text-orange-500" />
                <h4 className="font-semibold">Warmup + templates</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Warmup emails use the same spintax and merge rules—plus AI write when you want neutral, human-like copy
                  for inbox reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why teams pick EmaReach over basic merge</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Personalization is not just inserting a first name—it is controlled variation plus data you trust.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Capability</span>
              <span className="text-center text-muted-foreground">Typical mail merge</span>
              <span className="text-center text-primary">EmaReach</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-0 border-b border-border px-4 py-4 text-sm last:border-0 sm:px-6"
              >
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="text-center text-muted-foreground">{row.basic}</span>
                <span className="text-center font-medium text-foreground">{row.emareach}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN + PLATFORM ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Real challenges
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for outbound that has to perform</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-sm">⚠️</span>
                <h3 className="text-xl font-semibold">What breaks reply rates</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </span>
                <h3 className="text-xl font-semibold">How the platform fixes it</h3>
              </div>
              <div className="mt-6 space-y-3">
                {platformDetails.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW + TEAMS ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Your workflow
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From LLM setup to live send</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">How it works in EmaReach</h3>
              <ol className="space-y-0">
                {workflowSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
                        {item.step}
                      </div>
                      {i < workflowSteps.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
                    </div>
                    <p className="pb-6 pt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Who it is for</h3>
              <div className="space-y-4">
                {teamOutcomes.map((item) => (
                  <div
                    key={item.team}
                    className="flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.team}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Output types
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cold outreach",
                    "Multi-step sequences",
                    "Follow-ups & bumps",
                    "Warmup emails",
                    "Subject line variants",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions buyers ask</h2>
            <p className="mt-4 text-muted-foreground">Straight answers about spintax, AI, and how sends work.</p>
          </div>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card px-4 shadow-sm sm:px-6">
            {faqItems.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border/80">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <MidPageCta />

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <MailCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Ready when you are</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Turn personalization into{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              pipeline you can forecast
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Join teams using EmaReach to combine spintax, CRM-grade merge fields, and AI—without sacrificing deliverability
            or control.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Try for Free
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users2 className="h-4 w-4" />
            Founders, SDR teams, agencies, and RevOps—same platform, your voice.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
