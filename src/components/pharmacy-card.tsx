import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import type { PharmacyCard as PharmacyCardType } from "@/lib/types";
import { pharmacyPath } from "@/lib/platform";

export function PharmacyCard({ pharmacy }: { pharmacy: PharmacyCardType }) {
  return (
    <Link
      to="/p/$slug"
      params={{ slug: pharmacy.slug }}
      className="surface-card group flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
        <img
          src={pharmacy.coverImageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {pharmacy.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-ink">
            Featured
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">
          {pharmacy.city}, {pharmacy.county}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-tight">{pharmacy.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{pharmacy.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {pharmacy.street}
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3.5" />
            {pharmacy.phone}
          </span>
        </div>
        <span className="mt-4 text-sm font-semibold text-forest">
          Visit {pharmacyPath(pharmacy.slug).replace(/^\//, "")} →
        </span>
      </div>
    </Link>
  );
}
