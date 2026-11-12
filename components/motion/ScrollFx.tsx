"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Toutes les animations au défilement du site, pilotées par des attributs :
 *
 *   data-split            titre qui monte ligne par ligne
 *   data-reveal           apparition douce (data-reveal="left|right|scale")
 *   data-reveal-group     les enfants apparaissent l'un après l'autre
 *   data-clip             photo qui se dévoile comme un rideau qu'on lève
 *   data-parallax="12"    l'élément glisse plus lentement que la page (en %)
 *   data-words            phrase qui s'éclaire mot à mot pendant qu'on défile
 *   data-hscroll          bande qui défile à l'horizontale (grand écran)
 *   data-drift="-18"      bandeau qui dérive avec le défilement (en %)
 *   data-progress         barre de progression de lecture
 *
 * Rien ne tourne si la classe « motion » est absente (animations réduites).
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const build = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        /* ---- Titres ---- */
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const now = el.dataset.split === "now";
          gsap.set(el, { visibility: "visible" });
          SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "sl",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.09,
                delay: now ? 0.15 : 0,
                scrollTrigger: now ? undefined : { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        /* ---- Apparitions ---- */
        const from = (el: HTMLElement) => {
          const kind = el.dataset.reveal;
          if (kind === "left") return { x: -40, y: 0 };
          if (kind === "right") return { x: 40, y: 0 };
          if (kind === "scale") return { scale: 0.94, y: 0 };
          return { y: 32 };
        };
        const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        singles.forEach((el) => gsap.set(el, from(el)));
        ScrollTrigger.batch(singles, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out", stagger: 0.09, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = Array.from(group.children);
          gsap.set(items, { y: 28 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        /* ---- Photos : rideau + léger dézoom ---- */
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const inner = el.firstElementChild;
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", clearProps: "clipPath" });
          if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        });

        /* ---- Parallaxe ---- */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 10;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        /* ---- Phrase qui s'éclaire ---- */
        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.16 },
                { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 48%", scrub: 0.4 } },
              ),
          });
        });

        /* ---- Bandeaux qui dérivent ---- */
        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
          const amount = Number(el.dataset.drift) || -15;
          gsap.fromTo(
            el,
            { xPercent: amount < 0 ? 0 : -amount },
            { xPercent: amount < 0 ? amount : 0, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        });

        /* ---- Progression de lecture ---- */
        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
        });

        /* ---- Défilement horizontal épinglé (grand écran, souris) ---- */
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px) and (pointer: fine)", () => {
          gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
            const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
            if (!track) return;
            const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
            if (distance() < 80) return;
            section.classList.add("is-pinned");
            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: { trigger: section, start: "center center", end: () => `+=${distance()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
            });
            // Chaque image glisse un peu à l'intérieur de son cadre.
            track.querySelectorAll<HTMLElement>("[data-hscroll-item]").forEach((item) => {
              gsap.fromTo(item, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: item.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
            });
            return () => section.classList.remove("is-pinned");
          });
        });
      });
      root.classList.add("motion-ready");
      // Les images qui finissent de charger déplacent les repères.
      ScrollTrigger.refresh();
    };

    // On attend les polices : découper un titre avant leur arrivée fausse les lignes.
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(build);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
