import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as PageSkeleton, t as ErrorBanner } from "./page-state-DpakMD24.mjs";
import { r as getAdminStorefront, t as AdminShell, u as saveStorefront } from "./admin-shell-Cyn5oF00.mjs";
import { t as useAuthedQuery } from "./use-authed-query-Q8UKrCvH.mjs";
import { i as Textarea, n as Input, t as Field } from "./field-CGJ-59_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storefront-DofoKsBa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StorefrontEditor() {
	const q = useAuthedQuery(() => getAdminStorefront());
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (q.loading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (q.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: q.error })
	});
	if (!q.data) return null;
	const { profile, membership, pharmacy, hours } = q.data;
	const hoursText = hours.map((h) => `${h.day} | ${h.time}`).join("\n");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await saveStorefront({ data: {
				name: String(fd.get("name") ?? ""),
				tagline: String(fd.get("tagline") ?? ""),
				description: String(fd.get("description") ?? ""),
				about: String(fd.get("about") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				email: String(fd.get("email") ?? ""),
				whatsapp: String(fd.get("whatsapp") ?? ""),
				street: String(fd.get("street") ?? ""),
				city: String(fd.get("city") ?? ""),
				county: String(fd.get("county") ?? ""),
				zip: String(fd.get("zip") ?? ""),
				latitude: String(fd.get("latitude") ?? ""),
				longitude: String(fd.get("longitude") ?? ""),
				deliveryNotes: String(fd.get("deliveryNotes") ?? ""),
				deliveryFeeKes: Number(fd.get("deliveryFeeKes") ?? 0),
				hoursText: String(fd.get("hoursText") ?? "")
			} });
			toast.success("Storefront saved — public pages and map update immediately");
			q.reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Save failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		profile,
		membership,
		onSwitch: q.reload,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Storefront & SEO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Name, city, pin, and hours feed the public page, JSON-LD Pharmacy markup, and the directory card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-6 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pharmacy name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							defaultValue: pharmacy.name,
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tagline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "tagline",
							defaultValue: pharmacy.tagline
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Short description (search + meta)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "description",
							defaultValue: pharmacy.description
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "About",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "about",
							defaultValue: pharmacy.about
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "phone",
									defaultValue: pharmacy.phone
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "WhatsApp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "whatsapp",
									defaultValue: pharmacy.whatsapp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "email",
									defaultValue: pharmacy.email
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Street",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "street",
									defaultValue: pharmacy.street
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "City",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "city",
									defaultValue: pharmacy.city
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "County",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "county",
									defaultValue: pharmacy.county
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Postal code",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "zip",
									defaultValue: pharmacy.zip
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Delivery fee (KES)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "deliveryFeeKes",
									type: "number",
									defaultValue: pharmacy.deliveryFeeKes
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Latitude",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "latitude",
									defaultValue: pharmacy.latitude ?? ""
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Longitude",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "longitude",
									defaultValue: pharmacy.longitude ?? ""
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Delivery notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "deliveryNotes",
							defaultValue: pharmacy.deliveryNotes
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hours",
						hint: "One per line: Day | Time",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "hoursText",
							defaultValue: hoursText
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary w-fit",
						disabled: busy,
						children: busy ? "Saving…" : "Save storefront"
					})
				]
			})
		]
	});
}
//#endregion
export { StorefrontEditor as component };
