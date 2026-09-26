"use server";

import { addMessage } from "@/lib/messages";

export type FormState = { ok: boolean; error?: string } | null;

export async function sendMessage(_prev: FormState, form: FormData): Promise<FormState> {
  // Pièges à robots : champ caché rempli, ou formulaire envoyé en moins de 3 secondes.
  if (form.get("site")) return { ok: true };
  const started = Number(form.get("t"));
  if (!started || Date.now() - started < 3000) return { ok: true };

  const kind = form.get("kind") === "priere" ? "priere" : "contact";
  const name = String(form.get("name") ?? "").trim().slice(0, 120);
  const contact = String(form.get("contact") ?? "").trim().slice(0, 160);
  const body = String(form.get("body") ?? "").trim().slice(0, 4000);

  if (!body) return { ok: false, error: "Écrivez-nous quelques mots avant d'envoyer." };
  if (kind === "contact" && !contact) return { ok: false, error: "Laissez-nous un e-mail ou un numéro pour qu'on puisse vous répondre." };

  try {
    await addMessage({ kind, name: name || "Anonyme", contact, body });
    return { ok: true };
  } catch {
    return { ok: false, error: "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous sur WhatsApp / Facebook." };
  }
}
