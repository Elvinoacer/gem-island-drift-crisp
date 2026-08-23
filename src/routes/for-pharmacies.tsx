import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { MarketplaceShell } from "@/components/marketplace-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/for-pharmacies")({
  head: () =>
    pageHead(
      "For pharmacies · Aether",
      "List your licensed Kenyan pharmacy on Aether: a public storefront, staff console, and patient portal — reviewed before you go live.",
    ),
  component: ForPharmacies,
});

const STEPS = [
  {
    n: "01",
    title: "Apply with your licence",
    body: "Name, PPB number, address, and a short story. We review before anything is public.",
  },
  {
    n: "02",
    title: "Build the storefront",
    body: "Hours, map pin, gallery, services, and inventory — all scoped to your pharmacy, never mixed with the shop next door.",
  },
  {
    n: "03",
    title: "Go live in the directory",
    body: "Once approved, you list. Patients find you by city. Google sees a real Pharmacy with PostalAddress and GeoCoordinates.",
  },
];

const INCLUDED = [
  "Public storefront at /p/your-slug with unique SEO",
  "Location, hours, insurance, and WhatsApp",
  "Services, OTC catalogue, and health notes",
  "Staff console for refills, orders, and enquiries",
  "Patient portal with loyalty per shop",
  "Network review before listing",
];

function ForPharmacies() {
  return (
    <MarketplaceShell>
      <section className="bg-forest-deep text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Infrastructure</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
            The operating system for a neighbourhood pharmacy.
          </h1>
          <p className="mt-5 max-w-xl text-cream/75">
            Aether is not a marketplace that owns your patients. It is the storefront, the till-adjacent
            admin, and the listing that helps people on Kenyatta Avenue or Links Road find you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/onboard" className="btn-gold">
              List your pharmacy
            </Link>
            <Link to="/login" search={{ next: "/admin" }} className="btn-ghost border-cream/20 bg-transparent text-cream">
              Staff sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="surface-card rounded-2xl p-6">
            <p className="font-display text-3xl text-gold">{s.n}</p>
            <h2 className="mt-3 font-display text-2xl">{s.title}</h2>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-8 rounded-3xl bg-paper p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">What you get</p>
            <h2 className="mt-2 font-display text-3xl">Tenant isolation, on purpose.</h2>
            <p className="mt-3 text-muted">
              Refills, orders, inventory, and patients are always filtered by pharmacy. Staff only see
              shops they belong to. Platform admins review applications — they do not share catalogues.
            </p>
          </div>
          <ul className="space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-forest" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MarketplaceShell>
  );
}
