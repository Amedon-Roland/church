"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "REGARDEZ ET ÉCOUTEZ NOS SERMONS",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    },
    {
      title: "REJOIGNEZ NOTRE COMMUNAUTÉ",
      image: "https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "MUSIQUE ET LOUANGE",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "PRIEZ AVEC NOUS",
      image: "https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-subtle relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Nos Activités</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main">
              DÉCOUVREZ CE QUE NOUS OFFRONS
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" fullWidth>
              <div className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                    {benefit.title}
                  </h3>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
