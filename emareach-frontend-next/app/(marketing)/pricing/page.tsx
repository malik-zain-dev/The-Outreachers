import { Suspense } from "react";
import { fetchPlans } from "@/lib/server-api";
import { mapApiPlanToPricingPlan } from "@/lib/pricing";
import { PricingPageContent } from "./PricingPageClient";
import { Loader2 } from "lucide-react";

export const revalidate = 3600;

function PricingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 max-w-sm text-center px-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Loading pricing</p>
          <p className="text-sm text-muted-foreground">One moment, please…</p>
        </div>
      </div>
    </div>
  );
}

export default async function PricingPage() {
  const { plans } = await fetchPlans();
  const initialPlans =
    plans.length > 0
      ? plans.map((p) => mapApiPlanToPricingPlan(p))
      : undefined;

  return (
    <Suspense fallback={<PricingFallback />}>
      <PricingPageContent
        initialPlans={initialPlans}
        initialIsIndia={null}
        initialRegionLoaded={false}
      />
    </Suspense>
  );
}
