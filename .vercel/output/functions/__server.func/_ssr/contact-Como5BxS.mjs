import { o as __toESM } from "../_runtime.mjs";
import { o as waLink } from "./platform-yHVO60AA.mjs";
import { G as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { u as submitEnquiry } from "./router-B0sDlXDw.mjs";
import { t as usePharmacy } from "./storefront-context-DyvpP1Cd.mjs";
import { i as Textarea, n as Input, t as Field } from "./field-CGJ-59_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Como5BxS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const pharmacy = usePharmacy();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await submitEnquiry({ data: {
				slug: pharmacy.slug,
				name: String(fd.get("name") ?? ""),
				email: String(fd.get("email") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				subject: String(fd.get("subject") ?? ""),
				message: String(fd.get("message") ?? "")
			} });
			toast.success("Message sent to the pharmacy");
			e.currentTarget.reset();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: ["Talk to ", pharmacy.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [
					pharmacy.street,
					", ",
					pharmacy.city,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					pharmacy.phone,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					pharmacy.email
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}`),
				className: "btn-primary mt-6",
				target: "_blank",
				rel: "noreferrer",
				children: "WhatsApp"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "surface-card space-y-3 rounded-3xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
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
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "email",
						type: "email"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Subject",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "subject",
						required: true,
						minLength: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Message",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "message",
						required: true,
						minLength: 8
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-primary",
					disabled: busy,
					children: busy ? "Sending…" : "Send message"
				})
			]
		})]
	});
}
//#endregion
export { Contact as component };
