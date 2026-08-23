import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandLockup } from "./brand";
import { AuthSlot } from "./auth-slot";
import type { Membership, SessionProfile } from "@/lib/types";
import { setActivePharmacy } from "@/lib/server/admin";
import { StatusBadge } from "./status-badge";

const LINKS: { to: "/admin" | "/admin/storefront" | "/admin/medicines" | "/admin/services" | "/admin/refills" | "/admin/orders" | "/admin/enquiries" | "/admin/customers"; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/storefront", label: "Storefront" },
  { to: "/admin/medicines", label: "Inventory" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/refills", label: "Refills" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/customers", label: "Patients" },
];

export function AdminShell({
  profile,
  membership,
  children,
  onSwitch,
}: {
  profile: SessionProfile;
  membership: Membership;
  children: ReactNode;
  onSwitch?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <BrandLockup subtitle="Staff console" />
          <AuthSlot />
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="surface-card rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Pharmacy</p>
            <p className="mt-1 font-display text-xl leading-tight">{membership.name}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <StatusBadge status={membership.role} />
              <StatusBadge status={membership.status} />
              {membership.listed ? <StatusBadge status="listed" /> : null}
            </div>
            {profile.memberships.length > 1 ? (
              <select
                className="field-input mt-3"
                value={membership.pharmacyId}
                onChange={async (e) => {
                  await setActivePharmacy({ data: { pharmacyId: e.target.value } });
                  onSwitch?.();
                }}
              >
                {profile.memberships.map((m) => (
                  <option key={m.pharmacyId} value={m.pharmacyId}>
                    {m.name}
                  </option>
                ))}
              </select>
            ) : null}
            <Link
              to="/p/$slug"
              params={{ slug: membership.slug }}
              className="mt-3 inline-block text-sm font-semibold text-forest"
            >
              View storefront
            </Link>
          </div>
          <nav className="mt-4 flex gap-1 overflow-x-auto lg:flex-col">
            {LINKS.map((l) => {
              const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    "whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium " +
                    (active ? "bg-forest text-cream" : "text-ink/80 hover:bg-cream")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
