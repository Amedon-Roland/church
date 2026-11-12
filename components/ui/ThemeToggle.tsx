"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const KEY = "tdv:theme";
const EVENT = "tdv:theme";
type Theme = "light" | "dark";

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0e1030" : "#f5f2eb");
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Bascule Jour / Veillée. Le choix est mémorisé ; par défaut on suit le réglage du téléphone. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);
  const dark = theme === "dark";

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = dark ? "light" : "dark";
    const root = document.documentElement;
    const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
    if (!start || !root.classList.contains("motion")) return apply(next);

    // La nouvelle ambiance s'ouvre en cercle depuis le bouton.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("theme-switching");
    const transition = start.call(document, () => apply(next));
    transition.ready
      .then(() =>
        root
          .animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, { duration: 650, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", pseudoElement: "::view-transition-new(root)" })
          .finished,
      )
      .catch(() => {})
      .finally(() => root.classList.remove("theme-switching"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Thème sombre activé. Passer au thème clair" : "Thème clair activé. Passer au thème sombre"}
      title={dark ? "Passer au thème clair" : "Passer au thème sombre"}
      className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-card text-ink transition-colors hover:border-ink ${className}`}
    >
      <Sun aria-hidden className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ease-[var(--ease-out-expo)] ${dark ? "translate-y-8 rotate-90 opacity-0" : ""}`} />
      <Moon aria-hidden className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ease-[var(--ease-out-expo)] ${dark ? "" : "-translate-y-8 -rotate-90 opacity-0"}`} />
    </button>
  );
}
