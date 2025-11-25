"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </motion.div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <FadeIn direction="down" delay={0.2}>
          <motion.p 
            className="text-white/90 uppercase tracking-[0.3em] text-sm mb-6 font-bold drop-shadow-md"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            À Propos
          </motion.p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif leading-tight uppercase">
            <span className="relative inline-block">
              AU SERVICE DU MONDE
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl -z-10 animate-pulse" />
            </span>
            <br />
            QUI NOUS ENTOURE
          </h1>
        </FadeIn>
        
        {/* Decorative line */}
        <FadeIn delay={0.6}>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg shadow-primary/50" />
        </FadeIn>
      </div>
    </div>
  );
}
