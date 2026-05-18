"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

const EVENTS = [
  {
    day: "20",
    month: "Juillet",
    title: "100 actes de bonté",
    description: "Une journée d'action concrète pour transformer notre quartier, ensemble.",
  },
  {
    day: "27",
    month: "Juillet",
    title: "La foi est un chemin",
    description: "Un message sur la persévérance et la grâce dans le voyage spirituel.",
  },
  {
    day: "03",
    month: "Août",
    title: "Rien n'est impossible",
    description: "Découvrez comment Dieu agit là où tout semble bloqué.",
  },
  {
    day: "10",
    month: "Août",
    title: "Marcher dans la victoire",
    description: "Une série de messages pour vivre une foi pleine d'autorité et de paix.",
  },
];

export default function SermonEvents() {
  return (
    <section className="relative py-28 lg:py-36 bg-subtle overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                Calendrier
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight max-w-2xl text-balance">
                Tous les{" "}
                <span className="font-display-italic text-gradient-gold">événements</span>.
              </h2>
            </div>
            <p className="text-txt-muted max-w-md leading-relaxed">
              Quatre rendez-vous à venir pour grandir, servir et célébrer. Réservez votre place dès maintenant.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((event, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative h-full bg-card rounded-3xl border border-border overflow-hidden flex flex-col"
              >
                {/* Date header */}
                <div
                  className="relative px-6 py-8 text-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-grain opacity-50" />
                  <div className="relative">
                    <p className="font-display text-5xl font-bold text-white leading-none">
                      {event.day}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mt-2">
                      {event.month}
                    </p>
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-white/10" />
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-txt-main mb-3 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-txt-muted text-sm leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-xs text-txt-faint pb-4 mb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Vendredi · 19h00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>Lomé, Togo</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-between text-sm font-semibold text-txt-main hover:text-primary transition-colors"
                  >
                    <span className="uppercase tracking-wider text-xs">S'inscrire</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </button>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
