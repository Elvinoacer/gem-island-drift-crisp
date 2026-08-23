import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandLockup } from "./brand";
import { AuthSlot } from "./auth-slot";

const LINKS: { to: "/platform" | "/platform/applications"; label: string; exact?: boolean }[] = [
  { to: "/platform", label: "Network", exact: true },
  { to: "/platform/applications", label: "Applications" },
];

export function PlatformShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-forest-deep text-cream">
      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <BrandLockup inverted subtitle="Platform" />
          <nav className="flex items-center gap-2">
            {LINKS.map((l) => {
              const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    "rounded-full px-3 py-2 text-sm font-medium " +
                    (active ? "bg-cream text-forest-deep" : "text-cream/80 hover:bg-cream/10")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
            <AuthSlot inverted />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
