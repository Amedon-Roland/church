import "server-only";

// Lives et rediffusions de la chaîne YouTube de l'église.
//
// Deux modes :
// 1. Avec YOUTUBE_API_KEY (recommandé) : YouTube Data API v3, ~2 unités par
//    actualisation — largement dans le quota gratuit. Donne la distinction
//    direct / à venir / rediffusion de direct / vidéo.
// 2. Sans clé : flux RSS public de la chaîne (15 dernières vidéos) + lecture
//    de la page /live pour savoir si un direct est en cours.
//
// Tout est mis en cache par Next (revalidation courte pour le direct).

export type VideoKind = "live" | "upcoming" | "replay" | "video";

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  kind: VideoKind;
  scheduledAt?: string;
  views?: number;
};

export type ChannelFeed = {
  channelId: string | null;
  live: Video | null;
  upcoming: Video | null;
  videos: Video[];
  source: "api" | "rss" | "none";
};

const UA = { "User-Agent": "Mozilla/5.0 (compatible; TerreDeVictoireSite/1.0)", "Accept-Language": "fr" };
const API = "https://www.googleapis.com/youtube/v3";

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

export const thumb = (id: string, size: "hq" | "maxres" | "mq" = "hq") =>
  `https://i.ytimg.com/vi/${id}/${size}default.jpg`;

/** Extrait l'identifiant de chaîne (UC…) d'une page YouTube. */
export function parseChannelId(html: string) {
  return (
    html.match(/"externalId":"(UC[\w-]{22})"/)?.[1] ??
    html.match(/<meta itemprop="(?:identifier|channelId)" content="(UC[\w-]{22})"/)?.[1] ??
    html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/)?.[1] ??
    html.match(/"channelId":"(UC[\w-]{22})"/)?.[1] ??
    null
  );
}

/** Analyse le flux Atom public d'une chaîne. */
export function parseFeed(xml: string): Video[] {
  const entries = xml.split("<entry>").slice(1);
  return entries.map((entry) => {
    const pick = (re: RegExp) => decode(entry.match(re)?.[1] ?? "").trim();
    const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const views = Number(entry.match(/<media:statistics views="(\d+)"/)?.[1]);
    return {
      id,
      title: pick(/<title>([\s\S]*?)<\/title>/),
      description: pick(/<media:description>([\s\S]*?)<\/media:description>/),
      publishedAt: pick(/<published>([^<]+)<\/published>/),
      thumbnail: thumb(id),
      kind: "video" as VideoKind,
      views: Number.isFinite(views) ? views : undefined,
    };
  }).filter((v) => v.id);
}

/**
 * Analyse la page https://www.youtube.com/channel/<id>/live.
 * Quand la chaîne est en direct (ou a un direct programmé), YouTube y sert la page
 * de la vidéo ; sinon, la page de la chaîne.
 */
export function parseLivePage(html: string): { id: string; state: "live" | "upcoming"; scheduledAt?: string; title?: string } | null {
  const id =
    html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/)?.[1] ??
    html.match(/<meta property="og:url" content="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/)?.[1];
  if (!id) return null;
  const title = decode(html.match(/<meta name="title" content="([^"]*)"/)?.[1] ?? "") || undefined;
  if (/"isLiveNow":true/.test(html) || /"isLive":true/.test(html)) return { id, state: "live", title };
  const start = html.match(/"scheduledStartTime":"(\d+)"/)?.[1];
  if (start || /"isUpcoming":true/.test(html)) {
    return { id, state: "upcoming", title, scheduledAt: start ? new Date(Number(start) * 1000).toISOString() : undefined };
  }
  return null;
}

async function text(url: string, revalidate: number) {
  try {
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(5000), next: { revalidate, tags: ["youtube"] } });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

async function resolveChannelId(handle: string, override: string) {
  const fixed = process.env.YOUTUBE_CHANNEL_ID || override;
  if (/^UC[\w-]{22}$/.test(fixed)) return fixed;
  if (!handle) return null;
  const clean = handle.replace(/^https?:\/\/(www\.)?youtube\.com\//, "").replace(/^@?/, "@").split(/[/?]/)[0];
  const html = await text(`https://www.youtube.com/${clean}`, 86400);
  return html ? parseChannelId(html) : null;
}

type ApiVideo = {
  id: string;
  snippet: { title: string; description: string; publishedAt: string; liveBroadcastContent: string; thumbnails: Record<string, { url: string }> };
  liveStreamingDetails?: { actualStartTime?: string; actualEndTime?: string; scheduledStartTime?: string };
  statistics?: { viewCount?: string };
};

async function viaApi(channelId: string, key: string): Promise<ChannelFeed | null> {
  try {
    const uploads = "UU" + channelId.slice(2);
    const list = await fetch(`${API}/playlistItems?part=contentDetails&maxResults=30&playlistId=${uploads}&key=${key}`, {
      next: { revalidate: 120, tags: ["youtube"] },
    });
    if (!list.ok) return null;
    const ids = ((await list.json()).items ?? []).map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId);
    if (!ids.length) return { channelId, live: null, upcoming: null, videos: [], source: "api" };
    const res = await fetch(`${API}/videos?part=snippet,liveStreamingDetails,statistics&id=${ids.join(",")}&key=${key}`, {
      next: { revalidate: 120, tags: ["youtube"] },
    });
    if (!res.ok) return null;
    const items: ApiVideo[] = (await res.json()).items ?? [];
    const videos = items.map((v): Video => {
      const l = v.liveStreamingDetails;
      const kind: VideoKind =
        v.snippet.liveBroadcastContent === "live" ? "live" : v.snippet.liveBroadcastContent === "upcoming" ? "upcoming" : l?.actualEndTime ? "replay" : "video";
      return {
        id: v.id,
        title: v.snippet.title,
        description: v.snippet.description,
        publishedAt: l?.actualStartTime ?? v.snippet.publishedAt,
        thumbnail: v.snippet.thumbnails.maxres?.url ?? v.snippet.thumbnails.high?.url ?? thumb(v.id),
        kind,
        scheduledAt: l?.scheduledStartTime,
        views: v.statistics?.viewCount ? Number(v.statistics.viewCount) : undefined,
      };
    });
    return {
      channelId,
      live: videos.find((v) => v.kind === "live") ?? null,
      upcoming: videos.filter((v) => v.kind === "upcoming").sort((a, b) => (a.scheduledAt ?? "").localeCompare(b.scheduledAt ?? ""))[0] ?? null,
      videos: videos.filter((v) => v.kind === "replay" || v.kind === "video").sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
      source: "api",
    };
  } catch {
    return null;
  }
}

async function viaRss(channelId: string): Promise<ChannelFeed> {
  const [xml, liveHtml] = await Promise.all([
    text(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, 600),
    text(`https://www.youtube.com/channel/${channelId}/live`, 60),
  ]);
  const videos = xml ? parseFeed(xml) : [];
  const liveInfo = liveHtml ? parseLivePage(liveHtml) : null;
  const fromFeed = liveInfo && videos.find((v) => v.id === liveInfo.id);
  const liveVideo: Video | null = liveInfo
    ? {
        id: liveInfo.id,
        title: fromFeed?.title ?? liveInfo.title ?? "Culte en direct",
        description: fromFeed?.description ?? "",
        publishedAt: fromFeed?.publishedAt ?? new Date().toISOString(),
        thumbnail: thumb(liveInfo.id),
        kind: liveInfo.state,
        scheduledAt: liveInfo.scheduledAt,
      }
    : null;
  // Les rediffusions de direct se reconnaissent à leur titre dans le flux RSS.
  const tagged = videos
    .filter((v) => v.id !== liveVideo?.id)
    .map((v) => ({ ...v, kind: (/direct|live|culte|service/i.test(v.title) ? "replay" : "video") as VideoKind }));
  return {
    channelId,
    live: liveVideo?.kind === "live" ? liveVideo : null,
    upcoming: liveVideo?.kind === "upcoming" ? liveVideo : null,
    videos: tagged,
    source: "rss",
  };
}

export async function getChannelFeed(handle: string, channelIdOverride = ""): Promise<ChannelFeed> {
  const channelId = await resolveChannelId(handle, channelIdOverride);
  if (!channelId) return { channelId: null, live: null, upcoming: null, videos: [], source: "none" };
  const key = process.env.YOUTUBE_API_KEY;
  return (key && (await viaApi(channelId, key))) || viaRss(channelId);
}
