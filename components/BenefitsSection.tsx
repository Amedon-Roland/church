"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const BENEFITS = [
  {
    title: "Sermons en direct",
    subtitle: "Regardez & Écoutez",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
  },
  {
    title: "Notre communauté",
    subtitle: "Rejoignez-nous",
    image: "https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Musique & Louange",
    subtitle: "Adorez avec nous",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Temps de prière",
    subtitle: "Priez avec nous",
    image: "https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Nos activités
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight max-w-2xl text-balance">
              Découvrez tout ce que nous{" "}
              <span className="font-display-italic text-gradient-gold">offrons</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-txt-muted max-w-md leading-relaxed">
              Quatre expériences pour grandir, servir et célébrer ensemble. Choisissez par où commencer.
            </p>
          </FadeIn>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {BENEFITS.map((b, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-inverse via-bg-inverse/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {b.subtitle}
                  </p>
                  <h3 className="font-display text-2xl md:text-2xl font-bold text-white leading-tight mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {b.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Explorer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Gold accent corner */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
