import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-9MEbz7zz.js
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8 shrink-0", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "7",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13",
				y: "6",
				width: "6",
				height: "20",
				rx: "1.2",
				fill: "#f3efe4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "13",
				width: "20",
				height: "6",
				rx: "1.2",
				fill: "#f3efe4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "2.1",
				fill: "#c4a35a"
			})
		]
	});
}
function BrandLockup({ subtitle, inverted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 min-h-11",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: inverted ? "text-cream" : "text-forest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block font-display text-lg font-semibold tracking-tight", inverted ? "text-cream" : "text-ink"),
				children: "Aether"
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block text-xs", inverted ? "text-cream/70" : "text-muted"),
				children: subtitle
			}) : null]
		})]
	});
}
//#endregion
export { BrandLockup as t };
