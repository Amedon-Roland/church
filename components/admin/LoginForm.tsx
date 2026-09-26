"use client";

import { login } from "@/app/admin/actions";
import { Loader2, LogIn } from "lucide-react";
import { useActionState } from "react";

export function LoginForm({ next }: { next?: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action}>
      <input type="hidden" name="suite" value={next ?? ""} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Mot de passe</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 focus:border-royal focus:outline-none"
        />
      </label>
      {error && <p className="mt-3 text-sm font-medium text-live">{error}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary mt-5 w-full">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} Se connecter
      </button>
    </form>
  );
}
