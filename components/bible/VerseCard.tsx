import { ShareButton } from "@/components/ui/ShareButton";
import { Weave } from "@/components/ui/Weave";
import { chapterHref, type Book } from "@/lib/bible/books";
import { formatDate } from "@/lib/format";
import Link from "next/link";

type Passage = { book: Book; chapter: number; from: number; text: string; ref: string };

export function VerseCard({ passage }: { passage: Passage }) {
  return (
    <figure className="on-dark relative overflow-hidden rounded-[2rem] bg-night">
      <Weave height={10} />
      <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        <p className="kicker">Le verset du jour · {formatDate(new Date().toISOString())}</p>
        <blockquote className="mt-8 max-w-4xl font-serif text-[1.75rem] leading-[1.28] text-ink sm:text-[2.4rem] lg:text-[2.9rem]">
          <p data-words>« {passage.text} »</p>
        </blockquote>
        <figcaption className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <cite className="font-display text-xl font-semibold not-italic tracking-[-0.02em] text-gold">{passage.ref}</cite>
          <span className="flex flex-wrap gap-2">
            <Link href={chapterHref(passage.book, passage.chapter, passage.from)} className="btn btn-gold !min-h-11 text-sm">
              Lire la suite du chapitre
            </Link>
            <ShareButton text={`« ${passage.text} » — ${passage.ref}`} url={chapterHref(passage.book, passage.chapter, passage.from)} label="L'envoyer à quelqu'un" className="!min-h-11 text-sm text-ink" />
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
