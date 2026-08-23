import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminServices, toggleService } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/services")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  const q = useAuthedQuery(() => listAdminServices());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Services</h1>
      <ul className="mt-6 space-y-3">
        {q.data.items.map((s) => (
          <li key={s.id} className="surface-card flex items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-display text-xl">{s.title}</p>
              <p className="text-sm text-muted">{s.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={s.published ? "listed" : "draft"} />
              <button
                type="button"
                className="btn-ghost"
                onClick={async () => {
                  await toggleService({ data: { id: s.id, published: !s.published } });
                  q.reload();
                }}
              >
                {s.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
