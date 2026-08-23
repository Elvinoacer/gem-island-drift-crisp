import { b as Link, f as useRouterState, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { I as object, O as _enum, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as BrandLockup } from "./brand-9MEbz7zz.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { t as AuthSlot } from "./auth-slot-DgjnaAb3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-BzfYtP7Q.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [{
	to: "/platform",
	label: "Network",
	exact: true
}, {
	to: "/platform/applications",
	label: "Applications"
}];
function PlatformShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-forest-deep text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-cream/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {
					inverted: true,
					subtitle: "Platform"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-2",
					children: [LINKS.map((l) => {
						const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "rounded-full px-3 py-2 text-sm font-medium " + (active ? "bg-cream text-forest-deep" : "text-cream/80 hover:bg-cream/10"),
							children: l.label
						}, l.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { inverted: true })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children
		})]
	});
}
var getPlatformHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6c0a015dd9c1925d60337b8d339b10c9bf87f15efb9c2b1c38a493cd86d9d4f1"));
var listApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("47d19514b7c4d88099ef873926b920386fe9562feccfd5c4cd0dc2d157fc9e9c"));
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
})).handler(createSsrRpc("7745d215106460e1552e2a003b004e94f1f47285178254b199704d46551e44f8"));
var impersonatePharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(createSsrRpc("2b35c0871c48cf00c07a24a383917ba82a144aa67af7f9d7cb1472a384c9dd10"));
//#endregion
export { reviewPharmacy as a, listApplications as i, getPlatformHome as n, impersonatePharmacy as r, PlatformShell as t };
