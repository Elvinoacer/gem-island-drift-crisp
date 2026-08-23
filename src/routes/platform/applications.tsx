import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PlatformShell } from "@/components/platform-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { Field, Input } from "@/components/field";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { listApplications, reviewPharmacy } from "@/lib/server/platform";

export const Route = createFileRoute("/platform/applications")({
  component: Applications,
});

function Applications() {
  const q = useAuthedQuery(() => listApplications());
  const [reason, setReason] = useState("");
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) {
    return (
      <PlatformShell>
        <ErrorBanner message={q.error} />
      </PlatformShell>
    );
  }
  if (!q.data) return null;

  return (
    <PlatformShell>
      <h1 className="font-display text-4xl text-cream">Applications</h1>
      <p className="mt-2 max-w-xl text-cream/70">
        Approve a PPB-licensed shop before it can list. Listing is a second step the owner (or you) takes.
      </p>
      <div className="mt-6 max-w-md">
        <Field label="Note for reject / needs info">
          <Input value={reason} onChange={(e) => setReason(e.target.value)} className="bg-cream text-ink" />
        </Field>
      </div>
      {q.data.queue.length === 0 ? (
        <p className="mt-8 text-cream/70">No applications in the queue.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {q.data.queue.map((p) => (
            <li key={p.id} className="rounded-2xl border border-cream/10 bg-forest p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl text-cream">{p.name}</p>
                  <p className="text-sm text-cream/65">
                    {p.street}, {p.city} · {p.licenceNumber} · {p.email}
                  </p>
                  <p className="mt-2 text-sm text-cream/80">{p.about}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={async () => {
                    await reviewPharmacy({ data: { id: p.id, action: "approve" } });
                    toast.success("Approved — owner can now list");
                    q.reload();
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn-ghost border-cream/20 bg-transparent text-cream"
                  onClick={async () => {
                    await reviewPharmacy({ data: { id: p.id, action: "needs_info", reason } });
                    q.reload();
                  }}
                >
                  Needs info
                </button>
                <button
                  type="button"
                  className="btn-ghost border-cream/20 bg-transparent text-cream"
                  onClick={async () => {
                    await reviewPharmacy({ data: { id: p.id, action: "reject", reason } });
                    q.reload();
                  }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PlatformShell>
  );
}
