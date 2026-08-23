import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/server/seed";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        await ensureSeed();
        const origin = new URL(request.url).origin;
        const sql = await getSql();
        const pharmacies = await sql<{ slug: string }>`
          select slug from pharmacies where status = 'active' and listed = true
        `;
        const services = await sql<{ slug: string; service: string }>`
          select p.slug, s.slug as service
          from services s
          join pharmacies p on p.id = s.pharmacy_id
          where p.status = 'active' and p.listed = true and s.published = true
        `;
        const meds = await sql<{ slug: string; med: string }>`
          select p.slug, m.slug as med
          from pharmacy_inventory i
          join pharmacies p on p.id = i.pharmacy_id
          join medicines m on m.id = i.medicine_id
          where p.status = 'active' and p.listed = true and i.listed = true
        `;
        const articles = await sql<{ slug: string }>`
          select slug from health_articles where published = true
        `;
        const urls: string[] = ["/", "/for-pharmacies"];
        const pages = ["", "/about", "/services", "/medicines", "/health", "/location", "/contact", "/refill"];
        for (const p of pharmacies) {
          for (const page of pages) urls.push(`/p/${p.slug}${page}`);
        }
        for (const s of services) urls.push(`/p/${s.slug}/services/${s.service}`);
        for (const m of meds) urls.push(`/p/${m.slug}/medicines/${m.med}`);
        for (const p of pharmacies) {
          for (const a of articles) urls.push(`/p/${p.slug}/health/${a.slug}`);
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${origin}${u}</loc><changefreq>weekly</changefreq></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
