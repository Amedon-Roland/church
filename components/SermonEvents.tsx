"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export default function SermonEvents() {
  const events = [
    {
      day: "20",
      month: "JULY",
      title: "100 Random Acts of Kindness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gradient: "from-rose-500/20 to-pink-500/20",
      glowColor: "rgba(244, 63, 94, 0.3)",
    },
    {
      day: "20",
      month: "JULY",
      title: "Faith is a Process, Not a Destination",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      day: "20",
      month: "JULY",
      title: "There is Nothing Impossible",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gradient: "from-purple-500/20 to-violet-500/20",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      day: "20",
      month: "JULY",
      title: "Watch and Listen to our Sermons",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gradient: "from-amber-500/20 to-orange-500/20",
      glowColor: "rgba(245, 158, 11, 0.3)",
    },
  ];

  return (
    <section className="py-24 bg-app relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="down">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main uppercase mb-4">
              View All Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg shadow-primary/50" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" fullWidth>
              <motion.div 
                className="group bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-500 border border-border/50 rounded-2xl h-full relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  boxShadow: `0 10px 40px -10px ${event.glowColor}`,
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Date Badge */}
                <div className="relative bg-gradient-to-br from-primary to-primary-hover p-6 text-center">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-5xl font-bold text-white drop-shadow-lg">{event.day}</p>
                    <p className="text-xs uppercase tracking-widest text-white/80 mt-1">{event.month}</p>
                  </motion.div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>

                <div className="relative p-6 flex flex-col">
                  <h3 className="text-lg font-bold mb-3 uppercase leading-tight group-hover:text-primary transition-colors z-10">
                    {event.title}
                  </h3>
                  
                  <p className="text-txt-muted text-sm leading-relaxed mb-4 flex-grow z-10 group-hover:text-txt-main transition-colors">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-xs text-txt-muted z-10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Friday 23:39 IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Lomé, Togo</span>
                    </div>
                  </div>

                  {/* Button */}
                  <motion.button 
                    className="mt-6 w-full bg-gradient-to-r from-primary to-primary-hover text-white py-3 rounded-lg font-bold uppercase text-xs tracking-widest z-10 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: `0 0 20px ${event.glowColor}`,
                    }}
                  >
                    <span className="relative z-10">Register</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
                </div>

                {/* Corner glow */}
                <div 
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: event.glowColor }}
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
