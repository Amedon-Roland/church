"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Compass, Target } from "lucide-react";
import Image from "next/image";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop",
    alt: "Communauté",
    offset: "translate-y-0",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    alt: "Prière",
    offset: "md:-translate-y-10",
  },
  {
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    alt: "Louange",
    offset: "translate-y-0",
  },
];

export default function MissionSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <FadeIn>
          <div className="max-w-3xl mb-20">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Bienvenue chez nous
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight mb-6 text-balance">
              Amour <span className="font-display-italic text-gradient-gold">&</span>{" "}
              Compassion.
            </h2>
            <p className="text-txt-muted text-lg leading-relaxed text-pretty">
              Nous sommes une communauté de foi dédiée à servir Dieu et notre
              prochain. Notre mission est de partager l'amour du Christ et de
              transformer des vies par l'évangile.
            </p>
          </div>
        </FadeIn>

        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {IMAGES.map((img, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                className={`group relative h-80 md:h-96 rounded-3xl overflow-hidden ${img.offset}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-inverse/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-1">
                    Notre vie
                  </p>
                  <p className="font-display text-2xl text-white font-bold">
                    {img.alt}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <FadeIn direction="right">
            <article className="relative h-full bg-card rounded-3xl p-8 lg:p-12 border border-border group hover:border-primary/50 transition-colors duration-500 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 text-primary mb-8">
                  <Target className="w-6 h-6" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
                  Notre Mission
                </p>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-6 leading-tight">
                  Œuvrer pour un{" "}
                  <span className="font-display-italic text-primary">
                    meilleur lendemain
                  </span>
                  .
                </h3>
                <p className="text-txt-muted leading-relaxed">
                  Répandre l'amour de Dieu dans notre communauté et au-delà, en
                  servant avec compassion, en enseignant la Parole et en
                  transformant des vies par la puissance de l'évangile.
                </p>
              </div>
            </article>
          </FadeIn>

          <FadeIn direction="left" delay={0.15}>
            <article className="relative h-full bg-card rounded-3xl p-8 lg:p-12 border border-border group hover:border-primary/50 transition-colors duration-500 overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 text-primary mb-8">
                  <Compass className="w-6 h-6" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
                  Notre Vision
                </p>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-6 leading-tight">
                  Apporter la{" "}
                  <span className="font-display-italic text-primary">
                    paix et la joie
                  </span>{" "}
                  au monde.
                </h3>
                <p className="text-txt-muted leading-relaxed">
                  Être une église qui fait la différence, où chacun trouve sa
                  place, grandit dans la foi et découvre sa destinée en Christ
                  pour impacter le monde.
                </p>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
