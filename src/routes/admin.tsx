import { Outlet, createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { PageSkeleton } from "@/components/page-state";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => pageHead("Staff console · Aether", "Run your pharmacy: storefront, inventory, refills, and patients."),
  component: AdminGate,
});

function AdminGate() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <PageSkeleton label="Opening staff console" />;
  if (!user) return <RedirectToSignIn />;
  return <Outlet />;
}
