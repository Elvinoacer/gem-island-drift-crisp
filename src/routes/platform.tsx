import { Outlet, createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { PageSkeleton } from "@/components/page-state";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/platform")({
  head: () => pageHead("Aether platform", "Review pharmacies, listing, and network health."),
  component: Gate,
});

function Gate() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <PageSkeleton label="Opening platform" />;
  if (!user) return <RedirectToSignIn />;
  return <Outlet />;
}
