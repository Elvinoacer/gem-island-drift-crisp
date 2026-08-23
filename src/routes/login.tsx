import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { BrandLockup } from "@/components/brand";
import { Field, Input } from "@/components/field";
import { pageHead } from "@/lib/seo";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type LoginSearch = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): LoginSearch =>
    typeof s.next === "string" ? { next: s.next } : {},
  head: () => pageHead("Sign in · Aether", "Sign in to the Aether pharmacy network."),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const dest = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !user) return;
    window.location.href = dest;
  }, [isPending, user, dest]);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          name: name || email.split("@")[0],
          email,
          password,
        });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message);
      }
      await authClient.getSession();
      window.location.href = dest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4 py-12 text-ink">
      <div className="w-full max-w-md">
        <BrandLockup subtitle="Pharmacy Network" />
        <div className="surface-card mt-8 rounded-3xl p-6 sm:p-8">
          <p className="eyebrow">Account</p>
          <h1 className="mt-2 font-display text-3xl">
            {mode === "in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            One login for patients, pharmacy staff, and the network desk.
          </p>

          {authEnabled ? (
            <div className="mt-6 grid gap-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  className="btn-ghost w-full"
                  onClick={() => signIn(p.providerId, { callbackURL: dest })}
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          )}

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" />
            or email
            <span className="h-px flex-1 bg-line" />
          </div>

          <form className="space-y-3" onSubmit={onEmail}>
            {mode === "up" ? (
              <Field label="Your name">
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </Field>
            ) : null}
            <Field label="Email">
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                autoComplete={mode === "up" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </Field>
            {error ? <p className="text-sm text-forest">{error}</p> : null}
            <button type="submit" className="btn-primary w-full" disabled={busy || !authEnabled}>
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 w-full text-sm text-muted"
            onClick={() => setMode(mode === "in" ? "up" : "in")}
          >
            {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="font-semibold text-forest">
            Back to the network
          </Link>
        </p>
      </div>
    </main>
  );
}
