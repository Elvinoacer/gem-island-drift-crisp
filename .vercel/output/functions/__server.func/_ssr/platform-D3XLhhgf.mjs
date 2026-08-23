import { S as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { a as reviewPharmacy, n as getPlatformHome, r as impersonatePharmacy, t as PlatformShell } from "./platform-BzfYtP7Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-D3XLhhgf.js
var import_jsx_runtime = require_jsx_runtime();
function PlatformHome() {
	const q = useAuthedQuery(() => getPlatformHome());
	const navigate = useNavigate();
	if (q.loading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (q.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: q.error }) });
	if (!q.data) return null;
	const { stats, pharmacies } = q.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlatformShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
			children: "Network"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl text-cream",
			children: "Aether control"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				["Pharmacies", stats.total],
				["Live listings", stats.live],
				["In review", stats.queue],
				["Suspended", stats.suspended]
			].map(([label, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-cream/10 bg-forest p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-cream/60",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums text-cream",
					children: n
				})]
			}, label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 space-y-3",
			children: pharmacies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream/10 bg-forest p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-cream",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cream/65",
					children: [
						p.city,
						" · ",
						p.licenceNumber || "No licence",
						" · /p/",
						p.slug
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }),
						p.listed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "listed" }) : null,
						p.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "featured" }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost border-cream/20 bg-transparent text-cream text-sm",
							onClick: async () => {
								await reviewPharmacy({ data: {
									id: p.id,
									action: p.listed ? "unlist" : "list"
								} });
								q.reload();
							},
							children: p.listed ? "Unlist" : "List"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost border-cream/20 bg-transparent text-cream text-sm",
							onClick: async () => {
								await reviewPharmacy({ data: {
									id: p.id,
									action: p.featured ? "unfeature" : "feature"
								} });
								q.reload();
							},
							children: p.featured ? "Unfeature" : "Feature"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-gold text-sm",
							onClick: async () => {
								await impersonatePharmacy({ data: { pharmacyId: p.id } });
								toast.success(`Opened ${p.name} console`);
								navigate({ to: "/admin" });
							},
							children: "Open console"
						})
					]
				})]
			}, p.id))
		})
	] });
}
//#endregion
export { PlatformHome as component };
