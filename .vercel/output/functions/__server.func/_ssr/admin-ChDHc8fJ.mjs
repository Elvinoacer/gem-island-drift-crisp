import { r as mapsEmbed } from "./platform-yHVO60AA.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { I as object, O as _enum, j as boolean, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql } from "./seed-Crd82BVY.mjs";
import { n as number } from "../_libs/zod.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { a as mapImage, c as mapOrder, d as mapService, i as mapHour, l as mapPharmacy, n as mapCustomer, o as mapInventory, r as mapEnquiry, u as mapRefill } from "./map-5JpkVRW_.mjs";
import { n as loadProfile } from "./session-Cg3YM5f1.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ChDHc8fJ.js
async function requireMembership(userId, pharmacyId) {
	const profile = await loadProfile(userId);
	if (profile.memberships.length === 0) throw new Error("No pharmacy access");
	const id = pharmacyId || profile.activeStaffPharmacyId || profile.memberships[0].pharmacyId;
	const membership = profile.memberships.find((m) => m.pharmacyId === id);
	if (!membership) throw new Error("Not a member of this pharmacy");
	return {
		profile,
		membership
	};
}
var getAdminDashboard_createServerFn_handler = createServerRpc({
	id: "36a0d6f1c97d92068a5f4a7080d0ecfcee4f0333332d0828686298ef670d6062",
	name: "getAdminDashboard",
	filename: "src/lib/server/admin.ts"
}, (opts) => getAdminDashboard.__executeServer(opts));
var getAdminDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ pharmacyId: string().optional() })).handler(getAdminDashboard_createServerFn_handler, async ({ context, data }) => {
	const { profile, membership } = await requireMembership(context.userId, data.pharmacyId);
	const sql = await getSql();
	const pid = membership.pharmacyId;
	const pharmacyRows = await sql`select * from pharmacies where id = ${pid} limit 1`;
	const pharmacy = mapPharmacy(pharmacyRows[0]);
	const [refills, enquiries, orders, inventory, customers] = await Promise.all([
		sql`select count(*)::int as n, count(*) filter (where status = 'pending')::int as pending from refill_requests where pharmacy_id = ${pid}`,
		sql`select count(*)::int as n, count(*) filter (where status = 'open')::int as open from enquiries where pharmacy_id = ${pid}`,
		sql`select count(*)::int as n from orders where pharmacy_id = ${pid}`,
		sql`select count(*)::int as n, count(*) filter (where stock_status = 'low' or stock_status = 'out')::int as low from pharmacy_inventory where pharmacy_id = ${pid}`,
		sql`select count(*)::int as n from customer_pharmacies where pharmacy_id = ${pid}`
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
			customers: customers[0]?.n ?? 0
		},
		recentRefills: recentRefills.map(mapRefill),
		recentEnquiries: recentEnquiries.map(mapEnquiry)
	};
});
var setActivePharmacy_createServerFn_handler = createServerRpc({
	id: "aedd3efd26a1b47cafed11ac897ce6ec8ec72aef951b404c1f7fdf4bd4414d88",
	name: "setActivePharmacy",
	filename: "src/lib/server/admin.ts"
}, (opts) => setActivePharmacy.__executeServer(opts));
var setActivePharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(setActivePharmacy_createServerFn_handler, async ({ context, data }) => {
	await requireMembership(context.userId, data.pharmacyId);
	await (await getSql())`update user_profiles set active_staff_pharmacy_id = ${data.pharmacyId} where user_id = ${context.userId}`;
	return { ok: true };
});
var getAdminStorefront_createServerFn_handler = createServerRpc({
	id: "e7463fd8c7ad626999e5fd58460bc5126950abac8b59b425c8afa54506f4b326",
	name: "getAdminStorefront",
	filename: "src/lib/server/admin.ts"
}, (opts) => getAdminStorefront.__executeServer(opts));
var getAdminStorefront = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminStorefront_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	const sql = await getSql();
	return {
		profile,
		membership,
		pharmacy: mapPharmacy((await sql`select * from pharmacies where id = ${membership.pharmacyId}`)[0]),
		hours: (await sql`select day, time from pharmacy_hours where pharmacy_id = ${membership.pharmacyId} order by sort_order`).map(mapHour),
		images: (await sql`select url, alt, caption from pharmacy_images where pharmacy_id = ${membership.pharmacyId} order by sort_order`).map(mapImage)
	};
});
var saveStorefront_createServerFn_handler = createServerRpc({
	id: "2e8069b4edc2aa0052e6c49a55d4304fc1ef67dc75f8aa4e27bd0de2a1bfb872",
	name: "saveStorefront",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveStorefront.__executeServer(opts));
var saveStorefront = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(2),
	tagline: string(),
	description: string(),
	about: string(),
	phone: string(),
	email: string(),
	whatsapp: string(),
	street: string(),
	city: string(),
	county: string(),
	zip: string(),
	latitude: string(),
	longitude: string(),
	deliveryNotes: string(),
	deliveryFeeKes: number(),
	hoursText: string()
})).handler(saveStorefront_createServerFn_handler, async ({ context, data }) => {
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
	const lines = data.hoursText.split("\n").map((l) => l.trim()).filter(Boolean);
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
var listAdminMedicines_createServerFn_handler = createServerRpc({
	id: "9b1a2a37341fed9a7e4fbd7e0e946af005b9b9a775dc0c67dcb4c56d6a1cf479",
	name: "listAdminMedicines",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminMedicines.__executeServer(opts));
var listAdminMedicines = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminMedicines_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${membership.pharmacyId}
      order by m.name
    `).map(mapInventory)
	};
});
var updateInventory_createServerFn_handler = createServerRpc({
	id: "9a1830c7545f6bf7b01892001c619b11ff18cda15e6c29ba9aafe160cd945f85",
	name: "updateInventory",
	filename: "src/lib/server/admin.ts"
}, (opts) => updateInventory.__executeServer(opts));
var updateInventory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	medicineId: string(),
	priceKes: number(),
	stockStatus: _enum([
		"in_stock",
		"low",
		"out"
	]),
	listed: boolean()
})).handler(updateInventory_createServerFn_handler, async ({ context, data }) => {
	const { membership } = await requireMembership(context.userId);
	await (await getSql())`
      update pharmacy_inventory
      set price_kes = ${data.priceKes}, stock_status = ${data.stockStatus}, listed = ${data.listed}
      where pharmacy_id = ${membership.pharmacyId} and medicine_id = ${data.medicineId}
    `;
	return { ok: true };
});
var listAdminRefills_createServerFn_handler = createServerRpc({
	id: "8ce63de8b914ef476ca7d70335d97be2a6b716695983bfb66f2f6e7a4cbe4cd8",
	name: "listAdminRefills",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminRefills.__executeServer(opts));
var listAdminRefills = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminRefills_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`select * from refill_requests where pharmacy_id = ${membership.pharmacyId} order by created_at desc`).map(mapRefill)
	};
});
var updateRefillStatus_createServerFn_handler = createServerRpc({
	id: "570c0175cced40b005e25a783bc0367e05c9a22bea6b628e3a21541bc9c32810",
	name: "updateRefillStatus",
	filename: "src/lib/server/admin.ts"
}, (opts) => updateRefillStatus.__executeServer(opts));
var updateRefillStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(updateRefillStatus_createServerFn_handler, async ({ context, data }) => {
	const { membership } = await requireMembership(context.userId);
	await (await getSql())`update refill_requests set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
	return { ok: true };
});
var listAdminEnquiries_createServerFn_handler = createServerRpc({
	id: "82e07ee02f62a3db878b766a67b1fecd4b6da0659fe9ea59cf21b1b17c1f17e2",
	name: "listAdminEnquiries",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminEnquiries.__executeServer(opts));
var listAdminEnquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminEnquiries_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`select * from enquiries where pharmacy_id = ${membership.pharmacyId} order by created_at desc`).map(mapEnquiry)
	};
});
var updateEnquiryStatus_createServerFn_handler = createServerRpc({
	id: "145c18b42098f23ef89c48ef1911312f504f3b1d5bd27cce6dea466a1f526085",
	name: "updateEnquiryStatus",
	filename: "src/lib/server/admin.ts"
}, (opts) => updateEnquiryStatus.__executeServer(opts));
var updateEnquiryStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(updateEnquiryStatus_createServerFn_handler, async ({ context, data }) => {
	const { membership } = await requireMembership(context.userId);
	await (await getSql())`update enquiries set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
	return { ok: true };
});
var listAdminOrders_createServerFn_handler = createServerRpc({
	id: "b3f291b2b1f774694cb6627dc54a6a0cbd44a831b903a1fba5c3ecd1e93550da",
	name: "listAdminOrders",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminOrders.__executeServer(opts));
var listAdminOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminOrders_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`select * from orders where pharmacy_id = ${membership.pharmacyId} order by created_at desc`).map(mapOrder)
	};
});
var updateOrderStatus_createServerFn_handler = createServerRpc({
	id: "4e152c49c1bd77fbd68635182454c71db67572bd2a5b910d0a7e9d6183b697b4",
	name: "updateOrderStatus",
	filename: "src/lib/server/admin.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
var updateOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(updateOrderStatus_createServerFn_handler, async ({ context, data }) => {
	const { membership } = await requireMembership(context.userId);
	await (await getSql())`update orders set status = ${data.status} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
	return { ok: true };
});
var listAdminCustomers_createServerFn_handler = createServerRpc({
	id: "2896265a462d0f5d7b179eb1203704b14919dea0bf50424e6fd93c259fd02003",
	name: "listAdminCustomers",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminCustomers.__executeServer(opts));
var listAdminCustomers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminCustomers_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`
      select c.user_id, c.loyalty_points, c.loyalty_tier, c.created_at,
             coalesce(p.display_name, 'Patient') as display_name, coalesce(p.phone, '') as phone
      from customer_pharmacies c
      left join user_profiles p on p.user_id = c.user_id
      where c.pharmacy_id = ${membership.pharmacyId}
      order by c.created_at desc
    `).map(mapCustomer)
	};
});
var listAdminServices_createServerFn_handler = createServerRpc({
	id: "0f26afa82b492b05084c197c33e9b9c00dc39c7daec39f9e45137adcecf6bd1d",
	name: "listAdminServices",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminServices.__executeServer(opts));
var listAdminServices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminServices_createServerFn_handler, async ({ context }) => {
	const { membership, profile } = await requireMembership(context.userId);
	return {
		profile,
		membership,
		items: (await (await getSql())`select * from services where pharmacy_id = ${membership.pharmacyId} order by title`).map(mapService)
	};
});
var toggleService_createServerFn_handler = createServerRpc({
	id: "d5a94be5868913b4ee16b11a74fc456449357a8270e6cc20996d6cd6258a22b8",
	name: "toggleService",
	filename: "src/lib/server/admin.ts"
}, (opts) => toggleService.__executeServer(opts));
var toggleService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	published: boolean()
})).handler(toggleService_createServerFn_handler, async ({ context, data }) => {
	const { membership } = await requireMembership(context.userId);
	await (await getSql())`update services set published = ${data.published} where id = ${data.id} and pharmacy_id = ${membership.pharmacyId}`;
	return { ok: true };
});
//#endregion
export { getAdminDashboard_createServerFn_handler, getAdminStorefront_createServerFn_handler, listAdminCustomers_createServerFn_handler, listAdminEnquiries_createServerFn_handler, listAdminMedicines_createServerFn_handler, listAdminOrders_createServerFn_handler, listAdminRefills_createServerFn_handler, listAdminServices_createServerFn_handler, saveStorefront_createServerFn_handler, setActivePharmacy_createServerFn_handler, toggleService_createServerFn_handler, updateEnquiryStatus_createServerFn_handler, updateInventory_createServerFn_handler, updateOrderStatus_createServerFn_handler, updateRefillStatus_createServerFn_handler };
