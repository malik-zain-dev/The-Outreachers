import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSlugLoading() {
  return (
    <article className="fixed inset-0 z-[100] min-h-screen overflow-auto bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-10 pb-20 lg:pt-16">
        <Skeleton className="h-5 w-28 mb-8" role="status" aria-label="Loading" />

        <header className="mb-8">
          <Skeleton className="h-10 w-full mb-4 max-w-2xl" />
          <Skeleton className="h-10 w-4/5 mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>
          <Skeleton className="h-4 w-48" />
        </header>

        <Skeleton className="aspect-video w-full rounded-xl mb-10" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton
              key={i}
              className={`h-4 w-full ${i === 3 || i === 6 ? "w-5/6" : ""}`}
            />
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        <section className="mt-14 rounded-2xl border border-border bg-muted/50 p-8 lg:p-10">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-8 w-28 rounded-full mb-4" />
            <Skeleton className="h-8 w-80 max-w-full mb-2" />
            <Skeleton className="h-5 w-96 max-w-full mb-6" />
            <div className="flex gap-3">
              <Skeleton className="h-11 w-36 rounded-lg" />
              <Skeleton className="h-11 w-28 rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mt-14 pt-8 border-t border-border">
          <Skeleton className="h-6 w-32 mb-4" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <div className="rounded-xl border border-border bg-card p-4">
                  <Skeleton className="aspect-video rounded-lg w-full mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
