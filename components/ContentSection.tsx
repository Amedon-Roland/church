"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import Image from "next/image";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop",
    alt: "Communauté",
    offset: "translate-y-0",
    label: "Communauté",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    alt: "Prière",
    offset: "md:translate-y-12",
    label: "Prière",
  },
  {
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    alt: "Louange",
    offset: "translate-y-0",
    label: "Louange",
  },
];

export default function ContentSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — left aligned, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          <FadeIn className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Au quotidien
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight">
              Amour <span className="font-display-italic text-gradient-gold">&</span>{" "}
              Compassion.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <p className="text-txt-muted text-lg leading-relaxed mb-8 text-pretty">
              Nous sommes une communauté qui croit en l'amour de Dieu et la compassion envers tous. Notre mission est de partager l'évangile, de servir notre prochain et de faire grandir la foi de chacun dans un environnement accueillant.
            </p>
            <Button variant="ink" withArrow>
              Notre Histoire
            </Button>
          </FadeIn>
        </div>

        {/* Image grid with staggered offsets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className={`relative h-80 md:h-[420px] rounded-3xl overflow-hidden ${img.offset} group cursor-pointer`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/20 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                    Vivre
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {img.label}
                  </h3>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
