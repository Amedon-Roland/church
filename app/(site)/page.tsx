import { VerseCard } from "@/components/bible/VerseCard";
import { PostCard } from "@/components/blog/PostCard";
import { GalleryStrip, type StripItem } from "@/components/gallery/GalleryStrip";
import { HeroArch } from "@/components/site/HeroArch";
import { ServicesProgram } from "@/components/site/ServicesProgram";
import { Countdown } from "@/components/ui/Countdown";
import { Weave } from "@/components/ui/Weave";
import { LiteYouTube } from "@/components/video/LiteYouTube";
import { LiveBanner } from "@/components/video/LiveBanner";
import { verseOfTheDay } from "@/lib/bible/server";
import { formatDate, hour } from "@/lib/format";
import { getGallery } from "@/lib/gallery";
import { listPosts } from "@/lib/posts";
import { getSettings, nextService } from "@/lib/settings";
import { getChannelFeed } from "@/lib/youtube";
import { ArrowRight, BookOpen, HeartHandshake, MapPin, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

const VALUES = [
  { title: "L'amour", text: "Avant les programmes, il y a des personnes. Ici, on retient votre prénom." },
  { title: "L'intégrité", text: "On dit ce qu'on fait, on fait ce qu'on dit. À l'église comme à la maison." },
  { title: "Le service", text: "Chacun a quelque chose à offrir : un sourire à l'entrée, une voix, deux mains." },
  { title: "La générosité", text: "Donner de son temps, de son écoute, de ce qu'on a — et le faire avec joie." },
];

const FIRST_TIME = [
  { title: "Vous arrivez", text: "Quelqu'un vous accueille à l'entrée et vous aide à trouver une place. Pas besoin de connaître qui que ce soit." },
  { title: "On célèbre ensemble", text: "On chante, on prie, on écoute la Parole. Vous participez autant que vous le souhaitez, ou vous écoutez simplement." },
  { title: "On fait connaissance", text: "À la fin, on prend le temps de se saluer. Si vous voulez parler à un pasteur ou qu'on prie pour vous, c'est le moment." },
];

export default async function HomePage() {
  const [settings, posts, photos] = await Promise.all([getSettings(), listPosts(), getGallery()]);
  const feed = await getChannelFeed(settings.youtubeHandle, settings.youtubeChannelId);
  const next = nextService(settings.services);
  const verse = verseOfTheDay();
  const [latest, ...others] = feed.videos;
  const pastor = settings.leaders[0];

  // La bande de photos : la galerie de l'église, sinon des images de nos cultes filmés.
  const strip: StripItem[] = photos.length
    ? photos.slice(0, 8).map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }))
    : feed.videos.slice(0, 6).map((v) => ({ src: v.thumbnail, alt: `Image du culte « ${v.title} »`, caption: v.title, remote: true }));

  const shortcuts = [
    { href: "/direct", Icon: PlayCircle, title: "Revoir le dernier culte", text: "Vous n'avez pas pu venir ? Il vous attend." },
    { href: "/bible", Icon: BookOpen, title: "Ouvrir la Bible", text: "Reprenez votre lecture là où vous l'aviez laissée." },
    { href: "/nous-trouver?sujet=priere#ecrire", Icon: HeartHandshake, title: "Confier une prière", text: "Dites-nous ce qui pèse. On prie, en toute discrétion." },
    { href: "/nous-trouver", Icon: MapPin, title: "Venir nous voir", text: "Le plan, l'itinéraire et les horaires." },
  ];

  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-x-10 gap-y-14 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.35fr_1fr] lg:pb-24 lg:pt-16">
          <div>
            <LiveBanner />
            <p className="kicker" data-reveal>
              Une église, une famille · Lomé, Togo
            </p>
            <h1 data-split="now" className="t-hero mt-6 text-ink">
              Ici, on se <em>relève.</em> Ensemble.
            </h1>
            <p data-reveal className="lead mt-8 max-w-xl">
              Vous n&apos;avez pas besoin d&apos;avoir tout compris, ni tout réglé dans votre vie. Venez comme vous êtes : on vous garde une place, et
              on avance ensemble.
            </p>
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <Link href="/nous-trouver" className="btn btn-primary">
                Je viens dimanche <ArrowRight aria-hidden className="arrow h-4 w-4" />
              </Link>
              <Link href="/direct" className="btn btn-line text-ink">
                <PlayCircle aria-hidden className="h-4 w-4" /> Regarder un culte
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none" data-reveal="scale">
            <HeroArch photo={photos[0]} />
            {next && (
              <div className="card relative z-10 mx-auto -mt-20 w-[92%] overflow-hidden lg:absolute lg:-bottom-10 lg:-left-16 lg:mt-0 lg:w-[22rem]">
                <Weave height={8} />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">On se retrouve bientôt</p>
                  <p className="mt-1.5 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                    {next.service.day} à {hour(next.service.time)}
                  </p>
                  <p className="text-sm text-ink-mute">{next.service.title}</p>
                  <div className="mt-4">
                    <Countdown target={next.at.toISOString()} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Raccourcis pour les fidèles ---------- */}
      <section aria-labelledby="raccourcis" className="pb-6 pt-10 lg:pt-20">
        <div className="container-x">
          <h2 id="raccourcis" className="sr-only">
            Accès rapides
          </h2>
          <ul data-reveal-group className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {shortcuts.map(({ href, Icon, title, text }) => (
              <li key={href}>
                <Link href={href} className="group flex h-full items-start gap-4 rounded-[1.5rem] border border-line bg-card p-5 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink hover:shadow-[var(--shadow-lift)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linen text-accent transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-ink">{title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug text-ink-soft">{text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Ce qui nous tient ensemble ---------- */}
      <section className="section overflow-hidden" data-guide="Voilà ce qui nous tient à cœur. Si ça vous parle, vous êtes déjà un peu des nôtres.">
        <div aria-hidden className="mb-14 select-none whitespace-nowrap font-display text-[18vw] font-bold leading-none tracking-[-0.06em] text-ink/[0.06] lg:mb-20 lg:text-[11vw]">
          <div data-drift="-22" className="w-max">
            Paix · Joie · Victoire · Paix · Joie · Victoire · Paix · Joie · Victoire
          </div>
        </div>
        <div className="container-x">
          <p className="kicker" data-reveal>
            Ce en quoi nous croyons
          </p>
          <p data-words className="t-1 mt-8 max-w-6xl font-display font-semibold text-ink">
            Apporter la paix et la joie au monde, une vie à la fois. Ça commence souvent petit : un sourire à l&apos;entrée, une prière pour votre
            famille, quelqu&apos;un qui prend de vos nouvelles.
          </p>

          <div className="mt-16 grid items-start gap-14 lg:mt-24 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <figure className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="arch relative aspect-[4/5] bg-linen" data-clip>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 scale-[1.15]" data-parallax="7">
                    <Image
                      src={pastor?.photo || "/images/pasteur-1.jpg"}
                      alt={pastor?.name ? `${pastor.name}, ${pastor.role}` : "Portrait souriant de notre pasteur principal"}
                      fill
                      unoptimized={/^https?:|^\/media\//.test(pastor?.photo ?? "")}
                      sizes="(min-width: 1024px) 30rem, 90vw"
                      className="object-cover object-[50%_20%]"
                    />
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{pastor?.name || "Notre pasteur"}</span>
                <span className="text-sm text-ink-mute">{pastor?.role}</span>
              </figcaption>
            </figure>

            <div>
              <h2 data-split className="t-2 text-ink">
                Des gens ordinaires, <em>aimés</em> par un Dieu qui ne l&apos;est pas.
              </h2>
              <p data-reveal className="lead mt-6 max-w-xl">
                Terre de Victoire fait partie de la famille {settings.churchName}. Parmi nous, il y a des étudiants, des parents, des commerçantes, des jeunes et des anciens. Ce qui nous réunit : la conviction que
                l&apos;Évangile relève les gens, quel que soit leur passé.
              </p>
              <dl data-reveal-group className="mt-10 grid gap-x-10 sm:grid-cols-2">
                {VALUES.map((v, i) => (
                  <div key={v.title} className="border-t border-line py-5">
                    <dt className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                      <span aria-hidden className="text-sm font-bold text-gold-ink">
                        0{i + 1}
                      </span>
                      {v.title}
                    </dt>
                    <dd className="mt-1.5 text-[0.98rem] text-ink-soft">{v.text}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/eglise" className="btn btn-line mt-8 text-ink">
                Mieux nous connaître <ArrowRight aria-hidden className="arrow h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- La semaine ---------- */}
      <section className="section bg-linen" data-guide="Nos rendez-vous de la semaine. Un bouton les ajoute à votre agenda, pour ne pas oublier.">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="kicker" data-reveal>
              Chaque semaine
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              Trois rendez-vous, une <em>même</em> porte.
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-soft">
              Le dimanche on célèbre, en semaine on creuse la Parole et on prie. Venez à un seul ou aux trois : vous serez attendu pareil.
            </p>
          </div>
          <ServicesProgram services={settings.services} />
        </div>
      </section>

      {/* ---------- Première visite ---------- */}
      <section className="section" data-guide="Jamais venu ? Voilà comment ça se passe, tout simplement.">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="kicker" data-reveal>
                Votre première fois
              </p>
              <h2 data-split className="t-2 mt-6 text-ink">
                Vous ne connaissez personne ? <em>Nous non plus,</em> au début.
              </h2>
            </div>
            <Link href="/eglise#premiere-visite" className="btn btn-line text-ink" data-reveal>
              Vos questions, nos réponses <ArrowRight aria-hidden className="arrow h-4 w-4" />
            </Link>
          </div>
          <ol data-reveal-group className="mt-14 grid gap-5 md:grid-cols-3">
            {FIRST_TIME.map((step, i) => (
              <li key={step.title} className="card relative overflow-hidden p-7 lg:p-9">
                <span aria-hidden className="font-display text-7xl font-bold leading-none tracking-[-0.06em] text-gold lg:text-8xl">
                  {i + 1}
                </span>
                <h3 className="t-3 mt-6 text-ink">{step.title}</h3>
                <p className="mt-3 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- La famille en images ---------- */}
      {strip.length >= 3 && (
        <GalleryStrip items={strip}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker" data-reveal>
                {photos.length ? "La famille en images" : "Images de nos cultes"}
              </p>
              <h2 data-split className="t-2 mt-6 max-w-2xl text-ink">
                Des visages, des chants, des <em>dimanches.</em>
              </h2>
            </div>
            <Link href={photos.length ? "/galerie" : "/direct"} className="btn btn-line text-ink" data-reveal>
              {photos.length ? "Toute la galerie" : "Tous les cultes"} <ArrowRight aria-hidden className="arrow h-4 w-4" />
            </Link>
          </div>
        </GalleryStrip>
      )}

      {/* ---------- Dernier culte ---------- */}
      <section className="on-dark section bg-night" data-guide="Vous avez manqué dimanche ? Le culte est là, à revoir quand vous voulez.">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker" data-reveal>
                En direct et à revoir
              </p>
              <h2 data-split className="t-2 mt-6 max-w-3xl text-ink">
                Loin de Lomé ? Le culte vient <em>jusqu&apos;à vous.</em>
              </h2>
            </div>
            <Link href="/direct" className="btn btn-line text-ink" data-reveal>
              Toutes les vidéos <ArrowRight aria-hidden className="arrow h-4 w-4" />
            </Link>
          </div>

          {latest ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
              <div data-reveal>
                <LiteYouTube id={latest.id} title={latest.title} thumbnail={latest.thumbnail} />
                <p className="mt-3 text-sm text-ink-mute">Mis en ligne le {formatDate(latest.publishedAt)}</p>
              </div>
              <ul data-reveal-group className="grid content-start">
                {others.slice(0, 3).map((v) => (
                  <li key={v.id} className="border-b border-line first:border-t">
                    <Link href={`/direct?v=${v.id}`} className="group flex gap-4 py-4">
                      <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-snow/10 sm:w-40">
                        <Image src={v.thumbnail} alt="" fill sizes="10rem" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-gold">{v.title}</span>
                        <span className="mt-1 block text-sm text-ink-mute">{formatDate(v.publishedAt)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div data-reveal className="mt-12 rounded-[1.5rem] border border-line p-8 text-ink-soft sm:p-10">
              <p className="max-w-xl">Chaque culte est filmé et diffusé sur notre chaîne YouTube. Vous pouvez le suivre en direct ou le revoir plus tard, à votre rythme.</p>
              <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6">
                Ouvrir notre chaîne YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Verset du jour ---------- */}
      <section className="section" data-guide="Un verset par jour, le même pour toute la famille. Envoyez-le à quelqu'un !">
        <div className="container-x" data-reveal>
          <VerseCard passage={verse} />
        </div>
      </section>

      {/* ---------- Nouvelles ---------- */}
      {posts.length > 0 && (
        <section className="section !pt-0">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker" data-reveal>
                  Nouvelles de la famille
                </p>
                <h2 data-split className="t-2 mt-6 text-ink">
                  Ce que Dieu fait <em>parmi nous.</em>
                </h2>
              </div>
              <Link href="/blog" className="btn btn-line text-ink" data-reveal>
                Tout lire <ArrowRight aria-hidden className="arrow h-4 w-4" />
              </Link>
            </div>
            <div data-reveal-group className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
