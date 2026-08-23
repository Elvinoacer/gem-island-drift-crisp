import { b as Link, f as useRouterState, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { I as object, O as _enum, j as boolean, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as number } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { t as BrandLockup } from "./brand-9MEbz7zz.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { t as AuthSlot } from "./auth-slot-DgjnaAb3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-shell-Cyn5oF00.js
var import_jsx_runtime = require_jsx_runtime();
var getAdminDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ pharmacyId: string().optional() })).handler(createSsrRpc("36a0d6f1c97d92068a5f4a7080d0ecfcee4f0333332d0828686298ef670d6062"));
var setActivePharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(createSsrRpc("aedd3efd26a1b47cafed11ac897ce6ec8ec72aef951b404c1f7fdf4bd4414d88"));
var getAdminStorefront = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e7463fd8c7ad626999e5fd58460bc5126950abac8b59b425c8afa54506f4b326"));
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
})).handler(createSsrRpc("2e8069b4edc2aa0052e6c49a55d4304fc1ef67dc75f8aa4e27bd0de2a1bfb872"));
var listAdminMedicines = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9b1a2a37341fed9a7e4fbd7e0e946af005b9b9a775dc0c67dcb4c56d6a1cf479"));
var updateInventory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	medicineId: string(),
	priceKes: number(),
	stockStatus: _enum([
		"in_stock",
		"low",
		"out"
	]),
	listed: boolean()
})).handler(createSsrRpc("9a1830c7545f6bf7b01892001c619b11ff18cda15e6c29ba9aafe160cd945f85"));
var listAdminRefills = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8ce63de8b914ef476ca7d70335d97be2a6b716695983bfb66f2f6e7a4cbe4cd8"));
var updateRefillStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(createSsrRpc("570c0175cced40b005e25a783bc0367e05c9a22bea6b628e3a21541bc9c32810"));
var listAdminEnquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("82e07ee02f62a3db878b766a67b1fecd4b6da0659fe9ea59cf21b1b17c1f17e2"));
var updateEnquiryStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(createSsrRpc("145c18b42098f23ef89c48ef1911312f504f3b1d5bd27cce6dea466a1f526085"));
var listAdminOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b3f291b2b1f774694cb6627dc54a6a0cbd44a831b903a1fba5c3ecd1e93550da"));
var updateOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	status: string()
})).handler(createSsrRpc("4e152c49c1bd77fbd68635182454c71db67572bd2a5b910d0a7e9d6183b697b4"));
var listAdminCustomers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2896265a462d0f5d7b179eb1203704b14919dea0bf50424e6fd93c259fd02003"));
var listAdminServices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0f26afa82b492b05084c197c33e9b9c00dc39c7daec39f9e45137adcecf6bd1d"));
var toggleService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string(),
	published: boolean()
})).handler(createSsrRpc("d5a94be5868913b4ee16b11a74fc456449357a8270e6cc20996d6cd6258a22b8"));
var LINKS = [
	{
		to: "/admin",
		label: "Overview",
		exact: true
	},
	{
		to: "/admin/storefront",
		label: "Storefront"
	},
	{
		to: "/admin/medicines",
		label: "Inventory"
	},
	{
		to: "/admin/services",
		label: "Services"
	},
	{
		to: "/admin/refills",
		label: "Refills"
	},
	{
		to: "/admin/orders",
		label: "Orders"
	},
	{
		to: "/admin/enquiries",
		label: "Enquiries"
	},
	{
		to: "/admin/customers",
		label: "Patients"
	}
];
function AdminShell({ profile, membership, children, onSwitch }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { subtitle: "Staff console" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-full shrink-0 lg:w-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-forest",
							children: "Pharmacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl leading-tight",
							children: membership.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: membership.role }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: membership.status }),
								membership.listed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "listed" }) : null
							]
						}),
						profile.memberships.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "field-input mt-3",
							value: membership.pharmacyId,
							onChange: async (e) => {
								await setActivePharmacy({ data: { pharmacyId: e.target.value } });
								onSwitch?.();
							},
							children: profile.memberships.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m.pharmacyId,
								children: m.name
							}, m.pharmacyId))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/p/$slug",
							params: { slug: membership.slug },
							className: "mt-3 inline-block text-sm font-semibold text-forest",
							children: "View storefront"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-4 flex gap-1 overflow-x-auto lg:flex-col",
					children: LINKS.map((l) => {
						const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium " + (active ? "bg-forest text-cream" : "text-ink/80 hover:bg-cream"),
							children: l.label
						}, l.to);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children
			})]
		})]
	});
}
//#endregion
export { listAdminEnquiries as a, listAdminRefills as c, toggleService as d, updateEnquiryStatus as f, updateRefillStatus as h, listAdminCustomers as i, listAdminServices as l, updateOrderStatus as m, getAdminDashboard as n, listAdminMedicines as o, updateInventory as p, getAdminStorefront as r, listAdminOrders as s, AdminShell as t, saveStorefront as u };
