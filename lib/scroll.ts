import type Lenis from "lenis";

// Accès partagé au défilement adouci (Lenis). Absent si la personne a demandé
// moins d'animations : tout le code appelant doit fonctionner sans lui.
let instance: Lenis | null = null;
let locks = 0;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};
export const getLenis = () => instance;

/** Bloque le défilement de la page derrière un menu ou une visionneuse. */
export function lockScroll(locked: boolean) {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const on = locks > 0;
  document.documentElement.style.overflow = on ? "hidden" : "";
  if (on) instance?.stop();
  else instance?.start();
}

/** Défile jusqu'à un élément, en douceur si c'est permis. */
export function scrollToEl(el: Element, offset = -96) {
  if (instance) instance.scrollTo(el as HTMLElement, { offset });
  else el.scrollIntoView({ block: "start" });
}
