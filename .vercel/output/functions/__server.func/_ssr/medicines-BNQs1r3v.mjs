import { o as __toESM } from "../_runtime.mjs";
import { t as formatKes } from "./platform-yHVO60AA.mjs";
import { G as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as submitOrder, i as Route$3 } from "./router-B0sDlXDw.mjs";
import { t as StatusBadge } from "./status-badge-1zRt-Kgl.mjs";
import { t as useCart } from "./cart-CzEZC604.mjs";
import { n as stockLabel } from "./format-BGZFVW-w.mjs";
import { n as Input, r as Select, t as Field } from "./field-CGJ-59_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/medicines-BNQs1r3v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Medicines() {
	const { pharmacy, items, categories } = Route$3.useLoaderData();
	const search = Route$3.useSearch();
	const add = useCart((s) => s.add);
	const cart = useCart();
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const mine = cart.pharmacySlug === pharmacy.slug ? cart.items : [];
	const total = (0, import_react.useMemo)(() => mine.reduce((s, i) => s + i.priceKes * i.qty, 0), [mine]);
	async function checkout(e) {
		e.preventDefault();
		if (!mine.length) return;
		setBusy(true);
		try {
			const res = await submitOrder({ data: {
				slug: pharmacy.slug,
				name,
				phone,
				items: mine.map((i) => ({
					name: i.name,
					qty: i.qty,
					priceKes: i.priceKes
				}))
			} });
			toast.success(`Order received · ${formatKes(res.total)}`);
			cart.clear();
			setName("");
			setPhone("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not place order");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Catalogue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-4xl",
				children: ["Medicines at ", pharmacy.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Prices and stock are this shop’s own. Prescription-only items are not sold from this list — bring a valid script to the counter."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "q",
						defaultValue: search.q,
						placeholder: "Search the shelf",
						className: "max-w-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						name: "category",
						defaultValue: search.category ?? "",
						className: "max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All categories"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.slug,
							children: c.title
						}, c.slug))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						type: "submit",
						children: "Filter"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface-card overflow-hidden rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.imageUrl,
							alt: "",
							className: "h-36 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.stockStatus }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-xl leading-tight",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/p/$slug/medicines/$medSlug",
										params: {
											slug: pharmacy.slug,
											medSlug: item.slug
										},
										children: item.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										item.genericName,
										" · ",
										item.form,
										" ",
										item.strength
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold tabular-nums",
										children: formatKes(item.priceKes)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn-ghost text-sm",
										disabled: item.stockStatus === "out",
										onClick: () => {
											add(pharmacy.slug, {
												medicineId: item.id,
												slug: item.slug,
												name: item.name,
												priceKes: item.priceKes
											});
											toast.success(`Added ${item.name}`);
										},
										children: item.stockStatus === "out" ? stockLabel("out") : "Add"
									})]
								})
							]
						})]
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Basket"
					}), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Add OTC items from this shop."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: mine.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									i.name,
									" × ",
									i.qty
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatKes(i.priceKes * i.qty)
								})]
							}, i.medicineId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-semibold tabular-nums",
							children: ["Total ", formatKes(total)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 space-y-3",
							onSubmit: checkout,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Your name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										minLength: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										required: true,
										minLength: 7
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-primary w-full",
									disabled: busy,
									children: busy ? "Sending…" : "Place pickup order"
								})
							]
						})
					] })]
				})]
			})
		]
	});
}
//#endregion
export { Medicines as component };
