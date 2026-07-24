import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  GitBranch,
  Layers3,
  MailCheck,
  MessageCircle,
  PauseCircle,
  Radio,
  RefreshCw,
  Route,
  Send,
  Settings2,
  ShieldCheck,
  Split,
  Target,
  Users2,
  Webhook,
  Workflow,
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

/** Capabilities implemented in EmaReach for campaigns & sequences (aligned with backend + app). */
const productCapabilities = [
  {
    title: "Multi-step email sequences",
    description:
      "Each campaign is an email sequence: add steps with a template and delay in days. Step 1 is typically delay 0; follow-ups schedule after the previous send. Reorder or remove steps anytime.",
    icon: Layers3,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "A/B variants per sequence step",
    description:
      "Put multiple templates on the same delay— the system groups them as variants for that step. Analytics compare opens, clicks, and replies; an A/B winner can be selected for ongoing sends.",
    icon: Split,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Stops follow-ups when someone replies",
    description:
      "If a contact has a replied log on the campaign thread, they are not eligible for the next step—so you do not keep emailing people who already engaged.",
    icon: MessageCircle,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Campaign daily limit + per-inbox caps",
    description:
      "Set a max emails per day for the campaign across all inboxes. Per-inbox daily limits apply too—EmaReach enforces both so you stay within reputation-safe volume.",
    icon: Target,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Send windows & weekday schedule",
    description:
      "Define start/end time and timezone, and which weekdays sends are allowed. Batching respects the window instead of blasting at odd hours.",
    icon: CalendarClock,
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Multi-inbox sending & rotation",
    description:
      "Attach multiple Gmail or SMTP inboxes to a campaign. Choose round-robin or random rotation, and optionally sticky sending so follow-ups can use the same inbox as the prior step.",
    icon: RefreshCw,
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Reply-To routing",
    description:
      "Configure Reply-To per campaign: default inbox, specific Gmail/IMAP inbox, custom address, or none—so replies land where your team expects.",
    icon: MailCheck,
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Compliance before go-live",
    description:
      "Templates are checked for links, unsubscribe expectations, and risky wording (per your compliance settings) before you launch—reducing last-minute surprises.",
    icon: ShieldCheck,
    gradient: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-500/10",
    border: "hover:border-slate-500/40",
  },
  {
    title: "Workflows on campaign & email events",
    description:
      "Build automations triggered when a campaign starts, or when an email is sent, opened, or replied—scoped to campaign, list, contact, or global. Compose nodes for waits, branches, and actions.",
    icon: Workflow,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    title: "Webhooks & integrations",
    description:
      "Email sends can trigger webhooks alongside workflows—so your stack gets notified for downstream CRM or analytics flows.",
    icon: Webhook,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
  },
  {
    title: "Step-level analytics & progress",
    description:
      "Track sends, opens, clicks, and replies per template and sequence step. Contact views show how far each person moved through the sequence.",
    icon: BarChart3,
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/40",
  },
  {
    title: "AI Campaign Studio (sequence drafting)",
    description:
      "Use AI Campaign Studio to describe your offer and generate multi-step sequences with templates—then attach lists and sending rules when you are ready to launch.",
    icon: Radio,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600",
    iconBg: "bg-green-500/10",
    border: "hover:border-green-500/40",
  },
];

const keyMetrics = [
  {
    label: "Sequence structure",
    value: "Steps + delays",
    note: "Linear follow-ups with day-based gaps—clear and predictable.",
    icon: Route,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Send safety",
    value: "Limits + windows",
    note: "Campaign cap plus inbox caps and business-hour windows.",
    icon: Clock3,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Conversation-aware",
    value: "Reply = stop",
    note: "Contacts who reply are excluded from the next automated step.",
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Beyond the inbox",
    value: "Workflows",
    note: "Automate actions when campaigns or emails fire key events.",
    icon: GitBranch,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Follow-ups go out after someone already replied—damaging trust.",
  "No visibility into which step or variant actually performs.",
  "Sending too fast from one inbox or outside business hours.",
  "Ops glue: CRM and tools never hear when a campaign event happens.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Pick contact lists and map fields. Attach one or more sending inboxes and set rotation (round-robin or random).",
  },
  {
    step: "02",
    text: "Build the email_sequence: each step has a template and delay_days. Add multiple templates on the same delay for A/B testing that step.",
  },
  {
    step: "03",
    text: "Set campaign daily limit, send window (start/end, timezone), and weekdays. Align per-inbox limits in Inbox Accounts.",
  },
  {
    step: "04",
    text: "Run compliance checks, configure Reply-To, then activate. Paused and completed states are available for operational control.",
  },
  {
    step: "05",
    text: "Monitor step and variant analytics; optionally pick an A/B winner. Layer Workflows for side automations on send, open, or reply.",
  },
];

const teamOutcomes = [
  {
    team: "Founders & lean GTM",
    result:
      "Ship multi-touch outbound with guardrails—limits, windows, and reply-aware sequencing without a RevOps hire.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR & sales teams",
    result:
      "One playbook per motion: consistent cadence, rotation across inboxes, and analytics to fix weak steps.",
    icon: Users2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Agencies & multi-brand",
    result:
      "Per-client campaigns with separate lists, inboxes, and compliance—plus webhooks when events fire.",
    icon: Send,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "Legacy-friendly sequences",
    description:
      "Older campaigns that only stored a flat list of templates are mapped into a sequence automatically (staggered delays) so nothing breaks when you migrate.",
    icon: Layers3,
  },
  {
    title: "Operational resilience",
    description:
      "Failed sends retry up to a limit per step; contacts who exceed retries are skipped for that step to protect deliverability.",
    icon: ShieldCheck,
  },
  {
    title: "Campaign lifecycle",
    description:
      "Draft → active → paused or completed. Starting a campaign can trigger workflows scoped to that campaign.",
    icon: PauseCircle,
  },
  {
    title: "Unsubscribe & block lists respected",
    description:
      "Send batches filter blocked and unsubscribed contacts so automated sequences do not violate opt-outs.",
    icon: CheckCircle2,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Sequence model",
    basic: "Single blast or manual reminders",
    emareach: "Multi-step sequence with day delays + optional A/B per step",
  },
  {
    label: "After a reply",
    basic: "Often keeps mailing",
    emareach: "Eligible sends exclude contacts with a reply on the thread",
  },
  {
    label: "Volume control",
    basic: "Send all at once",
    emareach: "Campaign daily limit + per-inbox caps + send windows",
  },
  {
    label: "Automation beyond email",
    basic: "None",
    emareach: "Workflows + webhooks on campaign and email events",
  },
];

const pillarCards = [
  {
    title: "Sequences",
    subtitle: "Linear cadence",
    body: "Steps advance by delay_days from the previous send. Clear for reps to reason about—and for the engine to schedule.",
    icon: Route,
    accent: "from-violet-500/30 to-purple-500/20",
  },
  {
    title: "Safety",
    subtitle: "Limits & timing",
    body: "Caps, weekdays, and time-of-day windows keep sends human-paced and reputation-aware across many inboxes.",
    icon: ShieldCheck,
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "Automation",
    subtitle: "Workflows & hooks",
    body: "React to campaign start and email events with workflows; notify external systems with webhooks when messages go out.",
    icon: Workflow,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const faqItems = [
  {
    q: "How do delays between follow-ups work?",
    a: "Each sequence step has a delay_days value. The engine schedules the next step relative to when the previous step was sent for that contact, using the gap between consecutive step delays.",
  },
  {
    q: "How is A/B testing implemented?",
    a: "Add multiple templates with the same delay_days. They are treated as variants for that step. Analytics show performance per variant; you can designate a winner template for ongoing sends.",
  },
  {
    q: "Does the sequence continue after a reply?",
    a: "No. If there is a replied status on the campaign’s email logs for that contact, they are not selected for further steps—so follow-ups stop when someone engages.",
  },
  {
    q: "What is the difference between campaigns and Workflows?",
    a: "Campaigns send the scheduled email sequence. Workflows are separate automations you can trigger on events like campaign started, email sent, opened, or replied—with branching and waits.",
  },
  {
    q: "How do daily limits interact?",
    a: "The campaign has a daily maximum across all selected inboxes. Each inbox also has its own daily cap. EmaReach sends up to the lower of what the campaign and inboxes allow.",
  },
  {
    q: "Can I use AI to build the sequence content?",
    a: "Yes. AI Campaign Studio helps generate multi-step templates from a brief; you still attach lists, compliance, and sending settings before launch.",
  },
];

function SequencePreviewMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/25 to-cyan-500/25 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <Workflow className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Email sequence</span>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Reply-aware
          </span>
        </div>
        <div className="space-y-0 p-2">
          {[
            { step: "Step 1", delay: "0 days", note: "Intro", variant: "A/B: 2 templates" },
            { step: "Step 2", delay: "+3 days", note: "Follow-up", variant: "1 template" },
            { step: "Step 3", delay: "+5 days", note: "Breakup", variant: "1 template" },
          ].map((row, i) => (
            <div key={row.step} className="flex items-stretch gap-2 p-3">
              <div className="flex w-10 flex-col items-center pt-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </div>
                {i < 2 && <div className="my-1 w-px flex-1 bg-border" />}
              </div>
              <div className="flex-1 rounded-xl border border-border/80 bg-muted/30 px-4 py-3 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">{row.step}</span>
                  <span className="text-xs text-muted-foreground">{row.delay}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{row.note}</p>
                <p className="mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">{row.variant}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
            Daily limit + window
          </span>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-800 dark:text-amber-200">
            Inbox rotation
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">
            Stop on reply
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
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Sequences that respect replies and reputation</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Combine timed follow-ups, A/B steps, smart limits, and workflows—so automation scales without burning your domain or your brand.
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

export function CampaignAutomationSequencesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Workflow className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Campaign automation &amp; sequences
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Multi-step sequences with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  limits that scale
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
              and reply-aware sends
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Build linear email cadences with day-based delays, A/B variants per step, campaign and inbox daily caps, send
              windows, multi-inbox rotation—and stop follow-ups when a contact replies. Layer Workflows when you need
              event-driven automation beyond the inbox.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Everything below reflects what ships in the product today—not a slide deck.
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

          <SequencePreviewMock />

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

      {/* THREE PILLARS */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it fits together
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Cadence, safety, and side automation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The campaign engine handles scheduled email steps. Workflows listen for events when you need branching logic
              and integrations.
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

      {/* FULL PRODUCT GRID */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              In the product today
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Campaign &amp; sequence capabilities</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              What you can configure and run in EmaReach for outbound campaigns—from sequence structure to analytics and
              automations.
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

      {/* BENTO */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Deep dive
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Optimize each step—not just the first send</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[300px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Split className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">A/B analytics per step</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  When multiple templates share the same delay, compare sends, opens, clicks, and replies per variant. Use
                  the data to declare a winner and keep improving subject lines and body copy where it matters.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                <Link href="/features/analytics-reporting" className="inline-flex items-center gap-1 hover:underline">
                  See analytics features <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Workflow className="mb-3 h-6 w-6 text-orange-500" />
                <h4 className="font-semibold">Workflows</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Triggers include campaign started, email sent, opened, and replied—with scopes for campaign, list,
                  contact, or global automation.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Webhook className="mb-3 h-6 w-6 text-sky-500" />
                <h4 className="font-semibold">Webhooks</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Notify external systems when sends occur—parallel to workflow actions for your stack.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why teams standardize on EmaReach</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Outbound automation is not only “send later”—it is controlled volume, reply awareness, and measurable steps.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Topic</span>
              <span className="text-center text-muted-foreground">Basic tools</span>
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

      {/* PAIN + PLATFORM */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Execution quality
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Fix what breaks outbound at scale</h2>
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
              <h3 className="mb-6 text-xl font-semibold">How EmaReach addresses them</h3>
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

      {/* WORKFLOW + TEAMS */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              From setup to launch
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How teams run campaigns end to end</h2>
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Related
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/features/ai-writing-personalization"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    AI writing &amp; personalization
                  </Link>
                  <Link
                    href="/features/deliverability-warmup"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    Deliverability &amp; warm-up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      {/* FAQ */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Campaign &amp; sequence questions</h2>
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

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <Send className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Operational excellence</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Run sequences your team can{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              trust and measure
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Combine timed follow-ups, A/B steps, send controls, reply-aware logic, and workflows—so outbound stays
            predictable as you grow.
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
            Built for founders, SDR orgs, agencies, and RevOps.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
