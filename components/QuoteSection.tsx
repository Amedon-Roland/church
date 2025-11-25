"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="py-24 bg-app relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="absolute left-0 bottom-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <div className="flex justify-center mb-8 text-[var(--primary)] opacity-20">
            <Quote size={100} fill="currentColor" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main mb-8 relative z-10">
            NOUS VOULONS <br />
            SERVIR LE MONDE <br />
            QUI NOUS ENTOURE
          </h2>
          
          <p className="text-txt-muted max-w-3xl mx-auto mb-12 leading-relaxed relative z-10">
            Notre mission est de partager l'amour de Dieu avec notre communauté et au-delà, en servant avec compassion et dévouement.
          </p>
          
          <button className="bg-[var(--secondary)] text-white px-10 py-4 rounded-sm font-bold uppercase text-sm tracking-widest hover:bg-[var(--tertiary)] transition-all hover:scale-105 shadow-lg">
            Visitez Notre Boutique
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
