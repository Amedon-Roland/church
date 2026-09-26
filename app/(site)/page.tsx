import { VerseCard } from "@/components/bible/VerseCard";
import { PostCard } from "@/components/blog/PostCard";
import { ServicesProgram } from "@/components/site/ServicesProgram";
import { Countdown } from "@/components/ui/Countdown";
import { Seal } from "@/components/ui/Seal";
import { LiteYouTube } from "@/components/video/LiteYouTube";
import { LiveBanner } from "@/components/video/LiveBanner";
import { verseOfTheDay } from "@/lib/bible/server";
import { formatDate, hour } from "@/lib/format";
import { listPosts } from "@/lib/posts";
import { getSettings, nextService } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

const VALUES = [
  { title: "Amour", text: "Avant les programmes, il y a des personnes. On apprend vos prénoms." },
  { title: "Intégrité", text: "Dire ce qu'on fait, faire ce qu'on dit — en chaire comme à la maison." },
  { title: "Service", text: "Chacun a une place pour servir : accueil, louange, enfants, technique…" },
  { title: "Générosité", text: "Donner de son temps, de son cœur et de ses biens, avec joie." },
];

export default async function HomePage() {
  const [settings, posts] = await Promise.all([getSettings(), listPosts()]);
  const feed = await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId);
  const next = nextService(settings.services);
  const verse = verseOfTheDay();
  const [latest, ...others] = feed.videos;
  const pastor = settings.leaders[0];

  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <section className="paper-grain relative overflow-hidden">
        <div className="container-x grid items-center gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pb-24 lg:pt-16">
          <div>
            <LiveBanner />
            <p className="kicker animate-rise">Église évangélique · Lomé, Togo</p>
            <h1 className="mt-5 animate-rise text-[2.9rem] leading-[1.02] text-ink [animation-delay:80ms] sm:text-6xl lg:text-[4.6rem]">
              Une terre où l&apos;on se <em className="text-royal">relève</em>.
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg text-ink-soft [animation-delay:160ms] sm:text-xl">
              Terre de Victoire est une famille de {settings.churchName} au cœur de Lomé. Ici, on ne vous demande pas d&apos;avoir tout compris ni tout réglé.
              Juste de venir comme vous êtes.
            </p>
            <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
              <Link href="/nous-trouver" className="btn btn-primary">
                Préparer ma visite <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/direct" className="btn btn-line text-ink">
                Regarder un culte
              </Link>
            </div>

            {next && (
              <div className="mt-10 max-w-xl animate-rise rounded-2xl border border-line bg-card/80 p-5 shadow-[var(--shadow-paper)] [animation-delay:320ms] sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div className="mb-4 sm:mb-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">Prochain rendez-vous</p>
                  <p className="mt-1 font-serif text-xl text-ink">{next.service.title}</p>
                  <p className="text-sm text-ink-mute">
                    {next.service.day} à {hour(next.service.time)}
                  </p>
                </div>
                <Countdown target={next.at.toISOString()} />
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
            <div className="mx-auto w-[82%] lg:w-[88%]">
              <Seal size={520} priority />
            </div>
            <p className="hand mt-2 -rotate-3 text-center text-[1.7rem] text-gold-ink sm:text-3xl lg:absolute lg:-bottom-6 lg:-left-10 lg:mt-0 lg:-rotate-6 lg:text-left">
              {settings.services[0] ? `${settings.services[0].day} ${hour(settings.services[0].time)},` : "Chaque semaine,"}
              <br />
              on vous garde une place
              <svg viewBox="0 0 80 40" className="ml-2 inline h-7 w-14 text-gold-ink" aria-hidden>
                <path d="M2 30 C 25 38, 50 30, 72 8 M60 8 L73 7 L71 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Programme ---------- */}
      <section className="bg-linen/70 py-20 lg:py-28" data-guide="Voici nos rendez-vous. Le bouton « Ajouter à mon agenda » vous évite d'oublier !">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="reveal">
            <p className="kicker">Cette semaine</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
              Trois rendez-vous, <em className="text-royal">une</em> famille.
            </h2>
            <p className="mt-5 max-w-md text-ink-soft">
              Le dimanche on célèbre, le mercredi on creuse la Parole, le vendredi on prie. Venez à un seul ou aux trois : la porte est la même.
            </p>
          </div>
          <ServicesProgram services={settings.services} />
        </div>
      </section>

      {/* ---------- Qui nous sommes ---------- */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.75rem] border border-gold/60" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-linen">
              <Image src={pastor?.photo || "/images/pasteur-1.jpg"} alt={pastor?.name ? `${pastor.name}, ${pastor.role}` : pastor?.role ?? "Notre pasteur"} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-[50%_20%]" />
            </div>
            <p className="hand absolute -left-2 bottom-8 -rotate-3 rounded-lg bg-card px-3 py-1 text-2xl text-royal shadow-[var(--shadow-paper)] sm:-left-8">
              {pastor?.name || pastor?.role || "Notre pasteur"}
            </p>
          </div>
          <div className="reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <p className="kicker">Qui nous sommes</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
              Apporter la paix et la joie au monde, <em className="text-royal">une vie à la fois</em>.
            </h2>
            <p className="mt-6 text-lg text-ink-soft">
              C&apos;est notre vision, et elle commence souvent petit : un sourire à l&apos;accueil, une prière pour votre famille, un frère ou une sœur qui prend
              de vos nouvelles dans la semaine. Nous croyons que l&apos;Évangile relève les gens — quel que soit leur passé.
            </p>
            <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div key={v.title} className="border-t border-line pt-4">
                  <dt className="font-serif text-xl text-ink">{v.title}</dt>
                  <dd className="mt-1 text-[0.95rem] text-ink-soft">{v.text}</dd>
                </div>
              ))}
            </dl>
            <Link href="/eglise" className="mt-8 inline-flex items-center gap-2 font-semibold text-royal">
              <span className="link-draw">Notre histoire, nos pasteurs, ce que nous croyons</span> <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Dernier culte ---------- */}
      <section className="on-dark bg-night py-20 text-paper lg:py-28" data-guide="Vous avez manqué dimanche ? Le culte est là, en rediffusion.">
        <div className="container-x">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">Direct & rediffusions</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">
                Le culte vient <em className="text-gold">à vous</em>.
              </h2>
            </div>
            <Link href="/direct" className="btn btn-line text-paper">
              Toutes les vidéos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {latest ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
              <div className="reveal">
                <LiteYouTube id={latest.id} title={latest.title} thumbnail={latest.thumbnail} />
                <p className="mt-3 text-sm text-paper/55">Publié le {formatDate(latest.publishedAt)}</p>
              </div>
              <ul className="grid content-start gap-4">
                {others.slice(0, 3).map((v, i) => (
                  <li key={v.id} className="reveal" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
                    <Link href={`/direct?v=${v.id}`} className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-paper/5">
                      <span className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-lg bg-paper/10 sm:w-40">
                        <Image src={v.thumbnail} alt="" fill sizes="10rem" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 font-serif text-lg leading-snug text-paper group-hover:text-gold">{v.title}</span>
                        <span className="mt-1 block text-xs text-paper/50">{formatDate(v.publishedAt)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="reveal mt-10 rounded-2xl border border-paper/10 p-8 text-paper/75">
              Nos cultes sont diffusés sur YouTube.{" "}
              <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline underline-offset-4">
                Ouvrir la chaîne
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Verset du jour ---------- */}
      <section className="py-20 lg:py-28" data-guide="Un verset par jour, le même pour toute la famille. Partagez-le !">
        <div className="container-x reveal">
          <VerseCard passage={verse} />
        </div>
      </section>

      {/* ---------- Blog ---------- */}
      {posts.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="container-x">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker">Le blog</p>
                <h2 className="mt-4 text-4xl text-ink sm:text-5xl">Des nouvelles de la famille</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-royal">
                <span className="link-draw">Tous les articles</span> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Venir ---------- */}
      <section className="pb-24">
        <div className="container-x">
          <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-royal px-6 py-12 text-paper sm:px-12 sm:py-16">
            <svg aria-hidden viewBox="0 0 400 200" className="absolute inset-0 h-full w-full text-paper/10" preserveAspectRatio="xMidYMid slice">
              <path d="M-10 150 C 80 120, 120 170, 210 130 S 330 60, 420 90" fill="none" stroke="currentColor" strokeWidth="14" />
              <path d="M40 -10 C 70 60, 60 120, 120 210" fill="none" stroke="currentColor" strokeWidth="8" />
              <path d="M260 -10 C 250 80, 300 120, 290 210" fill="none" stroke="currentColor" strokeWidth="6" />
              <path d="M-10 60 L 420 40" stroke="currentColor" strokeWidth="4" />
            </svg>
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="hand text-3xl text-gold-soft">Première fois ?</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">On a hâte de vous rencontrer.</h2>
                <p className="mt-4 flex items-start gap-2 text-paper/80">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /> {settings.address}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/nous-trouver" className="btn btn-gold">
                  <Navigation className="h-4 w-4" /> Voir le plan
                </Link>
                <Link href="/nous-trouver#ecrire" className="btn btn-line text-paper">
                  Nous écrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
