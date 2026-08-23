import { createFileRoute } from "@tanstack/react-router";

const BODY = `User-agent: *
Allow: /
Allow: /p/
Allow: /for-pharmacies
Disallow: /admin
Disallow: /platform
Disallow: /portal
Disallow: /onboard
Disallow: /login
Disallow: /api/
Sitemap: /sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(BODY, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
