import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";
import { getUseCaseBySlug, useCaseSlugs } from "@/lib/use-cases-data";

type UseCaseRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return useCaseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: UseCaseRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) {
    return {
      title: "Use Case Not Found | EmaReach",
      description: "The requested use case page does not exist.",
    };
  }

  return {
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    keywords: useCase.keywords,
  };
}

export default async function UseCaseRolePage({ params }: UseCaseRouteProps) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) notFound();

  return <UseCaseDetailPage useCase={useCase} />;
}
