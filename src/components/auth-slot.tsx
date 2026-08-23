import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getSessionProfile } from "@/lib/server/session";
import { useEffect, useState } from "react";
import type { SessionProfile } from "@/lib/types";
import { cn } from "@/lib/cn";

export function useSessionProfile() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getSessionProfile()
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  return { user, isPending: isPending || (Boolean(user) && loading && !profile), profile };
}

export function AuthSlot({ inverted }: { inverted?: boolean }) {
  const { user, isPending, profile } = useSessionProfile();

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-full bg-ink/10" />;
  }

  if (!user) {
    return (
      <Link
        to="/login"
        className={cn(
          "btn-ghost text-sm",
          inverted && "border-cream/20 bg-transparent text-cream hover:bg-cream/10",
        )}
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {profile?.platformAdmin ? (
        <Link
          to="/platform"
          className={cn(
            "hidden sm:inline text-xs font-semibold",
            inverted ? "text-gold" : "text-forest",
          )}
        >
          Network
        </Link>
      ) : null}
      {profile && profile.memberships.length > 0 ? (
        <Link
          to="/admin"
          className={cn(
            "hidden sm:inline text-xs font-semibold",
            inverted ? "text-cream/80" : "text-muted",
          )}
        >
          Staff
        </Link>
      ) : null}
      <Link
        to="/portal"
        className={cn(
          "hidden sm:inline text-xs font-semibold",
          inverted ? "text-cream/80" : "text-muted",
        )}
      >
        Portal
      </Link>
      <div className={cn(inverted && "text-cream")}>
        <UserButton />
      </div>
    </div>
  );
}
