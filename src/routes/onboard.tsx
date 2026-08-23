import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { MarketplaceShell } from "@/components/marketplace-shell";
import { Field, Input, Textarea } from "@/components/field";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { pageHead } from "@/lib/seo";
import { submitOnboard, listMyPharmacies, goLive } from "@/lib/server/onboard";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/onboard")({
  head: () =>
    pageHead(
      "List your pharmacy · Aether",
      "Apply to list a PPB-licensed Kenyan pharmacy on the Aether network.",
    ),
  component: Onboard,
});

function Onboard() {
  const { user, sessionPending, data, error, loading, reload } = useAuthedQuery(() =>
    listMyPharmacies(),
  );
  const [busy, setBusy] = useState(false);

  if (sessionPending) return <PageSkeleton label="Checking session" />;
  if (!user) return <RedirectToSignIn />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await submitOnboard({
        data: {
          name: String(fd.get("name") ?? ""),
          slug: String(fd.get("slug") ?? "") || undefined,
          tagline: String(fd.get("tagline") ?? ""),
          city: String(fd.get("city") ?? ""),
          county: String(fd.get("county") ?? ""),
          street: String(fd.get("street") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          licenceNumber: String(fd.get("licence") ?? ""),
          about: String(fd.get("about") ?? ""),
        },
      });
      toast.success("Application submitted for review");
      (e.target as HTMLFormElement).reset();
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit");
    } finally {
      setBusy(false);
    }
  }

  return (
    <MarketplaceShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="eyebrow">Onboarding</p>
        <h1 className="mt-2 font-display text-4xl">List your pharmacy</h1>
        <p className="mt-3 text-muted">
          We review licence details before a shop appears in the public directory. You can keep editing
          the storefront from the staff console while you wait.
        </p>

        {error ? <div className="mt-6"><ErrorBanner message={error} /></div> : null}

        {!loading && data && data.pharmacies.length > 0 ? (
          <div className="mt-8 space-y-3">
            {data.pharmacies.map((p) => (
              <div key={p.id} className="surface-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
                <div>
                  <p className="font-display text-xl">{p.name}</p>
                  <p className="text-sm text-muted">
                    {p.city} · {p.licenceNumber || "No licence on file"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={p.status} />
                  {p.listed ? <StatusBadge status="listed" /> : null}
                  {p.status === "active" && !p.listed ? (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={async () => {
                        await goLive({ data: { pharmacyId: p.id } });
                        toast.success("Listed in the directory");
                        reload();
                      }}
                    >
                      Go live
                    </button>
                  ) : null}
                  <Link to="/admin" className="btn-ghost">
                    Open console
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="surface-card mt-10 space-y-4 rounded-3xl p-6">
          <h2 className="font-display text-2xl">New application</h2>
          <Field label="Pharmacy name">
            <Input name="name" required minLength={3} placeholder="e.g. Riverside Chemist" />
          </Field>
          <Field label="Preferred URL slug" hint="Letters, numbers, hyphens. We uniquify if taken.">
            <Input name="slug" placeholder="riverside" />
          </Field>
          <Field label="Tagline">
            <Input name="tagline" required minLength={4} placeholder="Care on the river road" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Street">
              <Input name="street" required />
            </Field>
            <Field label="City">
              <Input name="city" required />
            </Field>
            <Field label="County">
              <Input name="county" required />
            </Field>
            <Field label="Phone">
              <Input name="phone" required minLength={7} />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" required />
            </Field>
            <Field label="PPB licence number">
              <Input name="licence" required minLength={4} placeholder="PPB-…" />
            </Field>
          </div>
          <Field label="About the shop">
            <Textarea name="about" required minLength={12} placeholder="Who you serve, what you are known for." />
          </Field>
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? "Submitting…" : "Submit for review"}
          </button>
        </form>
      </div>
    </MarketplaceShell>
  );
}
