"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { HandHeart, Heart, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "À PROPOS DE NOUS",
      description: "Nous sommes une communauté de croyants qui aiment Dieu et aiment les gens. Rejoignez-nous dans notre parcours de foi.",
      color: "from-blue-500/20 to-purple-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "IMPLIQUEZ-VOUS",
      description: "Il existe de nombreuses façons de servir et de se connecter. Trouvez un groupe ou un ministère qui correspond à votre passion.",
      color: "from-rose-500/20 to-pink-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]",
    },
    {
      icon: <HandHeart className="w-8 h-8 text-white" />,
      title: "REDONNER",
      description: "Nous croyons en la générosité et en l'aide aux personnes dans le besoin. Voyez comment nous faisons la différence.",
      color: "from-amber-500/20 to-orange-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]",
    },
  ];

  return (
    <section className="py-24 bg-app relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeIn direction="down">
            <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Notre ADN</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main mb-4">
              UNE ÉGLISE PERTINENTE
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg shadow-primary/50" />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="up" fullWidth>
              <motion.div 
                className={`group bg-card/80 backdrop-blur-xl p-10 text-center transition-all duration-500 border border-border/50 rounded-2xl relative overflow-hidden h-full ${feature.glow}`}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 shadow-lg shadow-primary/50" />
                
                {/* Floating icon container */}
                <motion.div 
                  className="relative bg-gradient-to-br from-primary to-primary-hover w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    boxShadow: "0 10px 40px -10px rgba(55, 83, 157, 0.5), 0 0 20px rgba(55, 83, 157, 0.3)",
                  }}
                >
                  {feature.icon}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/50 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                <h3 className="relative text-xl font-bold mb-4 uppercase tracking-wide group-hover:text-primary transition-colors z-10">
                  {feature.title}
                </h3>
                <p className="relative text-txt-muted leading-relaxed text-sm z-10 group-hover:text-txt-main transition-colors">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
