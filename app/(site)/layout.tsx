import { Mascot } from "@/components/mascot/Mascot";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a href="#contenu" className="sr-only z-50 rounded-full bg-royal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Aller au contenu
      </a>
      {settings.announcement && (
        <div className="bg-royal-deep text-center text-sm text-paper">
          <p className="container-x py-2">{settings.announcement}</p>
        </div>
      )}
      <Header services={settings.services.map(({ day, time, title }) => ({ day, time, title }))} />
      <main id="contenu">{children}</main>
      <Footer settings={settings} />
      <Mascot />
      <RevealObserver />
    </>
  );
}
