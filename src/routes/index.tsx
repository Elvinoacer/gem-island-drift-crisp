import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { MarketplaceShell } from "@/components/marketplace-shell";
import { PharmacyCard } from "@/components/pharmacy-card";
import { listCities, listMarketplace } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { platform } from "@/lib/platform";
import { Input, Select } from "@/components/field";

type HomeSearch = { q?: string; city?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): HomeSearch => ({
    ...(typeof s.q === "string" && s.q ? { q: s.q } : {}),
    ...(typeof s.city === "string" && s.city ? { city: s.city } : {}),
  }),
  loaderDeps: ({ search }) => ({ q: search.q, city: search.city }),
  loader: async ({ deps }) => {
    const [pharmacies, cities] = await Promise.all([
      listMarketplace({ data: { q: deps.q, city: deps.city } }),
      listCities(),
    ]);
    return { pharmacies, cities };
  },
  head: () => pageHead("Aether — The pharmacy network for Kenya", platform.description),
  component: Home,
});

function Home() {
  const { pharmacies, cities } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const [q, setQ] = useState(search.q ?? "");
  const [city, setCity] = useState(search.city ?? "");

  function apply(e: FormEvent) {
    e.preventDefault();
    void navigate({
      search: {
        ...(q ? { q } : {}),
        ...(city ? { city } : {}),
      },
    });
  }

  return (
    <MarketplaceShell>
      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <img
          src="/images/gallery/welcoming_retail_floor.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-deep/90 to-forest/40" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Kenya · Licensed neighbourhood care
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              A pharmacist close to home. A network behind them.
            </h1>
            <p className="mt-5 max-w-lg text-base text-cream/80 sm:text-lg">{platform.promise}</p>
            <p className="mt-3 max-w-lg text-sm text-cream/70">{platform.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#directory" className="btn-gold">
                Find a pharmacy
              </a>
              <Link to="/for-pharmacies" className="btn-ghost border-cream/20 bg-transparent text-cream">
                List your pharmacy
              </Link>
            </div>
          </div>
          <form
            onSubmit={apply}
            className="surface-card animate-fade-up self-end rounded-3xl p-5 text-ink"
            style={{ animationDelay: "80ms" }}
          >
            <p className="font-display text-2xl">Search the network</p>
            <p className="mt-1 text-sm text-muted">Live shops only — each with its own hours, map, and catalogue.</p>
            <div className="mt-4 grid gap-3">
              <Input
                placeholder="Name, neighbourhood, or need"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search pharmacies"
              />
              <Select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              <button type="submit" className="btn-primary">
                Show pharmacies
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "PPB-licensed shops",
            body: "Every listed pharmacy carries a Pharmacy and Poisons Board licence. We review before they go live.",
          },
          {
            icon: Stethoscope,
            title: "Care, not just a counter",
            body: "Refills, vaccines, blood pressure, counselling — each shop publishes what it actually offers.",
          },
          {
            icon: Truck,
            title: "Local delivery",
            body: "Same-neighbourhood runs with fees and zones set by the pharmacy, not a faceless warehouse.",
          },
        ].map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-5">
            <item.icon className="size-5 text-forest" />
            <h2 className="mt-3 font-display text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </div>
        ))}
      </section>

      <section id="directory" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Directory</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Pharmacies on Aether</h2>
          </div>
          <p className="text-sm text-muted">{pharmacies.length} listed</p>
        </div>
        {pharmacies.length === 0 ? (
          <p className="mt-8 text-muted">No listed pharmacies match that search.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {pharmacies.map((p) => (
              <PharmacyCard key={p.id} pharmacy={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-forest text-cream md:grid md:grid-cols-2">
          <img
            src="/images/gallery/private_counselling.webp"
            alt="Pharmacist in a private counselling session"
            className="h-56 w-full object-cover md:h-full"
          />
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">For pharmacies</p>
            <h2 className="mt-3 font-display text-3xl">Your shop. Your patients. Our rails.</h2>
            <p className="mt-3 text-cream/80">
              Aether is infrastructure: a public storefront with local SEO, a working staff console, and a
              patient portal — isolated per pharmacy, reviewed before listing.
            </p>
            <Link to="/for-pharmacies" className="btn-gold mt-6">
              See how listing works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <MapPin className="size-4 text-forest" />
          Serving Nairobi, Mombasa, and shops joining from across Kenya.
        </p>
      </section>
    </MarketplaceShell>
  );
}
