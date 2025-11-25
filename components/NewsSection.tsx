"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function NewsSection() {
  const news = [
    {
      category: "COMMUNAUTÉ",
      title: "REGARDEZ ET ÉCOUTEZ NOS SERMONS",
      date: "25 Juillet 2023",  
      description: "Rejoignez-nous pour des sermons inspirants qui transforment les vies.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      category: "FRATERNITÉ",
      title: "ÉVÉNEMENTS ET RASSEMBLEMENTS",
      date: "28 Juillet 2023",
      description: "Participez à nos événements de fraternité et tissez des liens solides.",
      gradient: "from-purple-500/20 to-pink-500/20",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      category: "ÉTUDE BIBLIQUE",
      title: "APPROFONDISSEZ VOTRE FOI",
      date: "1er Août 2023",
      description: "Rejoignez notre groupe d'étude biblique hebdomadaire.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    {
      category: "MISSION",
      title: "SERVEZ VOTRE COMMUNAUTÉ",
      date: "5 Août 2023",
      description: "Découvrez comment vous pouvez faire une différence autour de vous.",
      gradient: "from-amber-500/20 to-orange-500/20",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
  ];

  return (
    <section className="py-24 bg-app relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeIn direction="down">
            <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Nos Actualités</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main mb-4">
              PARTAGER, INSPIRER, INNOVER
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg shadow-primary/50" />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" fullWidth>
              <motion.div 
                className="group bg-card/80 backdrop-blur-xl p-8 transition-all duration-500 cursor-pointer border border-border/50 rounded-2xl hover:shadow-2xl h-full flex flex-col relative overflow-hidden"
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  boxShadow: `0 10px 40px -10px ${item.glowColor}`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
                
                {/* Category badge with glow */}
                <div className="relative z-10 mb-4">
                  <motion.span 
                    className="inline-block text-[var(--primary)] uppercase tracking-widest text-xs font-bold px-3 py-1 rounded-full border border-primary/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      boxShadow: `0 0 20px ${item.glowColor}`,
                    }}
                  >
                    {item.category}
                  </motion.span>
                </div>

                <h3 className="relative z-10 text-lg font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                
                <p className="relative z-10 text-gray-500 text-xs mb-4">{item.date}</p>
                
                <p className="relative z-10 text-txt-muted text-sm leading-relaxed mb-6 flex-grow group-hover:text-txt-main transition-colors">
                  {item.description}
                </p>
                
                <div className="relative z-10 mt-auto">
                  <motion.span 
                    className="text-xs font-bold uppercase tracking-widest border-l-4 border-[#512b18] pl-3 text-[#512b18] dark:text-white inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    Lire Plus
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </div>

                {/* Corner accent glow */}
                <div 
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: item.glowColor }}
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
