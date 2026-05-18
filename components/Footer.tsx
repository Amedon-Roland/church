"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LINKS = {
  navigate: [
    { label: "Accueil", href: "/" },
    { label: "À Propos", href: "/about" },
    { label: "Sermons", href: "/sermon" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  community: [
    { label: "Cultes", href: "#" },
    { label: "Étude biblique", href: "#" },
    { label: "Groupes", href: "#" },
    { label: "Servir", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--bg-inverse)" }}
    >
      {/* Aurora background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(212,165,116,0.18) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(30,58,138,0.3) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative">
        {/* Top CTA strip */}
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-b border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-4">
                  Restons en contact
                </p>
                <h3 className="font-display font-bold text-3xl md:text-5xl text-white leading-[1.05] tracking-tight text-balance">
                  Recevez nos messages,{" "}
                  <span className="font-display-italic text-gradient-gold">directement</span>{" "}
                  dans votre boîte.
                </h3>
              </div>

              <form className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="flex-1 px-5 py-4 rounded-full bg-white/5 backdrop-blur-md text-white placeholder:text-white/40 border border-white/10 focus:border-primary outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="btn-gold px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  S'abonner
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>

        {/* Main grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            {/* Brand */}
            <FadeIn direction="up" className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 rounded-full bg-white/95 p-1.5 ring-1 ring-secondary/30">
                  <Image
                    src="/logo final.png"
                    alt="Victory Outreach"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="leading-none">
                  <p className="font-display font-bold text-xl text-white">
                    Victory Outreach
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary mt-1">
                    Terre de Victoire · Lomé
                  </p>
                </div>
              </div>

              <p className="text-white/65 leading-relaxed mb-8 max-w-md">
                Une communauté de foi à Lomé, animée par l'amour du Christ. Nous
                accueillons, formons et envoyons des disciples pour transformer
                le monde, un cœur à la fois.
              </p>

              {/* Contact */}
              <div className="space-y-3">
                <a
                  href="tel:+22890000000"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-primary transition-colors group"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>(+228) 90 00 00 00</span>
                </a>
                <a
                  href="mailto:info@victoryoutreach.tg"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@victoryoutreach.tg</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Lomé, Togo</span>
                </div>
              </div>
            </FadeIn>

            {/* Navigate */}
            <FadeIn direction="up" delay={0.1} className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-6">
                Naviguer
              </h4>
              <ul className="space-y-3">
                {LINKS.navigate.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Community */}
            <FadeIn direction="up" delay={0.15} className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-6">
                Communauté
              </h4>
              <ul className="space-y-3">
                {LINKS.community.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Social */}
            <FadeIn direction="up" delay={0.2} className="md:col-span-3">
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-6">
                Suivez-nous
              </h4>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Retrouvez chaque culte en direct et les coulisses de notre vie d'église.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.facebook.com/profile.php?id=100064183954039"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2] flex items-center justify-center text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@egliseterredevictoiretogo?si=M5hTf8637N7HLKAj"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  aria-label="YouTube"
                  className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FF0000] hover:bg-[#FF0000] flex items-center justify-center text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Giant brand watermark */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <p
            className="font-display font-bold text-white/[0.04] text-[18vw] leading-[0.85] tracking-tighter select-none pointer-events-none"
            aria-hidden="true"
          >
            Victory.
          </p>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} Victory Outreach Ministry International ·
              Filiale Lomé. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
