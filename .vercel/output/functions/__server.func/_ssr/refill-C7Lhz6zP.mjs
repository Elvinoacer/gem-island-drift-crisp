import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as submitRefill } from "./router-B0sDlXDw.mjs";
import { t as usePharmacy } from "./storefront-context-DyvpP1Cd.mjs";
import { i as Textarea, n as Input, t as Field } from "./field-CGJ-59_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/refill-C7Lhz6zP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Refill() {
	const pharmacy = usePharmacy();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await submitRefill({ data: {
				slug: pharmacy.slug,
				name: String(fd.get("name") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				medication: String(fd.get("medication") ?? ""),
				notes: String(fd.get("notes") ?? "")
			} });
			toast.success("Refill request received — we will call to confirm");
			e.currentTarget.reset();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Refills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: ["Request a refill at ", pharmacy.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "We confirm the prescription, stock, and SHA or insurance details before packing. This is not an emergency service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "surface-card mt-8 space-y-3 rounded-3xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Your name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true,
							minLength: 2
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
						label: "Medication",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "medication",
							required: true,
							minLength: 2,
							placeholder: "Name, strength, quantity"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "notes",
							placeholder: "Delivery, SHA number, usual doctor…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary w-full",
						disabled: busy,
						children: busy ? "Sending…" : "Submit refill request"
					})
				]
			})
		]
	});
}
//#endregion
export { Refill as component };
