import { o as __toESM } from "../_runtime.mjs";
import { G as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-BWkyY3jb.mjs";
import { c as Route$28 } from "./router-B0sDlXDw.mjs";
import { t as BrandLockup } from "./brand-9MEbz7zz.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { n as Input, t as Field } from "./field-CGJ-59_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-hOGhF_Hz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { next } = Route$28.useSearch();
	const dest = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		window.location.href = dest;
	}, [
		isPending,
		user,
		dest
	]);
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					name: name || email.split("@")[0],
					email,
					password
				});
				if (res.error) throw new Error(res.error.message);
			} else {
				const res = await authClient.signIn.email({
					email,
					password
				});
				if (res.error) throw new Error(res.error.message);
			}
			await authClient.getSession();
			window.location.href = dest;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not sign in");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-cream px-4 py-12 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { subtitle: "Pharmacy Network" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mt-8 rounded-3xl p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-3xl",
							children: mode === "in" ? "Welcome back" : "Create your account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "One login for patients, pharmacy staff, and the network desk."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-ghost w-full",
								onClick: () => signIn(p.providerId, { callbackURL: dest }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
								"or email",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-3",
							onSubmit: onEmail,
							children: [
								mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Your name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										autoComplete: mode === "up" ? "new-password" : "current-password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										minLength: 8,
										required: true
									})
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-forest",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "btn-primary w-full",
									disabled: busy || false,
									children: busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 w-full text-sm text-muted",
							onClick: () => setMode(mode === "in" ? "up" : "in"),
							children: mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-semibold text-forest",
						children: "Back to the network"
					})
				})
			]
		})
	});
}
//#endregion
export { Login as component };
