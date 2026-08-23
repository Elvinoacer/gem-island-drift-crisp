import { r as createServerFn } from "./ssr.mjs";
import { A as array, F as number, I as object, N as literal, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql, r as ensureSeed } from "./seed-Crd82BVY.mjs";
import { a as mapImage, d as mapService, f as mapTeam, i as mapHour, l as mapPharmacy, o as mapInventory, t as mapArticle } from "./map-5JpkVRW_.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-D7T5Uq-m.js
async function loadStorefront(slug, opts) {
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
		sql`select * from services where pharmacy_id = ${p.id} and published = true order by title`
	]);
	return {
		...p,
		hours: hours.map(mapHour),
		images: images.map(mapImage),
		team: team.map(mapTeam),
		services: services.map(mapService)
	};
}
var listMarketplace_createServerFn_handler = createServerRpc({
	id: "11f8c48059f6ef3c873243029b7bbaa9a9dc84cc9a2711787238836da519ddab",
	name: "listMarketplace",
	filename: "src/lib/server/public.ts"
}, (opts) => listMarketplace.__executeServer(opts));
var listMarketplace = createServerFn({ method: "GET" }).validator(object({
	q: string().optional(),
	city: string().optional()
})).handler(listMarketplace_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const sql = await getSql();
	const q = data.q?.trim().toLowerCase() ?? "";
	const city = data.city?.trim() ?? "";
	return (await sql`
      select * from pharmacies
      where status = 'active' and listed = true
      order by featured desc, name asc
    `).map(mapPharmacy).filter((p) => {
		if (city && p.city.toLowerCase() !== city.toLowerCase()) return false;
		if (!q) return true;
		return `${p.name} ${p.tagline} ${p.city} ${p.county} ${p.description}`.toLowerCase().includes(q);
	});
});
var listCities_createServerFn_handler = createServerRpc({
	id: "c763b5a2215b1a7f285776f6eb627ce59787efdfacf85719f1a45a7de7bb8733",
	name: "listCities",
	filename: "src/lib/server/public.ts"
}, (opts) => listCities.__executeServer(opts));
var listCities = createServerFn({ method: "GET" }).handler(listCities_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`
    select distinct city from pharmacies
    where status = 'active' and listed = true
    order by city
  `).map((r) => r.city);
});
var getStorefront_createServerFn_handler = createServerRpc({
	id: "69753bb1c381f6a3bcf402d5012a8c39a0780791d561711400d2ed3135ea429f",
	name: "getStorefront",
	filename: "src/lib/server/public.ts"
}, (opts) => getStorefront.__executeServer(opts));
var getStorefront = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(getStorefront_createServerFn_handler, async ({ data }) => loadStorefront(data.slug));
var getServicePage_createServerFn_handler = createServerRpc({
	id: "314017496ac3d80c78d9a75ec9548b007ec8a1f494e492855efa59d07946cab8",
	name: "getServicePage",
	filename: "src/lib/server/public.ts"
}, (opts) => getServicePage.__executeServer(opts));
var getServicePage = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	serviceSlug: string()
})).handler(getServicePage_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) return null;
	return {
		pharmacy,
		service: pharmacy.services.find((s) => s.slug === data.serviceSlug) ?? null
	};
});
var listMedicines_createServerFn_handler = createServerRpc({
	id: "22ffa0952f0957b3fd3d4104d445395900c36ac957ed4cc0c83bf672832a0491",
	name: "listMedicines",
	filename: "src/lib/server/public.ts"
}, (opts) => listMedicines.__executeServer(opts));
var listMedicines = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	q: string().optional(),
	category: string().optional()
})).handler(listMedicines_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) return null;
	let items = (await (await getSql())`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${pharmacy.id} and i.listed = true
      order by m.category, m.name
    `).map(mapInventory);
	const q = data.q?.trim().toLowerCase() ?? "";
	if (data.category) items = items.filter((i) => i.categorySlug === data.category);
	if (q) items = items.filter((i) => `${i.name} ${i.genericName} ${i.category}`.toLowerCase().includes(q));
	const categories = [...new Map(items.map((i) => [i.categorySlug, i.category])).entries()].map(([slug, title]) => ({
		slug,
		title
	}));
	return {
		pharmacy,
		items,
		categories
	};
});
var getMedicinePage_createServerFn_handler = createServerRpc({
	id: "fc127521b868687e5398655c84bba38bf33bfa30f4c7ec5cb2c0197a5dedd575",
	name: "getMedicinePage",
	filename: "src/lib/server/public.ts"
}, (opts) => getMedicinePage.__executeServer(opts));
var getMedicinePage = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	medSlug: string()
})).handler(getMedicinePage_createServerFn_handler, async ({ data }) => {
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
	if (!rows[0]) return {
		pharmacy,
		item: null,
		related: []
	};
	const item = mapInventory(rows[0]);
	return {
		pharmacy,
		item,
		related: (await sql`
      select m.*, i.price_kes, i.stock_status, i.listed, i.sku
      from pharmacy_inventory i
      join medicines m on m.id = i.medicine_id
      where i.pharmacy_id = ${pharmacy.id} and i.listed = true
        and m.category_slug = ${item.categorySlug} and m.id <> ${item.id}
      limit 4
    `).map(mapInventory)
	};
});
var listArticles_createServerFn_handler = createServerRpc({
	id: "e99c7bf8408d85097d21117efb219dc9c3215684c0c50f903489517975d7d8f4",
	name: "listArticles",
	filename: "src/lib/server/public.ts"
}, (opts) => listArticles.__executeServer(opts));
var listArticles = createServerFn({ method: "GET" }).handler(listArticles_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`select * from health_articles where published = true order by title`).map(mapArticle);
});
var getArticle_createServerFn_handler = createServerRpc({
	id: "175df518016fc1775ba5f35420eb727d8a4e10d5a0dfd02d2c2027f08275d7a0",
	name: "getArticle",
	filename: "src/lib/server/public.ts"
}, (opts) => getArticle.__executeServer(opts));
var getArticle = createServerFn({ method: "GET" }).validator(object({
	slug: string(),
	articleSlug: string()
})).handler(getArticle_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) return null;
	const rows = await (await getSql())`select * from health_articles where slug = ${data.articleSlug} and published = true limit 1`;
	return {
		pharmacy,
		article: rows[0] ? mapArticle(rows[0]) : null
	};
});
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "dd08098ebce7517d13f7a5629b6afd4317776f12f9c13f72bf4edae559e11273",
	name: "submitEnquiry",
	filename: "src/lib/server/public.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	email: string().email().or(literal("")),
	phone: string().min(7),
	subject: string().min(2),
	message: string().min(8)
})).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) throw new Error("Pharmacy not found");
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`
      insert into enquiries (id, pharmacy_id, name, email, phone, subject, message, status)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.email}, ${data.phone}, ${data.subject}, ${data.message}, ${"open"})
    `;
	return {
		ok: true,
		id
	};
});
var submitRefill_createServerFn_handler = createServerRpc({
	id: "8bbe982c3317617955b05f96df3de94756b13ccdaf56805491e701242d526a17",
	name: "submitRefill",
	filename: "src/lib/server/public.ts"
}, (opts) => submitRefill.__executeServer(opts));
var submitRefill = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	phone: string().min(7),
	medication: string().min(2),
	notes: string().optional()
})).handler(submitRefill_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) throw new Error("Pharmacy not found");
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`
      insert into refill_requests (id, pharmacy_id, guest_name, guest_phone, medication, notes, status)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.phone}, ${data.medication}, ${data.notes ?? ""}, ${"pending"})
    `;
	return {
		ok: true,
		id
	};
});
var submitOrder_createServerFn_handler = createServerRpc({
	id: "813b3d25cc2bcaa9bdd284f89f9db0c3ca49ea4b0833c2720b46c1242572470e",
	name: "submitOrder",
	filename: "src/lib/server/public.ts"
}, (opts) => submitOrder.__executeServer(opts));
var submitOrder = createServerFn({ method: "POST" }).validator(object({
	slug: string(),
	name: string().min(2),
	phone: string().min(7),
	items: array(object({
		name: string(),
		qty: number(),
		priceKes: number()
	})).min(1)
})).handler(submitOrder_createServerFn_handler, async ({ data }) => {
	const pharmacy = await loadStorefront(data.slug);
	if (!pharmacy) throw new Error("Pharmacy not found");
	const sql = await getSql();
	const id = crypto.randomUUID();
	const total = data.items.reduce((s, i) => s + i.priceKes * i.qty, 0);
	await sql`
      insert into orders (id, pharmacy_id, guest_name, guest_phone, status, total_kes, items)
      values (${id}, ${pharmacy.id}, ${data.name}, ${data.phone}, ${"received"}, ${total}, ${JSON.stringify(data.items)})
    `;
	return {
		ok: true,
		id,
		total
	};
});
//#endregion
export { getArticle_createServerFn_handler, getMedicinePage_createServerFn_handler, getServicePage_createServerFn_handler, getStorefront_createServerFn_handler, listArticles_createServerFn_handler, listCities_createServerFn_handler, listMarketplace_createServerFn_handler, listMedicines_createServerFn_handler, submitEnquiry_createServerFn_handler, submitOrder_createServerFn_handler, submitRefill_createServerFn_handler };
