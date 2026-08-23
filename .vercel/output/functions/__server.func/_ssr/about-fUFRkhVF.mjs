import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as usePharmacy } from "./storefront-context-DyvpP1Cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-fUFRkhVF.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const pharmacy = usePharmacy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "About"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: pharmacy.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted",
				children: pharmacy.about || pharmacy.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Licence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: pharmacy.licenceNumber
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-medium",
							children: [
								pharmacy.city,
								", ",
								pharmacy.county
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Insurance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: pharmacy.insurance.join(", ") || "Ask in store"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-3xl",
				children: "The team"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: pharmacy.team.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface-card overflow-hidden rounded-2xl",
					children: [m.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: m.photoUrl,
						alt: "",
						className: "h-48 w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl leading-tight",
								children: m.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-semibold uppercase tracking-wider text-forest",
								children: m.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: m.bio
							})
						]
					})]
				}, m.name))
			})
		]
	});
}
//#endregion
export { About as component };
