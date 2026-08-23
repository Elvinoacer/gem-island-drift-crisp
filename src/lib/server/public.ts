import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { ensureSeed } from "./seed";
import {
  mapArticle,
  mapHour,
  mapImage,
  mapInventory,
  mapPharmacy,
  mapService,
  mapTeam,
} from "./map";
import type { PharmacyStorefront } from "@/lib/types";

async function loadStorefront(slug: string, opts?: { allowUnlisted?: boolean }): Promise<PharmacyStorefront | null> {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql`select * from pharmacies where slug = ${slug} limit 1`;
  if (!rows[0]) return null;
  const p = mapPharmacy(rows[0]);
  if (!opts?.allowUnlisted && !(p.status === "active" && p.listed)) return null;
  const [hours, images, team, services] = await Promise.all([
    sql`select day, time from pharmacy_hours where pharmacy_id = ${p.id} order by sort_order`,
    sql`select url, alt, caption from pharmacy_images where pharmacy_id = ${p.id} order by sort_order`,
    sql`select name, role, bio, photo_url from pharmacy_team where pharmacy_id = ${p.id} order by sort_order`,
    sql`select * from services where pharmacy_id = ${p.id} and published = true order by title`,
  ]);
  return {
    ...p,
    hours: hours.map(mapHour),
    images: images.map(mapImage),
    team: team.map(mapTeam),
    services: services.map(mapService),
  };
}

export const listMarketplace = createServerFn({ method: "GET" })
  .validator(z.object({ q: z.string().optional(), city: z.string().optional() }))
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const q = data.q?.trim().toLowerCase() ?? "";
    const city = data.city?.trim() ?? "";
    const rows = await sql`
      select * from pharmacies
      where status = 'active' and listed = true
      order by featured desc, name asc
    `;
    return rows
      .map(mapPharmacy)
      .filter((p) => {
        if (city && p.city.toLowerCase() !== city.toLowerCase()) return false;
        if (!q) return true;
        const hay = `${p.name} ${p.tagline} ${p.city} ${p.county} ${p.description}`.toLowerCase();
        return hay.includes(q);
      });
  });

export const listCities = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<{ city: string }>`
    select distinct city from pharmacies
    where status = 'active' and listed = true
    order by city
  `;
  return rows.map((r) => r.city);
});

export const getStorefront = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => loadStorefront(data.slug));

export const getServicePage = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string(), serviceSlug: z.string() }))
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) return null;
    const service = pharmacy.services.find((s) => s.slug === data.serviceSlug) ?? null;
    return { pharmacy, service };
  });

export const listMedicines = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string(), q: z.string().optional(), category: z.string().optional() }))
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) return null;
    const sql = await getSql();
    const rows = await sql`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${pharmacy.id} and i.listed = true
      order by m.category, m.name
    `;
    let items = rows.map(mapInventory);
    const q = data.q?.trim().toLowerCase() ?? "";
    if (data.category) items = items.filter((i) => i.categorySlug === data.category);
    if (q) {
      items = items.filter((i) =>
        `${i.name} ${i.genericName} ${i.category}`.toLowerCase().includes(q),
      );
    }
    const categories = [...new Map(items.map((i) => [i.categorySlug, i.category])).entries()].map(
      ([slug, title]) => ({ slug, title }),
    );
    return { pharmacy, items, categories };
  });

export const getMedicinePage = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string(), medSlug: z.string() }))
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) return null;
    const sql = await getSql();
    const rows = await sql`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${pharmacy.id} and m.slug = ${data.medSlug} and i.listed = true
      limit 1
    `;
    if (!rows[0]) return { pharmacy, item: null, related: [] };
    const item = mapInventory(rows[0]);
    const relatedRows = await sql`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${pharmacy.id} and i.listed = true
        and m.category_slug = ${item.categorySlug} and m.id <> ${item.id}
      limit 4
    `;
    return { pharmacy, item, related: relatedRows.map(mapInventory) };
  });

export const listArticles = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql`select * from health_articles where published = true order by title`;
  return rows.map(mapArticle);
});

export const getArticle = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string(), articleSlug: z.string() }))
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) return null;
    const sql = await getSql();
    const rows = await sql`select * from health_articles where slug = ${data.articleSlug} and published = true limit 1`;
    return { pharmacy, article: rows[0] ? mapArticle(rows[0]) : null };
  });

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      name: z.string().min(2),
      email: z.string().email().or(z.literal("")),
      phone: z.string().min(7),
      subject: z.string().min(2),
      message: z.string().min(8),
    }),
  )
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) throw new Error("Pharmacy not found");
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into enquiries (id, pharmacy_id, name, email, phone, subject, message, status)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.email}, ${data.phone}, ${data.subject}, ${data.message}, ${"open"})
    `;
    return { ok: true, id };
  });

export const submitRefill = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      name: z.string().min(2),
      phone: z.string().min(7),
      medication: z.string().min(2),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) throw new Error("Pharmacy not found");
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into refill_requests (id, pharmacy_id, guest_name, guest_phone, medication, notes, status)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.phone}, ${data.medication}, ${data.notes ?? ""}, ${"pending"})
    `;
    return { ok: true, id };
  });

export const submitOrder = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      name: z.string().min(2),
      phone: z.string().min(7),
      items: z.array(z.object({ name: z.string(), qty: z.number(), priceKes: z.number() })).min(1),
    }),
  )
  .handler(async ({ data }) => {
    const pharmacy = await loadStorefront(data.slug);
    if (!pharmacy) throw new Error("Pharmacy not found");
    const sql = await getSql();
    const id = crypto.randomUUID();
    const total = data.items.reduce((s, i) => s + i.priceKes * i.qty, 0);
    await sql`
      insert into orders (id, pharmacy_id, guest_name, guest_phone, status, total_kes, items)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.phone}, ${"received"}, ${total}, ${JSON.stringify(data.items)})
    `;
    return { ok: true, id, total };
  });
