import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureSeed, DEMO_PHARMACY_IDS } from "./seed";
import { mapMembership } from "./map";
import type { SessionProfile } from "@/lib/types";

async function lookupDisplayName(userId: string): Promise<string> {
  const sql = await getSql();
  try {
    const rows = await sql<{ name: string; email: string }>`
      select name, email from "user" where id = ${userId} limit 1
    `;
    return rows[0]?.name || rows[0]?.email || "Member";
  } catch {
    return "Member";
  }
}

export async function loadProfile(userId: string): Promise<SessionProfile> {
  await ensureSeed();
  const sql = await getSql();
  const displayName = await lookupDisplayName(userId);
  const existing = await sql<{
    user_id: string;
    display_name: string;
    phone: string;
    platform_admin: boolean;
    active_staff_pharmacy_id: string | null;
  }>`select * from user_profiles where user_id = ${userId} limit 1`;

  if (!existing[0]) {
    const admins = await sql<{ n: number }>`select count(*)::int as n from user_profiles where platform_admin = true`;
    const isFirst = (admins[0]?.n ?? 0) === 0;
    await sql`
      insert into user_profiles (user_id, display_name, phone, platform_admin, active_staff_pharmacy_id)
      values (${userId}, ${displayName || "Member"}, ${""}, ${isFirst}, ${DEMO_PHARMACY_IDS.AETHER})
    `;
    await sql`
      insert into pharmacy_memberships (id, pharmacy_id, user_id, role)
      values (${crypto.randomUUID()}, ${DEMO_PHARMACY_IDS.AETHER}, ${userId}, ${"manager"})
      on conflict (pharmacy_id, user_id) do nothing
    `;
    await sql`
      insert into customer_pharmacies (pharmacy_id, user_id, loyalty_points, loyalty_tier)
      values
        (${DEMO_PHARMACY_IDS.AETHER}, ${userId}, ${120}, ${"Silver"}),
        (${DEMO_PHARMACY_IDS.COAST}, ${userId}, ${40}, ${"Member"})
      on conflict do nothing
    `;
  } else if (displayName && displayName !== "Member" && existing[0].display_name !== displayName) {
    await sql`update user_profiles set display_name = ${displayName} where user_id = ${userId}`;
  }

  const profile = (
    await sql<{
      user_id: string;
      display_name: string;
      phone: string;
      platform_admin: boolean;
      active_staff_pharmacy_id: string | null;
    }>`select * from user_profiles where user_id = ${userId} limit 1`
  )[0];

  const memberships = await sql`
    select m.pharmacy_id, m.role, p.slug, p.name, p.status, p.listed
    from pharmacy_memberships m
    join pharmacies p on p.id = m.pharmacy_id
    where m.user_id = ${userId}
    order by p.name
  `;
  const customers = await sql<{ pharmacy_id: string }>`
    select pharmacy_id from customer_pharmacies where user_id = ${userId}
  `;

  return {
    userId,
    displayName: profile?.display_name || displayName || "Member",
    phone: profile?.phone ?? "",
    platformAdmin: Boolean(profile?.platform_admin),
    activeStaffPharmacyId: profile?.active_staff_pharmacy_id ?? null,
    memberships: memberships.map(mapMembership),
    customerPharmacyIds: customers.map((c) => c.pharmacy_id),
  };
}

export const getSessionProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => loadProfile(context.userId));

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ phone: z.string().max(40), displayName: z.string().min(2).max(80) }))
  .handler(async ({ context, data }) => {
    await loadProfile(context.userId);
    const sql = await getSql();
    await sql`
      update user_profiles
      set display_name = ${data.displayName}, phone = ${data.phone}
      where user_id = ${context.userId}
    `;
    return loadProfile(context.userId);
  });
