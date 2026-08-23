import { i as pharmacyPath, t as formatKes } from "./_ssr/platform-yHVO60AA.mjs";
import { b as Link, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { r as Route$2 } from "./_ssr/router-B0sDlXDw.mjs";
import { t as BreadcrumbJsonLd } from "./_ssr/json-ld-gKIwfLNZ.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-1zRt-Kgl.mjs";
import { t as useCart } from "./_ssr/cart-CzEZC604.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_medSlug-B9TGXRG6.js
var import_jsx_runtime = require_jsx_runtime();
function MedicinePage() {
	const { pharmacy, item, related } = Route$2.useLoaderData();
	const add = useCart((s) => s.add);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbJsonLd, { items: [
				{
					name: "Aether",
					path: "/"
				},
				{
					name: pharmacy.name,
					path: pharmacyPath(pharmacy.slug)
				},
				{
					name: "Medicines",
					path: pharmacyPath(pharmacy.slug, "/medicines")
				},
				{
					name: item.name,
					path: pharmacyPath(pharmacy.slug, `/medicines/${item.slug}`)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.imageUrl,
					alt: "",
					className: "h-72 w-full rounded-3xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.stockStatus }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							item.genericName,
							" · ",
							item.form,
							" · ",
							item.strength
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4",
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-3xl tabular-nums",
						children: formatKes(item.priceKes)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							"SKU ",
							item.sku,
							" · Sold by ",
							pharmacy.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary mt-6",
						disabled: item.stockStatus === "out",
						onClick: () => {
							add(pharmacy.slug, {
								medicineId: item.id,
								slug: item.slug,
								name: item.name,
								priceKes: item.priceKes
							});
							toast.success(`Added ${item.name}`);
						},
						children: "Add to basket"
					})
				] })]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl",
					children: ["Also in ", item.category]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/p/$slug/medicines/$medSlug",
						params: {
							slug: pharmacy.slug,
							medSlug: r.slug
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card rounded-2xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: formatKes(r.priceKes)
							})]
						})
					}, r.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { MedicinePage as component };
