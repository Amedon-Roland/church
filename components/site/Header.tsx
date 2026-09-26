"use client";

import { getLiveStatus } from "@/lib/live-client";
import { NAV } from "@/lib/site";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header({ services }: { services: { day: string; time: string; title: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [live, setLive] = useState(false);

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

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
          className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled || open ? "border-b border-line bg-paper/92 shadow-[0_8px_30px_-20px_rgb(23_25_58/0.35)] backdrop-blur-md" : "border-b border-transparent"
          }`}
        >
          <div className="container-x flex h-[4.25rem] items-center justify-between gap-4 lg:h-20">
            <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3" aria-label="Terre de Victoire — accueil">
              <Image src="/images/logo.webp" alt="" width={44} height={44} priority className="h-10 w-10 rounded-full ring-1 ring-gold/40 transition-transform duration-500 group-hover:rotate-[-8deg] lg:h-11 lg:w-11" />
              <span className="leading-none">
                <span className="block font-serif text-[1.3rem] font-medium tracking-tight text-ink">Terre de Victoire</span>
                <span className="mt-1 block text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-ink-mute">Victory Outreach · Lomé</span>
              </span>
            </Link>

            <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
              {NAV.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.94rem] font-medium transition-colors ${
                    isActive(item.href) ? "text-royal" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.href === "/direct" && live && <span className="absolute right-1 top-1.5 h-2 w-2 rounded-full bg-live animate-live" />}
                  {item.label}
                  {isActive(item.href) && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" />}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/direct" onClick={() => setOpen(false)} className={`btn hidden !min-h-10 !px-4 text-sm sm:inline-flex ${live ? "bg-live text-white" : "btn-primary"}`}>
                <span className={`h-2 w-2 rounded-full ${live ? "bg-white animate-live" : "bg-gold"}`} />
                {live ? "En direct" : "Regarder"}
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-ink lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
      </header>
      {/* Menu mobile — hors du <header> : son backdrop-filter piégerait ce panneau fixe */}
      <div
        id="menu-mobile"
        className={`fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto bg-paper paper-grain transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu mobile" className="container-x flex flex-col py-6">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${i * 45}ms` }}
              className={`flex items-baseline justify-between border-b border-line py-4 font-serif text-[1.9rem] leading-none ${open ? "animate-rise" : ""} ${
                isActive(item.href) ? "text-royal" : "text-ink"
              }`}
            >
              <span className="flex items-center gap-3">
                {item.label}
                {item.href === "/direct" && live && <span className="rounded-full bg-live px-2 py-0.5 font-sans text-xs font-semibold text-white">en direct</span>}
              </span>
              <span className="text-sm text-gold-ink">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="container-x pb-10">
          <p className="kicker mb-3">Nos rendez-vous</p>
          <ul className="space-y-2 text-ink-soft">
            {services.map((s) => (
              <li key={s.day + s.time} className="flex justify-between gap-4">
                <span>{s.title}</span>
                <span className="font-medium text-ink">
                  {s.day} · {s.time.replace(":", "h")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
