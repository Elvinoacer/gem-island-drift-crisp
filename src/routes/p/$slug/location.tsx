import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";
import { mapsDirections } from "@/lib/platform";

export const Route = createFileRoute("/p/$slug/location")({
  head: ({ params }) =>
    pageHead(`Location · ${params.slug}`, "Map, hours, and directions to this Aether pharmacy."),
  component: LocationPage,
});

function LocationPage() {
  const pharmacy = usePharmacy();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Location</p>
      <h1 className="mt-2 font-display text-4xl">
        {pharmacy.name}, {pharmacy.city}
      </h1>
      <p className="mt-3 text-muted">
        {pharmacy.street}, {pharmacy.city}, {pharmacy.county} {pharmacy.zip}, {pharmacy.country}
      </p>
      {pharmacy.latitude != null && pharmacy.longitude != null ? (
        <p className="mt-1 text-sm tabular-nums text-muted">
          {pharmacy.latitude.toFixed(5)}, {pharmacy.longitude.toFixed(5)}
        </p>
      ) : null}
      {pharmacy.mapsEmbedUrl ? (
        <div className="mt-6 overflow-hidden rounded-3xl border border-line">
          <iframe
            title={`Map of ${pharmacy.name}`}
            src={pharmacy.mapsEmbedUrl}
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {pharmacy.latitude != null && pharmacy.longitude != null ? (
          <a
            className="btn-primary"
            href={mapsDirections(pharmacy.latitude, pharmacy.longitude)}
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        ) : null}
        <a href={`tel:${pharmacy.phone.replace(/\s/g, "")}`} className="btn-ghost">
          Call {pharmacy.phone}
        </a>
      </div>
      {pharmacy.deliveryNotes ? (
        <p className="mt-8 max-w-2xl text-sm text-muted">{pharmacy.deliveryNotes}</p>
      ) : null}
    </div>
  );
}
