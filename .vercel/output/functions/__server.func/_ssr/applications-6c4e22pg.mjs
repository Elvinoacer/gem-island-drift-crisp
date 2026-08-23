import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { n as Input, t as Field } from "./field-CGJ-59_c.mjs";
import { a as reviewPharmacy, i as listApplications, t as PlatformShell } from "./platform-BzfYtP7Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications-6c4e22pg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Applications() {
	const q = useAuthedQuery(() => listApplications());
	const [reason, setReason] = (0, import_react.useState)("");
	if (q.loading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (q.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: q.error }) });
	if (!q.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlatformShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl text-cream",
			children: "Applications"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-cream/70",
			children: "Approve a PPB-licensed shop before it can list. Listing is a second step the owner (or you) takes."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Note for reject / needs info",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					className: "bg-cream text-ink"
				})
			})
		}),
		q.data.queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-cream/70",
			children: "No applications in the queue."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 space-y-4",
			children: q.data.queue.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl border border-cream/10 bg-forest p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-cream",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream/65",
							children: [
								p.street,
								", ",
								p.city,
								" · ",
								p.licenceNumber,
								" · ",
								p.email
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-cream/80",
							children: p.about
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-gold",
							onClick: async () => {
								await reviewPharmacy({ data: {
									id: p.id,
									action: "approve"
								} });
								toast.success("Approved — owner can now list");
								q.reload();
							},
							children: "Approve"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost border-cream/20 bg-transparent text-cream",
							onClick: async () => {
								await reviewPharmacy({ data: {
									id: p.id,
									action: "needs_info",
									reason
								} });
								q.reload();
							},
							children: "Needs info"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost border-cream/20 bg-transparent text-cream",
							onClick: async () => {
								await reviewPharmacy({ data: {
									id: p.id,
									action: "reject",
									reason
								} });
								q.reload();
							},
							children: "Reject"
						})
					]
				})]
			}, p.id))
		})
	] });
}
//#endregion
export { Applications as component };
