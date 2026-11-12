import { ReplayBrowser } from "@/components/video/ReplayBrowser";
import { getSettings, nextService } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cultes en direct et à revoir",
  description: "Suivez les cultes de Terre de Victoire en direct depuis Lomé, ou revoyez les prédications quand vous voulez.",
};

export default async function LivePage() {
  const settings = await getSettings();
  const feed = await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId);
  const next = nextService(settings.services);

  return (
    <>
      <div className="on-dark bg-night">
        <div className="container-x pt-12 sm:pt-16 lg:pt-20">
          <p className="kicker" data-reveal>
            En direct et à revoir
          </p>
          <h1 data-split="now" className="t-1 mt-6 max-w-4xl text-ink">
            {feed.live ? (
              <>
                Le culte a commencé. <em>Entrez.</em>
              </>
            ) : (
              <>
                Loin des yeux, pas <em>loin du cœur.</em>
              </>
            )}
          </h1>
          <p data-reveal className="lead mt-6 max-w-2xl">
            Malade, en voyage, ou à l&apos;autre bout du monde ? Suivez le culte d&apos;où vous êtes. Et revenez sur une prédication autant de fois
            qu&apos;il le faut.
          </p>
        </div>
      </div>
      <ReplayBrowser
        live={feed.live}
        upcoming={feed.upcoming}
        videos={feed.videos}
        channelUrl={settings.socials.youtube || `https://www.youtube.com/${settings.youtubeHandle}`}
        next={next ? { title: next.service.title, at: next.at.toISOString() } : null}
      />
    </>
  );
}
