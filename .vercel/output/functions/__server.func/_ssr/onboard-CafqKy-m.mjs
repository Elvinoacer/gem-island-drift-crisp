import { r as createServerFn } from "./ssr.mjs";
import { I as object, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql } from "./seed-Crd82BVY.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { l as mapPharmacy } from "./map-5JpkVRW_.mjs";
import { n as loadProfile } from "./session-Cg3YM5f1.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboard-CafqKy-m.js
function slugify(s) {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}
var submitOnboard_createServerFn_handler = createServerRpc({
	id: "34f6cbe303091d3f17caf33aeb88d0e76330e69b72230331f01da9441455a5cc",
	name: "submitOnboard",
	filename: "src/lib/server/onboard.ts"
}, (opts) => submitOnboard.__executeServer(opts));
var submitOnboard = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(3),
	slug: string().optional(),
	tagline: string().min(4),
	city: string().min(2),
	county: string().min(2),
	street: string().min(3),
	phone: string().min(7),
	email: string().email(),
	licenceNumber: string().min(4),
	about: string().min(12)
})).handler(submitOnboard_createServerFn_handler, async ({ context, data }) => {
	await loadProfile(context.userId);
	const sql = await getSql();
	let slug = slugify(data.slug || data.name);
	if (!slug) slug = `pharmacy-${crypto.randomUUID().slice(0, 8)}`;
	if ((await sql`select id from pharmacies where slug = ${slug} limit 1`)[0]) slug = `${slug}-${crypto.randomUUID().slice(0, 4)}`;
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
	return {
		ok: true,
		id,
		slug
	};
});
var listMyPharmacies_createServerFn_handler = createServerRpc({
	id: "c6ef8d02d008e2e6472cbafbb21dbd867097968482f43963d17c316ce896599b",
	name: "listMyPharmacies",
	filename: "src/lib/server/onboard.ts"
}, (opts) => listMyPharmacies.__executeServer(opts));
var listMyPharmacies = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyPharmacies_createServerFn_handler, async ({ context }) => {
	const profile = await loadProfile(context.userId);
	const sql = await getSql();
	if (profile.memberships.length === 0) return {
		profile,
		pharmacies: []
	};
	const ids = profile.memberships.map((m) => m.pharmacyId);
	return {
		profile,
		pharmacies: (await sql`select * from pharmacies order by name`).map(mapPharmacy).filter((p) => ids.includes(p.id))
	};
});
var goLive_createServerFn_handler = createServerRpc({
	id: "5718a41b789d9d48060fdbc2edcb56e3ad41ae678db9acae7e068a988a4c8eab",
	name: "goLive",
	filename: "src/lib/server/onboard.ts"
}, (opts) => goLive.__executeServer(opts));
var goLive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(goLive_createServerFn_handler, async ({ context, data }) => {
	const profile = await loadProfile(context.userId);
	const m = profile.memberships.find((x) => x.pharmacyId === data.pharmacyId);
	if (!m || m.role !== "owner" && m.role !== "manager" && !profile.platformAdmin) throw new Error("Only the owner can list this pharmacy");
	const sql = await getSql();
	const row = (await sql`select status from pharmacies where id = ${data.pharmacyId}`)[0];
	if (String(row?.status) !== "active") throw new Error("Pharmacy must be approved before listing");
	await sql`update pharmacies set listed = true, listed_at = now(), updated_at = now() where id = ${data.pharmacyId}`;
	return { ok: true };
});
//#endregion
export { goLive_createServerFn_handler, listMyPharmacies_createServerFn_handler, submitOnboard_createServerFn_handler };
