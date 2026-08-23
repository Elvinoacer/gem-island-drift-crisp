import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";
import { submitRefill } from "@/lib/server/public";
import { Field, Input, Textarea } from "@/components/field";

export const Route = createFileRoute("/p/$slug/refill")({
  head: ({ params }) =>
    pageHead(`Prescription refill · ${params.slug}`, "Request a refill from this neighbourhood pharmacy."),
  component: Refill,
});

function Refill() {
  const pharmacy = usePharmacy();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await submitRefill({
        data: {
          slug: pharmacy.slug,
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          medication: String(fd.get("medication") ?? ""),
          notes: String(fd.get("notes") ?? ""),
        },
      });
      toast.success("Refill request received — we will call to confirm");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="eyebrow">Refills</p>
      <h1 className="mt-2 font-display text-4xl">Request a refill at {pharmacy.name}</h1>
      <p className="mt-3 text-muted">
        We confirm the prescription, stock, and SHA or insurance details before packing. This is not an
        emergency service.
      </p>
      <form onSubmit={onSubmit} className="surface-card mt-8 space-y-3 rounded-3xl p-6">
        <Field label="Your name">
          <Input name="name" required minLength={2} />
        </Field>
        <Field label="Phone">
          <Input name="phone" required minLength={7} />
        </Field>
        <Field label="Medication">
          <Input name="medication" required minLength={2} placeholder="Name, strength, quantity" />
        </Field>
        <Field label="Notes">
          <Textarea name="notes" placeholder="Delivery, SHA number, usual doctor…" />
        </Field>
        <button className="btn-primary w-full" disabled={busy}>
          {busy ? "Sending…" : "Submit refill request"}
        </button>
      </form>
    </div>
  );
}
