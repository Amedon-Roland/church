"use client";

import { HL_CLASSES, getHighlights, setHighlights, useHighlights, useLastRead } from "@/lib/bible/client-store";
import { BookmarkCheck, Trash2 } from "lucide-react";
import Link from "next/link";

/** « Reprendre ma lecture » et « Mes versets », propres à chaque lecteur. */
export function ReadingCorner() {
  const last = useLastRead();
  // Les plus récents d'abord (ordre d'insertion inversé).
  const hl = Object.entries(useHighlights()).reverse();

  if (!last && !hl.length) return null;

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
      {last && (
        <Link href={`/bible/${last.slug}/${last.chapter}`} className="group flex flex-col justify-between rounded-2xl bg-royal p-6 text-white">
          <BookmarkCheck className="h-6 w-6 text-gold-soft" />
          <span className="mt-8">
            <span className="block text-sm text-white/70">Reprendre ma lecture</span>
            <span className="font-serif text-3xl">{last.name}</span>
            <span className="mt-1 block text-sm text-gold-soft transition-transform group-hover:translate-x-1">Continuer →</span>
          </span>
        </Link>
      )}
      {hl.length > 0 && (
        <div className="card p-5 sm:p-6">
          <p className="kicker mb-4">Mes versets surlignés</p>
          <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
            {hl.map(([key, h]) => (
              <li key={key} className="flex items-start gap-3">
                <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${HL_CLASSES[h.c]}`} />
                <Link href={h.href} className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-gold-ink">{h.r}</span>
                  <span className="line-clamp-2 block font-serif text-ink">{h.t}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const all = { ...getHighlights() };
                    delete all[key];
                    setHighlights(all);
                  }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-mute hover:bg-linen hover:text-ink"
                  aria-label={`Retirer ${h.r}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
