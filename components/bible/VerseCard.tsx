import { ShareButton } from "@/components/ui/ShareButton";
import { chapterHref, type Book } from "@/lib/bible/books";
import { formatDate } from "@/lib/format";
import Link from "next/link";

type Passage = { book: Book; chapter: number; from: number; text: string; ref: string };

export function VerseCard({ passage }: { passage: Passage }) {
  return (
    <figure className="on-dark relative overflow-hidden rounded-[1.75rem] bg-night px-6 py-10 text-paper sm:px-12 sm:py-14">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-16 -top-16 h-72 w-72 text-gold/15">
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1="100" y1="100" x2={100 + 100 * Math.cos((i * Math.PI) / 12)} y2={100 + 100 * Math.sin((i * Math.PI) / 12)} stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>
      <div className="relative">
        <p className="kicker">Verset du jour · {formatDate(new Date().toISOString())}</p>
        <blockquote className="mt-6 max-w-3xl font-serif text-[1.7rem] leading-[1.3] sm:text-[2.2rem]">
          <span className="text-gold">« </span>
          {passage.text}
          <span className="text-gold"> »</span>
        </blockquote>
        <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="hand text-3xl text-gold">{passage.ref}</span>
          <span className="flex flex-wrap gap-2">
            <Link href={chapterHref(passage.book, passage.chapter, passage.from)} className="btn btn-gold !min-h-10 text-sm">
              Lire le chapitre
            </Link>
            <ShareButton text={`« ${passage.text} » — ${passage.ref}`} url={chapterHref(passage.book, passage.chapter, passage.from)} className="!min-h-10 text-sm text-paper" />
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
