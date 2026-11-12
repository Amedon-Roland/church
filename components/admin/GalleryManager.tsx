"use client";

import { saveGalleryAction } from "@/app/admin/actions";
import type { Photo } from "@/lib/gallery";
import { ArrowDown, ArrowUp, Check, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { uploadFile } from "./ImageField";

const field = "w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-ink focus:border-royal focus:bg-card focus:outline-none";

function dimensions(file: File): Promise<{ w: number; h: number } | null> {
  return createImageBitmap(file)
    .then((b) => {
      const d = { w: b.width, h: b.height };
      b.close();
      return d;
    })
    .catch(() => null);
}

/** Ajout, description, ordre et suppression des photos de la galerie. */
export function GalleryManager({ initial }: { initial: Photo[] }) {
  const [photos, setPhotos] = useState<Photo[]>(initial);
  const [busy, setBusy] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const input = useRef<HTMLInputElement>(null);

  async function add(files: FileList | null) {
    if (!files?.length) return;
    setMsg(null);
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setBusy(list.length);
    for (const file of list) {
      try {
        const [src, dim] = await Promise.all([uploadFile(file), dimensions(file)]);
        setPhotos((all) => [...all, { id: src.split("/").pop()!, src, alt: "", caption: "", ...dim }]);
      } catch (e) {
        setMsg({ ok: false, text: `${file.name} : ${(e as Error).message || "envoi impossible"}` });
      }
      setBusy((n) => n - 1);
    }
    setBusy(0);
    if (input.current) input.current.value = "";
  }

  const patch = (i: number, p: Partial<Photo>) => setPhotos((all) => all.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const move = (i: number, step: number) =>
    setPhotos((all) => {
      const next = [...all];
      const j = i + step;
      if (j < 0 || j >= next.length) return all;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  function save() {
    start(async () => {
      const res = await saveGalleryAction(photos);
      setMsg(res.ok ? { ok: true, text: "Galerie enregistrée. Le site est à jour." } : { ok: false, text: res.error ?? "Erreur" });
    });
  }

  const missing = photos.filter((p) => !p.alt.trim()).length;

  return (
    <div>
      <h1 className="text-4xl text-ink sm:text-5xl">Galerie</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Ajoutez ici les photos de la vie de l&apos;église (celles de la page Facebook, par exemple). La première photo s&apos;affiche aussi en grand sur
        la page d&apos;accueil. Pensez à décrire chaque photo en quelques mots : c&apos;est ce que lisent les personnes malvoyantes.
      </p>

      <div
        className="mt-8 rounded-2xl border-2 border-dashed border-line bg-card p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          add(e.dataTransfer.files);
        }}
      >
        <button type="button" onClick={() => input.current?.click()} disabled={busy > 0} className="btn btn-primary">
          {busy > 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {busy > 0 ? `Envoi en cours (${busy} restante${busy > 1 ? "s" : ""})…` : "Ajouter des photos"}
        </button>
        <p className="mt-3 text-sm text-ink-mute">Vous pouvez en choisir plusieurs à la fois, ou les glisser ici. Elles sont allégées automatiquement.</p>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
      </div>

      <ul className="mt-8 space-y-4 pb-28">
        {photos.map((p, i) => (
          <li key={p.id} className="card grid gap-4 p-4 sm:grid-cols-[9rem_1fr_auto] sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" className="aspect-[4/3] w-full rounded-xl object-cover sm:w-36" />
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Ce que l&apos;on voit sur la photo</span>
                <input value={p.alt} onChange={(e) => patch(i, { alt: e.target.value })} placeholder="Ex. La chorale chante pendant le culte du dimanche" className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Légende (facultatif)</span>
                <input value={p.caption ?? ""} onChange={(e) => patch(i, { caption: e.target.value })} placeholder="Ex. Baptêmes, décembre" className={field} />
              </label>
            </div>
            <div className="flex gap-1 sm:flex-col">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="grid h-10 w-10 place-items-center rounded-xl text-ink-soft hover:bg-linen disabled:opacity-30" aria-label="Monter la photo">
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === photos.length - 1} className="grid h-10 w-10 place-items-center rounded-xl text-ink-soft hover:bg-linen disabled:opacity-30" aria-label="Descendre la photo">
                <ArrowDown className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setPhotos((all) => all.filter((_, j) => j !== i))} className="grid h-10 w-10 place-items-center rounded-xl text-live hover:bg-live/10" aria-label="Retirer la photo">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {photos.length === 0 && <li className="py-10 text-center text-ink-mute">Aucune photo pour l&apos;instant.</li>}
      </ul>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-end gap-4 px-4 py-3 lg:px-8">
          <p role="status" className={`text-sm font-medium ${msg ? (msg.ok ? "text-accent" : "text-live") : "text-ink-mute"}`}>
            {msg?.text ?? (missing > 0 ? `${missing} photo${missing > 1 ? "s" : ""} sans description` : `${photos.length} photo${photos.length > 1 ? "s" : ""}`)}
          </p>
          <button type="button" onClick={save} disabled={pending || busy > 0} className="btn btn-primary">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
