"use client";

import { setLenis } from "@/lib/scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Défilement adouci (Lenis) synchronisé avec GSAP ScrollTrigger.
 * Désactivé si le système demande de réduire les animations : la page défile
 * alors nativement et rien d'autre ne change.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 }, autoRaf: false });
    lenisRef.current = lenis;
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Changement de page : Lenis repart de la position réelle du navigateur.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
