"use client";

import { saveSettingsAction } from "@/app/admin/actions";
import type { Leader, ServiceTime, Settings, Socials } from "@/lib/site";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { ImageField } from "./ImageField";

const field = "w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-ink focus:border-royal focus:bg-card focus:outline-none";
const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-mute">{hint}</span>}
    </label>
  );
}

function Section({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="card p-5 sm:p-7">
      <h2 className="text-2xl text-ink">{title}</h2>
      {lead && <p className="mt-1 text-sm text-ink-mute">{lead}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function SettingsForm({ initial }: { initial: Settings }) {
  const [s, setS] = useState<Settings>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((x) => ({ ...x, [k]: v }));
  const setSocial = (k: keyof Socials, v: string) => setS((x) => ({ ...x, socials: { ...x.socials, [k]: v } }));
  const setService = (i: number, patch: Partial<ServiceTime>) => set("services", s.services.map((sv, j) => (j === i ? { ...sv, ...patch } : sv)));
  const setLeader = (i: number, patch: Partial<Leader>) => set("leaders", s.leaders.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  function save() {
    start(async () => {
      const res = await saveSettingsAction(s);
      setMsg(res.ok ? { ok: true, text: "Réglages enregistrés. Le site est à jour." } : { ok: false, text: res.error ?? "Erreur" });
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl text-ink sm:text-5xl">Réglages du site</h1>
      </div>

      <div className="mt-8 space-y-6 pb-28">
        <Section title="Annonce" lead="Un bandeau en haut de toutes les pages (laisser vide pour le masquer).">
          <Field label="Texte de l'annonce">
            <input value={s.announcement} onChange={(e) => set("announcement", e.target.value)} placeholder="Ex. Culte spécial de louange ce dimanche à 9h !" className={field} />
          </Field>
        </Section>

        <Section title="Réseaux sociaux" lead="Collez l'adresse complète de chaque page. Les réseaux vides ne sont pas affichés.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Facebook">
              <input value={s.socials.facebook} onChange={(e) => setSocial("facebook", e.target.value)} placeholder="https://www.facebook.com/…" className={field} />
            </Field>
            <Field label="YouTube">
              <input value={s.socials.youtube} onChange={(e) => setSocial("youtube", e.target.value)} placeholder="https://www.youtube.com/@…" className={field} />
            </Field>
            <Field label="TikTok">
              <input value={s.socials.tiktok} onChange={(e) => setSocial("tiktok", e.target.value)} placeholder="https://www.tiktok.com/@…" className={field} />
            </Field>
            <Field label="Instagram">
              <input value={s.socials.instagram} onChange={(e) => setSocial("instagram", e.target.value)} placeholder="https://www.instagram.com/…" className={field} />
            </Field>
            <Field label="WhatsApp" hint="Numéro au format international (ex. +228 90 12 34 56) ou lien de groupe/chaîne.">
              <input value={s.socials.whatsapp} onChange={(e) => setSocial("whatsapp", e.target.value)} placeholder="+228 …" className={field} />
            </Field>
          </div>
        </Section>

        <Section title="Chaîne YouTube (directs et rediffusions)" lead="Le site détecte seul les directs et liste les vidéos de cette chaîne.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Identifiant de la chaîne" hint="Le @ de la chaîne.">
              <input value={s.youtubeHandle} onChange={(e) => set("youtubeHandle", e.target.value)} placeholder="@egliseterredevictoiretogo" className={field} />
            </Field>
            <Field label="ID technique (facultatif)" hint="Commence par UC… — à renseigner seulement si les vidéos n'apparaissent pas.">
              <input value={s.youtubeChannelId} onChange={(e) => set("youtubeChannelId", e.target.value.trim())} placeholder="UC…" className={field} />
            </Field>
          </div>
        </Section>

        <Section title="Adresse & contact">
          <Field label="Adresse affichée">
            <input value={s.address} onChange={(e) => set("address", e.target.value)} className={field} />
          </Field>
          <Field label="Indication pour nous trouver">
            <input value={s.addressHint} onChange={(e) => set("addressHint", e.target.value)} placeholder="Ex. En face de la pharmacie…, portail bleu" className={field} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Latitude" hint="Dans Google Maps : clic droit sur l'église → copier les coordonnées.">
              <input type="number" step="any" value={s.lat} onChange={(e) => set("lat", Number(e.target.value))} className={field} />
            </Field>
            <Field label="Longitude">
              <input type="number" step="any" value={s.lng} onChange={(e) => set("lng", Number(e.target.value))} className={field} />
            </Field>
            <Field label="Téléphone">
              <input value={s.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+228 …" className={field} />
            </Field>
            <Field label="E-mail">
              <input type="email" value={s.email} onChange={(e) => set("email", e.target.value)} className={field} />
            </Field>
          </div>
        </Section>

        <Section title="Rendez-vous de la semaine" lead="Heure de Lomé. Utilisés pour le programme, le compte à rebours et l'agenda.">
          {s.services.map((sv, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-[9rem_7rem_1fr_auto]">
              <select value={sv.weekday} onChange={(e) => setService(i, { weekday: Number(e.target.value), day: DAYS[Number(e.target.value)] })} className={field} aria-label="Jour">
                {DAYS.map((d, n) => (
                  <option key={d} value={n}>
                    {d}
                  </option>
                ))}
              </select>
              <input type="time" value={sv.time} onChange={(e) => setService(i, { time: e.target.value })} className={field} aria-label="Heure" />
              <input value={sv.title} onChange={(e) => setService(i, { title: e.target.value })} placeholder="Nom du rendez-vous" className={field} aria-label="Titre" />
              <button type="button" onClick={() => set("services", s.services.filter((_, j) => j !== i))} className="grid h-11 w-11 place-items-center rounded-xl text-live hover:bg-live/10" aria-label="Supprimer">
                <Trash2 className="h-4 w-4" />
              </button>
              <input value={sv.note ?? ""} onChange={(e) => setService(i, { note: e.target.value })} placeholder="Petite description (facultatif)" className={`${field} sm:col-span-4`} aria-label="Description" />
            </div>
          ))}
          <button type="button" onClick={() => set("services", [...s.services, { day: "Dimanche", weekday: 0, time: "10:00", title: "", note: "" }])} className="inline-flex items-center gap-2 text-sm font-semibold text-royal">
            <Plus className="h-4 w-4" /> Ajouter un rendez-vous
          </button>
        </Section>

        <Section title="Pasteurs & responsables" lead="Affichés sur la page « L'église ». Le premier apparaît aussi sur l'accueil.">
          <div className="grid gap-4 sm:grid-cols-2">
            {s.leaders.map((l, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line p-4">
                <ImageField label="Photo" aspect="aspect-[4/5]" value={l.photo} onChange={(url) => setLeader(i, { photo: url })} />
                <input value={l.name} onChange={(e) => setLeader(i, { name: e.target.value })} placeholder="Nom (ex. Pasteur Jean Dupont)" className={field} aria-label="Nom" />
                <input value={l.role} onChange={(e) => setLeader(i, { role: e.target.value })} placeholder="Rôle" className={field} aria-label="Rôle" />
                <textarea value={l.bio ?? ""} onChange={(e) => setLeader(i, { bio: e.target.value })} rows={3} placeholder="Quelques mots de présentation" className={`${field} resize-y`} aria-label="Présentation" />
                <button type="button" onClick={() => set("leaders", s.leaders.filter((_, j) => j !== i))} className="inline-flex items-center gap-2 text-sm text-live">
                  <Trash2 className="h-4 w-4" /> Retirer
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => set("leaders", [...s.leaders, { name: "", role: "", photo: "", bio: "" }])} className="inline-flex items-center gap-2 text-sm font-semibold text-royal">
            <Plus className="h-4 w-4" /> Ajouter une personne
          </button>
        </Section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-4 px-4 py-3 lg:px-8">
          {msg && <p className={`text-sm font-medium ${msg.ok ? "text-royal" : "text-live"}`}>{msg.text}</p>}
          <button type="button" onClick={save} disabled={pending} className="btn btn-primary">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
