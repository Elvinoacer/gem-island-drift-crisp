import { t as formatKes } from "./platform-yHVO60AA.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { o as listAdminMedicines, p as updateInventory, t as AdminShell } from "./admin-shell-Cyn5oF00.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/medicines-ycHJkdUH.js
var import_jsx_runtime = require_jsx_runtime();
function Inventory() {
	const q = useAuthedQuery(() => listAdminMedicines());
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Inventory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Prices and stock are this pharmacy only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto rounded-2xl border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-cream text-xs uppercase tracking-wider text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Listed"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: item.sku
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									className: "field-input max-w-28",
									defaultValue: item.priceKes,
									onBlur: async (e) => {
										await updateInventory({ data: {
											medicineId: item.id,
											priceKes: Number(e.target.value),
											stockStatus: item.stockStatus,
											listed: item.listed
										} });
										toast.success("Price updated");
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field-input",
									defaultValue: item.stockStatus,
									onChange: async (e) => {
										await updateInventory({ data: {
											medicineId: item.id,
											priceKes: item.priceKes,
											stockStatus: e.target.value,
											listed: item.listed
										} });
										q.reload();
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "in_stock",
											children: "In stock"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "low",
											children: "Low"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "out",
											children: "Out"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-sm font-semibold text-forest",
										onClick: async () => {
											await updateInventory({ data: {
												medicineId: item.id,
												priceKes: item.priceKes,
												stockStatus: item.stockStatus,
												listed: !item.listed
											} });
											q.reload();
										},
										children: item.listed ? "Listed" : "Hidden"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.stockStatus }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 text-xs text-muted",
										children: formatKes(item.priceKes)
									})
								]
							})
						]
					}, item.id)) })]
				})
			})
		]
	});
}
//#endregion
export { Inventory as component };
