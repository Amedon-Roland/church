import { getSettings } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";

export const revalidate = 60;

export async function GET() {
  const settings = await getSettings();
  const feed = await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId);
  return Response.json(
    {
      live: Boolean(feed.live),
      title: feed.live?.title,
      upcoming: feed.upcoming ? { title: feed.upcoming.title, scheduledAt: feed.upcoming.scheduledAt } : null,
    },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
  );
}
