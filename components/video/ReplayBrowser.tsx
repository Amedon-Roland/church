"use client";

import { Countdown } from "@/components/ui/Countdown";
import { formatDate, formatFull, formatViews } from "@/lib/format";
import type { Video } from "@/lib/youtube";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { LiteYouTube } from "./LiteYouTube";

type Props = {
  live: Video | null;
  upcoming: Video | null;
  videos: Video[];
  channelUrl: string;
  next: { title: string; at: string } | null;
};

const FILTERS = [
  ["all", "Tout"],
  ["replay", "Cultes & directs"],
  ["video", "Autres vidéos"],
] as const;

export function ReplayBrowser({ live, upcoming, videos, channelUrl, next }: Props) {
  // Lien partagé : /direct?v=<id> (lu dans l'URL, sans décalage d'hydratation)
  const fromUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("v"),
    () => null,
  );
  const [picked, setSelected] = useState<Video | null>(null);
  const selected = picked ?? [live, ...videos].find((v) => v && v.id === fromUrl) ?? live ?? videos[0] ?? null;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number][0]>("all");
  const [limit, setLimit] = useState(12);
  const player = useRef<HTMLDivElement>(null);

  const hasKinds = videos.some((v) => v.kind === "replay") && videos.some((v) => v.kind === "video");
  const filtered = useMemo(() => {
    const q = query
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
    return videos.filter(
      (v) =>
        (filter === "all" || v.kind === filter) &&
        (!q ||
          v.title
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .toLowerCase()
            .includes(q)),
    );
  }, [videos, query, filter]);

  function play(v: Video) {
    setSelected(v);
    window.history.replaceState(null, "", `/direct?v=${v.id}`);
    player.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="on-dark bg-night pb-16 pt-8 text-paper sm:pt-12 lg:pb-20">
        <div ref={player} className="container-x scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:gap-10">
            <div>
              {selected ? (
                <LiteYouTube key={selected.id} id={selected.id} title={selected.title} thumbnail={selected.thumbnail} live={selected.kind === "live"} priority />
              ) : (
                <div className="grid aspect-video place-items-center rounded-2xl border border-paper/10 bg-paper/[0.03] p-6 text-center">
                  <div>
                    <p className="font-serif text-2xl text-paper sm:text-3xl">Nos cultes sont sur YouTube</p>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-paper/60">La liste des vidéos se charge automatiquement ici. En attendant, retrouvez tous nos directs sur la chaîne.</p>
                    <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-5">
                      Ouvrir la chaîne YouTube
                    </a>
                  </div>
                </div>
              )}
              {selected && (
                <div className="mt-5">
                  <h2 className="text-2xl leading-snug sm:text-3xl">{selected.title}</h2>
                  <p className="mt-2 text-sm text-paper/55">
                    {selected.kind === "live" ? "En direct maintenant" : formatDate(selected.publishedAt)}
                    {selected.kind !== "live" && selected.views !== undefined && ` · ${formatViews(selected.views)}`}
                  </p>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              {live ? (
                <div className="rounded-2xl bg-live p-6">
                  <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <span className="h-2.5 w-2.5 rounded-full bg-white animate-live" /> En direct
                  </p>
                  <p className="mt-3 font-serif text-2xl leading-snug">{live.title}</p>
                  {selected?.id !== live.id && (
                    <button type="button" onClick={() => play(live)} className="btn mt-5 bg-white text-live">
                      Rejoindre le direct
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-6">
                  <p className="kicker">Prochain direct</p>
                  {upcoming ? (
                    <>
                      <p className="mt-3 font-serif text-2xl leading-snug">{upcoming.title}</p>
                      {upcoming.scheduledAt && <p className="mt-1 text-sm text-paper/60">{formatFull(upcoming.scheduledAt)}</p>}
                      {upcoming.scheduledAt && (
                        <div className="mt-5">
                          <Countdown target={upcoming.scheduledAt} tone="dark" />
                        </div>
                      )}
                    </>
                  ) : next ? (
                    <>
                      <p className="mt-3 font-serif text-2xl leading-snug">{next.title}</p>
                      <p className="mt-1 text-sm text-paper/60">{formatFull(next.at)}</p>
                      <div className="mt-5">
                        <Countdown target={next.at} tone="dark" />
                      </div>
                    </>
                  ) : null}
                </div>
              )}
              <a
                href={`${channelUrl}${channelUrl.includes("?") ? "&" : "?"}sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-paper/10 p-5 transition-colors hover:border-gold"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-night">
                  <Bell className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">Ne ratez plus un direct</span>
                  <span className="block text-sm text-paper/60">Abonnez-vous et activez la cloche sur YouTube.</span>
                </span>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="py-14 lg:py-20" data-guide="Cherchez un titre de prédication dans la barre de recherche.">
          <div className="container-x">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker">Rediffusions</p>
                <h2 className="mt-3 text-4xl text-ink">Tous les cultes et vidéos</h2>
              </div>
              <label className="relative block w-full sm:w-72">
                <span className="sr-only">Rechercher une vidéo</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un message…"
                  className="w-full rounded-full border border-line bg-card py-3 pl-11 pr-4 text-ink focus:border-royal focus:outline-none"
                />
              </label>
            </div>
            {hasKinds && (
              <div className="mt-6 flex flex-wrap gap-2">
                {FILTERS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium ${filter === value ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, limit).map((v) => (
                <li key={v.id}>
                  <button type="button" onClick={() => play(v)} className="group block w-full text-left" aria-current={selected?.id === v.id}>
                    <span className="relative block aspect-video overflow-hidden rounded-xl bg-linen">
                      <Image src={v.thumbnail} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      {selected?.id === v.id && <span className="absolute inset-0 grid place-items-center bg-night/60 text-sm font-semibold text-paper">En lecture</span>}
                      {v.kind === "replay" && <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-paper">Rediffusion</span>}
                    </span>
                    <span className="mt-3 line-clamp-2 block font-serif text-xl leading-snug text-ink group-hover:text-royal">{v.title}</span>
                    <span className="mt-1 block text-sm text-ink-mute">
                      {formatDate(v.publishedAt)}
                      {v.views !== undefined && ` · ${formatViews(v.views)}`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && <p className="mt-10 text-ink-mute">Aucune vidéo ne correspond à « {query} ».</p>}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {filtered.length > limit && (
                <button type="button" onClick={() => setLimit((l) => l + 12)} className="btn btn-line text-ink">
                  Voir plus de vidéos
                </button>
              )}
              <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Toute la chaîne YouTube
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
