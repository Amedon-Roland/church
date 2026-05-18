"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useState } from "react";

const fieldClass = (focused: boolean) =>
  `w-full px-5 py-4 rounded-2xl bg-card text-txt-main placeholder:text-txt-faint border outline-none transition-all duration-300 ${
    focused
      ? "border-primary shadow-[0_0_0_4px_rgba(212,165,116,0.15)]"
      : "border-border hover:border-primary/50"
  }`;

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <>
      <section className="relative py-24 lg:py-32 bg-app overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <FadeIn direction="right" className="lg:col-span-7">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary" />
                  Formulaire
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-txt-main leading-[1.1] tracking-tight mb-10 text-balance">
                  Écrivez-nous un{" "}
                  <span className="font-display-italic text-gradient-gold">mot</span>.
                </h2>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={fieldClass(focused === "name")}
                    />
                    <input
                      type="email"
                      placeholder="Votre adresse e-mail"
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={fieldClass(focused === "email")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Sujet de votre message"
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className={fieldClass(focused === "subject")}
                  />
                  <textarea
                    placeholder="Votre message…"
                    rows={6}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`${fieldClass(focused === "message")} resize-none`}
                  />
                  <div className="pt-2">
                    <Button type="submit" variant="gold" size="lg" withArrow>
                      Envoyer le message
                    </Button>
                  </div>
                </form>
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn direction="left" delay={0.15} className="lg:col-span-5">
              <div className="bg-card rounded-3xl border border-border p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative space-y-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-3">
                      Adresse
                    </p>
                    <h4 className="font-display font-bold text-xl text-txt-main mb-1">
                      Victory Outreach Ministry
                    </h4>
                    <p className="text-txt-muted text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Lomé, Togo
                    </p>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-border">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold">
                      Contact direct
                    </p>
                    <a
                      href="tel:+22890000000"
                      className="flex items-center gap-3 text-txt-main hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary group-hover:text-bg-inverse transition-colors">
                        <Phone className="w-4 h-4 text-primary group-hover:text-bg-inverse" />
                      </div>
                      <span className="font-medium">(+228) 90 00 00 00</span>
                    </a>
                    <a
                      href="mailto:info@victoryoutreach.tg"
                      className="flex items-center gap-3 text-txt-main hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Mail className="w-4 h-4 text-primary group-hover:text-bg-inverse" />
                      </div>
                      <span className="font-medium">info@victoryoutreach.tg</span>
                    </a>
                  </div>

                  <div className="pt-8 border-t border-border">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
                      Suivez-nous
                    </p>
                    <div className="flex gap-3">
                      <motion.a
                        href="https://www.facebook.com/profile.php?id=100064183954039"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Facebook"
                        className="w-12 h-12 rounded-full bg-subtle border border-border hover:border-[#1877F2] hover:bg-[#1877F2] flex items-center justify-center text-txt-main hover:text-white transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href="https://youtube.com/@egliseterredevictoiretogo?si=M5hTf8637N7HLKAj"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="YouTube"
                        className="w-12 h-12 rounded-full bg-subtle border border-border hover:border-[#FF0000] hover:bg-[#FF0000] flex items-center justify-center text-txt-main hover:text-white transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative py-20 lg:py-28 bg-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-primary" />
                Localisation
                <span className="h-px w-10 bg-primary" />
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-txt-main leading-[1.1] tracking-tight mb-4">
                Venez nous{" "}
                <span className="font-display-italic text-gradient-gold">rencontrer</span>.
              </h2>
              <p className="text-txt-muted max-w-xl mx-auto leading-relaxed">
                Notre porte est grande ouverte chaque dimanche, et chaque jour de la semaine.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-border shadow-2xl"
            >
              <iframe
                title="Localisation Victory Outreach"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9376237434596!2d1.2113!3d6.1319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnNTQuOCJOIDHCsDEyJzQwLjciRQ!5e0!3m2!1sfr!2stg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary rounded-tl-2xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary rounded-bl-2xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary rounded-br-2xl pointer-events-none" />
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
