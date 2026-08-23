import { r as createServerFn } from "./ssr.mjs";
import { I as object, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql, r as ensureSeed, t as DEMO_PHARMACY_IDS } from "./seed-Crd82BVY.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { s as mapMembership } from "./map-5JpkVRW_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-Cg3YM5f1.js
async function lookupDisplayName(userId) {
	const sql = await getSql();
	try {
		const rows = await sql`
      select name, email from "user" where id = ${userId} limit 1
    `;
		return rows[0]?.name || rows[0]?.email || "Member";
	} catch {
		return "Member";
	}
}
async function loadProfile(userId) {
	await ensureSeed();
	const sql = await getSql();
	const displayName = await lookupDisplayName(userId);
	const existing = await sql`select * from user_profiles where user_id = ${userId} limit 1`;
	if (!existing[0]) {
		const isFirst = ((await sql`select count(*)::int as n from user_profiles where platform_admin = true`)[0]?.n ?? 0) === 0;
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
	} else if (displayName && displayName !== "Member" && existing[0].display_name !== displayName) await sql`update user_profiles set display_name = ${displayName} where user_id = ${userId}`;
	const profile = (await sql`select * from user_profiles where user_id = ${userId} limit 1`)[0];
	const memberships = await sql`
    select m.pharmacy_id, m.role, p.slug, p.name, p.status, p.listed
    from pharmacy_memberships m
    join pharmacies p on p.id = m.pharmacy_id
    where m.user_id = ${userId}
    order by p.name
  `;
	const customers = await sql`
    select pharmacy_id from customer_pharmacies where user_id = ${userId}
  `;
	return {
		userId,
		displayName: profile?.display_name || displayName || "Member",
		phone: profile?.phone ?? "",
		platformAdmin: Boolean(profile?.platform_admin),
		activeStaffPharmacyId: profile?.active_staff_pharmacy_id ?? null,
		memberships: memberships.map(mapMembership),
		customerPharmacyIds: customers.map((c) => c.pharmacy_id)
	};
}
var getSessionProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("57970a21c1aa3ce9f267e8584425147eeac96a5ec55fa1382efb93f2c23371db"));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	phone: string().max(40),
	displayName: string().min(2).max(80)
})).handler(createSsrRpc("02e090d156a08e55d9ea1d35040aa84c208e09d70bcd04b404e2e031c93a0e51"));
//#endregion
export { loadProfile as n, updateMyProfile as r, getSessionProfile as t };
