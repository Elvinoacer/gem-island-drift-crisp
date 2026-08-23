import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { n as getAdminDashboard, t as AdminShell } from "./admin-shell-Cyn5oF00.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { t as formatWhen } from "./format-BGZFVW-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DgjQ45ag.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const q = useAuthedQuery(() => getAdminDashboard({ data: {} }));
	if (q.loading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (q.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: q.error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/onboard",
			className: "btn-primary mt-6",
			children: "List a pharmacy"
		})]
	});
	if (!q.data) return null;
	const { profile, membership, pharmacy, stats, recentRefills, recentEnquiries } = q.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		profile,
		membership,
		onSwitch: q.reload,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Today"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl",
				children: pharmacy.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					pharmacy.city,
					" · ",
					pharmacy.licenceNumber
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					["Pending refills", stats.pendingRefills],
					["Open enquiries", stats.openEnquiries],
					["Orders", stats.orders],
					["Low / out SKUs", stats.lowStock]
				].map(([label, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl tabular-nums",
						children: n
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Refills"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/refills",
							className: "text-sm font-semibold text-forest",
							children: "All"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: recentRefills.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								r.guestName,
								" · ",
								r.medication
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
						}, r.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Enquiries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/enquiries",
							className: "text-sm font-semibold text-forest",
							children: "All"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: recentEnquiries.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: r.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", formatWhen(r.createdAt)]
						})] }, r.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
