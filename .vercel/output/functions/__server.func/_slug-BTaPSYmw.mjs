import { i as pharmacyPath, n as mapsDirections, o as waLink } from "./_ssr/platform-yHVO60AA.mjs";
import { b as Link, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, c as Clock, i as ShieldCheck, s as MapPin } from "./_libs/lucide-react.mjs";
import { t as BreadcrumbJsonLd } from "./_ssr/json-ld-gKIwfLNZ.mjs";
import { t as usePharmacy } from "./_ssr/storefront-context-DyvpP1Cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BTaPSYmw.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const pharmacy = usePharmacy();
	const hero = pharmacy.coverImageUrl || pharmacy.images[0]?.url;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbJsonLd, { items: [{
			name: "Aether",
			path: "/"
		}, {
			name: pharmacy.name,
			path: pharmacyPath(pharmacy.slug)
		}] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[70vh] overflow-hidden bg-forest-deep text-cream",
			children: [
				hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-40"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
							children: [
								pharmacy.city,
								", ",
								pharmacy.county,
								" · Licence ",
								pharmacy.licenceNumber
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl",
							children: pharmacy.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-lg text-cream/85",
							children: pharmacy.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/p/$slug/refill",
								params: { slug: pharmacy.slug },
								className: "btn-gold",
								children: "Request a refill"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${pharmacy.phone.replace(/\s/g, "")}`,
								className: "btn-ghost border-cream/25 bg-transparent text-cream",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
									" ",
									pharmacy.phone
								]
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 text-forest" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl",
							children: "Find us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								pharmacy.street,
								", ",
								pharmacy.city
							]
						}),
						pharmacy.latitude != null && pharmacy.longitude != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "mt-3 inline-block text-sm font-semibold text-forest",
							href: mapsDirections(pharmacy.latitude, pharmacy.longitude),
							target: "_blank",
							rel: "noreferrer",
							children: "Directions"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-forest" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl",
							children: "Hours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 text-sm text-muted",
							children: pharmacy.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								h.day,
								": ",
								h.time
							] }, h.day))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-forest" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl",
							children: "Insurance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: pharmacy.insurance.join(" · ") || "Ask in store"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Care"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl",
					children: "Services at this shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: pharmacy.services.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$slug/services/$serviceSlug",
						params: {
							slug: pharmacy.slug,
							serviceSlug: s.slug
						},
						className: "surface-card overflow-hidden rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: s.imageUrl,
							alt: "",
							className: "h-36 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: s.short
							})]
						})]
					}, s.id))
				})
			]
		}),
		pharmacy.images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Inside"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl",
					children: "The shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-3",
					children: pharmacy.images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "overflow-hidden rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.url,
							alt: img.alt,
							className: "h-40 w-full object-cover md:h-52"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "sr-only",
							children: img.caption
						})]
					}, img.url))
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-forest px-6 py-10 text-cream md:flex md:items-center md:justify-between md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Need a refill today?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-cream/80",
					children: "Send the medication name. We will confirm stock and SHA details by phone or WhatsApp."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3 md:mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/p/$slug/refill",
						params: { slug: pharmacy.slug },
						className: "btn-gold",
						children: "Refill form"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: waLink(pharmacy.whatsapp, `Refill request for ${pharmacy.name}`),
						className: "btn-ghost border-cream/25 bg-transparent text-cream",
						target: "_blank",
						rel: "noreferrer",
						children: "WhatsApp"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
