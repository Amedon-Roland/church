import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageIntro } from "@/components/site/PageIntro";
import { getGallery } from "@/lib/gallery";
import { getSettings } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Galerie",
  description: "La vie de l'église Terre de Victoire en images : cultes, baptêmes, fêtes et moments partagés à Lomé.",
};

export default async function GalleryPage() {
  const [photos, settings] = await Promise.all([getGallery(), getSettings()]);
  const stills = photos.length ? [] : (await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId)).videos.slice(0, 9);

  return (
    <>
      <PageIntro
        kicker="Galerie"
        title={
          <>
            La famille, <em>en images.</em>
          </>
        }
        lead="Des dimanches de fête, des mains levées, des enfants qui courent entre les chaises. Voilà à quoi ressemble la vie chez nous."
      />

      <section className="section !pt-14">
        <div className="container-x">
          {photos.length > 0 ? (
            <div data-reveal>
              <GalleryGrid photos={photos} />
            </div>
          ) : (
            <>
              <div data-reveal className="card grid gap-6 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <h2 className="t-3 font-display font-semibold text-ink">Nos photos arrivent bientôt ici.</h2>
                  <p className="mt-3 max-w-xl text-ink-soft">
                    L&apos;équipe est en train de choisir les plus belles. En attendant, elles sont toutes sur notre page Facebook
                    {stills.length > 0 && ", et voici quelques images de nos derniers cultes"}.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {settings.socials.facebook && (
                    <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Voir nos photos sur Facebook <span className="sr-only">(s&apos;ouvre dans un nouvel onglet)</span>
                    </a>
                  )}
                </div>
              </div>
              {stills.length > 0 && (
                <ul data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {stills.map((v) => (
                    <li key={v.id}>
                      <Link href={`/direct?v=${v.id}`} className="group block rounded-[1.5rem]">
                        <span className="relative block aspect-video overflow-hidden rounded-[1.5rem] bg-linen">
                          <Image src={v.thumbnail} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
                        </span>
                        <span className="mt-3 line-clamp-2 block font-semibold text-ink transition-colors group-hover:text-accent">{v.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <div data-reveal className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
            <p className="t-3 max-w-xl font-display font-semibold text-ink">Il manque quelqu&apos;un sur ces photos : vous.</p>
            <Link href="/nous-trouver" className="btn btn-primary">
              Venir dimanche <ArrowRight aria-hidden className="arrow h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
