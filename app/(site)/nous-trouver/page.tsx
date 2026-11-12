import { ChurchMap } from "@/components/map/ChurchMap";
import { ContactForm } from "@/components/site/ContactForm";
import { PageIntro } from "@/components/site/PageIntro";
import { ServicesProgram } from "@/components/site/ServicesProgram";
import { socialLinks } from "@/components/ui/BrandIcons";
import { getSettings } from "@/lib/settings";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venir nous voir",
  description: "Le plan pour venir à Terre de Victoire à Lomé, l'itinéraire depuis chez vous, les horaires des cultes et un formulaire pour nous écrire ou confier une prière.",
};

export default async function FindUsPage() {
  const settings = await getSettings();
  const socials = socialLinks(settings.socials);
  return (
    <>
      <PageIntro
        kicker="Venir nous voir"
        title={
          <>
            La porte est <em>ouverte.</em>
          </>
        }
        lead="Pour un culte, pour une question, ou juste pour parler à quelqu'un : passez nous voir. On vous indique le chemin."
      />

      <section className="section !pb-0" data-guide="Touchez le bouton sur la carte pour voir à quelle distance vous êtes de l'église.">
        <div className="container-x" data-reveal>
          <ChurchMap lat={settings.lat} lng={settings.lng} address={settings.address} hint={settings.addressHint} />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="kicker" data-reveal>
              Quand venir
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              Choisissez <em>votre</em> jour.
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-soft">
              Pas besoin de prévenir ni de s&apos;inscrire. Si c&apos;est votre première fois, dites-le à l&apos;accueil : on prendra soin de vous.
            </p>
          </div>
          <ServicesProgram services={settings.services} />
        </div>
      </section>

      <section id="ecrire" className="section scroll-mt-20 bg-linen" data-guide="Une question, un sujet de prière ? Écrivez-nous, on lit tout.">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="kicker" data-reveal>
              Nous écrire
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              Une question ? Un poids sur le cœur ? <em>On vous lit.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-ink-soft">
              Votre message arrive directement à l&apos;équipe de l&apos;église, pas à une machine. Les sujets de prière restent confidentiels : ils ne
              sont partagés qu&apos;avec ceux qui prient.
            </p>
            <ul className="mt-8 space-y-1" data-reveal>
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-accent">
                    <Phone aria-hidden className="h-4 w-4 text-gold-ink" /> {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex min-h-11 items-center gap-3 break-all font-semibold text-ink hover:text-accent">
                    <Mail aria-hidden className="h-4 w-4 text-gold-ink" /> {settings.email}
                  </a>
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="mt-8" data-reveal>
                <p className="mb-3 text-sm font-semibold text-ink-mute">Vous préférez les réseaux ?</p>
                <ul className="flex flex-wrap gap-2">
                  {socials.map(({ key, label, href, Icon }) => (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (s'ouvre dans un nouvel onglet)`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
                      >
                        <Icon className="h-4 w-4" /> {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
