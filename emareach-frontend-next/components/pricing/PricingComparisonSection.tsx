"use client";

import { Check, ChevronDown, Minus, LayoutGrid } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PricingPlan } from "@/lib/pricing";
import {
  displayPrice,
  getDailyEmailsForTable,
  getMonthlyEmails,
  getSendingInboxDisplay,
} from "@/lib/pricing-helpers";
import { cn } from "@/lib/utils";

const USD_TO_INR = 100;

type CompareRow = {
  label: string;
  hint?: string;
  render?: (plan: PricingPlan) => string | null;
  renderCheck?: (plan: PricingPlan) => boolean;
  highlight?: boolean;
  strong?: boolean;
};

type Props = {
  plans: PricingPlan[];
  isAnnual: boolean;
  isIndia: boolean | null;
  showComparison: boolean;
  onToggleComparison: () => void;
};

export function PricingComparisonSection({
  plans,
  isAnnual,
  isIndia,
  showComparison,
  onToggleComparison,
}: Props) {
  if (plans.length <= 1) return null;

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:pb-20 lg:px-8"
      aria-labelledby="compare-heading"
    >
      {/* Toggle header */}
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="compare-heading"
            className="text-2xl font-black tracking-tight text-foreground sm:text-3xl"
          >
            Compare plans
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Compare contacts, sending limits, and features across every plan — everything side by side.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleComparison}
          className={cn(
            "inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/80 px-5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm transition-all duration-200",
            "hover:border-primary/35 hover:bg-primary/5 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-expanded={showComparison}
        >
          <LayoutGrid className="h-4 w-4" aria-hidden />
          {showComparison ? "Hide comparison" : "Show full comparison"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", showComparison && "rotate-180")}
            aria-hidden
          />
        </button>
      </div>

      {showComparison && (
        <div>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/85 shadow-xl shadow-foreground/5 backdrop-blur-sm dark:bg-card/65">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/60 bg-muted/40 hover:bg-muted/40">
                    <TableHead className="sticky left-0 z-10 min-w-[180px] bg-muted/40 py-5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Feature
                    </TableHead>
                    {plans.map((plan) => (
                      <TableHead
                        key={plan.id}
                        className={cn(
                          "min-w-[140px] py-5 text-center",
                          plan.popular
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        )}
                      >
                        <span className={cn("block text-base font-bold", plan.popular ? "text-primary" : "text-foreground")}>
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="mt-1.5 inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            Popular
                          </span>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Price row */}
                  <TableRow className="border-b border-border/40 bg-muted/20">
                    <TableCell className="sticky left-0 z-10 bg-muted/20 py-4 text-sm font-bold text-foreground">
                      Price
                    </TableCell>
                    {plans.map((plan) => {
                      const priceVal = displayPrice(plan);
                      const isAnnualPrice =
                        isAnnual && plan.price !== "0" && plan.price !== "Custom" && typeof priceVal !== "string";
                      return (
                        <TableCell
                          key={plan.id}
                          className={cn("py-4 text-center font-bold tabular-nums", plan.popular && "bg-primary/5")}
                        >
                          {plan.price === "Custom"
                            ? <span className="text-foreground">Custom</span>
                            : plan.price === "0"
                              ? <span className="text-foreground">Free</span>
                              : isAnnualPrice
                                ? <span className="text-foreground">
                                    {isIndia === true
                                      ? `₹${(Math.round((priceVal as { monthly: number }).monthly * 0.833) * USD_TO_INR).toLocaleString("en-IN")}/mo`
                                      : `$${Math.round((priceVal as { monthly: number }).monthly * 0.833)}/mo`}
                                  </span>
                                : <span className="text-foreground">
                                    {isIndia === true
                                      ? `₹${(Number(plan.price) * USD_TO_INR).toLocaleString("en-IN")}/mo`
                                      : `$${plan.price}/mo`}
                                  </span>}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Data rows */}
                  {([
                    {
                      label: "Domains",
                      hint: "Website domains you connect",
                      render: (plan) => plan.domains,
                    },
                    {
                      label: "Gmail inboxes",
                      hint: "Gmail / Google accounts you connect",
                      render: (plan) =>
                        plan.googleAccounts === "—" ? null : plan.googleAccounts,
                    },
                    {
                      label: "Domain inboxes",
                      hint: "Sending addresses on your domain",
                      render: (plan) => plan.subdomains,
                    },
                    {
                      label: "Total sending inboxes",
                      hint: "Gmail + domain mailboxes",
                      render: (plan) => getSendingInboxDisplay(plan),
                      strong: true,
                    },
                    {
                      label: "Emails / day",
                      hint: "Your daily sending limit",
                      render: (plan) => getDailyEmailsForTable(plan),
                      highlight: true,
                    },
                    {
                      label: "Emails / month",
                      hint: "Your monthly sending limit",
                      render: (plan) => getMonthlyEmails(plan) || null,
                      highlight: true,
                    },
                    {
                      label: "Support",
                      render: (plan) => plan.support,
                    },
                  ] as CompareRow[]).map((row, rowIdx) => (
                    <TableRow
                      key={row.label}
                      className={cn(
                        "border-b border-border/30 transition-colors",
                        rowIdx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                      )}
                    >
                      <TableCell
                        className={cn(
                          "sticky left-0 z-10 py-3.5 text-sm font-semibold text-foreground",
                          rowIdx % 2 === 0 ? "bg-card/85" : "bg-muted/30",
                        )}
                      >
                        {row.label}
                        {row.hint && (
                          <span className="mt-0.5 block text-xs font-normal normal-case text-muted-foreground">
                            {row.hint}
                          </span>
                        )}
                      </TableCell>
                      {plans.map((plan) => {
                        if (row.renderCheck) {
                          const has = row.renderCheck(plan);
                          return (
                            <TableCell
                              key={plan.id}
                              className={cn("py-3.5 text-center", plan.popular && "bg-primary/5")}
                            >
                              {has ? (
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} aria-label="Included" />
                                </span>
                              ) : (
                                <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-label="Not included" />
                              )}
                            </TableCell>
                          );
                        }
                        const val = row.render!(plan);
                        return (
                          <TableCell
                            key={plan.id}
                            className={cn(
                              "py-3.5 text-center tabular-nums",
                              plan.popular && "bg-primary/5",
                              row.highlight
                                ? "font-bold text-emerald-700 dark:text-emerald-400"
                                : row.strong
                                  ? "font-bold text-foreground"
                                  : "font-medium text-foreground"
                            )}
                          >
                            {val ?? <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-label="Not available" />}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
