import { Link, createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";

export const Route = createFileRoute("/p/$slug/services/")({
  head: ({ params }) => pageHead(`Services · ${params.slug}`, "Clinical and retail services at this pharmacy."),
  component: Services,
});

function Services() {
  const pharmacy = usePharmacy();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Services</p>
      <h1 className="mt-2 font-display text-4xl">What we offer at {pharmacy.name}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Walk-in where noted. Prescription services require a valid script. Vaccines after screening and consent.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {pharmacy.services.map((s) => (
          <Link
            key={s.id}
            to="/p/$slug/services/$serviceSlug"
            params={{ slug: pharmacy.slug, serviceSlug: s.slug }}
            className="surface-card overflow-hidden rounded-2xl"
          >
            <img src={s.imageUrl} alt="" className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest">{s.duration}</p>
              <h2 className="mt-1 font-display text-2xl">{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
