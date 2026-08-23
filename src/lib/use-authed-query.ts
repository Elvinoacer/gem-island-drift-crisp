import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function useAuthedQuery<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fn()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isPending, tick, ...deps]);

  return {
    user,
    sessionPending: isPending,
    data,
    error,
    loading: isPending || loading,
    reload: () => setTick((t) => t + 1),
  };
}
