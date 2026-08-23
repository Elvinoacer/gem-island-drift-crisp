import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PlatformShell } from "@/components/platform-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { StatusBadge } from "@/components/status-badge";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { getPlatformHome, impersonatePharmacy, reviewPharmacy } from "@/lib/server/platform";

export const Route = createFileRoute("/platform/")({
  component: PlatformHome,
});

function PlatformHome() {
  const q = useAuthedQuery(() => getPlatformHome());
  const navigate = useNavigate();
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) {
    return (
      <PlatformShell>
        <ErrorBanner message={q.error} />
      </PlatformShell>
    );
  }
  if (!q.data) return null;
  const { stats, pharmacies } = q.data;

  return (
    <PlatformShell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Network</p>
      <h1 className="mt-2 font-display text-4xl text-cream">Aether control</h1>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Pharmacies", stats.total],
          ["Live listings", stats.live],
          ["In review", stats.queue],
          ["Suspended", stats.suspended],
        ].map(([label, n]) => (
          <div key={label} className="rounded-2xl border border-cream/10 bg-forest p-4">
            <p className="text-xs uppercase tracking-wider text-cream/60">{label}</p>
            <p className="mt-1 font-display text-3xl tabular-nums text-cream">{n}</p>
          </div>
        ))}
      </div>
      <ul className="mt-8 space-y-3">
        {pharmacies.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream/10 bg-forest p-4"
          >
            <div>
              <p className="font-display text-xl text-cream">{p.name}</p>
              <p className="text-sm text-cream/65">
                {p.city} · {p.licenceNumber || "No licence"} · /p/{p.slug}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={p.status} />
              {p.listed ? <StatusBadge status="listed" /> : null}
              {p.featured ? <StatusBadge status="featured" /> : null}
              <button
                type="button"
                className="btn-ghost border-cream/20 bg-transparent text-cream text-sm"
                onClick={async () => {
                  await reviewPharmacy({
                    data: { id: p.id, action: p.listed ? "unlist" : "list" },
                  });
                  q.reload();
                }}
              >
                {p.listed ? "Unlist" : "List"}
              </button>
              <button
                type="button"
                className="btn-ghost border-cream/20 bg-transparent text-cream text-sm"
                onClick={async () => {
                  await reviewPharmacy({
                    data: { id: p.id, action: p.featured ? "unfeature" : "feature" },
                  });
                  q.reload();
                }}
              >
                {p.featured ? "Unfeature" : "Feature"}
              </button>
              <button
                type="button"
                className="btn-gold text-sm"
                onClick={async () => {
                  await impersonatePharmacy({ data: { pharmacyId: p.id } });
                  toast.success(`Opened ${p.name} console`);
                  void navigate({ to: "/admin" });
                }}
              >
                Open console
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PlatformShell>
  );
}
