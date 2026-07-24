"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PricingPlansSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
      role="status"
      aria-label="Loading plans"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/75 p-7 shadow-sm backdrop-blur-sm"
        >
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
          <div className="py-2">
            <Skeleton className="h-14 w-36" />
            <Skeleton className="mt-1.5 h-3 w-24" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <div className="pt-1 flex flex-col gap-2.5">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div key={j} className="flex items-center gap-2.5">
                <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                <Skeleton className="h-3.5 flex-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
