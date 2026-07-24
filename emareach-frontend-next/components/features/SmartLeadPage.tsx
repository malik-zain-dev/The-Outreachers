import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  Gauge,
  History,
  ListPlus,
  MailCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesCta } from "./FeaturesCta";
import { FeaturesTestimonials } from "./FeaturesTestimonials";

/** Smart Leads capabilities as implemented (contacts → Smart Leads, API, pipeline). */
const productCapabilities = [
  {
    title: "Ideal customer profile you control",
    description:
      "Describe who you want: company or site, industry, geography, size, job titles, keywords, and free-form notes—or paste a focused search phrase when you want full control over how discovery runs.",
    icon: Target,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Bring your own search connection",
    description:
      "Discovery uses web search through an integration you enable in Settings. Until that is connected, Smart Leads stays paused—so you stay in control of credentials and usage.",
    icon: Search,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Your AI model choice",
    description:
      "Runs use the AI provider you already configured for the workspace (same pattern as other AI features). You pick the model; the pipeline uses it for query generation, structuring results, and email suggestions.",
    icon: Sparkles,
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/40",
  },
  {
    title: "Full discovery pipeline (background job)",
    description:
      "A run walks through stages you can watch live: AI suggests company search queries angled at buyer and customer-side results (not competitor marketing pages), searches the web, normalizes companies, generates people-focused queries per company, finds people, then suggests work emails—with pacing between AI calls to stay provider-friendly.",
    icon: Gauge,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Email suggestions with validation",
    description:
      "Candidate work emails are checked for basic syntax and mail-server reachability (so you get a practical shortlist, not a raw scrape dump). Stats surface how many companies, people, and validated emails the run produced.",
    icon: MailCheck,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Stop, resume, and history",
    description:
      "Cancel a long run when you have enough, or continue a run that stopped partway—the product resumes from saved progress where possible. Past runs stay listed so you can reopen results.",
    icon: History,
    gradient: "from-sky-500/20 to-indigo-500/20",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
  },
  {
    title: "Export and push into contacts",
    description:
      "Download joined company, person, and email data as CSV or JSON. You can also create a named contact list from discovered emails so the same people flow straight into campaigns and sequences.",
    icon: Download,
    gradient: "from-rose-500/20 to-red-500/10",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Optional quick preview (discover)",
    description:
      "A lighter path runs a single search plus AI analysis: what the results mean for your ICP, which links look strongest, ideas for follow-up searches, and angles you could use in outreach—without starting a full multi-stage run.",
    icon: Zap,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
];

const keyMetrics = [
  {
    label: "Targeting",
    value: "ICP fields",
    note: "Industry, geo, roles, keywords, notes, optional search phrase.",
    icon: Target,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Pipeline",
    value: "Companies → people",
    note: "Search, normalize, then people and email suggestions per company.",
    icon: Building2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Quality bar",
    value: "Validated emails",
    note: "Syntax and mail-server checks on suggested work addresses.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Handoff",
    value: "CSV + lists",
    note: "Export files or create contact lists for campaigns.",
    icon: ListPlus,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Buying static lead lists that do not match your real ICP.",
  "Hours of manual Googling and spreadsheet copy-paste before a campaign.",
  "No clear stage progress when a long discovery job is running.",
  "Hard to move from “found someone” to “in my sequencer” without another tool.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Connect search in Settings and configure at least one AI provider for your account.",
  },
  {
    step: "02",
    text: "Open Smart Leads under Contacts and describe your audience—or use an optional single-line search override for precise queries.",
  },
  {
    step: "03",
    text: "Start a run with limits you set (how deep to search, how many email candidates to validate). Watch stage and progress while it works.",
  },
  {
    step: "04",
    text: "Review companies, people, and suggested emails. Export to CSV or JSON, or create a contact list for outreach.",
  },
  {
    step: "05",
    text: "Layer campaigns, templates, and sequences on top—same workspace, fewer handoffs.",
  },
];

const teamOutcomes = [
  {
    team: "Founders & small teams",
    result:
      "Stand up a credible prospect list from an ICP description without a separate prospecting stack.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR & growth",
    result:
      "Replace one-off search marathons with repeatable runs, history, and exports your reps can trust.",
    icon: Users2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Agencies",
    result:
      "Tune audience fields per client, keep runs auditable, and hand prospects to lists and campaigns in one product.",
    icon: Building2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "Tunable depth",
    description:
      "Control how many search pages and queries to use for companies and people, plus caps on people per company and total email candidates—so cost and runtime match the job.",
    icon: Gauge,
  },
  {
    title: "Deduping and fit",
    description:
      "The pipeline deduplicates companies and people where possible and steers AI away from obvious competitor-vendor noise when the goal is finding customers.",
    icon: CheckCircle2,
  },
  {
    title: "Operational safety",
    description:
      "AI calls run sequentially with small delays to reduce rate-limit surprises on long jobs—built for real provider behavior, not lab demos.",
    icon: ShieldCheck,
  },
  {
    title: "Same product as sending",
    description:
      "Discovered contacts can land in your contact lists and feed the same sequences, analytics, and inbox tools as the rest of EmaReach.",
    icon: Sparkles,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Lead source",
    basic: "Generic purchased lists",
    emareach: "ICP-driven discovery with your own search + AI pipeline",
  },
  {
    label: "Transparency",
    basic: "Black box rows",
    emareach: "Stages, stats, and reopen past runs",
  },
  {
    label: "Email quality",
    basic: "Unverified strings",
    emareach: "Suggested emails with validation signals",
  },
  {
    label: "Next step",
    basic: "Re-import elsewhere",
    emareach: "Export or create lists inside EmaReach",
  },
];

const pillarCards = [
  {
    title: "Describe who you want",
    subtitle: "ICP in plain language",
    body: "Fields map to how the product builds context for search and AI—so you are not stuck with a single rigid filter set.",
    icon: Target,
    accent: "from-violet-500/30 to-purple-500/20",
  },
  {
    title: "Run the pipeline",
    subtitle: "Search + structure + email ideas",
    body: "From company discovery through people and work-email suggestions, with validation and progress you can follow.",
    icon: Search,
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "Use the results",
    subtitle: "Export or lists",
    body: "CSV and JSON for your stack, or a one-click path into contact lists for campaigns.",
    icon: Download,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const faqItems = [
  {
    q: "What is Smart Leads in EmaReach?",
    a: "It is an AI-assisted prospecting flow: you describe your ideal customer, the product searches the open web using your connected search integration, structures companies and people, suggests work emails with validation, and lets you export or save contacts to lists.",
  },
  {
    q: "Do I need to connect anything before it works?",
    a: "Yes. Web search runs through an integration you enable in Settings. You also need a configured AI provider for the workspace—the same kind of setup used elsewhere in the product.",
  },
  {
    q: "How is this different from importing a CSV?",
    a: "Imports bring whatever you already have. Smart Leads generates new candidates from your ICP and search, with pipeline stages and validation—then you can still export CSVs if you want.",
  },
  {
    q: "Can I stop a run early?",
    a: "You can cancel in progress. The run keeps partial progress where the pipeline allows, and you can continue certain failed runs from saved state.",
  },
  {
    q: "What does “validated” email mean here?",
    a: "The product checks suggested addresses for basic format and whether the domain’s mail setup looks reachable—helpful for filtering, not a guarantee the person still works there.",
  },
  {
    q: "Where do contacts go after a run?",
    a: "You can download exports or create a named contact list from discovered emails so those people are available for campaigns and the rest of the platform.",
  },
];

function SmartLeadFlowMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/20 to-cyan-500/25 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">Discovery run</span>
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">
            Live stages
          </span>
        </div>
        <div className="grid gap-2 p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Companies</p>
            <p className="mt-1 text-xs text-foreground">Search → normalize</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">People</p>
            <p className="mt-1 text-xs text-foreground">Per-company queries</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/30 p-3 sm:col-span-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Emails</p>
            <p className="mt-1 text-xs text-foreground">Suggestions + validation · progress &amp; stats</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">
            ICP fields
          </span>
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
            AI + search
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-800 dark:text-emerald-200">
            Export / lists
          </span>
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
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">From ICP to contact list—without another tool</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Connect search, run Smart Leads, then feed campaigns and sequences from the same workspace.
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

export function SmartLeadPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Search className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Smart Leads</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Turn your ICP into{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  reachable prospects
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Describe who you want to reach. EmaReach uses AI and web search (via your connected integration) to find
              companies and people, suggest work emails with validation, and let you export or save straight into contact
              lists—then run campaigns on top.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Below reflects what ships today: audience fields, background pipeline with live progress, history,
              exports, and list creation—not generic “lead gen” promises.
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

          <SmartLeadFlowMock />

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

      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it fits together
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">ICP, discovery, then outreach</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Smart Leads fills the top of the funnel inside EmaReach—before templates, sequences, and inbox replies.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillarCards.map((p) => (
              <article
                key={p.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`} />
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              In the product today
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Smart Leads capabilities</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              What the Contacts experience and backend actually do—grounded in the live pipeline.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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

      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">Deep dive</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From search results to lists you can mail</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[280px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">Structured companies and people</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  The pipeline does not stop at raw links. AI helps turn search hits into normalized companies, then finds
                  people and suggests emails—so your export is closer to a usable sheet than a dump of URLs.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                <Link href="/features/campaign-automation-sequences" className="inline-flex items-center gap-1 hover:underline">
                  Automate follow-up once contacts are in lists <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <MailCheck className="mb-3 h-6 w-6 text-amber-500" />
                <h4 className="font-semibold">Validation, not vanity counts</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Candidate emails go through checks so you can prioritize plausible work addresses before you send.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Sparkles className="mb-3 h-6 w-6 text-violet-500" />
                <h4 className="font-semibold">AI writing elsewhere</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  After prospects are in your lists, use EmaReach AI templates and personalization for the actual outreach
                  copy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why teams use in-product discovery</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Lists alone do not run campaigns. EmaReach connects discovery to the rest of the stack.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Topic</span>
              <span className="text-center text-muted-foreground">Typical setup</span>
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

      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Operations
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What breaks without a real pipeline</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Common failure modes</h3>
              <ul className="space-y-4">
                {commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">How Smart Leads addresses them</h3>
              <div className="space-y-3">
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              From ICP to campaign
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How teams use it</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Typical flow</h3>
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Related</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/features/ai-writing-personalization"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    AI writing &amp; personalization
                  </Link>
                  <Link
                    href="/features/unified-inbox-replies"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    Unified inbox &amp; replies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Smart Leads questions</h2>
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

      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <Target className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Top of funnel</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Build pipeline from{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              a clear ICP—not a stale CSV
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Connect search, run discovery inside EmaReach, validate and export, then launch sequences and track replies in
            one place.
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
            Smart Leads lives under Contacts once you are in the app—Pro-gated in the product navigation.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
