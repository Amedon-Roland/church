import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SingleBlogPost() {
  return (
    <main className="min-h-screen bg-app">
      <Navbar />

      {/* Hero header */}
      <header className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-subtle overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-50" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold hover:gap-3 transition-all"
            >
              <span>←</span>
              Retour au journal
            </Link>
          </div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-6 inline-block px-3 py-1.5 rounded-full bg-card border border-border">
            Compassion
          </p>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-txt-main leading-[1.05] tracking-tight mb-8 text-balance">
            Comment incarner la{" "}
            <span className="font-display-italic text-gradient-gold">compassion</span>{" "}
            au quotidien.
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-txt-muted">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              13 Mai 2026
            </span>
            <span className="w-1 h-1 rounded-full bg-txt-faint" />
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Mathew Johnson
            </span>
            <span className="w-1 h-1 rounded-full bg-txt-faint" />
            <span>8 min de lecture</span>
          </div>
        </div>
      </header>

      <article className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero image */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden mb-16 -mt-32 shadow-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop"
              alt="Compassion"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl md:text-2xl font-display-italic text-txt-main leading-relaxed mb-10 text-balance">
              La compassion ne se décrète pas. Elle se cultive, jour après jour,
              dans les détails que personne ne voit.
            </p>

            <p className="text-txt-muted leading-relaxed mb-8 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore.
            </p>

            <p className="text-txt-muted leading-relaxed mb-12 text-lg">
              Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi
              porta lorem mollis aliquam. Quis vel eros donec ac odio tempor
              orci dapibus ultrices. Elementum eu facilisis sed odio morbi.
            </p>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-6 leading-tight">
              Voir, vraiment voir.
            </h2>

            <p className="text-txt-muted leading-relaxed mb-12 text-lg">
              Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi
              porta lorem mollis aliquam. Quis vel eros donec ac odio tempor
              orci dapibus ultrices. Elementum eu facilisis sed odio morbi.
            </p>

            {/* Pull quote */}
            <blockquote className="relative my-16 py-8 px-6 lg:px-12 bg-subtle rounded-3xl border-l-4 border-primary">
              <span className="absolute -top-6 left-6 font-display text-7xl text-primary leading-none">
                "
              </span>
              <p className="font-display-italic text-xl md:text-2xl text-txt-main leading-relaxed">
                Heureux ceux qui ont compassion, car ils obtiendront compassion.
              </p>
              <footer className="mt-4 text-[10px] uppercase tracking-[0.35em] text-primary font-semibold">
                — Matthieu 5:7
              </footer>
            </blockquote>

            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden mb-12">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                alt="Réflexion"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-txt-main mb-6 leading-tight">
              Trois gestes à essayer cette semaine.
            </h2>

            <ul className="space-y-4 mb-12">
              {[
                "Écouter sans préparer sa réponse — laisser un silence après l'autre.",
                "Demander des nouvelles à quelqu'un qu'on a perdu de vue.",
                "Donner anonymement, juste pour le plaisir de ne pas être remercié.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-txt-muted text-lg leading-relaxed"
                >
                  <span className="font-display text-2xl text-primary font-bold leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-txt-muted leading-relaxed text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. La
              compassion est un muscle. Plus on l'exerce, plus elle devient
              instinctive.
            </p>
          </div>

          {/* Author card */}
          <div className="mt-20 p-8 rounded-3xl bg-card border border-border flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-1">
                Écrit par
              </p>
              <p className="font-display font-bold text-xl text-txt-main">
                Mathew Johnson
              </p>
              <p className="text-sm text-txt-muted">Pasteur associé</p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
