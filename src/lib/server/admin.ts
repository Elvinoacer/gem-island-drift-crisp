import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { loadProfile } from "./session";
import { mapsEmbed } from "@/lib/platform";
import {
  mapCustomer,
  mapEnquiry,
  mapHour,
  mapImage,
  mapInventory,
  mapOrder,
  mapPharmacy,
  mapRefill,
  mapService,
} from "./map";
import type { Membership } from "@/lib/types";

async function requireMembership(userId: string, pharmacyId?: string | null) {
  const profile = await loadProfile(userId);
  if (profile.memberships.length === 0) throw new Error("No pharmacy access");
  const id = pharmacyId || profile.activeStaffPharmacyId || profile.memberships[0].pharmacyId;
  const membership = profile.memberships.find((m) => m.pharmacyId === id);
  if (!membership) throw new Error("Not a member of this pharmacy");
  return { profile, membership };
}

export const getAdminDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string().optional() }))
  .handler(async ({ context, data }) => {
    const { profile, membership } = await requireMembership(context.userId, data.pharmacyId);
    const sql = await getSql();
    const pid = membership.pharmacyId;
    const pharmacyRows = await sql`select * from pharmacies where id = ${pid} limit 1`;
    const pharmacy = mapPharmacy(pharmacyRows[0]);
    const [refills, enquiries, orders, inventory, customers] = await Promise.all([
      sql<{ n: number; pending: number }>`select count(*)::int as n, count(*) filter (where status = 'pending')::int as pending from refill_requests where pharmacy_id = ${pid}`,
      sql<{ n: number; open: number }>`select count(*)::int as n, count(*) filter (where status = 'open')::int as open from enquiries where pharmacy_id = ${pid}`,
      sql<{ n: number }>`select count(*)::int as n from orders where pharmacy_id = ${pid}`,
      sql<{ n: number; low: number }>`select count(*)::int as n, count(*) filter (where stock_status = 'low' or stock_status = 'out')::int as low from pharmacy_inventory where pharmacy_id = ${pid}`,
      sql<{ n: number }>`select count(*)::int as n from customer_pharmacies where pharmacy_id = ${pid}`,
    ]);
    const recentRefills = await sql`select * from refill_requests where pharmacy_id = ${pid} order by created_at desc limit 6`;
    const recentEnquiries = await sql`select * from enquiries where pharmacy_id = ${pid} order by created_at desc limit 6`;
    return {
      profile,
      membership,
      pharmacy,
      stats: {
        refills: refills[0]?.n ?? 0,
        pendingRefills: refills[0]?.pending ?? 0,
        enquiries: enquiries[0]?.n ?? 0,
        openEnquiries: enquiries[0]?.open ?? 0,
        orders: orders[0]?.n ?? 0,
        sku: inventory[0]?.n ?? 0,
        lowStock: inventory[0]?.low ?? 0,
        customers: customers[0]?.n ?? 0,
      },
      recentRefills: recentRefills.map(mapRefill),
      recentEnquiries: recentEnquiries.map(mapEnquiry),
    };
  });

export const setActivePharmacy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string() }))
  .handler(async ({ context, data }) => {
    await requireMembership(context.userId, data.pharmacyId);
    const sql = await getSql();
    await sql`update user_profiles set active_staff_pharmacy_id = ${data.pharmacyId} where user_id = ${context.userId}`;
    return { ok: true };
  });

export const getAdminStorefront = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const pharmacy = mapPharmacy((await sql`select * from pharmacies where id = ${membership.pharmacyId}`)[0]);
    const hours = (await sql`select day, time from pharmacy_hours where pharmacy_id = ${membership.pharmacyId} order by sort_order`).map(mapHour);
    const images = (await sql`select url, alt, caption from pharmacy_images where pharmacy_id = ${membership.pharmacyId} order by sort_order`).map(mapImage);
    return { profile, membership, pharmacy, hours, images };
  });

export const saveStorefront = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(2),
      tagline: z.string(),
      description: z.string(),
      about: z.string(),
      phone: z.string(),
      email: z.string(),
      whatsapp: z.string(),
      street: z.string(),
      city: z.string(),
      county: z.string(),
      zip: z.string(),
      latitude: z.string(),
      longitude: z.string(),
      deliveryNotes: z.string(),
      deliveryFeeKes: z.coerce.number(),
      hoursText: z.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    const lat = data.latitude.trim() ? Number(data.latitude) : null;
    const lng = data.longitude.trim() ? Number(data.longitude) : null;
    const embed = lat != null && lng != null ? mapsEmbed(lat, lng) : "";
    await sql`
      update pharmacies set
        name = ${data.name},
        tagline = ${data.tagline},
        description = ${data.description},
        about = ${data.about},
        phone = ${data.phone},
        email = ${data.email},
        whatsapp = ${data.whatsapp},
        street = ${data.street},
        city = ${data.city},
        county = ${data.county},
        zip = ${data.zip},
        latitude = ${lat},
        longitude = ${lng},
        maps_embed_url = ${embed},
        delivery_notes = ${data.deliveryNotes},
        delivery_fee_kes = ${data.deliveryFeeKes},
        updated_at = now()
      where id = ${membership.pharmacyId}
    `;
    await sql`delete from pharmacy_hours where pharmacy_id = ${membership.pharmacyId}`;
    const lines = data.hoursText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      const [day, time] = lines[i].split("|").map((s) => s.trim());
      if (!day) continue;
      await sql`
        insert into pharmacy_hours (id, pharmacy_id, sort_order, day, time)
        values (${crypto.randomUUID()}, ${membership.pharmacyId}, ${i}, ${day}, ${time || "By appointment"})
      `;
    }
    return { ok: true };
  });

export const listAdminMedicines = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${membership.pharmacyId}
      order by m.name
    `;
    return { profile, membership, items: rows.map(mapInventory) };
  });

export const updateInventory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      medicineId: z.string(),
      priceKes: z.coerce.number(),
      stockStatus: z.enum(["in_stock", "low", "out"]),
      listed: z.boolean(),
    }),
  )
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    await sql`
      update pharmacy_inventory
      set price_kes = ${data.priceKes}, stock_status = ${data.stockStatus}, listed = ${data.listed}
      where pharmacy_id = ${membership.pharmacyId} and medicine_id = ${data.medicineId}
    `;
    return { ok: true };
  });

export const listAdminRefills = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from refill_requests where pharmacy_id = ${membership.pharmacyId} order by created_at desc`;
    return { profile, membership, items: rows.map(mapRefill) };
  });

export const updateRefillStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string(), status: z.string() }))
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    await sql`update refill_requests set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
    return { ok: true };
  });

export const listAdminEnquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from enquiries where pharmacy_id = ${membership.pharmacyId} order by created_at desc`;
    return { profile, membership, items: rows.map(mapEnquiry) };
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string(), status: z.string() }))
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    await sql`update enquiries set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
    return { ok: true };
  });

export const listAdminOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from orders where pharmacy_id = ${membership.pharmacyId} order by created_at desc`;
    return { profile, membership, items: rows.map(mapOrder) };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string(), status: z.string() }))
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    await sql`update orders set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
    return { ok: true };
  });

export const listAdminCustomers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`
      select c.user_id, c.loyalty_points, c.loyalty_tier, c.created_at,
             coalesce(p.display_name, 'Patient') as display_name, coalesce(p.phone, '') as phone
      from customer_pharmacies c
      left join user_profiles p on p.user_id = c.user_id
      where c.pharmacy_id = ${membership.pharmacyId}
      order by c.created_at desc
    `;
    return { profile, membership, items: rows.map(mapCustomer) };
  });

export const listAdminServices = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { membership, profile } = await requireMembership(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from services where pharmacy_id = ${membership.pharmacyId} order by title`;
    return { profile, membership, items: rows.map(mapService) };
  });

export const toggleService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string(), published: z.boolean() }))
  .handler(async ({ context, data }) => {
    const { membership } = await requireMembership(context.userId);
    const sql = await getSql();
    await sql`update services set published = ${data.published} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
    return { ok: true };
  });

export type { Membership };
