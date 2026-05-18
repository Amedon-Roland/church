"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

const NEWS = [
  {
    category: "Communauté",
    title: "Regardez et écoutez nos sermons",
    date: "25 Juillet 2026",
    description:
      "Des messages inspirants qui transforment les vies au cœur de Lomé.",
  },
  {
    category: "Fraternité",
    title: "Événements et rassemblements",
    date: "28 Juillet 2026",
    description:
      "Participez à nos moments de fraternité et tissez des liens durables.",
  },
  {
    category: "Étude Biblique",
    title: "Approfondissez votre foi",
    date: "1er Août 2026",
    description:
      "Notre groupe hebdomadaire pour explorer la Parole ensemble.",
  },
  {
    category: "Mission",
    title: "Servez votre communauté",
    date: "5 Août 2026",
    description:
      "Découvrez comment faire la différence autour de vous, dès maintenant.",
  },
];

export default function NewsSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Actualités
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight max-w-2xl text-balance">
              Partager.{" "}
              <span className="font-display-italic text-gradient-gold">Inspirer.</span>{" "}
              Innover.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-txt-main hover:text-primary transition-colors group"
            >
              <span>Voir toutes les actualités</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS.map((n, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative h-full bg-card rounded-3xl p-7 border border-border overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Top gold line */}
                <span className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {n.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-txt-faint group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-txt-main leading-tight mb-4 group-hover:text-primary transition-colors">
                  {n.title}
                </h3>

                {/* Description */}
                <p className="text-txt-muted text-sm leading-relaxed mb-6 flex-grow">
                  {n.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-txt-faint pt-4 border-t border-border">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{n.date}</span>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
