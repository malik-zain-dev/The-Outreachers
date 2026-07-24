import Link from "next/link";
import { ArrowRight, Check, Zap, TrendingUp, Users } from "lucide-react";

const PROOF_POINTS = [
  { icon: TrendingUp, value: "92%", label: "Average inbox rate" },
  { icon: Zap, value: "<10 min", label: "Time to first send" },
  { icon: Users, value: "50k+", label: "Active campaigns" },
];

const INCLUDES = [
  "7-day free trial — no card required",
  "AI sequence generation from day 1",
  "Inbox warm-up running automatically",
  "Cancel anytime, no questions asked",
];

export function FeaturesCta() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 100%, hsl(199 89% 48% / 0.10) 0%, transparent 70%), hsl(var(--background))",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="rounded-3xl border border-border/60 overflow-hidden">
          {/* Main gradient CTA block */}
          <div
            className="relative p-10 lg:p-16"
            style={{
              background:
                "linear-gradient(135deg, hsl(199 89% 48% / 0.12) 0%, hsl(270 76% 55% / 0.08) 50%, hsl(292 84% 61% / 0.06) 100%), hsl(var(--card))",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, hsl(199 89% 48%), hsl(292 84% 61%), transparent)",
              }}
            />

            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
              {/* Left: text + CTA */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.5 text-[12px] font-bold text-primary tracking-wide mb-6">
                  <Zap className="w-3 h-3 fill-primary" />
                  Start in 10 minutes
                </div>

                <h2
                  className="font-black leading-[1.08] tracking-tight text-foreground mb-5"
                  style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}
                >
                  Ready to fill your
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(199 89% 52%), hsl(217 91% 62%), hsl(292 84% 65%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    pipeline?
                  </span>
                </h2>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-[480px]">
                  Join thousands of sales teams who use EmaReach to send cold emails that land in the inbox and get real replies.
                </p>

                {/* Includes list */}
                <ul className="space-y-2.5 mb-9">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px]">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/book-demo"
                    className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-[17px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(199 89% 48%), hsl(217 91% 60%))",
                      boxShadow:
                        "0 4px 24px hsl(199 89% 48% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.15)",
                    }}
                  >
                    Book a demo
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-7 py-4 text-[15px] font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Talk to sales
                  </Link>
                </div>
              </div>

              {/* Right: proof points */}
              <div className="lg:w-[280px] flex-shrink-0">
                <div className="space-y-4">
                  {PROOF_POINTS.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground">{p.value}</div>
                        <div className="text-xs text-muted-foreground font-medium">{p.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing link */}
                <div className="mt-5 p-4 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    Transparent pricing — no hidden fees
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:underline"
                  >
                    See all plans
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
