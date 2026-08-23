import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { I as object, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { r as updateMyProfile } from "./session-Cg3YM5f1.mjs";
import { t as RedirectToSignIn } from "./gates-CBujfI_M.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { t as formatWhen } from "./format-BGZFVW-w.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./field-CGJ-59_c.mjs";
import { t as MarketplaceShell } from "./marketplace-shell-eR12o65u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-Bq5Ssvhr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getPortalHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d87babf296a86592a3208fe577ddc4c9f406e700007918402478f1c4ece6b64d"));
var joinPharmacy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(createSsrRpc("d44537769363d4ef8fcfbd77fd09864de158c766224f406aaae88772a7aa7542"));
var portalRefill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	pharmacyId: string(),
	medication: string().min(2),
	notes: string().optional()
})).handler(createSsrRpc("3000539b915600891b1e21048d340d6997cdcfc78c532ac097b6f61f52c2e5e5"));
function Portal() {
	const { user, sessionPending, data, error, loading, reload } = useAuthedQuery(() => getPortalHome());
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (sessionPending || user && loading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, { label: "Opening portal" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onRefill(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await portalRefill({ data: {
				pharmacyId: String(fd.get("pharmacyId") ?? ""),
				medication: String(fd.get("medication") ?? ""),
				notes: String(fd.get("notes") ?? "")
			} });
			toast.success("Refill sent to the pharmacy");
			e.currentTarget.reset();
			reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send");
		} finally {
			setBusy(false);
		}
	}
	async function onProfile(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await updateMyProfile({ data: {
				displayName: String(fd.get("displayName") ?? ""),
				phone: String(fd.get("phone") ?? "")
			} });
			toast.success("Profile saved");
			reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Patient portal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: ["Hello", data?.profile.displayName ? `, ${data.profile.displayName}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Your shops, points, and refill history — never mixed across pharmacies."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: error })
			}) : null,
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card rounded-3xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Your pharmacies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: data.mine.map((p) => {
								const loy = data.loyalty.find((l) => l.pharmacy_id === p.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 border-b border-line pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/p/$slug",
										params: { slug: p.slug },
										className: "font-semibold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [p.city, loy ? ` · ${loy.loyalty_tier} · ${loy.loyalty_points} pts` : ""]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/p/$slug/refill",
										params: { slug: p.slug },
										className: "text-sm font-semibold text-forest",
										children: "Refill"
									})]
								}, p.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm font-medium",
							children: "Join another listed shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-col gap-2",
							children: data.directory.filter((p) => !data.profile.customerPharmacyIds.includes(p.id)).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-ghost justify-between",
								onClick: async () => {
									await joinPharmacy({ data: { pharmacyId: p.id } });
									toast.success(`Joined ${p.name}`);
									reload();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: p.city
								})]
							}, p.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onRefill,
						className: "surface-card space-y-3 rounded-3xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Request a refill"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Pharmacy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									name: "pharmacyId",
									required: true,
									children: data.mine.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.id,
										children: p.name
									}, p.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Medication",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "medication",
									required: true,
									minLength: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Notes",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { name: "notes" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-primary",
								disabled: busy || data.mine.length === 0,
								children: busy ? "Sending…" : "Send to pharmacy"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onProfile,
						className: "surface-card space-y-3 rounded-3xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Your details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "displayName",
									defaultValue: data.profile.displayName,
									required: true,
									minLength: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "phone",
									defaultValue: data.profile.phone
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-ghost",
								children: "Save"
							})
						]
					})]
				})]
			}) : null,
			data && data.refills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Recent refills"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line rounded-2xl border border-line bg-paper",
					children: data.refills.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: r.medication
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: formatWhen(r.createdAt)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
					}, r.id))
				})]
			}) : null
		]
	}) });
}
//#endregion
export { Portal as component };
