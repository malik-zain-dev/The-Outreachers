"use client";

import { cn } from "@/lib/utils";

type Props = {
  isAnnual: boolean;
  onMonthly: () => void;
  onAnnual: () => void;
  className?: string;
};

export function PricingBillingToggle({ isAnnual, onMonthly, onAnnual, className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl border border-border/50 bg-muted/40 p-1.5 shadow-sm backdrop-blur-xl",
        className
      )}
      role="group"
      aria-label="Billing period"
    >
      <button
        type="button"
        onClick={onMonthly}
        className={cn(
          "relative min-h-[40px] cursor-pointer rounded-xl px-6 py-2 text-sm font-semibold transition-all duration-200",
          !isAnnual
            ? "bg-background text-foreground shadow-md ring-1 ring-border/40"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={!isAnnual}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={onAnnual}
        className={cn(
          "relative flex min-h-[40px] cursor-pointer items-center gap-2 rounded-xl px-6 py-2 text-sm font-semibold transition-all duration-200",
          isAnnual
            ? "bg-background text-foreground shadow-md ring-1 ring-border/40"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={isAnnual}
      >
        Annual
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          −17%
        </span>
      </button>
    </div>
  );
}
