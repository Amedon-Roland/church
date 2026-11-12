import { Mascot } from "@/components/mascot/Mascot";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Aller directement au contenu
      </a>
      {settings.announcement && (
        <aside aria-label="Annonce" className="on-dark bg-night text-center text-sm font-medium text-ink">
          <p className="container-x py-2.5">{settings.announcement}</p>
        </aside>
      )}
      <Header services={settings.services.map(({ day, time, title }) => ({ day, time, title }))} />
      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} />
      <Mascot />
      <SmoothScroll />
      <ScrollFx />
    </>
  );
}
