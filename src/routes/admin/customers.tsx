import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminCustomers } from "@/lib/server/admin";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const q = useAuthedQuery(() => listAdminCustomers());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Patients of this shop</h1>
      <p className="mt-1 text-sm text-muted">Loyalty is per pharmacy — never shared across the network.</p>
      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper">
        {q.data.items.map((c) => (
          <li key={c.userId} className="flex flex-wrap justify-between gap-2 px-4 py-3">
            <div>
              <p className="font-medium">{c.displayName}</p>
              <p className="text-xs text-muted">{c.phone || "No phone"} · joined {formatWhen(c.joinedAt)}</p>
            </div>
            <p className="text-sm">
              {c.loyaltyTier} · <span className="tabular-nums">{c.loyaltyPoints}</span> pts
            </p>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
