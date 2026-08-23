import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { I as object, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { t as authMiddleware } from "./middleware-BP42Eo2K.mjs";
import { t as RedirectToSignIn } from "./gates-CBujfI_M.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { i as Textarea, n as Input, t as Field } from "./field-CGJ-59_c.mjs";
import { t as MarketplaceShell } from "./marketplace-shell-eR12o65u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboard-vLkdEbrN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var submitOnboard = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(3),
	slug: string().optional(),
	tagline: string().min(4),
	city: string().min(2),
	county: string().min(2),
	street: string().min(3),
	phone: string().min(7),
	email: string().email(),
	licenceNumber: string().min(4),
	about: string().min(12)
})).handler(createSsrRpc("34f6cbe303091d3f17caf33aeb88d0e76330e69b72230331f01da9441455a5cc"));
var listMyPharmacies = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c6ef8d02d008e2e6472cbafbb21dbd867097968482f43963d17c316ce896599b"));
var goLive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ pharmacyId: string() })).handler(createSsrRpc("5718a41b789d9d48060fdbc2edcb56e3ad41ae678db9acae7e068a988a4c8eab"));
function Onboard() {
	const { user, sessionPending, data, error, loading, reload } = useAuthedQuery(() => listMyPharmacies());
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (sessionPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, { label: "Checking session" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await submitOnboard({ data: {
				name: String(fd.get("name") ?? ""),
				slug: String(fd.get("slug") ?? "") || void 0,
				tagline: String(fd.get("tagline") ?? ""),
				city: String(fd.get("city") ?? ""),
				county: String(fd.get("county") ?? ""),
				street: String(fd.get("street") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				email: String(fd.get("email") ?? ""),
				licenceNumber: String(fd.get("licence") ?? ""),
				about: String(fd.get("about") ?? "")
			} });
			toast.success("Application submitted for review");
			e.target.reset();
			reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not submit");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Onboarding"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "List your pharmacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "We review licence details before a shop appears in the public directory. You can keep editing the storefront from the staff console while you wait."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: error })
			}) : null,
			!loading && data && data.pharmacies.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-3",
				children: data.pharmacies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							p.city,
							" · ",
							p.licenceNumber || "No licence on file"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }),
							p.listed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "listed" }) : null,
							p.status === "active" && !p.listed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-primary",
								onClick: async () => {
									await goLive({ data: { pharmacyId: p.id } });
									toast.success("Listed in the directory");
									reload();
								},
								children: "Go live"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "btn-ghost",
								children: "Open console"
							})
						]
					})]
				}, p.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "surface-card mt-10 space-y-4 rounded-3xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "New application"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pharmacy name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true,
							minLength: 3,
							placeholder: "e.g. Riverside Chemist"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred URL slug",
						hint: "Letters, numbers, hyphens. We uniquify if taken.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "slug",
							placeholder: "riverside"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tagline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "tagline",
							required: true,
							minLength: 4,
							placeholder: "Care on the river road"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Street",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "street",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "City",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "city",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "County",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "county",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "phone",
									required: true,
									minLength: 7
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "email",
									type: "email",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PPB licence number",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "licence",
									required: true,
									minLength: 4,
									placeholder: "PPB-…"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "About the shop",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "about",
							required: true,
							minLength: 12,
							placeholder: "Who you serve, what you are known for."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-primary",
						disabled: busy,
						children: busy ? "Submitting…" : "Submit for review"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Onboard as component };
