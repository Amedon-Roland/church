"use client";

import { useSyncExternalStore } from "react";

// Une seule horloge partagée, qui ne tourne que si un compte à rebours est affiché.
let now = 0;
let timer: number | undefined;
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (timer === undefined) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
const useNow = () => useSyncExternalStore(subscribe, () => now || null, () => null);

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { j: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), min: Math.floor((s % 3600) / 60), s: s % 60 };
}

/** Compte à rebours jusqu'au prochain culte. Rendu côté client uniquement (heure locale). */
export function Countdown({ target, tone = "light" }: { target: string; tone?: "light" | "dark" }) {
  const current = useNow();
  const diff = current === null ? null : new Date(target).getTime() - current;
  if (diff !== null && diff <= 0) {
    return <p className={`font-serif text-2xl ${tone === "dark" ? "text-gold" : "text-royal"}`}>C&apos;est maintenant !</p>;
  }
  const p = diff === null ? null : parts(diff);
  const cells: [string, number | undefined][] = [
    ["jours", p?.j],
    ["heures", p?.h],
    ["min", p?.min],
    ["sec", p?.s],
  ];
  return (
    <div className="flex gap-2 sm:gap-3" aria-live="off">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className={`min-w-[3.6rem] rounded-xl px-2 py-2 text-center sm:min-w-16 ${tone === "dark" ? "bg-paper/8 text-paper ring-1 ring-paper/10" : "bg-linen text-ink"}`}
        >
          <span className="block font-serif text-2xl tabular-nums leading-none sm:text-3xl">{value === undefined ? "–" : String(value).padStart(2, "0")}</span>
          <span className={`mt-1 block text-[0.65rem] font-semibold uppercase tracking-wider ${tone === "dark" ? "text-paper/55" : "text-ink-mute"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}
