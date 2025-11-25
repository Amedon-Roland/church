"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactHero() {
  return (
    <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/30" />
      </motion.div>

      {/* Animated connection lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Pulsing orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-[90px]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <FadeIn direction="down" delay={0.2}>
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Mail className="w-4 h-4 text-primary" />
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-bold drop-shadow-[0_0_10px_rgba(55,83,157,0.8)]">
              Contact
            </p>
            <Mail className="w-4 h-4 text-primary" />
          </motion.div>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif leading-tight uppercase">
            <span className="relative inline-block">
              CONTACTEZ
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-secondary/40 blur-2xl -z-10 animate-pulse" />
            </span>
            <br />
            NOTRE ÉGLISE
          </h1>
        </FadeIn>

        {/* Floating contact icons */}
        <FadeIn delay={0.6}>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { icon: Phone, delay: 0 },
              { icon: Mail, delay: 0.2 },
              { icon: MapPin, delay: 0.4 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl bg-white/10 p-4 rounded-full border border-white/20"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                }}
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                }}
              >
                <item.icon className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
