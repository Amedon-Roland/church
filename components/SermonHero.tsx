"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function SermonHero() {
  return (
    <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background with zoom animation */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-secondary/25 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-[90px]"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
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
            Sermons
          </motion.p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight uppercase mb-6">
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-white animate-gradient bg-[length:200%_auto]">
              PARTICIPEZ À
              <div className="absolute -inset-2 bg-gradient-to-r from-secondary/40 to-primary/40 blur-2xl -z-10" />
            </span>
            <br />
            <span className="text-white">NOS SERMONS</span>
          </h1>
        </FadeIn>

        {/* Decorative elements */}
        <FadeIn delay={0.6}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-secondary rounded-full shadow-lg shadow-secondary/50" />
            <div className="w-2 h-2 rounded-full bg-secondary shadow-lg shadow-secondary/80 animate-pulse" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary rounded-full shadow-lg shadow-secondary/50" />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
