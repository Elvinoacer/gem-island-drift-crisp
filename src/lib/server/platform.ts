import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { loadProfile } from "./session";
import { mapPharmacy } from "./map";

async function requirePlatform(userId: string) {
  const profile = await loadProfile(userId);
  if (!profile.platformAdmin) throw new Error("Platform admin only");
  return profile;
}

export const getPlatformHome = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await requirePlatform(context.userId);
    const sql = await getSql();
    const pharmacies = (await sql`select * from pharmacies order by created_at desc`).map(mapPharmacy);
    const queue = pharmacies.filter((p) => ["submitted", "needs_info", "draft"].includes(p.status));
    const live = pharmacies.filter((p) => p.status === "active" && p.listed);
    return {
      profile,
      pharmacies,
      stats: {
        total: pharmacies.length,
        live: live.length,
        queue: queue.length,
        suspended: pharmacies.filter((p) => p.status === "suspended").length,
      },
    };
  });

export const listApplications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await requirePlatform(context.userId);
    const sql = await getSql();
    const pharmacies = (await sql`select * from pharmacies order by created_at desc`).map(mapPharmacy);
    return {
      profile,
      queue: pharmacies.filter((p) => ["submitted", "needs_info", "draft"].includes(p.status)),
    };
  });

export const reviewPharmacy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.string(),
      action: z.enum(["approve", "reject", "needs_info", "list", "unlist", "suspend", "restore", "feature", "unfeature"]),
      reason: z.string().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requirePlatform(context.userId);
    const sql = await getSql();
    if (data.action === "approve") {
      await sql`update pharmacies set status = 'active', reject_reason = '', updated_at = now() where id = ${data.id}`;
    } else if (data.action === "reject") {
      await sql`update pharmacies set status = 'rejected', listed = false, reject_reason = ${data.reason ?? "Not approved"}, updated_at = now() where id = ${data.id}`;
    } else if (data.action === "needs_info") {
      await sql`update pharmacies set status = 'needs_info', reject_reason = ${data.reason ?? "Please add a clearer licence scan"}, updated_at = now() where id = ${data.id}`;
    } else if (data.action === "list") {
      await sql`update pharmacies set listed = true, status = 'active', listed_at = now(), updated_at = now() where id = ${data.id}`;
    } else if (data.action === "unlist") {
      await sql`update pharmacies set listed = false, updated_at = now() where id = ${data.id}`;
    } else if (data.action === "suspend") {
      await sql`update pharmacies set status = 'suspended', listed = false, updated_at = now() where id = ${data.id}`;
    } else if (data.action === "restore") {
      await sql`update pharmacies set status = 'active', updated_at = now() where id = ${data.id}`;
    } else if (data.action === "feature") {
      await sql`update pharmacies set featured = true, updated_at = now() where id = ${data.id}`;
    } else if (data.action === "unfeature") {
      await sql`update pharmacies set featured = false, updated_at = now() where id = ${data.id}`;
    }
    return { ok: true };
  });

export const impersonatePharmacy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pharmacyId: z.string() }))
  .handler(async ({ context, data }) => {
    await requirePlatform(context.userId);
    const sql = await getSql();
    await sql`
      insert into pharmacy_memberships (id, pharmacy_id, user_id, role)
      values (${crypto.randomUUID()}, ${data.pharmacyId}, ${context.userId}, ${"owner"})
      on conflict (pharmacy_id, user_id) do nothing
    `;
    await sql`update user_profiles set active_staff_pharmacy_id = ${data.pharmacyId} where user_id = ${context.userId}`;
    return { ok: true };
  });
