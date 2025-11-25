"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

export default function MissionSection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop",
      alt: "Community",
      offset: "mt-0",
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
      alt: "Prayer",
      offset: "mt-0 md:-mt-8",
    },
    {
      src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
      alt: "Worship",
      offset: "mt-0",
    },
  ];

  return (
    <section className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="down">
          <div className="text-center mb-16">
            <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Bienvenue dans notre Église</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main mb-4">
              AMOUR ET COMPASSION
            </h2>
            <p className="text-txt-muted max-w-3xl mx-auto leading-relaxed mb-8">
              Nous sommes une communauté de foi dédiée à servir Dieu et notre prochain. Notre mission est de partager l'amour du Christ et de transformer des vies par l'évangile.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {images.map((image, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="up" fullWidth>
              <div className={`group relative h-80 rounded-2xl overflow-hidden ${image.offset}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-bold text-lg uppercase tracking-wide">{image.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn delay={0.2} direction="right">
            <div className="group">
              <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Notre Mission</p>
              <h3 className="text-2xl font-bold mb-4 uppercase font-serif group-hover:text-primary transition-colors">Œuvrer pour un meilleur lendemain</h3>
              <p className="text-txt-muted leading-relaxed">
                Notre mission est de répandre l'amour de Dieu dans notre communauté et au-delà, en servant avec compassion, en enseignant la Parole et en transformant des vies par la puissance de l'évangile.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} direction="left">
            <div className="group">
              <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Notre Vision</p>
              <h3 className="text-2xl font-bold mb-4 uppercase font-serif group-hover:text-primary transition-colors">Apporter la paix et la joie au monde</h3>
              <p className="text-txt-muted leading-relaxed">
                Nous aspirons à être une église qui fait la différence, où chacun trouve sa place, grandit dans la foi et découvre sa destinée en Christ pour impacter le monde.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
