import { r as createServerFn } from "./ssr.mjs";
import { I as object, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql } from "./seed-Crd82BVY.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { l as mapPharmacy, u as mapRefill } from "./map-5JpkVRW_.mjs";
import { n as loadProfile } from "./session-Cg3YM5f1.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BnYjE1Yd.js
var getPortalHome_createServerFn_handler = createServerRpc({
	id: "d87babf296a86592a3208fe577ddc4c9f406e700007918402478f1c4ece6b64d",
	name: "getPortalHome",
	filename: "src/lib/server/portal.ts"
}, (opts) => getPortalHome.__executeServer(opts));
var getPortalHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getPortalHome_createServerFn_handler, async ({ context }) => {
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
	return {
		profile,
		mine,
		directory: pharmacies,
		loyalty: await sql`
      select c.pharmacy_id, c.loyalty_points, c.loyalty_tier, p.name
      from customer_pharmacies c
      join pharmacies p on p.id = c.pharmacy_id
      where c.user_id = ${context.userId}
    `,
		refills: refills.map(mapRefill)
	};
});
var joinPharmacy_createServerFn_handler = createServerRpc({
	id: "d44537769363d4ef8fcfbd77fd09864de158c766224f406aaae88772a7aa7542",
	name: "joinPharmacy",
	filename: "src/lib/server/portal.ts"
}, (opts) => joinPharmacy.__executeServer(opts));
var joinPharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(joinPharmacy_createServerFn_handler, async ({ context, data }) => {
	await loadProfile(context.userId);
	const sql = await getSql();
	if (!(await sql`select id from pharmacies where id = ${data.pharmacyId} and status = 'active' and listed = true`)[0]) throw new Error("Pharmacy is not listed");
	await sql`
      insert into customer_pharmacies (pharmacy_id, user_id, loyalty_points, loyalty_tier)
      values (${data.pharmacyId}, ${context.userId}, ${0}, ${"Member"})
      on conflict do nothing
    `;
	return { ok: true };
});
var portalRefill_createServerFn_handler = createServerRpc({
	id: "3000539b915600891b1e21048d340d6997cdcfc78c532ac097b6f61f52c2e5e5",
	name: "portalRefill",
	filename: "src/lib/server/portal.ts"
}, (opts) => portalRefill.__executeServer(opts));
var portalRefill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	pharmacyId: string(),
	medication: string().min(2),
	notes: string().optional()
})).handler(portalRefill_createServerFn_handler, async ({ context, data }) => {
	const profile = await loadProfile(context.userId);
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`
      insert into refill_requests (id, pharmacy_id, user_id, guest_name, guest_phone, medication, notes, status)
      values (${id}, ${data.pharmacyId}, ${context.userId}, ${profile.displayName}, ${profile.phone}, ${data.medication}, ${data.notes ?? ""}, ${"pending"})
    `;
	return {
		ok: true,
		id
	};
});
//#endregion
export { getPortalHome_createServerFn_handler, joinPharmacy_createServerFn_handler, portalRefill_createServerFn_handler };
