import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminOrders, updateOrderStatus } from "@/lib/server/admin";
import { formatKes } from "@/lib/platform";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersAdmin,
});

const NEXT = ["received", "packing", "dispensed", "cancelled"] as const;

function OrdersAdmin() {
  const q = useAuthedQuery(() => listAdminOrders());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Orders</h1>
      <ul className="mt-6 space-y-3">
        {q.data.items.map((o) => (
          <li key={o.id} className="surface-card rounded-2xl p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-medium">{o.guestName}</p>
                <p className="text-sm text-muted">
                  {formatKes(o.totalKes)} · {formatWhen(o.createdAt)}
                </p>
                <ul className="mt-2 text-sm text-muted">
                  {o.items.map((i) => (
                    <li key={i.name}>
                      {i.name} × {i.qty}
                    </li>
                  ))}
                </ul>
              </div>
              <StatusBadge status={o.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEXT.map((status) => (
                <button
                  key={status}
                  type="button"
                  className="btn-ghost text-sm"
                  onClick={async () => {
                    await updateOrderStatus({ data: { id: o.id, status } });
                    q.reload();
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
