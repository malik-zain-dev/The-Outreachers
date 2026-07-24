import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PricingBackground } from "@/components/pricing/PricingBackground";

/**
 * Shown immediately while the server fetches plans and region (no cache for plans).
 */
export default function PricingLoading() {
  return (
    <div className="relative min-h-screen overflow-auto bg-background">
      <PricingBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Skeleton className="mx-auto mb-4 h-8 w-40 rounded-full" />
          <Skeleton className="mx-auto mb-3 h-12 w-full max-w-xl" />
          <Skeleton className="mx-auto h-5 w-full max-w-lg" />
        </div>
        <div className="mb-10 flex justify-center">
          <Skeleton className="h-12 w-[280px] rounded-full" />
        </div>
        <div
          className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          role="status"
          aria-label="Loading plans"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex flex-1 flex-col gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <div className="rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-md backdrop-blur-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
          </div>
          <p className="text-sm text-muted-foreground">Loading pricing for your region…</p>
        </div>
      </div>
    </div>
  );
}
