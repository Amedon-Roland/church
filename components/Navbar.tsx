"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À Propos" },
  { id: "sermon", label: "Sermons" },
  { id: "blog", label: "Journal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      for (const item of [...NAV, { id: "contact", label: "Contact" }]) {
        const el = document.getElementById(item.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 140 && r.bottom >= 140) {
            setActive(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full transition-all duration-500 px-4 sm:px-6",
              scrolled
                ? "glass-strong py-2.5"
                : "bg-transparent py-3",
            )}
          >
            {/* Logo */}
            <button
              onClick={() => goTo("home")}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-secondary/30 bg-white/90 p-1 transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src="/logo final.png"
                  alt="Victory Outreach"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span
                  className={cn(
                    "font-display font-bold text-base tracking-tight transition-colors duration-500",
                    scrolled ? "text-txt-main" : "text-white drop-shadow-md",
                  )}
                >
                  Victory Outreach
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.25em] mt-0.5 transition-colors duration-500",
                    scrolled ? "text-primary" : "text-primary/90",
                  )}
                >
                  Terre de Victoire · Lomé
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(item.id)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300",
                      scrolled ? "text-txt-main/80 hover:text-txt-main" : "text-white/90 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo("contact")}
                className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Nous Rejoindre
              </button>
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className={cn(
                  "md:hidden w-11 h-11 rounded-full flex items-center justify-center border transition-colors",
                  scrolled
                    ? "border-border text-txt-main"
                    : "border-white/30 text-white",
                )}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              className="absolute inset-0 bg-bg-inverse/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              style={{ background: "rgba(10,22,40,0.65)" }}
            />
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute top-24 left-4 right-4 glass-strong rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => goTo(item.id)}
                    className="text-left px-4 py-4 font-display text-2xl text-txt-main hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="text-primary text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </motion.button>
                ))}
                <button
                  onClick={() => goTo("contact")}
                  className="btn-gold mt-4 px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-wider"
                >
                  Nous Rejoindre
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
