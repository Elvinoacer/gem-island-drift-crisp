import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { loadProfile } from "./session";
import { mapPharmacy } from "./map";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export const submitOnboard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(3),
      slug: z.string().optional(),
      tagline: z.string().min(4),
      city: z.string().min(2),
      county: z.string().min(2),
      street: z.string().min(3),
      phone: z.string().min(7),
      email: z.string().email(),
      licenceNumber: z.string().min(4),
      about: z.string().min(12),
    }),
  )
  .handler(async ({ context, data }) => {
    await loadProfile(context.userId);
    const sql = await getSql();
    let slug = slugify(data.slug || data.name);
    if (!slug) slug = `pharmacy-${crypto.randomUUID().slice(0, 8)}`;
    const taken = await sql`select id from pharmacies where slug = ${slug} limit 1`;
    if (taken[0]) slug = `${slug}-${crypto.randomUUID().slice(0, 4)}`;
    const id = crypto.randomUUID();
    await sql`
      insert into pharmacies (
        id, slug, name, tagline, description, about, status, listed, featured,
        owner_user_id, email, phone, whatsapp, street, city, county, country,
        licence_number, cover_image_url, logo_url
      ) values (
        ${id}, ${slug}, ${data.name}, ${data.tagline}, ${data.about}, ${data.about},
        ${"submitted"}, ${false}, ${false}, ${context.userId}, ${data.email}, ${data.phone},
        ${data.phone.replace(/[^\d]/g, "")}, ${data.street}, ${data.city}, ${data.county}, ${"Kenya"},
        ${data.licenceNumber}, ${"/images/gallery/welcoming_retail_floor.webp"}, ${"/favicon.svg"}
      )
    `;
    await sql`
      insert into pharmacy_memberships (id, pharmacy_id, user_id, role)
      values (${crypto.randomUUID()}, ${id}, ${context.userId}, ${"owner"})
    `;
    await sql`update user_profiles set active_staff_pharmacy_id = ${id} where user_id = ${context.userId}`;
    return { ok: true, id, slug };
  });

export const listMyPharmacies = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadProfile(context.userId);
    const sql = await getSql();
    if (profile.memberships.length === 0) return { profile, pharmacies: [] };
    const ids = profile.memberships.map((m) => m.pharmacyId);
    const rows = await sql`select * from pharmacies order by name`;
    const pharmacies = rows.map(mapPharmacy).filter((p) => ids.includes(p.id));
    return { profile, pharmacies };
  });

export const goLive = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string() }))
  .handler(async ({ context, data }) => {
    const profile = await loadProfile(context.userId);
    const m = profile.memberships.find((x) => x.pharmacyId === data.pharmacyId);
    if (!m || (m.role !== "owner" && m.role !== "manager" && !profile.platformAdmin)) {
      throw new Error("Only the owner can list this pharmacy");
    }
    const sql = await getSql();
    const row = (await sql`select status from pharmacies where id = ${data.pharmacyId}`)[0];
    if (String(row?.status) !== "active") throw new Error("Pharmacy must be approved before listing");
    await sql`update pharmacies set listed = true, listed_at = now(), updated_at = now() where id = ${data.pharmacyId}`;
    return { ok: true };
  });
