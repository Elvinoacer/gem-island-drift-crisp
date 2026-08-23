import { o as __toESM } from "../_runtime.mjs";
import { a as platform, i as pharmacyPath } from "./platform-yHVO60AA.mjs";
import { G as require_react, S as useNavigate, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, i as ShieldCheck, r as Stethoscope, s as MapPin, t as Truck } from "../_libs/lucide-react.mjs";
import { l as Route$31 } from "./router-B0sDlXDw.mjs";
import { n as Input, r as Select } from "./field-CGJ-59_c.mjs";
import { t as MarketplaceShell } from "./marketplace-shell-eR12o65u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-eHzlYWd4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PharmacyCard({ pharmacy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/p/$slug",
		params: { slug: pharmacy.slug },
		className: "surface-card group flex flex-col overflow-hidden rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] overflow-hidden bg-forest-deep",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: pharmacy.coverImageUrl,
				alt: "",
				className: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
			}), pharmacy.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-ink",
				children: "Featured"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-forest",
					children: [
						pharmacy.city,
						", ",
						pharmacy.county
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-2xl leading-tight",
					children: pharmacy.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-2 text-sm text-muted",
					children: pharmacy.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), pharmacy.street]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), pharmacy.phone]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-4 text-sm font-semibold text-forest",
					children: [
						"Visit ",
						pharmacyPath(pharmacy.slug).replace(/^\//, ""),
						" →"
					]
				})
			]
		})]
	});
}
function Home() {
	const { pharmacies, cities } = Route$31.useLoaderData();
	const search = Route$31.useSearch();
	const navigate = useNavigate({ from: "/" });
	const [q, setQ] = (0, import_react.useState)(search.q ?? "");
	const [city, setCity] = (0, import_react.useState)(search.city ?? "");
	function apply(e) {
		e.preventDefault();
		navigate({ search: {
			...q ? { q } : {},
			...city ? { city } : {}
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketplaceShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-forest-deep text-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/gallery/welcoming_retail_floor.webp",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-25"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-deep/90 to-forest/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
								children: "Kenya · Licensed neighbourhood care"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl",
								children: "A pharmacist close to home. A network behind them."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-lg text-base text-cream/80 sm:text-lg",
								children: platform.promise
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-lg text-sm text-cream/70",
								children: platform.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#directory",
									className: "btn-gold",
									children: "Find a pharmacy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/for-pharmacies",
									className: "btn-ghost border-cream/20 bg-transparent text-cream",
									children: "List your pharmacy"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: apply,
						className: "surface-card animate-fade-up self-end rounded-3xl p-5 text-ink",
						style: { animationDelay: "80ms" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: "Search the network"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Live shops only — each with its own hours, map, and catalogue."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Name, neighbourhood, or need",
										value: q,
										onChange: (e) => setQ(e.target.value),
										"aria-label": "Search pharmacies"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: city,
										onChange: (e) => setCity(e.target.value),
										"aria-label": "City",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All cities"
										}), cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "btn-primary",
										children: "Show pharmacies"
									})
								]
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3",
			children: [
				{
					icon: ShieldCheck,
					title: "PPB-licensed shops",
					body: "Every listed pharmacy carries a Pharmacy and Poisons Board licence. We review before they go live."
				},
				{
					icon: Stethoscope,
					title: "Care, not just a counter",
					body: "Refills, vaccines, blood pressure, counselling — each shop publishes what it actually offers."
				},
				{
					icon: Truck,
					title: "Local delivery",
					body: "Same-neighbourhood runs with fees and zones set by the pharmacy, not a faceless warehouse."
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5 text-forest" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-xl",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.body
					})
				]
			}, item.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "directory",
			className: "mx-auto max-w-6xl px-4 pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl sm:text-4xl",
					children: "Pharmacies on Aether"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [pharmacies.length, " listed"]
				})]
			}), pharmacies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "No listed pharmacies match that search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2",
				children: pharmacies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PharmacyCard, { pharmacy: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-3xl bg-forest text-cream md:grid md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/gallery/private_counselling.webp",
					alt: "Pharmacist in a private counselling session",
					className: "h-56 w-full object-cover md:h-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 md:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
							children: "For pharmacies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl",
							children: "Your shop. Your patients. Our rails."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-cream/80",
							children: "Aether is infrastructure: a public storefront with local SEO, a working staff console, and a patient portal — isolated per pharmacy, reviewed before listing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/for-pharmacies",
							className: "btn-gold mt-6",
							children: "See how listing works"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "inline-flex items-center gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-forest" }), "Serving Nairobi, Mombasa, and shops joining from across Kenya."]
			})
		})
	] });
}
//#endregion
export { Home as component };
