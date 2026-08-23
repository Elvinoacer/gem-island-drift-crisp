import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  medicineId: string;
  slug: string;
  name: string;
  priceKes: number;
  qty: number;
};

type CartState = {
  pharmacySlug: string | null;
  items: CartLine[];
  add: (pharmacySlug: string, line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (medicineId: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      pharmacySlug: null,
      items: [],
      add: (pharmacySlug, line, qty = 1) => {
        const cur = get();
        if (cur.pharmacySlug && cur.pharmacySlug !== pharmacySlug) {
          set({
            pharmacySlug,
            items: [{ ...line, qty }],
          });
          return;
        }
        const existing = cur.items.find((i) => i.medicineId === line.medicineId);
        if (existing) {
          set({
            pharmacySlug,
            items: cur.items.map((i) =>
              i.medicineId === line.medicineId ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({ pharmacySlug, items: [...cur.items, { ...line, qty }] });
        }
      },
      setQty: (medicineId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.medicineId !== medicineId) });
          return;
        }
        set({
          items: get().items.map((i) => (i.medicineId === medicineId ? { ...i, qty } : i)),
        });
      },
      clear: () => set({ items: [], pharmacySlug: null }),
    }),
    { name: "aether-cart" },
  ),
);
