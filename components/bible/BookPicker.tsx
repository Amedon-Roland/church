"use client";

import { BOOKS, chapterHref, type Book } from "@/lib/bible/books";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Sélecteur livre → chapitre, en fenêtre modale. */
export function BookPicker({ current, chapter, className = "" }: { current: Book; chapter: number; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const d = dialog.current;
    const reset = () => {
      setBook(null);
      setFilter("");
    };
    d?.addEventListener("close", reset);
    return () => d?.removeEventListener("close", reset);
  }, []);

  const fold = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  const books = BOOKS.filter((b) => !filter || fold(b.name).includes(fold(filter)));

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={`inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 font-serif text-xl ${className}`}>
        {current.name} {chapter}
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[85dvh] w-[min(40rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl bg-card p-0 text-ink shadow-2xl backdrop:bg-night/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-line p-3">
          {book ? (
            <button type="button" onClick={() => setBook(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-linen" aria-label="Retour aux livres">
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}
          {book ? (
            <p className="flex-1 font-serif text-2xl">{book.name}</p>
          ) : (
            <input
              autoFocus
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Chercher un livre…"
              className="flex-1 rounded-full bg-linen px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal/30"
            />
          )}
          <button type="button" onClick={() => dialog.current?.close()} className="grid h-10 w-10 place-items-center rounded-full hover:bg-linen" aria-label="Fermer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(85dvh-4.5rem)] overflow-y-auto p-4">
          {book ? (
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
              {Array.from({ length: book.chapters }, (_, i) => (
                <Link
                  key={i}
                  href={chapterHref(book, i + 1)}
                  onClick={() => dialog.current?.close()}
                  className={`grid aspect-square place-items-center rounded-lg text-sm font-semibold transition-colors ${
                    book.index === current.index && i + 1 === chapter ? "bg-royal text-white" : "bg-linen hover:bg-gold-soft"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          ) : (
            (["AT", "NT"] as const).map((t) => {
              const list = books.filter((b) => b.testament === t);
              if (!list.length) return null;
              return (
                <div key={t} className="mb-5">
                  <p className="kicker mb-3">{t === "AT" ? "Ancien Testament" : "Nouveau Testament"}</p>
                  <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {list.map((b) => (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => {
                          if (b.chapters > 1) return setBook(b);
                          dialog.current?.close();
                          router.push(chapterHref(b, 1));
                        }}
                        className={`rounded-lg px-3 py-2 text-left text-[0.95rem] transition-colors hover:bg-linen ${b.index === current.index ? "font-semibold text-royal" : ""}`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </dialog>
    </>
  );
}
