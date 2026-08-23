import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminRefills, updateRefillStatus } from "@/lib/server/admin";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/admin/refills")({
  component: RefillsAdmin,
});

const NEXT = ["pending", "ready", "dispensed", "cancelled"] as const;

function RefillsAdmin() {
  const q = useAuthedQuery(() => listAdminRefills());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Refill requests</h1>
      <ul className="mt-6 space-y-3">
        {q.data.items.map((r) => (
          <li key={r.id} className="surface-card rounded-2xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">{r.medication}</p>
                <p className="text-sm text-muted">
                  {r.guestName} · {r.guestPhone} · {formatWhen(r.createdAt)}
                </p>
                {r.notes ? <p className="mt-1 text-sm">{r.notes}</p> : null}
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEXT.map((status) => (
                <button
                  key={status}
                  type="button"
                  className="btn-ghost text-sm"
                  onClick={async () => {
                    await updateRefillStatus({ data: { id: r.id, status } });
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
