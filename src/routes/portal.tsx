import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { MarketplaceShell } from "@/components/marketplace-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { Field, Input, Select, Textarea } from "@/components/field";
import { StatusBadge } from "@/components/status-badge";
import { pageHead } from "@/lib/seo";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { getPortalHome, joinPharmacy, portalRefill } from "@/lib/server/portal";
import { updateMyProfile } from "@/lib/server/session";
import { formatWhen } from "@/lib/format";

export const Route = createFileRoute("/portal")({
  head: () => pageHead("Patient portal · Aether", "Your pharmacies, loyalty, and refill requests."),
  component: Portal,
});

function Portal() {
  const { user, sessionPending, data, error, loading, reload } = useAuthedQuery(() => getPortalHome());
  const [busy, setBusy] = useState(false);

  if (sessionPending || (user && loading && !data)) return <PageSkeleton label="Opening portal" />;
  if (!user) return <RedirectToSignIn />;

  async function onRefill(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await portalRefill({
        data: {
          pharmacyId: String(fd.get("pharmacyId") ?? ""),
          medication: String(fd.get("medication") ?? ""),
          notes: String(fd.get("notes") ?? ""),
        },
      });
      toast.success("Refill sent to the pharmacy");
      e.currentTarget.reset();
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  async function onProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await updateMyProfile({
        data: {
          displayName: String(fd.get("displayName") ?? ""),
          phone: String(fd.get("phone") ?? ""),
        },
      });
      toast.success("Profile saved");
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <MarketplaceShell>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="eyebrow">Patient portal</p>
        <h1 className="mt-2 font-display text-4xl">
          Hello{data?.profile.displayName ? `, ${data.profile.displayName}` : ""}
        </h1>
        <p className="mt-2 text-muted">Your shops, points, and refill history — never mixed across pharmacies.</p>
        {error ? <div className="mt-6"><ErrorBanner message={error} /></div> : null}

        {data ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <section className="surface-card rounded-3xl p-6">
              <h2 className="font-display text-2xl">Your pharmacies</h2>
              <ul className="mt-4 space-y-3">
                {data.mine.map((p) => {
                  const loy = data.loyalty.find((l) => l.pharmacy_id === p.id);
                  return (
                    <li key={p.id} className="flex items-center justify-between gap-3 border-b border-line pb-3">
                      <div>
                        <Link to="/p/$slug" params={{ slug: p.slug }} className="font-semibold">
                          {p.name}
                        </Link>
                        <p className="text-xs text-muted">
                          {p.city}
                          {loy ? ` · ${loy.loyalty_tier} · ${loy.loyalty_points} pts` : ""}
                        </p>
                      </div>
                      <Link to="/p/$slug/refill" params={{ slug: p.slug }} className="text-sm font-semibold text-forest">
                        Refill
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-sm font-medium">Join another listed shop</p>
              <div className="mt-2 flex flex-col gap-2">
                {data.directory
                  .filter((p) => !data.profile.customerPharmacyIds.includes(p.id))
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="btn-ghost justify-between"
                      onClick={async () => {
                        await joinPharmacy({ data: { pharmacyId: p.id } });
                        toast.success(`Joined ${p.name}`);
                        reload();
                      }}
                    >
                      <span>{p.name}</span>
                      <span className="text-xs text-muted">{p.city}</span>
                    </button>
                  ))}
              </div>
            </section>

            <section className="space-y-6">
              <form onSubmit={onRefill} className="surface-card space-y-3 rounded-3xl p-6">
                <h2 className="font-display text-2xl">Request a refill</h2>
                <Field label="Pharmacy">
                  <Select name="pharmacyId" required>
                    {data.mine.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Medication">
                  <Input name="medication" required minLength={2} />
                </Field>
                <Field label="Notes">
                  <Textarea name="notes" />
                </Field>
                <button className="btn-primary" disabled={busy || data.mine.length === 0}>
                  {busy ? "Sending…" : "Send to pharmacy"}
                </button>
              </form>

              <form onSubmit={onProfile} className="surface-card space-y-3 rounded-3xl p-6">
                <h2 className="font-display text-2xl">Your details</h2>
                <Field label="Name">
                  <Input name="displayName" defaultValue={data.profile.displayName} required minLength={2} />
                </Field>
                <Field label="Phone">
                  <Input name="phone" defaultValue={data.profile.phone} />
                </Field>
                <button className="btn-ghost">Save</button>
              </form>
            </section>
          </div>
        ) : null}

        {data && data.refills.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl">Recent refills</h2>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
              {data.refills.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <div>
                    <p className="font-medium">{r.medication}</p>
                    <p className="text-xs text-muted">{formatWhen(r.createdAt)}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </MarketplaceShell>
  );
}
