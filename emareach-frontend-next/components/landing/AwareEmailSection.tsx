import Link from "next/link";
import { MessageCircle, UserPlus, Mail, ArrowRight, MoveDown, Radar } from "lucide-react";
import { SOCIAL_KAPTAN_URL } from "@/components/layout/Header";

const STEPS = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Engage on social first",
    desc: "A comment, a follow, a genuinely useful reply. The prospect sees your name in a context they chose to be in.",
  },
  {
    icon: UserPlus,
    step: "02",
    title: "Become familiar",
    desc: "By the time anything lands in their inbox, you aren't a stranger. Recognition is the signal filters — and humans — actually reward.",
  },
  {
    icon: Mail,
    step: "03",
    title: "Then email — as touchpoint two",
    desc: "The email arrives to someone who already knows you. Fewer sends, better inbox placement, replies driven by interest, not volume.",
  },
];

const SHIFT = [
  { from: "Optimize for send volume", to: "Build familiarity before outreach" },
  { from: "Email as the first interaction", to: "Email as the second touchpoint" },
  { from: "Automated sequence, great copy", to: "A recipient with a reason to recognize you" },
];

export function AwareEmailSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden marketing-band" aria-labelledby="aware-email-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.12em]">
            What actually moved the number
          </span>
          <h2
            id="aware-email-heading"
            className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground"
          >
            The &ldquo;aware email&rdquo; approach.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When we tested this extensively, the biggest jump in inbox placement and reply rates didn&rsquo;t come from
            rewriting emails. It came from <span className="text-foreground/90 font-semibold">creating context before sending
            them</span> — so the recipient already recognizes you when your message arrives.
          </p>
          <Link
            href={SOCIAL_KAPTAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-4 py-1.5 text-[12.5px] font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/14 transition-colors"
          >
            <Radar className="w-3.5 h-3.5" />
            The social-first layer runs on Social Kaptan
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-4xl font-black text-foreground/10">{s.step}</span>
                </div>
                <h3 className="text-lg font-black text-foreground mb-2 leading-snug">{s.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-[1.85rem] -translate-y-1/2 w-5 h-5 text-muted-foreground/40 z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* The 2026 shift */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center text-xl font-black text-foreground mb-6">
            The shift for 2026
          </h3>
          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {SHIFT.map((row) => (
              <div key={row.from} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 p-4 sm:p-5">
                <span className="text-[13px] sm:text-[14.5px] text-muted-foreground line-through decoration-red-500/50 decoration-2 text-right">
                  {row.from}
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 hidden sm:block" />
                  <MoveDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 sm:hidden" />
                </span>
                <span className="text-[13px] sm:text-[14.5px] font-semibold text-foreground">{row.to}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg text-muted-foreground leading-relaxed">
            The outcome is boring on purpose: <span className="text-foreground/90 font-semibold">fewer emails, better inbox
            placement, and replies driven by genuine interest</span> instead of sheer volume.
          </p>
        </div>

        {/* Social Kaptan — context-aware marketing partner */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.07] via-card to-card p-8 lg:p-10">
            <div
              className="absolute -top-24 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-40 blur-[90px]"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)" }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  <Radar className="w-3.5 h-3.5" />
                  Context-aware marketing
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-[-0.02em] text-foreground leading-tight">
                  Build the familiarity first with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                    Social&nbsp;Kaptan
                  </span>
                </h3>
                <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
                  Social Kaptan runs the social-first half of the &ldquo;aware&rdquo; playbook — warming prospects with real
                  engagement so your name is already familiar before EmaReach sends touchpoint two. Context in, replies out.
                  No wasted sends, no burned domains.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {["Engage before you email", "Earn recognition, not spam flags", "Fewer sends, better placement"].map(
                    (b) => (
                      <li key={b} className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {b}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="flex-shrink-0">
                <Link href={SOCIAL_KAPTAN_URL} target="_blank" rel="noopener noreferrer" className="group block">
                  <button className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[0.95rem] text-white bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/40">
                    Explore Social Kaptan
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <p className="mt-2.5 text-center text-[11.5px] font-mono text-muted-foreground/80">socialkaptan.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
