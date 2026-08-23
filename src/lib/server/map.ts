import type {
  Article,
  CustomerRow,
  Enquiry,
  HourRow,
  ImageRow,
  InventoryItem,
  Membership,
  OrderRow,
  PharmacyCard,
  PharmacyStatus,
  RefillRequest,
  Service,
  StaffRole,
  StockStatus,
  TeamRow,
} from "@/lib/types";

export function parseJson<T>(raw: unknown, fallback: T): T {
  if (Array.isArray(raw) || (raw && typeof raw === "object")) return raw as T;
  if (typeof raw !== "string" || !raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function mapPharmacy(r: Record<string, unknown>): PharmacyCard {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    tagline: String(r.tagline ?? ""),
    description: String(r.description ?? ""),
    about: String(r.about ?? ""),
    status: String(r.status) as PharmacyStatus,
    listed: Boolean(r.listed),
    featured: Boolean(r.featured),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    whatsapp: String(r.whatsapp ?? ""),
    street: String(r.street ?? ""),
    city: String(r.city ?? ""),
    county: String(r.county ?? ""),
    country: String(r.country ?? "Kenya"),
    zip: String(r.zip ?? ""),
    latitude: r.latitude == null ? null : Number(r.latitude),
    longitude: r.longitude == null ? null : Number(r.longitude),
    mapsEmbedUrl: String(r.maps_embed_url ?? ""),
    logoUrl: String(r.logo_url ?? ""),
    coverImageUrl: String(r.cover_image_url ?? ""),
    deliveryNotes: String(r.delivery_notes ?? ""),
    deliveryFeeKes: Number(r.delivery_fee_kes ?? 0),
    licenceNumber: String(r.licence_number ?? ""),
    rejectReason: String(r.reject_reason ?? ""),
    insurance: parseJson<string[]>(r.insurance, []),
  };
}

export function mapHour(r: Record<string, unknown>): HourRow {
  return { day: String(r.day), time: String(r.time) };
}
export function mapImage(r: Record<string, unknown>): ImageRow {
  return { url: String(r.url), alt: String(r.alt ?? ""), caption: String(r.caption ?? "") };
}
export function mapTeam(r: Record<string, unknown>): TeamRow {
  return {
    name: String(r.name),
    role: String(r.role),
    bio: String(r.bio ?? ""),
    photoUrl: String(r.photo_url ?? ""),
  };
}
export function mapService(r: Record<string, unknown>): Service {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    short: String(r.short ?? ""),
    description: String(r.description ?? ""),
    imageUrl: String(r.image_url ?? ""),
    duration: String(r.duration ?? ""),
    published: Boolean(r.published),
  };
}
export function mapInventory(r: Record<string, unknown>): InventoryItem {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    genericName: String(r.generic_name ?? ""),
    category: String(r.category),
    categorySlug: String(r.category_slug),
    description: String(r.description ?? ""),
    form: String(r.form ?? ""),
    strength: String(r.strength ?? ""),
    imageUrl: String(r.image_url ?? ""),
    priceKes: Number(r.price_kes ?? 0),
    stockStatus: String(r.stock_status ?? "in_stock") as StockStatus,
    listed: Boolean(r.listed),
    sku: String(r.sku ?? ""),
  };
}
export function mapArticle(r: Record<string, unknown>): Article {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    excerpt: String(r.excerpt ?? ""),
    category: String(r.category ?? ""),
    readTime: String(r.read_time ?? ""),
    author: String(r.author ?? ""),
    imageUrl: String(r.image_url ?? ""),
    content: parseJson<string[]>(r.content, []),
  };
}
export function mapMembership(r: Record<string, unknown>): Membership {
  return {
    pharmacyId: String(r.pharmacy_id),
    slug: String(r.slug),
    name: String(r.name),
    role: String(r.role) as StaffRole,
    status: String(r.status) as PharmacyStatus,
    listed: Boolean(r.listed),
  };
}
export function mapEnquiry(r: Record<string, unknown>): Enquiry {
  return {
    id: String(r.id),
    name: String(r.name),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    subject: String(r.subject ?? ""),
    message: String(r.message),
    status: String(r.status),
    createdAt: String(r.created_at),
  };
}
export function mapRefill(r: Record<string, unknown>): RefillRequest {
  return {
    id: String(r.id),
    guestName: String(r.guest_name ?? ""),
    guestPhone: String(r.guest_phone ?? ""),
    medication: String(r.medication),
    notes: String(r.notes ?? ""),
    status: String(r.status),
    createdAt: String(r.created_at),
  };
}
export function mapOrder(r: Record<string, unknown>): OrderRow {
  return {
    id: String(r.id),
    guestName: String(r.guest_name ?? ""),
    status: String(r.status),
    totalKes: Number(r.total_kes ?? 0),
    items: parseJson(r.items, []),
    createdAt: String(r.created_at),
  };
}
export function mapCustomer(r: Record<string, unknown>): CustomerRow {
  return {
    userId: String(r.user_id),
    displayName: String(r.display_name ?? "Patient"),
    phone: String(r.phone ?? ""),
    loyaltyPoints: Number(r.loyalty_points ?? 0),
    loyaltyTier: String(r.loyalty_tier ?? "Member"),
    joinedAt: String(r.created_at),
  };
}
