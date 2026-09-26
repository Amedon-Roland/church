import { ReplayBrowser } from "@/components/video/ReplayBrowser";
import { getSettings, nextService } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Direct & rediffusions",
  description: "Suivez les cultes de Terre de Victoire en direct depuis Lomé, ou revoyez les prédications en rediffusion.",
};

export default async function LivePage() {
  const settings = await getSettings();
  const feed = await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId);
  const next = nextService(settings.services);

  return (
    <>
      <div className="on-dark bg-night text-paper">
        <div className="container-x pt-10 sm:pt-14">
          <p className="kicker">Direct & rediffusions</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.04] sm:text-6xl">
            {feed.live ? (
              <>
                Nous sommes <em className="text-gold">en direct</em>.
              </>
            ) : (
              <>
                L&apos;église, même <em className="text-gold">à distance</em>.
              </>
            )}
          </h1>
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
