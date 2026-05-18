"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export default function QuoteSection() {
  return (
    <section
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{ background: "var(--bg-inverse)" }}
    >
      {/* Aurora background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(30,58,138,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(212,165,116,0.25) 0%, transparent 50%)",
        }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          {/* Large decorative quote mark */}
          <div className="flex justify-center mb-8">
            <span
              className="font-display text-[120px] md:text-[180px] leading-none text-primary opacity-30"
              aria-hidden="true"
            >
              "
            </span>
          </div>

          <blockquote className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-10 text-balance">
            Nous voulons{" "}
            <span className="font-display-italic text-gradient-gold">servir</span> le monde qui nous entoure, et porter la lumière là où elle manque le plus.
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-12 bg-primary/60" />
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
              Notre mission
            </p>
            <span className="h-px w-12 bg-primary/60" />
          </div>

          <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed mb-12">
            Partager l'amour de Dieu avec notre communauté et au-delà, en servant avec compassion et dévouement.
          </p>

          <Button variant="gold" size="lg" withArrow>
            Découvrir nos actions
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
