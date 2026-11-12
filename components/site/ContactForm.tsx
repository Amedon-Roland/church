"use client";

import { sendMessage, type FormState } from "@/app/(site)/nous-trouver/actions";
import { HeartHandshake, Loader2, Send } from "lucide-react";
import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

type Kind = "contact" | "priere";

export function ContactForm() {
  // Un lien « Confier une prière » (?sujet=priere) ouvre directement le bon onglet.
  const fromUrl = useSyncExternalStore<Kind>(
    () => () => {},
    () => (new URLSearchParams(window.location.search).get("sujet") === "priere" ? "priere" : "contact"),
    () => "contact",
  );
  const [picked, setKind] = useState<Kind | null>(null);
  const kind = picked ?? fromUrl;
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, null);
  const [startedAt] = useState(() => Date.now());
  const id = useId();
  const done = useRef<HTMLDivElement>(null);

  // Après l'envoi, le message de confirmation reçoit le focus (lecteurs d'écran).
  useEffect(() => {
    if (state?.ok) done.current?.focus();
  }, [state]);

  if (state?.ok) {
    return (
      <div ref={done} tabIndex={-1} role="status" className="card grid place-items-center p-10 text-center outline-none sm:p-14">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-night">
          <HeartHandshake aria-hidden className="h-8 w-8" />
        </span>
        <p className="t-3 mt-6 font-display font-semibold text-ink">{kind === "priere" ? "Nous prions pour vous." : "Bien reçu, merci !"}</p>
        <p className="mt-3 max-w-sm text-ink-soft">
          {kind === "priere"
            ? "Votre demande a été confiée à l'équipe de prière, dans la discrétion. Vous n'êtes pas seul."
            : "Quelqu'un de l'équipe vous répond très vite. Merci d'avoir pris le temps de nous écrire."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card p-5 sm:p-9" aria-describedby={state?.error ? `${id}-err` : undefined}>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-soft">Vous nous écrivez pour…</legend>
        <div className="grid grid-cols-2 gap-1 rounded-full bg-linen p-1">
          {(
            [
              ["contact", "Une question"],
              ["priere", "Une prière"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)] ${
                kind === value ? "bg-card text-ink shadow-sm" : "text-ink-mute hover:text-ink"
              }`}
            >
              <input type="radio" name="kind" value={value} checked={kind === value} onChange={() => setKind(value)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <input type="hidden" name="t" value={startedAt} />
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Ne pas remplir <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-soft">
            Votre prénom {kind === "priere" && <span className="font-normal text-ink-mute">(si vous voulez)</span>}
          </span>
          <input name="name" autoComplete="given-name" className="field" placeholder="Ex. Akouvi" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-soft">
            E-mail ou téléphone {kind === "priere" && <span className="font-normal text-ink-mute">(si vous voulez)</span>}
          </span>
          <input name="contact" autoComplete="email" className="field" placeholder="Pour pouvoir vous répondre" required={kind === "contact"} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-ink-soft">{kind === "priere" ? "Pour quoi pouvons-nous prier ?" : "Votre message"}</span>
        <textarea
          name="body"
          rows={6}
          required
          className="field resize-y"
          placeholder={kind === "priere" ? "Écrivez librement. Ce que vous confiez ici reste confidentiel." : "Dites-nous tout, on vous répond."}
        />
      </label>
      {state?.error && (
        <p id={`${id}-err`} role="alert" className="mt-4 rounded-xl border border-live/40 bg-live/10 px-4 py-3 text-sm font-semibold text-ink">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full disabled:opacity-70 sm:w-auto">
        {pending ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Send aria-hidden className="h-4 w-4" />}
        {pending ? "Envoi en cours…" : kind === "priere" ? "Confier ma prière" : "Envoyer mon message"}
      </button>
    </form>
  );
}
