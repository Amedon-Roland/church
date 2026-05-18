"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

export default function JoinSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Rejoignez-nous
              <span className="h-px w-10 bg-primary" />
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
              Faites partie de quelque chose{" "}
              <span className="font-display-italic text-gradient-gold">de grand</span>.
            </h2>
          </FadeIn>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info card */}
          <FadeIn direction="right" className="lg:col-span-5">
            <div className="h-full bg-card rounded-3xl p-8 lg:p-10 border border-border relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] uppercase tracking-[0.25em] font-semibold mb-6">
                  <Calendar className="w-3 h-3" />
                  Prochain culte
                </span>

                <h3 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-4 leading-tight">
                  Qui nous sommes & ce que nous croyons
                </h3>

                <p className="text-txt-muted mb-8 leading-relaxed">
                  Une église qui croit en la puissance transformatrice de l'évangile. Un lieu d'accueil, de croissance spirituelle et de service.
                </p>

                {/* Schedule grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">
                        Dimanche
                      </span>
                    </div>
                    <p className="font-display text-2xl font-bold text-txt-main">
                      10<span className="text-primary">:</span>00
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">
                        Mercredi
                      </span>
                    </div>
                    <p className="font-display text-2xl font-bold text-txt-main">
                      19<span className="text-primary">:</span>00
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary border-2 border-card flex items-center justify-center"
                      >
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-txt-muted">
                    <span className="font-semibold text-txt-main">200+</span> membres actifs
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-txt-muted mb-8">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Lomé, Togo</span>
                </div>

                <Button variant="gold" withArrow>
                  Planifier ma visite
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn direction="left" delay={0.15} className="lg:col-span-7">
            <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
                alt="Rejoignez-nous"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-bg-inverse/70 via-transparent to-transparent" />

              {/* Floating quote */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 max-w-md">
                <div className="glass-dark rounded-2xl p-6">
                  <p className="font-display-italic text-xl md:text-2xl text-white leading-snug mb-3">
                    « Là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux. »
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">
                    Matthieu 18:20
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
