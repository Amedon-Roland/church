import { socialLinks } from "@/components/ui/BrandIcons";
import { NAV, type Settings } from "@/lib/site";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer({ settings }: { settings: Settings }) {
  const socials = socialLinks(settings.socials);
  return (
    <footer className="on-dark relative overflow-hidden bg-night text-paper/80">
      <div className="container-x relative pb-10 pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image src="/images/logo.webp" alt="" width={64} height={64} className="h-16 w-16 rounded-full ring-1 ring-gold/40" />
              <div>
                <p className="font-serif text-2xl text-paper">Terre de Victoire</p>
                <p className="text-xs uppercase tracking-[0.2em] text-paper/50">{settings.churchName}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-snug text-paper/90">
              « Apporter la paix et la joie au monde, une vie à la fois. »
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {socials.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-paper/15 text-paper/80 transition-colors hover:border-gold hover:bg-gold hover:text-night"
                      aria-label={`${label} (nouvelle fenêtre)`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="kicker mb-5">Explorer</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5">Nos rendez-vous</p>
            <ul className="space-y-3">
              {settings.services.map((s) => (
                <li key={s.day + s.time}>
                  <p className="text-paper">{s.title}</p>
                  <p className="text-sm text-paper/55">
                    {s.day} · {s.time.replace(":", "h")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5">Nous écrire, nous trouver</p>
            <ul className="space-y-3.5 text-paper/80">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <Link href="/nous-trouver" className="link-draw hover:text-paper">
                  {settings.address}
                </Link>
              </li>
              {settings.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-draw hover:text-paper">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <a href={`mailto:${settings.email}`} className="link-draw break-all hover:text-paper">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
            <Link href="/nous-trouver#ecrire" className="btn btn-gold mt-6">
              Nous envoyer un message
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.churchName} — Filiale de Lomé.
          </p>
          <p>
            Textes bibliques : Louis Segond 1910. <Link href="/admin" className="link-draw hover:text-paper/80">Espace équipe</Link>
          </p>
        </div>
      </div>
      {/* Grande croix en filigrane, reprise du logo */}
      <svg aria-hidden viewBox="0 0 100 140" className="pointer-events-none absolute -right-10 -top-6 h-[26rem] w-auto text-paper/[0.035] lg:right-10">
        <path d="M42 0h16v38h42v16H58v86H42V54H0V38h42z" fill="currentColor" />
      </svg>
    </footer>
  );
}
