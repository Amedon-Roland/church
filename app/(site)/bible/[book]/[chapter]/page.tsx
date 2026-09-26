import { Reader } from "@/components/bible/Reader";
import { BOOKS, bookBySlug, chapterHref } from "@/lib/bible/books";
import { getChapter } from "@/lib/bible/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Les 1 189 chapitres sont générés à la première visite puis gardés en cache.
export const dynamicParams = true;
export const revalidate = false;
export function generateStaticParams() {
  return [
    { book: "jean", chapter: "3" },
    { book: "psaumes", chapter: "23" },
    { book: "genese", chapter: "1" },
  ];
}

type Params = { params: Promise<{ book: string; chapter: string }> };

function resolve(slug: string, chapterRaw: string) {
  const book = bookBySlug(slug);
  const chapter = Number(chapterRaw);
  if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) return null;
  return { book, chapter };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { book: slug, chapter } = await params;
  const r = resolve(slug, chapter);
  if (!r) return {};
  const first = getChapter(r.book, r.chapter)?.[0] ?? "";
  return {
    title: `${r.book.name} ${r.chapter} — Bible Louis Segond`,
    description: first.slice(0, 155),
    alternates: { canonical: chapterHref(r.book, r.chapter) },
  };
}

export default async function ChapterPage({ params }: Params) {
  const { book: slug, chapter: raw } = await params;
  const r = resolve(slug, raw);
  if (!r) notFound();
  const { book, chapter } = r;
  const verses = getChapter(book, chapter)!;

  const prevBook = BOOKS[book.index - 1];
  const nextBook = BOOKS[book.index + 1];
  const prev =
    chapter > 1 ? { href: chapterHref(book, chapter - 1), label: `${book.name} ${chapter - 1}` } : prevBook ? { href: chapterHref(prevBook, prevBook.chapters), label: `${prevBook.name} ${prevBook.chapters}` } : null;
  const next =
    chapter < book.chapters ? { href: chapterHref(book, chapter + 1), label: `${book.name} ${chapter + 1}` } : nextBook ? { href: chapterHref(nextBook, 1), label: `${nextBook.name} 1` } : null;

  return <Reader key={`${book.slug}-${chapter}`} book={book} chapter={chapter} verses={verses} prev={prev} next={next} />;
}
