import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonDetailPage } from "@/components/comparisons/ComparisonDetailPage";
import { comparisonSlugs, getComparisonBySlug } from "@/lib/comparisons-data";

type ComparisonRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ComparisonRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return {
      title: "Comparison Not Found | EmaReach",
      description: "The requested comparison page does not exist.",
    };
  }

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    keywords: comparison.keywords,
  };
}

export default async function ComparisonPage({ params }: ComparisonRouteProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) notFound();

  return <ComparisonDetailPage comparison={comparison} />;
}
