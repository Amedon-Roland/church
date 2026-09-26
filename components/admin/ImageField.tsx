"use client";

import { uploadImageAction } from "@/app/admin/actions";
import { resizeImage } from "@/lib/image-client";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

/** Envoie une image (redimensionnée dans le navigateur) et renvoie son adresse. */
export async function uploadFile(file: File) {
  const dataUrl = await resizeImage(file);
  const res = await uploadImageAction(dataUrl);
  if (!res.ok) throw new Error(res.error);
  return res.url;
}

export function ImageField({ value, onChange, label, aspect = "aspect-[16/9]" }: { value: string; onChange: (url: string) => void; label: string; aspect?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadFile(file));
    } catch (e) {
      setError((e as Error).message || "Envoi impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      <div
        className={`relative ${aspect} overflow-hidden rounded-xl border border-dashed border-line bg-paper`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          pick(e.dataTransfer.files[0]);
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <button type="button" onClick={() => input.current?.click()} className="grid h-full w-full place-items-center text-sm text-ink-mute hover:text-ink">
            <span className="flex flex-col items-center gap-2">
              <ImagePlus className="h-6 w-6" /> Choisir ou glisser une image
            </span>
          </button>
        )}
        {busy && (
          <span className="absolute inset-0 grid place-items-center bg-paper/80">
            <Loader2 className="h-6 w-6 animate-spin text-royal" />
          </span>
        )}
        {value && !busy && (
          <span className="absolute right-2 top-2 flex gap-1">
            <button type="button" onClick={() => input.current?.click()} className="rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-ink shadow">
              Changer
            </button>
            <button type="button" onClick={() => onChange("")} className="grid h-7 w-7 place-items-center rounded-full bg-card/95 text-live shadow" aria-label="Retirer l'image">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
      {error && <p className="mt-1 text-sm text-live">{error}</p>}
    </div>
  );
}
