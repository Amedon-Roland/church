/** Shalom, la colombe du logo devenue guide. SVG pur, animé en CSS. */
export function Dove({ className = "", mood = "idle" }: { className?: string; mood?: "idle" | "talk" | "sleep" }) {
  return (
    <svg viewBox="0 0 124 104" className={`dove dove-${mood} ${className}`} role="img" aria-label="Shalom, la colombe">
      <g className="dove-body">
        {/* aile arrière */}
        <path className="dove-wing-back" d="M58 50c2-18 14-32 30-38-3 12-2 22-9 32-5 7-13 10-21 6Z" fill="#e6e3f1" />
        {/* corps + queue */}
        <path
          d="M28 58c0-15 13-24 29-22 13 1 22 9 34 10 7 1 13-2 19-6-2 11-9 21-19 27-6 4-12 5-17 6-13 3-27 2-37-3-6-3-9-7-9-12Z"
          fill="#fffdf8"
          stroke="#c9922d"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M96 55c5 1 10 0 14-3M92 61c6 1 11 0 15-4" stroke="#c9922d" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7" />
        {/* écharpe bleu roi */}
        <path d="M32 55c5 5 15 6 21 2l1 4c-7 4-17 3-23-2Z" fill="#2e4b97" />
        <path d="M44 60l-3 11 5-2 1 6 3-12Z" fill="#232766" />
        {/* tête */}
        <circle cx="35" cy="42" r="15" fill="#fffdf8" stroke="#c9922d" strokeWidth="1.6" />
        <ellipse cx="38" cy="49" rx="3.6" ry="2.3" fill="#f1ddb0" opacity=".9" />
        <g className="dove-eye">
          <ellipse cx="30" cy="40" rx="2.8" ry="3.2" fill="#17193a" />
          <circle cx="31" cy="38.8" r="1" fill="#fff" />
        </g>
        <path className="dove-sleep-eye" d="M27 41q3 2 6 0" stroke="#17193a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* bec + rameau d'olivier */}
        <path d="M21 42l-8 3.5 8 2.5Z" fill="#c9922d" />
        <g className="dove-branch">
          <path d="M14 46c-4 5-6 10-5 16" stroke="#6f6a2c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M11.5 51c-5-1-7 1-8 3 4 1 6 0 8-3Z" fill="#8a8a3a" />
          <path d="M10.5 56c4-2 7-1 8 1-3 2-6 2-8-1Z" fill="#7c7d32" />
          <path d="M9.4 60.5c-4 0-6 2-6 4 3 0 5-1 6-4Z" fill="#8a8a3a" />
        </g>
        {/* aile avant */}
        <g className="dove-wing">
          <path d="M54 52c1-20 13-36 34-44-2 14-4 25-12 35-6 8-14 12-22 9Z" fill="#fffdf8" stroke="#c9922d" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M60 46c5-11 12-20 22-27M64 48c4-8 9-14 15-19M58 42c3-9 8-17 15-23" stroke="#c9922d" strokeWidth="1" fill="none" strokeLinecap="round" opacity=".55" />
        </g>
      </g>
      <g className="dove-zzz" fill="#8a5f12" fontFamily="var(--font-hand)" fontSize="13">
        <text x="48" y="22">z</text>
        <text x="56" y="14" fontSize="10">z</text>
      </g>
    </svg>
  );
}
