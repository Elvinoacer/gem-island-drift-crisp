import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-CzEZC604.js
var useCart = create()(persist((set, get) => ({
	pharmacySlug: null,
	items: [],
	add: (pharmacySlug, line, qty = 1) => {
		const cur = get();
		if (cur.pharmacySlug && cur.pharmacySlug !== pharmacySlug) {
			set({
				pharmacySlug,
				items: [{
					...line,
					qty
				}]
			});
			return;
		}
		if (cur.items.find((i) => i.medicineId === line.medicineId)) set({
			pharmacySlug,
			items: cur.items.map((i) => i.medicineId === line.medicineId ? {
				...i,
				qty: i.qty + qty
			} : i)
		});
		else set({
			pharmacySlug,
			items: [...cur.items, {
				...line,
				qty
			}]
		});
	},
	setQty: (medicineId, qty) => {
		if (qty <= 0) {
			set({ items: get().items.filter((i) => i.medicineId !== medicineId) });
			return;
		}
		set({ items: get().items.map((i) => i.medicineId === medicineId ? {
			...i,
			qty
		} : i) });
	},
	clear: () => set({
		items: [],
		pharmacySlug: null
	})
}), { name: "aether-cart" }));
//#endregion
export { useCart as t };
