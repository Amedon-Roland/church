"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

const POSTS = [
  {
    category: "Relation",
    title: "La meilleure façon d'inspirer les autres",
    author: "Mathew Johnson",
    date: "13 Mai 2026",
    description:
      "Comment être un témoin authentique sans imposer, sans juger, juste en aimant.",
  },
  {
    category: "Compassion",
    title: "Comment incarner la compassion au quotidien",
    author: "Mathew Johnson",
    date: "20 Mai 2026",
    description:
      "Des gestes simples qui changent une vie. Trois pistes pratiques à essayer cette semaine.",
  },
  {
    category: "Finance",
    title: "Le but biblique de l'argent",
    author: "Mathew Johnson",
    date: "27 Mai 2026",
    description:
      "Au-delà des tabous, une vision libératrice du rapport à l'argent et à la générosité.",
  },
  {
    category: "Famille",
    title: "Construire un foyer enraciné",
    author: "Mathew Johnson",
    date: "03 Juin 2026",
    description:
      "Quatre piliers pour bâtir une famille solide, malgré les vents contraires.",
  },
  {
    category: "Discipulat",
    title: "Ce que signifie être disciple",
    author: "Mathew Johnson",
    date: "10 Juin 2026",
    description:
      "Au-delà du dimanche : la marche quotidienne, les questions difficiles, les choix concrets.",
  },
  {
    category: "Foi",
    title: "Croire quand tout semble bloqué",
    author: "Mathew Johnson",
    date: "17 Juin 2026",
    description:
      "Quand la foi devient un acte de résistance silencieuse face à la fatigue.",
  },
  {
    category: "Culture",
    title: "L'église à l'ère du numérique",
    author: "Mathew Johnson",
    date: "24 Juin 2026",
    description:
      "Comment rester profondément humains dans un monde toujours plus connecté.",
  },
];

export default function BlogList() {
  return (
    <section className="relative py-28 lg:py-36 bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                Tous les articles
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
                Explorez nos{" "}
                <span className="font-display-italic text-gradient-gold">écrits</span>.
              </h2>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative h-full bg-card rounded-3xl p-7 border border-border overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {post.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-txt-faint group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                </div>

                <Link href="/blog/single-post" className="block">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-txt-main leading-tight mb-4 group-hover:text-primary transition-colors text-balance">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-txt-muted text-sm leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>

                <div className="flex items-center justify-between text-xs text-txt-faint pt-4 border-t border-border">
                  <span className="font-semibold text-txt-muted">{post.author}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
