"use client";

import Link from "next/link";
import { ArrowRight, Play, Check, Zap } from "lucide-react";

const STATS = [
  { value: "92%", label: "Inbox placement rate" },
  { value: "3.8×", label: "More replies vs. competitors" },
  { value: "<10min", label: "Setup to first send" },
  { value: "50k+", label: "Active campaigns monthly" },
];

const LOGOS = ["Growthly", "DevPipe", "Stackr", "Launchpad", "RevFlow", "Closr", "PitchDeck"];

export function FeaturesHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% -20%, hsl(199 89% 48% / 0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 85% 20%, hsl(292 84% 61% / 0.10) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 15% 80%, hsl(199 89% 48% / 0.07) 0%, transparent 50%)",
          }}
        />

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(199 89% 48%), transparent 70%)",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-8 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(292 84% 61%), transparent 70%)",
            bottom: "10%",
            right: "5%",
          }}
        />

        <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-[13px] font-semibold text-primary tracking-wide mb-8 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 fill-primary" />
            Every feature. One platform. Zero BS.
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.04] tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(42px, 7vw, 88px)", letterSpacing: "-0.035em" }}
          >
            Cold email that{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, hsl(199 89% 52%), hsl(217 91% 62%), hsl(292 84% 65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              actually lands
            </span>
            <br />
            in the inbox.
          </h1>

          {/* Subtext */}
          <p
            className="text-muted-foreground max-w-[580px] mx-auto mb-10 leading-relaxed"
            style={{ fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.65 }}
          >
            AI writing, inbox warm-up, multi-account rotation, and real-time analytics.
            Built so your cold emails get opened — and replied to.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link
              href="/book-demo"
              className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-[17px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, hsl(199 89% 48%), hsl(217 91% 60%))",
                boxShadow: "0 4px 24px hsl(199 89% 48% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.15)",
              }}
            >
              Book a demo
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card/60 px-7 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                <Play className="w-3 h-3 fill-primary text-primary" />
              </span>
              Try for Free
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap justify-center items-center gap-5 text-[13px] text-muted-foreground">
            {[
              "7-day free trial",
              "Cancel anytime",
              "Setup in <10 minutes",
              "No technical skills",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border/60 bg-border/40">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-7 px-4 bg-card/70 backdrop-blur-sm text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-1.5 tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, hsl(199 89% 52%), hsl(217 91% 62%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium leading-tight max-w-[120px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo trust bar */}
      <div className="border-y border-border/60 bg-muted/30 py-6 px-4 overflow-hidden">
        <p className="text-center text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-5">
          Trusted by outbound sales teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="px-4 py-2 rounded-lg border border-border/70 bg-card text-muted-foreground font-bold text-[12px] tracking-widest uppercase hover:border-primary/30 hover:text-foreground transition-all duration-200"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
