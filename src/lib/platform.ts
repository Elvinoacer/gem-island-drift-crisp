export const platform = {
  name: "Aether",
  legalName: "Aether Pharmacy Network",
  tagline: "The pharmacy network for Kenya",
  promise: "We promise life, and we promise caring.",
  description:
    "One patient account. Every neighbourhood pharmacy. Prescriptions, refills, vaccinations, and a pharmacist who still knows your name — from a licensed shop close to home.",
  email: "hello@aether.health",
  phone: "+254 790 670 542",
  phoneHref: "tel:+254790670542",
  whatsapp: "+254790670542",
  whatsappHref: "https://wa.me/254790670542",
  country: "Kenya",
  regulator: "Pharmacy and Poisons Board",
  emergency: "999",
  emergencyAlt: "112",
};

export function pharmacyPath(slug: string, path = "/") {
  const rest = path === "/" ? "" : path;
  return `/p/${slug}${rest}`;
}

export function mapsEmbed(lat: number, lng: number) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

export function mapsDirections(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function waLink(phone: string, text?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}

export function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}
