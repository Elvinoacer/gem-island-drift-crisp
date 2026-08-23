import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Check } from "../_libs/lucide-react.mjs";
import { t as MarketplaceShell } from "./marketplace-shell-eR12o65u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/for-pharmacies-Cze_sIaj.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Apply with your licence",
		body: "Name, PPB number, address, and a short story. We review before anything is public."
	},
	{
		n: "02",
		title: "Build the storefront",
		body: "Hours, map pin, gallery, services, and inventory — all scoped to your pharmacy, never mixed with the shop next door."
	},
	{
		n: "03",
		title: "Go live in the directory",
		body: "Once approved, you list. Patients find you by city. Google sees a real Pharmacy with PostalAddress and GeoCoordinates."
	}
];
var INCLUDED = [
	"Public storefront at /p/your-slug with unique SEO",
	"Location, hours, insurance, and WhatsApp",
	"Services, OTC catalogue, and health notes",
	"Staff console for refills, orders, and enquiries",
	"Patient portal with loyalty per shop",
	"Network review before listing"
];
function ForPharmacies() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketplaceShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-forest-deep text-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
						children: "Infrastructure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl",
						children: "The operating system for a neighbourhood pharmacy."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-cream/75",
						children: "Aether is not a marketplace that owns your patients. It is the storefront, the till-adjacent admin, and the listing that helps people on Kenyatta Avenue or Links Road find you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/onboard",
							className: "btn-gold",
							children: "List your pharmacy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { next: "/admin" },
							className: "btn-ghost border-cream/20 bg-transparent text-cream",
							children: "Staff sign in"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-3",
			children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-gold",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: s.body
					})
				]
			}, s.n))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 rounded-3xl bg-paper p-8 md:grid-cols-2 md:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "What you get"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl",
						children: "Tenant isolation, on purpose."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Refills, orders, inventory, and patients are always filtered by pharmacy. Staff only see shops they belong to. Platform admins review applications — they do not share catalogues."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: INCLUDED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-forest" }), item]
					}, item))
				})]
			})
		})
	] });
}
//#endregion
export { ForPharmacies as component };
