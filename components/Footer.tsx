"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#512b18] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <FadeIn delay={0} direction="up">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="relative w-10 h-10 bg-white rounded-full p-1">
                   <Image 
                     src="/logo final.png" 
                     alt="Victory Outreach Ministry Logo" 
                     fill 
                     className="object-contain p-1"
                   />
                 </div>
                 <span className="font-serif font-bold text-lg tracking-wider leading-tight">VICTORY OUTREACH</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                © COPYRIGHT VICTORY OUTREACH MINISTRY INTERNATIONAL FILIALE LOMÉ 2025
              </p>
              <div className="space-y-2 text-sm text-white/80">
                 <p>(+228) 90 00 00 00</p>
                 <p>Lomé, Togo</p>
                 <p>info@victoryoutreach.tg</p>
              </div>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Liens Rapides</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-[var(--primary)] transition-colors">À Propos</Link></li>
                <li><Link href="/sermon" className="hover:text-[var(--primary)] transition-colors">Sermons</Link></li>
                <li><Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </FadeIn>

          {/* Connect */}
          <FadeIn delay={0.2} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Suivez-Nous</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100064183954039" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#1877F2] transition-all duration-300 hover:scale-110 transform"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://youtube.com/@egliseterredevictoiretogo?si=M5hTf8637N7HLKAj" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#FF0000] transition-all duration-300 hover:scale-110 transform"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Subscribe */}
          <FadeIn delay={0.3} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">ABONNEZ-VOUS POUR RECEVOIR LES DERNIÈRES ACTUALITÉS</h4>
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="votreemail@gmail.com" 
                  className="bg-transparent border border-gray-700 rounded-sm px-4 py-3 text-sm focus:border-[var(--primary)] outline-none"
                />
                 <button className="bg-[var(--primary)] text-white font-bold uppercase text-sm tracking-wider py-3 rounded-sm hover:bg-white hover:text-[#512b18] transition-colors">
                  S'abonner
                </button>
              </form>
            </div>
          </FadeIn>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8 text-center text-white/60 text-xs">
          <p>&copy; {new Date().getFullYear()} Victory Outreach Ministry. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
