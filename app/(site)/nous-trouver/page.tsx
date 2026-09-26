import { ChurchMap } from "@/components/map/ChurchMap";
import { ContactForm } from "@/components/site/ContactForm";
import { PageIntro } from "@/components/site/PageIntro";
import { ServicesProgram } from "@/components/site/ServicesProgram";
import { socialLinks } from "@/components/ui/BrandIcons";
import { getSettings } from "@/lib/settings";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous trouver",
  description: "Plan interactif, itinéraire, horaires des cultes et formulaire de contact de l'église Terre de Victoire à Lomé.",
};

export default async function FindUsPage() {
  const settings = await getSettings();
  const socials = socialLinks(settings.socials);
  return (
    <>
      <PageIntro
        kicker="Nous trouver"
        title={
          <>
            Venez comme vous <em className="text-royal">êtes</em>.
          </>
        }
        lead="Que ce soit pour un culte, une question ou simplement parler à quelqu'un : la porte est ouverte."
      />

      <section className="py-14 lg:py-20" data-guide="Touchez « Où suis-je ? » pour voir la distance jusqu'à l'église.">
        <div className="container-x reveal">
          <ChurchMap lat={settings.lat} lng={settings.lng} address={settings.address} hint={settings.addressHint} />
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="reveal mb-8">
            <p className="kicker">Quand venir</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">Nos rendez-vous</h2>
          </div>
          <ServicesProgram services={settings.services} />
        </div>
      </section>

      <section id="ecrire" className="scroll-mt-24 bg-linen/70 py-20 lg:py-28" data-guide="Une question, un sujet de prière ? Écrivez-nous, on lit tout.">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="reveal">
            <p className="kicker">Nous écrire</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
              Une question ? Un fardeau ? <em className="text-royal">Écrivez-nous.</em>
            </h2>
            <p className="mt-5 text-ink-soft">Vos messages arrivent directement à l&apos;équipe. Les sujets de prière restent confidentiels.</p>
            <ul className="mt-8 space-y-3">
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-ink hover:text-royal">
                    <Phone className="h-4 w-4 text-gold-ink" /> {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 break-all text-ink hover:text-royal">
                    <Mail className="h-4 w-4 text-gold-ink" /> {settings.email}
                  </a>
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-ink-mute">Ou retrouvez-nous sur</p>
                <ul className="flex flex-wrap gap-2">
                  {socials.map(({ key, label, href, Icon }) => (
                    <li key={key}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:border-royal hover:text-royal">
                        <Icon className="h-4 w-4" /> {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="reveal relative" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
