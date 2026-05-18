"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BlogHero() {
  return (
    <div className="relative h-[60vh] min-h-[480px] w-full flex items-center justify-center overflow-hidden bg-subtle">
      {/* Aurora */}
      <div className="absolute inset-0 bg-aurora opacity-70" />

      {/* Floating gold orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[40vw] h-[40vw] rounded-full blur-[120px]"
        style={{ background: "rgba(212,165,116,0.15)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-10 w-[35vw] h-[35vw] rounded-full blur-[100px]"
        style={{ background: "rgba(30,58,138,0.18)" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card border border-border">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-txt-main">
              Notre journal
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="font-display font-bold text-txt-main text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Réflexions, témoignages,{" "}
            <span className="font-display-italic text-gradient-gold">vie d'église</span>.
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 max-w-2xl mx-auto text-txt-muted text-lg leading-relaxed">
            Des articles pour nourrir votre foi, partager nos histoires et
            approfondir ce que nous croyons.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
