import { PageIntro } from "@/components/site/PageIntro";
import { getSettings } from "@/lib/settings";
import { ArrowRight, Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "L'église",
  description: "Notre vision, notre mission, nos pasteurs et ce que nous croyons. Terre de Victoire, Victory Outreach Ministry International à Lomé.",
};

const BELIEFS = [
  ["La Bible", "Parole inspirée de Dieu, elle est notre boussole pour la foi et pour la vie de tous les jours."],
  ["Un seul Dieu", "Père, Fils et Saint-Esprit. Un Dieu qui parle, qui aime et qui agit encore aujourd'hui."],
  ["Jésus-Christ", "Mort pour nos fautes et ressuscité. En lui, tout le monde peut recommencer — vraiment tout le monde."],
  ["Le Saint-Esprit", "Il console, fortifie et équipe chaque croyant pour vivre et servir."],
  ["Le salut par la grâce", "On ne le mérite pas, on le reçoit par la foi. C'est la meilleure nouvelle qui soit."],
  ["L'Église", "Pas un bâtiment : une famille où chacun a sa place et un rôle à jouer."],
];

const FIRST_VISIT = [
  ["Comment dois-je m'habiller ?", "Comme vous êtes à l'aise. Certains viennent en tenue du dimanche, d'autres plus simplement : personne ne vous regardera de travers."],
  ["Combien de temps dure le culte ?", "Comptez environ deux heures le dimanche : louange, prière, prédication, et un temps pour se saluer à la fin."],
  ["Que fait-on de mes enfants ?", "Ils sont les bienvenus. Les plus petits peuvent rester avec vous ; un accueil adapté à leur âge est prévu pendant le culte."],
  ["Dois-je donner de l'argent ?", "Non. L'offrande est un acte de foi pour les membres ; en tant qu'invité, vous êtes simplement notre invité."],
  ["Je ne connais personne…", "C'est le cas de tout le monde au début ! Présentez-vous à l'accueil : quelqu'un s'assiéra avec vous si vous le souhaitez."],
];

export default async function ChurchPage() {
  const settings = await getSettings();
  return (
    <>
      <PageIntro
        kicker="L'église"
        title={
          <>
            Une famille, pas un <em className="text-royal">club</em>.
          </>
        }
        lead={`Terre de Victoire est la filiale loméenne de ${settings.churchName}. Nous sommes des gens ordinaires, relevés par un Dieu extraordinaire — et nous aimerions vous connaître.`}
      />

      {/* Vision & mission */}
      <section className="py-20 lg:py-28" data-guide="Notre vision et notre mission : c'est le cœur de tout ce que nous faisons.">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <article className="reveal card relative overflow-hidden p-8 sm:p-10">
            <p className="kicker">Notre vision</p>
            <h2 className="mt-5 text-4xl text-ink sm:text-[2.6rem]">
              Apporter la <em className="text-royal">paix</em> et la <em className="text-royal">joie</em> au monde.
            </h2>
            <p className="mt-5 text-ink-soft">
              Être une église qui fait la différence, où chacun trouve sa place, grandit dans la foi et découvre sa destinée en Christ pour impacter sa
              famille, son quartier et le monde.
            </p>
            <span aria-hidden className="absolute -bottom-10 -right-2 font-serif text-[9rem] italic leading-none text-gold/15">
              1
            </span>
          </article>
          <article className="reveal on-dark relative overflow-hidden rounded-[1.25rem] bg-night p-8 text-paper sm:p-10" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <p className="kicker">Notre mission</p>
            <h2 className="mt-5 text-4xl sm:text-[2.6rem]">
              Œuvrer pour un <em className="text-gold">meilleur lendemain</em>.
            </h2>
            <p className="mt-5 text-paper/75">
              Répandre l&apos;amour de Dieu à Lomé et au-delà : servir avec compassion, enseigner la Parole et voir des vies transformées par la puissance
              de l&apos;Évangile.
            </p>
            <span aria-hidden className="absolute -bottom-10 -right-2 font-serif text-[9rem] italic leading-none text-gold/15">
              2
            </span>
          </article>
        </div>
      </section>

      {/* Pasteurs */}
      <section className="bg-linen/70 py-20 lg:py-28" data-guide="Voici nos pasteurs. N'hésitez pas à aller les saluer après le culte !">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="kicker">Ceux qui veillent sur nous</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">Nos pasteurs</h2>
            <p className="mt-4 text-ink-soft">Des bergers accessibles. Après le culte, ils sont souvent les derniers à quitter la salle.</p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-14">
            {settings.leaders.map((leader, i) => (
              <figure key={leader.photo + i} className="reveal group" style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}>
                <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-linen ${i % 2 ? "sm:mt-16" : ""}`}>
                  <Image
                    src={leader.photo || "/images/logo.webp"}
                    alt={leader.name ? `${leader.name}, ${leader.role}` : leader.role}
                    fill
                    unoptimized={/^https?:/.test(leader.photo)}
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-ink">{leader.role}</p>
                  {leader.name && <p className="mt-1 font-serif text-3xl text-ink">{leader.name}</p>}
                  {leader.bio && <p className="mt-2 max-w-md text-ink-soft">{leader.bio}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que nous croyons */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Ce que nous croyons</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">L&apos;essentiel, simplement.</h2>
            <p className="mt-4 text-ink-soft">Des convictions évangéliques, héritées des apôtres et vécues au quotidien.</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2">
            {BELIEFS.map(([title, text], i) => (
              <li key={title} className="reveal bg-card p-6 sm:p-8" style={{ "--delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                <span className="font-serif text-lg italic text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-2xl text-ink">{title}</h3>
                <p className="mt-2 text-[0.97rem] text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Première visite */}
      <section className="pb-24" data-guide="Des questions avant de venir ? Les réponses sont juste ici.">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <p className="hand text-3xl text-royal">Votre première visite</p>
            <h2 className="mt-2 text-4xl text-ink sm:text-5xl">Les questions qu&apos;on nous pose souvent</h2>
            <Link href="/nous-trouver" className="btn btn-primary mt-8">
              Préparer ma visite <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {FIRST_VISIT.map(([q, a]) => (
              <details key={q} className="group reveal py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-serif text-[1.35rem] text-ink [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-6 pr-8 text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
