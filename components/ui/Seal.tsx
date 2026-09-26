import Image from "next/image";

/** Le logo de l'église entouré d'une couronne de texte qui tourne lentement. */
export function Seal({ size = 360, priority = false, ring = "TERRE DE VICTOIRE · LOMÉ · TOGO · " }: { size?: number; priority?: boolean; ring?: string }) {
  return (
    <div className="relative aspect-square w-full" style={{ maxWidth: size }}>
      {/* Rayons dorés, comme la lumière qui descend sur la croix du logo */}
      <svg viewBox="0 0 200 200" className="absolute inset-[-18%] h-[136%] w-[136%] text-gold/35" aria-hidden>
        {Array.from({ length: 36 }, (_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 100 * Math.cos((i * Math.PI) / 18)}
            y2={100 + 100 * Math.sin((i * Math.PI) / 18)}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? 0.6 : 0.25}
            strokeDasharray={i % 2 ? "1 3" : undefined}
          />
        ))}
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow text-gold-ink" aria-hidden>
        <defs>
          <path id="seal-ring" d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0" />
        </defs>
        <text fontSize="9" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="600">
          {/* textLength = circonférence : le texte fait exactement un tour, sans chevauchement */}
          <textPath href="#seal-ring" textLength="562" lengthAdjust="spacing">
            {ring.repeat(2)}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[13%] overflow-hidden rounded-full shadow-[0_30px_60px_-25px_rgb(23_25_58/0.6)] ring-1 ring-gold/40">
        <Image
          src="/images/logo.webp"
          alt="Logo de Victory Outreach Ministry International : une colombe descend sur la croix"
          fill
          sizes={`${Math.round(size * 0.74)}px`}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
