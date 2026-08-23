import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { pageHead } from "@/lib/seo";
import { usePharmacy } from "@/lib/storefront-context";
import { submitEnquiry } from "@/lib/server/public";
import { Field, Input, Textarea } from "@/components/field";
import { waLink } from "@/lib/platform";

export const Route = createFileRoute("/p/$slug/contact")({
  head: ({ params }) => pageHead(`Contact · ${params.slug}`, "Message this pharmacy."),
  component: Contact,
});

function Contact() {
  const pharmacy = usePharmacy();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await submitEnquiry({
        data: {
          slug: pharmacy.slug,
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      toast.success("Message sent to the pharmacy");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-display text-4xl">Talk to {pharmacy.name}</h1>
        <p className="mt-3 text-muted">
          {pharmacy.street}, {pharmacy.city}
          <br />
          {pharmacy.phone}
          <br />
          {pharmacy.email}
        </p>
        <a
          href={waLink(pharmacy.whatsapp, `Hello ${pharmacy.name}`)}
          className="btn-primary mt-6"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
      <form onSubmit={onSubmit} className="surface-card space-y-3 rounded-3xl p-6">
        <Field label="Name">
          <Input name="name" required minLength={2} />
        </Field>
        <Field label="Phone">
          <Input name="phone" required minLength={7} />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" />
        </Field>
        <Field label="Subject">
          <Input name="subject" required minLength={2} />
        </Field>
        <Field label="Message">
          <Textarea name="message" required minLength={8} />
        </Field>
        <button className="btn-primary" disabled={busy}>
          {busy ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
