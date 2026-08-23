import { createFileRoute, notFound } from "@tanstack/react-router";
import { getArticle } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { pharmacyPath } from "@/lib/platform";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { Article, PharmacyStorefront } from "@/lib/types";

export const Route = createFileRoute("/p/$slug/health/$articleSlug")({
  loader: async ({ params }) => {
    const data = await getArticle({ data: { slug: params.slug, articleSlug: params.articleSlug } });
    if (!data?.article) throw notFound();
    return data as { pharmacy: PharmacyStorefront; article: Article };
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? `${loaderData.article.title} · ${loaderData.pharmacy.name}` : "Article",
      loaderData?.article.excerpt ?? "",
    ),
  component: ArticlePage,
});

function ArticlePage() {
  const { pharmacy, article } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Aether", path: "/" },
          { name: pharmacy.name, path: pharmacyPath(pharmacy.slug) },
          { name: "Health", path: pharmacyPath(pharmacy.slug, "/health") },
          { name: article.title, path: pharmacyPath(pharmacy.slug, `/health/${article.slug}`) },
        ]}
      />
      <img src={article.imageUrl} alt="" className="h-64 w-full rounded-3xl object-cover" />
      <p className="eyebrow mt-8">
        {article.category} · {article.readTime}
      </p>
      <h1 className="mt-2 font-display text-4xl">{article.title}</h1>
      <p className="mt-3 text-sm text-muted">By {article.author}</p>
      <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
      <div className="mt-8 space-y-4 text-base leading-relaxed">
        {article.content.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="mt-10 text-xs text-muted">
        Published for patients of {pharmacy.name}, {pharmacy.city}. Not medical advice.
      </p>
    </article>
  );
}
