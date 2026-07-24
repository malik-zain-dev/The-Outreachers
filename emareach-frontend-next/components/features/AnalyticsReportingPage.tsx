import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  GitCompare,
  Layers3,
  LineChart,
  Mail,
  MousePointerClick,
  PieChart,
  Radio,
  ScrollText,
  Send,
  Sparkles,
  Split,
  Target,
  TrendingUp,
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

const productCapabilities = [
  {
    title: "Period-over-period analytics",
    description:
      "Analytics compares the last N days to the previous window of the same length—so you see sent volume, opens, clicks, replies, deliverability, and percentage deltas in one pass.",
    icon: GitCompare,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "All campaigns or one campaign",
    description:
      "Filter metrics across all campaigns or zoom in on one. Timeline charts use the same filter so comparisons stay fair.",
    icon: Filter,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Flexible lookback windows",
    description:
      "Choose common ranges (e.g. 7, 30, 90 days) for summary stats and charts—the same options available in the Analytics view.",
    icon: Calendar,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Daily performance timeline",
    description:
      "Roll up your sends by day for sent, opened, clicked, and replied—powering trend lines and exports, not just headline numbers.",
    icon: LineChart,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Deliverability & engagement rates",
    description:
      "Track sends, bounces, delivered volume, and rates for open, click, and reply. Deliverability reflects how much of your attempted volume actually went through.",
    icon: PieChart,
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "CSV export",
    description:
      "Export summary metrics plus per-day performance from the Analytics UI—share with leadership or archive snapshots outside the app.",
    icon: Download,
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Sending behavior breakdowns",
    description:
      "See volume by hour of day, by inbox, and by campaign over a window—plus at-a-glance insights: total sent, peak hour, top inbox, and top campaign.",
    icon: BarChart3,
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Best time to send (open-rate based)",
    description:
      "Analyze open rate by local hour in a timezone you choose, optionally for one campaign, over up to a year of history—surfaces top hours with enough volume to be meaningful.",
    icon: Clock,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    title: "Campaign summary stats",
    description:
      "Per-campaign view: delivered sends, opens, clicks, replies, complaint rate, and domain-linked health score—using delivered sends as the basis for fair funnel math.",
    icon: Target,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
  },
  {
    title: "Per-template & A/B stats",
    description:
      "Stats for each email template line up with campaign totals—so sequence steps and A/B variants are comparable in one table.",
    icon: Split,
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/40",
  },
  {
    title: "Activity feed & message history",
    description:
      "Recent account activity blends campaigns, contacts, domains, inboxes, and sends. Browse individual messages when you need to go from high-level analytics down to a specific email.",
    icon: ScrollText,
    gradient: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-500/10",
    border: "hover:border-slate-500/40",
  },
  {
    title: "Dashboard roll-ups",
    description:
      "The dashboard surfaces today’s send count, rolling rates with period change, average domain health, and a live activity stream—so executives get a pulse without opening every report.",
    icon: Radio,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600",
    iconBg: "bg-green-500/10",
    border: "hover:border-green-500/40",
  },
];

const keyMetrics = [
  {
    label: "Comparison model",
    value: "vs prior period",
    note: "Current window compared to the same-length window before it.",
    icon: GitCompare,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Engagement stack",
    value: "Open → click → reply",
    note: "Statuses roll up so funnels reflect real email behavior.",
    icon: MousePointerClick,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Operational view",
    value: "Inbox & hour",
    note: "See where volume concentrates across senders and time of day.",
    icon: Clock,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Campaign depth",
    value: "Template rows",
    note: "Break down winners for A/B and multi-step sequences.",
    icon: Layers3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Spreadsheets that never match the sending system of record.",
  "Open rate vanity metrics without reply or complaint context.",
  "No idea which inbox or hour is doing the heavy lifting.",
  "A/B tests tracked in slides instead of next to the campaign.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Open Analytics: pick a date range and optionally one campaign. Review period-over-period deltas for sent, rates, and deliverability.",
  },
  {
    step: "02",
    text: "Read the daily timeline and charts—spot spikes, dips, or odd days worth investigating.",
  },
  {
    step: "03",
    text: "Use sending-by-inbox and sending-by-hour (and insights) to align capacity and scheduling with actual behavior.",
  },
  {
    step: "04",
    text: "Run best-send-time analysis in your audience’s timezone when you have enough sends for stable hourly open rates.",
  },
  {
    step: "05",
    text: "On a campaign, open stats-by-template / A/B views to promote winners and fix weak steps—then export CSV for stakeholders if needed.",
  },
];

const teamOutcomes = [
  {
    team: "Founders & lean teams",
    result:
      "One analytics surface tied to real sends—no duct-taped BI for core outbound KPIs.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR & growth",
    result:
      "Hourly and inbox splits show where to add capacity; template stats show what copy to scale.",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "RevOps & agencies",
    result:
      "Exports, campaign filters, and consistent rate definitions make reporting repeatable across clients.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "One source of truth",
    description:
      "Metrics come from the same sends and engagement your campaigns produce in EmaReach—nothing is pasted in by hand.",
    icon: Mail,
  },
  {
    title: "Two levels of drill-down",
    description:
      "Account-wide analytics for trends; campaign-level stats and per-template rows for creative and sequence decisions.",
    icon: Layers3,
  },
  {
    title: "Operational + strategic",
    description:
      "Sending insights and best-time analysis complement funnel metrics so you optimize both infrastructure and messaging.",
    icon: Sparkles,
  },
  {
    title: "Dashboard + deep dive",
    description:
      "High-level cards and activity on the dashboard; full charts, exports, and breakdowns on the Analytics page.",
    icon: BarChart3,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Trend context",
    basic: "Static totals",
    emareach: "Current vs previous period with % change",
  },
  {
    label: "Scope",
    basic: "One spreadsheet per campaign",
    emareach: "All campaigns or one campaign + shared definitions",
  },
  {
    label: "Sending ops",
    basic: "Guess peak times",
    emareach: "Hourly, per-inbox, per-campaign volume + insights",
  },
  {
    label: "Creative testing",
    basic: "Manual A/B notes",
    emareach: "Per-template stats aligned to campaign totals",
  },
];

const pillarCards = [
  {
    title: "Funnel metrics",
    subtitle: "Delivery → reply",
    body: "Sent, failed, delivered, opens, clicks, replies, and complaint-aware campaign stats—with health context from linked domains.",
    icon: Send,
    accent: "from-violet-500/30 to-purple-500/20",
  },
  {
    title: "Sending intelligence",
    subtitle: "When & where",
    body: "Distributions by hour and inbox expose bottlenecks and overload before they hurt deliverability.",
    icon: Clock,
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "Iteration",
    subtitle: "Templates & time",
    body: "Template-level rows and best-hour analysis turn charts into the next experiment—what to send and when.",
    icon: Sparkles,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const faqItems = [
  {
    q: "How is “deliverability” calculated in analytics?",
    a: "The summary compares successfully delivered sends to your total attempts for the period, expressed as a percentage—with period-over-period change like your other headline metrics.",
  },
  {
    q: "Can I analyze a single campaign?",
    a: "Yes. In Analytics you can focus on a single campaign (including when you open a link that already has a campaign selected). Timelines, best send time, and the summary can all follow that same scope.",
  },
  {
    q: "How do campaign stats differ from global analytics?",
    a: "Campaign-specific stats use delivered emails as the denominator for open, click, reply, and complaint rates, and can include a health score from the campaign’s domain. Global analytics compare windows across all or filtered activity.",
  },
  {
    q: "What is per-template reporting for?",
    a: "It breaks out opens, clicks, and replies for each email template so A/B variants and sequence steps can be compared fairly—without counting failed sends twice.",
  },
  {
    q: "Can I export data?",
    a: "The in-app Analytics view includes CSV export of the summary and daily breakdown for the selected scope and range.",
  },
  {
    q: "What does best send time use?",
    a: "It ranks local hours by open rate in a timezone you choose, with optional campaign scoping and a minimum-send threshold so suggestions are not noise.",
  },
];

function FunnelMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/25 via-violet-500/20 to-cyan-500/20 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-sm">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Engagement funnel (illustrative)
        </p>
        <div className="space-y-3">
          {[
            { label: "Sent", w: "100%", c: "bg-primary/80" },
            { label: "Opened", w: "42%", c: "bg-violet-500/70" },
            { label: "Clicked", w: "18%", c: "bg-blue-500/70" },
            { label: "Replied", w: "9%", c: "bg-emerald-500/70" },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>{row.label}</span>
                <span className="font-mono text-[0.65rem] opacity-70">illustrative</span>
              </div>
              <div className="h-9 overflow-hidden rounded-lg bg-muted/50">
                <div className={`h-full ${row.c}`} style={{ width: row.w }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[0.7rem] text-muted-foreground">
          In EmaReach, your charts and rates reflect real sends and engagement—not demo numbers.
        </p>
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
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Measure once. Improve every launch.</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Tie reporting to the same sends your team already runs—then iterate with template-level truth and scheduling
              insight.
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

export function AnalyticsReportingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Analytics &amp; reporting
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Reporting built on{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  every send
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
              not a spreadsheet
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Period-over-period KPIs, daily timelines, CSV export, sending breakdowns by inbox and hour, best-time
              analysis, campaign and per-template stats, activity feeds, and dashboard roll-ups—grounded in what you
              actually send from EmaReach.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Here is what you get in the product today—not a generic reporting wish list.
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

          <FunnelMock />

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
              Three lenses
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Funnel, operations, creative</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              One connected view—so GTM sees outcomes while operators see where volume and timing pile up.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Analytics &amp; reporting capabilities</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Reporting capabilities built into the product for outbound measurement.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From overview to template rows</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[280px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <LineChart className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">Analytics workspace</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Interactive charts, campaign selector, 7/30/90-day windows, deliverability visualization, and one-click
                  CSV export—everything tied to the same date range and campaign scope.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                <Link href="/features/campaign-automation-sequences" className="inline-flex items-center gap-1 hover:underline">
                  Pair with sequences &amp; A/B <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Split className="mb-3 h-6 w-6 text-fuchsia-500" />
                <h4 className="font-semibold">Per-template stats</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Aligns delivered counts with campaign totals—essential for comparing subject/body variants and sequence
                  steps honestly.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Clock className="mb-3 h-6 w-6 text-orange-500" />
                <h4 className="font-semibold">Best send time</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Open-rate-weighted hours in the timezone you pick; filter to one campaign when you are isolating a
                  motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why teams centralize reporting here</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              When numbers come from the sending system, RevOps spends less time reconciling—and more time improving.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Topic</span>
              <span className="text-center text-muted-foreground">Typical stack</span>
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
              Honest measurement
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Fix broken reporting habits</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">What usually goes wrong</h3>
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
              <h3 className="mb-6 text-xl font-semibold">What EmaReach provides</h3>
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
              How teams use it
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From analytics to the next test</h2>
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
                    href="/features/deliverability-warmup"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    Deliverability &amp; warm-up
                  </Link>
                  <Link
                    href="/features/ai-writing-personalization"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    AI writing &amp; personalization
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Analytics questions</h2>
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
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Data-backed GTM</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            See what works—then{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              scale it deliberately
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Aggregate trends, operational breakdowns, and template-level truth in one place—so every launch learns from
            the last.
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
            Founders, SDR teams, agencies, and RevOps—same metrics, your accounts.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
