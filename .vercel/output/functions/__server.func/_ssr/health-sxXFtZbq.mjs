import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$5 } from "./router-B0sDlXDw.mjs";
import { t as usePharmacy } from "./storefront-context-DyvpP1Cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-sxXFtZbq.js
var import_jsx_runtime = require_jsx_runtime();
function Health() {
	const pharmacy = usePharmacy();
	const articles = Route$5.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Health notes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: ["Guidance from ", pharmacy.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "These notes are educational. They do not replace a clinician. For emergencies dial 999 or 112."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2",
				children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/p/$slug/health/$articleSlug",
					params: {
						slug: pharmacy.slug,
						articleSlug: a.slug
					},
					className: "surface-card overflow-hidden rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.imageUrl,
						alt: "",
						className: "h-44 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-forest",
								children: [
									a.category,
									" · ",
									a.readTime
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-2xl leading-tight",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm text-muted",
								children: a.excerpt
							})
						]
					})]
				}, a.id))
			})
		]
	});
}
//#endregion
export { Health as component };
