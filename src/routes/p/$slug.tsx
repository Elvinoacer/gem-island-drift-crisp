import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { StorefrontShell } from "@/components/storefront-shell";
import { getStorefront } from "@/lib/server/public";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/p/$slug")({
  loader: async ({ params }) => {
    const pharmacy = await getStorefront({ data: { slug: params.slug } });
    if (!pharmacy) throw notFound();
    return pharmacy;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData
        ? `${loaderData.name} · ${loaderData.city} pharmacy · Aether`
        : "Pharmacy · Aether",
      loaderData?.description || loaderData?.tagline || "A listed Aether pharmacy.",
    ),
  component: Layout,
});

function Layout() {
  const pharmacy = Route.useLoaderData();
  return (
    <StorefrontShell pharmacy={pharmacy}>
      <Outlet />
    </StorefrontShell>
  );
}
