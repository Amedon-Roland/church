"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const TEAM = [
  {
    name: "Kim Bowen",
    role: "Pasteur Principal",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Danielle Watkins",
    role: "Pasteure Associée",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    name: "Naomi Craig",
    role: "Responsable Louange",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Santos Payne",
    role: "Diacre",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function TeamSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Notre équipe
              <span className="h-px w-10 bg-primary" />
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight text-balance">
              Des visages qui{" "}
              <span className="font-display-italic text-gradient-gold">inspirent</span>.
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-inverse/85 via-transparent to-transparent" />

                  {/* Socials */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    {[
                      { Icon: Facebook, label: "Facebook" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Linkedin, label: "LinkedIn" },
                    ].map(({ Icon, label }) => (
                      <button
                        type="button"
                        key={label}
                        aria-label={`${member.name} sur ${label}`}
                        className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white hover:text-primary transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                    {member.role}
                  </p>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-txt-main leading-tight">
                    {member.name}
                  </h3>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
