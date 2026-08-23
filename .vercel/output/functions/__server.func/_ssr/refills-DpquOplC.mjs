import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { c as listAdminRefills, h as updateRefillStatus, t as AdminShell } from "./admin-shell-Cyn5oF00.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { t as formatWhen } from "./format-BGZFVW-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/refills-DpquOplC.js
var import_jsx_runtime = require_jsx_runtime();
var NEXT = [
	"pending",
	"ready",
	"dispensed",
	"cancelled"
];
function RefillsAdmin() {
	const q = useAuthedQuery(() => listAdminRefills());
	if (q.loading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (q.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: q.error })
	});
	if (!q.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		profile: q.data.profile,
		membership: q.data.membership,
		onSwitch: q.reload,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Refill requests"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: q.data.items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "surface-card rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: r.medication
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								r.guestName,
								" · ",
								r.guestPhone,
								" · ",
								formatWhen(r.createdAt)
							]
						}),
						r.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: r.notes
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: NEXT.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost text-sm",
						onClick: async () => {
							await updateRefillStatus({ data: {
								id: r.id,
								status
							} });
							q.reload();
						},
						children: status
					}, status))
				})]
			}, r.id))
		})]
	});
}
//#endregion
export { RefillsAdmin as component };
