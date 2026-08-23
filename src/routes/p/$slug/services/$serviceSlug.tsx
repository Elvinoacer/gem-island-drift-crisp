import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getServicePage } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { pharmacyPath } from "@/lib/platform";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { PharmacyStorefront, Service } from "@/lib/types";

export const Route = createFileRoute("/p/$slug/services/$serviceSlug")({
  loader: async ({ params }) => {
    const data = await getServicePage({ data: { slug: params.slug, serviceSlug: params.serviceSlug } });
    if (!data?.service) throw notFound();
    return data as { pharmacy: PharmacyStorefront; service: Service };
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData
        ? `${loaderData.service.title} at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}`
        : "Service",
      loaderData?.service.short ?? "",
    ),
  component: ServicePage,
});

function ServicePage() {
  const { pharmacy, service } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Aether", path: "/" },
          { name: pharmacy.name, path: pharmacyPath(pharmacy.slug) },
          { name: "Services", path: pharmacyPath(pharmacy.slug, "/services") },
          { name: service.title, path: pharmacyPath(pharmacy.slug, `/services/${service.slug}`) },
        ]}
      />
      <img src={service.imageUrl} alt="" className="h-64 w-full rounded-3xl object-cover" />
      <p className="eyebrow mt-8">{service.duration}</p>
      <h1 className="mt-2 font-display text-4xl">{service.title}</h1>
      <p className="mt-4 text-lg text-muted">{service.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/p/$slug/contact" params={{ slug: pharmacy.slug }} className="btn-primary">
          Ask this pharmacy
        </Link>
        <Link to="/p/$slug/refill" params={{ slug: pharmacy.slug }} className="btn-ghost">
          Request a refill
        </Link>
      </div>
    </div>
  );
}
