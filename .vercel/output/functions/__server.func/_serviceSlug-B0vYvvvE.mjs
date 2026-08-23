import { i as pharmacyPath } from "./_ssr/platform-yHVO60AA.mjs";
import { b as Link, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-B0sDlXDw.mjs";
import { t as BreadcrumbJsonLd } from "./_ssr/json-ld-gKIwfLNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_serviceSlug-B0vYvvvE.js
var import_jsx_runtime = require_jsx_runtime();
function ServicePage() {
	const { pharmacy, service } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
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
					name: "Services",
					path: pharmacyPath(pharmacy.slug, "/services")
				},
				{
					name: service.title,
					path: pharmacyPath(pharmacy.slug, `/services/${service.slug}`)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: service.imageUrl,
				alt: "",
				className: "h-64 w-full rounded-3xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-8",
				children: service.duration
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: service.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted",
				children: service.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$slug/contact",
					params: { slug: pharmacy.slug },
					className: "btn-primary",
					children: "Ask this pharmacy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$slug/refill",
					params: { slug: pharmacy.slug },
					className: "btn-ghost",
					children: "Request a refill"
				})]
			})
		]
	});
}
//#endregion
export { ServicePage as component };
