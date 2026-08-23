import { i as pharmacyPath, o as waLink, t as formatKes } from "./_ssr/platform-yHVO60AA.mjs";
import { b as Link, f as useRouterState, h as Outlet, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, c as Clock, o as MessageCircle, s as MapPin } from "./_libs/lucide-react.mjs";
import { s as Route$14 } from "./_ssr/router-B0sDlXDw.mjs";
import { n as PharmacyJsonLd } from "./_ssr/json-ld-gKIwfLNZ.mjs";
import { t as useCart } from "./_ssr/cart-CzEZC604.mjs";
import { t as BrandLockup } from "./_ssr/brand-9MEbz7zz.mjs";
import { t as AuthSlot } from "./_ssr/auth-slot-DgjnaAb3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Bjqa1gRF.js
var import_jsx_runtime = require_jsx_runtime();
function StorefrontShell({ pharmacy, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const cartCount = useCart((s) => s.pharmacySlug === pharmacy.slug ? s.items.reduce((n, i) => n + i.qty, 0) : 0);
	const today = pharmacy.hours[0];
	const slug = pharmacy.slug;
	const nav = [
		{
			label: "Home",
			href: pharmacyPath(slug),
			match: pharmacyPath(slug)
		},
		{
			label: "About",
			href: pharmacyPath(slug, "/about"),
			match: pharmacyPath(slug, "/about")
		},
		{
			label: "Services",
			href: pharmacyPath(slug, "/services"),
			match: pharmacyPath(slug, "/services")
		},
		{
			label: "Medicines",
			href: pharmacyPath(slug, "/medicines"),
			match: pharmacyPath(slug, "/medicines")
		},
		{
			label: "Health",
			href: pharmacyPath(slug, "/health"),
			match: pharmacyPath(slug, "/health")
		},
		{
			label: "Location",
			href: pharmacyPath(slug, "/location"),
			match: pharmacyPath(slug, "/location")
		},
		{
			label: "Contact",
			href: pharmacyPath(slug, "/contact"),
			match: pharmacyPath(slug, "/contact")
		},
		{
			label: "Refill",
			href: pharmacyPath(slug, "/refill"),
			match: pharmacyPath(slug, "/refill")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PharmacyJsonLd, { pharmacy }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-forest-deep text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
							pharmacy.street,
							", ",
							pharmacy.city
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-3",
						children: [today ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
								today.day,
								": ",
								today.time
							]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${pharmacy.phone.replace(/\s/g, "")}`,
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), pharmacy.phone]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-cream/92 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { subtitle: "Network" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden h-8 w-px bg-line sm:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/p/$slug",
								params: { slug },
								className: "min-w-0 truncate font-display text-lg font-semibold",
								children: pharmacy.name
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [cartCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/p/$slug/medicines",
							params: { slug },
							className: "btn-ghost text-sm",
							children: ["Basket ", cartCount]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2",
					children: nav.map((item) => {
						const active = item.label === "Home" ? pathname === item.match : pathname === item.match || pathname.startsWith(`${item.match}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium " + (active ? "bg-forest text-cream" : "text-ink/75 hover:bg-paper"),
							children: item.label
						}, item.href);
					})
				})]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-16 border-t border-line bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: pharmacy.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: pharmacy.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm",
								children: [
									pharmacy.street,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									pharmacy.city,
									", ",
									pharmacy.county,
									" ",
									pharmacy.zip
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: ["Licence ", pharmacy.licenceNumber]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-forest",
							children: "Hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1 text-sm",
							children: pharmacy.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.day }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: h.time
								})]
							}, h.day))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-forest",
							children: "Visit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${pharmacy.phone.replace(/\s/g, "")}`,
									className: "btn-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Call"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}`),
									className: "btn-ghost",
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " WhatsApp"]
								}),
								pharmacy.deliveryFeeKes > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										"Delivery from ",
										formatKes(pharmacy.deliveryFeeKes),
										" · ",
										pharmacy.deliveryNotes
									]
								}) : null
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-4 py-3 text-center text-xs text-muted",
					children: "Part of the Aether Pharmacy Network · Not an emergency service · Dial 999 / 112"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}, I have a question.`),
				className: "fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-cream shadow-lg",
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Chat"]
			})
		]
	});
}
function Layout() {
	const pharmacy = Route$14.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorefrontShell, {
		pharmacy,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { Layout as component };
