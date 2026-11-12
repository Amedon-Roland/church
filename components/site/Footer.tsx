import { socialLinks } from "@/components/ui/BrandIcons";
import { Weave } from "@/components/ui/Weave";
import { hour } from "@/lib/format";
import { NAV, type Settings } from "@/lib/site";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer({ settings }: { settings: Settings }) {
  const socials = socialLinks(settings.socials);
  return (
    <footer className="on-dark relative overflow-hidden bg-night">
      <Weave height={14} />
      <div className="container-x relative pb-10 pt-20 lg:pt-28">
        {/* Dernier mot : une invitation, pas un slogan */}
        <div className="grid items-end gap-10 border-b border-line pb-16 lg:grid-cols-[1.6fr_1fr] lg:pb-20">
          <h2 data-split className="t-1 max-w-3xl text-ink">
            Il y a une chaise pour vous <em>dimanche.</em>
          </h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/nous-trouver" className="btn btn-gold">
              Venir nous voir <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/nous-trouver#ecrire" className="btn btn-line text-ink">
              Nous écrire
            </Link>
          </div>
        </div>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image src="/images/logo.webp" alt="" width={64} height={64} className="h-14 w-14 rounded-full ring-2 ring-gold/50" />
              <div>
                <p className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Terre de Victoire</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-mute">{settings.churchName}</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-ink-soft">Une famille à Lomé, qui croit que personne n&apos;est trop loin pour être relevé.</p>
            {socials.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {socials.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold hover:bg-gold hover:text-night"
                      aria-label={`${label} (s'ouvre dans un nouvel onglet)`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Pied de page">
            <p className="kicker mb-5">Le site</p>
            <ul className="-my-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-ink-soft hover:text-ink">
                    <span className="link-draw">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="kicker mb-5">On se retrouve</p>
            <ul className="space-y-3.5">
              {settings.services.map((s) => (
                <li key={s.day + s.time}>
                  <p className="font-semibold text-ink">
                    {s.day} · {hour(s.time)}
                  </p>
                  <p className="text-sm text-ink-mute">{s.title}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5">Nous joindre</p>
            <ul className="-my-1 text-ink-soft">
              <li className="flex min-h-11 items-center gap-3">
                <MapPin aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                <Link href="/nous-trouver" className="flex min-h-11 items-center hover:text-ink">
                  <span className="link-draw">{settings.address}</span>
                </Link>
              </li>
              {settings.phone && (
                <li className="flex min-h-11 items-center gap-3">
                  <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center hover:text-ink">
                    <span className="link-draw">{settings.phone}</span>
                  </a>
                </li>
              )}
              {settings.email && (
                <li className="flex min-h-11 items-center gap-3">
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                  <a href={`mailto:${settings.email}`} className="flex min-h-11 items-center break-all hover:text-ink">
                    <span className="link-draw">{settings.email}</span>
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-6 text-sm text-ink-mute">Un sujet de prière ? Il reste entre nous et Dieu.</p>
            <Link href="/nous-trouver?sujet=priere#ecrire" className="inline-flex min-h-11 items-center font-semibold text-gold">
              <span className="link-draw">Confier une prière</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-1 border-t border-line pt-4 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.churchName} — Lomé, Togo.
          </p>
          <p>
            Textes bibliques : Louis Segond 1910. ·{" "}
            <Link href="/admin" className="inline-flex min-h-11 items-center hover:text-ink">
              <span className="link-draw">Espace équipe</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
