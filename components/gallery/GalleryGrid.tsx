"use client";

import type { Photo } from "@/lib/gallery";
import { lockScroll } from "@/lib/scroll";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Sans dimensions connues, on alterne des formats pour garder un mur vivant.
const FALLBACK = ["4 / 5", "3 / 2", "1 / 1", "3 / 4", "16 / 11"];
const ratio = (p: Photo, i: number) => (p.w && p.h ? `${p.w} / ${p.h}` : FALLBACK[i % FALLBACK.length]);

/** Mur de photos + visionneuse plein écran, utilisable au clavier et au lecteur d'écran. */
export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const go = useCallback((step: number) => setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      lockScroll(true);
    }
    if (!open && el.open) el.close();
  }, [open]);

  // Chaque photo arrive en douceur (sauf si les animations sont réduites).
  useEffect(() => {
    if (!open || !stage.current || !document.documentElement.classList.contains("motion")) return;
    gsap.fromTo(stage.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
  }, [index, open]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }

  return (
    <>
      <ul className="gap-4 [column-fill:_balance] columns-1 sm:columns-2 sm:gap-5 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.id} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Agrandir la photo : ${p.alt}`}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-linen"
              style={{ aspectRatio: ratio(p, i) }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                unoptimized={p.src.startsWith("/media/")}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              {p.caption && (
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-night/85 to-transparent px-5 pb-4 pt-12 text-left text-sm font-semibold text-snow opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {p.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label="Visionneuse de photos"
        onKeyDown={onKey}
        onClose={() => {
          setIndex(null);
          lockScroll(false);
          opener.current?.focus();
        }}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-ink backdrop:bg-night"
      >
        {photo && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
                Photo {index! + 1} sur {photos.length}
              </p>
              <button type="button" onClick={() => dialog.current?.close()} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-ink" aria-label="Fermer la visionneuse">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 px-3 sm:px-20">
              <div ref={stage} className="relative h-full w-full">
                <Image key={photo.id} src={photo.src} alt={photo.alt} fill unoptimized={photo.src.startsWith("/media/")} sizes="100vw" className="object-contain" />
              </div>
              {photos.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-snow text-night shadow-lg transition-transform hover:scale-105 sm:left-5" aria-label="Photo précédente">
                    <ChevronLeft aria-hidden className="h-6 w-6" />
                  </button>
                  <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-snow text-night shadow-lg transition-transform hover:scale-105 sm:right-5" aria-label="Photo suivante">
                    <ChevronRight aria-hidden className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            <p className="min-h-14 px-6 py-4 text-center text-ink-soft">{photo.caption || photo.alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
