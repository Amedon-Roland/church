import type { Photo } from "@/lib/gallery";
import Image from "next/image";

/**
 * La porte ouverte du héros. Avec une photo de la galerie : la famille réunie.
 * Sans photo : la lumière qui descend sur la croix, comme sur le sceau.
 */
export function HeroArch({ photo }: { photo?: Photo }) {
  return (
    <div className="arch on-dark relative aspect-[4/5] w-full bg-indigo shadow-[var(--shadow-lift)]" data-hero-arch>
      {photo ? (
        <div className="absolute inset-0 scale-[1.18]" data-parallax="8">
          <Image src={photo.src} alt={photo.alt} fill priority unoptimized={photo.src.startsWith("/media/")} sizes="(min-width: 1024px) 34rem, 90vw" className="object-cover" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_-5%,#5a73e6_0%,#2a3f9e_42%,#12174a_100%)]" />
          {/* La lumière qui descend : des rayons flous, qui glissent doucement au défilement */}
          <svg aria-hidden viewBox="0 0 400 500" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full scale-[1.15]" data-parallax="5">
            <defs>
              <linearGradient id="hero-ray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff8e6" stopOpacity="0.85" />
                <stop offset="0.5" stopColor="#e9ad36" stopOpacity="0.3" />
                <stop offset="1" stopColor="#e9ad36" stopOpacity="0" />
              </linearGradient>
              <filter id="hero-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <g filter="url(#hero-soft)">
              {[-250, -165, -95, -40, 0, 40, 95, 165, 250].map((spread, i) => (
                <path key={spread} d={`M${200 + spread * 0.06} -70 L${200 + spread - 16} 540 L${200 + spread + 16} 540 Z`} fill="url(#hero-ray)" opacity={i % 2 ? 0.3 : 0.5} />
              ))}
            </g>
          </svg>
          <div className="absolute inset-x-0 top-[24%] flex justify-center">
            <div className="relative aspect-square w-[60%] overflow-hidden rounded-full shadow-[0_30px_70px_-20px_rgb(9_11_34/0.85)] ring-4 ring-gold/80">
              <Image src="/images/logo.webp" alt="Le sceau de l'église : une colombe descend sur la croix, entourée des mots Victory Outreach Ministry International" fill priority sizes="20rem" className="object-cover" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
