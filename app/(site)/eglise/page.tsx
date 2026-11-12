import { PageIntro } from "@/components/site/PageIntro";
import { getSettings } from "@/lib/settings";
import { ArrowRight, Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "L'église",
  description: "Qui nous sommes, ce qui nous anime, nos pasteurs, ce que nous croyons et tout ce qu'il faut savoir avant une première visite à Terre de Victoire, Lomé.",
};

const BELIEFS = [
  ["La Bible", "C'est la Parole de Dieu. On la lit, on la creuse, et on essaie surtout de la vivre du lundi au samedi."],
  ["Un seul Dieu", "Père, Fils et Saint-Esprit. Un Dieu qui parle encore, qui aime et qui agit aujourd'hui."],
  ["Jésus-Christ", "Mort pour nos fautes, ressuscité le troisième jour. Avec lui, tout le monde peut recommencer. Vraiment tout le monde."],
  ["Le Saint-Esprit", "Il console, il fortifie, il donne à chacun de quoi vivre sa foi et servir les autres."],
  ["La grâce", "Le salut ne se mérite pas, il se reçoit par la foi. C'est la meilleure nouvelle qu'on ait à partager."],
  ["L'Église", "Ce n'est pas un bâtiment. C'est une famille, où chacun a sa place et quelque chose à apporter."],
];

const FIRST_VISIT = [
  ["Comment faut-il s'habiller ?", "Comme vous êtes à l'aise. Certains viennent en tenue du dimanche, d'autres plus simplement. Personne ne vous regardera de travers."],
  ["Combien de temps dure le culte ?", "Comptez environ deux heures le dimanche : on chante, on prie, on écoute la prédication, puis on prend le temps de se saluer."],
  ["Et mes enfants ?", "Ils sont les bienvenus, bruit compris. Les plus petits peuvent rester avec vous, et un temps adapté à leur âge est prévu pendant le culte."],
  ["Est-ce qu'on va me demander de l'argent ?", "Non. L'offrande est un geste de foi des membres. Vous, vous êtes notre invité : on ne vous demandera rien."],
  ["Je ne connais personne…", "C'était notre cas à tous, un jour. Dites-le simplement à l'accueil : quelqu'un s'assiéra avec vous si vous le souhaitez."],
  ["Je ne suis pas sûr de croire. Je peux venir quand même ?", "Bien sûr. Venez écouter, observer, poser vos questions. On ne vous demandera pas où vous en êtes avant de vous dire bonjour."],
];

export default async function ChurchPage() {
  const settings = await getSettings();
  return (
    <>
      <PageIntro
        kicker="L'église"
        title={
          <>
            Une famille, pas un <em>club.</em>
          </>
        }
        lead={`Terre de Victoire est l'église de ${settings.churchName} à Lomé. Nous sommes des gens ordinaires, relevés par un Dieu extraordinaire. Et nous aimerions beaucoup vous connaître.`}
      />

      {/* Vision & mission */}
      <section className="section" data-guide="Notre vision et notre mission : c'est le cœur de tout ce qu'on fait ici.">
        <div className="container-x">
          <p className="kicker" data-reveal>
            Ce qui nous fait lever le matin
          </p>
          <p data-words className="t-1 mt-8 max-w-6xl font-display font-semibold text-ink">
            Apporter la paix et la joie au monde. Une personne, une famille, un quartier à la fois.
          </p>
          <div data-reveal-group className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20">
            <article className="card p-8 sm:p-10">
              <p className="kicker">Notre vision</p>
              <h2 className="t-2 mt-6 text-ink">
                Une église où chacun trouve <em>sa place.</em>
              </h2>
              <p className="mt-6 text-ink-soft">
                On rêve d&apos;une église qui fait du bien autour d&apos;elle. Un lieu où l&apos;on grandit dans la foi, où l&apos;on découvre ce pour
                quoi Dieu nous a faits, et d&apos;où l&apos;on repart pour bénir sa famille, son quartier, sa ville.
              </p>
            </article>
            <article className="on-dark rounded-[1.5rem] bg-night p-8 sm:p-10">
              <p className="kicker">Notre mission</p>
              <h2 className="t-2 mt-6 text-ink">
                Travailler à un <em>meilleur lendemain.</em>
              </h2>
              <p className="mt-6 text-ink-soft">
                Concrètement : aimer les gens de Lomé et d&apos;ailleurs, servir avec compassion, enseigner la Parole simplement, et voir des vies
                changer par la puissance de l&apos;Évangile.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Pasteurs */}
      <section className="section bg-linen" data-guide="Voici nos pasteurs. N'hésitez pas à aller les saluer après le culte !">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="kicker" data-reveal>
              Ceux qui veillent sur nous
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              Des pasteurs qu&apos;on peut <em>approcher.</em>
            </h2>
            <p data-reveal className="lead mt-6">
              Ils prêchent le dimanche, mais ils sont surtout là dans la semaine : pour écouter, prier, conseiller. Après le culte, ce sont souvent les
              derniers à quitter la salle.
            </p>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:gap-x-20">
            {settings.leaders.map((leader, i) => (
              <figure key={leader.photo + i} className={`group ${i % 2 ? "sm:mt-24" : ""}`}>
                <div className="arch relative aspect-[4/5] bg-card" data-clip>
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 scale-[1.15]" data-parallax="7">
                      <Image
                        src={leader.photo || "/images/logo.webp"}
                        alt={leader.name ? `Portrait de ${leader.name}, ${leader.role}` : `Portrait : ${leader.role}`}
                        fill
                        unoptimized={/^https?:|^\/media\//.test(leader.photo)}
                        sizes="(min-width: 640px) 45vw, 100vw"
                        className="object-cover object-[50%_20%]"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-6" data-reveal>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-ink">{leader.role}</p>
                  {leader.name && <p className="t-3 mt-2 font-display font-semibold text-ink">{leader.name}</p>}
                  {leader.bio && <p className="mt-3 max-w-md text-ink-soft">{leader.bio}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que nous croyons */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="kicker" data-reveal>
              Ce que nous croyons
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              L&apos;essentiel, dit <em>simplement.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-soft">
              Notre foi est celle des chrétiens évangéliques : reçue des apôtres, et vécue au quotidien.
            </p>
          </div>
          <ol data-reveal-group className="border-t border-line">
            {BELIEFS.map(([title, text], i) => (
              <li key={title} className="grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[3rem_14rem_1fr] sm:items-baseline">
                <span aria-hidden className="text-sm font-bold text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-3 text-ink">{title}</h3>
                <p className="text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Première visite */}
      <section id="premiere-visite" className="section scroll-mt-20 bg-linen" data-guide="Des questions avant de venir ? Les réponses sont juste ici.">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="kicker" data-reveal>
              Avant de venir
            </p>
            <h2 data-split className="t-2 mt-6 text-ink">
              Les questions qu&apos;on <em>n&apos;ose pas</em> toujours poser.
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-soft">
              Il en manque une ? Écrivez-nous, on vous répond sans détour.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Link href="/nous-trouver" className="btn btn-primary">
                Préparer ma visite <ArrowRight aria-hidden className="arrow h-4 w-4" />
              </Link>
              <Link href="/nous-trouver#ecrire" className="btn btn-line text-ink">
                Poser ma question
              </Link>
            </div>
          </div>
          <div data-reveal-group className="border-t border-line">
            {FIRST_VISIT.map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors hover:text-accent sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:bg-gold group-open:text-night">
                    <Plus aria-hidden className="h-5 w-5" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-12 text-lg text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
