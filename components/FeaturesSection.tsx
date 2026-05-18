"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { HandHeart, Heart, Users } from "lucide-react";

const FEATURES = [
  {
    n: "01",
    icon: Users,
    title: "À Propos de Nous",
    description:
      "Une communauté qui aime Dieu et qui aime les gens. Découvrez qui nous sommes et pourquoi nous croyons.",
  },
  {
    n: "02",
    icon: Heart,
    title: "Impliquez-Vous",
    description:
      "Des dizaines de façons de servir et de tisser des liens. Trouvez votre place et grandissez avec nous.",
  },
  {
    n: "03",
    icon: HandHeart,
    title: "Redonner",
    description:
      "Nous croyons en la générosité radicale. Voyez comment vos dons transforment des vies concrètement.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-aurora opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Notre ADN
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
              Une église <span className="font-display-italic text-gradient-ink">pertinente</span>,
              une famille <span className="font-display-italic">vivante</span>.
            </h2>
            <p className="mt-6 text-txt-muted text-lg leading-relaxed max-w-2xl text-pretty">
              Trois portes d'entrée pour vivre la foi avec nous : se connaître,
              s'engager, et faire la différence autour de soi.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.n} delay={i * 0.12} direction="up">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative h-full bg-card rounded-3xl p-8 lg:p-10 border border-border overflow-hidden"
              >
                {/* Gold accent line on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 rounded-r" />

                {/* Number */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-500 leading-none">
                    {f.n}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-bg-inverse text-primary flex items-center justify-center transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-bg-inverse" style={{ backgroundColor: "var(--bg-inverse)", color: "var(--secondary)" }}>
                    <f.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl md:text-3xl text-txt-main mb-4 leading-tight">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-txt-muted leading-relaxed text-[15px]">
                  {f.description}
                </p>

                {/* Read more link */}
                <div className="mt-8 flex items-center gap-2 text-primary text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="uppercase tracking-wider text-xs">En savoir plus</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-primary/5 group-hover:bg-primary/15 transition-colors duration-700" />
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
