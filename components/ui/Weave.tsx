import { useId } from "react";

/**
 * La bande tissée : un motif de pagne kété aux couleurs du sceau (indigo, or)
 * et de la terre de Lomé. Elle sépare les sections, borde les cartes et sert
 * de fil conducteur — « tissés ensemble ».
 */
export function Weave({ className = "", height = 12 }: { className?: string; height?: number }) {
  const id = useId();
  return (
    <svg aria-hidden focusable="false" width="100%" height={height} className={`block ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="112" height="12" patternUnits="userSpaceOnUse" patternTransform={`scale(${height / 12})`}>
          <rect width="112" height="12" fill="#2a3f9e" />
          {/* bloc or + œil indigo */}
          <rect x="0" width="20" height="12" fill="#e9ad36" />
          <rect x="7" y="3" width="6" height="6" fill="#15173a" />
          <rect x="20" width="4" height="12" fill="#b5482a" />
          {/* trame : trois fils d'or sur indigo */}
          <rect x="24" y="2" width="28" height="1.5" fill="#e9ad36" />
          <rect x="24" y="5.25" width="28" height="1.5" fill="#f3efe6" />
          <rect x="24" y="8.5" width="28" height="1.5" fill="#e9ad36" />
          <rect x="52" width="4" height="12" fill="#b5482a" />
          {/* damier */}
          <rect x="56" width="24" height="12" fill="#15173a" />
          <rect x="56" y="0" width="6" height="6" fill="#e9ad36" />
          <rect x="62" y="6" width="6" height="6" fill="#e9ad36" />
          <rect x="68" y="0" width="6" height="6" fill="#e9ad36" />
          <rect x="74" y="6" width="6" height="6" fill="#e9ad36" />
          <rect x="80" width="4" height="12" fill="#b5482a" />
          {/* chevrons clairs */}
          <path d="M84 12l7-12 7 12 7-12 7 12" fill="none" stroke="#f3efe6" strokeWidth="1.6" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}
