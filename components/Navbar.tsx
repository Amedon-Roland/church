"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false); // Close mobile menu after click
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-app/50 backdrop-blur-xl shadow-lg border-border/20 py-0" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')} className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
              <div className="relative w-12 h-12">
                 <Image 
                   src="/logo final.png" 
                   alt="Victory Outreach Ministry Logo" 
                   fill 
                   className="object-contain"
                 />
              </div>
              <span className={cn(
                "font-serif font-bold text-lg md:text-xl tracking-wider hidden lg:block transition-colors duration-300",
                scrolled ? "text-[var(--tertiary)]" : "text-white drop-shadow-lg"
              )}>
                VICTORY OUTREACH MINISTRY
              </span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className={cn(
                "px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-300",
                scrolled 
                  ? "text-[var(--tertiary)] hover:text-[var(--primary)]" 
                  : "text-white hover:text-white/80 drop-shadow-md"
              )}>
                Accueil
              </button>
              <button onClick={() => scrollToSection('about')} className={cn(
                "px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-300",
                scrolled 
                  ? "text-[var(--tertiary)] hover:text-[var(--primary)]" 
                  : "text-white hover:text-white/80 drop-shadow-md"
              )}>
                À Propos
              </button>
              <button onClick={() => scrollToSection('sermon')} className={cn(
                "px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-300",
                scrolled 
                  ? "text-[var(--tertiary)] hover:text-[var(--primary)]" 
                  : "text-white hover:text-white/80 drop-shadow-md"
              )}>
                Sermons
              </button>
              <button onClick={() => scrollToSection('blog')} className={cn(
                "px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-300",
                scrolled 
                  ? "text-[var(--tertiary)] hover:text-[var(--primary)]" 
                  : "text-white hover:text-white/80 drop-shadow-md"
              )}>
                Blog
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollToSection('contact')} className="bg-[var(--primary)] text-white px-6 py-3 rounded-sm font-bold uppercase text-sm tracking-wider hover:bg-[var(--tertiary)] hover:text-white transition-colors inline-block shadow-lg">
              Contactez-Nous
            </button>
            <ThemeToggle />
          </div>
          <div className="-mr-2 flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300",
                scrolled 
                  ? "text-[var(--tertiary)] hover:text-[var(--primary)]" 
                  : "text-white hover:text-white/80"
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-app border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('home')} className="text-[var(--tertiary)] hover:text-[var(--primary)] block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest w-full text-left">
              Accueil
            </button>
            <button onClick={() => scrollToSection('about')} className="text-[var(--tertiary)] hover:text-[var(--primary)] block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest w-full text-left">
              À Propos
            </button>
            <button onClick={() => scrollToSection('sermon')} className="text-[var(--tertiary)] hover:text-[var(--primary)] block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest w-full text-left">
              Sermons
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-[var(--tertiary)] hover:text-[var(--primary)] block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest w-full text-left">
              Blog
            </button>
            <button onClick={() => scrollToSection('contact')} className="w-full text-left bg-[var(--primary)] text-white px-3 py-3 mt-4 rounded-sm font-bold uppercase text-sm tracking-wider hover:bg-[var(--tertiary)] hover:text-white transition-colors block text-center">
              Contactez-Nous
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
