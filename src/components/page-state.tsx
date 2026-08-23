import type { ReactNode } from "react";

export function PageSkeleton({ label = "Loading" }: { label?: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-ink/10" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="h-40 animate-pulse rounded-2xl bg-ink/8" />
        <div className="h-40 animate-pulse rounded-2xl bg-ink/8" />
      </div>
      <p className="sr-only">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card rounded-2xl px-6 py-12 text-center">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-line bg-ink/5 px-4 py-3 text-sm text-ink">
      {message}
    </div>
  );
}
