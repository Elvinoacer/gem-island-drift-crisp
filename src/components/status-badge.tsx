import { cn } from "@/lib/cn";

const TONES: Record<string, string> = {
  active: "bg-forest/10 text-forest",
  listed: "bg-forest/10 text-forest",
  featured: "bg-gold/25 text-ink",
  submitted: "bg-gold/20 text-ink",
  needs_info: "bg-gold/20 text-ink",
  draft: "bg-ink/8 text-muted",
  suspended: "bg-ink/10 text-ink",
  rejected: "bg-ink/10 text-muted",
  pending: "bg-gold/20 text-ink",
  ready: "bg-forest/10 text-forest",
  open: "bg-gold/20 text-ink",
  closed: "bg-ink/8 text-muted",
  received: "bg-gold/20 text-ink",
  packing: "bg-gold/20 text-ink",
  dispensed: "bg-forest/10 text-forest",
  in_stock: "bg-forest/10 text-forest",
  low: "bg-gold/25 text-ink",
  out: "bg-ink/10 text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        TONES[status] ?? "bg-ink/8 text-muted",
      )}
    >
      {label}
    </span>
  );
}
