"use client";

import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Clock, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => setMounted(true), []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-inverse"
      style={{ background: "var(--bg-inverse)" }}
    >
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop")',
          }}
        />
        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,13,28,0.85) 0%, rgba(7,13,28,0.55) 35%, rgba(7,13,28,0.75) 75%, rgba(7,13,28,0.95) 100%)",
          }}
        />
        {/* Color tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(30,58,138,0.45) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(212,165,116,0.25) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Aurora orbs */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px]"
            style={{ background: "rgba(107,138,255,0.18)" }}
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[15%] right-[10%] w-[45vw] h-[45vw] rounded-full blur-[140px]"
            style={{ background: "rgba(244,201,122,0.15)" }}
          />
        </div>
      )}

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain z-[2]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24"
      >
        <div className="flex flex-col items-center text-center">
          {/* Pre-title eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/40 bg-white/5 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-primary">
              La Terre de Victoire
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display font-bold text-white leading-[0.95] tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem]"
            >
              Bienvenue
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem]"
            >
              <span className="font-display-italic text-gradient-gold">à la</span>{" "}
              <span className="relative">
                Maison
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                  viewBox="0 0 280 12"
                  className="absolute -bottom-2 left-0 w-full h-2"
                  fill="none"
                >
                  <motion.path
                    d="M2 6 Q 70 1, 140 6 T 278 6"
                    stroke="rgb(244,201,122)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl text-white/75 text-base md:text-lg leading-relaxed mb-10 text-balance"
          >
            Une famille qui aime Dieu, qui aime les gens et qui croit que chaque
            histoire peut être transformée par la grâce.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button
              variant="gold"
              size="lg"
              withArrow
              onClick={() => {
                const el = document.getElementById("about");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Découvrir l'Église
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:border-primary hover:text-primary"
              onClick={() => {
                const el = document.getElementById("sermon");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Voir les Sermons
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Live status card — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 left-4 right-4 sm:left-8 sm:right-auto z-10 max-w-sm"
      >
        <div className="glass-dark rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-300 font-semibold">
              Cette semaine
            </span>
          </div>
          <div className="space-y-2.5 text-sm text-white/85">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Culte Dominical</p>
                <p className="text-xs text-white/55">Dimanche · 10h00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Étude Biblique</p>
                <p className="text-xs text-white/55">Mercredi · 19h00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-white/70">Lomé, Togo</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-app))",
        }}
      />
    </div>
  );
}
