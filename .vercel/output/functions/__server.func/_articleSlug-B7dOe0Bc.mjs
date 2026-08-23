import { i as pharmacyPath } from "./_ssr/platform-yHVO60AA.mjs";
import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4 } from "./_ssr/router-B0sDlXDw.mjs";
import { t as BreadcrumbJsonLd } from "./_ssr/json-ld-gKIwfLNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_articleSlug-B7dOe0Bc.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { pharmacy, article } = Route$4.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
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
					name: "Health",
					path: pharmacyPath(pharmacy.slug, "/health")
				},
				{
					name: article.title,
					path: pharmacyPath(pharmacy.slug, `/health/${article.slug}`)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.imageUrl,
				alt: "",
				className: "h-64 w-full rounded-3xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "eyebrow mt-8",
				children: [
					article.category,
					" · ",
					article.readTime
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: ["By ", article.author]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted",
				children: article.excerpt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4 text-base leading-relaxed",
				children: article.content.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-xs text-muted",
				children: [
					"Published for patients of ",
					pharmacy.name,
					", ",
					pharmacy.city,
					". Not medical advice."
				]
			})
		]
	});
}
//#endregion
export { ArticlePage as component };
