"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-subtle">
      {/* Floating gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }}
      />

      <div className="text-center px-4 max-w-4xl mx-auto mt-20 relative z-10">
        <FadeIn direction="down" delay={0.2}>
          <motion.p 
            className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-6 font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Notre Blog
          </motion.p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight uppercase">
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-txt-main via-primary to-txt-main animate-gradient bg-[length:200%_auto]">
                ARTICLE LE PLUS
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10" />
            </span>
            <br />
            <span className="text-txt-main">RÉCENT</span>
          </h1>
        </FadeIn>

        {/* Animated divider */}
        <FadeIn delay={0.6}>
          <div className="flex items-center justify-center gap-2">
            <motion.div 
              className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex gap-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-secondary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
            </div>
            <motion.div 
              className="h-px w-20 bg-gradient-to-l from-transparent via-primary to-transparent"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
