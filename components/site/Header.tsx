"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Weave } from "@/components/ui/Weave";
import { hour } from "@/lib/format";
import { getLiveStatus } from "@/lib/live-client";
import { lockScroll } from "@/lib/scroll";
import { NAV } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Header({ services }: { services: { day: string; time: string; title: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [live, setLive] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le badge « en direct » est vérifié côté client pour garder les pages statiques.
  useEffect(() => {
    let alive = true;
    getLiveStatus().then((d) => alive && setLive(d.live));
    return () => {
      alive = false;
    };
  }, []);

  // Menu ouvert : la page derrière ne défile plus, Échap referme, le focus entre dans le menu.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    // Une image plus tard : le panneau vient juste de redevenir visible et focalisable.
    const raf = requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(raf);
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          solid ? "border-line bg-paper/85 shadow-[0_10px_30px_-24px_rgb(var(--shadow-color)/0.6)] backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-[4.25rem] items-center justify-between gap-4 lg:h-20">
          <Link href="/" onClick={() => setOpen(false)} className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/images/logo.webp"
              alt=""
              width={44}
              height={44}
              priority
              className="h-10 w-10 shrink-0 rounded-full ring-2 ring-gold/50 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[-10deg] lg:h-11 lg:w-11"
            />
            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap font-display text-[0.95rem] font-bold tracking-[-0.03em] text-ink min-[360px]:text-[1.2rem]">Terre de Victoire</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-mute">Église · Lomé</span>
              <span className="sr-only"> — retour à l&apos;accueil</span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center xl:flex">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`group relative rounded-full px-3.5 py-2.5 text-[0.95rem] font-semibold transition-colors ${isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                {item.label}
                {item.href === "/direct" && live && (
                  <span className="absolute right-0.5 top-2 h-2 w-2 rounded-full bg-live animate-live">
                    <span className="sr-only">en direct</span>
                  </span>
                )}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 bottom-1 h-[3px] origin-left rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link href="/direct" onClick={() => setOpen(false)} className={`btn hidden !min-h-11 !px-5 text-sm sm:inline-flex ${live ? "bg-live text-white" : "btn-primary"}`}>
              {live && <span className="h-2 w-2 rounded-full bg-white animate-live" />}
              {live ? "En direct" : "Regarder un culte"}
            </Link>
            <button
              ref={burger}
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-ink xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span aria-hidden className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span aria-hidden className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
        {/* Le fil tissé avance avec la lecture de la page */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-[3px] overflow-hidden">
          <div data-progress className="h-full origin-left scale-x-0">
            <Weave height={3} />
          </div>
        </div>
      </header>

      {/* Menu mobile — hors du <header> : son backdrop-filter piégerait ce panneau fixe */}
      <div
        id="menu-mobile"
        ref={panel}
        inert={!open}
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto bg-paper transition-[opacity,visibility,clip-path] duration-500 ease-[var(--ease-out-expo)] lg:top-20 xl:hidden ${
          open ? "visible opacity-100 [clip-path:inset(0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Menu" className="container-x flex flex-col pb-4 pt-6">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ animationDelay: `${80 + i * 50}ms` }}
              className={`flex items-baseline justify-between gap-4 border-b border-line py-4 font-display text-[2rem] font-semibold leading-none tracking-[-0.035em] sm:text-[2.6rem] ${
                open ? "animate-rise" : ""
              } ${isActive(item.href) ? "text-accent" : "text-ink"}`}
            >
              <span className="flex items-center gap-3">
                {item.label}
                {item.href === "/direct" && live && <span className="rounded-full bg-live px-2.5 py-1 font-sans text-xs font-bold tracking-normal text-white">en direct</span>}
              </span>
              <span aria-hidden className="font-sans text-sm font-semibold tracking-normal text-gold-ink">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>
        <div className="container-x pb-12 pt-4">
          <p className="kicker mb-4">On se retrouve quand ?</p>
          <ul className="space-y-2.5 text-ink-soft">
            {services.map((s) => (
              <li key={s.day + s.time} className="flex justify-between gap-4">
                <span>{s.title}</span>
                <span className="shrink-0 font-semibold text-ink">
                  {s.day} · {hour(s.time)}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/direct" onClick={() => setOpen(false)} className={`btn mt-8 w-full sm:hidden ${live ? "bg-live text-white" : "btn-primary"}`}>
            {live ? "Rejoindre le direct" : "Regarder un culte"}
          </Link>
        </div>
      </div>
    </>
  );
}
