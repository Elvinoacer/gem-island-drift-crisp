import { n as mapsDirections } from "./platform-yHVO60AA.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as usePharmacy } from "./storefront-context-DyvpP1Cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/location-DTs1UhvV.js
var import_jsx_runtime = require_jsx_runtime();
function LocationPage() {
	const pharmacy = usePharmacy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Location"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: [
					pharmacy.name,
					", ",
					pharmacy.city
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [
					pharmacy.street,
					", ",
					pharmacy.city,
					", ",
					pharmacy.county,
					" ",
					pharmacy.zip,
					", ",
					pharmacy.country
				]
			}),
			pharmacy.latitude != null && pharmacy.longitude != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm tabular-nums text-muted",
				children: [
					pharmacy.latitude.toFixed(5),
					", ",
					pharmacy.longitude.toFixed(5)
				]
			}) : null,
			pharmacy.mapsEmbedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-hidden rounded-3xl border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: `Map of ${pharmacy.name}`,
					src: pharmacy.mapsEmbedUrl,
					className: "h-[360px] w-full",
					loading: "lazy",
					referrerPolicy: "no-referrer-when-downgrade"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [pharmacy.latitude != null && pharmacy.longitude != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn-primary",
					href: mapsDirections(pharmacy.latitude, pharmacy.longitude),
					target: "_blank",
					rel: "noreferrer",
					children: "Get directions"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `tel:${pharmacy.phone.replace(/\s/g, "")}`,
					className: "btn-ghost",
					children: ["Call ", pharmacy.phone]
				})]
			}),
			pharmacy.deliveryNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-2xl text-sm text-muted",
				children: pharmacy.deliveryNotes
			}) : null
		]
	});
}
//#endregion
export { LocationPage as component };
