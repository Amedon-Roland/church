"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

const BENEFITS = [
  {
    n: "01",
    title: "Trouver épanouissement et joie",
    description:
      "Vivre la foi au cœur du quotidien, c'est découvrir une joie durable qui ne dépend pas des circonstances. Rejoignez une communauté qui célèbre, prie et grandit ensemble.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "Des valeurs partagées",
    description:
      "Amour, intégrité, service et générosité ne sont pas que des mots. Ce sont les fondations qui nous unissent et nous font avancer dans la même direction.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Événements caritatifs",
    description:
      "Tout au long de l'année, nous nous mobilisons pour ceux qui en ont le plus besoin. Chaque main qui se tend devient une bénédiction concrète pour Lomé.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "Tous sont les bienvenus",
    description:
      "Quel que soit votre parcours, vos doutes ou vos questions, il y a une place pour vous ici. La porte est grande ouverte, sans condition.",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function BenefitsList() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Pourquoi nous rejoindre
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
              Les bienfaits d'une{" "}
              <span className="font-display-italic text-gradient-gold">famille spirituelle</span>.
            </h2>
          </FadeIn>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {BENEFITS.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <FadeIn direction={i % 2 === 0 ? "right" : "left"} className="lg:col-span-7 [direction:ltr]">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-bg-inverse/40 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="font-display text-6xl font-bold text-white drop-shadow-2xl">
                      {item.n}
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction={i % 2 === 0 ? "left" : "right"} delay={0.15} className="lg:col-span-5 [direction:ltr]">
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
                  Bienfait {item.n}
                </p>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-6 leading-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-txt-muted leading-relaxed text-lg">
                  {item.description}
                </p>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
