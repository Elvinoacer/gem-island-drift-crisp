import { Link, useRouterState } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { PharmacyStorefront } from "@/lib/types";
import { formatKes, pharmacyPath, waLink } from "@/lib/platform";
import { BrandLockup } from "./brand";
import { AuthSlot } from "./auth-slot";
import { PharmacyJsonLd } from "./json-ld";
import { useCart } from "@/lib/cart";

export function StorefrontShell({
  pharmacy,
  children,
}: {
  pharmacy: PharmacyStorefront;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cartCount = useCart((s) =>
    s.pharmacySlug === pharmacy.slug ? s.items.reduce((n, i) => n + i.qty, 0) : 0,
  );
  const today = pharmacy.hours[0];
  const slug = pharmacy.slug;
  const nav = [
    { label: "Home", href: pharmacyPath(slug), match: pharmacyPath(slug) },
    { label: "About", href: pharmacyPath(slug, "/about"), match: pharmacyPath(slug, "/about") },
    { label: "Services", href: pharmacyPath(slug, "/services"), match: pharmacyPath(slug, "/services") },
    { label: "Medicines", href: pharmacyPath(slug, "/medicines"), match: pharmacyPath(slug, "/medicines") },
    { label: "Health", href: pharmacyPath(slug, "/health"), match: pharmacyPath(slug, "/health") },
    { label: "Location", href: pharmacyPath(slug, "/location"), match: pharmacyPath(slug, "/location") },
    { label: "Contact", href: pharmacyPath(slug, "/contact"), match: pharmacyPath(slug, "/contact") },
    { label: "Refill", href: pharmacyPath(slug, "/refill"), match: pharmacyPath(slug, "/refill") },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <PharmacyJsonLd pharmacy={pharmacy} />
      <div className="bg-forest-deep text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {pharmacy.street}, {pharmacy.city}
          </span>
          <span className="inline-flex items-center gap-3">
            {today ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {today.day}: {today.time}
              </span>
            ) : null}
            <a href={`tel:${pharmacy.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5">
              <Phone className="size-3.5" />
              {pharmacy.phone}
            </a>
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-cream/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLockup subtitle="Network" />
            <span className="hidden h-8 w-px bg-line sm:block" />
            <Link
              to="/p/$slug"
              params={{ slug }}
              className="min-w-0 truncate font-display text-lg font-semibold"
            >
              {pharmacy.name}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {cartCount > 0 ? (
              <Link to="/p/$slug/medicines" params={{ slug }} className="btn-ghost text-sm">
                Basket {cartCount}
              </Link>
            ) : null}
            <AuthSlot />
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {nav.map((item) => {
            const active =
              item.label === "Home"
                ? pathname === item.match
                : pathname === item.match || pathname.startsWith(`${item.match}/`);
            return (
              <a
                key={item.href}
                href={item.href}
                className={
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium " +
                  (active ? "bg-forest text-cream" : "text-ink/75 hover:bg-paper")
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>
      {children}
      <footer className="mt-16 border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{pharmacy.name}</p>
            <p className="mt-2 text-sm text-muted">{pharmacy.tagline}</p>
            <p className="mt-3 text-sm">
              {pharmacy.street}
              <br />
              {pharmacy.city}, {pharmacy.county} {pharmacy.zip}
            </p>
            <p className="mt-2 text-xs text-muted">Licence {pharmacy.licenceNumber}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Hours</p>
            <ul className="mt-3 space-y-1 text-sm">
              {pharmacy.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Visit</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href={`tel:${pharmacy.phone.replace(/\s/g, "")}`} className="btn-primary">
                <Phone className="size-4" /> Call
              </a>
              <a
                href={waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}`)}
                className="btn-ghost"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              {pharmacy.deliveryFeeKes > 0 ? (
                <p className="text-xs text-muted">
                  Delivery from {formatKes(pharmacy.deliveryFeeKes)} · {pharmacy.deliveryNotes}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="border-t border-line px-4 py-3 text-center text-xs text-muted">
          Part of the Aether Pharmacy Network · Not an emergency service · Dial 999 / 112
        </div>
      </footer>
      <a
        href={waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}, I have a question.`)}
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-cream shadow-lg"
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle className="size-4" /> Chat
      </a>
    </div>
  );
}
