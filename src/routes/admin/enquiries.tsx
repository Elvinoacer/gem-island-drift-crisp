import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listAdminEnquiries, updateEnquiryStatus } from "@/lib/server/admin";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/admin/enquiries")({
  component: EnquiriesAdmin,
});

function EnquiriesAdmin() {
  const q = useAuthedQuery(() => listAdminEnquiries());
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  return (
    <AdminShell profile={q.data.profile} membership={q.data.membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Enquiries</h1>
      <ul className="mt-6 space-y-3">
        {q.data.items.map((e) => (
          <li key={e.id} className="surface-card rounded-2xl p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-medium">{e.subject}</p>
                <p className="text-sm text-muted">
                  {e.name} · {e.phone} · {formatWhen(e.createdAt)}
                </p>
                <p className="mt-2 text-sm">{e.message}</p>
              </div>
              <StatusBadge status={e.status} />
            </div>
            <div className="mt-3 flex gap-2">
              {["open", "closed"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className="btn-ghost text-sm"
                  onClick={async () => {
                    await updateEnquiryStatus({ data: { id: e.id, status } });
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
