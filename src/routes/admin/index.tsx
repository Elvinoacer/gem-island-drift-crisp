import { Link, createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { getAdminDashboard } from "@/lib/server/admin";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const q = useAuthedQuery(() => getAdminDashboard({ data: {} }));
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <ErrorBanner message={q.error} />
        <Link to="/onboard" className="btn-primary mt-6">
          List a pharmacy
        </Link>
      </div>
    );
  }
  if (!q.data) return null;
  const { profile, membership, pharmacy, stats, recentRefills, recentEnquiries } = q.data;

  return (
    <AdminShell profile={profile} membership={membership} onSwitch={q.reload}>
      <p className="eyebrow">Today</p>
      <h1 className="mt-1 font-display text-3xl">{pharmacy.name}</h1>
      <p className="text-sm text-muted">
        {pharmacy.city} · {pharmacy.licenceNumber}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Pending refills", stats.pendingRefills],
          ["Open enquiries", stats.openEnquiries],
          ["Orders", stats.orders],
          ["Low / out SKUs", stats.lowStock],
        ].map(([label, n]) => (
          <div key={label} className="surface-card rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-1 font-display text-3xl tabular-nums">{n}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="surface-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Refills</h2>
            <Link to="/admin/refills" className="text-sm font-semibold text-forest">
              All
            </Link>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {recentRefills.map((r) => (
              <li key={r.id} className="flex justify-between gap-2">
                <span>
                  {r.guestName} · {r.medication}
                </span>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </section>
        <section className="surface-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Enquiries</h2>
            <Link to="/admin/enquiries" className="text-sm font-semibold text-forest">
              All
            </Link>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {recentEnquiries.map((r) => (
              <li key={r.id}>
                <span className="font-medium">{r.subject}</span>
                <span className="text-muted"> · {formatWhen(r.createdAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
