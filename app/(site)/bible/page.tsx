import { BibleSearch } from "@/components/bible/BibleSearch";
import { ReadingCorner } from "@/components/bible/ReadingCorner";
import { VerseCard } from "@/components/bible/VerseCard";
import { PageIntro } from "@/components/site/PageIntro";
import { BOOKS, chapterHref } from "@/lib/bible/books";
import { verseOfTheDay } from "@/lib/bible/server";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "La Bible en ligne",
  description: "Lisez la Bible Louis Segond 1910 en ligne : recherche par mot ou référence, surlignage, partage de versets et verset du jour.",
};

export default function BiblePage() {
  const groups = BOOKS.reduce<Record<string, typeof BOOKS>>((acc, b) => {
    (acc[`${b.testament}|${b.group}`] ??= []).push(b);
    return acc;
  }, {});

  return (
    <>
      <PageIntro
        kicker="La Bible · Louis Segond 1910"
        title={
          <>
            « Ta parole est une <em>lampe</em> à mes pieds. »
          </>
        }
        lead="Psaume 119:105. Cherchez un passage, surlignez ce qui vous touche, et envoyez-le à quelqu'un qui en a besoin aujourd'hui. Tout est gratuit, sans compte à créer."
      >
        <div className="mt-10 max-w-3xl" data-reveal data-guide="Tapez « Jean 3:16 » ou un mot comme « paix » : je trouve le passage.">
          <BibleSearch />
        </div>
      </PageIntro>

      <div className="container-x pb-28 pt-4">
        <ReadingCorner />

        <div className="mt-12">
          <VerseCard passage={verseOfTheDay()} />
        </div>

        {(["AT", "NT"] as const).map((t) => (
          <section key={t} className="mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
              <h2 data-split className="t-2 text-ink">{t === "AT" ? "Ancien Testament" : "Nouveau Testament"}</h2>
              <span className="text-sm text-ink-mute">{BOOKS.filter((b) => b.testament === t).length} livres</span>
            </div>
            <div className="mt-8 gap-x-10 sm:columns-2 lg:columns-3">
              {Object.entries(groups)
                .filter(([k]) => k.startsWith(t))
                .map(([k, books]) => (
                  <div key={k} className="mb-10 break-inside-avoid">
                    <p className="kicker mb-3">{k.split("|")[1]}</p>
                    <ul className="grid grid-cols-2 gap-x-4">
                      {books.map((b) => (
                        <li key={b.slug}>
                          <Link href={chapterHref(b, 1)} className="group flex min-h-11 items-baseline justify-between gap-2 border-b border-line py-2.5 text-ink transition-colors hover:text-accent">
                            <span className="truncate text-[1.05rem] font-medium">{b.name}</span>
                            <span className="text-xs text-ink-mute group-hover:text-accent">{b.chapters}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
