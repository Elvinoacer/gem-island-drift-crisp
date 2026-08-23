import { r as createServerFn } from "./ssr.mjs";
import { I as object, O as _enum, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as getSql } from "./seed-Crd82BVY.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { l as mapPharmacy } from "./map-5JpkVRW_.mjs";
import { n as loadProfile } from "./session-Cg3YM5f1.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-DRyG9hof.js
async function requirePlatform(userId) {
	const profile = await loadProfile(userId);
	if (!profile.platformAdmin) throw new Error("Platform admin only");
	return profile;
}
var getPlatformHome_createServerFn_handler = createServerRpc({
	id: "6c0a015dd9c1925d60337b8d339b10c9bf87f15efb9c2b1c38a493cd86d9d4f1",
	name: "getPlatformHome",
	filename: "src/lib/server/platform.ts"
}, (opts) => getPlatformHome.__executeServer(opts));
var getPlatformHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getPlatformHome_createServerFn_handler, async ({ context }) => {
	const profile = await requirePlatform(context.userId);
	const pharmacies = (await (await getSql())`select * from pharmacies order by created_at desc`).map(mapPharmacy);
	const queue = pharmacies.filter((p) => [
		"submitted",
		"needs_info",
		"draft"
	].includes(p.status));
	const live = pharmacies.filter((p) => p.status === "active" && p.listed);
	return {
		profile,
		pharmacies,
		stats: {
			total: pharmacies.length,
			live: live.length,
			queue: queue.length,
			suspended: pharmacies.filter((p) => p.status === "suspended").length
		}
	};
});
var listApplications_createServerFn_handler = createServerRpc({
	id: "47d19514b7c4d88099ef873926b920386fe9562feccfd5c4cd0dc2d157fc9e9c",
	name: "listApplications",
	filename: "src/lib/server/platform.ts"
}, (opts) => listApplications.__executeServer(opts));
var listApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listApplications_createServerFn_handler, async ({ context }) => {
	return {
		profile: await requirePlatform(context.userId),
		queue: (await (await getSql())`select * from pharmacies order by created_at desc`).map(mapPharmacy).filter((p) => [
			"submitted",
			"needs_info",
			"draft"
		].includes(p.status))
	};
});
var reviewPharmacy_createServerFn_handler = createServerRpc({
	id: "7745d215106460e1552e2a003b004e94f1f47285178254b199704d46551e44f8",
	name: "reviewPharmacy",
	filename: "src/lib/server/platform.ts"
}, (opts) => reviewPharmacy.__executeServer(opts));
var reviewPharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	action: _enum([
		"approve",
		"reject",
		"needs_info",
		"list",
		"unlist",
		"suspend",
		"restore",
		"feature",
		"unfeature"
	]),
	reason: string().optional()
})).handler(reviewPharmacy_createServerFn_handler, async ({ context, data }) => {
	await requirePlatform(context.userId);
	const sql = await getSql();
	if (data.action === "approve") await sql`update pharmacies set status = 'active', reject_reason = '', updated_at = now() where id = ${data.id}`;
	else if (data.action === "reject") await sql`update pharmacies set status = 'rejected', listed = false, reject_reason = ${data.reason ?? "Not approved"}, updated_at = now() where id = ${data.id}`;
	else if (data.action === "needs_info") await sql`update pharmacies set status = 'needs_info', reject_reason = ${data.reason ?? "Please add a clearer licence scan"}, updated_at = now() where id = ${data.id}`;
	else if (data.action === "list") await sql`update pharmacies set listed = true, status = 'active', listed_at = now(), updated_at = now() where id = ${data.id}`;
	else if (data.action === "unlist") await sql`update pharmacies set listed = false, updated_at = now() where id = ${data.id}`;
	else if (data.action === "suspend") await sql`update pharmacies set status = 'suspended', listed = false, updated_at = now() where id = ${data.id}`;
	else if (data.action === "restore") await sql`update pharmacies set status = 'active', updated_at = now() where id = ${data.id}`;
	else if (data.action === "feature") await sql`update pharmacies set featured = true, updated_at = now() where id = ${data.id}`;
	else if (data.action === "unfeature") await sql`update pharmacies set featured = false, updated_at = now() where id = ${data.id}`;
	return { ok: true };
});
var impersonatePharmacy_createServerFn_handler = createServerRpc({
	id: "2b35c0871c48cf00c07a24a383917ba82a144aa67af7f9d7cb1472a384c9dd10",
	name: "impersonatePharmacy",
	filename: "src/lib/server/platform.ts"
}, (opts) => impersonatePharmacy.__executeServer(opts));
var impersonatePharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(impersonatePharmacy_createServerFn_handler, async ({ context, data }) => {
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
//#endregion
export { getPlatformHome_createServerFn_handler, impersonatePharmacy_createServerFn_handler, listApplications_createServerFn_handler, reviewPharmacy_createServerFn_handler };
