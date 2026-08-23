import { Link, createFileRoute } from "@tanstack/react-router";
import { listArticles } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";

export const Route = createFileRoute("/p/$slug/health/")({
  loader: () => listArticles(),
  head: ({ params }) =>
    pageHead(`Health notes · ${params.slug}`, "Pharmacist-written guidance from the Aether network."),
  component: Health,
});

function Health() {
  const pharmacy = usePharmacy();
  const articles = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Health notes</p>
      <h1 className="mt-2 font-display text-4xl">Guidance from {pharmacy.name}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        These notes are educational. They do not replace a clinician. For emergencies dial 999 or 112.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.id}
            to="/p/$slug/health/$articleSlug"
            params={{ slug: pharmacy.slug, articleSlug: a.slug }}
            className="surface-card overflow-hidden rounded-2xl"
          >
            <img src={a.imageUrl} alt="" className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                {a.category} · {a.readTime}
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight">{a.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
