"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Generate particles only on client side with fixed seed for consistency
  const particleCount = isMobile ? 5 : 15; // Reduced for mobile
  const particles = isMounted ? Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: (i * 7.3) % 100, // Deterministic values instead of Math.random()
    y: (i * 13.7) % 100,
    delay: (i * 0.3) % 5,
    duration: 15 + (i % 10),
  })) : [];

  return (
    <div ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>

      {/* Animated glowing orbs - only on desktop for performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      )}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <FadeIn direction="down" delay={0.2}>
          <motion.p 
            className="text-white/90 uppercase tracking-[0.3em] text-sm mb-6 font-bold drop-shadow-md"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Rejoignez Notre Famille
          </motion.p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-serif leading-tight">
            BIENVENUE À  <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-hover to-white animate-gradient bg-[length:200%_auto]">
                LA TERRE DE VICTOIRE
              </span>
              {/* Glow effect under text */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-secondary/50 blur-2xl -z-10 animate-pulse" />
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.6}>
          <motion.button 
            className="group relative bg-gradient-to-r from-primary to-primary-hover text-white px-12 py-5 rounded-lg font-bold uppercase text-sm tracking-widest overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: "0 0 40px rgba(55, 83, 157, 0.6), 0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              En Savoir Plus
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/50 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
          </motion.button>
        </FadeIn>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-10 z-10 hidden md:block"
      >
        <div className="backdrop-blur-xl bg-black/30 p-6 rounded-2xl border border-white/20 shadow-2xl">
          <div className="text-white/80 text-xs space-y-3 font-medium tracking-wide">
            <motion.p 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
              </span>
              Culte Dominical : 10h00
            </motion.p>
            <motion.p 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              Étude Biblique : Mer 19h00
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div 
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[2px] h-16 bg-gradient-to-b from-white/50 via-white to-transparent rounded-full shadow-lg shadow-white/30" />
          <p className="text-white/60 text-xs uppercase tracking-widest">Défiler</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
