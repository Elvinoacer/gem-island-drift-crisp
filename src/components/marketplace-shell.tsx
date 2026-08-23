import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandLockup } from "./brand";
import { AuthSlot } from "./auth-slot";
import { platform } from "@/lib/platform";

export function MarketplaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <BrandLockup subtitle="Pharmacy Network" />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/" className="text-ink/80 hover:text-forest">
              Find a pharmacy
            </Link>
            <Link to="/for-pharmacies" className="text-ink/80 hover:text-forest">
              For pharmacies
            </Link>
            <Link to="/portal" className="text-ink/80 hover:text-forest">
              Patient portal
            </Link>
          </nav>
          <AuthSlot />
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-line bg-forest-deep text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLockup inverted subtitle="Kenya" />
            <p className="mt-4 max-w-md text-sm text-cream/75">{platform.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Patients</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>
                <Link to="/">Find a pharmacy</Link>
              </li>
              <li>
                <Link to="/portal">Your portal</Link>
              </li>
              <li>
                <Link to="/login">Sign in</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Pharmacies</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>
                <Link to="/for-pharmacies">Join the network</Link>
              </li>
              <li>
                <Link to="/onboard">List your shop</Link>
              </li>
              <li>
                <Link to="/admin">Staff console</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/55">
          Licensed community pharmacies · {platform.regulator} · Emergency {platform.emergency} /{" "}
          {platform.emergencyAlt}
        </div>
      </footer>
    </div>
  );
}
