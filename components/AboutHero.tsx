"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div
      className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-inverse)" }}
    >
      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,13,28,0.65) 0%, rgba(7,13,28,0.5) 50%, rgba(7,13,28,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Aurora */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full blur-[100px] z-[1]"
        style={{ background: "rgba(107,138,255,0.2)" }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-semibold mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-primary/60" />
            À Propos
            <span className="h-px w-12 bg-primary/60" />
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Au service du monde{" "}
            <span className="font-display-italic text-gradient-gold">
              qui nous entoure
            </span>
            .
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            Notre histoire, notre mission, et les visages qui font vivre cette
            communauté chaque jour.
          </p>
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
