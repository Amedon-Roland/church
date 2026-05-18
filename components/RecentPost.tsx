"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecentPost() {
  return (
    <section className="relative py-20 lg:py-28 bg-app overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
              Article à la une
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="relative bg-card rounded-3xl border border-border overflow-hidden group"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
                  alt="Article à la une"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-inverse/20 lg:to-card/60" />

                <div className="absolute top-6 left-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold px-3 py-1.5 rounded-full glass-dark text-primary">
                    Méditation
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-txt-faint">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Mardi 13 Mai 2026
                  </span>
                  <span className="w-1 h-1 rounded-full bg-txt-faint" />
                  <span className="inline-flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-primary" />
                    Pasteur Kim Bowen
                  </span>
                </div>

                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-txt-main mb-6 leading-tight text-balance">
                  L'oracle qu'il a reçu en silence{" "}
                  <span className="font-display-italic text-gradient-gold">a tout changé</span>.
                </h2>

                <p className="text-txt-muted mb-8 leading-relaxed text-pretty">
                  Une méditation sur ces moments où Dieu parle dans le silence,
                  quand le bruit du monde s'éteint enfin pour laisser place à
                  l'essentiel.
                </p>

                <div>
                  <Link href="/blog/single-post">
                    <Button variant="gold" withArrow>
                      Lire l'article
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </FadeIn>
      </div>
    </section>
  );
}
