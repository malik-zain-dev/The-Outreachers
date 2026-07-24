"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Globe,
  Mail,
  Minus,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PricingPlan } from "@/lib/pricing";
import {
  API_ACCESS_TOOLTIP,
  CAMPAIGNS_TOOLTIP,
  DOMAIN_WARMUP_TOOLTIP,
  getDailyEmailsForTable,
  getDerivedDailyTotal,
  getFeatureDisplay,
  getMonthlyEmails,
  getCapacitySubtext,
  hasExplicitMonthlySmtpLimit,
  descriptionWithValues,
  GOOGLE_ACCOUNTS_TOOLTIP,
  SUBDOMAINS_TOOLTIP,
  displayPrice,
} from "@/lib/pricing-helpers";
import { cn } from "@/lib/utils";

const USD_TO_INR = 100;

type Props = {
  plan: PricingPlan;
  isAnnual: boolean;
  isIndia: boolean | null;
  isAuthenticated: boolean;
  openingPlanId: string | null;
  onRazorpay: () => void;
  onLemonSqueezy: () => void;
  ctaLabel: string;
  ctaHref: string;
  ctaDisabled: boolean;
  useRazorpayUpgrade: boolean;
  useLemonSqueezyUpgrade: boolean;
  upgradeSubtextLoggedIn: string | null;
};

export function PricingPlanCard({
  plan,
  isAnnual,
  isIndia,
  isAuthenticated,
  openingPlanId,
  onRazorpay,
  onLemonSqueezy,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  useRazorpayUpgrade,
  useLemonSqueezyUpgrade,
  upgradeSubtextLoggedIn,
}: Props) {
  const priceVal = displayPrice(plan);
  const isPopular = plan.popular;
  const isFree = plan.price === "0";
  const currencySymbol = isIndia === true ? "₹" : "$";
  const isLoading = openingPlanId === plan.id;

  const formatPrice = (usdAmount: number, forIndia: boolean) =>
    forIndia ? `₹${(usdAmount * USD_TO_INR).toLocaleString("en-IN")}` : `$${usdAmount}`;

  const derivedDaily = getDerivedDailyTotal(plan);
  const monthlyStr = getMonthlyEmails(plan);
  const dailyStr =
    hasExplicitMonthlySmtpLimit(plan)
      ? getDailyEmailsForTable(plan)
      : derivedDaily != null
        ? derivedDaily.toLocaleString()
        : plan.dailyLimit || plan.dailyEmails;
  const capacityHeadline = monthlyStr
    ? `Up to ${monthlyStr} emails / month`
    : `${dailyStr} emails / day`;

  const capacitySubtext = getCapacitySubtext(plan);

  // Gmail vs domain inboxes get their own dedicated section, so keep them out of
  // the generic "what's included" list to avoid repeating the same numbers.
  const gmailCount = plan.googleAccounts === "—" ? "0" : plan.googleAccounts;
  const domainInboxCount = plan.subdomains;
  const domainWord = plan.domains === "1" ? "domain" : "domains";

  const featureItems = plan.features
    .map((f) => getFeatureDisplay(f, plan))
    .filter((i) => {
      const t = i.text.toLowerCase();
      // Campaign-count lines (e.g. "5 campaigns") confuse buyers with the
      // concurrent-vs-total distinction, so hide them here. The "AI Campaign
      // Studio" feature has no leading digit and is intentionally kept.
      const isCampaignCount = /^\s*\d/.test(i.text) && t.includes("campaign");
      return (
        !isCampaignCount &&
        !t.includes("gmail inbox") &&
        !t.includes("domain inbox") &&
        !(t.includes("domain") && t.includes("inbox"))
      );
    });

  const getTooltip = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("campaign")) return CAMPAIGNS_TOOLTIP;
    if (t.includes("domain warmup")) return DOMAIN_WARMUP_TOOLTIP;
    if (t.includes("api access")) return API_ACCESS_TOOLTIP;
    if (t.includes("gmail inbox")) return GOOGLE_ACCOUNTS_TOOLTIP;
    if (t.includes("domain inbox") || t.includes("subdomain")) return SUBDOMAINS_TOOLTIP;
    return "";
  };

  // Muted/secondary text token per card surface
  const subText = isPopular ? "text-white/70" : "text-muted-foreground";

  const ctaButtonClass = cn(
    "relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl text-[15px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]",
    isPopular
      ? "bg-white text-primary shadow-lg shadow-black/20 hover:bg-white/95 focus-visible:ring-white focus-visible:ring-offset-primary"
      : isFree
        ? "border border-border bg-card text-foreground shadow-sm hover:border-primary/40 hover:bg-muted/40 focus-visible:ring-primary"
        : "gradient-primary text-white shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 focus-visible:ring-primary",
    ctaDisabled && "pointer-events-none opacity-55"
  );

  const ctaButtonContent = isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
  ) : (
    <>
      <span>{ctaLabel}</span>
      {!ctaDisabled && <ArrowRight className="h-4 w-4" aria-hidden />}
    </>
  );

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300",
        isPopular
          ? [
              "lg:-mt-4 lg:mb-0",
              "gradient-primary text-white",
              "shadow-[0_20px_50px_-12px_hsl(199_89%_45%/0.55)]",
              "ring-1 ring-inset ring-white/15",
              "hover:shadow-[0_28px_64px_-12px_hsl(199_89%_45%/0.65)]",
            ]
          : [
              "border border-border/80 bg-card",
              "shadow-[0_4px_16px_-6px_hsl(var(--foreground)/0.10)]",
              "hover:border-primary/30 hover:shadow-[0_16px_36px_-12px_hsl(var(--foreground)/0.20)] hover:-translate-y-1",
            ]
      )}
    >
      {/* Most popular badge */}
      {isPopular && (
        <div className="absolute left-0 right-0 top-0 z-20 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-b-lg bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
            <Sparkles className="h-3 w-3" aria-hidden />
            Most popular
          </div>
        </div>
      )}

      {/* Non-popular badge */}
      {plan.badge && !isPopular && (
        <div className="absolute right-4 top-4 z-20">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Card inner */}
      <div className={cn("flex flex-grow flex-col px-6 pb-7 sm:px-7", isPopular ? "pt-11" : "pt-7")}>
        {/* Plan name */}
        <h2 className={cn("text-base font-bold tracking-tight", isPopular ? "text-white" : "text-foreground")}>
          {plan.name}
        </h2>

        {/* Description — clamped + fixed min-height so price/CTA/feature rows
            line up across cards regardless of how long the stored copy is. */}
        <p className={cn("mt-1.5 min-h-[4.5rem] line-clamp-3 text-sm leading-relaxed", subText)}>
          {descriptionWithValues(plan.description, plan)}
        </p>

        {/* Price block */}
        <div className="mt-6 min-h-[5.25rem]">
          {plan.price === "Custom" ? (
            <p className={cn("text-[2.75rem] font-black leading-none tracking-tight", isPopular ? "text-white" : "text-foreground")}>
              Custom
            </p>
          ) : plan.price === "0" ? (
            <>
              <div className="flex items-start gap-1">
                <span className={cn("mt-2 text-2xl font-bold", subText)}>{currencySymbol}</span>
                <span className={cn("text-[3.75rem] font-black leading-[0.9] tabular-nums tracking-tight", isPopular ? "text-white" : "text-foreground")}>
                  0
                </span>
              </div>
              <p className={cn("mt-2 text-xs font-semibold uppercase tracking-wide", subText)}>
                Free forever — no card
              </p>
            </>
          ) : isAnnual && typeof priceVal !== "string" ? (
            <>
              <p className={cn("mb-0.5 text-sm line-through opacity-60", subText)}>
                {formatPrice(priceVal.monthly, isIndia === true)}/mo
              </p>
              <div className="flex items-start gap-1">
                <span className={cn("mt-2 text-2xl font-bold", subText)}>{currencySymbol}</span>
                <span className={cn("text-[3.75rem] font-black leading-[0.9] tabular-nums tracking-tight", isPopular ? "text-white" : "text-foreground")}>
                  {isIndia === true
                    ? Math.round(priceVal.monthly * 0.83 * USD_TO_INR).toLocaleString("en-IN")
                    : Math.round(priceVal.monthly * 0.83)}
                </span>
                <span className={cn("mb-2 mt-auto text-base font-semibold", subText)}>/mo</span>
              </div>
              <p className={cn("mt-2 text-xs font-semibold", subText)}>
                Billed {formatPrice(priceVal.annual, isIndia === true)} / year
              </p>
            </>
          ) : typeof priceVal !== "string" ? (
            <>
              <div className="flex items-start gap-1">
                <span className={cn("mt-2 text-2xl font-bold", subText)}>{currencySymbol}</span>
                <span className={cn("text-[3.75rem] font-black leading-[0.9] tabular-nums tracking-tight", isPopular ? "text-white" : "text-foreground")}>
                  {isIndia === true
                    ? (Number(plan.price) * USD_TO_INR).toLocaleString("en-IN")
                    : plan.price}
                </span>
                <span className={cn("mb-2 mt-auto text-base font-semibold", subText)}>/mo</span>
              </div>
              <p className={cn("mt-2 text-xs font-semibold", subText)}>Billed monthly</p>
            </>
          ) : null}
        </div>

        {/* Sending capacity */}
        {(monthlyStr || dailyStr) && (
          <div className="mt-5">
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3",
                isPopular
                  ? "bg-white/12 ring-1 ring-inset ring-white/20"
                  : "bg-emerald-500/[0.08] ring-1 ring-inset ring-emerald-500/20"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  isPopular
                    ? "bg-white/15 text-white"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                )}
              >
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 text-left leading-tight">
                {monthlyStr ? (
                  <>
                    <p
                      className={cn(
                        "tabular-nums",
                        isPopular ? "text-white" : "text-emerald-700 dark:text-emerald-300"
                      )}
                    >
                      <span className="text-[17px] font-black">Up to {monthlyStr}</span>{" "}
                      <span className="text-xs font-semibold opacity-80">emails / month</span>
                    </p>
                    {capacitySubtext && (
                      <p
                        className={cn(
                          "mt-0.5 text-xs font-medium tabular-nums",
                          isPopular ? "text-white/70" : "text-emerald-700/70 dark:text-emerald-300/70"
                        )}
                      >
                        {capacitySubtext}
                      </p>
                    )}
                  </>
                ) : (
                  <p
                    className={cn(
                      "text-[15px] font-bold tabular-nums",
                      isPopular ? "text-white" : "text-emerald-700 dark:text-emerald-300"
                    )}
                  >
                    {capacityHeadline}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sending setup — Gmail and domain inboxes kept in two clear sections */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {/* Gmail inboxes */}
          <div
            className={cn(
              "flex flex-col items-center rounded-xl px-3 py-3 text-center transition-opacity",
              isPopular
                ? "bg-white/10 ring-1 ring-inset ring-white/15"
                : "bg-muted/40 ring-1 ring-inset ring-border/60",
              gmailCount === "0" && "opacity-55"
            )}
          >
            <Mail className={cn("h-4 w-4", isPopular ? "text-white/75" : "text-muted-foreground")} aria-hidden />
            <p className={cn("mt-1.5 text-xl font-black leading-none tabular-nums", isPopular ? "text-white" : "text-foreground")}>
              {gmailCount}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-1 cursor-help text-[11px] font-semibold underline decoration-dotted underline-offset-2",
                    subText
                  )}
                  aria-label="More about Gmail inboxes"
                >
                  Gmail {gmailCount === "1" ? "inbox" : "inboxes"}
                </button>
              </PopoverTrigger>
              <PopoverContent side="top" className="max-w-[260px] p-3 text-sm">
                {GOOGLE_ACCOUNTS_TOOLTIP}
              </PopoverContent>
            </Popover>
          </div>

          {/* Domain inboxes */}
          <div
            className={cn(
              "flex flex-col items-center rounded-xl px-3 py-3 text-center transition-opacity",
              isPopular
                ? "bg-white/10 ring-1 ring-inset ring-white/15"
                : "bg-muted/40 ring-1 ring-inset ring-border/60",
              domainInboxCount === "0" && "opacity-55"
            )}
          >
            <Globe className={cn("h-4 w-4", isPopular ? "text-white/75" : "text-muted-foreground")} aria-hidden />
            <p className={cn("mt-1.5 text-xl font-black leading-none tabular-nums", isPopular ? "text-white" : "text-foreground")}>
              {domainInboxCount}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-1 cursor-help text-[11px] font-semibold underline decoration-dotted underline-offset-2",
                    subText
                  )}
                  aria-label="More about domain inboxes"
                >
                  Domain {domainInboxCount === "1" ? "inbox" : "inboxes"}
                </button>
              </PopoverTrigger>
              <PopoverContent side="top" className="max-w-[260px] p-3 text-sm">
                {SUBDOMAINS_TOOLTIP}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p className={cn("mt-2 text-center text-[11px] font-medium", subText)}>
          On {plan.domains} {domainWord}
        </p>

        {/* CTA */}
        <div className="mt-5">
          {useRazorpayUpgrade ? (
            <button
              type="button"
              onClick={onRazorpay}
              disabled={!!openingPlanId}
              className={cn(ctaButtonClass, !!openingPlanId && "opacity-70")}
            >
              {ctaButtonContent}
            </button>
          ) : useLemonSqueezyUpgrade ? (
            <button
              type="button"
              onClick={onLemonSqueezy}
              disabled={!!openingPlanId}
              className={cn(ctaButtonClass, !!openingPlanId && "opacity-70")}
            >
              {ctaButtonContent}
            </button>
          ) : (
            <Link href={ctaHref} className="block" tabIndex={ctaDisabled ? -1 : undefined}>
              <button
                type="button"
                className={ctaButtonClass}
                disabled={ctaDisabled || !!openingPlanId}
                aria-disabled={ctaDisabled}
              >
                {ctaButtonContent}
              </button>
            </Link>
          )}

          {(upgradeSubtextLoggedIn || (plan.ctaSubtext && !isAuthenticated && !upgradeSubtextLoggedIn)) && (
            <p className={cn("mt-2.5 text-center text-xs font-medium", subText)}>
              {upgradeSubtextLoggedIn ?? plan.ctaSubtext}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className={cn("mb-5 mt-6 h-px w-full", isPopular ? "bg-white/15" : "bg-border/60")} />

        {/* Feature list */}
        <p
          className={cn(
            "mb-3 text-[11px] font-bold uppercase tracking-[0.14em]",
            isPopular ? "text-white/60" : "text-muted-foreground"
          )}
        >
          What's included
        </p>
        <ul className="flex flex-grow flex-col gap-3">
          {featureItems.map((item, i) => {
            const hasTooltip =
              (/^\s*\d/.test(item.text) && item.text.toLowerCase().includes("campaign")) ||
              item.text.toLowerCase().includes("domain warmup") ||
              item.text.toLowerCase().includes("api access") ||
              item.text.toLowerCase().includes("gmail inbox") ||
              item.text.toLowerCase().includes("domain inbox") ||
              item.text.toLowerCase().includes("subdomain");
            const tooltip = hasTooltip ? getTooltip(item.text) : "";

            return (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                    item.included
                      ? isPopular ? "bg-white/20" : "bg-primary/10"
                      : isPopular ? "bg-white/5" : "bg-muted"
                  )}
                >
                  {item.included ? (
                    <Check
                      className={cn("h-2.5 w-2.5", isPopular ? "text-white" : "text-primary")}
                      strokeWidth={3.5}
                      aria-hidden
                    />
                  ) : (
                    <Minus
                      className={cn("h-2.5 w-2.5", isPopular ? "text-white/40" : "text-muted-foreground/50")}
                      aria-hidden
                    />
                  )}
                </span>

                <span
                  className={cn(
                    "min-w-0 flex-1 text-sm leading-snug",
                    item.included
                      ? isPopular ? "font-medium text-white" : "font-medium text-foreground"
                      : isPopular ? "text-white/45" : "text-muted-foreground/60"
                  )}
                >
                  {hasTooltip && tooltip ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "cursor-help text-left underline decoration-dotted underline-offset-[3px] transition-opacity hover:opacity-75",
                            item.included
                              ? isPopular ? "decoration-white/45" : "decoration-foreground/25"
                              : isPopular ? "decoration-white/25" : "decoration-muted-foreground/25"
                          )}
                          aria-label={`More about: ${item.text}`}
                        >
                          {item.text}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="max-w-[260px] p-3 text-sm">
                        {tooltip}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    item.text
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
