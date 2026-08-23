import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <rect x="13" y="6" width="6" height="20" rx="1.2" fill="#f3efe4" />
      <rect x="6" y="13" width="20" height="6" rx="1.2" fill="#f3efe4" />
      <circle cx="16" cy="16" r="2.1" fill="#c4a35a" />
    </svg>
  );
}

export function BrandLockup({
  subtitle,
  inverted,
}: {
  subtitle?: string;
  inverted?: boolean;
}) {
  return (
    <Link to="/" className="flex items-center gap-2.5 min-h-11">
      <Mark className={inverted ? "text-cream" : "text-forest"} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-semibold tracking-tight",
            inverted ? "text-cream" : "text-ink",
          )}
        >
          Aether
        </span>
        {subtitle ? (
          <span className={cn("block text-xs", inverted ? "text-cream/70" : "text-muted")}>
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
