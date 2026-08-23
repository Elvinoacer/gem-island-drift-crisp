import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin-shell";
import { ErrorBanner, PageSkeleton } from "@/components/page-state";
import { Field, Input, Textarea } from "@/components/field";
import { useAuthedQuery } from "@/lib/use-authed-query";
import { getAdminStorefront, saveStorefront } from "@/lib/server/admin";

export const Route = createFileRoute("/admin/storefront")({
  component: StorefrontEditor,
});

function StorefrontEditor() {
  const q = useAuthedQuery(() => getAdminStorefront());
  const [busy, setBusy] = useState(false);
  if (q.loading && !q.data) return <PageSkeleton />;
  if (q.error) return <div className="p-8"><ErrorBanner message={q.error} /></div>;
  if (!q.data) return null;
  const { profile, membership, pharmacy, hours } = q.data;
  const hoursText = hours.map((h) => `${h.day} | ${h.time}`).join("\n");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await saveStorefront({
        data: {
          name: String(fd.get("name") ?? ""),
          tagline: String(fd.get("tagline") ?? ""),
          description: String(fd.get("description") ?? ""),
          about: String(fd.get("about") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          whatsapp: String(fd.get("whatsapp") ?? ""),
          street: String(fd.get("street") ?? ""),
          city: String(fd.get("city") ?? ""),
          county: String(fd.get("county") ?? ""),
          zip: String(fd.get("zip") ?? ""),
          latitude: String(fd.get("latitude") ?? ""),
          longitude: String(fd.get("longitude") ?? ""),
          deliveryNotes: String(fd.get("deliveryNotes") ?? ""),
          deliveryFeeKes: Number(fd.get("deliveryFeeKes") ?? 0),
          hoursText: String(fd.get("hoursText") ?? ""),
        },
      });
      toast.success("Storefront saved — public pages and map update immediately");
      q.reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell profile={profile} membership={membership} onSwitch={q.reload}>
      <h1 className="font-display text-3xl">Storefront & SEO</h1>
      <p className="mt-1 text-sm text-muted">
        Name, city, pin, and hours feed the public page, JSON-LD Pharmacy markup, and the directory card.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <Field label="Pharmacy name">
          <Input name="name" defaultValue={pharmacy.name} required />
        </Field>
        <Field label="Tagline">
          <Input name="tagline" defaultValue={pharmacy.tagline} />
        </Field>
        <Field label="Short description (search + meta)">
          <Textarea name="description" defaultValue={pharmacy.description} />
        </Field>
        <Field label="About">
          <Textarea name="about" defaultValue={pharmacy.about} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <Input name="phone" defaultValue={pharmacy.phone} />
          </Field>
          <Field label="WhatsApp">
            <Input name="whatsapp" defaultValue={pharmacy.whatsapp} />
          </Field>
          <Field label="Email">
            <Input name="email" defaultValue={pharmacy.email} />
          </Field>
          <Field label="Street">
            <Input name="street" defaultValue={pharmacy.street} />
          </Field>
          <Field label="City">
            <Input name="city" defaultValue={pharmacy.city} />
          </Field>
          <Field label="County">
            <Input name="county" defaultValue={pharmacy.county} />
          </Field>
          <Field label="Postal code">
            <Input name="zip" defaultValue={pharmacy.zip} />
          </Field>
          <Field label="Delivery fee (KES)">
            <Input name="deliveryFeeKes" type="number" defaultValue={pharmacy.deliveryFeeKes} />
          </Field>
          <Field label="Latitude">
            <Input name="latitude" defaultValue={pharmacy.latitude ?? ""} />
          </Field>
          <Field label="Longitude">
            <Input name="longitude" defaultValue={pharmacy.longitude ?? ""} />
          </Field>
        </div>
        <Field label="Delivery notes">
          <Textarea name="deliveryNotes" defaultValue={pharmacy.deliveryNotes} />
        </Field>
        <Field label="Hours" hint="One per line: Day | Time">
          <Textarea name="hoursText" defaultValue={hoursText} />
        </Field>
        <button className="btn-primary w-fit" disabled={busy}>
          {busy ? "Saving…" : "Save storefront"}
        </button>
      </form>
    </AdminShell>
  );
}
