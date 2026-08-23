export type PharmacyStatus =
  | "draft"
  | "submitted"
  | "needs_info"
  | "active"
  | "suspended"
  | "rejected";

export type StockStatus = "in_stock" | "low" | "out";

export type StaffRole = "owner" | "manager" | "pharmacist" | "staff";

export type PharmacyCard = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  about: string;
  status: PharmacyStatus;
  listed: boolean;
  featured: boolean;
  email: string;
  phone: string;
  whatsapp: string;
  street: string;
  city: string;
  county: string;
  country: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  mapsEmbedUrl: string;
  logoUrl: string;
  coverImageUrl: string;
  deliveryNotes: string;
  deliveryFeeKes: number;
  licenceNumber: string;
  rejectReason: string;
  insurance: string[];
};

export type HourRow = { day: string; time: string };
export type ImageRow = { url: string; alt: string; caption: string };
export type TeamRow = { name: string; role: string; bio: string; photoUrl: string };

export type Service = {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  imageUrl: string;
  duration: string;
  published: boolean;
};

export type Medicine = {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  category: string;
  categorySlug: string;
  description: string;
  form: string;
  strength: string;
  imageUrl: string;
};

export type InventoryItem = Medicine & {
  priceKes: number;
  stockStatus: StockStatus;
  listed: boolean;
  sku: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  imageUrl: string;
  content: string[];
};

export type PharmacyStorefront = PharmacyCard & {
  hours: HourRow[];
  images: ImageRow[];
  team: TeamRow[];
  services: Service[];
};

export type Membership = {
  pharmacyId: string;
  slug: string;
  name: string;
  role: StaffRole;
  status: PharmacyStatus;
  listed: boolean;
};

export type SessionProfile = {
  userId: string;
  displayName: string;
  phone: string;
  platformAdmin: boolean;
  activeStaffPharmacyId: string | null;
  memberships: Membership[];
  customerPharmacyIds: string[];
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

export type RefillRequest = {
  id: string;
  guestName: string;
  guestPhone: string;
  medication: string;
  notes: string;
  status: string;
  createdAt: string;
};

export type OrderRow = {
  id: string;
  guestName: string;
  status: string;
  totalKes: number;
  items: { name: string; qty: number; priceKes: number }[];
  createdAt: string;
};

export type CustomerRow = {
  userId: string;
  displayName: string;
  phone: string;
  loyaltyPoints: number;
  loyaltyTier: string;
  joinedAt: string;
};
