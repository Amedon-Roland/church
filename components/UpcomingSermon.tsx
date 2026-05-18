"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function UpcomingSermon() {
  return (
    <section className="relative py-28 lg:py-36 bg-app overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Prochains sermons
              <span className="h-px w-10 bg-primary" />
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
              Faites partie de quelque chose{" "}
              <span className="font-display-italic text-gradient-gold">de grand</span>.
            </h2>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Info side */}
              <div className="w-full lg:w-2/5 p-8 lg:p-12 relative">
                {/* Date badge */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Événement à venir
                  </span>
                  <div className="text-right">
                    <p className="font-display text-5xl font-bold text-txt-main leading-none">
                      20
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mt-1">
                      Juillet
                    </p>
                  </div>
                </div>

                <h3 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-5 leading-tight">
                  Regardez et écoutez{" "}
                  <span className="font-display-italic text-gradient-gold">
                    nos sermons
                  </span>
                  .
                </h3>

                <p className="text-txt-muted mb-8 leading-relaxed">
                  Rejoignez-nous pour des messages puissants qui transforment
                  les vies et renforcent la foi.
                </p>

                {/* Time blocks */}
                <div className="grid grid-cols-2 gap-3 mb-8 pb-8 border-b border-border">
                  <div className="p-4 rounded-2xl bg-subtle border border-border">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">
                        Dimanche
                      </span>
                    </div>
                    <p className="font-display text-xl font-bold text-txt-main">
                      10<span className="text-primary">:</span>00
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-subtle border border-border">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">
                        Mercredi
                      </span>
                    </div>
                    <p className="font-display text-xl font-bold text-txt-main">
                      19<span className="text-primary">:</span>00
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-txt-muted mb-8">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Lomé, Togo</span>
                </div>

                <Button variant="gold" withArrow>
                  S'inscrire
                </Button>
              </div>

              {/* Image side */}
              <div className="relative w-full lg:w-3/5 min-h-[400px] lg:min-h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
                  alt="Prochain sermon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-inverse/40 via-transparent to-transparent" />

                {/* Floating play button */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 glass-dark rounded-2xl px-5 py-4 flex items-center gap-3 max-w-xs">
                  <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                      Streamé en direct
                    </p>
                    <p className="text-white text-sm font-medium mt-0.5">
                      Sur YouTube & Facebook
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="text-center mt-16">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-txt-main hover:text-primary transition-colors group"
          >
            <span className="uppercase tracking-wider">Voir tous les sermons</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
}
