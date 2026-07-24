"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRICING_FAQ_ITEMS } from "./pricing-data";

export function PricingFAQSection() {
  // Split into two columns on desktop
  const half = Math.ceil(PRICING_FAQ_ITEMS.length / 2);
  const col1 = PRICING_FAQ_ITEMS.slice(0, half);
  const col2 = PRICING_FAQ_ITEMS.slice(half);

  return (
    <section
      className="relative overflow-hidden border-y border-border/40 py-20 lg:py-28"
      aria-labelledby="pricing-faq-heading"
    >
      {/* Background tint */}
      <div className="absolute inset-0 bg-[hsl(var(--marketing-band)/0.55)]" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-border/60 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</p>
          <h2 id="pricing-faq-heading" className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Questions answered
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Quick answers about plans, trials, billing, and features.
          </p>
        </div>

        {/* Two-column FAQ grid on large screens */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-0 lg:grid-cols-2">
          {[col1, col2].map((col, colIdx) => (
            <Accordion key={colIdx} type="single" collapsible className="space-y-2">
              {col.map((faq, i) => {
                const globalIdx = colIdx * half + i;
                return (
                  <div key={faq.q}>
                    <AccordionItem
                      value={`item-${globalIdx}`}
                      className="rounded-xl border border-border/60 bg-card/70 px-5 shadow-sm backdrop-blur-sm transition-all duration-200 data-[state=open]:border-primary/25 data-[state=open]:bg-card/90 data-[state=open]:shadow-[0_0_0_1px_hsl(199_89%_48%/0.1)]"
                    >
                      <AccordionTrigger className="py-4 text-left text-[15px] font-semibold leading-snug hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-4 w-4" aria-hidden />
            <p className="text-sm">Still have questions? We&apos;re happy to help.</p>
          </div>
          <Link href="/contact">
            <button
              type="button"
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/35 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
