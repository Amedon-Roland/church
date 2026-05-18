"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactHero() {
  return (
    <div
      className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-inverse)" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,13,28,0.85) 0%, rgba(30,58,138,0.5) 50%, rgba(7,13,28,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Aurora */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-[30vw] h-[30vw] rounded-full blur-[120px] z-[1]"
        style={{ background: "rgba(107,138,255,0.2)" }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-semibold mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-primary/60" />
            Contact
            <span className="h-px w-12 bg-primary/60" />
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 text-balance">
            Disons-nous{" "}
            <span className="font-display-italic text-gradient-gold">bonjour</span>.
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed mb-12">
            Une question, un témoignage, ou juste envie d'échanger ? Nous serions ravis d'avoir de vos nouvelles.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Phone, label: "+228 90 00 00 00" },
              { icon: Mail, label: "info@victoryoutreach.tg" },
              { icon: MapPin, label: "Lomé, Togo" },
            ].map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                className="glass-dark rounded-full px-5 py-3 flex items-center gap-3"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm text-white font-medium">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-app))",
        }}
      />
    </div>
  );
}
