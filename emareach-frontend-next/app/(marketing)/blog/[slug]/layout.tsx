import type { Metadata } from "next";
import { fetchBlogBySlug } from "@/lib/server-api";
import { getBlogPostJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 86400; // 1 day; invalidation is via ?_v=version (no full payload until version changes)

function truncate(text: string, maxLen: number): string {
  const stripped = text.replace(/\s+/g, " ").trim();
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen - 3) + "...";
}

type Post = {
  title?: string;
  excerpt?: string | null;
  featured_image_url?: string | null;
  keywords?: string | null;
  tags?: string[] | null;
  created_at?: string;
  updated_at?: string | null;
};

async function fetchPost(slug: string): Promise<Post | null> {
  const raw = await fetchBlogBySlug(slug);
  return raw as Post | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Blog | EmaReach AI" };
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: "Post Not Found | EmaReach AI" };
  const p = post as Post;
  const title = (p.title ?? "Post") + " | EmaReach AI";
  const description = p.excerpt
    ? truncate(p.excerpt, 160)
    : p.title
      ? truncate(p.title, 160)
      : undefined;
  const keywordsFromPost = p.keywords?.trim() ? p.keywords.split(/,\s*/) : [];
  const tagsList = Array.isArray(p.tags) ? p.tags : [];
  const keywords = [...keywordsFromPost, ...tagsList].filter(Boolean).join(", ") || undefined;
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description: description ?? undefined,
      images: p.featured_image_url ? [{ url: p.featured_image_url, alt: p.title ?? "" }] : undefined,
      type: "article",
      publishedTime: p.created_at ?? undefined,
      authors: [SITE_NAME],
      url: `${SITE_URL}/blog/${encodeURIComponent(slug)}`,
    },
  };
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = slug ? await fetchPost(slug) : null;
  const jsonLd = post ? getBlogPostJsonLd(post, slug) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
