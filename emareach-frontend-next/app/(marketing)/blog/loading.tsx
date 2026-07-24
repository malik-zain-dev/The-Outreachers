import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="fixed inset-0 z-[100] min-h-screen overflow-auto bg-background">
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </div>
            <Skeleton className="h-12 w-full max-w-xl mx-auto mb-4" />
            <Skeleton className="h-6 w-96 max-w-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-10 max-w-7xl mx-auto items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-9 w-14 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-32 rounded-full" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 min-w-0">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                    role="status"
                    aria-label="Loading blog post"
                  >
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-5 lg:p-6">
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-4/5 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-3" />
                      <div className="flex gap-1.5 mb-3">
                        <Skeleton className="h-5 w-14 rounded-md" />
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-12 rounded-md" />
                      </div>
                      <Skeleton className="h-4 w-24 mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="hidden lg:block sticky top-28 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <Skeleton className="h-4 w-24 mb-3" />
                <ul className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i}>
                      <Skeleton className="h-4 w-20" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-full mb-4" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </aside>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>

          <div className="max-w-3xl mx-auto mt-20 text-center">
            <Skeleton className="h-5 w-64 mx-auto mb-4" />
            <Skeleton className="h-11 w-40 mx-auto rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
