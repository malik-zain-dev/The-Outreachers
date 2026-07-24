import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Filter,
  History,
  MailCheck,
  ShieldCheck,
  Target,
  Trash2,
  Users2,
  XCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesCta } from "./FeaturesCta";
import { FeaturesTestimonials } from "./FeaturesTestimonials";

const capabilities = [
  {
    title: "Background risky-email cleanup",
    description:
      "Run Remove Risky Emails on all contacts or one list. Jobs run in the background with live progress, and you can stop them when needed.",
    icon: Trash2,
  },
  {
    title: "3-step email risk validation",
    description:
      "Each address is checked for syntax validity, mail-server readiness, and spam-reputation signals before it is flagged as risky.",
    icon: Filter,
  },
  {
    title: "Bulk delete with list cleanup",
    description:
      "Risky contacts are deleted in bulk after validation and removed from lists so your audience stays consistent.",
    icon: CheckCircle2,
  },
  {
    title: "Automatic campaign eligibility filtering",
    description:
      "Campaign sends exclude blocked and unsubscribed contacts automatically, including contacts above the no-engagement threshold.",
    icon: ShieldCheck,
  },
  {
    title: "Automatic block after repeated failure",
    description:
      "Contacts can be marked blocked after repeated failed delivery attempts, reducing repeated sends to problematic addresses.",
    icon: XCircle,
  },
  {
    title: "Manual block and unblock controls",
    description:
      "Teams can manually unblock selected contacts as exceptions or block them again so default safety rules apply.",
    icon: Users2,
  },
  {
    title: "Job history and completion notifications",
    description:
      "Each cleanup run is recorded with outcomes and check stats, and users receive completion or failure notifications.",
    icon: History,
  },
  {
    title: "Campaign-safe list guardrail",
    description:
      "List-scoped cleanup is prevented when that list is attached to draft, active, or paused campaigns.",
    icon: AlertTriangle,
  },
];

const metrics = [
  {
    label: "Validation model",
    value: "3 checks",
    note: "Syntax, mail-server, and spam-reputation signals.",
    icon: MailCheck,
  },
  {
    label: "Execution",
    value: "Background job",
    note: "Live progress plus stop control.",
    icon: Clock3,
  },
  {
    label: "Send safety",
    value: "Auto filtering",
    note: "Blocked and unsubscribed contacts are filtered at send time.",
    icon: ShieldCheck,
  },
  {
    label: "Oversight",
    value: "History and alerts",
    note: "Tracked jobs with outcome details.",
    icon: History,
  },
];

const faqItems = [
  {
    q: "What does Remove Risky Emails do?",
    a: "It validates contact emails in a background job and permanently deletes contacts flagged as risky.",
  },
  {
    q: "How is a risky email identified?",
    a: "A contact is flagged when any validation check fails: syntax, mail-server readiness, or spam-reputation signal.",
  },
  {
    q: "Can I run cleanup on one list only?",
    a: "Yes. You can run it for all contacts or one selected list.",
  },
  {
    q: "Can I stop a running cleanup job?",
    a: "Yes. Running jobs can be cancelled from Contacts.",
  },
  {
    q: "What is automatic contact blocking?",
    a: "Campaign sending excludes contacts that are blocked, unsubscribed, or above the no-engagement send threshold.",
  },
  {
    q: "Can I manually override blocking?",
    a: "Yes. Manual unblock allows an exception, and manual block turns the override off so automatic rules apply again.",
  },
];

function RiskCleanupMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/20 to-cyan-500/25 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">Remove risky emails</span>
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">
            Background job
          </span>
        </div>
        <div className="space-y-3 p-4 text-xs">
          <div className="rounded-lg border border-border/80 bg-muted/30 p-3">
            <p className="font-medium text-foreground">1,240 / 4,100 checked</p>
            <p className="mt-1 text-muted-foreground">286 risky found so far</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-[30%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-border/80 bg-muted/30 p-2 text-center">Syntax</div>
            <div className="rounded-lg border border-border/80 bg-muted/30 p-2 text-center">Mail server</div>
            <div className="rounded-lg border border-border/80 bg-muted/30 p-2 text-center">Spam signal</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RemoveRiskyEmailsContactBlockingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden bg-background pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Remove risky emails and contact blocking
              </span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Clean contact lists and keep unsafe sends out
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach validates contacts in the background, removes risky records in bulk, and automatically filters
              blocked and unsubscribed contacts before campaign send.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/90 shadow-sm"
              >
              Try for Free
              </Link>
            </div>
          </div>

          <RiskCleanupMock />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <article key={m.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
                  <m.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-base font-bold text-foreground">{m.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Risk cleanup and blocking capabilities</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
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

      <FeaturesTestimonials />

      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Remove risky emails questions</h2>
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

      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Keep your list safer before every campaign
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Run cleanup jobs, enforce automatic blocking, and use manual overrides only for known exceptions.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm"
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
