import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { mapsDirections, pharmacyPath, waLink } from "@/lib/platform";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { usePharmacy } from "@/lib/storefront-context";

export const Route = createFileRoute("/p/$slug/")({
  component: Home,
});

function Home() {
  const pharmacy = usePharmacy();
  const hero = pharmacy.coverImageUrl || pharmacy.images[0]?.url;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Aether", path: "/" },
          { name: pharmacy.name, path: pharmacyPath(pharmacy.slug) },
        ]}
      />
      <section className="relative min-h-[70vh] overflow-hidden bg-forest-deep text-cream">
        {hero ? (
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {pharmacy.city}, {pharmacy.county} · Licence {pharmacy.licenceNumber}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{pharmacy.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-cream/85">{pharmacy.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/p/$slug/refill" params={{ slug: pharmacy.slug }} className="btn-gold">
              Request a refill
            </Link>
            <a href={`tel:${pharmacy.phone.replace(/\s/g, "")}`} className="btn-ghost border-cream/25 bg-transparent text-cream">
              <Phone className="size-4" /> {pharmacy.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-5">
          <MapPin className="size-5 text-forest" />
          <h2 className="mt-3 font-display text-xl">Find us</h2>
          <p className="mt-2 text-sm text-muted">
            {pharmacy.street}, {pharmacy.city}
          </p>
          {pharmacy.latitude != null && pharmacy.longitude != null ? (
            <a
              className="mt-3 inline-block text-sm font-semibold text-forest"
              href={mapsDirections(pharmacy.latitude, pharmacy.longitude)}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          ) : null}
        </div>
        <div className="surface-card rounded-2xl p-5">
          <Clock className="size-5 text-forest" />
          <h2 className="mt-3 font-display text-xl">Hours</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {pharmacy.hours.map((h) => (
              <li key={h.day}>
                {h.day}: {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-card rounded-2xl p-5">
          <ShieldCheck className="size-5 text-forest" />
          <h2 className="mt-3 font-display text-xl">Insurance</h2>
          <p className="mt-2 text-sm text-muted">{pharmacy.insurance.join(" · ") || "Ask in store"}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <p className="eyebrow">Care</p>
        <h2 className="mt-2 font-display text-3xl">Services at this shop</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacy.services.slice(0, 6).map((s) => (
            <Link
              key={s.id}
              to="/p/$slug/services/$serviceSlug"
              params={{ slug: pharmacy.slug, serviceSlug: s.slug }}
              className="surface-card overflow-hidden rounded-2xl"
            >
              <img src={s.imageUrl} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{s.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {pharmacy.images.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="eyebrow">Inside</p>
          <h2 className="mt-2 font-display text-3xl">The shop</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {pharmacy.images.map((img) => (
              <figure key={img.url} className="overflow-hidden rounded-2xl">
                <img src={img.url} alt={img.alt} className="h-40 w-full object-cover md:h-52" />
                <figcaption className="sr-only">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-forest px-6 py-10 text-cream md:flex md:items-center md:justify-between md:px-10">
          <div>
            <h2 className="font-display text-3xl">Need a refill today?</h2>
            <p className="mt-2 max-w-md text-cream/80">
              Send the medication name. We will confirm stock and SHA details by phone or WhatsApp.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link to="/p/$slug/refill" params={{ slug: pharmacy.slug }} className="btn-gold">
              Refill form
            </Link>
            <a
              href={waLink(pharmacy.whatsapp, `Refill request for ${pharmacy.name}`)}
              className="btn-ghost border-cream/25 bg-transparent text-cream"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
