"use client";

import Link from "next/link";
import { ArrowRight, Check, Gift, Loader2 } from "lucide-react";
import type { PricingPlan } from "@/lib/pricing";
import { descriptionWithValues } from "@/lib/pricing-helpers";
import { cn } from "@/lib/utils";

type Props = {
  plan: PricingPlan;
  ctaLabel: string;
  ctaHref: string;
  ctaDisabled: boolean;
  isLoading: boolean;
  onClick?: () => void;
};

const HIGHLIGHTS = [
  "1 domain + 1 Gmail inbox",
  "AI email writing",
  "Real-time analytics",
];

export function FreePlanBanner({ plan, ctaLabel, ctaHref, ctaDisabled, isLoading, onClick }: Props) {
  const ctaContent = isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
  ) : (
    <>
      <span>{ctaLabel}</span>
      {!ctaDisabled && <ArrowRight className="h-3.5 w-3.5" aria-hidden />}
    </>
  );

  const ctaClass = cn(
    "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card px-5 text-sm font-bold text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    ctaDisabled && "pointer-events-none opacity-55"
  );

  return (
    <section className="mx-auto mb-10 max-w-5xl px-0">
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-border/80 bg-muted/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-start gap-4 sm:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Gift className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">Not ready to commit?</h2>
              <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground ring-1 ring-border">
                {plan.name} — $0/mo
              </span>
            </div>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {descriptionWithValues(plan.description, plan)}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {onClick ? (
          <button type="button" onClick={onClick} disabled={ctaDisabled || isLoading} className={ctaClass}>
            {ctaContent}
          </button>
        ) : (
          <Link href={ctaHref} className="shrink-0" tabIndex={ctaDisabled ? -1 : undefined}>
            <button type="button" disabled={ctaDisabled} aria-disabled={ctaDisabled} className={ctaClass}>
              {ctaContent}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
