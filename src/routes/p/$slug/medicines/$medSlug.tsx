import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatKes, pharmacyPath } from "@/lib/platform";
import { getMedicinePage } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { useCart } from "@/lib/cart";
import { StatusBadge } from "@/components/status-badge";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { InventoryItem, PharmacyStorefront } from "@/lib/types";

export const Route = createFileRoute("/p/$slug/medicines/$medSlug")({
  loader: async ({ params }) => {
    const data = await getMedicinePage({ data: { slug: params.slug, medSlug: params.medSlug } });
    if (!data?.item) throw notFound();
    return data as { pharmacy: PharmacyStorefront; item: InventoryItem; related: InventoryItem[] };
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData
        ? `${loaderData.item.name} at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}`
        : "Medicine",
      loaderData?.item.description ?? "",
    ),
  component: MedicinePage,
});

function MedicinePage() {
  const { pharmacy, item, related } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Aether", path: "/" },
          { name: pharmacy.name, path: pharmacyPath(pharmacy.slug) },
          { name: "Medicines", path: pharmacyPath(pharmacy.slug, "/medicines") },
          { name: item.name, path: pharmacyPath(pharmacy.slug, `/medicines/${item.slug}`) },
        ]}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <img src={item.imageUrl} alt="" className="h-72 w-full rounded-3xl object-cover" />
        <div>
          <StatusBadge status={item.stockStatus} />
          <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
          <p className="mt-2 text-muted">
            {item.genericName} · {item.form} · {item.strength}
          </p>
          <p className="mt-4">{item.description}</p>
          <p className="mt-6 font-display text-3xl tabular-nums">{formatKes(item.priceKes)}</p>
          <p className="mt-1 text-xs text-muted">SKU {item.sku} · Sold by {pharmacy.name}</p>
          <button
            type="button"
            className="btn-primary mt-6"
            disabled={item.stockStatus === "out"}
            onClick={() => {
              add(pharmacy.slug, {
                medicineId: item.id,
                slug: item.slug,
                name: item.name,
                priceKes: item.priceKes,
              });
              toast.success(`Added ${item.name}`);
            }}
          >
            Add to basket
          </button>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl">Also in {item.category}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/p/$slug/medicines/$medSlug"
                params={{ slug: pharmacy.slug, medSlug: r.slug }}
              >
                <div className="surface-card rounded-2xl p-4">
                  <p className="font-display text-xl">{r.name}</p>
                  <p className="text-sm text-muted">{formatKes(r.priceKes)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
