import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { formatKes } from "@/lib/platform";
import { stockLabel } from "@/lib/format";
import { listMedicines, submitOrder } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";
import { useCart } from "@/lib/cart";
import { Field, Input, Select } from "@/components/field";
import { StatusBadge } from "@/components/status-badge";

type MedSearch = { q?: string; category?: string };

export const Route = createFileRoute("/p/$slug/medicines/")({
  validateSearch: (s: Record<string, unknown>): MedSearch => ({
    ...(typeof s.q === "string" && s.q ? { q: s.q } : {}),
    ...(typeof s.category === "string" && s.category ? { category: s.category } : {}),
  }),
  loaderDeps: ({ search }) => ({ q: search.q, category: search.category }),
  loader: async ({ params, deps }) => {
    const data = await listMedicines({
      data: { slug: params.slug, q: deps.q, category: deps.category },
    });
    if (!data) throw new Error("Pharmacy not found");
    return data;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? `Medicines at ${loaderData.pharmacy.name} · ${loaderData.pharmacy.city}` : "Medicines",
      "OTC and wellness products in stock at this Aether pharmacy.",
    ),
  component: Medicines,
});

function Medicines() {
  const { pharmacy, items, categories } = Route.useLoaderData();
  const search = Route.useSearch();
  const add = useCart((s) => s.add);
  const cart = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const mine = cart.pharmacySlug === pharmacy.slug ? cart.items : [];
  const total = useMemo(() => mine.reduce((s, i) => s + i.priceKes * i.qty, 0), [mine]);

  async function checkout(e: FormEvent) {
    e.preventDefault();
    if (!mine.length) return;
    setBusy(true);
    try {
      const res = await submitOrder({
        data: {
          slug: pharmacy.slug,
          name,
          phone,
          items: mine.map((i) => ({ name: i.name, qty: i.qty, priceKes: i.priceKes })),
        },
      });
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-2 font-display text-4xl">Medicines at {pharmacy.name}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Prices and stock are this shop’s own. Prescription-only items are not sold from this list — bring a
        valid script to the counter.
      </p>
      <form className="mt-6 flex flex-wrap gap-3">
        <Input name="q" defaultValue={search.q} placeholder="Search the shelf" className="max-w-xs" />
        <Select name="category" defaultValue={search.category ?? ""} className="max-w-xs">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </Select>
        <button className="btn-primary" type="submit">
          Filter
        </button>
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="surface-card overflow-hidden rounded-2xl">
              <img src={item.imageUrl} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <StatusBadge status={item.stockStatus} />
                <h2 className="mt-2 font-display text-xl leading-tight">
                  <Link
                    to="/p/$slug/medicines/$medSlug"
                    params={{ slug: pharmacy.slug, medSlug: item.slug }}
                  >
                    {item.name}
                  </Link>
                </h2>
                <p className="text-sm text-muted">
                  {item.genericName} · {item.form} {item.strength}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-semibold tabular-nums">{formatKes(item.priceKes)}</p>
                  <button
                    type="button"
                    className="btn-ghost text-sm"
                    disabled={item.stockStatus === "out"}
                    onClick={() => {
                      add(pharmacy.slug, {
                        medicineId: item.id,
                        slug: item.slug,
                        name: item.name,
                        priceKes: item.priceKes,
                      });
                      toast.success(`Added ${item.name}`);
                    }}
                  >
                    {item.stockStatus === "out" ? stockLabel("out") : "Add"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="surface-card h-fit rounded-2xl p-5">
          <h2 className="font-display text-2xl">Basket</h2>
          {mine.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Add OTC items from this shop.</p>
          ) : (
            <>
              <ul className="mt-3 space-y-2 text-sm">
                {mine.map((i) => (
                  <li key={i.medicineId} className="flex justify-between gap-2">
                    <span>
                      {i.name} × {i.qty}
                    </span>
                    <span className="tabular-nums">{formatKes(i.priceKes * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-semibold tabular-nums">Total {formatKes(total)}</p>
              <form className="mt-4 space-y-3" onSubmit={checkout}>
                <Field label="Your name">
                  <Input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
                </Field>
                <Field label="Phone">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={7} />
                </Field>
                <button className="btn-primary w-full" disabled={busy}>
                  {busy ? "Sending…" : "Place pickup order"}
                </button>
              </form>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
