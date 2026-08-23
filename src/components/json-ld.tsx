import type { PharmacyStorefront } from "@/lib/types";
import { pharmacyPath } from "@/lib/platform";

export function PharmacyJsonLd({ pharmacy }: { pharmacy: PharmacyStorefront }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacy.name,
    description: pharmacy.description || pharmacy.tagline,
    image: pharmacy.coverImageUrl || pharmacy.images[0]?.url,
    telephone: pharmacy.phone,
    email: pharmacy.email,
    url: pharmacyPath(pharmacy.slug),
    address: {
      "@type": "PostalAddress",
      streetAddress: pharmacy.street,
      addressLocality: pharmacy.city,
      addressRegion: pharmacy.county,
      postalCode: pharmacy.zip,
      addressCountry: "KE",
    },
    areaServed: {
      "@type": "City",
      name: pharmacy.city,
    },
  };
  if (pharmacy.latitude != null && pharmacy.longitude != null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: pharmacy.latitude,
      longitude: pharmacy.longitude,
    };
    data.hasMap = `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`;
  }
  if (pharmacy.hours.length) {
    data.openingHours = pharmacy.hours.map((h) => `${h.day} ${h.time}`);
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
