import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as getSessionProfile } from "./session-Cg3YM5f1.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { n as UserButton } from "./gates-CBujfI_M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-slot-DgjnaAb3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useSessionProfile() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			return;
		}
		let cancelled = false;
		setLoading(true);
		getSessionProfile().then((p) => {
			if (!cancelled) setProfile(p);
		}).catch(() => {
			if (!cancelled) setProfile(null);
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	return {
		user,
		isPending: isPending || Boolean(user) && loading && !profile,
		profile
	};
}
function AuthSlot({ inverted }) {
	const { user, isPending, profile } = useSessionProfile();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-24 animate-pulse rounded-full bg-ink/10" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: cn("btn-ghost text-sm", inverted && "border-cream/20 bg-transparent text-cream hover:bg-cream/10"),
		children: "Sign in"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			profile?.platformAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/platform",
				className: cn("hidden sm:inline text-xs font-semibold", inverted ? "text-gold" : "text-forest"),
				children: "Network"
			}) : null,
			profile && profile.memberships.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: cn("hidden sm:inline text-xs font-semibold", inverted ? "text-cream/80" : "text-muted"),
				children: "Staff"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal",
				className: cn("hidden sm:inline text-xs font-semibold", inverted ? "text-cream/80" : "text-muted"),
				children: "Portal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(inverted && "text-cream"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			})
		]
	});
}
//#endregion
export { AuthSlot as t };
