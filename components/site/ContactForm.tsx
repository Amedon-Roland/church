"use client";

import { sendMessage, type FormState } from "@/app/(site)/nous-trouver/actions";
import { HeartHandshake, Loader2, Send } from "lucide-react";
import { useActionState, useState } from "react";

const field =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-mute/80 transition-colors focus:border-royal focus:bg-card focus:outline-none";

export function ContactForm() {
  const [kind, setKind] = useState<"contact" | "priere">("contact");
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, null);
  const [startedAt] = useState(() => Date.now());

  if (state?.ok) {
    return (
      <div className="card grid place-items-center p-10 text-center">
        <HeartHandshake className="h-10 w-10 text-gold" />
        <p className="mt-4 font-serif text-3xl text-ink">{kind === "priere" ? "Nous prions pour vous." : "Message bien reçu !"}</p>
        <p className="mt-2 max-w-sm text-ink-soft">
          {kind === "priere" ? "Votre demande a été confiée à l'équipe de prière, dans la discrétion." : "Quelqu'un de l'équipe vous répondra très bientôt. Merci de nous avoir écrit."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card p-5 sm:p-8">
      <div role="radiogroup" aria-label="Type de message" className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-linen p-1">
        {(
          [
            ["contact", "Une question"],
            ["priere", "Un sujet de prière"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={kind === value}
            onClick={() => setKind(value)}
            className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${kind === value ? "bg-card text-ink shadow-sm" : "text-ink-mute hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="t" value={startedAt} />
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Ne pas remplir <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Votre prénom</span>
          <input name="name" autoComplete="given-name" className={field} placeholder={kind === "priere" ? "Facultatif" : "Ex. Akouvi"} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">E-mail ou téléphone {kind === "priere" && "(facultatif)"}</span>
          <input name="contact" className={field} placeholder="Pour vous répondre" required={kind === "contact"} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">{kind === "priere" ? "Pour quoi pouvons-nous prier ?" : "Votre message"}</span>
        <textarea name="body" rows={5} required className={`${field} resize-y`} placeholder={kind === "priere" ? "Tout ce que vous écrivez reste confidentiel." : "Posez-nous votre question…"} />
      </label>
      {state?.error && <p className="mt-3 text-sm font-medium text-live">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary mt-5 w-full sm:w-auto">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {kind === "priere" ? "Confier ma prière" : "Envoyer"}
      </button>
    </form>
  );
}
