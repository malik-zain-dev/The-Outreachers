"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { PricingPlan } from "@/lib/pricing";
import { mapApiPlanToPricingPlan } from "@/lib/pricing";
import { PricingBackground } from "@/components/pricing/PricingBackground";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlansSkeleton } from "@/components/pricing/PricingPlansSkeleton";
import { PricingPlanCard } from "@/components/pricing/PricingPlanCard";
import { PricingBillingToggle } from "@/components/pricing/PricingBillingToggle";
import { FreePlanBanner } from "@/components/pricing/FreePlanBanner";
import { PricingValueBento } from "@/components/pricing/PricingValueBento";
import { PricingComparisonSection } from "@/components/pricing/PricingComparisonSection";
import { PricingFAQSection } from "@/components/pricing/PricingFAQSection";
import { PricingClosingCTA } from "@/components/pricing/PricingClosingCTA";

function normalizePlanIdForApi(planId: string): string {
  return String(planId ?? "").trim().toLowerCase();
}

export type PricingPageContentProps = {
  initialPlans?: PricingPlan[];
  initialIsIndia?: boolean | null;
  initialRegionLoaded?: boolean;
  singlePlanId?: string;
};

export function PricingPageContent({
  initialPlans,
  initialIsIndia = null,
  initialRegionLoaded = false,
  singlePlanId,
}: PricingPageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get("type");
  const [isAnnual, setIsAnnual] = useState(typeParam === "annual");
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans ?? []);
  const [plansLoading, setPlansLoading] = useState(!(initialPlans && initialPlans.length > 0));
  const [plansError, setPlansError] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(true);
  const [isIndia, setIsIndia] = useState<boolean | null>(
    initialRegionLoaded ? (initialIsIndia ?? null) : null
  );
  const [openingPlanId, setOpeningPlanId] = useState<string | null>(null);
  const { isAuthenticated, user, refetchUser } = useAuth();
  const paymentCompletedRef = useRef(false);
  const checkoutEligiblePlanIds = useMemo(() => {
    return new Set(
      plans
        .filter((plan) => {
          const price = String(plan.price ?? "").trim().toLowerCase();
          return price !== "0" && price !== "custom";
        })
        .map((plan) => normalizePlanIdForApi(plan.id))
    );
  }, [plans]);

  useEffect(() => {
    setIsAnnual(searchParams.get("type") === "annual");
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    if (!initialRegionLoaded) {
      api.region
        .get()
        .then((r) => {
          if (!cancelled) setIsIndia(r.is_india ?? null);
        })
        .catch(() => {
          if (!cancelled) setIsIndia(null);
        });
    } else {
      api.region
        .get()
        .then((r) => {
          if (cancelled) return;
          if (r.is_india === true && initialIsIndia !== true) setIsIndia(true);
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [initialRegionLoaded, initialIsIndia]);

  useEffect(() => {
    if (initialPlans && initialPlans.length > 0) {
      setPlansLoading(false);
      return;
    }
    let cancelled = false;
    api.plans
      .list()
      .then((res) => {
        if (!cancelled && res.plans?.length) {
          setPlans(res.plans.map((p: Record<string, unknown>) => mapApiPlanToPricingPlan(p)));
        }
        if (!cancelled) setPlansLoading(false);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPlansError(err instanceof Error ? err.message : "Failed to load plans");
          setPlansLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [initialPlans]);

  const loadRazorpayScript = (): Promise<void> => {
    if (typeof window !== "undefined" && (window as unknown as { Razorpay?: unknown }).Razorpay)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(s);
    });
  };

  const openLemonSqueezyCheckout = async (planId: string, annual?: boolean) => {
    if (!checkoutEligiblePlanIds.has(normalizePlanIdForApi(planId))) return;
    const apiPlanId = normalizePlanIdForApi(planId);
    try {
      setOpeningPlanId(planId);
      const { checkout_url } = await api.billing.lemonSqueezy.createCheckout(apiPlanId, annual);
      if (checkout_url) window.location.href = checkout_url;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to open checkout.";
      toast.error(msg);
    } finally {
      setOpeningPlanId(null);
    }
  };

  const openRazorpayCheckout = async (planId: string, annual?: boolean) => {
    if (!checkoutEligiblePlanIds.has(normalizePlanIdForApi(planId))) return;
    const apiPlanId = normalizePlanIdForApi(planId);
    try {
      setOpeningPlanId(planId);
      paymentCompletedRef.current = false;
      const { subscription_id, key_id } = await api.billing.razorpay.createSubscription(apiPlanId, annual);
      await loadRazorpayScript();
      const Razorpay = (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } })
        .Razorpay;
      new Razorpay({
        key: key_id,
        subscription_id,
        callback_url: `${window.location.origin}/settings?tab=billing&rp_sync=1`,
        redirect: true,
        handler: () => {
          paymentCompletedRef.current = true;
          toast.success("Subscription started. Your plan will update shortly.");
          refetchUser();
          router.push("/settings?tab=billing&rp_sync=1");
        },
        modal: {
          ondismiss: async () => {
            if (paymentCompletedRef.current) return;
            try {
              await api.billing.razorpay.cancelSubscription(false);
              refetchUser();
              toast.info("Payment cancelled. You can choose a different plan anytime.");
            } catch {
              // best effort
            }
          },
        },
      }).open();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("already have an active subscription") || msg.includes("use Change plan")) {
        toast.info("You already have an active subscription. Redirecting to Billing.");
        router.push("/settings?tab=billing");
      } else {
        toast.error(msg || "Failed to start subscription");
      }
    } finally {
      setOpeningPlanId(null);
    }
  };

  const pricingBase = singlePlanId ? `/pricing/${singlePlanId}` : "/pricing";
  const setAnnual = (annual: boolean) => {
    setIsAnnual(annual);
    const url = annual ? `${pricingBase}?type=annual` : pricingBase;
    router.replace(url, { scroll: false });
  };

  const getCtaForPlan = (plan: PricingPlan) => {
    const isLoggedIn = isAuthenticated;
    const isCurrentPlan = !!user && (user.plan_id === plan.id || user.plan?.id === plan.id);
    const currentPlanId = user?.plan?.id ?? user?.plan_id ?? null;
    const currentPlanDoc = currentPlanId ? plans.find((p) => p.id === currentPlanId) : undefined;
    const currentPlanPriceRaw = currentPlanDoc?.price ?? user?.plan?.price ?? null;
    const currentPlanPrice =
      currentPlanPriceRaw && currentPlanPriceRaw !== "Custom" ? parseInt(currentPlanPriceRaw, 10) : null;
    const planPrice = plan.price !== "Custom" ? parseInt(plan.price, 10) : null;
    let ctaLabel = plan.cta;
    let ctaHref = "/signup";
    let ctaDisabled = false;

    if (isLoggedIn) {
      if (isCurrentPlan) {
        ctaLabel = "Current plan";
        ctaHref = "/settings?tab=billing";
        ctaDisabled = true;
      } else if (currentPlanPrice != null && planPrice != null && planPrice <= currentPlanPrice) {
        ctaLabel = "On your plan";
        ctaHref = "/settings?tab=billing";
        ctaDisabled = true;
      } else if (plan.price !== "Custom") {
        ctaHref = "/settings?tab=billing";
        const hasUsedTrial = !!user?.trial_used_at;
        if (plan.id === "starter" && !hasUsedTrial) {
          ctaLabel = "Start your free trial";
        } else {
          ctaLabel = `Upgrade to ${plan.name}`;
        }
      } else {
        ctaLabel = "Talk to sales";
        ctaHref = `/contact?plan=${plan.id}`;
      }
    }

    const useRazorpayUpgrade =
      isLoggedIn &&
      isIndia === true &&
      checkoutEligiblePlanIds.has(normalizePlanIdForApi(plan.id)) &&
      !ctaDisabled &&
      plan.price !== "Custom" &&
      (ctaLabel === "Start your free trial" || ctaLabel.startsWith("Upgrade to "));

    const useLemonSqueezyUpgrade =
      isLoggedIn &&
      (isIndia === false || isIndia === null) &&
      checkoutEligiblePlanIds.has(normalizePlanIdForApi(plan.id)) &&
      !ctaDisabled &&
      plan.price !== "Custom" &&
      (ctaLabel === "Start your free trial" || ctaLabel.startsWith("Upgrade to "));

    const hasUsedTrialSubtext = !!user?.trial_used_at;
    const upgradeSubtextLoggedIn =
      isLoggedIn && !ctaDisabled && plan.price !== "Custom" && plan.id !== "free"
        ? plan.id === "starter"
          ? hasUsedTrialSubtext
            ? "Billing starts immediately"
            : "7-day free trial"
          : "No trial — billing starts immediately"
        : null;

    return {
      ctaLabel,
      ctaHref,
      ctaDisabled,
      useRazorpayUpgrade,
      useLemonSqueezyUpgrade,
      upgradeSubtextLoggedIn,
    };
  };

  const freePlan = plans.find((p) => String(p.price).trim() === "0");
  const paidPlans = plans.filter((p) => String(p.price).trim() !== "0");
  const freeCta = freePlan ? getCtaForPlan(freePlan) : null;

  return (
    <div className="relative min-h-screen bg-background">
      <PricingBackground />

      <PricingHero singlePlanId={singlePlanId} />

      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        {plansError && (
          <div className="mx-auto mb-8 max-w-lg rounded-2xl border border-destructive/25 bg-destructive/10 p-5 text-center shadow-sm">
            <p className="font-semibold text-destructive">{plansError}</p>
          </div>
        )}

        {plansLoading && <PricingPlansSkeleton />}

        {!plansLoading && !singlePlanId && freePlan && freeCta && (
          <FreePlanBanner
            plan={freePlan}
            ctaLabel={freeCta.ctaLabel}
            ctaHref={freeCta.ctaHref}
            ctaDisabled={freeCta.ctaDisabled}
            isLoading={openingPlanId === freePlan.id}
          />
        )}

        {!plansLoading && !singlePlanId && paidPlans.length > 0 && (
          <div className="mx-auto mb-5 max-w-3xl text-center lg:mb-6">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Pick your growth plan
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Every paid tier includes AI writing, automatic warmup, and analytics — you're only choosing sending volume.
            </p>
          </div>
        )}

        {/* Billing toggle — placed right above the plans so the control sits
            next to the prices it changes. */}
        {!plansLoading && !singlePlanId && paidPlans.length > 0 && (
          <div className="mb-8 flex justify-center lg:mb-10">
            <PricingBillingToggle
              isAnnual={isAnnual}
              onMonthly={() => setAnnual(false)}
              onAnnual={() => setAnnual(true)}
            />
          </div>
        )}

        {!plansLoading && (() => {
          const gridPlans = singlePlanId ? plans : paidPlans;
          return (
          <div
            className={`mx-auto mb-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mb-20 lg:items-start ${
              gridPlans.length === 1
                ? "max-w-md lg:grid-cols-1"
                : gridPlans.length === 2
                  ? "max-w-3xl lg:grid-cols-2"
                  : "max-w-6xl lg:grid-cols-3"
            }`}
          >
            {gridPlans.map((plan) => {
              const { ctaLabel, ctaHref, ctaDisabled, useRazorpayUpgrade, useLemonSqueezyUpgrade, upgradeSubtextLoggedIn } =
                getCtaForPlan(plan);

              return (
                <PricingPlanCard
                  key={plan.id}
                  plan={plan}
                  isAnnual={isAnnual}
                  isIndia={isIndia}
                  isAuthenticated={isAuthenticated}
                  openingPlanId={openingPlanId}
                  onRazorpay={() => openRazorpayCheckout(plan.id, isAnnual)}
                  onLemonSqueezy={() => openLemonSqueezyCheckout(plan.id, isAnnual)}
                  ctaLabel={ctaLabel}
                  ctaHref={ctaHref}
                  ctaDisabled={ctaDisabled}
                  useRazorpayUpgrade={useRazorpayUpgrade}
                  useLemonSqueezyUpgrade={useLemonSqueezyUpgrade}
                  upgradeSubtextLoggedIn={upgradeSubtextLoggedIn}
                />
              );
            })}
          </div>
          );
        })()}
      </div>

      <PricingValueBento />

      {!plansLoading && (
        <PricingComparisonSection
          plans={plans}
          isAnnual={isAnnual}
          isIndia={isIndia}
          showComparison={showComparison}
          onToggleComparison={() => setShowComparison(!showComparison)}
        />
      )}

      <PricingFAQSection />

      <PricingClosingCTA isAuthenticated={isAuthenticated} />
    </div>
  );
}
