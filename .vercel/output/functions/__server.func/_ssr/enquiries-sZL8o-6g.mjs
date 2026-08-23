import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { a as listAdminEnquiries, f as updateEnquiryStatus, t as AdminShell } from "./admin-shell-Cyn5oF00.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { t as formatWhen } from "./format-BGZFVW-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiries-sZL8o-6g.js
var import_jsx_runtime = require_jsx_runtime();
function EnquiriesAdmin() {
	const q = useAuthedQuery(() => listAdminEnquiries());
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
			children: "Enquiries"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: q.data.items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "surface-card rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: e.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								e.name,
								" · ",
								e.phone,
								" · ",
								formatWhen(e.createdAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: e.message
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: e.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2",
					children: ["open", "closed"].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost text-sm",
						onClick: async () => {
							await updateEnquiryStatus({ data: {
								id: e.id,
								status
							} });
							q.reload();
						},
						children: status
					}, status))
				})]
			}, e.id))
		})]
	});
}
//#endregion
export { EnquiriesAdmin as component };
