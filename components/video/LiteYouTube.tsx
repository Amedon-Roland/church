"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Lecteur YouTube « léger » : on n'affiche qu'une miniature et on ne charge le
 * lecteur (≈ 1 Mo de JS) qu'au clic. Précieux sur les connexions mobiles.
 */
export function LiteYouTube({
  id,
  title,
  thumbnail,
  autoplay = false,
  live = false,
  priority = false,
}: {
  id: string;
  title: string;
  thumbnail?: string;
  autoplay?: boolean;
  live?: boolean;
  priority?: boolean;
}) {
  const [active, setActive] = useState(autoplay);
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-night shadow-[var(--shadow-lift)]">
      {active ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full" aria-label={`Lire la vidéo : ${title}`}>
          <Image
            src={thumbnail ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/95 text-royal shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
          {live && (
            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-live px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <span className="h-2 w-2 rounded-full bg-white animate-live" /> En direct
            </span>
          )}
          <span className="absolute inset-x-4 bottom-4 line-clamp-2 text-left font-serif text-lg leading-snug text-white sm:inset-x-6 sm:bottom-5 sm:text-2xl">{title}</span>
        </button>
      )}
    </div>
  );
}
