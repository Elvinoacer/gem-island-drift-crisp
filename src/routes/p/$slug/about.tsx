import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";

export const Route = createFileRoute("/p/$slug/about")({
  head: ({ params }) =>
    pageHead(`About · ${params.slug}`, "Meet the pharmacists and the story of this neighbourhood shop."),
  component: About,
});

function About() {
  const pharmacy = usePharmacy();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 font-display text-4xl">{pharmacy.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{pharmacy.about || pharmacy.description}</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-xs uppercase tracking-wider text-muted">Licence</dt>
          <dd className="mt-1 font-medium">{pharmacy.licenceNumber}</dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-xs uppercase tracking-wider text-muted">City</dt>
          <dd className="mt-1 font-medium">
            {pharmacy.city}, {pharmacy.county}
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-xs uppercase tracking-wider text-muted">Insurance</dt>
          <dd className="mt-1 font-medium">{pharmacy.insurance.join(", ") || "Ask in store"}</dd>
        </div>
      </dl>
      <h2 className="mt-12 font-display text-3xl">The team</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pharmacy.team.map((m) => (
          <article key={m.name} className="surface-card overflow-hidden rounded-2xl">
            {m.photoUrl ? <img src={m.photoUrl} alt="" className="h-48 w-full object-cover" /> : null}
            <div className="p-4">
              <h3 className="font-display text-xl leading-tight">{m.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-forest">{m.role}</p>
              <p className="mt-2 text-sm text-muted">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
