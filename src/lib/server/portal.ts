import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { loadProfile } from "./session";
import { mapPharmacy, mapRefill } from "./map";

export const getPortalHome = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadProfile(context.userId);
    const sql = await getSql();
    const pharmacies = (await sql`select * from pharmacies where status = 'active' and listed = true order by name`).map(mapPharmacy);
    const mine = pharmacies.filter((p) => profile.customerPharmacyIds.includes(p.id));
    const refills = await sql`
      select * from refill_requests
      where user_id = ${context.userId}
      order by created_at desc
      limit 8
    `;
    const loyalty = await sql<{ pharmacy_id: string; loyalty_points: number; loyalty_tier: string; name: string }>`
      select c.pharmacy_id, c.loyalty_points, c.loyalty_tier, p.name
      from customer_pharmacies c
      join pharmacies p on p.id = c.pharmacy_id
      where c.user_id = ${context.userId}
    `;
    return {
      profile,
      mine,
      directory: pharmacies,
      loyalty,
      refills: refills.map(mapRefill),
    };
  });

export const joinPharmacy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string() }))
  .handler(async ({ context, data }) => {
    await loadProfile(context.userId);
    const sql = await getSql();
    const live = await sql`select id from pharmacies where id = ${data.pharmacyId} and status = 'active' and listed = true`;
    if (!live[0]) throw new Error("Pharmacy is not listed");
    await sql`
      insert into customer_pharmacies (pharmacy_id, user_id, loyalty_points, loyalty_tier)
      values (${data.pharmacyId}, ${context.userId}, ${0}, ${"Member"})
      on conflict do nothing
    `;
    return { ok: true };
  });

export const portalRefill = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string(), medication: z.string().min(2), notes: z.string().optional() }))
  .handler(async ({ context, data }) => {
    const profile = await loadProfile(context.userId);
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into refill_requests (id, pharmacy_id, user_id, guest_name, guest_phone, medication, notes, status)
      values (${id}, ${data.pharmacyId}, ${context.userId}, ${profile.displayName}, ${profile.phone}, ${data.medication}, ${data.notes ?? ""}, ${"pending"})
    `;
    return { ok: true, id };
  });
