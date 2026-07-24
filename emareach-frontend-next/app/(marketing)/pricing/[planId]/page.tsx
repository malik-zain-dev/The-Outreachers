import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPlanById } from "@/lib/plan-data";
import { mapApiPlanToPricingPlan } from "@/lib/pricing";
import { PricingPageContent } from "../PricingPageClient";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamicParams = true;

function PricingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 max-w-sm text-center px-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Loading plan</p>
          <p className="text-sm text-muted-foreground">One moment, please…</p>
        </div>
      </div>
    </div>
  );
}

type Props = { params: Promise<{ planId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { planId } = await params;
  const plan = await getPlanById(planId);
  const name = plan?.name as string | undefined;
  if (!name) return { title: "Plan | EmaReach" };
  return {
    title: `Subscribe to ${name} | EmaReach`,
    description: `Subscribe to the ${name} plan. Cold email that lands in the inbox — same pricing and features as on our pricing page.`,
  };
}

export default async function PricingPlanPage({ params }: Props) {
  const { planId } = await params;
  const plan = await getPlanById(planId);

  if (!plan) notFound();

  const mappedPlan = mapApiPlanToPricingPlan(plan);

  return (
    <Suspense fallback={<PricingFallback />}>
      <PricingPageContent
        initialPlans={[mappedPlan]}
        initialIsIndia={null}
        initialRegionLoaded={false}
        singlePlanId={planId}
      />
    </Suspense>
  );
}
