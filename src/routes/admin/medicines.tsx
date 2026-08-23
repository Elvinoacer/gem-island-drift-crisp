import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminMedicines, updateInventory } from "@/lib/server/admin";
import { formatKes } from "@/lib/platform";
import type { StockStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/medicines")({
  component: Inventory,
});

function Inventory() {
  const q = useAuthedQuery(() => listAdminMedicines());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;

  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Inventory</h1>
      <p className="mt-1 text-sm text-muted">Prices and stock are this pharmacy only.</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-cream text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Listed</th>
            </tr>
          </thead>
          <tbody>
            {q.data.items.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-3 py-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted">{item.sku}</p>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    className="field-input max-w-28"
                    defaultValue={item.priceKes}
                    onBlur={async (e) => {
                      await updateInventory({
                        data: {
                          medicineId: item.id,
                          priceKes: Number(e.target.value),
                          stockStatus: item.stockStatus,
                          listed: item.listed,
                        },
                      });
                      toast.success("Price updated");
                    }}
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    className="field-input"
                    defaultValue={item.stockStatus}
                    onChange={async (e) => {
                      await updateInventory({
                        data: {
                          medicineId: item.id,
                          priceKes: item.priceKes,
                          stockStatus: e.target.value as StockStatus,
                          listed: item.listed,
                        },
                      });
                      q.reload();
                    }}
                  >
                    <option value="in_stock">In stock</option>
                    <option value="low">Low</option>
                    <option value="out">Out</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="text-sm font-semibold text-forest"
                    onClick={async () => {
                      await updateInventory({
                        data: {
                          medicineId: item.id,
                          priceKes: item.priceKes,
                          stockStatus: item.stockStatus,
                          listed: !item.listed,
                        },
                      });
                      q.reload();
                    }}
                  >
                    {item.listed ? "Listed" : "Hidden"}
                  </button>
                  <StatusBadge status={item.stockStatus} />
                  <span className="ml-2 text-xs text-muted">{formatKes(item.priceKes)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
