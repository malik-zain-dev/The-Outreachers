import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  Filter,
  Inbox,
  MailCheck,
  MessageSquareReply,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Star,
  Tags,
  Target,
  UserCheck,
  Users2,
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

const productCapabilities = [
  {
    title: "Two inbox views in one place",
    description:
      "Switch between campaign conversations and your MailBox received mail from one screen, so reps do not bounce across tools.",
    icon: Inbox,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Threaded conversation view",
    description:
      "Read full back-and-forth threads in chronological order, including your sent messages and contact replies, to keep context before you respond.",
    icon: MessageSquareReply,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Reply to campaign threads and mailbox mail",
    description:
      "Send replies in both flows with subject, body, and optional CC. The composer keeps formatting and supports thread-style follow-up behavior.",
    icon: Send,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "AI Reply for faster first response",
    description:
      "Generate a professional draft reply directly in the reply modal, then edit before sending. Great for speed without sacrificing quality.",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Write new mail with AI Write",
    description:
      "Compose new outbound emails from the same workspace. Add what the email is about, generate a draft, pick a sending inbox, and send.",
    icon: FileCheck2,
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Power filters for both flows",
    description:
      "Campaign side supports all, unread, sent, replied, starred, archived. MailBox side supports all, replied, unreplied, plus search.",
    icon: Filter,
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Unread counts and inbox grouping",
    description:
      "See unread totals quickly and organize MailBox conversations by sending domains and inboxes for cleaner triage.",
    icon: Users2,
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Fast actions for operators",
    description:
      "Mark read, mark all read, archive one, archive all, delete, and tag workflows reduce friction for teams handling high reply volume.",
    icon: Workflow,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    title: "Star and tag conversations",
    description:
      "Use stars and custom tags to keep priority conversations visible and route follow-up work without losing context.",
    icon: Tags,
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/40",
  },
  {
    title: "Refresh and reply sync",
    description:
      "One refresh action updates campaign replies and mailbox mail so reps are working from fresh conversation state.",
    icon: RefreshCw,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
  },
  {
    title: "Attachment and thread cues",
    description:
      "Conversation rows show practical signals like attachment presence, reply status, and message count for faster prioritization.",
    icon: Search,
    gradient: "from-lime-500/20 to-green-500/20",
    iconColor: "text-lime-600",
    iconBg: "bg-lime-500/10",
    border: "hover:border-lime-500/40",
  },
  {
    title: "Message safety boundaries",
    description:
      "Users only see and act on conversations tied to inboxes they own, helping teams collaborate with clear account-level control.",
    icon: UserCheck,
    gradient: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-500/10",
    border: "hover:border-slate-500/40",
  },
];

const keyMetrics = [
  {
    label: "Response speed",
    value: "Reply in one place",
    note: "Shorter handoff time when all conversations are unified.",
    icon: Clock3,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Execution quality",
    value: "Context preserved",
    note: "Thread view keeps history visible before each send.",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Rep productivity",
    value: "Bulk-friendly actions",
    note: "Read/archive/tag flows help teams clear inboxes faster.",
    icon: Workflow,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Pipeline control",
    value: "Reply visibility",
    note: "Know what is replied, unreplied, and still in motion.",
    icon: BarChart3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Campaign replies and received mail live in different tools.",
  "Reps answer without full thread context and miss nuances.",
  "High-priority conversations get buried in noisy inboxes.",
  "Managers struggle to enforce consistent reply quality.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Open Unified Inbox and choose campaign conversations or MailBox received mail.",
  },
  {
    step: "02",
    text: "Filter by unread/replied/starred and search by sender, subject, or preview text.",
  },
  {
    step: "03",
    text: "Open the thread, review conversation history, and reply with optional CC.",
  },
  {
    step: "04",
    text: "Use AI Reply or AI Write when needed, then edit and send from the right inbox.",
  },
  {
    step: "05",
    text: "Mark read, archive, star, and tag to keep the queue clean and conversion-focused.",
  },
];

const teamOutcomes = [
  {
    team: "Founders and lean sales teams",
    result:
      "Run professional reply operations without buying a separate shared-inbox product.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR and AE teams",
    result:
      "Faster first responses, cleaner ownership, and better follow-through on warm leads.",
    icon: Users2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Agencies and multi-brand teams",
    result:
      "Manage replies across many sender inboxes with consistent process and visibility.",
    icon: Workflow,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "One workspace, two reply streams",
    description:
      "Campaign replies and direct received messages are handled inside the same interface, reducing context switching.",
    icon: Inbox,
  },
  {
    title: "Conversation-first UI",
    description:
      "Threaded history, message counts, and reply markers make it easier to understand intent before responding.",
    icon: MessageSquareReply,
  },
  {
    title: "Speed controls for teams",
    description:
      "Search, filters, stars, tags, and bulk actions keep the queue manageable when reply volume spikes.",
    icon: Star,
  },
  {
    title: "Built for real pipeline work",
    description:
      "Compose, reply, and follow-up happen where your sales team already works, so engagement turns into opportunities faster.",
    icon: MailCheck,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Reply handling",
    basic: "Scattered across inbox tabs",
    emareach: "Unified campaign + mailbox reply workspace",
  },
  {
    label: "Context",
    basic: "Single message view",
    emareach: "Threaded history with sent and received messages",
  },
  {
    label: "Triage speed",
    basic: "Manual scan",
    emareach: "Filters, unread counters, stars, tags, and search",
  },
  {
    label: "Drafting",
    basic: "Manual only",
    emareach: "AI Reply and AI Write inside the same workflow",
  },
];

const faqItems = [
  {
    q: "What does Unified Inbox include?",
    a: "It combines campaign conversations and MailBox received conversations in one workspace, so your team can triage and reply without jumping tools.",
  },
  {
    q: "Can we reply directly from the inbox?",
    a: "Yes. You can reply from both conversation types, set subject and message, include CC when needed, and keep the conversation flow intact.",
  },
  {
    q: "Is AI available for replies?",
    a: "Yes. Teams can generate draft replies with AI Reply, edit them, and send. AI Write is also available in compose for new outbound messages.",
  },
  {
    q: "Can I filter for unreplied conversations?",
    a: "Yes. MailBox view supports all, replied, and unreplied filters, while campaign view includes additional filters like unread, starred, and archived.",
  },
  {
    q: "Can teams mark and organize conversations?",
    a: "Yes. You can mark read, archive, archive all, star important threads, and apply tags to keep ownership and follow-up clear.",
  },
  {
    q: "How does access control work?",
    a: "Users can only view and manage conversations that belong to their own connected inboxes, so collaboration stays controlled.",
  },
];

function InboxMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/20 to-cyan-500/25 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">Unified inbox preview</span>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            Replied + Unreplied
          </span>
        </div>
        <div className="space-y-2 p-4">
          {[
            { from: "alex@company.com", subj: "Re: quick question", tag: "Replied" },
            { from: "maria@startup.io", subj: "Pricing details", tag: "Needs reply" },
            { from: "sam@agency.co", subj: "Can we schedule a call?", tag: "Starred" },
          ].map((row) => (
            <div key={`${row.from}-${row.subj}`} className="rounded-xl border border-border/70 bg-muted/30 p-3">
              <p className="truncate text-sm font-semibold">{row.from}</p>
              <p className="truncate text-xs text-muted-foreground">{row.subj}</p>
              <div className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {row.tag}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
            Filters
          </span>
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">
            AI Reply
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">
            Compose
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
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stop losing replies in scattered inboxes
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Bring campaign conversations and received mail together, then let reps respond faster with full context.
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

export function UnifiedInboxRepliesPage() {
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
              <Inbox className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Unified Inbox &amp; Replies
              </span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Close more conversations from{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  one reply workspace
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Keep campaign conversations and received mail in one place, answer with full thread context, and move faster
              with AI-assisted drafting, smart filters, and bulk actions.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Everything on this page is already in the product today.
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

          <InboxMock />

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
              In the product today
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Unified inbox capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Reply operations features teams use daily to convert interest into meetings and pipeline.
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Why teams switch
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Clearer ownership, faster replies
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Topic</span>
              <span className="text-center text-muted-foreground">Fragmented setup</span>
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
              Real operations
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for daily inbox pressure
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Common pain points</h3>
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
              <h3 className="mb-6 text-xl font-semibold">How the platform helps</h3>
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
              How teams run it
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Reply workflow from open to close
            </h2>
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
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
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
                    href="/features/campaign-automation-sequences"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    Campaign automation
                  </Link>
                  <Link
                    href="/features/ai-writing-personalization"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    AI writing
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Unified inbox questions</h2>
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
            <MailCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Reply operations that scale
            </span>
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Turn replies into{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              real pipeline motion
            </span>
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Give your team one place to read, draft, reply, and follow through—without losing conversation context.
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
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
