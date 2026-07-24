import type { Metadata } from "next";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  Ban,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  Flame,
  Lock,
  Network,
  RefreshCcw,
  ShieldCheck,
  ShieldOff,
  Skull,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Unlimited Warmup Trap — EmaReach",
  description:
    "Instantly, Saleshandy, and most warmup tools use a closed-loop artificial pool. Here's exactly how it works, why ESPs have caught on, and what real warmup looks like.",
};

const trapSteps = [
  {
    step: "01",
    label: "You join their pool",
    body: "You connect your inbox. It's added to a shared database of thousands of other users' inboxes on the same platform.",
  },
  {
    step: "02",
    label: "They email each other",
    body: "Their system sends emails between pool members automatically — your inbox talks to strangers' inboxes 24/7.",
  },
  {
    step: "03",
    label: "Opens & replies are faked",
    body: "Automated scripts open, reply, and mark as important. No real human ever reads a single warmup email.",
  },
  {
    step: "04",
    label: "ESPs see the pattern",
    body: "Gmail, Outlook, and others have already fingerprinted these pools. The IPs, timing patterns, and reply behavior are flagged.",
  },
];

const damageStats = [
  { metric: "Open rate collapse", value: "2–5%", context: "from 40%+ baseline" },
  { metric: "Spam folder rate", value: "60–80%", context: "for burned domains" },
  { metric: "Domain recovery time", value: "3–6 mo", context: "if recoverable at all" },
  { metric: "Average pool size", value: "100K+", context: "inboxes sharing your risk" },
];

const toolComparison = [
  {
    tool: "Instantly",
    method: "Artificial pool (Instantly network)",
    poolSize: "200K+ inboxes",
    humanEngagement: false,
    espFingerprinted: true,
    realReplies: false,
  },
  {
    tool: "Saleshandy",
    method: "Artificial pool (SH network)",
    poolSize: "100K+ inboxes",
    humanEngagement: false,
    espFingerprinted: true,
    realReplies: false,
  },
  {
    tool: "Lemlist",
    method: "Artificial pool (Lemwarm)",
    poolSize: "50K+ inboxes",
    humanEngagement: false,
    espFingerprinted: true,
    realReplies: false,
  },
  {
    tool: "EmaReach",
    method: "Real Engagement (your contacts)",
    poolSize: "Your own network",
    humanEngagement: true,
    espFingerprinted: false,
    realReplies: true,
  },
];

const realWarmupSignals = [
  { label: "Real replies from real contacts", icon: CheckCircle2 },
  { label: "Genuine mark-as-important signals", icon: CheckCircle2 },
  { label: "Organic back-and-forth threads", icon: CheckCircle2 },
  { label: "Domain-specific reputation building", icon: CheckCircle2 },
  { label: "No shared pool — zero cross-contamination", icon: CheckCircle2 },
  { label: "Signals ESPs interpret as human trust", icon: CheckCircle2 },
];

const espWarningSignals = [
  "Identical send/receive cadence patterns across thousands of inboxes",
  "Replies that arrive within milliseconds (automated)",
  "IP ranges shared by the warmup tool's servers",
  "No variation in engagement timing or reply length",
  "Unsubscribe patterns consistent with bot behavior",
];

const warmupTimeline = [
  { phase: "Week 1", real: "5–10 emails to known contacts", fake: "50+ to random pool inboxes" },
  { phase: "Week 2", real: "15–20 with natural threading", fake: "100+ automated exchanges" },
  { phase: "Week 3", real: "25–30 with genuine replies", fake: "150+ scripted opens/marks" },
  { phase: "Week 4+", real: "35–40 from a trusted reputation", fake: "Domain flagged by ESP" },
];

export default function TheWarmupTrapPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-24 lg:pt-16 lg:pb-32 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-destructive mb-6">
            <AlertTriangle className="w-3.5 h-3.5" />
            Industry Warning
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-4xl">
            "Unlimited Warmup" Is
            <br />
            <span className="bg-gradient-to-r from-destructive via-orange-500 to-amber-500 bg-clip-text text-transparent">
              A Closed-Loop Trap.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Instantly, Saleshandy, Lemlist, and nearly every major warmup tool use the same method:
            a shared pool of inboxes emailing each other in an automated loop.{" "}
            <strong className="text-foreground">ESPs have already fingerprinted it.</strong>{" "}
            You&apos;re not building reputation — you&apos;re sharing risk with hundreds of thousands of strangers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Book a demo" }}
              secondary={{ href: "/signup", label: "Use Real Warmup Instead" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
            <Button asChild variant="outline" size="lg" className="text-base px-7 py-5 h-auto">
              <Link href="/warmup">
                See How EmaReach Warmup Works
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-medium">The problem in one line:</p>
            <div className="flex flex-wrap gap-3">
              {["Fake signals → Flagged patterns → Burned domain", "More warmup ≠ better reputation"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1 text-xs font-semibold text-destructive"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How the Trap Works ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
              1. The Mechanism
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Here&apos;s exactly how the closed loop works.
            </h2>
            <p className="text-muted-foreground text-lg">
              It&apos;s marketed as &ldquo;unlimited warmup.&rdquo; In practice, it&apos;s an automated
              email carousel between strangers — and ESP algorithms have learned to recognize it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trapSteps.map((step, i) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-3 border-t-2 border-t-destructive/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-destructive/25">{step.step}</span>
                  {i < trapSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10" />
                  )}
                </div>
                <p className="font-semibold text-foreground leading-snug">{step.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Closed loop visual callout */}
          <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-destructive/15 flex items-center justify-center">
                  <RefreshCcw className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-foreground mb-1">
                  Why it&apos;s called a &ldquo;closed loop&rdquo;
                </p>
                <p className="text-muted-foreground">
                  The signals never leave the platform&apos;s ecosystem. Inbox A (on Instantly) emails
                  Inbox B (on Instantly). Inbox B auto-replies to Inbox A. The loop repeats indefinitely.
                  No real human. No real signal. Just a revolving door of automated noise that
                  Google and Microsoft have already catalogued as synthetic behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESP Warning Signs ── */}
      <section className="py-16 lg:py-24 marketing-band border-y">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
                2. What ESPs See
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Gmail and Outlook know. They&apos;ve known for years.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Enterprise spam filters and major ESPs maintain active denylist patterns for
                artificial warmup pools. Every tool with a shared pool has already been fingerprinted.
                These are the signals they use to detect it:
              </p>
            </div>

            <div className="space-y-3">
              {espWarningSignals.map((signal, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-destructive/15 bg-destructive/5 px-4 py-3.5"
                >
                  <ShieldOff className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{signal}</p>
                </div>
              ))}

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5 mt-2">
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                  These patterns are consistent across every platform using pool-based warmup —
                  including the ones offering &ldquo;unlimited&rdquo; plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Damage Stats ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
              3. The Damage
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What happens when your domain gets flagged.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {damageStats.map((stat) => (
              <div
                key={stat.metric}
                className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 flex flex-col gap-1"
              >
                <p className="text-sm text-muted-foreground">{stat.metric}</p>
                <p className="text-4xl font-black text-destructive">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.context}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Skull className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">The compounding effect no one talks about</p>
                <p className="text-muted-foreground leading-relaxed">
                  When one inbox in a shared pool gets flagged, ESP algorithms apply behavioral
                  scoring to the entire cluster. Your inbox — which has never done anything wrong —
                  inherits the reputation damage of every other inbox it has &ldquo;talked to&rdquo; in
                  the pool. You&apos;re not just risking your own domain. You&apos;re co-signing for
                  100,000 strangers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-16 lg:py-24 marketing-band border-y">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
              4. Side by Side
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              How EmaReach compares to tools offering &ldquo;unlimited warmup.&rdquo;
            </h2>
            <p className="text-muted-foreground text-lg">
              The difference isn&apos;t feature depth — it&apos;s the fundamental mechanism.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Tool</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Method</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Pool Size</th>
                  <th className="text-center px-5 py-4 font-semibold text-foreground">Real Human?</th>
                  <th className="text-center px-5 py-4 font-semibold text-foreground">ESP Flagged?</th>
                  <th className="text-center px-5 py-4 font-semibold text-foreground">Real Replies?</th>
                </tr>
              </thead>
              <tbody>
                {toolComparison.map((row, i) => {
                  const isEmareach = row.tool === "EmaReach";
                  return (
                    <tr
                      key={row.tool}
                      className={`border-b border-border last:border-0 transition-colors ${
                        isEmareach
                          ? "bg-primary/5 border-primary/20"
                          : "bg-card hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {row.tool}
                        {isEmareach && (
                          <span className="ml-2 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">
                            You&apos;re here
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{row.method}</td>
                      <td className="px-5 py-4 text-muted-foreground">{row.poolSize}</td>
                      <td className="px-5 py-4 text-center">
                        {row.humanEngagement ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <Ban className="w-5 h-5 text-destructive mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.espFingerprinted ? (
                          <AlertTriangle className="w-5 h-5 text-destructive mx-auto" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.realReplies ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <Ban className="w-5 h-5 text-destructive mx-auto" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Timeline Comparison ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
              5. Week by Week
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Real warmup vs. fake warmup — what each week actually looks like.
            </h2>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
              <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timeline</div>
              <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary border-l border-border">
                Real Engagement (EmaReach)
              </div>
              <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-destructive border-l border-border">
                Artificial Pool (Most Tools)
              </div>
            </div>
            {warmupTimeline.map((row, i) => (
              <div
                key={row.phase}
                className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}
              >
                <div className="px-5 py-4 font-semibold text-sm text-foreground">{row.phase}</div>
                <div className="px-5 py-4 text-sm text-muted-foreground border-l border-border flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {row.real}
                </div>
                <div className="px-5 py-4 text-sm text-muted-foreground border-l border-border flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                  {row.fake}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Real Warmup Works ── */}
      <section className="py-16 lg:py-24 marketing-band border-y">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                6. The EmaReach Difference
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Real warmup means real contacts.
                <br />
                <span className="gradient-text">Yours.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Instead of adding your inbox to a shared pool of strangers, EmaReach&apos;s warmup
                network sends to contacts already in your account — people who know you, or are in
                your target segment. The engagement signals are genuine, unscripted, and
                indistinguishable from normal business communication.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ESPs don&apos;t flag real conversations. They reward them. That&apos;s the entire
                point — warmup isn&apos;t about volume, it&apos;s about trust signals. And trust
                can only come from real people.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  What real engagement gives you
                </div>
                <div className="space-y-2.5">
                  {realWarmupSignals.map((sig) => (
                    <div key={sig.label} className="flex items-center gap-2.5 text-sm text-foreground">
                      <sig.icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {sig.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-3">
                <Network className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">12 contacts in your warmup network</p>
                  <p className="text-xs text-muted-foreground">
                    Warmup happens through real contacts already in your EmaReach account.
                    Every signal is genuine. Zero pool cross-contamination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lock-In Warning ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
              7. The Hidden Cost
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              &ldquo;Unlimited warmup&rdquo; is also a lock-in strategy.
            </h2>
            <p className="text-muted-foreground text-lg">
              Here&apos;s what they don&apos;t advertise on the pricing page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Your warmup stops when you leave</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The moment you cancel, your inbox is removed from the pool. Any &ldquo;reputation&rdquo;
                you built evaporates. It wasn&apos;t yours — it belonged to the platform.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Your domain health depends on strangers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One batch of abusive senders in the same pool can trigger algorithm-level scoring
                that drags down every inbox they&apos;ve exchanged with — including yours.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-foreground mb-2">More inboxes = more exposure, not more safety</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scaling to 20 inboxes in an artificial pool doesn&apos;t reduce risk — it multiplies
                the surface area that ESPs use to fingerprint your entire sending operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="py-10 marketing-band-subtle border-y border-border">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg text-foreground">
                Ready to switch to warmup that actually builds reputation?
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                EmaReach uses real contacts — not a shared pool. Your domain, your signals, your trust.
              </p>
            </div>
            <MarketingCtaButtons
              secondary={{ href: "/signup", label: "Start Real Warmup" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ / Objections ── */}
      <section className="py-16 lg:py-24 marketing-band border-b">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Common objections — answered honestly.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                q: "Isn't any warmup better than no warmup?",
                a: "No. Artificial warmup that triggers ESP flags actively damages your domain. A fresh domain with no warmup history is recoverable. A domain flagged as part of a known synthetic pool is far harder to rehabilitate.",
              },
              {
                q: "These tools have millions of users — can they all really be wrong?",
                a: "Deliverability problems are quiet. Most users never check inbox placement. They see opens (which their own pool is generating) and assume it's working. By the time real campaigns underperform, the blame goes to copy or targeting — not the warmup.",
              },
              {
                q: "My deliverability looks fine right now.",
                a: "Pool-based warmup damage is cumulative and delayed. ESPs update their scoring models periodically. Inboxes that look healthy today can enter a flagged cohort in the next algorithm update without any change in your behavior.",
              },
              {
                q: "What if I use artificial warmup just to start, then switch?",
                a: "The synthetic engagement patterns get associated with your domain's sending history. Switching tools doesn't erase that signal. Starting clean with real engagement from day one is always the better path.",
              },
              {
                q: "Does EmaReach's warmup work if I have a small contact list?",
                a: "Yes. EmaReach warms up using contacts already in your account. You don't need thousands — even a network of 12 real contacts creates authentic, human-grade signals that ESPs interpret as legitimate business communication.",
              },
              {
                q: "Can I still use artificial warmup for secondary domains?",
                a: "We'd recommend against it. Your secondary domains still share your brand's overall IP and DNS reputation environment. Burning a secondary domain creates collateral risk for your primary sending infrastructure.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-semibold text-foreground mb-2.5">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="marketing-ink-section py-20 lg:py-28 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-6">
            <Flame className="w-3.5 h-3.5" />
            Stop Burning Domains
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
            Your domain reputation is an asset.
            <br />
            <span className="gradient-text">Treat it like one.</span>
          </h2>

          <p className="marketing-ink-muted text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop sharing it with 100,000 strangers. EmaReach builds genuine inbox trust
            through real engagement — signals that compound over time, not ones that collapse the
            moment an algorithm update runs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MarketingCtaButtons
              size="lg"
              variant="on-dark"
              primary={{ href: "/book-demo", label: "Book a Demo" }}
              secondary={{ href: "/signup", label: "Start With Real Warmup" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
          </div>

          <p className="mt-6 text-xs text-white/50">
            No lock-in. Your warmup signals stay with your domain — forever.
          </p>
        </div>
      </section>
    </div>
  );
}
