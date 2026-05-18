"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function SermonHero() {
  return (
    <div
      className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-inverse)" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,13,28,0.7) 0%, rgba(7,13,28,0.45) 45%, rgba(7,13,28,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Spotlight orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] rounded-full blur-[120px] z-[1]"
        style={{ background: "rgba(244,201,122,0.18)" }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-dark">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping" />
              <span className="relative rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
              En direct chaque dimanche
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 text-balance">
            Participez à{" "}
            <span className="font-display-italic text-gradient-gold">nos sermons</span>.
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="max-w-2xl mx-auto text-white/75 text-lg leading-relaxed mb-10">
            Des messages enracinés dans la Parole, livrés avec passion. À voir,
            à écouter, à vivre.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-4 px-6 py-3 rounded-full glass-dark text-white hover:bg-primary/20 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-bg-inverse">
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider pr-4">
              Voir le dernier sermon
            </span>
          </motion.button>
        </FadeIn>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-app))",
        }}
      />
    </div>
  );
}
