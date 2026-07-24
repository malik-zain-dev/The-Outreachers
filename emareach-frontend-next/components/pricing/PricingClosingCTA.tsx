"use client";

import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";

type Props = {
  isAuthenticated: boolean;
};

const FOOTNOTES = ["Free forever tier", "7-day trial on Starter", "Save 17% annually"] as const;

export function PricingClosingCTA({ isAuthenticated }: Props) {
  return (
    <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28" aria-labelledby="pricing-cta-heading">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl">
        {/* Brand-gradient panel */}
        <div className="gradient-primary relative px-6 py-16 text-center sm:px-12 lg:py-20">
          {/* Subtle texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2), transparent 45%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Rating */}
            <div className="mb-6 flex items-center justify-center gap-1.5">
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-white text-white" aria-hidden />
                ))}
              </div>
              <span className="ml-1.5 text-sm font-semibold text-white/90">5.0 — 5,000+ businesses</span>
            </div>

            {/* Headline */}
            <h2
              id="pricing-cta-heading"
              className="text-balance text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              The best AI email marketing tool to grow your business
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
              Create AI-powered campaigns, personalize every email, automate follow-ups, and convert more leads into customers — all from one platform.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isAuthenticated ? (
                <>
                  <Link href="/settings?tab=billing">
                    <button
                      type="button"
                      className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-xl bg-white px-9 py-3.5 text-[16px] font-bold text-primary shadow-lg shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      Manage your plan
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </button>
                  </Link>
                  <Link href="/dashboard">
                    <button
                      type="button"
                      className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-9 py-3.5 text-[16px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      Go to dashboard
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/book-demo">
                    <button
                      type="button"
                      className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-xl bg-white px-9 py-3.5 text-[16px] font-bold text-primary shadow-lg shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      Book a demo
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button
                      type="button"
                      className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-9 py-3.5 text-[16px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      Contact sales
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Footnotes */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-sm text-white/85">
              {FOOTNOTES.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
